const fs = require('fs');

const CORE_WORDS = ['de','het','een','die','dat','en','van','ik','je','niet','te','hij','er','maar','me','die','heb','voor','met','zijn','dit','al','uit','aan','door','naar','over','zich','bij','dan','om','nog','wil','wel','kan','na','geen','zo','nu','hem','heeft','we','hier','werd','zou','gaan','bent','waar','omdat','doen','laten','maken','komen','willen','zeggen','zien','geven','staan','moeten','kunnen','nemen','houden','vinden','helpen','vragen','liggen','lezen','lopen','spelen','wonen','blijven','zetten','praten','slapen','eten','drinken','werken','schrijven','denken','horen','zitten','zoeken','wachten','kijken','brengen','halen','pakken'];

function extractGameWords() {
  const files = ['src/data/gameData.ts','src/data/biomeLevels45.ts','src/data/groep68Spelling.ts','src/data/companionData.ts'];
  const wordCounts = new Map();
  const pattern = /[a-zA-Z]+/g;
  files.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      const matches = content.match(pattern) || [];
      matches.forEach(w => {
        const word = w.toLowerCase();
        if (word.length >= 3 && word.length <= 20) wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
      });
    }
  });
  return wordCounts;
}

function getExistingWords() {
  const files = ['src/services/dutchDictionaryService.ts','src/data/dutchDictionaryData.ts','src/data/dutchVocabularyBank.ts'];
  const dictWords = new Set();
  const pattern = /'([a-z-]+)':\s*\{/g;
  files.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      let match;
      while ((match = pattern.exec(content)) !== null) dictWords.add(match[1]);
    }
  });
  return dictWords;
}

function splitSyllables(word) {
  if (word.length <= 3) return [word];
  const vowels = 'aeiouy';
  const result = [];
  let current = word[0];
  let lastWasVowel = vowels.includes(word[0]);
  for (let i = 1; i < word.length; i++) {
    const char = word[i];
    const isVowel = vowels.includes(char);
    if (!isVowel && lastWasVowel && current.length >= 2 && i < word.length - 1) {
      result.push(current);
      current = char;
    } else {
      current += char;
    }
    lastWasVowel = isVowel;
  }
  if (current) result.push(current);
  return result.length > 0 ? result : [word];
}

function generateEntry(word) {
  if (/[^a-z-]/.test(word)) return null;
  let wordType = 'Zelfstandig naamwoord';
  let meaningNl = 'Een woord dat in het spel wordt gebruikt.';
  let translationEn = word;
  let compound = undefined;

  if (word.endsWith('je') || word.endsWith('tje') || word.endsWith('pje') || word.endsWith('kje')) {
    wordType = 'Zelfstandig naamwoord';
    meaningNl = 'Een verkleinwoord.';
    translationEn = 'Little ' + word.replace(/(je|tje|pje|kje)$/, '');
    const base = word.replace(/(je|tje|pje|kje)$/, '');
    const suffix = word.endsWith('tje') ? 'tje' : word.endsWith('pje') ? 'pje' : word.endsWith('kje') ? 'kje' : 'je';
    compound = base + ' + ' + suffix;
  } else if (word.endsWith('en') && !word.endsWith('een') && word.length > 5) {
    const singular = word.replace(/en$/, '');
    wordType = 'Zelfstandig naamwoord';
    meaningNl = 'Het meervoud.';
    translationEn = singular + 's (plural)';
    compound = singular + ' + en';
  } else if (word.endsWith('e') && word.length > 3) {
    wordType = 'Bijvoeglijk naamwoord';
    meaningNl = 'Een bijvoeglijk naamwoord.';
    translationEn = word.replace(/e$/, '');
  } else if (word.endsWith('en') && word.length > 4) {
    wordType = 'Werkwoord';
    meaningNl = 'Een werkwoord.';
    translationEn = 'To ' + word.replace(/en$/, '');
  }

  const syllables = splitSyllables(word);
  const syllableStr = syllables.map(s => "'" + s + "'").join(', ');
  
  let entry = `  '${word}': {\n    word: '${word}',\n    wordType: '${wordType}',\n    meaningNl: '${meaningNl}',\n    translationEn: '${translationEn}',\n    syllables: [${syllableStr}],\n    exampleNl: 'In het verhaal komt het woord \"${word}\" voor.',\n    level: 'Groep 3-4 (AVI M3-E4)'`;
  if (compound) entry += `,\n    compound: '${compound}'`;
  entry += '\n  },';
  return entry;
}

function generateBulkDictionary() {
  console.log('=== Dutch Dictionary Bulk Import ===\n');
  const gameWords = extractGameWords();
  console.log('Game words:', gameWords.size);
  const existing = getExistingWords();
  console.log('In dictionary:', existing.size);

  const missing = [];
  gameWords.forEach((count, word) => {
    if (!existing.has(word) && !CORE_WORDS.includes(word)) missing.push({ word, count });
  });
  missing.sort((a, b) => b.count - a.count);
  console.log('Missing:', missing.length);
  console.log('\nTop 20:');
  missing.slice(0, 20).forEach((w, i) => console.log('  ' + (i+1) + '. ' + w.word + ' (' + w.count + 'x)'));

  const entries = [];
  missing.slice(0, 300).forEach(({ word }) => {
    const entry = generateEntry(word);
    if (entry) entries.push(entry);
  });

  const output = `// AUTO-GENERATED\nimport { DictionaryEntry } from '../src/data/dutchDictionaryData';\n\nexport const GENERATED_ENTRIES: Record<string, DictionaryEntry> = {\n${entries.join('\n')}\n};\n`;
  fs.writeFileSync('scripts/generatedDictionaryEntries.ts', output);
  console.log('\nGenerated', entries.length, 'entries');
}

generateBulkDictionary();
