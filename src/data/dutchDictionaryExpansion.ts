import type { DictionaryEntry } from './dutchDictionaryData';

// Verb forms (imperatives)
const VERB_FORMS: Record<string, DictionaryEntry> = {
  'kies': { word: 'kies', wordType: 'Werkwoord', meaningNl: 'Een keuze maken.', translationEn: 'Choose', syllables: ['kies'], exampleNl: 'Kies het juiste antwoord.', level: 'Groep 3-4 (AVI M3-E4)' },
  'kijk': { word: 'kijk', wordType: 'Werkwoord', meaningNl: 'Met je ogen zien.', translationEn: 'Look', syllables: ['kijk'], exampleNl: 'Kijk eens naar die vogel!', level: 'Groep 3-4 (AVI M3-E4)' },
  'lees': { word: 'lees', wordType: 'Werkwoord', meaningNl: 'Tekst bekijken.', translationEn: 'Read', syllables: ['lees'], exampleNl: 'Lees de tekst goed door.', level: 'Groep 3-4 (AVI M3-E4)' },
  'luister': { word: 'luister', wordType: 'Werkwoord', meaningNl: 'Aandachtig horen.', translationEn: 'Listen', syllables: ['luis', 'ter'], exampleNl: 'Luister naar het verhaal.', level: 'Groep 3-4 (AVI M3-E4)' },
  'maak': { word: 'maak', wordType: 'Werkwoord', meaningNl: 'Iets creeren.', translationEn: 'Make', syllables: ['maak'], exampleNl: 'Maak je huiswerk.', level: 'Groep 3-4 (AVI M3-E4)' },
  'schrijf': { word: 'schrijf', wordType: 'Werkwoord', meaningNl: 'Letters maken.', translationEn: 'Write', syllables: ['schrijf'], exampleNl: 'Schrijf je naam.', level: 'Groep 3-4 (AVI M3-E4)' },
  'speel': { word: 'speel', wordType: 'Werkwoord', meaningNl: 'Een spel doen.', translationEn: 'Play', syllables: ['speel'], exampleNl: 'Speel het spel.', level: 'Groep 3-4 (AVI M3-E4)' },
  'zoek': { word: 'zoek', wordType: 'Werkwoord', meaningNl: 'Iets vinden.', translationEn: 'Search', syllables: ['zoek'], exampleNl: 'Zoek de juiste letters.', level: 'Groep 3-4 (AVI M3-E4)' }
};

