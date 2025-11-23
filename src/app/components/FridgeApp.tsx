import React, { useState, useEffect } from "react";
import { Plus, X, Clock, Users, Copy, Download, BookmarkPlus, BookmarkCheck } from "lucide-react";
import * as emoji from "node-emoji";
import { addRecipe } from '../utils/recipe-library-storage';
import Loader from './Loader';

// ---------- Types ----------
interface Ingredient {
  id: string;
  name: string;
  category: string;
  emoji: string;
}

interface Recipe {
  id: string;
  title: string;
  description: string;
  cookTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  matchPercentage: number;
  missingIngredients?: string[];
  countryOfOrigin?: string;

  // Smart suggestions / learning
  personalScore?: number;
  canCookNow?: boolean;
}

interface ApiRecipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: number;
  countryOfOrigin?: string;
}

interface ApiResponse {
  recipes: ApiRecipe[];
}

interface TasteProfile {
  ingredientUsage: Record<string, number>;
  sessions: number;
}

interface AddOnSuggestion {
  name: string;
  unlocks: number;
}

const TASTE_PROFILE_STORAGE_KEY = "fridge_taste_profile_v1";

// ---------- Ingredient base data ----------
const INGREDIENT_DATA = [
  { name: "egg", category: "Protein" },
  { name: "tomato", category: "Vegetable" },
  { name: "cheese", category: "Dairy" },
  { name: "chicken", category: "Protein" },
  { name: "onion", category: "Vegetable" },
  { name: "garlic", category: "Vegetable" },
  { name: "rice", category: "Grain" },
  { name: "pasta", category: "Grain" },
];

const INGREDIENT_SUGGESTIONS = [
  "egg",
  "tomato",
  "cheese",
  "chicken",
  "onion",
  "garlic",
  "rice",
  "pasta",
  "butter",
  "milk",
  "bread",
  "potato",
  "carrot",
  "beef",
  "pork",
  "fish",
  "salmon",
  "tuna",
  "shrimp",
  "bacon",
  "ham",
  "sausage",
  "yogurt",
  "cream",
  "oil",
  "salt",
  "pepper",
  "sugar",
  "flour",
  "spinach",
  "lettuce",
  "mushroom",
  "bell pepper",
  "cucumber",
  "avocado",
  "lemon",
  "lime",
  "apple",
  "banana",
  "orange",
  "strawberry",
  "blueberry",
  "mango",
  "pineapple",
  "coconut",
  "honey",
  "vanilla",
  "cinnamon",
  "basil",
  "oregano",
  "thyme",
  "rosemary",
];

// Smart Scan presets (for demo)
const SCAN_PRESETS: {
  id: string;
  label: string;
  emoji: string;
  description: string;
  ingredients: string[];
}[] = [
  {
    id: "indian-basic",
    label: "Typical Indian Fridge",
    emoji: "🍛",
    description: "Onion, tomato, rice, yogurt, spices, eggs",
    ingredients: ["onion", "tomato", "rice", "egg", "garlic", "butter"],
  },
  {
    id: "breakfast-quick",
    label: "Quick Breakfast",
    emoji: "🍳",
    description: "Eggs, bread, butter, cheese, milk",
    ingredients: ["egg", "bread", "butter", "cheese", "milk"],
  },
  {
    id: "pasta-night",
    label: "Pasta Night",
    emoji: "🍝",
    description: "Pasta, tomato, cheese, garlic, onion",
    ingredients: ["pasta", "tomato", "cheese", "garlic", "onion"],
  },
  {
    id: "mediterranean-kitchen",
    label: "Mediterranean Kitchen",
    emoji: "🫒",
    description: "Olive oil, feta, cucumber, tomato, lemon",
    ingredients: ["tomato", "cucumber", "lemon", "garlic", "onion", "oil"],
  },
  {
    id: "asian-fusion",
    label: "Asian Fusion",
    emoji: "🍜",
    description: "Rice, chicken, ginger, vegetables, soy sauce",
    ingredients: ["rice", "chicken", "onion", "garlic", "carrot", "egg"],
  },
  {
    id: "healthy-veggie",
    label: "Healthy Vegetarian",
    emoji: "🥗",
    description: "Mixed vegetables, beans, spinach, avocado",
    ingredients: ["spinach", "tomato", "avocado", "onion", "mushroom", "pepper"],
  },
];

// ---------- LocalStorage helpers ----------
const loadTasteProfile = (): TasteProfile | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(TASTE_PROFILE_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as TasteProfile;
  } catch {
    return null;
  }
};

const saveTasteProfile = (profile: TasteProfile) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(TASTE_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // ignore
  }
};

// ---------- Emoji & Ingredient helpers ----------
const findEmojiForIngredient = (ingredientName: string): string => {
  const emojiMap: { [key: string]: string } = {
    egg: "🥚",
    tomato: "🍅",
    cheese: "🧀",
    chicken: "🐔",
    onion: "🧅",
    garlic: "🧄",
    rice: "🍚",
    pasta: "🍝",
    butter: "🧈",
    milk: "🥛",
    bread: "🍞",
    potato: "🥔",
    carrot: "🥕",
    beef: "🥩",
    pork: "🥓",
    fish: "🐟",
    salmon: "🐟",
    tuna: "🐟",
    shrimp: "🦐",
    bacon: "🥓",
    ham: "🍖",
    sausage: "🌭",
    yogurt: "🥛",
    cream: "🥛",
    oil: "🫒",
    salt: "🧂",
    pepper: "🌶️",
    sugar: "🍯",
    flour: "🌾",
    spinach: "🥬",
    lettuce: "🥬",
    mushroom: "🍄",
    "bell pepper": "🫑",
    cucumber: "🥒",
    avocado: "🥑",
    lemon: "🍋",
    lime: "🍋",
    apple: "🍎",
    banana: "🍌",
    orange: "🍊",
    strawberry: "🍓",
    blueberry: "🫐",
    mango: "🥭",
    pineapple: "🍍",
    coconut: "🥥",
    honey: "🍯",
    vanilla: "🌿",
    cinnamon: "🌿",
    basil: "🌿",
    oregano: "🌿",
    thyme: "🌿",
    rosemary: "🌿",
  };

  const normalizedName = ingredientName.toLowerCase().trim();

  if (emojiMap[normalizedName]) return emojiMap[normalizedName];

  const foundEmoji = emoji.find(normalizedName);
  if (foundEmoji) return foundEmoji.emoji;

  for (const [key, value] of Object.entries(emojiMap)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return value;
    }
  }

  return "🥄";
};

