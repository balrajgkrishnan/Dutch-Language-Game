# Bento Home Screen Redesign (Phase 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the scattered navigation (5 nav tabs, hero card, 4 bento cards, icon row, footer buttons) with one grouped bento grid, surface 4 fully-built-but-unreachable modals, and delete the offline-HTML download feature.

**Architecture:** A new data module (`src/data/homeTiles.ts`) describes all 16 tiles as plain objects grouped into Learn/Play/Explore/Progress; a new presentational component (`src/components/BentoTile.tsx`) renders one tile from that data; `App.tsx` builds the tile array from its existing state setters (no new state) and renders it grouped; `TopBar.tsx` loses its nav-tabs and 4 of its 6 icon buttons.

**Tech Stack:** React 19 + TypeScript, Tailwind CSS 4, existing `lucide-react`/emoji conventions already in the codebase.

**Verification bar:** No test framework exists in this repo (confirmed in `docs/HANDOFF.md`). Per explicit user instruction, this plan does **not** include Playwright/live-browser steps — the user will test the shipped result themselves. Every task's check step is `npm run lint` (= `tsc --noEmit`).

---

### Task 1: `HomeTile` data module

**Files:**
- Create: `src/data/homeTiles.ts`

- [ ] **Step 1: Write the data module**

```ts
// src/data/homeTiles.ts
export type HomeTileGroup = 'learn' | 'play' | 'explore' | 'progress';
export type HomeTileSize = 'standard' | 'large' | 'xl';

export interface HomeTile {
  id: string;
  group: HomeTileGroup;
  title: string;
  subtitle: string;
  emoji: string;
  size: HomeTileSize;
  accented?: boolean;
  theme: string;
  onClick: () => void;
}

const THEMES: Record<HomeTileGroup, string> = {
  learn: 'from-slate-900 to-emerald-950 border-emerald-500/40 hover:border-emerald-400/70',
  play: 'from-slate-900 via-purple-950 to-indigo-950 border-pink-500/40 hover:border-pink-300',
  explore: 'from-slate-900 to-amber-950 border-amber-500/40 hover:border-amber-400/60',
  progress: 'from-slate-900 to-indigo-950 border-indigo-500/40 hover:border-indigo-300'
};

export interface HomeTileHandlers {
  openRpgAdventure: () => void;
  openReading: () => void;
  openVerbArena: () => void;
  openDictionary: () => void;
  openReporter: () => void;
  openSpellingFactory: () => void;
  openArcade: () => void;
  openBossArena: () => void;
  openTamagotchi: () => void;
  openSisterTeam: () => void;
  openExpedition: () => void;
  goToSanctuary: () => void;
  goToMap: () => void;
  openVetHospital: () => void;
  goToBadges: () => void;
  openScoreboard: () => void;
}

export interface HomeTileContext {
  rpgEmoji: string;
  rpgTitle: string;
  rpgSubtitle: string;
  expeditionEmoji: string;
  expeditionTitle: string;
  expeditionSubtitle: string;
}

export function buildHomeTiles(handlers: HomeTileHandlers, ctx: HomeTileContext): HomeTile[] {
  return [
    // Learn
    {
      id: 'reading', group: 'learn', size: 'large', emoji: '📖',
      title: 'Voorleesavonturen',
      subtitle: 'Beleef verhalen als een echt prentenboek, pagina voor pagina!',
      theme: THEMES.learn, onClick: handlers.openReading
    },
    {
      id: 'verb-zones', group: 'learn', size: 'standard', accented: true, emoji: '⚡',
      title: 'Sterke Werkwoorden Zones',
      subtitle: '10 zones, 200 werkwoorden, verdien een dierbeloning per zone!',
      theme: THEMES.learn, onClick: handlers.openVerbArena
    },
    {
      id: 'dictionary', group: 'learn', size: 'standard', emoji: '📚',
      title: 'Nederlands Woordenboek',
      subtitle: '7-traps woordontleding, Cito signaalwoorden & synoniemen!',
      theme: THEMES.learn, onClick: handlers.openDictionary
    },
    {
      id: 'reporter', group: 'learn', size: 'standard', emoji: '📰',
      title: "Hemali's Reporter Missie",
      subtitle: 'Onderzoek het safaripark als een echte verslaggever!',
      theme: THEMES.learn, onClick: handlers.openReporter
    },
    {
      id: 'spelling-factory', group: 'learn', size: 'standard', emoji: '🧪',
      title: "Ridheya's Spelling Fabriek",
      subtitle: 'Maak nieuwe woorden in de magische spellingfabriek!',
      theme: THEMES.learn, onClick: handlers.openSpellingFactory
    },
    // Play
    {
      id: 'arcade', group: 'play', size: 'standard', emoji: '🕹️',
      title: 'Safari Arcade Arena',
      subtitle: 'Ballon Popper, Woord Sprint & Cito Turbo Dash!',
      theme: THEMES.play, onClick: handlers.openArcade
    },
    {
      id: 'boss-arena', group: 'play', size: 'standard', emoji: '⚔️',
      title: 'Poké-Boss Duel Arena',
      subtitle: "Vecht tegen de DT-Draak, 't Kofschip & de Klanken-Golem!",
      theme: THEMES.play, onClick: handlers.openBossArena
    },
    {
      id: 'tamagotchi', group: 'play', size: 'standard', emoji: '🐾',
      title: 'Dierenkamer',
      subtitle: 'Verzorg, aai en voed je huisdier in de Dierenkamer!',
      theme: THEMES.play, onClick: handlers.openTamagotchi
    },
    {
      id: 'sister-team', group: 'play', size: 'standard', emoji: '🤝',
      title: 'Sister Team Samen-Quest',
      subtitle: 'Werk samen met je zus aan een speciale missie!',
      theme: THEMES.play, onClick: handlers.openSisterTeam
    },
    // Explore
    {
      id: 'expedition', group: 'explore', size: 'standard', emoji: ctx.expeditionEmoji,
      title: ctx.expeditionTitle,
      subtitle: ctx.expeditionSubtitle,
      theme: THEMES.explore, onClick: handlers.openExpedition
    },
    {
      id: 'sanctuary', group: 'explore', size: 'standard', emoji: '🦁',
      title: 'Dierenpark',
      subtitle: 'Bekijk en verzorg al je ontgrendelde dieren!',
      theme: THEMES.explore, onClick: handlers.goToSanctuary
    },
    {
      id: 'map', group: 'explore', size: 'standard', emoji: '🗺️',
      title: 'Wereldkaart',
      subtitle: 'Kies uit 7 werelddelen om te verkennen!',
      theme: THEMES.explore, onClick: handlers.goToMap
    },
    {
      id: 'vet-hospital', group: 'explore', size: 'standard', emoji: '🏥',
      title: 'Dierenziekenhuis',
      subtitle: 'Help Dokter Ridheya zieke dieren beter maken!',
      theme: THEMES.explore, onClick: handlers.openVetHospital
    },
    // Progress
    {
      id: 'rpg-adventure', group: 'progress', size: 'xl', emoji: ctx.rpgEmoji,
      title: ctx.rpgTitle,
      subtitle: ctx.rpgSubtitle,
      theme: THEMES.progress, onClick: handlers.openRpgAdventure
    },
    {
      id: 'badges', group: 'progress', size: 'standard', emoji: '🏅',
      title: 'Medailles',
      subtitle: 'Bekijk al je verdiende badges en prestaties!',
      theme: THEMES.progress, onClick: handlers.goToBadges
    },
    {
      id: 'scoreboard', group: 'progress', size: 'standard', emoji: '📊',
      title: 'Ouder Scorebord',
      subtitle: 'Bekijk de voortgang en statistieken van je kind!',
      theme: THEMES.progress, onClick: handlers.openScoreboard
    }
  ];
}

export const HOME_TILE_GROUP_LABELS: Record<HomeTileGroup, string> = {
  learn: '📖 Leren',
  play: '🎮 Spelen',
  explore: '🧭 Ontdekken',
  progress: '🏆 Voortgang'
};
```

