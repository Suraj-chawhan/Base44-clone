"use client";
import { useState, useRef, useEffect } from "react";
import {
  Send,
  FileUp,
  Trash2,
  Bot,
  User,
  CreditCard,
  Smartphone,
  Monitor,
  LogOut,
} from "lucide-react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import GitHubOverlay from "./GitHubOverlay";
import Loading from "../../Components/Loading.js";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function AIWebsiteBuilder() {
  const router = useRouter();
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! Tell me what page you want to build." },
  ]);
  const [files, setFiles] = useState([]);
  const [aiPage, setAiPage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showGitHub, setShowGitHub] = useState(false);
  const [previewMode, setPreviewMode] = useState("desktop");
  const [loadingSession, setLoadingSession] = useState(true);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [user, setUser] = useState(null); // ✅ user details
  const endRef = useRef(null);

  // Scroll chat to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load session info & first login
  useEffect(() => {
    const init = async () => {
      const firstLogin = localStorage.getItem("firstLogin");
      setIsFirstLogin(firstLogin === "true");

      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        if (data?.success) setUser(data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoadingSession(false);
      }
    };
    init();
  }, []);

  // File upload
  const uploadFiles = (e) =>
    setFiles((prev) => [...prev, ...Array.from(e.target.files)]);

  // Logout
  const handleLogout = async () => {
    localStorage.removeItem("firstLogin");
    await signOut({ callbackUrl: "/login" });
  };

  // Send message / generate page
  const sendMessage = async () => {
    const prompt = chatInput?.trim();
    if (!prompt) return;
    if (!user) return alert("User data not loaded yet.");

    // Restrict free users with 0 credits
    if (user.plan === "free" && user.credits <= 0) {
      return alert("You have no credits left. Please upgrade your plan.");
    }

    const userMsg = { role: "user", text: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();

      if (!data?.success || !data?.result) {
        throw new Error(data?.message || "Invalid response from AI");
      }

      const { title, html, data: jsonData } = data.result;
   const cleanHtml = data.result.html
        .replace(/```html|```/g, "")
        .trim();
      setAiPage({ title: title || "AI Page", html: cleanHtml, data: jsonData ?? {} });
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: `Generated: ${title ?? "Page"}` },
      ]);

      // Reduce credit if free plan
      if (user.plan === "free") {
        setUser((prev) => ({ ...prev, credits: prev.credits - 1 }));
      }
    } catch (err) {
      console.error("AI generate error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Failed to generate. Try again." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  if (loadingSession) return <Loading />;

  return (
    <div className="flex h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Sidebar */}
      <div className="w-96 bg-gradient-to-b from-amber-100 to-yellow-100 border-r border-amber-300 flex flex-col shadow-xl">
        <div className="p-6 bg-gradient-to-r from-amber-800 to-yellow-700 text-white shadow-lg">
          <h1 className="text-2xl font-bold tracking-wide">AI Website Builder</h1>
        </div>

        <div className="p-4 border-b border-amber-300 bg-amber-50 space-y-2">
          <button
            onClick={() => setShowGitHub(true)}
            className="w-full px-4 py-2.5 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 rounded-lg text-white font-semibold shadow-md transition-all duration-200 hover:shadow-lg"
          >
            Deploy to GitHub
          </button>

          {isFirstLogin && (
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-white font-semibold shadow-md transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role === "bot" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-yellow-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Bot size={18} className="text-white" />
                </div>
              )}
              <div
                className={`px-4 py-3 rounded-2xl max-w-xs shadow-md ${
                  m.role === "bot"
                    ? "bg-white text-amber-900 border border-amber-200"
                    : "bg-gradient-to-r from-amber-700 to-yellow-700 text-white"
                }`}
              >
                {m.text}
              </div>
              {m.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-600 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <User size={18} className="text-white" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-yellow-600 flex items-center justify-center shadow-md">
                <Bot size={18} className="text-white" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white text-amber-900 border border-amber-200 shadow-md">
                AI is typing...
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Files */}
        {files.length > 0 && (
          <div className="p-4 border-t border-amber-300 bg-amber-50">
            <div className="space-y-2">
              {files.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-3 py-2 bg-white rounded-lg border border-amber-200 shadow-sm"
                >
                  <span className="text-sm text-amber-900 truncate">{f.name}</span>
                  <button
                    onClick={() => setFiles(files.filter((_, j) => j !== i))}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-amber-300 bg-gradient-to-r from-amber-100 to-yellow-100">
          <div className="flex gap-2">
            <input
              type="file"
              id="file"
              multiple
              className="hidden"
              onChange={uploadFiles}
            />
            <button
              onClick={() => document.getElementById("file").click()}
              className="p-2.5 border-2 border-amber-400 rounded-lg hover:bg-amber-200 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <FileUp size={20} className="text-amber-800" />
            </button>
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type what you want to build..."
              className="flex-1 border-2 border-amber-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-amber-900 placeholder-amber-400 shadow-sm"
            />
            <button
              onClick={sendMessage}
              className="p-2.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Send size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Main editor */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-stone-50 to-amber-50">
        <div className="h-16 bg-gradient-to-r from-amber-900 to-yellow-800 text-white px-6 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center font-bold shadow-md">
                JD
              </div>
              <div>
                <div className="font-semibold">{user?.name || "User"}</div>
                <div className="text-xs text-yellow-200">
                  {user?.plan?.toUpperCase() || "FREE"} Plan
                  {user?.plan === "free" && ` - ${user?.credits} credits`}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-amber-800 px-4 py-2 rounded-full shadow-md">
              <CreditCard size={18} className="text-yellow-300" />
              <span className="font-semibold">{user?.credits || 0}</span>
            </div>
            <button
              onClick={() =>
                setPreviewMode(previewMode === "desktop" ? "mobile" : "desktop")
              }
              className="p-2.5 border-2 border-yellow-400 rounded-lg hover:bg-amber-800 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {previewMode === "desktop" ? (
                <Monitor size={20} className="text-yellow-200" />
              ) : (
                <Smartphone size={20} className="text-yellow-200" />
              )}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6 w-[100vh] max-w-full">
          <SandpackProvider
            template="static"
            files={{
              "/index.html": aiPage?.html || getPlaceholderHtml(),
            }}
            theme="light"
          >
            <SandpackLayout className="shadow-2xl rounded-xl overflow-hidden border-4 border-amber-200">
              <SandpackPreview
                showNavigator={false}
                showRefreshButton={true}
                className={previewMode === "mobile" ? "max-w-sm mx-auto" : ""}
              />
            </SandpackLayout>

            <div className="mt-6 bg-white rounded-xl shadow-xl border-2 border-amber-200 overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-amber-700 to-yellow-700 text-white font-semibold text-lg">
                HTML Source
              </div>
              <SandpackCodeEditor showTabs={false} showLineNumbers={true} className="max-h-96" />
            </div>

            {aiPage?.data && Object.keys(aiPage.data).length > 0 && (
              <div className="mt-6 bg-white rounded-xl shadow-xl border-2 border-amber-200 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-amber-700 to-yellow-700 text-white font-semibold text-lg">
                  Generated JSON
                </div>
                <pre className="p-6 bg-gradient-to-br from-stone-50 to-amber-50 overflow-auto text-sm text-amber-900">
                  <code>{JSON.stringify(aiPage.data, null, 2)}</code>
                </pre>
              </div>
            )}
          </SandpackProvider>
        </div>
      </div>

      {showGitHub && <GitHubOverlay onClose={() => setShowGitHub(false)} />}
    </div>
  );
}

function getPlaceholderHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI Preview</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: sans-serif; background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); min-height:100vh; display:flex; justify-content:center; align-items:center; }
.container { background:white; padding:3rem; border-radius:1rem; text-align:center; border:3px solid #FCD34D; box-shadow:0 20px 60px rgba(180,83,9,0.15); }
h1 { color:#78350F; font-size:2.5rem; margin-bottom:1rem; }
p { color:#92400E; font-size:1.125rem; line-height:1.75; }
</style>
</head>
<body>
<div class="container">
<h1>AI Preview</h1>
<p>Type what you want (example: "Create a modern todo app") and click send.</p>
</div>
</body>
</html>`;
}
