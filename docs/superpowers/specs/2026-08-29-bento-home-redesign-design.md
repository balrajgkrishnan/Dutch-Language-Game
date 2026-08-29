# Bento Home Screen Redesign (Phase 1) — Design Spec

**Date:** 2026-08-29
**Status:** Approved for planning

## Problem

Navigation is scattered across five different mechanisms that all coexist today:
`TopBar`'s 5 nav tabs (Taal Avontuur / Safari Arcade / Dierenpark / Medailles /
Wereldkaart), `TopBar`'s quick-icon row (voice / reading-library / dictionary /
parent-scoreboard / offline-download / sound), the home hub's hero card + 4 bento
cards, a "Kies Avonturier" player-switch banner that duplicates the header's own
switch button, and a footer button row (player-switch / parent-scoreboard /
Cito-RPG / offline-download / restart). A player has to already know where a
feature lives to find it.

Worse: while mapping this out, five fully-built features turned out to be
**completely unreachable** in the shipped game. `TopBar.tsx` accepts
`onOpenReporterModal`, `onOpenSpellingFactoryModal`, `onOpenSisterTeamModal`,
`onOpenVetHospitalModal`, and `onOpenVersionModal` as props, wires each to a
`showXModal` state in `App.tsx`, and renders the corresponding modal
(`HemaliReporterModal`, `RidheyaSpellingFactoryModal`, `SisterTeamModal`,
`VeterinarianHospitalModal`, `VersionFlashModal`) — but never actually calls any
of those five handlers anywhere in its own JSX. Same class of bug as the
reading-adventure entry point fixed 2026-08-28. These are real, working features
sitting dead.

This is Phase 1 of a larger initiative (bento UI + profile gate + cross-device
persistence, see conversation/handoff for full context). Phase 1 ships the bento
consolidation alone — no backend changes, no profile-gate changes — because it's
the fastest, lowest-risk, highest-visible-impact slice: pure reorganization of
existing render code plus wiring up dead buttons, no new state or storage model.

## Scope

In scope: `src/App.tsx` (the `activeTab === 'adventure'` non-expedition home view,
the footer, the `TopBar` render call), `src/components/TopBar.tsx` (icon row, nav
tabs). Out of scope: the expedition/quiz views themselves, `LoginModal`/password
switching (stays as-is, replaced in Phase 2), any `PlayerProfile` field changes,
any new backend/storage.

## 1. Bento tile inventory

16 tiles is a lot for an 8-year-old to scan flat, so they're organized into 4
labeled groups instead of one undifferentiated grid. Same tiles, same handlers
— grouping is a rendering concern only.

### Learn

1. Illustrated Reading Adventures → `setShowReadingModal(true)` — **Large**
   (currently only a small header icon)
2. Sterke Werkwoorden Zones → `openVerbArena()` (new handler, see below) — **Standard, accented**
3. Woordenboek → `setShowDictionaryModal(true)`
4. Hemali's Reporter Missie → `setShowReporterModal(true)` **(newly surfaced — was dead)**
5. Ridheya's Spelling Fabriek → `setShowSpellingFactoryModal(true)` **(newly surfaced — was dead)**

### Play

1. Safari Arcade Arena → `setShowArcadeModal(true)`
2. Poké-Boss Duel Arena → `setShowBossArenaModal(true)`
3. Dierenkamer → `setShowTamagotchiModal(true)`
4. Sister Team Samen-Quest → `setShowSisterTeamModal(true)` **(newly surfaced — was dead)**

### Explore

1. Safari Expeditie (current biome/level) → `setIsExpeditionActive(true)`
2. Dierenpark (Sanctuary) → `setActiveTab('sanctuary')`
3. Wereldkaart → `setActiveTab('map')`
4. Dierenziekenhuis (Dokter Ridheya) → `setShowVetHospitalModal(true)` **(newly surfaced — was dead)**

### Progress

1. Story RPG Adventure → `setShowCitoRpgModal(true)` — **XL** (existing hero card content)
2. Medailles → `setActiveTab('badges')`
3. Ouder Scorebord → `setShowScoreboardModal(true)` (moved from footer)

**Sizing hierarchy** (the "which one dominates" question): RPG Adventure is the
primary loop and gets the XL tile; Reading Adventures is the secondary content
pillar and gets a Large tile; Verb Zones is Standard-sized but visually accented
(border/badge) since it's high-value but not the main loop. Everything else is
Standard. This keeps the 3 previously-"equally featured" tiles from competing
for the same attention.

The 4 newly-surfaced tiles (Reporter Missie, Spelling Fabriek, Sister Team,
Dierenziekenhuis) render for both profiles (existing modals don't hard-gate by
username), matching current behavior — no new per-user visibility logic added.

Not a tile: `VersionFlashModal` — instead, the version label already planned
for the footer (see Layout) becomes a clickable button that opens it, so the
feature isn't left dead again, without needing a 17th tile.

**New handler — `openVerbArena()`:** the only place Phase 1 introduces new
behavioral logic (forcing `groep68Mode('verb_arena')` for Hemali before
entering expedition mode) is extracted into its own function in `App.tsx`
rather than inlined in the tile's `onClick`. This keeps the tile's `onClick`
itself trivial (a name and a call) and isolates the one bit of real game-state
coupling in Phase 1 to a single, named, testable spot instead of mixed into
render code:

