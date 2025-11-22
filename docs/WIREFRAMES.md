# Wireframes: Shopping List & Cooking Mode Timers

## Overview
This document provides wireframe specifications for the **Shopping List** and **Cooking Mode with Timers** features. While these features have been implemented, the wireframes document the design thinking and structure before full visual treatment.

---

## Feature 3: Shopping List

### Concept Overview
The Shopping List feature automatically generates grocery lists from selected recipes, intelligently combines duplicate ingredients, and provides a streamlined shopping experience.

---

### 3.1 Shopping List Home Screen

#### Wireframe
```
┌─────────────────────────────────────────────┐
│ [<] Shopping Lists              [+ New]     │
├─────────────────────────────────────────────┤
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ Weekend Dinner Party            [>] │   │
│ │ 3 recipes · 18 items · 7 checked    │   │
│ │ Created: Nov 20, 2025               │   │
│ └─────────────────────────────────────┘   │
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ Quick Weeknight Meals           [>] │   │
│ │ 2 recipes · 12 items · 0 checked    │   │
│ │ Created: Nov 18, 2025               │   │
│ └─────────────────────────────────────┘   │
│                                             │
│ ─────── Completed ───────                  │
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ Sunday Brunch            ✓          │   │
│ │ 4 recipes · 15 items · All done     │   │
│ │ Completed: Nov 15, 2025             │   │
│ └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘

Components:
- Header with back nav and "New List" CTA
- Active lists section
- List cards showing:
  * List name (editable)
  * Summary stats (recipes, items, progress)
  * Creation/completion date
  * Arrow to view details
- Completed lists section (collapsed by default)
- Empty state for no lists

Interactions:
- Tap card to open list details
- Swipe left to delete/archive
- Pull to refresh
- Long press for quick actions menu
```

#### Layout Annotations

**List Card Structure**
```
┌──────────────────────────────────────────┐
│  [Icon] List Name              [Arrow]   │
│         Stats line                       │
│         Date line                        │
└──────────────────────────────────────────┘

Spacing:
- Padding: 16px all sides
- Gap between cards: 12px
- Border-radius: 12px
- Background: White (active), Gray-50 (completed)
- Border: 1px solid Gray-200
```

**Progress Indicator**
```
[====70%====.............]

- Visual: Linear progress bar
- Color: Green (>70%), Orange (30-70%), Gray (<30%)
- Shows: X of Y items checked
```

---

### 3.2 Shopping List Detail View

#### Wireframe
```
┌─────────────────────────────────────────────┐
│ [<] Weekend Dinner Party        [•••]       │
├─────────────────────────────────────────────┤
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ 🍝 Pasta Primavera                  │   │
│ │ 🍗 Grilled Chicken Salad            │   │
│ │ 🍰 Chocolate Cake                   │   │
│ └─────────────────────────────────────┘   │
│                                             │
│ Progress: 7 of 18 items [======....] 39%   │
│                                             │
│ ──────── 🥬 Produce ────────                │
│                                             │
│ ☐ 2 lbs Tomatoes                           │
│   from: Pasta Primavera                    │
│                                             │
│ ☑ 1 head Lettuce                           │
│   from: Grilled Chicken Salad              │
│                                             │
│ ☐ 1 bunch Basil                            │
│   from: Pasta Primavera                    │
│                                             │
│ ──────── 🥛 Dairy ────────                  │
│                                             │
│ ☐ 2 cups Heavy Cream (combined)            │
│   from: Pasta (1 cup), Cake (1 cup)        │
│                                             │
│ ☑ 8 oz Parmesan Cheese                     │
│   from: Pasta Primavera                    │
│                                             │
│ ──────── 🍖 Meat & Seafood ────────         │
│                                             │
│ ☐ 4 Chicken Breasts                        │
│   from: Grilled Chicken Salad              │
│                                             │
│ [+ Add Custom Item]                         │
│                                             │
└─────────────────────────────────────────────┘

Components:
- Header with list name and options menu
- Recipe chips showing source recipes
- Overall progress indicator
- Category sections (collapsible)
- Ingredient items with:
  * Checkbox (large, tap-friendly)
  * Quantity + unit + ingredient name
  * Source recipe (subtle, smaller text)
  * Combined indicator when applicable
- Add custom item button
- Sticky category headers on scroll

Interactions:
- Tap checkbox to check/uncheck
- Checked items fade and move to bottom
- Swipe item left to edit/delete
- Tap item for details/notes
- Drag to reorder categories
- Pull down to refresh
```

