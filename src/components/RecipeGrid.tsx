import React from 'react';
import { Recipe } from '../types/Recipe';
import RecipeCard from './RecipeCard';
import LoadingGrid from './LoadingGrid';
import EmptyState from './EmptyState';

interface RecipeGridProps {
  recipes: Recipe[];
  loading: boolean;
  error: string;
  favorites: string[];
  onRecipeClick: (recipe: Recipe) => void;
  onToggleFavorite: (recipeId: string) => void;
  onRetry: () => void;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({
  recipes,
  loading,
  error,
  favorites,
  onRecipeClick,
  onToggleFavorite,
  onRetry,
}) => {
  if (loading) {
    return <LoadingGrid />;
  }

  if (error) {
    return (
      <EmptyState
        type="error"
        title="Oops! Something went wrong"
        message={error}
        actionLabel="Try Again"
        onAction={onRetry}
      />
    );
  }

  if (recipes.length === 0) {
    return (
      <EmptyState
        type="empty"
        title="No recipes found"
        message="Try searching for a different ingredient or browse our categories above."
        actionLabel="Browse Categories"
        onAction={onRetry}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          {recipes.length} Recipe{recipes.length !== 1 ? 's' : ''} Found
        </h3>
        <div className="text-sm text-gray-600">
          Perfect for busy professionals
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            isFavorite={favorites.includes(recipe.idMeal)}
            onClick={() => onRecipeClick(recipe)}
            onToggleFavorite={() => onToggleFavorite(recipe.idMeal)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeGrid;