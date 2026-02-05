"use client"
import React from 'react';
import {
    Users,
    Target,
    Award,
    Zap,
    Heart,
    Globe,
    Lightbulb,
    Shield,
    TrendingUp,
    BookOpen,
    Cpu,
    CheckCircle,
    Briefcase,
    MessageSquare,
    Code,
    FileText
} from 'lucide-react';

export default function About() {
    const stats = [
        { number: "1M+", label: "Interview Assessments Created", icon: <Briefcase className="w-6 h-6" /> },
        { number: "50K+", label: "Job Candidates Helped", icon: <Users className="w-6 h-6" /> },
        { number: "99.5%", label: "Assessment Accuracy Rate", icon: <Target className="w-6 h-6" /> },
        { number: "150+", label: "Companies Trust Us", icon: <Award className="w-6 h-6" /> }
    ];

    const values = [
        {
            icon: <Lightbulb className="w-8 h-8 text-yellow-600" />,
            title: "Innovation",
            description: "We constantly push the boundaries of AI technology to provide cutting-edge interview assessment solutions."
        },
        {
            icon: <Shield className="w-8 h-8 text-blue-600" />,
            title: "Integrity",
            description: "We maintain the highest standards of professional integrity and fair assessment practices."
        },
        {
            icon: <Heart className="w-8 h-8 text-red-600" />,
            title: "Accessibility",
            description: "We believe quality interview preparation should be accessible to every job seeker, everywhere."
        },
        {
            icon: <Globe className="w-8 h-8 text-green-600" />,
            title: "Career Impact",
            description: "We're committed to transforming career preparation through AI-powered interview assessments."
        }
    ];

    return (
        <div className="px-4 py-16 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto text-center mb-20">
                <div className="inline-flex items-center bg-gradient-to-r from-blue-100/80 to-purple-100/80 rounded-full px-6 py-3 mb-8 border border-blue-200/50">
                    <Heart className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-blue-800 font-semibold text-sm">Our Story</span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                    Revolutionizing Interview
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Preparation </span>
                </h1>
                <p className="text-xl sm:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
                    We're on a mission to help job seekers and interns succeed by providing AI-powered interview assessments that simulate real-world scenarios and prepare candidates for career success.
                </p>
            </section>

            {/* Stats Section */}
            <section className="max-w-7xl mx-auto mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-gradient-to-br from-white/90 via-blue-50/50 to-purple-50/40 rounded-3xl p-8 shadow-lg border border-slate-100 text-center">
                            <div className="mb-4 p-3 bg-gradient-to-br from-slate-50 to-blue-50/80 rounded-xl w-fit mx-auto shadow-sm text-blue-600">
                                {stat.icon}
                            </div>
                            <div className="text-3xl font-bold text-slate-900 mb-2">{stat.number}</div>
                            <div className="text-slate-600 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="max-w-7xl mx-auto mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Mission</h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-8 font-medium">
                            To empower job seekers and career changers with AI-powered interview assessments that build confidence, improve performance, and increase success rates in landing their dream jobs.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <CheckCircle className="w-6 h-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">Realistic Practice</h4>
                                    <p className="text-slate-600">Provide authentic interview experiences across all industries</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <CheckCircle className="w-6 h-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">Personalized Feedback</h4>
                                    <p className="text-slate-600">Deliver tailored insights to improve interview performance</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <CheckCircle className="w-6 h-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">Career Success</h4>
                                    <p className="text-slate-600">Bridge the gap between talent and opportunity</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 shadow-2xl transform rotate-3">
                            <MessageSquare className="w-16 h-16 text-white mb-6" />
                            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                            <p className="text-blue-100 leading-relaxed">
                                A world where every job seeker has access to high-quality interview preparation, leveling the playing field and enabling talent to shine regardless of background or experience.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="max-w-7xl mx-auto mb-20">
                <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {values.map((value, index) => (
                        <div key={index} className="bg-gradient-to-br from-white/90 via-blue-50/50 to-purple-50/40 rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
                            <div className="mb-6 p-4 bg-gradient-to-br from-slate-50 to-blue-50/80 rounded-xl w-fit shadow-sm">
                                {value.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">{value.title}</h3>
                            <p className="text-slate-600 leading-relaxed font-medium">{value.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* What We Offer Section */}
            <section className="max-w-7xl mx-auto mb-20">
                <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">What We Offer</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gradient-to-br from-white/90 via-blue-50/50 to-purple-50/40 rounded-3xl p-8 shadow-lg border border-slate-100 text-center hover:shadow-xl transition-all duration-300">
                        <div className="mb-6 p-4 bg-gradient-to-br from-slate-50 to-blue-50/80 rounded-xl w-fit mx-auto shadow-sm">
                            <MessageSquare className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Behavioral Interviews</h3>
                        <p className="text-slate-600 leading-relaxed font-medium">
                            Practice common behavioral questions with AI-generated scenarios tailored to your industry and role.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-white/90 via-blue-50/50 to-purple-50/40 rounded-3xl p-8 shadow-lg border border-slate-100 text-center hover:shadow-xl transition-all duration-300">
                        <div className="mb-6 p-4 bg-gradient-to-br from-slate-50 to-blue-50/80 rounded-xl w-fit mx-auto shadow-sm">
                            <Code className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Technical Assessments</h3>
                        <p className="text-slate-600 leading-relaxed font-medium">
                            Coding challenges, system design questions, and technical problems for software engineering roles.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-white/90 via-blue-50/50 to-purple-50/40 rounded-3xl p-8 shadow-lg border border-slate-100 text-center hover:shadow-xl transition-all duration-300">
                        <div className="mb-6 p-4 bg-gradient-to-br from-slate-50 to-blue-50/80 rounded-xl w-fit mx-auto shadow-sm">
                            <FileText className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Case Studies</h3>
                        <p className="text-slate-600 leading-relaxed font-medium">
                            Business case studies and problem-solving scenarios for consulting, management, and analytical roles.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-4xl mx-auto text-center">
                <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-12 shadow-2xl text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl"></div>
                    <div className="relative z-10">
                        <Briefcase className="w-16 h-16 mx-auto mb-6 text-blue-300" />
                        <h2 className="text-4xl font-bold mb-6">Ready to Ace Your Next Interview?</h2>
                        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                            Join thousands of successful candidates who have used AssessmentAI to land their dream jobs and advance their careers.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="bg-white hover:bg-blue-50 text-slate-900 px-8 py-4 rounded-xl transition-all duration-200 font-bold shadow-lg hover:shadow-xl text-lg">
                                Start Practicing Today
                            </button>
                            <button className="border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-xl transition-all duration-200 font-bold text-lg">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}