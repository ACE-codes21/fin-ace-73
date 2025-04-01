
import React from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const MarketUpdates = () => {
  // Mock market update data
  const marketUpdates = [
    {
      id: 1,
      title: "Global Markets Rally on Tech Earnings",
      summary: "Major indices rose following strong quarterly results from tech giants, signaling continued sector strength despite economic headwinds.",
      date: "May 15, 2023",
      category: "Global Markets"
    },
    {
      id: 2,
      title: "Fed Signals Potential Rate Pause",
      summary: "The Federal Reserve indicated it may pause its interest rate hiking cycle as inflation shows signs of cooling in recent economic data.",
      date: "May 12, 2023",
      category: "Monetary Policy"
    },
    {
      id: 3,
      title: "Energy Sector Faces Transition Challenges",
      summary: "Traditional energy companies struggle with the dual pressures of environmental regulations and the accelerating shift to renewable energy sources.",
      date: "May 10, 2023",
      category: "Energy"
    },
    {
      id: 4,
      title: "Supply Chain Improvements Boost Manufacturing",
      summary: "Global manufacturing indices showed improvement as supply chain disruptions ease, potentially reducing inflationary pressures.",
      date: "May 8, 2023",
      category: "Manufacturing"
    }
  ];

  // Mock market performance data
  const marketPerformance = [
    { index: "S&P 500", value: "4,185.82", change: "+1.2%" },
    { index: "NASDAQ", value: "12,123.47", change: "+2.1%" },
    { index: "Dow Jones", value: "32,986.23", change: "+0.8%" },
    { index: "Russell 2000", value: "1,768.95", change: "+0.5%" },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Market Updates</h1>
            <p className="text-gray-600 mt-2">
              Stay informed with the latest market trends, news, and analysis
            </p>
          </div>
          <Card className="min-w-[280px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Market Performance</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                {marketPerformance.map((item) => (
                  <div key={item.index} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.index}</span>
                    <div className="flex space-x-2">
                      <span>{item.value}</span>
                      <span className={item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                        {item.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-gray-500">Last updated: Today, 4:00 PM ET</p>
            </CardFooter>
          </Card>
        </div>

        <div className="bg-finance-primary/5 p-6 rounded-lg mb-10">
          <h2 className="text-xl font-semibold mb-4">Market Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="font-medium">Inflation</div>
              <div className="text-2xl font-bold mt-1">3.4%</div>
              <div className="text-sm text-gray-500 mt-1">Year-over-year CPI</div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="font-medium">Treasury Yield (10Y)</div>
              <div className="text-2xl font-bold mt-1">3.78%</div>
              <div className="text-sm text-gray-500 mt-1">+0.02 pts today</div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="font-medium">Volatility Index</div>
              <div className="text-2xl font-bold mt-1">19.25</div>
              <div className="text-sm text-gray-500 mt-1">-2.3 pts today</div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-6">Latest Market Updates</h2>
        <div className="space-y-6">
          {marketUpdates.map((update) => (
            <div key={update.id} className="border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-medium">{update.title}</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {update.category}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{update.summary}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{update.date}</span>
                <button className="text-finance-primary hover:underline text-sm font-medium">
                  Read full analysis
                </button>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-10" />
        
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-3">Get Daily Market Updates</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Subscribe to our newsletter to receive daily insights on market trends, economic indicators, and investment opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-finance-primary"
            />
            <button className="bg-finance-primary text-white px-4 py-2 rounded-md hover:bg-finance-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MarketUpdates;
