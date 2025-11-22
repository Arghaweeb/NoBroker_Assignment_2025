'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  MagnifyingGlassIcon,
  HeartIcon,
  BookmarkIcon,
  PlusIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  TagIcon,
  FolderIcon,
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
  ShareIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon,
} from '@heroicons/react/24/solid';
import {
  SavedRecipe,
  RecipeCollection,
  RecipeSortOption,
} from '../types/recipe-library';
import {
  getLibrary,
  searchRecipes,
  updateRecipe,
  deleteRecipe,
  toggleFavorite,
  markAsCooked,
  addCollection,
  deleteCollection,
} from '../utils/recipe-library-storage';
import RecipeDetailView from './RecipeDetailView';
import RecipeImportModal from './RecipeImportModal';
import CollectionManager from './CollectionManager';

type ViewMode = 'grid' | 'list';

export default function RecipeLibrary() {
  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);
  const [collections, setCollections] = useState<RecipeCollection[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [sortBy, setSortBy] = useState<RecipeSortOption>('recent');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedRecipe, setSelectedRecipe] = useState<SavedRecipe | null>(
    null
  );
  const [showImportModal, setShowImportModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [favoriteFilter, setFavoriteFilter] = useState(false);
  const [showCollectionManager, setShowCollectionManager] = useState(false);

  // Load library on mount
  useEffect(() => {
    loadLibrary();
  }, []);

  const loadLibrary = () => {
    const library = getLibrary();
    setRecipes(library.recipes);
    setCollections(library.collections);
  };

  // Filter and sort recipes
  const filteredRecipes = useMemo(() => {
    let filtered = searchRecipes(searchQuery, {
      collections:
        selectedCollection === 'all' ? undefined : [selectedCollection],
      favorite: favoriteFilter || undefined,
    });

    // Sort recipes
    switch (sortBy) {
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'mostCooked':
        filtered.sort((a, b) => b.timesCooked - a.timesCooked);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'cookTime':
        filtered.sort((a, b) => {
          const aMinutes = parseCookTime(a.cookTime);
          const bMinutes = parseCookTime(b.cookTime);
          return aMinutes - bMinutes;
        });
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => b.savedAt - a.savedAt);
        break;
    }

    return filtered;
  }, [recipes, searchQuery, selectedCollection, sortBy, favoriteFilter]);

  const parseCookTime = (cookTime: string): number => {
    const match = cookTime.match(/(\d+)/);
    return match ? parseInt(match[1]) : 999;
  };

  const handleToggleFavorite = (recipeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(recipeId);
    loadLibrary();
  };

  const handleDeleteRecipe = (recipeId: string) => {
    if (confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId);
      loadLibrary();
      setSelectedRecipe(null);
    }
  };

  const handleRecipeClick = (recipe: SavedRecipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseDetail = () => {
    setSelectedRecipe(null);
    loadLibrary(); // Reload in case recipe was modified
  };

  if (selectedRecipe) {
    return (
      <RecipeDetailView
        recipe={selectedRecipe}
        onClose={handleCloseDetail}
        onDelete={handleDeleteRecipe}
        onUpdate={loadLibrary}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header Section - Nostalgic Design */}
      <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-b-4 border-amber-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-amber-900 font-serif tracking-tight">
                My Recipe Diary
              </h1>
              <p className="text-amber-700 mt-1 italic font-serif">
                Your personal collection of cherished recipes
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCollectionManager(true)}
                className="bg-white border-2 border-amber-300 text-amber-700 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-amber-50 hover:border-amber-400 transition-all flex items-center gap-2"
              >
                <FolderIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Manage Collections</span>
                <span className="sm:hidden">Collections</span>
              </button>
              <button
                onClick={() => setShowImportModal(true)}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-600 transition-all flex items-center gap-2"
              >
                <PlusIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Add Recipe</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600" />
            <input
              type="text"
              placeholder="Search recipes, ingredients, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-amber-200 bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none text-amber-900 placeholder-amber-400 shadow-inner"
            />
          </div>

          {/* Collections Filter Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCollection('all')}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedCollection === 'all'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                  : 'bg-white text-amber-700 border-2 border-amber-200 hover:border-amber-400'
              }`}
            >
              📚 All Recipes ({recipes.length})
            </button>
            {collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => setSelectedCollection(collection.id)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCollection === collection.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                    : 'bg-white text-amber-700 border-2 border-amber-200 hover:border-amber-400'
                }`}
              >
                {collection.emoji} {collection.name} ({collection.recipeCount})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b border-amber-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setFavoriteFilter(!favoriteFilter)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  favoriteFilter
                    ? 'bg-red-100 text-red-700 border-2 border-red-300'
                    : 'bg-gray-100 text-gray-600 border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                {favoriteFilter ? (
                  <HeartSolidIcon className="w-4 h-4" />
                ) : (
                  <HeartIcon className="w-4 h-4" />
                )}
                Favorites
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as RecipeSortOption)}
                className="px-3 py-1.5 rounded-full text-sm border-2 border-amber-200 bg-white text-amber-800 font-medium focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
              >
                <option value="recent">Recently Added</option>
                <option value="alphabetical">A to Z</option>
                <option value="mostCooked">Most Cooked</option>
                <option value="rating">Highest Rated</option>
                <option value="cookTime">Cook Time</option>
              </select>
            </div>

            <div className="text-sm text-amber-700 font-medium">
              {filteredRecipes.length}{' '}
              {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl p-12 shadow-xl border-4 border-amber-100 max-w-md mx-auto">
              <div className="text-6xl mb-4">📖</div>
              <h3 className="text-2xl font-bold text-amber-900 mb-2 font-serif">
                No Recipes Yet
              </h3>
              <p className="text-amber-600 mb-6">
                {searchQuery
                  ? 'No recipes match your search. Try a different query!'
                  : "Start building your recipe collection by adding your first recipe!"}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => setShowImportModal(true)}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-600 transition-all"
                >
                  Add Your First Recipe
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={() => handleRecipeClick(recipe)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <RecipeImportModal
          onClose={() => setShowImportModal(false)}
          onImport={() => {
            loadLibrary();
            setShowImportModal(false);
          }}
        />
      )}

      {/* Collection Manager Modal */}
      {showCollectionManager && (
        <CollectionManager
          onClose={() => setShowCollectionManager(false)}
          onUpdate={() => {
            loadLibrary();
          }}
        />
      )}
    </div>
  );
}

