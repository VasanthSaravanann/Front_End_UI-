import React from 'react';
import { DollarSign, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import { MetricCard } from './MetricCard';

export const MetricsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard
        title="Total Revenue"
        subtitle="Last 30 days"
        value="$524,390"
        previousValue="$466,125"
        change={12.5}
        icon={<DollarSign className="text-blue-600" />}
      />
      <MetricCard
        title="Total Orders"
        subtitle="Last 30 days"
        value="8,742"
        previousValue="8,080"
        change={8.2}
        icon={<ShoppingCart className="text-green-600" />}
      />
      <MetricCard
        title="Average Order Value"
        subtitle="Per transaction"
        value="$59.98"
        previousValue="$61.45"
        change={-2.4}
        icon={<TrendingUp className="text-purple-600" />}
      />
      <MetricCard
        title="Active Customers"
        subtitle="Monthly active users"
        value="3,427"
        previousValue="2,959"
        change={15.8}
        icon={<Users className="text-orange-600" />}
      />
    </div>
  );
};