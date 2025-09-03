import React, { useMemo } from 'react';
import { X, Heart, Clock, Users, ExternalLink, Youtube } from 'lucide-react';
import { Recipe } from '../types/Recipe';

interface RecipeModalProps {
  recipe: Recipe;
  isFavorite: boolean;
  onClose: () => void;
  onToggleFavorite: (recipeId: string) => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, isFavorite, onClose, onToggleFavorite }) => {
  const ingredients = useMemo(() => {
    const ingredientList = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof Recipe] as string;
      const measure = recipe[`strMeasure${i}` as keyof Recipe] as string;
      if (ingredient && ingredient.trim()) {
        ingredientList.push({
          name: ingredient.trim(),
          measure: measure ? measure.trim() : '',
        });
      }
    }
    return ingredientList;
  }, [recipe]);

  const instructions = useMemo(() => {
    if (!recipe.strInstructions) return [];
    return recipe.strInstructions
      .split(/\d+\.|\r\n|\n/)
      .filter(step => step.trim().length > 0)
      .map(step => step.trim());
  }, [recipe.strInstructions]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="relative">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>

          {/* Favorite Button */}
          <button
            onClick={() => onToggleFavorite(recipe.idMeal)}
            className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
              isFavorite
                ? 'bg-red-500 text-white scale-110'
                : 'bg-white/90 text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-3xl font-bold text-white mb-2">{recipe.strMeal}</h2>
            <div className="flex items-center space-x-4 text-white/90">
              {recipe.strArea && (
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                  {recipe.strArea}
                </span>
              )}
              {recipe.strCategory && (
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                  {recipe.strCategory}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Quick Info */}
          <div className="flex items-center space-x-6 mb-6 p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-orange-500 mr-2" />
              <span className="text-gray-700">30 mins</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-gray-700">4 servings</span>
            </div>
            {recipe.strYoutube && (
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-red-600 hover:text-red-700 transition-colors"
              >
                <Youtube className="h-5 w-5 mr-2" />
                <span>Watch Video</span>
              </a>
            )}
            {recipe.strSource && (
              <a
                href={recipe.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                <span>Original Recipe</span>
              </a>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Ingredients */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Ingredients</h3>
              <div className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-800 font-medium">{ingredient.name}</span>
                    <span className="text-gray-600 text-sm">{ingredient.measure}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Instructions</h3>
              <div className="space-y-4">
                {instructions.map((step, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          {recipe.strTags && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.strTags.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;