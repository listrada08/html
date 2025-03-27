import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Filter, Plus, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  asset: string;
  symbol: string;
  amount: string;
  price: string;
  value: string;
  date: string;
}

const transactions: Transaction[] = [
  {
    id: '1',
    type: 'buy',
    asset: 'Apple Inc.',
    symbol: 'AAPL',
    amount: '5 shares',
    price: '$187.00',
    value: '$935.00',
    date: 'Jun 18, 2023, 10:30 AM'
  },
  {
    id: '2',
    type: 'sell',
    asset: 'Bitcoin',
    symbol: 'BTC',
    amount: '0.25 BTC',
    price: '$20,960.00',
    value: '$5,240.00',
    date: 'Jun 17, 2023, 2:45 PM'
  },
  {
    id: '3',
    type: 'buy',
    asset: 'Vanguard S&P 500 ETF',
    symbol: 'VOO',
    amount: '10 shares',
    price: '$435.00',
    value: '$4,350.00',
    date: 'Jun 15, 2023, 9:15 AM'
  },
  {
    id: '4',
    type: 'buy',
    asset: 'Tesla Inc.',
    symbol: 'TSLA',
    amount: '2 shares',
    price: '$255.50',
    value: '$511.00',
    date: 'Jun 10, 2023, 11:30 AM'
  },
  {
    id: '5',
    type: 'sell',
    asset: 'Amazon',
    symbol: 'AMZN',
    amount: '3 shares',
    price: '$175.25',
    value: '$525.75',
    date: 'Jun 8, 2023, 3:20 PM'
  },
  {
    id: '6',
    type: 'buy',
    asset: 'Ethereum',
    symbol: 'ETH',
    amount: '1.5 ETH',
    price: '$1,850.00',
    value: '$2,775.00',
    date: 'Jun 5, 2023, 5:45 PM'
  },
  {
    id: '7',
    type: 'buy',
    asset: 'Microsoft',
    symbol: 'MSFT',
    amount: '4 shares',
    price: '$395.50',
    value: '$1,582.00',
    date: 'Jun 2, 2023, 10:15 AM'
  },
  {
    id: '8',
    type: 'sell',
    asset: 'Google',
    symbol: 'GOOGL',
    amount: '6 shares',
    price: '$125.75',
    value: '$754.50',
    date: 'May 28, 2023, 1:30 PM'
  }
];

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 animate-slide-down">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
            <p className="text-muted-foreground mt-1">
              View and manage your transaction history
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" className="h-9">
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          </div>
        </div>

        <Card className="animate-scale-in" style={{ animationDelay: '100ms' }}>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle>Transaction History</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search transactions..."
                    className="pl-8 h-9 md:w-[200px] lg:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="h-9 w-[130px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="buy">Buy Only</SelectItem>
                    <SelectItem value="sell">Sell Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-sm text-muted-foreground border-b">
                    <th className="pb-3 text-left font-medium">Type</th>
                    <th className="pb-3 text-left font-medium">Asset</th>
                    <th className="pb-3 text-right font-medium">Amount</th>
                    <th className="pb-3 text-right font-medium">Price</th>
                    <th className="pb-3 text-right font-medium">Value</th>
                    <th className="pb-3 text-right font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions
                    .filter(transaction => 
                      transaction.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      transaction.symbol.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((transaction) => (
                    <tr key={transaction.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center mr-2
                            ${transaction.type === 'buy' 
                              ? "bg-green-100 text-green-600" 
                              : "bg-red-100 text-red-600"
                            }
                          `}>
                            {transaction.type === 'buy' ? (
                              <ArrowDown className="h-4 w-4" />
                            ) : (
                              <ArrowUp className="h-4 w-4" />
                            )}
                          </div>
                          <span className="capitalize">{transaction.type}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="font-medium">{transaction.asset}</div>
                        <div className="text-xs text-muted-foreground">{transaction.symbol}</div>
                      </td>
                      <td className="py-4 text-right">{transaction.amount}</td>
                      <td className="py-4 text-right">{transaction.price}</td>
                      <td className="py-4 text-right font-medium">{transaction.value}</td>
                      <td className="py-4 text-right text-muted-foreground">{transaction.date}</td>
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

export default Transactions;
