# Cooking Companion 🍳

> **NoBroker Frontend Design Assignment 2025**
>
> A complete cooking app design and implementation - from ingredient discovery to recipe execution

An AI-powered cooking companion that solves the "what should I cook tonight?" problem through an integrated experience covering ingredient scanning, recipe management, shopping lists, and cooking guidance with smart timers.

---

## 📋 Assignment Deliverables

This repository contains a **complete design delivery** including:

✅ **Complete User Flows** - Full journey documentation from app open to recipe completion
✅ **Hi-Fidelity UI Screens** - Ingredient Scanner & Recipe Library with detailed specifications
✅ **Wireframes** - Shopping List & Cooking Mode with Timers
✅ **Design Process Documentation** - Design thinking, research insights, and decision rationale
✅ **Working Implementation** - Fully functional Next.js application
✅ **Presentation Guide** - How to present this work effectively

### Quick Start

**View Documentation**: [`DELIVERY.md`](DELIVERY.md) - Complete delivery overview
**Run the App**: See [Setup Instructions](#-setup--installation) below
**Present the Work**: [`PRESENTATION_GUIDE.md`](PRESENTATION_GUIDE.md)

---

## ✨ Features

### 1. Smart Ingredient Scanner 🔍
- AI-powered recipe generation from available ingredients
- Manual ingredient input with intelligent suggestions
- Real-time recipe creation using OpenAI GPT-4
- Fallback recipes for offline/error scenarios

### 2. Recipe Library 📚
- Personal recipe collection management
- Custom collections and favorites
- Search and filter capabilities
- Import recipes from external sources
- Rich recipe details with nutritional info

### 3. Shopping List 🛒
- Auto-generate shopping lists from recipes
- Intelligent quantity combining and aggregation
- Category-based organization (Produce, Dairy, Meat, etc.)
- Mobile-optimized shopping mode
- Check-off items with progress tracking

### 4. Cooking Mode with Timers ⏱️
- Step-by-step cooking guidance
- Automatic timer detection from recipe steps
- Multiple concurrent timers with contextual naming
- Visual and audio notifications
- Hands-free friendly design

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript, Next.js 15
- **Styling**: TailwindCSS v4
- **Icons**: Heroicons, Lucide React
- **AI Integration**: OpenAI API with structured output using Zod
- **Development**: Turbopack for blazing-fast development
- **Type Safety**: Full TypeScript support throughout

## 🛠️ Setup & Installation

### Prerequisites

1. **Node.js** (v18 or higher)
2. **OpenAI API Key** - Get yours from [OpenAI Platform](https://platform.openai.com/api-keys)

### Installation Steps

1. **Clone and install dependencies**:
   ```bash
   git clone <your-repo-url>
   cd whats-in-the-fridge
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   # Create .env.local file
   echo "OPENAI_API_KEY=your_actual_api_key_here" > .env.local
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open the app**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

1. **Add Ingredients**: Type ingredients you have in your fridge and click the "+" button
2. **Generate Recipes**: Click "Generate Recipes" to get AI-powered suggestions
3. **Browse Results**: View detailed recipes with ingredients lists and step-by-step instructions
4. **Cook & Enjoy**: Follow the instructions to create delicious meals!

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration

The app uses OpenAI's GPT-4 model for recipe generation. You can modify the AI prompt and model settings in `src/app/api/recipes/route.ts`.

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [**DELIVERY.md**](DELIVERY.md) | Main delivery document with overview and checklist |
| [**docs/USER_FLOWS.md**](docs/USER_FLOWS.md) | Complete user flow documentation |
| [**docs/UI_SPECIFICATIONS.md**](docs/UI_SPECIFICATIONS.md) | Hi-fidelity UI specs for Scanner & Library |
| [**docs/WIREFRAMES.md**](docs/WIREFRAMES.md) | Wireframes for Shopping List & Timers |
| [**DESIGN_PROCESS.md**](DESIGN_PROCESS.md) | Design thinking and decision rationale |
| [**PRESENTATION_GUIDE.md**](PRESENTATION_GUIDE.md) | How to present this project |
| [**SETUP.md**](SETUP.md) | Technical setup instructions |

## 🎨 Design Highlights

- **Mobile-First**: Designed for kitchen use on phones
- **Warm Color Palette**: Orange/Red/Pink gradients for appetite stimulation
- **Accessible**: WCAG AA compliant, keyboard navigation, screen reader support
- **Offline-First**: Works without internet for saved recipes
- **Type-Safe**: Full TypeScript implementation
- **Performance**: Optimized loading, code splitting, lazy loading

## 🏗️ Project Structure

```
NoBroker_Assignment_2025/
├── docs/                      # Complete design documentation
│   ├── USER_FLOWS.md
│   ├── UI_SPECIFICATIONS.md
│   └── WIREFRAMES.md
├── src/
│   └── app/
│       ├── components/        # React components
│       ├── api/              # API routes (AI integration)
│       ├── hooks/            # Custom React hooks
│       ├── types/            # TypeScript types
│       └── utils/            # Utility functions
├── DELIVERY.md               # Main delivery document
├── DESIGN_PROCESS.md         # Design thinking documentation
├── PRESENTATION_GUIDE.md     # Presentation recommendations
└── README.md                # This file
```

## 🎯 Success Metrics

**User Engagement**:
- Time from app open to cooking: < 2 minutes
- Recipe save rate: > 60%
- Cooking mode completion: > 70%

**Technical Performance**:
- Recipe generation: < 5 seconds
- Initial page load: < 2 seconds
- Offline functionality: 100% for saved recipes

## 🚀 Future Enhancements

- Meal planning calendar
- Social recipe sharing
- Voice control for hands-free cooking
- Ingredient photo scanning (computer vision)
- Nutritional tracking
- Smart home integrations

## 👨‍💻 About

**Assignment**: NoBroker Frontend Design Challenge 2025
**Author**: Arghaweeb
**Repository**: [GitHub](https://github.com/Arghaweeb/NoBroker_Assignment_2025)

## 🤝 Contributing

This is an assignment submission, but feedback and suggestions are welcome! Feel free to:
- Open issues for bugs or suggestions
- Propose enhancements via pull requests
- Share your thoughts on the design decisions

---

**Happy Cooking!** 👨‍🍳👩‍🍳

*From ingredients to delicious meals - your complete kitchen companion*