const ADJECTIVES: Record<string, DictionaryEntry> = {
  'andere': { word: 'andere', wordType: 'Bijvoeglijk naamwoord', meaningNl: 'Verschillend.', translationEn: 'Other', syllables: ['an', 'de', 're'], exampleNl: 'Kies een andere kleur.', level: 'Groep 3-4 (AVI M3-E4)', compound: 'ander + e' },
  'bijna': { word: 'bijna', wordType: 'Bijwoord', meaningNl: 'Vrijwel.', translationEn: 'Almost', syllables: ['bij', 'na'], exampleNl: 'Ik ben bijna klaar.', level: 'Groep 3-4 (AVI M3-E4)' },
  'duidelijk': { word: 'duidelijk', wordType: 'Bijvoeglijk naamwoord', meaningNl: 'Helder.', translationEn: 'Clear', syllables: ['dui', 'de', 'lijk'], exampleNl: 'Het antwoord is duidelijk.', level: 'Groep 5-6 (AVI M5-E6)' },
  'echte': { word: 'echte', wordType: 'Bijvoeglijk naamwoord', meaningNl: 'Werkelijk.', translationEn: 'Real', syllables: ['ech', 'te'], exampleNl: 'Dit is een echte diamant.', level: 'Groep 3-4 (AVI M3-E4)', compound: 'echt + e' },
  'geheime': { word: 'geheime', wordType: 'Bijvoeglijk naamwoord', meaningNl: 'Verborgen.', translationEn: 'Secret', syllables: ['ge', 'hei', 'me'], exampleNl: 'Een geheime boodschap.', level: 'Groep 5-6 (AVI M5-E6)', compound: 'geheim + e' },
  'grote': { word: 'grote', wordType: 'Bijvoeglijk naamwoord', meaningNl: 'Groot.', translationEn: 'Big', syllables: ['gro', 'te'], exampleNl: 'De grote boom.', level: 'Groep 3-4 (AVI M3-E4)', compound: 'groot + e' },
  'kleine': { word: 'kleine', wordType: 'Bijvoeglijk naamwoord', meaningNl: 'Niet groot.', translationEn: 'Small', syllables: ['klei', 'ne'], exampleNl: 'Het kleine huisje.', level: 'Groep 3-4 (AVI M3-E4)', compound: 'klein + e' },
  'lange': { word: 'lange', wordType: 'Bijvoeglijk naamwoord', meaningNl: 'Lang.', translationEn: 'Long', syllables: ['lan', 'ge'], exampleNl: 'De lange weg.', level: 'Groep 3-4 (AVI M3-E4)', compound: 'lang + e' },
  'moeilijke': { word: 'moeilijke', wordType: 'Bijvoeglijk naamwoord', meaningNl: 'Lastig.', translationEn: 'Difficult', syllables: ['moei', 'lij', 'ke'], exampleNl: 'Een moeilijke vraag.', level: 'Groep 5-6 (AVI M5-E6)', compound: 'moeilijk + e' },
  'mooie': { word: 'mooie', wordType: 'Bijvoeglijk naamwoord', meaningNl: 'Fraai.', translationEn: 'Beautiful', syllables: ['mooi', 'e'], exampleNl: 'Wat een mooie dag!', level: 'Groep 3-4 (AVI M3-E4)', compound: 'mooi + e' },
  'nieuwe': { word: 'nieuwe', wordType: 'Bijvoeglijk naamwoord', meaningNl: 'Recent.', translationEn: 'New', syllables: ['nieu', 'we'], exampleNl: 'Mijn nieuwe fiets.', level: 'Groep 3-4 (AVI M3-E4)', compound: 'nieuw + e' },
  'oude': { word: 'oude', wordType: 'Bijvoeglijk naamwoord', meaningNl: 'Van lang geleden.', translationEn: 'Old', syllables: ['ou', 'de'], exampleNl: 'Het oude huis.', level: 'Groep 3-4 (AVI M3-E4)', compound: 'oud + e' },
  'vrolijke': { word: 'vrolijke', wordType: 'Bijvoeglijk naamwoord', meaningNl: 'Blij.', translationEn: 'Cheerful', syllables: ['vro', 'lij', 'ke'], exampleNl: 'Een vrolijke lach.', level: 'Groep 4-5 (AVI E4-M5)', compound: 'vrolijk + e' },
  'warme': { word: 'warme', wordType: 'Bijvoeglijk naamwoord', meaningNl: 'Warm.', translationEn: 'Warm', syllables: ['war', 'me'], exampleNl: 'De warme zon.', level: 'Groep 3-4 (AVI M3-E4)', compound: 'warm + e' },
  'zachte': { word: 'zachte', wordType: 'Bijvoeglijk naamwoord', meaningNl: 'Niet hard.', translationEn: 'Soft', syllables: ['zach', 'te'], exampleNl: 'Een zachte kussen.', level: 'Groep 3-4 (AVI M3-E4)', compound: 'zacht + e' }
};

