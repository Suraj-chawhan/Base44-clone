"use client"
import React from 'react';
import { BookOpen, FileText, Video, Users, Download, ExternalLink, Zap, Shield, Settings } from 'lucide-react';

export default function Resources() {
  const resourceCategories = [
    {
      title: "Interview Guides",
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      resources: [
        { name: "Software Engineer Interview Guide", type: "PDF", size: "2.4 MB" },
        { name: "Data Science Interview Prep", type: "PDF", size: "1.8 MB" },
        { name: "Product Manager Interview Strategy", type: "PDF", size: "3.1 MB" },
        { name: "Behavioral Interview Framework", type: "PDF", size: "1.2 MB" }
      ]
    },
    {
      title: "Video Tutorials",
      icon: <Video className="w-6 h-6 text-emerald-600" />,
      resources: [
        { name: "Getting Started with AssessmentAI", type: "Video", duration: "8:45" },
        { name: "Creating Custom Assessments", type: "Video", duration: "12:30" },
        { name: "Interview Best Practices", type: "Video", duration: "15:20" },
        { name: "Advanced AI Features", type: "Video", duration: "10:15" }
      ]
    },
    {
      title: "Templates",
      icon: <FileText className="w-6 h-6 text-purple-600" />,
      resources: [
        { name: "Technical Interview Template", type: "Template", questions: "50+" },
        { name: "Case Study Template", type: "Template", questions: "25+" },
        { name: "Coding Challenge Template", type: "Template", questions: "30+" },
        { name: "Leadership Interview Template", type: "Template", questions: "40+" }
      ]
    },
    {
      title: "Community",
      icon: <Users className="w-6 h-6 text-orange-600" />,
      resources: [
        { name: "Discord Community", type: "Community", members: "5,000+" },
        { name: "LinkedIn Group", type: "Community", members: "8,500+" },
        { name: "Reddit Community", type: "Community", members: "3,200+" },
        { name: "Slack Workspace", type: "Community", members: "2,100+" }
      ]
    }
  ];

  const tips = [
    {
      icon: <Zap className="w-5 h-5 text-blue-600" />,
      title: "Quick Tip",
      content: "Use specific job descriptions when generating assessments for more targeted practice."
    },
    {
      icon: <Shield className="w-5 h-5 text-emerald-600" />,
      title: "Pro Tip",
      content: "Practice with multiple assessment formats to prepare for various interview styles."
    },
    {
      icon: <Settings className="w-5 h-5 text-purple-600" />,
      title: "Expert Tip",
      content: "Review your assessment results and focus on areas where you need improvement."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/30 to-indigo-100/40">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Learning
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Resources</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Everything you need to master your interview preparation journey
          </p>
        </div>

        {/* Quick Tips */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">Quick Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tips.map((tip, index) => (
              <div key={index} className="bg-gradient-to-br from-white/80 via-blue-50/60 to-purple-50/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-slate-200/50">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-gradient-to-br from-slate-50 to-blue-50/80 rounded-lg mr-3">
                    {tip.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{tip.title}</h3>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resource Categories */}
        <div className="space-y-12">
          {resourceCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-br from-slate-50 to-blue-50/80 rounded-xl mr-4 shadow-sm">
                  {category.icon}
                </div>
                <h2 className="text-3xl font-bold text-slate-900">{category.title}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.resources.map((resource, resourceIndex) => (
                  <div key={resourceIndex} className="bg-gradient-to-br from-white/80 via-blue-50/60 to-purple-50/60 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200/50">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-slate-900 leading-tight">{resource.name}</h3>
                      <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                        {resource.type}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-slate-600 font-medium">
                        {resource.size && `Size: ${resource.size}`}
                        {resource.duration && `Duration: ${resource.duration}`}
                        {resource.questions && `${resource.questions} Questions`}
                        {resource.members && `${resource.members} Members`}
                      </div>
                      <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg">
                        {category.title === "Community" ? (
                          <>
                            <ExternalLink className="w-4 h-4" />
                            <span>Join</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            <span>Access</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-20">
          <div className="bg-gradient-to-br from-white/80 via-blue-50/60 to-purple-50/60 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-slate-200/50 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Need More Help?</h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
              {`Can't find what you're looking for? Our support team is here to help you succeed.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Contact Support
              </button>
              <button className="bg-gradient-to-r from-slate-100 to-blue-100/80 hover:from-slate-200 hover:to-blue-200/80 text-slate-800 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}