const createIngredient = (name: string): Ingredient => {
  const normalized = name.toLowerCase().trim();
  return {
    id: `${normalized}-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 7)}`,
    name: normalized,
    category:
      INGREDIENT_DATA.find((item) => item.name === normalized)?.category ||
      "Other",
    emoji: findEmojiForIngredient(normalized),
  };
};

// ---------- Image helper ----------
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") resolve(result);
      else reject(new Error("Failed to read file"));
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// ---------- Small UI components ----------
const IngredientIllustration = ({
  type,
  size = "large",
}: {
  type: string;
  size?: "small" | "large";
}) => {
  const baseSize =
    size === "large" ? "w-10 h-10 md:w-16 md:h-16" : "w-5 h-5 md:w-8 md:h-8";

  const illustrations = {
    egg: (
      <div className={`${baseSize} relative mx-auto`}>
        <div
          className={`${baseSize} bg-gradient-to-b from-orange-50 to-orange-100 rounded-full border-4 border-orange-200 shadow-lg relative overflow-hidden`}
        >
          <div
            className={`absolute ${
              size === "large"
                ? "bottom-1 md:bottom-2 left-1/2 transform -translate-x-1/2 w-5 h-5 md:w-8 md:h-8"
                : "bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 md:w-4 md:h-4"
            } bg-gradient-to-b from-orange-300 to-orange-400 rounded-full`}
          ></div>
          <div
            className={`absolute ${
              size === "large"
                ? "top-1 md:top-3 left-1 md:left-3 w-1 h-1 md:w-3 md:h-3"
                : "top-1 left-1 w-1 h-1"
            } bg-orange-200 rounded-full opacity-70`}
          ></div>
        </div>
      </div>
    ),
    tomato: (
      <div className={`${baseSize} relative mx-auto`}>
        <div
          className={`${baseSize} bg-gradient-to-b from-red-400 to-red-500 rounded-full border-4 border-red-300 shadow-lg relative`}
        >
          <div
            className={`absolute ${
              size === "large"
                ? "-top-1 md:-top-2 left-1/2 transform -translate-x-1/2 w-3 h-2 md:w-6 md:h-4"
                : "-top-1 left-1/2 transform -translate-x-1/2 w-2 h-1 md:w-3 md:h-2"
            } bg-green-500 rounded-t-full`}
          >
            <div
              className={`absolute ${
                size === "large"
                  ? "top-0 left-0 w-1 h-1 md:h-2"
                  : "top-0 left-0 w-1 h-1"
              } bg-green-600 rounded-full`}
            ></div>
          </div>
          <div
            className={`absolute ${
              size === "large"
                ? "top-1 md:top-3 left-1 md:left-3 w-1 h-1 md:w-3 md:h-3"
                : "top-1 left-1 w-1 h-1"
            } bg-red-300 rounded-full opacity-60`}
          ></div>
          <div
            className={`absolute ${
              size === "large"
                ? "top-2 md:top-5 right-2 md:right-4 w-1 h-1 md:w-2 md:h-2"
                : "top-2 right-2 w-1 h-1"
            } bg-red-300 rounded-full opacity-40`}
          ></div>
        </div>
      </div>
    ),
    cheese: (
      <div className={`${baseSize} relative mx-auto`}>
        <div
          className={`${
            size === "large"
              ? "w-10 h-7 md:w-16 md:h-12"
              : "w-5 h-3 md:w-8 md:h-6"
          } bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-lg border-4 border-yellow-200 shadow-lg relative`}
        >
          <div
            className={`absolute ${
              size === "large"
                ? "top-1 md:top-2 left-1 md:left-3 w-1 h-1 md:w-3 md:h-3"
                : "top-1 left-1 w-1 h-1"
            } bg-yellow-200 rounded-full`}
          ></div>
          <div
            className={`absolute ${
              size === "large"
                ? "top-2 md:top-4 right-1 md:right-3 w-1 h-1 md:w-2 md:h-2"
                : "top-2 right-1 w-1 h-1"
            } bg-yellow-200 rounded-full`}
          ></div>
          <div
            className={`absolute ${
              size === "large"
                ? "bottom-1 md:bottom-2 left-2 md:left-5 w-1 h-1 md:w-2 md:h-2"
                : "bottom-1 left-2 w-1 h-1"
            } bg-yellow-200 rounded-full`}
          ></div>
          <div
            className={`absolute ${
              size === "large"
                ? "top-3 md:top-6 left-4 md:left-8 w-1 h-1 md:w-2 md:h-2"
                : "top-3 left-4 w-1 h-1"
            } bg-yellow-200 rounded-full`}
          ></div>
        </div>
      </div>
    ),
    chicken: (
      <div className={`${baseSize} relative mx-auto`}>
        <div
          className={`${
            size === "large"
              ? "w-7 h-10 md:w-12 md:h-16"
              : "w-3 h-5 md:w-6 md:h-8"
          } bg-gradient-to-b from-amber-200 to-amber-400 rounded-lg border-4 border-amber-200 shadow-lg relative transform rotate-12`}
        >
          <div
            className={`absolute ${
              size === "large"
                ? "bottom-0 left-1/2 transform -translate-x-1/2 w-5 h-3 md:w-8 md:h-6"
                : "bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-1 md:w-4 md:h-3"
            } bg-amber-300 rounded-full`}
          ></div>
          <div
            className={`absolute ${
              size === "large"
                ? "top-1 md:top-2 right-0 md:right-1 w-1 h-2 md:w-3 md:h-4"
                : "top-1 right-0 w-1 h-2"
            } bg-amber-500 rounded-lg transform rotate-45`}
          ></div>
        </div>
      </div>
    ),
    onion: (
      <div className={`${baseSize} relative mx-auto`}>
        <div
          className={`${baseSize} bg-gradient-to-b from-orange-200 to-orange-300 rounded-full border-4 border-orange-200 shadow-lg relative`}
        >
          <div
            className={`absolute ${
              size === "large"
                ? "top-1 md:top-2 left-1 md:left-2 w-8 h-1 md:w-12 md:h-2"
                : "top-1 left-1 w-3 h-1 md:w-6 md:h-1"
            } bg-orange-400 rounded-full opacity-60`}
          ></div>
          <div
            className={`absolute ${
              size === "large"
                ? "top-3 md:top-5 left-1 md:left-2 w-8 h-1 md:w-12 md:h-2"
                : "top-2 left-1 w-3 h-1 md:w-6 md:h-1"
            } bg-orange-400 rounded-full opacity-60`}
          ></div>
          <div
            className={`absolute ${
              size === "large"
                ? "top-5 md:top-8 left-1 md:left-2 w-8 h-1 md:w-12 md:h-2"
                : "top-4 left-1 w-3 h-1 md:w-6 md:h-1"
            } bg-orange-400 rounded-full opacity-60`}
          ></div>
          <div
            className={`absolute ${
              size === "large"
                ? "top-7 md:top-11 left-1 md:left-2 w-8 h-1 md:w-12 md:h-2"
                : "top-5 left-1 w-3 h-1 md:w-6 md:h-1"
            } bg-orange-400 rounded-full opacity-60`}
          ></div>
        </div>
      </div>
    ),
    garlic: (
      <div className={`${baseSize} relative mx-auto`}>
        <div
          className={`${
            size === "large"
              ? "w-7 h-10 md:w-12 md:h-16"
              : "w-3 h-5 md:w-6 md:h-8"
          } bg-gradient-to-b from-gray-100 to-gray-200 rounded-full border-4 border-gray-200 shadow-lg relative`}
        >
          <div
            className={`absolute ${
              size === "large"
                ? "top-0 left-1/2 transform -translate-x-1/2 w-2 h-1 md:w-4 md:h-3"
                : "top-0 left-1/2 transform -translate-x-1/2 w-2 h-1"
            } bg-green-400 rounded-full`}
          ></div>
          <div
            className={`absolute ${
              size === "large"
                ? "top-2 md:top-4 left-0 md:left-1 w-1 h-5 md:w-2 md:h-8"
                : "top-2 left-0 w-1 h-2 md:h-4"
            } bg-gray-300 rounded-full opacity-50`}
          ></div>
          <div
            className={`absolute ${
              size === "large"
                ? "top-2 md:top-4 right-0 md:right-1 w-1 h-5 md:w-2 md:h-8"
                : "top-2 right-0 w-1 h-2 md:h-4"
            } bg-gray-300 rounded-full opacity-50`}
          ></div>
        </div>
      </div>
    ),
    rice: (
      <div className={`${baseSize} relative mx-auto`}>
        <div className={`${baseSize} bg-gradient-to-b from-blue-300 to-blue-400 rounded-lg border-4 border-blue-200 shadow-lg relative`}>
          <div
            className={`absolute ${
              size === "large"
                ? "top-1 md:top-2 left-1/2 transform -translate-x-1/2 w-8 h-5 md:w-12 md:h-8"
                : "top-1 left-1/2 transform -translate-x-1/2 w-3 h-2 md:w-6 md:h-4"
            } bg-white rounded-lg border border-gray-200`}
          >
            <div className="absolute top-0 left-0 w-1 h-1 bg-gray-100 rounded-full"></div>
            <div className="absolute top-1 right-1 w-1 h-1 bg-gray-100 rounded-full"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-100 rounded-full"></div>
          </div>
        </div>
      </div>
    ),
    pasta: (
      <div className={`${baseSize} relative mx-auto`}>
        <div className={`${baseSize} bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-lg border-4 border-yellow-200 shadow-lg relative overflow-hidden`}>
          <div className="absolute top-1 left-1 w-1 md:w-2 h-6 md:h-12 bg-yellow-400 rounded-full transform rotate-12"></div>
          <div className="absolute top-1 left-4 md:left-4 w-1 md:w-2 h-6 md:h-12 bg-yellow-400 rounded-full transform -rotate-12"></div>
          <div className="absolute top-1 left-7 md:left-7 w-1 md:w-2 h-6 md:h-12 bg-yellow-400 rounded-full transform rotate-6"></div>
          <div className="absolute top-1 right-1 md:right-3 w-1 md:w-2 h-6 md:h-12 bg-yellow-400 rounded-full transform -rotate-6"></div>
        </div>
      </div>
    ),
  };

  return illustrations[type as keyof typeof illustrations] || illustrations.egg;
};

