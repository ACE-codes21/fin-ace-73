
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { ArrowRight, BarChart3, Brain, LineChart, Shield, TrendingUp, PiggyBank, Wallet } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
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

      {/* Features Section */}
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

      {/* How It Works Section */}
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

      {/* Stats Section */}
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

      {/* CTA Section */}
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
    </Layout>
  );
};

export default Index;
