
import React, { useEffect, useRef } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import StatsSection from '@/components/home/StatsSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      sectionsRef.current.forEach((section, index) => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        // Calculate when the section is in view
        if (scrollY > sectionTop - windowHeight / 1.2 && 
            scrollY < sectionTop + sectionHeight) {
          section.classList.add('animate-fade-in');
          section.style.opacity = '1';
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <Layout>
      <div>
        <div>
          <HeroSection />
        </div>
        <div ref={(el) => (sectionsRef.current[0] = el)} style={{ opacity: 0 }}>
          <FeaturesSection />
        </div>
        <div ref={(el) => (sectionsRef.current[1] = el)} style={{ opacity: 0 }}>
          <HowItWorksSection />
        </div>
        <div ref={(el) => (sectionsRef.current[2] = el)} style={{ opacity: 0 }}>
          <StatsSection />
        </div>
        <div ref={(el) => (sectionsRef.current[3] = el)} style={{ opacity: 0 }}>
          <CTASection />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
