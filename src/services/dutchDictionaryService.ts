import { DUTCH_DICTIONARY_DB, COMPOUND_PREFIXES, COMPOUND_SUFFIXES, DictionaryEntry } from '../data/dutchDictionaryData';
import { WERKWOORDEN_DATA } from '../data/werkwoorden';

// ============================================================================
// 1. ADVANCED DUTCH WORD NORMALIZATION & TOKENIZATION
// ============================================================================

/**
 * Normalizes a Dutch word or phrase:
 * - Unicode NFC normalization
 * - Lowercase & whitespace trimming
 * - Strips leading/trailing punctuation, quotes, brackets, and symbols
 * - Preserves legitimate Dutch contractions ('s avonds, 's morgens, zo'n, m'n, z'n)
 */
export function normalizeDutchWord(raw: string): string {
  if (!raw) return '';

  // 1. Unicode NFC & trim
  let normalized = raw.normalize('NFC').trim().toLowerCase();

  // 2. Preserve fixed Dutch apostrophe expressions ('s avonds, 's ochtends, 's middags, 's nachts, 's zomers, 's winters, 's werelds)
  const apostropheMatch = normalized.match(/^['’‘]s\s+([a-zäëïöüéèêóòôáàâ]+)$/i);
  if (apostropheMatch) {
    return `'s ${apostropheMatch[1]}`;
  }

  // 3. Strip surrounding quotation marks, brackets, punctuation, bullets, em-dashes
  // Leading punctuation (keep leading apostrophe only if followed by s and space, handled above)
  normalized = normalized.replace(/^[«"“‘'„()[\]{}#*_~`–—…•·\/\\:;,!?.]+/g, '');
  
  // Trailing punctuation
  normalized = normalized.replace(/[»"”’'„()[\]{}#*_~`–—…•·\/\\:;,!?.]+$/g, '');

  // 4. Handle hyphenated edge cases (e.g. trailing/leading stray hyphens)
  normalized = normalized.replace(/^-+|-+$/g, '').trim();

  return normalized;
}

// ============================================================================
// 2. LINGUISTIC DUTCH SYLLABIFICATION ENGINE (KLANKGROEPEN)
// Conforms to official Dutch phonological, morphological, and orthographic rules.
// ============================================================================

const DIPHTHONGS_AND_DIGRAPHS = [
  'aai', 'eeu', 'eeuw', 'ieu', 'ieuw', 'oei', 'ooi',
  'aa', 'ee', 'oo', 'uu', 'ei', 'ij', 'ou', 'au', 'eu', 'oe', 'ie', 'ui'
];

const INDIVISIBLE_ONSET_CLUSTERS = [
  'schr', 'str', 'spr', 'spl', 'sch', 'sk', 'sp', 'st',
  'tr', 'pr', 'br', 'cr', 'dr', 'fr', 'gr', 'kr', 'vr',
  'kl', 'pl', 'bl', 'fl', 'gl', 'cl', 'sl', 'sm', 'sn', 'sw', 'tw', 'kn', 'wr'
];

const NEVER_SPLIT_CONSONANT_DIGRAPHS = ['ch', 'sch', 'ng', 'nk', 'th', 'sh', 'ph', 'qu'];

const MORPHOLOGICAL_SUFFIXES = [
  'achtigheden', 'achtigheid', 'heid', 'heden', 'schap', 'schappen',
  'ingen', 'ing', 'baar', 'bare', 'baren', 'loos', 'loze', 'lozen',
  'achtig', 'achtige', 'achtigen', 'vol', 'volle', 'vollen',
  'dom', 'dommen', 'nis', 'nissen', 'erig', 'erige', 'erigheid',
  'tje', 'pje', 'kje', 'etje', 'aatje', 'ootje', 'uutje', 'ietje', 'je'
];

const MORPHOLOGICAL_PREFIXES = [
  'on', 'be', 'ge', 'ver', 'her', 'ont', 'wan', 'mis'
];

/**
 * Breaks a Dutch word into phonetically and morphologically correct syllables (klankgroepen).
 * Example: "oneindigheid" -> ["on", "ein", "dig", "heid"]
 * Example: "onderzoekschip" -> ["on", "der", "zoek", "schip"]
 */
export function syllabifyDutch(rawWord: string): string[] {
  const word = normalizeDutchWord(rawWord);
  if (!word || word.length <= 3) return [word || rawWord];

  // Specific hardcoded overrides for known complex educational words
  const SYLLABLE_OVERRIDES: Record<string, string[]> = {
    'oneindigheid': ['on', 'ein', 'dig', 'heid'],
    'oneindigheden': ['on', 'ein', 'dig', 'he', 'den'],
    'oneindig': ['on', 'ein', 'dig'],
    'oneindige': ['on', 'ein', 'di', 'ge'],
    'onderzoekschip': ['on', 'der', 'zoek', 'schip'],
    'onderzoeksschip': ['on', 'der', 'zoeks', 'schip'],
    'koraalrif': ['ko', 'raal', 'rif'],
    'duinpad': ['duin', 'pad'],
    'helmgras': ['helm', 'gras'],
    'schildpad': ['schild', 'pad'],
    'boomhutkliniek': ['boom', 'hut', 'kli', 'niek'],
    'tijdloos': ['tijd', 'loos'],
    'bibliotheek': ['bi', 'bli', 'o', 'theek'],
    'kristalgrot': ['kris', 'tal', 'grot'],
    'desondanks': ['des', 'on', 'danks'],
    'daardoor': ['daar', 'door'],
    'desalniettemin': ['des', 'al', 'niet', 'te', 'min'],
    'achterdochtig': ['ach', 'ter', 'doch', 'tig'],
    'waarschijnlijk': ['waar', 'schijn', 'lijk'],
    'mogelijkheid': ['mo', 'ge', 'lijk', 'heid'],
    'mogelijkheden': ['mo', 'ge', 'lijk', 'he', 'den'],
    'moeilijkheid': ['moei', 'lijk', 'heid'],
    'moeilijkheden': ['moei', 'lijk', 'he', 'den'],
    'duidelijkheid': ['dui', 'de', 'lijk', 'heid'],
    'gezondheid': ['ge', 'zond', 'heid'],
    'schoonheid': ['schoon', 'heid'],
    'waarheid': ['waar', 'heid'],
    'vrijheid': ['vrij', 'heid'],
    'veiligheid': ['vei', 'lig', 'heid'],
    'geheimzinnig': ['ge', 'heim', 'zin', 'nig'],
    'geheimzinnigheid': ['ge', 'heim', 'zin', 'nig', 'heid'],
    'wonderbaarlijk': ['won', 'der', 'baar', 'lijk'],
    'eindeloos': ['ein', 'de', 'loos'],
    'eindeloosheid': ['ein', 'de', 'loos', 'heid'],
    'grenzeloos': ['gren', 'ze', 'loos'],
    'grenzeloosheid': ['gren', 'ze', 'loos', 'heid']
  };

  if (SYLLABLE_OVERRIDES[word]) {
    return SYLLABLE_OVERRIDES[word];
  }

  // Handle hyphenated words
  if (word.includes('-')) {
    const parts = word.split('-');
    const res: string[] = [];
    parts.forEach((p, idx) => {
      res.push(...syllabifyDutch(p));
      if (idx < parts.length - 1) {
        res[res.length - 1] = res[res.length - 1] + '-';
      }
    });
    return res;
  }

  // Morphological prefix stripping: if word starts with on-, be-, ge-, ver-, her-, ont-
  for (const pfx of MORPHOLOGICAL_PREFIXES) {
    if (word.startsWith(pfx) && word.length >= pfx.length + 4) {
      const rest = word.slice(pfx.length);
      const restVowels = rest.match(/[aeiouyáéíóúäëïöü]/g);
      if (restVowels && restVowels.length >= 1) {
        return [pfx, ...syllabifyDutchCore(rest)];
      }
    }
  }

  return syllabifyDutchCore(word);
}

/**
 * Core phonetic syllable division for a single Dutch morpheme or un-prefixed stem
 */
function syllabifyDutchCore(word: string): string[] {
  const vowels = 'aeiouyáéíóúäëïöü';
  const len = word.length;
  if (len <= 3) return [word];

  // Check morphological suffix match at the end
  for (const sfx of MORPHOLOGICAL_SUFFIXES) {
    if (word.endsWith(sfx) && word.length >= sfx.length + 3) {
      const stem = word.slice(0, -sfx.length);
      const stemVowels = stem.match(/[aeiouyáéíóúäëïöü]/g);
      if (stemVowels && stemVowels.length >= 1) {
        const stemSyllables = syllabifyDutchCore(stem);
        const sfxSyllables = sfx.length > 4 ? syllabifyDutchCore(sfx) : [sfx];
        return [...stemSyllables, ...sfxSyllables];
      }
    }
  }

  // Find vowel nucleus spans (accounting for diphthongs and vowel digraphs)
  interface Nucleus {
    start: number;
    end: number;
    text: string;
  }

  const nuclei: Nucleus[] = [];
  let idx = 0;

  while (idx < len) {
    if (vowels.includes(word[idx])) {
      // Check 4-letter, 3-letter, 2-letter diphthongs
      let matchedDiphthong = '';
      for (const d of DIPHTHONGS_AND_DIGRAPHS) {
        if (word.startsWith(d, idx)) {
          if (!matchedDiphthong || d.length > matchedDiphthong.length) {
            matchedDiphthong = d;
          }
        }
      }

      if (matchedDiphthong) {
        nuclei.push({ start: idx, end: idx + matchedDiphthong.length, text: matchedDiphthong });
        idx += matchedDiphthong.length;
      } else {
        nuclei.push({ start: idx, end: idx + 1, text: word[idx] });
        idx++;
      }
    } else {
      idx++;
    }
  }

  // If 0 or 1 vowel nucleus, the entire word is 1 syllable
  if (nuclei.length <= 1) {
    return [word];
  }

  // Split boundaries between consecutive nuclei
  const splitPoints: number[] = [];

  for (let i = 0; i < nuclei.length - 1; i++) {
    const currentNuc = nuclei[i];
    const nextNuc = nuclei[i + 1];
    const consonantSpan = word.slice(currentNuc.end, nextNuc.start);
    const cLen = consonantSpan.length;

    if (cLen === 0) {
      // Hiatus / two vowels touching without consonant (e.g. ru-ïne, po-ë-zie, cha-os, o-a-se)
      splitPoints.push(currentNuc.end);
    } else if (cLen === 1) {
      // Rule: Single intervocalic consonant moves to the next syllable (V - CV)
      // e.g. wa - ter, mo - ge - lijk, ba - bi
      splitPoints.push(currentNuc.end);
    } else {
      // 2 or more consonants between vowels
      // Check if the entire consonant span is an indivisible onset cluster
      if (INDIVISIBLE_ONSET_CLUSTERS.includes(consonantSpan)) {
        splitPoints.push(currentNuc.end);
      } else if (NEVER_SPLIT_CONSONANT_DIGRAPHS.includes(consonantSpan)) {
        // e.g. la - chen (ch stays with 2nd syllable) or zin - gen (ng)
        if (consonantSpan === 'ch' || consonantSpan === 'sch') {
          splitPoints.push(currentNuc.end);
        } else {
          splitPoints.push(nextNuc.start);
        }
      } else {
        // Rule: Split between consonants, prioritizing a valid onset for the second syllable
        let splitFound = false;
        // Try longest valid onset cluster from the right side of the consonant span
        for (let cut = consonantSpan.length - 1; cut >= 1; cut--) {
          const onsetCandidate = consonantSpan.slice(cut);
          if (
            onsetCandidate.length === 1 ||
            INDIVISIBLE_ONSET_CLUSTERS.includes(onsetCandidate) ||
            NEVER_SPLIT_CONSONANT_DIGRAPHS.includes(onsetCandidate)
          ) {
            splitPoints.push(currentNuc.end + cut);
            splitFound = true;
            break;
          }
        }
        if (!splitFound) {
          // Default: split after first consonant (VC - CV)
          splitPoints.push(currentNuc.end + 1);
        }
      }
    }
  }

  // Construct syllable slices
  const syllables: string[] = [];
  let lastPos = 0;

  for (const pt of splitPoints) {
    const s = word.slice(lastPos, pt);
    if (s) syllables.push(s);
    lastPos = pt;
  }

  const finalS = word.slice(lastPos);
  if (finalS) syllables.push(finalS);

  return syllables.length > 0 ? syllables : [word];
}

// ============================================================================
// 3. COMPREHENSIVE CURATED DICTIONARY & ROOT LEMMA INDEX
// ============================================================================

export interface LemmaMapping {
  lemma: string;
  type: DictionaryEntry['wordType'];
  en: string;
  nl: string;
  example?: string;
  synonyms?: string[];
  variants?: string[];
  level?: DictionaryEntry['level'];
  citoCategory?: DictionaryEntry['citoCategory'];
}

export const DUTCH_EDUCATIONAL_LEXICON: Record<string, LemmaMapping> = {
  // --- Abstract Nouns & Core Concepts ---
  'oneindig': {
    lemma: 'oneindig',
    type: 'Bijvoeglijk naamwoord',
    en: 'Infinite, endless, boundless, limitless',
    nl: 'Zonder begin of einde; wat nooit ophoudt of geen grenzen heeft.',
    example: 'In het heelal lijken de sterrenstelsels zich in een oneindige ruimte uit te strekken.',
    synonyms: ['grenzeloos', 'onbegrensd', 'onmetelijk', 'eindeloos'],
    variants: ['oneindige', 'oneindiger', 'oneindigst', 'oneindigheid', 'oneindigheden'],
    level: 'Groep 5-6 (AVI M5-E6)',
    citoCategory: 'Moeilijk Cito Woord'
  },
  'oneindigheid': {
    lemma: 'oneindig',
    type: 'Zelfstandig naamwoord',
    en: 'Infinity, boundlessness, endlessness',
    nl: 'De toestand van het oneindig zijn; het ontbreken van enig einde of grens in tijd of ruimte.',
    example: 'Hemali dacht diep na over het wiskundige begrip van de oneindigheid.',
    synonyms: ['grenzeloosheid', 'onbegrensdheid', 'eeuwigheid'],
    variants: ['oneindig', 'oneindige', 'oneindigheden'],
    level: 'Groep 5-6 (AVI M5-E6)',
    citoCategory: 'Moeilijk Cito Woord'
  },
  'oneindigheden': {
    lemma: 'oneindig',
    type: 'Zelfstandig naamwoord',
    en: 'Infinities, endless possibilities or dimensions',
    nl: 'Meervoud van oneindigheid: meerdere grenzeloze vormen of onbegrensde werelden.',
    example: 'In magische verhalen reizen personages soms door verschillende oneindigheden.',
    synonyms: ['grenzeloosheden'],
    variants: ['oneindigheid', 'oneindig'],
    level: 'Groep 7-8 (Doorstroomtoets)'
  },
  'eindeloos': {
    lemma: 'eindeloos',
    type: 'Bijvoeglijk naamwoord',
    en: 'Endless, never-ending, continuous',
    nl: 'Zonder einde; heel lang durend of onafgebroken doorgaand.',
    example: 'De duinen leken zich in een eindeloze rij langs de zee voort te zetten.',
    synonyms: ['oneindig', 'onophoudelijk', 'voortdurend'],
    variants: ['eindeloze', 'eindeloosheid'],
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'eindeloosheid': {
    lemma: 'eindeloos',
    type: 'Zelfstandig naamwoord',
    en: 'Endlessness, perpetuity',
    nl: 'De toestand van iets dat niet ophoudt.',
    example: 'De eindeloosheid van de oceaan maakte diepe indruk op Ridheya.',
    synonyms: ['oneindigheid', 'eeuwigheid'],
    variants: ['eindeloos', 'eindeloze'],
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'grenzeloos': {
    lemma: 'grenzeloos',
    type: 'Bijvoeglijk naamwoord',
    en: 'Boundless, limitless, unrestricted',
    nl: 'Zonder grenzen, heel groot en onbeperkt.',
    example: 'De nieuwsgierigheid van Ridheya naar dieren is werkelijk grenzeloos.',
    synonyms: ['onbeperkt', 'oneindig'],
    variants: ['grenzeloze', 'grenzeloosheid'],
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'mogelijkheid': {
    lemma: 'mogelijk',
    type: 'Zelfstandig naamwoord',
    en: 'Possibility, opportunity, option',
    nl: 'Iets wat kan gebeuren of wat je kunt kiezen; een kans of optie.',
    example: 'Hemali onderzocht elke mogelijkheid om het raadsel van de poort op te lossen.',
    synonyms: ['optie', 'kans', 'gelegenheid'],
    variants: ['mogelijk', 'mogelijke', 'mogelijkheden'],
    level: 'Groep 5-6 (AVI M5-E6)',
    citoCategory: 'Basisschool Kernwoord'
  },
  'mogelijkheden': {
    lemma: 'mogelijk',
    type: 'Zelfstandig naamwoord',
    en: 'Possibilities, opportunities, choices',
    nl: 'Meervoud van mogelijkheid: meerdere verschillende opties of uitwegen.',
    example: 'Er waren vele mogelijkheden om het dierenziekenhuis in te richten.',
    synonyms: ['opties', 'kansen'],
    variants: ['mogelijkheid', 'mogelijk'],
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'moeilijkheid': {
    lemma: 'moeilijk',
    type: 'Zelfstandig naamwoord',
    en: 'Difficulty, problem, complication',
    nl: 'Een probleem, hindernis of lastige situatie die overwonnen moet worden.',
    example: 'Ondanks de grote moeilijkheid van de tocht gaf het team niet op.',
    synonyms: ['probleem', 'hindernis', 'lastigheid'],
    variants: ['moeilijk', 'moeilijke', 'moeilijkheden'],
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'moeilijkheden': {
    lemma: 'moeilijk',
    type: 'Zelfstandig naamwoord',
    en: 'Difficulties, hardships, troubles',
    nl: 'Meervoud van moeilijkheid: meerdere obstakels of problemen.',
    example: 'Zonder moeite overwonnen de zussen alle moeilijkheden op het bergpad.',
    synonyms: ['problemen', 'hindernissen'],
    variants: ['moeilijkheid', 'moeilijk'],
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'duidelijkheid': {
    lemma: 'duidelijk',
    type: 'Zelfstandig naamwoord',
    en: 'Clarity, clearness, distinctness',
    nl: 'De toestand waarin iets helder en goed te begrijpen is.',
    example: 'Hemali vroeg om meer duidelijkheid over de oude landkaart.',
    synonyms: ['helderheid', 'inzicht'],
    variants: ['duidelijk', 'duidelijke'],
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'zekerheid': {
    lemma: 'zeker',
    type: 'Zelfstandig naamwoord',
    en: 'Certainty, assurance, security',
    nl: 'Het gevoel of de toestand dat iets vaststaat en betrouwbaar is.',
    example: 'Met volle zekerheid wees Ridheya het juiste spoor in het zand aan.',
    synonyms: ['gewisheid', 'garantie'],
    variants: ['zeker', 'zekere', 'zekerheden', 'onzekerheid'],
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'onzekerheid': {
    lemma: 'zeker',
    type: 'Zelfstandig naamwoord',
    en: 'Uncertainty, doubt, hesitation',
    nl: 'Het niet zeker weten wat er gaat gebeuren; twijfel.',
    example: 'Na het vinden van de aanwijzing verdween alle onzekerheid.',
    synonyms: ['twijfel', 'besluiteloosheid'],
    variants: ['zekerheid', 'onzeker'],
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'veiligheid': {
    lemma: 'veilig',
    type: 'Zelfstandig naamwoord',
    en: 'Safety, security',
    nl: 'De toestand van beschermd zijn tegen gevaar of verwonding.',
    example: 'De boomhutkliniek bood een veilige haven voor gewonde oerwouddieren.',
    synonyms: ['bescherming', 'geborgenheid'],
    variants: ['veilig', 'veilige'],
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'gezondheid': {
    lemma: 'gezond',
    type: 'Zelfstandig naamwoord',
    en: 'Health, wellness, sound condition',
    nl: 'De goede lichamelijke en geestelijke toestand van een mens of dier.',
    example: 'De dokter controleerde de gezondheid van het pasgeboren luipaardje.',
    synonyms: ['welzijn', 'vitaliteit'],
    variants: ['gezond', 'gezonde'],
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'vrijheid': {
    lemma: 'vrij',
    type: 'Zelfstandig naamwoord',
    en: 'Freedom, liberty',
    nl: 'De mogelijkheid om te gaan en staan waar je wilt zonder belemmering.',
    example: 'De herstelde vogel vloog vol vreugde zijn vrijheid tegemoet.',
    synonyms: ['onafhankelijkheid'],
    variants: ['vrij', 'vrije', 'vrijheden'],
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'schoonheid': {
    lemma: 'schoon',
    type: 'Zelfstandig naamwoord',
    en: 'Beauty, loveliness, splendor',
    nl: 'De prachtige en bewonderenswaardige eigenschap van iets moois.',
    example: 'De schoonheid van het kleurrijke koraalrif liet iedereen sprakeloos.',
    synonyms: ['pracht', 'fraaiheid'],
    variants: ['schoon', 'schone'],
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'waarheid': {
    lemma: 'waar',
    type: 'Zelfstandig naamwoord',
    en: 'Truth, reality, verity',
    nl: 'Dat wat echt zo is en overeenkomt met de werkelijkheid.',
    example: 'Door aandachtig naar de getuigen te luisteren achterhaalde Hemali de waarheid.',
    synonyms: ['werkelijkheid', 'feiten'],
    variants: ['waar', 'ware', 'waarheden'],
    level: 'Groep 5-6 (AVI M5-E6)',
    citoCategory: 'Basisschool Kernwoord'
  },
  'geheimzinnigheid': {
    lemma: 'geheimzinnig',
    type: 'Zelfstandig naamwoord',
    en: 'Mysteriousness, secrecy, mystique',
    nl: 'De geheimzinnige of raadselachtige sfeer rondom een plek of gebeurtenis.',
    example: 'De kristalgrot was omgeven door een betoverende geheimzinnigheid.',
    synonyms: ['raadselachtigheid', 'mysterie'],
    variants: ['geheimzinnig', 'geheimzinnige'],
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'wonderbaarlijk': {
    lemma: 'wonderbaarlijk',
    type: 'Bijvoeglijk naamwoord',
    en: 'Miraculous, wondrous, marvelous, astounding',
    nl: 'Zo bijzonder en verbazingwekkend dat het bijna een wonder lijkt.',
    example: 'De genezing van de zeldzame vlinder verliep wonderbaarlijk snel.',
    synonyms: ['wonderlijk', 'miraculeus', 'verbazingwekkend'],
    variants: ['wonderbaarlijke', 'wonderbaarlijkheid'],
    level: 'Groep 5-6 (AVI M5-E6)',
    citoCategory: 'Moeilijk Cito Woord'
  },

  // --- Core Dutch Function Words & Signal Words ---
  'desondanks': {
    lemma: 'desondanks',
    type: 'Signaalwoord (Cito)',
    en: 'Nonetheless, nevertheless, despite that',
    nl: 'Signaalwoord van tegenstelling: ondanks wat eerder genoemd is; toch.',
    example: 'Het regende hard; desondanks zetten Ridheya en Hemali hun reddingstocht voort.',
    synonyms: ['toch', 'niettemin', 'ondanks dat'],
    level: 'Groep 5-6 (AVI M5-E6)',
    citoCategory: 'Signaalwoord Tegenstelling'
  },
  'daardoor': {
    lemma: 'daardoor',
    type: 'Signaalwoord (Cito)',
    en: 'As a result, because of that, consequently',
    nl: 'Signaalwoord van oorzaak en gevolg: met dat gevolg; door die oorzaak.',
    example: 'De brug was ingestort, en daardoor moesten ze met een kano oversteken.',
    synonyms: ['als gevolg daarvan', 'zodoende', 'wegens'],
    level: 'Groep 5-6 (AVI M5-E6)',
    citoCategory: 'Signaalwoord Oorzaak/Gevolg'
  },
  'aangezien': {
    lemma: 'aangezien',
    type: 'Signaalwoord (Cito)',
    en: 'Since, seeing that, because, as',
    nl: 'Signaalwoord van reden/oorzaak: omdat, wegens het feit dat.',
    example: 'Aangezien de schemering inviel, staken de zussen hun lantaarns aan.',
    synonyms: ['omdat', 'doordat', 'vermits'],
    level: 'Groep 5-6 (AVI M5-E6)',
    citoCategory: 'Signaalwoord Oorzaak/Gevolg'
  },
  'kortom': {
    lemma: 'kortom',
    type: 'Signaalwoord (Cito)',
    en: 'In short, in summary, briefly',
    nl: 'Signaalwoord van samenvatting: om het in weinig woorden samen te vatten.',
    example: 'De boot was gerepareerd, de kaart gevonden; kortom, de expeditie kon beginnen.',
    synonyms: ['samenvattend', 'in het kort'],
    level: 'Groep 5-6 (AVI M5-E6)',
    citoCategory: 'Signaalwoord Samenvatting'
  },
  'mits': {
    lemma: 'mits',
    type: 'Signaalwoord (Cito)',
    en: 'Provided that, on condition that',
    nl: 'Signaalwoord van voorwaarde: onder de voorwaarde dat; als tenminste.',
    example: 'We kunnen de grot veilig binnengaan, mits we een stevig touw gebruiken.',
    synonyms: ['op voorwaarde dat', 'als'],
    level: 'Groep 7-8 (Doorstroomtoets)'
  },
  'tenzij': {
    lemma: 'tenzij',
    type: 'Signaalwoord (Cito)',
    en: 'Unless, except if',
    nl: 'Signaalwoord van voorwaarde / uitzondering: behalve wanneer; als niet.',
    example: 'Het toernooi gaat door, tenzij er hevig onweer uitbreekt.',
    synonyms: ['behalve als', 'uitgezonderd wanneer'],
    level: 'Groep 5-6 (AVI M5-E6)',
    citoCategory: 'Signaalwoord Tegenstelling'
  },

  // --- Story & High Frequency Vocabulary ---
  'onderzoekschip': {
    lemma: 'onderzoekschip',
    type: 'Zelfstandig naamwoord',
    en: 'Research vessel, oceanographic exploration ship',
    nl: 'Een groot schip dat speciaal is uitgerust voor wetenschappelijk onderzoek op zee.',
    example: 'Vanaf het onderzoekschip lieten de zeebiologen een onderwatercamera zakken.',
    synonyms: ['expeditieschip', 'wetenschapsschip'],
    variants: ['onderzoekschepen', 'onderzoeksschip'],
    level: 'Groep 5-6 (AVI M5-E6)',
    citoCategory: 'Basisschool Kernwoord'
  },
  'achterdochtig': {
    lemma: 'achterdochtig',
    type: 'Bijvoeglijk naamwoord',
    en: 'Suspicious, distrustful, wary',
    nl: 'Niet snel vertrouwend; het vermoeden hebbend dat er iets niet klopt.',
    example: 'De oude bewaker keek achterdochtig naar de onbekende voetstappen in het zand.',
    synonyms: ['wantrouwig', 'argwanend'],
    variants: ['achterdochtige', 'achterdocht'],
    level: 'Groep 5-6 (AVI M5-E6)',
    citoCategory: 'Moeilijk Cito Woord'
  },
  'zeeark': {
    lemma: 'zeeark',
    type: 'Zelfstandig naamwoord',
    en: 'Sea ark / oceanic shelter',
    nl: 'Een drijvende opvangplek of schuilplaats voor zeedieren.',
    example: 'In de zeeark herstelden de jonge dolfijnen in alle rust.',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'zeewier': {
    lemma: 'zeewier',
    type: 'Zelfstandig naamwoord',
    en: 'Seaweed, marine algae',
    nl: 'Groene, bruine of rode waterplanten die op de zeebodem en op rotsen groeien.',
    example: 'Tussen het zachte zeewier verstopten zich piepkleine zeepaardjes.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'koraalrif': {
    lemma: 'koraalrif',
    type: 'Zelfstandig naamwoord',
    en: 'Coral reef',
    nl: 'Een onderwaterlandschap opgebouwd uit levende koralen, vol tropische vissen.',
    example: 'Het koraalrif rondom het eiland schitterde in alle kleuren van de regenboog.',
    variants: ['koraalriffen', 'koraal'],
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'duinpad': {
    lemma: 'duinpad',
    type: 'Zelfstandig naamwoord',
    en: 'Dune trail, coastal footpath',
    nl: 'Een smal zandpad dat door de duinen naar de zee leidt.',
    example: 'Hand in hand wandelden de kinderen over het kronkelende duinpad.',
    variants: ['duinpaden'],
    level: 'Groep 3-4 (AVI M3-E4)'
  }
};

// ============================================================================
// 4. STEMMING, VARIANT PARSING & SUFFIX MORPHOLOGY ENGINE
// ============================================================================

export interface DeinflectionResult {
  candidate: string;
  rule: string;
  type: DictionaryEntry['wordType'];
  confidence: number;
}

/**
 * Intelligent de-inflection engine for Dutch words:
 * Extracts root candidates for plural nouns, verb tenses, comparative/superlative adjectives,
 * diminutives, participles, and derived abstract nouns.
 */
export function extractStemCandidates(rawWord: string): DeinflectionResult[] {
  const word = normalizeDutchWord(rawWord);
  const results: DeinflectionResult[] = [];
  const len = word.length;
  if (len < 3) return results;

  // 1. Abstract noun in -heid / -heden (e.g. oneindigheid -> oneindig, mogelijkheden -> mogelijk)
  if (word.endsWith('heden') && len > 6) {
    const adjStem = word.slice(0, -5);
    results.push({ candidate: adjStem + 'heid', rule: 'meervoudsvorm (-heden -> -heid)', type: 'Zelfstandig naamwoord', confidence: 0.95 });
    results.push({ candidate: adjStem, rule: 'grondvorm van bijvoeglijk naamwoord', type: 'Bijvoeglijk naamwoord', confidence: 0.9 });
  } else if (word.endsWith('heid') && len > 5) {
    const adjStem = word.slice(0, -4);
    results.push({ candidate: adjStem, rule: 'grondvorm van bijvoeglijk naamwoord (achtervoegsel -heid)', type: 'Bijvoeglijk naamwoord', confidence: 0.95 });
  }

  // 2. Inflected Adjectives in -e (e.g. smalle -> smal, grote -> groot, lieve -> lief, rulle -> rul, oneindige -> oneindig)
  if (word.endsWith('e') && len > 3) {
    const base = word.slice(0, -1);
    
    // a. Doubled consonant degemination (smalle -> smal, dikke -> dik, dunne -> dun, witte -> wit, natte -> nat, rulle -> rul)
    const degem = base.replace(/([bcdfghjklmnpqrstvwxz])\1$/, '$1');
    if (degem !== base) {
      results.push({ candidate: degem, rule: 'verbogen bijvoeglijk naamwoord (klinkerverdubbeling opgeheven)', type: 'Bijvoeglijk naamwoord', confidence: 0.92 });
    }

    // b. Open syllable vowel lengthening (grote -> groot, gele -> geel, rode -> rood, schone -> schoon, droge -> droog, brede -> breed)
    const lengthened = base.replace(/([bcdfghjklmnpqrstvwxz])([aeiou])([bcdfghjklmnpqrstvwxz])$/, '$1$2$2$3');
    if (lengthened !== base) {
      results.push({ candidate: lengthened, rule: 'verbogen bijvoeglijk naamwoord (open lettergreep verlengd)', type: 'Bijvoeglijk naamwoord', confidence: 0.88 });
    }

    // c. Voicing change (lieve -> lief, boze -> boos, wijze -> wijs, scheve -> scheef, halve -> half, actieve -> actief)
    const voicedF = base.replace(/ve$/, 'f');
    if (voicedF !== base) {
      results.push({ candidate: voicedF, rule: 'verbogen bijvoeglijk naamwoord (v -> f)', type: 'Bijvoeglijk naamwoord', confidence: 0.9 });
    }
    const voicedS = base.replace(/ze$/, 's');
    if (voicedS !== base) {
      results.push({ candidate: voicedS, rule: 'verbogen bijvoeglijk naamwoord (z -> s)', type: 'Bijvoeglijk naamwoord', confidence: 0.9 });
    }

    // d. Simple -e removal (oneindige -> oneindig, kleine -> klein, donkere -> donker, mooie -> mooi, nieuwe -> nieuw)
    results.push({ candidate: base, rule: 'verbogen bijvoeglijk naamwoord (-e)', type: 'Bijvoeglijk naamwoord', confidence: 0.85 });
  }

  // 3. Comparatives in -er / -ere (sneller -> snel, groter -> groot, oneindiger -> oneindig)
  if (word.endsWith('ere') && len > 5) {
    const base = word.slice(0, -3);
    const degem = base.replace(/([bcdfghjklmnpqrstvwxz])\1$/, '$1');
    results.push({ candidate: degem, rule: 'verbogen vergrotende trap (-ere)', type: 'Bijvoeglijk naamwoord', confidence: 0.9 });
    results.push({ candidate: base, rule: 'verbogen vergrotende trap (-ere)', type: 'Bijvoeglijk naamwoord', confidence: 0.8 });
  } else if (word.endsWith('er') && len > 4) {
    const base = word.slice(0, -2);
    const degem = base.replace(/([bcdfghjklmnpqrstvwxz])\1$/, '$1');
    const lengthened = base.replace(/([bcdfghjklmnpqrstvwxz])([aeiou])([bcdfghjklmnpqrstvwxz])$/, '$1$2$2$3');
    results.push({ candidate: degem, rule: 'vergrotende trap (-er)', type: 'Bijvoeglijk naamwoord', confidence: 0.9 });
    results.push({ candidate: lengthened, rule: 'vergrotende trap (-er)', type: 'Bijvoeglijk naamwoord', confidence: 0.85 });
    results.push({ candidate: base, rule: 'vergrotende trap (-er)', type: 'Bijvoeglijk naamwoord', confidence: 0.8 });
  }

  // 4. Superlatives in -st / -ste (snelste -> snel, grootste -> groot, oneindigst -> oneindig)
  if (word.endsWith('ste') && len > 5) {
    results.push({ candidate: word.slice(0, -3), rule: 'overtreffende trap (-ste)', type: 'Bijvoeglijk naamwoord', confidence: 0.9 });
  } else if (word.endsWith('st') && len > 4) {
    results.push({ candidate: word.slice(0, -2), rule: 'overtreffende trap (-st)', type: 'Bijvoeglijk naamwoord', confidence: 0.85 });
  }

  // 5. Plural nouns in -en, -s, -eren (duinpaden -> duinpad, bomen -> boom, bewakers -> bewaker, kisten -> kist)
  if (word.endsWith('en') && len > 4) {
    const base = word.slice(0, -2);
    const degem = base.replace(/([bcdfghjklmnpqrstvwxz])\1$/, '$1');
    const lengthened = base.replace(/([bcdfghjklmnpqrstvwxz])([aeiou])([bcdfghjklmnpqrstvwxz])$/, '$1$2$2$3');
    
    // Voicing changes in plurals (schepen -> schip, dieven -> dief, huizen -> huis)
    if (base.endsWith('v')) results.push({ candidate: base.slice(0, -1) + 'f', rule: 'meervoud (-en, v -> f)', type: 'Zelfstandig naamwoord', confidence: 0.88 });
    if (base.endsWith('z')) results.push({ candidate: base.slice(0, -1) + 's', rule: 'meervoud (-en, z -> s)', type: 'Zelfstandig naamwoord', confidence: 0.88 });

    results.push({ candidate: degem, rule: 'meervoud (-en)', type: 'Zelfstandig naamwoord', confidence: 0.85 });
    results.push({ candidate: lengthened, rule: 'meervoud (-en, open klinker)', type: 'Zelfstandig naamwoord', confidence: 0.85 });
    results.push({ candidate: base, rule: 'meervoud of werkwoord (-en)', type: 'Zelfstandig naamwoord', confidence: 0.8 });
  } else if (word.endsWith('s') && len > 3 && !word.endsWith('ss')) {
    results.push({ candidate: word.slice(0, -1), rule: 'meervoud (-s)', type: 'Zelfstandig naamwoord', confidence: 0.8 });
  }

  // 6. Diminutives (verkleinwoorden: -je, -tje, -pje, -kje, -etje, -aatje, -ootje)
  const dimMatch = word.match(/^(.+?)(aatje|ootje|eetje|etje|pje|kje|tje|je)$/);
  if (dimMatch && dimMatch[1].length >= 2) {
    const stem = dimMatch[1];
    const degem = stem.replace(/([bcdfghjklmnpqrstvwxz])\1$/, '$1');
    results.push({ candidate: stem, rule: `verkleinwoord (+${dimMatch[2]})`, type: 'Zelfstandig naamwoord', confidence: 0.9 });
    if (degem !== stem) {
      results.push({ candidate: degem, rule: `verkleinwoord (+${dimMatch[2]})`, type: 'Zelfstandig naamwoord', confidence: 0.88 });
    }
  }

  // 7. Regular & Irregular Verb Tenses (-de, -den, -te, -ten, -t, ge-..-d/t/en)
  if (word.endsWith('ten') && len > 5) {
    const base = word.slice(0, -3);
    results.push({ candidate: base + 'en', rule: 'verleden tijd meervoud (-ten)', type: 'Werkwoord', confidence: 0.85 });
    results.push({ candidate: base, rule: 'verleden tijd meervoud (-ten)', type: 'Werkwoord', confidence: 0.8 });
  } else if (word.endsWith('den') && len > 5) {
    const base = word.slice(0, -3);
    results.push({ candidate: base + 'en', rule: 'verleden tijd meervoud (-den)', type: 'Werkwoord', confidence: 0.85 });
    results.push({ candidate: base, rule: 'verleden tijd meervoud (-den)', type: 'Werkwoord', confidence: 0.8 });
  } else if (word.endsWith('te') && len > 4) {
    const base = word.slice(0, -2);
    results.push({ candidate: base + 'en', rule: 'verleden tijd enkelvoud (-te)', type: 'Werkwoord', confidence: 0.85 });
    results.push({ candidate: base, rule: 'verleden tijd enkelvoud (-te)', type: 'Werkwoord', confidence: 0.8 });
  } else if (word.endsWith('de') && len > 4) {
    const base = word.slice(0, -2);
    results.push({ candidate: base + 'en', rule: 'verleden tijd enkelvoud (-de)', type: 'Werkwoord', confidence: 0.85 });
    results.push({ candidate: base, rule: 'verleden tijd enkelvoud (-de)', type: 'Werkwoord', confidence: 0.8 });
  } else if (word.endsWith('t') && len > 3) {
    const base = word.slice(0, -1);
    results.push({ candidate: base + 'en', rule: 'tegenwoordige tijd (stam+t)', type: 'Werkwoord', confidence: 0.8 });
    results.push({ candidate: base, rule: 'tegenwoordige tijd (stam+t)', type: 'Werkwoord', confidence: 0.75 });
  }

  // 8. Participles (ge-...-d / ge-...-t / ge-...-en / ge-...-de)
  if (word.startsWith('ge') && len > 5) {
    const inner = word.slice(2);
    if (inner.endsWith('e')) {
      const trimmed = inner.slice(0, -1);
      results.push({ candidate: trimmed, rule: 'voltooid deelwoord', type: 'Werkwoord', confidence: 0.8 });
      if (trimmed.endsWith('d') || trimmed.endsWith('t')) {
        results.push({ candidate: trimmed.slice(0, -1) + 'en', rule: 'infinitief van werkwoord', type: 'Werkwoord', confidence: 0.85 });
      }
    } else if (inner.endsWith('d') || inner.endsWith('t')) {
      const stem = inner.slice(0, -1);
      results.push({ candidate: stem + 'en', rule: 'infinitief van werkwoord (ge-+-d/t)', type: 'Werkwoord', confidence: 0.88 });
      results.push({ candidate: stem, rule: 'werkwoordstam', type: 'Werkwoord', confidence: 0.8 });
    } else if (inner.endsWith('en')) {
      results.push({ candidate: inner, rule: 'sterk voltooid deelwoord', type: 'Werkwoord', confidence: 0.85 });
    }
  }

  return results;
}

// ============================================================================
// 5. FUZZY SUGGESTION ENGINE ("DID YOU MEAN?")
// ============================================================================

/**
 * Calculates Damerau-Levenshtein distance between two strings
 */
function levenshteinDistance(a: string, b: string): number {
  const al = a.length;
  const bl = b.length;
  if (!al) return bl;
  if (!bl) return al;

  const matrix: number[][] = [];
  for (let i = 0; i <= al; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= bl; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= al; i++) {
    for (let j = 1; j <= bl; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );

      // Transposition
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        matrix[i][j] = Math.min(matrix[i][j], matrix[i - 2][j - 2] + cost);
      }
    }
  }

  return matrix[al][bl];
}

/**
 * Finds high-quality fuzzy suggestions when an exact word is not found
 */
export function getFuzzySuggestions(rawWord: string, limit = 3): string[] {
  const word = normalizeDutchWord(rawWord);
  if (!word || word.length < 2) return [];

  const candidates: { word: string; score: number }[] = [];
  const seen = new Set<string>();

  // Helper to add candidate
  const testCandidate = (target: string) => {
    const norm = normalizeDutchWord(target);
    if (!norm || norm === word || seen.has(norm)) return;
    seen.add(norm);

    // Prefix match bonus
    let dist = levenshteinDistance(word, norm);
    if (norm.startsWith(word) || word.startsWith(norm)) {
      dist -= 1.5;
    }
    if (norm.includes(word) || word.includes(norm)) {
      dist -= 0.8;
    }

    if (dist <= 3) {
      candidates.push({ word: norm, score: dist });
    }
  };

  // 1. Check curated educational lexicon
  for (const k of Object.keys(DUTCH_EDUCATIONAL_LEXICON)) {
    testCandidate(k);
    const entry = DUTCH_EDUCATIONAL_LEXICON[k];
    if (entry.variants) {
      entry.variants.forEach(v => testCandidate(v));
    }
  }

  // 2. Check main database keys
  for (const k of Object.keys(DUTCH_DICTIONARY_DB)) {
    testCandidate(k);
  }

  // Sort by score (closest first)
  candidates.sort((a, b) => a.score - b.score);
  return candidates.slice(0, limit).map(c => c.word);
}

// ============================================================================
// 6. DYNAMIC LOOKUP ENGINE WITH CACHING & MORPHOLOGY
// ============================================================================

const lookupCache = new Map<string, DictionaryEntry>();

/**
 * Builds an authentic, high-quality English noun translation from an adjective definition.
 * (Replaces machine-generated concatenations like "oneindig-ness" with real English words).
 */
function transformAdjectiveToNounEn(enAdj: string): string {
  const lower = enAdj.toLowerCase();
  
  // Specific curated mappings
  const DIRECT_NOUN_MAP: Record<string, string> = {
    'infinite': 'Infinity, boundlessness',
    'endless': 'Endlessness, eternity',
    'limitless': 'Limitlessness, boundlessness',
    'boundless': 'Boundlessness',
    'possible': 'Possibility, feasibility',
    'difficult': 'Difficulty, hardship',
    'clear': 'Clarity, clearness',
    'certain': 'Certainty, assurance',
    'safe': 'Safety, security',
    'healthy': 'Health, wellness',
    'beautiful': 'Beauty, splendor',
    'true': 'Truth, reality',
    'free': 'Freedom, liberty',
    'equal': 'Equality',
    'mysterious': 'Mysteriousness, secrecy',
    'special': 'Specialness, uniqueness',
    'brave': 'Bravery, courage',
    'strong': 'Strength, power',
    'weak': 'Weakness, fragility',
    'simple': 'Simplicity, ease',
    'deep': 'Depth, profundity',
    'high': 'Height, altitude',
    'wide': 'Width, breadth',
    'narrow': 'Narrowness',
    'dark': 'Darkness, obscurity',
    'bright': 'Brightness, brilliance'
  };

  for (const key of Object.keys(DIRECT_NOUN_MAP)) {
    if (lower.includes(key)) {
      return DIRECT_NOUN_MAP[key];
    }
  }

  // Grammatical morphology fallback
  const firstWord = enAdj.split(/[,;\s/]+/)[0].toLowerCase();
  if (firstWord.endsWith('ble')) {
    return firstWord.slice(0, -3) + 'bility';
  }
  if (firstWord.endsWith('ful')) {
    return firstWord + 'ness';
  }
  if (firstWord.endsWith('less')) {
    return firstWord + 'ness';
  }
  if (firstWord.endsWith('y')) {
    return firstWord.slice(0, -1) + 'iness';
  }
  if (firstWord.endsWith('ous')) {
    return firstWord + 'ness';
  }
  if (firstWord.endsWith('ic')) {
    return firstWord + 'ity';
  }

  return `${enAdj.charAt(0).toUpperCase() + enAdj.slice(1)} (state or quality)`;
}

/**
 * Intelligent Dutch Dictionary & Educational Translation Resolver
 */
export function lookupDutchWord(rawWord: string): DictionaryEntry {
  if (!rawWord) {
    return {
      word: 'woord',
      wordType: 'Zelfstandig naamwoord',
      meaningNl: 'Een eenheid van taal met een zelfstandige betekenis.',
      translationEn: 'Word',
      syllables: ['woord'],
      exampleNl: 'Elk woord in het verhaal brengt het avontuur tot leven.',
      level: 'Groep 3-4 (AVI M3-E4)'
    };
  }

  const clean = normalizeDutchWord(rawWord);
  if (!clean) {
    return {
      word: rawWord,
      wordType: 'Zelfstandig naamwoord',
      meaningNl: 'Leesteken of speciaal teken.',
      translationEn: 'Punctuation mark',
      syllables: [rawWord],
      exampleNl: 'Leestekens maken zinnen duidelijk en prettig om te lezen.'
    };
  }

  // 1. Dynamic Cache
  if (lookupCache.has(clean)) {
    return lookupCache.get(clean)!;
  }

  // 2. Exact match in Lexicon
  if (DUTCH_EDUCATIONAL_LEXICON[clean]) {
    const lex = DUTCH_EDUCATIONAL_LEXICON[clean];
    const entry: DictionaryEntry = {
      word: clean,
      wordType: lex.type,
      meaningNl: lex.nl,
      translationEn: lex.en,
      syllables: syllabifyDutch(clean),
      exampleNl: lex.example || `In het verhaal onderzoeken Ridheya en Hemali de betekenis van "${clean}".`,
      synonyms: lex.synonyms,
      variants: lex.variants,
      lemma: lex.lemma !== clean ? lex.lemma : undefined,
      level: lex.level || 'Groep 5-6 (AVI M5-E6)',
      citoCategory: lex.citoCategory
    };
    lookupCache.set(clean, entry);
    return entry;
  }

  // 3. Exact match in primary database
  if (DUTCH_DICTIONARY_DB[clean]) {
    const dbEntry = DUTCH_DICTIONARY_DB[clean];
    // Ensure accurate syllables
    const entry: DictionaryEntry = {
      ...dbEntry,
      syllables: syllabifyDutch(clean)
    };
    lookupCache.set(clean, entry);
    return entry;
  }

  // 4. Check Verb Data (WERKWOORDEN_DATA)
  for (const v of WERKWOORDEN_DATA) {
    if (v.infinitief === clean) {
      const entry: DictionaryEntry = {
        word: clean,
        wordType: 'Werkwoord',
        meaningNl: `Werkwoord (infinitief / hele werkwoord): ${v.english}.`,
        translationEn: `${v.english.startsWith('to ') ? v.english : 'To ' + v.english}`,
        syllables: syllabifyDutch(clean),
        exampleNl: v.example?.nl || `In het verhaal gebruikt men het werkwoord "${clean}".`,
        level: 'Groep 3-4 (AVI M3-E4)',
        variants: [v.imperfectum_ev, v.imperfectum_mv, v.perfectum]
      };
      lookupCache.set(clean, entry);
      return entry;
    }

    // Check conjugated forms
    const isImperfectumEv = v.imperfectum_ev === clean;
    const isImperfectumMv = v.imperfectum_mv === clean;
    const isPerfectum = v.perfectum === clean;

    if (isImperfectumEv || isImperfectumMv || isPerfectum) {
      let formDesc = `Vorm van het werkwoord "${v.infinitief}".`;
      if (isImperfectumEv) {
        formDesc = `Verleden tijd enkelvoud (o.v.t.) van "${v.infinitief}".`;
      } else if (isImperfectumMv) {
        formDesc = `Verleden tijd meervoud (o.v.t.) van "${v.infinitief}".`;
      } else if (isPerfectum) {
        formDesc = `Voltooid deelwoord (v.d.w.) van "${v.infinitief}".`;
      }

      const entry: DictionaryEntry = {
        word: clean,
        wordType: 'Werkwoord',
        meaningNl: `${formDesc} Vertaling: ${v.english}`,
        translationEn: `${v.english} [Infinitive: ${v.infinitief}]`,
        syllables: syllabifyDutch(clean),
        exampleNl: v.example?.nl || `In de tekst staat de vorm "${clean}".`,
        lemma: v.infinitief,
        variants: [v.infinitief, v.perfectum],
        level: 'Groep 3-4 (AVI M3-E4)'
      };
      lookupCache.set(clean, entry);
      return entry;
    }
  }

  // 5. Morphological De-inflection (Stem candidates)
  const stemCandidates = extractStemCandidates(clean);
  for (const item of stemCandidates) {
    const matchedLex = DUTCH_EDUCATIONAL_LEXICON[item.candidate];
    const matchedDb = DUTCH_DICTIONARY_DB[item.candidate];
    const matched = matchedLex || matchedDb;

    if (matched) {
      const baseMeaning = 'meaningNl' in matched ? matched.meaningNl : matched.nl;
      const baseEn = 'translationEn' in matched ? matched.translationEn : matched.en;
      const baseType = 'wordType' in matched ? matched.wordType : matched.type;

      let inflectionDesc = `Vorm van "${item.candidate}" (${item.rule}).`;
      let translatedEn = baseEn;

      if (clean.endsWith('heid') || clean.endsWith('heden')) {
        inflectionDesc = `Zelfstandig naamwoord gevormd van "${item.candidate}": duidt de toestand of eigenschap aan.`;
        translatedEn = transformAdjectiveToNounEn(baseEn);
      } else if (item.type === 'Bijvoeglijk naamwoord') {
        inflectionDesc = `Verbogen bijvoeglijk naamwoord van "${item.candidate}": beschrijft een eigenschap (bijv. een ${clean} pad).`;
        translatedEn = `${baseEn} (inflected form)`;
      } else if (item.rule.includes('meervoud')) {
        inflectionDesc = `Meervoud van "${item.candidate}": meerdere exemplaren van ${item.candidate}.`;
        translatedEn = `${baseEn} (plural)`;
      } else if (item.rule.includes('verkleinwoord')) {
        inflectionDesc = `Verkleinwoord van "${item.candidate}": een klein of lief ${item.candidate}.`;
        translatedEn = `Little / small ${baseEn}`;
      }

      const entry: DictionaryEntry = {
        word: clean,
        wordType: (clean.endsWith('heid') || clean.endsWith('heden')) ? 'Zelfstandig naamwoord' : (baseType || item.type),
        meaningNl: `${inflectionDesc} Betekenis: ${baseMeaning}`,
        translationEn: translatedEn,
        syllables: syllabifyDutch(clean),
        exampleNl: `In de tekst werd "${clean}" gebruikt om het verhaal levendig en beeldend te maken.`,
        lemma: item.candidate,
        variants: [item.candidate],
        level: matched.level || 'Groep 3-4 (AVI M3-E4)',
        isGenerated: true
      };

      lookupCache.set(clean, entry);
      return entry;
    }
  }

  // 6. Compound Word Decomposition Engine (Samenstellingen)
  // Look for known prefixes
  for (const prefixKey in COMPOUND_PREFIXES) {
    if (clean.startsWith(prefixKey) && clean.length > prefixKey.length + 2) {
      let remainder = clean.slice(prefixKey.length);
      if (remainder.startsWith('s') && remainder.length > 3) remainder = remainder.slice(1);
      else if (remainder.startsWith('en') && remainder.length > 4) remainder = remainder.slice(2);

      const prefixInfo = COMPOUND_PREFIXES[prefixKey];
      const suffixInfo =
        COMPOUND_SUFFIXES[remainder] ||
        (DUTCH_EDUCATIONAL_LEXICON[remainder] ? { meaning: DUTCH_EDUCATIONAL_LEXICON[remainder].nl, en: DUTCH_EDUCATIONAL_LEXICON[remainder].en, type: DUTCH_EDUCATIONAL_LEXICON[remainder].type } : null) ||
        (DUTCH_DICTIONARY_DB[remainder] ? { meaning: DUTCH_DICTIONARY_DB[remainder].meaningNl, en: DUTCH_DICTIONARY_DB[remainder].translationEn, type: DUTCH_DICTIONARY_DB[remainder].wordType } : null);

      if (suffixInfo) {
        const entry: DictionaryEntry = {
          word: clean,
          wordType: suffixInfo.type || 'Zelfstandig naamwoord',
          meaningNl: `Samenstelling van "${prefixKey}" (${prefixInfo.meaning}) + "${remainder}" (${suffixInfo.meaning}).`,
          translationEn: `${prefixInfo.en} ${suffixInfo.en}`,
          compound: `${prefixKey} + ${remainder}`,
          syllables: [...syllabifyDutch(prefixKey), ...syllabifyDutch(remainder)],
          exampleNl: `Tijdens hun tocht ontdekten Ridheya en Hemali het bijzondere fenomeen van de ${clean}.`,
          level: 'Groep 5-6 (AVI M5-E6)',
          isGenerated: true
        };
        lookupCache.set(clean, entry);
        return entry;
      }
    }
  }

  // Arbitrary two-word split from databases
  for (let i = 3; i <= clean.length - 3; i++) {
    const partA = clean.slice(0, i);
    let partB = clean.slice(i);
    if (partB.startsWith('s') && partB.length > 3) partB = partB.slice(1);

    const infoA = DUTCH_EDUCATIONAL_LEXICON[partA] || DUTCH_DICTIONARY_DB[partA];
    const infoB = DUTCH_EDUCATIONAL_LEXICON[partB] || DUTCH_DICTIONARY_DB[partB];

    if (infoA && infoB) {
      const meaningA = 'meaningNl' in infoA ? infoA.meaningNl : infoA.nl;
      const meaningB = 'meaningNl' in infoB ? infoB.meaningNl : infoB.nl;
      const enA = 'translationEn' in infoA ? infoA.translationEn : infoA.en;
      const enB = 'translationEn' in infoB ? infoB.translationEn : infoB.en;
      const typeB = 'wordType' in infoB ? infoB.wordType : infoB.type;

      const entry: DictionaryEntry = {
        word: clean,
        wordType: typeB || 'Zelfstandig naamwoord',
        meaningNl: `Samenstelling van "${partA}" (${meaningA}) + "${partB}" (${meaningB}).`,
        translationEn: `${enA} ${enB}`,
        compound: `${partA} + ${partB}`,
        syllables: [...syllabifyDutch(partA), ...syllabifyDutch(partB)],
        exampleNl: `De samenstelling "${clean}" combineert ${partA} met ${partB}.`,
        level: 'Groep 5-6 (AVI M5-E6)',
        isGenerated: true
      };
      lookupCache.set(clean, entry);
      return entry;
    }
  }

  // 7. Morphological Fallback & "Did you mean?" suggestions
  const suggestions = getFuzzySuggestions(clean, 3);

  let derivedType: DictionaryEntry['wordType'] = 'Zelfstandig naamwoord';
  let derivedMeaning = `Nederlands woord (${clean}) voor begrijpend lezen en woordenschat.`;
  let derivedEn = `${clean.charAt(0).toUpperCase() + clean.slice(1)}`;

  if (clean.endsWith('heid')) {
    derivedType = 'Zelfstandig naamwoord';
    const base = clean.slice(0, -4);
    derivedMeaning = `Zelfstandig naamwoord dat de eigenschap of toestand van '${base}' aangeeft.`;
    derivedEn = transformAdjectiveToNounEn(base);
  } else if (clean.endsWith('ing')) {
    derivedType = 'Zelfstandig naamwoord';
    const base = clean.slice(0, -3);
    derivedMeaning = `Zelfstandig naamwoord dat de handeling of het resultaat van '${base}' beschrijft.`;
    derivedEn = `${base.charAt(0).toUpperCase() + base.slice(1)}ing / Action of ${base}`;
  } else if (clean.endsWith('schap')) {
    derivedType = 'Zelfstandig naamwoord';
    const base = clean.slice(0, -5);
    derivedMeaning = `Zelfstandig naamwoord dat een toestand, relatie of gebied van '${base}' aanduidt.`;
    derivedEn = `State or relationship of ${base}`;
  } else if (clean.endsWith('ig') || clean.endsWith('ige')) {
    derivedType = 'Bijvoeglijk naamwoord';
    const base = clean.replace(/e?$/, '').slice(0, -2);
    derivedMeaning = `Bijvoeglijk naamwoord dat aangeeft dat iets gekenmerkt wordt door '${base}'.`;
    derivedEn = `Characterized by ${base}`;
  } else if (clean.endsWith('baar') || clean.endsWith('bare')) {
    derivedType = 'Bijvoeglijk naamwoord';
    const base = clean.replace(/e?$/, '').slice(0, -4);
    derivedMeaning = `Bijvoeglijk naamwoord dat aangeeft dat iets gedaan kán worden met betrekking tot '${base}'.`;
    derivedEn = `Capable of being ${base}ed (-able)`;
  } else if (clean.endsWith('loos') || clean.endsWith('loze')) {
    derivedType = 'Bijvoeglijk naamwoord';
    const base = clean.replace(/loze$/, 'loos').slice(0, -4);
    derivedMeaning = `Bijvoeglijk naamwoord dat aangeeft dat iets zonder '${base}' is.`;
    derivedEn = `Without ${base} (-less)`;
  } else if (clean.endsWith('vol') || clean.endsWith('volle')) {
    derivedType = 'Bijvoeglijk naamwoord';
    const base = clean.replace(/e?$/, '').replace(/l$/, '').slice(0, -3);
    derivedMeaning = `Bijvoeglijk naamwoord dat aangeeft dat iets vol is van '${base}'.`;
    derivedEn = `Full of ${base} (-ful)`;
  }

  const generatedEntry: DictionaryEntry = {
    word: clean,
    wordType: derivedType,
    meaningNl: derivedMeaning,
    translationEn: derivedEn,
    syllables: syllabifyDutch(clean),
    exampleNl: `In de tekst ontdekken de lezers het woord "${clean}".`,
    suggestions: suggestions.length > 0 ? suggestions : undefined,
    level: clean.length > 8 ? 'Groep 5-6 (AVI M5-E6)' : 'Groep 3-4 (AVI M3-E4)',
    isGenerated: true
  };

  lookupCache.set(clean, generatedEntry);
  return generatedEntry;
}

/**
 * Searches the dictionary for matching words (for search bar)
 */
export function searchDictionaryWords(query: string, limit = 25): DictionaryEntry[] {
  const q = normalizeDutchWord(query);
  if (!q) {
    return Object.values(DUTCH_DICTIONARY_DB).slice(0, limit);
  }

  const results: DictionaryEntry[] = [];
  const seen = new Set<string>();

  // 1. Direct query lookup if valid
  const direct = lookupDutchWord(q);
  if (direct) {
    results.push(direct);
    seen.add(direct.word.toLowerCase());
  }

  // 2. Search in DUTCH_EDUCATIONAL_LEXICON
  for (const key in DUTCH_EDUCATIONAL_LEXICON) {
    if (seen.has(key)) continue;
    const lex = DUTCH_EDUCATIONAL_LEXICON[key];
    if (
      key.includes(q) ||
      lex.nl.toLowerCase().includes(q) ||
      lex.en.toLowerCase().includes(q) ||
      (lex.synonyms && lex.synonyms.some(s => s.toLowerCase().includes(q)))
    ) {
      results.push({
        word: key,
        wordType: lex.type,
        meaningNl: lex.nl,
        translationEn: lex.en,
        syllables: syllabifyDutch(key),
        exampleNl: lex.example || `Voorbeeldzin met ${key}.`,
        synonyms: lex.synonyms,
        variants: lex.variants,
        level: lex.level || 'Groep 5-6 (AVI M5-E6)'
      });
      seen.add(key);
      if (results.length >= limit) break;
    }
  }

  // 3. Search in DUTCH_DICTIONARY_DB
  if (results.length < limit) {
    for (const key in DUTCH_DICTIONARY_DB) {
      if (seen.has(key)) continue;
      const entry = DUTCH_DICTIONARY_DB[key];
      if (
        key.includes(q) ||
        entry.meaningNl.toLowerCase().includes(q) ||
        entry.translationEn.toLowerCase().includes(q)
      ) {
        results.push({
          ...entry,
          syllables: syllabifyDutch(key)
        });
        seen.add(key);
        if (results.length >= limit) break;
      }
    }
  }

  return results.slice(0, limit);
}
