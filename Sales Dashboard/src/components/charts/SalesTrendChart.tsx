import React, { memo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { SalesData, MetricType } from '../../types';

interface SalesTrendChartProps {
  data: SalesData[];
  metric: MetricType;
}

const SalesTrendChart: React.FC<SalesTrendChartProps> = memo(({ data, metric }) => {
  const metricLabel = metric === 'revenue' ? 'Revenue' : 'Orders';

  const formatValue = (value: number, metricType: MetricType) => {
    if (metricType === 'revenue') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    }
    return value.toLocaleString();
  };

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0088FE" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#0088FE" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#666' }}
            axisLine={{ stroke: '#eee' }}
            tickLine={{ stroke: '#eee' }}
          />
          <YAxis 
            tick={{ fill: '#666' }}
            axisLine={{ stroke: '#eee' }}
            tickLine={{ stroke: '#eee' }}
            tickFormatter={(value) => metric === 'revenue' ? `$${value/1000}k` : value}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value: number) => [formatValue(value, metric), metricLabel]}
            animationDuration={300}
            cursor={{ stroke: '#0088FE', strokeWidth: 1, strokeDasharray: '4 4' }}
          />
          <Legend 
            verticalAlign="top"
            height={36}
            formatter={(value) => <span className="text-sm font-medium text-gray-600">{value}</span>}
          />
          <Area
            type="monotone"
            dataKey={metric}
            name={metricLabel}
            stroke="#0088FE"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorRevenue)"
            animationDuration={1500}
            animationBegin={0}
            dot={{ stroke: '#0088FE', strokeWidth: 2, fill: '#fff', r: 4 }}
            activeDot={{ stroke: '#0088FE', strokeWidth: 2, fill: '#0088FE', r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

SalesTrendChart.displayName = 'SalesTrendChart';

export default SalesTrendChart;
export { SalesTrendChart };