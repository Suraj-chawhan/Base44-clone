"use client"
import React, { useState } from 'react';
import {
    Code,
    Zap,
    Shield,
    Copy,
    Check,
    ArrowRight,
    BookOpen,
    Cpu,
    Globe,
    Server,
    Terminal,
    Webhook,
    Key,
    FileCode,
    Play
} from 'lucide-react';

export default function Integration() {
    const [copiedCode, setCopiedCode] = useState(null);
    const [activeTab, setActiveTab] = useState('rest');

    const handleCopyCode = (codeId, code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(codeId);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const integrationOptions = [
        {
            icon: <Globe className="w-8 h-8 text-blue-600" />,
            title: "REST API",
            description: "Full-featured REST API with comprehensive documentation and examples.",
            features: ["Real-time generation", "Multiple formats", "Authentication", "Rate limiting"],
            comingSoon: false
        },
        {
            icon: <Webhook className="w-8 h-8 text-emerald-600" />,
            title: "Webhooks",
            description: "Get notified when assignments are completed with secure webhook endpoints.",
            features: ["Real-time notifications", "Secure payloads", "Retry logic", "Event filtering"],
            comingSoon: false
        },
        {
            icon: <FileCode className="w-8 h-8 text-purple-600" />,
            title: "SDKs",
            description: "Official SDKs for popular programming languages and frameworks.",
            features: ["Python SDK", "Node.js SDK", "PHP SDK", "Go SDK"],
            comingSoon: false
        },
        {
            icon: <Server className="w-8 h-8 text-orange-600" />,
            title: "GraphQL",
            description: "Flexible GraphQL API for advanced querying and data fetching.",
            features: ["Type-safe queries", "Real-time subscriptions", "Schema introspection", "Playground"],
            comingSoon: true
        }
    ];

    const codeExamples = {
        rest: `curl -X POST https://api.assignmentai.com/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Write an essay about climate change",
    "type": "essay",
    "length": "1500",
    "academic_level": "university"
  }'`,

        python: `import requests

api_key = "YOUR_API_KEY"
url = "https://api.assignmentai.com/v1/generate"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

data = {
    "prompt": "Write an essay about climate change",
    "type": "essay",
    "length": "1500",
    "academic_level": "university"
}

response = requests.post(url, headers=headers, json=data)
result = response.json()`,

        javascript: `const response = await fetch('https://api.assignmentai.com/v1/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: 'Write an essay about climate change',
    type: 'essay',
    length: '1500',
    academic_level: 'university'
  })
});

const result = await response.json();`
    };

    const steps = [
        {
            icon: <Key className="w-6 h-6 text-blue-600" />,
            title: "Get API Key",
            description: "Sign up and get your API key from the dashboard"
        },
        {
            icon: <Code className="w-6 h-6 text-emerald-600" />,
            title: "Make Request",
            description: "Use our REST API or SDKs to generate assignments"
        },
        {
            icon: <Check className="w-6 h-6 text-purple-600" />,
            title: "Get Results",
            description: "Receive high-quality, plagiarism-free content"
        }
    ];

    return (
        <div className="px-4 py-16 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto text-center mb-20">
                <div className="inline-flex items-center bg-gradient-to-r from-blue-100/80 to-purple-100/80 rounded-full px-6 py-3 mb-8 border border-blue-200/50">
                    <Cpu className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-blue-800 font-semibold text-sm">Developer API</span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                    Integrate
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AssignmentAI </span>
                    into your app
                </h1>
                <p className="text-xl sm:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
                    Powerful APIs and SDKs to embed AI-powered assignment generation directly into your applications, platforms, and workflows.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl transition-all duration-200 font-bold shadow-lg hover:shadow-xl text-lg flex items-center">
                        <Play className="w-5 h-5 mr-2" />
                        Try API Playground
                    </button>
                    <button className="bg-gradient-to-r from-slate-100/90 to-blue-100/80 hover:from-slate-200/90 hover:to-blue-200/80 text-slate-700 hover:text-slate-900 px-8 py-4 rounded-xl transition-all duration-200 font-bold shadow-lg hover:shadow-xl text-lg border border-slate-200/50">
                        <BookOpen className="w-5 h-5 mr-2" />
                        View Documentation
                    </button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-gradient-to-br from-white/80 via-blue-50/60 to-purple-50/60 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-slate-200/50">
                        <div className="text-3xl font-bold text-slate-900 mb-2">99.9%</div>
                        <div className="text-slate-600 font-medium">API Uptime</div>
                    </div>
                    <div className="bg-gradient-to-br from-white/80 via-blue-50/60 to-purple-50/60 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-slate-200/50">
                        <div className="text-3xl font-bold text-slate-900 mb-2">&lt;200ms</div>
                        <div className="text-slate-600 font-medium">Average Response</div>
                    </div>
                    <div className="bg-gradient-to-br from-white/80 via-blue-50/60 to-purple-50/60 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-slate-200/50">
                        <div className="text-3xl font-bold text-slate-900 mb-2">10M+</div>
                        <div className="text-slate-600 font-medium">API Calls/Month</div>
                    </div>
                </div>
            </section>

            {/* Integration Options */}
            <section className="max-w-7xl mx-auto mb-20">
                <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">
                    Choose Your Integration Method
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {integrationOptions.map((option, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-white/90 via-blue-50/50 to-purple-50/40 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 relative"
                        >
                            {option.comingSoon && (
                                <div className="absolute top-6 right-6">
                                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                        Coming Soon
                                    </span>
                                </div>
                            )}

                            <div className="mb-6 p-4 bg-gradient-to-br from-slate-50 to-blue-50/80 rounded-xl w-fit shadow-sm">
                                {option.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">
                                {option.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed font-medium mb-6">
                                {option.description}
                            </p>
                            <ul className="space-y-3">
                                {option.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center text-slate-700">
                                        <Check className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                                        <span className="font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Code Examples */}
            <section className="max-w-7xl mx-auto mb-20">
                <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">
                    Quick Start Examples
                </h2>

                <div className="bg-gradient-to-br from-white/80 via-blue-50/60 to-purple-50/60 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-slate-200/50">
                    {/* Tab Navigation */}
                    <div className="flex flex-wrap items-center justify-center mb-8 bg-gradient-to-r from-slate-100/80 to-blue-100/60 rounded-2xl p-2">
                        {Object.keys(codeExamples).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${activeTab === tab
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                        : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
                                    }`}
                            >
                                {tab === 'rest' ? 'cURL' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Code Block */}
                    <div className="relative">
                        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 overflow-x-auto">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <button
                                    onClick={() => handleCopyCode(activeTab, codeExamples[activeTab])}
                                    className="flex items-center text-slate-300 hover:text-white transition-colors"
                                >
                                    {copiedCode === activeTab ? (
                                        <Check className="w-4 h-4 mr-2" />
                                    ) : (
                                        <Copy className="w-4 h-4 mr-2" />
                                    )}
                                    {copiedCode === activeTab ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                            <pre className="text-slate-100 text-sm font-mono leading-relaxed whitespace-pre-wrap">
                                {codeExamples[activeTab]}
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="max-w-7xl mx-auto mb-20">
                <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">
                    How It Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center relative">
                            <div className="bg-gradient-to-br from-white/90 via-blue-50/50 to-purple-50/40 rounded-3xl p-8 shadow-lg border border-slate-100 mb-6">
                                <div className="mb-6 p-4 bg-gradient-to-br from-slate-50 to-blue-50/80 rounded-xl w-fit mx-auto shadow-sm">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed font-medium">
                                    {step.description}
                                </p>
                            </div>
                            {index < steps.length - 1 && (
                                <ArrowRight className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 w-6 h-6 text-slate-400" />
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-4xl mx-auto text-center">
                <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-12 shadow-2xl text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl"></div>
                    <div className="relative z-10">
                        <Terminal className="w-16 h-16 mx-auto mb-6 text-blue-300" />
                        <h2 className="text-4xl font-bold mb-6">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                            Join thousands of developers using AssignmentAI API to power their applications.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="bg-white hover:bg-blue-50 text-slate-900 px-8 py-4 rounded-xl transition-all duration-200 font-bold shadow-lg hover:shadow-xl text-lg">
                                Get API Key
                            </button>
                            <button className="border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-xl transition-all duration-200 font-bold text-lg">
                                View Pricing
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}