#### Annotation: Ingredient Item
```
┌────────────────────────────────────────────┐
│ [☐] 2 cups Heavy Cream                     │
│     from: Pasta (1 cup), Cake (1 cup)      │
└────────────────────────────────────────────┘

States:
- Unchecked: Full opacity, white background
- Checked: 50% opacity, strikethrough, gray bg
- Tap area: Full card height (min 52px)

Font sizes:
- Checkbox: 24px
- Quantity + ingredient: 16px, weight 600
- Source: 13px, weight 400, gray-600
```

---

### 3.3 Add to Shopping List Modal

#### Wireframe
```
┌─────────────────────────────────────────────┐
│ Add to Shopping List                   [×]  │
├─────────────────────────────────────────────┤
│                                             │
│ Recipe: Pasta Primavera                     │
│                                             │
│ Servings:  [-]  4  [+]                      │
│                                             │
│ Ingredients Preview:                        │
│ ┌─────────────────────────────────────┐   │
│ │ ☑ 2 lbs Tomatoes                    │   │
│ │ ☑ 1 cup Heavy Cream                 │   │
│ │ ☑ 8 oz Pasta                        │   │
│ │ ☑ 1 bunch Basil                     │   │
│ │ ☐ 4 cloves Garlic (already have)    │   │
│ │ ☐ 2 tbsp Olive Oil (already have)   │   │
│ └─────────────────────────────────────┘   │
│                                             │
│ Add to:                                     │
│ ○ Create New List                          │
│   [List Name_________________]              │
│                                             │
│ ◉ Weekend Dinner Party (3 recipes)          │
│ ○ Quick Weeknight Meals (2 recipes)         │
│                                             │
│                                             │
│        [Cancel]    [Add to List]            │
│                                             │
└─────────────────────────────────────────────┘

Components:
- Modal header with close button
- Recipe name display
- Servings adjuster:
  * Decrease button
  * Current serving count
  * Increase button
  * Auto-scales quantities
- Ingredients preview list:
  * Checkboxes to include/exclude items
  * Grayed out items already owned
  * Scaled quantities based on servings
- Destination selector:
  * Radio buttons for new/existing list
  * Text input for new list name
  * List of existing lists with metadata
- Action buttons (Cancel, Confirm)

Interactions:
- Adjust servings scales all quantities
- Uncheck items to exclude from list
- Select existing list or create new
- Confirm adds and closes modal
- Cancel discards and closes
```

---

### 3.4 Shopping Mode (Active Shopping)

#### Wireframe
```
┌─────────────────────────────────────────────┐
│ [<] Shopping Mode                      [✓]  │
├─────────────────────────────────────────────┤
│                                             │
│ ╔═════════════════════════════════════╗   │
│ ║  7 of 18 items                      ║   │
│ ║  [=====39%=========................] ║   │
│ ╚═════════════════════════════════════╝   │
│                                             │
│ ──────────────────────────────────────────  │
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ [☐] 2 lbs Tomatoes                  │◄─ Large
│ │                                     │   tap area
│ └─────────────────────────────────────┘   │
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ [☐] 1 bunch Basil                   │   │
│ └─────────────────────────────────────┘   │
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ [☐] 2 cups Heavy Cream              │   │
│ └─────────────────────────────────────┘   │
│                                             │
│ ──────── Checked (7) ────────               │
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ [☑] Lettuce                    [↩]  │   │
│ └─────────────────────────────────────┘   │
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ [☑] Parmesan Cheese            [↩]  │   │
│ └─────────────────────────────────────┘   │
│                                             │
│        [Undo Last]    [Mark Complete]       │
│                                             │
└─────────────────────────────────────────────┘

Features:
- Simplified full-screen shopping interface
- Large progress indicator at top
- Only unchecked items shown prominently
- Checked items collapsed at bottom
- Extra large checkboxes and tap areas
- Undo button for accidental checks
- Complete button to finish shopping

Optimizations for Shopping:
- Auto-scroll to next item after check
- Haptic feedback on check
- Keep screen awake
- Large fonts for readability in store
- Minimal distractions
- Quick undo for mistakes
```

