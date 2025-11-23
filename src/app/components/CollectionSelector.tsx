'use client';

import React, { useState, useEffect } from 'react';
import {
  XMarkIcon,
  PlusIcon,
  FolderIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import { RecipeCollection } from '../types/recipe-library';
import {
  getLibrary,
  updateRecipe,
  getRecipe,
  addCollection,
} from '../utils/recipe-library-storage';

interface CollectionSelectorProps {
  recipeId: string;
  onClose: () => void;
  onUpdate: () => void;
}

const EMOJI_OPTIONS = [
  '❤️',
  '⭐',
  '🍕',
  '🍰',
  '🥗',
  '🍜',
  '🍔',
  '🌮',
  '🍱',
  '🥘',
  '🍲',
  '🥐',
  '🧁',
  '🍪',
  '☕',
  '🍵',
  '🎂',
  '🥙',
  '🌯',
  '🥪',
  '🥟',
  '🍛',
  '🍝',
  '🍣',
  '🍤',
  '🦐',
  '🦀',
  '🐟',
  '🥩',
  '🥓',
  '🍗',
  '🍖',
  '🌶️',
  '🥕',
  '🥒',
  '🥬',
  '🥦',
  '🧅',
  '🧄',
  '🍄',
  '🥔',
  '🍠',
  '🌽',
  '🍅',
  '🥑',
  '🫑',
  '🥝',
  '🍓',
  '🍇',
  '🍊',
  '🍋',
  '🍌',
  '🍉',
  '🍒',
  '🍑',
  '🥭',
  '🍍',
  '🥥',
  '🎃',
  '🍎',
  '🍏',
];

const COLOR_OPTIONS = [
  { name: 'Red', value: '#ef4444' },
  { name: 'Orange', value: '#f59e0b' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Green', value: '#10b981' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Indigo', value: '#6366f1' },
];

export default function CollectionSelector({
  recipeId,
  onClose,
  onUpdate,
}: CollectionSelectorProps) {
  const [collections, setCollections] = useState<RecipeCollection[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [showNewCollectionForm, setShowNewCollectionForm] = useState(false);

  // New collection form state
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDescription, setNewCollectionDescription] = useState('');
  const [newCollectionEmoji, setNewCollectionEmoji] = useState('📁');
  const [newCollectionColor, setNewCollectionColor] = useState('#f59e0b');

  useEffect(() => {
    loadData();
  }, [recipeId]);

  const loadData = () => {
    const library = getLibrary();
    const recipe = getRecipe(recipeId);

    setCollections(library.collections);
    setSelectedCollections(recipe?.collections || []);
  };

  const handleToggleCollection = (collectionId: string) => {
    const newSelected = selectedCollections.includes(collectionId)
      ? selectedCollections.filter((id) => id !== collectionId)
      : [...selectedCollections, collectionId];

    setSelectedCollections(newSelected);
    updateRecipe(recipeId, { collections: newSelected });
    onUpdate();
  };

  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) {
      alert('Please enter a collection name');
      return;
    }

    try {
      const newCollection = addCollection({
        name: newCollectionName.trim(),
        description: newCollectionDescription.trim(),
        emoji: newCollectionEmoji,
        color: newCollectionColor,
      });

      // Automatically add recipe to new collection
      const updatedCollections = [...selectedCollections, newCollection.id];
      setSelectedCollections(updatedCollections);
      updateRecipe(recipeId, { collections: updatedCollections });

      // Reset form
      setNewCollectionName('');
      setNewCollectionDescription('');
      setNewCollectionEmoji('📁');
      setNewCollectionColor('#f59e0b');
      setShowNewCollectionForm(false);

      // Reload data
      loadData();
      onUpdate();
    } catch (error) {
      alert('Failed to create collection. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-amber-200 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 border-b-4 border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-amber-900 font-serif">
                Add to Collections
              </h2>
              <p className="text-amber-700 mt-1 text-sm">
                Organize this recipe in your collections
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white border-2 border-amber-200 flex items-center justify-center hover:bg-amber-50 hover:border-amber-400 transition-all"
            >
              <XMarkIcon className="w-6 h-6 text-amber-700" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Collections List */}
          <div className="space-y-3 mb-6">
            {collections.map((collection) => {
              const isSelected = selectedCollections.includes(collection.id);

              return (
                <button
                  key={collection.id}
                  onClick={() => handleToggleCollection(collection.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50 shadow-md'
                      : 'border-amber-200 bg-white hover:border-amber-400 hover:bg-amber-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                      style={{
                        backgroundColor: collection.color + '20',
                        border: `2px solid ${collection.color}`,
                      }}
                    >
                      {collection.emoji}
                    </div>

                    <div className="flex-1">
                      <div className="font-bold text-amber-900">
                        {collection.name}
                      </div>
                      {collection.description && (
                        <div className="text-sm text-amber-600">
                          {collection.description}
                        </div>
                      )}
                      <div className="text-xs text-amber-500 mt-1">
                        {collection.recipeCount}{' '}
                        {collection.recipeCount === 1 ? 'recipe' : 'recipes'}
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                        <CheckIcon className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Create New Collection Section */}
          {!showNewCollectionForm ? (
            <button
              onClick={() => setShowNewCollectionForm(true)}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
            >
              <PlusIcon className="w-5 h-5" />
              Create New Collection
            </button>
          ) : (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-4 border-amber-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-amber-900 mb-4 font-serif">
                New Collection
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-amber-900 font-semibold mb-2">
                    Collection Name *
                  </label>
                  <input
                    type="text"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    placeholder="e.g., Weekend Brunch"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-amber-900 font-semibold mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={newCollectionDescription}
                    onChange={(e) =>
                      setNewCollectionDescription(e.target.value)
                    }
                    placeholder="A brief description..."
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-amber-900 font-semibold mb-2">
                    Choose an Emoji
                  </label>
                  <div className="grid grid-cols-10 gap-2 max-h-32 overflow-y-auto p-2 bg-white border-2 border-amber-200 rounded-xl">
                    {EMOJI_OPTIONS.map((e) => (
                      <button
                        key={e}
                        type="button"
                        onClick={() => setNewCollectionEmoji(e)}
                        className={`text-2xl p-2 rounded-lg hover:bg-amber-100 transition-colors ${
                          newCollectionEmoji === e
                            ? 'bg-amber-200 ring-2 ring-amber-500'
                            : ''
                        }`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-amber-900 font-semibold mb-2">
                    Choose a Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {COLOR_OPTIONS.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => setNewCollectionColor(c.value)}
                        className={`w-12 h-12 rounded-full border-4 transition-all ${
                          newCollectionColor === c.value
                            ? 'border-amber-900 scale-110'
                            : 'border-white hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.value }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-white border-2 border-amber-200 rounded-xl p-4">
                  <p className="text-sm text-amber-700 mb-2 font-semibold">
                    Preview:
                  </p>
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold"
                    style={{
                      backgroundColor: newCollectionColor + '20',
                      color: newCollectionColor,
                      border: `2px solid ${newCollectionColor}`,
                    }}
                  >
                    <span className="text-xl">{newCollectionEmoji}</span>
                    <span>{newCollectionName || 'Collection Name'}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleCreateCollection}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all"
                  >
                    Create & Add Recipe
                  </button>
                  <button
                    onClick={() => setShowNewCollectionForm(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-amber-50 border-t-4 border-amber-200 p-4">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-bold hover:from-amber-600 hover:to-orange-600 transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