const FridgeIcon = () => (
  <div className="w-20 h-24 bg-orange-600 rounded-2xl shadow-2xl border-4 border-orange-500 relative overflow-hidden mx-auto">
    <div className="absolute inset-2 bg-gray-100 rounded-lg">
      <div className="absolute top-2 left-1 right-1 h-1 bg-gray-300 rounded"></div>
      <div className="absolute bottom-6 left-1 right-1 h-1 bg-gray-300 rounded"></div>

      <div className="absolute top-3 left-1">
        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
      </div>
      <div className="absolute top-1 right-1">
        <div className="w-2 h-6 bg-blue-300 rounded-sm"></div>
      </div>
      <div className="absolute bottom-2 left-1">
        <div className="w-4 h-2 bg-green-400 rounded-full"></div>
      </div>
      <div className="absolute bottom-3 right-2">
        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
      </div>
    </div>

    <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-1 h-4 bg-gray-400 rounded-full"></div>
  </div>
);

const userHasIngredient = (
  userIngredients: string[],
  recipeIngredient: string
): boolean => {
  const userIngredientsLower = userIngredients.map((ing) => ing.toLowerCase());
  const recipeIngLower = recipeIngredient.toLowerCase();

  const cleanRecipeIng = recipeIngLower
    .replace(
      /^\d+(\.\d+)?\s*(cups?|tbsp|tablespoons?|tsp|teaspoons?|lbs?|pounds?|oz|ounces?|grams?|kg|ml|liters?|cloves?|pieces?)\s*/g,
      ""
    )
    .replace(/^\d+(\.\d+)?\s*/g, "")
    .replace(
      /\b(chopped|diced|minced|sliced|grated|fresh|dried|cooked|raw|optional|of)\b\s*/g,
      ""
    )
    .trim();

  return userIngredientsLower.some((userIng) => {
    if (userIng === cleanRecipeIng) return true;
    if (cleanRecipeIng.includes(userIng)) return true;
    if (userIng.includes(cleanRecipeIng)) return true;

    const recipeWords = cleanRecipeIng
      .split(" ")
      .filter((word) => word.length > 3);
    const userWords = userIng.split(" ").filter((word) => word.length > 3);

    return recipeWords.some((rWord) =>
      userWords.some((uWord) => rWord.includes(uWord) || uWord.includes(rWord))
    );
  });
};