---

### 3.5 Smart Features

#### Quantity Aggregation
```
Recipe A: 1 cup milk
Recipe B: 2 cups milk
────────────────────
Combined: 3 cups milk ✨
from: Recipe A (1c), Recipe B (2c)

Logic:
- Detect duplicate ingredients across recipes
- Sum quantities if units compatible
- Show combined total
- Display sources with original amounts
- Handle unit conversions (cups ↔ oz)
```

#### Category Auto-Sort
```
Ingredients automatically grouped by:

🥬 Produce
- Tomatoes, lettuce, basil, onions...

🥛 Dairy
- Milk, cheese, butter, yogurt...

🍖 Meat & Seafood
- Chicken, beef, fish, shrimp...

🌾 Pantry
- Pasta, rice, flour, sugar...

🧂 Spices & Condiments
- Salt, pepper, olive oil, soy sauce...

📦 Other
- Items that don't fit categories

Customizable:
- Users can create custom categories
- Drag items between categories
- Reorder categories
```

---

### 3.6 Empty State

#### Wireframe
```
┌─────────────────────────────────────────────┐
│ Shopping Lists                              │
├─────────────────────────────────────────────┤
│                                             │
│                                             │
│                                             │
│              🛒                             │
│                                             │
│        No shopping lists yet                │
│                                             │
│   Create a list from any recipe to start    │
│   planning your grocery shopping!           │
│                                             │
│                                             │
│        [Browse Recipes]                     │
│                                             │
│                                             │
│                                             │
└─────────────────────────────────────────────┘

Elements:
- Large icon (shopping cart)
- Empty state message
- Helpful guidance text
- Primary CTA to browse recipes
- Centered, lots of whitespace
```

---

## Feature 4: Cooking Mode with Timers

### Concept Overview
Cooking Mode provides step-by-step guidance through recipes with automatic timer detection and management. Timers are extracted from recipe steps and presented contextually.

---

### 4.1 Cooking Mode Entry

#### Wireframe
```
┌─────────────────────────────────────────────┐
│ Pasta Primavera                             │
├─────────────────────────────────────────────┤
│                                             │
│ [Recipe Image]                              │
│                                             │
│ ⏱ 45 min total  👤 4 servings  📊 Medium    │
│                                             │
│ You'll need:                                │
│ • 2 lbs tomatoes                            │
│ • 1 cup heavy cream                         │
│ • 8 oz pasta                                │
│ • ... (5 more)                              │
│                                             │
│ 8 steps with 3 timers                       │
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │    🍳 Start Cooking Mode            │   │
│ └─────────────────────────────────────┘   │
│                                             │
│        [Back to Recipe]                     │
│                                             │
└─────────────────────────────────────────────┘

Pre-Cooking Checklist:
- Recipe overview
- Time and servings
- Ingredient checklist
- Number of steps and timers
- Large "Start" CTA
- Option to go back

Preparation:
- User can review before starting
- Check they have all ingredients
- Mental preparation for cooking time
- Understand complexity (timer count)
```

---

### 4.2 Cooking Mode - Active Step

