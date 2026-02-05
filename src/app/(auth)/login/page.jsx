"use client";
import React, { useState,useEffect } from "react";
import { FileText, Eye, EyeOff, ArrowRight, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { signIn, useSession } from "next-auth/react";
export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const { data: session, status } = useSession();

   useEffect(() => {
    if (status === "authenticated") {
      router.push("/editor");
    }
  }, [status, router]);



const handleSubmit = async () => {
  if (!formData.email || !formData.password) {
    setError("Email and password are required");
    return;
  }

 

  setLoading(true);
  setError("");

  const res = await signIn("credentials", {
    email: formData.email.toLowerCase(),
    password: formData.password,
    redirect: false,
  });

  if (res?.error) {
    setError("Invalid email or password");
    setLoading(false);
    return;
  }

  localStorage.setItem("firstLogin", "true");
  router.push("/editor");
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">AssignmentAI</h1>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-white leading-tight">
              Welcome Back to Your AI Workspace
            </h2>
            <p className="text-xl text-orange-100 leading-relaxed">
              Continue building amazing content with the power of artificial intelligence at your fingertips.
            </p>
          </div>
        </div>

        <div className="relative z-10 text-orange-100">
          <p className="text-sm">© 2024 AssignmentAI. All rights reserved.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">AssignmentAI</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-4xl font-bold text-slate-900 mb-2">Sign In</h2>
            <p className="text-slate-600 text-lg">Access your account to continue</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border-2 border-slate-200 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                />
                <Mail className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white border-2 border-slate-200 rounded-xl pl-12 pr-12 py-3.5 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                />
                <Lock className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-orange-600 hover:text-orange-700 font-semibold">
                Forgot password?
              </Link>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>

            <div className="text-center text-slate-600">
              Don't have an account?{" "}
              <Link className="text-orange-600 hover:text-orange-700 font-bold" href="/signup">
                Create Account
              </Link>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => signIn("google", { callbackUrl: "/editor" })}
                className="bg-white hover:bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-700 py-3 font-semibold shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button
                onClick={() => signIn("github", { callbackUrl: "/editor" })}
                className="bg-slate-900 hover:bg-black text-white rounded-xl py-3 font-semibold shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                </svg>
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}