import { ArrowDown, ArrowUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  asset: string;
  amount: string;
  date: string;
  value: string;
}

const transactions: Transaction[] = [
  {
    id: '1',
    type: 'buy',
    asset: 'Apple Inc.',
    amount: '5 shares',
    date: 'Today, 10:30 AM',
    value: '+$935.50'
  },
  {
    id: '2',
    type: 'sell',
    asset: 'Bitcoin',
    amount: '0.25 BTC',
    date: 'Yesterday, 2:45 PM',
    value: '-$5,240.00'
  },
  {
    id: '3',
    type: 'buy',
    asset: 'S&P 500 ETF',
    amount: '10 shares',
    date: 'Jun 15, 9:15 AM',
    value: '+$4,350.25'
  },
  {
    id: '4',
    type: 'buy',
    asset: 'Tesla Inc.',
    amount: '2 shares',
    date: 'Jun 10, 11:30 AM',
    value: '+$510.75'
  }
];

interface RecentTransactionsProps {
  className?: string;
}

const RecentTransactions = ({ className }: RecentTransactionsProps) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Recent Transactions</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs h-8">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className="flex items-center justify-between py-3 border-b last:border-0"
            >
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  transaction.type === 'buy' 
                    ? "bg-green-100 text-green-600" 
                    : "bg-red-100 text-red-600"
                )}>
                  {transaction.type === 'buy' ? (
                    <ArrowDown className="h-4 w-4" />
                  ) : (
                    <ArrowUp className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <div className="font-medium">{transaction.asset}</div>
                  <div className="text-xs text-muted-foreground">{transaction.amount}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={transaction.type === 'buy' ? 'text-positive' : 'text-negative'}>
                  {transaction.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {transaction.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
