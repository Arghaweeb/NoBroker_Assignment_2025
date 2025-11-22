/**
 * Recipe Library Storage Utilities
 * Handles localStorage operations for recipe library management
 */

import {
  SavedRecipe,
  RecipeCollection,
  RecipeLibraryState,
  RecipeImportData,
  ShoppingListItem,
  ShoppingListState,
} from '../types/recipe-library';

const STORAGE_KEY = 'cooking_companion_recipe_library_v1';

// Default collections that every user gets
const DEFAULT_COLLECTIONS: RecipeCollection[] = [
  {
    id: 'favorites',
    name: 'My Favorites',
    description: 'Recipes you love the most',
    emoji: '❤️',
    color: '#ef4444',
    createdAt: Date.now(),
    recipeCount: 0,
  },
  {
    id: 'family-recipes',
    name: "Family Recipes",
    description: 'Treasured family traditions',
    emoji: '👨‍👩‍👧‍👦',
    color: '#f59e0b',
    createdAt: Date.now(),
    recipeCount: 0,
  },
  {
    id: 'quick-meals',
    name: 'Quick Meals',
    description: 'Ready in 30 minutes or less',
    emoji: '⚡',
    color: '#10b981',
    createdAt: Date.now(),
    recipeCount: 0,
  },
  {
    id: 'special-occasions',
    name: 'Special Occasions',
    description: 'Recipes for celebrations',
    emoji: '🎉',
    color: '#8b5cf6',
    createdAt: Date.now(),
    recipeCount: 0,
  },
];

/**
 * Initialize library with default structure if it doesn't exist
 */
export function initializeLibrary(): RecipeLibraryState {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    try {
      const parsed = JSON.parse(stored) as RecipeLibraryState;
      // Ensure default collections exist
      const defaultIds = DEFAULT_COLLECTIONS.map((c) => c.id);
      const existingIds = parsed.collections.map((c) => c.id);
      const missingCollections = DEFAULT_COLLECTIONS.filter(
        (dc) => !existingIds.includes(dc.id)
      );

      if (missingCollections.length > 0) {
        parsed.collections = [...parsed.collections, ...missingCollections];
        saveLibrary(parsed);
      }

      return parsed;
    } catch (error) {
      console.error('Error parsing recipe library:', error);
    }
  }

  // Create new library
  const newLibrary: RecipeLibraryState = {
    recipes: [],
    collections: DEFAULT_COLLECTIONS,
    defaultCollections: DEFAULT_COLLECTIONS.map((c) => c.id),
    lastSynced: Date.now(),
  };

  saveLibrary(newLibrary);
  return newLibrary;
}

/**
 * Save entire library state to localStorage
 */
export function saveLibrary(state: RecipeLibraryState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving recipe library:', error);
    throw new Error('Failed to save recipe library');
  }
}

/**
 * Get current library state
 */
export function getLibrary(): RecipeLibraryState {
  return initializeLibrary();
}

/**
 * Add a new recipe to the library
 */
export function addRecipe(
  recipe: Omit<SavedRecipe, 'id' | 'savedAt' | 'lastModified' | 'timesCooked'>
): SavedRecipe {
  const library = getLibrary();
  const newRecipe: SavedRecipe = {
    ...recipe,
    id: generateId(),
    savedAt: Date.now(),
    lastModified: Date.now(),
    timesCooked: 0,
  };

  library.recipes.push(newRecipe);

  // Update collection counts
  updateCollectionCounts(library);

  saveLibrary(library);
  return newRecipe;
}

/**
 * Update an existing recipe
 */
export function updateRecipe(
  recipeId: string,
  updates: Partial<SavedRecipe>
): SavedRecipe | null {
  const library = getLibrary();
  const index = library.recipes.findIndex((r) => r.id === recipeId);

  if (index === -1) {
    return null;
  }

  library.recipes[index] = {
    ...library.recipes[index],
    ...updates,
    lastModified: Date.now(),
  };

  // Update collection counts if collections changed
  if (updates.collections) {
    updateCollectionCounts(library);
  }

  saveLibrary(library);
  return library.recipes[index];
}

