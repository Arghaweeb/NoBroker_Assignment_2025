# Hi-Fidelity UI Screens
## Feature 1: Smart Ingredient Scan & Feature 2: Recipe Library

---

## Implementation Note
These features are **fully implemented** in the codebase. The following documentation describes the actual UI screens with detailed component breakdowns, styling, and interactions as implemented in the live application.

---

## Feature 1: Smart Ingredient Scan

### Screen 1.1: Initial Smart Scanner View

**Purpose:** Landing screen where users add ingredients and generate recipe recommendations

**Visual Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  🍳 Cooking Companion                    [Scanner] [Library] │
│      Your personal kitchen assistant        [Shopping]       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   🔍 What's in Your Fridge?                          │   │
│  │                                                       │   │
│  │   Smart Ingredient Scanner                           │   │
│  │   Add ingredients to discover personalized recipes   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Type an ingredient...              [+ Add]         │    │
│  │  ↓ Autocomplete suggestions:                        │    │
│  │  • 🥚 egg        • 🍅 tomato      • 🧀 cheese       │    │
│  │  • 🍗 chicken    • 🧅 onion       • 🧄 garlic       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  Your Ingredients (0)                                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                                                       │    │
│  │         Add ingredients to get started! 🎯           │    │
│  │                                                       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│              [🎲 Generate Recipes]                           │
│                  (disabled - add ingredients first)          │
└─────────────────────────────────────────────────────────────┘
```

**UI Components:**

1. **Navigation Bar** (Sticky Top)
   - Gradient: `orange-500 → red-500 → pink-500`
   - Border: 4px bottom border (`orange-600`)
   - Shadow: Extra large (`shadow-xl`)
   - Elements:
     - Logo: 🍳 emoji (text-3xl)
     - Brand: "Cooking Companion" (text-xl, font-bold, white)
     - Tagline: "Your personal kitchen assistant" (text-xs, orange-100)
     - Navigation Pills:
       - Active: White background, orange-600 text, shadow-lg
       - Inactive: White/20 opacity, white text, backdrop-blur
   - Mobile: Hamburger menu (responsive)

2. **Hero Section**
   - Title: "🔍 What's in Your Fridge?"
   - Subtitle: Explains the feature purpose
   - Background: Subtle gradient or card

3. **Ingredient Input**
   - Text input field with placeholder: "Type an ingredient..."
   - Autocomplete dropdown shows:
     - Common ingredients
     - Emoji icons for each
     - Category indicators
   - Add button: "+" icon, orange accent

4. **Ingredient Display Area**
   - Empty state: Encouraging message with emoji
   - Will show ingredient chips once added

5. **Generate Button**
   - Large, prominent button
   - Gradient background matching nav
   - Disabled state when no ingredients

---

### Screen 1.2: With Added Ingredients

**Purpose:** Shows ingredients organized by category after user adds them

**Visual Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  🍳 Cooking Companion                    [Scanner] [Library] │
│      Your personal kitchen assistant        [Shopping]       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Type an ingredient...              [+ Add]         │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  Your Ingredients (5)                    [Clear All]         │
│                                                               │
│  🍖 Protein                                                  │
│  ┌─────────────┐  ┌─────────────┐                           │
│  │ 🥚 Egg    X │  │ 🍗 Chicken X│                           │
│  └─────────────┘  └─────────────┘                           │
│                                                               │
│  🥬 Vegetable                                                │
│  ┌─────────────┐  ┌─────────────┐                           │
│  │ 🍅 Tomato X │  │ 🧄 Garlic  X│                           │
│  └─────────────┘  └─────────────┘                           │
│                                                               │
│  🌾 Grain                                                    │
│  ┌─────────────┐                                             │
│  │ 🍚 Rice   X │                                             │
│  └─────────────┘                                             │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 💡 Smart Add-ons                                   │     │
│  │                                                     │     │
│  │ Adding these could unlock more recipes:            │     │
│  │ • Onion (+3 recipes)         [+ Add]              │     │
│  │ • Soy Sauce (+2 recipes)     [+ Add]              │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│              [🎲 Generate Recipes]                           │
│                  (active - glowing gradient)                 │
└─────────────────────────────────────────────────────────────┘
```

