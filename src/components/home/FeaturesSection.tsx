
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, LineChart, Shield, BarChart3, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

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
  delay: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={link} className="block h-full">
        <div className="perspective-1000">
          <motion.div 
            className={`w-16 h-16 ${iconBgClass} rounded-2xl flex items-center justify-center mb-5`}
            animate={isHovered ? { rotateY: 180, scale: 1.1 } : { rotateY: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            {icon}
          </motion.div>
        </div>
        
        <h3 className="text-xl font-semibold mb-3 group flex items-center">
          {title}
          <motion.div
            animate={{ x: isHovered ? 8 : 0, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="ml-2 h-5 w-5" />
          </motion.div>
        </h3>
        
        <p className="text-gray-600">
          {description}
        </p>
      </Link>
    </motion.div>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/80 backdrop-blur-sm"></div>
      
      {/* 3D decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-green-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 bg-finance-primary/10 text-finance-primary rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Powerful AI Features</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-finance-primary via-finance-accent to-finance-secondary bg-clip-text text-transparent">
            Tools for Your Financial Journey
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our AI-powered platform helps you understand, plan, and grow your finances with confidence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Brain className="h-8 w-8 text-finance-primary" />}
            iconBgClass="bg-finance-primary/10"
            iconColor="text-finance-primary"
            title="AI Chat Assistant"
            description="Get answers to your financial questions from our AI assistant trained on Indian finance."
            link="/chat"
            delay={1}
          />
          
          <FeatureCard
            icon={<LineChart className="h-8 w-8 text-finance-secondary" />}
            iconBgClass="bg-finance-secondary/10"
            iconColor="text-finance-secondary"
            title="Financial Forecasting"
            description="Visualize your future savings and investment growth based on your financial inputs."
            link="/forecast"
            delay={2}
          />
          
          <FeatureCard
            icon={<Shield className="h-8 w-8 text-finance-accent" />}
            iconBgClass="bg-finance-accent/10"
            iconColor="text-finance-accent"
            title="Risk Assessment"
            description="Understand your risk tolerance and get personalized investment strategy recommendations."
            link="/risk-assessment"
            delay={3}
          />
          
          <FeatureCard
            icon={<BarChart3 className="h-8 w-8 text-finance-warning" />}
            iconBgClass="bg-finance-warning/10"
            iconColor="text-finance-warning"
            title="Investment Suggestions"
            description="Receive tailored investment category recommendations based on your profile."
            link="/investments"
            delay={4}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
