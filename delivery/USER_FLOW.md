# Complete User Flow Documentation
## Cooking Companion App

---

## Overview
This document describes the complete user journey through the Cooking Companion app, from opening the app to deciding what to cook and following a recipe.

---

## User Flow: Opening App → Deciding What to Cook → Following a Recipe

### 1. App Launch & First Impression

**Entry Point:** User opens the Cooking Companion app

**What User Sees:**
- Vibrant gradient navigation bar (orange → red → pink)
- App branding: "🍳 Cooking Companion" with tagline "Your personal kitchen assistant"
- Three main navigation tabs:
  - **Smart Scanner** (default active)
  - **Recipe Library**
  - **Shopping List**
- The app opens on the Smart Scanner screen by default

**User Goal at This Stage:** Understand what the app does and how to start

---

### 2. Smart Ingredient Scan (Feature 1)

#### 2a. Adding Ingredients

**User Action:** User wants to see what they can cook with available ingredients

**Interaction Flow:**
1. User sees the Smart Scanner interface with:
   - Ingredient input field with autocomplete suggestions
   - "Add Ingredient" button
   - Empty ingredient list (on first use)

2. User types an ingredient name (e.g., "chicken")
   - Autocomplete shows common suggestions
   - Each suggestion displays with an emoji icon

3. User clicks "+" or presses Enter to add ingredient
   - Ingredient appears in the "Your Ingredients" section
   - Ingredient displayed with:
     - Emoji icon
     - Name
     - Category badge (e.g., "Protein", "Vegetable", "Grain")
     - Remove (X) button

4. User repeats to add more ingredients (e.g., tomato, rice, garlic)

**Smart Features:**
- Ingredients are grouped by category for easy scanning
- System learns from usage patterns (taste profile)
- Smart add-on suggestions appear showing what additional ingredients would unlock more recipes

#### 2b. Getting Recipe Recommendations

**User Action:** User has added ingredients and wants recipe suggestions

**Interaction Flow:**
1. User clicks "Generate Recipes" button
   - Loading animation appears with cooking-themed message
   - AI analyzes available ingredients

2. System generates 3-5 recipe recommendations
   - Each recipe card shows:
     - Recipe title with flag emoji (country of origin)
     - Brief description
     - Match percentage (how many ingredients user has)
     - Cook time (⏱️)
     - Servings (👥)
     - Missing ingredients highlighted in orange
     - "View Recipe" button
     - "Save to Library" button (bookmark icon)

3. Recipes are sorted by match percentage (best matches first)

#### 2c. Viewing Recipe Details & Saving

**User Action:** User clicks "View Recipe" on an interesting option

**Interaction Flow:**
1. Recipe detail modal opens showing:
   - Full recipe title and description
   - Complete ingredients list (with checkmarks for owned ingredients)
   - Step-by-step instructions
   - Cooking time and servings
   - Action buttons:
     - "Copy Recipe" - Copy to clipboard
     - "Download" - Save as text file
     - "Save to Library" - Bookmark for later

2. User clicks "Save to Library"
   - Success confirmation appears
   - Recipe is added to Recipe Library
   - User can navigate to library via top navigation

**Decision Point:** User decides to cook this recipe now OR save for later

---

### 3. Recipe Library (Feature 2)

#### 3a. Browsing Saved Recipes

**User Action:** User navigates to Recipe Library tab to browse saved recipes

**What User Sees:**
1. Recipe Library header with:
   - Search bar for finding specific recipes
   - Filter button (funnel icon)
   - View toggle (grid/list view)
   - "+ Import Recipe" button

2. Recipe cards in grid layout showing:
   - Recipe thumbnail/title
   - Rating stars (if rated)
   - Cook time, servings
   - Heart icon (favorite toggle)
   - Collection tags
   - "Times Cooked" counter
   - 3-dot menu (⋮) with options:
     - Add to Collection
     - Add to Shopping List
     - Edit
     - Share
     - Delete

#### 3b. Organizing & Filtering

**User Action:** User wants to organize recipes into collections

**Interaction Flow:**
1. User clicks collection filter dropdown
   - Shows: All Recipes, Favorites, Quick Meals, Dinners, etc.
   - "+ New Collection" option

2. User can create custom collections (e.g., "Weeknight Dinners", "Meal Prep")

3. Filter panel shows:
   - Sort options (Recent, Alphabetical, Rating, Cook Time, Times Cooked)
   - Favorites toggle
   - Collection selector

#### 3c. Searching Recipes

**User Action:** User types in search bar (e.g., "pasta")

**Interaction Flow:**
- Live search filters recipes by:
  - Recipe title
  - Ingredients
  - Description
  - Tags/collections
- Results update in real-time

#### 3d. Selecting Recipe to Cook

**User Action:** User finds a recipe they want to cook today

**Interaction Flow:**
1. User clicks on recipe card
   - Opens detailed recipe view
   - Shows full information:
     - Ingredients list
     - Step-by-step instructions
     - Cooking notes
     - Previous cooking feedback (if cooked before)

2. Action buttons available:
   - "Start Cooking" (enters Cooking Mode)
   - "Add to Shopping List" (for missing ingredients)
   - Heart icon (favorite toggle)
   - Share, Edit, Delete

**Decision Point:** User has everything needed OR needs to shop first

---

### 4. Shopping List Integration (Feature 3 - Wireframe)

