"use client"
import { useState } from "react";
import { FileText, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Resources", href: "/resources" },
  ];
  const pathname = usePathname();

  const isActiveLink = (href) => {
    return pathname === href || (pathname.startsWith(href) && href !== "/");
  };

  return (
    <nav className="w-[94%] md:w-[94%] sm:w-full self-center px-4 py-3 mr-3 sm:px-6 lg:px-8 rounded-4xl sticky top-4 z-50 bg-gradient-to-r from-slate-400/20 via-blue-100/80 to-purple-100/80 backdrop-blur-sm border-b border-slate-300/50">
      <div className="max-w-[108rem] mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <Link href="/">
            <span className="text-xl font-bold text-slate-800">AssessmentAI</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          {navItems.map((item) => {
            const isActive = isActiveLink(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? "text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg transition-colors font-medium bg-blue-50"
                    : "text-slate-600 hover:text-slate-800 px-4 py-2 rounded-lg transition-colors font-medium hover:bg-slate-100"
                }
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/login">
            <button className="hidden md:block bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-xl transition-colors font-medium shadow-lg hover:shadow-xl">
              Get started
            </button>
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-200/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-600" />
            ) : (
              <Menu className="w-6 h-6 text-slate-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 w-full bg-white shadow-xl border-t border-slate-200">
          <div className="p-6 space-y-4">
            {navItems.map((item) => {
              const isActive = isActiveLink(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={
                    isActive
                      ? "block w-full text-left text-blue-600 py-4 px-6 text-lg font-medium bg-blue-50 rounded-lg transition-colors"
                      : "block w-full text-left text-slate-800 py-4 px-6 text-lg font-medium hover:bg-slate-100 rounded-lg transition-colors"
                  }
                >
                  {item.name}
                </Link>
              );
            })}
            
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="w-full bg-slate-800 hover:bg-slate-900 text-white px-6 py-4 rounded-xl transition-colors font-medium shadow-lg hover:shadow-xl mt-6 text-lg">
                Get started
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}