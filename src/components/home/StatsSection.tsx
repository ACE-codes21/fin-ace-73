
import React from 'react';
import { TrendingUp, PiggyBank, Wallet } from 'lucide-react';

const StatsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-8 text-center transform transition-all duration-300 hover:shadow-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-finance-primary/10 rounded-full mb-4">
              <TrendingUp className="h-8 w-8 text-finance-primary" />
            </div>
            <h3 className="text-4xl font-bold mb-2 text-gray-800">94%</h3>
            <p className="text-gray-600">Users reporting improved financial decisions</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 text-center transform transition-all duration-300 hover:shadow-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-finance-secondary/10 rounded-full mb-4">
              <PiggyBank className="h-8 w-8 text-finance-secondary" />
            </div>
            <h3 className="text-4xl font-bold mb-2 text-gray-800">₹25L+</h3>
            <p className="text-gray-600">Average wealth growth by our premium users</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 text-center transform transition-all duration-300 hover:shadow-lg animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-finance-accent/10 rounded-full mb-4">
              <Wallet className="h-8 w-8 text-finance-accent" />
            </div>
            <h3 className="text-4xl font-bold mb-2 text-gray-800">10,000+</h3>
            <p className="text-gray-600">Financial plans created and optimized</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