```ts
function openVerbArena() {
  if (profile.selectedGrade === 'group_6_7_8') {
    setGroep68Mode('verb_arena');
  }
  setIsExpeditionActive(true);
}
```

Avatar/Wardrobe customization stays as the header avatar button's existing
click behavior (personalization, not a "game"). Grade switcher stays as the
header pill.

## 2. Layout

- `TopBar`'s 5 `<nav>` tabs are deleted. `activeTab` state and the `sanctuary`/
  `badges`/`map` views stay exactly as they are — the Dierenpark, Medailles,
  and Wereldkaart tiles just call `setActiveTab(...)` directly instead of a
  nav button doing it.
- The "Kies Avonturier" banner (`App.tsx` ~line 601-653) is deleted — it
  duplicated the header's own player-switch button.
- The hero RPG card and the 4 existing bento cards (`App.tsx` ~line 792-1022)
  are replaced by **one data-driven grid**, not 16 hand-written JSX blocks.
  A `HOME_TILES` config array (one entry per tile: `id`, `group`, `title`,
  `subtitle`, `icon`, `size`, `onClick`) lives alongside the tile-inventory
  list above, and the render is `HOME_TILES.filter(t => t.group === g).map(...)`
  per group, through one shared `<BentoTile>` component. This replaces 16
  near-duplicate card blocks with one component + one array, and is also the
  natural seam for Phase 2 (per-profile tile visibility becomes a filter on
  this same array, not a rewrite).
- Each of the 4 groups (Learn / Play / Explore / Progress) renders as its own
  labeled row/section within the grid — same tiles, grouped rendering only,
  no new state.
- `TopBar`'s quick-icon row (`App.tsx`/`TopBar.tsx` voice/reading/dictionary/
  scoreboard/download/sound buttons) is removed since reading + dictionary +
  scoreboard become tiles. Voice settings and sound-toggle collapse into one
  small settings icon in the header (opens `VoiceSettingsModal`, which already
  has its own UI for these — no new modal needed). "Herstart" moves next to it
  as a small icon-button, not a tile.
- Footer shrinks to the "🌍 Wereld Safaripark..." attribution line plus a
  small clickable version label (e.g. "v8.0.1") that opens `VersionFlashModal`
  — cheap enough to give it a real entry point instead of leaving it dead a
  second time. The player-switch/scoreboard/Cito-RPG/download/restart buttons
  are all removed (covered by header + tiles now).

## 3. Removals

- Offline-HTML feature, in full: `TopBar.tsx`'s `download-html-btn` button and
  `handleDownloadOfflineHTML` function, `App.tsx`'s footer `<a href="/boerin_tess_safari.html">`
  link, `scripts/buildStandaloneHtml.ts`, `public/boerin_tess_safari.html`.
  (`public/cito_rpg_diagnostic.html` is unrelated — not referenced by this
  button — and is not touched.) Checked `docs/HANDOFF.md` and the README for
  any classroom/airplane/low-connectivity use case that would mean "hide"
  instead of "delete" — none exists, and the user separately confirmed the
  real Vercel URL (`dutchsafaripark.vercel.app`) is what the family actually
  uses now. Deleting, not hiding.
- Dead imports in `App.tsx`: `GradeSwitcherBar`, `CompanionCard` (imported,
  never rendered, unrelated to this feature but trivial to clean up while
  touching this file).

## 4. Testing

No test framework in this repo (confirmed in `docs/HANDOFF.md`). Verification is
`tsc --noEmit` plus live browser check via Playwright MCP:

- Every one of the 16 tiles opens its correct modal/view (particular attention
  to the 4 previously-dead ones).
- Offline-HTML button/link/file are gone; version label opens `VersionFlashModal`.
- Ridheya/Hemali switching still works via the header button.
- **Navigation regression** (removing the 5 nav tabs is the one change that
  can strand a player with no way home, so these return paths get explicit
  checks): start an expedition → leave it → land back on the bento home, not a
  blank state. Open Dierenpark (sanctuary) → return home. Open Wereldkaart →
  select a level → confirm it starts that expedition (existing `onSelectLevel`
  behavior) → leave → return home. Open Medailles → return home. Switch player
  mid-session → confirm the home screen re-renders for the new profile, not a
  stale view. Open every modal-based tile from a fresh load (not just from
  the home screen) to confirm none of them depend on nav-tab state that no
  longer exists.

## 5. Deferred (not Phase 1)

The reviewer who read this spec raised a good next-step question: even
grouped, 16 tiles is still a "choose from a menu" experience. A likely
Phase 1.5/2 enhancement is a "what should I do next" row above the groups —
e.g. **Continue Adventure** / **Continue Reading** / **Daily Challenge** —
computed from existing profile state (last-played biome/level, last-read
story, etc.) with everything else below it. Not built now: it needs actual
usage data on which tiles get used to decide what "continue" even points to,
and ties naturally into the Phase 2 profile-gate work. Noted here so it isn't
lost, not scoped for this spec.
