# Complete User Flows

## Overview
This document outlines all major user flows in the Cooking Companion app, from initial app launch through recipe discovery, management, and cooking.

---

## Primary User Flow: Opening App → Deciding What to Cook → Following Recipe

### Flow Diagram

```
[App Launch]
    ↓
[Home Screen: Smart Scanner]
    ↓
[Decision Point: How to find recipe?]
    ↓
    ├─→ [Path 1: Scan Ingredients] → [Generate Recipes] → [Select Recipe]
    ├─→ [Path 2: Browse Library] → [Select Recipe]
    └─→ [Path 3: Shopping List] → [Select Recipe from List]
    ↓
[Recipe Detail View]
    ↓
[Start Cooking Mode]
    ↓
[Follow Step-by-Step with Timers]
    ↓
[Complete Recipe] → [Rate & Save]
```

---

## Flow 1: Ingredient-Based Recipe Discovery

### User Story
> "I want to find recipes based on what I already have in my fridge"

### Steps

#### 1. App Launch (0-5 seconds)
**Screen**: Home/Scanner Screen
- User opens the Cooking Companion app
- Default landing: Smart Scanner tab is active
- UI displays:
  - Header with app branding "🍳 Cooking Companion"
  - Three navigation tabs: Smart Scanner, Recipe Library, Shopping List
  - Empty ingredient list with "Add ingredients" prompt
  - Input field with "+" button

**User Action Options**:
- Type ingredient manually
- (Future: Scan fridge photo)
- Navigate to other tabs

#### 2. Add Ingredients (5-30 seconds)
**Screen**: Smart Scanner - Active Input
- User types ingredient name (e.g., "chicken")
- Clicks "+" button or presses Enter
- Ingredient appears as pill/chip below input
- User repeats for multiple ingredients

**Visual Feedback**:
- Ingredient chips are color-coded and removable
- Counter shows: "3 ingredients added"
- "Generate Recipes" button becomes prominent

**Edge Cases**:
- Empty input: Button disabled
- Duplicate ingredient: Show warning or auto-merge
- Special characters: Sanitize input

#### 3. Generate Recipes (30-40 seconds)
**Screen**: Smart Scanner - Loading State
- User clicks "Generate Recipes" button
- Loading animation appears
- Status message: "Creating delicious recipes from your ingredients..."

**Technical Process**:
- API call to `/api/recipes`
- AI analyzes ingredients and generates 3-5 recipes
- Structured output with ingredients, steps, timing

**Fallback**:
- If API fails: Show pre-defined recipe templates
- Error message: "Using offline recipes"

#### 4. Browse Generated Recipes (40-90 seconds)
**Screen**: Recipe Results Grid
- Grid of recipe cards displayed
- Each card shows:
  - Recipe name
  - Hero image (AI-generated or placeholder)
  - Prep time
  - Difficulty level
  - Number of ingredients
  - "View Recipe" button
  - "Save to Library" quick action

**User Actions**:
- Scroll through recipes
- Click recipe card to view details
- Save recipe without viewing
- Generate more recipes
- Modify ingredients and regenerate

#### 5. View Recipe Details (90-180 seconds)
**Screen**: Recipe Detail View
- Full recipe information:
  - Large hero image
  - Recipe name and description
  - Servings, prep time, cook time, difficulty
  - Complete ingredient list with quantities
  - Step-by-step instructions
  - Nutritional information
  - Tags (cuisine type, dietary info)

**Action Buttons**:
- **Start Cooking**: Enter cooking mode
- **Save to Library**: Add to personal collection
- **Add to Shopping List**: Generate shopping list
- **Share**: Share recipe (future feature)
- **Back**: Return to results

#### 6. Start Cooking Mode (3-60 minutes)
**Screen**: Cooking Mode Interface
- Immersive full-screen experience
- Current step highlighted prominently
- Progress indicator (Step 3 of 8)
- Active timers displayed at top
- Large "Next Step" button
- "Pause/Resume" cooking option

**Timer Integration**:
- App auto-detects timer keywords in steps
  - "Let simmer for 10 minutes"
  - "Bake for 25 minutes at 350°F"
  - "Rest for 5 minutes"
