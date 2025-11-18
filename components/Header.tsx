import React from 'react';
import { Coins, Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white">
            <Coins size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">microfund.me</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">How it Works</a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Impact</a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Partners</a>
        </nav>

        <div className="md:hidden">
          <button className="p-2 text-gray-600">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;