import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Plus, Filter } from 'lucide-react';

const portfolioData = [
  { name: 'US Stocks', value: 35, amount: 15750, color: '#3B82F6' },
  { name: 'Int. Stocks', value: 15, amount: 6750, color: '#8B5CF6' },
  { name: 'Bonds', value: 20, amount: 9000, color: '#10B981' },
  { name: 'Real Estate', value: 15, amount: 6750, color: '#F59E0B' },
  { name: 'Crypto', value: 10, amount: 4500, color: '#EC4899' },
  { name: 'Cash', value: 5, amount: 2250, color: '#6B7280' },
];

const historicalData = [
  { month: 'Jan', value: 32500 },
  { month: 'Feb', value: 34200 },
  { month: 'Mar', value: 33800 },
  { month: 'Apr', value: 35600 },
  { month: 'May', value: 37800 },
  { month: 'Jun', value: 39500 },
  { month: 'Jul', value: 41200 },
  { month: 'Aug', value: 40500 },
  { month: 'Sep', value: 42300 },
  { month: 'Oct', value: 41800 },
  { month: 'Nov', value: 43200 },
  { month: 'Dec', value: 45000 },
];

const investments = [
  {
    id: '1',
    name: 'Apple Inc.',
    symbol: 'AAPL',
    shares: '12',
    price: '$187.00',
    value: '$2,244.00',
    change: {
      value: '$124.45',
      percentage: '+5.87%',
      positive: true
    }
  },
  {
    id: '2',
    name: 'Microsoft',
    symbol: 'MSFT',
    shares: '8',
    price: '$402.25',
    value: '$3,218.00',
    change: {
      value: '$218.75',
      percentage: '+7.29%',
      positive: true
    }
  },
  {
    id: '3',
    name: 'Amazon',
    symbol: 'AMZN',
    shares: '5',
    price: '$178.75',
    value: '$893.75',
    change: {
      value: '$43.25',
      percentage: '-4.61%',
      positive: false
    }
  },
  {
    id: '4',
    name: 'Tesla Inc.',
    symbol: 'TSLA',
    shares: '10',
    price: '$255.50',
    value: '$2,555.00',
    change: {
      value: '$155.00',
      percentage: '+6.45%',
      positive: true
    }
  },
  {
    id: '5',
    name: 'Vanguard S&P 500 ETF',
    symbol: 'VOO',
    shares: '15',
    price: '$435.75',
    value: '$6,536.25',
    change: {
      value: '$336.25',
      percentage: '+5.42%',
      positive: true
    }
  },
  {
    id: '6',
    name: 'Bitcoin',
    symbol: 'BTC',
    shares: '0.25',
    price: '$61,250.00',
    value: '$15,312.50',
    change: {
      value: '$1,312.50',
      percentage: '+9.37%',
      positive: true
    }
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow-sm text-sm">
        <p className="font-medium">{label}</p>
        <p className="text-primary">{`$${Number(payload[0].value).toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const PieCustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow-sm text-sm">
        <p className="font-medium">{payload[0].name}</p>
        <p>{`${payload[0].value}%`}</p>
        <p className="text-primary">{`$${payload[0].payload.amount.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 animate-slide-down">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track your investment portfolio
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" className="h-9">
              <Plus className="h-4 w-4 mr-2" />
              Add Investment
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-6">
          <Card className="lg:col-span-2 animate-scale-in" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle>Portfolio History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={historicalData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                    <YAxis 
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12 }} 
                      width={60}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="value" 
                      fill="#3B82F6" 
                      radius={[4, 4, 0, 0]} 
                      barSize={30}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-scale-in" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolioData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {portfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieCustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {portfolioData.map((item, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="truncate">{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="animate-scale-in" style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <CardTitle>Your Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-sm text-muted-foreground border-b">
                    <th className="pb-3 text-left font-medium">Asset</th>
                    <th className="pb-3 text-right font-medium">Shares</th>
                    <th className="pb-3 text-right font-medium">Price</th>
                    <th className="pb-3 text-right font-medium">Value</th>
                    <th className="pb-3 text-right font-medium">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {investments.map((investment) => (
                    <tr key={investment.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="py-4">
                        <div className="font-medium">{investment.name}</div>
                        <div className="text-xs text-muted-foreground">{investment.symbol}</div>
                      </td>
                      <td className="py-4 text-right">{investment.shares}</td>
                      <td className="py-4 text-right">{investment.price}</td>
                      <td className="py-4 text-right font-medium">{investment.value}</td>
                      <td className="py-4 text-right">
                        <div className={investment.change.positive ? "text-positive" : "text-negative"}>
                          <div className="flex items-center justify-end">
                            {investment.change.positive ? (
                              <ArrowUp className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowDown className="h-3 w-3 mr-1" />
                            )}
                            <span>{investment.change.percentage}</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Portfolio;