- Suggests timer creation
- User can start/stop timers
- Multiple timers run concurrently
- Notifications when timer completes

**Step Navigation**:
- Swipe or click to navigate steps
- Check off completed steps
- Go back to previous step if needed

#### 7. Complete Recipe
**Screen**: Completion Screen
- Success message: "🎉 Recipe Complete!"
- Option to rate recipe (1-5 stars)
- Prompt to save to library (if not already saved)
- Share photo option (future)
- "Start Another Recipe" or "Back to Home"

---

## Flow 2: Recipe Library Management

### User Story
> "I want to save and organize my favorite recipes for future cooking"

### Steps

#### 1. Navigate to Library
**Entry Points**:
- Direct: Click "Recipe Library" tab
- From scanner: Click "View Library" link
- From recipe detail: After saving recipe

**Screen**: Recipe Library Home
- Grid/list view of saved recipes
- Collections/folders sidebar
- Search bar
- Filter options (tags, difficulty, time)
- Sort options (date added, name, rating)

#### 2. Browse Saved Recipes
**Visual Organization**:
- Recipe cards with thumbnails
- Recipe name, brief description
- Quick info: time, difficulty, rating
- Last cooked date
- Collection badges

**Quick Actions on Cards**:
- Click to view details
- Heart icon: Toggle favorite
- Three-dot menu:
  - Move to collection
  - Edit recipe
  - Delete recipe
  - Start cooking

#### 3. Organize into Collections
**Collections Feature**:
- Create new collection: "Quick Weeknight Dinners"
- Drag-drop recipes into collections
- Collection views:
  - All Recipes
  - Favorites ⭐
  - Recently Cooked
  - Custom Collections

**Collection Management**:
- Rename collection
- Change collection icon/color
- Set collection as default view
- Delete collection (recipes remain in library)

#### 4. Search & Filter
**Search Capabilities**:
- Search by recipe name
- Search by ingredient
- Search by tag/cuisine
- Recently searched items

**Filter Options**:
- Prep time: < 15 min, 15-30 min, 30-60 min, > 1 hour
- Difficulty: Easy, Medium, Hard
- Dietary: Vegetarian, Vegan, Gluten-free, etc.
- Cuisine: Italian, Asian, Mexican, etc.
- Ingredients: "Has chicken", "No dairy"

#### 5. Import Recipe from External Source
**Screen**: Import Modal
- Input options:
  - Paste recipe URL
  - Paste recipe text
  - Manual entry form
- "Import" button

**Import Process**:
- Parse recipe content
- Extract ingredients and steps
- Show preview for confirmation
- Edit before saving
- Add to library

---

## Flow 3: Shopping List Generation

### User Story
> "I want to create a shopping list for recipes I plan to cook"

### Steps

#### 1. Navigate to Shopping List
**Entry Points**:
- Click "Shopping List" tab
- From recipe detail: Click "Add to Shopping List"
- From library: Multi-select recipes → "Create List"

**Screen**: Shopping List Home
- Active shopping lists
- Create new list button
- Archive/completed lists

#### 2. Create Shopping List from Recipe
**Screen**: Add to List Modal
- Recipe name shown
- Servings adjustment slider
  - Default: As per recipe
  - Scale: 1x, 2x, 0.5x, custom
- Ingredient list preview
- Add to existing list or create new

**Smart Features**:
- Automatically combines duplicate ingredients
- Aggregates quantities (3 eggs + 2 eggs = 5 eggs)
- Groups by category (Produce, Dairy, Meat, etc.)

#### 3. Manage Shopping List
**Screen**: Active Shopping List
- List name (editable): "Weekend Dinner Party"
- Associated recipes shown at top
- Ingredients grouped by category:
  - 🥬 Produce
  - 🥛 Dairy
  - 🍖 Meat & Seafood
  - 🌾 Pantry
  - 🧂 Spices & Condiments
  - 📦 Other

**Item Display**:
- Checkbox for check-off
- Ingredient name
- Quantity + unit
- From which recipe (subtle indicator)

