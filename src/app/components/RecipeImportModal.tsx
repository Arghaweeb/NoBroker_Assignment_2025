'use client';

import React, { useState } from 'react';
import {
  XMarkIcon,
  LinkIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { addRecipe, importRecipe } from '../utils/recipe-library-storage';
import { RecipeImportData } from '../types/recipe-library';

interface RecipeImportModalProps {
  onClose: () => void;
  onImport: () => void;
}

type ImportMethod = 'manual' | 'url' | 'text' | 'ai';

export default function RecipeImportModal({
  onClose,
  onImport,
}: RecipeImportModalProps) {
  const [importMethod, setImportMethod] = useState<ImportMethod>('manual');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Manual entry form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [servings, setServings] = useState(4);
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [instructions, setInstructions] = useState<string[]>(['']);
  const [tags, setTags] = useState('');

  // URL import state
  const [url, setUrl] = useState('');

  // Text paste state
  const [pastedText, setPastedText] = useState('');

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleUpdateIngredient = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const handleUpdateInstruction = (index: number, value: string) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  };

  const handleRemoveInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!title.trim()) {
      setError('Recipe title is required');
      return;
    }

    const validIngredients = ingredients.filter((i) => i.trim());
    if (validIngredients.length === 0) {
      setError('At least one ingredient is required');
      return;
    }

    const validInstructions = instructions.filter((i) => i.trim());
    if (validInstructions.length === 0) {
      setError('At least one instruction is required');
      return;
    }

    try {
      setLoading(true);

      const tagArray = tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t);

      addRecipe({
        title: title.trim(),
        description: description.trim(),
        cookTime: cookTime.trim() || '30 minutes',
        servings,
        ingredients: validIngredients,
        instructions: validInstructions,
        source: 'manual',
        collections: [],
        tags: tagArray,
        isFavorite: false,
      });

      onImport();
    } catch (err) {
      setError('Failed to save recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTextParse = async () => {
    setError('');
    setLoading(true);

    try {
      // Simple text parsing logic
      const lines = pastedText.split('\n').filter((line) => line.trim());

      if (lines.length === 0) {
        setError('Please paste some recipe text');
        return;
      }

      // Try to extract title (first non-empty line)
      const recipeTitle = lines[0];

      // Try to find ingredients section
      const ingredientsIndex = lines.findIndex(
        (line) =>
          line.toLowerCase().includes('ingredient') ||
          line.toLowerCase().includes('what you need')
      );

      // Try to find instructions section
      const instructionsIndex = lines.findIndex(
        (line) =>
          line.toLowerCase().includes('instruction') ||
          line.toLowerCase().includes('direction') ||
          line.toLowerCase().includes('method') ||
          line.toLowerCase().includes('how to')
      );

      let parsedIngredients: string[] = [];
      let parsedInstructions: string[] = [];

      if (ingredientsIndex !== -1 && instructionsIndex !== -1) {
        parsedIngredients = lines
          .slice(ingredientsIndex + 1, instructionsIndex)
          .filter((line) => line.trim() && !line.toLowerCase().includes('ingredient'));

        parsedInstructions = lines
          .slice(instructionsIndex + 1)
          .filter((line) => line.trim() && !line.toLowerCase().includes('instruction') && !line.toLowerCase().includes('direction'));
      } else if (ingredientsIndex !== -1) {
        parsedIngredients = lines
          .slice(ingredientsIndex + 1)
          .filter((line) => line.trim());
      } else if (instructionsIndex !== -1) {
        parsedInstructions = lines
          .slice(instructionsIndex + 1)
          .filter((line) => line.trim());
      }

      // If we couldn't parse, fall back to simple split
      if (parsedIngredients.length === 0 && parsedInstructions.length === 0) {
        const midpoint = Math.floor(lines.length / 2);
        parsedIngredients = lines.slice(1, midpoint);
        parsedInstructions = lines.slice(midpoint);
      }

      addRecipe({
        title: recipeTitle,
        description: 'Imported from text',
        cookTime: '30 minutes',
        servings: 4,
        ingredients: parsedIngredients.length > 0 ? parsedIngredients : ['Add ingredients'],
        instructions: parsedInstructions.length > 0 ? parsedInstructions : ['Add instructions'],
        source: 'imported',
        collections: [],
        tags: ['imported'],
        isFavorite: false,
      });

      onImport();
    } catch (err) {
      setError('Failed to parse recipe text. Please try manual entry.');
    } finally {
      setLoading(false);
    }
  };

  const handleUrlImport = async () => {
    setError('');

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);

    try {
      // Note: In a real implementation, you would call an API to scrape the URL
      // For now, we'll show an error message
      setError(
        'URL import requires a backend service. Please use text paste or manual entry for now.'
      );
    } catch (err) {
      setError('Failed to import from URL. Please try text paste or manual entry.');
    } finally {
      setLoading(false);
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
                Add New Recipe
              </h2>
              <p className="text-amber-700 mt-1">
                Choose how you'd like to add your recipe
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white border-2 border-amber-200 flex items-center justify-center hover:bg-amber-50 hover:border-amber-400 transition-all"
            >
              <XMarkIcon className="w-6 h-6 text-amber-700" />
            </button>
          </div>

          {/* Import Method Tabs */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
            <button
              onClick={() => setImportMethod('manual')}
              className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                importMethod === 'manual'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                  : 'bg-white text-amber-700 border-2 border-amber-200 hover:border-amber-400'
              }`}
            >
              <PencilSquareIcon className="w-5 h-5" />
              Manual Entry
            </button>

            <button
              onClick={() => setImportMethod('text')}
              className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                importMethod === 'text'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                  : 'bg-white text-amber-700 border-2 border-amber-200 hover:border-amber-400'
              }`}
            >
              <DocumentTextIcon className="w-5 h-5" />
              Paste Text
            </button>

            <button
              onClick={() => setImportMethod('url')}
              className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                importMethod === 'url'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                  : 'bg-white text-amber-700 border-2 border-amber-200 hover:border-amber-400'
              }`}
            >
              <LinkIcon className="w-5 h-5" />
              From URL
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700">
              {error}
            </div>
          )}

          {importMethod === 'manual' && (
            <form onSubmit={handleManualSubmit} className="space-y-6">
              <div>
                <label className="block text-amber-900 font-semibold mb-2">
                  Recipe Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Grandma's Chocolate Chip Cookies"
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-amber-900 font-semibold mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A brief description of your recipe..."
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none resize-none"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-amber-900 font-semibold mb-2">
                    Cook Time
                  </label>
                  <input
                    type="text"
                    value={cookTime}
                    onChange={(e) => setCookTime(e.target.value)}
                    placeholder="e.g., 30 minutes"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-amber-900 font-semibold mb-2">
                    Servings
                  </label>
                  <input
                    type="number"
                    value={servings}
                    onChange={(e) => setServings(parseInt(e.target.value) || 4)}
                    min="1"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-amber-900 font-semibold mb-2">
                  Ingredients *
                </label>
                <div className="space-y-2">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) =>
                          handleUpdateIngredient(index, e.target.value)
                        }
                        placeholder={`Ingredient ${index + 1}`}
                        className="flex-1 px-4 py-2 border-2 border-amber-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                      />
                      {ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveIngredient(index)}
                          className="px-3 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                        >
                          <XMarkIcon className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="text-amber-600 font-semibold hover:text-amber-800 transition-colors"
                  >
                    + Add Ingredient
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-amber-900 font-semibold mb-2">
                  Instructions *
                </label>
                <div className="space-y-2">
                  {instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold mt-2">
                        {index + 1}
                      </div>
                      <div className="flex-1 flex gap-2">
                        <textarea
                          value={instruction}
                          onChange={(e) =>
                            handleUpdateInstruction(index, e.target.value)
                          }
                          placeholder={`Step ${index + 1}`}
                          className="flex-1 px-4 py-2 border-2 border-amber-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none resize-none"
                          rows={2}
                        />
                        {instructions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveInstruction(index)}
                            className="px-3 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors h-fit"
                          >
                            <XMarkIcon className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddInstruction}
                    className="text-amber-600 font-semibold hover:text-amber-800 transition-colors ml-10"
                  >
                    + Add Step
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-amber-900 font-semibold mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g., breakfast, vegetarian, quick"
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Recipe'}
              </button>
            </form>
          )}

          {importMethod === 'text' && (
            <div className="space-y-4">
              <p className="text-amber-700">
                Paste your recipe text below, and we'll try to parse it
                automatically. Include ingredients and instructions for best
                results.
              </p>

              <textarea
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste your recipe here...

Example format:
Chocolate Chip Cookies

Ingredients:
- 2 cups flour
- 1 cup butter
- 1 cup sugar

Instructions:
1. Mix flour and butter
2. Add sugar
3. Bake at 350°F for 12 minutes"
                className="w-full h-96 px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none resize-none font-mono text-sm"
              />

              <button
                onClick={handleTextParse}
                disabled={loading || !pastedText.trim()}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Importing...' : 'Import Recipe'}
              </button>
            </div>
          )}

          {importMethod === 'url' && (
            <div className="space-y-4">
              <p className="text-amber-700">
                Enter the URL of a recipe you'd like to import. We'll fetch the
                recipe details automatically.
              </p>

              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/recipe"
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none"
              />

              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> URL import requires a backend service to
                  scrape recipes. This feature is coming soon! For now, please use
                  the "Paste Text" or "Manual Entry" options.
                </p>
              </div>

              <button
                onClick={handleUrlImport}
                disabled={true}
                className="w-full bg-gray-300 text-gray-500 py-4 rounded-2xl font-bold text-lg cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