**UI Components:**

1. **Ingredient Chips** (By Category)
   - Grouped under category headers
   - Each chip:
     - Emoji icon (large)
     - Ingredient name (capitalized)
     - X button (hover shows red)
     - Border radius: rounded-xl
     - Padding: px-4 py-3
     - Background: white with shadow
     - Hover: lift effect (transform scale)

2. **Category Headers**
   - Emoji + Name (e.g., "🍖 Protein")
   - Bold, larger text
   - Spacing between categories

3. **Smart Add-ons Section**
   - Background: Light gradient (blue/purple tint)
   - Icon: 💡 (lightbulb)
   - Title: "Smart Add-ons"
   - Suggestions list:
     - Ingredient name
     - Unlocked recipes count
     - Quick add button
   - Border: 2px dashed border
   - Purpose: AI-powered suggestion engine

4. **Generate Button** (Active State)
   - Glowing gradient animation
   - Large click target
   - Hover: scale up slightly
   - Shadow: Large, colorful

---

### Screen 1.3: Loading State

**Purpose:** Shown while AI generates recipe recommendations

**Visual Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  🍳 Cooking Companion                    [Scanner] [Library] │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Your Ingredients (5)                                        │
│  [Ingredient chips shown but dimmed...]                      │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │                                                     │     │
│  │               🍳 [Spinning Animation]               │     │
│  │                                                     │     │
│  │         Cooking up recipe suggestions...            │     │
│  │                                                     │     │
│  │         AI is analyzing your ingredients            │     │
│  │                                                     │     │
│  │            [Progress Dots: ● ● ●]                  │     │
│  │                                                     │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**UI Components:**

1. **Loader Component**
   - Custom animated cooking icon (rotating fridge or spinning pot)
   - Loading text: Dynamic messages
     - "Cooking up recipe suggestions..."
     - "AI is analyzing your ingredients"
     - "Finding perfect matches..."
   - Animated progress dots
   - Semi-transparent overlay
   - Center of screen, modal-like

---

### Screen 1.4: Recipe Results

**Purpose:** Display AI-generated recipe recommendations