const NOUNS: Record<string, DictionaryEntry> = {
  'antwoord': { word: 'antwoord', wordType: 'Zelfstandig naamwoord', meaningNl: 'Reactie op vraag.', translationEn: 'Answer', syllables: ['ant', 'woord'], exampleNl: 'Wat is het goede antwoord?', level: 'Groep 3-4 (AVI M3-E4)', compound: 'ant + woord' },
  'antwoorden': { word: 'antwoorden', wordType: 'Zelfstandig naamwoord', meaningNl: 'Meervoud.', translationEn: 'Answers', syllables: ['ant', 'woor', 'den'], exampleNl: 'De antwoorden staan in het boek.', level: 'Groep 3-4 (AVI M3-E4)', compound: 'antwoord + en' },
  'begrijpend': { word: 'begrijpend', wordType: 'Bijvoeglijk naamwoord', meaningNl: 'Begrijpen van tekst.', translationEn: 'Comprehension', syllables: ['be', 'grijp', 'end'], exampleNl: 'Begrijpend lezen.', level: 'Groep 5-6 (AVI M5-E6)', compound: 'begrijp + end' },
  'woord': { word: 'woord', wordType: 'Zelfstandig naamwoord', meaningNl: 'Groep letters.', translationEn: 'Word', syllables: ['woord'], exampleNl: 'Hoe schrijf je dit woord?', level: 'Groep 3-4 (AVI M3-E4)' },
  'woorden': { word: 'woorden', wordType: 'Zelfstandig naamwoord', meaningNl: 'Meervoud.', translationEn: 'Words', syllables: ['woor', 'den'], exampleNl: 'Lees alle woorden.', level: 'Groep 3-4 (AVI M3-E4)', compound: 'woord + en' },
  'letters': { word: 'letters', wordType: 'Zelfstandig naamwoord', meaningNl: 'Alfabettekens.', translationEn: 'Letters', syllables: ['let', 'ters'], exampleNl: 'Zoek de juiste letters.', level: 'Groep 3-4 (AVI M3-E4)', compound: 'letter + s' },
  'spelling': { word: 'spelling', wordType: 'Zelfstandig naamwoord', meaningNl: 'Schrijfwijze.', translationEn: 'Spelling', syllables: ['spel', 'ling'], exampleNl: 'De spelling is moeilijk.', level: 'Groep 4-5 (AVI E4-M5)', compound: 'spel + ling' },
  'verhaal': { word: 'verhaal', wordType: 'Zelfstandig naamwoord', meaningNl: 'Beschrijving.', translationEn: 'Story', syllables: ['ver', 'haal'], exampleNl: 'Lees het verhaal.', level: 'Groep 3-4 (AVI M3-E4)', compound: 'ver + haal' },
  'verhalen': { word: 'verhalen', wordType: 'Zelfstandig naamwoord', meaningNl: 'Meervoud.', translationEn: 'Stories', syllables: ['ver', 'ha', 'len'], exampleNl: 'Spannende verhalen.', level: 'Groep 3-4 (AVI M3-E4)', compound: 'verhaal + en' },
  'vraag': { word: 'vraag', wordType: 'Zelfstandig naamwoord', meaningNl: 'Iets wat je wilt weten.', translationEn: 'Question', syllables: ['vraag'], exampleNl: 'Heb je een vraag?', level: 'Groep 3-4 (AVI M3-E4)' },
  'vragen': { word: 'vragen', wordType: 'Zelfstandig naamwoord', meaningNl: 'Meervoud.', translationEn: 'Questions', syllables: ['vra', 'gen'], exampleNl: 'Beantwoord alle vragen.', level: 'Groep 3-4 (AVI M3-E4)', compound: 'vraag + en' },
  'keuze': { word: 'keuze', wordType: 'Zelfstandig naamwoord', meaningNl: 'Kiezen.', translationEn: 'Choice', syllables: ['keu', 'ze'], exampleNl: 'Maak een goede keuze.', level: 'Groep 4-5 (AVI E4-M5)' },
  'keuzes': { word: 'keuzes', wordType: 'Zelfstandig naamwoord', meaningNl: 'Meervoud.', translationEn: 'Choices', syllables: ['keu', 'zes'], exampleNl: 'Er zijn meerdere keuzes.', level: 'Groep 4-5 (AVI E4-M5)', compound: 'keuze + s' },
  'hint': { word: 'hint', wordType: 'Zelfstandig naamwoord', meaningNl: 'Aanwijzing.', translationEn: 'Hint', syllables: ['hint'], exampleNl: 'Gebruik de hint.', level: 'Groep 5-6 (AVI M5-E6)' },
  'hints': { word: 'hints', wordType: 'Zelfstandig naamwoord', meaningNl: 'Meervoud.', translationEn: 'Hints', syllables: ['hints'], exampleNl: 'Je krijgt drie hints.', level: 'Groep 5-6 (AVI M5-E6)', compound: 'hint + s' },
  'uitleg': { word: 'uitleg', wordType: 'Zelfstandig naamwoord', meaningNl: 'Verklaring.', translationEn: 'Explanation', syllables: ['uit', 'leg'], exampleNl: 'Luister naar de uitleg.', level: 'Groep 4-5 (AVI E4-M5)', compound: 'uit + leg' },
  'emoji': { word: 'emoji', wordType: 'Zelfstandig naamwoord', meaningNl: 'Digitaal plaatje.', translationEn: 'Emoji', syllables: ['e', 'mo', 'ji'], exampleNl: 'Kies een leuke emoji.', level: 'Groep 3-4 (AVI M3-E4)' },
  'kijkje': { word: 'kijkje', wordType: 'Zelfstandig naamwoord', meaningNl: 'Korte blik.', translationEn: 'Peek', syllables: ['kijk', 'je'], exampleNl: 'Neem een kijkje.', level: 'Groep 3-4 (AVI M3-E4)', compound: 'kijk + je' }
};

