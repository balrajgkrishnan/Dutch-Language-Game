// Comprehensive Curated Dutch Educational Dictionary for Kids (Groep 3-8 & Cito Prep)
// Includes Cito signal words, high-frequency verbs, compound stems, adjectives, and adventure vocabulary.

export interface DictionaryEntry {
  word: string; // The canonical / base word
  wordType: 'Zelfstandig naamwoord' | 'Werkwoord' | 'Bijvoeglijk naamwoord' | 'Signaalwoord (Cito)' | 'Verwijswoord' | 'Voegwoord' | 'Bijwoord' | 'Voorzetsel' | 'Telwoord' | 'Tussenwerpsel';
  meaningNl: string;
  translationEn: string;
  compound?: string; // e.g. "onderzoek + schip"
  syllables: string[]; // e.g. ["on", "der", "zoek", "schip"]
  exampleNl: string;
  citoCategory?: 'Signaalwoord Tegenstelling' | 'Signaalwoord Oorzaak/Gevolg' | 'Signaalwoord Tijd/Volgorde' | 'Signaalwoord Samenvatting' | 'Verwijswoord' | 'Moeilijk Cito Woord' | 'Basisschool Kernwoord';
  level?: 'Groep 3-4 (AVI M3-E4)' | 'Groep 5-6 (AVI M5-E6)' | 'Groep 7-8 (Doorstroomtoets)';
}

