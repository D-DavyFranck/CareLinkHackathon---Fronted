'use client';

import { useState } from 'react';
import { 
  Users, 
  Activity, 
  Shield, 
  AlertTriangle, 
  Database, 
  Globe,
  Lock,
  BarChart3
} from 'lucide-react';

export default function FeaturesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: Database,
      title: 'Master Patient Index',
      description: 'Link patient records from any facility into a single, accurate view using advanced identity matching algorithms.',
      color: 'blue'
    },
    {
      icon: Activity,
      title: 'Real-Time Surveillance',
      description: 'Monitor symptoms and diagnoses across facilities to spot disease clusters as they emerge.',
      color: 'green'
    },
    {
      icon: AlertTriangle,
      title: 'Outbreak Management',
      description: 'Investigate cases, trace contacts, and coordinate response efforts—all in one unified platform.',
      color: 'red'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Built with strict data protection standards and integrated with IPRS and SHA systems.',
      color: 'purple'
    },
    {
      icon: Users,
      title: 'Healthcare Integration',
      description: 'Seamlessly connect hospitals, clinics, and health centers through standardized FHIR protocols.',
      color: 'indigo'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights and reporting tools for public health officials and policymakers.',
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-100',
        icon: 'text-blue-600',
        hover: 'hover:bg-blue-50',
        border: 'border-blue-200'
      },
      green: {
        bg: 'bg-green-100',
        icon: 'text-green-600',
        hover: 'hover:bg-green-50',
        border: 'border-green-200'
      },
      red: {
        bg: 'bg-red-100',
        icon: 'text-red-600',
        hover: 'hover:bg-red-50',
        border: 'border-red-200'
      },
      purple: {
        bg: 'bg-purple-100',
        icon: 'text-purple-600',
        hover: 'hover:bg-purple-50',
        border: 'border-purple-200'
      },
      indigo: {
        bg: 'bg-indigo-100',
        icon: 'text-indigo-600',
        hover: 'hover:bg-indigo-50',
        border: 'border-indigo-200'
      },
      orange: {
        bg: 'bg-orange-100',
        icon: 'text-orange-600',
        hover: 'hover:bg-orange-50',
        border: 'border-orange-200'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section id="features" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Disease Surveillance
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Our comprehensive system provides the tools needed to detect, monitor, and respond to health threats across Kenya.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            const isHovered = hoveredCard === index;
            
            return (
              <div
                key={index}
                className={`relative p-4 sm:p-6 bg-white rounded-xl border-2 ${colors.border} ${colors.hover} transition-all duration-300 cursor-pointer transform ${
                  isHovered ? 'scale-105 shadow-xl' : 'shadow-md'
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 ${colors.bg} rounded-lg mb-3 sm:mb-4`}>
                  <feature.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.icon}`} />
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover indicator */}
                {isHovered && (
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <div className={`w-2 h-2 ${colors.icon} rounded-full animate-pulse`}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-gray-600 mb-4 px-4">
            Want to see these features in action?
          </p>
          <button
            onClick={() => {
              const element = document.querySelector('#how-it-works');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Learn How It Works
          </button>
        </div>
      </div>
    </section>
  );
}
