import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, CreditCard, Wallet, Building, ArrowRight, ArrowUpRight, ExternalLink, DollarSign, Bitcoin } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface WalletCard {
  id: string;
  name: string;
  type: 'bank' | 'crypto' | 'brokerage' | 'cash';
  balance: string;
  number?: string;
  icon: React.ReactNode;
}

const wallets: WalletCard[] = [
  {
    id: '1',
    name: 'Chase Bank',
    type: 'bank',
    balance: '$12,450.65',
    number: '****4587',
    icon: <Building className="h-5 w-5" />
  },
  {
    id: '2',
    name: 'Fidelity Investments',
    type: 'brokerage',
    balance: '$28,750.25',
    number: '****7852',
    icon: <CreditCard className="h-5 w-5" />
  },
  {
    id: '3',
    name: 'Coinbase',
    type: 'crypto',
    balance: '$5,840.15',
    icon: <Bitcoin className="h-5 w-5" />
  },
  {
    id: '4',
    name: 'Cash',
    type: 'cash',
    balance: '$750.00',
    icon: <DollarSign className="h-5 w-5" />
  }
];

interface RecentActivity {
  id: string;
  description: string;
  amount: string;
  date: string;
  wallet: string;
}

const recentActivity: RecentActivity[] = [
  {
    id: '1',
    description: 'Deposit to Fidelity',
    amount: '+$2,000.00',
    date: 'Today, 10:30 AM',
    wallet: 'Chase Bank'
  },
  {
    id: '2',
    description: 'Withdrawal to Bank',
    amount: '-$500.00',
    date: 'Yesterday, 2:45 PM',
    wallet: 'Coinbase'
  },
  {
    id: '3',
    description: 'Stock Purchase: AAPL',
    amount: '-$935.50',
    date: 'Jun 15, 9:15 AM',
    wallet: 'Fidelity Investments'
  },
  {
    id: '4',
    description: 'Cash Deposit',
    amount: '+$250.00',
    date: 'Jun 10, 11:30 AM',
    wallet: 'Cash'
  }
];

const Wallets = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 animate-slide-down">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Wallets</h1>
            <p className="text-muted-foreground mt-1">
              Manage your connected accounts and wallets
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button size="sm" className="h-9">
              <Plus className="h-4 w-4 mr-2" />
              Add New Wallet
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {wallets.map((wallet, index) => (
            <Card 
              key={wallet.id} 
              className="hover-scale animate-scale-in" 
              style={{ animationDelay: `${100 * (index + 1)}ms` }}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="p-2 rounded-full bg-primary/10">
                    {wallet.icon}
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium text-lg">{wallet.name}</h3>
                {wallet.number && (
                  <p className="text-xs text-muted-foreground mb-1">{wallet.number}</p>
                )}
                <p className="text-xl font-bold mt-2">{wallet.balance}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-6">
          <Card className="lg:col-span-2 animate-scale-in" style={{ animationDelay: '500ms' }}>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {recentActivity.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <div className="font-medium">{activity.description}</div>
                      <div className="text-xs text-muted-foreground">
                        {activity.date} • {activity.wallet}
                      </div>
                    </div>
                    <div className="text-right font-medium">
                      {activity.amount}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-sm">
                View All Activity
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="animate-scale-in" style={{ animationDelay: '600ms' }}>
            <CardHeader>
              <CardTitle>Asset Distribution</CardTitle>
              <CardDescription>Funds across your wallets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Brokerage (60.5%)</span>
                  <span className="font-medium">$28,750.25</span>
                </div>
                <Progress value={60.5} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Bank (26.2%)</span>
                  <span className="font-medium">$12,450.65</span>
                </div>
                <Progress value={26.2} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Crypto (12.3%)</span>
                  <span className="font-medium">$5,840.15</span>
                </div>
                <Progress value={12.3} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Cash (1.0%)</span>
                  <span className="font-medium">$750.00</span>
                </div>
                <Progress value={1.0} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="animate-scale-in" style={{ animationDelay: '700ms' }}>
          <CardHeader>
            <Tabs defaultValue="connect">
              <TabsList className="grid grid-cols-2 w-[400px]">
                <TabsTrigger value="connect">Connect Accounts</TabsTrigger>
                <TabsTrigger value="transfer">Transfer Funds</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="connect" className="mt-0">
              <div className="grid gap-4 md:grid-cols-3">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center justify-center gap-2">
                  <Building className="h-6 w-6" />
                  <span>Connect Bank</span>
                  <span className="text-xs text-muted-foreground">Securely link your bank accounts</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center justify-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  <span>Connect Brokerage</span>
                  <span className="text-xs text-muted-foreground">Link investment accounts</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center justify-center gap-2">
                  <Bitcoin className="h-6 w-6" />
                  <span>Connect Crypto</span>
                  <span className="text-xs text-muted-foreground">Link cryptocurrency exchanges</span>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="transfer" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-medium">Quick Transfer</h3>
                  <p className="text-sm text-muted-foreground">Transfer funds between your connected accounts</p>
                  <Button className="mt-4">Start Transfer</Button>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Recent Transfers</h3>
                  <div className="text-sm text-muted-foreground">View your recent transfer history between accounts</div>
                  <Button variant="outline" className="mt-4">View History</Button>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Wallets;
