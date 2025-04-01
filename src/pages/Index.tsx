
import React, { useEffect, useRef } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import StatsSection from '@/components/home/StatsSection';
import CTASection from '@/components/home/CTASection';
import { useInView } from 'react-intersection-observer';
import ParticlesBackground from '@/components/effects/ParticlesBackground';

const Index = () => {
  const [featuresRef, featuresInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [howItWorksRef, howItWorksInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.2, triggerOnce: true });
  
  return (
    <Layout>
      <div className="relative overflow-hidden">
        <ParticlesBackground />
        
        <div className="relative z-10">
          <HeroSection />
        </div>
        
        <div 
          ref={featuresRef} 
          className={`relative z-10 transition-all duration-1000 transform ${featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <FeaturesSection />
        </div>
        
        <div 
          ref={howItWorksRef} 
          className={`relative z-10 transition-all duration-1000 transform ${howItWorksInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <HowItWorksSection />
        </div>
        
        <div 
          ref={statsRef} 
          className={`relative z-10 transition-all duration-1000 transform ${statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <StatsSection />
        </div>
        
        <div 
          ref={ctaRef} 
          className={`relative z-10 transition-all duration-1000 transform ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <CTASection />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
