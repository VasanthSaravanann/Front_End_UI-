import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  subtitle?: string;
  previousValue?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  icon,
  subtitle,
  previousValue 
}) => {
  const isPositive = change >= 0;
  const changeText = `${Math.abs(change)}% ${isPositive ? 'increase' : 'decrease'} compared to last period`;

  return (
    <div 
      className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl relative overflow-hidden group"
      role="region"
      aria-label={`${title} metrics`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-gray-900 font-medium">{title}</div>
            {subtitle && (
              <div className="text-sm text-gray-500 mt-0.5">{subtitle}</div>
            )}
          </div>
          <div 
            className="p-2 bg-blue-50 rounded-lg transition-colors duration-300 group-hover:bg-blue-100/80"
            aria-hidden="true"
          >
            {icon}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-baseline gap-2">
            <div 
              className="text-3xl font-bold text-gray-900 tracking-tight" 
              aria-label={`${title}: ${value}`}
            >
              {value}
            </div>
            <div 
              className={`flex items-center px-2 py-0.5 rounded-full text-sm ${
                isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}
              aria-label={changeText}
            >
              {isPositive ? (
                <TrendingUp size={14} className="mr-1" aria-hidden="true" />
              ) : (
                <TrendingDown size={14} className="mr-1" aria-hidden="true" />
              )}
              {Math.abs(change)}%
            </div>
          </div>

          {previousValue && (
            <div className="text-sm text-gray-500">
              Previous: {previousValue}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};