#### Wireframe
```
┌─────────────────────────────────────────────┐
│ [×] Pasta Primavera            Step 3 of 8  │
├─────────────────────────────────────────────┤
│                                             │
│ ╔═══════════════════════════════════════╗ │
│ ║ ⏱ Boiling Pasta      [09:47]    [❚❚] ║ │ Active
│ ╚═══════════════════════════════════════╝ │ Timer
│                                             │
│ ───────────[========37%=========]─────────  │
│                                             │
│                                             │
│  Step 3: Boil the Pasta                    │
│                                             │
│  Bring a large pot of salted water to a    │
│  boil. Add the pasta and cook for 10       │
│  minutes until al dente, stirring          │
│  occasionally.                              │
│                                             │
│  You'll need for this step:                │
│  • 8 oz pasta                              │
│  • Salt                                    │
│  • Large pot                               │
│                                             │
│  ⏱ Suggested timer: 10 minutes             │
│     [Start Timer]                          │
│                                             │
│                                             │
│ [< Previous]              [Next Step >]     │
│                                             │
└─────────────────────────────────────────────┘

Components:
- Header:
  * Exit button
  * Recipe name
  * Step counter
- Active timers section (sticky top)
- Progress bar
- Current step content:
  * Step number and title
  * Detailed instructions (large text)
  * Ingredients needed for this step
  * Timer suggestion (if detected)
- Navigation buttons
  * Previous step
  * Next step (primary)

Features:
- Large, readable text (min 18px)
- Clear visual hierarchy
- Context-specific ingredients
- Auto-detected timer suggestions
- Easy navigation
```

#### Timer Detection Logic
```
Text Analysis:
"Cook for 10 minutes" → 10 min timer
"Simmer 20-25 minutes" → 25 min timer (use max)
"Bake at 350°F for 1 hour" → 60 min timer
"Let rest 5 minutes" → 5 min timer
"Refrigerate overnight" → No timer (>2 hours)

Keywords:
- cook, bake, simmer, boil, rest, marinate
- for, about, approximately
- minutes, hours, min, hr

Extraction:
- Parse step text for time patterns
- Extract duration
- Suggest timer with context from step
- User can accept or modify
```

---

### 4.3 Timer Management

#### Multiple Timers
```
┌─────────────────────────────────────────────┐
│ Active Timers                               │
├─────────────────────────────────────────────┤
│                                             │
│ ╔═══════════════════════════════════════╗ │
│ ║ ⏱ Boiling Pasta      [09:47]    [❚❚] ║ │
│ ║ ○○○○○○○○○○○○○○○○○○●●  (95%)         ║ │
│ ╚═══════════════════════════════════════╝ │
│                                             │
│ ╔═══════════════════════════════════════╗ │
│ ║ ⏱ Simmering Sauce    [14:23]    [❚❚] ║ │
│ ║ ○○○○○○○○○○○●●●●●●●●●  (52%)         ║ │
│ ╚═══════════════════════════════════════╝ │
│                                             │
│ ╔═══════════════════════════════════════╗ │
│ ║ ⏱ Resting Meat       [02:15]    [❚❚] ║ │
│ ║ ○○○○○●●●●●●●●●●●●●●●  (25%)         ║ │
│ ╚═══════════════════════════════════════╝ │
│                                             │
└─────────────────────────────────────────────┘

Timer Card Elements:
- Timer name (from step context)
- Countdown display (MM:SS)
- Pause/Resume button
- Visual progress indicator
- Percentage complete
- Distinct colors for each timer

Stacking:
- Vertical stack
- Most recent on top
- Scroll if many timers
- Max 5 concurrent
```

#### Timer States
```
RUNNING:
╔═══════════════════════════════════════╗
║ ⏱ Timer Name         [05:30]    [❚❚] ║
║ ○○○○○○○○○○●●●●●●●●●●  (55%)         ║
╚═══════════════════════════════════════╝
Color: Orange
Countdown: Active
Button: Pause

PAUSED:
╔═══════════════════════════════════════╗
║ ⏱ Timer Name  [⏸]   [05:30]     [▶]  ║
║ ○○○○○○○○○○●●●●●●●●●●  (55%)         ║
╚═══════════════════════════════════════╝
Color: Gray
Countdown: Frozen
Button: Resume
Indicator: Paused icon

COMPLETE:
╔═══════════════════════════════════════╗
║ ⏱ Timer Name   ✓    [00:00]     [×]  ║
║ ●●●●●●●●●●●●●●●●●●●●  (100%)        ║
╚═══════════════════════════════════════╝
Color: Green (pulsing)
Countdown: 00:00
Button: Dismiss
Animation: Pulse
Alert: Sound + vibration + notification
```