const PREPOSITIONS: Record<string, DictionaryEntry> = {
  'binnen': { word: 'binnen', wordType: 'Voorzetsel', meaningNl: 'Binnenkant.', translationEn: 'Inside', syllables: ['bin', 'nen'], exampleNl: 'Kom snel binnen!', level: 'Groep 3-4 (AVI M3-E4)' },
  'buiten': { word: 'buiten', wordType: 'Voorzetsel', meaningNl: 'Buitenkant.', translationEn: 'Outside', syllables: ['bui', 'ten'], exampleNl: 'We spelen buiten.', level: 'Groep 3-4 (AVI M3-E4)' },
  'tegen': { word: 'tegen', wordType: 'Voorzetsel', meaningNl: 'Tegenover.', translationEn: 'Against', syllables: ['te', 'gen'], exampleNl: 'Leun niet tegen de muur.', level: 'Groep 3-4 (AVI M3-E4)' },
  'tussen': { word: 'tussen', wordType: 'Voorzetsel', meaningNl: 'In het midden.', translationEn: 'Between', syllables: ['tus', 'sen'], exampleNl: 'Het boek ligt ertussen.', level: 'Groep 3-4 (AVI M3-E4)' },
  'zonder': { word: 'zonder', wordType: 'Voorzetsel', meaningNl: 'Niet met.', translationEn: 'Without', syllables: ['zon', 'der'], exampleNl: 'Koffie zonder suiker.', level: 'Groep 3-4 (AVI M3-E4)' }
};

const ADVERBS: Record<string, DictionaryEntry> = {
  'altijd': { word: 'altijd', wordType: 'Bijwoord', meaningNl: 'Voortdurend.', translationEn: 'Always', syllables: ['al', 'tijd'], exampleNl: 'Ik ben altijd op tijd.', level: 'Groep 3-4 (AVI M3-E4)' },
  'daar': { word: 'daar', wordType: 'Bijwoord', meaningNl: 'Die plaats.', translationEn: 'There', syllables: ['daar'], exampleNl: 'Kijk, daar is een vogel!', level: 'Groep 3-4 (AVI M3-E4)' },
  'hier': { word: 'hier', wordType: 'Bijwoord', meaningNl: 'Deze plaats.', translationEn: 'Here', syllables: ['hier'], exampleNl: 'Kom hier staan.', level: 'Groep 3-4 (AVI M3-E4)' },
  'nog': { word: 'nog', wordType: 'Bijwoord', meaningNl: 'Nog steeds.', translationEn: 'Still', syllables: ['nog'], exampleNl: 'Ik ben nog niet klaar.', level: 'Groep 3-4 (AVI M3-E4)' },
  'straks': { word: 'straks', wordType: 'Bijwoord', meaningNl: 'Binnenkort.', translationEn: 'Soon', syllables: ['straks'], exampleNl: 'We gaan straks naar school.', level: 'Groep 3-4 (AVI M3-E4)' },
  'vaak': { word: 'vaak', wordType: 'Bijwoord', meaningNl: 'Regelmatig.', translationEn: 'Often', syllables: ['vaak'], exampleNl: 'Ik lees vaak boeken.', level: 'Groep 3-4 (AVI M3-E4)' },
  'vandaag': { word: 'vandaag', wordType: 'Bijwoord', meaningNl: 'Deze dag.', translationEn: 'Today', syllables: ['van', 'daag'], exampleNl: 'Vandaag is het mooi.', level: 'Groep 3-4 (AVI M3-E4)', compound: 'van + daag' },
  'waar': { word: 'waar', wordType: 'Bijwoord', meaningNl: 'Vragend naar plaats.', translationEn: 'Where', syllables: ['waar'], exampleNl: 'Waar woon jij?', level: 'Groep 3-4 (AVI M3-E4)' },
  'waarom': { word: 'waarom', wordType: 'Bijwoord', meaningNl: 'Vragend naar reden.', translationEn: 'Why', syllables: ['waar', 'om'], exampleNl: 'Waarom ben je laat?', level: 'Groep 3-4 (AVI M3-E4)', compound: 'waar + om' },
  'weer': { word: 'weer', wordType: 'Bijwoord', meaningNl: 'Opnieuw.', translationEn: 'Again', syllables: ['weer'], exampleNl: 'Doe het maar weer.', level: 'Groep 3-4 (AVI M3-E4)' },
  'wel': { word: 'wel', wordType: 'Bijwoord', meaningNl: 'Bevestigend.', translationEn: 'Indeed', syllables: ['wel'], exampleNl: 'Ik wil wel meedoen.', level: 'Groep 3-4 (AVI M3-E4)' }
};

