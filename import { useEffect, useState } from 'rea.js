import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';

// Sample data
const generateData = (length: number, initialValue: number) => {
  let value = initialValue;
  return Array.from({ length }, (_, i) => {
    value = value + (Math.random() - 0.43) * 50;
    return {
      date: `${i + 1}/${new Date().getMonth() + 1}`,
      value: Math.max(value, 0).toFixed(2)
    };
  });
};

const weekData = generateData(7, 1000);
const monthData = generateData(30, 1000);
const yearData = generateData(12, 1000).map((item, i) => ({
  date: new Date(2023, i, 1).toLocaleString('default', { month: 'short' }),
  value: item.value
}));

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow-sm text-sm">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-primary">{`$${Number(payload[0].value).toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

interface PerformanceChartProps {
  className?: string;
}

const PerformanceChart = ({ className }: PerformanceChartProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className={cn("animate-pulse", className)}>
        <CardHeader>
          <CardTitle>Portfolio Performance</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] bg-muted/30 rounded-md" />
      </Card>
    );
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-4">
        <CardTitle>Portfolio Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="month">
          <TabsList className="mb-4 bg-muted/50">
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
          <TabsContent value="week" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weekData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis 
                  tickFormatter={(value) => `$${value}`} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12 }} 
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  strokeWidth={2} 
                  dot={false} 
                  activeDot={{ r: 6, fill: "#3B82F6", strokeWidth: 0 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="month" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => {
                    // Only show every 5th label to prevent overcrowding
                    const day = parseInt(value.split('/')[0]);
                    return day % 5 === 0 ? value : '';
                  }}
                />
                <YAxis 
                  tickFormatter={(value) => `$${value}`} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12 }} 
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  strokeWidth={2} 
                  dot={false} 
                  activeDot={{ r: 6, fill: "#3B82F6", strokeWidth: 0 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="year" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yearData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis 
                  tickFormatter={(value) => `$${value}`} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12 }} 
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  strokeWidth={2} 
                  dot={false} 
                  activeDot={{ r: 6, fill: "#3B82F6", strokeWidth: 0 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
