import { ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface BalanceCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    percentage: string;
    positive: boolean;
  };
  className?: string;
}

const BalanceCard = ({ title, value, change, className }: BalanceCardProps) => {
  return (
    <Card className={cn("hover-scale transition-all duration-300", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1 text-sm">
          {change.positive ? (
            <div className="flex items-center text-positive">
              <ArrowUp className="w-3 h-3 mr-1" />
              <span>{change.value}</span>
            </div>
          ) : (
            <div className="flex items-center text-negative">
              <ArrowDown className="w-3 h-3 mr-1" />
              <span>{change.value}</span>
            </div>
          )}
          <span className="ml-2 text-muted-foreground">
            {change.percentage} this month
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;