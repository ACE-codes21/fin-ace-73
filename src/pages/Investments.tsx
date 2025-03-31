
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Percent, Clock, ShieldCheck, AlertCircle, Info, LineChart, ArrowUpRight, Star, BarChart4 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Simulated investment data
const investmentData = {
  equityFunds: [
    {
      name: 'Axis Bluechip Fund',
      type: 'Large Cap',
      returns: { oneYear: 12.5, threeYear: 15.2, fiveYear: 14.8 },
      riskLevel: 'Moderate',
      minInvestment: 500,
      category: 'equity',
      rating: 5,
      description: 'Focuses on large-cap blue chip companies with strong fundamentals and stable growth. Lower volatility compared to mid and small-cap funds.',
    },
    {
      name: 'SBI Small Cap Fund',
      type: 'Small Cap',
      returns: { oneYear: 18.7, threeYear: 22.3, fiveYear: 19.5 },
      riskLevel: 'High',
      minInvestment: 500,
      category: 'equity',
      rating: 4,
      description: 'Invests in small-cap companies with high growth potential. Higher volatility but potential for substantial long-term returns.',
    },
    {
      name: 'Parag Parikh Flexi Cap Fund',
      type: 'Flexi Cap',
      returns: { oneYear: 15.3, threeYear: 18.9, fiveYear: 16.7 },
      riskLevel: 'Moderate to High',
      minInvestment: 1000,
      category: 'equity',
      rating: 5,
      description: 'Flexible portfolio allocation across large, mid, and small-cap stocks. Also includes some international equities for diversification.',
    },
    {
      name: 'Mirae Asset Emerging Bluechip',
      type: 'Large & Mid Cap',
      returns: { oneYear: 14.2, threeYear: 19.5, fiveYear: 17.8 },
      riskLevel: 'Moderate to High',
      minInvestment: 1000,
      category: 'equity',
      rating: 4,
      description: 'Invests in both established large-cap companies and growing mid-cap companies to balance stability and growth.',
    },
    {
      name: 'Kotak Nifty 50 Index Fund',
      type: 'Index Fund',
      returns: { oneYear: 11.5, threeYear: 13.8, fiveYear: 12.9 },
      riskLevel: 'Moderate',
      minInvestment: 500,
      category: 'equity',
      rating: 4,
      description: 'Passively managed fund that tracks the Nifty 50 index. Lower expense ratio compared to actively managed funds.',
    },
  ],
  debtFunds: [
    {
      name: 'HDFC Corporate Bond Fund',
      type: 'Corporate Bond',
      returns: { oneYear: 6.8, threeYear: 7.5, fiveYear: 8.1 },
      riskLevel: 'Low to Moderate',
      minInvestment: 1000,
      category: 'debt',
      rating: 4,
      description: 'Invests primarily in AAA and AA+ rated corporate bonds. Offers better returns than government securities with marginally higher risk.',
    },
    {
      name: 'SBI Banking & PSU Fund',
      type: 'Banking & PSU',
      returns: { oneYear: 5.9, threeYear: 6.8, fiveYear: 7.5 },
      riskLevel: 'Low',
      minInvestment: 500,
      category: 'debt',
      rating: 5,
      description: 'Invests in debt securities of banks and public sector undertakings. High credit quality and relatively low interest rate risk.',
    },
    {
      name: 'ICICI Prudential Short Term Fund',
      type: 'Short Duration',
      returns: { oneYear: 6.2, threeYear: 7.1, fiveYear: 7.8 },
      riskLevel: 'Low',
      minInvestment: 1000,
      category: 'debt',
      rating: 4,
      description: 'Invests in shorter-term debt securities. Lower interest rate risk compared to longer-duration funds.',
    },
    {
      name: 'Aditya Birla Sun Life Govt. Securities Fund',
      type: 'Gilt Fund',
      returns: { oneYear: 5.4, threeYear: 6.5, fiveYear: 7.2 },
      riskLevel: 'Low',
      minInvestment: 1000,
      category: 'debt',
      rating: 3,
      description: 'Invests in government securities with zero credit risk. May have interest rate risk depending on portfolio duration.',
    },
  ],
  hybridFunds: [
    {
      name: 'ICICI Prudential Balanced Advantage Fund',
      type: 'Balanced Advantage',
      returns: { oneYear: 10.5, threeYear: 12.3, fiveYear: 11.8 },
      riskLevel: 'Moderate',
      minInvestment: 500,
      category: 'hybrid',
      rating: 5,
      description: 'Dynamically manages equity and debt allocation based on market valuations. Provides better downside protection compared to pure equity funds.',
    },
    {
      name: 'Mirae Asset Hybrid Equity Fund',
      type: 'Aggressive Hybrid',
      returns: { oneYear: 11.8, threeYear: 13.5, fiveYear: 12.9 },
      riskLevel: 'Moderate to High',
      minInvestment: 1000,
      category: 'hybrid',
      rating: 4,
      description: 'Invests 65-80% in equity and the rest in debt. Higher equity allocation for better growth potential while debt provides some stability.',
    },
    {
      name: 'DSP Dynamic Asset Allocation Fund',
      type: 'Dynamic Asset Allocation',
      returns: { oneYear: 9.5, threeYear: 11.2, fiveYear: 10.8 },
      riskLevel: 'Moderate',
      minInvestment: 500,
      category: 'hybrid',
      rating: 4,
      description: 'Adjusts equity and debt allocation based on market conditions and valuation metrics. Aims to reduce volatility while capturing market upside.',
    },
    {
      name: 'Nippon India Equity Hybrid Fund',
      type: 'Equity Hybrid',
      returns: { oneYear: 10.8, threeYear: 12.8, fiveYear: 11.5 },
      riskLevel: 'Moderate to High',
      minInvestment: 500,
      category: 'hybrid',
      rating: 3,
      description: 'Maintains 65-80% in equity and equity-related instruments. The debt portion helps in reducing overall portfolio volatility.',
    },
  ],
  alternatives: [
    {
      name: 'Embassy Office Parks REIT',
      type: 'REIT',
      returns: { oneYear: 8.5, threeYear: 9.7, fiveYear: null },
      riskLevel: 'Moderate',
      minInvestment: 10000,
      category: 'alternative',
      rating: 4,
      description: 'India\'s first listed REIT. Provides exposure to commercial real estate with regular income through dividends and potential capital appreciation.',
    },
    {
      name: 'PowerGrid InvIT',
      type: 'InvIT',
      returns: { oneYear: 9.2, threeYear: null, fiveYear: null },
      riskLevel: 'Moderate',
      minInvestment: 10000,
      category: 'alternative',
      rating: 3,
      description: 'Infrastructure Investment Trust that owns and operates power transmission assets. Offers stable yield with potential for appreciation.',
    },
    {
      name: 'HDFC Gold Fund',
      type: 'Gold Fund',
      returns: { oneYear: 7.2, threeYear: 9.8, fiveYear: 9.1 },
      riskLevel: 'Moderate',
      minInvestment: 500,
      category: 'alternative',
      rating: 4,
      description: 'Invests in units of Gold ETFs. Provides exposure to gold prices without the need to hold physical gold. Good for portfolio diversification.',
    },
    {
      name: 'SBI International Access - US Equity FoF',
      type: 'International Fund',
      returns: { oneYear: 13.5, threeYear: 16.2, fiveYear: 14.8 },
      riskLevel: 'High',
      minInvestment: 5000,
      category: 'alternative',
      rating: 4,
      description: 'Fund of Funds that invests in US markets. Provides geographical diversification and exposure to global tech giants and other sectors.',
    },
  ],
};

