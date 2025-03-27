import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import BalanceCard from '@/components/dashboard/BalanceCard';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import AssetAllocation from '@/components/dashboard/AssetAllocation';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import TopAssets from '@/components/dashboard/TopAssets';

const Index = () => {
  useEffect(() => {
    // Fade in animation for the entire page
    document.body.classList.add('animate-in');
    return () => {
      document.body.classList.remove('animate-in');
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        <div className="mb-8 animate-slide-down">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Your financial overview and investment summary
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <BalanceCard
            title="Total Balance"
            value="$43,750.65"
            change={{
              value: "$1,250.23",
              percentage: "+2.9%",
              positive: true
            }}
          />
          <BalanceCard
            title="Monthly Return"
            value="$1,354.21"
            change={{
              value: "$354.21",
              percentage: "+35.4%",
              positive: true
            }}
          />
          <BalanceCard
            title="Annual Return"
            value="$6,248.15"
            change={{
              value: "$1,123.45",
              percentage: "+21.9%",
              positive: true
            }}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-6">
          <PerformanceChart className="lg:col-span-2 animate-scale-in" style={{ animationDelay: '200ms' }} />
          <AssetAllocation className="animate-scale-in" style={{ animationDelay: '300ms' }} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <RecentTransactions className="animate-scale-in" style={{ animationDelay: '400ms' }} />
          <TopAssets className="animate-scale-in" style={{ animationDelay: '500ms' }} />
        </div>
      </main>
    </div>
  );
};

export default Index;