const calculateMatchPercentage = (
  userIngredients: string[],
  recipeIngredients: string[]
): number => {
  const pantryItems = [
    "salt",
    "pepper",
    "oil",
    "water",
    "butter",
    "olive oil",
    "vegetable oil",
  ];

  const relevantIngredients = recipeIngredients.filter((ingredient) => {
    const lowerIng = ingredient.toLowerCase();
    return !pantryItems.some((pantryItem) => lowerIng.includes(pantryItem));
  });

  if (relevantIngredients.length === 0) return 100;

  const matchCount = relevantIngredients.filter((ingredient) =>
    userHasIngredient(userIngredients, ingredient)
  ).length;

  return Math.round((matchCount / relevantIngredients.length) * 100);
};

const findMissingIngredients = (
  userIngredients: string[],
  recipeIngredients: string[]
): string[] => {
  const pantryItems = [
    "salt",
    "pepper",
    "oil",
    "water",
    "butter",
    "olive oil",
    "vegetable oil",
  ];

  const missingIngredients = recipeIngredients.filter((ingredient) => {
    const lowerIng = ingredient.toLowerCase();

    if (pantryItems.some((pantryItem) => lowerIng.includes(pantryItem))) {
      return false;
    }

    return !userHasIngredient(userIngredients, ingredient);
  });

  return missingIngredients.slice(0, 3);
};

const computePersonalScore = (
  recipe: Recipe,
  profile: TasteProfile | null
): number => {
  let score = recipe.matchPercentage;
  if (!profile) return score;

  const usage = profile.ingredientUsage;
  let boost = 0;

  recipe.ingredients.forEach((ingredient) => {
    const normalized = ingredient.toLowerCase();
    Object.keys(usage).forEach((fav) => {
      if (normalized.includes(fav)) {
        boost += Math.min(usage[fav], 5);
      }
    });
  });

  return score + Math.min(boost, 20);
};

const computeAddOnSuggestions = (
  recipes: Recipe[],
  userIngredients: string[]
): AddOnSuggestion[] => {
  const userSet = new Set(userIngredients.map((i) => i.toLowerCase()));
  const counts: Record<string, number> = {};

  recipes.forEach((recipe) => {
    (recipe.missingIngredients || []).forEach((missing) => {
      const key = missing.toLowerCase();
      if (userSet.has(key)) return;
      counts[key] = (counts[key] || 0) + 1;
    });
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, unlocks]) => ({
      name,
      unlocks,
    }));
};

const generateRecipes = async (
  ingredientNames: string[]
): Promise<Recipe[]> => {
  const response = await fetch("/api/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredientNames,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to generate recipes");
  }

  const data: ApiResponse = await response.json();

  return data.recipes.map((recipe: ApiRecipe, index: number) => ({
    id: (index + 1).toString(),
    title: recipe.title,
    description: recipe.description,
    cookTime: recipe.cookingTime || "30 min",
    servings: recipe.servings,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    countryOfOrigin: recipe.countryOfOrigin,
    matchPercentage: 0,
    missingIngredients: [],
  }));
};