**Actions**:
- Check off items while shopping
- Add manual items
- Edit quantities
- Remove items
- Rearrange categories
- Share list (future: with family/roommates)

#### 4. Shopping in Progress
**Mobile-Optimized View**:
- Large checkboxes for easy tapping
- Checked items move to bottom (greyed out)
- Progress bar: "7 of 23 items"
- Undo last check option

**Smart Notifications**:
- "Don't forget to check produce section!"
- Store mode: Sort by store layout (future)

#### 5. Complete Shopping
**Actions**:
- Mark list as complete
- Move to archive
- Clear all items for reuse
- Create new list

---

## Flow 4: Cooking Mode with Timers

### User Story
> "I want step-by-step guidance while cooking with automatic timers"

### Steps

#### 1. Enter Cooking Mode
**Entry Point**: Recipe Detail → "Start Cooking" button

**Transition**:
- Full-screen cooking interface
- Wake lock enabled (screen stays on)
- Orientation lock suggested (portrait or landscape)

#### 2. Step-by-Step Guidance
**Screen**: Cooking Mode - Active Step
- **Header**:
  - Recipe name
  - Step counter: "Step 3 of 8"
  - Progress bar: 37% complete
  - Exit button

- **Main Content**:
  - Current step text (large, readable font)
  - Step image/illustration (if available)
  - Ingredients needed for this step
  - Time estimate for step

- **Timers Section** (if applicable):
  - Auto-detected timer suggestion
  - "Start Timer: 15 minutes" button
  - Active timers displayed

- **Navigation**:
  - Large "Next Step" button (bottom)
  - "Previous" button (top/side)
  - Jump to step dropdown

#### 3. Timer Interaction
**Auto-Detection**:
- AI extracts timer durations from steps
  - "Simmer for 10 minutes" → Suggests 10 min timer
  - "Bake at 350°F for 25 minutes" → Suggests 25 min timer
- Shows suggestion banner: "Set timer for 10 minutes?"

**Timer Display**:
- Timer name: "Simmering" (from step context)
- Countdown: 09:47 remaining
- Visual circular progress
- Pause/Resume button
- Cancel timer

**Multiple Timers**:
- Stack vertically or horizontally scroll
- Each timer independently controlled
- Different colors for distinction
- All timers visible at once

**Timer Completion**:
- Visual notification (flash/pulse)
- Audio alert (customizable tone)
- Vibration (mobile)
- Persistent until acknowledged
- Shows which step timer was for

#### 4. Complete Cooking
**Final Step**:
- Step text: "Serve and enjoy!"
- Completion animation
- Summary screen:
  - Total cooking time
  - Steps completed: 8/8
  - Rating prompt
  - Photo upload option

**Post-Cooking Actions**:
- Rate recipe (1-5 stars)
- Write notes/modifications
- Save to favorites
- Share creation (future)
- "Cook Again" button
- Return to library

---

## Flow 5: First-Time User Onboarding

### User Story
> "I'm opening the app for the first time and want to understand what it does"

### Steps

#### 1. Welcome Screen (Optional)
**Screen**: Splash/Welcome
- App logo and branding
- Tagline: "Your Personal Kitchen Companion"
- "Get Started" button
- "Skip" option

#### 2. Feature Tour (3-4 slides)
**Slide 1**: Smart Scanner
- Visual: Ingredients → Recipes
- Text: "Scan or add your ingredients and get instant recipe suggestions"

**Slide 2**: Recipe Library
- Visual: Recipe collection grid
- Text: "Save and organize your favorite recipes"

**Slide 3**: Shopping Lists
- Visual: Shopping list interface
- Text: "Auto-generate shopping lists from any recipe"

**Slide 4**: Cooking Mode
- Visual: Step-by-step + timer
- Text: "Follow step-by-step instructions with smart timers"

**Final Slide**: Get Started
- "Start Cooking!" button
- Creates sample recipes in library (optional)

#### 3. Permissions (Mobile)
- Camera access (for future ingredient scanning)
- Notifications (for timer alerts)
- Location (for nearby grocery stores - future)

#### 4. First Recipe Suggestion
- Pre-populated with common ingredients
- "Try generating your first recipe!"
- Guided tutorial overlays

