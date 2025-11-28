"use client";
import React, { useState } from "react";
import { FileText, Eye, EyeOff, ArrowRight, Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      // auto-login after signup
      await signIn("credentials", { email: formData.email, password: formData.password, redirect: false });
      router.push("/editor");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/30 to-indigo-100/40 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-slate-200/50">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-full mx-auto flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h2>
          <p className="text-slate-600">Join AssignmentAI and start generating assignments</p>
        </div>

        {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm"
            />
            <User className="absolute left-3 top-3.5 text-slate-400" />
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm"
            />
            <Mail className="absolute left-3 top-3.5 text-slate-400" />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm"
            />
            <Lock className="absolute left-3 top-3.5 text-slate-400" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5"
            >
              {showPassword ? <EyeOff className="text-slate-400" /> : <Eye className="text-slate-400" />}
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow hover:shadow-lg transition-all flex justify-center items-center"
          >
            {loading ? "Signing Up..." : "Sign Up"} <ArrowRight className="w-5 h-5 ml-2" />
          </button>

          <div className="text-center text-sm text-slate-500 mt-2">
            Already have an account? <Link className="text-blue-600 font-bold" href="/login">Sign In</Link>
          </div>

          <div className="mt-4 border-t border-slate-300 relative text-center">
            <span className="absolute left-1/2 -top-3 -translate-x-1/2 bg-white px-2 text-slate-500 text-sm">Or continue with</span>
          </div>

          <div className="space-y-2 mt-4">
            <button
              onClick={() => signIn("google",{ callbackUrl: "/editor" })}
              className="w-full bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-slate-700 py-2 font-medium shadow flex justify-center"
            >
              Continue with Google
            </button>
            <button
              onClick={() => signIn("github",{ callbackUrl: "/editor" })}
              className="w-full bg-black hover:bg-slate-900 text-white rounded-xl py-2 font-medium shadow flex justify-center"
            >
              Continue with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
