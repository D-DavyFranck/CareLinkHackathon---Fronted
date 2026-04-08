'use client';

import { useState } from 'react';
import { 
  Hospital, 
  Users, 
  Activity, 
  Shield,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      number: 1,
      icon: Hospital,
      title: 'Connect Facilities',
      description: 'Healthcare facilities across Kenya securely connect to the system through standardized FHIR protocols.',
      details: [
        'Hospitals, clinics, and health centers register',
        'Secure API endpoints established',
        'Data validation and compliance checks'
      ]
    },
    {
      number: 2,
      icon: Users,
      title: 'Match Patient Identities',
      description: 'Our Master Patient Index uses advanced algorithms to link patient records across facilities.',
      details: [
        'Demographic matching with IPRS integration',
        'Probabilistic and deterministic matching',
        'Manual review and verification workflows'
      ]
    },
    {
      number: 3,
      icon: Activity,
      title: 'Monitor Disease Signals',
      description: 'Real-time analysis of patient data to detect unusual patterns and potential outbreaks.',
      details: [
        'Symptom clustering analysis',
        'Geographic hotspot detection',
        'Temporal trend monitoring'
      ]
    },
    {
      number: 4,
      icon: Shield,
      title: 'Alert and Respond',
      description: 'Automatic alerts trigger response protocols for rapid intervention and containment.',
      details: [
        'Multi-level alert notifications',
        'Response team coordination',
        'Resource allocation and tracking'
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A simple four-step process that transforms scattered health data into actionable intelligence.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {steps.map((step, index) => {
            const isActive = activeStep === step.number;
            
            return (
              <div
                key={step.number}
                className={`relative bg-white rounded-xl p-6 border-2 transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'border-blue-500 shadow-xl' 
                    : 'border-gray-200 hover:border-gray-300 shadow-md'
                }`}
                onClick={() => setActiveStep(isActive ? null : step.number)}
              >
                {/* Step Number */}
                <div className="absolute top-4 right-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {step.number}
                  </div>
                </div>

                {/* Icon and Content */}
                <div className="flex items-start space-x-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${
                    isActive ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <step.icon className={`w-6 h-6 ${
                      isActive ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {step.description}
                    </p>

                    {/* Expandable Details */}
                    <div className={`overflow-hidden transition-all duration-300 ${
                      isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="border-t border-gray-200 pt-4">
                        <ul className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-gray-600">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Click indicator */}
                    <div className="flex items-center text-blue-600 text-sm font-medium mt-2">
                      {isActive ? 'Show less' : 'Learn more'}
                      <ArrowRight className={`w-4 h-4 ml-1 transform transition-transform ${
                        isActive ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Flow */}
        <div className="hidden lg:block relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-blue-400 transform -translate-x-1/2"></div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Ready to see the system in action?
          </p>
          <button
            onClick={() => {
              const element = document.querySelector('#user-perspectives');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explore User Perspectives
          </button>
        </div>
      </div>
    </section>
  );
}