/**
 * Delete a recipe from the library
 */
export function deleteRecipe(recipeId: string): boolean {
  const library = getLibrary();
  const index = library.recipes.findIndex((r) => r.id === recipeId);

  if (index === -1) {
    return false;
  }

  library.recipes.splice(index, 1);
  updateCollectionCounts(library);
  saveLibrary(library);
  return true;
}

/**
 * Get a single recipe by ID
 */
export function getRecipe(recipeId: string): SavedRecipe | null {
  const library = getLibrary();
  return library.recipes.find((r) => r.id === recipeId) || null;
}

/**
 * Add a new collection
 */
export function addCollection(
  collection: Omit<RecipeCollection, 'id' | 'createdAt' | 'recipeCount'>
): RecipeCollection {
  const library = getLibrary();
  const newCollection: RecipeCollection = {
    ...collection,
    id: generateId(),
    createdAt: Date.now(),
    recipeCount: 0,
  };

  library.collections.push(newCollection);
  saveLibrary(library);
  return newCollection;
}

/**
 * Update a collection
 */
export function updateCollection(
  collectionId: string,
  updates: Partial<Omit<RecipeCollection, 'id' | 'createdAt'>>
): RecipeCollection | null {
  const library = getLibrary();
  const index = library.collections.findIndex((c) => c.id === collectionId);

  if (index === -1) {
    return null;
  }

  library.collections[index] = {
    ...library.collections[index],
    ...updates,
  };

  saveLibrary(library);
  return library.collections[index];
}

/**
 * Delete a collection (only non-default collections)
 */
export function deleteCollection(collectionId: string): boolean {
  const library = getLibrary();

  // Prevent deletion of default collections
  if (library.defaultCollections.includes(collectionId)) {
    throw new Error('Cannot delete default collections');
  }

  const index = library.collections.findIndex((c) => c.id === collectionId);

  if (index === -1) {
    return false;
  }

  // Remove collection from all recipes
  library.recipes.forEach((recipe) => {
    recipe.collections = recipe.collections.filter((c) => c !== collectionId);
  });

  library.collections.splice(index, 1);
  saveLibrary(library);
  return true;
}

/**
 * Import recipe from external source
 */
export function importRecipe(
  data: RecipeImportData,
  source: 'url' | 'manual' = 'manual'
): SavedRecipe {
  return addRecipe({
    title: data.title,
    description: data.description || '',
    cookTime: data.cookTime || '30 minutes',
    servings: data.servings || 4,
    ingredients: data.ingredients,
    instructions: data.instructions,
    source: 'imported',
    sourceUrl: data.sourceUrl,
    collections: [],
    tags: [],
    isFavorite: false,
  });
}

/**
 * Mark recipe as cooked (increments counter and updates lastCooked)
 */
export function markAsCooked(recipeId: string): SavedRecipe | null {
  const library = getLibrary();
  const recipe = library.recipes.find((r) => r.id === recipeId);

  if (!recipe) {
    return null;
  }

  return updateRecipe(recipeId, {
    lastCooked: Date.now(),
    timesCooked: recipe.timesCooked + 1,
  });
}

/**
 * Toggle favorite status
 */
export function toggleFavorite(recipeId: string): SavedRecipe | null {
  const recipe = getRecipe(recipeId);

  if (!recipe) {
    return null;
  }

  return updateRecipe(recipeId, {
    isFavorite: !recipe.isFavorite,
  });
}

/**
 * Export library as JSON for backup
 */
export function exportLibrary(): string {
  const library = getLibrary();
  return JSON.stringify(library, null, 2);
}

/**
 * Import library from JSON backup
 */
export function importLibrary(jsonData: string): boolean {
  try {
    const imported = JSON.parse(jsonData) as RecipeLibraryState;

    // Validate structure
    if (!imported.recipes || !imported.collections) {
      throw new Error('Invalid library format');
    }

    saveLibrary(imported);
    return true;
  } catch (error) {
    console.error('Error importing library:', error);
    return false;
  }
}