**Visual Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  🍳 Cooking Companion                    [Scanner] [Library] │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Your Ingredients (5)            [Edit Ingredients]          │
│  🥚 Egg • 🍗 Chicken • 🍅 Tomato • 🧄 Garlic • 🍚 Rice      │
│                                                               │
│  ════════════════════════════════════════════════════════   │
│                                                               │
│  📖 Recipe Suggestions for You (3 recipes)                   │
│                                                               │
│  ┌────────────────────────────────────────────────┐         │
│  │ 🇨🇳 Chinese Fried Rice                         │         │
│  │                                         [💾 Save]│         │
│  │ A quick and delicious fried rice with          │         │
│  │ vegetables and scrambled eggs                   │         │
│  │                                                  │         │
│  │ ⏱️ 20 mins    👥 2 servings    ✅ 100% Match   │         │
│  │                                                  │         │
│  │ ✓ All ingredients available!                    │         │
│  │                                                  │         │
│  │                    [📄 View Recipe]              │         │
│  └────────────────────────────────────────────────┘         │
│                                                               │
│  ┌────────────────────────────────────────────────┐         │
│  │ 🇮🇹 Tomato & Garlic Chicken                    │         │
│  │                                         [💾 Save]│         │
│  │ Juicy chicken breast with fresh tomato sauce    │         │
│  │                                                  │         │
│  │ ⏱️ 35 mins    👥 3 servings    ✅ 90% Match    │         │
│  │                                                  │         │
│  │ Missing: Olive oil, Basil                        │         │
│  │                                                  │         │
│  │                    [📄 View Recipe]              │         │
│  └────────────────────────────────────────────────┘         │
│                                                               │
│  ┌────────────────────────────────────────────────┐         │
│  │ 🇯🇵 Chicken Teriyaki Rice Bowl                │         │
│  │                                         [💾 Save]│         │
│  │ Sweet and savory teriyaki with steamed rice      │         │
│  │                                                  │         │
│  │ ⏱️ 25 mins    👥 2 servings    ✅ 80% Match    │         │
│  │                                                  │         │
│  │ Missing: Soy sauce, Mirin, Ginger                │         │
│  │                                                  │         │
│  │                    [📄 View Recipe]              │         │
│  └────────────────────────────────────────────────┘         │
│                                                               │
│              [🔄 Generate New Suggestions]                   │
└─────────────────────────────────────────────────────────────┘
```

**UI Components:**

1. **Collapsed Ingredient Display**
   - Horizontal chip list
   - Compact view
   - "Edit Ingredients" button to expand

2. **Results Header**
   - "📖 Recipe Suggestions for You"
   - Count of results

3. **Recipe Cards**
   - White background with shadow
   - Border-radius: rounded-2xl
   - Hover: Lift effect (shadow increases)
   - Each card contains:

   **a. Header Section:**
   - Country flag emoji + Recipe title (large, bold)
   - Save bookmark button (top-right)

   **b. Description:**
   - 1-2 sentence overview
   - Smaller, gray text

   **c. Metadata Row:**
   - Clock icon + Cook time
   - Users icon + Servings
   - Percentage match (with color coding):
     - 100% = Green
     - 80-99% = Blue
     - <80% = Orange

   **d. Ingredient Status:**
   - If 100%: "✓ All ingredients available!" (green)
   - If <100%: "Missing: [list]" (orange text)

   **e. Action Button:**
   - "View Recipe" - primary button
   - Full width, gradient background

4. **Generate New Button**
   - Secondary action
   - Allows re-rolling suggestions

---

### Screen 1.5: Recipe Detail Modal

**Purpose:** Show complete recipe information when user clicks "View Recipe"

**Visual Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                          [X] │
│  🇨🇳 Chinese Fried Rice                                     │
│                                                               │
│  A quick and delicious fried rice with vegetables and        │
│  scrambled eggs - perfect for using up leftover rice!        │
│                                                               │
│  ⏱️ Cook Time: 20 minutes    👥 Servings: 2                │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 🥘 Ingredients                                      │     │
│  │                                                      │     │
│  │ ✅ 2 eggs, beaten            [You have]             │     │
│  │ ✅ 2 cups cooked rice        [You have]             │     │
│  │ ✅ 1 tomato, diced           [You have]             │     │
│  │ ✅ 2 cloves garlic, minced   [You have]             │     │
│  │ ✅ 1 chicken breast, diced   [You have]             │     │
│  │ ○ 2 tbsp soy sauce           [Missing]              │     │
│  │ ○ 1 tbsp vegetable oil       [Missing]              │     │
│  │ ○ Green onions (optional)    [Missing]              │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 👨‍🍳 Instructions                                     │     │
│  │                                                      │     │
│  │ 1. Heat oil in a large wok or pan over high heat    │     │
│  │                                                      │     │
│  │ 2. Add beaten eggs and scramble until just set,     │     │
│  │    then remove from pan                              │     │
│  │                                                      │     │
│  │ 3. Add chicken to the pan and cook until golden,    │     │
│  │    about 5-7 minutes                                 │     │
│  │                                                      │     │
│  │ 4. Add garlic and cook for 30 seconds until         │     │
│  │    fragrant                                          │     │
│  │                                                      │     │
│  │ 5. Add rice and tomato, breaking up any clumps.     │     │
│  │    Stir-fry for 3-4 minutes                          │     │
│  │                                                      │     │
│  │ 6. Add soy sauce and return eggs to pan. Toss       │     │
│  │    everything together for 1-2 minutes               │     │
│  │                                                      │     │
│  │ 7. Garnish with green onions and serve hot!         │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌─────────────┐ ┌──────────────┐ ┌─────────────────┐      │
│  │ 📋 Copy     │ │ 💾 Download  │ │ ⭐ Save to      │      │
│  │   Recipe    │ │              │ │   Library       │      │
│  └─────────────┘ └──────────────┘ └─────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

**UI Components:**

1. **Modal Overlay**
   - Semi-transparent background
   - Click outside to close
   - Centered modal box

2. **Modal Header**
   - Close button (X) top-right
   - Flag + Title (large, bold)
   - Description paragraph
   - Metadata icons

3. **Ingredients Section**
   - Boxed area with header "🥘 Ingredients"
   - Two-column layout possible
   - Each ingredient row:
     - Checkmark icon (✅ if owned, ○ if missing)
     - Ingredient text with quantity
     - Badge: "You have" (green) or "Missing" (orange)

4. **Instructions Section**
   - Boxed area with header "👨‍🍳 Instructions"
   - Numbered steps
   - Clear spacing between steps
   - Readable font size

5. **Action Buttons**
   - Three buttons in a row:
     - **Copy Recipe:** Copies text to clipboard
     - **Download:** Saves as .txt file
     - **Save to Library:** Adds to Recipe Library (with bookmark animation)
   - Icons + text labels
   - Equal width buttons

---

## Feature 2: Recipe Library

### Screen 2.1: Recipe Library Overview (Grid View)

**Purpose:** Browse and manage saved recipes

**Visual Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  🍳 Cooking Companion        [Scanner] [Library] [Shopping] │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 🔍 Search recipes...                                 │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  [🎯 All Recipes ▼] [⚡ Sort: Recent ▼] [🎨 Grid] [+ Import]│
│  [⭐ Favorites Only] [ ] Show Filters                        │
│                                                               │
│  ════════════════════════════════════════════════════════   │
│                                                               │
│  📚 My Recipe Library (12 recipes)                           │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │┌────────────┐│  │┌────────────┐│  │┌────────────┐│      │
│  ││ [Image]    ││  ││ [Image]    ││  ││ [Image]    ││      │
│  ││  Recipe    ││  ││  Recipe    ││  ││  Recipe    ││      │
│  │└────────────┘│  │└────────────┘│  │└────────────┘│      │
│  │              │  │              │  │              │      │
│  │🇨🇳 Chinese    │  │🇮🇹 Spaghetti │  │🇲🇽 Tacos     │      │
│  │Fried Rice   ❤│  │Carbonara    ❤│  │al Pastor   ♡│      │
│  │⭐⭐⭐⭐⭐      │  │⭐⭐⭐⭐☆      │  │⭐⭐⭐⭐⭐      │      │
│  │              │  │              │  │              │      │
│  │⏱️ 20m  👥 2  │  │⏱️ 30m  👥 4  │  │⏱️ 45m  👥 6  │      │
│  │              │  │              │  │              │      │
│  │🏷️ Quick Meals│  │🏷️ Dinner     │  │🏷️ Weekend   │      │
│  │Cooked 5×     │  │Cooked 3×     │  │Cooked 1×     │      │
│  │              │  │              │  │              │      │
│  │        [⋮]   │  │        [⋮]   │  │        [⋮]   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │[More cards...]│  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**UI Components:**

1. **Search Bar**
   - Large, prominent input field
   - Magnifying glass icon
   - Placeholder: "Search recipes..."
   - Live search (filters as you type)

2. **Filter/Control Bar**
   - Collection dropdown: "All Recipes", "Favorites", custom collections
   - Sort dropdown: Recent, Alphabetical, Rating, Cook Time, Times Cooked
   - View toggle: Grid/List icons
   - "+ Import Recipe" button (primary action)
   - "Favorites Only" toggle (filled heart when active)
   - "Show Filters" expandable panel

3. **Library Header**
   - "📚 My Recipe Library"
   - Count: "(12 recipes)"

4. **Recipe Cards (Grid Layout)**
   - 3 columns on desktop, responsive on mobile
   - Each card:

   **a. Recipe Image/Placeholder**
   - Top section with visual
   - Gradient overlay if no image

   **b. Header**
   - Flag emoji + Recipe name
   - Heart icon (filled red if favorited, outline if not)

   **c. Rating**
   - Star icons (1-5 stars)
   - Shows user's rating if rated

   **d. Metadata**
   - Clock icon + time
   - Users icon + servings

   **e. Tags**
   - Collection badges (rounded pills)
   - Color-coded

   **f. Stats**
   - "Cooked 5×" counter
   - Last cooked date (if applicable)

   **g. Menu Button**
   - Three-dot icon (⋮) bottom-right
   - Dropdown menu on click

5. **Card Hover Effects**
   - Lift animation
   - Shadow increases
   - Border glow

---

### Screen 2.2: Recipe Library with Filters Expanded

**Purpose:** Advanced filtering options

**Visual Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  🍳 Cooking Companion        [Scanner] [Library] [Shopping] │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  [Search bar...]                                             │
│  [Controls...]                              [✓ Show Filters] │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 🎯 Filters                               [Clear]   │     │
│  │                                                     │     │
│  │ Collections:                                        │     │
│  │ [ ] All Recipes (12)                                │     │
│  │ [✓] Favorites (4)                                   │     │
│  │ [ ] Quick Meals (6)                                 │     │
│  │ [ ] Dinners (5)                                     │     │
│  │ [ ] Weekend Cooking (3)                             │     │
│  │ [+ New Collection]                                  │     │
│  │                                                     │     │
│  │ Cook Time:                                          │     │
│  │ [ ] Under 20 min  [ ] 20-40 min  [ ] 40+ min       │     │
│  │                                                     │     │
│  │ Rating:                                             │     │
│  │ [⭐⭐⭐⭐⭐] and up                                   │     │
│  │                                                     │     │
│  │ Status:                                             │     │
│  │ [ ] Cooked before  [ ] Never cooked                │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  Showing 4 recipes                                           │
│  [Recipe cards filtered...]                                  │
└─────────────────────────────────────────────────────────────┘
```

