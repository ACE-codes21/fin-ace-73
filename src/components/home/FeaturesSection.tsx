
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, LineChart, Shield, BarChart3 } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">Powerful Features for Your Financial Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI-powered tools help you understand, plan, and grow your finances with confidence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="finance-card p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <Link to="/chat" className="block h-full">
              <div className="w-12 h-12 bg-finance-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-finance-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Chat Assistant</h3>
              <p className="text-gray-600">
                Get answers to your financial questions from our AI assistant trained on Indian finance.
              </p>
            </Link>
          </div>

          <div className="finance-card p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Link to="/forecast" className="block h-full">
              <div className="w-12 h-12 bg-finance-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-finance-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Financial Forecasting</h3>
              <p className="text-gray-600">
                Visualize your future savings and investment growth based on your financial inputs.
              </p>
            </Link>
          </div>

          <div className="finance-card p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/risk-assessment" className="block h-full">
              <div className="w-12 h-12 bg-finance-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-finance-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Risk Assessment</h3>
              <p className="text-gray-600">
                Understand your risk tolerance and get personalized investment strategy recommendations.
              </p>
            </Link>
          </div>

          <div className="finance-card p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link to="/investments" className="block h-full">
              <div className="w-12 h-12 bg-finance-warning/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-finance-warning" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Investment Suggestions</h3>
              <p className="text-gray-600">
                Receive tailored investment category recommendations based on your profile.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
