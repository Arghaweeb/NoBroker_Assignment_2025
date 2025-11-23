'use client';

import React, { useState, useEffect } from 'react';
import {
  ShoppingCartIcon,
  PlusIcon,
  TrashIcon,
  ShareIcon,
  CheckIcon,
  XMarkIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import {
  getShoppingList,
  toggleShoppingListItem,
  removeShoppingListItem,
  clearCheckedItems,
  clearShoppingList,
  addIngredientToShoppingList,
  updateShoppingListItem,
  exportShoppingListAsText,
  getRecipe,
} from '../utils/recipe-library-storage';
import { ShoppingListItem } from '../types/recipe-library';

export default function ShoppingList() {
  const [items, setItems] = useState<ShoppingListItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemNotes, setNewItemNotes] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    loadShoppingList();
  }, []);

  const loadShoppingList = () => {
    const shoppingList = getShoppingList();
    setItems(shoppingList.items);
  };

  const handleToggleItem = (itemId: string) => {
    toggleShoppingListItem(itemId);
    loadShoppingList();
  };

  const handleRemoveItem = (itemId: string) => {
    removeShoppingListItem(itemId);
    loadShoppingList();
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) return;

    addIngredientToShoppingList(
      newItemName.trim(),
      newItemQuantity.trim() || undefined,
      newItemNotes.trim() || undefined
    );

    setNewItemName('');
    setNewItemQuantity('');
    setNewItemNotes('');
    setShowAddForm(false);
    loadShoppingList();
  };

  const handleClearChecked = () => {
    const cleared = clearCheckedItems();
    if (cleared > 0) {
      loadShoppingList();
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear the entire shopping list?')) {
      clearShoppingList();
      loadShoppingList();
    }
  };

  const handleStartEdit = (item: ShoppingListItem) => {
    setEditingItemId(item.id);
    setEditingValue(item.ingredient);
  };

  const handleSaveEdit = (itemId: string) => {
    if (editingValue.trim()) {
      updateShoppingListItem(itemId, { ingredient: editingValue.trim() });
      loadShoppingList();
    }
    setEditingItemId(null);
    setEditingValue('');
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setEditingValue('');
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleCopyToClipboard = () => {
    const text = exportShoppingListAsText();
    navigator.clipboard.writeText(text);
    alert('Shopping list copied to clipboard!');
    setShowShareModal(false);
  };

  const handleDownloadAsText = () => {
    const text = exportShoppingListAsText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `shopping-list-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const uncheckedItems = items.filter((item) => !item.checked);
  const checkedItems = items.filter((item) => item.checked);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <ShoppingCartIcon className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-serif">Shopping List</h1>
                <p className="text-orange-100 text-sm">
                  {items.length === 0
                    ? 'Your list is empty'
                    : `${uncheckedItems.length} item${uncheckedItems.length !== 1 ? 's' : ''} to buy`}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {items.length > 0 && (
                <>
                  <button
                    onClick={handleShare}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <ShareIcon className="h-5 w-5" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                  {checkedItems.length > 0 && (
                    <button
                      onClick={handleClearChecked}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <TrashIcon className="h-5 w-5" />
                      <span className="hidden sm:inline">Clear Checked</span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Add Item Button/Form */}
        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full bg-white border-2 border-dashed border-orange-300 rounded-xl p-6 hover:border-orange-400 hover:bg-orange-50/50 transition-all group"
          >
            <div className="flex items-center justify-center gap-2 text-orange-600">
              <PlusIcon className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Add Item to Shopping List</span>
            </div>
          </button>
        ) : (
          <div className="bg-white rounded-xl shadow-lg border-2 border-orange-200 p-6">
            <h3 className="font-serif text-xl text-gray-800 mb-4">
              Add New Item
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Item name (e.g., Milk, Eggs)"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                autoFocus
              />
              <input
                type="text"
                placeholder="Quantity (optional, e.g., 2 liters)"
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              />
              <input
                type="text"
                placeholder="Notes (optional)"
                value={newItemNotes}
                onChange={(e) => setNewItemNotes(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              />
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleAddItem}
                  disabled={!newItemName.trim()}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Add Item
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewItemName('');
                    setNewItemQuantity('');
                    setNewItemNotes('');
                  }}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Shopping List Items */}
        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg border-2 border-orange-100 p-12 text-center">
            <ShoppingCartIcon className="h-20 w-20 mx-auto text-gray-300 mb-4" />
            <h3 className="font-serif text-2xl text-gray-400 mb-2">
              No items yet
            </h3>
            <p className="text-gray-500">
              Add recipes to generate your shopping list or add items manually
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Unchecked Items */}
            {uncheckedItems.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg border-2 border-orange-200 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-100 to-amber-100 px-4 py-3 border-b-2 border-orange-200">
                  <h3 className="font-serif text-lg text-gray-800">
                    To Buy ({uncheckedItems.length})
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {uncheckedItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 hover:bg-orange-50/50 transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => handleToggleItem(item.id)}
                          className="flex-shrink-0 mt-1 w-6 h-6 rounded-full border-2 border-gray-300 hover:border-orange-500 transition-colors group-hover:scale-110"
                        />
                        <div className="flex-1 min-w-0">
                          {editingItemId === item.id ? (
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={editingValue}
                                onChange={(e) => setEditingValue(e.target.value)}
                                className="flex-1 px-3 py-1 border-2 border-orange-300 rounded-lg focus:border-orange-500 outline-none"
                                autoFocus
                              />
                              <button
                                onClick={() => handleSaveEdit(item.id)}
                                className="p-1 text-green-600 hover:bg-green-50 rounded"
                              >
                                <CheckIcon className="h-5 w-5" />
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                              >
                                <XMarkIcon className="h-5 w-5" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <p className="text-gray-800 font-medium">
                                    {item.ingredient}
                                  </p>
                                  {item.quantity && (
                                    <p className="text-sm text-gray-500">
                                      {item.quantity}
                                    </p>
                                  )}
                                  {item.notes && (
                                    <p className="text-sm text-gray-600 italic mt-1">
                                      Note: {item.notes}
                                    </p>
                                  )}
                                  {item.recipeIds.length > 0 && (
                                    <div className="text-xs text-orange-600 mt-1">
                                      <p className="font-semibold">
                                        For {item.recipeIds.length} recipe
                                        {item.recipeIds.length > 1 ? 's' : ''}:
                                      </p>
                                      <ul className="list-disc list-inside ml-1 mt-0.5">
                                        {item.recipeIds.map((recipeId) => {
                                          const recipe = getRecipe(recipeId);
                                          return (
                                            <li key={recipeId} className="truncate">
                                              {recipe ? recipe.title : 'Unknown Recipe'}
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={() => handleStartEdit(item)}
                                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                  >
                                    <PencilIcon className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                                  >
                                    <TrashIcon className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Checked Items */}
            {checkedItems.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg border-2 border-green-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-3 border-b-2 border-green-200">
                  <h3 className="font-serif text-lg text-gray-800">
                    Bought ({checkedItems.length})
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {checkedItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 hover:bg-green-50/50 transition-colors group opacity-60"
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => handleToggleItem(item.id)}
                          className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                        >
                          <CheckIcon className="h-4 w-4" />
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="text-gray-600 font-medium line-through">
                                {item.ingredient}
                              </p>
                              {item.quantity && (
                                <p className="text-sm text-gray-400 line-through">
                                  {item.quantity}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Clear All Button */}
        {items.length > 0 && (
          <button
            onClick={handleClearAll}
            className="w-full bg-red-50 border-2 border-red-200 text-red-600 px-6 py-3 rounded-xl hover:bg-red-100 transition-all font-medium"
          >
            Clear Entire List
          </button>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold">
                Share Shopping List
              </h2>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                title="Close"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-96">
              <pre className="bg-gray-50 p-4 rounded-lg text-sm whitespace-pre-wrap font-mono border-2 border-gray-200">
                {exportShoppingListAsText()}
              </pre>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t-2 border-gray-200 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCopyToClipboard}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-medium flex items-center justify-center gap-2"
              >
                <ShareIcon className="w-5 h-5" />
                Copy to Clipboard
              </button>
              <button
                onClick={handleDownloadAsText}
                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all font-medium flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download as .txt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
