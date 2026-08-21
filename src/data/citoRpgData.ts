export interface ProtagonistProfile {
  id: 'ridheya' | 'hemali';
  name: string;
  ageDesc: string;
  gradeLevel: string;
  aviLevel: string;
  persona: string;
  visuals: string;
  gear: string;
  readingFocus: string[];
  emoji: string;
  currentMission: string;
}

export const PROTAGONISTS: Record<'ridheya' | 'hemali', ProtagonistProfile> = {
  ridheya: {
    id: 'ridheya',
    name: 'Ridheya',
    ageDesc: 'Jongere zus (Groep 3–4 / Dierenarts in opleiding)',
    gradeLevel: 'Groep 3–4',
    aviLevel: 'AVI M3–E4',
    persona: 'Dappere jonge dierenarts in Maleisië, nieuwsgierig, zorgzaam, beschermt zwerfdieren en vogels.',
    visuals: 'Jong meisje met bruin haar, warme bruine ogen en een heldere ronde bril.',
    gear: 'Witte dierenartskit, stethoscoop, verbandgaas-tas en vergrootglas.',
    readingFocus: ['Korte frequente woorden', 'Eenvoudige voegwoorden (want, maar, zodat, omdat)', 'Woorden ontleden', 'Context raden'],
    emoji: '🩺',
    currentMission: 'Dieren redden in de tropische stad in Maleisië met vrienden Amir en Mei-Ling.'
  },
  hemali: {
    id: 'hemali',
    name: 'Hemali',
    ageDesc: 'Oudere zus (Groep 5–6 / Magische Ontdekkingsreiziger & Cito Prep)',
    gradeLevel: 'Groep 5–6',
    aviLevel: 'AVI M5–E6',
    persona: 'Slimme ontdekkingsreiziger met teleportatiekracht, spreekt met wijze jungledieren en beschermer van baby giraf Appel.',
    visuals: 'Ouder meisje met lang steil donker haar, warme bruine ogen en een schrandere glimlach.',
    gear: 'Ontdekkingsreizigersjas, saffieren teleportatie-amulet, detective-notitieboek en ganzencalamus.',
    readingFocus: ['Signaalwoorden (daardoor, desondanks, bovendien, echter)', 'Verwijswoorden (deze, waarmee, hetgeen)', 'Hoofdgedachte vinden', 'Oorzaak en gevolg'],
    emoji: '✨',
    currentMission: 'Nachtelijke jungle-expeditie: ontraadsel het zombie-aapje en help de wijze pratende olifant Raja.'
  }
};

export interface InterestQuestion {
  id: string;
  question: string;
  category: string;
  options: {
    text: string;
    themeKey: string;
    icon: string;
  }[];
}

export const INTEREST_QUESTIONS: InterestQuestion[] = [
  {
    id: 'int_1',
    question: 'Welke heldenrol of droomberoep past het allerbeste bij jou in dit verhaal?',
    category: '1. Heldenrol & Beroep',
    options: [
      { text: 'Dierenarts in opleiding: met stethoscoop en verband gewonde dieren redden in de stad (zoals Ridheya)', themeKey: 'malaysia_vet', icon: '🩺' },
      { text: 'Magische Ontdekkingsreiziger: teleporteren, praten met olifanten en mysteries ontrafelen (zoals Hemali)', themeKey: 'jungle_magic', icon: '✨' },
      { text: 'Koninklijke Safaribeschermer: samen met je zus een groot dierenreservaat behoeden voor gevaar', themeKey: 'sisters_safari', icon: '👑' },
      { text: 'Natuurwetenschapper: op een historisch onderzoeksschip zeldzame fauna bestuderen', themeKey: 'ship', icon: '🚢' }
    ]
  },
  {
    id: 'int_2',
    question: 'Op welke avontuurlijke locatie wil jij jouw verhaal laten afspelen?',
    category: '2. Locatie & Wereld',
    options: [
      { text: 'De tropische stad Kuala Lumpur in Maleisië 🇲🇾 (tussen fruitkramen, banyanbomen en binnentuinen)', themeKey: 'city_malaysia', icon: '🏙️' },
      { text: 'Het mysterieuze nachthoorwoud van Taman Negara 🌙 (midden in de nacht met gloeiende lianen)', themeKey: 'night_jungle', icon: '🌿' },
      { text: 'De zonnige savannekust en duinpaden van het dierenreservaat 🦁', themeKey: 'savanna_coast', icon: '🌊' },
      { text: 'Een oude tempelruïne vol geheime stenen inscripties en toveraltaren 🏛️', themeKey: 'temple_ruins', icon: '📜' }
    ]
  },
  {
    id: 'int_3',
    question: 'Welk dier in nood wil jij als eerste eerste hulp verlenen en verzorgen?',
    category: '3. Dieren Eerste Hulp',
    options: [
      { text: 'Een gewonde zwerfhond (Kopi) met een bezeerd pootje door gebroken glas verzorgen', themeKey: 'stray_dog_kopi', icon: '🐕' },
      { text: 'Een prachtige blauwe tropische ijsvogel verzorgen die geraakt werd door een steentje', themeKey: 'kingfisher_stone', icon: '🐦' },
      { text: 'Een betoverd nachtelijk zombie-aapje verlossen van een slaapwandelende maanvloek', themeKey: 'zombie_monkey', icon: '🐒' },
      { text: 'Een jonge leeuwenwelp (Simba) bevrijden uit een smalle kloof na een rotslawine', themeKey: 'lion_cub', icon: '🦁' }
    ]
  },
  {
    id: 'int_4',
    question: 'Welke bijzondere magische gave of uitrusting wil jij gebruiken tijdens je tocht?',
    category: '4. Krachten & Gereedschap',
    options: [
      { text: 'Magische teleportatie met een saffieren amulet om in een flits door de ruimte te reizen', themeKey: 'teleportation', icon: '✨' },
      { text: 'Een rode dierenartstas met stethoscoop, verbandgaas, zalf en vergrootglas', themeKey: 'vet_toolkit', icon: '🩺' },
      { text: 'Een detective-notitieboek om geheime Cito signaalwoorden en raadsels te ontcijferen', themeKey: 'detective_book', icon: '📖' },
      { text: 'Een houten wandelstaf en magisch kompas om veilige paden te vinden', themeKey: 'magic_compass', icon: '🧭' }
    ]
  },
  {
    id: 'int_5',
    question: 'Met welk trouw dierenvriendje wil jij vriendschap sluiten en adopteren?',
    category: '5. Dieren Vriend & Adoptie',
    options: [
      { text: 'Een schattig babygirafje genaamd Appel met ronde appelvlekjes adopteren en voeden', themeKey: 'baby_giraffe_apple', icon: '🦒' },
      { text: 'De wijze pratende olifant Raja die met een diepe stem oude geheimen deelt', themeKey: 'talking_elephant_raja', icon: '🐘' },
      { text: 'Kopi de geadopteerde straathond die kwispelt en de tuinkliniek bewaakt', themeKey: 'adopted_kopi', icon: '🐕' },
      { text: 'Zazu het ondeugende aapje dat salto’s maakt en bloemenkransen strooit', themeKey: 'guide_monkey_zazu', icon: '🐒' }
    ]
  },
  {
    id: 'int_6',
    question: 'Hoe werk jij het allerliefst samen om moeilijke situaties en raadsels op te lossen?',
    category: '6. Vrienden & Samenwerking',
    options: [
      { text: 'Team Maleisië: samenwerken met fietskoerier Amir (met bakfiets) en Mei-Ling (met binnentuin)', themeKey: 'team_malaysia_friends', icon: '🚲' },
      { text: 'Het Zussen Verbond: observatie (Ridheya) en logica (Hemali) combineren als onverslaanbaar team', themeKey: 'sisters_team', icon: '👑' },
      { text: 'Praten met dieren: luisteren naar wijze jungledieren om de natuurlijke harmonie te herstellen', themeKey: 'talking_animals', icon: '🌿' },
      { text: 'Logisch redeneren: Cito signaalwoorden van oorzaak, gevolg en tegenstelling kraken', themeKey: 'cito_logic', icon: '🧠' }
    ]
  }
];

