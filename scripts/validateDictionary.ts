import { DUTCH_DICTIONARY_DB } from '../src/data/dutchDictionaryData';
import { DUTCH_VOCABULARY_BANK } from '../src/data/dutchVocabularyBank';
import { DUTCH_EDUCATIONAL_LEXICON } from '../src/services/dutchDictionaryService';

// ==============================================================================
// Dutch Dictionary Integrity Validator
// ==============================================================================
// ERRORS   = hard data violations (fabricated/echo translations, broken
//            syllable or compound reconstructions, missing core fields).
// WARNINGS = soft quality issues (dangling lemma references, missing examples,
//            duplicate keys silently overridden by the DB merge).
// ==============================================================================

const errors: string[] = [];
const warnings: string[] = [];
let scannedDb = 0;
let scannedLex = 0;

/** Collapses a string for structural comparison (ignores spaces, hyphens, apostrophes). */
const collapse = (s: string): string => s.toLowerCase().replace(/[\s\-']/g, '');

/** Strips a leading English article for echo detection ("The pen" -> "pen"). */
const stripArticle = (s: string): string => s.trim().toLowerCase().replace(/^(the|a|an)\s+/, '');

// 1. Scan the main dictionary DB (includes vocabulary bank merge)
for (const [key, entry] of Object.entries(DUTCH_DICTIONARY_DB)) {
  scannedDb++;
  const word = (entry.word ?? key).trim();
  const en = (entry.translationEn ?? '').trim().toLowerCase();
  const nl = (entry.meaningNl ?? '').trim();

  // --- Literal violation checks (original rules) ---
  if (!entry.meaningNl || nl.length < 10) {
    errors.push(`[DB] '${key}' missing/too-short Dutch meaning (meaningNl)`);
  }
  if (en && en === word.toLowerCase()) {
    errors.push(`[DB] '${key}': translationEn echoes the word itself ('${entry.translationEn}')`);
  }
  if (!entry.translationEn) {
    errors.push(`[DB] '${key}' missing English translation`);
  }

  // --- Article-prefixed echo ("The pen", "A school") ---
  if (en && stripArticle(entry.translationEn) === word.toLowerCase() && en !== word.toLowerCase()) {
    errors.push(`[DB] '${key}': translationEn is only the word plus an English article ('${entry.translationEn}')`);
  }

  // --- Meaning that merely repeats the word (useless for Cito practice) ---
  if (nl && collapse(nl) === collapse(word)) {
    errors.push(`[DB] '${key}': meaningNl echoes the word itself`);
  }

  // --- Syllable integrity: joined syllables must reconstruct the word ---
  if (!entry.syllables || entry.syllables.length === 0) {
    errors.push(`[DB] '${key}' missing syllable breakdown`);
  } else if (collapse(entry.syllables.join('')) !== collapse(word)) {
    errors.push(
      `[DB] '${key}' syllables [${entry.syllables.join('·')}] do not reconstruct the word (got '${entry.syllables.join('')}')`
    );
  }

  // --- Compound breakdown integrity: parts must reconstruct the word ---
  if (entry.compound) {
    const parts = collapse(entry.compound.replace(/\+/g, ''));
    if (parts !== collapse(word)) {
      errors.push(`[DB] '${key}' compound breakdown '${entry.compound}' does not reconstruct the word`);
    }
  }

  // --- Soft checks ---
  if (!entry.exampleNl || !entry.exampleNl.trim()) {
    warnings.push(`[DB] '${key}' missing example sentence (exampleNl)`);
  }
  if (entry.lemma) {
    const lemmaKey = entry.lemma.trim().toLowerCase();
    if (!DUTCH_DICTIONARY_DB[lemmaKey] && !DUTCH_EDUCATIONAL_LEXICON[lemmaKey]) {
      warnings.push(`[DB] '${key}' references lemma '${entry.lemma}' that is not in the DB or lexicon`);
    }
  }
}

// 2. Scan the educational lexicon inside the service
for (const [key, lex] of Object.entries(DUTCH_EDUCATIONAL_LEXICON)) {
  scannedLex++;
  const en = (lex.en ?? '').trim().toLowerCase();
  const nl = (lex.nl ?? '').trim();

  if (!lex.nl || nl.length < 10) {
    errors.push(`[LEX] '${key}' missing/too-short Dutch meaning (nl)`);
  }
  if (en && en === key.toLowerCase()) {
    errors.push(`[LEX] '${key}': en echoes the word itself ('${lex.en}')`);
  }
  if (en && stripArticle(lex.en ?? '') === key.toLowerCase() && en !== key.toLowerCase()) {
    errors.push(`[LEX] '${key}': en is only the word plus an English article ('${lex.en}')`);
  }
  if (!lex.en) {
    errors.push(`[LEX] '${key}' missing English gloss`);
  }
  if (nl && collapse(nl) === collapse(key)) {
    errors.push(`[LEX] '${key}': nl echoes the word itself`);
  }
  if (lex.lemma) {
    const lemmaKey = lex.lemma.trim().toLowerCase();
    if (!DUTCH_EDUCATIONAL_LEXICON[lemmaKey] && !DUTCH_DICTIONARY_DB[lemmaKey]) {
      warnings.push(`[LEX] '${key}' references lemma '${lex.lemma}' that is not in the lexicon or DB`);
    }
  }
}

// 3. Duplicate keys silently overridden by the DB merge (...DUTCH_VOCABULARY_BANK, <entries>)
for (const key of Object.keys(DUTCH_VOCABULARY_BANK)) {
  if (Object.prototype.hasOwnProperty.call(DUTCH_DICTIONARY_DB, key)) {
    // Only warn when content actually differs (i.e. a true override, not a re-export)
    if (JSON.stringify(DUTCH_VOCABULARY_BANK[key]) !== JSON.stringify(DUTCH_DICTIONARY_DB[key])) {
      warnings.push(`[DB] key '${key}' exists in both the vocabulary bank and the dictionary data; the dictionary-data version silently wins`);
    }
  }
}

console.log(`Scanned ${scannedDb} DB entries and ${scannedLex} lexicon entries.`);
if (warnings.length > 0) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log('  ⚠ ' + w);
}
if (errors.length === 0) {
  console.log('\n✅ No violations found in data files.');
} else {
  console.log(`\n❌ ${errors.length} violation(s) found:`);
  for (const e of errors) console.log('  - ' + e);
}
process.exit(errors.length === 0 ? 0 : 1);
