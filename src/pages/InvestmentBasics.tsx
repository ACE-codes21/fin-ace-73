
import React from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const InvestmentBasics = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Investment Basics</h1>
        <p className="text-lg text-gray-600 max-w-3xl mb-10">
          Understanding the fundamentals of investing is essential for building long-term wealth. 
          Explore our resources to learn about different investment types, strategies, and principles.
        </p>

        <Tabs defaultValue="types" className="mb-12">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="types">Investment Types</TabsTrigger>
            <TabsTrigger value="principles">Key Principles</TabsTrigger>
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="types" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Stocks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Stocks represent ownership in a company. When you buy a stock, you're purchasing a small piece of that company, 
                    making you a shareholder. Stock prices fluctuate based on company performance, market conditions, and investor sentiment.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Bonds</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Bonds are debt securities where you're essentially lending money to an entity (government or corporation) for a specified period. 
                    In return, you receive regular interest payments and the return of the principal when the bond matures.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Mutual Funds & ETFs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    These are pooled investment vehicles that allow investors to own a diversified portfolio of assets. 
                    Mutual funds are priced once daily, while Exchange-Traded Funds (ETFs) trade throughout the day like stocks.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="principles" className="mt-6">
            <div className="space-y-6">
              <div className="bg-finance-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Diversification</h3>
                <p className="text-gray-600">
                  Don't put all your eggs in one basket. Spreading investments across different asset classes, sectors, and geographies 
                  can help reduce risk and potentially improve returns over time.
                </p>
              </div>
              
              <div className="bg-finance-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Time in the Market</h3>
                <p className="text-gray-600">
                  Historically, long-term investing has been more effective than trying to time market movements. 
                  Compounding returns work most effectively over longer time horizons.
                </p>
              </div>
              
              <div className="bg-finance-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Risk vs. Return</h3>
                <p className="text-gray-600">
                  Generally, investments with higher potential returns come with higher risks. 
                  Understanding your risk tolerance is crucial for building a portfolio that aligns with your financial goals.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="strategies" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Value Investing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Value investors seek stocks trading below their intrinsic value, looking for companies with strong fundamentals that the market has undervalued.
                  </p>
                  <div className="text-sm text-gray-500">
                    <div className="font-medium">Key metrics:</div>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Price-to-Earnings (P/E) Ratio</li>
                      <li>Price-to-Book (P/B) Ratio</li>
                      <li>Dividend Yield</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Growth Investing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Growth investors focus on companies with above-average growth potential, often paying higher valuation multiples for expected future earnings.
                  </p>
                  <div className="text-sm text-gray-500">
                    <div className="font-medium">Key metrics:</div>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Revenue Growth Rate</li>
                      <li>Earnings Growth Rate</li>
                      <li>Return on Equity (ROE)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="bg-finance-secondary/10 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Ready to Start Investing?</h2>
          <p className="text-gray-600 mb-6">
            Apply your investment knowledge with FinAce's AI-powered recommendations tailored to your financial goals and risk tolerance.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/risk-assessment" className="bg-finance-primary text-white px-6 py-3 rounded-md hover:bg-finance-primary/90 transition-colors font-medium">
              Take Risk Assessment
            </a>
            <a href="/chat" className="bg-white border border-finance-primary text-finance-primary px-6 py-3 rounded-md hover:bg-finance-primary/5 transition-colors font-medium">
              Chat with FinAce AI
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InvestmentBasics;