---

### 4.4 Timer Completion Alert

#### Wireframe
```
┌─────────────────────────────────────────────┐
│                                             │
│ ╔═══════════════════════════════════════╗ │
│ ║                                       ║ │
│ ║            ⏰                         ║ │
│ ║                                       ║ │
│ ║         Timer Complete!               ║ │
│ ║                                       ║ │
│ ║      Boiling Pasta                    ║ │
│ ║                                       ║ │
│ ║                                       ║ │
│ ║         [Dismiss]                     ║ │
│ ║                                       ║ │
│ ╚═══════════════════════════════════════╝ │
│                                             │
└─────────────────────────────────────────────┘

Modal Overlay:
- Full-screen takeover
- Semi-transparent dark background
- Center modal
- Large icon (alarm/bell)
- Timer name
- Dismiss button
- Auto-dismiss after 60s if no action

Alerts:
- Visual: Modal + animation
- Audio: Pleasant chime (not jarring)
- Haptic: Strong vibration
- Notification: If app backgrounded
- Persistent until acknowledged
```

---

### 4.5 Step Navigation

#### Wireframe - Bottom Navigation
```
┌─────────────────────────────────────────────┐
│                                             │
│ [Step content here...]                      │
│                                             │
│                                             │
│ ─────────────────────────────────────────── │
│                                             │
│ ┌──────────────┐            ┌──────────────┐│
│ │              │            │              ││
│ │  < Previous  │            │   Next >     ││
│ │              │            │              ││
│ └──────────────┘            └──────────────┘│
└─────────────────────────────────────────────┘

Navigation Buttons:
- Fixed bottom bar
- Previous (secondary style)
- Next (primary style)
- Disabled on first/last step
- Keyboard shortcuts: ← →
- Swipe gestures supported
```

#### Step Overview (Optional)
```
┌─────────────────────────────────────────────┐
│ [×] All Steps                               │
├─────────────────────────────────────────────┤
│                                             │
│ ✓ 1. Prep ingredients                      │
│ ✓ 2. Heat olive oil                        │
│ ○ 3. Boil pasta                ← Current   │
│ ○ 4. Cook sauce                            │
│ ○ 5. Combine                               │
│ ○ 6. Season                                │
│ ○ 7. Garnish                               │
│ ○ 8. Serve                                 │
│                                             │
└─────────────────────────────────────────────┘

Features:
- Accessed via header tap or swipe up
- Shows all steps at once
- Check marks for completed
- Current step highlighted
- Tap any step to jump there
- Quick navigation for experienced cooks
```

---

### 4.6 Cooking Complete

#### Wireframe
```
┌─────────────────────────────────────────────┐
│                                             │
│                                             │
│               🎉                            │
│                                             │
│          Recipe Complete!                   │
│                                             │
│      You've finished cooking                │
│         Pasta Primavera                     │
│                                             │
│     Total time: 42 minutes                  │
│                                             │
│                                             │
│     How was the recipe?                     │
│                                             │
│        ☆  ☆  ☆  ☆  ☆                      │
│                                             │
│                                             │
│  ┌───────────────────────────────────┐    │
│  │ Add notes or modifications...     │    │
│  │                                   │    │
│  └───────────────────────────────────┘    │
│                                             │
│                                             │
│  [Skip]          [Save & Finish]            │
│                                             │
└─────────────────────────────────────────────┘

Completion Flow:
1. Congratulatory message
2. Time summary
3. Rating prompt (1-5 stars)
4. Optional notes field
5. Save to update recipe metadata
6. Return to library/home

Tracking:
- Saves "last cooked" date
- Records cooking time
- Stores rating
- Saves notes/modifications
- Updates recipe popularity
```

