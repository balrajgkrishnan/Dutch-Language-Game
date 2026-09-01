# Sterkwoorden Zones Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the flat 95-verb "Sterke Werkwoorden Arena" into 200 verbs organized into 10 zones of 20, each unlocking a dedicated reward animal on completion, with progress derived from data already tracked (no new persisted fields needed beyond fixing an existing tracking gap).

**Architecture:** Zone membership is *derived* (tier + alphabetical position within tier), not stored — 35+25=60 beginner, 41+39=80 intermediate, 19+41=60 advanced, all divide evenly into 20-verb zones. Zone completion is derived from `PlayerProfile.questionHistory`, once a real gap is fixed: verb-arena answers currently never record `wasCorrect` there (only `seenQuestionIds` gets touched). No `zone` field on `VerbItem`, no `verbZoneProgress` on `PlayerProfile` — this is a deliberate simplification over `docs/superpowers/specs/2026-08-28-sterkwoorden-zones-design.md` §4, which proposed storing both. Flag this to the user as a spec deviation when reporting progress.

**Tech Stack:** React 19 + TypeScript + Vite (existing stack, no new dependencies). No test framework exists in this repo — verification is `tsc --noEmit` plus small standalone Node self-check scripts (see Task 6) and manual browser walkthroughs via the dev server, matching how the bug-fix pass earlier in this session was verified.

---

## Deviation from spec (read before starting)

`docs/superpowers/specs/2026-08-28-sterkwoorden-zones-design.md` §4 proposed adding
`verbZoneProgress: { completedZones, unlockedZones }` to `PlayerProfile`. This plan
does **not** add that field. Instead:
- **Zone membership** is computed by `getZoneIndex()` (Task 2) from `tier` +
  alphabetical position — no stored `zone` field needed.
- **Zone completion** is computed by `isZoneComplete()` (Task 7) by checking
  `PlayerProfile.questionHistory[`verb-${infinitief}`]?.wasCorrect` for every verb
  in the zone — a field that already exists on `PlayerProfile`.

This removes an entire class of "stored state can drift out of sync with reality"
bugs (the exact class of bug this session started by fixing). If the user wants
the literal stored-field version from the spec, that's a small variant of Task 7 —
flag it, don't silently pick one.

---

## Task 1: Fix verb-arena correctness tracking (prerequisite for everything else)

**Problem:** `App.tsx`'s `handleNextVerb` currently never records whether the verb
that was just answered was correct — it only adds to `seenQuestionIds`. Zone
completion cannot be computed without this.

**Files:**
- Modify: `src/components/VerbQuizCard.tsx:30-31` (prop signature), `:62-65` (call sites)
- Modify: `src/App.tsx:412-443` (`handleNextVerb`), `:756-758` (prop wiring)

- [x] **Step 1: Change `VerbQuizCard`'s `onNextVerb` prop to pass correctness**

In `src/components/VerbQuizCard.tsx`, change the prop type (around line 31):

```ts
  onNextVerb?: (wasCorrect: boolean) => void;
```

- [x] **Step 2: Pass the real result through `handleNext`**

Still in `VerbQuizCard.tsx`, replace the existing `handleNext` (around line 62-65):

```ts
  const handleNext = () => {
    const wasCorrect = Boolean(isMcCorrect && auxResult && participleResult);
    if (onNextQuestion) onNextQuestion();
    else if (onNextVerb) onNextVerb(wasCorrect);
  };
```

- [x] **Step 3: Update `App.tsx`'s `handleNextVerb` to accept and record it**

In `src/App.tsx`, replace `handleNextVerb` (lines 412-443) with:

```ts
  const handleNextVerb = (wasCorrect: boolean) => {
    const verbKey = `verb-${currentVerb.infinitief}`;
    const seenSet = new Set<string>(profile.seenQuestionIds || []);
    seenSet.add(verbKey);

    setProfile(prev => {
      const history = prev.questionHistory || {};
      const prevEntry = history[verbKey] || { count: 0, lastSeen: 0 };
      return {
        ...prev,
        seenQuestionIds: Array.from(seenSet),
        questionHistory: {
          ...history,
          [verbKey]: {
            count: prevEntry.count + 1,
            lastSeen: Date.now(),
            wasCorrect
          }
        }
      };
    });

    setCurrentVerbIndex(prev => prev + 1);
  };
```

This deliberately removes the old "every 4th verb unlocks the next sanctuary
animal" block (previous lines 417-435) — that mechanism is replaced by zone
completion rewards in Task 9. Do not carry it forward.

- [x] **Step 4: Verify the type checker is still clean**

Run: `node node_modules/typescript/bin/tsc --noEmit`
Expected: no output (0 errors) — same as the clean baseline from the bug-fix pass earlier this session.

- [x] **Step 5: Commit**

```bash
git add src/components/VerbQuizCard.tsx src/App.tsx
git commit -m "fix: record per-verb correctness in questionHistory for the verb arena

Previously only seenQuestionIds was updated when advancing past a verb;
wasCorrect was never recorded, so nothing downstream (including the
upcoming zone-completion logic) could tell whether a verb had actually
been mastered. Also removes the old every-4th-verb sanctuary-animal
unlock hack, superseded by zone completion rewards."
```

---

## Task 2: Zone derivation helper

**Files:**
- Modify: `src/data/werkwoorden.ts` (append after `checkParticiple`, end of file)

- [x] **Step 1: Add the zone-derivation functions**

Append to `src/data/werkwoorden.ts`:

