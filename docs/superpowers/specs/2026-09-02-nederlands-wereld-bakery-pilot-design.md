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
Wereld is a new, additive section. The bakery *building* is new, but its
customers are drawn from the existing 73 illustrated sanctuary animals (see
Characters/Customers below) — free art reuse plus instant familiarity.

**Revision note:** this spec was reviewed (external AI review, adopted with
judgment) after the initial draft. The original pilot (drag 3 items into
zones, one quest) was judged too shallow — a child would disengage in 2-3
minutes. The revisions below (customers, quest variety, vocab tracking,
ambient speech, more items) directly address that. Two suggestions from the
same review were deliberately **not** adopted (multi-room buildings, a full
generic item-state-machine) — see "Reviewed and deferred" below for why.

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
  transformsInto?: string;   // optional: id of the item this becomes when
                             // dropped in its zone (e.g. deeg -> brood via the oven)
}

export interface DropZone {
  id: string;
  label: string;
  position: { x: number; y: number; width: number; height: number }; // percent rect
  acceptsItemIds: string[];
}

// Customers: the "magic moment" fix for engagement. Reuses the existing
// Animal roster (biomeAnimals.ts) via animalId -- no new art needed.
export interface CharacterRequest {
  id: string;
  speechNl: string;        // "Ik wil graag een brood."
  speechEn: string;
  requiredItemIds: string[]; // items the child must serve to satisfy this request
  thankYouNl: string;       // "Dank je wel!"
  rewardCoins: number;
}

export interface SceneCharacter {
  id: string;
  animalId: string;          // references ALL_BIOME_ANIMALS -- reuses existing art
  requests: CharacterRequest[];
}

export type QuestType = 'collect' | 'place' | 'serve' | 'discover';

export interface MiniQuest {
  id: string;
  type: QuestType;
  promptNl: string;          // e.g. "Zoek de 3 dingen om een boterham te maken!"
  promptEn: string;
  requiredItemIds: string[]; // 'discover' quests use word ids here instead
  rewardCoins: number;
  rewardStars: number;
}

