/**
 * OpenTaal Dutch Word List Importer
 * Downloads and processes the official Dutch word list for bulk import
 * 
 * Usage: npx tsx scripts/importOpenTaal.ts
 * 
 * OpenTaal word list: https://github.com/OpenTaal/opentaal-wordlist
 * License: Creative Commons BY 4.0 (requires attribution)
 */

import * as fs from 'fs';
import * as path from 'path';

const OPENTAAL_URL = 'https://raw.githubusercontent.com/OpenTaal/opentaal-wordlist/master/wordlist.txt';
const OUTPUT_FILE = path.join(__dirname, '../src/data/opentaalImport.ts');

// High-frequency words to prioritize
const HIGH_PRIORITY_WORDS = new Set([
  'beetje', 'bezig', 'bezoeken', 'daarna', 'daarom', 'eigen', 'eigenlijk', 'elke',
  'erg', 'even', 'gebeurt', 'gebruik', 'gebruiken', 'genoeg', 'gewoon', 'graag',
  'helpen', 'iets', 'klaar', 'komen', 'krijg', 'krijgt', 'kun', 'kunt', 'lang',
  'laten', 'leuk', 'meer', 'meeste', 'men', 'naam', 'niets', 'nodig', 'omdat',
  'onder', 'opnieuw', 'proberen', 'sommige', 'steeds', 'toch', 'toe', 'vertellen',
  'vind', 'vinden', 'voorbeeld', 'wanneer', 'waren', 'weten', 'word', 'worden',
  'wordt', 'zeg', 'zeggen', 'zet', 'zetten', 'zodat', 'zoeken', 'zou'
]);

// Simple syllable approximation
function approximateSyllables(word: string): string[] {
  const vowels = 'aeiouy';
  const result: string[] = [];
  let current = '';
  let vowelCount = 0;
  
  for (let i = 0; i < word.length; i++) {
    const char = word[i].toLowerCase();
    current += word[i];
    if (vowels.includes(char)) {
      vowelCount++;
      if (vowelCount >= 2 && i < word.length - 1 && !vowels.includes(word[i + 1].toLowerCase())) {
        result.push(current);
        current = '';
        vowelCount = 0;
      }
    }
  }
  if (current) result.length ? (result[result.length - 1] += current) : result.push(current);
  return result.length ? result : [word];
}

function guessWordType(word: string): string {
  const lower = word.toLowerCase();
  if (/en$/.test(lower) && lower.length > 3) return 'Werkwoord';
  if (/(ig|lijk|baar|loos|vol)$/.test(lower)) return 'Bijvoeglijk naamwoord';
  if (/(heid|ing|schap|dom)$/.test(lower)) return 'Zelfstandig naamwoord';
  return 'Zelfstandig naamwoord';
}

function determineLevel(word: string): string {
  const syl = approximateSyllables(word).length;
  if (word.length <= 4 && syl <= 2) return 'Groep 3-4 (AVI M3-E4)';
  if (word.length <= 7 && syl <= 3) return 'Groep 4-5 (AVI E4-M5)';
  if (word.length <= 10) return 'Groep 5-6 (AVI M5-E6)';
  return 'Groep 7-8 (Doorstroomtoets)';
}

async function downloadWordList(): Promise<string[]> {
  console.log('Downloading OpenTaal word list...');
  try {
    const response = await fetch(OPENTAAL_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    const words = text.split('\n').map(w => w.trim().toLowerCase())
      .filter(w => w.length >= 2 && w.length <= 15 && /^[a-z]+$/.test(w));
    console.log(`Downloaded ${words.length} words`);
    return words;
  } catch (error) {
    console.log('Using fallback: high-priority words only');
    return Array.from(HIGH_PRIORITY_WORDS);
  }
}

function processWords(words: string[], max = 1000): string {
  const prioritized = words.sort((a, b) => {
    const pa = HIGH_PRIORITY_WORDS.has(a) ? 1 : 0;
    const pb = HIGH_PRIORITY_WORDS.has(b) ? 1 : 0;
    return pb - pa || a.length - b.length;
  });
  
  const selected = prioritized.slice(0, max);
  return selected.map(word => {
    const type = guessWordType(word);
    const level = determineLevel(word);
    const syl = approximateSyllables(word);
    return `  '${word}': {
    word: '${word}',
    wordType: '${type}',
    meaningNl: 'Een woord uit het Nederlands.',
    translationEn: '(translation needed)',
    syllables: [${syl.map(s => `'${s}'`).join(', ')}],
    exampleNl: 'Het woord "${word}" wordt gebruikt in het verhaal.',
    level: '${level}',
    isGenerated: true
  }`;
  }).join(',\n');
}

async function main() {
  console.log('=== OpenTaal Dutch Dictionary Importer ===\n');
  const words = await downloadWordList();
  console.log(`Processing up to 1000 words...`);
  const entries = processWords(words, 1000);
  
  const output = `// AUTO-GENERATED from OpenTaal Dutch Word List
// Source: https://github.com/OpenTaal/opentaal-wordlist
// License: CC BY 4.0 (requires attribution to OpenTaal)
import { DictionaryEntry } from './dutchDictionaryData';

export const OPENTAAL_IMPORT: Record<string, DictionaryEntry> = {
${entries}
};

export const OPENTAAL_COUNT = Object.keys(OPENTAAL_IMPORT).length;
`;
  
  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
  console.log(`\n✓ Generated ${OUTPUT_FILE}`);
  console.log('NOTE: Translations are placeholders - manual review needed.');
}

if (require.main === module) main().catch(console.error);
export { main };
