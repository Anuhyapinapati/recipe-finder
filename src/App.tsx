import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import RecipeGrid from './components/RecipeGrid';
import RecipeModal from './components/RecipeModal';
import { Recipe } from './types/Recipe';
import { searchRecipesByIngredient, getRecipeDetails, getRecipesByCategory } from './services/api';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('recipe-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Load popular recipes on initial load
    loadPopularRecipes();
  }, []);

  const loadPopularRecipes = async () => {
    setLoading(true);
    setError('');
    try {
      const popularRecipes = await getRecipesByCategory('Chicken');
      setRecipes(popularRecipes.slice(0, 12)); // Show first 12 recipes
    } catch (err) {
      setError('Failed to load recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Updated with smart fallback
  const handleSearch = async (term: string) => {
    const query = term.trim();
    if (!query) return;

    setLoading(true);
    setError('');
    setSearchQuery(query);

    try {
      // Step 1: Try ingredient search
      let results = await searchRecipesByIngredient(query);

      // Step 2: If no ingredient results, try category
      if (!results.length) {
        const map: Record<string, string> = {
          pasta: 'Pasta',
          veg: 'Vegetarian',
          vegetables: 'Vegetarian',
          fish: 'Seafood',
          seafood: 'Seafood',
          dessert: 'Dessert',
        };

        const category =
          map[query.toLowerCase()] ||
          (query.charAt(0).toUpperCase() + query.slice(1).toLowerCase());

        const catResults = await getRecipesByCategory(category);
        if (catResults.length) {
          results = catResults;
        }
      }

      // Step 3: If still empty, show error
      if (!results.length) {
        setError(
          `No recipes found for "${query}". Try a specific ingredient (e.g., "tomato", "chicken") or a valid category.`
        );
      }

      setRecipes(results.slice(0, 12));
    } catch (err) {
      console.error('Search failed:', err);
      setError('Failed to search recipes. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = async (recipe: Recipe) => {
    try {
      const detailedRecipe = await getRecipeDetails(recipe.idMeal);
      setSelectedRecipe(detailedRecipe);
    } catch (err) {
      setError('Failed to load recipe details. Please try again.');
    }
  };

  const handleCategoryFilter = async (category: string) => {
    setLoading(true);
    setError('');
    setSearchQuery('');

    try {
      const categoryRecipes = await getRecipesByCategory(category);
      setRecipes(categoryRecipes.slice(0, 12));
    } catch (err) {
      setError('Failed to load category recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (recipeId: string) => {
    const newFavorites = favorites.includes(recipeId)
      ? favorites.filter(id => id !== recipeId)
      : [...favorites, recipeId];

    setFavorites(newFavorites);
    localStorage.setItem('recipe-favorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <SearchSection
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
          searchQuery={searchQuery}
        />

        <RecipeGrid
          recipes={recipes}
          loading={loading}
          error={error}
          favorites={favorites}
          onRecipeClick={handleRecipeClick}
          onToggleFavorite={toggleFavorite}
          onRetry={loadPopularRecipes}
        />

        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            isFavorite={favorites.includes(selectedRecipe.idMeal)}
            onClose={() => setSelectedRecipe(null)}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </main>
    </div>
  );
}

export default App;
