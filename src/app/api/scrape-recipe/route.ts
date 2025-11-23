/**
 * Recipe URL Scraper API
 * Scrapes recipe data from popular recipe websites using schema.org JSON-LD data
 */

import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface RecipeSchema {
  '@type'?: string;
  name?: string;
  description?: string;
  totalTime?: string;
  prepTime?: string;
  cookTime?: string;
  recipeYield?: string | string[];
  recipeIngredient?: string[];
  recipeInstructions?: Array<{
    '@type': string;
    text?: string;
    name?: string;
  }> | string[];
  image?: string | string[] | { url: string };
}

function extractRecipeFromSchema(schema: any): RecipeSchema | null {
  // Handle array of schema items
  if (Array.isArray(schema)) {
    for (const item of schema) {
      const recipe = extractRecipeFromSchema(item);
      if (recipe) return recipe;
    }
    return null;
  }

  // Check if this is a Recipe type
  if (schema['@type'] === 'Recipe') {
    return schema;
  }

  // Check if @graph exists (common in schema.org markup)
  if (schema['@graph']) {
    return extractRecipeFromSchema(schema['@graph']);
  }

  return null;
}

function parseServings(recipeYield: string | string[] | undefined): number {
  if (!recipeYield) return 4;

  const yieldStr = Array.isArray(recipeYield) ? recipeYield[0] : recipeYield;
  const match = yieldStr.match(/\d+/);
  return match ? parseInt(match[0]) : 4;
}

function parseCookTime(time: string | undefined): string {
  if (!time) return '30 minutes';

  // Parse ISO 8601 duration format (PT1H30M)
  const hoursMatch = time.match(/(\d+)H/);
  const minutesMatch = time.match(/(\d+)M/);

  const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
  const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;

  if (hours > 0 && minutes > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minutes`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `${minutes} minutes`;
  }

  return time;
}

function parseInstructions(instructions: any): string[] {
  if (!instructions) return [];

  // Handle array of instruction objects
  if (Array.isArray(instructions)) {
    return instructions.map((inst) => {
      if (typeof inst === 'string') return inst;
      if (inst.text) return inst.text;
      if (inst.name) return inst.name;
      return '';
    }).filter(Boolean);
  }

  // Handle single string
  if (typeof instructions === 'string') {
    return [instructions];
  }

  return [];
}

function parseImage(image: any): string | undefined {
  if (!image) return undefined;

  if (typeof image === 'string') return image;
  if (Array.isArray(image)) return image[0];
  if (image.url) return image.url;

  return undefined;
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL
    let validUrl: URL;
    try {
      validUrl = new URL(url);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Fetch the webpage
    const response = await fetch(validUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.statusText}` },
        { status: response.status }
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Try to extract recipe from JSON-LD schema
    let recipeData: RecipeSchema | null = null;

    $('script[type="application/ld+json"]').each((_, element) => {
      try {
        const jsonLd = JSON.parse($(element).html() || '{}');
        const extracted = extractRecipeFromSchema(jsonLd);
        if (extracted) {
          recipeData = extracted;
          return false; // break the loop
        }
      } catch (error) {
        // Continue to next script tag
      }
    });

    if (!recipeData) {
      return NextResponse.json(
        {
          error: 'Could not extract recipe data from this URL. The website may not use standard recipe markup.',
        },
        { status: 422 }
      );
    }

    // Parse the recipe data
    const recipe = {
      title: (recipeData as RecipeSchema).name || 'Imported Recipe',
      description: (recipeData as RecipeSchema).description || '',
      cookTime: parseCookTime((recipeData as RecipeSchema).cookTime || (recipeData as RecipeSchema).totalTime),
      servings: parseServings((recipeData as RecipeSchema).recipeYield),
      ingredients: (recipeData as RecipeSchema).recipeIngredient || [],
      instructions: parseInstructions((recipeData as RecipeSchema).recipeInstructions),
      sourceUrl: url,
      imageUrl: parseImage((recipeData as RecipeSchema).image),
    };

    // Validate that we have minimum required data
    if (recipe.ingredients.length === 0 || recipe.instructions.length === 0) {
      return NextResponse.json(
        {
          error: 'Incomplete recipe data. Please ensure the URL contains a complete recipe.',
        },
        { status: 422 }
      );
    }

    return NextResponse.json({ recipe });
  } catch (error) {
    console.error('Recipe scraping error:', error);
    return NextResponse.json(
      {
        error: 'Failed to scrape recipe. Please try a different URL or use manual entry.',
      },
      { status: 500 }
    );
  }
}
