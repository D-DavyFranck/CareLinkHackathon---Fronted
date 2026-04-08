'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Phone, Building, User, Shield } from 'lucide-react';

export default function CallToActionSection() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    role: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        organization: '',
        email: '',
        phone: '',
        role: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Help Safeguard Kenya's Health?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto px-4">
            Join the growing network of healthcare facilities and public health officials using data to save lives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Quick Actions */}
          <div className="space-y-6 sm:space-y-8">
            {/* Sign In CTA */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                Already Have Access?
              </h3>
              <p className="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base">
                Sign in to access your dashboard and start monitoring disease surveillance data.
              </p>
              <Link
                href="/auth/signin"
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base"
              >
                <span className="hidden sm:inline">Sign In to Dashboard</span>
                <span className="sm:hidden">Sign In</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            {/* Contact Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                Get in Touch
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-200 flex-shrink-0" />
                  <span className="text-blue-100 text-sm sm:text-base break-all">info@carelinkkenya.health.go.ke</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-200 flex-shrink-0" />
                  <span className="text-blue-100 text-sm sm:text-base">+254 20 271 7070</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="w-4 h-4 sm:w-5 sm:h-5 text-blue-200 flex-shrink-0" />
                  <span className="text-blue-100 text-sm sm:text-base">Ministry of Health, Nairobi</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border border-white/20">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                <span className="text-xs sm:text-sm text-white">Government Approved</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border border-white/20">
                <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                <span className="text-xs sm:text-sm text-white">500+ Users</span>
              </div>
            </div>
          </div>

          {/* Right Column - Request Access Form */}
          <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Request System Access
            </h3>

            {isSubmitted ? (
              <div className="text-center py-6 sm:py-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  Request Submitted!
                </h4>
                <p className="text-sm sm:text-base text-gray-600 px-4">
                  We'll contact you within 24 hours to discuss your access requirements.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Dr. Jane Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                      Organization *
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      required
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Kenya Medical Association"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="jane.smith@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="+254 7XX XXX XXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Role *
                  </label>
                  <select
                    id="role"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="">Select your role</option>
                    <option value="healthcare-provider">Healthcare Provider</option>
                    <option value="public-health-official">Public Health Official</option>
                    <option value="hospital-administrator">Hospital Administrator</option>
                    <option value="it-manager">IT Manager</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    How will you use the system?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Tell us about your use case and requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 sm:px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isSubmitting ? 'Submitting...' : 'Request Access'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