// Recipe Card Component with nostalgic design
interface RecipeCardProps {
  recipe: SavedRecipe;
  onClick: () => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

function RecipeCard({ recipe, onClick, onToggleFavorite }: RecipeCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-4 border-amber-100 hover:border-amber-300 group"
    >
      {/* Recipe Image or Placeholder */}
      <div className="h-48 bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 relative overflow-hidden">
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-7xl opacity-30">🍳</span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => onToggleFavorite(recipe.id, e)}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          {recipe.isFavorite ? (
            <HeartSolidIcon className="w-6 h-6 text-red-500" />
          ) : (
            <HeartIcon className="w-6 h-6 text-gray-400" />
          )}
        </button>

        {/* Times Cooked Badge */}
        {recipe.timesCooked > 0 && (
          <div className="absolute bottom-3 left-3 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            Cooked {recipe.timesCooked}x
          </div>
        )}
      </div>

      {/* Recipe Info */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-amber-900 mb-2 line-clamp-2 font-serif group-hover:text-orange-600 transition-colors">
          {recipe.title}
        </h3>

        <p className="text-amber-700 text-sm mb-4 line-clamp-2 leading-relaxed">
          {recipe.description}
        </p>

        {/* Rating */}
        {recipe.rating && (
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarSolidIcon
                key={star}
                className={`w-4 h-4 ${
                  star <= recipe.rating!
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        )}

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-amber-600 mb-4">
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            {recipe.cookTime}
          </div>
          <div className="flex items-center gap-1">
            <UserGroupIcon className="w-4 h-4" />
            {recipe.servings} servings
          </div>
        </div>

        {/* Tags */}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {recipe.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium border border-amber-200"
              >
                #{tag}
              </span>
            ))}
            {recipe.tags.length > 3 && (
              <span className="px-2 py-1 text-amber-500 text-xs">
                +{recipe.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