// Rating component
const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

// Investment Card component
const InvestmentCard = ({ investment }: { investment: any }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{investment.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              {investment.type}
              <Badge
                variant="outline"
                className={`ml-2 ${
                  investment.riskLevel.includes('High')
                    ? 'border-finance-warning text-finance-warning'
                    : investment.riskLevel.includes('Moderate')
                    ? 'border-finance-accent text-finance-accent'
                    : 'border-finance-secondary text-finance-secondary'
                }`}
              >
                {investment.riskLevel} Risk
              </Badge>
            </CardDescription>
          </div>
          <RatingStars rating={investment.rating} />
        </div>
      </CardHeader>
      <CardContent className="py-2 flex-grow">
        <p className="text-sm text-gray-600 mb-4">{investment.description}</p>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="flex items-center text-xs text-gray-500 mb-1">
              <TrendingUp className="h-3 w-3 mr-1" /> 1Y Return
            </div>
            <div className="font-medium text-sm flex items-center">
              {investment.returns.oneYear}% 
              <ArrowUpRight className="h-3 w-3 ml-1 text-finance-secondary" />
            </div>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="flex items-center text-xs text-gray-500 mb-1">
              <TrendingUp className="h-3 w-3 mr-1" /> 3Y Return
            </div>
            <div className="font-medium text-sm">
              {investment.returns.threeYear ? `${investment.returns.threeYear}%` : 'N/A'}
            </div>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="flex items-center text-xs text-gray-500 mb-1">
              <TrendingUp className="h-3 w-3 mr-1" /> 5Y Return
            </div>
            <div className="font-medium text-sm">
              {investment.returns.fiveYear ? `${investment.returns.fiveYear}%` : 'N/A'}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <div className="flex justify-between items-center w-full">
          <div className="text-sm">
            <span className="text-gray-500">Min. investment:</span>{' '}
            <span className="font-medium">₹{investment.minInvestment}</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0">
                  <Info className="h-4 w-4 text-gray-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">
                  Past performance is not indicative of future results. Returns shown are for illustrative purposes only.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );
};

