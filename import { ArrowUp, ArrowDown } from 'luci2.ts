import { ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Asset {
  id: string;
  name: string;
  symbol: string;
  price: string;
  change: {
    value: string;
    percentage: string;
    positive: boolean;
  };
  holdings: string;
}

const assets: Asset[] = [
  {
    id: '1',
    name: 'Apple Inc.',
    symbol: 'AAPL',
    price: '$187.00',
    change: {
      value: '$3.45',
      percentage: '1.87%',
      positive: true
    },
    holdings: '$9,350'
  },
  {
    id: '2',
    name: 'Microsoft',
    symbol: 'MSFT',
    price: '$402.25',
    change: {
      value: '$5.75',
      percentage: '1.45%',
      positive: true
    },
    holdings: '$12,067'
  },
  {
    id: '3',
    name: 'Amazon',
    symbol: 'AMZN',
    price: '$178.75',
    change: {
      value: '$2.25',
      percentage: '1.24%',
      positive: false
    },
    holdings: '$7,150'
  },
  {
    id: '4',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: '$61,250',
    change: {
      value: '$1,250',
      percentage: '2.08%',
      positive: true
    },
    holdings: '$15,312'
  }
];

interface TopAssetsProps {
  className?: string;
}

const TopAssets = ({ className }: TopAssetsProps) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Top Assets</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs h-8">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-3 text-xs font-medium text-muted-foreground">
          <div>Asset</div>
          <div className="text-right">Price / Change</div>
          <div className="text-right">Holdings</div>
        </div>
        <div className="space-y-3">
          {assets.map((asset) => (
            <div 
              key={asset.id} 
              className="grid grid-cols-3 gap-4 items-center py-3 border-b last:border-0"
            >
              <div>
                <div className="font-medium">{asset.name}</div>
                <div className="text-xs text-muted-foreground">{asset.symbol}</div>
              </div>
              <div className="text-right">
                <div>{asset.price}</div>
                <div className={cn(
                  "text-xs flex items-center justify-end",
                  asset.change.positive ? "text-positive" : "text-negative"
                )}>
                  {asset.change.positive ? (
                    <ArrowUp className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-1" />
                  )}
                  {asset.change.percentage}
                </div>
              </div>
              <div className="text-right font-medium">
                {asset.holdings}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopAssets;