export interface PlacementQuestion {
  id: string;
  curriculumLevel: 'Groep 3-4 (M3-E4)' | 'Groep 5-6 (M5-E6)';
  skillTested: string;
  contextHeader?: string;
  passage: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  wordHelp?: {
    word: string;
    breakdown?: string;
    dutchMeaning: string;
    englishMeaning: string;
  }[];
}

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  // --- GROEP 3-4 (RIDHEYA) ---
  {
    id: 'cito_r_1',
    curriculumLevel: 'Groep 3-4 (M3-E4)',
    skillTested: 'Samengestelde woorden & Context raden',
    contextHeader: '🩺 Dierenarts Ridheya in Maleisië',
    passage: 'Ridheya ritst haar rode **dierenartstas** open. Ze ziet een magere **zwerfhond** met een bezeerd pootje onder een mangokraam liggen. "Geen zorgen vriendje," zegt Ridheya zachtjes.',
    question: 'Wat is een "zwerfhond" volgens deze tekst?',
    options: [
      'Een hond die in een groot paleis slaapt',
      'Een hond zonder vast huis die op straat rondloopt',
      'Een hond die kan vliegen als een vogel',
      'Een speelgoedhondje van plastic'
    ],
    correctIndex: 1,
    explanation: 'Zwerfhond is een samenstelling van zwerf + hond: een hond die op straat zwerft.',
    wordHelp: [
      {
        word: 'zwerfhond',
        breakdown: 'zwerf + hond',
        dutchMeaning: 'een hond die geen baasje heeft en op straat leeft.',
        englishMeaning: 'Stray dog / street dog'
      },
      {
        word: 'dierenartstas',
        breakdown: 'dierenarts + tas',
        dutchMeaning: 'een tas met medische spullen voor het behandelen van dieren.',
        englishMeaning: 'Veterinarian bag'
      }
    ]
  },
  {
    id: 'cito_r_2',
    curriculumLevel: 'Groep 3-4 (M3-E4)',
    skillTested: 'Voegwoorden & Oorzaak (want/omdat)',
    contextHeader: '🐦 Het gewonde vogeltje',
    passage: 'Een kleine blauwe **ijsvogel** werd per ongeluk geraakt door een **steentje**. Ridheya pakt snel het verbandgaas, **want** de tere vleugel van de vogel moet recht blijven.',
    question: 'Waarom pakt Ridheya snel het verbandgaas?',
    options: [
      'Omdat ze honger heeft en wil eten',
      'Omdat de tere vleugel van de vogel recht moet blijven om te genezen',
      'Omdat ze wil gaan slapen in het park',
      'Omdat het buiten koud aan het vriezen is'
    ],
    correctIndex: 1,
    explanation: 'Het voegwoord "want" legt de reden uit: ze pakt verbandgaas zodat de vleugel recht blijft.',
    wordHelp: [
      {
        word: 'ijsvogel',
        breakdown: 'ijs + vogel',
        dutchMeaning: 'een kleurrijke tropische vogel met blauwe veren.',
        englishMeaning: 'Kingfisher'
      },
      {
        word: 'steentje',
        breakdown: 'steen + tje',
        dutchMeaning: 'een klein keitje.',
        englishMeaning: 'Little pebble'
      }
    ]
  },
  {
    id: 'cito_r_3',
    curriculumLevel: 'Groep 3-4 (M3-E4)',
    skillTested: 'Verwijswoorden (hij/ze)',
    contextHeader: '🚲 Amir en de bakfiets',
    passage: 'Amir stopt met zijn rode bakfiets vol verse papaja’s. **Hij** helpt Ridheya om een zachte deken voor de gewonde hond neer te leggen.',
    question: 'Naar wie verwijst het woord "**Hij**" in de tweede zin?',
    options: [
      'De gewonde hond',
      'De rode bakfiets',
      'Amir de jongen',
      'Ridheya'
    ],
    correctIndex: 2,
    explanation: '"Hij" vervangt de mannelijke persoon uit de vorige zin: Amir.',
    wordHelp: [
      {
        word: 'bakfiets',
        breakdown: 'bak + fiets',
        dutchMeaning: 'een stevige fiets met een grote houten bak voorop.',
        englishMeaning: 'Cargo bike'
      }
    ]
  },
  {
    id: 'cito_r_4',
    curriculumLevel: 'Groep 3-4 (M3-E4)',
    skillTested: 'Hoofdgedachte in een korte tekst',
    contextHeader: '🌺 De Tuinkliniek van Mei-Ling',
    passage: 'In de lommerrijke tuin van Mei-Ling krijgen alle zieke dieren vers water, zachte kussens en medicijnen. Samen met dierenarts Ridheya en fietskoerier Amir zorgt Mei-Ling dat elk gewond straatdier in de stad weer vrolijk en gezond wordt.',
    question: 'Wat is de **hoofdgedachte** van dit stukje tekst?',
    options: [
      'In Maleisië groeien alleen maar bomen.',
      'De drie vrienden werken samen in een tuinkliniek om alle gewonde stadsdieren te genezen.',
      'Amir houdt niet van fietsen door de stad.',
      'Ridheya wil alleen maar slapen in de tuin.'
    ],
    correctIndex: 1,
    explanation: 'De kern is de fijne samenwerking van het drietal in de tuinkliniek om stadsdieren te helpen.',
    wordHelp: [
      {
        word: 'tuinkliniek',
        breakdown: 'tuin + kliniek',
        dutchMeaning: 'een plek in de tuin waar gewonde dieren worden verzorgd.',
        englishMeaning: 'Garden rescue clinic'
      }
    ]
  },
  {
    id: 'cito_r_5',
    curriculumLevel: 'Groep 3-4 (M3-E4)',
    skillTested: 'Begrijpend Lezen & Details Vinden',
    contextHeader: '🩺 Het Onderzoek met de Stethoscoop',
    passage: 'Ridheya zet haar glanzende stethoscoop op de borstkas van Kopi de hond. Ze luistert heel stil. **Boem-boem, boem-boem**. Zijn hartje klopt rustig en regelmatig. Ridheya knikt tevreden naar Mei-Ling.',
    question: 'Hoe weet Ridheya dat het hondje niet meer bang is?',
    options: [
      'Omdat de hond begint te blaffen tegen de bakfiets',
      'Omdat zijn hartje via de stethoscoop rustig en regelmatig klopt',
      'Omdat het hondje wegrent naar het strand',
      'Omdat Mei-Ling een pleister op haar vinger plakt'
    ],
    correctIndex: 1,
    explanation: 'Ridheya hoort met haar stethoscoop dat zijn hartje rustig en regelmatig klopt.',
    wordHelp: [
      {
        word: 'stethoscoop',
        breakdown: 'stetho + scoop',
        dutchMeaning: 'een medisch instrument waarmee een arts naar het hart en de longen luistert.',
        englishMeaning: 'Stethoscope'
      }
    ]
  },
  {
    id: 'cito_r_6',
    curriculumLevel: 'Groep 3-4 (M3-E4)',
    skillTested: 'Samengestelde woorden ontleden (wonder + zalf)',
    contextHeader: '🌿 De Natuurlijke Medicijnen',
    passage: 'Mei-Ling plukt verse aloë vera en mengt dit met kokosolie tot een zachte **wonderzalf**. Ridheya smeert het voorzichtig op het pootje van Kopi, **zodat** het wondje snel dichtgroeit.',
    question: 'Wat is "wonderzalf" volgens de zin?',
    options: [
      'Een koude ijscoupe met fruit',
      'Een speciale genezende zalf die wonden helpt herstellen',
      'Verf om een schilderij mee te maken',
      'Zeep om de straat mee schoon te schrobben'
    ],
    correctIndex: 1,
    explanation: 'Wonderzalf is samengesteld uit wonder + zalf: een weldadige zalf die wonden bijzonder goed heelt.',
    wordHelp: [
      {
        word: 'wonderzalf',
        breakdown: 'wonder + zalf',
        dutchMeaning: 'een zalf die wonden heel snel en zacht geneest.',
        englishMeaning: 'Miracle ointment'
      },
      {
        word: 'zodat',
        dutchMeaning: 'geeft het doel aan (met het resultaat dat).',
        englishMeaning: 'So that / in order that'
      }
    ]
  },
  {
    id: 'cito_r_7',
    curriculumLevel: 'Groep 3-4 (M3-E4)',
    skillTested: 'Tijdsvolgorde & Stappenplan (eerst, daarna, tenslotte)',
    contextHeader: '🩹 Het Stappenplan van Dierenarts Ridheya',
    passage: '**Eerst** spoelt Ridheya het zand van het pootje met schoon water. **Daarna** smeert ze verzachtende zalf op de snee. **Tenslotte** wikkelt ze een wit verbandje om het pootje.',
    question: 'Wat doet Ridheya als **tweede stap** (daarna)?',
    options: [
      'Ze wikkelt meteen het witte verbandje eromheen',
      'Ze smeert verzachtende zalf op de snee',
      'Ze spoelt het zand van het pootje',
      'Ze fietst met Amir naar de markt'
    ],
    correctIndex: 1,
    explanation: 'Het signaalwoord "Daarna" geeft de tweede stap aan: het smeren van de verzachtende zalf.',
    wordHelp: [
      {
        word: 'daarna',
        dutchMeaning: 'vervolgens, na de eerste stap.',
        englishMeaning: 'After that / next'
      },
      {
        word: 'tenslotte',
        breakdown: 'ten + slotte',
        dutchMeaning: 'als allerlaatste stap.',
        englishMeaning: 'Finally / lastly'
      }
    ]
  },
  {
    id: 'cito_r_8',
    curriculumLevel: 'Groep 3-4 (M3-E4)',
    skillTested: 'Emoties & Woordbetekenis (dankbaar / opgelucht)',
    contextHeader: '🎉 De Blije Zwerfhond Kopi',
    passage: 'Als Kopi een kommetje rijst met vis opheeft, geeft hij Ridheya een zacht likje over haar hand. Ridheya voelt zich intens **dankbaar** dat ze het diertje op tijd heeft kunnen helpen.',
    question: 'Wat betekent het als Ridheya zich "**dankbaar**" voelt?',
    options: [
      'Ze is heel boos op de bakfiets',
      'Ze is blij en heeft een warm gevoel over de goede afloop',
      'Ze heeft heel veel dorst gekregen',
      'Ze wil naar huis rennen'
    ],
    correctIndex: 1,
    explanation: 'Dankbaar betekent dat je blij en voldaan bent met de hulp en het mooie resultaat.',
    wordHelp: [
      {
        word: 'dankbaar',
        breakdown: 'dank + baar',
        dutchMeaning: 'vol dankbaarheid en vreugde.',
        englishMeaning: 'Grateful / thankful'
      }
    ]
  },

  // --- GROEP 5-6 (HEMALI) ---
  {
    id: 'cito_h_1',
    curriculumLevel: 'Groep 5-6 (M5-E6)',
    skillTested: 'Signaalwoorden van tegenstelling (desondanks / nochtans)',
    contextHeader: '✨ Teleportatie naar het Oerwoud',
    passage: 'De nachtjungle van Taman Negara was pikdonker en gehuld in een dichte nevel. Hemali voelde **desondanks** geen enkele aarzeling toen haar saffieren amulet begon te gloeien voor de sprong door de ruimte.',
    question: 'Wat betekent het woord "**desondanks**" in deze tekst?',
    options: [
      'Als gevolg van de duisternis',
      'Toch / ondanks dat het donker en mistig was',
      'Vrijwel onmiddellijk daarna',
      'Helemaal niet meer mogelijk'
    ],
    correctIndex: 1,
    explanation: '"Desondanks" drukt een tegenstelling uit: alhoewel het donker en eng was, voelde ze toch geen aarzeling.',
    wordHelp: [
      {
        word: 'desondanks',
        dutchMeaning: 'toch, alhoewel er een belemmering is.',
        englishMeaning: 'Nevertheless / despite that'
      },
      {
        word: 'teleportatie',
        dutchMeaning: 'het bliksemsnel verplaatsen van de ene plek naar de andere.',
        englishMeaning: 'Teleportation'
      }
    ]
  },
  {
    id: 'cito_h_2',
    curriculumLevel: 'Groep 5-6 (M5-E6)',
    skillTested: 'Signaalwoorden van gevolg (daardoor / doordat)',
    contextHeader: '🐒 Het raadsel van het zombie-aapje',
    passage: 'Hemali ontdekte dat het zombie-aapje niet kwaadaardig was, maar gevangen zat in een slaapwandelende maanbetovering. **Daardoor** begreep zij direct dat ze geen wapens, maar de juiste Nederlandse toverrijmspreuk nodig had om hem te verlossen.',
    question: 'Welk verband drukt het woord "**Daardoor**" uit?',
    options: [
      'Een opsomming van magische kruiden',
      'Een logisch gevolg van haar ontdekking over de maanbetovering',
      'Een tegenstelling met wat de olifant zei',
      'Een tijdsbepaling in de vroege ochtend'
    ],
    correctIndex: 1,
    explanation: '"Daardoor" koppelt het inzicht (oorzaak) aan haar slimme besluit om een toverrijm te gebruiken (gevolg).',
    wordHelp: [
      {
        word: 'daardoor',
        dutchMeaning: 'om die reden, als gevolg daarvan.',
        englishMeaning: 'As a result / therefore'
      },
      {
        word: 'zombie-aapje',
        breakdown: 'zombie + aapje',
        dutchMeaning: 'een betoverd aapje dat ronddoolt in het donker.',
        englishMeaning: 'Enchanted zombie monkey'
      }
    ]
  },
  {
    id: 'cito_h_3',
    curriculumLevel: 'Groep 5-6 (M5-E6)',
    skillTested: 'Complexe verwijswoorden (deze / waarmee)',
    contextHeader: '🐘 De Wijze Olifant Raja & Girafje Appel',
    passage: 'De wijze olifant Raja wees met zijn slurf naar een jong gevlekt diertje. **Waarmee** Hemali de kleine babygiraf kon voeden, was een schaal met gouden acaciabladeren. **Deze** dronk het diertje echter niet, maar knabbelde er gretig op los.',
    question: 'Waar verwijst het woord "**Deze**" in de laatste zin naar?',
    options: [
      'De wijze olifant Raja',
      'De schaal met gouden acaciabladeren',
      'De kleine babygiraf (Appel)',
      'Het tovernotitieboek'
    ],
    correctIndex: 2,
    explanation: '"Deze" fungeert hier als aanwijzend voornaamwoord dat terugslaat op het onderwerp van de handeling: de kleine babygiraf.',
    wordHelp: [
      {
        word: 'girafje',
        breakdown: 'giraf + je',
        dutchMeaning: 'een jong girafje met lange poten en vlekjes.',
        englishMeaning: 'Baby giraffe'
      }
    ]
  },
  {
    id: 'cito_h_4',
    curriculumLevel: 'Groep 5-6 (M5-E6)',
    skillTested: 'Hoofdgedachte & Cito Doorstroomtoets Vraagstelling',
    contextHeader: '🌿 De Meester-Ontdekkingsreiziger',
    passage: 'Echte ontdekkingsreizigers veroveren geen natuurgebieden, maar leren luisteren naar de bewoners van het oerwoud. Door vriendschap te sluiten met het verloste zombie-aapje, de wijze pratende olifant Raja en het geadopteerde babygirafje Appel, bewees Hemali dat medeleven en scherpzinnige taalvaardigheid de allergrootste magische krachten zijn.',
    question: 'Wat is de **hoofdgedachte** van deze alinea?',
    options: [
      'Olifanten eten uitsluitend acaciabladeren in het wild.',
      'Een ware ontdekkingsreiziger overwint door te luisteren, vriendschap te sluiten en wijsheid te tonen.',
      'Teleportatie werkt alleen wanneer de maan vol is.',
      'Giraffen kunnen beter praten dan apen in de jungle.'
    ],
    correctIndex: 1,
    explanation: 'De kernboodschap is dat luisteren, medeleven en wijsheid kenmerkend zijn voor een ware ontdekkingsreiziger.',
    wordHelp: [
      {
        word: 'onverschrokken',
        breakdown: 'on + verschrokken',
        dutchMeaning: 'zonder angst, heel dapper.',
        englishMeaning: 'Fearless / brave'
      },
      {
        word: 'eendracht',
        breakdown: 'een + dracht',
        dutchMeaning: 'harmonieus samenwerken voor een goed doel.',
        englishMeaning: 'Unity / solidarity'
      }
    ]
  },
  {
    id: 'cito_h_5',
    curriculumLevel: 'Groep 5-6 (M5-E6)',
    skillTested: 'Signaalwoorden van opsomming (bovendien / tevens)',
    contextHeader: '📜 Het Oude Perkament van de Tempel',
    passage: 'De tempelwachters hadden een waarschuwing in het graniet gebeiteld. Het pad naar de bergtop was steil en bezaaid met losse keien. **Bovendien** veranderde de stand van de sterren elk uur, waardoor gewone kompassen nutteloos werden.',
    question: 'Welke functie heeft het woord "**Bovendien**" in deze tekst?',
    options: [
      'Het geeft een tegenstelling aan met de stenen',
      'Het voegt een extra moeilijkheid of argument toe aan de opsomming',
      'Het legt uit waarom het pad naar beneden loopt',
      'Het verklaart hoe laat het precies is'
    ],
    correctIndex: 1,
    explanation: '"Bovendien" is een signaalwoord van opsomming: het voegt een extra belemmering toe aan de al genoemde gevaren.',
    wordHelp: [
      {
        word: 'bovendien',
        dutchMeaning: 'daarbovenop, ook nog eens.',
        englishMeaning: 'Furthermore / moreover'
      }
    ]
  },
  {
    id: 'cito_h_6',
    curriculumLevel: 'Groep 5-6 (M5-E6)',
    skillTested: 'Verwijswoorden & Voornaamwoorden (hetgeen / welk)',
    contextHeader: '🐘 De Telepathische Boodschap van Raja',
    passage: 'Raja sloot zijn ogen en stuurde een warme gedachte naar Hemali, **hetgeen** haar met hernieuwde moed vervulde. Zonder te twijfelen stapte zij op de gloeiende runensteen.',
    question: 'Waar verwijst het woord "**hetgeen**" naar?',
    options: [
      'De gloeiende runensteen',
      'Het feit dat Raja haar een warme gedachte stuurde',
      'Haar saffieren toverstaf',
      'De losse keien op het bergpad'
    ],
    correctIndex: 1,
    explanation: '"Hetgeen" is een betrekkelijk voornaamwoord dat terugslaat op de gehele voorafgaande handeling: het sturen van de gedachte door Raja.',
    wordHelp: [
      {
        word: 'hetgeen',
        dutchMeaning: 'wat, datgene wat net genoemd is.',
        englishMeaning: 'Which / that which'
      }
    ]
  },
  {
    id: 'cito_h_7',
    curriculumLevel: 'Groep 5-6 (M5-E6)',
    skillTested: 'Conclusies trekken & Tekstverbanden (Cito Doorstroomtoets)',
    contextHeader: '🦒 De Moessonstorm & De Redding van Appel',
    passage: 'Girafje Appel rilde niet meer van de kou, maar dronk rustig van de verse kokosmelk. Haar unieke appelvormige vlekjes kleurden weer warm goudbruin in de opkomende zon. Hemali noteerde in haar expeditielogboek dat het herstel voorspoedig verliep.',
    question: 'Welke conclusie kun je met zekerheid trekken uit deze passage?',
    options: [
      'Appel is bang voor de zon geworden',
      'De toestand van het babygirafje is aanzienlijk verbeterd door Hemali’s goede verzorging',
      'Hemali is haar logboek kwijtgeraakt in de moessonstorm',
      'Raja heeft alle kokosmelk zelf opgedronken'
    ],
    correctIndex: 1,
    explanation: 'Dat Appel niet meer rilt, rustig drinkt en haar vlekjes weer warm kleuren toont aan dat haar toestand sterk verbeterd is.',
    wordHelp: [
      {
        word: 'voorspoedig',
        breakdown: 'voor + spoedig',
        dutchMeaning: 'zeer gunstig en vlot verlopend.',
        englishMeaning: 'Prosperous / favorable / smooth'
      }
    ]
  },
  {
    id: 'cito_h_8',
    curriculumLevel: 'Groep 5-6 (M5-E6)',
    skillTested: 'Tekstdoel & Toon van de Auteur',
    contextHeader: '👑 Het Zegel van Harmonie',
    passage: 'Wie de taal van de natuur begrijpt en signaalwoorden met logica weet te ontcijferen, kan elke betovering doorbreken. Taal is geen verzameling losse regels, maar een sleutel tot vriendschap tussen mens en dier.',
    question: 'Wat is het belangrijkste **doel** van de schrijver met deze uitspraak?',
    options: [
      'Uitleggen hoe je een stethoscoop moet repareren',
      'De lezer inspireren dat taalvaardigheid en logica waardevolle instrumenten zijn voor begrip en verbinding',
      'Waarschuwen voor stormen in de jungle',
      'Bewijzen dat runenstenen gevaarlijk zijn'
    ],
    correctIndex: 1,
    explanation: 'De schrijver wil de lezer inspireren dat taalbegrip en logica de sleutel zijn tot empathie, vriendschap en probleemoplossing.',
    wordHelp: [
      {
        word: 'harmonie',
        dutchMeaning: 'een toestand waarin alles mooi en vredig met elkaar samenwerkt.',
        englishMeaning: 'Harmony / peace'
      }
    ]
  }
];

