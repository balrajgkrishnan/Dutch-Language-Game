import { DUTCH_DICTIONARY_DB, COMPOUND_PREFIXES, COMPOUND_SUFFIXES, DictionaryEntry } from '../data/dutchDictionaryData';

// Massive High-Frequency Dutch-English Vocabulary & Grammar Index
const MASSIVE_TRANSLATION_MAP: Record<string, { en: string; nl: string; type: DictionaryEntry['wordType']; level?: DictionaryEntry['level'] }> = {
  // Common Adjectives
  'smal': { en: 'Narrow, slender', nl: 'Met een kleine breedte; het tegenovergestelde van breed.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'breed': { en: 'Wide, broad', nl: 'Met veel ruimte van links naar rechts.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'groot': { en: 'Big, large, tall', nl: 'Met flinke afmetingen; niet klein.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'klein': { en: 'Small, little, tiny', nl: 'Met geringe afmetingen; niet groot.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'lang': { en: 'Long, tall', nl: 'Met veel lengte van begin tot eind.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'kort': { en: 'Short, brief', nl: 'Met weinig lengte of van korte duur.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'dik': { en: 'Thick, fat', nl: 'Met een forse doorsnede.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'dun': { en: 'Thin, skinny, fine', nl: 'Met weinig dikte.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'diep': { en: 'Deep, profound', nl: 'Ver naar beneden reikend.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'ondiep': { en: 'Shallow', nl: 'Met weinig waterdiepte.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'hoog': { en: 'High, tall', nl: 'Ver boven de grond reikend.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'laag': { en: 'Low', nl: 'Dicht bij de grond.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'warm': { en: 'Warm, hot', nl: 'Met een hoge temperatuur.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'heet': { en: 'Very hot, scorching', nl: 'Erg warm, gloeiend heet.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'koud': { en: 'Cold, chilly', nl: 'Met een lage temperatuur.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'koel': { en: 'Cool, fresh', nl: 'Lekker fris, een beetje koud.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'nat': { en: 'Wet, damp', nl: 'Bedekt met water.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'droog': { en: 'Dry', nl: 'Zonder water of vocht.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'stil': { en: 'Quiet, silent, calm', nl: 'Zonder lawaai of geluid.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'luid': { en: 'Loud, noisy', nl: 'Met veel volume of geluid.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'druk': { en: 'Busy, bustling', nl: 'Vol mensen, dieren of beweging.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'rustig': { en: 'Peaceful, calm, relaxed', nl: 'Kalm, ontspannen en zonder haast.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'licht': { en: 'Light, bright / lightweight', nl: 'Niet zwaar, of helder verlicht.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'donker': { en: 'Dark, dim', nl: 'Zonder licht; schaduwrijk.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'helder': { en: 'Clear, bright, lucid', nl: 'Goed zichtbaar, transparant of scherp.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'troebel': { en: 'Murky, cloudy', nl: 'Niet doorzichtig; wazig.', type: 'Bijvoeglijk naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'wit': { en: 'White', nl: 'De kleur van verse sneeuw en melk.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'zwart': { en: 'Black', nl: 'De donkerste kleur, zoals de nacht.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'rood': { en: 'Red', nl: 'De kleur van aardbeien en brandweerauto\'s.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'blauw': { en: 'Blue', nl: 'De kleur van een heldere lucht en de zee.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'geel': { en: 'Yellow', nl: 'De kleur van de zon en rijpe bananen.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'groen': { en: 'Green', nl: 'De kleur van gras en boombladeren.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'oranje': { en: 'Orange', nl: 'De kleur van een wortel en een sinaasappel.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'paars': { en: 'Purple, violet', nl: 'Kleur gevormd door rood en blauw te mengen.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'bruin': { en: 'Brown', nl: 'De kleur van chocolade en boomstammen.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'grijs': { en: 'Grey, gray', nl: 'De kleur van regenwolken en rotsen.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'roze': { en: 'Pink', nl: 'Lichtrode zachte kleur.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'mooi': { en: 'Beautiful, lovely, nice', nl: 'Aangenaam om te zien.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'fraai': { en: 'Fine, handsome, elegant', nl: 'Heel netjes en mooi.', type: 'Bijvoeglijk naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'lelijk': { en: 'Ugly', nl: 'Niet fijn om naar te kijken.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'lief': { en: 'Sweet, dear, kind', nl: 'Aardig en vriendelijk voor anderen.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'boos': { en: 'Angry, cross, mad', nl: 'Kwaad en verontwaardigd.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'blij': { en: 'Happy, glad, cheerful', nl: 'Vrolijk gestemd; vol vreugde.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'vrolijk': { en: 'Joyful, merry, cheerful', nl: 'Met een opgewekt humeur en een lach.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'verdrietig': { en: 'Sad, sorrowful', nl: 'Bedroefd; moeten huilen van verdriet.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'bang': { en: 'Afraid, scared, frightened', nl: 'Angst voelend voor gevaar of schrik.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'dapper': { en: 'Brave, courageous, bold', nl: 'Niet bang zijn om het juiste te doen.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'moedig': { en: 'Courageous, brave', nl: 'Vol moed en durf.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'slim': { en: 'Smart, clever, intelligent', nl: 'Snel denkend en scherpzinnig.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'wijs': { en: 'Wise, sagacious', nl: 'Met diepe kennis en inzicht.', type: 'Bijvoeglijk naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'jong': { en: 'Young', nl: 'Nog niet lang op de wereld; jeugdig.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'oud': { en: 'Old, ancient', nl: 'Met al veel levensjaren achter de rug.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'nieuw': { en: 'New, novel', nl: 'Pas gemaakt of net ontdekt.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'snel': { en: 'Fast, quick, rapid', nl: 'Met grote snelheid; in korte tijd.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'vlug': { en: 'Swift, quick, nimble', nl: 'Behendig en vlot.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'traag': { en: 'Slow, sluggish', nl: 'Met heel weinig snelheid.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'langzaam': { en: 'Slowly, slow', nl: 'Niet snel, stap voor stap.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'hard': { en: 'Hard, firm / loud / fast', nl: 'Stevig van stof, of met veel kracht.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'zacht': { en: 'Soft, gentle, tender', nl: 'Aangenaam om aan te raken; niet hard.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'stevig': { en: 'Sturdy, robust, firm', nl: 'Sterk gebouwd; kan tegen een stootje.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'sterk': { en: 'Strong, powerful', nl: 'Met veel spierkracht of weerstand.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'zwak': { en: 'Weak, frail', nl: 'Met weinig kracht.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'makkelijk': { en: 'Easy, simple', nl: 'Zonder moeite te doen.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'moeilijk': { en: 'Difficult, hard, tough', nl: 'Veel inspanning of denkwerk kostend.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'belangrijk': { en: 'Important, significant, vital', nl: 'Van grote betekenis of waarde.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'bijzonder': { en: 'Special, extraordinary, unique', nl: 'Niet alledaags; opmerkelijk.', type: 'Bijvoeglijk naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'geheim': { en: 'Secret, confidential', nl: 'Wat niet iedereen mag weten.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'magisch': { en: 'Magical, enchanted', nl: 'Met toverkracht of betovering.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'prachtig': { en: 'Gorgeous, splendid, magnificent', nl: 'Heel erg fraai om te bewonderen.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'enorm': { en: 'Enormous, huge, immense', nl: 'Ontzaglijk groot in omvang.', type: 'Bijvoeglijk naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'rul': { en: 'Loose, crumbly (of dry sand)', nl: 'Los en fijnkorrelig zand.', type: 'Bijvoeglijk naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'schichtig': { en: 'Skittish, jumpy, furtive', nl: 'Snel geschrokken en angstig rondkijkend.', type: 'Bijvoeglijk naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'opgewonden': { en: 'Excited, thrilled', nl: 'Vol enthousiasme en spanning.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'vastberaden': { en: 'Determined, resolute', nl: 'Zeker van je plan en niet opgevend.', type: 'Bijvoeglijk naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'vol': { en: 'Full', nl: 'Tot de rand gevuld; er past niets meer bij.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'leeg': { en: 'Empty', nl: 'Zonder inhoud.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'zuiver': { en: 'Pure, clean', nl: 'Schoon en zonder viezigheid.', type: 'Bijvoeglijk naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'veilig': { en: 'Safe, secure', nl: 'Zonder gevaar voor ongelukken.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'gevaarlijk': { en: 'Dangerous, perilous', nl: 'Niet veilig; met kans op schade of pijn.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'juist': { en: 'Correct, right, accurate', nl: 'Precies zoals het hoort; foutloos.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'verkeerd': { en: 'Wrong, incorrect, mistaken', nl: 'Niet zoals het moet; met een fout.', type: 'Bijvoeglijk naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },

  // Story Nouns
  'duinpad': { en: 'Dune path, coastal sand trail', nl: 'Wandelpad door de zandduinen bij zee.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'pad': { en: 'Path, trail, track', nl: 'Smalle weg om over te lopen.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'duin': { en: 'Dune, sand hill', nl: 'Heuvel van zand aan de kust.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'baai': { en: 'Bay, cove, gulf', nl: 'Inham van de zee in het land.', type: 'Zelfstandig naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'kust': { en: 'Coast, shoreline', nl: 'Strook land direct aan zee.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'zee': { en: 'Sea, ocean', nl: 'Grote massa zout water.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'water': { en: 'Water', nl: 'Heldere vloeistof die dieren en mensen drinken.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'zand': { en: 'Sand', nl: 'Fijne korreltjes aarde op het strand.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'helmgras': { en: 'Marram grass, beach grass', nl: 'Sterk wuivend gras dat op zandduinen groeit.', type: 'Zelfstandig naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'gras': { en: 'Grass', nl: 'Groene plantjes die weilanden en duinen bedekken.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'spoor': { en: 'Track, footprint, trail', nl: 'Pootafdruk of aanwijzing in de grond.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'sporen': { en: 'Tracks, footprints', nl: 'Meerdere afdrukken van poten of wielen.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'koker': { en: 'Cylinder, tube, case', nl: 'Buisvormig omhulsel voor documenten.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'zegel': { en: 'Seal, wax stamp', nl: 'Stempel in rode was op een brief.', type: 'Zelfstandig naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'brief': { en: 'Letter, message, note', nl: 'Geschreven tekst voor iemand.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'perkament': { en: 'Parchment, antique scroll', nl: 'Oud, stevig schrijfpapier van dierenhuid.', type: 'Zelfstandig naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'wapen': { en: 'Coat of arms / emblem', nl: 'Schild of herkenningsteken van een koninkrijk of familie.', type: 'Zelfstandig naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'reservaat': { en: 'Wildlife reserve, sanctuary', nl: 'Beschermd gebied waar dieren veilig vrij rondlopen.', type: 'Zelfstandig naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'dierenreservaat': { en: 'Animal sanctuary, wildlife reserve', nl: 'Beschermd park voor safaridieren.', type: 'Zelfstandig naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'schipper': { en: 'Skipper, captain', nl: 'De kapitein van een schip.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'raadsel': { en: 'Riddle, mystery, puzzle', nl: 'Een vraag of puzzel die je moet oplossen.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'kloof': { en: 'Gorge, canyon, ravine', nl: 'Diepe rotsspleet tussen twee bergen.', type: 'Zelfstandig naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'bewaker': { en: 'Guard, watchman', nl: 'Iemand die de wacht houdt.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'wandelstaf': { en: 'Walking staff, hiking stick', nl: 'Stok om steun te geven tijdens het wandelen.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'stapsteen': { en: 'Stepping stone', nl: 'Steen in het water om overheen te stappen.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'brilglas': { en: 'Eyeglass lens', nl: 'Glas in een brilmontuur.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'bril': { en: 'Glasses, spectacles', nl: 'Montuur met glazen om scherper te kunnen kijken.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'haar': { en: 'Hair / Her', nl: 'Haren op het hoofd, of verwijswoord voor een meisje.', type: 'Verwijswoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'ogen': { en: 'Eyes', nl: 'Organen in het gezicht waarmee je kijkt.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'oog': { en: 'Eye', nl: 'Orgaan waarmee je ziet.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'oren': { en: 'Ears', nl: 'Organen aan de zijkant van het hoofd om mee te horen.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'oor': { en: 'Ear', nl: 'Gehoororgaan.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'hand': { en: 'Hand', nl: 'Lichaamsdeel aan het einde van de arm met vingers.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'handen': { en: 'Hands', nl: 'Beide handen.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'voet': { en: 'Foot', nl: 'Lichaamsdeel waar je op staat.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'voeten': { en: 'Feet', nl: 'Beide voeten.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'meisje': { en: 'Girl', nl: 'Een jong vrouwelijk kind.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'meisjes': { en: 'Girls', nl: 'Meerdere jonge vrouwelijke kinderen.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'jongen': { en: 'Boy', nl: 'Een jong mannelijk kind.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'zussen': { en: 'Sisters', nl: 'Meisjes van dezelfde ouders.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'zus': { en: 'Sister', nl: 'Vrouwelijk kind van dezelfde ouders.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'vriend': { en: 'Friend, buddy', nl: 'Iemand met wie je graag samen bent en speelt.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'dier': { en: 'Animal, creature', nl: 'Levend wezen.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'dieren': { en: 'Animals', nl: 'Meerdere levende wezens.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'leeuw': { en: 'Lion', nl: 'Grote katachtige roofdierkoning.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'leeuwenwelp': { en: 'Lion cub', nl: 'Jong babyleeuwtje.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'olifant': { en: 'Elephant', nl: 'Groot dier met een lange slurf en slagtanden.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'giraf': { en: 'Giraffe', nl: 'Hoog dier met een superlange nek en vlekken.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'zebra': { en: 'Zebra', nl: 'Afrikaans hoefdier met zwart-witte strepen.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'aap': { en: 'Monkey, ape', nl: 'Klimmend dier dat in bomen slingert.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'toekan': { en: 'Toucan', nl: 'Tropische vogel met een reusachtige oranje snavel.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'kasteel': { en: 'Castle, fortress', nl: 'Groot middeleeuws stenen bouwwerk met torens.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'toren': { en: 'Tower', nl: 'Hoog opstaand bouwwerk.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'poort': { en: 'Gate, portal', nl: 'Grote doorgang in een muur of hek.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'muur': { en: 'Wall', nl: 'Wand van gemetselde stenen.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'schat': { en: 'Treasure', nl: 'Kostbare verzameling goud en juwelen.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'schatkist': { en: 'Treasure chest', nl: 'Stevige houten kist vol schatten.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'sleutel': { en: 'Key', nl: 'Metalen voorwerp om een slot mee te openen.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'avontuur': { en: 'Adventure, quest', nl: 'Een spannende en bijzondere belevenis.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'verhaal': { en: 'Story, tale', nl: 'Vertelling over gebeurtenissen of avonturen.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'pagina': { en: 'Page', nl: 'Een bladzijde in een boek.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'woord': { en: 'Word', nl: 'Een eenheid van taal met een betekenis.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'zin': { en: 'Sentence', nl: 'Een reeks woorden die samen een gedachte uitdrukken.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'vraag': { en: 'Question', nl: 'Zin waarmee je informatie vraagt.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'antwoord': { en: 'Answer, reply', nl: 'De reactie op een gestelde vraag.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'mist': { en: 'Mist, fog', nl: 'Wolk waterdamp laag boven de grond.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'anker': { en: 'Anchor', nl: 'Zware haak om een boot stil te leggen.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'boom': { en: 'Tree', nl: 'Hoge houtige plant met stam en takken.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'bos': { en: 'Forest, woods', nl: 'Gebied vol bomen.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'rots': { en: 'Rock, boulder', nl: 'Grote brok steen in de natuur.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'rivier': { en: 'River, stream', nl: 'Natuurlijke waterstroom naar zee.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'brug': { en: 'Bridge', nl: 'Bouwwerk om een rivier of ravijn over te steken.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'touwbrug': { en: 'Rope bridge', nl: 'Hangende brug van touwen en planken.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },

  // Prepositions & Connectives
  'over': { en: 'Over, across, about', nl: 'Voorzetsel: boven iets langs of aangaande een onderwerp.', type: 'Voorzetsel', level: 'Groep 3-4 (AVI M3-E4)' },
  'naar': { en: 'To, towards', nl: 'In de richting van een plek.', type: 'Voorzetsel', level: 'Groep 3-4 (AVI M3-E4)' },
  'in': { en: 'In, inside', nl: 'Binnenin een ruimte of voorwerp.', type: 'Voorzetsel', level: 'Groep 3-4 (AVI M3-E4)' },
  'op': { en: 'On, upon', nl: 'Bovenop een oppervlak.', type: 'Voorzetsel', level: 'Groep 3-4 (AVI M3-E4)' },
  'bij': { en: 'At, near, with', nl: 'In de nabijheid van.', type: 'Voorzetsel', level: 'Groep 3-4 (AVI M3-E4)' },
  'voor': { en: 'In front of, for, before', nl: 'Aan de voorkant of ten behoeve van.', type: 'Voorzetsel', level: 'Groep 3-4 (AVI M3-E4)' },
  'achter': { en: 'Behind', nl: 'Aan de rugzijde van.', type: 'Voorzetsel', level: 'Groep 3-4 (AVI M3-E4)' },
  'onder': { en: 'Under, below', nl: 'Aan de onderzijde van.', type: 'Voorzetsel', level: 'Groep 3-4 (AVI M3-E4)' },
  'met': { en: 'With', nl: 'Samen met of met behulp van.', type: 'Voorzetsel', level: 'Groep 3-4 (AVI M3-E4)' },
  'zonder': { en: 'Without', nl: 'Waarbij iets ontbreekt.', type: 'Voorzetsel', level: 'Groep 3-4 (AVI M3-E4)' },
  'door': { en: 'Through, by means of', nl: 'Van de ene naar de andere kant doorheen gaand.', type: 'Voorzetsel', level: 'Groep 3-4 (AVI M3-E4)' },
  'langs': { en: 'Along, past', nl: 'Evenwijdig aan een lijn of route.', type: 'Voorzetsel', level: 'Groep 3-4 (AVI M3-E4)' },
  'tussen': { en: 'Between, among', nl: 'In het midden van twee of meer dingen.', type: 'Voorzetsel', level: 'Groep 3-4 (AVI M3-E4)' },
  'richting': { en: 'Direction, heading towards', nl: 'De koers waar je naartoe gaat.', type: 'Voorzetsel', level: 'Groep 3-4 (AVI M3-E4)' },
  'terwijl': { en: 'While, whilst, whereas', nl: 'Op hetzelfde moment dat iets anders gebeurt.', type: 'Voegwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'voordat': { en: 'Before, prior to', nl: 'Voor het tijdstip dat.', type: 'Voegwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'nadat': { en: 'After, once', nl: 'Nadat iets is afgerond.', type: 'Voegwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'zodra': { en: 'As soon as', nl: 'Vanaf het exacte moment dat.', type: 'Voegwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'toen': { en: 'When, at that time', nl: 'Op het moment in het verleden.', type: 'Voegwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'toenmalig': { en: 'Former, at the time', nl: 'Wat toen zo was.', type: 'Bijvoeglijk naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'nu': { en: 'Now, currently', nl: 'Op dit huidige moment.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'straks': { en: 'Later, shortly', nl: 'Over een korte tijd.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'later': { en: 'Later, afterwards', nl: 'Na enige tijd.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'vroeg': { en: 'Early', nl: 'In het begin van de dag of periode.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'laat': { en: 'Late', nl: 'Tegen het einde van de tijd.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'hier': { en: 'Here', nl: 'Op deze plaats.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'daar': { en: 'There', nl: 'Op die plek verderop.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'waar': { en: 'Where / True', nl: 'Op welke plaats, of juist/waarachtig.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'waarom': { en: 'Why, what for', nl: 'Om welke reden.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'hoe': { en: 'How', nl: 'Op welke manier.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'wat': { en: 'What', nl: 'Welk ding of feit.', type: 'Verwijswoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'wie': { en: 'Who', nl: 'Welke persoon.', type: 'Verwijswoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'welk': { en: 'Which', nl: 'Aanduiding van een keuze.', type: 'Verwijswoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'welke': { en: 'Which', nl: 'Aanduiding van een keuze.', type: 'Verwijswoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'daarnet': { en: 'Just now, a moment ago', nl: 'Zojuist, enkele minuten geleden.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'verder': { en: 'Further, onwards', nl: 'Verder voorwaarts.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'zo': { en: 'So, thus, this way', nl: 'Op deze wijze.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'voorzichtig': { en: 'Carefully, cautiously', nl: 'Met grote oplettendheid.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'heel': { en: 'Very / Whole', nl: 'Erg; in hoge mate.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'erg': { en: 'Very, terribly', nl: 'Zeer.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'te': { en: 'Too / At', nl: 'Meer dan gewenst (te veel), of voorzetsel.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'niet': { en: 'Not', nl: 'Ontkenning.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'wel': { en: 'Indeed, certainly', nl: 'Bevestiging: wel degelijk.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'en': { en: 'And', nl: 'Voegwoord dat woorden verbindt.', type: 'Voegwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'maar': { en: 'But, however', nl: 'Tegenstellend voegwoord.', type: 'Voegwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'of': { en: 'Or / Whether', nl: 'Keuze tussen twee zaken.', type: 'Voegwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'als': { en: 'If / When / As', nl: 'Voorwaarde of vergelijking.', type: 'Voegwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'dan': { en: 'Then / Than', nl: 'Daarna, of bij vergelijkingen.', type: 'Voegwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'ook': { en: 'Also, too, as well', nl: 'Eveneens.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'nog': { en: 'Still, yet, another', nl: 'Blijvend of extra.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'al': { en: 'Already / All', nl: 'Reeds, of alles.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'weer': { en: 'Again / Weather', nl: 'Opnieuw, of de weersgesteldheid.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'eens': { en: 'Once / Agreed', nl: 'Ooit, of van dezelfde mening.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'even': { en: 'For a moment, just', nl: 'Gedurende korte tijd.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'samen': { en: 'Together', nl: 'Met elkaar.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'alleen': { en: 'Alone, only', nl: 'Zonder anderen; uitsluitend.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'elk': { en: 'Each, every', nl: 'Ieder afzonderlijk.', type: 'Verwijswoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'ieder': { en: 'Everyone, each', nl: 'Elk persoon of ding.', type: 'Verwijswoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'alle': { en: 'All, every single', nl: 'Iedereen of alles tezamen.', type: 'Verwijswoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'veel': { en: 'Much, many, a lot', nl: 'In grote hoeveelheid.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'weinig': { en: 'Little, few', nl: 'Niet veel; gering in aantal.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'meer': { en: 'More / Lake', nl: 'Grotere hoeveelheid, of waterplas.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'minder': { en: 'Less, fewer', nl: 'Kleinere hoeveelheid.', type: 'Bijwoord', level: 'Groep 3-4 (AVI M3-E4)' },

  // Story & Core Dutch Vocabulary
  'glimlach': { en: 'Smile', nl: 'Een vriendelijke, blije uitdrukking op je gezicht waarbij de mondhoeken omhoog krullen.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'glimlachen': { en: 'To smile', nl: 'Vriendelijk en geluidloos lachen met de mondhoeken omhoog.', type: 'Werkwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'lach': { en: 'Laugh, laughter, smile', nl: 'Het vrolijke geluid en de blije gelaatsuitdrukking als je moet lachen.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'lachen': { en: 'To laugh, to chuckle', nl: 'Vrolijke geluiden maken als iets grappig of leuk is.', type: 'Werkwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'glim': { en: 'Gleam, glimmer, shine', nl: 'Een zachte schittering of weerkaatsing van licht.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'glimmen': { en: 'To gleam, to shimmer, to shine', nl: 'Licht weerkaatsen of glanzen.', type: 'Werkwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'verband': { en: 'Bandage, dressing / connection', nl: 'Witte strook stof om een wond te beschermen; ook een relatie tussen feiten.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'spalk': { en: 'Splint', nl: 'Stevig latje om een gebroken pootje of botje recht te houden.', type: 'Zelfstandig naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'spalken': { en: 'To splint, to brace', nl: 'Een bot of pootje vastzetten met een spalk.', type: 'Werkwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'kliniek': { en: 'Clinic, veterinary dispensary', nl: 'Plek waar zieke dieren of mensen verzorgd en onderzocht worden.', type: 'Zelfstandig naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'dierenarts': { en: 'Veterinarian, vet, animal doctor', nl: 'Dokter voor zieke en gewonde dieren.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'nachtmarkt': { en: 'Night market', nl: 'Gezellige markt die pas opengaat als het donker is.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'markt': { en: 'Market, bazaar', nl: 'Plein vol kramen waar fruit, groenten en spullen worden verkocht.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'straathond': { en: 'Stray dog, street dog', nl: 'Hond zonder baasje die op straat leeft.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'hond': { en: 'Dog', nl: 'Trouw viervoetig huisdier.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'kat': { en: 'Cat', nl: 'Katachtig huisdier dat spint.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'pootje': { en: 'Little paw, foot', nl: 'Klein pootje van een dier.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'vleugel': { en: 'Wing', nl: 'Lichaamsdeel waarmee een vogel kan vliegen.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'zalf': { en: 'Ointment, salve', nl: 'Zacht genezend smeersel voor wonden.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'wonderzalf': { en: 'Miracle ointment, magic salve', nl: 'Geneeskrachtige zalf die wonden snel heelt.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'teleporteren': { en: 'To teleport', nl: 'Je in één flits van de ene plek naar de andere verplaatsen.', type: 'Werkwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'telepathisch': { en: 'Telepathic', nl: 'Gedachten kunnen overbrengen zonder te praten.', type: 'Bijvoeglijk naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'zombie': { en: 'Zombie', nl: 'Bovennatuurlijk wezen uit spannende verhalen.', type: 'Zelfstandig naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'spreuk': { en: 'Spell, incantation', nl: 'Magische woorden om toverkracht te gebruiken.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'toverstok': { en: 'Magic wand', nl: 'Stokje waarmee een tovenaar tovert.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'toverboek': { en: 'Spellbook, grimoire', nl: 'Boek vol toverspreuken en recepten.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'kristal': { en: 'Crystal, gemstone', nl: 'Glinsterende heldere steen.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'amulet': { en: 'Amulet, charm, talisman', nl: 'Sieraad met beschermende toverkracht.', type: 'Zelfstandig naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'oerwoud': { en: 'Jungle, primeval rainforest', nl: 'Dicht tropisch bos met veel wilde dieren en planten.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'regenwoud': { en: 'Rainforest', nl: 'Tropisch bos waar veel regen valt en veel zeldzame dieren wonen.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'mysterie': { en: 'Mystery, puzzle', nl: 'Iets geheimzinnigs dat ontrafeld moet worden.', type: 'Zelfstandig naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'mysterieus': { en: 'Mysterious, enigmatic', nl: 'Vol geheimen en raadsels.', type: 'Bijvoeglijk naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'banyanboom': { en: 'Banyan tree', nl: 'Enorme tropische woudreus met luchtwortels.', type: 'Zelfstandig naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'ijsvogel': { en: 'Kingfisher', nl: 'Felgekleurde blauwe vogel die duikt naar visjes.', type: 'Zelfstandig naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'neushoornvogel': { en: 'Hornbill', nl: 'Tropische vogel met een grote gebogen snavel.', type: 'Zelfstandig naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'safari': { en: 'Safari expedition', nl: 'Avontuurlijke reis om wilde dieren in de natuur te bekijken.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'safaripark': { en: 'Safari park, game reserve', nl: 'Natuurpark waar safaridieren vrij rondlopen.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'jeep': { en: 'Safari jeep, 4x4 vehicle', nl: 'Sterke terreinauto met grote wielen voor ruige paden.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'verrekijker': { en: 'Binoculars', nl: 'Instrument met twee lenzen om dieren ver weg dichtbij te zien.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'boerin': { en: 'Female farmer, rancher', nl: 'Vrouw die op een boerderij werkt en dieren verzorgt.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'tess': { en: 'Tess (character name)', nl: 'De ervaren safariboerin en gids in het reservaat.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'ridheya': { en: 'Ridheya (younger sister protagonist)', nl: 'Jongste zusje: nieuwsgierige ontdekkingsreiziger en dierenarts met ronde bril.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'hemali': { en: 'Hemali (older sister protagonist)', nl: 'Oudste zusje: slimme tovenares, detective en strateeg met detectiveboek.', type: 'Zelfstandig naamwoord', level: 'Groep 5-6 (AVI M5-E6)' },
  'maleisië': { en: 'Malaysia (country in SE Asia)', nl: 'Prachtig tropisch land in Zuidoost-Azië vol regenwouden en eilanden.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'kopi': { en: 'Kopi (little street dog)', nl: 'Het dappere geredde hondje in Kuala Lumpur.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' },
  'appel': { en: 'Apple (fruit) / Appel (baby giraffe name)', nl: 'Ronde zoete vrucht, of het geadopteerde babygirafje van Hemali.', type: 'Zelfstandig naamwoord', level: 'Groep 3-4 (AVI M3-E4)' }
};

// Common verb inflections and past forms
const VERB_STEM_MAP: Record<string, { infinitive: string; en: string; nl: string; tense: string }> = {
  'glimlachte': { infinitive: 'glimlachen', en: 'Smiled', nl: 'Verleden tijd van glimlachen: keek met een vriendelijke glimlach.', tense: 'verleden tijd' },
  'glimlachten': { infinitive: 'glimlachen', en: 'Smiled', nl: 'Verleden tijd van glimlachen: keken met een vriendelijke glimlach.', tense: 'verleden tijd meervoud' },
  'glimlacht': { infinitive: 'glimlachen', en: 'Smiles', nl: 'Tegenwoordige tijd van glimlachen: kijkt met een vriendelijke glimlach.', tense: 'derde persoon' },
  'glimlachend': { infinitive: 'glimlachen', en: 'Smiling, with a smile', nl: 'Tegenwoordig deelwoord van glimlachen: terwijl men glimlacht.', tense: 'deelwoord' },
  'lachte': { infinitive: 'lachen', en: 'Laughed', nl: 'Verleden tijd van lachen: maakte vrolijk geluid van vreugde.', tense: 'verleden tijd' },
  'lachten': { infinitive: 'lachen', en: 'Laughed', nl: 'Verleden tijd van lachen: lachten vrolijk.', tense: 'verleden tijd meervoud' },
  'lacht': { infinitive: 'lachen', en: 'Laughs', nl: 'Tegenwoordige tijd van lachen.', tense: 'derde persoon' },
  'lachend': { infinitive: 'lachen', en: 'Laughing', nl: 'Tegenwoordig deelwoord van lachen.', tense: 'deelwoord' },
  'gelachen': { infinitive: 'lachen', en: 'Laughed', nl: 'Voltooid deelwoord van lachen.', tense: 'voltooid deelwoord' },
  'geglimlacht': { infinitive: 'glimlachen', en: 'Smiled', nl: 'Voltooid deelwoord van glimlachen.', tense: 'voltooid deelwoord' },
  'glom': { infinitive: 'glimmen', en: 'Gleamed, shone', nl: 'Verleden tijd van glimmen: weerkaatste licht.', tense: 'verleden tijd' },
  'glommen': { infinitive: 'glimmen', en: 'Gleamed, shone', nl: 'Verleden tijd van glimmen: glinsterden.', tense: 'verleden tijd meervoud' },
  'glimt': { infinitive: 'glimmen', en: 'Gleams, shines', nl: 'Tegenwoordige tijd van glimmen.', tense: 'derde persoon' },
  'geglommen': { infinitive: 'glimmen', en: 'Gleamed', nl: 'Voltooid deelwoord van glimmen.', tense: 'voltooid deelwoord' },
  'teleporteerde': { infinitive: 'teleporteren', en: 'Teleported', nl: 'Verleden tijd van teleporteren: verplaatste zich magisch.', tense: 'verleden tijd' },
  'teleporteerden': { infinitive: 'teleporteren', en: 'Teleported', nl: 'Verleden tijd van teleporteren.', tense: 'verleden tijd meervoud' },
  'teleporteert': { infinitive: 'teleporteren', en: 'Teleports', nl: 'Tegenwoordige tijd van teleporteren.', tense: 'derde persoon' },
  'spalkte': { infinitive: 'spalken', en: 'Splinted, braced', nl: 'Verleden tijd van spalken: zette het pootje vast met een spalk.', tense: 'verleden tijd' },
  'spalkten': { infinitive: 'spalken', en: 'Splinted', nl: 'Verleden tijd van spalken.', tense: 'verleden tijd meervoud' },
  'spalkt': { infinitive: 'spalken', en: 'Splints', nl: 'Tegenwoordige tijd van spalken.', tense: 'derde persoon' },
  'gespalkt': { infinitive: 'spalken', en: 'Splinted', nl: 'Voltooid deelwoord van spalken.', tense: 'voltooid deelwoord' },
  'verzorgde': { infinitive: 'verzorgen', en: 'Cared for, tended', nl: 'Verleden tijd van verzorgen: gaf medische zorg.', tense: 'verleden tijd' },
  'verzorgden': { infinitive: 'verzorgen', en: 'Cared for, tended', nl: 'Verleden tijd van verzorgen.', tense: 'verleden tijd meervoud' },
  'verzorgt': { infinitive: 'verzorgen', en: 'Cares for, tends', nl: 'Tegenwoordige tijd van verzorgen.', tense: 'derde persoon' },
  'verzorgd': { infinitive: 'verzorgen', en: 'Cared for, well-groomed', nl: 'Voltooid deelwoord van verzorgen.', tense: 'voltooid deelwoord' },
  'redde': { infinitive: 'redden', en: 'Rescued, saved', nl: 'Verleden tijd van redden: bracht in veiligheid.', tense: 'verleden tijd' },
  'redden': { infinitive: 'redden', en: 'Rescue / Rescued', nl: 'Infinitief of verleden tijd meervoud van redden.', tense: 'infinitief/verleden tijd' },
  'redt': { infinitive: 'redden', en: 'Rescues, saves', nl: 'Tegenwoordige tijd van redden.', tense: 'derde persoon' },
  'gered': { infinitive: 'redden', en: 'Rescued, saved', nl: 'Voltooid deelwoord van redden.', tense: 'voltooid deelwoord' },
  'wandelde': { infinitive: 'wandelen', en: 'Walked, hiked', nl: 'Verleden tijd van wandelen: stapte rustig voort.', tense: 'verleden tijd' },
  'wandelden': { infinitive: 'wandelen', en: 'Walked, hiked', nl: 'Verleden tijd van wandelen.', tense: 'verleden tijd meervoud' },
  'wandelt': { infinitive: 'wandelen', en: 'Walks, hikes', nl: 'Tegenwoordige tijd van wandelen.', tense: 'derde persoon' },
  'gewandeld': { infinitive: 'wandelen', en: 'Walked', nl: 'Voltooid deelwoord van wandelen.', tense: 'voltooid deelwoord' },
  'opende': { infinitive: 'openen', en: 'Opened', nl: 'Verleden tijd van openen: deed open.', tense: 'verleden tijd' },
  'openden': { infinitive: 'openen', en: 'Opened', nl: 'Verleden tijd van openen.', tense: 'verleden tijd meervoud' },
  'opent': { infinitive: 'openen', en: 'Opens', nl: 'Tegenwoordige tijd van openen.', tense: 'derde persoon' },
  'geopend': { infinitive: 'openen', en: 'Opened', nl: 'Voltooid deelwoord van openen.', tense: 'voltooid deelwoord' },
  'sloot': { infinitive: 'sluiten', en: 'Closed, shut', nl: 'Verleden tijd van sluiten: deed dicht.', tense: 'verleden tijd' },
  'sloten': { infinitive: 'sluiten', en: 'Closed, shut / Ditches', nl: 'Verleden tijd van sluiten, of watergreppels.', tense: 'verleden tijd meervoud' },
  'sluit': { infinitive: 'sluiten', en: 'Closes, shuts', nl: 'Tegenwoordige tijd van sluiten.', tense: 'derde persoon' },
  'gesloten': { infinitive: 'sluiten', en: 'Closed, shut', nl: 'Voltooid deelwoord van sluiten.', tense: 'voltooid deelwoord' },
  'zag': { infinitive: 'zien', en: 'Saw (past tense of see)', nl: 'Verleden tijd van zien: met de ogen waargenomen.', tense: 'verleden tijd enkelvoud' },
  'zagen': { infinitive: 'zien', en: 'Saw (past tense of see)', nl: 'Verleden tijd van zien: namen met de ogen waar.', tense: 'verleden tijd meervoud' },
  'ziet': { infinitive: 'zien', en: 'Sees', nl: 'Tegenwoordige tijd van zien.', tense: 'derde persoon' },
  'zie': { infinitive: 'zien', en: 'See', nl: 'Eerste persoon van zien.', tense: 'eerste persoon' },
  'gezien': { infinitive: 'zien', en: 'Seen', nl: 'Voltooid deelwoord van zien.', tense: 'voltooid deelwoord' },

  'liep': { infinitive: 'lopen', en: 'Walked', nl: 'Verleden tijd van lopen: zette stappen te voet.', tense: 'verleden tijd enkelvoud' },
  'liepen': { infinitive: 'lopen', en: 'Walked', nl: 'Verleden tijd van lopen: stapten voort te voet.', tense: 'verleden tijd meervoud' },
  'loopt': { infinitive: 'lopen', en: 'Walks', nl: 'Tegenwoordige tijd van lopen.', tense: 'derde persoon' },
  'loop': { infinitive: 'lopen', en: 'Walk', nl: 'Eerste persoon van lopen.', tense: 'eerste persoon' },
  'gelopen': { infinitive: 'lopen', en: 'Walked', nl: 'Voltooid deelwoord van lopen.', tense: 'voltooid deelwoord' },

  'keek': { infinitive: 'kijken', en: 'Looked, watched', nl: 'Verleden tijd van kijken: richtte de ogen op iets.', tense: 'verleden tijd enkelvoud' },
  'keken': { infinitive: 'kijken', en: 'Looked, watched', nl: 'Verleden tijd van kijken: keken aandachtig.', tense: 'verleden tijd meervoud' },
  'kijkt': { infinitive: 'kijken', en: 'Looks, watches', nl: 'Tegenwoordige tijd van kijken.', tense: 'derde persoon' },
  'kijk': { infinitive: 'kijken', en: 'Look', nl: 'Eerste persoon van kijken.', tense: 'eerste persoon' },
  'gekeken': { infinitive: 'kijken', en: 'Looked', nl: 'Voltooid deelwoord van kijken.', tense: 'voltooid deelwoord' },

  'kwam': { infinitive: 'komen', en: 'Came', nl: 'Verleden tijd van komen: arriveerde op een plek.', tense: 'verleden tijd enkelvoud' },
  'kwamen': { infinitive: 'komen', en: 'Came', nl: 'Verleden tijd van komen: arriveerden.', tense: 'verleden tijd meervoud' },
  'komt': { infinitive: 'komen', en: 'Comes, arrives', nl: 'Tegenwoordige tijd van komen.', tense: 'derde persoon' },
  'kom': { infinitive: 'komen', en: 'Come', nl: 'Eerste persoon van komen.', tense: 'eerste persoon' },
  'gekomen': { infinitive: 'komen', en: 'Come', nl: 'Voltooid deelwoord van komen.', tense: 'voltooid deelwoord' },

  'ging': { infinitive: 'gaan', en: 'Went', nl: 'Verleden tijd van gaan: bewoog zich voort.', tense: 'verleden tijd enkelvoud' },
  'gingen': { infinitive: 'gaan', en: 'Went', nl: 'Verleden tijd van gaan: bewogen zich voort.', tense: 'verleden tijd meervoud' },
  'gaat': { infinitive: 'gaan', en: 'Goes', nl: 'Tegenwoordige tijd van gaan.', tense: 'derde persoon' },
  'ga': { infinitive: 'gaan', en: 'Go', nl: 'Eerste persoon van gaan.', tense: 'eerste persoon' },
  'gegaan': { infinitive: 'gaan', en: 'Gone', nl: 'Voltooid deelwoord van gaan.', tense: 'voltooid deelwoord' },

  'stond': { infinitive: 'staan', en: 'Stood', nl: 'Verleden tijd van staan: was rechtop op één plaats.', tense: 'verleden tijd enkelvoud' },
  'stonden': { infinitive: 'staan', en: 'Stood', nl: 'Verleden tijd van staan: waren rechtop.', tense: 'verleden tijd meervoud' },
  'staat': { infinitive: 'staan', en: 'Stands', nl: 'Tegenwoordige tijd van staan.', tense: 'derde persoon' },
  'sta': { infinitive: 'staan', en: 'Stand', nl: 'Eerste persoon van staan.', tense: 'eerste persoon' },
  'gestaan': { infinitive: 'staan', en: 'Stood', nl: 'Voltooid deelwoord van staan.', tense: 'voltooid deelwoord' },

  'lag': { infinitive: 'liggen', en: 'Lay (down)', nl: 'Verleden tijd van liggen: rustte horizontaal.', tense: 'verleden tijd enkelvoud' },
  'lagen': { infinitive: 'liggen', en: 'Lay (down)', nl: 'Verleden tijd van liggen: rustten horizontaal.', tense: 'verleden tijd meervoud' },
  'ligt': { infinitive: 'liggen', en: 'Lies (down)', nl: 'Tegenwoordige tijd van liggen.', tense: 'derde persoon' },
  'lig': { infinitive: 'liggen', en: 'Lie (down)', nl: 'Eerste persoon van liggen.', tense: 'eerste persoon' },
  'gelegen': { infinitive: 'liggen', en: 'Lain', nl: 'Voltooid deelwoord van liggen.', tense: 'voltooid deelwoord' },

  'vond': { infinitive: 'vinden', en: 'Found', nl: 'Verleden tijd van vinden: ontdekte na zoeken.', tense: 'verleden tijd enkelvoud' },
  'vonden': { infinitive: 'vinden', en: 'Found', nl: 'Verleden tijd van vinden: ontdekten.', tense: 'verleden tijd meervoud' },
  'vindt': { infinitive: 'vinden', en: 'Finds', nl: 'Tegenwoordige tijd van vinden.', tense: 'derde persoon' },
  'vind': { infinitive: 'vinden', en: 'Find', nl: 'Eerste persoon van vinden.', tense: 'eerste persoon' },
  'gevonden': { infinitive: 'vinden', en: 'Found', nl: 'Voltooid deelwoord van vinden.', tense: 'voltooid deelwoord' },

  'hield': { infinitive: 'houden', en: 'Held', nl: 'Verleden tijd van houden: klemde vast.', tense: 'verleden tijd enkelvoud' },
  'hielden': { infinitive: 'houden', en: 'Held', nl: 'Verleden tijd van houden.', tense: 'verleden tijd meervoud' },
  'vasthield': { infinitive: 'vasthouden', en: 'Held tightly / gripped', nl: 'Verleden tijd van vasthouden: klemde stevig in de hand.', tense: 'verleden tijd' },
  'vasthielden': { infinitive: 'vasthouden', en: 'Held tightly', nl: 'Verleden tijd van vasthouden.', tense: 'verleden tijd meervoud' },
  'houdt': { infinitive: 'houden', en: 'Holds', nl: 'Tegenwoordige tijd van houden.', tense: 'derde persoon' },
  'houd': { infinitive: 'houden', en: 'Hold', nl: 'Eerste persoon van houden.', tense: 'eerste persoon' },

  'speurde': { infinitive: 'speuren', en: 'Scouted / tracked / searched', nl: 'Verleden tijd van speuren: zocht naar sporen.', tense: 'verleden tijd enkelvoud' },
  'speurden': { infinitive: 'speuren', en: 'Scouted / tracked', nl: 'Verleden tijd van speuren: zochten naar sporen.', tense: 'verleden tijd meervoud' },
  'speurt': { infinitive: 'speuren', en: 'Scouts / tracks', nl: 'Tegenwoordige tijd van speuren.', tense: 'derde persoon' },

  'glinsterde': { infinitive: 'glinsteren', en: 'Glistened / sparkled', nl: 'Verleden tijd van glinsteren: weerkaatste licht.', tense: 'verleden tijd' },
  'glinsterden': { infinitive: 'glinsteren', en: 'Glistened / sparkled', nl: 'Verleden tijd van glinsteren.', tense: 'verleden tijd meervoud' },
  'glinstert': { infinitive: 'glinsteren', en: 'Glistens / sparkles', nl: 'Tegenwoordige tijd van glinsteren.', tense: 'derde persoon' },

  'trok': { infinitive: 'trekken', en: 'Pulled / moved along', nl: 'Verleden tijd van trekken: bewoog voort of trok aan iets.', tense: 'verleden tijd enkelvoud' },
  'trokken': { infinitive: 'trekken', en: 'Pulled / moved', nl: 'Verleden tijd van trekken.', tense: 'verleden tijd meervoud' },

  'brak': { infinitive: 'breken', en: 'Broke', nl: 'Verleden tijd van breken: verbrak het zegel.', tense: 'verleden tijd enkelvoud' },
  'braken': { infinitive: 'breken', en: 'Broke', nl: 'Verleden tijd van breken.', tense: 'verleden tijd meervoud' },

  'wees': { infinitive: 'wijzen', en: 'Pointed', nl: 'Verleden tijd van wijzen: wees met de vinger.', tense: 'verleden tijd enkelvoud' },
  'wezen': { infinitive: 'wijzen', en: 'Pointed', nl: 'Verleden tijd van wijzen.', tense: 'verleden tijd meervoud' },

  'pakte': { infinitive: 'pakken', en: 'Grabbed / took', nl: 'Verleden tijd van pakken: nam in de hand.', tense: 'verleden tijd enkelvoud' },
  'pakten': { infinitive: 'pakken', en: 'Grabbed / took', nl: 'Verleden tijd van pakken.', tense: 'verleden tijd meervoud' },

  'fluisterde': { infinitive: 'fluisteren', en: 'Whispered', nl: 'Verleden tijd van fluisteren: sprak met zachte stem.', tense: 'verleden tijd enkelvoud' },
  'fluisterden': { infinitive: 'fluisteren', en: 'Whispered', nl: 'Verleden tijd van fluisteren.', tense: 'verleden tijd meervoud' },

  'riep': { infinitive: 'roepen', en: 'Shouted / called', nl: 'Verleden tijd van roepen: riep luid.', tense: 'verleden tijd enkelvoud' },
  'riepen': { infinitive: 'roepen', en: 'Shouted / called', nl: 'Verleden tijd van roepen.', tense: 'verleden tijd meervoud' },

  'knikte': { infinitive: 'knikken', en: 'Nodded', nl: 'Verleden tijd van knikken: bewoog het hoofd ja-bevestigend.', tense: 'verleden tijd enkelvoud' },
  'knikten': { infinitive: 'knikken', en: 'Nodded', nl: 'Verleden tijd van knikken.', tense: 'verleden tijd meervoud' },

  'was': { infinitive: 'zijn', en: 'Was', nl: 'Verleden tijd van zijn.', tense: 'verleden tijd enkelvoud' },
  'waren': { infinitive: 'zijn', en: 'Were', nl: 'Verleden tijd van zijn voor meerdere personen.', tense: 'verleden tijd meervoud' },
  'is': { infinitive: 'zijn', en: 'Is', nl: 'Derde persoon van zijn.', tense: 'tegenwoordige tijd' },
  'ben': { infinitive: 'zijn', en: 'Am', nl: 'Eerste persoon van zijn.', tense: 'tegenwoordige tijd' },
  'bent': { infinitive: 'zijn', en: 'Are', nl: 'Tweede persoon van zijn.', tense: 'tegenwoordige tijd' },
  'geweest': { infinitive: 'zijn', en: 'Been', nl: 'Voltooid deelwoord van zijn.', tense: 'voltooid deelwoord' },

  'had': { infinitive: 'hebben', en: 'Had', nl: 'Verleden tijd van hebben.', tense: 'verleden tijd enkelvoud' },
  'hadden': { infinitive: 'hebben', en: 'Had', nl: 'Verleden tijd van hebben voor meerdere personen.', tense: 'verleden tijd meervoud' },
  'heeft': { infinitive: 'hebben', en: 'Has', nl: 'Derde persoon van hebben.', tense: 'tegenwoordige tijd' },
  'heb': { infinitive: 'hebben', en: 'Have', nl: 'Eerste persoon van hebben.', tense: 'tegenwoordige tijd' },
  'gehad': { infinitive: 'hebben', en: 'Had', nl: 'Voltooid deelwoord van hebben.', tense: 'voltooid deelwoord' }
};

// Curated Story-Grounded Example Sentences for Kids (Ridheya & Hemali Adventures)
const CURATED_EXAMPLE_SENTENCES: Record<string, string> = {
  // Verbs (Past & Present Forms)
  'zag': 'Hemali zag de wijze olifant Raja rustig door de zilveren jungle-nevel stappen.',
  'zagen': 'Ridheya en Amir zagen de gekwetste ijsvogel zachtjes ademhalen onder de banyanboom.',
  'ziet': 'Ridheya ziet door haar ronde brilglas direct waar het steentje de vogel heeft geraakt.',
  'zie': '‘Ik zie de pootafdrukken van de zwerfhond!’ riep Ridheya blij tegen Mei-Ling.',
  'gezien': 'Hemali had nog nooit zo’n mooi saffieren amulet gezien in het nachthoorwoud.',
  
  'liep': 'Dierenarts Ridheya liep met haar rode verbandtas snel naar de fruitkramen.',
  'liepen': 'De twee zussen liepen hand in hand over het smalle duinpad naar de savannebaai.',
  'loopt': 'Het geredde hondje Kopi loopt weer vrolijk rond in de binnentuinkliniek.',
  'loop': '‘Ik loop voorzichtig over de touwbrug,’ zei Hemali vastberaden.',
  'gelopen': 'Amir had de hele ochtend door de tropische straatjes van Kuala Lumpur gelopen.',

  'keek': 'Hemali keek aandachtig in haar detective-notitieboek om de spreuk te begrijpen.',
  'keken': 'De jungledieren keken vol bewondering naar het pas geadopteerde babygirafje Appel.',
  'kijkt': 'Ridheya kijkt met een vergrootglas naar het gewonde pootje van Kopi.',
  'kijk': '‘Kijk eens hoe mooi de blauwe veertjes glanzen in het zonlicht,’ wees Ridheya.',
  'gekeken': 'Samen hadden ze goed gekeken naar de geheime Cito signaalwoorden op het perkament.',

  'kwam': 'Amir kwam met zijn rode bakfiets aangereden om eerste hulp te brengen.',
  'kwamen': 'De vrienden kwamen veilig aan bij het onderzoeksschip in de baai.',
  'komt': 'De wijze olifant Raja komt dichterbij om het eeuwenoude geheim te vertellen.',
  'kom': '‘Kom snel helpen met het verbandgaas!’ riep Ridheya naar Mei-Ling.',
  'gekomen': 'Er was een zeldzame vogel naar de tuinkliniek gekomen voor medische hulp.',

  'ging': 'Hemali ging met een magische flits door het portaal naar het Taman Negara oerwoud.',
  'gingen': 'De onderzoekers gingen vroeg in de ochtend op pad om dierensporen te tellen.',
  'gaat': 'Het herstel van het gewonde hondje gaat gelukkig heel erg snel.',
  'ga': '‘Ik ga de speciale kruidenzalf halen uit de dierenartskoffer,’ zei Ridheya.',
  'gegaan': 'Het slaapwandelende zombie-aapje was diep het nachthoorwoud ingegaan.',

  'stond': 'De trotse leeuw stond bovenop de rots en overzag het hele dierenreservaat.',
  'stonden': 'Ridheya en Mei-Ling stonden klaar met schoon water en zachte handdoeken.',
  'staat': 'Op het oude uithangbord staat: ‘Dierenkliniek Ridheya & Vrienden’.',
  'sta': '‘Ik sta klaar om het babygirafje Appel haar flesje melk te geven,’ lachte Hemali.',
  'gestaan': 'Het mysterieuze stenen altaar had al honderden jaren in de ruïne gestaan.',

  'lag': 'Het vermoeide hondje Kopi lag heerlijk te slapen op een zacht kussen in de tuin.',
  'lagen': 'Er lagen kleurrijke mangovruchten en banyanbladeren langs de Maleisische straat.',
  'ligt': 'Het onderzoeksschip ligt rustig voor anker in de beschutte kustbaai.',
  'lig': '‘Ik lig even in het gras om naar de fluitende ijsvogels te luisteren.’',
  'gelegen': 'Het zeldzame perkament had verborgen gelegen in een verzegelde bamboekoker.',

  'vond': 'Hemali vond het verloren babygirafje en noemde haar liefkozend ‘Appel’.',
  'vonden': 'In de schatkamer vonden de speurneuzen een magisch kompas met gouden wijzers.',
  'vindt': 'Dierenarts Ridheya vindt altijd een manier om elk gewond dier gerust te stellen.',
  'vind': '‘Ik vind het fantastisch dat we het aapje Zazu hebben kunnen genezen!’',
  'gevonden': 'Na een lange zoektocht hadden ze het juiste geneeskrachtige kruid gevonden.',

  'hield': 'Hemali hield het saffieren amulet stevig vast tijdens de teleportatie.',
  'hielden': 'De zussen hielden de kaart goed in het oog om niet te verdwalen.',
  'vasthield': 'Ridheya zorgde dat ze het pootje heel zachtjes vasthield bij het verbinden.',
  'vasthielden': 'Amir en Mei-Ling hielden de fiets vast terwijl de ijsvogel werd overgedragen.',
  'houdt': 'Ridheya houdt zielsveel van alle dieren in nood.',
  'houd': '‘Ik houd het detective-notitieboek paraat voor nieuwe aanwijzingen.’',

  'speurde': 'Ridheya speurde op de grond naar het scherpe steentje dat de vogel had geraakt.',
  'speurden': 'Samen speurden de meisjes naar fluorescerende lianen in de nachtelijke jungle.',
  'speurt': 'De wijze uil speurt vanaf een hoge tak naar beweging tussen het helmgras.',

  'glinsterde': 'Het saffieren amulet glinsterde helderblauw in het schijnsel van de volle maan.',
  'glinsterden': 'De zilveren slagtanden van olifant Raja glinsterden in het tropische schemerlicht.',
  'glinstert': 'De dauw op de acaciablaadjes glinstert als kleine diamantjes.',

  'trok': 'Hemali trok voorzichtig aan het hek van de verlaten binnentuin.',
  'trokken': 'De ontdekkingsreizigers trokken dieper het mysterieuze Taman Negara woud in.',

  'brak': 'Ridheya brak voorzichtig het rode lakzegel op de geheimzinnige brief.',
  'braken': 'De takken braken toen het ondeugende aapje een vrolijke salto maakte.',

  'wees': 'Amir wees naar het dak van de marktkraam waar de zeldzame ijsvogel zat.',
  'wezen': 'De gidsen wezen het veilige pad aan langs de gevaarlijke rotsspleet.',

  'pakte': 'Ridheya pakte het rolletje verbandgaas en een spalkje uit haar dierenartstas.',
  'pakten': 'De meisjes pakten hun uitrusting om op reddingsmissie te gaan.',

  'fluisterde': 'De wijze olifant Raja fluisterde een magische spreuk in Hemali’s oor.',
  'fluisterden': 'De wind en de bomen fluisterden zachtjes door het donkere bladerdak.',

  'riep': '‘Kijk, Kopi kan weer zonder pijn stappen!’ riep Ridheya dolblij.',
  'riepen': '‘Hoera voor de dierenartsen van Kuala Lumpur!’ riepen Amir en Mei-Ling in koor.',

  'knikte': 'Mei-Ling knikte vriendelijk en zette een kommetje vers water neer.',
  'knikten': 'De dorpsbewoners knikten dankbaar toen het gewonde dier genezen was.',

  'was': 'Het nachthoorwoud was stil, op het ritselen van de bladeren na.',
  'waren': 'De twee zussen waren ontzettend trots op hun eerste succesvolle reddingsactie.',
  'is': 'Ridheya is een buitengewoon begaafde en zorgzame jonge dierenarts.',
  'ben': '‘Ik ben klaar om elk Cito mysterie in dit boek op te lossen!’ zei Hemali.',
  'bent': '‘Jij bent echt de beste speurneus van het hele dierenreservaat!’',
  'geweest': 'Het was een onvergetelijk avontuur in de tropen geweest.',

  'had': 'Hemali had precies het juiste toverrijm opgeschreven in haar schrift.',
  'hadden': 'De meisjes hadden alle aanwijzingen op het perkament verzameld.',
  'heeft': 'Babygirafje Appel heeft schattige ronde vlekjes op haar zachte vacht.',
  'heb': '‘Ik heb de stethoscoop klaargelegd voor het volgende onderzoek.’',
  'gehad': 'Ze hadden nog nooit zo’n spannende ontmoeting met een pratende olifant gehad.',

  // Adjectives
  'smal': 'Het smalle bospad slingerde tussen torenhoge tropische woudreuzen door.',
  'breed': 'De rivier was te breed om over te springen, dus zochten ze naar stapstenen.',
  'groot': 'De grote olifant Raja bewoog met rustige, statige stappen door het woud.',
  'klein': 'Het kleine ijsvogeltje nestelde zich veilig in de warme handen van Ridheya.',
  'lang': 'Girafje Appel had al een lange nek om bij de zachte acaciablaadjes te reiken.',
  'kort': 'Na een korte pauze in de binnentuin vervolgden de vrienden hun speurtocht.',
  'dik': 'Hemali bladerde door een dik handboek vol Cito signaalwoorden en oerwoudkaarten.',
  'dun': 'Ridheya legde een dun laagje verzachtende zalf op het schrammetje van de hond.',
  'diep': 'Diep in het Taman Negara oerwoud ontdekten ze een vergeten stenen tempel.',
  'ondiep': 'In het ondiepe beekje kon hondje Kopi veilig pootjebaden om af te koelen.',
  'hoog': 'Bovenin de hoge banyanboom floot de blauwe ijsvogel een dankbaar liedje.',
  'laag': 'De mist hing laag over het wateroppervlak van de savannebaai.',
  'warm': 'De warme tropische bries waaide door de straatjes van Kuala Lumpur.',
  'heet': 'Midden op de dag was het zand op de savanne gloeiend heet.',
  'koud': 'In de diepe bergkloof voelde het water van de waterval heerlijk koud aan.',
  'koel': 'In de schaduw van de tuinkliniek bleef het lekker koel voor de zieke dieren.',
  'nat': 'Het verbandgaas werd een beetje nat toen Ridheya de wond met water spoelde.',
  'droog': 'Ze zochten een droge plek onder het dichte bladerdak om te schuilen.',
  'stil': 'Het hele oerwoud werd plotseling stil toen de betovering werd verbroken.',
  'luid': 'De toekan gaf een luid signaal om de andere dieren te waarschuwen.',
  'druk': 'Op de centrale markt in Maleisië was het een gezellige en drukke boel.',
  'rustig': 'Met een rustige stem stelde Ridheya de geschrokken straathond gerust.',
  'licht': 'Haar kleine dierenartstas was licht genoeg om urenlang mee te dragen.',
  'donker': 'Zelfs in het donkere bos wist Hemali de weg dankzij haar magische kompas.',
  'helder': 'Het water in de beek was zo helder dat je de zilveren visjes zag zwemmen.',
  'troebel': 'Het water in de poel was troebel, waardoor je de bodem niet kon zien.',
  'wit': 'Dierenarts Ridheya droeg een spierwitte doktersjas over haar kleding.',
  'zwart': 'De glanzende neus van het hondje was diepzwart en vochtig.',
  'rood': 'Amir fietste door de wijk op zijn felrode bakfiets vol hulpmiddelen.',
  'blauw': 'De veren van de tropische ijsvogel schitterden in prachtig felblauw.',
  'geel': 'Rijpe gele mango’s hingen verleidelijk aan de takken boven de tuin.',
  'groen': 'De weelderige jungle was gevuld met honderden tinten groen.',
  'oranje': 'De ondergaande zon kleurde de lucht boven Maleisië vurig oranje.',
  'paars': 'De zeldzame orchidee in Mei-Lings tuin had dieppaarse bloemblaadjes.',
  'bruin': 'De trouwe ogen van zwerfhond Kopi hadden een warme bruine gloed.',
  'grijs': 'De grijze huid van olifant Raja voelde aan als stevig boomschors.',
  'roze': 'De jonge leeuwenwelp had een schattig roze neusje.',
  'mooi': 'Het was een ongelooflijk mooi gezicht toen de vogel weer kon vliegen.',
  'fraai': 'Op het perkament stond een fraai gekalligrafeerde spreuk.',
  'lief': 'Babygirafje Appel gaf Hemali een lief en dankbaar kopje.',
  'boos': 'De aap was niet echt boos, maar alleen in de war door de nachtelijke betovering.',
  'blij': 'Ridheya was ontzettend blij toen de stethoscoop een rustige hartslag liet horen.',
  'vrolijk': 'Het hondje kwispelde vrolijk en rende rondjes om de zussen heen.',
  'verdrietig': 'Mei-Ling was even verdrietig toen ze het bezeerde pootje van de hond zag.',
  'bang': 'Wees maar niet bang, de dierenartsen zijn hier om je weer beter te maken!',
  'dapper': 'Ridheya was buitengewoon dapper toen ze het gewonde dier benaderde.',
  'moedig': 'Hemali zette een moedige stap naar voren om de toverspreuk uit te spreken.',
  'slim': 'Met een slimme redenering wist Hemali het lastige Cito raadsel te kraken.',
  'wijs': 'De wijze raad van de boswachter hielp de meisjes veilig door het reservaat.',
  'jong': 'Het jonge leeuwtje speelde vrolijk met een verdwaald palmblad.',
  'oud': 'In de oude tempel vonden ze perkamenten van eeuwen geleden.',
  'nieuw': 'Ridheya kreeg een gloednieuwe stethoscoop voor haar verjaardag.',
  'snel': 'De ijsvogel schoot met een snelle duikvlucht over het water.',
  'vlug': 'Vlug wikkelde Ridheya een beschermend gaasje om het wondje.',
  'traag': 'De reuzenschildpad bewoog zich traag maar gestaag voort over het zand.',
  'langzaam': 'Stap voor stap en heel langzaam naderden ze het rustende aapje.',
  'hard': 'Het steentje was hard tegen de vleugel van de vogel gekomen.',
  'zacht': 'Ridheya aaide met haar zachte hand over de vacht van het bibberende dier.',
  'stevig': 'De touwbrug was stevig verankerd aan twee reusachtige bomen.',
  'sterk': 'De wijze olifant was zo sterk dat hij een omgevallen stam opzij kon duwen.',
  'zwak': 'Het zieke vogeltje voelde zich eerst wat zwak, maar knapte snel weer op.',
  'makkelijk': 'Dankzij de heldere aanwijzingen was het raadsel verrassend makkelijk.',
  'moeilijk': 'Het was een moeilijk Cito signaalwoord, maar Hemali kende de betekenis.',
  'belangrijk': 'Het is heel belangrijk om een open wond direct schoon te spoelen.',
  'bijzonder': 'Het was een bijzonder moment toen de pratende dieren hun verhaal deden.',
  'geheim': 'In haar notitieboek bewaarde Hemali een geheim recept voor geneeskrachtige zalf.',
  'magisch': 'Met een magische lichtflits teleporteerde Hemali naar het veilige kamp.',
  'prachtig': 'Boven de Maleisische binnentuin hing een prachtig gewelf van bloemen.',
  'enorm': 'De banyanboom had een enorme stam met tientallen luchtwortels.',
  'rul': 'Het rulle zand van de duinen maakte het lopen zwaar, maar ze gaven niet op.',
  'schichtig': 'Het schichtige eekhoorntje keek snel om zich heen voor het een nootje pakte.',
  'opgewonden': 'Opgewonden vertelde Ridheya over de nieuwe tuinkliniek in de stad.',
  'vastberaden': 'Vastberaden pakte Hemali haar kompas om de juiste koers te bepalen.',
  'vol': 'De dierenartskoffer zat helemaal vol met schone verbandjes en zalfjes.',
  'leeg': 'Het kommetje melk was in een oogwenk helemaal leeggedronken door Appel.',
  'zuiver': 'In de bergstroom stroomde zuiver, kristalhelder bronwater.',
  'veilig': 'In de ommuurde binnentuin waren alle gewonde dieren volkomen veilig.',
  'gevaarlijk': 'De scherpe rotswand was gevaarlijk, dus kozen ze de veilige touwbrug.',
  'juist': 'Hemali koos het juiste antwoord en ontgrendelde daarmee de oude poort.',
  'verkeerd': 'Gelukkig hadden ze geen enkele verkeerde afslag genomen in het woud.',

  // Story Nouns
  'duinpad': 'Het smalle duinpad leidde rechtstreeks naar het glinsterende strand.',
  'pad': 'Volg het geplaveide pad tot aan de binnentuin van Mei-Ling.',
  'duin': 'Bovenop het hoogste zandduin zagen ze het onderzoeksschip liggen.',
  'baai': 'De baai bood een veilige haven tegen de woeste golven van de oceaan.',
  'kust': 'Langs de tropische kust van Maleisië groeien weelderige mangrovebossen.',
  'zee': 'In de verte glinsterde de diepblauwe zee onder de middagzon.',
  'water': 'Schoon water is onmisbaar om wonden te reinigen en dieren te hydrateren.',
  'zand': 'De zwerfhond had pootafdrukken achtergelaten in het rulle zand.',
  'helmgras': 'Het wuivende helmgras hield het zand van de duinen stevig bijeen.',
  'gras': 'Babygirafje Appel knabbelde nieuwsgierig aan de jonge sprietjes groen gras.',
  'spoor': 'Ridheya volgde het spoor van kleine pootjes naar de schuilplaats.',
  'sporen': 'In de modder waren duidelijke sporen van een tijger en een olifant te zien.',
  'koker': 'In de verzegelde koker zat een koninklijke oorkonde voor de dierenbeschermers.',
  'zegel': 'Het rode lakzegel droeg het wapenschild van het savannereservaat.',
  'brief': 'In de brief stond precies uitgelegd welk kruid de betovering kon breken.',
  'perkament': 'Het vergeelde perkament bevatte een Cito tekst over oorzaak en gevolg.',
  'wapen': 'Op de boeg van het schip prijkte het gouden wapen van de koning.',
  'reservaat': 'In het beschermde reservaat leven wilde dieren in harmonie met elkaar.',
  'dierenreservaat': 'Het dierenreservaat werd bewaakt door ervaren en toegewijde boswachters.',
  'schipper': 'De vriendelijke schipper zwaaide vanaf de brug naar de twee zussen.',
  'raadsel': 'Elk Cito raadsel bracht hen een stap dichter bij de ontknoping.',
  'kloof': 'Over de diepe bergkloof hing een betrouwbare touwbrug van lianen.',
  'bewaker': 'De trouwe viervoeter Kopi werd de officiële bewaker van de kliniek.',
  'wandelstaf': 'Ridheya gebruikte haar houten wandelstaf om haar evenwicht te bewaren.',
  'stapsteen': 'Zet je voet stevig op de middelste stapsteen om niet uit te glijden.',
  'brilglas': 'Door haar ronde brilglas zag Ridheya zelfs de allerkleinste details.',
  'bril': 'Ridheya schoof haar ronde bril even recht op haar neus.',
  'ogen': 'De vriendelijke ogen van olifant Raja straalden grote wijsheid uit.',
  'oog': 'Hemali hield een scherp oog op de geheimzinnige schaduwen tussen de bomen.',
  'oren': 'De grote oren van Raja wapperden zachtjes om koel te blijven in de hitte.',
  'oor': 'Het uiltje draaide zijn kopje en spitste aandachtig zijn oren.',
  'hand': 'Mei-Ling stak haar hand uit met een stukje appel voor het girafje.',
  'handen': 'Met vaardige handen bracht Ridheya een spalkje aan op het vleugeltje.',
  'voet': 'Zet geen voet buiten het veilige pad als het donker is in het woud.',
  'voeten': 'Na de lange wandeling voelden hun voeten moe maar voldaan aan.',
  'meisje': 'Het dappere meisje Ridheya liet zich door niets of niemand tegenhouden.',
  'meisjes': 'De twee meisjes combineerden hun krachten om alle dieren te helpen.',
  'jongen': 'Fietskoerier Amir was een behulpzame jongen met een passie voor dieren.',
  'zussen': 'De zussen Ridheya en Hemali steunen elkaar door dik en dun.',
  'zus': '‘Mijn zus heeft altijd het beste logische inzicht,’ zei Ridheya trots.',
  'vriend': 'Een trouwe vriend staat altijd voor je klaar in tijden van nood.',
  'dier': 'Elk dier verdient liefde, respect en goede medische verzorging.',
  'dieren': 'De jungle zat vol fascinerende dieren met unieke talenten.',
  'leeuw': 'De koninklijke leeuw brulde krachtig over de uitgestrekte savanne.',
  'leeuwenwelp': 'De kleine leeuwenwelp Simba rolde speels door het hoge gras.',
  'olifant': 'De wijze olifant Raja leidde de stoet rustig door het nachthoorwoud.',
  'giraf': 'Het babygirafje Appel keek met grote, nieuwsgierige ogen rond.',
  'zebra': 'Een kudde gestreepte zebra’s galoppeerde vrolijk langs de drinkplaats.',
  'aap': 'Het ondeugende aapje Zazu strooide bloesem over de hoofden van de meisjes.',
  'toekan': 'De kleurrijke toekan zat hoog in de boom en bekeek het tafereel.',
  'kasteel': 'In het oude stenen kasteel bevond zich de geheime bibliotheek.',
  'toren': 'Vanaf de hoge uitkijktoren kon je de hele Maleisische kustlijn overzien.',
  'poort': 'De zware houten poort van het dierenasiel zwaaide gastvrij open.',
  'muur': 'Langs de stenen muur groeiden prachtige paarse klimbloemen.',
  'schat': 'De ware schat was de hechte vriendschap tussen mens en dier.',
  'schatkist': 'In de houten schatkist lagen eeuwenoude landkaarten en toverstaven.',
  'sleutel': 'De gouden sleutel paste precies op het slot van de medicijnkast.',
  'avontuur': 'Hun reis door Maleisië werd een onvergetelijk leerzaam avontuur.',
  'verhaal': 'Elk hoofdstuk van het verhaal leerde hen nieuwe Cito signaalwoorden.',
  'pagina': 'Sla de pagina om om te ontdekken welke keuze de zussen maken.',
  'woord': 'Elk moeilijk woord in de tekst werd direct voorzien van woordenhulp.',
  'zin': 'Lees de hele zin aandachtig door om de context goed te begrijpen.',
  'vraag': 'Beantwoord de Cito vraag door naar het belangrijkste signaalwoord te zoeken.',
  'antwoord': 'Hemali gaf vol zelfvertrouwen het correcte antwoord.',
  'mist': 'De zilveren mist trok langzaam op toen de ochtendzon doorbrak.',
  'anker': 'De bemanning liet het zware anker zakken in de rustige baai.',
  'boom': 'Onder de schaduwrijke mangoboom rustten de dierenartsen even uit.',
  'bos': 'In het tropische bos zongen honderden verschillende vogelsoorten.',
  'rots': 'Bovenop de steile rots bouwde de adelaar zijn veilige nest.',
  'rivier': 'De brede rivier stroomde traag langs het dorpje in Maleisië.',
  'brug': 'Ze staken de houten brug over om bij de tuinkliniek te komen.',
  'touwbrug': 'De touwbrug wiegde zachtjes in de wind, maar was oersterk.',

  // Connectives & Prepositions
  'over': 'De ijsvogel vloog sierlijk over het glinsterende water van de rivier.',
  'naar': 'Amir fietste met spoed naar de fruitmarkt om eerste hulp te bieden.',
  'in': 'In de binnentuin vonden alle gewonde dieren rust en genezing.',
  'op': 'Ridheya legde een koud kompres op het gezwollen pootje van Kopi.',
  'bij': 'Hemali ging rustig bij het bange babygirafje zitten om haar te troosten.',
  'voor': 'Er stond een grote kom vers water klaar voor het geredde dier.',
  'achter': 'Achter de fruitkramen vonden ze het holletje van de zwerfhond.',
  'onder': 'Onder de banyanboom was een koele schaduwplek ingericht.',
  'met': 'Samen met haar vrienden bouwde Ridheya een veilige opvangplek.',
  'zonder': 'Zonder de snelle hulp van Amir was het hondje niet op tijd gered.',
  'door': 'Door het toepassen van de juiste zalf genas het wondje razendsnel.',
  'langs': 'De meisjes wandelden langs de oevers van de tropische rivier.',
  'tussen': 'Tussen de dichte boomtakken door scheen een bundel warm zonlicht.',
  'richting': 'Ze vertrokken in de richting van het mysterieuze Taman Negara woud.',
  'terwijl': 'Terwijl Ridheya het verband aanbracht, hield Mei-Ling het bakje vast.',
  'voordat': 'Zorg dat je handen goed schoon zijn voordat je een dier behandelt.',
  'nadat': 'Nadat het raadsel was opgelost, opende de geheime poort zich vanzelf.',
  'zodra': 'Zodra het safaripark opengaat, krijgen alle dieren vers voedsel.',
  'toen': 'Toen de maan vol aan de hemel stond, sprak olifant Raja zijn wijsheid uit.',
  'nu': 'Nu is het hondje weer helemaal gezond en kan het heerlijk rennen.',
  'straks': 'Straks gaan we samen op zoek naar het volgende Cito mysterie!',
  'later': 'Later op de avond schreven ze alle belevenissen in hun veldboek.',
  'vroeg': 'Vroeg in de ochtend werden ze gewekt door het gezang van de ijsvogel.',
  'laat': 'Zelfs toen het al laat werd, bleven de zussen waken bij de kliniek.',
  'hier': '‘Hier is de ideale plek om onze nieuwe dierenartspraktijk te openen.’',
  'daar': 'Kijk, daar in de verte loopt babygirafje Appel tussen de bomen!',
  'waarom': 'Hemali begreep direct waarom het signaalwoord ‘desondanks’ werd gebruikt.',
  'hoe': 'Ridheya liet aan Amir zien hoe je een professioneel spalkje aanlegt.',
  'wat': '‘Wat een fantastisch resultaat hebben we met z’n allen bereikt!’',
  'wie': 'Wie goed naar de natuur luistert, leert de mooiste geheimen kennen.',
  'samen': 'Samen staan we sterk en kunnen we elk dier in nood beschermen.',
  'alleen': 'Niemand hoeft er alleen voor te staan als er vrienden in de buurt zijn.'
};

/**
 * Intelligent Dynamic Dutch Contextual Sentence Synthesizer
 */
export function generateContextualSentence(word: string, type: DictionaryEntry['wordType'], meaning: string): string {
  const clean = word.toLowerCase().trim();
  if (CURATED_EXAMPLE_SENTENCES[clean]) {
    return CURATED_EXAMPLE_SENTENCES[clean];
  }

  // Check stem candidate match in curated sentences
  const baseForm = clean.replace(/e$/, '').replace(/en$/, '').replace(/s$/, '');
  if (CURATED_EXAMPLE_SENTENCES[baseForm]) {
    return CURATED_EXAMPLE_SENTENCES[baseForm];
  }

  // Synthesize rich narrative sentence based on Part of Speech & Theme
  if (type === 'Werkwoord') {
    return `Dierenarts Ridheya en Hemali ${clean} aandachtig om de dieren in de tuinkliniek van Maleisië te helpen.`;
  }
  if (type === 'Bijvoeglijk naamwoord') {
    return `Hemali observeerde het ${clean} detail nauwkeurig in haar detective-notitieboek tijdens de speurtocht.`;
  }
  if (type === 'Signaalwoord (Cito)' || type === 'Voegwoord') {
    return `Het oerwoud was donker; ${clean} stapte Hemali vol zelfvertrouwen op de wijze olifant Raja af.`;
  }
  if (type === 'Voorzetsel' || type === 'Bijwoord') {
    return `Ridheya wandelde ${clean} het pad van de tuinkliniek om Kopi en de ijsvogel te verzorgen.`;
  }
  if (type === 'Verwijswoord') {
    return `In de Cito leestekst verwijst "${clean}" direct naar de hoofdpersoon in het avontuur.`;
  }
  
  // Default Noun sentence
  return `Tijdens hun reddingsavontuur in Maleisië ontdekten Ridheya en Hemali een bijzondere ${clean}.`;
}

/**
 * Phonetic Dutch Syllable divider
 */
export function syllabifyDutch(word: string): string[] {
  if (!word || word.length <= 3) return [word];

  const vowels = 'aeiouyáéíóúäëïöü';
  const diphthongs = ['ee', 'oo', 'aa', 'uu', 'ei', 'ij', 'ou', 'au', 'eu', 'oe', 'ie', 'ui'];
  const lower = word.toLowerCase();
  const parts: string[] = [];
  let current = '';

  for (let i = 0; i < lower.length; i++) {
    current += word[i];
    const ch = lower[i];
    const next = lower[i + 1] || '';
    const nextNext = lower[i + 2] || '';

    const isVowel = vowels.includes(ch);
    const nextIsVowel = vowels.includes(next);
    const nextNextIsVowel = vowels.includes(nextNext);

    if (isVowel && !nextIsVowel && next && nextNextIsVowel && !diphthongs.includes(ch + next)) {
      parts.push(current);
      current = '';
    } else if (isVowel && !nextIsVowel && next && !nextNextIsVowel && nextNext) {
      if (['ch', 'sch', 'ng', 'nk'].includes(next + nextNext)) {
        // preserve clusters
      } else {
        current += word[i + 1];
        i++;
        parts.push(current);
        current = '';
      }
    }
  }

  if (current) parts.push(current);
  return parts.length > 0 ? parts : [word];
}

/**
 * Morphological stem extractor for Dutch inflections
 */
function extractStemCandidates(word: string): { candidate: string; rule: string; type: DictionaryEntry['wordType'] }[] {
  const list: { candidate: string; rule: string; type: DictionaryEntry['wordType'] }[] = [];

  // 1. Inflected Adjective in -e (e.g. smalle -> smal, grote -> groot, lieve -> lief, rulle -> rul)
  if (word.endsWith('e') && word.length > 3) {
    const base = word.slice(0, -1);
    
    // a. Doubled consonant degemination (smalle -> smal, dikke -> dik, dunne -> dun, witte -> wit, natte -> nat, rulle -> rul)
    const degem = base.replace(/([bcdfghjklmnpqrstvwxz])\1$/, '$1');
    if (degem !== base) {
      list.push({ candidate: degem, rule: 'verbogen bijvoeglijk naamwoord (klinker-verdubbeling)', type: 'Bijvoeglijk naamwoord' });
    }

    // b. Open syllable vowel lengthening (grote -> groot, gele -> geel, rode -> rood, schone -> schoon, droge -> droog, hoge -> hoog, lage -> laag, brede -> breed)
    const lengthened = base.replace(/([bcdfghjklmnpqrstvwxz])([aeiou])([bcdfghjklmnpqrstvwxz])$/, '$1$2$2$3');
    if (lengthened !== base) {
      list.push({ candidate: lengthened, rule: 'verbogen bijvoeglijk naamwoord (open lettergreep)', type: 'Bijvoeglijk naamwoord' });
    }

    // c. Voicing change (lieve -> lief, boze -> boos, wijze -> wijs, scheve -> scheef, halve -> half, actieve -> actief)
    const voicedF = base.replace(/ve$/, 'f');
    if (voicedF !== base) {
      list.push({ candidate: voicedF, rule: 'verbogen bijvoeglijk naamwoord (v -> f)', type: 'Bijvoeglijk naamwoord' });
    }
    const voicedS = base.replace(/ze$/, 's');
    if (voicedS !== base) {
      list.push({ candidate: voicedS, rule: 'verbogen bijvoeglijk naamwoord (z -> s)', type: 'Bijvoeglijk naamwoord' });
    }

    // d. Simple -e removal (kleine -> klein, donkere -> donker, mooie -> mooi, nieuwe -> nieuw, geheime -> geheim, voorzichtige -> voorzichtig, schichtige -> schichtig)
    list.push({ candidate: base, rule: 'verbogen bijvoeglijk naamwoord (-e)', type: 'Bijvoeglijk naamwoord' });
  }

  // 2. Comparative -er (smaller -> smal, groter -> groot, sneller -> snel, kouder -> koud)
  if (word.endsWith('er') && word.length > 4) {
    const base = word.slice(0, -2);
    const degem = base.replace(/([bcdfghjklmnpqrstvwxz])\1$/, '$1');
    const lengthened = base.replace(/([bcdfghjklmnpqrstvwxz])([aeiou])([bcdfghjklmnpqrstvwxz])$/, '$1$2$2$3');
    list.push({ candidate: degem, rule: 'vergrotende trap (-er: narrower/bigger)', type: 'Bijvoeglijk naamwoord' });
    list.push({ candidate: lengthened, rule: 'vergrotende trap (-er)', type: 'Bijvoeglijk naamwoord' });
    list.push({ candidate: base, rule: 'vergrotende trap (-er)', type: 'Bijvoeglijk naamwoord' });
  }

  // 3. Superlative -ste / -st (smalste -> smal, grootste -> groot, snelste -> snel)
  if (word.endsWith('ste') && word.length > 5) {
    const base = word.slice(0, -3);
    list.push({ candidate: base, rule: 'overtreffende trap (-ste: most/narrowest)', type: 'Bijvoeglijk naamwoord' });
  } else if (word.endsWith('st') && word.length > 4) {
    const base = word.slice(0, -2);
    list.push({ candidate: base, rule: 'overtreffende trap (-st)', type: 'Bijvoeglijk naamwoord' });
  }

  // 4. Plural nouns in -en, -s, -eren (duinpaden -> duinpad, schepen -> schip, bomen -> boom, bewakers -> bewaker, kisten -> kist)
  if (word.endsWith('en') && word.length > 4) {
    const base = word.slice(0, -2);
    const degem = base.replace(/([bcdfghjklmnpqrstvwxz])\1$/, '$1');
    const lengthened = base.replace(/([bcdfghjklmnpqrstvwxz])([aeiou])([bcdfghjklmnpqrstvwxz])$/, '$1$2$2$3');
    list.push({ candidate: base, rule: 'meervoud (-en)', type: 'Zelfstandig naamwoord' });
    list.push({ candidate: degem, rule: 'meervoud (-en)', type: 'Zelfstandig naamwoord' });
    list.push({ candidate: lengthened, rule: 'meervoud (-en)', type: 'Zelfstandig naamwoord' });
  } else if (word.endsWith('s') && word.length > 3) {
    list.push({ candidate: word.slice(0, -1), rule: 'meervoud (-s)', type: 'Zelfstandig naamwoord' });
  }

  // 5. Diminutives (verkleinwoorden: -je, -tje, -pje, -kje, -etje, -aatje, -ootje)
  const dimMatch = word.match(/^(.+?)(aatje|ootje|eetje|etje|pje|kje|tje|je)$/);
  if (dimMatch && dimMatch[1].length >= 2) {
    list.push({ candidate: dimMatch[1], rule: `verkleinwoord (+${dimMatch[2]})`, type: 'Zelfstandig naamwoord' });
  }

  // 6. Regular Verb Tenses (-te, -ten, -de, -den, -t, -end, -ende)
  if (word.endsWith('ten') && word.length > 5) {
    const base = word.slice(0, -3);
    list.push({ candidate: base, rule: 'verleden tijd meervoud (-ten)', type: 'Werkwoord' });
    list.push({ candidate: base + 'en', rule: 'verleden tijd meervoud (-ten)', type: 'Werkwoord' });
  } else if (word.endsWith('den') && word.length > 5) {
    const base = word.slice(0, -3);
    list.push({ candidate: base, rule: 'verleden tijd meervoud (-den)', type: 'Werkwoord' });
    list.push({ candidate: base + 'en', rule: 'verleden tijd meervoud (-den)', type: 'Werkwoord' });
  } else if (word.endsWith('te') && word.length > 4) {
    const base = word.slice(0, -2);
    list.push({ candidate: base, rule: 'verleden tijd enkelvoud (-te)', type: 'Werkwoord' });
    list.push({ candidate: base + 'en', rule: 'verleden tijd enkelvoud (-te)', type: 'Werkwoord' });
  } else if (word.endsWith('de') && word.length > 4) {
    const base = word.slice(0, -2);
    list.push({ candidate: base, rule: 'verleden tijd enkelvoud (-de)', type: 'Werkwoord' });
    list.push({ candidate: base + 'en', rule: 'verleden tijd enkelvoud (-de)', type: 'Werkwoord' });
  } else if (word.endsWith('t') && word.length > 3) {
    const base = word.slice(0, -1);
    list.push({ candidate: base, rule: 'tegenwoordige tijd (stam+t)', type: 'Werkwoord' });
    list.push({ candidate: base + 'en', rule: 'tegenwoordige tijd (stam+t)', type: 'Werkwoord' });
  }

  // 7. Past participle (ge-...-d / ge-...-t / ge-...-en)
  if (word.startsWith('ge') && word.length > 5) {
    const inner = word.slice(2);
    if (inner.endsWith('d') || inner.endsWith('t')) {
      const stem = inner.slice(0, -1);
      list.push({ candidate: stem, rule: 'voltooid deelwoord (ge-+-d/t)', type: 'Werkwoord' });
      list.push({ candidate: stem + 'en', rule: 'voltooid deelwoord (ge-+-d/t)', type: 'Werkwoord' });
    }
  }

  return list;
}

// Dynamic client cache for generated lookups
const lookupCache = new Map<string, DictionaryEntry>();

/**
 * Intelligent Dutch Dictionary & Educational Translation Resolver
 */
export function lookupDutchWord(rawWord: string): DictionaryEntry {
  if (!rawWord) {
    return {
      word: 'woord',
      wordType: 'Zelfstandig naamwoord',
      meaningNl: 'Een eenheid van taal die een betekenis heeft.',
      translationEn: 'Word',
      syllables: ['woord'],
      exampleNl: 'Elk woord in het verhaal heeft een betekenis.',
      level: 'Groep 3-4 (AVI M3-E4)'
    };
  }

  // Clean the word
  const clean = rawWord
    .toLowerCase()
    .replace(/^['"“‘«(]+/g, '')
    .replace(/[.,!?:;'"”’»)_*`~]+$/g, '')
    .trim();

  if (!clean) {
    return {
      word: rawWord,
      wordType: 'Zelfstandig naamwoord',
      meaningNl: 'Leesteken of speciaal teken.',
      translationEn: 'Punctuation mark',
      syllables: [rawWord],
      exampleNl: 'Leestekens maken een zin duidelijk om te lezen.'
    };
  }

  // 1. Check dynamic cache
  if (lookupCache.has(clean)) {
    return lookupCache.get(clean)!;
  }

  // 2. Exact match in curated database (DUTCH_DICTIONARY_DB)
  if (DUTCH_DICTIONARY_DB[clean]) {
    const entry = DUTCH_DICTIONARY_DB[clean];
    lookupCache.set(clean, entry);
    return entry;
  }

  // 3. Exact match in Verb Stem Map (liep, liepen, zag, zagen, keek, keken, etc.)
  if (VERB_STEM_MAP[clean]) {
    const v = VERB_STEM_MAP[clean];
    const baseEntry = DUTCH_DICTIONARY_DB[v.infinitive] || MASSIVE_TRANSLATION_MAP[v.infinitive];
    const baseMeaningStr = baseEntry ? ('meaningNl' in baseEntry ? baseEntry.meaningNl : baseEntry.nl) : '';
    const exampleSentence = generateContextualSentence(clean, 'Werkwoord', v.nl);
    const entry: DictionaryEntry = {
      word: clean,
      wordType: 'Werkwoord',
      meaningNl: `${v.nl} ${baseMeaningStr ? `(${baseMeaningStr})` : ''}`,
      translationEn: `${v.en} [Infinitive: to ${v.infinitive}]`,
      syllables: syllabifyDutch(clean),
      exampleNl: exampleSentence,
      level: 'Groep 3-4 (AVI M3-E4)'
    };
    lookupCache.set(clean, entry);
    return entry;
  }

  // 4. Exact match in High-Frequency Translation Map
  if (MASSIVE_TRANSLATION_MAP[clean]) {
    const m = MASSIVE_TRANSLATION_MAP[clean];
    const exampleSentence = generateContextualSentence(clean, m.type, m.nl);
    const entry: DictionaryEntry = {
      word: clean,
      wordType: m.type,
      meaningNl: m.nl,
      translationEn: m.en,
      syllables: syllabifyDutch(clean),
      exampleNl: exampleSentence,
      level: m.level || 'Groep 3-4 (AVI M3-E4)'
    };
    lookupCache.set(clean, entry);
    return entry;
  }

  // 5. Morphological De-inflection (Stem candidates for inflected adjectives, plurals, comparatives, verbs)
  const stemCandidates = extractStemCandidates(clean);
  for (const item of stemCandidates) {
    const matched = DUTCH_DICTIONARY_DB[item.candidate] || MASSIVE_TRANSLATION_MAP[item.candidate];
    if (matched) {
      const baseMeaning = 'meaningNl' in matched ? matched.meaningNl : matched.nl;
      const baseEn = 'translationEn' in matched ? matched.translationEn : matched.en;
      const baseType = 'wordType' in matched ? matched.wordType : matched.type;

      let inflectionDesc = `Vorm van "${item.candidate}" (${item.rule})`;
      if (item.type === 'Bijvoeglijk naamwoord') {
        inflectionDesc = `Verbogen bijvoeglijk naamwoord van "${item.candidate}": zegt iets over een zelfstandig naamwoord (bijv. een ${clean} pad).`;
      } else if (item.rule.includes('meervoud')) {
        inflectionDesc = `Meervoud van "${item.candidate}": meerdere ${item.candidate}en/s.`;
      } else if (item.rule.includes('verkleinwoord')) {
        inflectionDesc = `Verkleinwoord van "${item.candidate}": een klein of schattig ${item.candidate}.`;
      } else if (item.rule.includes('verleden tijd')) {
        inflectionDesc = `Verleden tijdsvorm van het werkwoord "${item.candidate}".`;
      }

      const exampleSentence = generateContextualSentence(clean, baseType || item.type, baseMeaning);

      const entry: DictionaryEntry = {
        word: clean,
        wordType: baseType || item.type,
        meaningNl: `${inflectionDesc} Betekenis: ${baseMeaning}`,
        translationEn: `${baseEn} (${item.rule})`,
        syllables: syllabifyDutch(clean),
        exampleNl: exampleSentence,
        level: matched.level || 'Groep 3-4 (AVI M3-E4)'
      };

      lookupCache.set(clean, entry);
      return entry;
    }
  }

  // 6. Full Dynamic Compound Word Decomposition Engine (Samenstellingen)
  // Check known compound prefixes & suffixes
  for (const prefixKey in COMPOUND_PREFIXES) {
    if (clean.startsWith(prefixKey) && clean.length > prefixKey.length + 2) {
      let remainder = clean.slice(prefixKey.length);
      if (remainder.startsWith('s') && remainder.length > 3) remainder = remainder.slice(1);
      else if (remainder.startsWith('en') && remainder.length > 4) remainder = remainder.slice(2);

      const prefixInfo = COMPOUND_PREFIXES[prefixKey];
      const suffixInfo = COMPOUND_SUFFIXES[remainder] || 
        (DUTCH_DICTIONARY_DB[remainder] ? { meaning: DUTCH_DICTIONARY_DB[remainder].meaningNl, en: DUTCH_DICTIONARY_DB[remainder].translationEn, type: DUTCH_DICTIONARY_DB[remainder].wordType } : null) ||
        (MASSIVE_TRANSLATION_MAP[remainder] ? { meaning: MASSIVE_TRANSLATION_MAP[remainder].nl, en: MASSIVE_TRANSLATION_MAP[remainder].en, type: MASSIVE_TRANSLATION_MAP[remainder].type } : null);

      if (suffixInfo) {
        const exampleSentence = generateContextualSentence(clean, suffixInfo.type || 'Zelfstandig naamwoord', `${prefixInfo.meaning} + ${suffixInfo.meaning}`);
        const entry: DictionaryEntry = {
          word: clean,
          wordType: suffixInfo.type || 'Zelfstandig naamwoord',
          meaningNl: `Samenstelling van "${prefixKey}" (${prefixInfo.meaning}) + "${remainder}" (${suffixInfo.meaning}).`,
          translationEn: `${prefixInfo.en} ${suffixInfo.en}`,
          compound: `${prefixKey} + ${remainder}`,
          syllables: [...syllabifyDutch(prefixKey), ...syllabifyDutch(remainder)],
          exampleNl: exampleSentence,
          level: 'Groep 5-6 (AVI M5-E6)'
        };
        lookupCache.set(clean, entry);
        return entry;
      }
    }
  }

  // Check arbitrary two-word compound split from dictionary databases
  for (let i = 3; i <= clean.length - 3; i++) {
    const partA = clean.slice(0, i);
    let partB = clean.slice(i);
    if (partB.startsWith('s') && partB.length > 3) partB = partB.slice(1);

    const infoA = DUTCH_DICTIONARY_DB[partA] || MASSIVE_TRANSLATION_MAP[partA];
    const infoB = DUTCH_DICTIONARY_DB[partB] || MASSIVE_TRANSLATION_MAP[partB];

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
        exampleNl: generateContextualSentence(clean, typeB || 'Zelfstandig naamwoord', `${meaningA} + ${meaningB}`),
        level: 'Groep 5-6 (AVI M5-E6)'
      };
      lookupCache.set(clean, entry);
      return entry;
    }
  }

  // 7. Morphological Suffix & Part-of-Speech Analyzer
  let derivedType: DictionaryEntry['wordType'] = 'Zelfstandig naamwoord';
  let derivedMeaning = `Nederlands woord (${clean}) met klankgroepen: ${syllabifyDutch(clean).join(' • ')}.`;
  let derivedEn = `Dutch word: ${clean}`;

  if (clean.endsWith('heid') || clean.endsWith('ing') || clean.endsWith('schap')) {
    derivedType = 'Zelfstandig naamwoord';
    derivedMeaning = `Een zelfstandig naamwoord gevormd met het achtervoegsel -${clean.slice(-4)}, dat een eigenschap, toestand of handeling aanduidt.`;
    derivedEn = `${clean.slice(0, -4)} (state / condition / activity)`;
  } else if (clean.endsWith('ig') || clean.endsWith('lijk') || clean.endsWith('baar') || clean.endsWith('loos')) {
    derivedType = 'Bijvoeglijk naamwoord';
    derivedMeaning = `Een bijvoeglijk naamwoord dat een eigenschap of toestand beschrijft.`;
    derivedEn = `Adjective describing quality of ${clean.slice(0, -4)}`;
  } else if (clean.endsWith('en') && clean.length > 4) {
    derivedType = 'Werkwoord';
    derivedMeaning = `Een werkwoord (hele werkwoord / infinitief) dat een handeling of toestand aangeeft.`;
    derivedEn = `To ${clean.slice(0, -2)} (action verb)`;
  }

  const generatedEntry: DictionaryEntry = {
    word: clean,
    wordType: derivedType,
    meaningNl: derivedMeaning,
    translationEn: derivedEn,
    syllables: syllabifyDutch(clean),
    exampleNl: generateContextualSentence(clean, derivedType, derivedMeaning),
    level: clean.length > 8 ? 'Groep 5-6 (AVI M5-E6)' : 'Groep 3-4 (AVI M3-E4)'
  };

  lookupCache.set(clean, generatedEntry);
  return generatedEntry;
}

/**
 * Searches the dictionary for matching words (for instant search bar)
 */
export function searchDictionaryWords(query: string, limit = 20): DictionaryEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) {
    return Object.values(DUTCH_DICTIONARY_DB).slice(0, limit);
  }

  const results: DictionaryEntry[] = [];
  
  // Search in DUTCH_DICTIONARY_DB
  for (const key in DUTCH_DICTIONARY_DB) {
    const entry = DUTCH_DICTIONARY_DB[key];
    if (key.includes(q) || entry.meaningNl.toLowerCase().includes(q) || entry.translationEn.toLowerCase().includes(q)) {
      results.push(entry);
      if (results.length >= limit) break;
    }
  }

  // Search in MASSIVE_TRANSLATION_MAP if needed
  if (results.length < limit) {
    for (const key in MASSIVE_TRANSLATION_MAP) {
      if (results.some(r => r.word.toLowerCase() === key)) continue;
      const m = MASSIVE_TRANSLATION_MAP[key];
      if (key.includes(q) || m.nl.toLowerCase().includes(q) || m.en.toLowerCase().includes(q)) {
        results.push({
          word: key,
          wordType: m.type,
          meaningNl: m.nl,
          translationEn: m.en,
          syllables: syllabifyDutch(key),
          exampleNl: generateContextualSentence(key, m.type, m.nl),
          level: m.level || 'Groep 3-4 (AVI M3-E4)'
        });
        if (results.length >= limit) break;
      }
    }
  }

  // Synthesize query if not in results
  if (!results.some(r => r.word.toLowerCase() === q) && q.length >= 2) {
    results.unshift(lookupDutchWord(q));
  }

  return results.slice(0, limit);
}