- [ ] **Step 2: Type-check**

Run: `npm run lint`
Expected: no new errors (this file has no consumers yet, so it must compile standalone — check for typos in the object literals).

- [ ] **Step 3: Commit**

```bash
git add src/data/homeTiles.ts
git commit -m "feat: add HOME_TILES data module for bento home screen"
```

---

### Task 2: `BentoTile` component

**Files:**
- Create: `src/components/BentoTile.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/BentoTile.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { sound } from '../services/soundService';
import { HomeTile } from '../data/homeTiles';

interface BentoTileProps {
  tile: HomeTile;
}

const SIZE_CLASSES: Record<HomeTile['size'], string> = {
  standard: 'col-span-1 p-3.5',
  large: 'col-span-2 p-4',
  xl: 'col-span-2 p-5 sm:p-6'
};

export const BentoTile: React.FC<BentoTileProps> = ({ tile }) => {
  const isXl = tile.size === 'xl';

  return (
    <div
      onClick={() => {
        sound.playPop();
        tile.onClick();
      }}
      className={`bg-gradient-to-br ${tile.theme} ${SIZE_CLASSES[tile.size]} border ${
        tile.accented ? 'ring-2 ring-amber-400/60' : ''
      } rounded-2xl text-white flex flex-col justify-between gap-3 shadow-md transition-all hover:scale-[1.02] cursor-pointer group`}
    >
      <div className="space-y-1.5">
        <span
          className={`inline-flex items-center justify-center rounded-xl bg-white/10 border border-white/20 group-hover:rotate-6 transition-transform ${
            isXl ? 'w-14 h-14 text-3xl' : 'w-9 h-9 text-xl'
          }`}
        >
          {tile.emoji}
        </span>
        <h4 className={`font-black text-white ${isXl ? 'text-lg sm:text-xl' : 'text-sm'}`}>
          {tile.title}
        </h4>
        <p className={`text-slate-300 font-medium ${isXl ? 'text-sm' : 'text-xs'} line-clamp-2`}>
          {tile.subtitle}
        </p>
      </div>

      <div className="pt-2 flex items-center justify-between text-xs font-black text-white/80 border-t border-white/10">
        <span>Openen</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Type-check**

Run: `npm run lint`
Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/BentoTile.tsx
git commit -m "feat: add BentoTile presentational component"
```

