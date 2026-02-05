"use client"
import React, { useState } from 'react';
import {
    Mail,
    Phone,
    MapPin,
    Send,
    MessageSquare,
    Headphones,
    Clock,
    Globe,
    Users,
    Building,
    Zap,
    CheckCircle,
    ArrowRight,
    Calendar,
    FileText
} from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        subject: '',
        category: 'general',
        message: '',
        priority: 'normal'
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    const contactMethods = [
        {
            icon: <Mail className="w-8 h-8 text-blue-600" />,
            title: "Email Support",
            description: "Get help via email within 24 hours",
            contact: "support@assignmentai.com",
            availability: "24/7 response",
            action: "Send Email"
        },
        {
            icon: <Phone className="w-8 h-8 text-green-600" />,
            title: "Phone Support",
            description: "Talk to our experts directly",
            contact: "+1 (555) 123-4567",
            availability: "Mon-Fri, 9AM-6PM PST",
            action: "Call Now"
        }
    ];

    const supportCategories = [
        { value: 'general', label: 'General Inquiry' },
        { value: 'technical', label: 'Technical Support' },
        { value: 'billing', label: 'Billing & Payments' },
        { value: 'enterprise', label: 'Enterprise Sales' },
        { value: 'partnership', label: 'Partnership' },
        { value: 'feedback', label: 'Feedback' }
    ];

    return (
        <div className="px-4 py-16 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto text-center mb-20">
                <div className="inline-flex items-center bg-gradient-to-r from-blue-100/80 to-purple-100/80 rounded-full px-6 py-3 mb-8 border border-blue-200/50">
                    <Headphones className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-blue-800 font-semibold text-sm">Get In Touch</span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                    Contact
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Our Team </span>
                </h1>
                <p className="text-xl sm:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
                    We're here to help! Whether you have questions, need support, or want to explore enterprise solutions, our team is ready to assist you.
                </p>
            </section>

            {/* Contact Methods */}
            <section className="max-w-7xl mx-auto mb-20">
                <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">How Can We Help?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {contactMethods.map((method, index) => (
                        <div key={index} className="bg-gradient-to-br from-white/90 via-blue-50/50 to-purple-50/40 rounded-3xl p-8 shadow-lg border border-slate-100 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="mb-6 p-4 bg-gradient-to-br from-slate-50 to-blue-50/80 rounded-xl w-fit mx-auto shadow-sm">
                                {method.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{method.title}</h3>
                            <p className="text-slate-600 mb-4 font-medium">{method.description}</p>
                            <div className="text-sm text-slate-700 font-semibold mb-2">{method.contact}</div>
                            <div className="text-xs text-slate-500 mb-6">{method.availability}</div>
                            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-bold transition-all duration-200 text-sm">
                                {method.action}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Form */}
            <section className="max-w-4xl mx-auto mb-20">
                <div className="bg-gradient-to-br from-white/90 via-blue-50/50 to-purple-50/40 rounded-3xl p-8 shadow-xl border border-slate-100">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Send Us a Message</h2>
                        <p className="text-lg text-slate-600">Fill out the form below and we'll get back to you as soon as possible.</p>
                    </div>

                    {isSubmitted ? (
                        <div className="text-center py-12">
                            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                            <p className="text-slate-600">Thank you for contacting us. We'll respond within 24 hours.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Company</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Your company name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Category *</label>
                                    <select
                                        name="category"
                                        required
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        {supportCategories.map((category) => (
                                            <option key={category.value} value={category.value}>
                                                {category.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Subject *</label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Brief description of your inquiry"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Priority</label>
                                <div className="flex space-x-4">
                                    {['low', 'normal', 'high', 'urgent'].map((priority) => (
                                        <label key={priority} className="flex items-center">
                                            <input
                                                type="radio"
                                                name="priority"
                                                value={priority}
                                                checked={formData.priority === priority}
                                                onChange={handleInputChange}
                                                className="mr-2"
                                            />
                                            <span className="text-sm font-medium text-slate-700 capitalize">{priority}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Message *</label>
                                <textarea
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    placeholder="Please provide details about your inquiry..."
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center text-lg"
                            >
                                <Send className="w-5 h-5 mr-2" />
                                Send Message
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Support Hours */}
            <section className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-8 text-white">
                    <div className="text-center mb-8">
                        <Clock className="w-12 h-12 mx-auto mb-4 text-blue-300" />
                        <h2 className="text-3xl font-bold mb-4">Support Hours</h2>
                        <p className="text-blue-100">We're here when you need us across multiple time zones</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div>
                            <h4 className="font-bold mb-2">Americas (PST)</h4>
                            <p className="text-blue-100">Mon-Fri: 6AM - 6PM</p>
                            <p className="text-blue-100">Sat-Sun: 8AM - 4PM</p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-2">Europe (GMT)</h4>
                            <p className="text-blue-100">Mon-Fri: 8AM - 8PM</p>
                            <p className="text-blue-100">Sat-Sun: 10AM - 6PM</p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-2">Asia-Pacific (SGT)</h4>
                            <p className="text-blue-100">Mon-Fri: 9AM - 9PM</p>
                            <p className="text-blue-100">Sat-Sun: 11AM - 7PM</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}