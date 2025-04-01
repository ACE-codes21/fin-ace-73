
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-finance-primary to-finance-accent py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="animate-fade-in">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to transform your financial future?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Get started today with our AI-powered financial guidance platform. No complicated jargon, just clear advice.
          </p>
          <Link to="/chat">
            <Button className="bg-white text-finance-primary hover:bg-gray-100 px-8 py-6 text-lg font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Start Your Financial Journey
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