---

### Task 3: Wire `openVerbArena` + build tiles + render the grouped grid in `App.tsx`

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add imports**

Add to the top imports (near the other component imports):

```ts
import { BentoTile } from './components/BentoTile';
import { buildHomeTiles, HOME_TILE_GROUP_LABELS, HomeTileGroup } from './data/homeTiles';
```

- [ ] **Step 2: Add `openVerbArena` next to `handleSwitchUser`**

In `App.tsx`, immediately after the `handleSwitchUser` function (ends at the line with `setShowLoginModal(false); };`), add:

```ts
  // Opens the Sterke Werkwoorden zone arena directly, forcing Hemali's
  // groep68Mode toggle so the tile doesn't land on the plain expedition view.
  const openVerbArena = () => {
    if (profile.selectedGrade === 'group_6_7_8') {
      setGroep68Mode('verb_arena');
    }
    setIsExpeditionActive(true);
  };
```

- [ ] **Step 3: Build the tile array**

Immediately before the `return (` statement (after `const fontClass = ...` / `const sizeClass = ...` block), add:

```ts
  const rpgEmoji = isRidheya ? '🩺' : '✨';
  const rpgTitle = isRidheya
    ? 'Het Geheim van de Boomhut Dierenkliniek & De Dierenvallei 🐾'
    : 'Het Verloren Astrolabium & Het Mysterie van de Cito Tijdwachters 📜';
  const rpgSubtitle = isRidheya
    ? 'Reis met Ridheya en hondje Kopi door het oerwoud, ontdek moeilijke woorden met het pop-up woordenboek en genees dieren!'
    : 'Ontrafel cryptische manuscripten, kraak moeilijke signaalwoorden (desondanks, daarentegen) en kies je eigen verhaalroute!';

  const homeTiles = buildHomeTiles(
    {
      openRpgAdventure: () => setShowCitoRpgModal(true),
      openReading: () => setShowReadingModal(true),
      openVerbArena,
      openDictionary: () => setShowDictionaryModal(true),
      openReporter: () => setShowReporterModal(true),
      openSpellingFactory: () => setShowSpellingFactoryModal(true),
      openArcade: () => setShowArcadeModal(true),
      openBossArena: () => setShowBossArenaModal(true),
      openTamagotchi: () => setShowTamagotchiModal(true),
      openSisterTeam: () => setShowSisterTeamModal(true),
      openExpedition: () => setIsExpeditionActive(true),
      goToSanctuary: () => setActiveTab('sanctuary'),
      goToMap: () => setActiveTab('map'),
      openVetHospital: () => setShowVetHospitalModal(true),
      goToBadges: () => setActiveTab('badges'),
      openScoreboard: () => setShowScoreboardModal(true)
    },
    {
      rpgEmoji,
      rpgTitle,
      rpgSubtitle,
      expeditionEmoji: activeBiomeConfig.emoji,
      expeditionTitle: `${activeBiomeConfig.name} Expeditie`,
      expeditionSubtitle: `${currentLevel.title} • Level ${currentBiomeLevelIdx + 1} van ${biomeLevels.length}`
    }
  );

  const HOME_TILE_GROUPS: HomeTileGroup[] = ['learn', 'play', 'explore', 'progress'];
```