```ts
export const ZONE_SIZE = 20;

// Zones are derived, not stored: each tier's verbs are sorted alphabetically by
// infinitief and chunked into fixed-size zones. Tier population sizes (60/80/60
// once the full 200-verb roster is authored) must stay exact multiples of
// ZONE_SIZE for this to divide evenly — verified by the self-check in Task 6.
const TIER_ORDER: VerbItem['tier'][] = ['beginner', 'intermediate', 'advanced'];

function verbsForTier(tier: VerbItem['tier'], allVerbs: VerbItem[]): VerbItem[] {
  return allVerbs
    .filter(v => v.tier === tier)
    .sort((a, b) => a.infinitief.localeCompare(b.infinitief));
}

/** Zone index (0-9) a verb belongs to, given the full verb roster. */
export function getZoneIndex(verb: VerbItem, allVerbs: VerbItem[] = WERKWOORDEN_DATA): number {
  let zoneOffset = 0;
  for (const tier of TIER_ORDER) {
    const sameTier = verbsForTier(tier, allVerbs);
    if (tier === verb.tier) {
      const idxWithinTier = sameTier.findIndex(v => v.infinitief === verb.infinitief);
      return zoneOffset + Math.floor(idxWithinTier / ZONE_SIZE);
    }
    zoneOffset += Math.ceil(sameTier.length / ZONE_SIZE);
  }
  return -1; // verb.tier is 'expert' or unrecognized — not zoned
}

/** All verbs belonging to a given zone index (0-9), in stable alphabetical order. */
export function getVerbsInZone(zoneIndex: number, allVerbs: VerbItem[] = WERKWOORDEN_DATA): VerbItem[] {
  return allVerbs.filter(v => getZoneIndex(v, allVerbs) === zoneIndex);
}

/** Total number of zones present in the current roster. */
export function getTotalZoneCount(allVerbs: VerbItem[] = WERKWOORDEN_DATA): number {
  let count = 0;
  for (const tier of TIER_ORDER) {
    count += Math.ceil(verbsForTier(tier, allVerbs).length / ZONE_SIZE);
  }
  return count;
}
```

- [x] **Step 2: Write a throwaway self-check script**

Create `c:\tmp\check_zones.js` (not part of the repo, scratch verification only):

```js
const { execSync } = require('child_process');
// Use tsx (already a devDependency) to run the TS module directly.
```

Actually run it more simply — since `getZoneIndex` depends only on `tier` +
`infinitief` + array position, verify with a plain Node script against a JSON
dump. Create `c:\tmp\check_zones.mjs`:

```js
import { readFileSync } from 'fs';
const src = readFileSync('src/data/werkwoorden.ts', 'utf8');
const re = /"infinitief":\s*"([^"]+)"[\s\S]*?"tier":\s*"([^"]+)"/g;
let m;
const verbs = [];
while ((m = re.exec(src))) verbs.push({ infinitief: m[1], tier: m[2] });

const byTier = {};
for (const v of verbs) (byTier[v.tier] ||= []).push(v.infinitief);
for (const tier of Object.keys(byTier)) {
  const n = byTier[tier].length;
  console.log(tier, n, n % 20 === 0 ? 'OK (divides evenly)' : 'MISALIGNED');
}
console.log('total verbs:', verbs.length, verbs.length === 200 ? 'OK' : 'expected 200');
```

Run: `node "c:/tmp/check_zones.mjs"` from the repo root once Tasks 3-5 are done.
Expected: `beginner 60 OK`, `intermediate 80 OK`, `advanced 60 OK`, `total verbs: 200 OK`.
(This step is re-run at the end of Task 6 for real; right now, before the new
verbs are authored, it will correctly report the *current* smaller counts as
misaligned — that's expected, not a failure, since Tasks 3-5 haven't run yet.)

- [x] **Step 3: Verify TypeScript compiles**

Run: `node node_modules/typescript/bin/tsc --noEmit`
Expected: no output.

- [x] **Step 4: Commit**

```bash
git add src/data/werkwoorden.ts
git commit -m "feat: add zone-derivation helpers for sterkwoorden zones

Zone membership is computed from tier + alphabetical position rather
than stored per-verb, so it can never drift out of sync with the data."
```

---

## Task 3: Author 25 new beginner-tier verbs

**Why 25:** existing beginner count is 35; 35+25=60=exactly 3 zones of 20.

**Files:**
- Modify: `src/data/werkwoorden.ts` (append new entries to the `WERKWOORDEN_DATA` array, before the closing `];`)

**Required verb list and verified conjugations** (infinitief | english | imperfectum_ev | imperfectum_mv | perfectum | hulpwerkwoord):

| infinitief | english | imperfectum_ev | imperfectum_mv | perfectum | hulpwerkwoord |
|---|---|---|---|---|---|
| slaan | to hit | sloeg | sloegen | geslagen | heeft |
| lijken | to seem | leek | leken | geleken | heeft |
| meten | to measure | mat | maten | gemeten | heeft |
| begrijpen | to understand | begreep | begrepen | begrepen | heeft |
| verstaan | to understand (language) | verstond | verstonden | verstaan | heeft |
| genezen | to heal/cure | genas | genazen | genezen | heeft/is |
| bestaan | to exist | bestond | bestonden | bestaan | heeft |
| kunnen | can (modal) | kon | konden | gekund | heeft |
| mogen | may (modal) | mocht | mochten | gemogen | heeft |
| moeten | must (modal) | moest | moesten | gemoeten | heeft |
| willen | to want (modal) | wilde | wilden | gewild | heeft |
| varen | to sail | voer | voeren | gevaren | heeft/is |
| jagen | to hunt | joeg | joegen | gejaagd | heeft |
| raden | to guess | raadde | raadden | geraden | heeft |
| stinken | to stink | stonk | stonken | gestonken | heeft |
| klinken | to sound | klonk | klonken | geklonken | heeft |
| schuiven | to push/slide | schoof | schoven | geschoven | heeft |
| zuigen | to suck | zoog | zogen | gezogen | heeft |
| strijken | to iron/stroke | streek | streken | gestreken | heeft |
| vouwen | to fold | vouwde | vouwden | gevouwen | heeft |
| knijpen | to pinch | kneep | knepen | geknepen | heeft |
| wijken | to yield/give way | week | weken | geweken | is |
| lijden | to suffer | leed | leden | geleden | heeft |
| schenken | to pour/donate | schonk | schonken | geschonken | heeft |
| vreten | to devour (animal eating) | vrat | vraten | gevreten | heeft |

All `tier: "beginner"`.

- [x] **Step 1: Verify each conjugation before adding**