---

### 4.7 Hands-Free Mode (Future Enhancement)

#### Wireframe Concept
```
┌─────────────────────────────────────────────┐
│                                             │
│                                             │
│             🎤                              │
│                                             │
│        Listening for commands...            │
│                                             │
│                                             │
│ ─────────────────────────────────────────── │
│                                             │
│  Step 3: Boil the pasta                    │
│                                             │
│  Bring a large pot of salted water to...   │
│                                             │
│                                             │
│ ─────────────────────────────────────────── │
│                                             │
│  Try saying:                                │
│  • "Next step"                             │
│  • "Set timer for 10 minutes"              │
│  • "Repeat instructions"                    │
│  • "Pause timer"                           │
│                                             │
└─────────────────────────────────────────────┘

Voice Commands:
- "Next step" / "Previous step"
- "Start timer [duration]"
- "Pause timer" / "Resume timer"
- "Repeat instructions"
- "Show ingredients"
- "Exit cooking mode"

Benefits:
- No need to touch screen with messy hands
- Eyes on cooking, not device
- Natural interaction
- Accessibility improvement
```

---

## Design Rationale

### Shopping List Decisions

**Why category grouping?**
- Mirrors physical store layout
- Reduces shopping time by 30-40%
- Prevents backtracking in store
- Familiar mental model

**Why show recipe sources?**
- Helps understand why item needed
- Enables informed substitutions
- Allows selective exclusion
- Builds trust in system

**Why combine quantities?**
- Reduces list length
- Simplifies shopping
- Shows total amount needed
- Prevents duplicate purchases

**Why large checkboxes?**
- Used while shopping (on the go)
- Often one-handed operation
- May be wearing gloves
- Accessibility for all users

### Timer Design Decisions

**Why auto-detect timers?**
- Saves manual setup time
- Reduces cognitive load
- Prevents missed timings
- Suggests optimal times

**Why show multiple timers?**
- Real recipes need concurrent timers
- Professional cooking technique
- Parallel cooking efficiency
- Better time management

**Why contextual timer names?**
- Easy to identify which dish
- Helps with multiple recipes
- Reduces confusion
- Clearer than "Timer 1, Timer 2"

**Why persistent alerts?**
- Critical for food safety (overcooking)
- User may be away from device
- Can't rely on user attention
- Must be acknowledged, not missed

**Why step-by-step mode?**
- Reduces cognitive overload
- Focus on current task
- Prevents mistakes
- Matches real cooking behavior

---

## Information Architecture

### Shopping List IA
```
Shopping Lists (Home)
├── Active Lists
│   ├── List Detail
│   │   ├── Recipe Sources
│   │   ├── Progress Indicator
│   │   ├── Category Sections
│   │   │   └── Ingredient Items
│   │   └── Custom Items
│   └── Add to List Modal
│       ├── Servings Adjuster
│       ├── Ingredient Selection
│       └── List Selection
└── Completed Lists
    └── Archived List Detail
```

### Cooking Mode IA
```
Recipe Detail
└── Start Cooking Mode
    ├── Pre-Cooking Overview
    │   ├── Ingredients Checklist
    │   ├── Time Summary
    │   └── Equipment Needed
    ├── Active Cooking
    │   ├── Step Navigation
    │   │   ├── Current Step
    │   │   ├── Instructions
    │   │   ├── Step Ingredients
    │   │   └── Timer Suggestions
    │   ├── Timer Management
    │   │   ├── Active Timers
    │   │   ├── Timer Controls
    │   │   └── Completion Alerts
    │   └── Step Overview
    └── Completion
        ├── Rating
        ├── Notes
        └── Summary
```

---

## Interaction Patterns