- [ ] **Step 4: Delete the "Kies Avonturier" banner**

Find and delete this entire block (it sits right after `{activeTab === 'adventure' && (` and `<div className="space-y-4">`, right before the `{isExpeditionActive ? (` line):

```tsx
              {/* 1. Quick Sister Switcher Banner (1-tap between Ridheya Gr 5 & Hemali Gr 8) */}
              <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/15 shadow-md flex items-center justify-between gap-2.5 flex-wrap">
                <div className="flex items-center gap-2 pl-1">
                  <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                    <span>👑</span>
                    <span>Kies Avonturier:</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => {
                      if (currentUsername.toLowerCase() !== 'ridheya') {
                        sound.playPop();
                        handleSwitchUser('ridheya');
                        setIsExpeditionActive(false);
                      }
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                      currentUsername.toLowerCase() === 'ridheya'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md scale-102 ring-2 ring-emerald-300'
                        : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                    }`}
                  >
                    <span className="text-sm">🩺</span>
                    <div className="text-left leading-tight">
                      <div className="font-black">Ridheya (Groep 5)</div>
                      <div className="text-[10px] text-emerald-100 font-medium opacity-90">Dierenarts &amp; AVI M3-E4</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      if (currentUsername.toLowerCase() !== 'hemali') {
                        sound.playPop();
                        handleSwitchUser('hemali');
                        setIsExpeditionActive(false);
                      }
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                      currentUsername.toLowerCase() === 'hemali'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md scale-102 ring-2 ring-indigo-300'
                        : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                    }`}
                  >
                    <span className="text-sm">✨</span>
                    <div className="text-left leading-tight">
                      <div className="font-black">Hemali (Groep 8)</div>
                      <div className="text-[10px] text-indigo-100 font-medium opacity-90">Cito Master &amp; Doorstroomtoets</div>
                    </div>
                  </button>
                </div>
              </div>

```

(Leave the `{isExpeditionActive ? (` line and everything below it — expedition mode itself is unchanged.)

- [ ] **Step 5: Replace the home-hub view (hero card + active-expedition card + 4 bento cards) with the grouped tile grid**

Find the block starting at `/* VIEW B: CLEAN HOME HUB ... */` and ending at the `)}` that closes it (this spans the hero RPG card, the "Linked Safari Expeditie Launch Card", and the "4 Core Game Bento Modules" grid — the whole `<div className="space-y-4">...</div>` under the `) : (` for `isExpeditionActive`). Replace the entire inner content of that div with:

```tsx
                <div className="space-y-5">
                  {HOME_TILE_GROUPS.map(group => (
                    <div key={group} className="space-y-2">
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 pl-1">
                        {HOME_TILE_GROUP_LABELS[group]}
                      </h3>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {homeTiles
                          .filter(tile => tile.group === group)
                          .map(tile => (
                            <BentoTile key={tile.id} tile={tile} />
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
```

So the surrounding structure becomes:

```tsx
              ) : (
                /* VIEW B: CLEAN HOME HUB (grouped bento tile grid) */
                <div className="space-y-5">
                  {HOME_TILE_GROUPS.map(group => (
                    <div key={group} className="space-y-2">
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 pl-1">
                        {HOME_TILE_GROUP_LABELS[group]}
                      </h3>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {homeTiles
                          .filter(tile => tile.group === group)
                          .map(tile => (
                            <BentoTile key={tile.id} tile={tile} />
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
```

- [ ] **Step 6: Type-check**

Run: `npm run lint`
Expected: no new errors. (Existing errors, if any, must be unrelated — do not proceed if this introduces new ones; fix before moving on.)

- [ ] **Step 7: Commit**

```bash
git add src/App.tsx
git commit -m "feat: render grouped bento tile grid on the home screen"
```

---

### Task 4: Footer simplification + version label + reset button relocation

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Replace the footer**

Find the `<footer ...>...</footer>` block (starts `{/* Footer Controls & Reset */}`) and replace its inner content:

```tsx
      {/* Footer Controls & Reset */}
      <footer className="w-full max-w-5xl mx-auto px-4 mt-8 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium gap-3 relative z-10">
        <div className="flex items-center gap-2">
          <span>🌍 Wereld Safaripark &amp; Boerderij</span>
          <span>•</span>
          <span>7 Wereldlocaties • 42 Dieren • Groep 4-5 &amp; Groep 6-7-8</span>
        </div>

        <button
          onClick={() => setShowVersionModal(true)}
          className="text-slate-400 hover:text-slate-600 font-bold text-[11px] cursor-pointer"
          title="Versie-informatie"
        >
          v8.0.1
        </button>
      </footer>
```

