
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="pt-16 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-white to-sky-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              <span className="gradient-text">AI-Powered</span> Financial Guidance for Smart Investing
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Make informed financial decisions with personalized insights, risk assessment, and investment suggestions tailored for the Indian market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/chat">
                <Button className="bg-finance-primary hover:bg-finance-primary/90 text-white px-6 py-5 transform transition-all duration-300 hover:scale-105 hover:shadow-lg w-full sm:w-auto">
                  Get Started <ArrowRight className="ml-2 h-5 w-5 animate-pulse-slow" />
                </Button>
              </Link>
              <Link to="/forecast">
                <Button variant="outline" className="border-finance-primary text-finance-primary hover:bg-finance-primary/10 px-6 py-5 transition-all duration-300 hover:shadow-md w-full sm:w-auto">
                  Try Financial Forecasting
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="bg-gradient-to-br from-finance-primary/20 to-finance-accent/20 p-1 rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="AI Financial Analysis" 
                className="rounded-2xl shadow-inner"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
