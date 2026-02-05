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
    <nav className="w-[94%] md:w-[94%] sm:w-full self-center px-4 py-3 mr-3 sm:px-6 lg:px-8 rounded-4xl sticky top-4 z-50 bg-gradient-to-r from-amber-100/30 via-orange-100/80 to-yellow-100/80 backdrop-blur-sm border-2 border-orange-200/50 shadow-lg">
      <div className="max-w-[108rem] mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <Link href="/">
            <span className="text-xl font-bold text-slate-800">AssessmentAI</span>
          </Link>
        </div>
        
        <div className="hidden md:block">
          {navItems.map((item) => {
            const isActive = isActiveLink(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? "text-orange-700 hover:text-orange-800 px-4 py-2 rounded-lg transition-colors font-medium bg-orange-100"
                    : "text-slate-700 hover:text-slate-900 px-4 py-2 rounded-lg transition-colors font-medium hover:bg-amber-50"
                }
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/login">
            <button className="hidden md:block bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-6 py-2.5 rounded-xl transition-all font-medium shadow-lg hover:shadow-xl">
              Get started
            </button>
          </Link>
          
          <button
            className="md:hidden p-2 rounded-lg hover:bg-orange-100/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 w-full bg-gradient-to-b from-white to-amber-50/30 shadow-xl border-t-2 border-orange-200">
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
                      ? "block w-full text-left text-orange-700 py-4 px-6 text-lg font-medium bg-orange-100 rounded-lg transition-colors"
                      : "block w-full text-left text-slate-800 py-4 px-6 text-lg font-medium hover:bg-amber-50 rounded-lg transition-colors"
                  }
                >
                  {item.name}
                </Link>
              );
            })}
            
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-6 py-4 rounded-xl transition-all font-medium shadow-lg hover:shadow-xl mt-6 text-lg">
                Get started
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}