- [ ] **Step 2: Move "Herstart" into `TopBar`**

Remove the `handleResetProgress` button that used to live in the footer (already deleted by Step 1 — it's gone since the whole button row is replaced). `handleResetProgress` itself stays defined in `App.tsx`; it will be passed to `TopBar` as a new prop in Task 5.

- [ ] **Step 3: Type-check**

Run: `npm run lint`
Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: simplify footer, make version modal reachable"
```

---

### Task 5: Remove dead imports, update the `TopBar` call site, delete offline-HTML wiring in `App.tsx`

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Remove dead imports**

Delete these two lines from the top of `App.tsx`:

```ts
import { GradeSwitcherBar } from './components/GradeSwitcherBar';
```
```ts
import { CompanionCard } from './components/CompanionCard';
```

- [ ] **Step 2: Update the `TopBar` render call**

Replace the current `<TopBar ... />` call:

```tsx
      <TopBar
        playerName={profile.name}
        avatarEmoji={profile.avatarEmoji}
        avatarTitle={profile.avatarTitle}
        tocaCustomization={(profile.customization as any)?.toca}
        onOpenProfileModal={() => setShowProfileModal(true)}
        onOpenLoginModal={() => setShowLoginModal(true)}
        onOpenScoreboardModal={() => setShowScoreboardModal(true)}
        onOpenReadingModal={() => setShowReadingModal(true)}
        onOpenReporterModal={() => setShowReporterModal(true)}
        onOpenSpellingFactoryModal={() => setShowSpellingFactoryModal(true)}
        onOpenSisterTeamModal={() => setShowSisterTeamModal(true)}
        onOpenWardrobeModal={() => setShowWardrobeModal(true)}
        onOpenVersionModal={() => setShowVersionModal(true)}
        onOpenVetHospitalModal={() => setShowVetHospitalModal(true)}
        onOpenCitoRpgModal={() => setShowCitoRpgModal(true)}
        onOpenVoiceModal={() => setShowVoiceModal(true)}
        onOpenDictionaryModal={() => setShowDictionaryModal(true)}
        onOpenArcadeModal={() => setShowArcadeModal(true)}
        stars={profile.stars}
        score={profile.score}
        streak={profile.streak}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        unlockedCount={unlockedCount}
        totalAnimals={totalAnimals}
        selectedGrade={profile.selectedGrade}
        selectedBiome={selectedBiome}
        onOpenGradeSelector={() => setShowGradeModal(true)}
      />
```

with:

```tsx
      <TopBar
        playerName={profile.name}
        avatarEmoji={profile.avatarEmoji}
        avatarTitle={profile.avatarTitle}
        tocaCustomization={(profile.customization as any)?.toca}
        onOpenProfileModal={() => setShowProfileModal(true)}
        onOpenLoginModal={() => setShowLoginModal(true)}
        onOpenWardrobeModal={() => setShowWardrobeModal(true)}
        onOpenVoiceModal={() => setShowVoiceModal(true)}
        onResetProgress={handleResetProgress}
        stars={profile.stars}
        score={profile.score}
        streak={profile.streak}
        unlockedCount={unlockedCount}
        totalAnimals={totalAnimals}
        selectedGrade={profile.selectedGrade}
        onOpenGradeSelector={() => setShowGradeModal(true)}
      />
```

- [ ] **Step 3: Type-check**

Run: `npm run lint`
Expected: errors in `TopBar.tsx` about the removed/renamed props — expected at this point, since Task 6 fixes `TopBar.tsx` itself. Confirm the errors are all in `TopBar.tsx` (prop mismatches), not elsewhere.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "chore: drop dead imports, simplify TopBar call site"
```

---

### Task 6: Simplify `TopBar.tsx` — remove nav tabs and 4 icon buttons, add reset button + collection-% pill

**Files:**
- Modify: `src/components/TopBar.tsx`

- [ ] **Step 1: Update imports**

Replace:

```ts
import { Sparkles, Volume2, VolumeX, Flame, Star, Coins, Award, Compass, Trees, Download, GraduationCap, User, BookOpen, Library, Mic, Wrench, Crown, Shirt, Palette } from 'lucide-react';
```

with:

```ts
import { Sparkles, Volume2, VolumeX, GraduationCap, Mic, RotateCcw } from 'lucide-react';
```

And remove the now-unused `BiomeType` import:

```ts
import { GradeLevel, BiomeType } from '../types';
```
becomes
```ts
import { GradeLevel } from '../types';
```

- [ ] **Step 2: Simplify the props interface**

Replace:

```ts
interface TopBarProps {
  playerName: string;
  avatarEmoji?: string;
  avatarTitle?: string;
  tocaCustomization?: Partial<TocaCustomization>;
  onOpenProfileModal: () => void;
  onOpenLoginModal?: () => void;
  onOpenScoreboardModal?: () => void;
  onOpenReadingModal?: () => void;
  onOpenReporterModal?: () => void;
  onOpenSpellingFactoryModal?: () => void;
  onOpenSisterTeamModal?: () => void;
  onOpenWardrobeModal?: () => void;
  onOpenVersionModal?: () => void;
  onOpenVetHospitalModal?: () => void;
  onOpenCitoRpgModal?: () => void;
  onOpenVoiceModal?: () => void;
  onOpenDictionaryModal?: () => void;
  onOpenArcadeModal?: () => void;
  stars: number;
  score: number;
  streak: number;
  activeTab: 'adventure' | 'arcade' | 'sanctuary' | 'badges' | 'map';
  onSelectTab: (tab: 'adventure' | 'arcade' | 'sanctuary' | 'badges' | 'map') => void;
  unlockedCount: number;
  totalAnimals: number;
  selectedGrade: GradeLevel;
  selectedBiome?: BiomeType;
  onOpenGradeSelector: () => void;
}
```

with:

```ts
interface TopBarProps {
  playerName: string;
  avatarEmoji?: string;
  avatarTitle?: string;
  tocaCustomization?: Partial<TocaCustomization>;
  onOpenProfileModal: () => void;
  onOpenLoginModal?: () => void;
  onOpenWardrobeModal?: () => void;
  onOpenVoiceModal?: () => void;
  onResetProgress?: () => void;
  stars: number;
  score: number;
  streak: number;
  unlockedCount: number;
  totalAnimals: number;
  selectedGrade: GradeLevel;
  onOpenGradeSelector: () => void;
}
```

- [ ] **Step 3: Update the component's destructured props**

Replace:

```ts
export const TopBar: React.FC<TopBarProps> = ({
  playerName,
  avatarEmoji = '👩‍🌾',
  avatarTitle = 'Avonturier',
  tocaCustomization,
  onOpenProfileModal,
  onOpenLoginModal,
  onOpenReadingModal,
  onOpenReporterModal,
  onOpenSpellingFactoryModal,
  onOpenSisterTeamModal,
  onOpenWardrobeModal,
  onOpenVersionModal,
  onOpenVetHospitalModal,
  onOpenCitoRpgModal,
  onOpenVoiceModal,
  onOpenDictionaryModal,
  onOpenArcadeModal,
  stars,
  score,
  streak,
  activeTab,
  onSelectTab,
  unlockedCount,
  totalAnimals,
  selectedGrade,
  selectedBiome = 'farm',
  onOpenGradeSelector
}) => {
```

with:

```ts
export const TopBar: React.FC<TopBarProps> = ({
  playerName,
  avatarEmoji = '👩‍🌾',
  avatarTitle = 'Avonturier',
  tocaCustomization,
  onOpenProfileModal,
  onOpenLoginModal,
  onOpenWardrobeModal,
  onOpenVoiceModal,
  onResetProgress,
  stars,
  score,
  streak,
  unlockedCount,
  totalAnimals,
  selectedGrade,
  onOpenGradeSelector
}) => {
```

(Note: the original destructuring above already omitted `onOpenScoreboardModal` from its own body-usage list in some spots — copy exactly as shown; this removes every icon-row handler prop that no longer exists.)

- [ ] **Step 4: Delete `handleDownloadOfflineHTML`**

Delete this function entirely:

```ts
  const handleDownloadOfflineHTML = () => {
    sound.playStar();
    const link = document.createElement('a');
    link.href = '/boerin_tess_safari.html';
    link.download = 'Boerin_Tess_Safaripark_Spel.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
```

- [ ] **Step 5: Trim the "Quick Utility Icon Group" down to mic + reset + sound**

Replace the entire icon group block:

```tsx
          {/* Quick Utility Icon Group */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {onOpenVoiceModal && (
              <button
                id="voice-settings-quick-btn"
                onClick={() => {
                  sound.playPop();
                  onOpenVoiceModal();
                }}
                className="p-2 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 transition-all cursor-pointer shadow-xs active:scale-95"
                title="Steminstellingen & Voorleessnelheid"
              >
                <Mic className="w-4 h-4 text-amber-700" />
              </button>
            )}

            {onOpenReadingModal && (
              <button
                id="reading-adventures-quick-btn"
                onClick={() => {
                  sound.playPop();
                  onOpenReadingModal();
                }}
                className="p-2 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-all cursor-pointer shadow-xs active:scale-95"
                title="Voorleesverhalen & Leesavontuur"
              >
                <Library className="w-4 h-4 text-emerald-700" />
              </button>
            )}

            {onOpenDictionaryModal && (
              <button
                id="dictionary-quick-btn"
                onClick={() => {
                  sound.playPop();
                  onOpenDictionaryModal();
                }}
                className="p-2 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-800 transition-all cursor-pointer shadow-xs active:scale-95"
                title="Interactief Nederlands Woordenboek & Cito Hulp"
              >
                <BookOpen className="w-4 h-4 text-blue-700" />
              </button>
            )}

            {onOpenScoreboardModal && (
              <button
                id="parent-scoreboard-btn"
                onClick={() => {
                  sound.playPop();
                  onOpenScoreboardModal();
                }}
                className="p-2 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 transition-all cursor-pointer shadow-xs active:scale-95"
                title="Ouder & Docent Scorebord"
              >
                <Award className="w-4 h-4 text-indigo-700" />
              </button>
            )}

            <button
              id="download-html-btn"
              onClick={handleDownloadOfflineHTML}
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-all cursor-pointer shadow-xs active:scale-95"
              title="Download offline HTML versie"
            >
              <Download className="w-4 h-4 text-slate-600" />
            </button>

            <button
              id="sound-toggle-btn"
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                soundOn
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                  : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
              }`}
              title={soundOn ? 'Geluid & Spraak aan' : 'Geluid uit'}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
