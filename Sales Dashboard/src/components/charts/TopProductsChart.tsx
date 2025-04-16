import React, { useState, memo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ProductData } from '../../types';

interface TopProductsChartProps {
  data: ProductData[];
}

export const TopProductsChart: React.FC<TopProductsChartProps> = memo(({ data }) => {
  const [focusBar, setFocusBar] = useState<string | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          barGap={8}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#666' }}
            axisLine={{ stroke: '#eee' }}
            tickLine={{ stroke: '#eee' }}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            yAxisId="left"
            tick={{ fill: '#666' }}
            axisLine={{ stroke: '#eee' }}
            tickLine={{ stroke: '#eee' }}
            tickFormatter={(value) => `$${value/1000}k`}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            tick={{ fill: '#666' }}
            axisLine={{ stroke: '#eee' }}
            tickLine={{ stroke: '#eee' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value: number, name: string) => {
              if (name === 'revenue') return [formatCurrency(value), 'Revenue'];
              return [value.toLocaleString(), 'Sales'];
            }}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
            animationDuration={300}
          />
          <Legend 
            verticalAlign="top" 
            height={36}
            formatter={(value) => (
              <span className={`text-sm font-medium ${focusBar && focusBar !== value ? 'text-gray-400' : 'text-gray-600'}`}>
                {value === 'revenue' ? 'Revenue' : 'Sales'}
              </span>
            )}
          />
          <Bar 
            yAxisId="left"
            dataKey="revenue" 
            fill="#0088FE"
            radius={[4, 4, 0, 0]}
            className={`transition-all duration-300 ${focusBar && focusBar !== 'revenue' ? 'opacity-30' : 'opacity-100'}`}
            onMouseEnter={() => setFocusBar('revenue')}
            onMouseLeave={() => setFocusBar(null)}
            animationBegin={0}
            animationDuration={1500}
          />
          <Bar 
            yAxisId="right"
            dataKey="sales" 
            fill="#00C49F"
            radius={[4, 4, 0, 0]}
            className={`transition-all duration-300 ${focusBar && focusBar !== 'sales' ? 'opacity-30' : 'opacity-100'}`}
            onMouseEnter={() => setFocusBar('sales')}
            onMouseLeave={() => setFocusBar(null)}
            animationBegin={200}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

TopProductsChart.displayName = 'TopProductsChart';