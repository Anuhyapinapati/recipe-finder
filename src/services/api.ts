import { Recipe } from '../types/Recipe';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const searchRecipesByIngredient = async (ingredient: string): Promise<Recipe[]> => {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

export const getRecipeDetails = async (mealId: string): Promise<Recipe> => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${mealId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipe details');
    }
    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};

export const getRecipesByCategory = async (category: string): Promise<Recipe[]> => {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipes by category');
    }
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error fetching recipes by category:', error);
    throw error;
  }
};

export const getRandomRecipe = async (): Promise<Recipe> => {
  try {
    const response = await fetch(`${BASE_URL}/random.php`);
    if (!response.ok) {
      throw new Error('Failed to fetch random recipe');
    }
    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    throw error;
  }
};