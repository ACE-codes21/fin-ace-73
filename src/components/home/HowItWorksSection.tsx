
import React from 'react';

const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Start your journey to financial clarity in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center transform transition-all duration-300 hover:translate-y-[-8px] animate-fade-in relative" style={{ animationDelay: "0.1s" }}>
            <div className="w-20 h-20 bg-finance-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <span className="text-2xl font-bold text-finance-primary">1</span>
            </div>
            <div className="absolute top-10 left-full w-24 h-0.5 bg-gradient-to-r from-finance-primary to-transparent hidden md:block" style={{ transform: "translateX(-50%)" }}></div>
            <h3 className="text-xl font-semibold mb-3">Share Your Goals</h3>
            <p className="text-gray-600">
              Tell us about your income, expenses, and financial aspirations.
            </p>
          </div>

          <div className="text-center transform transition-all duration-300 hover:translate-y-[-8px] animate-fade-in relative" style={{ animationDelay: "0.2s" }}>
            <div className="w-20 h-20 bg-finance-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <span className="text-2xl font-bold text-finance-secondary">2</span>
            </div>
            <div className="absolute top-10 left-full w-24 h-0.5 bg-gradient-to-r from-finance-secondary to-transparent hidden md:block" style={{ transform: "translateX(-50%)" }}></div>
            <h3 className="text-xl font-semibold mb-3">Get AI Analysis</h3>
            <p className="text-gray-600">
              Our AI analyzes your situation and provides personalized insights.
            </p>
          </div>

          <div className="text-center transform transition-all duration-300 hover:translate-y-[-8px] animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="w-20 h-20 bg-finance-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <span className="text-2xl font-bold text-finance-accent">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Take Action</h3>
            <p className="text-gray-600">
              Follow your customized plan with confidence and track your progress.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
