import { addDays, format, subDays } from 'date-fns';
import { CategoryData, ProductData, SalesData } from './types';

const generateDailyData = (days: number): SalesData[] => {
  const data: SalesData[] = [];
  const today = new Date();

  for (let i = days; i >= 0; i--) {
    const date = subDays(today, i);
    const baseRevenue = 10000 + Math.random() * 15000;
    const baseOrders = 150 + Math.random() * 100;
    
    // Add some weekly patterns
    const dayOfWeek = date.getDay();
    const weekendMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 1.3 : 1;
    
    data.push({
      date: format(date, 'MMM dd'),
      revenue: Math.round(baseRevenue * weekendMultiplier),
      orders: Math.round(baseOrders * weekendMultiplier),
    });
  }

  return data;
};

export const salesData = generateDailyData(90);

export const topProducts: ProductData[] = [
  { name: 'Premium Headphones', sales: 1234, revenue: 246800 },
  { name: 'Wireless Earbuds', sales: 2341, revenue: 187280 },
  { name: 'Smart Watch', sales: 1876, revenue: 169840 },
  { name: 'Laptop Stand', sales: 3421, revenue: 123156 },
  { name: 'USB-C Hub', sales: 4532, revenue: 108768 },
];

export const categoryData: CategoryData[] = [
  { name: 'Electronics', value: 45 },
  { name: 'Accessories', value: 25 },
  { name: 'Audio', value: 20 },
  { name: 'Gadgets', value: 10 },
];

export const categories = ['Electronics', 'Accessories', 'Audio', 'Gadgets'];
export const products = topProducts.map(p => p.name);

export const defaultFilters = {
  dateRange: '30d' as const,
  category: '',
  product: '',
  metric: 'revenue' as const,
};