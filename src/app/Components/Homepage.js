"use client"
import React, { useState } from 'react';
import { FileText, Zap, Shield, Settings, ArrowRight, Check, Menu, X } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/navigation';

export default function Homepage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const features = [
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: "Fast Generation",
      description: "Create tailored job interview or internship assessments in seconds with our AI."
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-600" />,
      title: "Realistic Scenarios",
      description: "Get assessments that simulate real-world interview and job task challenges."
    },
    {
      icon: <FileText className="w-6 h-6 text-purple-600" />,
      title: "Multiple Formats",
      description: "Practice with MCQs, coding tasks, case studies, or written interview questions."
    },
    {
      icon: <Settings className="w-6 h-6 text-orange-600" />,
      title: "Easy to Use",
      description: "Simple interface to generate and complete interview assessments effortlessly."
    }
  ];

  const plans = [
    {
      name: "Pre",
      price: "$25",
      period: "/month",
      features: ["5 assessments/month", "Basic templates", "Email support"],
      popular: false
    },
    {
      name: "Mid",
      price: "$50",
      period: "/month",
      features: ["Unlimited assessments", "Premium templates", "Priority support", "Advanced AI"],
      popular: true
    },
    {
      name: "Pro",
      price: "$80",
      period: "/month",
      features: ["Unlimited assessments", "Premium templates", "Priority support", "Advanced AI", "Custom AI models", "24/7 phone support"],
      popular: false
    }
  ];
  // logic
  const [query,setQuery] = useState();
  const [file,setFile] = useState(null);
  const router = useRouter();
  function chatBoxClickHandler(){
       
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50/30 to-indigo-100/40">
      <div className="flex-1">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Let's make your dream a
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> reality. </span>
            Right now.
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            AssessmentAI lets you create high-quality job interview assessments in minutes with just your words.
            No coding necessary.
          </p>

          {/* Chat Interface */}
          <div className="w-full max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-white/80 via-blue-50/60 to-purple-50/60 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-slate-200/50">
              <div className="relative">
                <input
                  type="text"
                  onChange={(e)=>setQuery(e.target.value)}
                  placeholder="What assessment do you need help with?"
                  className="w-full bg-gradient-to-r from-white/95 to-blue-50/90 border border-slate-300/50 rounded-2xl px-8 py-5 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 text-lg shadow-sm"
                />
                <button onClick={chatBoxClickHandler} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-8">
                <p className="text-slate-600 text-base mb-5 font-medium">Not sure where to start? Try one of these:</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {[
                    "Mock Interview for Software Engineer",
                    "Case Study for Business Analyst",
                    "Internship Assessment: Marketing",
                    "Coding Challenge for Frontend Developer",
                    "Behavioral Interview Practice"
                  ].map((suggestion, index) => (
                    <button
                      key={index}
                      className="bg-gradient-to-r from-slate-100/90 to-blue-100/80 hover:from-slate-200/90 hover:to-blue-200/80 text-slate-700 hover:text-slate-900 px-5 py-3 rounded-full text-sm transition-all duration-200 border border-slate-200/50 hover:border-slate-300/50 font-medium shadow-sm hover:shadow-md"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-8 space-x-3 text-slate-500">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 border-3 border-white shadow-lg"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 border-3 border-white shadow-lg"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 border-3 border-white shadow-lg"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 border-3 border-white shadow-lg"></div>
              </div>
              <span className="text-base font-medium">Trusted by 50,000+ candidates</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50/60 via-white/70 to-purple-50/60">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">
            Why Choose AssessmentAI?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/90 via-blue-50/50 to-purple-50/40 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100"
              >
                <div className="mb-6 p-3 bg-gradient-to-br from-slate-50 to-blue-50/80 rounded-xl w-fit shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50/60 via-purple-50/30 to-blue-50/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-slate-600 text-center mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
            Start your interview preparation journey with the perfect plan for your needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-br from-white/90 via-blue-50/50 to-purple-50/40 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border ${
                  plan.popular 
                    ? 'border-blue-400/50 ring-2 ring-blue-400/30' 
                    : 'border-slate-100'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-slate-900">
                      {plan.price}
                    </span>
                    <span className="text-slate-600 ml-1 font-medium">
                      {plan.period}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mr-3">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-slate-700 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    : 'bg-gradient-to-r from-slate-100 to-blue-100/80 hover:from-slate-200 hover:to-blue-200/80 text-slate-800'
                }`} onClick={()=>router.push("/pricing")}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}