// Add-on suggestions bar
const AddOnSuggestionsBar: React.FC<{
  suggestions: AddOnSuggestion[];
  onAddIngredient: (name: string) => void;
}> = ({ suggestions, onAddIngredient }) => {
  if (!suggestions.length) return null;

  return (
    <div className="mb-4 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-2xl shadow-sm">
      <p className="font-poppins font-semibold text-orange-900 text-sm mb-2">
        ⭐ Upscale your dishes by adding:
      </p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((sug) => (
          <button
            key={sug.name}
            onClick={() => onAddIngredient(sug.name)}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-orange-200 shadow-sm text-xs font-poppins font-medium text-orange-900 hover:bg-orange-50 transition"
          >
            <span className="text-base">
              {findEmojiForIngredient(sug.name)}
            </span>
            <span className="capitalize">{sug.name}</span>
            <span className="text-[10px] text-orange-600">
              unlocks {sug.unlocks} dish
              {sug.unlocks > 1 ? "es" : ""}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Scan modal (image upload + presets)
const ScanModal: React.FC<{
  onClose: () => void;
  onApplyPreset: (ingredients: string[]) => void;
  onScanImage: (file: File) => Promise<void>;
  scanLoading: boolean;
  scanError: string | null;
}> = ({ onClose, onApplyPreset, onScanImage, scanLoading, scanError }) => {
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await onScanImage(file);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-orange bg-opacity-40 px-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full max-h-[85vh] overflow-y-auto p-4 border-2 border-orange-200 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-full bg-orange-50 hover:bg-orange-100 border border-orange-200 z-10"
        >
          <X className="w-4 h-4 text-orange-700" />
        </button>

        <h3 className="font-poppins font-bold text-base text-orange-900 mb-1 pr-8">
          Smart Scan
        </h3>
        <p className="font-poppins text-xs text-orange-700 mb-3">
          Upload a photo of your fridge or groceries, or use a quick preset.
        </p>

        {/* Image upload */}
        <div className="mb-3 p-2.5 border border-dashed border-orange-300 rounded-2xl bg-orange-50">
          <label className="flex flex-col items-center gap-1.5 cursor-pointer">
            <span className="text-xl">📷</span>
            <span className="font-poppins text-xs text-orange-800 text-center">
              {scanLoading
                ? "Scanning items in your image..."
                : "Tap to upload a photo of your fridge"}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={scanLoading}
            />
          </label>
          {scanError && (
            <p className="mt-2 text-xs text-red-600 font-poppins">
              {scanError}
            </p>
          )}
        </div>

        <p className="font-poppins text-xs text-orange-700 mb-2 font-semibold">
          Or try a preset fridge:
        </p>

        <div className="space-y-1.5">
          {SCAN_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onApplyPreset(preset.ingredients)}
              className="w-full flex items-start gap-2.5 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl px-2.5 py-2 text-left transition"
            >
              <div className="text-xl mt-0.5">{preset.emoji}</div>
              <div>
                <div className="font-poppins font-semibold text-orange-900 text-xs">
                  {preset.label}
                </div>
                <div className="font-poppins text-xs text-orange-700">
                  {preset.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Recipe card
const RecipeCard: React.FC<{
  recipe: Recipe;
  copyRecipe: (recipe: Recipe) => void;
  downloadRecipe: (recipe: Recipe) => void;
  saveToLibrary: (recipe: Recipe) => void;
  savedRecipeIds: Set<string>;
}> = ({ recipe, copyRecipe, downloadRecipe, saveToLibrary, savedRecipeIds }) => {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl p-5 shadow-lg">
      <h3 className="font-poppins font-bold text-xl text-orange-900 mb-2">
        {recipe.title}
      </h3>
      <p className="font-poppins font-medium text-orange-700 text-sm mb-4">
        {recipe.description}
      </p>

      <div className="flex items-center gap-4 mb-3 text-sm flex-wrap">
        <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow-sm">
          <Clock className="w-4 h-4 text-orange-600" />
          <span className="font-poppins font-semibold text-orange-800">
            {recipe.cookTime}
          </span>
        </div>
        <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow-sm">
          <Users className="w-4 h-4 text-orange-600" />
          <span className="font-poppins font-semibold text-orange-800">
            {recipe.servings} servings
          </span>
        </div>
        {recipe.countryOfOrigin && (
          <div className="flex items-center gap-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full px-3 py-1 shadow-sm">
            <span className="text-base">🌍</span>
            <span className="font-poppins font-semibold text-blue-800">
              {recipe.countryOfOrigin}
            </span>
          </div>
        )}
        <div
          className={`flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow-sm ${
            recipe.matchPercentage >= 80
              ? "bg-green-50"
              : recipe.matchPercentage >= 60
              ? "bg-yellow-50"
              : "bg-red-50"
          }`}
        >
          <div
            className={`w-3 h-3 rounded-full ${
              recipe.matchPercentage >= 80
                ? "bg-gradient-to-r from-green-400 to-green-500"
                : recipe.matchPercentage >= 60
                ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                : "bg-gradient-to-r from-red-400 to-red-500"
            }`}
          ></div>
          <span className="font-poppins font-semibold text-orange-800 text-xs">
            {recipe.matchPercentage}% match
          </span>
        </div>
      </div>

      {recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <h5 className="font-poppins font-semibold text-orange-900 text-sm mb-2 flex items-center gap-2">
            🛒 Missing ingredients:
          </h5>
          <div className="flex flex-wrap gap-2">
            {recipe.missingIngredients.map((ingredient, index) => (
              <span
                key={index}
                className="font-poppins font-medium text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full border border-orange-200"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-white rounded-lg border border-orange-200">
        <h4 className="font-poppins font-bold text-orange-900 mb-2">
          Instructions:
        </h4>
        <ol className="font-poppins font-medium text-sm text-orange-800 space-y-1">
          {recipe.instructions.map((step, stepIndex) => (
            <li key={stepIndex} className="flex gap-2">
              <span className="font-poppins font-semibold text-orange-600">
                {stepIndex + 1}.
              </span>
              <span className="font-poppins font-medium">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <button
          onClick={() => saveToLibrary(recipe)}
          disabled={savedRecipeIds.has(recipe.id)}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-poppins font-bold text-sm transition-all shadow-lg ${
            savedRecipeIds.has(recipe.id)
              ? 'bg-gray-400 cursor-not-allowed opacity-60'
              : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 active:scale-95'
          }`}
        >
          {savedRecipeIds.has(recipe.id) ? (
            <>
              <BookmarkCheck className="w-5 h-5" />
              Saved to Library
            </>
          ) : (
            <>
              <BookmarkPlus className="w-5 h-5" />
              Save to Recipe Library
            </>
          )}
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => copyRecipe(recipe)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-poppins font-medium text-sm hover:from-orange-600 hover:to-yellow-600 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
          <button
            onClick={() => downloadRecipe(recipe)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-poppins font-medium text-sm hover:from-red-600 hover:to-orange-600 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------- Main component ----------
interface FridgeAppProps {
  onNavigateToLibrary?: () => void;
}

const FridgeApp: React.FC<FridgeAppProps> = ({ onNavigateToLibrary }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<"ingredients" | "recipes">(
    "ingredients"
  );
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [tasteProfile, setTasteProfile] = useState<TasteProfile | null>(null);
  const [addOnSuggestions, setAddOnSuggestions] = useState<AddOnSuggestion[]>(
    []
  );
  const [showScanModal, setShowScanModal] = useState(false);
  const [scanLoading, setScanLoading] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [savedRecipeIds, setSavedRecipeIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = loadTasteProfile();
    if (stored) setTasteProfile(stored);
  }, []);

  const updateTasteProfileForSearch = (ingredientNames: string[]) => {
    setTasteProfile((prev) => {
      const next: TasteProfile = prev
        ? {
            ingredientUsage: { ...prev.ingredientUsage },
            sessions: prev.sessions + 1,
          }
        : { ingredientUsage: {}, sessions: 1 };

      ingredientNames.forEach((name) => {
        const key = name.toLowerCase();
        next.ingredientUsage[key] = (next.ingredientUsage[key] || 0) + 1;
      });

      saveTasteProfile(next);
      return next;
    });
  };

  const copyRecipe = (recipe: Recipe) => {
    const recipeText = `
${recipe.title}

${recipe.description}

⏱️ Cooking Time: ${recipe.cookTime}
👥 Servings: ${recipe.servings}
📊 Match: ${recipe.matchPercentage}%

${
  recipe.missingIngredients && recipe.missingIngredients.length > 0
    ? `🛒 Missing ingredients: ${recipe.missingIngredients.join(", ")}\n`
    : ""
}

📝 Ingredients:
${recipe.ingredients.map((ing) => `• ${ing}`).join("\n")}

👨‍🍳 Instructions:
${recipe.instructions.map((step, index) => `${index + 1}. ${step}`).join("\n")}
		`.trim();

    navigator.clipboard
      .writeText(recipeText)
      .catch((err) => console.error("Failed to copy recipe:", err));
  };

  const downloadRecipe = (recipe: Recipe) => {
    const recipeText = `
${recipe.title}

${recipe.description}

⏱️ Cooking Time: ${recipe.cookTime}
👥 Servings: ${recipe.servings}
📊 Match: ${recipe.matchPercentage}%

${
  recipe.missingIngredients && recipe.missingIngredients.length > 0
    ? `🛒 Missing ingredients: ${recipe.missingIngredients.join(", ")}\n`
    : ""
}

📝 Ingredients:
${recipe.ingredients.map((ing) => `• ${ing}`).join("\n")}

👨‍🍳 Instructions:
${recipe.instructions.map((step, index) => `${index + 1}. ${step}`).join("\n")}
		`.trim();

    const blob = new Blob([recipeText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${recipe.title
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const saveToLibrary = (recipe: Recipe) => {
    // Check if already saved
    if (savedRecipeIds.has(recipe.id)) {
      alert('ℹ️ This recipe is already in your library!');
      return;
    }

    try {
      // Convert the Recipe from FridgeApp to SavedRecipe format
      addRecipe({
        title: recipe.title,
        description: recipe.description,
        cookTime: recipe.cookTime,
        servings: recipe.servings,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        countryOfOrigin: recipe.countryOfOrigin,
        source: 'generated',
        collections: [],
        tags: ['generated', 'from-scanner'],
        isFavorite: false,
      });

      // Mark this recipe as saved
      setSavedRecipeIds(prev => new Set(prev).add(recipe.id));

      // Show success message
      alert('✨ Recipe saved to your library!\n\nYou can view it in the Recipe Library section.');

      // Optionally navigate to library if the callback is provided
      if (onNavigateToLibrary) {
        const shouldNavigate = confirm('Would you like to view your Recipe Library now?');
        if (shouldNavigate) {
          onNavigateToLibrary();
        }
      }
    } catch (error) {
      console.error('Failed to save recipe:', error);
      alert('❌ Failed to save recipe. Please try again.');
    }
  };

  const handleInputChange = (value: string) => {
    setNewIngredient(value);
    if (value.trim()) {
      const filtered = INGREDIENT_SUGGESTIONS.filter(
        (suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase()) &&
          !ingredients.some((ing) => ing.name === suggestion.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const addIngredient = (name: string) => {
    if (!name.trim()) return;
    const normalized = name.toLowerCase().trim();

    setIngredients((prev) => {
      if (prev.some((ing) => ing.name === normalized)) return prev;
      return [...prev, createIngredient(normalized)];
    });

    setNewIngredient("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const selectSuggestion = (suggestion: string) => addIngredient(suggestion);

  const removeIngredient = (id: string) => {
    setIngredients((prev) => prev.filter((ing) => ing.id !== id));
  };

  const applyScanPreset = (presetIngredients: string[]) => {
    setIngredients((prev) => {
      const existingNames = new Set(prev.map((i) => i.name.toLowerCase()));
      const newItems: Ingredient[] = [];

      presetIngredients.forEach((name) => {
        const normalized = name.toLowerCase().trim();
        if (!existingNames.has(normalized)) {
          newItems.push(createIngredient(normalized));
          existingNames.add(normalized);
        }
      });

      return [...prev, ...newItems];
    });

    setShowScanModal(false);
  };

  const handleScanImage = async (file: File) => {
    try {
      setScanLoading(true);
      setScanError(null);

      const dataUrl = await fileToBase64(file);
      const base64 = dataUrl.split(",")[1];

      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64 }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "Failed to scan image");
      }

      const json = await res.json();
      const ingredientsFromImage: string[] = json.ingredients || [];

      if (!ingredientsFromImage.length) {
        throw new Error("No items detected in the image");
      }

      setIngredients((prev) => {
        const existingNames = new Set(prev.map((i) => i.name.toLowerCase()));
        const newItems = ingredientsFromImage
          .map((name) => name.toLowerCase().trim())
          .filter((name) => name && !existingNames.has(name));

        return [...prev, ...newItems.map((name) => createIngredient(name))];
      });

      setShowScanModal(false);
    } catch (err: any) {
      console.error("Scan failed:", err);
      setScanError(err?.message || "Failed to scan items");
    } finally {
      setScanLoading(false);
    }
  };

  const findRecipes = async () => {
    if (ingredients.length === 0) return;

    setLoading(true);
    setCurrentScreen("recipes");
    setError(null);

    try {
      const ingredientNames = ingredients.map((ing) => ing.name);
      updateTasteProfileForSearch(ingredientNames);

      const rawRecipes = await generateRecipes(ingredientNames);

      const enrichedRecipes: Recipe[] = rawRecipes.map((recipe) => {
        const match = calculateMatchPercentage(
          ingredientNames,
          recipe.ingredients
        );
        const missing = findMissingIngredients(
          ingredientNames,
          recipe.ingredients
        );

        const enriched: Recipe = {
          ...recipe,
          matchPercentage: match,
          missingIngredients: missing,
        };

        enriched.canCookNow = (missing || []).length === 0;
        enriched.personalScore = computePersonalScore(enriched, tasteProfile);

        return enriched;
      });

      const sortedRecipes = enrichedRecipes.sort((a, b) => {
        const aScore = a.personalScore ?? a.matchPercentage;
        const bScore = b.personalScore ?? b.matchPercentage;
        return bScore - aScore;
      });

      setRecipes(sortedRecipes);

      const suggestions = computeAddOnSuggestions(
        sortedRecipes,
        ingredientNames
      );
      setAddOnSuggestions(suggestions);
    } catch (error) {
      console.error("Error finding recipes:", error);
      setError(
        error instanceof Error ? error.message : "Failed to generate recipes"
      );
      setRecipes([]);
      setAddOnSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const goBackToIngredients = () => {
    setCurrentScreen("ingredients");
    setError(null);
  };

  const handleAddOnIngredientClick = (name: string) => {
    addIngredient(name);
    setCurrentScreen("ingredients");
  };

  const cookNowRecipes = recipes.filter((r) => r.canCookNow);
  const almostThereRecipes = recipes.filter(
    (r) => !r.canCookNow && (r.missingIngredients || []).length > 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-yellow-400 to-red-400 relative overflow-hidden text-orange-900">
      <div className="relative z-10 max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-3xl mx-auto px-4 py-8">
        {currentScreen === "ingredients" && (
          <div className="space-y-8">
            <div className="text-center space-y-6">
              <FridgeIcon />
              <div>
                <h1 className="font-poppins font-black text-2xl md:text-4xl lg:text-5xl text-orange-900 mb-4 leading-tight tracking-wide">
                  WHAT&apos;S IN YOUR
                  <br />
                  FRIDGE?
                </h1>
                <p className="font-poppins font-semibold text-orange-800 text-base md:text-lg max-w-md mx-auto leading-relaxed px-4 md:px-0">
                  Add your ingredients or use smart scan, and discover amazing
                  recipes you can make right now!
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowScanModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white bg-opacity-90 border-2 border-orange-300 shadow-md font-poppins font-semibold text-xs md:text-sm text-orange-900 hover:bg-orange-50 transition-all"
                >
                  <span className="text-lg">📷</span>
                  <span>Smart Scan my fridge</span>
                </button>
              </div>
            </div>

            <div className="relative mx-2 sm:mx-4 md:mx-0">
              <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-1 shadow-2xl border-2 sm:border-4 border-orange-300">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={newIngredient}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && addIngredient(newIngredient)
                    }
                    onFocus={() => handleInputChange(newIngredient)}
                    onBlur={() =>
                      setTimeout(() => setShowSuggestions(false), 200)
                    }
                    placeholder="Type an ingredient"
                    className="flex-1 px-2 sm:px-3 md:px-6 py-3 md:py-4 bg-transparent text-orange-900 font-poppins font-medium text-sm sm:text-base md:text-lg placeholder-orange-600 focus:outline-none rounded-l-2xl sm:rounded-l-3xl min-w-0"
                  />
                  <button
                    onClick={() => addIngredient(newIngredient)}
                    className="px-2 sm:px-3 md:px-8 py-3 md:py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl sm:rounded-3xl font-poppins font-bold text-sm sm:text-base md:text-lg shadow-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-1 sm:gap-2 shrink-0"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    <span className="hidden md:inline">Add</span>
                  </button>
                </div>
              </div>

              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-orange-200 z-50">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => selectSuggestion(suggestion)}
                      className="w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors font-poppins font-medium text-orange-900 capitalize first:rounded-t-2xl last:rounded-b-2xl flex items-center gap-2"
                    >
                      <span className="text-lg">
                        {findEmojiForIngredient(suggestion)}
                      </span>
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 max-w-lg md:max-w-2xl mx-auto">
              {INGREDIENT_DATA.map((item, index) => (
                <button
                  key={index}
                  onClick={() => addIngredient(item.name)}
                  className={`bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl md:rounded-3xl p-2 md:p-6 text-center shadow-xl hover:bg-opacity-100 transition-all transform hover:scale-105 active:scale-95 border-2 border-white border-opacity-50 aspect-square flex flex-col items-center justify-center space-y-1 md:space-y-3 ${
                    index === 6
                      ? "md:col-auto col-start-2 col-end-3"
                      : index === 7
                      ? "md:col-auto col-start-3 col-end-4"
                      : ""
                  }`}
                >
                  <div className="flex-1 flex items-center justify-center">
                    <IngredientIllustration type={item.name} />
                  </div>
                  <div className="font-poppins font-semibold text-xs md:text-base text-orange-900 capitalize">
                    {item.name}
                  </div>
                </button>
              ))}
            </div> */}

            {ingredients.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-poppins font-semibold text-xl text-orange-900 text-center">
                  Selected Ingredients
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {ingredients.map((ingredient) => (
                    <div
                      key={ingredient.id}
                      className="bg-white bg-opacity-95 backdrop-blur-sm rounded-full px-5 py-3 shadow-lg flex items-center gap-3 border-2 border-orange-200"
                    >
                      <span className="text-lg">{ingredient.emoji}</span>
                      <span className="font-poppins font-semibold text-orange-900 capitalize">
                        {ingredient.name}
                      </span>
                      <button
                        onClick={() => removeIngredient(ingredient.id)}
                        className="text-orange-600 hover:text-red-600 transition-colors font-poppins font-bold text-lg"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ingredients.length > 0 && (
              <button
                onClick={findRecipes}
                disabled={loading}
                className="w-full py-5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-3xl font-poppins font-bold text-xl shadow-2xl hover:from-red-600 hover:to-orange-600 disabled:opacity-50 transition-all transform hover:scale-105 active:scale-95 border-4 border-red-400"
              >
                {loading ? "Finding Recipes... 🔍" : "Find Recipes"}
              </button>
            )}
          </div>
        )}

        {currentScreen === "recipes" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4">
              <button
                onClick={goBackToIngredients}
                className="p-3 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-lg border-2 border-orange-200 active:scale-95 transition-all"
              >
                <X className="w-6 h-6 text-orange-600" />
              </button>
              <div className="flex-1">
                <h1 className="font-poppins font-black text-2xl lg:text-3xl text-orange-900">
                  🍳 Recipe Ideas
                </h1>
                <p className="font-poppins font-semibold text-orange-800 text-sm lg:text-base">
                  Based on {ingredients.length} ingredients
                </p>
              </div>
            </div>

            {addOnSuggestions.length > 0 && (
              <AddOnSuggestionsBar
                suggestions={addOnSuggestions}
                onAddIngredient={handleAddOnIngredientClick}
              />
            )}

            {loading ? (
              <div className="bg-white bg-opacity-95 backdrop-blur-sm border-2 border-orange-200 rounded-3xl p-8 text-center shadow-2xl">
                <Loader message="Finding recipes... ✨" size="large" />
              </div>
            ) : error ? (
              <div className="bg-white bg-opacity-95 backdrop-blur-sm border-2 border-orange-200 rounded-3xl p-8 text-center shadow-2xl">
                <div className="text-6xl mb-3">👨‍🍳</div>
                <p className="font-poppins font-semibold text-orange-900 text-sm mb-1">
                  {error}
                </p>
                <p className="font-poppins font-medium text-orange-800 text-sm">
                  Try adding more ingredients 😋
                </p>
              </div>
            ) : recipes.length === 0 ? (
              <div className="bg-white bg-opacity-95 backdrop-blur-sm border-2 border-orange-200 rounded-3xl p-8 text-center shadow-2xl">
                <div className="text-6xl mb-3">👨‍🍳</div>
                <p className="font-poppins font-semibold text-orange-900 text-sm mb-1">
                  No recipes found!
                </p>
                <p className="font-poppins font-medium text-orange-800 text-sm">
                  Try adding more ingredients 😋
                </p>
              </div>
            ) : (
              <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border-4 border-orange-200 space-y-6">
                <h2 className="font-poppins font-black text-3xl text-orange-900 text-center">
                  🍳 Recipe Suggestions
                </h2>

                {cookNowRecipes.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-poppins font-semibold text-orange-900 text-sm">
                      ✅ You can cook these right now
                    </h3>
                    <div className="space-y-4">
                      {cookNowRecipes.map((recipe) => (
                        <RecipeCard
                          key={recipe.id}
                          recipe={recipe}
                          copyRecipe={copyRecipe}
                          downloadRecipe={downloadRecipe}
                          saveToLibrary={saveToLibrary}
                          savedRecipeIds={savedRecipeIds}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {almostThereRecipes.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-poppins font-semibold text-orange-900 text-sm">
                      ✨ Almost there – add 1–2 items to unlock these
                    </h3>
                    <div className="space-y-4">
                      {almostThereRecipes.map((recipe) => (
                        <RecipeCard
                          key={recipe.id}
                          recipe={recipe}
                          copyRecipe={copyRecipe}
                          downloadRecipe={downloadRecipe}
                          saveToLibrary={saveToLibrary}
                          savedRecipeIds={savedRecipeIds}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="font-poppins text-sm text-orange-900">
            © 2025 Arghadeep Biswas. Created For NoBroker
          </p>
        </div>
      </div>

      {showScanModal && (
        <ScanModal
          onClose={() => setShowScanModal(false)}
          onApplyPreset={applyScanPreset}
          onScanImage={handleScanImage}
          scanLoading={scanLoading}
          scanError={scanError}
        />
      )}
    </div>
  );
};

export default FridgeApp;
