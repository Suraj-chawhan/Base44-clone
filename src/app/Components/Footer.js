import { FileText } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-white/90 via-amber-50/60 to-orange-50/60 backdrop-blur-sm border-t-2 border-orange-200/50 px-4 py-8 sm:py-12 sm:px-6 lg:px-8 w-full">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center justify-center md:justify-start space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                            <FileText className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-slate-900 text-lg">AssessmentAI</span>
                    </div>
                    <div className="flex items-center justify-center space-x-4 sm:space-x-8">
                        <a href="/about" className="text-slate-700 hover:text-orange-700 transition-colors font-medium text-sm sm:text-base">
                            About
                        </a>
                        <a href="/contact" className="text-slate-700 hover:text-orange-700 transition-colors font-medium text-sm sm:text-base">
                            Contact
                        </a>
                        <a href="/privacy" className="text-slate-700 hover:text-orange-700 transition-colors font-medium text-sm sm:text-base">
                            Privacy
                        </a>
                    </div>
                </div>
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-orange-200/50 text-center">
                    <p className="text-slate-600 font-medium text-sm sm:text-base">
                        © 2025 AssessmentAI. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}