# Nederlands Wereld — Bakery Pilot (Design)

## Context

The user wants to eventually pivot toward an open-world, Toca Life World-style
game ("Nederlands Wereld"): a hub with many enterable buildings, each with its
own furniture, items, characters, and clothing to customize. This is a large
initiative. Rather than spec and build all of it at once, this design covers
a **single pilot building (a bakery)**, built end-to-end, to prove the core
sandbox mechanics before any further buildings are authored.

The existing game (73 sanctuary animals, 7 biomes, Boerin Tess, the various
quiz-style learning games) is **not replaced or discarded**. Nederlands
Wereld is a new, additive section. The existing animal cast may appear
inside future buildings as characters, but the pilot itself does not require
that integration yet (see Out of Scope).

## Decisions made (this brainstorming session)

- **World content:** keep the existing animals/biomes as the long-term cast;
  add *new* buildings on top rather than reskinning existing content as
  buildings. Buildings are a new layer, not a replacement.
- **Interaction depth:** a new, lightweight interaction model — tap-to-listen
  vocab, ambient exposure, soft mini-quests — **not** routed into the
  existing multiple-choice/spelling quiz engines built earlier this session.
  This is deliberately closer to real Toca Boca play (mostly free
  exploration, minimal formal quizzing) than this app's other games.
- **MVP scope:** pilot exactly one building fully, rather than speccing all
  of Gemini's suggested three scenes (bakery/zoo/playground) up front.
- **Pilot building:** the **Bakery** (user's explicit choice, overriding the
  Vet Clinic recommendation made during brainstorming).
- **Art:** real bold-cartoon Gemini-generated illustrations from the start
  (same pipeline already proven for the 73 sanctuary animals and the 13 home
  tile icons), not placeholder art.
- **Hub screen included in the pilot:** a minimal building-picker screen
  (Bakery enabled, 2 additional buildings shown locked/"coming soon") is
  included even though only one building is built, because it's cheap and it
  directly validates the "choose a building" open-world navigation model the
  user cares about — the core UX metaphor, not just one isolated scene.

## Architecture

**One generic, reusable engine — buildings are data, not code.** This
mirrors the pattern already proven for every other game in this app (shared
engine/component + data-driven content, e.g. the boss arena, the biome
expedition engine, the spelling factory):

```text
NederlandsWereldHubModal          -- building picker (new)
  └─ SandboxSceneModal            -- generic scene engine (new, reusable)
       parametrized by a Building data object
```

Adding Vet Clinic, Shop, etc. later means authoring a new `Building` data
entry, not writing new scene components. `SandboxSceneModal` must not contain
any bakery-specific logic — only generic item/drag/drop-zone/quest handling
driven by whatever `Building` it's given.

## Data model

New TypeScript interfaces (in `src/types.ts`, following the existing
convention — every other game's content in this app is a typed `.ts` data
file, not a runtime-loaded JSON file, so Gemini's "JSON schema" request maps
to a TS `interface` instead):

```ts
export interface DutchVocabWord {
  word: string;             // Dutch word
  article?: 'de' | 'het';   // for nouns
  english: string;
  audioText?: string;       // defaults to `word` if omitted; passed to speech.speak
}

export interface SceneItem {
  id: string;
  emoji: string;             // fallback if art generation is incomplete
  imageUrl?: string;         // Gemini-generated illustration path
  vocab: DutchVocabWord;
  position: { x: number; y: number };   // percent within the scene
  draggable: boolean;
  dropZoneId?: string;       // which drop zone (if any) this item belongs in
}

export interface DropZone {
  id: string;
  label: string;
  position: { x: number; y: number; width: number; height: number }; // percent rect
  acceptsItemIds: string[];
}

export interface MiniQuest {
  id: string;
  promptNl: string;          // e.g. "Zoek de 3 dingen om een boterham te maken!"
  promptEn: string;
  requiredItemIds: string[]; // items that must be placed/found to complete
  rewardCoins: number;
  rewardStars: number;
}

export interface Building {
  id: string;                // 'bakery'
  name: string;               // 'De Bakkerij'
  emoji: string;
  backgroundImageUrl?: string;
  unlocked: boolean;          // lets the hub show locked "coming soon" buildings
  items: SceneItem[];
  dropZones: DropZone[];
  quests: MiniQuest[];
}
```

Content file: `src/data/nederlandsWereldBuildings.ts`, exporting
`NEDERLANDS_WERELD_BUILDINGS: Building[]` — bakery fully populated, plus 2
stub entries (`vet-clinic`, `shop`) with `unlocked: false` and no items, for
the hub's "coming soon" tiles.

## Mechanics (all reusing existing app infrastructure — no new dependencies)

- **Drag-and-drop:** `motion.div drag` + `dragConstraints` (Framer Motion,
  already a dependency, already used throughout this app). No new
  drag-and-drop library needed.
- **Drop detection:** on `onDragEnd`, a simple bounding-rect overlap check
  between the dragged item and each `DropZone`; if inside an accepting zone,
  snap the item into place and mark it "placed."
- **Tap-to-listen:** `speech.speak(item.vocab.audioText || item.vocab.word)`
  (existing `speechService`) + a small popup label showing "de/het + word"
  (Dutch) with the English translation underneath, auto-dismissing after a
  few seconds.
- **Mini-quest:** a banner showing the Dutch prompt and a checklist of
  required items, updating live as items are correctly placed. On
  completion: reward, confetti (`canvas-confetti`, already a dependency),
  sound feedback (existing `soundService`).
- **Progress/rewards:** extend `PlayerProfile` with
  `nederlandsWereldProgress?: { unlockedBuildings: string[]; completedQuests: string[] }`,
  updated via the same `onUpdateProfile` callback pattern every other modal
  in this app already uses.

## Art pipeline

Extend the proven Gemini image-gen pattern (`scripts/generateAnimalAvatars.mjs`,
including the per-item resilience fix added this session so one flaky
network call doesn't crash a whole batch) into a new
`scripts/generateBakeryArt.mjs`: one background illustration + roughly 6-8
item illustrations, same bold-flat-color children's-picture-book style
already used for the animals and tile icons.

## Rendering shell

`NederlandsWereldHubModal` and `SandboxSceneModal` follow the same shell
conventions as every other modal in this app: `useFullscreen` toggle, header
with close button, `motion`-based enter/exit animation.

## Home screen entry point

One new home tile ("Nederlands Wereld" or similar), opening
`NederlandsWereldHubModal` — matching how every other feature is reached
from the bento grid.

## Explicitly out of scope for this pilot

- Vet Clinic, Shop, and any other building beyond the Bakery.
- Clothing/outfit customization tied to specific buildings (would extend the
  existing `TocaWardrobeStudioModal`/avatar-customization system later).
- Sanctuary animals appearing as characters/customers inside buildings.
- Two-tier (Groep 3-5 / 6-8) vocabulary splitting — the data shape doesn't
  block this (a `groepVariant`-style tag could be added to `DutchVocabWord`
  later, matching the derive-don't-store pattern used for spelling/verb
  content), but the pilot ships one vocabulary set for both grades.
- Routing bakery interactions into the existing quiz/test engines.

## Verification plan

- `npm run lint` (`tsc --noEmit`) clean throughout.
- Live browser check: open the hub, confirm Bakery is enabled and the other
  two buildings show as locked/coming soon; enter the Bakery; drag at least
  one item into its correct drop zone and confirm the mini-quest checklist
  updates; complete the quest and confirm coins/stars update on the profile
  and the reward fires (confetti + sound).
- Confirm tap-to-listen speaks the Dutch word and shows the de/het label for
  at least 3 different items.
