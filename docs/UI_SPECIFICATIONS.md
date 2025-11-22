# Hi-Fidelity UI Specifications

## Overview
This document provides detailed specifications for the **Ingredient Scanner** and **Recipe Library** features, which are delivered as hi-fidelity implemented screens.

---

## Design System

### Color Palette

#### Primary Colors
```css
/* Warm Gradient - Used for headers and primary actions */
--gradient-primary: linear-gradient(to right, #f97316, #ef4444, #ec4899);
--orange-500: #f97316;
--red-500: #ef4444;
--pink-500: #ec4899;
--orange-600: #ea580c; /* Border accents */

/* Neutral Colors */
--white: #ffffff;
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-600: #4b5563;
--gray-800: #1f2937;
--gray-900: #111827;

/* Semantic Colors */
--success-green: #10b981;
--warning-yellow: #f59e0b;
--error-red: #ef4444;
--info-blue: #3b82f6;
```

#### Color Usage
- **Headers/Navigation**: Warm gradient (orange → red → pink)
- **Primary Buttons**: Orange-500 with white text
- **Secondary Buttons**: White with orange text
- **Cards**: White background with subtle shadow
- **Text**: Gray-900 for primary, Gray-600 for secondary
- **Borders**: Orange-600 for emphasis, Gray-200 for subtle divisions

### Typography

#### Font Families
```css
--font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-serif: Georgia, 'Times New Roman', serif;
```

#### Type Scale
```css
/* Headings */
--text-4xl: 36px / 40px; /* Page titles */
--text-3xl: 30px / 36px; /* Section headers */
--text-2xl: 24px / 32px; /* Card titles */
--text-xl: 20px / 28px;  /* Subheadings */
--text-lg: 18px / 28px;  /* Large body */

/* Body */
--text-base: 16px / 24px; /* Body text */
--text-sm: 14px / 20px;   /* Small text */
--text-xs: 12px / 16px;   /* Captions */
```

#### Font Weights
- **Bold (700)**: Headings, buttons, emphasis
- **Semibold (600)**: Subheadings, labels
- **Medium (500)**: Navigation items
- **Regular (400)**: Body text
- **Light (300)**: Subtle text

### Spacing System
```css
/* Using 4px base unit */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
```

### Border Radius
```css
--radius-sm: 4px;   /* Small elements */
--radius-md: 8px;   /* Cards, buttons */
--radius-lg: 12px;  /* Large cards */
--radius-xl: 16px;  /* Modals */
--radius-full: 9999px; /* Pills, circles */
```

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px rgba(0,0,0,0.07);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
--shadow-xl: 0 20px 25px rgba(0,0,0,0.1);
```

---

## Feature 1: Smart Ingredient Scanner

### Component Hierarchy
```
NavigationBar
└── CookingCompanionApp
    └── FridgeApp (Scanner)
        ├── IngredientInput
        ├── IngredientList
        ├── GenerateButton
        ├── LoadingState
        └── RecipeResults
            └── RecipeCard[]
                └── RecipeDetailModal
