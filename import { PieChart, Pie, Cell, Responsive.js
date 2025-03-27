import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const data = [
  { name: 'Stocks', value: 45, color: '#3B82F6' },
  { name: 'Bonds', value: 20, color: '#10B981' },
  { name: 'Real Estate', value: 15, color: '#F59E0B' },
  { name: 'Crypto', value: 10, color: '#8B5CF6' },
  { name: 'Cash', value: 10, color: '#6B7280' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow-sm text-sm">
        <p className="font-medium">{`${payload[0].name}`}</p>
        <p className="text-primary">{`${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const renderLegend = (props: any) => {
  const { payload } = props;
  
  return (
    <ul className="flex flex-wrap justify-center gap-3 mt-4">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center text-sm">
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.value}: {entry.payload.value}%</span>
        </li>
      ))}
    </ul>
  );
};

interface AssetAllocationProps {
  className?: string;
}

const AssetAllocation = ({ className }: AssetAllocationProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className={cn("animate-pulse", className)}>
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent className="h-[260px] bg-muted/30 rounded-md" />
      </Card>
    );
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={renderLegend} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetAllocation;