export interface Building {
  id: string;                // 'bakery'
  name: string;               // 'De Bakkerij'
  emoji: string;
  backgroundImageUrl?: string;
  unlocked: boolean;          // lets the hub show locked "coming soon" buildings
  unlockHint?: string;        // shown on locked tiles, e.g. "Voltooi 3 opdrachten om te ontgrendelen"
  items: SceneItem[];
  dropZones: DropZone[];
  characters: SceneCharacter[];
  quests: MiniQuest[];
  ambientPhrases: { nl: string; en: string }[]; // idle lines, spoken occasionally
}
```

Content file: `src/data/nederlandsWereldBuildings.ts`, exporting
`NEDERLANDS_WERELD_BUILDINGS: Building[]` — bakery fully populated, plus 2
stub entries (`vet-clinic`, `shop`) with `unlocked: false`, no items, and an
`unlockHint` string, for the hub's "coming soon" tiles.

**Item count:** target 10-12 items for the bakery (not the original 6-8, and
short of the reviewed suggestion of 15-20 — customers/quest variety/ambient
speech already add depth, so item count doesn't have to carry all of it;
still cheap to grow later since it's pure content).

## Mechanics (all reusing existing app infrastructure — no new dependencies)

- **Drag-and-drop:** `motion.div drag` + `dragConstraints` (Framer Motion,
  already a dependency, already used throughout this app). No new
  drag-and-drop library needed.
- **Drop detection:** on `onDragEnd`, a simple bounding-rect overlap check
  between the dragged item and each `DropZone`; if inside an accepting zone,
  snap the item into place and mark it "placed." If the item has
  `transformsInto` set, swap it for the target item instead (e.g. dough
  dropped in the oven's zone becomes bread) — one small conditional branch,
  not a general state machine.
- **Tap-to-listen:** `speech.speak(item.vocab.audioText || item.vocab.word)`
  (existing `speechService`) + a small popup label showing "de/het + word"
  (Dutch) with the English translation underneath, auto-dismissing after a
  few seconds. Every tap also records exposure (see Vocabulary tracking).
- **Characters/customers:** each `SceneCharacter` references an existing
  `animalId` (reusing `ALL_BIOME_ANIMALS` art and `AnimalAvatar` — zero new
  art). A character shows a speech bubble with `CharacterRequest.speechNl`
  ("Ik wil graag een brood."); dragging the matching item(s) onto the
  character satisfies the request, triggers `thankYouNl` + reward, and the
  character requests something else or leaves. This is the primary
  engagement fix from the review — it turns isolated drags into a small
  roleplay loop without becoming a quiz.
- **Quest types:** `'collect'` (find/tap N items), `'place'` (drop specific
  items in specific zones), `'serve'` (satisfy a character's request),
  `'discover'` (tap N distinct new words) — same engine, `requiredItemIds`
  means different things per type, checked in one small switch in
  `SandboxSceneModal`.
- **Ambient vocabulary:** on entering a building, speak one greeting phrase
  from `ambientPhrases`; every ~30-45s of idle play, speak another random
  one. Lightweight — a single `setInterval`, no scheduling system.
- **Vocabulary exposure tracking:** extend `PlayerProfile` with
  `nederlandsWereldWordStats?: Record<string, { heard: number }>`, keyed by
  vocab word, incremented on every tap-to-listen or ambient utterance —
  mirrors the existing `questionHistory` pattern already used elsewhere in
  this app for the exact same "how many times has X been encountered"
  purpose. Surfaced later as "You discovered N Dutch words" (not required
  for the pilot's verification, just needs the data collected from day one).
- **Progress/rewards:** extend `PlayerProfile` with:

  ```ts
  nederlandsWereldProgress?: {
    unlockedBuildings: string[];
    completedQuests: string[];
    buildingStates: Record<string, { placedItems: string[] }>; // persists
    // scene state across visits -- was left ambiguous in the first draft
  };
  ```

  updated via the same `onUpdateProfile` callback pattern every other modal
  in this app already uses.

## Art pipeline

Extend the proven Gemini image-gen pattern (`scripts/generateAnimalAvatars.mjs`,
including the per-item resilience fix added this session so one flaky
network call doesn't crash a whole batch) into a new
`scripts/generateBakeryArt.mjs`: one background illustration + 10-12 item
illustrations, same bold-flat-color children's-picture-book style already
used for the animals and tile icons. Customers reuse existing animal art —
no new generation needed for them. If any single item's prompt proves as
stubborn as `simba-leeuw` did (a content-safety soft-block, not a network
issue — confirmed this session by seeing the *same* item fail identically
across three separate runs while everything else succeeded), reword that
one prompt rather than retrying indefinitely.

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
- Two-tier (Groep 3-5 / 6-8) vocabulary splitting — the data shape doesn't
  block this (a `groepVariant`-style tag could be added to `DutchVocabWord`
  later, matching the derive-don't-store pattern used for spelling/verb
  content), but the pilot ships one vocabulary set for both grades.
- Routing bakery interactions into the existing quiz/test engines.
- Actual unlock *logic* for the hub's locked buildings — the pilot only
  shows the locked tiles with an `unlockHint` string, no functional gating.

## Reviewed and deliberately deferred (not adopted from the external review)

- **Multi-room buildings** (`Building.rooms: Room[]` instead of flat
  `items/dropZones/quests`). Premature for a one-building, one-room pilot —
  neither the Bakery nor the next two planned buildings (Vet Clinic, Shop)
  need multiple rooms. Wrapping the flat fields in a `rooms[]` array later,
  once a building actually needs it, is a small mechanical refactor, not a
  rewrite — not worth the added complexity now on spec alone.
- **A general item-state-machine system** (arbitrary `state`/transition
  chains). The one specific "magic moment" this would enable — dough
  becoming bread — is captured cheaply via the single optional
  `transformsInto` field above, without building generic state-machine
  infrastructure that nothing else currently needs.

## Verification plan

- `npm run lint` (`tsc --noEmit`) clean throughout.
- Live browser check: open the hub, confirm Bakery is enabled and the other
  two buildings show as locked with their `unlockHint` text; enter the
  Bakery.
- Drag at least one item into its correct drop zone and confirm a `place`
  quest's checklist updates; confirm the dough-in-oven `transformsInto`
  swap actually renders the resulting item.
- Satisfy a customer's request (`serve` quest) and confirm the thank-you
  line, reward, and the character then requesting something new or leaving.
- Complete at least one `collect` and one `discover` quest, confirming
  reward + confetti + sound in each case.
- Confirm tap-to-listen speaks the Dutch word and shows the de/het label for
  at least 3 different items, and that `nederlandsWereldWordStats` increments
  on each tap.
- Confirm an ambient phrase plays on entering the scene.
- Leave the Bakery mid-session (with some items already placed) and reopen
  it — confirm placed items and completed quests persist via
  `nederlandsWereldProgress.buildingStates`.