export const DUTCH_DICTIONARY_DB: Record<string, DictionaryEntry> = {
  // === ADJECTIVES (BIJVOEGLIJKE NAAMWOORDEN) & INFLECTIONS ===
  'smal': {
    word: 'smal',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Met een kleine breedte; het tegenovergestelde van breed.',
    translationEn: 'Narrow, slender, tight',
    syllables: ['smal'],
    exampleNl: 'Het smalle bergpad leidde rechtstreeks naar de waterval.',
    citoCategory: 'Basisschool Kernwoord',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'breed': {
    word: 'breed',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Met een grote afstand van de ene zijkant naar de andere kant; niet smal.',
    translationEn: 'Broad, wide',
    syllables: ['breed'],
    exampleNl: 'De rivier was te breed om zomaar overheen te springen.',
    citoCategory: 'Basisschool Kernwoord',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'groot': {
    word: 'groot',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Met forse afmetingen in hoogte, lengte of omvang; niet klein.',
    translationEn: 'Big, large, great',
    syllables: ['groot'],
    exampleNl: 'De grote Afrikaanse olifant spoot water over zijn rug.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'klein': {
    word: 'klein',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Met geringe afmetingen; niet groot.',
    translationEn: 'Small, little, tiny',
    syllables: ['klein'],
    exampleNl: 'Het kleine muisje verstopte zich in het struikgewas.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'lang': {
    word: 'lang',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Met veel lengte van begin tot eind, of gedurende veel tijd.',
    translationEn: 'Long, tall',
    syllables: ['lang'],
    exampleNl: 'De giraf heeft een hele lange nek om bij de hoogste blaadjes te kunnen.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'kort': {
    word: 'kort',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Met weinig lengte of van korte duur.',
    translationEn: 'Short, brief',
    syllables: ['kort'],
    exampleNl: 'Na een korte pauze wandelden de meisjes weer verder.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'dik': {
    word: 'dik',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Met een grote doorsnede of omvang; niet dun.',
    translationEn: 'Thick, fat',
    syllables: ['dik'],
    exampleNl: 'Hemali las een dik toverboek vol spreuken.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'dun': {
    word: 'dun',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Met weinig dikte of fijn van stof; niet dik.',
    translationEn: 'Thin, slender, fine',
    syllables: ['dun'],
    exampleNl: 'Het dunne laagje ijs kraakte zachtjes.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'diep': {
    word: 'diep',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Ver naar beneden reikend vanaf de oppervlakte; niet ondiep.',
    translationEn: 'Deep, profound',
    syllables: ['diep'],
    exampleNl: 'In de diepe grot zagen ze glinsterende kristallen.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'hoog': {
    word: 'hoog',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Ver boven de grond reikend; niet laag.',
    translationEn: 'High, tall',
    syllables: ['hoog'],
    exampleNl: 'Bovenop de hoge toren had Ridheya een prachtig uitzicht.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'laag': {
    word: 'laag',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Dicht bij de grond; niet hoog.',
    translationEn: 'Low',
    syllables: ['laag'],
    exampleNl: 'De vogel vloog laag over het water van het meer.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'warm': {
    word: 'warm',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Met een aangenaam hoge temperatuur; niet koud.',
    translationEn: 'Warm, hot',
    syllables: ['warm'],
    exampleNl: 'De warme zonnestralen verwarmden de savanne.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'koud': {
    word: 'koud',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Met een lage temperatuur; niet warm.',
    translationEn: 'Cold, chilly',
    syllables: ['koud'],
    exampleNl: 'Op de Noordpool is het ijskoud.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'nat': {
    word: 'nat',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Bedekt of doordrenkt met water of een andere vloeistof; niet droog.',
    translationEn: 'Wet, damp',
    syllables: ['nat'],
    exampleNl: 'Door de plensbui waren hun schoenen kletsnat geworden.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'droog': {
    word: 'droog',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Vrij van vocht of regen; niet nat.',
    translationEn: 'Dry',
    syllables: ['droog'],
    exampleNl: 'In de woestijn is het zand kurkdroog.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'stil': {
    word: 'stil',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Zonder geluid of beweging; rustig.',
    translationEn: 'Quiet, silent, calm',
    syllables: ['stil'],
    exampleNl: 'Wees heel stil, dan schrikt het hertje niet!',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'druk': {
    word: 'druk',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Vol beweging, mensen of geluid; niet rustig.',
    translationEn: 'Busy, crowded',
    syllables: ['druk'],
    exampleNl: 'Op de apenrots was het een drukke boel.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'licht': {
    word: 'licht',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Niet zwaar van gewicht, of helder en goed verlicht.',
    translationEn: 'Light, bright / lightweight',
    syllables: ['licht'],
    exampleNl: 'Haar rugzak was lekker licht om te dragen.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'donker': {
    word: 'donker',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Zonder licht; met diepe, donkere tinten.',
    translationEn: 'Dark, dim',
    syllables: ['don', 'ker'],
    exampleNl: 'In het donkere bos scheen alleen de volle maan.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'rul': {
    word: 'rul',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Los en kruimelig van structuur (zoals droog duinzand).',
    translationEn: 'Loose, crumbly (of dry sand)',
    syllables: ['rul'],
    exampleNl: 'Het lopen door het rulle zand was behoorlijk vermoeiend.',
    citoCategory: 'Moeilijk Cito Woord',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'schichtig': {
    word: 'schichtig',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Schrikachtig, snel opgeschrikt en wantrouwend rondkijkend.',
    translationEn: 'Skittish, jumpy, furtive',
    syllables: ['schich', 'tig'],
    exampleNl: 'De schipper keek schichtig over zijn schouder.',
    citoCategory: 'Moeilijk Cito Woord',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'geheimzinnig': {
    word: 'geheimzinnig',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Vol geheimen en mysteries; spannend en onbekend.',
    translationEn: 'Mysterious, secretive',
    syllables: ['ge', 'heim', 'zin', 'nig'],
    exampleNl: 'De oude kaart toonde een geheimzinnige schatkamer in de ruïne.',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'achterdochtig': {
    word: 'achterdochtig',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Wantrouwig; als je iemand of iets niet zomaar meteen vertrouwt.',
    translationEn: 'Suspicious, distrustful, wary',
    syllables: ['ach', 'ter', 'doch', 'tig'],
    exampleNl: 'Hemali bekeek de vreemde brief achterdochtig.',
    citoCategory: 'Moeilijk Cito Woord',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'voorzichtig': {
    word: 'voorzichtig',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Met grote aandacht en zorgvuldigheid om gevaar of fouten te voorkomen.',
    translationEn: 'Careful, cautious, gentle',
    compound: 'voor + zichtig',
    syllables: ['voor', 'zich', 'tig'],
    exampleNl: 'Ridheya stapte voorzichtig over de gladde keien.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'moedig': {
    word: 'moedig',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Dapper; durven handelen ook als het spannend is.',
    translationEn: 'Brave, courageous, bold',
    syllables: ['moe', 'dig'],
    exampleNl: 'De moedige speurneus liep voorop het avontuur tegemoet.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'dapper': {
    word: 'dapper',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Niet bang zijn; vol moed.',
    translationEn: 'Brave, valiant',
    syllables: ['dap', 'per'],
    exampleNl: 'Ridheya was heel dapper toen ze het gewonde uiltje hielp.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'nieuwsgierig': {
    word: 'nieuwsgierig',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Graag nieuwe dingen willen weten en ontdekken.',
    translationEn: 'Curious, inquisitive',
    syllables: ['nieuws', 'gie', 'rig'],
    exampleNl: 'Het nieuwsgierige stokstaartje stak zijn kopje omhoog.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'slim': {
    word: 'slim',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Snel van begrip; met een goed verstand.',
    translationEn: 'Smart, clever, bright',
    syllables: ['slim'],
    exampleNl: 'Hemali vond een heel slimme manier om het cijferslot te kraken.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'wijs': {
    word: 'wijs',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Met veel kennis en levenservaring om goede keuzes te maken.',
    translationEn: 'Wise, sagacious',
    syllables: ['wijs'],
    exampleNl: 'Professor Ollie gaf de meisjes wijs advies.',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'prachtig': {
    word: 'prachtig',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Heel erg mooi; schitterend om te zien.',
    translationEn: 'Gorgeous, splendid, beautiful',
    syllables: ['prach', 'tig'],
    exampleNl: 'De vlinder had prachtige kleuren op zijn vleugels.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'mooi': {
    word: 'mooi',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Aangenaam om naar te kijken; fraai.',
    translationEn: 'Beautiful, pretty, nice',
    syllables: ['mooi'],
    exampleNl: 'Het was een mooie zonnige dag in het Safaripark.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'zuiver': {
    word: 'zuiver',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Schoon, puur, zonder vuil of toevoegingen.',
    translationEn: 'Pure, clean, clear',
    syllables: ['zui', 'ver'],
    exampleNl: 'Het zuivere bronwater smaakte heerlijk fris.',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'veilig': {
    word: 'veilig',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Zonder gevaar; beschermd tegen ongelukken.',
    translationEn: 'Safe, secure',
    syllables: ['vei', 'lig'],
    exampleNl: 'In het dierenhospitaal waren de dieren helemaal veilig.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'gevaarlijk': {
    word: 'gevaarlijk',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Niet veilig; met risico op schade of pijn.',
    translationEn: 'Dangerous, hazardous, perilous',
    syllables: ['ge', 'vaar', 'lijk'],
    exampleNl: 'De steile rotswand was veel te gevaarlijk om te beklimmen.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'feilloos': {
    word: 'feilloos',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Zonder ook maar één enkele fout te maken; perfect.',
    translationEn: 'Flawless, faultless, without error',
    compound: 'feil + loos',
    syllables: ['feil', 'loos'],
    exampleNl: 'Hemali loste het Cito-raadsel feilloos op.',
    citoCategory: 'Moeilijk Cito Woord',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'vastgeroest': {
    word: 'vastgeroest',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Helemaal vast komen te zitten door roest op het metaal.',
    translationEn: 'Rusted tight, seized up',
    compound: 'vast + geroest',
    syllables: ['vast', 'ge', 'roest'],
    exampleNl: 'Het oude hangslot van de schatkist zat helemaal vastgeroest.',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'vernuftig': {
    word: 'vernuftig',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Heel slim, knap en vindingrijk in elkaar gezet.',
    translationEn: 'Ingenious, clever, nifty',
    syllables: ['ver', 'nuf', 'tig'],
    exampleNl: 'Het kompas had een vernuftig tandwielmechanisme.',
    citoCategory: 'Moeilijk Cito Woord',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'kletsnat': {
    word: 'kletsnat',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Helemaal doorweekt met water.',
    translationEn: 'Soaking wet, drenched',
    compound: 'klets + nat',
    syllables: ['klets', 'nat'],
    exampleNl: 'Door de storm was haar jas kletsnat geworden.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },

  // === CITO SIGNAALWOORDEN & LOGISCHE VERBANDEN (Crucial for Hemali) ===
  'desondanks': {
    word: 'desondanks',
    wordType: 'Signaalwoord (Cito)',
    meaningNl: 'Toch, ondanks dat; geeft een tegenstelling aan tussen twee zinnen.',
    translationEn: 'Despite that, nonetheless, nevertheless',
    syllables: ['des', 'on', 'danks'],
    exampleNl: 'Het regende heel hard, desondanks gingen Ridheya en Hemali toch op ontdekkingstocht.',
    citoCategory: 'Signaalwoord Tegenstelling',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'daardoor': {
    word: 'daardoor',
    wordType: 'Signaalwoord (Cito)',
    meaningNl: 'Door die oorzaak; geeft het gevolg van iets aan.',
    translationEn: 'Because of that, thereby, as a result',
    compound: 'daar + door',
    syllables: ['daar', 'door'],
    exampleNl: 'Het hek stond per ongeluk open, daardoor kon het zebraatje naar buiten huppelen.',
    citoCategory: 'Signaalwoord Oorzaak/Gevolg',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'desalniettemin': {
    word: 'desalniettemin',
    wordType: 'Signaalwoord (Cito)',
    meaningNl: 'Toch, ondanks alles (formeel signaalwoord voor tegenstelling).',
    translationEn: 'Nevertheless, nonetheless',
    syllables: ['des', 'al', 'niet', 'te', 'min'],
    exampleNl: 'De tocht door het oerwoud was erg zwaar, desalniettemin gaf de ontdekkingsreiziger niet op.',
    citoCategory: 'Signaalwoord Tegenstelling',
    level: 'Groep 7-8 (Doorstroomtoets)'
  },
  'immers': {
    word: 'immers',
    wordType: 'Signaalwoord (Cito)',
    meaningNl: 'Want, immers; geeft een reden of uitleg die algemeen bekend is.',
    translationEn: 'After all, indeed, because',
    syllables: ['im', 'mers'],
    exampleNl: 'Hemali pakte haar jas, het was immers erg koud op het onderzoeksschip.',
    citoCategory: 'Signaalwoord Oorzaak/Gevolg',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'echter': {
    word: 'echter',
    wordType: 'Signaalwoord (Cito)',
    meaningNl: 'Maar, toch; geeft een tegenstelling aan.',
    translationEn: 'However, yet',
    syllables: ['ech', 'ter'],
    exampleNl: 'Ridheya zocht naar het spoor, ze vond echter nog geen pootafdrukken.',
    citoCategory: 'Signaalwoord Tegenstelling',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'tevens': {
    word: 'tevens',
    wordType: 'Signaalwoord (Cito)',
    meaningNl: 'Ook, tegelijkertijd, bovendien.',
    translationEn: 'Also, at the same time, furthermore',
    syllables: ['te', 'vens'],
    exampleNl: 'Professor Ollie is een wijze vogel en tevens onze safari-gids.',
    citoCategory: 'Basisschool Kernwoord',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'tenzij': {
    word: 'tenzij',
    wordType: 'Voegwoord',
    meaningNl: 'Behalve als; geeft een voorwaarde of uitzondering aan.',
    translationEn: 'Unless, except if',
    syllables: ['ten', 'zij'],
    exampleNl: 'We gaan straks picknicken bij de giraffen, tenzij het keihard gaat onweren.',
    citoCategory: 'Signaalwoord Tegenstelling',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'mits': {
    word: 'mits',
    wordType: 'Voegwoord',
    meaningNl: 'Op voorwaarde dat; alleen als.',
    translationEn: 'Provided that, on condition that',
    syllables: ['mits'],
    exampleNl: 'Je mag het babyaapje vasthouden, mits je heel rustig en voorzichtig blijft.',
    citoCategory: 'Basisschool Kernwoord',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'bovendien': {
    word: 'bovendien',
    wordType: 'Signaalwoord (Cito)',
    meaningNl: 'Daarbij komt nog, ook nog; geeft een opsomming of extra argument aan.',
    translationEn: 'Moreover, furthermore, besides',
    compound: 'boven + dien',
    syllables: ['bo', 'ven', 'dien'],
    exampleNl: 'De leeuw had veel honger en was bovendien een beetje moe van de jacht.',
    citoCategory: 'Basisschool Kernwoord',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'doordat': {
    word: 'doordat',
    wordType: 'Signaalwoord (Cito)',
    meaningNl: 'Door de oorzaak dat (buiten iemands eigen wil om).',
    translationEn: 'Because, owing to the fact that',
    compound: 'door + dat',
    syllables: ['door', 'dat'],
    exampleNl: 'Doordat het mistig was boven zee, konden de zeelieden het eiland amper zien.',
    citoCategory: 'Signaalwoord Oorzaak/Gevolg',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'omdat': {
    word: 'omdat',
    wordType: 'Voegwoord',
    meaningNl: 'Geeft de reden of het motief aan waarom iemand iets doet.',
    translationEn: 'Because, since',
    compound: 'om + dat',
    syllables: ['om', 'dat'],
    exampleNl: 'Ridheya zette haar bril op omdat ze de kleine pootafdrukken beter wilde zien.',
    citoCategory: 'Signaalwoord Oorzaak/Gevolg',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'want': {
    word: 'want',
    wordType: 'Voegwoord',
    meaningNl: 'Voegwoord dat een reden of verklaring geeft.',
    translationEn: 'Because, for',
    syllables: ['want'],
    exampleNl: 'We moeten snel zijn, want de zon gaat bijna onder.',
    citoCategory: 'Signaalwoord Oorzaak/Gevolg',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'zodat': {
    word: 'zodat',
    wordType: 'Voegwoord',
    meaningNl: 'Met het doel of gevolg dat.',
    translationEn: 'So that, in order that',
    compound: 'zo + dat',
    syllables: ['zo', 'dat'],
    exampleNl: 'Hemali stak de fakkel aan zodat ze de geheime gang konden zien.',
    citoCategory: 'Signaalwoord Oorzaak/Gevolg',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'onmiddellijk': {
    word: 'onmiddellijk',
    wordType: 'Bijwoord',
    meaningNl: 'Zonder te wachten; direct, meteen.',
    translationEn: 'Immediately, right away, instantly',
    syllables: ['on', 'mid', 'del', 'lijk'],
    exampleNl: 'De dierenarts kwam onmiddellijk aangerend om het veulentje te helpen.',
    citoCategory: 'Basisschool Kernwoord',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'plotseling': {
    word: 'plotseling',
    wordType: 'Bijwoord',
    meaningNl: 'Heel snel en zonder dat je het had verwacht; ineens.',
    translationEn: 'Suddenly, all at once',
    syllables: ['plot', 'se', 'ling'],
    exampleNl: 'Plotseling hoorden ze een vreemd ritselend geluid in het hoge gras.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },

  // === NOUNS (ZELFSTANDIGE NAAMWOORDEN) & STORY VOCABULARY ===
  'pad': {
    word: 'pad',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een smalle weg om over te wandelen of fietsen.',
    translationEn: 'Path, trail, track',
    syllables: ['pad'],
    exampleNl: 'Het kronkelige pad leidde hen dieper het safaripark in.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'duinpad': {
    word: 'duinpad',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een wandelpad dat door de zandduinen loopt.',
    translationEn: 'Dune path, coastal sandy trail',
    compound: 'duin + pad',
    syllables: ['duin', 'pad'],
    exampleNl: 'Over het duinpad liepen de zussen richting het strand.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'duin': {
    word: 'duin',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een heuvel van zand die door de wind bij de zee is gevormd.',
    translationEn: 'Dune, sand dune',
    syllables: ['duin'],
    exampleNl: 'Bovenop het hoge duin keek Ridheya uit over de golven.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'baai': {
    word: 'baai',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een inham in het land waar het zeewater rustig binnenstroomt.',
    translationEn: 'Bay, cove, gulf',
    syllables: ['baai'],
    exampleNl: 'In de beschutte baai lagen verschillende boten voor anker.',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'kust': {
    word: 'kust',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'De strook land die grenst aan de zee of oceaan.',
    translationEn: 'Coast, shoreline, seaside',
    syllables: ['kust'],
    exampleNl: 'Langs de rotsachtige kust vlogen talloze meeuwen.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'zee': {
    word: 'zee',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een heel grote massa zout water.',
    translationEn: 'Sea, ocean',
    syllables: ['zee'],
    exampleNl: 'De dolfijnen sprongen vrolijk uit de blauwe zee omhoog.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'strand': {
    word: 'strand',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'De zanderige strook land direct aan het water.',
    translationEn: 'Beach, shore',
    syllables: ['strand'],
    exampleNl: 'Op het strand vonden ze prachtige schelpen.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'zand': {
    word: 'zand',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Fijne korreltjes aarde of steen op het strand en in de woestijn.',
    translationEn: 'Sand',
    syllables: ['zand'],
    exampleNl: 'Haar schoenen zaten vol met fijn zand.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'onderzoeksschip': {
    word: 'onderzoeksschip',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een groot schip speciaal gebouwd voor wetenschappelijk onderzoek op zee.',
    translationEn: 'Research vessel / exploration ship',
    compound: 'onderzoek + schip',
    syllables: ['on', 'der', 'zoek', 'schip'],
    exampleNl: 'Het onderzoeksschip lag voor anker in de baai met biologen aan boord.',
    citoCategory: 'Basisschool Kernwoord',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'vergrootglas': {
    word: 'vergrootglas',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een bolle glazen lens om heel kleine dingen veel groter te kunnen zien.',
    translationEn: 'Magnifying glass',
    compound: 'vergroot + glas',
    syllables: ['ver', 'groot', 'glas'],
    exampleNl: 'Met haar vergrootglas bestudeerde Ridheya de pootafdrukken van de vos.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'aantekeningenboek': {
    word: 'aantekeningenboek',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een schrift of boekje waarin je belangrijke informatie en ontdekkingen opschrijft.',
    translationEn: 'Notebook, journal, logbook',
    compound: 'aantekening + boek',
    syllables: ['aan', 'te', 'ke', 'nin', 'gen', 'boek'],
    exampleNl: 'Hemali tekende een schets van het geheimzinnige runenschrift in haar boekje.',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'kompas': {
    word: 'kompas',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een instrument met een magnetische naald die altijd naar het noorden wijst.',
    translationEn: 'Compass',
    syllables: ['kom', 'pas'],
    exampleNl: 'Dankzij het kompas wisten de zussen precies welke richting ze op moesten lopen.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'rotslawine': {
    word: 'rotslawine',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een grote hoeveelheid rotsen en stenen die plotseling van een berg naar beneden stort.',
    translationEn: 'Rockslide, rock avalanche',
    compound: 'rots + lawine',
    syllables: ['rots', 'la', 'wi', 'ne'],
    exampleNl: 'De rotslawine had de doorgang naar de vallei volledig geblokkeerd.',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'reservaat': {
    word: 'reservaat',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een beschermd natuurgebied waar dieren en planten veilig in vrijheid kunnen leven.',
    translationEn: 'Nature reserve, wildlife sanctuary',
    syllables: ['re', 'ser', 'vaat'],
    exampleNl: 'In het safari-reservaat worden bedreigde dieren met liefde verzorgd.',
    citoCategory: 'Basisschool Kernwoord',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'schipper': {
    word: 'schipper',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'De kapitein of bestuurder van een schip of boot.',
    translationEn: 'Skipper, captain, boat master',
    syllables: ['schip', 'per'],
    exampleNl: 'De ervaren schipper stuurde de boot veilig door de woeste golven.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'brief': {
    word: 'brief',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een geschreven boodschap op papier, gericht aan iemand.',
    translationEn: 'Letter, note, message',
    syllables: ['brief'],
    exampleNl: 'In de loden koker zat een mysterieuze perkamenten brief.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'koker': {
    word: 'koker',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een langwerpig, buisvormig voorwerp om papieren of spullen in te bewaren.',
    translationEn: 'Cylinder, tube, case',
    syllables: ['ko', 'ker'],
    exampleNl: 'Ridheya draaide de metalen dop van de koker los.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'zegel': {
    word: 'zegel',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een afdruk in rode lak of was om een brief officieel dicht te maken.',
    translationEn: 'Seal, wax seal',
    syllables: ['ze', 'gel'],
    exampleNl: 'Op het rode wassen zegel stond het wapen van de koning.',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'anker': {
    word: 'anker',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een zwaar ijzeren haak die op de zeebodem wordt geworpen om een schip stil te leggen.',
    translationEn: 'Anchor',
    syllables: ['an', 'ker'],
    exampleNl: 'Het grote schip lag voor anker midden in de baai.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'mist': {
    word: 'mist',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een dichte wolk van minuscule waterdruppeltjes laag bij de grond.',
    translationEn: 'Fog, mist, haze',
    syllables: ['mist'],
    exampleNl: 'Door de dichte mist kon je nog geen tien meter vooruitkijken.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'waterbron': {
    word: 'waterbron',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een natuurlijke plek waar fris water uit de grond naar boven stroomt.',
    translationEn: 'Water spring, well, waterhole',
    compound: 'water + bron',
    syllables: ['wa', 'ter', 'bron'],
    exampleNl: 'Alle safaridieren kwamen \'s ochtends drinken bij de heldere waterbron.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'kloof': {
    word: 'kloof',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een diepe, smalle scheur of vallei tussen hoge steile rotsen.',
    translationEn: 'Gorge, canyon, ravine, chasm',
    syllables: ['kloof'],
    exampleNl: 'Over de diepe kloof hing een stevige houten touwbrug.',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'bewaker': {
    word: 'bewaker',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Iemand die de wacht houdt en zorgt dat een plek veilig blijft.',
    translationEn: 'Guard, watchman, warden',
    syllables: ['be', 'wa', 'ker'],
    exampleNl: 'De bewaker van het kasteel controleerde de grote poort.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'stapsteen': {
    word: 'stapsteen',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een platte steen in het water waar je op kunt stappen om naar de overkant te lopen.',
    translationEn: 'Stepping stone',
    compound: 'stap + steen',
    syllables: ['stap', 'steen'],
    exampleNl: 'Ridheya sprong behendig van de ene stapsteen naar de andere.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'wandelstaf': {
    word: 'wandelstaf',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een houten stok die wandelaars gebruiken voor extra steun en evenwicht.',
    translationEn: 'Walking stick, hiking staff',
    compound: 'wandel + staf',
    syllables: ['wan', 'del', 'staf'],
    exampleNl: 'Met haar stevige wandelstaf prikte Ridheya in het zand.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'brilglas': {
    word: 'brilglas',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Het ronde geslepen glas in een bril waardoor je scherp kunt zien.',
    translationEn: 'Eyeglass lens, spectacle glass',
    compound: 'bril + glas',
    syllables: ['bril', 'glas'],
    exampleNl: 'Achter haar ronde brilglazen keken haar bruine ogen nieuwsgierig rond.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'leeuw': {
    word: 'leeuw',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een groot roofdier uit de kattenfamilie met manen (de koning der dieren).',
    translationEn: 'Lion',
    syllables: ['leeuw'],
    exampleNl: 'De leeuw lag te zonnen op een grote warme rots.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'leeuwenwelp': {
    word: 'leeuwenwelp',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een pasgeboren of heel jong leeuwtje.',
    translationEn: 'Lion cub',
    compound: 'leeuw + welp',
    syllables: ['leeu', 'wen', 'welp'],
    exampleNl: 'Het kleine leeuwenwelpje speelde met een twijgje.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'uil': {
    word: 'uil',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een nachtvogel met grote ronde ogen die zijn kop ver kan draaien.',
    translationEn: 'Owl',
    syllables: ['uil'],
    exampleNl: 'Professor Ollie de wijze uil knipoogde naar de meisjes.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },

  // === MALAYSIA VET & ANIMAL RESCUE VOCABULARY (RIDHEYA) ===
  'dierenarts': {
    word: 'dierenarts',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een dokter die gespecialiseerd is in het genezen en verzorgen van zieke of gewonde dieren.',
    translationEn: 'Veterinarian / animal doctor',
    compound: 'dieren + arts',
    syllables: ['die', 'ren', 'arts'],
    exampleNl: 'Ridheya droomt ervan om de allerbeste dierenarts ter wereld te worden.',
    citoCategory: 'Basisschool Kernwoord',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'dierenartstas': {
    word: 'dierenartstas',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een speciale tas met doktersspullen zoals verband, zalf en een stethoscoop om dieren te helpen.',
    translationEn: 'Vet medical bag',
    compound: 'dierenarts + tas',
    syllables: ['die', 'ren', 'arts', 'tas'],
    exampleNl: 'Ridheya ritste haar dierenartstas open om Kopi de hond te behandelen.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'zwerfhond': {
    word: 'zwerfhond',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een hond die geen baasje of vast huis heeft en op straat rondloopt.',
    translationEn: 'Stray dog / street dog',
    compound: 'zwerf + hond',
    syllables: ['zwerf', 'hond'],
    exampleNl: 'De gewonde zwerfhond keek met dankbare ogen naar Ridheya.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'stethoscoop': {
    word: 'stethoscoop',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een medisch instrument waarmee een arts of dierenarts naar het hart en de longen kan luisteren.',
    translationEn: 'Stethoscope',
    syllables: ['ste', 'tho', 'scoop'],
    exampleNl: 'Met de stethoscoop luisterde Ridheya aandachtig naar de hartslag van de kleine vogel.',
    citoCategory: 'Moeilijk Cito Woord',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'verbandgaas': {
    word: 'verbandgaas',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Schoon, zacht wit doek om wonden mee te verbinden en te beschermen.',
    translationEn: 'Bandage gauze / medical dressing',
    compound: 'verband + gaas',
    syllables: ['ver', 'band', 'gaas'],
    exampleNl: 'Ridheya wikkelde het zachte verbandgaas voorzichtig om het gewonde pootje.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'ijsvogel': {
    word: 'ijsvogel',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een opvallende tropische vogel met glanzende blauwe en oranje veertjes die razendsnel vist.',
    translationEn: 'Kingfisher (bird)',
    compound: 'ijs + vogel',
    syllables: ['ijs', 'vo', 'gel'],
    exampleNl: 'De prachtige ijsvogel zong een vrolijk liedje toen zijn vleugel genezen was.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'steentje': {
    word: 'steentje',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een klein hard steentje of keitje.',
    translationEn: 'Little stone / pebble',
    compound: 'steen + tje',
    syllables: ['steen', 'tje'],
    exampleNl: 'Het arme vogeltje werd per ongeluk geraakt door een rondvliegend steentje.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'tuinkliniek': {
    word: 'tuinkliniek',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een geïmproviseerde behandelplek voor dieren in een lommerrijke achtertuin.',
    translationEn: 'Garden animal clinic / rescue shelter',
    compound: 'tuin + kliniek',
    syllables: ['tuin', 'kli', 'niek'],
    exampleNl: 'In Mei-Lings tuinkliniek vonden alle zieke straatdieren rust en vers water.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'dierenredder': {
    word: 'dierenredder',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Iemand die dieren in nood helpt en in veiligheid brengt.',
    translationEn: 'Animal rescuer',
    compound: 'dieren + redder',
    syllables: ['die', 'ren', 'red', 'der'],
    exampleNl: 'Ridheya, Amir en Mei-Ling kregen een medaille als beste dierenredders van de stad.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },

  // === JUNGLE FANTASY, TELEPORTATION & TALKING ANIMALS (HEMALI) ===
  'teleportatie': {
    word: 'teleportatie',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Het magisch of wetenschappelijk verplaatsen van de ene plek naar de andere in een fractie van een seconde.',
    translationEn: 'Teleportation / instant magical travel',
    syllables: ['te', 'le', 'por', 'ta', 'tie'],
    exampleNl: 'Door middel van magische teleportatie verscheen Hemali plotseling midden in het oerwoud.',
    citoCategory: 'Moeilijk Cito Woord',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'teleporteren': {
    word: 'teleporteren',
    wordType: 'Werkwoord',
    meaningNl: 'Zichzelf of iets anders bliksemsnel door de lucht of ruimte verplaatsen.',
    translationEn: 'To teleport',
    syllables: ['te', 'le', 'por', 'te', 'ren'],
    exampleNl: 'Hemali kan dankzij haar fonkelende amulet naar elke geheime tempel teleporteren.',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'ontdekkingsreiziger': {
    word: 'ontdekkingsreiziger',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Iemand die naar onbekende, afgelegen gebieden reist om nieuwe plekken, dieren of geheimen te ontdekken.',
    translationEn: 'Explorer / discovery adventurer',
    compound: 'ontdekking + reiziger',
    syllables: ['ont', 'dek', 'kings', 'rei', 'zi', 'ger'],
    exampleNl: 'Als dappere ontdekkingsreiziger bracht Hemali het mysterieuze nachthoorwoud in kaart.',
    citoCategory: 'Basisschool Kernwoord',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'zombie-aapje': {
    word: 'zombie-aapje',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een ondeugend nachtaapje dat door een oude maan-betovering in een soort slaapwandelende zombie is veranderd.',
    translationEn: 'Zombie monkey / enchanted moon ape',
    compound: 'zombie + aapje',
    syllables: ['zom', 'bie', 'aap', 'je'],
    exampleNl: 'Hemali ontcijferde de magische spreuk en bevrijdde het zombie-aapje uit zijn ban.',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'nachtmist': {
    word: 'nachtmist',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Dichte, geheimzinnige nevel die \'s nachts over de junglebomen hangt.',
    translationEn: 'Night mist / nocturnal fog',
    compound: 'nacht + mist',
    syllables: ['nacht', 'mist'],
    exampleNl: 'De paarsige nachtmist lichtte zacht op rondom de tempelruïne.',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'girafje': {
    word: 'girafje',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een heel jong, lief girafje met een lange slanke nek en een gevlekte vacht.',
    translationEn: 'Baby giraffe',
    compound: 'giraf + je',
    syllables: ['gi', 'raf', 'je'],
    exampleNl: 'Hemali adopteerde het verloren girafje en noemde haar liefkozend Appel.',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'appel': {
    word: 'appel',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een ronde, sappige vrucht; tevens de vrolijke naam van Hemali\'s geadopteerde babygirafje.',
    translationEn: 'Apple / name of Hemali\'s pet giraffe',
    syllables: ['ap', 'pel'],
    exampleNl: 'Babygiraf Appel snuffelde nieuwsgierig aan Hemali\'s toverboek.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'weelderig': {
    word: 'weelderig',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Rijk en overvloedig groeiend met veel prachtige bladeren en bloemen.',
    translationEn: 'Lush, exuberant, lavish',
    syllables: ['weel', 'de', 'rig'],
    exampleNl: 'De weelderige junglebomen vormden een groen dak boven hun hoofden.',
    citoCategory: 'Moeilijk Cito Woord',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'onverschrokken': {
    word: 'onverschrokken',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Zonder enige angst; bijzonder dapper en moedig.',
    translationEn: 'Fearless, undaunted, brave',
    compound: 'on + verschrokken',
    syllables: ['on', 'ver', 'schrok', 'ken'],
    exampleNl: 'De onverschrokken Hemali stapte moedig op de pratende olifant af.',
    citoCategory: 'Moeilijk Cito Woord',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'eendracht': {
    word: 'eendracht',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Het eensgezind en harmonieus samenwerken voor een gezamenlijk doel.',
    translationEn: 'Unity, harmony, solidarity',
    compound: 'een + dracht',
    syllables: ['een', 'dracht'],
    exampleNl: 'Dankzij de eendracht tussen mens en dier werd het oerwoud gered.',
    citoCategory: 'Moeilijk Cito Woord',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'pratend': {
    word: 'pratend',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'In staat om menselijke woorden uit te spreken.',
    translationEn: 'Talking, speaking',
    syllables: ['pra', 'tend'],
    exampleNl: 'De wijze pratende olifant Raja gaf Hemali een gouden raadsel mee.',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'bosmuis': {
    word: 'bosmuis',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een klein bruin knaagdier dat tussen de bladeren in het bos leeft.',
    translationEn: 'Wood mouse / field mouse',
    compound: 'bos + muis',
    syllables: ['bos', 'muis'],
    exampleNl: 'De kleine bosmuis knabbelde aan een eikeltje.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'speurneus': {
    word: 'speurneus',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Iemand die heel goed is in zoeken, sporen volgen en raadsels oplossen.',
    translationEn: 'Detective, sleuth, tracker',
    compound: 'speur + neus',
    syllables: ['speur', 'neus'],
    exampleNl: 'Hemali en Ridheya zijn de dapperste speurneuzen van het safaripark.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },

  // === VERBS (WERKWOORDEN) & INFLECTIONS ===
  'lopen': {
    word: 'lopen',
    wordType: 'Werkwoord',
    meaningNl: 'Zich te voet voortbewegen door stappen te zetten.',
    translationEn: 'To walk, to run, to pace',
    syllables: ['lo', 'pen'],
    exampleNl: 'We lopen rustig over het pad naar het safari-kamp.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'zien': {
    word: 'zien',
    wordType: 'Werkwoord',
    meaningNl: 'Met de ogen beelden waarnemen.',
    translationEn: 'To see, to perceive',
    syllables: ['zien'],
    exampleNl: 'Zie jij die mooie ara in de boom zitten?',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'kijken': {
    word: 'kijken',
    wordType: 'Werkwoord',
    meaningNl: 'De ogen ergens op richten om het aandachtig te zien.',
    translationEn: 'To look, to watch, to gaze',
    syllables: ['kij', 'ken'],
    exampleNl: 'Ridheya keek vol verwondering naar de giraffen.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'speuren': {
    word: 'speuren',
    wordType: 'Werkwoord',
    meaningNl: 'Heel aandachtig zoeken naar sporen, aanwijzingen of dieren.',
    translationEn: 'To track, to search, to scout, to hunt for clues',
    syllables: ['speu', 'ren'],
    exampleNl: 'Met haar vergrootglas speurde ze de zandgrond af.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'vasthouden': {
    word: 'vasthouden',
    wordType: 'Werkwoord',
    meaningNl: 'Iets in de hand klemmen zodat het niet valt.',
    translationEn: 'To hold on to, to grasp, to retain',
    compound: 'vast + houden',
    syllables: ['vast', 'hou', 'den'],
    exampleNl: 'Hemali hield haar toverstaf stevig vast.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'glinsteren': {
    word: 'glinsteren',
    wordType: 'Werkwoord',
    meaningNl: 'Fonkelend licht weerkaatsen; schitteren.',
    translationEn: 'To glisten, to sparkle, to shimmer',
    syllables: ['glin', 'ste', 'ren'],
    exampleNl: 'De gouden munten glinsterden op de bodem van de kist.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'ontcijferen': {
    word: 'ontcijferen',
    wordType: 'Werkwoord',
    meaningNl: 'Een geheime code, moeilijk handschrift of raadsel ontwarren en begrijpelijk maken.',
    translationEn: 'To decipher, to decode, to unravel',
    syllables: ['ont', 'cij', 'fe', 'ren'],
    exampleNl: 'Hemali wist de geheimzinnige runentekens snel te ontcijferen.',
    citoCategory: 'Moeilijk Cito Woord',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'lokken': {
    word: 'lokken',
    wordType: 'Werkwoord',
    meaningNl: 'Iemand of een dier naar een bepaalde plek toe trekken met iets verleidelijks.',
    translationEn: 'To lure, to entice, to tempt',
    syllables: ['lok', 'ken'],
    exampleNl: 'Met een sappig stukje fruit lokte Boerin Tess het babyaapje naar de veilige mand.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'vinden': {
    word: 'vinden',
    wordType: 'Werkwoord',
    meaningNl: 'Iets ontdekken na zoeken of bij toeval tegenkomen.',
    translationEn: 'To find, to discover',
    syllables: ['vin', 'den'],
    exampleNl: 'Ridheya vond een glimmend koperen sleuteltje in het zand.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'helpen': {
    word: 'helpen',
    wordType: 'Werkwoord',
    meaningNl: 'Iemand bijstaan of het werk voor een ander makkelijker maken.',
    translationEn: 'To help, to assist, to aid',
    syllables: ['hel', 'pen'],
    exampleNl: 'Samen hielpen ze het verdwaalde schildpadje terug naar zee.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'redden': {
    word: 'redden',
    wordType: 'Werkwoord',
    meaningNl: 'Iemand of een dier uit gevaar of nood in veiligheid brengen.',
    translationEn: 'To rescue, to save',
    syllables: ['red', 'den'],
    exampleNl: 'De speurneuzen redden de leeuwenwelp uit de val.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'verzorgen': {
    word: 'verzorgen',
    wordType: 'Werkwoord',
    meaningNl: 'Aandacht en medische zorg geven aan een dier of mens die dat nodig heeft.',
    translationEn: 'To nurse, to care for, to look after',
    syllables: ['ver', 'zor', 'gen'],
    exampleNl: 'In het dierenhospitaal verzorgden ze de gekwetste poot van de zebra.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'luisteren': {
    word: 'luisteren',
    wordType: 'Werkwoord',
    meaningNl: 'Aandachtig met de oren naar geluiden of iemands woorden horen.',
    translationEn: 'To listen, to pay attention',
    syllables: ['luis', 'te', 'ren'],
    exampleNl: 'De meisjes luisterden stil naar de roep van de toekan.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'begrijpen': {
    word: 'begrijpen',
    wordType: 'Werkwoord',
    meaningNl: 'De betekenis, bedoeling of logica van iets snappen.',
    translationEn: 'To understand, to comprehend, to grasp',
    syllables: ['be', 'grij', 'pen'],
    exampleNl: 'Met de woordenhulp begrepen ze alle moeilijke Cito-woorden direct.',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'lokaliseren': {
    word: 'lokaliseren',
    wordType: 'Werkwoord',
    meaningNl: 'De exacte vindplaats of positie van iets bepalen.',
    translationEn: 'To locate, to pinpoint, to find the position of',
    syllables: ['lo', 'ka', 'li', 'se', 'ren'],
    exampleNl: 'Met het kompas konden ze het geheime eiland snel lokaliseren.',
    citoCategory: 'Moeilijk Cito Woord',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'glimlach': {
    word: 'glimlach',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een vriendelijke, blije uitdrukking op je gezicht waarbij je mondhoeken omhoog krullen.',
    translationEn: 'Smile',
    compound: 'glim + lach',
    syllables: ['glim', 'lach'],
    exampleNl: 'Toen het gewonde diertje weer vrolijk rondliep, verscheen er een brede glimlach op Ridheya\'s gezicht.',
    citoCategory: 'Basisschool Kernwoord',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'glimlachen': {
    word: 'glimlachen',
    wordType: 'Werkwoord',
    meaningNl: 'Vriendelijk en geluidloos lachen met opgetrokken mondhoeken om vreugde of vriendelijkheid te tonen.',
    translationEn: 'To smile',
    compound: 'glim + lachen',
    syllables: ['glim', 'la', 'chen'],
    exampleNl: 'Hemali glimlachte opgelucht toen ze de magische poort veilig had geopend.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'lach': {
    word: 'lach',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Het vrolijke geluid en de gelaatsuitdrukking als je blij bent of om iets grappigs moet giechelen.',
    translationEn: 'Laugh, laughter, smile',
    syllables: ['lach'],
    exampleNl: 'Met een schaterende lach renden de meisjes over het zandstrand.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'lachen': {
    word: 'lachen',
    wordType: 'Werkwoord',
    meaningNl: 'Vrolijke geluiden maken met je mond en een blij gezicht trekken.',
    translationEn: 'To laugh, to chuckle',
    syllables: ['la', 'chen'],
    exampleNl: 'Boerin Tess en de zussen moesten hartelijk lachen om de ondeugende toekan.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'glim': {
    word: 'glim',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een zachte schittering, weerkaatsing van licht of een lichte glans.',
    translationEn: 'Gleam, glimmer, glow',
    syllables: ['glim'],
    exampleNl: 'In het schemerduister zagen ze de gouden glim van het amulet.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'glimmen': {
    word: 'glimmen',
    wordType: 'Werkwoord',
    meaningNl: 'Licht weerkaatsen, zachtjes stralen of glanzen.',
    translationEn: 'To gleam, to shimmer, to shine',
    syllables: ['glim', 'men'],
    exampleNl: 'Ridheya\'s ronde brilglazen glommen in het felle lamplicht.',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'verband': {
    word: 'verband',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Strook witte stof om een wond te beschermen of een gewricht te ondersteunen; ook de relatie tussen dingen.',
    translationEn: 'Bandage, dressing / connection, context',
    syllables: ['ver', 'band'],
    exampleNl: 'Met een zacht verband wikkelde Ridheya het gewonde pootje van de straathond in.',
    citoCategory: 'Basisschool Kernwoord',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'spalk': {
    word: 'spalk',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Stevig houten of kunststof latje om een gebroken pootje of botje recht en stil te houden.',
    translationEn: 'Splint',
    syllables: ['spalk'],
    exampleNl: 'Ridheya legde een kleine bamboe spalk langs de gekwetste vleugel van de neushoornvogel.',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'spalken': {
    word: 'spalken',
    wordType: 'Werkwoord',
    meaningNl: 'Een gebroken of gekneusd lichaamsdeel vastzetten met een spalk zodat het goed kan genezen.',
    translationEn: 'To splint, to brace',
    syllables: ['spal', 'ken'],
    exampleNl: 'De jonge dierenarts ging het gebroken pootje vakkundig spalken.',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'kliniek': {
    word: 'kliniek',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Medisch centrum of ziekenhuis waar patiënten of dieren worden behandeld en onderzocht.',
    translationEn: 'Clinic, medical dispensary',
    syllables: ['kli', 'niek'],
    exampleNl: 'In de dierenkliniek in Maleisië stonden alle medicijnen netjes op de planken.',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'dierenarts': {
    word: 'dierenarts',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Dokter die zieke en gewonde dieren onderzoekt, verzorgt en beter maakt.',
    translationEn: 'Veterinarian, vet, animal doctor',
    compound: 'dier + arts',
    syllables: ['die', 'ren', 'arts'],
    exampleNl: 'Ridheya droeg trots haar doktersjas als dappere dierenarts.',
    citoCategory: 'Basisschool Kernwoord',
    level: 'Groep 3-4 (AVI M3-E4)'
  },
  'teleporteren': {
    word: 'teleporteren',
    wordType: 'Werkwoord',
    meaningNl: 'Je met behulp van magie of technologie in één flits van de ene naar de andere plek verplaatsen.',
    translationEn: 'To teleport, to blink across space',
    syllables: ['te', 'le', 'por', 'te', 'ren'],
    exampleNl: 'Met een krachtige toverspreuk teleporteerde Hemali haar zusje weg voor de zombie-apen.',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'telepathisch': {
    word: 'telepathisch',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Gedachten kunnen overbrengen of horen zonder woorden te spreken.',
    translationEn: 'Telepathic, mind-reading',
    syllables: ['te', 'le', 'pa', 'tisch'],
    exampleNl: 'De wijze olifant sprak via telepathische gedachten rechtstreeks tot Hemali.',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'mysterie': {
    word: 'mysterie',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Iets geheimzinnigs of onverklaarbaars dat je moet onderzoeken en ontdekken.',
    translationEn: 'Mystery, enigma',
    syllables: ['mys', 'te', 'rie'],
    exampleNl: 'In het hart van het oerwoud wachtte een eeuwenoud mysterie.',
    level: 'Groep 5-6 (AVI M5-E6)'
  },
  'mysterieus': {
    word: 'mysterieus',
    wordType: 'Bijvoeglijk naamwoord',
    meaningNl: 'Geheimzinnig, raadselachtig en vol verwondering.',
    translationEn: 'Mysterious, enigmatic',
    syllables: ['mys', 'te', 'rieus'],
    exampleNl: 'Een mysterieuze gloed verlichtte de eeuwenoude tempelruïne.',
    level: 'Groep 5-6 (AVI M5-E6)'
  }
};

// Common compound component roots for dynamic morphological composition
export const COMPOUND_PREFIXES: Record<string, { meaning: string; en: string }> = {
  'onderzoek': { meaning: 'speurwerk om nieuwe kennis te ontdekken', en: 'research' },
  'safari': { meaning: 'tocht om wilde dieren in de vrije natuur te bekijken', en: 'safari' },
  'zee': { meaning: 'grote zoutwatermassa', en: 'sea / marine' },
  'water': { meaning: 'heldere vloeistof die we drinken', en: 'water' },
  'bos': { meaning: 'gebied met veel bomen en struiken', en: 'forest' },
  'berg': { meaning: 'hoge verheffing in het landschap', en: 'mountain' },
  'duin': { meaning: 'zandheuvel bij de kust', en: 'dune' },
  'zand': { meaning: 'fijne korreltjes aarde of steen', en: 'sand' },
  'schat': { meaning: 'waardevolle verzameling goud of juwelen', en: 'treasure' },
  'zon': { meaning: 'de grote ster die ons licht en warmte geeft', en: 'sun' },
  'maan': { meaning: 'het hemellichaam dat om de aarde draait', en: 'moon' },
  'ster': { meaning: 'fonkelend hemellichaam in de nacht', en: 'star' },
  'vogel': { meaning: 'dier met vleugels en veren', en: 'bird' },
  'dier': { meaning: 'levend wezen dat kan bewegen en voelen', en: 'animal' },
  'leeuw': { meaning: 'groot roofdier met manen', en: 'lion' },
  'huis': { meaning: 'gebouw waar mensen of dieren wonen', en: 'house' },
  'boom': { meaning: 'grote houtachtige plant met een stam en takken', en: 'tree' },
  'bloem': { meaning: 'mooi gekleurd deel van een plant', en: 'flower' },
  'tuin': { meaning: 'stukje grond bij een huis met planten en bloemen', en: 'garden' },
  'school': { meaning: 'plek waar kinderen les krijgen en leren', en: 'school' },
  'boek': { meaning: 'bedrukte bladzijden bijeengebonden met een kaft', en: 'book' },
  'brief': { meaning: 'geschreven bericht aan iemand', en: 'letter / note' },
  'kaart': { meaning: 'getekende weergave van een gebied of speelkaart', en: 'map / card' },
  'kind': { meaning: 'jonge mens', en: 'child' },
  'speel': { meaning: 'plezier maken met spelletjes of speelgoed', en: 'play' },
  'leer': { meaning: 'kennis of vaardigheden opdoen', en: 'learning / teach' },
  'speur': { meaning: 'zoeken naar sporen en aanwijzingen', en: 'detective / sleuth' },
  'nacht': { meaning: 'het donkere deel van het etmaal', en: 'night' },
  'dag': { meaning: 'het lichte deel van het etmaal', en: 'day' },
  'regen': { meaning: 'waterdruppels die uit de wolken vallen', en: 'rain' },
  'sneeuw': { meaning: 'witte bevroren ijskristallen uit de lucht', en: 'snow' },
  'wind': { meaning: 'voelbare stroming van de buitenlucht', en: 'wind' },
  'vuur': { meaning: 'vlammen die warmte en licht geven', en: 'fire' },
  'ijs': { meaning: 'bevroren water', en: 'ice' },
  'koning': { meaning: 'gekroonde heerser van een koninkrijk', en: 'king' },
  'ridder': { meaning: 'middeleeuwse strijder in een harnas', en: 'knight' },
  'tover': { meaning: 'magie beoefenen met een toverstok', en: 'magic' },
  'draak': { meaning: 'sprookjesachtig vuurspuwend monster', en: 'dragon' },
  'vergroot': { meaning: 'groter maken met een bolle lens', en: 'magnifying' },
  'rots': { meaning: 'grote harde steenmassa', en: 'rock / stone' },
  'wandel': { meaning: 'wandelen te voet', en: 'walking / hiking' },
  'stap': { meaning: 'voetstap', en: 'stepping / step' },
  'klets': { meaning: 'heel erg / kledder', en: 'soaking / dripping' },
  'glim': { meaning: 'zachtjes glanzend of vriendelijk stralend', en: 'gleam / glimmer / smile' },
  'redding': { meaning: 'hulpactie om iemand uit nood te bevrijden', en: 'rescue' },
  'dieren': { meaning: 'betrekking hebbend op dieren', en: 'animal' },
  'straat': { meaning: 'verharde openbare weg in de stad', en: 'street / stray' },
  'wonder': { meaning: 'iets bijzonders of magisch', en: 'miracle / wonder' }
};

export const COMPOUND_SUFFIXES: Record<string, { meaning: string; en: string; type: DictionaryEntry['wordType'] }> = {
  'lach': { meaning: 'vriendelijke glimlach of geluid van vreugde', en: 'smile / laugh', type: 'Zelfstandig naamwoord' },
  'schip': { meaning: 'groot vaartuig op het water', en: 'ship / vessel', type: 'Zelfstandig naamwoord' },
  'boot': { meaning: 'vaartuig om mee over het water te varen', en: 'boat', type: 'Zelfstandig naamwoord' },
  'park': { meaning: 'groot groengebied voor ontspanning of dieren', en: 'park', type: 'Zelfstandig naamwoord' },
  'tuin': { meaning: 'aangelegd stuk grond met planten', en: 'garden', type: 'Zelfstandig naamwoord' },
  'huis': { meaning: 'woning of onderkomen', en: 'house / lodge', type: 'Zelfstandig naamwoord' },
  'hut': { meaning: 'eenvoudig houten huisje in het bos of jungle', en: 'hut / cabin', type: 'Zelfstandig naamwoord' },
  'boom': { meaning: 'hoge plant met stam en bladeren', en: 'tree', type: 'Zelfstandig naamwoord' },
  'kaart': { meaning: 'plattegrond of overzicht', en: 'map / chart', type: 'Zelfstandig naamwoord' },
  'boek': { meaning: 'bundel geschreven of gedrukte pagina\'s', en: 'book', type: 'Zelfstandig naamwoord' },
  'schrift': { meaning: 'schriftje om in te schrijven of tekenen', en: 'notebook', type: 'Zelfstandig naamwoord' },
  'lamp': { meaning: 'verlichtingsbron', en: 'lamp / light', type: 'Zelfstandig naamwoord' },
  'glas': { meaning: 'doorzichtig materiaal of lens', en: 'glass / lens', type: 'Zelfstandig naamwoord' },
  'pad': { meaning: 'smalle weg om over te wandelen of fietsen', en: 'path / trail', type: 'Zelfstandig naamwoord' },
  'weg': { meaning: 'route tussen twee plaatsen', en: 'road / route', type: 'Zelfstandig naamwoord' },
  'brug': { meaning: 'overspanning over water of een kloof', en: 'bridge', type: 'Zelfstandig naamwoord' },
  'poort': { meaning: 'grote doorgang in een muur of kasteel', en: 'gate / portal', type: 'Zelfstandig naamwoord' },
  'kijker': { meaning: 'optisch instrument om mee te kijken', en: 'viewer / scope', type: 'Zelfstandig naamwoord' },
  'vogel': { meaning: 'gevederd dier', en: 'bird', type: 'Zelfstandig naamwoord' },
  'dier': { meaning: 'levend schepsel', en: 'animal', type: 'Zelfstandig naamwoord' },
  'eter': { meaning: 'iemand of een dier dat een bepaald voedsel nuttigt', en: 'eater', type: 'Zelfstandig naamwoord' },
  'arts': { meaning: 'medicus of dokter', en: 'doctor / specialist', type: 'Zelfstandig naamwoord' },
  'markt': { meaning: 'plek waar kooplieden waren verkopen', en: 'market', type: 'Zelfstandig naamwoord' },
  'actie': { meaning: 'geplande bezigheid of reddingsoperatie', en: 'action / operation', type: 'Zelfstandig naamwoord' },
  'rol': { meaning: 'opgerold voorwerp zoals verband of perkament', en: 'roll', type: 'Zelfstandig naamwoord' },
  'zalf': { meaning: 'zacht genezend smeersel voor wonden', en: 'ointment / salve', type: 'Zelfstandig naamwoord' },
  'hond': { meaning: 'trouw viervoetig huisdier', en: 'dog', type: 'Zelfstandig naamwoord' },
  'kat': { meaning: 'katachtig dier of poesje', en: 'cat', type: 'Zelfstandig naamwoord' },
  'aap': { meaning: 'klimmend dier in bomen', en: 'monkey / ape', type: 'Zelfstandig naamwoord' },
  'kast': { meaning: 'meubelstuk met planken of deuren om spullen in op te bergen', en: 'cupboard / cabinet', type: 'Zelfstandig naamwoord' },
  'kamer': { meaning: 'afgesloten ruimte in een gebouw', en: 'room / chamber', type: 'Zelfstandig naamwoord' },
  'hol': { meaning: 'ondergrondse schuilplaats van een dier', en: 'burrow / den', type: 'Zelfstandig naamwoord' },
  'nest': { meaning: 'bouwsel waarin vogels of dieren hun eieren leggen of slapen', en: 'nest', type: 'Zelfstandig naamwoord' },
  'welp': { meaning: 'jong van een roofdier zoals een leeuw of wolf', en: 'cub', type: 'Zelfstandig naamwoord' },
  'steen': { meaning: 'hard stuk rots of mineraal', en: 'stone / rock', type: 'Zelfstandig naamwoord' },
  'staf': { meaning: 'lange stok voor steun of toverkracht', en: 'staff / wand', type: 'Zelfstandig naamwoord' },
  'neus': { meaning: 'reukorgaan of speurder', en: 'nose / sleuth', type: 'Zelfstandig naamwoord' },
  'muis': { meaning: 'klein knaagdier', en: 'mouse', type: 'Zelfstandig naamwoord' },
  'bron': { meaning: 'oorsprong van water', en: 'spring / source', type: 'Zelfstandig naamwoord' },
  'lawine': { meaning: 'naar beneden stortende massa sneeuw of rotsen', en: 'avalanche / slide', type: 'Zelfstandig naamwoord' },
  'nat': { meaning: 'doordrenkt met water', en: 'wet / soaked', type: 'Bijvoeglijk naamwoord' }
};
