import React from 'react';
import { DateRange } from '../types';

interface DateRangeSelectorProps {
  selectedRange: DateRange;
  onChange: (range: DateRange) => void;
}

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ selectedRange, onChange }) => {
  const ranges: { label: string; value: DateRange }[] = [
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 90 days', value: '90d' },
    { label: 'Last year', value: '1y' },
  ];

  return (
    <div 
      className="flex space-x-2"
      role="radiogroup"
      aria-label="Date range selection"
    >
      {ranges.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          aria-pressed={selectedRange === value}
          className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            selectedRange === value
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};