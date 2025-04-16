import React, { ReactNode, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

interface ChartContainerProps {
  title: string;
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
}

const ChartSkeleton = () => (
  <div 
    className="animate-pulse h-[300px] flex items-center justify-center bg-gray-50 rounded-lg"
    role="progressbar"
    aria-label="Loading chart data"
  >
    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
  </div>
);

export const ChartContainer: React.FC<ChartContainerProps> = ({ 
  title, 
  children, 
  className = '',
  isLoading = false
}) => {
  return (
    <section 
      className={`bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}
      aria-labelledby={`chart-title-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <h2 
        id={`chart-title-${title.toLowerCase().replace(/\s+/g, '-')}`}
        className="text-xl font-semibold mb-6 text-gray-900"
      >
        {title}
      </h2>
      <div className="transition-opacity duration-300">
        {isLoading ? <ChartSkeleton /> : children}
      </div>
    </section>
  );
};

export default ChartContainer;