**UI Components:**

1. **Filter Panel**
   - Collapsible section
   - Header: "🎯 Filters" with Clear button
   - Organized sections:

   **a. Collections Filter**
   - Checkbox list of all collections
   - Count next to each
   - "+ New Collection" quick action

   **b. Cook Time Filter**
   - Time range checkboxes
   - Predefined ranges

   **c. Rating Filter**
   - Star selector (minimum rating)

   **d. Status Filter**
   - Cooked before / Never cooked

2. **Results Count**
   - "Showing X recipes" based on filters
   - Updates in real-time

---

### Screen 2.3: Recipe Card Menu (3-dot dropdown)

**Purpose:** Quick actions on a recipe

**Visual Layout:**
```
  ┌──────────────┐
  │Recipe Card   │
  │              │
  │        [⋮] ←─┼───┐
  └──────────────┘   │
                     ▼
         ┌─────────────────────────┐
         │ ⭐ Add to Collection     │
         │ 🛒 Add to Shopping List │
         │ ✏️ Edit Recipe          │
         │ 🔗 Share                │
         │ 📋 Duplicate            │
         │ ────────────────        │
         │ 🗑️ Delete               │
         └─────────────────────────┘
```

**UI Components:**

1. **Dropdown Menu**
   - Appears on card click
   - White background, shadow
   - Rounded corners
   - Each menu item:
     - Icon + Label
     - Hover: background color change
     - Delete option in red at bottom

