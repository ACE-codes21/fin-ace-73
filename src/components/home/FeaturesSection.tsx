
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, LineChart, Shield, BarChart3, ArrowRight, Sparkles } from 'lucide-react';

const FeatureCard = ({ 
  icon, 
  iconBgClass, 
  iconColor, 
  title, 
  description, 
  link, 
  delay 
}: { 
  icon: React.ReactNode;
  iconBgClass: string;
  iconColor: string;
  title: string;
  description: string;
  link: string;
  delay: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="bg-white rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-xl shadow-md border border-gray-100 animate-fade-in"
      style={{ animationDelay: delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={link} className="block h-full">
        <div className={`w-14 h-14 ${iconBgClass} rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 ${isHovered ? 'scale-110' : ''}`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 group flex items-center">
          {title}
          <ArrowRight className={`ml-2 h-4 w-4 transition-all duration-300 opacity-0 translate-x-[-10px] ${isHovered ? 'opacity-100 translate-x-0' : ''}`} />
        </h3>
        <p className="text-gray-600">
          {description}
        </p>
      </Link>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-finance-primary/10 text-finance-primary rounded-full px-4 py-1 mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Powerful AI Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tools for Your Financial Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform helps you understand, plan, and grow your finances with confidence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Brain className="h-7 w-7 text-finance-primary" />}
            iconBgClass="bg-finance-primary/10"
            iconColor="text-finance-primary"
            title="AI Chat Assistant"
            description="Get answers to your financial questions from our AI assistant trained on Indian finance."
            link="/chat"
            delay="0.1s"
          />
          
          <FeatureCard
            icon={<LineChart className="h-7 w-7 text-finance-secondary" />}
            iconBgClass="bg-finance-secondary/10"
            iconColor="text-finance-secondary"
            title="Financial Forecasting"
            description="Visualize your future savings and investment growth based on your financial inputs."
            link="/forecast"
            delay="0.2s"
          />
          
          <FeatureCard
            icon={<Shield className="h-7 w-7 text-finance-accent" />}
            iconBgClass="bg-finance-accent/10"
            iconColor="text-finance-accent"
            title="Risk Assessment"
            description="Understand your risk tolerance and get personalized investment strategy recommendations."
            link="/risk-assessment"
            delay="0.3s"
          />
          
          <FeatureCard
            icon={<BarChart3 className="h-7 w-7 text-finance-warning" />}
            iconBgClass="bg-finance-warning/10"
            iconColor="text-finance-warning"
            title="Investment Suggestions"
            description="Receive tailored investment category recommendations based on your profile."
            link="/investments"
            delay="0.4s"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
