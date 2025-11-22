'use client';

import React, { useState } from 'react';
import {
  XMarkIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  FolderIcon,
} from '@heroicons/react/24/outline';
import { RecipeCollection } from '../types/recipe-library';
import {
  addCollection,
  updateCollection,
  deleteCollection,
  getLibrary,
} from '../utils/recipe-library-storage';

interface CollectionManagerProps {
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

export default function CollectionManager({
  onClose,
  onUpdate,
}: CollectionManagerProps) {
  const [collections, setCollections] = useState<RecipeCollection[]>(() => {
    const library = getLibrary();
    return library.collections;
  });
  const [defaultCollections, setDefaultCollections] = useState<string[]>(() => {
    const library = getLibrary();
    return library.defaultCollections;
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [emoji, setEmoji] = useState('📁');
  const [color, setColor] = useState('#f59e0b');

  const resetForm = () => {
    setName('');
    setDescription('');
    setEmoji('📁');
    setColor('#f59e0b');
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleEdit = (collection: RecipeCollection) => {
    setName(collection.name);
    setDescription(collection.description || '');
    setEmoji(collection.emoji || '📁');
    setColor(collection.color || '#f59e0b');
    setEditingId(collection.id);
    setShowAddForm(true);
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert('Please enter a collection name');
      return;
    }

    try {
      if (editingId) {
        // Update existing
        updateCollection(editingId, {
          name: name.trim(),
          description: description.trim(),
          emoji,
          color,
        });
      } else {
        // Create new
        addCollection({
          name: name.trim(),
          description: description.trim(),
          emoji,
          color,
        });
      }

      // Reload collections
      const library = getLibrary();
      setCollections(library.collections);
      onUpdate();
      resetForm();
    } catch (error) {
      alert('Failed to save collection. Please try again.');
    }
  };

  const handleDelete = (collectionId: string) => {
    if (defaultCollections.includes(collectionId)) {
      alert('Cannot delete default collections');
      return;
    }

    if (
      confirm(
        'Are you sure you want to delete this collection? Recipes in this collection will not be deleted.'
      )
    ) {
      try {
        deleteCollection(collectionId);
        const library = getLibrary();
        setCollections(library.collections);
        onUpdate();
      } catch (error: any) {
        alert(error.message || 'Failed to delete collection');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-amber-200 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 border-b-4 border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-amber-900 font-serif">
                Manage Collections
              </h2>
              <p className="text-amber-700 mt-1">
                Organize your recipes into collections
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
          {/* Add New Collection Button */}
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full mb-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
            >
              <PlusIcon className="w-5 h-5" />
              Create New Collection
            </button>
          )}

          {/* Add/Edit Form */}
          {showAddForm && (
            <div className="mb-6 bg-gradient-to-br from-amber-50 to-orange-50 border-4 border-amber-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-amber-900 mb-4 font-serif">
                {editingId ? 'Edit Collection' : 'New Collection'}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-amber-900 font-semibold mb-2">
                    Collection Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="A brief description..."
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-amber-900 font-semibold mb-2">
                    Choose an Emoji
                  </label>
                  <div className="grid grid-cols-10 gap-2 max-h-40 overflow-y-auto p-2 bg-white border-2 border-amber-200 rounded-xl">
                    {EMOJI_OPTIONS.map((e) => (
                      <button
                        key={e}
                        onClick={() => setEmoji(e)}
                        className={`text-2xl p-2 rounded-lg hover:bg-amber-100 transition-colors ${
                          emoji === e
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
                        onClick={() => setColor(c.value)}
                        className={`w-12 h-12 rounded-full border-4 transition-all ${
                          color === c.value
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
                      backgroundColor: color + '20',
                      color: color,
                      border: `2px solid ${color}`,
                    }}
                  >
                    <span className="text-xl">{emoji}</span>
                    <span>{name || 'Collection Name'}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all"
                  >
                    {editingId ? 'Update Collection' : 'Create Collection'}
                  </button>
                  <button
                    onClick={resetForm}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Collections List */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-amber-900 mb-3">
              Your Collections ({collections.length})
            </h3>

            {collections.map((collection) => {
              const isDefault = defaultCollections.includes(collection.id);

              return (
                <div
                  key={collection.id}
                  className="bg-white border-2 border-amber-200 rounded-xl p-4 hover:border-amber-400 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                        style={{
                          backgroundColor: collection.color + '20',
                          border: `2px solid ${collection.color}`,
                        }}
                      >
                        {collection.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-amber-900">
                            {collection.name}
                          </h4>
                          {isDefault && (
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        {collection.description && (
                          <p className="text-sm text-amber-600">
                            {collection.description}
                          </p>
                        )}
                        <p className="text-xs text-amber-500 mt-1">
                          {collection.recipeCount}{' '}
                          {collection.recipeCount === 1 ? 'recipe' : 'recipes'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(collection)}
                        className="p-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
                        title="Edit collection"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>

                      {!isDefault && (
                        <button
                          onClick={() => handleDelete(collection.id)}
                          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                          title="Delete collection"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