---

### Screen 2.4: Recipe Detail View (From Library)

**Purpose:** View full recipe details with cooking options

**Visual Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ [← Back to Library]                                     [X] │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │ [Recipe Banner Image / Gradient]                   │     │
│  │                                                      │     │
│  │ 🇨🇳 Chinese Fried Rice                      ♥ ⭐ ⋮ │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  ⭐⭐⭐⭐⭐ (Your Rating)    Last cooked: 2 days ago         │
│  ⏱️ 20 minutes    👥 2 servings    Cooked 5 times          │
│                                                               │
│  🏷️ Collections: Quick Meals, Favorites                     │
│                                                               │
│  ════════════════════════════════════════════════════════   │
│                                                               │
│  A quick and delicious fried rice with vegetables and        │
│  scrambled eggs - perfect for using up leftover rice!        │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 🥘 Ingredients (8 items)                            │     │
│  │                                                      │     │
│  │ □ 2 eggs, beaten                                    │     │
│  │ □ 2 cups cooked rice                                │     │
│  │ □ 1 tomato, diced                                   │     │
│  │ [... more ingredients ...]                          │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 👨‍🍳 Instructions (7 steps)                          │     │
│  │                                                      │     │
│  │ 1. Heat oil in a large wok or pan over high heat    │     │
│  │ 2. Add beaten eggs and scramble until just set...   │     │
│  │ [... more steps ...]                                │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 💭 My Cooking Notes                                 │     │
│  │                                                      │     │
│  │ "Used brown rice instead - worked great! Added      │     │
│  │  extra garlic because we love it."                  │     │
│  │                                          - 2 days ago│     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌──────────────────┐  ┌───────────────────┐               │
│  │ 🍳 Start Cooking  │  │ 🛒 Add Missing to │               │
│  │                   │  │   Shopping List   │               │
│  └──────────────────┘  └───────────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

