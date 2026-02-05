"use client";
import React from "react";
import { Shield, Eye, Lock, Users, Database, Globe } from "lucide-react";

export default function PrivacyPolicy() {
  const highlights = [
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Data Protection",
      description: "Your personal information is encrypted and securely stored.",
    },
    {
      icon: <Eye className="w-6 h-6 text-emerald-600" />,
      title: "Transparency",
      description: "Clear information about what data we collect and why.",
    },
    {
      icon: <Lock className="w-6 h-6 text-purple-600" />,
      title: "Your Control",
      description: "You have full control over your data and privacy settings.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/30 to-indigo-100/40 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/80 via-blue-50/60 to-purple-50/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-slate-200/50 text-center"
            >
              <div className="mb-4 p-3 bg-gradient-to-br from-slate-50 to-blue-50/80 rounded-xl w-fit mx-auto shadow-sm">
                {highlight.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {highlight.title}
              </h3>
              <p className="text-slate-700 font-medium">{highlight.description}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-br from-white/80 via-blue-50/60 to-purple-50/60 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-slate-200/50 prose prose-slate max-w-none">
          {/* Information We Collect */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
              <Database className="w-6 h-6 text-blue-600 mr-3" />
              Information We Collect
            </h2>
            <p className="text-slate-700 leading-relaxed font-medium mb-4">
              We collect information you provide directly to us, such as when
              you create an account, use our services, or contact us for support.
            </p>
            <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/60 rounded-xl p-6 mb-4">
              <h4 className="font-bold text-slate-900 mb-3">Personal Information:</h4>
              <ul className="list-disc pl-6 text-slate-700 font-medium space-y-1">
                <li>Name and email address</li>
                <li>Account credentials</li>
                <li>Payment information (processed securely by third parties)</li>
                <li>Profile information and preferences</li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-emerald-50/80 to-blue-50/60 rounded-xl p-6">
              <h4 className="font-bold text-slate-900 mb-3">Usage Information:</h4>
              <ul className="list-disc pl-6 text-slate-700 font-medium space-y-1">
                <li>Assessment data and responses</li>
                <li>Platform usage and interaction data</li>
                <li>Device information and IP address</li>
                <li>Performance and analytics data</li>
              </ul>
            </div>
          </div>

          {/* How We Use Info */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
              <Globe className="w-6 h-6 text-emerald-600 mr-3" />
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 text-slate-700 font-medium space-y-2">
              <li>Provide and personalize our AI-powered services</li>
              <li>Process payments and manage accounts</li>
              <li>Communicate with you about services</li>
              <li>Analyze usage patterns and improve platform</li>
              <li>Detect and prevent fraud/abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          {/* Sharing Info */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
              <Users className="w-6 h-6 text-purple-600 mr-3" />
              Information Sharing
            </h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50/80 to-blue-50/60 rounded-xl p-6">
                <h4 className="font-bold text-slate-900 mb-2">Service Providers</h4>
                <p className="text-slate-700 font-medium">
                  We work with trusted providers who help operate our platform,
                  process payments, and analyze data.
                </p>
              </div>
              <div className="bg-gradient-to-r from-orange-50/80 to-purple-50/60 rounded-xl p-6">
                <h4 className="font-bold text-slate-900 mb-2">Legal Requirements</h4>
                <p className="text-slate-700 font-medium">
                  We may disclose information if required by law or to protect
                  rights, property, or safety.
                </p>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
              <Lock className="w-6 h-6 text-orange-600 mr-3" />
              Data Security
            </h2>
            <ul className="list-disc pl-6 text-slate-700 font-medium space-y-2">
              <li>End-to-end encryption for sensitive data</li>
              <li>Secure servers with regular updates</li>
              <li>Access controls & authentication measures</li>
              <li>Regular audits and monitoring</li>
              <li>Compliance with security standards</li>
            </ul>
          </div>

          {/* Rights */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Rights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50/80 to-purple-50/60 rounded-xl p-4">
                <h4 className="font-bold text-slate-900 mb-2">Access & Portability</h4>
                <p className="text-slate-700 text-sm font-medium">
                  Request a copy of your personal data
                </p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50/80 to-blue-50/60 rounded-xl p-4">
                <h4 className="font-bold text-slate-900 mb-2">Correction</h4>
                <p className="text-slate-700 text-sm font-medium">
                  Update or correct inaccurate information
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50/80 to-pink-50/60 rounded-xl p-4">
                <h4 className="font-bold text-slate-900 mb-2">Deletion</h4>
                <p className="text-slate-700 text-sm font-medium">
                  Request deletion of personal data (with exceptions)
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-50/80 to-purple-50/60 rounded-xl p-4">
                <h4 className="font-bold text-slate-900 mb-2">Opt-out</h4>
                <p className="text-slate-700 text-sm font-medium">
                  Unsubscribe from marketing communications anytime
                </p>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Cookies</h2>
            <p className="text-slate-700 font-medium">
              We use cookies and similar technologies to improve your experience.
              You can manage preferences in your browser.
            </p>
          </div>

          {/* International */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              International Data Transfers
            </h2>
            <p className="text-slate-700 font-medium">
              Your information may be transferred internationally with safeguards in
              place to protect your data.
            </p>
          </div>

          {/* Children */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Children's Privacy
            </h2>
            <p className="text-slate-700 font-medium">
              Our service is not directed to individuals under 16. We do not
              knowingly collect their data. If you believe a child has provided
              us information, please contact us.
            </p>
          </div>

          {/* Changes */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Changes to This Policy
            </h2>
            <p className="text-slate-700 font-medium">
              We may update this Privacy Policy. Updates will be posted here with
              the new "Last Updated" date.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
            <div className="bg-gradient-to-r from-slate-50/80 to-blue-50/60 rounded-xl p-6">
              <p className="text-slate-700 font-medium mb-2">
                <strong>Email:</strong> privacy@assessmentai.com
              </p>
              <p className="text-slate-700 font-medium mb-2">
                <strong>Address:</strong> 123 AI Street, Tech City, TC 12345
              </p>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center mt-12 pt-8 border-t border-slate-200">
          <p className="text-slate-500 font-medium">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
