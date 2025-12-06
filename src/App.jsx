import React, { useState, useEffect } from 'react';
import { Search, ChefHat, Globe, Menu, X, LogIn, LogOut, User } from 'lucide-react';

// Login Component
function LoginModal({ isOpen, onClose, onLogin, darkMode }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      onLogin(username);
      setUsername('');
      setPassword('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="rounded-2xl p-8 max-w-md w-full shadow-2xl"
        style={{
          backgroundColor: darkMode ? '#1f2937' : '#ffffff',
          color: darkMode ? '#ffffff' : '#1f2937'
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Login</h2>
          <button 
            onClick={onClose}
            style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: darkMode ? '#d1d5db' : '#374151' }}
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your username"
              className="w-full px-4 py-3 rounded-lg border-2 focus:border-orange-500 focus:outline-none"
              style={{
                backgroundColor: darkMode ? '#374151' : '#ffffff',
                borderColor: darkMode ? '#4b5563' : '#e5e7eb',
                color: darkMode ? '#ffffff' : '#000000'
              }}
            />
          </div>
          
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: darkMode ? '#d1d5db' : '#374151' }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border-2 focus:border-orange-500 focus:outline-none"
              style={{
                backgroundColor: darkMode ? '#374151' : '#ffffff',
                borderColor: darkMode ? '#4b5563' : '#e5e7eb',
                color: darkMode ? '#ffffff' : '#000000'
              }}
            />
          </div>
          
          <button
            onClick={handleLogin}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

// Dark Mode Toggle Button Component
function DarkModeToggle({ darkMode, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg transition-colors"
      style={{
        backgroundColor: darkMode ? '#374151' : '#f3f4f6'
      }}
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      )}
    </button>
  );
}