**UI Components:**

1. **Navigation**
   - Back button: "← Back to Library"
   - Close button (X) if modal

2. **Hero Section**
   - Banner image or gradient background
   - Recipe title with flag
   - Quick actions: Heart (favorite), Star (rate), Menu (⋮)

3. **Metadata Bar**
   - User rating (editable stars)
   - Last cooked date
   - Cook time, servings
   - Times cooked counter

4. **Collection Tags**
   - Shows which collections recipe is in
   - Clickable to filter by collection

5. **Description**
   - Recipe overview paragraph

6. **Ingredients Section**
   - Boxed with header
   - Checkbox list (can mark off while cooking)
   - Item count in header

7. **Instructions Section**
   - Boxed with header
   - Numbered steps
   - Step count in header

8. **Cooking Notes**
   - User's previous feedback/notes
   - Timestamp
   - Editable

9. **Primary Actions**
   - **Start Cooking** button:
     - Large, prominent
     - Gradient background
     - Launches Cooking Mode
   - **Add Missing to Shopping List**:
     - Secondary button
     - Analyzes ingredients, adds to list

---

### Screen 2.5: Import Recipe Modal

**Purpose:** Add recipes from external sources or manually

**Visual Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  Import Recipe                                          [X] │
│                                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   From URL  │  │   Manual    │  │   Paste     │         │
│  │   (Active)  │  │   Entry     │  │   Text      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 🔗 Recipe URL                                       │     │
│  │ https://example.com/recipe/pasta-carbonara          │     │
│  │                                                      │     │
│  │                           [🔍 Fetch Recipe]         │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  Or manually enter recipe details:                           │
│                                                               │
│  Recipe Name: ________________________________               │
│  Description: ________________________________               │
│  Cook Time: ______  Servings: ______                        │
│                                                               │
│  Ingredients (one per line):                                 │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 2 eggs                                              │     │
│  │ 1 cup rice                                          │     │
│  │                                                      │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  Instructions (one per line):                                │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 1. Cook rice                                        │     │
│  │ 2. Scramble eggs                                    │     │
│  │                                                      │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  Add to Collection: [Dropdown]                               │
│                                                               │
│              [Cancel]  [💾 Save Recipe]                      │
└─────────────────────────────────────────────────────────────┘
```

**UI Components:**

1. **Tab Navigation**
   - Three import methods:
     - From URL (scrape recipe from web)
     - Manual Entry (fill form)
     - Paste Text (AI parse)

2. **URL Import Tab**
   - URL input field
   - "Fetch Recipe" button
   - AI extracts recipe data

3. **Manual Entry Form**
   - Text inputs for metadata
   - Text areas for ingredients and instructions
   - Collection selector dropdown

4. **Action Buttons**
   - Cancel (secondary)
   - Save Recipe (primary)

---

### Screen 2.6: Collection Manager

**Purpose:** Organize recipes into custom collections

**Visual Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  Manage Collections                                     [X] │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │ Create New Collection                               │     │
│  │                                                      │     │
│  │ Name: ___________________  [+ Create]               │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  Your Collections:                                           │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 📁 Quick Meals (6 recipes)           [Edit] [🗑️]   │     │
│  │ Recipes you can make in under 30 minutes            │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 📁 Dinners (5 recipes)               [Edit] [🗑️]   │     │
│  │ Hearty evening meals for the family                 │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 📁 Weekend Cooking (3 recipes)       [Edit] [🗑️]   │     │
│  │ Special recipes for when you have more time         │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 📁 Meal Prep (8 recipes)             [Edit] [🗑️]   │     │
│  │ Batch cooking for the week ahead                    │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│                                          [Done]              │
└─────────────────────────────────────────────────────────────┘
```