/**
 * Helper: Update recipe counts for all collections
 */
function updateCollectionCounts(library: RecipeLibraryState): void {
  library.collections.forEach((collection) => {
    collection.recipeCount = library.recipes.filter((recipe) =>
      recipe.collections.includes(collection.id)
    ).length;
  });
}

/**
 * Helper: Generate unique ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Search recipes with various filters
 */
export function searchRecipes(
  query: string = '',
  filters: {
    collections?: string[];
    tags?: string[];
    favorite?: boolean;
    minRating?: number;
  } = {}
): SavedRecipe[] {
  const library = getLibrary();
  let results = library.recipes;

  // Text search
  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(lowerQuery) ||
        recipe.description.toLowerCase().includes(lowerQuery) ||
        recipe.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
        recipe.ingredients.some((ing) =>
          ing.toLowerCase().includes(lowerQuery)
        )
    );
  }

  // Collection filter
  if (filters.collections && filters.collections.length > 0) {
    results = results.filter((recipe) =>
      filters.collections!.some((c) => recipe.collections.includes(c))
    );
  }

  // Tag filter
  if (filters.tags && filters.tags.length > 0) {
    results = results.filter((recipe) =>
      filters.tags!.some((t) => recipe.tags.includes(t))
    );
  }

  // Favorite filter
  if (filters.favorite !== undefined) {
    results = results.filter((recipe) => recipe.isFavorite === filters.favorite);
  }

  // Rating filter
  if (filters.minRating !== undefined) {
    results = results.filter(
      (recipe) => (recipe.rating || 0) >= filters.minRating!
    );
  }

  return results;
}

// ===== SHOPPING LIST STORAGE =====

const SHOPPING_LIST_STORAGE_KEY = 'cooking_companion_shopping_list_v1';

/**
 * Initialize shopping list with default structure if it doesn't exist
 */
export function initializeShoppingList(): ShoppingListState {
  const stored = localStorage.getItem(SHOPPING_LIST_STORAGE_KEY);

  if (stored) {
    try {
      return JSON.parse(stored) as ShoppingListState;
    } catch (error) {
      console.error('Error parsing shopping list:', error);
    }
  }

  // Create new shopping list
  const newShoppingList: ShoppingListState = {
    items: [],
    lastUpdated: Date.now(),
  };

  saveShoppingList(newShoppingList);
  return newShoppingList;
}

/**
 * Save shopping list state to localStorage
 */
