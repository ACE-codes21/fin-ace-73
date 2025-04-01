
import React from 'react';
import { MessageSquare, BarChart2, Zap } from 'lucide-react';

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Start your journey to financial clarity in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting line */}
          <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-finance-primary via-finance-accent to-finance-secondary hidden md:block"></div>
          
          <div className="relative z-10">
            <div className="text-center transform transition-all duration-300 hover:translate-y-[-8px] animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="w-20 h-20 bg-finance-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg relative">
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-finance-primary rounded-full flex items-center justify-center text-white font-bold text-lg">1</span>
                <MessageSquare className="h-8 w-8 text-finance-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Share Your Goals</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Tell us about your income, expenses, and financial aspirations through our intuitive AI chat interface.
              </p>
            </div>
          </div>

          <div className="relative z-10">
            <div className="text-center transform transition-all duration-300 hover:translate-y-[-8px] animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-20 h-20 bg-finance-secondary/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg relative">
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-finance-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">2</span>
                <BarChart2 className="h-8 w-8 text-finance-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get AI Analysis</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Our AI analyzes your financial situation in real-time and provides personalized insights and recommendations.
              </p>
            </div>
          </div>

          <div className="relative z-10">
            <div className="text-center transform transition-all duration-300 hover:translate-y-[-8px] animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="w-20 h-20 bg-finance-accent/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg relative">
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-finance-accent rounded-full flex items-center justify-center text-white font-bold text-lg">3</span>
                <Zap className="h-8 w-8 text-finance-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Take Action</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Follow your customized financial plan with confidence, track your progress, and adjust as your goals evolve.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="inline-block bg-gradient-to-r from-finance-primary to-finance-accent p-[2px] rounded-xl shadow-lg">
            <div className="bg-white px-8 py-6 rounded-xl">
              <p className="text-lg font-medium text-gray-800">
                "FinAce helped me understand exactly where to invest my money based on my risk profile."
              </p>
              <div className="mt-4">
                <p className="font-semibold">Priya S.</p>
                <p className="text-sm text-gray-600">Software Engineer, Bengaluru</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
