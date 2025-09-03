import React from 'react';
import { Search, AlertCircle, ChefHat } from 'lucide-react';

interface EmptyStateProps {
  type: 'empty' | 'error';
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, title, message, actionLabel, onAction }) => {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return <AlertCircle className="h-16 w-16 text-red-400" />;
      case 'empty':
      default:
        return <Search className="h-16 w-16 text-gray-400" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'error':
        return 'bg-red-50';
      case 'empty':
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className={`${getBackgroundColor()} rounded-3xl p-12 text-center`}>
        <div className="flex justify-center mb-6">
          {getIcon()}
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">{message}</p>
        
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-medium"
          >
            {actionLabel}
          </button>
        )}
        
        {type === 'empty' && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center text-gray-500">
              <ChefHat className="h-5 w-5 mr-2" />
              <span className="text-sm">Try searching for common ingredients like chicken, pasta, or vegetables</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;