### Shopping List Gestures
- **Tap checkbox**: Check/uncheck item
- **Tap item**: View details/edit
- **Swipe left**: Delete item
- **Swipe right**: Move to category
- **Long press**: Multi-select mode
- **Pull down**: Refresh/sync
- **Pull up**: Show completed items

### Cooking Mode Gestures
- **Swipe left**: Next step
- **Swipe right**: Previous step
- **Tap timer**: Pause/resume
- **Swipe down**: Exit cooking mode
- **Pinch out**: Zoom text (accessibility)
- **Two-finger tap**: Voice commands (future)

---

## Mobile Optimizations

### Shopping List
- **Large tap targets**: 52px minimum
- **High contrast**: Readable in store lighting
- **Offline capable**: Works without internet
- **Quick actions**: Minimal taps to check items
- **Auto-save**: No manual save needed
- **Battery efficient**: Minimal background activity

### Cooking Mode
- **Screen wake lock**: Stays on during cooking
- **Splash resistant**: Minimize taps
- **Large text**: Readable from distance
- **Simple navigation**: Big next/previous buttons
- **Audio alerts**: Don't rely on visual only
- **Brightness boost**: Override low brightness

---

## Accessibility Considerations

### Shopping List
- **Screen reader**: Full item descriptions
- **Voice control**: "Check tomatoes"
- **High contrast mode**: Enhanced visibility
- **Font scaling**: Respects system settings
- **Color blind friendly**: Not relying on color alone
- **Keyboard navigation**: Full support

### Cooking Mode
- **Read aloud**: Step instructions
- **Voice commands**: Hands-free operation
- **Adjustable text**: Up to 200% scaling
- **Timer announcements**: Audio feedback
- **Reduced motion**: Optional animations
- **Focus indicators**: Clear keyboard focus

---

## Technical Considerations

### Shopping List
```typescript
// Data structure
interface ShoppingList {
  id: string;
  name: string;
  recipes: string[];
  items: ShoppingItem[];
  createdAt: Date;
  completedAt?: Date;
}

interface ShoppingItem {
  id: string;
  ingredient: string;
  quantity: number;
  unit: string;
  category: string;
  recipeIds: string[];
  checked: boolean;
  customItem: boolean;
}

// Storage
- LocalStorage for offline support
- IndexedDB for large lists
- Sync to cloud when online
- Conflict resolution for multi-device
```

### Timer System
```typescript
// Data structure
interface Timer {
  id: string;
  name: string;
  duration: number; // seconds
  remaining: number;
  status: 'running' | 'paused' | 'completed';
  stepNumber: number;
  createdAt: Date;
}

// Implementation
- Web Workers for accuracy
- Wake Lock API for screen
- Notification API for alerts
- Audio API for sounds
- Vibration API for haptics
- Service Worker for background timers
```

---

## Future Enhancements

### Shopping List
1. **Store integration**: Aisle mapping for specific stores
2. **Price tracking**: Historical prices, deal alerts
3. **Shared lists**: Collaborative shopping with family
4. **Barcode scanning**: Add items via scan
5. **Delivery integration**: Order through app
6. **Inventory sync**: Track pantry items

### Timers
1. **Smart home integration**: Control ovens/timers
2. **Temperature monitoring**: Connected thermometers
3. **Step photos**: Visual guides for each step
4. **Video tutorials**: Embedded technique videos
5. **Live coaching**: AR overlay on real cooking
6. **Multi-recipe mode**: Cook multiple recipes together

---

## Conclusion

These wireframes establish the foundational structure for the **Shopping List** and **Cooking Mode with Timers** features. While implemented, this documentation captures the design thinking, user flows, and interaction patterns that guide the user experience. The focus is on:

- **Efficiency**: Minimal friction from intent to action
- **Context**: Information when and where needed
- **Forgiveness**: Easy to undo and correct
- **Clarity**: Clear visual hierarchy and labeling
- **Delight**: Thoughtful interactions and feedback

Both features transform the cooking experience from prep through completion, making the app indispensable for everyday cooking.