const GAME_TERMS: Record<string, DictionaryEntry> = {
  'groep': { word: 'groep', wordType: 'Zelfstandig naamwoord', meaningNl: 'Schoolklas.', translationEn: 'Grade', syllables: ['groep'], exampleNl: 'Ik zit in groep 5.', level: 'Groep 3-4 (AVI M3-E4)' },
  'cito': { word: 'cito', wordType: 'Zelfstandig naamwoord', meaningNl: 'Schooltoets.', translationEn: 'CITO test', syllables: ['ci', 'to'], exampleNl: 'We oefenen voor de CITO.', level: 'Groep 5-6 (AVI M5-E6)' },
  'avi': { word: 'avi', wordType: 'Zelfstandig naamwoord', meaningNl: 'Leesniveau.', translationEn: 'AVI level', syllables: ['a', 'vi'], exampleNl: 'Dit boek is AVI E4.', level: 'Groep 3-4 (AVI M3-E4)' },
  'level': { word: 'level', wordType: 'Zelfstandig naamwoord', meaningNl: 'Speelniveau.', translationEn: 'Level', syllables: ['le', 'vel'], exampleNl: 'Je bent in level 3.', level: 'Groep 3-4 (AVI M3-E4)' },
  'levels': { word: 'levels', wordType: 'Zelfstandig naamwoord', meaningNl: 'Meervoud.', translationEn: 'Levels', syllables: ['le', 'vels'], exampleNl: 'Er zijn veel levels.', level: 'Groep 3-4 (AVI M3-E4)', compound: 'level + s' },
  'score': { word: 'score', wordType: 'Zelfstandig naamwoord', meaningNl: 'Punten.', translationEn: 'Score', syllables: ['sco', 're'], exampleNl: 'Je hebt een hoge score!', level: 'Groep 4-5 (AVI E4-M5)' },
  'punt': { word: 'punt', wordType: 'Zelfstandig naamwoord', meaningNl: 'Punt in spel.', translationEn: 'Point', syllables: ['punt'], exampleNl: 'Je krijgt een punt.', level: 'Groep 3-4 (AVI M3-E4)' },
  'punten': { word: 'punten', wordType: 'Zelfstandig naamwoord', meaningNl: 'Meervoud.', translationEn: 'Points', syllables: ['pun', 'ten'], exampleNl: 'Je hebt veel punten!', level: 'Groep 3-4 (AVI M3-E4)', compound: 'punt + en' },
  'beloning': { word: 'beloning', wordType: 'Zelfstandig naamwoord', meaningNl: 'Beloning.', translationEn: 'Reward', syllables: ['be', 'lo', 'ning'], exampleNl: 'Je krijgt een beloning.', level: 'Groep 4-5 (AVI E4-M5)' },
  'sterren': { word: 'sterren', wordType: 'Zelfstandig naamwoord', meaningNl: 'Punten in spel.', translationEn: 'Stars', syllables: ['ster', 'ren'], exampleNl: 'Je hebt drie sterren!', level: 'Groep 3-4 (AVI M3-E4)', compound: 'ster + ren' },
  'categorie': { word: 'categorie', wordType: 'Zelfstandig naamwoord', meaningNl: 'Groep.', translationEn: 'Category', syllables: ['ca', 'te', 'go', 'rie'], exampleNl: 'Kies een categorie.', level: 'Groep 5-6 (AVI M5-E6)' },
  'optie': { word: 'optie', wordType: 'Zelfstandig naamwoord', meaningNl: 'Mogelijkheid.', translationEn: 'Option', syllables: ['op', 'tie'], exampleNl: 'Dit is een optie.', level: 'Groep 5-6 (AVI M5-E6)' },
  'opties': { word: 'opties', wordType: 'Zelfstandig naamwoord', meaningNl: 'Meervoud.', translationEn: 'Options', syllables: ['op', 'ties'], exampleNl: 'Er zijn meerdere opties.', level: 'Groep 5-6 (AVI M5-E6)', compound: 'optie + s' }
};

