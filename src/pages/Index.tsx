
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import StatsSection from '@/components/home/StatsSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <div className="animate-fade-in">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <StatsSection />
        <CTASection />
      </div>
    </Layout>
  );
};

export default Index;
