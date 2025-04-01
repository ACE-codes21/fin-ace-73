
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { RefreshCw, TrendingUp, TrendingDown, BarChart2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MarketData {
  name: string;
  value: number;
}

interface IndexData {
  name: string;
  current: number;
  change: number;
  percentChange: number;
  data: MarketData[];
}

export const RealTimeMarketData = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [marketIndices, setMarketIndices] = useState<IndexData[]>([
    {
      name: "Sensex",
      current: 72354.32,
      change: 276.45,
      percentChange: 0.38,
      data: Array(12).fill(0).map((_, i) => ({
        name: `${i}h`,
        value: 72000 + Math.random() * 1000
      }))
    },
    {
      name: "Nifty 50",
      current: 21982.65,
      change: 83.65,
      percentChange: 0.39,
      data: Array(12).fill(0).map((_, i) => ({
        name: `${i}h`,
        value: 21900 + Math.random() * 300
      }))
    },
    {
      name: "Nifty Bank",
      current: 48265.75,
      change: -124.30,
      percentChange: -0.26,
      data: Array(12).fill(0).map((_, i) => ({
        name: `${i}h`,
        value: 48200 + Math.random() * 400
      }))
    }
  ]);

  const refreshData = () => {
    setLoading(true);
    
    // Simulate API fetch delay
    setTimeout(() => {
      // Generate new random data - in a real app this would come from an API
      const newIndices = marketIndices.map(index => {
        const changeValue = (Math.random() * 200) - 100;
        const newValue = index.current + changeValue;
        const percentChange = (changeValue / index.current * 100).toFixed(2);
        
        // Update the last data point and shift
        const newData = [...index.data.slice(1), {
          name: index.data[index.data.length - 1].name,
          value: newValue
        }];
        
        return {
          ...index,
          current: newValue,
          change: changeValue,
          percentChange: parseFloat(percentChange),
          data: newData
        };
      });
      
      setMarketIndices(newIndices);
      setLastUpdated(new Date());
      setLoading(false);
      
      toast({
        title: "Market Data Updated",
        description: `Latest market data as of ${new Date().toLocaleTimeString()}`
      });
    }, 1500);
  };

  // Auto refresh every 5 minutes - in a real app, this would be websocket data
  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshData();
    }, 300000); // 5 minutes
    
    return () => clearInterval(intervalId);
  }, [marketIndices]);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BarChart2 className="h-5 w-5 mr-2 text-finance-primary" />
            <CardTitle className="text-lg">Indian Market Indices</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Updated {formatTime(lastUpdated)}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="h-7 text-xs gap-1"
              onClick={refreshData}
              disabled={loading}
            >
              <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {marketIndices.map((index) => (
            <div key={index.name} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{index.name}</h3>
                  <p className="text-2xl font-bold mt-1">{index.current.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                </div>
                <Badge 
                  className={`${
                    index.change >= 0 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
                >
                  <div className="flex items-center">
                    {index.change >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {index.change.toFixed(2)} ({index.percentChange.toFixed(2)}%)
                  </div>
                </Badge>
              </div>
              
              <div className="h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={index.data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 10 }} 
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      domain={['dataMin - 100', 'dataMax + 100']} 
                      hide 
                    />
                    <Tooltip 
                      formatter={(value: number) => [value.toFixed(2), 'Value']} 
                      labelFormatter={(label) => `Time: ${label}`}
                      contentStyle={{ fontSize: '12px' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={index.change >= 0 ? "#22c55e" : "#ef4444"} 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