// High-frequency Dutch words commonly used in the game
const HIGH_FREQ_WORDS: Record<string, DictionaryEntry> = {
  // Core function words
  'maar': { word: 'maar', wordType: 'Voegwoord', meaningNl: 'Tegenstelling.', translationEn: 'But', syllables: ['maar'], exampleNl: 'Ik wil, maar ik kan niet.', level: 'Groep 3-4 (AVI M3-E4)' },
  'niet': { word: 'niet', wordType: 'Bijwoord', meaningNl: 'Ontkenning.', translationEn: 'Not', syllables: ['niet'], exampleNl: 'Dat is niet goed.', level: 'Groep 3-4 (AVI M3-E4)' },
  'naar': { word: 'naar', wordType: 'Voorzetsel', meaningNl: 'Richting.', translationEn: 'To', syllables: ['naar'], exampleNl: 'Ik ga naar school.', level: 'Groep 3-4 (AVI M3-E4)' },
  'veel': { word: 'veel', wordType: 'Bijwoord', meaningNl: 'Grote hoeveelheid.', translationEn: 'Much / Many', syllables: ['veel'], exampleNl: 'Er zijn veel kinderen.', level: 'Groep 3-4 (AVI M3-E4)' },
  'meer': { word: 'meer', wordType: 'Bijwoord', meaningNl: 'Vergrotend.', translationEn: 'More', syllables: ['meer'], exampleNl: 'Ik wil meer water.', level: 'Groep 3-4 (AVI M3-E4)' },
  'ook': { word: 'ook', wordType: 'Bijwoord', meaningNl: 'Toevoeging.', translationEn: 'Also', syllables: ['ook'], exampleNl: 'Ik kom ook mee.', level: 'Groep 3-4 (AVI M3-E4)' },
  'over': { word: 'over', wordType: 'Voorzetsel', meaningNl: 'Aan de andere kant.', translationEn: 'Over / About', syllables: ['o', 'ver'], exampleNl: 'Het boek ligt over de tafel.', level: 'Groep 3-4 (AVI M3-E4)' },
  'uit': { word: 'uit', wordType: 'Voorzetsel', meaningNl: 'Naar buiten.', translationEn: 'Out', syllables: ['uit'], exampleNl: 'Kom naar buiten!', level: 'Groep 3-4 (AVI M3-E4)' },
  'voor': { word: 'voor', wordType: 'Voorzetsel', meaningNl: 'Plaats of tijd.', translationEn: 'For / Before', syllables: ['voor'], exampleNl: 'Dit is voor jou.', level: 'Groep 3-4 (AVI M3-E4)' },
  'zo': { word: 'zo', wordType: 'Bijwoord', meaningNl: 'Op deze manier.', translationEn: 'So / Like this', syllables: ['zo'], exampleNl: 'Doe het zo.', level: 'Groep 3-4 (AVI M3-E4)' },
  
  // Common verbs
  'zijn': { word: 'zijn', wordType: 'Werkwoord', meaningNl: 'Bestaan.', translationEn: 'To be', syllables: ['zijn'], exampleNl: 'Wij zijn blij.', level: 'Groep 3-4 (AVI M3-E4)' },
  'komen': { word: 'komen', wordType: 'Werkwoord', meaningNl: 'Naar toe gaan.', translationEn: 'To come', syllables: ['ko', 'men'], exampleNl: 'Kom je mee?', level: 'Groep 3-4 (AVI M3-E4)' },
  'helpen': { word: 'helpen', wordType: 'Werkwoord', meaningNl: 'Assisteren.', translationEn: 'To help', syllables: ['hel', 'pen'], exampleNl: 'Kan je me helpen?', level: 'Groep 3-4 (AVI M3-E4)' },
  'moet': { word: 'moet', wordType: 'Werkwoord', meaningNl: 'Verplichting.', translationEn: 'Must', syllables: ['moet'], exampleNl: 'Je moet luisteren.', level: 'Groep 3-4 (AVI M3-E4)' },
  'moeten': { word: 'moeten', wordType: 'Werkwoord', meaningNl: 'Verplichting (meervoud).', translationEn: 'Must (plural)', syllables: ['moe', 'ten'], exampleNl: 'Wij moeten oefenen.', level: 'Groep 3-4 (AVI M3-E4)' },
  
  // Common adjectives
  'leuk': { word: 'leuk', wordType: 'Bijvoeglijk naamwoord', meaningNl: 'Pretig.', translationEn: 'Nice / Fun', syllables: ['leuk'], exampleNl: 'Dat is leuk!', level: 'Groep 3-4 (AVI M3-E4)' },
  'snel': { word: 'snel', wordType: 'Bijvoeglijk naamwoord', meaningNl: 'Met hoge snelheid.', translationEn: 'Fast', syllables: ['snel'], exampleNl: 'Rennen is snel.', level: 'Groep 3-4 (AVI M3-E4)' },
  'klaar': { word: 'klaar', wordType: 'Bijvoeglijk naamwoord', meaningNl: 'Afgerond.', translationEn: 'Ready / Done', syllables: ['klaar'], exampleNl: 'Ik ben klaar!', level: 'Groep 3-4 (AVI M3-E4)' },
  
  // Common nouns
  'naam': { word: 'naam', wordType: 'Zelfstandig naamwoord', meaningNl: 'Iemands aanduiding.', translationEn: 'Name', syllables: ['naam'], exampleNl: 'Wat is jouw naam?', level: 'Groep 3-4 (AVI M3-E4)' },
  'iets': { word: 'iets', wordType: 'Voorzetsel', meaningNl: 'Onbepaald.', translationEn: 'Something', syllables: ['iets'], exampleNl: 'Ik zie iets.', level: 'Groep 3-4 (AVI M3-E4)' },
  'niets': { word: 'niets', wordType: 'Voorzetsel', meaningNl: 'Ontkenning.', translationEn: 'Nothing', syllables: ['niets'], exampleNl: 'Er is niets.', level: 'Groep 3-4 (AVI M3-E4)' },
  
  // Pronouns
  'ons': { word: 'ons', wordType: 'Voorzetsel', meaningNl: 'Wij (bezittelijk).', translationEn: 'Us / Our', syllables: ['ons'], exampleNl: 'Kom bij ons.', level: 'Groep 3-4 (AVI M3-E4)' },
  'elke': { word: 'elke', wordType: 'Voorzetsel', meaningNl: 'Iedere.', translationEn: 'Every', syllables: ['el', 'ke'], exampleNl: 'Elke dag.', level: 'Groep 3-4 (AVI M3-E4)' }
};

export const DUTCH_DICTIONARY_EXPANSION: Record<string, DictionaryEntry> = {
  ...VERB_FORMS, ...ADJECTIVES, ...NOUNS, ...PREPOSITIONS, ...ADVERBS, ...GAME_TERMS, ...HIGH_FREQ_WORDS
};

export const EXPANSION_COUNT = Object.keys(DUTCH_DICTIONARY_EXPANSION).length;

export function expandDictionary(existing: Record<string, DictionaryEntry>): Record<string, DictionaryEntry> {
  return { ...existing, ...DUTCH_DICTIONARY_EXPANSION };
}


