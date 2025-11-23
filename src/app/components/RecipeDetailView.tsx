'use client';

import React, { useState } from 'react';
import {
  ArrowLeftIcon,
  HeartIcon,
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  PencilIcon,
  TrashIcon,
  ShareIcon,
  ShoppingCartIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  FolderIcon,
  TagIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon,
} from '@heroicons/react/24/solid';
import { SavedRecipe, RecipeCollection } from '../types/recipe-library';
import {
  updateRecipe,
  toggleFavorite,
  markAsCooked,
  getLibrary,
  addRecipeToShoppingList,
} from '../utils/recipe-library-storage';
import { CookingMode } from './CookingMode';
import CollectionSelector from './CollectionSelector';

interface RecipeDetailViewProps {
  recipe: SavedRecipe;
  onClose: () => void;
  onDelete: (id: string) => void;
  onUpdate: () => void;
}

export default function RecipeDetailView({
  recipe,
  onClose,
  onDelete,
  onUpdate,
}: RecipeDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>(
    'ingredients'
  );
  const [isEditing, setIsEditing] = useState(false);
  const [personalNotes, setPersonalNotes] = useState(
    recipe.personalNotes || ''
  );
  const [rating, setRating] = useState(recipe.rating || 0);
  const [collections, setCollections] = useState<RecipeCollection[]>([]);
  const [showCopied, setShowCopied] = useState(false);
  const [showAddedToList, setShowAddedToList] = useState(false);
  const [showCookingMode, setShowCookingMode] = useState(false);
  const [showCollectionSelector, setShowCollectionSelector] = useState(false);

  React.useEffect(() => {
    const library = getLibrary();
    setCollections(library.collections);
  }, []);

  const handleToggleFavorite = () => {
    toggleFavorite(recipe.id);
    onUpdate();
  };

  const handleMarkAsCooked = () => {
    markAsCooked(recipe.id);
    onUpdate();
  };

  const handleSaveNotes = () => {
    updateRecipe(recipe.id, { personalNotes });
    setIsEditing(false);
    onUpdate();
  };

  const handleRating = (newRating: number) => {
    setRating(newRating);
    updateRecipe(recipe.id, { rating: newRating });
    onUpdate();
  };

  const handleCopyRecipe = () => {
    const recipeText = `
${recipe.title}

${recipe.description}

⏱️ Cook Time: ${recipe.cookTime}
👥 Servings: ${recipe.servings}

INGREDIENTS:
${recipe.ingredients.map((ing, i) => `${i + 1}. ${ing}`).join('\n')}

INSTRUCTIONS:
${recipe.instructions.map((step, i) => `${i + 1}. ${step}`).join('\n\n')}

${recipe.personalNotes ? `\nPERSONAL NOTES:\n${recipe.personalNotes}` : ''}
    `.trim();

    navigator.clipboard.writeText(recipeText);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const handleDownload = () => {
    const recipeText = `
${recipe.title}

${recipe.description}

Cook Time: ${recipe.cookTime}
Servings: ${recipe.servings}

INGREDIENTS:
${recipe.ingredients.map((ing, i) => `${i + 1}. ${ing}`).join('\n')}

INSTRUCTIONS:
${recipe.instructions.map((step, i) => `${i + 1}. ${step}`).join('\n\n')}

${recipe.personalNotes ? `\nPERSONAL NOTES:\n${recipe.personalNotes}` : ''}
    `.trim();

    const blob = new Blob([recipeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recipe.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAddToShoppingList = () => {
    addRecipeToShoppingList(recipe.id);
    setShowAddedToList(true);
    setTimeout(() => setShowAddedToList(false), 2000);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-b-4 border-amber-200 shadow-lg sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-amber-800 hover:text-amber-900 font-semibold transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Back to Library
            </button>

            <div className="flex items-center gap-3">
              {/* Start Cooking Button */}
              <button
                onClick={() => setShowCookingMode(true)}
                className="px-6 py-2 bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 flex items-center gap-2"
                title="Start Cooking Mode"
              >
                <ClockIcon className="w-5 h-5" />
                Start Cooking
              </button>

              <div className="flex items-center gap-2">
              <button
                onClick={handleAddToShoppingList}
                className="p-2 rounded-full bg-white border-2 border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-400 transition-all relative"
                title="Add to shopping list"
              >
                {showAddedToList ? (
                  <CheckIcon className="w-5 h-5 text-green-600" />
                ) : (
                  <ShoppingCartIcon className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={handleCopyRecipe}
                className="p-2 rounded-full bg-white border-2 border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-400 transition-all relative"
                title="Copy recipe"
              >
                {showCopied ? (
                  <CheckIcon className="w-5 h-5 text-green-600" />
                ) : (
                  <DocumentDuplicateIcon className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={handleDownload}
                className="p-2 rounded-full bg-white border-2 border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-400 transition-all"
                title="Download recipe"
              >
                <ShareIcon className="w-5 h-5" />
              </button>

              <button
                onClick={handleToggleFavorite}
                className="p-2 rounded-full bg-white border-2 border-amber-200 hover:bg-amber-50 hover:border-amber-400 transition-all"
                title="Toggle favorite"
              >
                {recipe.isFavorite ? (
                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5 text-amber-700" />
                )}
              </button>

              <button
                onClick={() => onDelete(recipe.id)}
                className="p-2 rounded-full bg-white border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all"
                title="Delete recipe"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Recipe Header Card - Nostalgic Design */}
        <div className="bg-white rounded-3xl shadow-2xl border-4 border-amber-100 overflow-hidden mb-6">
          {/* Hero Image */}
          <div className="h-72 bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 relative">
            {recipe.imageUrl ? (
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-9xl opacity-30">🍳</span>
              </div>
            )}

            {/* Overlays */}
            <div className="absolute top-4 left-4 flex gap-2">
              {recipe.isFavorite && (
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                  <HeartSolidIcon className="w-4 h-4" />
                  Favorite
                </div>
              )}
              {recipe.timesCooked > 0 && (
                <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  Cooked {recipe.timesCooked}x
                </div>
              )}
            </div>
          </div>

          {/* Recipe Info */}
          <div className="p-8">
            <h1 className="text-4xl font-bold text-amber-900 mb-3 font-serif">
              {recipe.title}
            </h1>

            <p className="text-lg text-amber-700 mb-6 leading-relaxed italic">
              {recipe.description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-amber-800 font-medium">Your Rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className="hover:scale-110 transition-transform"
                  >
                    {star <= rating ? (
                      <StarSolidIcon className="w-7 h-7 text-yellow-400" />
                    ) : (
                      <StarIcon className="w-7 h-7 text-gray-300 hover:text-yellow-200" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Meta Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-100">
                <div className="flex items-center gap-2 text-amber-600 mb-1">
                  <ClockIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Cook Time</span>
                </div>
                <div className="text-xl font-bold text-amber-900">
                  {recipe.cookTime}
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-100">
                <div className="flex items-center gap-2 text-orange-600 mb-1">
                  <UserGroupIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Servings</span>
                </div>
                <div className="text-xl font-bold text-orange-900">
                  {recipe.servings}
                </div>
              </div>

              <div className="bg-red-50 rounded-xl p-4 border-2 border-red-100">
                <div className="flex items-center gap-2 text-red-600 mb-1">
                  <CalendarIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Added</span>
                </div>
                <div className="text-sm font-bold text-red-900">
                  {formatDate(recipe.savedAt)}
                </div>
              </div>

              {recipe.lastCooked && (
                <div className="bg-green-50 rounded-xl p-4 border-2 border-green-100">
                  <div className="flex items-center gap-2 text-green-600 mb-1">
                    <CheckIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">Last Cooked</span>
                  </div>
                  <div className="text-sm font-bold text-green-900">
                    {formatDate(recipe.lastCooked)}
                  </div>
                </div>
              )}
            </div>

            {/* Tags */}
            {recipe.tags && recipe.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium border-2 border-amber-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Collections */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2">
                  <FolderIcon className="w-5 h-5" />
                  Collections
                </h3>
                <button
                  onClick={() => setShowCollectionSelector(true)}
                  className="text-amber-600 hover:text-amber-800 font-medium flex items-center gap-1 text-sm"
                >
                  <PencilIcon className="w-4 h-4" />
                  Manage
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {recipe.collections.length === 0 ? (
                  <p className="text-amber-500 italic text-sm">
                    Not in any collection yet
                  </p>
                ) : (
                  recipe.collections.map((collectionId) => {
                    const collection = collections.find(
                      (c) => c.id === collectionId
                    );
                    if (!collection) return null;

                    return (
                      <div
                        key={collection.id}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-full font-semibold text-sm border-2"
                        style={{
                          backgroundColor: collection.color + '20',
                          color: collection.color,
                          borderColor: collection.color,
                        }}
                      >
                        <span className="text-base">{collection.emoji}</span>
                        <span>{collection.name}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Mark as Cooked Button */}
            <button
              onClick={handleMarkAsCooked}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-2"
            >
              <CheckIcon className="w-6 h-6" />
              I Made This Recipe!
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-3xl border-4 border-b-0 border-amber-100 p-2">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`flex-1 py-3 rounded-2xl font-bold transition-all ${
                activeTab === 'ingredients'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                  : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              📝 Ingredients
            </button>
            <button
              onClick={() => setActiveTab('instructions')}
              className={`flex-1 py-3 rounded-2xl font-bold transition-all ${
                activeTab === 'instructions'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                  : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              👩‍🍳 Instructions
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-3xl border-4 border-t-0 border-amber-100 p-8 shadow-2xl mb-6">
          {activeTab === 'ingredients' ? (
            <div>
              <h2 className="text-2xl font-bold text-amber-900 mb-6 font-serif">
                Ingredients
              </h2>
              <div className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border-2 border-amber-100 hover:bg-amber-100 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-amber-900 leading-relaxed flex-1">
                      {ingredient}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-amber-900 mb-6 font-serif">
                Cooking Instructions
              </h2>
              <div className="space-y-6">
                {recipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-amber-900 leading-relaxed text-lg">
                        {instruction}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Personal Notes - Like Mom's handwritten notes */}
        <div className="bg-white rounded-3xl border-4 border-amber-100 p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-amber-900 font-serif flex items-center gap-2">
              ✍️ Personal Notes
            </h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-amber-600 hover:text-amber-800 font-medium flex items-center gap-1"
              >
                <PencilIcon className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>

          {isEditing ? (
            <div>
              <textarea
                value={personalNotes}
                onChange={(e) => setPersonalNotes(e.target.value)}
                placeholder="Add your personal touches, substitutions, or memories associated with this recipe..."
                className="w-full h-40 p-4 border-2 border-amber-200 rounded-2xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none resize-none text-amber-900 font-serif italic"
              />
              <div className="flex gap-3 mt-3">
                <button
                  onClick={handleSaveNotes}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all"
                >
                  Save Notes
                </button>
                <button
                  onClick={() => {
                    setPersonalNotes(recipe.personalNotes || '');
                    setIsEditing(false);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border-2 border-amber-100">
              {personalNotes ? (
                <p className="text-amber-900 leading-relaxed font-serif italic whitespace-pre-wrap">
                  {personalNotes}
                </p>
              ) : (
                <p className="text-amber-400 italic font-serif">
                  No personal notes yet. Click Edit to add your thoughts!
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Cooking Mode Modal */}
      {showCookingMode && (
        <CookingMode
          recipe={recipe}
          onClose={() => {
            setShowCookingMode(false);
            onUpdate(); // Refresh recipe data in case of updates
          }}
        />
      )}

      {/* Collection Selector Modal */}
      {showCollectionSelector && (
        <CollectionSelector
          recipeId={recipe.id}
          onClose={() => setShowCollectionSelector(false)}
          onUpdate={() => {
            const library = getLibrary();
            setCollections(library.collections);
            onUpdate();
          }}
        />
      )}
    </div>
  );
}