// Mobile Menu Component
function MobileMenu({ isOpen, onClose, user, onLogout, onLoginClick, darkMode, onToggleDarkMode }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}>
      <div 
        className="fixed right-0 top-0 h-full w-64 shadow-2xl p-6 transform transition-transform"
        style={{
          backgroundColor: darkMode ? '#1f2937' : '#ffffff'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 
            className="text-xl font-bold"
            style={{ color: darkMode ? '#ffffff' : '#1f2937' }}
          >
            Menu
          </h2>
          <button 
            onClick={onClose}
            style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          {user ? (
            <div 
              className="p-4 rounded-lg mb-4"
              style={{
                backgroundColor: darkMode ? '#374151' : '#fff7ed'
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <User className="w-5 h-5 text-orange-500" />
                <span 
                  className="font-semibold"
                  style={{ color: darkMode ? '#ffffff' : '#1f2937' }}
                >
                  {user}
                </span>
              </div>
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onLoginClick();
                onClose();
              }}
              className="w-full flex items-center gap-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              <LogIn className="w-5 h-5" />
              Login
            </button>
          )}

          <div 
            className="pt-4 border-t"
            style={{ borderColor: darkMode ? '#4b5563' : '#e5e7eb' }}
          >
            <button
              onClick={onToggleDarkMode}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors"
              style={{
                backgroundColor: darkMode ? '#374151' : '#f3f4f6',
                color: darkMode ? '#ffffff' : '#1f2937'
              }}
            >
              <span className="font-medium">Dark Mode</span>
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// SearchBar Component
function SearchBar({ onSearch, searchQuery, setSearchQuery, darkMode }) {
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
          className="w-full px-6 py-4 pr-12 text-lg rounded-2xl border-2 focus:border-orange-500 focus:outline-none shadow-lg"
          style={{
            backgroundColor: darkMode ? '#374151' : '#ffffff',
            borderColor: darkMode ? '#4b5563' : '#e5e7eb',
            color: darkMode ? '#ffffff' : '#000000'
          }}
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
function FilterBar({ selectedCategory, onCategoryChange, darkMode }) {
  const categories = ['All', 'Breakfast', 'Dessert', 'Seafood', 'Vegetarian', 'Chicken', 'Beef', 'Pasta'];

  return (
    <div className="flex gap-3 mb-8 overflow-x-auto pb-2 px-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className="px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all shadow"
          style={{
            backgroundColor: selectedCategory === cat ? '#f97316' : (darkMode ? '#374151' : '#ffffff'),
            color: selectedCategory === cat ? '#ffffff' : (darkMode ? '#e5e7eb' : '#374151'),
            transform: selectedCategory === cat ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

// RecipeCard Component
function RecipeCard({ recipe, darkMode }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div 
      className="rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
      style={{
        backgroundColor: darkMode ? '#1f2937' : '#ffffff'
      }}
    >
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
        <h3 
          className="text-xl font-bold mb-2"
          style={{ color: darkMode ? '#ffffff' : '#1f2937' }}
        >
          {recipe.strMeal}
        </h3>
        
        <div 
          className="flex items-center gap-4 text-sm mb-3"
          style={{ color: darkMode ? '#9ca3af' : '#4b5563' }}
        >
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
          <div 
            className="mt-4 pt-4 border-t"
            style={{ borderColor: darkMode ? '#4b5563' : '#e5e7eb' }}
          >
            <h4 
              className="font-semibold mb-2"
              style={{ color: darkMode ? '#ffffff' : '#1f2937' }}
            >
              Instructions:
            </h4>
            <p 
              className="text-sm leading-relaxed max-h-40 overflow-y-auto"
              style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}
            >
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
function RecipeList({ recipes, loading, darkMode }) {
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
        <ChefHat 
          className="w-20 h-20 mx-auto mb-4"
          style={{ color: darkMode ? '#4b5563' : '#d1d5db' }}
        />
        <p 
          className="text-xl"
          style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}
        >
          No recipes found. Try a different search!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} darkMode={darkMode} />
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
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  // Initialize dark mode on mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Save preference to localStorage
    try {
      localStorage.setItem('darkMode', newDarkMode ? 'true' : 'false');
    } catch {
      console.log('localStorage not available');
    }
  };

  // Handle login
  const handleLogin = (username) => {
    setUser(username);
    setShowLoginModal(false);
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
  };

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
    <div 
      className="min-h-screen transition-colors"
      style={{
        background: darkMode 
          ? 'linear-gradient(to bottom right, #111827, #1f2937, #111827)'
          : 'linear-gradient(to bottom right, #fff7ed, #fef3c7, #fee2e2)'
      }}
    >
      {/* Header */}
      <header 
        className="shadow-md sticky top-0 z-10 transition-colors"
        style={{
          backgroundColor: darkMode ? '#1f2937' : '#ffffff'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <ChefHat className="w-10 h-10 text-orange-500" />
              <h1 className="text-2xl sm:text-4xl font-bold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Recipe Finder
              </h1>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <DarkModeToggle darkMode={darkMode} onToggle={toggleDarkMode} />

              {user ? (
                <div className="flex items-center gap-3">
                  <div 
                    className="flex items-center gap-2 px-4 py-2 rounded-lg"
                    style={{
                      backgroundColor: darkMode ? '#374151' : '#fff7ed'
                    }}
                  >
                    <User className="w-5 h-5 text-orange-500" />
                    <span 
                      className="font-semibold"
                      style={{ color: darkMode ? '#ffffff' : '#1f2937' }}
                    >
                      {user}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(true)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{
                backgroundColor: darkMode ? '#374151' : '#f3f4f6'
              }}
            >
              <Menu 
                className="w-6 h-6"
                style={{ color: darkMode ? '#ffffff' : '#1f2937' }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar
          onSearch={searchRecipes}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          darkMode={darkMode}
        />
        
        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          darkMode={darkMode}
        />
        
        <RecipeList recipes={recipes} loading={loading} darkMode={darkMode} />
      </main>

      {/* Footer */}
      <footer 
        className="text-center py-8"
        style={{ color: darkMode ? '#9ca3af' : '#4b5563' }}
      >
        <p>Powered by TheMealDB API</p>
      </footer>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        darkMode={darkMode}
      />

      <MobileMenu
        isOpen={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
        user={user}
        onLogout={handleLogout}
        onLoginClick={() => setShowLoginModal(true)}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    </div>
  );
}