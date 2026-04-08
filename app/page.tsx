import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import UserPerspectivesSection from '@/components/landing/UserPerspectivesSection';
import StatisticsSection from '@/components/landing/StatisticsSection';
import CallToActionSection from '@/components/landing/CallToActionSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <UserPerspectivesSection />
        <StatisticsSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}
