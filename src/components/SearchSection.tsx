import React, { useState } from 'react';
import { Search, Clock, Utensils, Globe, Flame } from 'lucide-react';

interface SearchSectionProps {
  onSearch: (ingredient: string) => void;
  onCategoryFilter: (category: string) => void;
  searchQuery: string;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch, onCategoryFilter, searchQuery }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
      setInputValue('');
    }
  };

  const quickCategories = [
    { name: 'Quick & Easy', category: 'Pasta', icon: Clock, color: 'bg-blue-500' },
    { name: 'Healthy', category: 'Vegetarian', icon: Utensils, color: 'bg-green-500' },
    { name: 'Comfort Food', category: 'Beef', icon: Flame, color: 'bg-red-500' },
    { name: 'International', category: 'Seafood', icon: Globe, color: 'bg-purple-500' },
  ];

  const popularIngredients = ['chicken', 'beef', 'pasta', 'rice', 'salmon', 'tomato'];

  return (
    <div className="mb-8">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          What's in your kitchen?
        </h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Enter an ingredient you have at home, and we'll find delicious recipes perfect for your busy schedule.
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter an ingredient (e.g., chicken, tomato, pasta)..."
            className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-medium">
              Search
            </span>
          </button>
        </div>
      </form>

      {/* Popular Ingredients */}
      <div className="max-w-4xl mx-auto mb-8">
        <p className="text-center text-gray-600 mb-4">Popular ingredients:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {popularIngredients.map((ingredient) => (
            <button
              key={ingredient}
              onClick={() => onSearch(ingredient)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 text-gray-700 capitalize"
            >
              {ingredient}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Categories */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Or browse by category
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickCategories.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => onCategoryFilter(item.category)}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className={`${item.color} w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 text-center">{item.name}</h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Search Display */}
      {searchQuery && (
        <div className="max-w-4xl mx-auto mt-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-center text-gray-600">
              Showing recipes with: <span className="font-semibold text-orange-600 capitalize">{searchQuery}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSection;