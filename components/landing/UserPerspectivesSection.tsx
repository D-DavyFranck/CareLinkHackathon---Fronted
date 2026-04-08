'use client';

import { useState } from 'react';
import { 
  Hospital, 
  Building, 
  Users, 
  Shield,
  Database,
  Activity,
  AlertTriangle,
  BarChart3
} from 'lucide-react';

export default function UserPerspectivesSection() {
  const [activePerspective, setActivePerspective] = useState<'facilities' | 'officials' | null>(null);

  const perspectives = {
    facilities: {
      title: 'For Hospitals & Clinics',
      subtitle: 'Healthcare Facility Partners',
      icon: Hospital,
      color: 'blue',
      description: 'Seamlessly contribute to national disease surveillance while improving patient care.',
      benefits: [
        {
          icon: Database,
          title: 'Unified Patient Records',
          description: 'Access complete patient histories across facilities, reducing duplicate tests and improving diagnosis accuracy.'
        },
        {
          icon: Shield,
          title: 'Secure Data Sharing',
          description: 'Share patient data securely through FHIR protocols with full compliance with Kenyan data protection regulations.'
        },
        {
          icon: Activity,
          title: 'Real-time Insights',
          description: 'Receive immediate alerts about disease patterns in your catchment area for proactive patient care.'
        },
        {
          icon: Users,
          title: 'Improved Coordination',
          description: 'Collaborate with other facilities and public health officials for coordinated response to outbreaks.'
        }
      ],
      cta: 'Start Connecting Your Facility'
    },
    officials: {
      title: 'For Public Health Officials',
      subtitle: 'County & National Health Management',
      icon: Building,
      color: 'green',
      description: 'Comprehensive surveillance tools for effective public health decision-making.',
      benefits: [
        {
          icon: AlertTriangle,
          title: 'Early Warning System',
          description: 'Detect disease outbreaks up to 3x faster than traditional surveillance methods.'
        },
        {
          icon: BarChart3,
          title: 'Data-driven Decisions',
          description: 'Access real-time analytics and dashboards for evidence-based policy decisions.'
        },
        {
          icon: Activity,
          title: 'Resource Optimization',
          description: 'Allocate medical resources efficiently based on real-time disease burden data.'
        },
        {
          icon: Shield,
          title: 'Integrated Response',
          description: 'Coordinate multi-agency response efforts with unified communication and task management.'
        }
      ],
      cta: 'Request System Access'
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700',
        accent: 'text-blue-800'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'text-green-600',
        button: 'bg-green-600 hover:bg-green-700',
        accent: 'text-green-800'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section id="user-perspectives" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Designed for Every Healthcare Role
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tailored experiences that meet the unique needs of different healthcare stakeholders.
          </p>
        </div>

        {/* Perspective Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(perspectives).map(([key, perspective]) => {
            const colors = getColorClasses(perspective.color);
            const isActive = activePerspective === key;
            
            return (
              <div
                key={key}
                className={`relative rounded-xl border-2 transition-all duration-300 ${
                  isActive 
                    ? `${colors.border} shadow-xl` 
                    : 'border-gray-200 hover:border-gray-300 shadow-lg'
                }`}
              >
                {/* Header */}
                <div className={`p-6 ${colors.bg} rounded-t-xl border-b ${colors.border}`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 bg-white rounded-lg`}>
                      <perspective.icon className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {perspective.title}
                      </h3>
                      <p className={`text-sm ${colors.accent}`}>
                        {perspective.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    {perspective.description}
                  </p>
                </div>

                {/* Benefits */}
                <div className="p-6">
                  <div className="space-y-4">
                    {perspective.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`p-2 ${colors.bg} rounded-lg flex-shrink-0`}>
                          <benefit.icon className={`w-4 h-4 ${colors.icon}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {benefit.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="mt-6">
                    <button
                      onClick={() => setActivePerspective(isActive ? null : key as 'facilities' | 'officials')}
                      className={`w-full px-6 py-3 ${colors.button} text-white font-medium rounded-lg transition-colors`}
                    >
                      {perspective.cta}
                    </button>
                  </div>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute top-4 right-4">
                    <div className={`w-3 h-3 ${colors.icon} rounded-full animate-pulse`}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Integration Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-blue-50 rounded-lg">
            <Shield className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-800 font-medium">
              Both roles seamlessly integrate with Kenya's existing health infrastructure
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