export interface RpgPage {
  pageNumber: number;
  title: string;
  biome: string;
  storyText: string;
  targetWords: {
    word: string;
    breakdown?: string;
    dutchMeaning: string;
    englishMeaning: string;
  }[];
  mysteryQuestion?: {
    clueTitle: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  choices: {
    label: string;
    nextPage: number;
    skillBonus: string;
    icon: string;
  }[];
}

export interface StoryCampaign {
  id: string;
  protagonistId: 'ridheya' | 'hemali' | 'both';
  title: string;
  subtitle: string;
  location: string;
  badge: string;
  themeEmoji: string;
  recommendedGrade: string;
  pages: RpgPage[];
}

// =========================================================================
// CAMPAIGN 1: RIDHEYA - DIERENARTS IN MALEISIË (GROEP 3-4 / AVI M3-E4)
// =========================================================================
export const RIDHEYA_MALAYSIA_PAGES: RpgPage[] = [
  {
    pageNumber: 1,
    title: 'De Dierenarts van Kuala Lumpur (De Gewonde Zwerfhond)',
    biome: 'Tropische Stad in Maleisië',
    storyText: `Ridheya loopt met een grote glimlach door de levendige straatjes van Kuala Lumpur in Maleisië. Aan haar schouder hangt haar gloednieuwe rode **dierenartstas**. Achter haar ronde brilglazen speurt ze aandachtig rond naar dieren in nood. De geur van zoete mango’s en jasmijn vult de warme stadslucht.

Opeens hoort Ridheya een zacht, zielig gepiep achter een felgekleurde fruitkraam. Ze knielt neer en ontdekt een magere, harige **zwerfhond**. Het diertje heeft een pijnlijk wondje aan zijn voorpoot door gebroken glas. 

"Maak je geen zorgen, lief hondje," fluistert Ridheya vriendelijk. Een vrolijke jongen met een bakfiets stopt nieuwsgierig. "Hoi, ik ben Amir!" roept hij. "Kan ik je helpen met die gewonde hond?" Ridheya knikt blij: "Ja graag Amir! Ik ben dierenarts Ridheya, en wij gaan dit dier redden!"`,
    targetWords: [
      {
        word: 'dierenartstas',
        breakdown: 'dierenarts + tas',
        dutchMeaning: 'een tas met medische spulletjes zoals verband en zalf om zieke dieren te verzorgen.',
        englishMeaning: 'Veterinarian medical bag'
      },
      {
        word: 'zwerfhond',
        breakdown: 'zwerf + hond',
        dutchMeaning: 'een trouwe straathond zonder vast baasje.',
        englishMeaning: 'Stray dog / street dog'
      },
      {
        word: 'pootafdruk',
        breakdown: 'poot + afdruk',
        dutchMeaning: 'het spoor dat een dierenpootje achterlaat in het zand.',
        englishMeaning: 'Paw print'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🔍 Dierenarts Diagnose #1',
      question: 'Wat is er aan de hand met de zwerfhond die Ridheya vindt?',
      options: [
        'De hond is verdwaald in een kasteel.',
        'De hond heeft een pijnlijk wondje aan zijn pootje door gebroken glas.',
        'De hond wil alleen maar ijsjes eten.',
        'De hond heeft een toverstok ingeslikt.'
      ],
      correctIndex: 1,
      explanation: 'Ridheya ziet dat het hondje een pijnlijk wondje aan zijn voorpootje heeft opgelopen.'
    },
    choices: [
      {
        label: 'Open de dierenartstas en maak het pootje schoon met zacht water',
        nextPage: 2,
        skillBonus: '+15 Dierenverzorging & Woordenschat',
        icon: '🩹'
      },
      {
        label: 'Vraag vriend Amir om Kopi de hond op zijn bakfiets naar de kliniek te brengen',
        nextPage: 2,
        skillBonus: '+15 Samenwerking & Vriendschap',
        icon: '🚲'
      }
    ]
  },
  {
    pageNumber: 2,
    title: 'Het Gevaarlijke Steentje & De Blauwe IJsvogel',
    biome: 'Tropische Straatmarkt',
    storyText: `Terwijl Ridheya voorzichtig het pootje van de hond verzorgt met schoon **verbandgaas**, klinkt er plotseling een scherp geluid boven de grote banyanboom. Een ondeugende straatjongen schiet met een katapult en een klein **steentje** schampt een prachtige vogel!

Een schitterende tropische **ijsvogel** met felblauwe en oranje veertjes fladdert geschrokken omlaag en landt in een zachte rieten mand vol bananenbladeren. De vleugel hangt een beetje slap.

"Kijk daar!" roept een vriendelijk meisje dat net aan komt rennen met een kom schoon drinkwater. "Ik ben Mei-Ling! Ik zag het gebeuren!" Ridheya pakt meteen haar vergrootglas. "Geen paniek Mei-Ling en Amir," zegt Ridheya vastberaden. "De vleugel is alleen gekneusd. Met goede zorg kan deze prachtige vogel snel weer vliegen!"`,
    targetWords: [
      {
        word: 'verbandgaas',
        breakdown: 'verband + gaas',
        dutchMeaning: 'zacht wit doek om wonden mee af te dekken en te beschermen tegen vuil.',
        englishMeaning: 'Bandage gauze'
      },
      {
        word: 'steentje',
        breakdown: 'steen + tje',
        dutchMeaning: 'een klein hard keitje.',
        englishMeaning: 'Little stone / pebble'
      },
      {
        word: 'ijsvogel',
        breakdown: 'ijs + vogel',
        dutchMeaning: 'een opvallend mooie vogel met glanzende blauwe en oranje veertjes.',
        englishMeaning: 'Kingfisher (bird)'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🩺 Oorzaak & Gevolg Clue',
      question: 'Waarom viel de tropische ijsvogel in de rieten mand?',
      options: [
        'Omdat hij wilde slapen op de bananenbladeren.',
        'Omdat hij per ongeluk geraakt werd door een rondvliegend steentje.',
        'Omdat het heel hard begon te sneeuwen.',
        'Omdat hij bang was voor Mei-Ling.'
      ],
      correctIndex: 1,
      explanation: 'In de tekst staat dat het steentje de vogel schampte waardoor zijn vleugel gekneusd raakte.'
    },
    choices: [
      {
        label: 'Leg de ijsvogel voorzichtig op een zacht kussen in Mei-Lings tuin',
        nextPage: 3,
        skillBonus: '+20 Leesvaardigheid & Begrijpend Lezen',
        icon: '🪶'
      },
      {
        label: 'Gebruik de stethoscoop om naar de rustige hartslag van de vogel te luisteren',
        nextPage: 3,
        skillBonus: '+20 Dierenarts Kennis',
        icon: '🩺'
      }
    ]
  },
  {
    pageNumber: 3,
    title: 'De Geheime Tuinkliniek van Amir en Mei-Ling',
    biome: 'Lommerrijke Stadstuin in Georgetown',
    storyText: `Samen wandelt het drietal naar de rustige binnentuin van Mei-Ling. Tussen de bloeiende orchideeën en palmbomen hebben ze een prachtige **tuinkliniek** ingericht. Ridheya legt Kopi de hond op een koel bamboematje en geeft hem een kommetje rijst met gekookte vis.

Vervolgens legt dierenarts Ridheya een minuscuul spalkje aan bij de blauwe ijsvogel, zodat de veertjes kunnen rusten. "Kijk," wijst Amir trots, "Kopi kwispelt alweer met zijn staart!" Mei-Ling brengt verse mangosap voor iedereen.

"Wij zijn nu een echt team," glimlacht Ridheya terwijl ze haar bril rechtzet. "De Dierenredders van Maleisië! Zolang we dieren met liefde en geduld verzorgen, komt de **genezing** altijd snel." Boven hen fluiten de vogels in koor.`,
    targetWords: [
      {
        word: 'tuinkliniek',
        breakdown: 'tuin + kliniek',
        dutchMeaning: 'een rustige plek in een tuin waar zieke dieren worden behandeld en verzorgd.',
        englishMeaning: 'Garden rescue clinic'
      },
      {
        word: 'genezing',
        dutchMeaning: 'het proces waarin een wondje of ziekte weer helemaal overgaat en beter wordt.',
        englishMeaning: 'Healing / recovery'
      },
      {
        word: 'dierenredder',
        breakdown: 'dieren + redder',
        dutchMeaning: 'een dapper persoon die dieren beschermt en in veiligheid brengt.',
        englishMeaning: 'Animal rescuer'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🤝 Vriendschap & Begrip Clue',
      question: 'Hoe heten de twee menselijke vrienden die Ridheya in Maleisië ontmoet?',
      options: [
        'Simba en Ollie',
        'Amir en Mei-Ling',
        'Harry en Ron',
        'Klaas en Jan'
      ],
      correctIndex: 1,
      explanation: 'Amir (met de bakfiets) en Mei-Ling (met de binnentuin) zijn Ridheya’s twee trouwe menselijke vrienden.'
    },
    choices: [
      {
        label: 'Vier het herstel van Kopi en de ijsvogel met het hele dierenredder-team',
        nextPage: 4,
        skillBonus: '+25 Zelfvertrouwen & Sociale Vaardigheden',
        icon: '🎉'
      },
      {
        label: 'Maak een officieel Dierenarts-Dossier voor alle stadsdieren van Kuala Lumpur',
        nextPage: 4,
        skillBonus: '+25 Woordenschat & Grammatica',
        icon: '📋'
      }
    ]
  },
  {
    pageNumber: 4,
    title: 'Het Grote Dierenfeest in de Stad',
    biome: 'Kleurrijk Stadsplein bij Zonsondergang',
    storyText: `De volgende ochtend is het feest in de Maleisische wijk! Kopi de zwerfhond loopt weer vrolijk en stevig op al zijn vier pootjes rond. De blauwe ijsvogel spreidt zijn glinsterende vleugels uit, zingt een zuiver liedje en vliegt sierlijk naar de top van een bloeiende frangipaniboom.

Alle marktkramers klappen enthousiast voor de jonge dierenarts. De burgemeester overhandigt Ridheya, Amir en Mei-Ling een schitterende gouden medaille: *"Voor heldhaftige dierenliefde, trouwe vriendschap en uitzonderlijke verzorging."*

Ridheya aait Kopi nog een laatste keer over zijn zachte oren. "Elk dier verdient een veilig thuis," zegt ze met een stralende lach. Dit Maleisische avontuur zal ze nooit meer vergeten!`,
    targetWords: [
      {
        word: 'heldhaftig',
        breakdown: 'held + haftig',
        dutchMeaning: 'heel erg dapper en dapper handelend als een echte held.',
        englishMeaning: 'Heroic / courageous'
      },
      {
        word: 'dankbaar',
        breakdown: 'dank + baar',
        dutchMeaning: 'blij en erkentelijk voor de hulp die je van iemand hebt gekregen.',
        englishMeaning: 'Grateful / thankful'
      },
      {
        word: 'feestelijk',
        breakdown: 'feest + elijk',
        dutchMeaning: 'vrolijk en feestelijk aangekleed ter ere van een mooie gebeurtenis.',
        englishMeaning: 'Festive / celebratory'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🏆 Eind Clue: Hoofdgedachte',
      question: 'Wat is de belangrijkste les van Ridheya’s avontuur in Maleisië?',
      options: [
        'Je moet altijd stenen gooien naar vogels.',
        'Met goede dierenzorg, vriendschap en samenwerking kun je elk dier in nood redden.',
        'Zwerfhonden houden niet van vis en rijst.',
        'Het is te warm om dieren te helpen in de stad.'
      ],
      correctIndex: 1,
      explanation: 'De kern is dat Ridheya met haar dierenartskennis en de hulp van haar vrienden de dieren heeft gered.'
    },
    choices: [
      {
        label: 'Ga op zoek naar de zeldzame dwerghertjes in het mangrovebos',
        nextPage: 5,
        skillBonus: '+30 Tropische Natuurkennis',
        icon: '🦌'
      },
      {
        label: 'Open een permanente Dierenredders-Post met Amir en Mei-Ling',
        nextPage: 5,
        skillBonus: '+30 Leiderschap & Woordenschat',
        icon: '🏥'
      }
    ]
  },
  {
    pageNumber: 5,
    title: 'Het Geheim van de Mangrove Dwerghertjes (Kancil)',
    biome: 'Betoverend Mangrovemoeras bij Eb',
    storyText: `Met Kopi de hond vrolijk voorop varen Ridheya, Amir en Mei-Ling in een houten kano door het rustige mangrovebos. Tussen de grillige luchtwortels ontdekt Ridheya met haar vergrootglas een schuw mini-hertje: een Maleisische **dwerghert** oftewel *Sang Kancil*!
    
Het kleintje zit vast met zijn pootje in een achtergelaten visnet. "Rustig maar, dapper hertje," fluistert Ridheya. "Ik knip het net los met mijn botte medische schaar." 
    
Amir houdt de kano stabiel, terwijl Mei-Ling verse waterhyacinten aanbiedt om het hertje te kalmeren. Met een zachte knip is het diertje **bevrijd**! Het dwerghertje maakt een sierlijke vreugdesprong op de oever.`,
    targetWords: [
      {
        word: 'dwerghert',
        breakdown: 'dwerg + hert',
        dutchMeaning: 'een heel klein, schattig tropisch hertje dat in Zuidoost-Azië leeft.',
        englishMeaning: 'Lesser mouse-deer / Kancil'
      },
      {
        word: 'bevrijd',
        dutchMeaning: 'losgemaakt uit gevaar of gevangenschap.',
        englishMeaning: 'Liberated / freed'
      },
      {
        word: 'mangrovebos',
        breakdown: 'mangrove + bos',
        dutchMeaning: 'een bos van bomen met speciale wortels die in zout kustwater groeien.',
        englishMeaning: 'Mangrove forest'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🦌 Mangrove Natuur Clue #5',
      question: 'Waarom zat het Maleisische dwerghertje (Sang Kancil) vast?',
      options: [
        'Het zat vast in een achtergelaten visnet tussen de wortels.',
        'Het was in slaap gevallen op een boot.',
        'Het wilde met Kopi de hond spelen.',
        'Het was verdwaald in een drukke winkelstraat.'
      ],
      correctIndex: 0,
      explanation: 'Ridheya zag dat het hertje vastzat in een oud visnet en knipte het voorzichtig los.'
    },
    choices: [
      {
        label: 'Plaats een waarschuwingsbord om de mangroven schoon te houden',
        nextPage: 6,
        skillBonus: '+35 Milieuzorg & Begrijpend Lezen',
        icon: '🪧'
      },
      {
        label: 'Keer terug naar de tuinkliniek voor de feestelijke diploma-uitreiking',
        nextPage: 6,
        skillBonus: '+35 Zelfvertrouwen & Woordenschat',
        icon: '🎓'
      }
    ]
  },
  {
    pageNumber: 6,
    title: 'De Meester-Dierenarts van Maleisië',
    biome: 'Gouden Zonsondergang aan de Straat van Malakka',
    storyText: `De zon zakt als een vurige oranje bol in de oceaan. Kopi ligt tevreden aan Ridheya’s voeten, de blauwe ijsvogel zingt vanaf het dak en in de verte graast het geredde dwerghertje veilig aan de bosrand.
    
Mei-Ling en Amir overhandigen Ridheya een handgemaakt certificaat: *"Ridheya - Eerste Hoofd-Dierenarts van Maleisië"*. Ridheya kijkt door haar ronde bril naar haar vrienden en glimlacht met haar hele hart.
    
"Dieren verzorgen en de natuur beschermen is het mooiste wat er is," zegt Ridheya trots. Met haar dierenartstas over haar schouder is ze klaar voor elk nieuw reddingsavontuur ter wereld!`,
    targetWords: [
      {
        word: 'zonsondergang',
        breakdown: 'zon + s + ondergang',
        dutchMeaning: 'het moment waarop de zon aan het einde van de dag achter de horizon verdwijnt.',
        englishMeaning: 'Sunset'
      },
      {
        word: 'beschermen',
        dutchMeaning: 'ervoor zorgen dat iemand of iets veilig blijft voor gevaar.',
        englishMeaning: 'To protect / safeguard'
      },
      {
        word: 'certificaat',
        dutchMeaning: 'een officieel bewijsdocument dat je iets heel goed hebt geleerd of volbracht.',
        englishMeaning: 'Certificate / diploma'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🏆 Grote Finale Clue #6',
      question: 'Wat heeft Ridheya bewezen tijdens haar reis door Maleisië?',
      options: [
        'Dat ze met liefde, kennis en goede vrienden elk dier in nood kan helpen en beschermen.',
        'Dat je beter niet in de buurt van mangroves kunt komen.',
        'Dat fruitkramen gevaarlijk zijn.',
        'Dat een stethoscoop alleen voor olifanten werkt.'
      ],
      correctIndex: 0,
      explanation: 'Ridheya heeft bewezen dat dierenliefde, medische zorg en vriendschap alle dieren redden.'
    },
    choices: [
      {
        label: '🩺 Start opnieuw of kies een ander Cito RPG Avontuur',
        nextPage: 1,
        skillBonus: 'Maleisië Missie Volledig Voltooid! 🌟',
        icon: '🔄'
      }
    ]
  }
];

// =========================================================================
// CAMPAIGN 2: HEMALI - MAGISCH OERWOUD & TELEPORTATIE (GROEP 5-6 / CITO PREP)
// =========================================================================
export const HEMALI_JUNGLE_PAGES: RpgPage[] = [
  {
    pageNumber: 1,
    title: 'De Nachtelijke Teleportatie naar het Oerwoud',
    biome: 'Betoverd Oerwoud (Taman Negara)',
    storyText: `Hemali draaide geconcentreerd aan het saffieren tandwiel van haar magische amulet. In een oogverblindende flits van azuurblauw licht voltrok de **teleportatie** zich geruisloos. Binnen een fractie van een seconde stond zij midden in het oeroude regenwoud van Taman Negara.

Het was middernacht. Boven haar hoofd vormden reusachtige woudreuzen een dicht bladerdak, waartussen het zilveren maanlicht filterde. Fluorescerende paddenstoelen gaven een zachtgroene gloed af aan de kronkelige lianen. Hemali opende haar tovernotitieboek.

Zij trainde vastberaden om een volleerde **ontdekkingsreiziger** te worden. De jungle was geheimzinnig en vol onbekende geluiden; **desondanks** voelde Hemali geen spoor van vrees. Haar scherpe intellect en magische kompas zouden haar feilloos door de nachtelijke wildernis loodsen.`,
    targetWords: [
      {
        word: 'teleportatie',
        dutchMeaning: 'het magisch of wetenschappelijk verplaatsen van de ene plek naar de andere in een oogwenk.',
        englishMeaning: 'Teleportation / instant travel'
      },
      {
        word: 'ontdekkingsreiziger',
        breakdown: 'ontdekking + reiziger',
        dutchMeaning: 'iemand die onbekende gebieden verkent om geheimen, dieren of landen te ontdekken.',
        englishMeaning: 'Explorer'
      },
      {
        word: 'desondanks',
        dutchMeaning: 'toch, alhoewel er gevaar of een belemmering is.',
        englishMeaning: 'Nevertheless / despite this'
      }
    ],
    mysteryQuestion: {
      clueTitle: '✨ Signaalwoord & Logica Clue #1',
      question: 'Welk verband geeft het signaalwoord "**desondanks**" aan in de laatste alinea?',
      options: [
        'Een chronologische tijdsvolgorde',
        'Een tegenstelling: al was het woud eng en donker, ze was toch niet bang',
        'Een oorzaak van de teleportatieflits',
        'Een opsomming van magische paddenstoelen'
      ],
      correctIndex: 1,
      explanation: '"Desondanks" markeert een tegenstelling tussen de enge jungle en haar moedige gemoedstoestand.'
    },
    choices: [
      {
        label: 'Volg de oplichtende lianen dieper het nachthoorwoud in',
        nextPage: 2,
        skillBonus: '+15 Signaalwoorden & Leesbegrip',
        icon: '🌿'
      },
      {
        label: 'Gebruik het magische kompas om de oude tempelruïne te lokaliseren',
        nextPage: 2,
        skillBonus: '+15 Cito Logica & Deductie',
        icon: '🧭'
      }
    ]
  },
  {
    pageNumber: 2,
    title: 'Het Raadsel van het Betoverde Zombie-Aapje',
    biome: 'Nachtelijke Tempelruïne in de Mist',
    storyText: `Een ritselend geluid in het bamboestruikgewas trok Hemali’s aandacht. Vanuit een overhangende tak sprong een merkwaardig wezen tevoorschijn: een **zombie-aapje** met paars gloeiende ogen en een warrig vachtje. Het diertje maakte komische, ongecontroleerde sprongetjes en sprak in omgekeerde raadsels!

Hemali bestudeerde de oude inscripties op het tempelaltaar. Zij ontdekte dat het aapje helemaal niet kwaadaardig was, maar gevangen zat in een slaapwandelende maanbetovering. **Daardoor** begreep zij onmiddellijk wat haar te doen stond.

Zij sprak met heldere stem de zuivere Nederlandse tegenbezwering uit: *"Klaarheid in de nacht, verbreek de vloek met zachte kracht!"* De paarse gloed vervaagde tot een warme gouden glans. Het aapje gaf een opgelucht gilletje, maakte een salto en nestelde zich dankbaar op Hemali’s schouder als haar nieuwe trouwe gids Zazu!`,
    targetWords: [
      {
        word: 'zombie-aapje',
        breakdown: 'zombie + aapje',
        dutchMeaning: 'een ondeugend aapje dat door een maanvloek als een zombie ronddoolde.',
        englishMeaning: 'Enchanted zombie monkey'
      },
      {
        word: 'daardoor',
        dutchMeaning: 'om die specifieke reden, als logisch gevolg van het eerdere inzicht.',
        englishMeaning: 'As a result / therefore'
      },
      {
        word: 'nachtmist',
        breakdown: 'nacht + mist',
        dutchMeaning: 'geheimzinnige nevel die tijdens de nacht over de bomen hangt.',
        englishMeaning: 'Night mist / nocturnal fog'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🐒 Oorzaak & Gevolg Clue #2',
      question: 'Waarom gedroeg het zombie-aapje zich zo merkwaardig volgens de tempelinscriptie?',
      options: [
        'Omdat hij teveel bananen had gegeten.',
        'Omdat hij betoverd was door een slaapwandelende maanvloek.',
        'Omdat hij Hemali wilde laten schrikken voor de grap.',
        'Omdat het vroor in de jungle.'
      ],
      correctIndex: 1,
      explanation: 'Hemali las op de tempelstenen dat het diertje gevangen zat in een magische maanbetovering.'
    },
    choices: [
      {
        label: 'Volg Zazu het aapje naar de Geheime Waterbron van de Olifanten',
        nextPage: 3,
        skillBonus: '+20 Verwijswoorden & Zinsbouw',
        icon: '🐒'
      },
      {
        label: 'Teleporteer samen met Zazu naar de heilige bamboepoel',
        nextPage: 3,
        skillBonus: '+20 Magische Vaardigheid & Signaalwoorden',
        icon: '✨'
      }
    ]
  },
  {
    pageNumber: 3,
    title: 'De Wijze Pratende Olifant Raja & Baby Giraf Appel',
    biome: 'Heilige Bamboepoel',
    storyText: `Aan de rand van een kristalheldere bron stond een kolossale, majestueuze olifant met zilveren slagtanden. Tot Hemali’s grote verwondering boog het reusachtige dier het hoofd en sprak hij met een diepe, warme stem: *"Gegroet, jonge ontdekkingsreiziger Hemali. Ik ben Raja, de hoeder van dit oerwoud."*

Raja wees met zijn reusachtige slurf naar een bosje geurende waterlelies. Daarachter schuilde een pasgeboren, weerloos **girafje** met unieke appelvormige vlekjes op haar zachte vacht. **Bovendien** was het diertje haar moeder kwijtgeraakt tijdens een zware moessonstorm.

Hemali voelde onmiddellijk een diepe band. Zij knielde neer en fluisterde: *"Ik zal voor je zorgen. Jouw naam is Appel!"* Het girafje knipperde met haar lange wimpers en legde haar kinnetje teder in Hemali’s handpalmen. Hemali had haar eerste magische dierenvriend geadopteerd!`,
    targetWords: [
      {
        word: 'girafje',
        breakdown: 'giraf + je',
        dutchMeaning: 'een jong girafje met een lange slanke nek en een zachte gevlekte vacht.',
        englishMeaning: 'Baby giraffe'
      },
      {
        word: 'bovendien',
        dutchMeaning: 'ook nog eens, daarbovenop als extra toevoeging.',
        englishMeaning: 'Furthermore / moreover'
      },
      {
        word: 'weelderig',
        dutchMeaning: 'overvloedig en rijk groeiend in de natuur.',
        englishMeaning: 'Lush / exuberant'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🦒 Signaalwoord van Opsomming Clue #3',
      question: 'Welke extra informatie wordt gegeven na het signaalwoord "**Bovendien**"?',
      options: [
        'Dat Raja een gouden kroon droeg.',
        'Dat babygiraf Appel haar moeder was kwijtgeraakt tijdens een moessonstorm.',
        'Dat het zombie-aapje honger had gekregen.',
        'Dat de bron droog was komen te staan.'
      ],
      correctIndex: 1,
      explanation: '"Bovendien" introduceert het extra feit dat het girafje door de storm haar moeder kwijt was geraakt.'
    },
    choices: [
      {
        label: 'Vorm een verbond tussen Raja de olifant, girafje Appel en Zazu de aap',
        nextPage: 4,
        skillBonus: '+25 Samenvatten & Cito Inzicht',
        icon: '👑'
      },
      {
        label: 'Gebruik Hemali’s detective-notitieboek om een veilige woudroute te tekenen',
        nextPage: 4,
        skillBonus: '+25 Hoofdgedachte & Tekststructuur',
        icon: '📜'
      }
    ]
  },
  {
    pageNumber: 4,
    title: 'De Meester-Ontdekkingsreiziger en haar Dierenleger',
    biome: 'Top van de Oerwoudtempel bij Zonsopgang',
    storyText: `Toen de eerste zonnestralen door de ochtendmist braken, stonden Hemali en haar nieuwe dierenvrienden verenigd op het tempelplateau. Dankzij haar **onverschrokken** karakter, haar magische teleportatiegaven en haar scherpzinnige taalvaardigheid had zij het evenwicht in het oerwoud hersteld.

Raja de wijze olifant overhandigde Hemali het Geheime Zegel van de Jungle: *"Jij hebt bewezen dat luisteren, medeleven en verstand sterker zijn dan welke duistere spreuk ook."* 

Babygiraf Appel huppelde vrolijk rondjes om Hemali heen, terwijl Zazu het aapje bloemenkransen strooide. Hemali sloeg haar toverboek dicht met een glimlach van pure voldoening. Zij was nu een volwaardige meester-ontdekkingsreiziger, klaar voor elk nieuw Cito- en taalmysterie dat op haar pad zou komen!`,
    targetWords: [
      {
        word: 'onverschrokken',
        breakdown: 'on + verschrokken',
        dutchMeaning: 'zonder vrees, buitengewoon dapper en moedig.',
        englishMeaning: 'Fearless / undaunted'
      },
      {
        word: 'eendracht',
        breakdown: 'een + dracht',
        dutchMeaning: 'het eensgezind en harmonieus samenwerken voor een edel doel.',
        englishMeaning: 'Unity / solidarity'
      },
      {
        word: 'ontzagwekkend',
        breakdown: 'ontzag + wekkend',
        dutchMeaning: 'zo groots of indrukwekkend dat het diepe bewondering oproept.',
        englishMeaning: 'Awe-inspiring / magnificent'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🏆 Hoofdgedachte & Cito Doorstroomtoets Clue',
      question: 'Wat is de voornaamste **hoofdgedachte** van Hemali’s oerwoudavontuur?',
      options: [
        'Teleportatie is alleen mogelijk als het regent.',
        'Door moed, medeleven en scherpzinnig taalbegrip sluit een echte ontdekkingsreiziger vriendschap met alle dieren en herstelt de vrede.',
        'Zazu het aapje wilde liever in de stad wonen.',
        'Olifanten kunnen alleen \'s nachts praten.'
      ],
      correctIndex: 1,
      explanation: 'De tekst benadrukt dat luisteren, medeleven en taalvaardigheid haar tot een echte ontdekkingsreiziger maken.'
    },
    choices: [
      {
        label: 'Treed binnen in het Heiligdom van de Zonnewijzer om het kosmische raadsel te lossen',
        nextPage: 5,
        skillBonus: '+30 Complexe Tekststructuren & Cito',
        icon: '☀️'
      },
      {
        label: 'Verken samen met Raja en Appel de Verborgen Kristallengrotten',
        nextPage: 5,
        skillBonus: '+30 Signaalwoorden & Oorzaak-Gevolg',
        icon: '💎'
      }
    ]
  },
  {
    pageNumber: 5,
    title: 'Het Heiligdom van de Kosmische Zonnewijzer',
    biome: 'Heiligdom van de Oude Zonnewijzer',
    storyText: `Achter het tempelplateau doemt een eeuwenoud observatorium op. In het midden staat een reusachtige gouden zonnewijzer met glinsterende runen. "Kijk," wijst Hemali met haar saffieren staf, "de schaduw valt precies op het woord **evenwicht**."

Raja de olifant knielt neer en legt zijn slurf op het marmer. "Alleen een ontdekkingsreiziger die zowel de kracht van logica als de warmte van empathie beheerst, kan het eeuwenoude geheim ontsluiten." Babygiraf Appel stoot zachtjes met haar neusje tegen een verborgen hendel.

Plotseling klinkt er een harmonieuze klank door de vallei. Een stenen doorgang schuift geruisloos open, **waardoor** een glanzende bibliotheek vol historische perkamenten zichtbaar wordt. Hemali noteert de ontdekking zorgvuldig in haar magische logboek.`,
    targetWords: [
      {
        word: 'evenwicht',
        breakdown: 'even + wicht',
        dutchMeaning: 'een toestand waarin alle krachten gelijk en in volmaakte rust zijn.',
        englishMeaning: 'Balance / equilibrium'
      },
      {
        word: 'waardoor',
        dutchMeaning: 'met als gevolg dat (geeft een logisch gevolg aan).',
        englishMeaning: 'As a result of which / whereby'
      },
      {
        word: 'observatorium',
        dutchMeaning: 'een gebouw speciaal ingericht om de sterren, zon en natuurverschijnselen te bestuderen.',
        englishMeaning: 'Observatory'
      }
    ],
    mysteryQuestion: {
      clueTitle: '☀️ Clue #5: Oorzaak & Gevolg met "Waardoor"',
      question: 'Wat gebeurde er als direct gevolg van het openen van de stenen doorgang?',
      options: [
        'Er ontstond een storm in de vallei.',
        'Een glanzende bibliotheek vol historische perkamenten werd zichtbaar.',
        'Raja de olifant viel in slaap.',
        'Zazu het aapje raakte zijn bloemenkrans kwijt.'
      ],
      correctIndex: 1,
      explanation: 'Het woord "waardoor" geeft aan dat door de geopende doorgang de historische bibliotheek tevoorschijn kwam.'
    },
    choices: [
      {
        label: 'Ontcijfer de eeuwenoude perkamenten van de junglebeschermers',
        nextPage: 6,
        skillBonus: '+35 Wetenschappelijk Begrip & Cito Woordenschat',
        icon: '📜'
      },
      {
        label: 'Beklim het hoogste torentje voor de ceremoniële kroning tot Meester-Mage',
        nextPage: 6,
        skillBonus: '+35 Academisch Zelfvertrouwen',
        icon: '👑'
      }
    ]
  },
  {
    pageNumber: 6,
    title: 'De Meester-Mage van het Nevelwoud',
    biome: 'Hemels Plateau van de Vredeswachters',
    storyText: `Op het hoogste terras van het heiligdom staat Hemali tussen haar trouwe metgezellen. Zazu zit fier op haar schouder, babygiraf Appel vlijt zich knus tegen haar aan en Raja heft zijn slurf in een triomfantelijk saluut.

De zachte bries draagt de geur van jasmijn en verse regen door het woud. Hemali opent haar toverboek en spreekt de ultieme spreuk van verbinding uit: *"Sciens et Fidelis"* — Kennis en Trouw. Boven het woud verschijnt een schitterende regenboog van magisch noorderlicht.

Met een tevreden glimlach beseft Hemali dat echte kracht schuilt in doorzettingsvermogen, taalbeheersing en vriendschap. Haar naam staat nu voor eeuwig gegrift in de kronieken van de Jungle!`,
    targetWords: [
      {
        word: 'triomfantelijk',
        breakdown: 'triomf + antelijk',
        dutchMeaning: 'vol trots en vreugde vanwege een grote overwinning.',
        englishMeaning: 'Triumphant'
      },
      {
        word: 'doorzettingsvermogen',
        breakdown: 'doorzetting + s + vermogen',
        dutchMeaning: 'de innerlijke kracht om vol te houden, ook als het moeilijk wordt.',
        englishMeaning: 'Perseverance / grit'
      },
      {
        word: 'kronieken',
        dutchMeaning: 'geschiedenisboeken waarin belangrijke historische gebeurtenissen op volgorde worden opgeschreven.',
        englishMeaning: 'Chronicles / annals'
      }
    ],
    mysteryQuestion: {
      clueTitle: '👑 Grote Finale Clue #6: Karakter & Thema',
      question: 'Welke eigenschappen vormen volgens de tekst de bron van Hemali’s ware kracht?',
      options: [
        'Snelheid bij het wegrennen en hard schreeuwen.',
        'Doorzettingsvermogen, taalbeheersing en trouwe vriendschap.',
        'Het dragen van een gouden ring.',
        'Alleen \'s nachts wakker blijven.'
      ],
      correctIndex: 1,
      explanation: 'De tekst stelt uitdrukkelijk dat echte kracht schuilt in doorzettingsvermogen, taalbeheersing en vriendschap.'
    },
    choices: [
      {
        label: '✨ Voltooi dit avontuur of start een nieuwe Cito RPG campagne',
        nextPage: 1,
        skillBonus: 'Oerwoud Missie Volledig Voltooid! 🌟',
        icon: '🔄'
      }
    ]
  }
];

// =========================================================================
// CAMPAIGN 3: ZUSSEN SAMEN - HET ONDERZOEKSSCHIP OP DE SAVANNE
// =========================================================================
export const SISTERS_SAFARI_PAGES: RpgPage[] = [
  {
    pageNumber: 1,
    title: 'De Geheime Brief van het Onderzoeksschip',
    biome: 'Savanne Safari & Kust',
    storyText: `Hemali en Ridheya liepen voorzichtig over het smalle duinpad richting de baai. Ridheya speurde met haar **vergrootglas** naar sporen in het rulle zand, terwijl Hemali haar aantekeningenboek stevig vasthield. In de verte zagen ze een groot **onderzoeksschip** voor anker liggen. Een dichte mist trok langzaam op over het water.

Opeens zag Ridheya iets glinsteren tussen het helmgras. Het was een loden koker met een wassen zegel. "Kijk Hemali!" riep Ridheya opgewonden. "Er zit een perkamenten brief in!" Hemali bekeek de koker **achterdochtig**. Op het zegel stond het wapen van het koninklijke dierenreservaat.

"We moeten voorzichtig zijn," fluisterde Hemali. "De schipper keek daarnet niet voor niets zo schichtig om zich heen. Laten we eerst het raadsel op het zegel ontcijferen voordat we verder lopen."`,
    targetWords: [
      {
        word: 'onderzoeksschip',
        breakdown: 'onderzoek + schip',
        dutchMeaning: 'een schip speciaal gebouwd voor wetenschappelijk onderzoek op zee.',
        englishMeaning: 'Research vessel'
      },
      {
        word: 'achterdochtig',
        dutchMeaning: 'wantrouwig, als je iemand of iets niet zomaar meteen vertrouwt.',
        englishMeaning: 'Suspicious / distrustful'
      },
      {
        word: 'vergrootglas',
        breakdown: 'vergroot + glas',
        dutchMeaning: 'een bol geslepen glas waardoor kleine details duidelijk zichtbaar worden.',
        englishMeaning: 'Magnifying glass'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🔍 Clue #1: Het Wassen Zegel',
      question: 'Waarom bekeek Hemali de loden koker "achterdochtig"?',
      options: [
        'Omdat ze bang was dat het kistje van chocola was gemaakt.',
        'Omdat de situatie vreemd was en de schipper zich verdacht gedroeg.',
        'Omdat Ridheya haar bril was vergeten.',
        'Omdat het begon te sneeuwen op het strand.'
      ],
      correctIndex: 1,
      explanation: 'Achterdochtig betekent wantrouwig: de verdachte sfeer en de schichtige schipper maakten haar alert.'
    },
    choices: [
      {
        label: 'Breek het wassen zegel en lees de geheime boodschap hardop voor',
        nextPage: 2,
        skillBonus: '+15 Leesvaardigheid & Signaalwoorden',
        icon: '📜'
      },
      {
        label: 'Volg eerst de pootafdrukken van een ontsnapt safaridier het bos in',
        nextPage: 3,
        skillBonus: '+15 Dieren Kennis & Woordenschat',
        icon: '🐾'
      }
    ]
  },
  {
    pageNumber: 2,
    title: 'De Sleutel van de Savanne Wachter',
    biome: 'Savanne Safari',
    storyText: `Hemali brak het zegel. Op het perkament stonden sierlijke letters: *"Aan de vinders van deze brief: het safaridorp verkeert in gevaar. De grote waterbron is geblokkeerd door een zware rotslawine. **Desondanks** proberen de stropers de dieren weg te lokken."*

Ridheya wees naar een tekening onderaan het document. "Dat is Simba de leeuwenwelp! Hij zit gevangen bij de oude acacia boom." 

Hemali pakte haar kompas. "Als we de oostelijke route nemen, bereiken we de kloof **onmiddellijk**. Maar we moeten stil zijn, want de bewakers hebben scherpe oren. Ridheya, leid jij ons met je wandelstaf over de veilige stapstenen?" Ridheya knikte vastberaden. Haar ogen glinsterden achter haar ronde brilglazen.`,
    targetWords: [
      {
        word: 'desondanks',
        dutchMeaning: 'toch, ondanks de moeilijke omstandigheden.',
        englishMeaning: 'Nevertheless / despite this'
      },
      {
        word: 'onmiddellijk',
        dutchMeaning: 'meteen, zonder ook maar een seconde te wachten.',
        englishMeaning: 'Immediately / right away'
      },
      {
        word: 'rotslawine',
        breakdown: 'rots + lawine',
        dutchMeaning: 'een grote hoeveelheid stenen en rotsblokken die van een berg naar beneden stort.',
        englishMeaning: 'Rock avalanche / landslide'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🧠 Clue #2: Oorzaak & Gevolg',
      question: 'Wat is het directe gevolg van de rotslawine volgens het document?',
      options: [
        'Het safarischip is gezonken in de zee.',
        'De grote waterbron voor de dieren is geblokkeerd.',
        'Hemali is haar bril kwijtgeraakt.',
        'Alle bomen zijn in brand gevlogen.'
      ],
      correctIndex: 1,
      explanation: 'In de brief staat letterlijk dat de waterbron door de rotslawine geblokkeerd is geraakt.'
    },
    choices: [
      {
        label: 'Sluip via het geheime apenpad om Simba de Leeuw te bevrijden',
        nextPage: 4,
        skillBonus: '+20 Zelfvertrouwen & Moed',
        icon: '🦁'
      },
      {
        label: 'Gebruik Professor Ollie Uil om vanuit de lucht een overzichtskaart te tekenen',
        nextPage: 4,
        skillBonus: '+20 Logisch Redeneren & Hoofdgedachte',
        icon: '🦉'
      }
    ]
  },
  {
    pageNumber: 3,
    title: 'Het Spoor van de Geheime Grot',
    biome: 'Tropisch Regenwoud',
    storyText: `Ridheya volgde de diepe afdrukken met haar houten staf. De sporen leidden diep het dichte regenwoud in, waar reusachtige varens het zonlicht tegenhielden. 

"Kijk hier," wees Ridheya fluisterend. "De bladeren zijn hier vers geknakt. Een zwaar dier heeft hier **haastig** gelopen." 

Hemali noteerde de afmetingen nauwkeurig in haar speurneuzenboek. "De afstand tussen de stappen is ruim twee meter. **Daardoor** kunnen we concluderen dat het een volwassen jaguar of een groot safaridier moet zijn. We naderen een verborgen waterval!" Achter het kletterende water ontdekten de zussen een geheime stenen poort met fonkelende edelstenen.`,
    targetWords: [
      {
        word: 'haastig',
        dutchMeaning: 'heel snel en met veel spoed.',
        englishMeaning: 'Hastily / in a hurry'
      },
      {
        word: 'daardoor',
        dutchMeaning: 'om die reden, als logisch gevolg daarvan.',
        englishMeaning: 'As a result / because of that'
      },
      {
        word: 'speurneuzenboek',
        breakdown: 'speurneuzen + boek',
        dutchMeaning: 'een schrift waarin een detective aanwijzingen en bewijzen noteert.',
        englishMeaning: 'Detective notebook'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🐾 Clue #3: Conclusie Trekken',
      question: 'Hoe weet Hemali dat het dier erg groot is?',
      options: [
        'Omdat ze het dier heeft horen brullen in het donker.',
        'Omdat de afstand tussen de stappen ruim twee meter is.',
        'Omdat Ridheya een veer van een vogel vond.',
        'Omdat het water van de waterval groen kleurde.'
      ],
      correctIndex: 1,
      explanation: 'De grote stapafstand van twee meter bewijst dat het dier lange poten heeft en heel groot is.'
    },
    choices: [
      {
        label: 'Stap door de waterval en open de stenen poort met de toverspreuk',
        nextPage: 4,
        skillBonus: '+25 Grammatica & Spreken',
        icon: '✨'
      },
      {
        label: 'Roep het Zussen Team bijeen om samen het safaridorp te redden',
        nextPage: 4,
        skillBonus: '+25 Samenwerking & Taalbegrip',
        icon: '👑'
      }
    ]
  },
  {
    pageNumber: 4,
    title: 'De Grote Overwinning van het Safaripark',
    biome: 'Safaripark Hoofdkwartier',
    storyText: `Dankzij het scherpe observatievermogen van Ridheya en de briljante logica van Hemali werd het mysterie **volledig** ontrafeld. Simba de leeuw werd veilig teruggebracht naar zijn moeder in de savanne, en de verstopte waterbron stroomde weer als een heldere beek door het safaripark.

Alle dieren kwamen bijeen om de twee heldhaftige zussen te bedanken. Professor Ollie Uil landde trots op Ridheya’s schouder, terwijl Max de Aap vrolijk salto’s maakte in de bomen.

De hoofdboswachter overhandigde beide meisjes een gouden onderscheiding: *"Voor uitzonderlijke moed, perfecte leesvaardigheid en onbreekbare zusterliefde."* Hemali en Ridheya keken elkaar lachend aan. Dit was nog maar het begin van hun vele avonturen!`,
    targetWords: [
      {
        word: 'volledig',
        dutchMeaning: 'helemaal, compleet van begin tot eind.',
        englishMeaning: 'Completely / entirely'
      },
      {
        word: 'heldhaftig',
        breakdown: 'held + haftig',
        dutchMeaning: 'heel erg dapper en dapper handelend als een echte held.',
        englishMeaning: 'Heroic / valiant'
      },
      {
        word: 'onderscheiding',
        dutchMeaning: 'een medaille of ereteken als beloning voor een bijzondere prestatie.',
        englishMeaning: 'Award / medal / distinction'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🏆 Eind Clue: Samenvatting',
      question: 'Wat was de sleutel tot het succes van Hemali en Ridheya?',
      options: [
        'Ze hebben alleen maar gerust en gewacht op hulp.',
        'Ze combineerden Ridheya’s observatie met Hemali’s logica en werkten samen als zussen.',
        'Ze zijn weggerend toen ze de rotslawine zagen.',
        'Ze hebben het onderzoeksschip verkocht.'
      ],
      correctIndex: 1,
      explanation: 'Hun samenwerking, scherpe blik en logische puzzelkracht zorgden voor de overwinning.'
    },
    choices: [
      {
        label: 'Trek dieper de savanne in naar het Oude Leeuwenheiligdom',
        nextPage: 5,
        skillBonus: '+30 Samenwerking & Verhaalinzicht',
        icon: '🦁'
      },
      {
        label: 'Onderzoek samen de scheepsarchieven op het onderzoeksschip',
        nextPage: 5,
        skillBonus: '+30 Wetenschappelijke Teksten & Woordenschat',
        icon: '🚢'
      }
    ]
  },
  {
    pageNumber: 5,
    title: 'Het Geheime Dagboek van het Onderzoeksschip',
    biome: 'Kapiteins Kajuit van het Onderzoeksschip',
    storyText: `Aan boord van het imposante **onderzoeksschip** worden Hemali en Ridheya verwelkomd door de hoofdonderzoeker. De schipper biedt zijn excuses aan voor zijn eerdere achterdocht: hij vreesde dat stropers het schip wilden kapen.

Op de grote eikenhouten tafel ligt een historisch scheepsjournaal. Ridheya gebruikt haar vergrootglas om de kleine aantekeningen over zeldzame diersoorten te bestuderen. Hemali analyseert de zeekaarten en ontdekt een vergeten zoetwaterbron onder de zandduinen.

"Als we deze ondergrondse bron aansluiten met de scheepspomp," legt Hemali uit, "krijgt het hele reservaat weer kristalhelder drinkwater!" Ridheya klapt enthousiast in haar handen.`,
    targetWords: [
      {
        word: 'scheepsjournaal',
        breakdown: 'schip + s + journaal',
        dutchMeaning: 'een officieel dagboek waarin de kapitein alle gebeurtenissen op een schip opschrijft.',
        englishMeaning: 'Ship logbook'
      },
      {
        word: 'imposant',
        dutchMeaning: 'heel indrukwekkend en groots om te zien.',
        englishMeaning: 'Imposing / impressive'
      },
      {
        word: 'zoetwaterbron',
        breakdown: 'zoet + water + bron',
        dutchMeaning: 'een natuurlijke plek waar schoon en drinkbaar water uit de aarde opborrelt.',
        englishMeaning: 'Freshwater spring'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🚢 Clue #5: Scheepsjournaal & Wetenschappelijke Taal',
      question: 'Wat ontdekte Hemali door de zeekaarten en het scheepsjournaal te analyseren?',
      options: [
        'Dat het schip lekte.',
        'Een vergeten ondergrondse zoetwaterbron die het hele reservaat van water kan voorzien.',
        'Dat alle dieren naar een ander eiland waren gezwommen.',
        'Dat het kompas kapot was.'
      ],
      correctIndex: 1,
      explanation: 'Hemali ontdekte de ondergrondse zoetwaterbron en bedacht een plan om deze aan te sluiten.'
    },
    choices: [
      {
        label: 'Activeer de waterpomp en luid de scheepsbel van overwinning',
        nextPage: 6,
        skillBonus: '+35 Technisch Inzicht & Cito Leesvaardigheid',
        icon: '🔔'
      },
      {
        label: 'Organiseer een groot dierenfeest bij de herstelde oase',
        nextPage: 6,
        skillBonus: '+35 Empathie & Vreugde',
        icon: '🌴'
      }
    ]
  },
  {
    pageNumber: 6,
    title: 'De Eeuwige Oase van de Twee Zussen',
    biome: 'Bloeiende Oase bij Volle Maan',
    storyText: `Het water spuit hoog de lucht in en vult de dorstige savannebekkens. Simba de leeuwenwelp drinkt gulzig naast zijn trotse moeder, terwijl zebra's en gazellen vrolijk door het frisse gras galopperen.

Bovenop het dek van het schip kijken Hemali en Ridheya naar de sterrenhemel. De voltallige bemanning en alle dierenwachters applaudisseren voor de twee zussen.

"We hebben bewezen dat we samen elk mysterie kunnen ontrafelen," zegt Hemali teder. Ridheya leunt met haar hoofdje tegen Hemali’s schouder: "Zolang we elkaars hand vasthouden, zijn we onverslaanbaar!" Het Zussen Team is klaar voor hun volgende grote ontdekkingsreis.`,
    targetWords: [
      {
        word: 'onverslaanbaar',
        breakdown: 'on + verslaan + baar',
        dutchMeaning: 'zo sterk en eensgezind dat niemand van je kan winnen.',
        englishMeaning: 'Invincible / unbeatable'
      },
      {
        word: 'bemanning',
        dutchMeaning: 'de groep mensen die samen op een schip werken en varen.',
        englishMeaning: 'Crew'
      },
      {
        word: 'eensgezind',
        breakdown: 'eens + gezind',
        dutchMeaning: 'als iedereen hetzelfde doel voor ogen heeft en in harmonie samenwerkt.',
        englishMeaning: 'United / unanimous'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🌟 Grote Finale Clue #6: De Kracht van Samenwerking',
      question: 'Wat is de kernboodschap van het gezamenlijke zussenavontuur?',
      options: [
        'Dat schepen alleen op zee moeten blijven.',
        'Dat zussenliefde, gecombineerde talenten en eensgezindheid elk probleem kunnen overwinnen.',
        'Dat leeuwenwelpen niet van water houden.',
        'Dat duinen te steil zijn om over te lopen.'
      ],
      correctIndex: 1,
      explanation: 'De tekst toont dat de unieke talenten van beide zussen en hun hechte band hen onverslaanbaar maken.'
    },
    choices: [
      {
        label: '🎉 Sluit het avontuur af of start een nieuwe Cito RPG missie',
        nextPage: 1,
        skillBonus: 'Zussen Missie Volledig Voltooid! 🌟',
        icon: '🔄'
      }
    ]
  }
];

// All campaigns bundled for the campaign selector
export const STORY_CAMPAIGNS: StoryCampaign[] = [
  {
    id: 'ridheya_malaysia',
    protagonistId: 'ridheya',
    title: 'Ridheya’s Dierenkliniek in Maleisië',
    subtitle: 'De Gewonde Zwerfhond Kopi & De Blauwe IJsvogel',
    location: 'Kuala Lumpur / Georgetown, Maleisië 🇲🇾',
    badge: 'Groep 3–4 (AVI M3-E4)',
    themeEmoji: '🩺',
    recommendedGrade: 'Groep 3–4',
    pages: RIDHEYA_MALAYSIA_PAGES
  },
  {
    id: 'hemali_jungle',
    protagonistId: 'hemali',
    title: 'Hemali’s Magische Nachtjungle',
    subtitle: 'Teleportatie, Het Zombie-Aapje & Baby Giraf Appel',
    location: 'Taman Negara Nachthoorwoud 🌙',
    badge: 'Groep 5–6 (Cito Prep)',
    themeEmoji: '✨',
    recommendedGrade: 'Groep 5–6',
    pages: HEMALI_JUNGLE_PAGES
  },
  {
    id: 'sisters_safari',
    protagonistId: 'both',
    title: 'Zussen Team & Het Onderzoeksschip',
    subtitle: 'Het Raadsel van het Dierenreservaat & Simba de Leeuw',
    location: 'Savanne Safari & Kustlijn 🚢',
    badge: 'Zussen Samen (Groep 3–6)',
    themeEmoji: '👑',
    recommendedGrade: 'Alle Groepen',
    pages: SISTERS_SAFARI_PAGES
  }
];

// Default backwards compatibility
export const RPG_STORY_CHAPTERS: RpgPage[] = RIDHEYA_MALAYSIA_PAGES;
