import { DictionaryEntry } from './dutchDictionaryData';

/**
 * Extensive Curated Dutch Vocabulary Bank for Educational Reading (Groep 3-8, Cito, and Adventure Stories)
 * Each entry strictly complies with:
 * 1. Real educational dictionary definition (meaningNl)
 * 2. Does NOT repeat the word as the definition
 * 3. Correct English translation (translationEn)
 * 4. Natural example sentence (exampleNl)
 * 5. Semantically related words only (synonyms)
 */
export const DUTCH_VOCABULARY_BANK: Record<string, DictionaryEntry> = {
  // ==========================================
  // HOUSE, ROOMS, ARCHITECTURE & SURFACES
  // ==========================================
  'vloer': {
    word: 'vloer',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Het onderste, vlakke deel van een vertrek of gebouw waar je op loopt of staat.',
    translationEn: 'Floor / flooring',
    syllables: ['vloer'],
    exampleNl: 'Ridheya rolde haar zachte speelkleed uit op de houten vloer van haar kamer.',
    synonyms: ['grond', 'parket', 'tapijt', 'tegelvloer', 'ondergrond'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['vloeren', 'vloertje', 'vloerkleed']
  },
  'plafond': {
    word: 'plafond',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'De bovenste afwerking van een kamer die de ruimte aan de bovenzijde afsluit.',
    translationEn: 'Ceiling',
    syllables: ['pla', 'fond'],
    exampleNl: 'Aan het hoge plafond van de bibliotheek hingen fonkelende sterrenlampjes.',
    synonyms: ['zolder', 'overkapping', 'bovenzijde'],
    level: 'Groep 5-6 (AVI M5-E6)',
    variants: ['plafonds', 'plafondje']
  },
  'muur': {
    word: 'muur',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een opgemetselde of gebouwde wand van steen of hout die een ruimte omsluit of scheidt.',
    translationEn: 'Wall',
    syllables: ['muur'],
    exampleNl: 'Aan de muur van de boomhut hing een grote kaart van het safaripark.',
    synonyms: ['wand', 'tussenmuur', 'omheining', 'scheidingswand'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['muren', 'muurtje']
  },
  'wand': {
    word: 'wand',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een verticale vlakke afscheiding aan de zijkant van een kamer of kast.',
    translationEn: 'Wall / partition / side',
    syllables: ['wand'],
    exampleNl: 'De rotsachtige wand van de kristalgrot glinsterde prachtig in het toverlicht.',
    synonyms: ['muur', 'schot', 'scheidingswand', 'rotswand'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['wanden', 'wandje']
  },
  'dak': {
    word: 'dak',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'De bovenste bedekking van een gebouw die bescherming biedt tegen regen, sneeuw en zon.',
    translationEn: 'Roof / rooftop',
    syllables: ['dak'],
    exampleNl: 'Vanaf het dak van het dierenhospitaal konden de meisjes de hele vallei overzien.',
    synonyms: ['overkapping', 'kap', 'dakpan', 'bladerdak'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['daken', 'dakje']
  },
  'raam': {
    word: 'raam',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een opening in een muur met doorzichtig glas om daglicht binnen te laten en naar buiten te kijken.',
    translationEn: 'Window',
    syllables: ['raam'],
    exampleNl: 'Door het open raam waaide een heerlijke, frisse bosbries de studeerkamer binnen.',
    synonyms: ['venster', 'ruit', 'glaspaneel'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['ramen', 'raampje']
  },
  'deur': {
    word: 'deur',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een beweegbaar houten of metalen paneel waarmee je een ingang opent of afsluit.',
    translationEn: 'Door / doorway',
    syllables: ['deur'],
    exampleNl: 'Hemali duwde de zware houten deur van het kasteel langzaam open.',
    synonyms: ['poort', 'ingang', 'toegang', 'luik'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['deuren', 'deurtje']
  },
  'poort': {
    word: 'poort',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een grote, stevige doorgang of toegangshek in een kasteelmuur of vesting.',
    translationEn: 'Gate / portal / gateway',
    syllables: ['poort'],
    exampleNl: 'De gouden poort van het dierenreservaat zwaaide wijd open voor de verkenners.',
    synonyms: ['toegangspoort', 'hek', 'doorgang', 'portaal'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['poorten', 'poortje']
  },
  'gang': {
    word: 'gang',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een lange, smalle verbindingsruimte in een gebouw waaraan verschillende kamers grenzen.',
    translationEn: 'Corridor / hallway / passage',
    syllables: ['gang'],
    exampleNl: 'Aan het einde van de geheime gang zagen de zussen een mysterieus gloeiend lampje.',
    synonyms: ['hal', 'corridor', 'doorgang', 'galerij'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['gangen', 'gangetje']
  },
  'trap': {
    word: 'trap',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een reeks treden waarmee je naar een hogere of lagere verdieping loopt.',
    translationEn: 'Stairs / staircase / ladder',
    syllables: ['trap'],
    exampleNl: 'Met snelle sprongen rende Ridheya de wenteltrap op naar de uitkijktoren.',
    synonyms: ['traptrede', 'wenteltrap', 'ladder', 'opstap'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['trappen', 'trapje']
  },
  'zolder': {
    word: 'zolder',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'De hoogste verdieping van een huis, direct onder het schuine dak.',
    translationEn: 'Attic / loft',
    syllables: ['zol', 'der'],
    exampleNl: 'Op de stoffige zolder vonden de kinderen een oude kist vol historische landkaarten.',
    synonyms: ['vliering', 'bovenverdieping', 'bergruimte'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['zolders', 'zoldertje']
  },
  'kelder': {
    word: 'kelder',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een koele ondergrondse ruimte onder een huis, vaak gebruikt voor opslag.',
    translationEn: 'Cellar / basement',
    syllables: ['kel', 'der'],
    exampleNl: 'In de gewelfde kelder stonden potten vol honing en geneeskrachtige kruiden.',
    synonyms: ['souterrain', 'onderbouw', 'voorraadkelder'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['kelders', 'keldertje']
  },
  'kamer': {
    word: 'kamer',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een afgescheiden vertrek binnen een huis of gebouw.',
    translationEn: 'Room / chamber',
    syllables: ['ka', 'mer'],
    exampleNl: 'In haar gezellige kamer las Hemali aandachtig een spannend avonturenboek.',
    synonyms: ['vertrek', 'ruimte', 'zaal', 'slaapkamer', 'studeerkamer'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['kamers', 'kamertje']
  },
  'keuken': {
    word: 'keuken',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'De ruimte in huis waar maaltijden worden bereid en gekookt.',
    translationEn: 'Kitchen',
    syllables: ['keu', 'ken'],
    exampleNl: 'Uit de keuken geurde het heerlijk naar versgebakken appeltaart met kaneel.',
    synonyms: ['kookruimte', 'kombuis', 'eethoek'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['keukens', 'keukentje']
  },
  'badkamer': {
    word: 'badkamer',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'De ruimte in een woning ingericht om je te wassen, douchen of in bad te gaan.',
    translationEn: 'Bathroom',
    compound: 'bad + kamer',
    syllables: ['bad', 'ka', 'mer'],
    exampleNl: 'Na het schuimbad in de badkamer was de puppy weer brandschoon en vrolijk.',
    synonyms: ['doucheruimte', 'wasruimte'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['badkamers']
  },
  'tuin': {
    word: 'tuin',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een stuk grond bij een huis beplant met gras, bloemen, struiken of bomen.',
    translationEn: 'Garden / yard',
    syllables: ['tuin'],
    exampleNl: 'In de bloemrijke tuin fladderden talloze kleurrijke vlinders rondom de zonnebloemen.',
    synonyms: ['achtertuin', 'park', 'bloementuin', 'boomgaard', 'hof'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['tuinen', 'tuintje']
  },
  'balkon': {
    word: 'balkon',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een omheind open plateau dat aan de buitenkant van een gebouw op een verdieping uitsteekt.',
    translationEn: 'Balcony',
    syllables: ['bal', 'kon'],
    exampleNl: 'Vanaf het balkon zagen de zussen de zon langzaam wegzakken achter de savanne.',
    synonyms: ['terras', 'veranda', 'uitkijkplaats'],
    level: 'Groep 5-6 (AVI M5-E6)',
    variants: ['balkons', 'balkonnetje']
  },
  'terras': {
    word: 'terras',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een verhard buitenplateau bij een huis of café waar je buiten kunt zitten.',
    translationEn: 'Terrace / patio',
    syllables: ['ter', 'ras'],
    exampleNl: 'Op het zonnige terras dronken de meisjes een glas verse limonade.',
    synonyms: ['veranda', 'buitenplaats', 'patio'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['terrassen', 'terrasje']
  },
  'schuur': {
    word: 'schuur',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een eenvoudig bijgebouw voor het stallen van fietsen, gereedschap of dierenvoer.',
    translationEn: 'Shed / barn',
    syllables: ['schuur'],
    exampleNl: 'In de houten schuur stond de safaritruck klaar voor vertrek.',
    synonyms: ['loods', 'stal', 'berging', 'bijgebouw'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['schuren', 'schuurtje']
  },

  // ==========================================
  // FURNITURE & HOUSEHOLD OBJECTS
  // ==========================================
  // NOTE: 'tafel', 'stoel', 'bank' and 'kast' live only in DUTCH_DICTIONARY_DB
  // (canonical entries enriched with this bank's synonyms & variants) to avoid
  // duplicate keys silently overriding each other.
  'bed': {
    word: 'bed',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een meubel met een matras, deken en kussen waarin je slaapt en rust.',
    translationEn: 'Bed / cot / sleeping furniture',
    syllables: ['bed'],
    exampleNl: 'Onder het warme dekbed in haar bed droomde Ridheya over wilde safaridieren.',
    synonyms: ['slaapplaats', 'matras', 'ledikant', 'kribbe'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['bedden', 'bedje']
  },
  'lamp': {
    word: 'lamp',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een voorwerp dat licht verspreidt om een ruimte te verlichten.',
    translationEn: 'Lamp / light',
    syllables: ['lamp'],
    exampleNl: 'Hemali knipte haar leeslamp aan om de geheimzinnige lettertekens te ontcijferen.',
    synonyms: ['lantaarn', 'lichtbron', 'kroonluchter', 'fakkel'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['lampen', 'lampje']
  },
  'spiegel': {
    word: 'spiegel',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een glazen plaat met een zilverlaagje die beelden en licht weerkaatst.',
    translationEn: 'Mirror',
    syllables: ['spie', 'gel'],
    exampleNl: 'In de spiegel zag het aapje zijn eigen vrolijke grimassen en begon te giechelen.',
    synonyms: ['weerspiegeling', 'glas'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['spiegels', 'spiegeltje']
  },
  'klok': {
    word: 'klok',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een instrument dat de tijd aangeeft met wijzers of cijfers, of een bronzen luidklok.',
    translationEn: 'Clock / bell',
    syllables: ['klok'],
    exampleNl: 'De klok aan de toren sloeg precies twaalf uur toen het avontuur begon.',
    synonyms: ['uurwerk', 'horloge', 'wekker', 'tijdmeting'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['klokken', 'klokje']
  },
  'vloerkleed': {
    word: 'vloerkleed',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een geweven stuk textiel of tapijt dat op de vloer ligt voor warmte en sfeer.',
    translationEn: 'Rug / carpet / floor mat',
    compound: 'vloer + kleed',
    syllables: ['vloer', 'kleed'],
    exampleNl: 'De kittens rolden speels over het zachte vloerkleed in de woonkamer.',
    synonyms: ['tapijt', 'mat', 'karpet', 'lopertje'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['vloerkleden', 'vloerkleedje']
  },
  'tapijt': {
    word: 'tapijt',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een dikke, geweven vloerbedekking van wol of kunststof.',
    translationEn: 'Carpet / tapestry',
    syllables: ['ta', 'pijt'],
    exampleNl: 'Het oosterse tapijt in de kasteelzaal was versierd met gouden draden.',
    synonyms: ['vloerkleed', 'vloerbedekking', 'karpet'],
    level: 'Groep 5-6 (AVI M5-E6)',
    variants: ['tapijten', 'tapijtje']
  },
  'gordijn': {
    word: 'gordijn',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een hangend stuk stof voor een raam om licht of inkijk tegen te houden.',
    translationEn: 'Curtain / drape',
    syllables: ['gor', 'dijn'],
    exampleNl: 'Ridheya schoof het gordijn opzij en zag de eerste zonnestralen doorbreken.',
    synonyms: ['vitrage', 'overgordijn', 'rolgordijn', 'scherm'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['gordijnen', 'gordijntje']
  },
  'kussen': {
    word: 'kussen',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een zachte zak gevuld met veren of schuim om je hoofd op te leggen of zacht te zitten.',
    translationEn: 'Pillow / cushion',
    syllables: ['kus', 'sen'],
    exampleNl: 'De puppy krulde zich behaaglijk op tegen het donzige kussen.',
    synonyms: ['hoofdkussen', 'sierkussen', 'zitkussen'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['kussens', 'kussentje']
  },
  'deken': {
    word: 'deken',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een warme lap geweven stof om over je heen te leggen tegen de kou.',
    translationEn: 'Blanket',
    syllables: ['de', 'ken'],
    exampleNl: 'Hemali sloeg een warme wollen deken om de schouders van haar zusje.',
    synonyms: ['dekbed', 'sprei', 'plaid'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['dekens', 'dekentje']
  },

  // ==========================================
  // KITCHEN & DINING
  // ==========================================
  // ('bord' lives only in DUTCH_DICTIONARY_DB - see furniture note above)
  'beker': {
    word: 'beker',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een drinkgerei zonder oor voor koude of warme dranken, of een sportprijs.',
    translationEn: 'Cup / mug / goblet / trophy',
    syllables: ['be', 'ker'],
    exampleNl: 'Ridheya dronk een beker warme chocolademelk na de tocht in de sneeuw.',
    synonyms: ['kopje', 'mok', 'glas', 'trofee'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['bekers', 'bekertje']
  },
  'pan': {
    word: 'pan',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een metalen kookgerei met een bodem en handvatten om eten in te koken of bakken.',
    translationEn: 'Pot / pan / saucepan',
    syllables: ['pan'],
    exampleNl: 'In de grote pan pruttelde een heerlijke groentesoep op het fornuis.',
    synonyms: ['kookpan', 'koekenpan', 'kookpot', 'braadpan'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['pannen', 'pannetje']
  },
  'lepel': {
    word: 'lepel',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een eetgerei met een holle ovale bak aan een steel om soep of toetjes mee te eten.',
    translationEn: 'Spoon',
    syllables: ['le', 'pel'],
    exampleNl: 'Met een zilveren lepel roerde Hemali de honing door haar thee.',
    synonyms: ['eetlepel', 'theelepel', 'soeplepel', 'bestek'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['lepels', 'lepeltje']
  },
  'vork': {
    word: 'vork',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een eetgerei met tanden om stukjes voedsel aan te prikken.',
    translationEn: 'Fork',
    syllables: ['vork'],
    exampleNl: 'Met haar vork prikte Ridheya een zoete aardbei van haar bord.',
    synonyms: ['tafelvork', 'prikker', 'bestek'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['vorken', 'vorkje']
  },
  'mes': {
    word: 'mes',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een scherp snijwerktuig met een lemmet en handvat om voedsel of touw mee te snijden.',
    translationEn: 'Knife / blade',
    syllables: ['mes'],
    exampleNl: 'Voorzichtig sneed Hemali met een botermes de sandwich doormidden.',
    synonyms: ['snijmes', 'lemmet', 'dolk', 'bestek'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['messen', 'mesje']
  },

  // ==========================================
  // CLOTHING, ACCESSORIES & GEAR
  // ==========================================
  'kleding': {
    word: 'kleding',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Het geheel aan kledingstukken die mensen dragen ter bescherming en versiering.',
    translationEn: 'Clothing / clothes / apparel',
    syllables: ['kle', 'ding'],
    exampleNl: 'Voor de expeditie trokken de onderzoekers stevige, waterdichte kleding aan.',
    synonyms: ['kleren', 'gewaad', 'garderobe', 'outfit'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['kledingstuk', 'kleren']
  },
  'jas': {
    word: 'jas',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een kledingstuk met mouwen dat je over je andere kleren draagt als je naar buiten gaat.',
    translationEn: 'Jacket / coat',
    syllables: ['jas'],
    exampleNl: 'Ridheya ritste haar warme winterjas dicht tegen de gure noorderwind.',
    synonyms: ['mantel', 'jack', 'anorak', 'regenjas'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['jassen', 'jasje']
  },
  'schoen': {
    word: 'schoen',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een stevig schoeisel van leer of stof dat je voet beschermt tijdens het lopen.',
    translationEn: 'Shoe / footwear',
    syllables: ['schoen'],
    exampleNl: 'Haar stevige wandelschoenen gaven goede grip op de glibberige bergpaadjes.',
    synonyms: ['stapper', 'laars', 'sneaker', 'schoeisel'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['schoenen', 'schoentje']
  },
  'laars': {
    word: 'laars',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een hoog schoeisel dat reikt tot de kuit of knie, vaak waterdicht tegen modder.',
    translationEn: 'Boot / rainboot',
    syllables: ['laars'],
    exampleNl: 'Met haar rubberen laarzen aan stampte Ridheya vrolijk door de regenplassen.',
    synonyms: ['regenlaars', 'stapschoen', 'kaplaars'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['laarzen', 'laarsje']
  },
  'muts': {
    word: 'muts',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een warm gebreid hoofddeksel zonder rand dat je oren en hoofd beschermt.',
    translationEn: 'Beanie / winter hat / cap',
    syllables: ['muts'],
    exampleNl: 'De rode wollen muts hield de oren van Hemali heerlijk warm in de sneeuw.',
    synonyms: ['hoed', 'pet', 'beanie', 'baret'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['mutsen', 'mutsje']
  },
  'bril': {
    word: 'bril',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een montuur met twee geslepen glazen dat op de neus rust om scherper te kunnen zien.',
    translationEn: 'Glasses / spectacles / eyeglasses',
    syllables: ['bril'],
    exampleNl: 'Ridheya zette haar ronde bril recht op haar neus om de kleine sporen te bekijken.',
    synonyms: ['leesbril', 'zonnebril', 'kijkglas', 'oculair'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['brillen', 'brilletje']
  },
  // ('rugzak' lives only in DUTCH_DICTIONARY_DB - see furniture note above)

  // ==========================================
  // SCHOOL, READING & STUDY
  // ==========================================
  'school': {
    word: 'school',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een onderwijsinstelling waar leerlingen les krijgen van leraren en nieuwe kennis opdoen.',
    translationEn: 'School / school building / place of learning',
    syllables: ['school'],
    exampleNl: 'Op school vertelden de meisjes enthousiast over hun avontuur in het safaripark.',
    synonyms: ['basisschool', 'klas', 'onderwijsinstituut', 'academie'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['scholen', 'schooltje']
  },
  // ('klas' lives only in DUTCH_DICTIONARY_DB - see furniture note above)
  'boek': {
    word: 'boek',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een samengebonden verzameling bedrukte of beschreven bladzijden binnen een kaft.',
    translationEn: 'Book / volume',
    syllables: ['boek'],
    exampleNl: 'In het magische boek vond Hemali een eeuwenoude spreuk over vriendschap.',
    synonyms: ['leesboek', 'verhalenboek', 'prentenboek', 'werkboek', 'bundel'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['boeken', 'boekje']
  },
  // ('schrift', 'potlood', 'pen', 'gum' and 'liniaal' live only in DUTCH_DICTIONARY_DB)
  'schaar': {
    word: 'schaar',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een gereedschap met twee snijdende bladen die over elkaar bewegen om papier of stof te knippen.',
    translationEn: 'Scissors / shears',
    syllables: ['schaar'],
    exampleNl: 'Met een knutselschaar knipte Ridheya mooie sterren uit glanzend papier.',
    synonyms: ['knipschaar', 'knipper'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['scharen', 'schaartje']
  },

  // ==========================================
  // NATURE, LANDSCAPES & ELEMENTS
  // ==========================================
  'aarde': {
    word: 'aarde',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'De planeet waarop wij leven, of de vruchtbare grond waarin planten en bomen groeien.',
    translationEn: 'Earth / soil / ground',
    syllables: ['aar', 'de'],
    exampleNl: 'In de vochtige aarde ontkiemde een piepklein groen zaadje tot een mooie bloem.',
    synonyms: ['grond', 'bodem', 'planeet', 'wereldbol', 'klei'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['aardbodem', 'aardkloot']
  },
  'water': {
    word: 'water',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'De heldere vloeistof die rivieren, meren en oceanen vormt en die onmisbaar is voor al het leven.',
    translationEn: 'Water / H2O (drinkable liquid)',
    syllables: ['wa', 'ter'],
    exampleNl: 'Het kristalheldere water stroomde vrolijk kletterend van de berghelling.',
    synonyms: ['vocht', 'zee', 'rivier', 'bronwater'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['wateren', 'watertje']
  },
  'lucht': {
    word: 'lucht',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Het gasmengsel rondom de aarde dat we inademen, of de zichtbare hemel boven ons.',
    translationEn: 'Air / sky',
    syllables: ['lucht'],
    exampleNl: 'Hoog in de blauwe lucht zweefde een majestueuze zeearend op de wind.',
    synonyms: ['hemel', 'uitspansel', 'atmosfeer', 'dampkring'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['luchten', 'luchtje']
  },
  'vuur': {
    word: 'vuur',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Het verschijnsel van vlammen, hitte en licht dat ontstaat bij verbranding.',
    translationEn: 'Fire / flame',
    syllables: ['vuur'],
    exampleNl: 'Rondom het knapperende kampvuur zongen de zussen vrolijke avonturenliedjes.',
    synonyms: ['vlam', 'kampvuur', 'gloed', 'haardvuur'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['vuren', 'vuurtje']
  },
  'zon': {
    word: 'zon',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'De centrale ster in ons zonnestelsel die de aarde voorziet van warmte en licht.',
    translationEn: 'Sun / sunshine',
    syllables: ['zon'],
    exampleNl: 'De gouden zon verwarmde het savannelandschap en wekte de dieren.',
    synonyms: ['zonneschijn', 'zonlicht', 'dagster'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['zonnen', 'zonnetje']
  },
  'maan': {
    word: 'maan',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Het natuurlijke hemellichaam dat in een baan om de aarde draait en \'s nachts oplicht.',
    translationEn: 'Moon',
    syllables: ['maan'],
    exampleNl: 'De zilveren volle maan weerkaatste betoverend in het rustige meertje.',
    synonyms: ['maansikkel', 'hemellichaam', 'vollemaan'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['manen', 'maantje']
  },
  'ster': {
    word: 'ster',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een gloeiende bol van heet gas in het heelal die als een fonkelend lichtpuntje aan de nachthemel straalt.',
    translationEn: 'Star',
    syllables: ['ster'],
    exampleNl: 'Door de telescoop zag Hemali een vallende ster over de nachthemel schieten.',
    synonyms: ['hemellichaam', 'sterrenbeeld', 'fonkeling'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['sterren', 'sterretje']
  },
  'boom': {
    word: 'boom',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een grote overblijvende houtachtige plant met een stevige stam, takken en bladeren.',
    translationEn: 'Tree',
    syllables: ['boom'],
    exampleNl: 'In de hoogste tak van de oude eikenboom had de wijze uil zijn nest gebouwd.',
    synonyms: ['loofboom', 'naaldboom', 'woudboom', 'stam'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['bomen', 'boompje']
  },
  'bos': {
    word: 'bos',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een groot gebied dicht begroeid met bomen, struiken en wilde planten.',
    translationEn: 'Forest / woods',
    syllables: ['bos'],
    exampleNl: 'Diep in het betoverde bos zochten de zussen naar geneeskrachtige kruiden.',
    synonyms: ['woud', 'oerwoud', 'loofbos', 'jungle'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['bossen', 'bosje']
  },
  // ('zee' lives only in DUTCH_DICTIONARY_DB - see furniture note above)
  'rivier': {
    word: 'rivier',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een brede natuurlijke waterloop die zoet water naar een meer of zee voert.',
    translationEn: 'River / waterway',
    syllables: ['ri', 'vier'],
    exampleNl: 'In hun kano peddelden Ridheya en Hemali over de kronkelende rivier.',
    synonyms: ['stroom', 'waterloop', 'beek', 'kanaal'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['rivieren', 'riviertje']
  },
  'berg': {
    word: 'berg',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een zeer hoge en steile verheffing van het aardoppervlak.',
    translationEn: 'Mountain / peak',
    syllables: ['berg'],
    exampleNl: 'De besneeuwde top van de berg stak scherp af tegen de heldere hemel.',
    synonyms: ['bergtop', 'piek', 'heuvel', 'rotsmassa'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['bergen', 'bergje']
  },
  'grot': {
    word: 'grot',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een natuurlijke ondergrondse holte of gangenstelsel in een rots of berg.',
    translationEn: 'Cave / cavern / grotto',
    syllables: ['grot'],
    exampleNl: 'In de verborgen grot weerkaatsten fonkelende kristallen het licht van hun toorts.',
    synonyms: ['spelonk', 'holte', 'rotshol', 'caverne'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['grotten', 'grotje']
  },
  'eiland': {
    word: 'eiland',
    wordType: 'Zelfstandig naamwoord',
    meaningNl: 'Een stuk land dat aan alle zijden geheel door water wordt omringd.',
    translationEn: 'Island / isle',
    syllables: ['ei', 'land'],
    exampleNl: 'Op het onbewoonde eiland ontdekten de ontdekkers een zeldzame zeeschildpad.',
    synonyms: ['atol', 'archipel', 'landmassa'],
    level: 'Groep 3-4 (AVI M3-E4)',
    variants: ['eilanden', 'eilandje']
  }
};

/**
 * High-precision Semantic Word Network for Dutch Language
 * Maps words to their authentic semantic domain peers, true synonyms, and co-hyponyms.
 * (Replaces string-distance phonetic matches like Levenshtein distance with true linguistic semantics).
 */
export const DUTCH_SEMANTIC_INDEX: Record<string, string[]> = {
  'vloer': ['grond', 'parket', 'tapijt', 'tegelvloer', 'ondergrond', 'vloerkleed'],
  'plafond': ['zolder', 'overkapping', 'dak', 'bovenzijde'],
  'muur': ['wand', 'tussenmuur', 'omheining', 'scheidingswand'],
  'wand': ['muur', 'rotswand', 'schot', 'scheidingswand'],
  'dak': ['overkapping', 'bladerdak', 'kap', 'zolder'],
  'raam': ['venster', 'ruit', 'glaspaneel', 'uitkijk'],
  'deur': ['poort', 'ingang', 'toegang', 'luik', 'drempel'],
  'poort': ['toegangspoort', 'kasteelpoort', 'hek', 'doorgang'],
  'gang': ['hal', 'corridor', 'doorgang', 'galerij', 'tunnel'],
  'trap': ['traptrede', 'wenteltrap', 'ladder', 'opstap'],
  'zolder': ['vliering', 'bovenverdieping', 'bergruimte'],
  'kelder': ['souterrain', 'onderbouw', 'voorraadkelder', 'gewelf'],
  'kamer': ['vertrek', 'ruimte', 'zaal', 'slaapkamer', 'studeerkamer'],
  'keuken': ['kookruimte', 'kombuis', 'eethoek'],
  'badkamer': ['doucheruimte', 'wasruimte', 'bad'],
  'tuin': ['achtertuin', 'park', 'bloementuin', 'boomgaard', 'hof'],
  'balkon': ['terras', 'veranda', 'uitkijkplaats'],
  'terras': ['veranda', 'buitenplaats', 'patio'],
  'schuur': ['loods', 'stal', 'berging', 'bijgebouw'],
  'tafel': ['bureau', 'eettafel', 'werktafel', 'salontafel'],
  'stoel': ['zetel', 'fauteuil', 'zitplaats', 'kruk'],
  'bank': ['sofa', 'zitbank', 'rustbank'],
  'kast': ['kledingkast', 'boekenkast', 'vitrine', 'kabinet', 'dressoir'],
  'bed': ['slaapplaats', 'matras', 'ledikant', 'kribbe'],
  'lamp': ['lantaarn', 'lichtbron', 'kroonluchter', 'fakkel', 'leeslamp'],
  'spiegel': ['weerspiegeling', 'spiegelglas', 'glas'],
  'klok': ['uurwerk', 'horloge', 'wekker', 'tijdmeting'],
  'vloerkleed': ['tapijt', 'mat', 'karpet', 'lopertje'],
  'tapijt': ['vloerkleed', 'vloerbedekking', 'karpet'],
  'gordijn': ['vitrage', 'overgordijn', 'rolgordijn', 'scherm'],
  'kussen': ['hoofdkussen', 'sierkussen', 'zitkussen'],
  'deken': ['dekbed', 'sprei', 'plaid', 'wollen deken'],
  'bord': ['schaal', 'eetbord', 'schoteltje'],
  'beker': ['kopje', 'mok', 'glas', 'trofee'],
  'pan': ['kookpan', 'koekenpan', 'kookpot', 'braadpan'],
  'lepel': ['eetlepel', 'theelepel', 'soeplepel', 'bestek'],
  'vork': ['tafelvork', 'prikker', 'bestek'],
  'mes': ['snijmes', 'lemmet', 'dolk', 'bestek'],
  'kleding': ['kleren', 'gewaad', 'garderobe', 'outfit'],
  'jas': ['mantel', 'jack', 'anorak', 'regenjas'],
  'schoen': ['stapper', 'laars', 'sneaker', 'schoeisel'],
  'laars': ['regenlaars', 'stapschoen', 'kaplaars'],
  'muts': ['hoed', 'pet', 'beanie', 'baret'],
  'bril': ['leesbril', 'zonnebril', 'kijkglas'],
  'rugzak': ['tas', 'knapzak', 'ransel', 'rugtas'],
  'school': ['basisschool', 'klas', 'onderwijsinstituut', 'academie'],
  'klas': ['groep', 'leerjaar', 'klaslokaal'],
  'boek': ['leesboek', 'verhalenboek', 'prentenboek', 'werkboek'],
  'schrift': ['notitieboek', 'schrijfblok', 'dagboek'],
  'potlood': ['grafietpotlood', 'kleurpotlood', 'stift'],
  'pen': ['balpen', 'vulpen', 'stift', 'veer'],
  'gum': ['stuf', 'vlakgom', 'wisser'],
  'liniaal': ['meetlat', 'maatstok', 'geodriehoek'],
  'schaar': ['knipschaar', 'knipper'],
  'aarde': ['grond', 'bodem', 'planeet', 'wereldbol'],
  'water': ['vocht', 'zee', 'rivier', 'bronwater'],
  'lucht': ['hemel', 'uitspansel', 'atmosfeer', 'dampkring'],
  'vuur': ['vlam', 'kampvuur', 'gloed', 'haardvuur'],
  'zon': ['zonneschijn', 'zonlicht', 'dagster'],
  'maan': ['maansikkel', 'hemellichaam', 'vollemaan'],
  'ster': ['hemellichaam', 'sterrenbeeld', 'fonkeling'],
  'boom': ['loofboom', 'naaldboom', 'woudboom', 'stam'],
  'bos': ['woud', 'oerwoud', 'loofbos', 'jungle'],
  'zee': ['oceaan', 'watermassa', 'zeeark', 'golven'],
  'rivier': ['stroom', 'waterloop', 'beek', 'kanaal'],
  'berg': ['bergtop', 'piek', 'heuvel', 'rotsmassa'],
  'grot': ['spelonk', 'holte', 'rotshol', 'caverne'],
  'eiland': ['atol', 'archipel', 'landmassa'],
  'oneindig': ['grenzeloos', 'onbegrensd', 'onmetelijk', 'eindeloos', 'eeuwig'],
  'oneindigheid': ['grenzeloosheid', 'onbegrensdheid', 'eeuwigheid'],
  'eindeloos': ['oneindig', 'onophoudelijk', 'voortdurend', 'grenzeloos'],
  'desondanks': ['toch', 'niettemin', 'desalniettemin', 'ondanks dat'],
  'daardoor': ['als gevolg daarvan', 'zodoende', 'wegens', 'waardoor'],
  'aangezien': ['omdat', 'doordat', 'vermits', 'gezien het feit dat'],
  'achterdochtig': ['wantrouwig', 'argwanend', 'behoedzaam', 'voorzichtig'],
  'onderzoekschip': ['expeditieschip', 'wetenschapsschip', 'speurboot'],
  'duinpad': ['zandpad', 'kustpad', 'wandelpad', 'duinen']
};
