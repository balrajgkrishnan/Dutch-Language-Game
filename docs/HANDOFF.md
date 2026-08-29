# Handoff

## 2026-08-28 — Sterkwoorden zones, critical rotation-bug fix, illustrated stories

### What was done

**1. Bug-fix pass (5 fixes, commit `df3acd5`, then 1 more `0c75357`)**
Found and fixed via live browser testing: 3 quiz questions with the correct
answer duplicated as a wrong distractor; Poké-duel showed a hardcoded
hat/graduation-cap emoji instead of the real profile avatar; `AnimalAvatar`
carried a stale duplicate emoji map (deleted, now reads the animal's own
data) plus a "weird stuff on them" pulsing badge overlay (removed); the
toucan used a feather emoji (no toucan glyph exists in Unicode — swapped to
parrot); the entire `dutchDictionaryService.ts` had UTF-8/cp1252
double-encoding corruption across 16 lines, including the Dutch
vowel-detection regexes used for syllable splitting, not just visible
mojibake; a missing `Groep 4-5` dictionary-level type literal (7 TS errors);
README markdownlint cleanup.

**2. Sterkwoorden Zones feature (commits `39ad961`..`0fa7ecc`, merged `b3878da`)**
Turned the flat 95-verb "Sterke Werkwoorden Arena" into 200 verbs (105
new, hand-verified via WebFetch against Wiktionary) across 10 difficulty
zones of 20, each unlocking a dedicated reward animal + celebration modal.
Built via subagent-driven-development (11 tasks, two-stage review each).
Zone membership/completion are **derived**, not stored (from `tier` +
alphabetical position, and from `PlayerProfile.questionHistory`) — a
deliberate deviation from the original spec
(`docs/superpowers/specs/2026-08-28-sterkwoorden-zones-design.md` §4), to
avoid a class of stored-state-drift bugs. Real issues caught during review:
3 word-order grammar errors in generated example sentences, an O(n²)
zone-lookup fixed via memoization (~600x speedup), and a non-monotonic
mastery bug (fixed with `prevEntry.wasCorrect || wasCorrect`).

**3. Critical rotation-bug fix (commit `15cd1f6`)** — found via a live user
report ("answered 20+ questions, zone never unlocked") **immediately after**
merging the zones feature. Root cause: both the verb-zone and the
pre-existing farm-expedition question pickers indexed
`currentIndex % prioritizedItems.length` into an "unseen-first" array that
**reshuffles every time an item is answered** — the index doesn't track a
stable position, so some items were permanently skipped while others
repeated forever. Verified via Node simulation before *and* after the fix
(6-item and 20-item cases), then re-verified live in the browser. Replaced
both duplicated inline blocks with one shared `pickNextItem()` helper in
`App.tsx`.

**4. Illustrated reading-adventure stories (commit `ac7c3fe`)** — all 6
existing `readingAdventuresData.ts` stories (4 Ridheya animal-helping, 2
Hemali mystery/science) now have a real AI-generated illustration per
paragraph (19 images, `gemini-2.5-flash-image` via `generateContent` — the
older `generateImages`/Imagen API is deprecated), in a "Bold Picture Book"
style validated against 3 other style options first. Character consistency
achieved with a fixed, reused text description per character (validated
empirically across different scenes — no reference-image conditioning
needed). New `IllustratedStoryPage.tsx` component (deliberately **not**
built on `StoryCutsceneStage`, which carries CSS-animation/biome logic
meant for one hero scene per story, not a repeated per-paragraph element).
`ReadingAdventureModal.tsx`'s reading step is now a real page-by-page
picture book using the `activeParagraphIndex` state that already existed
but was never wired to anything. **Also fixed:** `onOpenReadingModal` was
accepted by `TopBar` but never called from any button — the whole feature
was unreachable from the UI. Added a real entry point (green Library icon,
next to the mic/voice-settings button in the top header bar).

### Key decisions

- Zones: derive, don't store (see deviation note above).
- Illustrations: generate once at content-authoring time, bundle as static
  assets under `public/story-images/<story-id>/paragraph-N.png` — no
  runtime API calls during actual play.
- `scripts/generateStoryIllustrations.mjs` needs real backoff — a 20s/40s/60s
  retry schedule was insufficient; 60s/120s/180s worked. Treat any future
  batch generation the same way (rate limiting manifests as a raw SSL
  handshake failure, not a clean HTTP 429).
- `.env` holds `GEMINI_API_KEY` locally (gitignored, confirmed via
  `git check-ignore`) — needed to run the generation script again.

### Open follow-ups (not yet started)

- Dierenpak/avatar animation polish ("just floating heads" — unpolished).
- Character avatar builder improvements.
- Whole-app UI declutter + consistent big-tile nav (matching the existing
  arcade/pet-care/dictionary card pattern).
- Wire the Wiktionary **async** fallback (`lookupWiktionaryAsync`) into
  `InteractiveDutchText.tsx` — it currently only calls the sync local-dictionary
  lookup, so only 9 of 95 (now 200) verbs have a real dictionary entry;
  everything else falls through to a generic "unknown word" message despite
  a working Wiktionary API path already existing in the codebase.
- Content-quality nits noted but explicitly left out of scope during
  review: two pre-existing (predating this session) word-order issues in
  `bedriegen`/`smelten`'s example sentences in `werkwoorden.ts`.

### Resume cautions

- `bun.lock` exists but `bun` isn't installed in this dev environment —
  `npm install` was used instead, which added `package-lock.json`
  (currently left uncommitted/untracked per an earlier explicit choice this
  session — reconcile bun vs npm before it causes confusion).
- Dev server: `node_modules/.bin` isn't populated here — start Vite directly
  via `node node_modules/vite/bin/vite.js --port=XXXX --host=0.0.0.0`, not
  `npm run dev`.
- No test framework exists in this repo (no jest/vitest). Verification
  throughout this session was `tsc --noEmit` plus live browser checks via
  Playwright MCP — keep using that bar, don't assume a test suite exists.