```

with:

```tsx
          {/* Quick Utility Icon Group */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {onOpenVoiceModal && (
              <button
                id="voice-settings-quick-btn"
                onClick={() => {
                  sound.playPop();
                  onOpenVoiceModal();
                }}
                className="p-2 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 transition-all cursor-pointer shadow-xs active:scale-95"
                title="Steminstellingen & Voorleessnelheid"
              >
                <Mic className="w-4 h-4 text-amber-700" />
              </button>
            )}

            {onResetProgress && (
              <button
                id="reset-game-btn"
                onClick={() => {
                  sound.playPop();
                  onResetProgress();
                }}
                className="p-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 transition-all cursor-pointer shadow-xs active:scale-95"
                title="Herstart voortgang vanaf level 1"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            <button
              id="sound-toggle-btn"
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                soundOn
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                  : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
              }`}
              title={soundOn ? 'Geluid & Spraak aan' : 'Geluid uit'}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
```

- [ ] **Step 6: Add the collection-% pill to the stats row**

In the "Right Stats & Progress Bar" section, replace:

```tsx
        {/* Right Stats & Progress Bar */}
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap justify-between sm:justify-end w-full md:w-auto">
          {/* Score Counter */}
```

with:

```tsx
        {/* Right Stats & Progress Bar */}
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap justify-between sm:justify-end w-full md:w-auto">
          {/* Dieren Collection Percent */}
          <div className="flex flex-col items-start sm:items-end">
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Dieren</span>
            <span className="text-sm sm:text-base font-black text-emerald-700 leading-tight">
              {Math.min(100, Math.round((unlockedCount / totalAnimals) * 100))}%
            </span>
          </div>

          {/* Score Counter */}
```

- [ ] **Step 7: Delete the entire nav-tabs `<nav>` block**

Delete this whole block (everything from `{/* Main Navigation Tabs */}` through the closing `</nav>`):

```tsx
      {/* Main Navigation Tabs */}
      <nav id="game-navigation-tabs" className="flex items-center justify-between gap-1.5 sm:gap-2 overflow-x-auto pb-0.5">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap min-w-max">
          {/* Adventure Tab */}
          <button
            id="nav-tab-adventure"
            onClick={() => {
              sound.playPop();
              onSelectTab('adventure');
            }}
            className={`px-3 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all border ${
              activeTab === 'adventure'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-600/20'
                : 'bg-white/80 backdrop-blur-md text-slate-600 hover:text-emerald-900 hover:bg-white border-slate-200/80 shadow-xs'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Taal Avontuur</span>
          </button>

          {/* Safari Arcade Tab */}
          <button
            id="nav-tab-arcade"
            onClick={() => {
              sound.playPop();
              onSelectTab('arcade');
            }}
            className={`px-3 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all border ${
              activeTab === 'arcade'
                ? 'bg-purple-600 text-white border-purple-700 shadow-md shadow-purple-600/20'
                : 'bg-white/80 backdrop-blur-md text-slate-600 hover:text-purple-900 hover:bg-white border-slate-200/80 shadow-xs'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Safari Arcade ⚡</span>
          </button>

          {/* Dierenpark Sanctuary Tab */}
          <button
            id="nav-tab-sanctuary"
            onClick={() => {
              sound.playPop();
              onSelectTab('sanctuary');
            }}
            className={`px-3 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all border ${
              activeTab === 'sanctuary'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-600/20'
                : 'bg-white/80 backdrop-blur-md text-slate-600 hover:text-emerald-900 hover:bg-white border-slate-200/80 shadow-xs'
            }`}
          >
            <Trees className="w-4 h-4" />
            <span>Dierenpark ({unlockedCount}/{totalAnimals})</span>
          </button>

          {/* Badges Showcase Tab */}
          <button
            id="nav-tab-badges"
            onClick={() => {
              sound.playPop();
              onSelectTab('badges');
            }}
            className={`px-3 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all border ${
              activeTab === 'badges'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-600/20'
                : 'bg-white/80 backdrop-blur-md text-slate-600 hover:text-emerald-900 hover:bg-white border-slate-200/80 shadow-xs'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Medailles</span>
          </button>

          {/* Level Roadmap Tab */}
          <button
            id="nav-tab-map"
            onClick={() => {
              sound.playPop();
              onSelectTab('map');
            }}
            className={`px-3 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all border ${
              activeTab === 'map'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-600/20'
                : 'bg-white/80 backdrop-blur-md text-slate-600 hover:text-emerald-900 hover:bg-white border-slate-200/80 shadow-xs'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Wereldkaart</span>
          </button>
        </div>

        {/* Global Dieren Progress Bar */}
        <div className="hidden md:flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-black text-slate-600 whitespace-nowrap">Wereldcollectie:</span>
          <div className="w-20 bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[11px] font-black text-emerald-800">{progressPercent}%</span>
        </div>
      </nav>
```

The `</header>` closing tag right after it stays.

- [ ] **Step 8: Remove the now-unused `progressPercent` local**

Delete this line (it was only used by the deleted nav's progress bar; Step 6 above already computes collection % inline):

```ts
  const progressPercent = Math.min(100, Math.round((unlockedCount / totalAnimals) * 100));
```

- [ ] **Step 9: Type-check**

Run: `npm run lint`
Expected: no errors anywhere in the project now (this was the last file with mismatched props from Task 5).

- [ ] **Step 10: Commit**

```bash
git add src/components/TopBar.tsx
git commit -m "refactor: strip TopBar down to header stats + nav tabs removed"
```

---

### Task 7: Delete the offline-HTML feature's remaining files

**Files:**
- Delete: `scripts/buildStandaloneHtml.ts`
- Delete: `public/boerin_tess_safari.html`

- [ ] **Step 1: Confirm nothing else references these files**

Run: `grep -rn "boerin_tess_safari\|buildStandaloneHtml" --include="*.ts" --include="*.tsx" --include="*.json" --include="*.mjs" . | grep -v node_modules`
Expected: no output (all references were already removed in Tasks 4–6).

- [ ] **Step 2: Delete the files**

```bash
git rm scripts/buildStandaloneHtml.ts public/boerin_tess_safari.html
```

- [ ] **Step 3: Final full type-check**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: remove offline-HTML download feature (superseded by hosted Vercel URL)"
```

---

## Manual QA checklist (for the user, not part of automated verification)

Once all 7 tasks are committed, load the app (`node node_modules/vite/bin/vite.js --port=3000 --host=0.0.0.0`, per `docs/HANDOFF.md` — `npm run dev` may not resolve on this machine) and check:

- All 16 tiles render, grouped under Learn/Play/Explore/Progress headings.
- Each tile opens the right modal/view — especially Reporter Missie, Spelling Fabriek, Sister Team, and Dierenziekenhuis (previously dead).
- The footer's "v8.0.1" opens the version modal.
- The header's Wissel button still switches Ridheya/Hemali; reset icon still asks for confirmation and resets.
- No leftover "Kies Avonturier" banner, no nav tabs, no offline-HTML button anywhere.