---

## Flow 6: Error Handling & Edge Cases

### No Internet Connection
**Scenario**: User opens app offline

**Behavior**:
- Show cached/saved recipes
- Disable ingredient scanner
- Show message: "You're offline - viewing saved recipes only"
- Allow cooking mode with saved recipes
- Queue shopping list updates for sync

### No Ingredients Added
**Scenario**: User clicks "Generate Recipes" without ingredients

**Behavior**:
- Button remains disabled
- Tooltip: "Add at least one ingredient"
- Suggestion: "Try adding: chicken, rice, tomatoes"

### API Failure
**Scenario**: Recipe generation fails

**Behavior**:
- Show error message: "Oops! Unable to generate recipes"
- Offer fallback: "Here are some popular recipes instead"
- Display 3-5 pre-defined recipes
- "Retry" button available

### Empty Library
**Scenario**: User navigates to library before saving recipes

**Behavior**:
- Empty state illustration
- Message: "Your recipe library is empty"
- CTA: "Discover Recipes" button → Navigate to scanner
- Quick start guide

### Recipe Not Found
**Scenario**: User opens deep link to deleted recipe

**Behavior**:
- Error message: "This recipe is no longer available"
- Suggestions: "Browse similar recipes"
- "Back to Library" button

---

## Navigation Patterns

### Tab Navigation (Primary)
```
[Smart Scanner] [Recipe Library] [Shopping List]
       ↓               ↓                ↓
   Persistent bottom or top navigation
   Active tab highlighted
   Maintains state when switching
```

### Deep Linking
```
cooking-companion://recipe/[id]
cooking-companion://shopping-list/[id]
cooking-companion://cooking-mode/[id]/step/[num]
```

### Breadcrumb Navigation
```
Library > Collections > Quick Dinners > Pasta Primavera > Cooking Mode
```

### Gesture Navigation (Mobile)
- Swipe left/right: Navigate steps in cooking mode
- Swipe down: Dismiss modals
- Long press: Quick actions menu
- Pull to refresh: Sync recipes

---

## Interaction States

### Button States
- **Default**: Primary color, clear label
- **Hover**: Slightly darker, slight scale
- **Active/Pressed**: Depressed appearance
- **Disabled**: Greyed out, no interaction
- **Loading**: Spinner + disabled state

### Form States
- **Empty**: Placeholder text
- **Focus**: Highlighted border
- **Valid**: Green checkmark (if validation required)
- **Invalid**: Red border + error message
- **Disabled**: Greyed out, no cursor

### Card States
- **Default**: Subtle shadow
- **Hover**: Elevated shadow, slight scale
- **Selected**: Border highlight
- **Loading**: Skeleton placeholder
- **Error**: Error state with retry

---

## Performance Considerations

### Load Times
- Initial app load: < 2 seconds
- Recipe generation: 3-5 seconds
- Page transitions: < 300ms
- Image loading: Progressive with blur placeholder

### Optimization
- Lazy load images
- Virtual scrolling for long lists
- Debounce search inputs
- Cache API responses
- Prefetch likely next screens

---

## Accessibility Features

### Screen Reader Support
- All interactive elements labeled
- Proper heading hierarchy
- ARIA labels for icons
- Form field associations
- Status announcements

### Keyboard Navigation
- Tab order logical
- Focus indicators visible
- Keyboard shortcuts:
  - `/` - Focus search
  - `n` - Next step (cooking mode)
  - `p` - Previous step
  - `ESC` - Close modal

### Visual Accessibility
- Minimum contrast ratio: 4.5:1
- Font size: Minimum 16px
- Touch targets: Minimum 44x44px
- Color not sole indicator
- Zoom support up to 200%

---

## Conclusion

These user flows cover all major interactions in the Cooking Companion app, from discovery through execution. Each flow is designed to be:

- **Intuitive**: Minimal learning curve
- **Efficient**: Fewest steps to goal
- **Forgiving**: Easy error recovery
- **Delightful**: Pleasant micro-interactions
- **Accessible**: Usable by everyone

The flows prioritize speed to value while maintaining flexibility for different cooking styles and preferences.
