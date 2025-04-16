import React, { useState, lazy, Suspense } from 'react';
import { Menu, X } from 'lucide-react';
import { NavItem } from '../types';

// Lazy load icons
const Icons = {
  LayoutDashboard: lazy(() => import('lucide-react').then(mod => ({ default: mod.LayoutDashboard }))),
  TrendingUp: lazy(() => import('lucide-react').then(mod => ({ default: mod.TrendingUp }))),
  BarChart3: lazy(() => import('lucide-react').then(mod => ({ default: mod.BarChart3 }))),
  Users: lazy(() => import('lucide-react').then(mod => ({ default: mod.Users })))
};

const navItems: NavItem[] = [
  { label: 'Dashboard', value: 'dashboard', icon: Icons.LayoutDashboard },
  { label: 'Revenue', value: 'revenue', icon: Icons.TrendingUp },
  { label: 'Products', value: 'products', icon: Icons.BarChart3 },
  { label: 'Customers', value: 'customers', icon: Icons.Users },
];

interface NavigationProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

const IconWrapper = ({ Icon }: { Icon: React.ComponentType }) => (
  <Suspense fallback={<div className="w-4 h-4" />}>
    <Icon />
  </Suspense>
);

export const Navigation: React.FC<NavigationProps> = ({ activePage, onPageChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <IconWrapper Icon={Icons.LayoutDashboard} />
              <span className="ml-2 text-xl font-bold text-gray-900">Analytics</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map(({ label, value, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => onPageChange(value)}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${activePage === value 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-700 hover:text-gray-900 hover:border-gray-300 border-b-2 border-transparent'
                    }`}
                  aria-current={activePage === value ? 'page' : undefined}
                >
                  <IconWrapper Icon={Icon} />
                  <span className="ml-2">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        id="mobile-menu"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="pt-2 pb-3 space-y-1">
          {navItems.map(({ label, value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => {
                onPageChange(value);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center px-3 py-2 text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
                ${activePage === value
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              aria-current={activePage === value ? 'page' : undefined}
            >
              <IconWrapper Icon={Icon} />
              <span className="ml-3">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};