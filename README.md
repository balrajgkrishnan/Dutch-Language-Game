# Dutch Language Game 🇳🇱

An interactive educational game designed to help children learn Dutch through engaging RPG-style adventures, vocabulary exercises, and reading comprehension activities.

## 🎯 Purpose

This application creates personalized Dutch learning experiences for:

- **Younger learners (Groep 3-4 / AVI M3-E4 level)** - Focus on high-frequency words, simple conjunctions, and context guessing
- **Older learners (Groep 5-6 / AVI M5-E6 level)** - Focus on signal words, pronoun references, main ideas, and cause-and-effect

## ✨ Features

### Core Functionality

- **Interactive RPG Stories** - Choose-your-own-adventure style stories featuring protagonists Ridheya and Hemali
- **Vocabulary Building** - Contextual vocabulary learning with Dutch-English translations
- **Dictionary Service** - Comprehensive Dutch dictionary with compound word breakdowns
- **Reading Comprehension** - Cito-style exercises integrated into story progression
- **Progress Tracking** - Track learning progress through the adventure

### Technical Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4.x
- **Build Tool**: Vite
- **Animation**: Motion (Framer Motion)
- **Icons**: Lucide React
- **AI Integration**: Google GenAI for content generation

## 📁 Project Structure

```text
Dutch-Language-Game/
├── src/
│   ├── components/     # React components
│   ├── data/          # Data files (dictionary, vocabulary bank)
│   ├── services/      # Business logic (dictionary service)
│   └── ...
├── scripts/           # Utility scripts
├── public/           # Static assets
└── ...
```

## 🚀 Recent Updates

### Latest Changes (August 2026)

- **Enhanced Dictionary Service** (`src/services/dutchDictionaryService.ts`)
  - Improved word lookup algorithms
  - Better compound word decomposition
  - Enhanced translation accuracy

- **Updated Vocabulary Bank** (`src/data/dutchVocabularyBank.ts`)
  - Expanded word collection
  - Refined categorization
  - Added more context examples

- **Dictionary Data Improvements** (`src/data/dutchDictionaryData.ts`)
  - Additional Dutch words and phrases
  - Improved data structure for faster lookups

- **New Validation Scripts**
  - `scripts/testDictionaryRules.ts` - Test dictionary consistency
  - `scripts/validateDictionary.ts` - Validate dictionary data integrity

## 🛠️ Development

### Prerequisites

- Node.js (latest LTS recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

### Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run clean` - Clean build artifacts
- `npm run lint` - Run TypeScript checks

## 📖 Story Characters

### Ridheya (Younger Protagonist)

- **Persona**: Curious explorer, brave, observant, nature & animal lover
- **Appearance**: Young girl, brown hair, brown eyes, clear round glasses
- **Gear**: Adventurer outfit, magnifying glass or wooden staff

### Hemali (Older Protagonist)

- **Persona**: Intellectual, clever, problem-solver, magical/detective mindset
- **Appearance**: Older girl, long straight dark hair, warm brown eyes
- **Gear**: Scholar/Mage outfit, spellbook or detective notebook

## 📚 Learning Approach

The game follows a phased learning strategy:

1. **Phase 1**: RPG stories with in-text vocabulary highlighting and bilingual footnotes
2. **Phase 2**: Compound word decomposition practice
3. **Phase 3**: Complex sentence structures and passive voice
4. **Phase 4**: Transition to real Dutch books

## 📄 License

Private project - All rights reserved.

---

*Built with ❤️ for Dutch language learners*
