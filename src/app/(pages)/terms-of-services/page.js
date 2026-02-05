"use client"
import React from 'react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/30 to-indigo-100/40">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Terms of
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Service</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Please read these terms carefully before using AssessmentAI
          </p>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-br from-white/80 via-blue-50/60 to-purple-50/60 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-slate-200/50">
          <div className="prose prose-slate max-w-none">
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-700 leading-relaxed font-medium mb-4">
                By accessing and using AssessmentAI, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Service</h2>
              <p className="text-slate-700 leading-relaxed font-medium mb-4">
                AssessmentAI is an AI-powered platform that helps users create and practice job interview assessments. 
                Our service includes generating custom interview questions, coding challenges, case studies, and other 
                assessment materials for interview preparation purposes.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. User Accounts</h2>
              <p className="text-slate-700 leading-relaxed font-medium mb-4">
                To access certain features of our service, you may be required to create an account. You are responsible 
                for maintaining the confidentiality of your account credentials and for all activities that occur under 
                your account.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Acceptable Use</h2>
              <p className="text-slate-700 leading-relaxed font-medium mb-4">
                You agree to use AssessmentAI only for lawful purposes and in accordance with these Terms. You shall not:
              </p>
              <ul className="list-disc pl-6 text-slate-700 font-medium space-y-2">
                <li>Use the service for any illegal or unauthorized purpose</li>
                <li>Violate any local, state, national, or international law</li>
                <li>Interfere with or disrupt the service or servers</li>
                <li>Attempt to gain unauthorized access to any part of the service</li>
                <li>Share generated content that violates intellectual property rights</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Payment and Billing</h2>
              <p className="text-slate-700 leading-relaxed font-medium mb-4">
                Subscription fees are billed in advance on a monthly basis. All fees are non-refundable except as 
                required by law. We reserve the right to change our pricing at any time with 30 days notice.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Intellectual Property</h2>
              <p className="text-slate-700 leading-relaxed font-medium mb-4">
                The service and its original content, features, and functionality are owned by AssessmentAI and are 
                protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Privacy Policy</h2>
              <p className="text-slate-700 leading-relaxed font-medium mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the 
                service, to understand our practices.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-slate-700 leading-relaxed font-medium mb-4">
                AssessmentAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Termination</h2>
              <p className="text-slate-700 leading-relaxed font-medium mb-4">
                We may terminate or suspend your account and bar access to the service immediately, without prior notice 
                or liability, under our sole discretion, for any reason whatsoever including breach of Terms.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Changes to Terms</h2>
              <p className="text-slate-700 leading-relaxed font-medium mb-4">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will 
                provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Contact Information</h2>
              <p className="text-slate-700 leading-relaxed font-medium mb-4">
                If you have any questions about these Terms of Service, please contact us at legal@assessmentai.com
              </p>
            </div>

            <div className="text-center mt-12 pt-8 border-t border-slate-200">
              <p className="text-slate-500 font-medium">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}