**UI Components:**

1. **Create Collection Section**
   - Text input for collection name
   - Create button (adds new collection)

2. **Collections List**
   - Each collection card shows:
     - Folder emoji + name
     - Recipe count
     - Optional description
     - Edit button (rename/change description)
     - Delete button (trash icon)

3. **Collection Actions**
   - Edit: Opens inline editor
   - Delete: Confirmation prompt

---

## Design System Details

### Color Palette

**Primary Gradient:**
- Orange: `#F97316` (orange-500)
- Red: `#EF4444` (red-500)
- Pink: `#EC4899` (pink-500)

**Accent Colors:**
- Green (success): `#10B981` (green-500)
- Blue (info): `#3B82F6` (blue-500)
- Orange (warning): `#F59E0B` (orange-500)
- Red (error/delete): `#EF4444` (red-500)

**Neutral Colors:**
- White: `#FFFFFF`
- Light gray: `#F3F4F6` (gray-100)
- Medium gray: `#9CA3AF` (gray-400)
- Dark gray: `#1F2937` (gray-800)

### Typography

**Font Family:**
- Primary: System fonts (sans-serif)
- Headings: Font-serif for branding

**Font Sizes:**
- Extra large (titles): `text-3xl` (30px)
- Large (headings): `text-xl` (20px)
- Medium (body): `text-base` (16px)
- Small (metadata): `text-sm` (14px)
- Extra small (labels): `text-xs` (12px)

**Font Weights:**
- Bold: `font-bold` (700)
- Semi-bold: `font-semibold` (600)
- Normal: `font-normal` (400)

### Spacing

- Component padding: `px-4 py-3` (16px horizontal, 12px vertical)
- Section margins: `mb-6` (24px)
- Card padding: `p-6` (24px)

### Border Radius

- Small: `rounded-lg` (8px)
- Medium: `rounded-xl` (12px)
- Large: `rounded-2xl` (16px)
- Full (pills): `rounded-full`

### Shadows

- Small: `shadow-sm`
- Medium: `shadow-md`
- Large: `shadow-lg`
- Extra large: `shadow-xl`

### Animations

**Hover Effects:**
- Scale: `hover:scale-105`
- Shadow increase: `hover:shadow-xl`
- Color transitions: `transition-all duration-200`

**Loading:**
- Spin animation for loader
- Pulse animation for skeleton states
- Fade-in for content appearance

---

## Responsive Design

### Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Mobile Adaptations

1. **Navigation:**
   - Hamburger menu instead of pills
   - Full-width dropdown

2. **Recipe Cards:**
   - Single column on mobile
   - Two columns on tablet
   - Three columns on desktop

3. **Filters:**
   - Collapsible by default on mobile
   - Expanded on desktop

4. **Modals:**
   - Full-screen on mobile
   - Centered overlay on desktop

---

## Accessibility Features

1. **Keyboard Navigation:**
   - Tab through all interactive elements
   - Enter/Space to activate buttons
   - Arrow keys in Cooking Mode

2. **Screen Reader Support:**
   - ARIA labels on icons
   - Semantic HTML (nav, main, section)
   - Alt text for images

3. **Color Contrast:**
   - WCAG AA compliance
   - High contrast for text on backgrounds

4. **Focus States:**
   - Visible focus rings
   - Skip to main content link

---

*These hi-fidelity UI screens represent the fully implemented Smart Ingredient Scan and Recipe Library features. All components are production-ready with complete styling, interactions, and responsive behavior.*
