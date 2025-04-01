
import React from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const FinancialLiteracy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Financial Literacy</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Understanding Financial Basics</CardTitle>
              <CardDescription>Core concepts everyone should know</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Financial literacy begins with understanding basic concepts like budgeting, saving, and compound interest. 
                These fundamentals form the foundation for making informed financial decisions throughout your life.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Managing Debt Wisely</CardTitle>
              <CardDescription>Strategies for healthy debt management</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Not all debt is created equal. Learn to distinguish between good debt (investments in your future) and bad debt, 
                and develop strategies to manage debt responsibly while building your financial future.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-finance-primary/5 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Key Financial Terms</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-finance-primary mb-2">Compound Interest</h3>
              <p className="text-sm text-gray-600">
                Interest calculated on the initial principal and also on the accumulated interest over time.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-finance-primary mb-2">Diversification</h3>
              <p className="text-sm text-gray-600">
                Spreading investments across various financial instruments to reduce risk.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-finance-primary mb-2">Liquidity</h3>
              <p className="text-sm text-gray-600">
                How quickly an asset can be converted to cash without affecting its market price.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Educational Resources</h2>
          <div className="space-y-4">
            <div className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-medium text-lg">Personal Finance Basics Course</h3>
              <p className="text-gray-600 text-sm mt-1">A comprehensive introduction to managing your money effectively.</p>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-medium text-lg">Investment Fundamentals</h3>
              <p className="text-gray-600 text-sm mt-1">Learn the basics of different investment vehicles and strategies.</p>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-medium text-lg">Retirement Planning Guide</h3>
              <p className="text-gray-600 text-sm mt-1">Essential strategies for securing your financial future.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FinancialLiteracy;