const Investments = () => {
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string | null>(null);
  
  const filterByRiskLevel = (investments: any[]) => {
    if (!selectedRiskLevel) return investments;
    return investments.filter(inv => inv.riskLevel.includes(selectedRiskLevel));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Investment Suggestions</h1>
          <p className="text-gray-600">
            Explore recommended investments based on your risk profile and financial goals.
          </p>
        </div>

        <div className="bg-gradient-to-r from-finance-primary/10 to-finance-accent/10 p-6 rounded-xl mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-finance-primary" />
                Haven't assessed your risk profile yet?
              </h2>
              <p className="text-gray-600">
                Take our risk assessment quiz to receive personalized investment recommendations.
              </p>
            </div>
            <Link to="/risk-assessment">
              <Button className="bg-finance-primary hover:bg-finance-primary/90">
                Take Risk Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Filter by Risk Level</h2>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedRiskLevel === null ? "default" : "outline"}
              className={selectedRiskLevel === null ? "bg-finance-primary" : ""}
              onClick={() => setSelectedRiskLevel(null)}
            >
              All
            </Button>
            <Button
              variant={selectedRiskLevel === "Low" ? "default" : "outline"}
              className={selectedRiskLevel === "Low" ? "bg-finance-secondary" : ""}
              onClick={() => setSelectedRiskLevel("Low")}
            >
              <ShieldCheck className="h-4 w-4 mr-2" />
              Low Risk
            </Button>
            <Button
              variant={selectedRiskLevel === "Moderate" ? "default" : "outline"}
              className={selectedRiskLevel === "Moderate" ? "bg-finance-accent" : ""}
              onClick={() => setSelectedRiskLevel("Moderate")}
            >
              <BarChart4 className="h-4 w-4 mr-2" />
              Moderate Risk
            </Button>
            <Button
              variant={selectedRiskLevel === "High" ? "default" : "outline"}
              className={selectedRiskLevel === "High" ? "bg-finance-warning" : ""}
              onClick={() => setSelectedRiskLevel("High")}
            >
              <LineChart className="h-4 w-4 mr-2" />
              High Risk
            </Button>
          </div>
        </div>

        <Tabs defaultValue="equity" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="equity">Equity Funds</TabsTrigger>
            <TabsTrigger value="debt">Debt Funds</TabsTrigger>
            <TabsTrigger value="hybrid">Hybrid Funds</TabsTrigger>
            <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
          </TabsList>
          
          <TabsContent value="equity">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterByRiskLevel(investmentData.equityFunds).map((investment, index) => (
                <InvestmentCard key={index} investment={investment} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="debt">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterByRiskLevel(investmentData.debtFunds).map((investment, index) => (
                <InvestmentCard key={index} investment={investment} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="hybrid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterByRiskLevel(investmentData.hybridFunds).map((investment, index) => (
                <InvestmentCard key={index} investment={investment} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="alternatives">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterByRiskLevel(investmentData.alternatives).map((investment, index) => (
                <InvestmentCard key={index} investment={investment} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Info className="h-5 w-5 mr-2 text-finance-primary" />
            Important Disclaimer
          </h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              The information provided here is for educational purposes only and should not be considered financial advice. 
              Past performance is not indicative of future results.
            </p>
            <p>
              Before making any investment decisions, consult with a qualified financial advisor to understand your specific situation, 
              goals, and risk tolerance. All investments involve risk, including the potential loss of principal.
            </p>
            <p>
              The returns shown are based on historical data and are for illustrative purposes only. 
              Actual returns may vary significantly.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Investments;
