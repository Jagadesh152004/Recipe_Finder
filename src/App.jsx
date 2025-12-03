import React, { useState, useEffect } from 'react';
import { Search, ChefHat, Clock, Globe } from 'lucide-react';

// SearchBar Component
function SearchBar({ onSearch, searchQuery, setSearchQuery }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for recipes... (e.g., chicken, pasta, cake)"
          className="w-full px-6 py-4 pr-12 text-lg rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none shadow-lg"
        />
        <button
          onClick={onSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-xl transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// FilterBar Component
function FilterBar({ selectedCategory, onCategoryChange }) {
  const categories = ['All', 'Breakfast', 'Dessert', 'Seafood', 'Vegetarian', 'Chicken', 'Beef', 'Pasta'];

  return (
    <div className="flex gap-3 mb-8 overflow-x-auto pb-2 px-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
            selectedCategory === cat
              ? 'bg-orange-500 text-white shadow-lg scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

// RecipeCard Component
function RecipeCard({ recipe }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer">
      <div className="relative h-48 overflow-hidden" onClick={() => setShowDetails(!showDetails)}>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {recipe.strCategory}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.strMeal}</h3>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4" />
            <span>{recipe.strArea}</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="w-4 h-4" />
            <span>{recipe.strCategory}</span>
          </div>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          {showDetails ? 'Hide Details' : 'View Recipe'}
        </button>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">Instructions:</h4>
            <p className="text-sm text-gray-600 leading-relaxed max-h-40 overflow-y-auto">
              {recipe.strInstructions}
            </p>
            {recipe.strYoutube && (
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-orange-500 hover:text-orange-600 font-medium text-sm"
              >
                Watch Video Tutorial →
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// RecipeList Component
function RecipeList({ recipes, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-20">
        <ChefHat className="w-20 h-20 mx-auto text-gray-300 mb-4" />
        <p className="text-xl text-gray-500">No recipes found. Try a different search!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
      ))}
    </div>
  );
}

// Main App Component
export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(false);

  // Fetch recipes by search query
  const searchRecipes = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      const data = await response.json();
      setRecipes(data.meals || []);
      setSelectedCategory('All');
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setRecipes([]);
    }
    setLoading(false);
  };

  // Fetch recipes by category
  const fetchByCategory = async (category) => {
    if (category === 'All') {
      setRecipes([]);
      setSearchQuery('');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await response.json();
      
      // Fetch full details for each recipe
      if (data.meals) {
        const detailedRecipes = await Promise.all(
          data.meals.slice(0, 9).map(async (meal) => {
            const res = await fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
            );
            const details = await res.json();
            return details.meals[0];
          })
        );
        setRecipes(detailedRecipes);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setRecipes([]);
    }
    setLoading(false);
  };

  // Load default recipes on mount
  useEffect(() => {
    const loadDefaultRecipes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/search.php?s='
        );
        const data = await response.json();
        setRecipes((data.meals || []).slice(0, 9));
      } catch (error) {
        console.error('Error loading default recipes:', error);
      }
      setLoading(false);
    };
    loadDefaultRecipes();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchByCategory(category);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center gap-3">
            <ChefHat className="w-10 h-10 text-orange-500" />
            <h1 className="text-4xl font-bold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Recipe Finder
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar
          onSearch={searchRecipes}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        <RecipeList recipes={recipes} loading={loading} />
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-600">
        <p>Powered by TheMealDB API</p>
      </footer>
    </div>
  );
}