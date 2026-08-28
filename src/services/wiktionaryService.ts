/**
 * Wiktionary API Service
 * Provides fallback dictionary lookups for words not in the local database
 * Uses Wikimedia REST API (free, no key required)
 */

import { DictionaryEntry } from '../data/dutchDictionaryData';

const WIKTIONARY_API_BASE = 'https://en.wiktionary.org/api/rest_v1/page/definition';
const CACHE_KEY = 'wiktionary_cache';
const CACHE_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface WiktionaryCache {
  [word: string]: {
    entry: DictionaryEntry;
    timestamp: number;
  };
}

/**
 * Get cached Wiktionary results from localStorage
 */
function getCache(): WiktionaryCache {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
}

/**
 * Save results to localStorage cache
 */
function setCache(cache: WiktionaryCache): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Convert Wiktionary part of speech to our wordType
 */
function mapPartOfSpeech(pos: string): DictionaryEntry['wordType'] {
  const posMap: Record<string, DictionaryEntry['wordType']> = {
    'noun': 'Zelfstandig naamwoord',
    'verb': 'Werkwoord',
    'adjective': 'Bijvoeglijk naamwoord',
    'adverb': 'Bijwoord',
    'pronoun': 'Voorzetsel',
    'preposition': 'Voorzetsel',
    'conjunction': 'Voegwoord',
    'interjection': 'Tussenwerpsel',
    'numeral': 'Telwoord',
    'article': 'Lidwoord',
  };
  return posMap[pos.toLowerCase()] || 'Zelfstandig naamwoord';
}

/**
 * Simple Dutch syllable splitting (approximation)
 */
function approximateSyllables(word: string): string[] {
  const vowels = 'aeiouyAEIOUY';
  const result: string[] = [];
  let current = '';
  let vowelCount = 0;
  
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    current += char;
    
    if (vowels.includes(char)) {
      vowelCount++;
      // Split after vowel if we have a consonant after and already have vowels
      if (vowelCount >= 2 && i < word.length - 1 && !vowels.includes(word[i + 1])) {
        result.push(current);
        current = '';
        vowelCount = 0;
      }
    }
  }
  
  if (current) {
    if (result.length > 0) {
      result[result.length - 1] += current;
    } else {
      result.push(current);
    }
  }
  
  return result.length > 0 ? result : [word];
}

/**
 * Look up a word using Wiktionary API
 * Returns null if not found or on error
 */
export async function lookupWiktionary(
  word: string,
  language: 'nl' | 'en' = 'nl'
): Promise<DictionaryEntry | null> {
  const normalizedWord = word.toLowerCase().trim();
  
  // Check cache first
  const cache = getCache();
  const cached = cache[normalizedWord];
  if (cached && Date.now() - cached.timestamp < CACHE_EXPIRY_MS) {
    return cached.entry;
  }
  
  try {
    // Try Dutch Wiktionary first
    const response = await fetch(
      `${WIKTIONARY_API_BASE}/${encodeURIComponent(normalizedWord)}`
    );
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    // Find Dutch definitions
    const dutchEntry = data[normalizedWord]?.find(
      (e: any) => e.language === 'Dutch' || e.language === 'Nederlands'
    );
    
    if (!dutchEntry || !dutchEntry.definitions?.length) {
      return null;
    }
    
    const firstDef = dutchEntry.definitions[0];
    const wordType = mapPartOfSpeech(dutchEntry.partOfSpeech || 'noun');
    
    const entry: DictionaryEntry = {
      word: normalizedWord,
      wordType,
      meaningNl: firstDef.definition || 'Definitie niet gevonden',
      translationEn: firstDef.definition || 'Definition not found',
      syllables: approximateSyllables(normalizedWord),
      exampleNl: firstDef.example || `Het woord \"${normalizedWord}\" wordt gebruikt in het Nederlands.`,
      level: 'Groep 5-6 (AVI M5-E6)', // Default level for API-sourced words
      isGenerated: true,
    };
    
    // Cache the result
    cache[normalizedWord] = { entry, timestamp: Date.now() };
    setCache(cache);
    
    return entry;
  } catch (error) {
    console.warn(`Wiktionary lookup failed for "${word}":`, error);
    return null;
  }
}

/**
 * Batch lookup multiple words
 */
export async function lookupWiktionaryBatch(
  words: string[],
  language: 'nl' | 'en' = 'nl'
): Promise<Record<string, DictionaryEntry>> {
  const results: Record<string, DictionaryEntry> = {};
  
  // Process in batches of 5 to avoid rate limiting
  for (let i = 0; i < words.length; i += 5) {
    const batch = words.slice(i, i + 5);
    const promises = batch.map(async (word) => {
      const entry = await lookupWiktionary(word, language);
      if (entry) {
        results[word.toLowerCase()] = entry;
      }
    });
    
    await Promise.all(promises);
    
    // Small delay between batches
    if (i + 5 < words.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  return results;
}

/**
 * Clear the Wiktionary cache
 */
export function clearWiktionaryCache(): void {
  localStorage.removeItem(CACHE_KEY);
}

/**
 * Get cache statistics
 */
export function getWiktionaryCacheStats(): { size: number; words: string[] } {
  const cache = getCache();
  return {
    size: Object.keys(cache).length,
    words: Object.keys(cache).slice(0, 10),
  };
}
