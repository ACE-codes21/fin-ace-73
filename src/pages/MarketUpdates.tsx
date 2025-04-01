
import React from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const MarketUpdates = () => {
  // Market update data with more realistic info
  const marketUpdates = [
    {
      id: 1,
      title: "Key Stock Indices Showing Mixed Trends",
      summary: "The NSE Nifty and BSE Sensex are showing mixed trends as global markets navigate ongoing economic uncertainties. Tech and pharmaceutical sectors continue to outperform broader indices.",
      date: new Date().toLocaleDateString(),
      category: "Indian Markets"
    },
    {
      id: 2,
      title: "RBI Maintains Interest Rate Stance",
      summary: "The Reserve Bank of India has maintained its current interest rate position in its latest monetary policy meeting, citing the need to balance growth with inflation control.",
      date: new Date().toLocaleDateString(),
      category: "Monetary Policy"
    },
    {
      id: 3,
      title: "Renewable Energy Investments Accelerate",
      summary: "Indian renewable energy sector is seeing increased investments as government initiatives and corporate commitments drive the transition toward sustainable energy sources.",
      date: new Date().toLocaleDateString(),
      category: "Energy Sector"
    },
    {
      id: 4,
      title: "Technology Sector Leads Innovation",
      summary: "India's technology companies are spearheading innovation in AI, cloud services, and digital transformation, positioning the sector for continued growth despite global headwinds.",
      date: new Date().toLocaleDateString(),
      category: "Technology"
    }
  ];

  // Market performance data with more realistic values
  const marketPerformance = [
    { index: "NSE Nifty", value: "22,185.70", change: "+0.8%" },
    { index: "BSE Sensex", value: "73,158.24", change: "+0.7%" },
    { index: "Bank Nifty", value: "48,325.15", change: "+0.5%" },
    { index: "Nifty IT", value: "38,765.90", change: "+1.2%" },
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
              <CardTitle className="text-sm font-medium">Indian Market Performance</CardTitle>
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
              <p className="text-xs text-gray-500">Last updated: {new Date().toLocaleTimeString()}</p>
            </CardFooter>
          </Card>
        </div>

        <div className="bg-finance-primary/5 p-6 rounded-lg mb-10">
          <h2 className="text-xl font-semibold mb-4">Market Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="font-medium">Inflation (CPI)</div>
              <div className="text-2xl font-bold mt-1">4.8%</div>
              <div className="text-sm text-gray-500 mt-1">Year-over-year</div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="font-medium">RBI Repo Rate</div>
              <div className="text-2xl font-bold mt-1">6.5%</div>
              <div className="text-sm text-gray-500 mt-1">Unchanged</div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="font-medium">VIX (Volatility)</div>
              <div className="text-2xl font-bold mt-1">14.25</div>
              <div className="text-sm text-gray-500 mt-1">Market sentiment</div>
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
                <Button variant="link" className="text-finance-primary hover:underline text-sm font-medium p-0">
                  Read full analysis
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-10" />
        
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-3">Get Daily Market Updates</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Subscribe to our newsletter for daily insights on market trends, economic indicators, and investment opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-finance-primary"
            />
            <Button className="bg-finance-primary text-white hover:bg-finance-primary/90 transition-colors">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MarketUpdates;
