import React, { useState, lazy, Suspense } from 'react';
import { FilterBar } from './components/FilterBar';
import { Navigation } from './components/Navigation';
import { salesData, topProducts, categoryData, categories, products, defaultFilters } from './data';
import { FilterState } from './types';

// Lazy load components with loading states
const MetricsGrid = lazy(() => import('./components/MetricsGrid').then(module => ({ default: module.MetricsGrid })));
const ChartContainer = lazy(() => import('./components/ChartContainer').then(module => ({ default: module.ChartContainer })));
const SalesTrendChart = lazy(() => import('./components/charts/SalesTrendChart'));
const CategoryPieChart = lazy(() => import('./components/charts/CategoryPieChart').then(module => ({ default: module.CategoryPieChart })));
const TopProductsChart = lazy(() => import('./components/charts/TopProductsChart').then(module => ({ default: module.TopProductsChart })));

// Loading fallback component
const LoadingFallback = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
    <div className="space-y-4">
      <div className="h-32 bg-gray-200 rounded"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
    </div>
  </div>
);

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = async (newFilters: Partial<FilterState>) => {
    setIsLoading(true);
    setFilters(prev => ({ ...prev, ...newFilters }));
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoading(false);
  };

  const handleFilterReset = async () => {
    setIsLoading(true);
    setFilters(defaultFilters);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoading(false);
  };

  const filteredData = {
    sales: salesData,
    products: filters.category
      ? topProducts.filter(p => p.name.includes(filters.category))
      : topProducts,
    categories: filters.product
      ? categoryData.filter(c => c.name.includes(filters.product))
      : categoryData,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activePage={activePage} onPageChange={setActivePage} />
      
      <main className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Sales Dashboard</h1>
            <FilterBar
              filters={filters}
              categories={categories}
              products={products}
              onFilterChange={handleFilterChange}
              onReset={handleFilterReset}
            />
          </div>

          <Suspense fallback={<LoadingFallback />}>
            <MetricsGrid />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Suspense fallback={<LoadingFallback />}>
                <ChartContainer title="Sales Trend" className="lg:col-span-2" isLoading={isLoading}>
                  <Suspense fallback={null}>
                    <SalesTrendChart data={filteredData.sales} metric={filters.metric} />
                  </Suspense>
                </ChartContainer>
              </Suspense>

              <Suspense fallback={<LoadingFallback />}>
                <ChartContainer title="Sales by Category" isLoading={isLoading}>
                  <Suspense fallback={null}>
                    <CategoryPieChart data={filteredData.categories} />
                  </Suspense>
                </ChartContainer>
              </Suspense>

              <Suspense fallback={<LoadingFallback />}>
                <ChartContainer title="Top Products" className="lg:col-span-3" isLoading={isLoading}>
                  <Suspense fallback={null}>
                    <TopProductsChart data={filteredData.products} />
                  </Suspense>
                </ChartContainer>
              </Suspense>
            </div>
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default App;