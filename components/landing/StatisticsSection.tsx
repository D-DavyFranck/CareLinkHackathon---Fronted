'use client';

import { useState, useEffect } from 'react';
import { 
  Hospital, 
  Users, 
  Activity, 
  TrendingUp,
  Shield,
  Clock,
  MapPin,
  Database
} from 'lucide-react';

export default function StatisticsSection() {
  const [mounted, setMounted] = useState(false);
  const [visibleStats, setVisibleStats] = useState<Set<number>>(new Set());

  useEffect(() => {
    setMounted(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleStats((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-stat-index]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const statistics = [
    {
      icon: Hospital,
      value: '150+',
      label: 'Healthcare Facilities Connected',
      description: 'Hospitals, clinics, and health centers across all 47 counties',
      color: 'blue',
      target: 150,
      suffix: '+'
    },
    {
      icon: Users,
      value: '500K+',
      label: 'Patients Deduplicated',
      description: 'Unique patient identities resolved through Master Patient Index',
      color: 'green',
      target: 500,
      suffix: 'K+'
    },
    {
      icon: Activity,
      value: '3x',
      label: 'Faster Outbreak Detection',
      description: 'Compared to traditional surveillance methods',
      color: 'red',
      target: 3,
      suffix: 'x'
    },
    {
      icon: Shield,
      value: '99.9%',
      label: 'System Uptime',
      description: 'Reliable 24/7 availability for critical health monitoring',
      color: 'purple',
      target: 99.9,
      suffix: '%'
    },
    {
      icon: Clock,
      value: '< 5min',
      label: 'Alert Response Time',
      description: 'Average time from detection to notification',
      color: 'orange',
      target: 5,
      suffix: 'min'
    },
    {
      icon: MapPin,
      value: '47',
      label: 'Counties Covered',
      description: 'Complete national coverage from Mombasa to Turkana',
      color: 'indigo',
      target: 47,
      suffix: ''
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-100', icon: 'text-blue-600', text: 'text-blue-800' },
      green: { bg: 'bg-green-100', icon: 'text-green-600', text: 'text-green-800' },
      red: { bg: 'bg-red-100', icon: 'text-red-600', text: 'text-red-800' },
      purple: { bg: 'bg-purple-100', icon: 'text-purple-600', text: 'text-purple-800' },
      orange: { bg: 'bg-orange-100', icon: 'text-orange-600', text: 'text-orange-800' },
      indigo: { bg: 'bg-indigo-100', icon: 'text-indigo-600', text: 'text-indigo-800' }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const AnimatedNumber = ({ 
    target, 
    suffix, 
    duration = 2000,
    decimals = false 
  }: { 
    target: number; 
    suffix: string; 
    duration?: number;
    decimals?: boolean;
  }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
      if (!mounted) return;
      
      const increment = target / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCurrent(current);
      }, 16);

      return () => clearInterval(timer);
    }, [target, duration, mounted]);

    return (
      <span>
        {decimals ? current.toFixed(1) : Math.floor(current)}
        {suffix}
      </span>
    );
  };

  return (
    <section id="statistics" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real Impact Across Kenya
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Numbers that demonstrate our commitment to protecting public health through technology.
          </p>
        </div>

        {/* Main Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {statistics.map((stat, index) => {
            const colors = getColorClasses(stat.color);
            const isVisible = visibleStats.has(index);
            
            return (
              <div
                key={index}
                data-stat-index={index}
                className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 ${colors.bg} rounded-lg mb-4`}>
                  <stat.icon className={`w-6 h-6 ${colors.icon}`} />
                </div>

                {/* Value */}
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {isVisible ? (
                    <AnimatedNumber 
                      target={stat.target} 
                      suffix={stat.suffix}
                      decimals={stat.suffix.includes('.')}
                    />
                  ) : (
                    '0'
                  )}
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Impact Summary */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Database className="w-8 h-8 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-1">10M+</div>
              <div className="text-blue-100">Health Records Processed</div>
            </div>
            <div>
              <Activity className="w-8 h-8 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-1">24/7</div>
              <div className="text-blue-100">Real-time Monitoring</div>
            </div>
            <div>
              <TrendingUp className="w-8 h-8 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-1">85%</div>
              <div className="text-blue-100">Reduction in Response Time</div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-blue-600" />
              <span>IPRS Integrated</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-purple-600" />
              <span>SHA Connected</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
