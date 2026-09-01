# Sterkwoorden Zones — Design Spec

**Date:** 2026-08-28
**Status:** Approved for planning

## Problem

The "Sterke Werkwoorden Arena" (strong-verb quiz, `VerbQuizCard` + `src/data/werkwoorden.ts`)
currently has ~90 verbs, presented as one flat pool filtered only by tier
(`beginner`/`intermediate`/`advanced`) and by player (Ridheya is locked to `beginner`,
Hemali can pick any tier or `all`). There is no sense of progression, no reward for
finishing a chunk of content, and no natural stopping point — kids either grind
indefinitely or quit without a sense of completion.

The ask: turn this into ~200 verbs, organized into learnable **zones of 20**, each
zone rewarded with a dedicated animal + unlock animation on completion, with
progress saved across sessions.

## Scope

Zones apply **only** to the strong-verb quiz (`werkwoorden.ts` / `VerbQuizCard`).
The broader spelling/grammar quiz content (`biomeLevels45.ts`, `biomeLevels68_part*.ts`,
driving `QuizCard`) is out of scope for this change and keeps its existing
level/expedition structure untouched.

## 1. Content: 90 → 200 verbs

- Author ~110 additional entries in `werkwoorden.ts`, following the exact existing
  schema per entry: `infinitief`, `english`, `imperfectum_ev`, `imperfectum_mv`,
  `perfectum`, `hulpwerkwoord`, `tier`, `accept_alt`, `frequency`, `school_priority`,
  `example: { nl, en }`.
- Source list: the standard closed set of Dutch strong/irregular verbs not already
  covered (Dutch has a well-known, finite list of these — this is a content-authoring
  task, not new logic).
- Each new entry needs a real, verified conjugation and an original example sentence
  in the same "safari/farm" narrative voice as existing entries (see current examples
  for tone — Boerin Tess, safari animals, etc.).
- `accept_alt` stays populated only where a genuine alternate spelling exists (most
  entries will keep it empty, matching current data).

## 2. Zones

- 200 verbs ÷ 20 per zone = **10 zones**, no remainder.
- Zones are ordered by difficulty, mapped from the existing `tier` field:
  roughly zones 1-3 = `beginner`, 4-7 = `intermediate`, 8-10 = `advanced`
  (exact split determined when the full 200-verb list is finalized, since tier
  counts must divide evenly into 20-verb chunks).
- **Locking:** Zone *N* is locked until zone *N-1* is completed. Zone 1 starts
  unlocked for everyone.
- **Completion:** A zone is "complete" when every verb in it has been answered
  correctly (full 3-part answer: imperfectum + hulpwerkwoord + perfectum) at least
  once. Retries are unlimited and don't block completion — this reuses the
  correctness-tracking already present in `PlayerProfile.questionHistory`
  (keyed `verb-${infinitief}`), just evaluated per-zone instead of globally.
- Ridheya remains tier-gated to `beginner` per existing logic, so in practice she
  will only ever unlock the first few zones — this is consistent with current
  behavior and not a regression.

## 3. Rewards

- A **new, dedicated set of 10 "zone badge" animals** — separate from the existing
  73-animal expedition roster (`biomeAnimals.ts` / `AnimalSanctuary`), so the two
  unlock systems never overlap or conflict.
- Each zone animal needs: `id`, `name`, `title`, `emoji` (following the real
  `Animal` shape used elsewhere, but a lighter-weight variant is fine since these
  don't need the full sanctuary/habitat fields like `biome`, `funFact`,
  `favoriteFood`, etc. — just enough to render via `AnimalAvatar` and show in an
  unlock modal).
- On zone completion: trigger a full-screen unlock celebration (confetti, animal
  reveal with the existing `AnimalAvatar` bounce/wiggle animation, zone name,
  "Volgende zone ontgrendeld!" messaging) — reusing the existing `RewardModal`
  pattern already in the codebase rather than building a new modal from scratch.

## 4. Persistence

No new storage mechanism needed. `PlayerProfile` already persists per-user to
`localStorage` via `authService.ts` (`loadUserProfile`/`saveUserProfile`), and
already tracks `seenQuestionIds` and `questionHistory`.

Add one new field to `PlayerProfile`:

```ts
verbZoneProgress?: {
  completedZones: number[];      // zone indices (0-9) fully completed
  unlockedZones: number[];       // zone indices currently unlocked (always includes 0)
};
```

Per-verb correctness-within-zone is derived at render time from the existing
`questionHistory` map (no duplicate tracking needed) — a zone's completion state
is computed as "all verb keys in this zone have `wasCorrect: true` in history."

## 5. UI

- Replace the current tier-toggle buttons in the verb arena header
  (`groep68Mode === 'verb_arena'` section of `App.tsx`) with a **Zone Map** screen:
  10 tiles in a grid, each showing zone number, a preview of its reward animal
  (silhouette if locked, full color + name if unlocked/completed), and a
  progress count ("14/20 werkwoorden geleerd").
- Reuses the existing tile/card visual language already used for the
  biome/level map elsewhere in the app, rather than inventing a new component
  style.
- Selecting an unlocked zone drops the player into `VerbQuizCard` scoped to that
  zone's 20 verbs (replacing the current tier-based filtering with zone-based
  filtering); the existing unseen-first prioritization logic within a zone stays.

## Out of scope (this change)

- No changes to `QuizCard` / `biomeLevels45.ts` / `biomeLevels68_part*.ts` content
  or structure.
- No changes to the existing 73-animal expedition/sanctuary system.
- No dynamic question-format variation (the existing 2-step imperfectum →
  hulpwerkwoord+perfectum format stays as-is per verb) — the "more and more
  different questions over time" goal is satisfied by the 90→200 content
  expansion itself, not by new question-generation logic.