export function saveShoppingList(state: ShoppingListState): void {
  try {
    localStorage.setItem(SHOPPING_LIST_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving shopping list:', error);
    throw new Error('Failed to save shopping list');
  }
}

/**
 * Get current shopping list state
 */
export function getShoppingList(): ShoppingListState {
  return initializeShoppingList();
}

/**
 * Add ingredients from a recipe to shopping list
 */
export function addRecipeToShoppingList(recipeId: string): boolean {
  const recipe = getRecipe(recipeId);
  if (!recipe) {
    return false;
  }

  const shoppingList = getShoppingList();

  // Add each ingredient from the recipe
  recipe.ingredients.forEach((ingredient) => {
    // Check if ingredient already exists in shopping list
    const existingItem = shoppingList.items.find(
      (item) => item.ingredient.toLowerCase() === ingredient.toLowerCase()
    );

    if (existingItem) {
      // Add recipe ID if not already tracked
      if (!existingItem.recipeIds.includes(recipeId)) {
        existingItem.recipeIds.push(recipeId);
      }
    } else {
      // Create new shopping list item
      const newItem: ShoppingListItem = {
        id: generateId(),
        ingredient,
        recipeIds: [recipeId],
        checked: false,
        addedAt: Date.now(),
      };
      shoppingList.items.push(newItem);
    }
  });

  shoppingList.lastUpdated = Date.now();
  saveShoppingList(shoppingList);
  return true;
}

/**
 * Add a single ingredient to shopping list
 */
export function addIngredientToShoppingList(
  ingredient: string,
  quantity?: string,
  notes?: string
): ShoppingListItem {
  const shoppingList = getShoppingList();

  const newItem: ShoppingListItem = {
    id: generateId(),
    ingredient,
    quantity,
    notes,
    recipeIds: [],
    checked: false,
    addedAt: Date.now(),
  };

  shoppingList.items.push(newItem);
  shoppingList.lastUpdated = Date.now();
  saveShoppingList(shoppingList);
  return newItem;
}

/**
 * Update a shopping list item
 */
export function updateShoppingListItem(
  itemId: string,
  updates: Partial<ShoppingListItem>
): ShoppingListItem | null {
  const shoppingList = getShoppingList();
  const index = shoppingList.items.findIndex((item) => item.id === itemId);

  if (index === -1) {
    return null;
  }

  shoppingList.items[index] = {
    ...shoppingList.items[index],
    ...updates,
  };

  shoppingList.lastUpdated = Date.now();
  saveShoppingList(shoppingList);
  return shoppingList.items[index];
}

/**
 * Toggle checked status of an item
 */
export function toggleShoppingListItem(itemId: string): ShoppingListItem | null {
  const shoppingList = getShoppingList();
  const item = shoppingList.items.find((item) => item.id === itemId);

  if (!item) {
    return null;
  }

  return updateShoppingListItem(itemId, {
    checked: !item.checked,
  });
}

/**
 * Remove an item from shopping list
 */
export function removeShoppingListItem(itemId: string): boolean {
  const shoppingList = getShoppingList();
  const index = shoppingList.items.findIndex((item) => item.id === itemId);

  if (index === -1) {
    return false;
  }

  shoppingList.items.splice(index, 1);
  shoppingList.lastUpdated = Date.now();
  saveShoppingList(shoppingList);
  return true;
}

/**
 * Clear all checked items from shopping list
 */
export function clearCheckedItems(): number {
  const shoppingList = getShoppingList();
  const initialCount = shoppingList.items.length;

  shoppingList.items = shoppingList.items.filter((item) => !item.checked);

  shoppingList.lastUpdated = Date.now();
  saveShoppingList(shoppingList);
  return initialCount - shoppingList.items.length;
}

/**
 * Clear entire shopping list
 */
export function clearShoppingList(): void {
  const emptyList: ShoppingListState = {
    items: [],
    lastUpdated: Date.now(),
  };
  saveShoppingList(emptyList);
}

/**
 * Export shopping list as text for sharing
 */
export function exportShoppingListAsText(): string {
  const shoppingList = getShoppingList();
  const library = getLibrary();

  if (shoppingList.items.length === 0) {
    return 'Shopping list is empty';
  }

  let text = '🛒 Shopping List\n\n';

  // Group items by recipe
  const itemsByRecipe = new Map<string, ShoppingListItem[]>();
  const manualItems: ShoppingListItem[] = [];

  shoppingList.items.forEach((item) => {
    if (item.recipeIds.length === 0) {
      manualItems.push(item);
    } else {
      item.recipeIds.forEach((recipeId) => {
        if (!itemsByRecipe.has(recipeId)) {
          itemsByRecipe.set(recipeId, []);
        }
        itemsByRecipe.get(recipeId)!.push(item);
      });
    }
  });

  // Add recipe-based items
  itemsByRecipe.forEach((items, recipeId) => {
    const recipe = library.recipes.find((r) => r.id === recipeId);
    const recipeName = recipe ? recipe.title : 'Unknown Recipe';
    text += `📖 ${recipeName}:\n`;
    items.forEach((item) => {
      const check = item.checked ? '✓' : '○';
      text += `  ${check} ${item.ingredient}\n`;
    });
    text += '\n';
  });

  // Add manual items
  if (manualItems.length > 0) {
    text += '📝 Other Items:\n';
    manualItems.forEach((item) => {
      const check = item.checked ? '✓' : '○';
      const quantity = item.quantity ? ` (${item.quantity})` : '';
      text += `  ${check} ${item.ingredient}${quantity}\n`;
      if (item.notes) {
        text += `     Note: ${item.notes}\n`;
      }
    });
  }

  return text;
}