```

---

### 1.1 Navigation Bar

#### Visual Specifications

**Desktop Layout (≥768px)**
```
┌────────────────────────────────────────────────────────────┐
│  🍳  Cooking Companion              [Smart Scanner]        │
│      Your personal kitchen          [Recipe Library]       │
│      assistant                      [Shopping List]        │
└────────────────────────────────────────────────────────────┘
```

**Mobile Layout (<768px)**
```
┌────────────────────────────────────┐
│  🍳  Cooking Companion      [☰]   │
└────────────────────────────────────┘
```

#### Detailed Specs

**Container**
- Background: `linear-gradient(to right, #f97316, #ef4444, #ec4899)`
- Height: `64px`
- Padding: `0 16px` (mobile), `0 24px` (desktop)
- Border bottom: `4px solid #ea580c`
- Position: `sticky` with `top: 0`, `z-index: 50`
- Box shadow: `0 4px 6px rgba(0,0,0,0.1)`

**Logo Section**
- Display: Flex, items-center, gap: 12px
- Emoji: Font-size: 30px
- Title:
  - Font: Serif
  - Size: 20px
  - Weight: Bold (700)
  - Color: White
- Subtitle:
  - Size: 12px
  - Color: rgba(255,255,255,0.8)
  - Display: hidden on mobile

**Navigation Tabs (Desktop)**
- Display: Flex, gap: 8px
- Each tab:
  - Padding: 10px 24px
  - Border-radius: 9999px (full pill)
  - Font-weight: 600
  - Transition: all 0.2s

  **Active State**:
  - Background: White
  - Color: #f97316 (orange-600)
  - Box-shadow: 0 4px 6px rgba(0,0,0,0.1)

  **Inactive State**:
  - Background: rgba(255,255,255,0.2)
  - Color: White
  - Backdrop-filter: blur(4px)

  **Hover State** (inactive):
  - Background: rgba(255,255,255,0.3)

**Mobile Menu Button**
- Size: 44x44px (touch-friendly)
- Background: rgba(255,255,255,0.2)
- Border-radius: 8px
- Icon: 24x24px
- Hover: Background rgba(255,255,255,0.3)

**Mobile Dropdown Menu**
- Background: Same gradient
- Padding: 16px
- Slide down animation
- Each item: Full-width, padding: 12px 16px, border-radius: 12px

---

### 1.2 Ingredient Input Section

#### Visual Layout
```
┌─────────────────────────────────────────────────┐
│                                                 │
│         What ingredients do you have?          │
│                                                 │
│  ┌───────────────────────────────────┬────┐   │
│  │ e.g., chicken, tomatoes, rice...  │ [+]│   │
│  └───────────────────────────────────┴────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

#### Detailed Specs

**Container**
- Max-width: `600px`
- Margin: `32px auto`
- Padding: `0 16px`

**Heading**
- Font-size: 24px (mobile), 30px (desktop)
- Font-weight: 700
- Color: #1f2937 (gray-900)
- Text-align: center
- Margin-bottom: 24px

**Input Container**
- Display: Flex
- Background: White
- Border: 2px solid #e5e7eb (gray-200)
- Border-radius: 12px
- Padding: 4px
- Box-shadow: 0 1px 3px rgba(0,0,0,0.05)
- Transition: border-color 0.2s

**Focus State**:
- Border-color: #f97316 (orange-500)
- Box-shadow: 0 0 0 3px rgba(249,115,22,0.1)

**Text Input**
- Flex: 1
- Padding: 12px 16px
- Font-size: 16px
- Border: none
- Outline: none
- Placeholder:
  - Text: "e.g., chicken, tomatoes, rice..."
  - Color: #9ca3af (gray-400)

**Add Button (+)**
- Size: 44x44px
- Background: #f97316 (orange-500)
- Color: White
- Border-radius: 8px
- Font-size: 24px
- Font-weight: 700
- Border: none
- Cursor: pointer
- Transition: all 0.2s

**Hover State**:
- Background: #ea580c (orange-600)
- Transform: scale(1.05)

**Disabled State**:
- Background: #d1d5db (gray-300)
- Cursor: not-allowed
- Transform: none

---

### 1.3 Ingredient List Display

#### Visual Layout
```
┌─────────────────────────────────────────────────┐
│  [ Chicken × ]  [ Tomatoes × ]  [ Rice × ]     │
│  [ Onions × ]   [ Garlic × ]                   │
│                                                 │
│               3 ingredients added               │
└─────────────────────────────────────────────────┘
```

#### Detailed Specs

**Container**
- Display: Flex
- Flex-wrap: wrap
- Gap: 8px
- Margin: 24px 0
- Min-height: 60px (when empty)

**Ingredient Chip**
- Display: Inline-flex
- Align-items: center
- Gap: 8px
- Background: Linear gradient (lighter version of primary)
- Background: `linear-gradient(135deg, #fed7aa, #fecaca, #fbcfe8)`
- Color: #7c2d12 (dark orange for contrast)
- Padding: 8px 12px
- Border-radius: 9999px (full pill)
- Font-size: 14px
- Font-weight: 600
- Box-shadow: 0 1px 3px rgba(0,0,0,0.1)
- Animation: Fade in + scale from 0.8 to 1
- Transition: all 0.2s

**Remove Button (×)**
- Size: 20x20px
- Background: rgba(0,0,0,0.1)
- Border-radius: 50%
- Color: inherit
- Font-size: 16px
- Border: none
- Cursor: pointer
- Transition: background 0.2s

**Hover State**:
- Background: rgba(0,0,0,0.2)

**Counter Text**
- Font-size: 14px
- Color: #6b7280 (gray-500)
- Text-align: center
- Margin-top: 8px

**Empty State**
- Display: Flex
- Align-items: center
- Justify-content: center
- Height: 60px
- Background: #f9fafb (gray-50)
- Border: 2px dashed #d1d5db (gray-300)
- Border-radius: 12px
- Color: #9ca3af (gray-400)
- Font-size: 14px
- Text: "Add ingredients to get started"

---

### 1.4 Generate Recipes Button

#### Visual Specs

**Default State**
```
┌─────────────────────────────────────────┐
│     ✨  Generate Delicious Recipes      │
└─────────────────────────────────────────┘
```

**Container**
- Width: 100%
- Max-width: 400px
- Margin: 32px auto
- Padding: 16px 32px
- Background: `linear-gradient(135deg, #f97316, #ef4444)`
- Color: White
- Border: none
- Border-radius: 12px
- Font-size: 18px
- Font-weight: 700
- Box-shadow: 0 10px 15px rgba(249,115,22,0.3)
- Cursor: pointer
- Transition: all 0.3s
- Display: flex
- Align-items: center
- Justify-content: center
- Gap: 12px

**Hover State** (enabled):
- Transform: translateY(-2px)
- Box-shadow: 0 15px 20px rgba(249,115,22,0.4)

**Active State**:
- Transform: translateY(0)
- Box-shadow: 0 5px 10px rgba(249,115,22,0.3)

**Disabled State**:
- Background: #d1d5db (gray-300)
- Color: #9ca3af (gray-400)
- Cursor: not-allowed
- Box-shadow: none
- Transform: none

**Loading State**:
- Show spinner animation
- Text: "Creating delicious recipes..."
- Cursor: wait

---

### 1.5 Loading State

#### Visual Layout
```
┌─────────────────────────────────────────────────┐
│                                                 │
│              [Spinning Animation]               │
│                                                 │
│        Creating delicious recipes from          │
│              your ingredients...                │
│                                                 │
│              Please wait...                     │
│                                                 │
└─────────────────────────────────────────────────┘
```

#### Detailed Specs

**Container**
- Display: Flex
- Flex-direction: column
- Align-items: center
- Justify-content: center
- Padding: 64px 32px
- Min-height: 300px

**Spinner**
- Size: 64x64px
- Border: 6px solid #f3f4f6 (gray-100)
- Border-top-color: #f97316 (orange-500)
- Border-radius: 50%
- Animation: spin 1s linear infinite

**Loading Text**
- Font-size: 18px
- Font-weight: 600
- Color: #1f2937 (gray-900)
- Text-align: center
- Margin-top: 24px
- Animation: pulse 1.5s ease-in-out infinite

**Subtext**
- Font-size: 14px
- Color: #6b7280 (gray-500)
- Margin-top: 8px

---

### 1.6 Recipe Results Grid

#### Visual Layout
```
┌──────────────┬──────────────┬──────────────┐
│   Recipe 1   │   Recipe 2   │   Recipe 3   │
│   [Image]    │   [Image]    │   [Image]    │
│   Title      │   Title      │   Title      │
│   ⏱ 30min   │   ⏱ 45min   │   ⏱ 20min   │
│   [View]     │   [View]     │   [View]     │
└──────────────┴──────────────┴──────────────┘
```

#### Detailed Specs

**Grid Container**
- Display: Grid
- Grid-template-columns:
  - Mobile: `1fr` (single column)
  - Tablet: `repeat(2, 1fr)` (2 columns)
  - Desktop: `repeat(3, 1fr)` (3 columns)
- Gap: 24px
- Padding: 32px 16px
- Max-width: 1200px
- Margin: 0 auto

**Recipe Card**
- Background: White
- Border-radius: 16px
- Overflow: hidden
- Box-shadow: 0 4px 6px rgba(0,0,0,0.07)
- Transition: all 0.3s
- Cursor: pointer

**Hover State**:
- Transform: translateY(-4px)
- Box-shadow: 0 12px 20px rgba(0,0,0,0.15)

**Card Image**
- Width: 100%
- Aspect-ratio: 16 / 9
- Object-fit: cover
- Background: linear-gradient(135deg, #fed7aa, #fecaca)
- Display: flex
- Align-items: center
- Justify-content: center
- Font-size: 64px (if using emoji fallback)

**Card Content**
- Padding: 20px

**Recipe Title**
- Font-size: 20px
- Font-weight: 700
- Color: #1f2937 (gray-900)
- Margin-bottom: 12px
- Line-height: 1.3
- Display: -webkit-box
- -webkit-line-clamp: 2
- -webkit-box-orient: vertical
- Overflow: hidden (truncate long titles)

**Metadata Row**
- Display: Flex
- Align-items: center
- Gap: 16px
- Margin-bottom: 16px
- Font-size: 14px
- Color: #6b7280 (gray-500)

**Metadata Item**
- Display: Flex
- Align-items: center
- Gap: 4px

**Icons** (⏱, 👤, 📊):
- Size: 16x16px
- Color: #f97316 (orange-500)

**Action Buttons**
- Display: Flex
- Gap: 8px

**"View Recipe" Button** (Primary)
- Flex: 1
- Padding: 10px 20px
- Background: #f97316 (orange-500)
- Color: White
- Border: none
- Border-radius: 8px
- Font-size: 14px
- Font-weight: 600
- Cursor: pointer
- Transition: all 0.2s

**Hover State**:
- Background: #ea580c (orange-600)

**"Save" Button** (Secondary - Icon only)
- Size: 40x40px
- Background: #f3f4f6 (gray-100)
- Color: #f97316 (orange-500)
- Border: none
- Border-radius: 8px
- Cursor: pointer
- Transition: all 0.2s

**Hover State**:
- Background: #e5e7eb (gray-200)

**Saved State**:
- Background: #f97316 (orange-500)
- Color: White

---

### 1.7 Recipe Detail Modal

#### Visual Layout
```
┌────────────────────────────────────────────────────────┐
│  [×]                    Recipe Name              [Save]│
├────────────────────────────────────────────────────────┤
│                                                        │
│                    [Hero Image]                        │
│                                                        │
├────────────────────────────────────────────────────────┤
│  ⏱ 30 min  👤 4 servings  📊 Medium                   │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Ingredients:                                          │
│  • 2 chicken breasts                                   │
│  • 1 cup rice                                          │
│  ...                                                   │
│                                                        │
│  Instructions:                                         │
│  1. Step one instructions...                           │
│  2. Step two instructions...                           │
│  ...                                                   │
│                                                        │
│  [Start Cooking]  [Add to Shopping List]               │
│                                                        │
└────────────────────────────────────────────────────────┘
```

#### Detailed Specs

**Modal Overlay**
- Position: Fixed
- Top: 0, Right: 0, Bottom: 0, Left: 0
- Background: rgba(0,0,0,0.5)
- Backdrop-filter: blur(4px)
- Z-index: 100
- Display: Flex
- Align-items: center
- Justify-content: center
- Padding: 16px
- Animation: Fade in 0.2s

**Modal Container**
- Background: White
- Border-radius: 16px
- Max-width: 800px
- Max-height: 90vh
- Width: 100%
- Overflow-y: auto
- Box-shadow: 0 25px 50px rgba(0,0,0,0.25)
- Animation: Scale from 0.95 + fade in 0.3s

**Modal Header**
- Display: Flex
- Align-items: center
- Justify-content: space-between
- Padding: 20px 24px
- Border-bottom: 1px solid #e5e7eb
- Sticky: top 0
- Background: White
- Z-index: 10

**Recipe Title** (in header)
- Font-size: 24px
- Font-weight: 700
- Color: #1f2937
- Flex: 1

**Close Button (×)**
- Size: 40x40px
- Background: transparent
- Border: none
- Font-size: 28px
- Color: #6b7280
- Cursor: pointer
- Border-radius: 8px
- Transition: background 0.2s

**Hover State**:
- Background: #f3f4f6

**Save Button** (in header)
- Padding: 8px 16px
- Background: #f97316
- Color: White
- Border: none
- Border-radius: 8px
- Font-size: 14px
- Font-weight: 600

**Hero Image Section**
- Width: 100%
- Height: 400px (desktop), 250px (mobile)
- Object-fit: cover
- Background: gradient fallback

**Content Section**
- Padding: 24px

**Metadata Bar**
- Display: Flex
- Flex-wrap: wrap
- Gap: 24px
- Padding: 16px 24px
- Background: #f9fafb
- Border-radius: 12px
- Margin-bottom: 24px

**Section Heading** ("Ingredients", "Instructions")
- Font-size: 20px
- Font-weight: 700
- Color: #1f2937
- Margin: 24px 0 12px 0
- Padding-bottom: 8px
- Border-bottom: 2px solid #f97316

**Ingredients List**
- List-style: none
- Padding: 0

**Ingredient Item**
- Padding: 10px 0
- Display: Flex
- Align-items: start
- Gap: 12px
- Border-bottom: 1px solid #f3f4f6
- Font-size: 16px
- Color: #374151

**Ingredient Bullet**
- Color: #f97316
- Font-size: 20px
- Line-height: 1

**Instructions List**
- Counter-reset: step-counter
- List-style: none
- Padding: 0

**Instruction Step**
- Counter-increment: step-counter
- Padding: 16px
- Margin: 12px 0
- Background: #f9fafb
- Border-left: 4px solid #f97316
- Border-radius: 8px
- Position: relative
- Font-size: 16px
- Line-height: 1.6

**Step Number**
- Position: absolute
- Left: -40px
- Top: 16px
- Width: 32px
- Height: 32px
- Background: #f97316
- Color: White
- Border-radius: 50%
- Display: Flex
- Align-items: center
- Justify-content: center
- Font-weight: 700
- Content: counter(step-counter)

**Action Buttons Section**
- Display: Flex
- Gap: 12px
- Padding: 24px
- Border-top: 1px solid #e5e7eb
- Position: sticky
- Bottom: 0
- Background: White

**"Start Cooking" Button**
- Flex: 2
- Padding: 14px 24px
- Background: linear-gradient(135deg, #f97316, #ef4444)
- Color: White
- Border: none
- Border-radius: 12px
- Font-size: 16px
- Font-weight: 700
- Cursor: pointer
- Box-shadow: 0 4px 6px rgba(249,115,22,0.3)

**"Add to Shopping List" Button**
- Flex: 1
- Padding: 14px 24px
- Background: White
- Color: #f97316
- Border: 2px solid #f97316
- Border-radius: 12px
- Font-size: 16px
- Font-weight: 600
- Cursor: pointer

---

## Feature 2: Recipe Library

### Component Hierarchy
```
RecipeLibrary
├── LibraryHeader
│   ├── SearchBar
│   └── FilterControls
├── CollectionsSidebar
└── RecipeGrid
    └── SavedRecipeCard[]
        └── RecipeDetailView
```

---

### 2.1 Library Header

#### Visual Layout
```
┌─────────────────────────────────────────────────────────┐
│  My Recipe Library                         [Import]     │
│                                                         │
│  [🔍 Search recipes...]                    [Filter ▼]  │
└─────────────────────────────────────────────────────────┘
```

#### Detailed Specs

**Container**
- Padding: 32px 24px
- Background: White
- Border-bottom: 1px solid #e5e7eb

**Title**
- Font-size: 32px
- Font-weight: 700
- Color: #1f2937
- Margin-bottom: 24px
- Display: Flex
- Align-items: center
- Justify-content: space-between

**Import Button**
- Padding: 10px 20px
- Background: transparent
- Color: #f97316
- Border: 2px solid #f97316
- Border-radius: 8px
- Font-size: 14px
- Font-weight: 600
- Cursor: pointer
- Transition: all 0.2s

**Hover State**:
- Background: #f97316
- Color: White

**Search and Filter Row**
- Display: Flex
- Gap: 12px
- Align-items: center

**Search Bar**
- Flex: 1
- Display: Flex
- Align-items: center
- Background: #f9fafb
- Border: 1px solid #e5e7eb
- Border-radius: 12px
- Padding: 12px 16px
- Gap: 12px
- Transition: all 0.2s

**Focus State**:
- Border-color: #f97316
- Background: White
- Box-shadow: 0 0 0 3px rgba(249,115,22,0.1)

**Search Icon**
- Size: 20x20px
- Color: #9ca3af

**Search Input**
- Flex: 1
- Border: none
- Background: transparent
- Font-size: 16px
- Outline: none
- Placeholder: "Search recipes..."

**Filter Dropdown**
- Padding: 12px 20px
- Background: White
- Border: 1px solid #e5e7eb
- Border-radius: 12px
- Font-size: 14px
- Font-weight: 600
- Color: #374151
- Cursor: pointer
- Display: Flex
- Align-items: center
- Gap: 8px
- Transition: all 0.2s

**Hover State**:
- Border-color: #f97316
- Background: #fff7ed (orange-50)

---

### 2.2 Collections Sidebar

#### Visual Layout (Desktop)
```
┌──────────────────┐
│  Collections     │
├──────────────────┤
│  📁 All (24)     │
│  ⭐ Favorites    │
│  🕐 Recent       │
│  ─────────────   │
│  🍝 Italian      │
│  🌮 Mexican      │
│  🍜 Asian        │
│  + New           │
└──────────────────┘
```

#### Detailed Specs

**Sidebar Container**
- Width: 240px (desktop)
- Display: None (mobile < 768px)
- Background: #f9fafb
- Border-right: 1px solid #e5e7eb
- Padding: 24px 16px
- Height: calc(100vh - header height)
- Overflow-y: auto
- Position: sticky
- Top: 0

**Section Title**
- Font-size: 12px
- Font-weight: 700
- Text-transform: uppercase
- Color: #9ca3af
- Letter-spacing: 0.5px
- Margin-bottom: 12px

**Collection Item**
- Padding: 10px 12px
- Border-radius: 8px
- Display: Flex
- Align-items: center
- Gap: 10px
- Cursor: pointer
- Transition: all 0.2s
- Font-size: 14px
- Color: #374151

**Default State**:
- Background: transparent

**Hover State**:
- Background: #f3f4f6

**Active State**:
- Background: #fff7ed (orange-50)
- Color: #f97316
- Font-weight: 600
- Border-left: 3px solid #f97316

**Collection Icon**
- Font-size: 18px

**Collection Count**
- Margin-left: auto
- Font-size: 12px
- Color: #9ca3af
- Background: #e5e7eb
- Padding: 2px 8px
- Border-radius: 999px

**New Collection Button**
- Margin-top: 16px
- Padding: 8px 12px
- Background: transparent
- Border: 1px dashed #d1d5db
- Border-radius: 8px
- Color: #9ca3af
- Font-size: 14px
- Cursor: pointer
- Transition: all 0.2s

**Hover State**:
- Border-color: #f97316
- Color: #f97316
- Background: #fff7ed

---

### 2.3 Saved Recipe Cards

#### Visual Layout
```
┌─────────────────────────────────────┐
│  [Image]                      [❤️]  │
│                                     │
│  Chicken Tikka Masala              │
│  ⭐ 4.5  ⏱ 45min  🍽️ Indian         │
│  Last cooked: 2 days ago           │
│  ────────────────────────────────  │
│  [View Recipe]  [Start Cooking]    │
└─────────────────────────────────────┘
```

#### Detailed Specs

**Card Container**
- Background: White
- Border: 1px solid #e5e7eb
- Border-radius: 12px
- Overflow: hidden
- Transition: all 0.3s
- Position: relative

**Hover State**:
- Box-shadow: 0 8px 16px rgba(0,0,0,0.1)
- Transform: translateY(-2px)
- Border-color: #f97316

**Card Image**
- Width: 100%
- Height: 200px
- Object-fit: cover
- Background: linear-gradient(135deg, #fed7aa, #fecaca)
- Position: relative

**Favorite Icon** (❤️)
- Position: Absolute
- Top: 12px
- Right: 12px
- Size: 40x40px
- Background: White
- Border-radius: 50%
- Display: Flex
- Align-items: center
- Justify-content: center
- Box-shadow: 0 2px 8px rgba(0,0,0,0.15)
- Cursor: pointer
- Z-index: 10
- Transition: all 0.2s

**Not Favorited**:
- Icon color: #d1d5db (gray-300)

**Favorited**:
- Icon color: #ef4444 (red-500)
- Animation: pulse once

**Hover State**:
- Transform: scale(1.1)

**Card Content**
- Padding: 16px

**Recipe Title**
- Font-size: 18px
- Font-weight: 700
- Color: #1f2937
- Margin-bottom: 8px
- Display: -webkit-box
- -webkit-line-clamp: 2
- Overflow: hidden

**Metadata Row**
- Display: Flex
- Flex-wrap: wrap
- Gap: 12px
- Margin-bottom: 8px
- Font-size: 13px
- Color: #6b7280

**Rating Display**
- Display: Flex
- Align-items: center
- Gap: 4px
- Color: #fbbf24 (yellow-400)

**Last Cooked**
- Font-size: 12px
- Color: #9ca3af
- Margin-bottom: 12px
- Font-style: italic

**Divider**
- Border-top: 1px solid #f3f4f6
- Margin: 12px 0

**Action Buttons**
- Display: Flex
- Gap: 8px

**"View Recipe" Button**
- Flex: 1
- Padding: 8px 16px
- Background: transparent
- Color: #f97316
- Border: 1px solid #f97316
- Border-radius: 8px
- Font-size: 14px
- Font-weight: 600
- Cursor: pointer
- Transition: all 0.2s

**Hover State**:
- Background: #fff7ed
- Border-color: #ea580c

**"Start Cooking" Button**
- Flex: 1
- Padding: 8px 16px
- Background: #f97316
- Color: White
- Border: none
- Border-radius: 8px
- Font-size: 14px
- Font-weight: 600
- Cursor: pointer
- Transition: all 0.2s

**Hover State**:
- Background: #ea580c

---

### 2.4 Empty States

#### No Recipes in Library
```
┌─────────────────────────────────────────┐
│                                         │
│             📚                          │
│                                         │
│      Your recipe library is empty      │
│                                         │
│   Start by generating recipes from     │
│   your ingredients or import existing  │
│            recipes!                     │
│                                         │
│      [Discover Recipes]  [Import]      │
│                                         │
└─────────────────────────────────────────┘
```

**Container**
- Padding: 64px 32px
- Display: Flex
- Flex-direction: column
- Align-items: center
- Text-align: center

**Icon**
- Font-size: 80px
- Margin-bottom: 24px
- Opacity: 0.5

**Title**
- Font-size: 24px
- Font-weight: 700
- Color: #1f2937
- Margin-bottom: 12px

**Description**
- Font-size: 16px
- Color: #6b7280
- Max-width: 400px
- Line-height: 1.6
- Margin-bottom: 32px

**CTA Buttons**
- Display: Flex
- Gap: 12px
- Justify-content: center

---

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 767px) {
  - Single column layouts
  - Hidden sidebar (hamburger menu)
  - Stacked buttons
  - Smaller padding/margins
  - Font sizes reduced by 10-15%
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  - 2-column grids
  - Collapsible sidebar
  - Moderate spacing
}

/* Desktop */
@media (min-width: 1024px) {
  - 3-column grids
  - Persistent sidebar
  - Full spacing
  - Hover states emphasized
}
```

---

## Accessibility Specifications

### Keyboard Navigation
- Tab order follows visual flow
- Focus indicators: 2px solid #f97316 outline with 2px offset
- Skip links for main content
- Escape key closes modals
- Enter/Space activates buttons

### ARIA Labels
```html
<button aria-label="Add ingredient">+</button>
<input aria-label="Search recipes" />
<button aria-label="Close modal" aria-controls="recipe-modal">×</button>
<div role="status" aria-live="polite">Loading recipes...</div>
```

### Color Contrast Ratios
- All text meets WCAG AA (4.5:1)
- Important elements meet AAA (7:1)
- Focus states have 3:1 contrast with background

### Screen Reader Support
- Semantic HTML (header, nav, main, article, section)
- Heading hierarchy (h1 → h2 → h3)
- Alt text for all images
- Status announcements for loading/success states

---

## Performance Targets

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Image optimization**: WebP format, lazy loading
- **Code splitting**: Route-based chunks
- **Bundle size**: < 200KB gzipped

---

## Conclusion

These hi-fidelity specifications provide complete design documentation for implementing the **Ingredient Scanner** and **Recipe Library** features. All measurements, colors, interactions, and states are defined to ensure consistent, accessible, and delightful user experiences across all devices and platforms.
