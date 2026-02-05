import Link from "next/link";
import { FileText, Home, ArrowLeft, BookOpen, AlertCircle } from "lucide-react";

export default function NotFound() {
  const suggestions = [
    { icon: <Home className="w-5 h-5" />, text: "Go Home", href: "/" },
    { icon: <BookOpen className="w-5 h-5" />, text: "Browse Templates", href: "/dashboard" },
    { icon: <FileText className="w-5 h-5" />, text: "Create Assignment", href: "/editor" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/30 to-indigo-100/40">
      {/* Navigation */}
      <nav className="w-full px-4 py-6 sm:px-6 lg:px-8 bg-gradient-to-r from-white/90 via-blue-50/80 to-purple-50/80 backdrop-blur-sm border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">AssignmentAI</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-slate-600 hover:text-slate-800 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-xl transition-colors font-medium shadow-lg hover:shadow-xl"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* 404 Content */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="max-w-4xl mx-auto text-center">
          {/* Visual */}
          <div className="mb-12 relative">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-red-100 via-orange-50 to-yellow-100 rounded-full border border-red-200/50 shadow-xl mb-8">
              <AlertCircle className="w-16 h-16 text-red-500" />
            </div>
          </div>

          <h1 className="text-7xl font-bold text-slate-900 mb-6">
            4
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              0
            </span>
            4
          </h1>

          <h2 className="text-4xl font-bold text-slate-800 mb-6">
            Oops! Page Not Found
          </h2>

          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            {`The page you're looking for doesn't exist or was moved.`}
          </p>

          {/* Suggestions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
            {suggestions.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border text-center"
              >
                <div className="mb-4 flex justify-center">{item.icon}</div>
                <span className="font-medium text-slate-700 group-hover:text-slate-900">
                  {item.text}
                </span>
              </Link>
            ))}
          </div>

          <Link
            href="/"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition font-bold"
          >
            <ArrowLeft className="w-5 h-5 mr-3" />
            Take Me Home
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-10 text-center text-slate-500">
        © 2025 AssignmentAI. All rights reserved.
      </footer>
    </div>
  );
}
