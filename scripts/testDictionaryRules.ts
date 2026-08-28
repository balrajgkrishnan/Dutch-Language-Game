import { syllabifyDutch, findCompoundSplit, lookupDutchWord, clearDictionaryCache } from '../src/services/dutchDictionaryService';

// ==============================================================================
// Rule-engine regression tests: syllabification, compound detection, fallback.
// Run with: node node_modules/tsx/dist/cli.mjs scripts/testDictionaryRules.ts
// ==============================================================================

let pass = 0;
let fail = 0;
const failures: string[] = [];

function expectEq(label: string, actual: unknown, expected: unknown) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) { pass++; }
  else { fail++; failures.push(`${label}\n   expected: ${e}\n   actual:   ${a}`); }
}

function expectTrue(label: string, cond: boolean, detail = '') {
  if (cond) { pass++; }
  else { fail++; failures.push(`${label}${detail ? ' -> ' + detail : ''}`); }
}

// ---------------------------------------------------------------------------
// 1. SYLLABIFICATION — tricky Dutch words (the review's concern #1)
// ---------------------------------------------------------------------------
expectEq("syl bibliotheek", syllabifyDutch('bibliotheek'), ['bi', 'bli', 'o', 'theek']);
expectEq("syl zingen (ng moves right)", syllabifyDutch('zingen'), ['zin', 'gen']);
expectEq("syl banken (nk moves right)", syllabifyDutch('banken'), ['ban', 'ken']);
expectEq("syl lachen (ch moves right)", syllabifyDutch('lachen'), ['la', 'chen']);
expectEq("syl water", syllabifyDutch('water'), ['wa', 'ter']);
expectEq("syl aardappel", syllabifyDutch('aardappel'), ['aard', 'ap', 'pel']);
expectEq("syl telefoon", syllabifyDutch('telefoon'), ['te', 'le', 'foon']);
expectEq("syl schildpad", syllabifyDutch('schildpad'), ['schild', 'pad']);
// every output must reconstruct the word
for (const w of ['bibliotheek', 'zingen', 'water', 'aardappel', 'telefoon', 'tafel', 'onderzoek']) {
  expectTrue(`syl reconstructs ${w}`, syllabifyDutch(w).join('').replace(/-/g, '') === w, syllabifyDutch(w).join('·'));
}

// ---------------------------------------------------------------------------
// 2. COMPOUND DETECTION — false positives must be rejected (concern #3)
// ---------------------------------------------------------------------------
// Loanwords / single morphemes should NOT be detected as compounds:
expectTrue("no split: documentatie", findCompoundSplit('documentatie') === null);
expectTrue("no split: categorie", findCompoundSplit('categorie') === null);
expectTrue("no split: mechanisme", findCompoundSplit('mechanisme') === null);
expectTrue("no split: theorie", findCompoundSplit('theorie') === null);
// Genuine curated compounds SHOULD still split:
expectTrue("splits: rugzak", findCompoundSplit('rugzak') !== null);
expectTrue("splits: bibliotheek? (not a compound, blocked)", findCompoundSplit('bibliotheek') === null);

// ---------------------------------------------------------------------------
// 3. HONEST FALLBACK — unknown / nonsense words never fabricate meaning (#4,#5)
// ---------------------------------------------------------------------------
clearDictionaryCache();
const nonse = lookupDutchWord('koekeloos'); // nonsense "-loos" word
expectTrue("koekeloos flagged unverified", /niet geverifieerd/i.test(nonse.meaningNl));
expectTrue("koekeloos is a labelled hint", /aanwijzing/i.test(nonse.meaningNl));
expectTrue("koekeloos EN is honest", /Unverified word/i.test(nonse.translationEn));
expectTrue("koekeloos marked generated", nonse.isGenerated === true);

const real = lookupDutchWord('pen'); // real word stays real
expectTrue("pen not generated", real.isGenerated !== true);
expectTrue("pen has real meaning", !/niet geverifieerd/i.test(real.meaningNl));

const heid = lookupDutchWord('vrolijkheidblabla'); // long nonsense, -heid-like? no

// Proper name guard still works and capitalizes hyphenated names
const pn = lookupDutchWord('mei-ling');
expectTrue("mei-ling is proper noun", /Proper noun/.test(pn.translationEn));
expectTrue("mei-ling capitalized", pn.meaningNl.includes('Mei-Ling'));

expectTrue("unknown stays honest", /niet geverifieerd|nog.*niet in ons woordenboek/i.test(lookupDutchWord('xzqplmno').meaningNl));

// ---------------------------------------------------------------------------
console.log(`\n${pass} passed, ${fail} failed.`);
if (fail > 0) {
  console.log('\nFAILURES:');
  for (const f of failures) console.log('  ✗ ' + f);
  process.exit(1);
} else {
  console.log('✅ All rule-engine tests passed.');
  process.exit(0);
}