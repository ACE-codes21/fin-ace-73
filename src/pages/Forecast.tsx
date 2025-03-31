
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, IndianRupee } from 'lucide-react';

// Simple linear regression for forecasting
const predictFutureValue = (
  initialAmount: number,
  monthlyContribution: number,
  interestRate: number,
  years: number
) => {
  const monthlyRate = interestRate / 100 / 12;
  const months = years * 12;
  let future = initialAmount;

  // Calculate compound interest with monthly contributions
  for (let i = 0; i < months; i++) {
    future = future * (1 + monthlyRate) + monthlyContribution;
  }

  return future;
};

// Generate forecast data for chart
const generateForecastData = (
  initialAmount: number,
  monthlyContribution: number,
  interestRate: number,
  years: number,
  riskProfile: string
) => {
  const data = [];
  
  // Adjust interest rate based on risk profile
  let adjustedRate = interestRate;
  if (riskProfile === 'conservative') {
    adjustedRate = Math.max(4, interestRate - 2);
  } else if (riskProfile === 'aggressive') {
    adjustedRate = interestRate + 2;
  }

  for (let year = 0; year <= years; year++) {
    const futureValue = predictFutureValue(initialAmount, monthlyContribution, adjustedRate, year);
    const contributionValue = initialAmount + (monthlyContribution * 12 * year);
    
    data.push({
      year,
      value: Math.round(futureValue),
      contributions: Math.round(contributionValue),
      growth: Math.round(futureValue - contributionValue)
    });
  }

  return data;
};

const Forecast = () => {
  const [initialAmount, setInitialAmount] = useState(100000);
  const [monthlyContribution, setMonthlyContribution] = useState(10000);
  const [interestRate, setInterestRate] = useState(12);
  const [years, setYears] = useState(10);
  const [riskProfile, setRiskProfile] = useState('moderate');
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [finalAmount, setFinalAmount] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalGrowth, setTotalGrowth] = useState(0);

  useEffect(() => {
    calculateForecast();
  }, [initialAmount, monthlyContribution, interestRate, years, riskProfile]);

  const calculateForecast = () => {
    const data = generateForecastData(
      initialAmount,
      monthlyContribution,
      interestRate,
      years,
      riskProfile
    );
    setForecastData(data);
    
    if (data.length > 0) {
      const lastEntry = data[data.length - 1];
      setFinalAmount(lastEntry.value);
      setTotalContributions(lastEntry.contributions);
      setTotalGrowth(lastEntry.growth);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Financial Forecasting</h1>
          <p className="text-gray-600">
            Visualize your future wealth with our AI-powered financial forecast tool.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Financial Inputs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="initialAmount">Initial Investment (₹)</Label>
                  <Input
                    id="initialAmount"
                    type="number"
                    value={initialAmount}
                    onChange={(e) => setInitialAmount(Number(e.target.value))}
                    className="input-field"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="monthlyContribution">Monthly Contribution (₹)</Label>
                  <Input
                    id="monthlyContribution"
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="input-field"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="interestRate">Expected Annual Return (%)</Label>
                    <span className="text-sm font-medium">{interestRate}%</span>
                  </div>
                  <Slider
                    id="interestRate"
                    value={[interestRate]}
                    min={4}
                    max={20}
                    step={0.5}
                    onValueChange={(value) => setInterestRate(value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="years">Investment Period (Years)</Label>
                    <span className="text-sm font-medium">{years} years</span>
                  </div>
                  <Slider
                    id="years"
                    value={[years]}
                    min={1}
                    max={30}
                    step={1}
                    onValueChange={(value) => setYears(value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="riskProfile">Risk Profile</Label>
                  <Select
                    value={riskProfile}
                    onValueChange={(value) => setRiskProfile(value)}
                  >
                    <SelectTrigger id="riskProfile" className="input-field">
                      <SelectValue placeholder="Select your risk profile" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative (Lower Risk)</SelectItem>
                      <SelectItem value="moderate">Moderate (Balanced Risk)</SelectItem>
                      <SelectItem value="aggressive">Aggressive (Higher Risk)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Your Investment Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-finance-primary/10 to-finance-primary/20 p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-gray-600">Future Value</p>
                        <IndianRupee className="h-4 w-4 text-finance-primary" />
                      </div>
                      <p className="text-2xl font-bold">{formatCurrency(finalAmount)}</p>
                      <div className="flex items-center mt-1 text-finance-secondary text-sm">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        <span>Projected</span>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-gray-600">Total Contributions</p>
                        <IndianRupee className="h-4 w-4 text-gray-500" />
                      </div>
                      <p className="text-2xl font-bold">{formatCurrency(totalContributions)}</p>
                      <div className="flex items-center mt-1 text-gray-500 text-sm">
                        <span>Your investment</span>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-finance-secondary/10 to-finance-secondary/20 p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-gray-600">Investment Growth</p>
                        <IndianRupee className="h-4 w-4 text-finance-secondary" />
                      </div>
                      <p className="text-2xl font-bold">{formatCurrency(totalGrowth)}</p>
                      <div className="flex items-center mt-1 text-finance-secondary text-sm">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        <span>
                          {((totalGrowth / totalContributions) * 100).toFixed(1)}% return
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={forecastData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="year" 
                          label={{ value: 'Years', position: 'insideBottomRight', offset: -10 }} 
                        />
                        <YAxis 
                          tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                          label={{ value: 'Amount (Lakhs)', angle: -90, position: 'insideLeft' }} 
                        />
                        <Tooltip 
                          formatter={(value: number) => [formatCurrency(value), '']}
                          labelFormatter={(label) => `Year ${label}`}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          name="Total Value" 
                          stroke="#0EA5E9" 
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="contributions" 
                          name="Your Contributions" 
                          stroke="#64748B" 
                          strokeWidth={2}
                          strokeDasharray="5 5"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="growth" 
                          name="Investment Growth" 
                          stroke="#22C55E" 
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Insights & Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-700">
                    <p className="mb-4">
                      Based on your inputs, our AI forecasting model predicts that your investment of {formatCurrency(initialAmount)} with a monthly contribution of {formatCurrency(monthlyContribution)} could grow to approximately {formatCurrency(finalAmount)} over {years} years.
                    </p>
                    
                    <h3 className="font-semibold text-lg mb-2">Recommendations:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        {riskProfile === 'conservative' ? (
                          "With your conservative risk profile, consider allocating more to debt mutual funds, government bonds, and fixed deposits. While returns may be lower, your capital will be better protected."
                        ) : riskProfile === 'aggressive' ? (
                          "Your aggressive risk profile suggests you could consider a higher allocation to equity mutual funds, mid/small-cap stocks, and potentially some alternative investments to maximize growth potential."
                        ) : (
                          "Your moderate risk profile suggests a balanced approach with a mix of equity and debt funds. Consider large-cap funds, balanced advantage funds, and corporate bonds."
                        )}
                      </li>
                      <li>
                        To reach your financial goal faster, consider increasing your monthly contribution by even a small amount - it can make a significant difference over time due to compounding.
                      </li>
                      <li>
                        Regular portfolio rebalancing (every 6-12 months) can help maintain your desired risk level and potentially enhance returns.
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Forecast;
