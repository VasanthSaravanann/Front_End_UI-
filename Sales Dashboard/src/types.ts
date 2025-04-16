export interface SalesData {
  date: string;
  revenue: number;
  orders: number;
}

export interface ProductData {
  name: string;
  sales: number;
  revenue: number;
}

export interface CategoryData {
  name: string;
  value: number;
}

export type DateRange = '7d' | '30d' | '90d' | '1y';
export type MetricType = 'revenue' | 'orders';

export type NavItem = {
  label: string;
  value: string;
  icon: React.ComponentType;
};

export interface FilterState {
  dateRange: DateRange;
  category: string;
  product: string;
  metric: MetricType;
}