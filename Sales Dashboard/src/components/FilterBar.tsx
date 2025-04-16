import React, { lazy, Suspense } from 'react';
import { Filter, X } from 'lucide-react';
import { DateRange, MetricType, FilterState } from '../types';

const DateRangeSelector = lazy(() => import('./DateRangeSelector').then(module => ({ default: module.DateRangeSelector })));

interface FilterBarProps {
  filters: FilterState;
  categories: string[];
  products: string[];
  onFilterChange: (filters: Partial<FilterState>) => void;
  onReset: () => void;
}

const LoadingPlaceholder = () => (
  <div className="h-10 w-32 bg-gray-100 rounded-lg animate-pulse"></div>
);

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  categories,
  products,
  onFilterChange,
  onReset,
}) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 mb-6"
      role="region"
      aria-label="Dashboard filters"
    >
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="flex items-center gap-2 text-gray-900">
          <Filter size={20} aria-hidden="true" />
          <span className="font-medium">Filters</span>
        </div>

        <div className="flex flex-wrap gap-4 flex-1">
          <Suspense fallback={<LoadingPlaceholder />}>
            <DateRangeSelector
              selectedRange={filters.dateRange}
              onChange={(range) => onFilterChange({ dateRange: range })}
            />
          </Suspense>

          <div className="flex flex-col gap-1">
            <label htmlFor="category-select" className="sr-only">Select Category</label>
            <select
              id="category-select"
              value={filters.category}
              onChange={(e) => onFilterChange({ category: e.target.value })}
              className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="product-select" className="sr-only">Select Product</label>
            <select
              id="product-select"
              value={filters.product}
              onChange={(e) => onFilterChange({ product: e.target.value })}
              className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              <option value="">All Products</option>
              {products.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="metric-select" className="sr-only">Select Metric</label>
            <select
              id="metric-select"
              value={filters.metric}
              onChange={(e) => onFilterChange({ metric: e.target.value as MetricType })}
              className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              <option value="revenue">Revenue</option>
              <option value="orders">Orders</option>
            </select>
          </div>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Reset all filters"
        >
          <X size={16} aria-hidden="true" />
          Clear
        </button>
      </div>
    </div>
  );
};

export default FilterBar;