import React from 'react';
import { FileText, Home, ArrowLeft, BookOpen, AlertCircle } from 'lucide-react';

export default function NotFound() {
  const suggestions = [
    { icon: <Home className="w-5 h-5" />, text: "Go Home", href: "/" },
    { icon: <BookOpen className="w-5 h-5" />, text: "Browse Templates", href: "/dashboard" },
    { icon: <FileText className="w-5 h-5" />, text: "Create Assignment", href: "/editor" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/30 to-indigo-100/40">
      {/* Navigation */}
      <nav className="w-full px-4 py-6 sm:px-6 lg:px-8 bg-gradient-to-r from-white/90 via-blue-50/80 to-purple-50/80 backdrop-blur-sm border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">AssignmentAI</span>
          </a>
          <div className="flex items-center space-x-4">
            <button className="text-slate-600 hover:text-slate-800 px-4 py-2 rounded-lg transition-colors font-medium">
              Login
            </button>
            <button className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-xl transition-colors font-medium shadow-lg hover:shadow-xl">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* 404 Content */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Visual */}
          <div className="mb-12 relative">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-red-100 via-orange-50 to-yellow-100 rounded-full border border-red-200/50 shadow-xl mb-8">
              <AlertCircle className="w-16 h-16 text-red-500" />
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce opacity-60"></div>
            <div className="absolute -bottom-2 -left-6 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse opacity-50"></div>
          </div>

          {/* Error Message */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-slate-900 mb-6 leading-tight">
            4
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">0</span>
            4
          </h1>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
            Oops! Page Not Found
          </h2>
          
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            The page you're looking for seems to have vanished into the digital void. 
            Don't worry though - we'll help you get back on track!
          </p>

          {/* Action Buttons */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-white/80 via-blue-50/60 to-purple-50/60 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-slate-200/50">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Where would you like to go?</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {suggestions.map((suggestion, index) => (
                  <a
                    key={index}
                    href={suggestion.href}
                    className="group bg-gradient-to-br from-white/90 via-blue-50/50 to-purple-50/40 hover:from-blue-50/80 hover:via-purple-50/60 hover:to-indigo-50/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 text-center"
                  >
                    <div className="mb-4 p-3 bg-gradient-to-br from-slate-50 to-blue-50/80 rounded-xl w-fit mx-auto shadow-sm group-hover:scale-110 transition-transform duration-200">
                      {suggestion.icon}
                    </div>
                    <span className="text-slate-700 group-hover:text-slate-900 font-medium transition-colors">
                      {suggestion.text}
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200/50">
                <a
                  href="/"
                  className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg font-bold text-lg"
                >
                  <ArrowLeft className="w-5 h-5 mr-3" />
                  Take Me Home
                </a>
              </div>
            </div>
          </div>

          {/* Support Message */}
          <div className="mt-16 p-6 bg-gradient-to-r from-blue-50/80 via-purple-50/60 to-indigo-50/70 rounded-2xl border border-blue-200/50 max-w-2xl mx-auto">
            <p className="text-slate-700 font-medium">
              Still can't find what you're looking for? 
              <a href="/contact" className="text-blue-600 hover:text-blue-700 font-bold ml-2 underline decoration-blue-200 hover:decoration-blue-300 underline-offset-2">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-white/90 via-blue-50/60 to-purple-50/60 backdrop-blur-sm border-t border-slate-200/50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <a href="/" className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-900 text-lg">AssignmentAI</span>
            </a>
            <div className="flex items-center space-x-8">
              <a href="/about" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
                About
              </a>
              <a href="/contact" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
                Contact
              </a>
              <a href="/privacy" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
                Privacy
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-200/50 text-center">
            <p className="text-slate-500 font-medium">
              © 2025 AssignmentAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}