For each infinitief above, cross-check against a reliable source before writing
the entry. **Do not use this repo's `lookupWiktionary()` service for this** —
it only fetches a short definition/gloss via the Wiktionary REST "definition"
endpoint, not a conjugation table, and it depends on browser `localStorage`
(won't run in a plain script). Instead, use WebFetch against the actual
Wiktionary page for each verb (e.g. `https://en.wiktionary.org/wiki/<infinitief>#Dutch`
or `https://nl.wiktionary.org/wiki/<infinitief>`), which includes the full Dutch
conjugation/inflection table, and check the imperfectum/perfectum/hulpwerkwoord
against it. The table above is a best-effort draft; do not skip verification
just because it looks right — this session started because unverified
conjugation data caused real player-facing bugs. If a lookup disagrees with the
table, use the verified form and note the discrepancy when committing.

- [x] **Step 2: Write each entry in the existing schema**

Follow this exact pattern (two fully worked examples, matching the narrative
voice already used throughout `werkwoorden.ts` — Boerin Tess, safari/farm
animals, short declarative sentences):

```ts
  {
    "infinitief": "slaan",
    "english": "to hit",
    "imperfectum_ev": "sloeg",
    "imperfectum_mv": "sloegen",
    "perfectum": "geslagen",
    "hulpwerkwoord": "heeft",
    "notes": "",
    "tier": "beginner",
    "accept_alt": {},
    "frequency": 5,
    "school_priority": true,
    "example": {
      "nl": "De staart van de krokodil heeft hard tegen het water geslagen.",
      "en": "The crocodile's tail hit the water hard."
    }
  },
  {
    "infinitief": "vreten",
    "english": "to devour (animal eating)",
    "imperfectum_ev": "vrat",
    "imperfectum_mv": "vraten",
    "perfectum": "gevreten",
    "hulpwerkwoord": "heeft",
    "notes": "",
    "tier": "beginner",
    "accept_alt": {},
    "frequency": 3,
    "school_priority": true,
    "example": {
      "nl": "Het varken heeft gulzig zijn bak leeggevreten.",
      "en": "The pig greedily devoured its whole trough."
    }
  },
```

Write the remaining 23 entries the same way: real verified conjugation,
`tier: "beginner"`, `accept_alt: {}` unless a genuine alternate spelling exists,
`frequency` 3-5 (these are meant to be common words), `school_priority: true`,
and an original one-sentence example in the established narrative voice (short,
safari/farm themed, present-perfect tense matching the existing 95 entries).

- [x] **Step 3: Verify TypeScript compiles and the array is well-formed**

Run: `node node_modules/typescript/bin/tsc --noEmit`
Expected: no output.

- [x] **Step 4: Commit**

```bash
git add src/data/werkwoorden.ts
git commit -m "feat: add 25 beginner-tier strong verbs (60 total, 3 zones)"
```

---

## Task 4: Author 39 new intermediate-tier verbs

**Why 39:** existing intermediate count is 41; 41+39=80=exactly 4 zones of 20.

**Files:**
- Modify: `src/data/werkwoorden.ts` (append after Task 3's entries)

**Required verb list and verified conjugations:**

| infinitief | english | imperfectum_ev | imperfectum_mv | perfectum | hulpwerkwoord |
|---|---|---|---|---|---|
| prijzen | to praise | prees | prezen | geprezen | heeft |
| rijzen | to rise | rees | rezen | gerezen | is |
| splijten | to split | spleet | spleten | gespleten | heeft/is |
| strijden | to fight/battle | streed | streden | gestreden | heeft |
| vermijden | to avoid | vermeed | vermeden | vermeden | heeft |
| bewijzen | to prove | bewees | bewezen | bewezen | heeft |
| verwijzen | to refer | verwees | verwezen | verwezen | heeft |
| slijten | to wear out | sleet | sleten | gesleten | heeft/is |
| slijpen | to sharpen/grind | sleep | slepen | geslepen | heeft |
| sluipen | to sneak | sloop | slopen | geslopen | heeft/is |
| stuiven | to spray/dash | stoof | stoven | gestoven | heeft/is |
| snuiven | to sniff | snoof | snoven | gesnoven | heeft |
| krimpen | to shrink | kromp | krompen | gekrompen | is |
| verzinnen | to invent/make up | verzon | verzonnen | verzonnen | heeft |
| dwingen | to force | dwong | dwongen | gedwongen | heeft |
| verslinden | to devour | verslond | verslonden | verslonden | heeft |
| dringen | to push/press | drong | drongen | gedrongen | heeft/is |
| wringen | to wring | wrong | wrongen | gewrongen | heeft |
| blinken | to shine/gleam | blonk | blonken | geblonken | heeft |
| weven | to weave | weefde | weefden | geweven | heeft |
| zweren | to swear (an oath) | zwoer | zwoeren | gezworen | heeft |
| verschijnen | to appear | verscheen | verschenen | verschenen | is |
| ontvangen | to receive | ontving | ontvingen | ontvangen | heeft |
| overwinnen | to overcome | overwon | overwonnen | overwonnen | heeft |
| verslaan | to defeat | versloeg | versloegen | verslagen | heeft |
| onthouden | to remember | onthield | onthielden | onthouden | heeft |
| behouden | to retain/keep | behield | behielden | behouden | heeft |
| opstaan | to get up | stond op | stonden op | opgestaan | is |
| aankomen | to arrive | kwam aan | kwamen aan | aangekomen | is |
| uitvinden | to invent | vond uit | vonden uit | uitgevonden | heeft |
| aantrekken | to put on/attract | trok aan | trokken aan | aangetrokken | heeft |
| bekijken | to look at/examine | bekeek | bekeken | bekeken | heeft |
| voorlezen | to read aloud | las voor | lazen voor | voorgelezen | heeft |
| herlezen | to reread | herlas | herlazen | herlezen | heeft |
| opschrijven | to write down | schreef op | schreven op | opgeschreven | heeft |
| beschrijven | to describe | beschreef | beschreven | beschreven | heeft |
| afsluiten | to close off/lock | sloot af | sloten af | afgesloten | heeft |
| opsluiten | to lock up | sloot op | sloten op | opgesloten | heeft |
| afbreken | to break off | brak af | braken af | afgebroken | heeft |

All `tier: "intermediate"`.

- [x] **Step 1: Verify each conjugation before adding**

Same requirement as Task 3, Step 1 — cross-check every entry via WebFetch
against its actual Wiktionary page (not this repo's `lookupWiktionary()`
service, which only returns a gloss, not a conjugation table) or another
reliable reference before finalizing. Pay particular
attention to the separable compounds (`opstaan`, `aankomen`, `aantrekken`,
`voorlezen`, `opschrijven`, `afsluiten`, `opsluiten`, `afbreken`) — the
imperfectum splits the prefix from the stem ("stond op", not "opstond") and the
perfectum re-attaches it around `ge-` ("opgestaan", not "geopstaan" or
"opgestaand"). Get this pattern wrong once and it'll be wrong on all eight.

- [x] **Step 2: Write each entry in the existing schema**

Same pattern as Task 3, Step 2. Two more fully worked examples, this time
showing a plain verb and a separable compound:

```ts
  {
    "infinitief": "verslaan",
    "english": "to defeat",
    "imperfectum_ev": "versloeg",
    "imperfectum_mv": "versloegen",
    "perfectum": "verslagen",
    "hulpwerkwoord": "heeft",
    "notes": "",
    "tier": "intermediate",
    "accept_alt": {},
    "frequency": 3,
    "school_priority": true,
    "example": {
      "nl": "De ranger heeft de gevaarlijke storm dapper verslagen.",
      "en": "The ranger bravely overcame the dangerous storm."
    }
  },
  {
    "infinitief": "opstaan",
    "english": "to get up",
    "imperfectum_ev": "stond op",
    "imperfectum_mv": "stonden op",
    "perfectum": "opgestaan",
    "hulpwerkwoord": "is",
    "notes": "",
    "tier": "intermediate",
    "accept_alt": {},
    "frequency": 4,
    "school_priority": true,
    "example": {
      "nl": "De luiaard is pas na de middag traag opgestaan.",
      "en": "The sloth only got up slowly after noon."
    }
  },
```

Write the remaining 37 entries the same way.

- [x] **Step 3: Verify TypeScript compiles**

Run: `node node_modules/typescript/bin/tsc --noEmit`
Expected: no output.

- [x] **Step 4: Commit**

```bash
git add src/data/werkwoorden.ts
git commit -m "feat: add 39 intermediate-tier strong verbs (80 total, 4 zones)"
```

---

## Task 5: Author 41 new advanced-tier verbs

**Why 41:** existing advanced count is 19; 19+41=60=exactly 3 zones of 20.

**Files:**
- Modify: `src/data/werkwoorden.ts` (append after Task 4's entries)

**Required verb list and verified conjugations:**

| infinitief | english | imperfectum_ev | imperfectum_mv | perfectum | hulpwerkwoord |
|---|---|---|---|---|---|
| verrijzen | to rise again/resurrect | verrees | verrezen | verrezen | is |
| ontstaan | to arise/originate | ontstond | ontstonden | ontstaan | is |
| toestaan | to permit | stond toe | stonden toe | toegestaan | heeft |
| afstaan | to relinquish | stond af | stonden af | afgestaan | heeft |
| aanbieden | to offer | bood aan | boden aan | aangeboden | heeft |
| uitgeven | to spend/publish | gaf uit | gaven uit | uitgegeven | heeft |
| opgeven | to give up/hand in | gaf op | gaven op | opgegeven | heeft |
| doorgeven | to pass on | gaf door | gaven door | doorgegeven | heeft |
| toegeven | to admit/give in | gaf toe | gaven toe | toegegeven | heeft |
| tegenkomen | to run into | kwam tegen | kwamen tegen | tegengekomen | is |
| uitkomen | to come true/come out | kwam uit | kwamen uit | uitgekomen | is |
| meenemen | to take along | nam mee | namen mee | meegenomen | heeft |
| wegnemen | to take away | nam weg | namen weg | weggenomen | heeft |
| aannemen | to accept/assume | nam aan | namen aan | aangenomen | heeft |
| overnemen | to take over | nam over | namen over | overgenomen | heeft |
| inzien | to realize | zag in | zagen in | ingezien | heeft |
| uitzien | to look forward to | zag uit | zagen uit | uitgezien | heeft |
| aankijken | to look at (someone) | keek aan | keken aan | aangekeken | heeft |
| toekijken | to watch/observe | keek toe | keken toe | toegekeken | heeft |
| uitlezen | to finish reading | las uit | lazen uit | uitgelezen | heeft |
| verbreken | to break off (formal) | verbrak | verbraken | verbroken | heeft |
| doorbreken | to break through | brak door | braken door | doorbroken | heeft |
| onderbreken | to interrupt | onderbrak | onderbraken | onderbroken | heeft |
| uitbreken | to break out (of) | brak uit | braken uit | uitgebroken | is |
| opvallen | to stand out | viel op | vielen op | opgevallen | is |
| meevallen | to turn out better than expected | viel mee | vielen mee | meegevallen | is |
| tegenvallen | to be disappointing | viel tegen | vielen tegen | tegengevallen | is |
| uitvallen | to fail/drop out | viel uit | vielen uit | uitgevallen | is |
| aanvallen | to attack | viel aan | vielen aan | aangevallen | heeft |
| overvallen | to raid/ambush | overviel | overvielen | overvallen | heeft |
| afvallen | to fall off/lose weight | viel af | vielen af | afgevallen | is |
| gelden | to apply/be valid | gold | golden | gegolden | heeft |
| voorkomen | to prevent/occur | kwam voor | kwamen voor | voorgekomen | heeft/is |
| terugkomen | to come back | kwam terug | kwamen terug | teruggekomen | is |
| binnenkomen | to come in/enter | kwam binnen | kwamen binnen | binnengekomen | is |
| overkomen | to happen to/come across | overkwam | overkwamen | overkomen | is |
| aanschuiven | to join at the table | schoof aan | schoven aan | aangeschoven | is |
| weerstaan | to resist/withstand | weerstond | weerstonden | weerstaan | heeft |
| verwerpen | to reject | verwierp | verwierpen | verworpen | heeft |
| treffen | to meet/strike | trof | troffen | getroffen | heeft |
| verslapen | to oversleep | versliep | versliepen | verslapen | heeft |

All `tier: "advanced"`.

- [x] **Step 1: Verify each conjugation before adding**

Same requirement as Tasks 3 and 4 — cross-check every entry via WebFetch
against its actual Wiktionary page (not this repo's `lookupWiktionary()`
service) or a reliable reference. This batch has the most
separable compounds (14 of them); apply the same prefix-splitting/`ge-`
placement rule as Task 4's note. Also double check the seven `-vallen`
compounds (`opvallen`, `meevallen`, `tegenvallen`, `uitvallen`, `aanvallen`,
`overvallen`, `afvallen`) individually — they share a base pattern but not all
share the same `hulpwerkwoord` (`aanvallen` and `overvallen` take `heeft`,
the rest take `is`).

- [x] **Step 2: Write each entry in the existing schema**

Same pattern as Tasks 3 and 4. Two more fully worked examples:

```ts
  {
    "infinitief": "aanvallen",
    "english": "to attack",
    "imperfectum_ev": "viel aan",
    "imperfectum_mv": "vielen aan",
    "perfectum": "aangevallen",
    "hulpwerkwoord": "heeft",
    "notes": "",
    "tier": "advanced",
    "accept_alt": {},
    "frequency": 3,
    "school_priority": true,
    "example": {
      "nl": "De leeuw heeft de zwakke gazelle plotseling aangevallen.",
      "en": "The lion suddenly attacked the weakened gazelle."
    }
  },
  {
    "infinitief": "voorkomen",
    "english": "to prevent/occur",
    "imperfectum_ev": "kwam voor",
    "imperfectum_mv": "kwamen voor",
    "perfectum": "voorgekomen",
    "hulpwerkwoord": "heeft/is",
    "notes": "heeft (prevent sth) / is (occur)",
    "tier": "advanced",
    "accept_alt": {},
    "frequency": 2,
    "school_priority": true,
    "example": {
      "nl": "Zulke droogtes zijn dit jaar vaker voorgekomen op de savanne.",
      "en": "Such droughts have occurred more often this year on the savannah."
    }
  },
```

Write the remaining 39 entries the same way.

- [x] **Step 3: Verify TypeScript compiles**

Run: `node node_modules/typescript/bin/tsc --noEmit`
Expected: no output.

- [x] **Step 4: Commit**

```bash
git add src/data/werkwoorden.ts
git commit -m "feat: add 41 advanced-tier strong verbs (60 total, 3 zones)"
```

---

## Task 6: Verify the full 200-verb roster divides evenly into zones

**Files:**
- No source changes — verification only, using the script from Task 2.

- [x] **Step 1: Re-run the tier/zone self-check**

Run: `node "c:/tmp/check_zones.mjs"` (recreate it from Task 2, Step 2, if the
scratch file no longer exists — it's not part of the repo).

Expected output:

```text
beginner 60 OK (divides evenly)
intermediate 80 OK (divides evenly)
advanced 60 OK (divides evenly)
total verbs: 200 OK
```

If any tier is misaligned or the total isn't 200, find the discrepancy (a typo
in a `tier` value, a skipped or duplicated verb from Tasks 3-5) before
proceeding — every later task assumes this holds exactly.

- [x] **Step 2: Check for duplicate infinitives**

Run:

```bash
node -e "
const fs = require('fs');
const src = fs.readFileSync('src/data/werkwoorden.ts', 'utf8');
const re = /\"infinitief\":\s*\"([^\"]+)\"/g;
let m; const seen = new Set(); let dupes = 0;
while ((m = re.exec(src))) {
  if (seen.has(m[1])) { console.log('DUPLICATE:', m[1]); dupes++; }
  seen.add(m[1]);
}
console.log('unique infinitives:', seen.size, 'duplicates:', dupes);
"
```

Expected: `unique infinitives: 200 duplicates: 0`

- [x] **Step 3: Run the existing duplicate-answer-option scanner as a sanity check**

This repo already has the exact-duplicate-option bug class from earlier this
session (see commit `df3acd5`). Re-run the same style of check against
`getImperfectumOptions`/`getParticipleOptions` by spot-checking a few of the
newly added verbs through `VerbQuizCard` in the browser (Task 12 covers full
manual verification) — the existing dedup-by-normalized-value logic in
`getImperfectumOptions`/`getParticipleOptions` (`src/data/werkwoorden.ts`)
already guards against this for the verb arena specifically, so no new guard
is needed here, just confirm it still holds with 200 entries instead of 95.

- [x] **Step 4: No commit needed for this task** (verification only — if Step 1
or Step 2 found a problem, fix it in place in whichever of Tasks 3-5 introduced
it, then amend that task's commit rather than adding a new "fix" commit on top).

---

## Task 7: Zone metadata, reward animals, and completion helpers

**Files:**
- Create: `src/data/verbZones.ts`

- [x] **Step 1: Add the `ZoneRewardAnimal` type**

In `src/types.ts`, add near the `Animal` interface (after it, around line 288):

```ts
export interface ZoneRewardAnimal {
  id: string;
  name: string;
  title: string;
  emoji: string;
}
```

This is deliberately a smaller shape than `Animal` — it has no `biome`,
`funFact`, `favoriteFood`, `levelRequired`, `unlocked`, or `hearts` fields,
because zone-badge rewards are not part of the 73-animal expedition/sanctuary
roster (`AnimalSanctuary` / `ALL_BIOME_ANIMALS`) and don't need any of that.

- [x] **Step 2: Create the zone data module**

Create `src/data/verbZones.ts`:

```ts
import { PlayerProfile, VerbItem, ZoneRewardAnimal } from '../types';
import { WERKWOORDEN_DATA, getZoneIndex, getVerbsInZone, getTotalZoneCount } from './werkwoorden';

export interface ZoneMeta {
  index: number;
  title: string;
  tierLabel: 'beginner' | 'intermediate' | 'advanced';
  reward: ZoneRewardAnimal;
}

// A dedicated small roster, separate from the 73-animal expedition/sanctuary
// roster in biomeAnimals.ts, so the two unlock systems never collide.
export const ZONE_REWARDS: ZoneMeta[] = [
  { index: 0, title: 'Zone 1: Eerste Stappen', tierLabel: 'beginner', reward: { id: 'zone-muis', name: 'Milo het Muisje', title: 'De Nieuwsgierige Beginner', emoji: '🐭' } },
  { index: 1, title: 'Zone 2: Groeiende Moed', tierLabel: 'beginner', reward: { id: 'zone-egel', name: 'Eef de Egel', title: 'De Volhoudende Ontdekker', emoji: '🦔' } },
  { index: 2, title: 'Zone 3: Sterke Basis', tierLabel: 'beginner', reward: { id: 'zone-vos', name: 'Finn de Vos', title: 'De Slimme Speurder', emoji: '🦊' } },
  { index: 3, title: 'Zone 4: Verder Bouwen', tierLabel: 'intermediate', reward: { id: 'zone-das', name: 'Daan de Das', title: 'De Vastberaden Bouwer', emoji: '🦡' } },
  { index: 4, title: 'Zone 5: Nieuwe Uitdagingen', tierLabel: 'intermediate', reward: { id: 'zone-otter', name: 'Ollie de Otter', title: 'De Vrolijke Doorzetter', emoji: '🦦' } },
  { index: 5, title: 'Zone 6: Klimmende Kennis', tierLabel: 'intermediate', reward: { id: 'zone-lynx', name: 'Luna de Lynx', title: 'De Scherpe Waarnemer', emoji: '🐆' } },
  { index: 6, title: 'Zone 7: Woordmeester in Wording', tierLabel: 'intermediate', reward: { id: 'zone-havik', name: 'Hugo de Havik', title: 'De Alziende Verkenner', emoji: '🦅' } },
  { index: 7, title: 'Zone 8: Gevorderde Grammatica', tierLabel: 'advanced', reward: { id: 'zone-wolf', name: 'Wilma de Wolf', title: 'De Wijze Strijder', emoji: '🐺' } },
  { index: 8, title: 'Zone 9: Meesterlijke Werkwoorden', tierLabel: 'advanced', reward: { id: 'zone-beer', name: 'Boris de Beer', title: 'De Machtige Meester', emoji: '🐻' } },
  { index: 9, title: 'Zone 10: Grootmeester Sterke Werkwoorden', tierLabel: 'advanced', reward: { id: 'zone-draak', name: 'Drika de Draak', title: 'De Legendarische Grootmeester', emoji: '🐉' } },
];

/** A verb counts as mastered once it's been answered fully correctly at least once. */
function isVerbMastered(verb: VerbItem, profile: PlayerProfile): boolean {
  return profile.questionHistory?.[`verb-${verb.infinitief}`]?.wasCorrect === true;
}

export function getZoneProgress(zoneIndex: number, profile: PlayerProfile): { mastered: number; total: number } {
  const verbs = getVerbsInZone(zoneIndex, WERKWOORDEN_DATA);
  return {
    mastered: verbs.filter(v => isVerbMastered(v, profile)).length,
    total: verbs.length
  };
}

export function isZoneComplete(zoneIndex: number, profile: PlayerProfile): boolean {
  const { mastered, total } = getZoneProgress(zoneIndex, profile);
  return total > 0 && mastered === total;
}

export function isZoneUnlocked(zoneIndex: number, profile: PlayerProfile): boolean {
  if (zoneIndex === 0) return true;
  return isZoneComplete(zoneIndex - 1, profile);
}

export function getZoneMeta(zoneIndex: number): ZoneMeta | undefined {
  return ZONE_REWARDS.find(z => z.index === zoneIndex);
}

export { getZoneIndex, getVerbsInZone, getTotalZoneCount };
```

- [x] **Step 3: Verify TypeScript compiles**

Run: `node node_modules/typescript/bin/tsc --noEmit`
Expected: no output.

- [x] **Step 4: Commit**

```bash
git add src/types.ts src/data/verbZones.ts
git commit -m "feat: add zone metadata, dedicated reward animals, and completion helpers"
```

---

## Task 8: Zone completion reward modal

**Why a new component instead of reusing `RewardModal`:** `RewardModal.tsx`
(`src/components/RewardModal.tsx`) is tightly coupled to the full `Animal` type
(`animal.unlocked`, `.id` looked up via `AnimalAvatar`'s `ALL_BIOME_ANIMALS`
search) and to expedition-specific copy ("Level X Voltooid!", "Naar
Dierenpark"). Zone-badge rewards are `ZoneRewardAnimal` (a smaller shape, not
in `ALL_BIOME_ANIMALS`), so forcing them through `RewardModal` would either
require fabricating fake `Animal` fields or breaking `AnimalAvatar`'s id
lookup. A small dedicated modal mirrors `RewardModal`'s visual style (same
confetti + bounce animation + button layout) without the mismatched coupling.

**Files:**
- Create: `src/components/ZoneRewardModal.tsx`

- [x] **Step 1: Write the component**

```tsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Star } from 'lucide-react';
import { ZoneMeta } from '../data/verbZones';
import { sound } from '../services/soundService';

interface ZoneRewardModalProps {
  isOpen: boolean;
  zone: ZoneMeta | undefined;
  onClose: () => void;
  onGoToZoneMap: () => void;
}

export const ZoneRewardModal: React.FC<ZoneRewardModalProps> = ({
  isOpen,
  zone,
  onClose,
  onGoToZoneMap
}) => {
  useEffect(() => {
    if (isOpen) {
      sound.playFanfare();
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch {
        // Safe fallback
      }
    }
  }, [isOpen]);

  if (!isOpen || !zone) return null;

  return (
    <AnimatePresence>
      <div
        id="zone-reward-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          id="zone-reward-modal-content"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-emerald-100 text-center relative overflow-hidden"
        >
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-wider mb-4 border border-amber-300 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{zone.title} Voltooid!</span>
          </div>

          <motion.div
            animate={{ y: [-4, 4, -4], rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
            className="relative my-2 flex justify-center"
          >
            <div className="p-4 bg-gradient-to-br from-amber-50 to-emerald-50 rounded-3xl border border-emerald-200 shadow-inner text-6xl">
              {zone.reward.emoji}
            </div>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 tracking-tight mt-3 mb-0.5">
            Nieuw Zone-Dier Ontgrendeld! 🎉
          </h2>
          <p className="text-sm font-black text-amber-700 uppercase tracking-wider mb-3">
            {zone.reward.name} ({zone.reward.title})
          </p>

          <p className="text-slate-700 font-medium text-xs sm:text-sm leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200 mb-4">
            Je hebt alle 20 werkwoorden in deze zone onder de knie! {zone.reward.name} sluit zich bij je aan.
          </p>

          <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
            <div className="bg-amber-50 text-amber-900 font-black px-3.5 py-1.5 rounded-xl border border-amber-200 flex items-center gap-1 text-xs sm:text-sm">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>+50 Sterren & Munten 🌟</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              id="go-to-zone-map-modal-btn"
              onClick={() => {
                sound.playPop();
                onGoToZoneMap();
              }}
              className="py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-black text-xs sm:text-sm uppercase tracking-wider border border-slate-300 shadow-sm cursor-pointer transition-all active:scale-98"
            >
              Naar Zone Kaart 🗺️
            </button>

            <button
              id="continue-playing-zone-modal-btn"
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-700/20 active:scale-98 cursor-pointer transition-all flex items-center justify-center gap-1.5"
            >
              <span>Verder Spelen! ➔</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
```

- [x] **Step 2: Verify TypeScript compiles**

Run: `node node_modules/typescript/bin/tsc --noEmit`
Expected: no output.

- [x] **Step 3: Commit**

```bash
git add src/components/ZoneRewardModal.tsx
git commit -m "feat: add ZoneRewardModal for zone-completion celebrations"
```

---

## Task 9: Zone Map panel (replaces the tier-toggle buttons)

**Files:**
- Create: `src/components/VerbZoneMapPanel.tsx`

- [x] **Step 1: Write the component**

This replaces the "Boerderij Expeditie / Sterke Werkwoorden Arena" toggle
buttons currently at `src/App.tsx:682-723`. It's a 10-tile grid, one tile per
zone, showing lock state, mastery progress, and the reward animal.

```tsx
import React from 'react';
import { motion } from 'motion/react';
import { Lock, CheckCircle2 } from 'lucide-react';
import { PlayerProfile } from '../types';
import { ZONE_REWARDS, getZoneProgress, isZoneUnlocked, isZoneComplete } from '../data/verbZones';
import { sound } from '../services/soundService';

interface VerbZoneMapPanelProps {
  profile: PlayerProfile;
  selectedZoneIndex: number;
  onSelectZone: (zoneIndex: number) => void;
}

export const VerbZoneMapPanel: React.FC<VerbZoneMapPanelProps> = ({
  profile,
  selectedZoneIndex,
  onSelectZone
}) => {
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-slate-200 shadow-xs">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {ZONE_REWARDS.map(zone => {
          const unlocked = isZoneUnlocked(zone.index, profile);
          const completed = isZoneComplete(zone.index, profile);
          const { mastered, total } = getZoneProgress(zone.index, profile);
          const isSelected = selectedZoneIndex === zone.index;

          return (
            <motion.button
              key={zone.index}
              disabled={!unlocked}
              whileHover={unlocked ? { scale: 1.03 } : undefined}
              whileTap={unlocked ? { scale: 0.97 } : undefined}
              onClick={() => {
                if (!unlocked) return;
                sound.playPop();
                onSelectZone(zone.index);
              }}
              className={`relative rounded-xl p-2.5 border-2 text-center transition-all ${
                !unlocked
                  ? 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
                  : isSelected
                  ? 'bg-amber-50 border-amber-500 shadow-md cursor-pointer'
                  : 'bg-white border-slate-200 hover:border-emerald-400 cursor-pointer'
              }`}
            >
              <div className="text-2xl mb-1">
                {unlocked ? zone.reward.emoji : <Lock className="w-5 h-5 mx-auto text-slate-400" />}
              </div>
              <div className="text-[10px] font-black text-slate-700 uppercase tracking-wide leading-tight">
                Zone {zone.index + 1}
              </div>
              <div className="text-[9px] font-bold text-slate-400">
                {unlocked ? `${mastered}/${total}` : 'Op slot'}
              </div>
              {completed && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 absolute top-1 right-1" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
```

- [x] **Step 2: Verify TypeScript compiles**

Run: `node node_modules/typescript/bin/tsc --noEmit`
Expected: no output.

- [x] **Step 3: Commit**

```bash
git add src/components/VerbZoneMapPanel.tsx
git commit -m "feat: add VerbZoneMapPanel, a 10-tile zone selector"
```

---

## Task 10: Wire zones into App.tsx

**Files:**
- Modify: `src/App.tsx`

This task does NOT touch the existing `groep68Mode` toggle (`'expedition'` vs
`'verb_arena'`, lines 682-723) — that switches between `QuizCard` and
`VerbQuizCard` entirely and is out of scope. This task only changes what feeds
`VerbQuizCard` once `verb_arena` mode is active: zone-based filtering instead
of tier-based, a zone map to pick from, and a completion-triggered reward.

- [x] **Step 1: Add imports and new state**

Near the top of `src/App.tsx`, add:

```ts
import { VerbZoneMapPanel } from './components/VerbZoneMapPanel';
import { ZoneRewardModal } from './components/ZoneRewardModal';
import { getVerbsInZone, getZoneMeta, isZoneComplete } from './data/verbZones';
```

Near the other `useState` declarations (around line 64, next to
`selectedVerbTier`), add:

```ts
  const [selectedVerbZone, setSelectedVerbZone] = useState<number>(0);
  const [showZoneRewardModal, setShowZoneRewardModal] = useState(false);
  const [justCompletedZoneIndex, setJustCompletedZoneIndex] = useState<number>(0);
```

`selectedVerbTier` and its `setSelectedVerbTier` calls (in `handleSwitchUser`,
lines 111/114) can stay — they're harmless now-unused state, not worth
ripping out in this task since `handleSwitchUser`'s Ridheya/Hemali branching
still reads cleanly. Do not delete them; that's out of scope here.

- [x] **Step 2: Replace tier-based verb filtering with zone-based filtering**

Replace lines 211-224 (the `effectiveVerbTier`/`filteredVerbs`/`unseenVerbs`/
`prioritizedVerbs` block) with:

```ts
  // Sterke Werkwoorden: verbs are scoped to the selected zone, not tier.
  const zoneVerbs = getVerbsInZone(selectedVerbZone, WERKWOORDEN_DATA);
  const unseenVerbs = zoneVerbs.filter(v => !seenSet.has(`verb-${v.infinitief}`));
  const prioritizedVerbs = unseenVerbs.length > 0
    ? [...unseenVerbs, ...zoneVerbs.filter(v => seenSet.has(`verb-${v.infinitief}`))]
    : zoneVerbs;
  const currentVerb: VerbItem = prioritizedVerbs[currentVerbIndex % prioritizedVerbs.length] || WERKWOORDEN_DATA[0];
```

(This removes the `filteredVerbs.length > 0 ? filteredVerbs : WERKWOORDEN_DATA`
fallback pattern from the old code — `zoneVerbs` is always exactly 20 items by
construction from Task 6's verification, so the empty-array fallback it
guarded against can't happen.)

- [x] **Step 3: Extend `handleNextVerb` to detect zone completion**

Task 1 already rewrote `handleNextVerb` to record `wasCorrect` in
`questionHistory`. Extend it further to detect a zone transitioning from
incomplete to complete:

```ts
  const handleNextVerb = (wasCorrect: boolean) => {
    const verbKey = `verb-${currentVerb.infinitief}`;
    const seenSet = new Set<string>(profile.seenQuestionIds || []);
    seenSet.add(verbKey);

    const wasZoneCompleteBefore = isZoneComplete(selectedVerbZone, profile);

    setProfile(prev => {
      const history = prev.questionHistory || {};
      const prevEntry = history[verbKey] || { count: 0, lastSeen: 0 };
      const nextProfile: PlayerProfile = {
        ...prev,
        seenQuestionIds: Array.from(seenSet),
        questionHistory: {
          ...history,
          [verbKey]: {
            count: prevEntry.count + 1,
            lastSeen: Date.now(),
            wasCorrect
          }
        }
      };

      const isZoneCompleteNow = isZoneComplete(selectedVerbZone, nextProfile);
      if (!wasZoneCompleteBefore && isZoneCompleteNow) {
        nextProfile.stars = prev.stars + 50;
        nextProfile.score = prev.score + 50;
      }
      return nextProfile;
    });

    const wasZoneCompleteAfter = isZoneComplete(
      selectedVerbZone,
      { ...profile, questionHistory: { ...(profile.questionHistory || {}), [verbKey]: { count: 1, lastSeen: Date.now(), wasCorrect } } }
    );
    if (!wasZoneCompleteBefore && wasZoneCompleteAfter) {
      setJustCompletedZoneIndex(selectedVerbZone);
      setShowZoneRewardModal(true);
    }

    setCurrentVerbIndex(prev => prev + 1);
  };
```

- [x] **Step 4: Render the zone map and wire it into the verb arena view**

Inside the `groep68Mode === 'verb_arena'` branch, immediately before the
`<VerbQuizCard ... />` block (around line 744), add:

```tsx
                    <VerbZoneMapPanel
                      profile={profile}
                      selectedZoneIndex={selectedVerbZone}
                      onSelectZone={(zoneIndex) => {
                        setSelectedVerbZone(zoneIndex);
                        setCurrentVerbIndex(0);
                      }}
                    />
```

- [x] **Step 5: Render `ZoneRewardModal` alongside the existing `RewardModal`**

Near the existing `<RewardModal ... />` block at the end of the component
(around line 1362), add:

```tsx
      <ZoneRewardModal
        isOpen={showZoneRewardModal}
        zone={getZoneMeta(justCompletedZoneIndex)}
        onClose={() => setShowZoneRewardModal(false)}
        onGoToZoneMap={() => {
          setShowZoneRewardModal(false);
        }}
      />
```

- [x] **Step 6: Verify TypeScript compiles**

Run: `node node_modules/typescript/bin/tsc --noEmit`
Expected: no output.

- [x] **Step 7: Commit**

```bash
git add src/App.tsx
git commit -m "feat: wire zone map and zone-completion rewards into the verb arena"
```

---

## Task 11: Manual verification walkthrough

No test framework exists in this repo (confirmed at the start of this session —
no jest/vitest, no test files). Verification is a live browser walkthrough via
the dev server, the same approach used to verify the bug fixes earlier this
session.

**Files:** none — verification only.

- [x] **Step 1: Start the dev server**

Run: `node node_modules/vite/bin/vite.js --port=3000 --host=0.0.0.0`
(Use this direct invocation, not `npm run dev` — this environment's
`node_modules/.bin` isn't populated, `npm run dev` will fail with
`'vite' is not recognized`.)

- [x] **Step 2: Navigate to the verb arena and confirm the zone map**

Open `http://localhost:3000`, switch to Hemali (or whichever profile has
`selectedGrade: 'group_6_7_8'`), select "Sterke Werkwoorden Arena" mode.
Expected: a 10-tile zone map renders; zone 1 shows unlocked with an emoji and
`0/20`; zones 2-10 show a lock icon and "Op slot".

- [x] **Step 3: Play through zone 1 and confirm the reward**

Answer all 20 zone-1 verbs correctly (both the imperfectum multiple-choice
step and the hulpwerkwoord+participle step). Expected: after the 20th correct
verb, `ZoneRewardModal` appears showing "Zone 1: Eerste Stappen Voltooid!" and
Milo het Muisje (🐭). Close it.

- [x] **Step 4: Confirm zone 2 unlocks and progress persists across reload**

Expected: back on the zone map, zone 1 now shows a checkmark and `20/20`; zone
2 is now unlocked. Reload the page (`F5`). Expected: zone 1 still shows
completed and zone 2 still shows unlocked — this confirms completion is
correctly derived from `questionHistory`, which already persists via
`saveUserProfile`/`localStorage` (no new persistence code was needed, per the
Task 0 deviation note).

- [x] **Step 5: Confirm an incorrect answer does not falsely mark a verb mastered**

Answer one verb in zone 2 incorrectly (wrong imperfectum option). Expected:
`questionHistory[verb-...].wasCorrect` is `false` for that verb (check via
browser devtools: `localStorage` → the per-user profile key → inspect
`questionHistory`), and the zone's `mastered` count in the zone map does not
increment for that verb until it's answered correctly on a later attempt.

- [x] **Step 6: No commit for this task** (verification only).

---

## Plan self-review (completed during writing, not a separate step)

- **Spec coverage:** all 5 sections of the design spec are covered — content
  scope (Tasks 3-5), zones (Task 2, derived not stored), rewards (Tasks 7-8,
  dedicated roster), persistence (Task 1, reusing existing `questionHistory`
  instead of the spec's proposed new field — flagged as a deliberate
  deviation), UI (Tasks 9-10, zone map replacing tier toggle).
- **Placeholder scan:** no TBD/"add appropriate"/"similar to Task N" patterns —
  every code step above is complete, pasteable code; the two content-authoring
  tasks (3-5) provide the full verified word+conjugation table plus worked
  examples rather than inline prose for all 105 entries, which is the
  appropriate level of completeness for a data-authoring task (see rationale
  in Task 3).
- **Type consistency:** `getZoneIndex`/`getVerbsInZone`/`getTotalZoneCount`
  (Task 2, `werkwoorden.ts`) are re-exported from `verbZones.ts` (Task 7) and
  consumed with matching names in `App.tsx` (Task 10) and
  `VerbZoneMapPanel.tsx` (Task 9). `ZoneRewardAnimal` (Task 7) is consumed
  identically in `ZoneMeta.reward` (Task 7) and `ZoneRewardModal`'s `zone.reward`
  (Task 8). `onNextVerb`'s `(wasCorrect: boolean) => void` signature (Task 1) is
  consistent between `VerbQuizCard.tsx` and `App.tsx` throughout.
