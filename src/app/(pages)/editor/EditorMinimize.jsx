"use client";

import { useState, useRef, useEffect } from "react";
import { Send, FileUp, Trash2, Bot, User, CreditCard, Smartphone, Monitor } from "lucide-react";
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview } from "@codesandbox/sandpack-react";
import GitHubOverlay from "./GitHubOverlay";
import Loading from "../../Components/Loading.js";
// import { useSession } from "next-auth/react"; // Uncomment for session
import { useRouter } from "next/navigation";

const templates = {
  welcome: `<div class="h-full flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
    <h1 class="text-3xl font-bold text-indigo-600">Welcome to the AI Website Builder</h1></div>`,
  homepage: `<div class="h-full bg-white flex flex-col items-center justify-center text-center p-6">
    <h1 class="text-4xl font-bold text-slate-800">Modern AI Website</h1>
    <p class="mt-4 text-slate-600 max-w-md">Beautiful, responsive designs powered by AI.</p>
    <button class="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">Get Started</button></div>`,
  assessment: `<div class="h-full flex flex-col items-center justify-center bg-gray-50 p-6">
    <h2 class="text-2xl font-semibold mb-6">Assessment Form</h2>
    <form class="w-full max-w-sm space-y-4">
      <input type="text" placeholder="Your Name" class="w-full p-2 border rounded"/>
      <input type="email" placeholder="Your Email" class="w-full p-2 border rounded"/>
      <textarea placeholder="Your Goals" class="w-full p-2 border rounded"></textarea>
      <button type="submit" class="w-full bg-indigo-600 text-white p-2 rounded">Submit</button>
    </form></div>`,
  dashboard: `<div class="h-full grid grid-cols-3 gap-4 p-4 bg-slate-50">
    <div class="bg-white p-4 rounded shadow"><h3 class="text-lg font-bold mb-2">Users</h3><p class="text-2xl font-semibold">1,234</p></div>
    <div class="bg-white p-4 rounded shadow"><h3 class="text-lg font-bold mb-2">Revenue</h3><p class="text-2xl font-semibold">$56,789</p></div>
    <div class="bg-white p-4 rounded shadow"><h3 class="text-lg font-bold mb-2">Growth</h3><p class="text-2xl font-semibold">12%</p></div></div>`,
  pricing: `<div class="h-full flex flex-col items-center justify-center bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
    <h2 class="text-3xl font-bold text-slate-800 mb-8">Pricing Plans</h2>
    <div class="grid grid-cols-3 gap-6 max-w-4xl">
      <div class="bg-white p-6 rounded-lg shadow"><h3 class="text-xl font-bold">Basic</h3><p class="mt-2 text-slate-600">$19/month</p></div>
      <div class="bg-white p-6 rounded-lg shadow border-2 border-indigo-500"><h3 class="text-xl font-bold">Pro</h3><p class="mt-2 text-slate-600">$49/month</p></div>
      <div class="bg-white p-6 rounded-lg shadow"><h3 class="text-xl font-bold">Enterprise</h3><p class="mt-2 text-slate-600">Custom</p></div>
    </div></div>`
};

export default function AIWebsiteBuilder() {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([{ role: "bot", text: "👋 Hi! Tell me what page you want to build." }]);
  const [files, setFiles] = useState([]);
  const [current, setCurrent] = useState("welcome");
  const [isTyping, setIsTyping] = useState(false);
  const [showGitHub, setShowGitHub] = useState(false);
  const [previewMode, setPreviewMode] = useState("desktop");
  const [loadingSession, setLoadingSession] = useState(true);

  // const { data: session } = useSession(); // Uncomment for session

  const endRef = useRef(null);
  const router = useRouter();

  const detectTemplate = (msg) => {
    if (/home/i.test(msg)) return "homepage";
    if (/assessment|form/i.test(msg)) return "assessment";
    if (/dashboard|stats?/i.test(msg)) return "dashboard";
    if (/pricing|plans?/i.test(msg)) return "pricing";
    return "homepage";
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: "user", text: chatInput };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      const newTemplate = detectTemplate(userMsg.text);
      setCurrent(newTemplate);
      setMessages((prev) => [...prev, { role: "bot", text: `Here's your ${newTemplate} page.` }]);
      setIsTyping(false);
    }, 1000);
  };

  const uploadFiles = (e) => setFiles([...files, ...Array.from(e.target.files)]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate session loading
  useEffect(() => {
    setLoadingSession(false);
  }, []);

  if (loadingSession) return <Loading />;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/3 border-r bg-white flex flex-col relative">
        <div className="p-4 border-b bg-slate-50 font-bold text-indigo-600 flex items-center justify-between">
          <div className="flex items-center gap-2"><Bot /> AI Website Builder</div>
          <button
            onClick={() => setShowGitHub(true)}
            className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-black"
          >
            GitHub
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role === "bot" && <Bot className="w-5 h-5 text-indigo-500" />}
              <div className={`px-3 py-2 rounded-lg max-w-[75%] ${m.role === "user" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-800"}`}>{m.text}</div>
              {m.role === "user" && <User className="w-5 h-5 text-indigo-500" />}
            </div>
          ))}
          {isTyping && <div className="text-slate-500 italic">AI is typing...</div>}
          <div ref={endRef}></div>
        </div>

        {/* Uploaded files */}
        {files.length > 0 && (
          <div className="m-4 border rounded p-2 space-y-2 bg-slate-50">
            {files.map((f, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-sm">{f.name}</span>
                <button onClick={() => setFiles(files.filter((_, j) => j !== i))} className="text-red-500 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t flex gap-2">
          <input type="file" multiple hidden id="file" onChange={uploadFiles} />
          <button onClick={() => document.getElementById("file").click()} className="p-2 border rounded hover:bg-slate-100">
            <FileUp className="w-4 h-4" />
          </button>
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 border rounded px-3 py-2"
          />
          <button onClick={sendMessage} className="p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right Sidebar / Preview Section */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Top bar: session info left, responsiveness toggle right */}
        <div className="p-4 border-b flex justify-between items-center bg-white">
          <div className="flex items-center gap-4">
            {/* Session info */}
            {/* {session ? ( */}
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-indigo-500" />
              <span className="font-bold text-slate-800">John Doe</span>
              <span className="text-sm text-slate-600">Pro Plan</span>
              <div className="flex items-center gap-1 text-slate-700">
                <CreditCard className="w-4 h-4" />
                <span>100</span>
              </div>
            </div>
            {/* ) : ""} */}
          </div>

          <div>
            <button
              onClick={() => setPreviewMode(previewMode === "desktop" ? "mobile" : "desktop")}
              className="p-2 border rounded hover:bg-gray-100"
            >
              {previewMode === "desktop" ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <SandpackProvider
          template="react"
          files={{
            "/App.jsx": { code: templates[current], active: true },
          }}
        >
          <SandpackLayout className="flex-1 flex flex-col md:flex-row">
            <div className={`flex-1 p-2 ${previewMode === "mobile" ? "max-w-[375px] mx-auto border rounded shadow-md" : ""}`}>
              <SandpackPreview className="border rounded h-full w-full" />
            </div>
          </SandpackLayout>
        </SandpackProvider>
      </div>

      {/* GitHub Overlay */}
      {showGitHub && <GitHubOverlay onClose={() => setShowGitHub(false)} />}
    </div>
  );
}
