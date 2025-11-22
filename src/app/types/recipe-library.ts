/**
 * Recipe Library Type Definitions
 * Defines the data structure for saved recipes, collections, and library management
 */

export interface SavedRecipe {
  id: string;
  title: string;
  description: string;
  cookTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];

  // Library-specific metadata
  savedAt: number; // timestamp
  lastModified: number; // timestamp
  source?: 'generated' | 'imported' | 'manual'; // where recipe came from
  sourceUrl?: string; // if imported from URL

  // Organization
  collections: string[]; // collection IDs this recipe belongs to
  tags: string[]; // searchable tags (e.g., 'breakfast', 'vegetarian', 'quick')
  isFavorite: boolean;

  // User notes
  personalNotes?: string; // like mom's handwritten notes
  rating?: number; // 1-5 stars
  lastCooked?: number; // timestamp of when last made
  timesCooked: number; // cooking frequency

  // Visual elements
  imageUrl?: string; // recipe photo
  thumbnailUrl?: string; // smaller version for cards
}

export interface RecipeCollection {
  id: string;
  name: string;
  description?: string;
  emoji?: string; // visual identifier
  color?: string; // collection theme color
  createdAt: number;
  recipeCount: number; // cached count for performance
}

export interface RecipeLibraryState {
  recipes: SavedRecipe[];
  collections: RecipeCollection[];
  defaultCollections: string[]; // IDs of default collections
  lastSynced?: number; // for future cloud sync
}

export interface RecipeImportData {
  title: string;
  description?: string;
  cookTime?: string;
  servings?: number;
  ingredients: string[];
  instructions: string[];
  sourceUrl?: string;
}

export type RecipeSortOption =
  | 'recent'
  | 'alphabetical'
  | 'mostCooked'
  | 'rating'
  | 'cookTime';

export type RecipeFilterOption =
  | 'all'
  | 'favorites'
  | 'recent'
  | 'never-cooked';

export interface RecipeSearchParams {
  query?: string;
  collections?: string[];
  tags?: string[];
  favorite?: boolean;
  minRating?: number;
  maxCookTime?: number; // in minutes
}

export interface ShoppingListItem {
  id: string;
  ingredient: string;
  quantity?: string;
  recipeIds: string[]; // Which recipes need this ingredient
  checked: boolean;
  addedAt: number; // timestamp
  notes?: string; // Optional notes for the item
}

export interface ShoppingListState {
  items: ShoppingListItem[];
  lastUpdated: number;
}