#### 4a. Adding Missing Ingredients

**User Action:** User needs to buy some ingredients before cooking

**Interaction Flow:**
1. From recipe detail view, user clicks "Add to Shopping List"
   - Missing ingredients automatically added to shopping list
   - Confirmation message appears

2. User navigates to Shopping List tab
   - Sees grouped shopping items
   - Each item shows:
     - Checkbox (checked/unchecked)
     - Ingredient name
     - Quantity (if specified)
     - Notes
     - Recipe source (what recipe needs it)

3. Shopping list actions:
   - Check off items as purchased
   - Add custom items
   - Edit quantities/notes
   - Clear checked items
   - Share list (export as text)

#### 4b. Shopping & Returning

**User Action:** User goes shopping and returns with ingredients

**Interaction Flow:**
1. User checks off items as they shop
2. Items marked complete move to "Checked Items" section
3. After shopping, user can clear checked items
4. Returns to Recipe Library to start cooking

---

### 5. Cooking Mode with Timers (Feature 4 - Wireframe)

#### 5a. Starting Cooking Mode

**User Action:** User is ready to cook and clicks "Start Cooking"

**Interaction Flow:**
1. App enters full-screen Cooking Mode
   - Large, easy-to-read interface
   - Shows current step prominently
   - Step progress indicator (Step 1 of 8)

2. Screen layout:
   - **Top:** Recipe title, close button
   - **Middle:** Current step instruction in large text
   - **Bottom:** Navigation and controls

#### 5b. Following Step-by-Step Instructions

**User Action:** User reads current step and performs action

**Interaction Flow:**
1. Current step displayed with:
   - Step number
   - Clear instruction text
   - Timer button (if step involves waiting/cooking)
   - Checkbox to mark complete

2. Navigation options:
   - "← Previous" button
   - "Next →" button
   - "Mark Complete" button
   - Step indicator dots (tap to jump to any step)

3. User can:
   - Mark step complete (auto-advances to next)
   - Navigate back to review previous steps
   - Jump to specific steps via progress dots
   - Use keyboard arrows for navigation

#### 5c. Using Integrated Timers

**User Action:** Step says "Simmer for 15 minutes"

**Interaction Flow:**
1. System detects time reference in instruction
   - Shows timer button with suggested duration (15 min)

2. User clicks timer button
   - Timer modal appears
   - Shows countdown in large display
   - Options to pause, reset, or add/subtract time

3. Multiple timers can run simultaneously
   - Each labeled with step description
   - Mini timer displays show active timers
   - Notifications when timer completes

4. Timer completion:
   - Alert sound/notification
   - Visual indication (flashing or color change)
   - User clicks "Done" to dismiss

#### 5d. Completing Recipe & Feedback

**User Action:** User completes all steps

**Interaction Flow:**
1. After last step marked complete:
   - Congratulations message appears
   - "Mark as Cooked" button
   - Rating prompt (1-5 stars)
   - Feedback form (optional):
     - "How did it turn out?"
     - "Any modifications you made?"
     - "Would you make this again?"

2. User submits feedback
   - Recipe marked as cooked
   - Cook count increments
   - Rating saved
   - Returns to Recipe Library

3. Recipe card now shows:
   - "Last cooked: Today"
   - Updated rating
   - Cooking notes from feedback

---

## Key User Journey Insights

### Happy Path (Complete Flow)
1. **Open app** → Land on Smart Scanner
2. **Add ingredients** → See personalized suggestions
3. **Generate recipes** → Get AI-powered matches
4. **Save favorite recipe** → Add to library
5. **Check missing ingredients** → Add to shopping list
6. **Go shopping** → Check off items
7. **Return home** → Open saved recipe
8. **Start cooking mode** → Follow step-by-step
9. **Use timers** → Never overcook
10. **Complete & rate** → Build personal recipe collection

### Alternative Paths

**Path A: Direct to Library**
- User opens app → Goes directly to Recipe Library → Browses saved recipes → Starts cooking

**Path B: Import Existing Recipe**
- User has recipe from website/friend → Clicks "Import Recipe" → Pastes URL or enters manually → Saves to library

**Path C: Browse First, Shop Later**
- User browses recipes → Finds interesting one → Adds ingredients to shopping list → Shops later → Cooks when ready

---

## User Goals Achieved

✅ **Discover what to cook** - Smart Scanner suggests recipes based on available ingredients
✅ **Reduce food waste** - Use what's already in the fridge
✅ **Organize recipes** - Save, categorize, and search personal collection
✅ **Plan shopping** - Automatically generate shopping lists from recipes
✅ **Cook confidently** - Step-by-step guidance with built-in timers
✅ **Build cooking skills** - Track what works, rate recipes, improve over time

---

## Technical Flow Highlights

- **Persistent Storage:** All data saved to localStorage (recipes, collections, shopping list, taste profile)
- **Smart Learning:** System tracks ingredient usage to improve future recommendations
- **Offline Capable:** Core features work without internet (saved recipes, timers, shopping list)
- **AI Enhancement:** OpenAI integration for intelligent recipe generation
- **Cross-Feature Integration:** Seamless flow between scanning, library, shopping, and cooking modes

---

*This user flow represents the complete journey through all four features of the Cooking Companion app, designed to make home cooking easier, more organized, and more enjoyable.*
