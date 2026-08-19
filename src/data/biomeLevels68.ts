import { Level, BiomeType } from '../types';
import { ALL_BIOME_ANIMALS } from './biomeAnimals';

const ANIMAL_ALIASES: Record<string, string> = {
  'mimi-aap': 'mo-meerkat',
  'kiki-cheeta': 'charly-cheeta',
  'wally-walvis': 'willy-walvis',
  'otto-octopus': 'octo-octopus',
  'nemo-clownvis': 'kora-zeepaardje',
  'hugo-haai': 'oscar-orka',
  'piet-pinguin': 'plons-pinguin',
  'sam-zeehond': 'robbie-zeehond',
  'fay-poolvos': 'pip-poolvos',
  'finn-vos': 'finn-woestijnvos'
};

const findAnimal = (id: string) => {
  const resolvedId = ANIMAL_ALIASES[id] || id;
  const a = ALL_BIOME_ANIMALS.find(item => item.id === resolvedId || item.id === id);
  if (a) return a;
  return ALL_BIOME_ANIMALS[0];
};

export const BIOME_LEVELS_GROEP_6_8: Record<BiomeType, Level[]> = {
  farm: [
    {
      id: 1,
      name: 'Bella’s Grammatica Weide',
      biome: 'farm',
      theme: 'Werkwoordspelling (d/t/dt) & Sterke Werkwoorden',
      themeColor: '#4CAF50',
      bannerEmoji: '🐮',
      chapterTitle: 'Hoofdstuk 1: Boerderij Vervoegingen',
      introStory: 'Bella de koe kijkt wijs over het hek: "In Groep 6-7-8 gaan we aan de slag met sterke werkwoorden en de d/t regels! Help jij mee?"',
      animalReward: findAnimal('bella-koe'),
      questions: [
        {
          id: 'farm68-1-1',
          category: 'Werkwoordspelling (TT)',
          categoryIcon: '🐮',
          question: 'Vul in: De boer ___ vroeg in de ochtend de koeien in de wei.',
          type: 'choice',
          options: ['vind', 'vindt', 'vint'],
          correctOptionIndex: 1,
          hint: 'Onderwerp is "de boer" (hij-vorm). Stam vind + t = vindt.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'farm68-1-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '⚡',
          question: 'Wat is de verleden tijd (VT) van het werkwoord "brengen"? (Gisteren ... hij)',
          type: 'choice',
          options: ['bracht', 'bragte', 'brengde'],
          correctOptionIndex: 0,
          hint: 'Brengen is een sterk werkwoord: brengen - bracht - gebracht.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'farm68-1-3',
          category: 'Sterke Werkwoorden (VT Meervoud)',
          categoryIcon: '🚜',
          question: 'Wat is de verleden tijd van "rijden"? (De boeren ... op de tractor)',
          type: 'choice',
          options: ['reden', 'rijdden', 'reeden'],
          correctOptionIndex: 0,
          hint: 'Rijden - reed - reden (met één e).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'farm68-1-4',
          category: 'Voltooid Deelwoord & ’t Kofschip',
          categoryIcon: '📖',
          question: 'Welke zin is grammaticaal geheel correct gespeld?',
          type: 'choice',
          options: [
            'De boer heeft het verse hooi keurig opgestapeld.',
            'De boer heeft het verse hooi keurig opgestapelt.',
            'De boer heeft het verse hooi keurig opgestapeldt.'
          ],
          correctOptionIndex: 0,
          hint: 'Stam is stapel (l zit niet in ’t kofschip) -> eindigt op -d.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    },
    {
      id: 2,
      name: 'Wolletje’s Trema Schooi',
      biome: 'farm',
      theme: 'Trema’s, Klinkerbotsingen & Sterk Werkwoord Scheren',
      themeColor: '#81C784',
      bannerEmoji: '🐑',
      chapterTitle: 'Hoofdstuk 2: Schapenwol & Woordsoorten',
      introStory: 'Wolletje huppelt met haar pas geschoren vacht: "Tijd voor trema’s, meervouden en sterke werkwoorden!"',
      animalReward: findAnimal('wolletje-schaap'),
      questions: [
        {
          id: 'farm68-2-1',
          category: 'Trema & Klinkerbotsing',
          categoryIcon: '🐑',
          question: 'Kies de juiste spelling van het meervoud van "kolonie":',
          type: 'choice',
          options: ['koloniën', 'kolonien', 'kolonieën'],
          correctOptionIndex: 0,
          hint: 'Woorden op onbeklemtoonde -ie krijgen -ën: koloniën.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'farm68-2-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '✂️',
          question: 'Wat is de verleden tijd van "scheren"? (De boer ... gisteren de schapen)',
          type: 'choice',
          options: ['schoor', 'scheerde', 'scheerde'],
          correctOptionIndex: 0,
          hint: 'Scheren - schoor - geschoren.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'farm68-2-3',
          category: 'Letters Leggen (Sterke Werkwoorden)',
          categoryIcon: '✏️',
          question: 'Spel het voltooid deelwoord van "ZWEMMEN":',
          type: 'spell',
          targetWord: 'GEZWOMMEN',
          scrambledLetters: ['G', 'E', 'Z', 'W', 'O', 'M', 'M', 'E', 'N'],
          hint: 'Zwemmen - zwom - gezwommen.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    },
    {
      id: 3,
      name: 'Storm’s Galop Regels',
      biome: 'farm',
      theme: 'Bijvoeglijk gebruikt Voltooid Deelwoord & Werkwoord Galopperen',
      themeColor: '#A1887F',
      bannerEmoji: '🐴',
      chapterTitle: 'Hoofdstuk 3: Galopperen en Vervoegen',
      introStory: 'Storm hinnikt trots in galop: "Onderzoek de regels van het bijvoeglijk gebruikt voltooid deelwoord!"',
      animalReward: findAnimal('storm-paard'),
      questions: [
        {
          id: 'farm68-3-1',
          category: 'Bijvoeglijk gebruikt VD',
          categoryIcon: '🐴',
          question: 'Kies de juiste spelling: Het pas ___ paard rust uit in de stal.',
          type: 'choice',
          options: ['geborstelde', 'geborsteltte', 'geborstelte'],
          correctOptionIndex: 0,
          hint: 'Borstelen -> stam borstel (l zit niet in ’t kofschip) -> geborstelde (zo kort mogelijk).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'farm68-3-2',
          category: 'Werkwoordspelling (Inversie)',
          categoryIcon: '🐎',
          question: 'Vul in: Waarom ___ jij zo snel op je paard?',
          type: 'choice',
          options: ['rijd', 'rijdt', 'rijt'],
          correctOptionIndex: 0,
          hint: 'Bij "jij" achter de persoonsvorm vervalt de t: rijd jij (vergelijk: loop jij).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'farm68-3-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom kunnen paarden staand slapen zonder om te vallen?',
          passage: 'Paarden hebben een speciaal pezen- en spiersysteem in hun benen genaamd het "sta-apparaat". Hiermee kunnen ze hun gewrichten letterlijk op slot zetten, zodat hun spieren kunnen ontspannen tijdens het slapen.',
          type: 'choice',
          options: [
            'Dankzij een pezensysteem dat de gewrichten op slot zet',
            'Omdat ze hun hoeven in de grond vastschroeven',
            'Omdat paarden nooit slapen'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over het sta-apparaat en het op slot zetten van gewrichten.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 4,
      name: 'Pip’s Samengestelde Poel',
      biome: 'farm',
      theme: 'Sterk Werkwoord Ruiken & Tussenletter -s- of -en-',
      themeColor: '#F48FB1',
      bannerEmoji: '🐷',
      chapterTitle: 'Hoofdstuk 4: Zintuigen in de Modder',
      introStory: 'Pip wroet door de aarde: "Mijn neus ruikt alles! Weet jij de verleden tijd van ruiken en wroeten?"',
      animalReward: findAnimal('pip-varken'),
      questions: [
        {
          id: 'farm68-4-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🐷',
          question: 'Wat is de verleden tijd van "ruiken"? (Het varkentje ... de verse appels)',
          type: 'choice',
          options: ['rook', 'ruikte', 'rokte'],
          correctOptionIndex: 0,
          hint: 'Ruiken - rook - geroken.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'farm68-4-2',
          category: 'Tussenklank -en- of -e-',
          categoryIcon: '🍎',
          question: 'Kies de juiste spelling:',
          type: 'choice',
          options: ['appelsap', 'appelensap', 'appelesap'],
          correctOptionIndex: 0,
          hint: 'Appel + sap = appelsap.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'farm68-4-3',
          category: 'Letters Leggen (Sterke Werkwoorden)',
          categoryIcon: '✏️',
          question: 'Spel het voltooid deelwoord van "VINDEN":',
          type: 'spell',
          targetWord: 'GEVONDEN',
          scrambledLetters: ['G', 'E', 'V', 'O', 'N', 'D', 'E', 'N'],
          hint: 'Vinden - vond - gevonden.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    },
    {
      id: 5,
      name: 'Haantje’s Vroege Voegwoorden',
      biome: 'farm',
      theme: 'Samengestelde Zinnen & Sterk Werkwoord Schrikken',
      themeColor: '#FF7043',
      bannerEmoji: '🐓',
      chapterTitle: 'Hoofdstuk 5: Ochtendsignalen',
      introStory: 'Haantje roept vanaf het dak: "Kukeleku! Let goed op de komma’s en voegwoorden in samengestelde zinnen!"',
      animalReward: findAnimal('haantje-haan'),
      questions: [
        {
          id: 'farm68-5-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🐓',
          question: 'Wat is de verleden tijd van "schrikken"? (De kippen ... van het onweer)',
          type: 'choice',
          options: ['schrokken', 'schrikten', 'schroekten'],
          correctOptionIndex: 0,
          hint: 'Schrikken - schrok - geschrokken.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'farm68-5-2',
          category: 'Voegwoorden & Zinsbouw',
          categoryIcon: '📖',
          question: 'Kies het juiste voegwoord: De haan kraait vroeg, ___ de zon opkomt.',
          type: 'choice',
          options: ['omdat', 'zodat', 'hoewel'],
          correctOptionIndex: 0,
          hint: 'Omdat geeft de reden/oorzaak aan.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'farm68-5-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom kraait de haan altijd vóór de zon opkomt?',
          passage: 'Hanen hebben een zeer nauwkeurige interne biologische klok die reageert op het allereerste microscopische ochtendgloren, nog ver voordat mensen het licht kunnen waarnemen.',
          type: 'choice',
          options: [
            'Door een ingebouwde biologische klok die licht vroeg detecteert',
            'Omdat hij een wekker op batterijen inslikt',
            'Om de kippen wakker te maken voor het ontbijt'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de interne biologische klok.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 6,
      name: 'Daisy’s Drijvende Deelwoorden',
      biome: 'farm',
      theme: 'Onvoltooid Deelwoord (-end) & Sterk Werkwoord Drijven',
      themeColor: '#26A69A',
      bannerEmoji: '🦆',
      chapterTitle: 'Hoofdstuk 6: Kwekken op het Water',
      introStory: 'Daisy zwemt sierlijk over de rimpelingen: "Kwek! Leer het onvoltooid en voltooid deelwoord onderscheiden!"',
      animalReward: findAnimal('daisy-eend'),
      questions: [
        {
          id: 'farm68-6-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🦆',
          question: 'Wat is de verleden tijd van "drijven"? (Het veertje ... op het water)',
          type: 'choice',
          options: ['dreef', 'dreefde', 'dreeft'],
          correctOptionIndex: 0,
          hint: 'Drijven - dreef - gedreven.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'farm68-6-2',
          category: 'Onvoltooid Deelwoord',
          categoryIcon: '💧',
          question: 'Kies de juiste spelling: ___ zwommen de eendjes achter hun moeder aan.',
          type: 'choice',
          options: ['Kwakend', 'Kwakent', 'Kwaakend'],
          correctOptionIndex: 0,
          hint: 'Onvoltooid deelwoord = hele werkwoord + d: kwakend.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'farm68-6-3',
          category: 'Letters Leggen (Sterke Werkwoorden)',
          categoryIcon: '✏️',
          question: 'Spel het voltooid deelwoord van "DUIKEN":',
          type: 'spell',
          targetWord: 'GEDOKEN',
          scrambledLetters: ['G', 'E', 'D', 'O', 'K', 'E', 'N'],
          hint: 'Duiken - dook - gedoken.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    }
  ],

  safari: [
    {
      id: 1,
      name: 'Gigi’s Savanne Vervoegingen',
      biome: 'safari',
      theme: 'Sterke Werkwoorden & Academisch Begrip',
      themeColor: '#FFB300',
      bannerEmoji: '🦒',
      chapterTitle: 'Hoofdstuk 1: De Savanne Vervoegingen',
      introStory: 'Gigi buigt haar sierlijke hals: "Op de savanne rennen de cheeta’s en brullen de leeuwen. Weet jij alle werkwoordsvormen?"',
      animalReward: findAnimal('gigi-giraf'),
      questions: [
        {
          id: 'safari68-1-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🦒',
          question: 'Wat is de juiste verleden tijd van "vechten"? (De leeuwen ... moedig)',
          type: 'choice',
          options: ['vochten', 'vechtten', 'vachten'],
          correctOptionIndex: 0,
          hint: 'Vechten - vocht - gevochten (meervoud: vochten).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'safari68-1-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🏃',
          question: 'Wat is de verleden tijd van "lopen"? (Gigi ... door het savannegras)',
          type: 'choice',
          options: ['liep', 'loopte', 'leep'],
          correctOptionIndex: 0,
          hint: 'Lopen - liep - gelopen.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'safari68-1-3',
          category: 'Begrijpend Lezen & Causaliteit',
          categoryIcon: '📖',
          question: 'Wat is de belangrijkste reden dat cheeta’s na een sprint moeten rusten?',
          passage: 'Tijdens een topsprint van 110 km/u verbruikt een cheeta in korte tijd een gigantische hoeveelheid energie. Zijn lichaamstemperatuur stijgt razendsnel naar bijna 41 graden Celsius, waardoor hij na enkele honderden meters moet stoppen om af te koelen.',
          type: 'choice',
          options: [
            'Om te voorkomen dat zijn lichaam oververhit raakt',
            'Omdat zijn poten direct pijn gaan doen',
            'Omdat hij meteen in slaap valt'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de lichaamstemperatuur en oververhitting.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 2,
      name: 'Leo’s Koningsregels',
      biome: 'safari',
      theme: 'Sterk Werkwoord Sluipen & Werkwoordspelling Brullen',
      themeColor: '#FFA726',
      bannerEmoji: '🦁',
      chapterTitle: 'Hoofdstuk 2: De Leeuw Besluipt',
      introStory: 'Leo schudt zijn gouden manen: "Stilte op de savanne! Vervoeg het werkwoord sluipen en jagen!"',
      animalReward: findAnimal('leo-leeuw'),
      questions: [
        {
          id: 'safari68-2-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🦁',
          question: 'Wat is de verleden tijd van "sluipen"? (De leeuwen ... behoedzaam naderbij)',
          type: 'choice',
          options: ['slopen', 'sluipten', 'sloopen'],
          correctOptionIndex: 0,
          hint: 'Sluipen - sloop - geslopen (meervoud: slopen).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'safari68-2-2',
          category: 'Werkwoordspelling (VT regelmatig)',
          categoryIcon: '👑',
          question: 'Vul in: De jonge leeuw ___ luidkeels naar de zebra.',
          type: 'choice',
          options: ['brulde', 'brulte', 'brullden'],
          correctOptionIndex: 0,
          hint: 'Stam is brul (l zit niet in ’t kofschip) -> brulde.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'safari68-2-3',
          category: 'Letters Leggen (Sterke Werkwoorden)',
          categoryIcon: '✏️',
          question: 'Spel het voltooid deelwoord van "BIJTEN":',
          type: 'spell',
          targetWord: 'GEBETEN',
          scrambledLetters: ['G', 'E', 'B', 'E', 'T', 'E', 'N'],
          hint: 'Bijten - beet - gebeten.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    },
    {
      id: 3,
      name: 'Ollie’s Reuzen Grammatica',
      biome: 'safari',
      theme: 'Sterke Werkwoorden Blazen & Dragen, ’t Kofschip',
      themeColor: '#90CAF9',
      bannerEmoji: '🐘',
      chapterTitle: 'Hoofdstuk 3: Trompetteren over de Vlakte',
      introStory: 'Ollie blaast een feestelijke toon: "Toeeet! Wie kent de verleden tijd van blazen en dragen?"',
      animalReward: findAnimal('ollie-olifant'),
      questions: [
        {
          id: 'safari68-3-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🐘',
          question: 'Wat is de verleden tijd van "blazen"? (Ollie ... het water over zijn rug)',
          type: 'choice',
          options: ['blies', 'blaasde', 'blaaste'],
          correctOptionIndex: 0,
          hint: 'Blazen - blies - geblazen.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'safari68-3-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '💧',
          question: 'Wat is de verleden tijd van "dragen"? (De moederolifant ... de zware last)',
          type: 'choice',
          options: ['droeg', 'draagde', 'drooch'],
          correctOptionIndex: 0,
          hint: 'Dragen - droeg - gedragen.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'safari68-3-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Hoe voelen olifanten naderend onweer of andere kuddes op tientallen kilometers afstand?',
          passage: 'Olifanten communiceren via infrageluid: hele lage trillingen die door de grond reizen. Met speciale gevoelige zenuwcellen in hun voetzolen vangen ze die trillingen op en weten ze precies waar gevaar dreigt.',
          type: 'choice',
          options: [
            'Via gevoelige zenuwcellen in hun voetzolen die grondtrillingen opvangen',
            'Omdat ze altijd een mobiele telefoon meedragen',
            'Door naar de stand van de sterren te kijken'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over infrageluid en zenuwcellen in de voetzolen.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 4,
      name: 'Zara’s Apostrof Steppe',
      biome: 'safari',
      theme: 'Meervoud met Apostrof-s & Sterk Werkwoord Vluchten',
      themeColor: '#78909C',
      bannerEmoji: '🦓',
      chapterTitle: 'Hoofdstuk 4: Snelle Strepen',
      introStory: 'Zara snuift de savannelucht op: "Pas op voor de apostrof bij meervouden van zebra en radio!"',
      animalReward: findAnimal('zara-zebra'),
      questions: [
        {
          id: 'safari68-4-1',
          category: 'Apostrof Meervoud',
          categoryIcon: '🦓',
          question: 'Wat is de juiste meervoudsvorm van "zebra"?',
          type: 'choice',
          options: ["zebra's", 'zebras', "zebra'es"],
          correctOptionIndex: 0,
          hint: 'Woorden op lange a krijgen apostrof-s om de lange klank te bewaren.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'safari68-4-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '💨',
          question: 'Wat is de verleden tijd van "vluchten"? (De kudde ... voor het gevaar)',
          type: 'choice',
          options: ['vluchtte', 'vluchtten', 'vlogen'],
          correctOptionIndex: 0,
          hint: 'Vluchten (enkelvoud: de kudde) -> stam vlucht + te = vluchtte (ch zit in ’t kofschip).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'safari68-4-3',
          category: 'Letters Leggen (Sterke Werkwoorden)',
          categoryIcon: '✏️',
          question: 'Spel het voltooid deelwoord van "TREKKEN":',
          type: 'spell',
          targetWord: 'GETROKKEN',
          scrambledLetters: ['G', 'E', 'T', 'R', 'O', 'K', 'K', 'E', 'N'],
          hint: 'Trekken - trok - getrokken.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    },
    {
      id: 5,
      name: 'Mimi’s Boomklimmers',
      biome: 'safari',
      theme: 'Sterk Werkwoord Hangen, Klimmen & Grijpen',
      themeColor: '#A1887F',
      bannerEmoji: '🐒',
      chapterTitle: 'Hoofdstuk 5: Acrobatiek in de Bomen',
      introStory: 'Mimi slingert vrolijk rond: "Let op de klankveranderingen bij hangen en klimmen!"',
      animalReward: findAnimal('mimi-aap'),
      questions: [
        {
          id: 'safari68-5-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🐒',
          question: 'Wat is de verleden tijd van "hangen"? (Het aapje ... aan de liane)',
          type: 'choice',
          options: ['hing', 'hangde', 'hong'],
          correctOptionIndex: 0,
          hint: 'Hangen - hing - gehangen.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'safari68-5-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🌴',
          question: 'Wat is de verleden tijd van "klimmen"? (De apen ... snel omhoog)',
          type: 'choice',
          options: ['klommen', 'klimden', 'kloommen'],
          correctOptionIndex: 0,
          hint: 'Klimmen - klom - geklommen (meervoud: klommen).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'safari68-5-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom vlooien apen elkaar zo intensief?',
          passage: 'Het vlooien van elkaar dient niet alleen om parasieten te verwijderen, maar is vooral een cruciaal sociaal ritueel dat vriendschappen versterkt en spanningen in de groep wegneemt.',
          type: 'choice',
          options: [
            'Om vriendschappen te versterken en rust in de groep te bewaren',
            'Omdat ze zich altijd heel erg vervelen',
            'Om extra eten te verdienen'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over het sociale ritueel en het versterken van vriendschappen.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 6,
      name: 'Kiki’s Topsprint Arena',
      biome: 'safari',
      theme: 'Sterk Werkwoord Vangen & Snelheidsspelling',
      themeColor: '#FF6F00',
      bannerEmoji: '🐆',
      chapterTitle: 'Hoofdstuk 6: De Jacht op Topsnelheid',
      introStory: 'Kiki spitst haar oren: "De snelste sprinter vraagt de scherpste spelling van vangen en jagen!"',
      animalReward: findAnimal('kiki-cheeta'),
      questions: [
        {
          id: 'safari68-6-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🐆',
          question: 'Wat is de verleden tijd van "vangen"? (De cheeta ... de gazelle)',
          type: 'choice',
          options: ['ving', 'vangde', 'vong'],
          correctOptionIndex: 0,
          hint: 'Vangen - ving - gevangen.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'safari68-6-2',
          category: 'Werkwoordspelling (TT)',
          categoryIcon: '⚡',
          question: 'Vul in: De cheeta ___ met reusachtige stappen over de vlakte.',
          type: 'choice',
          options: ['sprint', 'sprintt', 'sprind'],
          correctOptionIndex: 0,
          hint: 'Stam is sprint (eindigt al op een t, dus geen extra t).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'safari68-6-3',
          category: 'Letters Leggen (Sterke Werkwoorden)',
          categoryIcon: '✏️',
          question: 'Spel het voltooid deelwoord van "JAGEN":',
          type: 'spell',
          targetWord: 'GEJAAGD',
          scrambledLetters: ['G', 'E', 'J', 'A', 'A', 'G', 'D'],
          hint: 'Jagen - joeg / jaagde - gejaagd.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    }
  ],

  sea: [
    {
      id: 1,
      name: 'Dolly’s Diepzee Grammatica',
      biome: 'sea',
      theme: 'Moeilijke Leenwoorden & D/T bij Bijvoeglijk Naamwoord',
      themeColor: '#0288D1',
      bannerEmoji: '🐬',
      chapterTitle: 'Hoofdstuk 1: De Diepzee Grammatica',
      introStory: 'Dolly de dolfijn springt door de branding: "Klaar voor uitdagende oceaantaal en sterke werkwoorden?"',
      animalReward: findAnimal('dolly-dolfijn'),
      questions: [
        {
          id: 'sea68-1-1',
          category: 'Bijvoeglijk gebruikt VD',
          categoryIcon: '🐬',
          question: 'Kies de juiste spelling: Het pas ___ schip zonk naar de zeebodem.',
          type: 'choice',
          options: ['gesloopte', 'gesloopten', 'gesloopde'],
          correctOptionIndex: 0,
          hint: 'Slopen -> stam sloop (p zit in ’t kofschip) -> gesloopte.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'sea68-1-2',
          category: 'Sterke Werkwoorden (Voltooid Deelwoord)',
          categoryIcon: '🌊',
          question: 'Het zware anker is naar de bodem ___. (werkwoord: zinken)',
          type: 'choice',
          options: ['gezonken', 'gezonkt', 'gezinkt'],
          correctOptionIndex: 0,
          hint: 'Zinken - zonk - gezonken.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'sea68-1-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Hoe "zien" dolfijnen in troebel zeewater?',
          passage: 'Dolfijnen gebruiken echolocatie. Ze zenden klikgeluiden uit via een speciaal orgaan in hun voorhoofd (het meloenorgaan). De terugkerende echo wordt via hun onderkaak opgevangen, waardoor ze een 3D-beeld van hun omgeving vormen.',
          type: 'choice',
          options: [
            'Via echolocatie: klikgeluiden die weerkaatsen naar hun onderkaak',
            'Omdat ze onderwaterzaklampen gebruiken',
            'Door hun ogen wijd open te sperren'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over echolocatie en klikgeluiden.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 2,
      name: 'Wally’s Walvissenzang',
      biome: 'sea',
      theme: 'Trema bij Zeeën & Sterk Werkwoord Zingen',
      themeColor: '#01579B',
      bannerEmoji: '🐋',
      chapterTitle: 'Hoofdstuk 2: Golven en Trema’s',
      introStory: 'Wally zingt door de waterkolom: "Wie weet het meervoud van zee en idee met een trema?"',
      animalReward: findAnimal('wally-walvis'),
      questions: [
        {
          id: 'sea68-2-1',
          category: 'Trema & Meervoud',
          categoryIcon: '🐋',
          question: 'Wat is het juiste meervoud van "zee"?',
          type: 'choice',
          options: ['zeeën', 'zeen', 'zeeën'],
          correctOptionIndex: 0,
          hint: 'Zee + ën = zeeën (trema op de tweede e).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'sea68-2-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🎶',
          question: 'Wat is de verleden tijd van "zingen"? (De bultrugwalvis ... een melodie)',
          type: 'choice',
          options: ['zong', 'zingde', 'zoeng'],
          correctOptionIndex: 0,
          hint: 'Zingen - zong - gezongen.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'sea68-2-3',
          category: 'Letters Leggen (Sterke Werkwoorden)',
          categoryIcon: '✏️',
          question: 'Spel het voltooid deelwoord van "BLAZEN":',
          type: 'spell',
          targetWord: 'GEBLAZEN',
          scrambledLetters: ['G', 'E', 'B', 'L', 'A', 'Z', 'E', 'N'],
          hint: 'Blazen - blies - geblazen.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    },
    {
      id: 3,
      name: 'Sammy’s Oude Schild',
      biome: 'sea',
      theme: 'Sterk Werkwoord Kruipen & Leggen, Afstand Kennis',
      themeColor: '#00897B',
      bannerEmoji: '🐢',
      chapterTitle: 'Hoofdstuk 3: De Reis van Duizenden Mijl',
      introStory: 'Sammy peddelt kalm met haar schild: "Onderzoek de verleden tijd van kruipen en leggen!"',
      animalReward: findAnimal('sammy-zeeschildpad'),
      questions: [
        {
          id: 'sea68-3-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🐢',
          question: 'Wat is de verleden tijd van "kruipen"? (De schildpadden ... over het strand)',
          type: 'choice',
          options: ['kropen', 'kruipten', 'kroopen'],
          correctOptionIndex: 0,
          hint: 'Kruipen - kroop - gekropen (meervoud: kropen).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'sea68-3-2',
          category: 'Werkwoordspelling (VT)',
          categoryIcon: '🥚',
          question: 'Vul in: De zeeschildpad ___ gisteren vijftig eieren in het zand.',
          type: 'choice',
          options: ['legde', 'leide', 'leegde'],
          correctOptionIndex: 0,
          hint: 'Leggen -> legde (regelmatig zwak werkwoord).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'sea68-3-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Hoe vinden zeeschildpadden na 30 jaar precies hetzelfde geboortestrand terug?',
          passage: 'Zeeschildpadden hebben ingebouwde magnetische sensoren in hun hersenen waarmee ze de unieke magnetische vingerafdruk van de aarde ter plaatse van hun geboortestrand onthouden.',
          type: 'choice',
          options: [
            'Door het aardmagnetisch veld van hun geboortestrand te onthouden',
            'Omdat ze de verkeersborden op de zeebodem lezen',
            'Door de geur van meeuwen te volgen'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over het magnetische veld en sensoren.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 4,
      name: 'Otto’s Camouflage Lab',
      biome: 'sea',
      theme: 'Sterk Werkwoord Glijden & Woorden met -isch',
      themeColor: '#7E57C2',
      bannerEmoji: '🐙',
      chapterTitle: 'Hoofdstuk 4: Mysterieus van Kleur',
      introStory: 'Otto kleurt van koraalrood naar zeeschuimwit: "Vervoeg het werkwoord glijden en herken woorden op -isch!"',
      animalReward: findAnimal('otto-octopus'),
      questions: [
        {
          id: 'sea68-4-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🐙',
          question: 'Wat is de verleden tijd van "glijden"? (De octopus ... soepel door de rotsspleet)',
          type: 'choice',
          options: ['gleed', 'glijdde', 'gloot'],
          correctOptionIndex: 0,
          hint: 'Glijden - gleed - gegleden.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'sea68-4-2',
          category: 'Woorden met -isch',
          categoryIcon: '✨',
          question: 'Kies de juiste spelling: De octopus heeft een ___ camouflagevermogen.',
          type: 'choice',
          options: ['fantastisch', 'fantastis', 'fantastiese'],
          correctOptionIndex: 0,
          hint: 'Klank -ies aan het eind van een bijvoeglijk naamwoord schrijf je als -isch.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'sea68-4-3',
          category: 'Letters Leggen (Sterke Werkwoorden)',
          categoryIcon: '✏️',
          question: 'Spel het voltooid deelwoord van "VANGEN":',
          type: 'spell',
          targetWord: 'GEVANGEN',
          scrambledLetters: ['G', 'E', 'V', 'A', 'N', 'G', 'E', 'N'],
          hint: 'Vangen - ving - gevangen.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    },
    {
      id: 5,
      name: 'Nemo’s Anemoon Schuilplaats',
      biome: 'sea',
      theme: 'Sterk Werkwoord Verbergen & Leenwoorden',
      themeColor: '#FF7043',
      bannerEmoji: '🐠',
      chapterTitle: 'Hoofdstuk 5: Tussen Giftige Tentakels',
      introStory: 'Nemo zwemt dapper tussen de giftige tentakels: "Weet jij de verleden tijd van verbergen en zwemmen?"',
      animalReward: findAnimal('nemo-clownvis'),
      questions: [
        {
          id: 'sea68-5-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🐠',
          question: 'Wat is de verleden tijd van "verbergen"? (Het visje ... zich in de anemoon)',
          type: 'choice',
          options: ['verborg', 'verbergde', 'verboorg'],
          correctOptionIndex: 0,
          hint: 'Verbergen - verborg - verborgen.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'sea68-5-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🌊',
          question: 'Wat is de verleden tijd van "zwemmen"? (De clownvissen ... rond het koraal)',
          type: 'choice',
          options: ['zwommen', 'zwemden', 'zwoommen'],
          correctOptionIndex: 0,
          hint: 'Zwemmen - zwom - gezwommen (meervoud: zwommen).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'sea68-5-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom wordt een clownvis niet gestoken door de giftige anemoon?',
          passage: 'Clownvissen hebben een speciale slijmlaag op hun schubben die suikers bevat. De anemoon herkent het visje daardoor niet als prooi maar denkt dat het een onderdeel van haar eigen lichaam is.',
          type: 'choice',
          options: [
            'Dankzij een speciale beschermende slijmlaag op zijn huid',
            'Omdat de vis een onzichtbaar harnas draagt',
            'Omdat de anemoon altijd slaapt'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de speciale slijmlaag met suikers.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 6,
      name: 'Hugo’s Hamerhaaien Jacht',
      biome: 'sea',
      theme: 'Sterk Werkwoord Ruiken & Elektromagnetische Zintuigen',
      themeColor: '#546E7A',
      bannerEmoji: '🦈',
      chapterTitle: 'Hoofdstuk 6: Het Zesde Zintuig',
      introStory: 'Hugo zwemt majestueus door de diepzee: "Onderzoek sterke werkwoorden en zintuigelijke spelling!"',
      animalReward: findAnimal('hugo-haai'),
      questions: [
        {
          id: 'sea68-6-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🦈',
          question: 'Wat is de verleden tijd van "ruiken"? (De haai ... de geur van verre vis)',
          type: 'choice',
          options: ['rook', 'ruikte', 'rokte'],
          correctOptionIndex: 0,
          hint: 'Ruiken - rook - geroken.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'sea68-6-2',
          category: 'Woorden met -isch',
          categoryIcon: '⚡',
          question: 'Kies de juiste spelling: Haaien vangen ___ signalen op van prooidieren.',
          type: 'choice',
          options: ['elektrische', 'elektrise', 'electrise'],
          correctOptionIndex: 0,
          hint: 'Elektrisch + e = elektrische.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'sea68-6-3',
          category: 'Letters Leggen (Sterke Werkwoorden)',
          categoryIcon: '✏️',
          question: 'Spel het voltooid deelwoord van "BIJTEN":',
          type: 'spell',
          targetWord: 'GEBETEN',
          scrambledLetters: ['G', 'E', 'B', 'E', 'T', 'E', 'N'],
          hint: 'Bijten - beet - gebeten.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    }
  ],

  snow: [
    {
      id: 1,
      name: 'Barny’s Pool Taalpuzzels',
      biome: 'snow',
      theme: 'Woorden met -isch, -lijk en Hoofdletters',
      themeColor: '#00ACC1',
      bannerEmoji: '🐻‍❄️',
      chapterTitle: 'Hoofdstuk 1: Het Bevroren Taalrijk',
      introStory: 'Barny de ijsbeer schudt de sneeuw van zijn oren: "Krakend ijs en scherpe grammatica!"',
      animalReward: findAnimal('barny-ijsbeer'),
      questions: [
        {
          id: 'snow68-1-1',
          category: 'Woorden met -isch',
          categoryIcon: '🐻‍❄️',
          question: 'Kies het juist gespelde woord: Het noorderlicht is een prachtig ___ verschijnsel.',
          type: 'choice',
          options: ['fantastisch', 'fantastis', 'fantastiese'],
          correctOptionIndex: 0,
          hint: 'Woorden op de klank -ies schrijf je als -isch.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'snow68-1-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '❄️',
          question: 'Wat is de verleden tijd van "bevriezen"? (Het water ... gisteravond)',
          type: 'choice',
          options: ['bevroor', 'bevriesde', 'bevroren'],
          correctOptionIndex: 0,
          hint: 'Bevriezen - bevroor - bevroren.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'snow68-1-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom bevriezen de poten van pinguïns en ijsberen niet op het ijs?',
          passage: 'Pooldieren beschikken over een ingenieus warmtewisselsysteem in hun poten. Warm bloed uit het lichaam stroomt vlak langs het koude bloed dat uit de voeten terugkeert, waardoor de warmte behouden blijft.',
          type: 'choice',
          options: [
            'Dankzij een intern warmtewisselsysteem in hun bloedvaten',
            'Doordat ze op warme stenen staan',
            'Omdat hun bloed van kokend water is gemaakt'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over het ingenieuze warmtewisselsysteem in de bloedvaten.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 2,
      name: 'Piet’s Trema Keizerrijk',
      biome: 'snow',
      theme: 'Trema bij Pinguïn & Sterk Werkwoord Glijden',
      themeColor: '#0097A7',
      bannerEmoji: '🐧',
      chapterTitle: 'Hoofdstuk 2: De Keizerspinguïn Broedkolonie',
      introStory: 'Piet staat dapper in de sneeuwstorm van -40 graden: "Let op het trema in mijn naam pinguïn!"',
      animalReward: findAnimal('piet-pinguin'),
      questions: [
        {
          id: 'snow68-2-1',
          category: 'Trema Woorden',
          categoryIcon: '🐧',
          question: 'Kies de juiste spelling voor de vogel in jacquet:',
          type: 'choice',
          options: ['pinguïn', 'pinguin', 'pinguën'],
          correctOptionIndex: 0,
          hint: 'Pinguïn krijgt een trema op de i om de klank te scheiden: pin-gu-in.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'snow68-2-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🧊',
          question: 'Wat is de verleden tijd van "glijden"? (De pinguïns ... op hun buik over het ijs)',
          type: 'choice',
          options: ['gleden', 'glijdden', 'gleeden'],
          correctOptionIndex: 0,
          hint: 'Glijden - gleed - gegleden (meervoud: gleden).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'snow68-2-3',
          category: 'Letters Leggen (Sterke Werkwoorden)',
          categoryIcon: '✏️',
          question: 'Spel het voltooid deelwoord van "STAAN":',
          type: 'spell',
          targetWord: 'GESTAAN',
          scrambledLetters: ['G', 'E', 'S', 'T', 'A', 'A', 'N'],
          hint: 'Staan - stond - gestaan.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    },
    {
      id: 3,
      name: 'Sam’s Diepe Duikcursus',
      biome: 'snow',
      theme: 'Sterk Werkwoord Liggen & ’t Kofschip Geplonst',
      themeColor: '#37474F',
      bannerEmoji: '🦭',
      chapterTitle: 'Hoofdstuk 3: Zonnen op de Schots',
      introStory: 'Sam klapt in haar vinnen: "Wie kent het verschil tussen liggen en leggen?"',
      animalReward: findAnimal('sam-zeehond'),
      questions: [
        {
          id: 'snow68-3-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🦭',
          question: 'Wat is de verleden tijd van "liggen"? (De zeehond ... op de ijsschots)',
          type: 'choice',
          options: ['lag', 'leide', 'loog'],
          correctOptionIndex: 0,
          hint: 'Liggen - lag - gelegen.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'snow68-3-2',
          category: '’t Kofschip Voltooid Deelwoord',
          categoryIcon: '💧',
          question: 'Kies de juiste spelling: De zeehond is met een plons in het water ___.',
          type: 'choice',
          options: ['geplonst', 'geplonsd', 'geplonste'],
          correctOptionIndex: 0,
          hint: 'Plonsen -> stam plons (s zit in ’t kofschip) -> geplonst.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'snow68-3-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Hoe blijven zeehonden warm in ijskoud zeewater?',
          passage: 'Zeehonden hebben onder hun huid een speklaag (blubber) van wel 10 centimeter dik. Deze laag isoleert zo goed dat sneeuw op hun rug niet eens smelt als ze liggen te zonnen.',
          type: 'choice',
          options: [
            'Dankzij een isolerende blubberlaag van 10 cm dik',
            'Doordat ze onderwaterkacheltjes aanzetten',
            'Omdat koud water hen niet raakt'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de speklaag (blubber) van 10 cm.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 4,
      name: 'Fay’s Camouflage Vossenpad',
      biome: 'snow',
      theme: 'Sterk Werkwoord Vinden & Seizoensspelling',
      themeColor: '#78909C',
      bannerEmoji: '🦊',
      chapterTitle: 'Hoofdstuk 4: De Kleur van het Seizoen',
      introStory: 'Fay kijkt slim om zich heen: "In de zomer ben ik bruin en in de winter wit! Vervoeg het werkwoord vinden!"',
      animalReward: findAnimal('fay-poolvos'),
      questions: [
        {
          id: 'snow68-4-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🦊',
          question: 'Wat is de verleden tijd van "vinden"? (De poolvos ... een lekker hapje)',
          type: 'choice',
          options: ['vond', 'vintte', 'voond'],
          correctOptionIndex: 0,
          hint: 'Vinden - vond - gevonden.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'snow68-4-2',
          category: 'Werkwoordspelling (Inversie)',
          categoryIcon: '❄️',
          question: 'Vul in: Waarom ___ jij zo stil door de sneeuw?',
          type: 'choice',
          options: ['loop', 'loopt', 'loopte'],
          correctOptionIndex: 0,
          hint: 'Jij achter het werkwoord -> stam: loop jij.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'snow68-4-3',
          category: 'Letters Leggen (Sterke Werkwoorden)',
          categoryIcon: '✏️',
          question: 'Spel het voltooid deelwoord van "SLUIPEN":',
          type: 'spell',
          targetWord: 'GESLOPEN',
          scrambledLetters: ['G', 'E', 'S', 'L', 'O', 'P', 'E', 'N'],
          hint: 'Sluipen - sloop - geslopen.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    },
    {
      id: 5,
      name: 'Hedwig’s Nachtelijke Vlucht',
      biome: 'snow',
      theme: 'Sterk Werkwoord Zien & Vliegen, Uilenanatomie',
      themeColor: '#B0BEC5',
      bannerEmoji: '🦉',
      chapterTitle: 'Hoofdstuk 5: Geruisloos over de Toendra',
      introStory: 'Hedwig draait haar kop 270 graden rond: "Wie kent de verleden tijd van zien en vliegen?"',
      animalReward: findAnimal('hedwig-sneeuwuil'),
      questions: [
        {
          id: 'snow68-5-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🦉',
          question: 'Wat is de verleden tijd van "vliegen"? (De sneeuwuil ... geruisloos over de sneeuw)',
          type: 'choice',
          options: ['vloog', 'vliegde', 'vlocht'],
          correctOptionIndex: 0,
          hint: 'Vliegen - vloog - gevlogen.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'snow68-5-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '👀',
          question: 'Wat is de verleden tijd van "zien"? (Zij ... de muis onder het sneeuwdek)',
          type: 'choice',
          options: ['zag', 'zagte', 'zaag'],
          correctOptionIndex: 0,
          hint: 'Zien - zag - gezien.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'snow68-5-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom kunnen uilen hun ogen niet bewegen in hun oogkassen?',
          passage: 'De ogen van een uil zijn niet bolvormig zoals bij mensen, maar buisvormig en zitten vast in hun schedel. Om rond te kijken moeten uilen daarom hun hele kop tot wel 270 graden draaien.',
          type: 'choice',
          options: [
            'Omdat hun ogen buisvormig zijn en vastzitten in de schedel',
            'Omdat uilen geen spieren in hun gezicht hebben',
            'Doordat ze altijd een zonnebril dragen'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de buisvormige ogen en de 270 graden kopdraai.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 6,
      name: 'Sven’s Grote Trektocht',
      biome: 'snow',
      theme: 'Sterk Werkwoord Trekken & Hoefadaptatie',
      themeColor: '#8D6E63',
      bannerEmoji: '🦌',
      chapterTitle: 'Hoofdstuk 6: De Eindeloze Toendra',
      introStory: 'Sven stapt dapper voorop door de sneeuwstorm: "Vervoeg het werkwoord trekken en lopen!"',
      animalReward: findAnimal('sven-rendier'),
      questions: [
        {
          id: 'snow68-6-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🦌',
          question: 'Wat is de verleden tijd van "trekken"? (De kudde rendieren ... naar het zuiden)',
          type: 'choice',
          options: ['trok', 'trekte', 'trocht'],
          correctOptionIndex: 0,
          hint: 'Trekken - trok - getrokken.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'snow68-6-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '❄️',
          question: 'Wat is de verleden tijd van "lopen"? (De rendieren ... duizenden kilometers)',
          type: 'choice',
          options: ['liepen', 'loopten', 'lepen'],
          correctOptionIndex: 0,
          hint: 'Lopen - liep - gelopen (meervoud: liepen).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'snow68-6-3',
          category: 'Letters Leggen (Sterke Werkwoorden)',
          categoryIcon: '✏️',
          question: 'Spel het voltooid deelwoord van "BREKEN":',
          type: 'spell',
          targetWord: 'GEBROKEN',
          scrambledLetters: ['G', 'E', 'B', 'R', 'O', 'K', 'E', 'N'],
          hint: 'Breken - brak - gebroken.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    }
  ],

  jungle: [
    {
      id: 1,
      name: 'Pippa’s Woordenschat Tempel',
      biome: 'jungle',
      theme: 'Apostrof-s, Meervouden & Sterk Werkwoord Eten',
      themeColor: '#388E3C',
      bannerEmoji: '🐼',
      chapterTitle: 'Hoofdstuk 1: De Woordenschat Tempel',
      introStory: 'Pippa kauwt rustig op bamboe: "Laten we de moeilijkste meervouden van het regenwoud ontrafelen!"',
      animalReward: findAnimal('pippa-panda'),
      questions: [
        {
          id: 'jungle68-1-1',
          category: 'Meervoud met Apostrof',
          categoryIcon: '🐼',
          question: 'Kies de juiste spelling van het meervoud van "panda":',
          type: 'choice',
          options: ["panda's", 'pandas', "panda'es"],
          correctOptionIndex: 0,
          hint: 'Woorden op lange a, o, u krijgen apostrof-s bij het meervoud.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'jungle68-1-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🎋',
          question: 'Wat is de verleden tijd van "eten"? (Pippa ... gisteren wel 10 kilo bamboe)',
          type: 'choice',
          options: ['at', 'eette', 'oot'],
          correctOptionIndex: 0,
          hint: 'Eten - at - gegeten.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'jungle68-1-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom moet een reuzenpanda wel 12 tot 16 uur per dag eten?',
          passage: 'Bamboe bevat ontzettend weinig voedingsstoffen en calorieën. Om toch voldoende energie binnen te krijgen, moet een volwassen panda gigantische hoeveelheden stengels en bladeren per dag consumeren.',
          type: 'choice',
          options: [
            'Omdat bamboe heel weinig calorieën en voedingsstoffen bevat',
            'Omdat panda’s meedoen aan een eetwedstrijd',
            'Omdat ze vergeten wanneer ze vol zitten'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de lage hoeveelheid voedingsstoffen in bamboe.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 2,
      name: 'Paco’s Welbespraakte Tak',
      biome: 'jungle',
      theme: 'Sterk Werkwoord Spreken & Leenwoorden',
      themeColor: '#E53935',
      bannerEmoji: '🦜',
      chapterTitle: 'Hoofdstuk 2: Woordenrijkdom in de Boomtop',
      introStory: 'Paco zingt een wijs lied: "Onderzoek de verleden tijd van spreken en begrijpen!"',
      animalReward: findAnimal('paco-papegaai'),
      questions: [
        {
          id: 'jungle68-2-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🦜',
          question: 'Wat is de verleden tijd van "spreken"? (De papegaai ... vloeiend Nederlands)',
          type: 'choice',
          options: ['sprak', 'spreekte', 'sprook'],
          correctOptionIndex: 0,
          hint: 'Spreken - sprak - gesproken.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'jungle68-2-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '📖',
          question: 'Wat is de verleden tijd van "begrijpen"? (De kinderen ... de taalregels)',
          type: 'choice',
          options: ['begrepen', 'begrijpten', 'begroepen'],
          correctOptionIndex: 0,
          hint: 'Begrijpen - begreep - begrepen (meervoud: begrepen).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'jungle68-2-3',
          category: 'Letters Leggen (Sterke Werkwoorden)',
          categoryIcon: '✏️',
          question: 'Spel het voltooid deelwoord van "FLIJTEN / FLUITEN":',
          type: 'spell',
          targetWord: 'GEFLOTEN',
          scrambledLetters: ['G', 'E', 'F', 'L', 'O', 'T', 'E', 'N'],
          hint: 'Fluiten - floot - gefloten.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    },
    {
      id: 3,
      name: 'Toby’s Tijgerjacht',
      biome: 'jungle',
      theme: 'Sterk Werkwoord Besluipen & Springen',
      themeColor: '#FB8C00',
      bannerEmoji: '🐯',
      chapterTitle: 'Hoofdstuk 3: Meesters van het Territorium',
      introStory: 'Toby sluipt door de dichte jungle: "Kijk goed naar klankveranderingen bij besluipen en springen!"',
      animalReward: findAnimal('toby-tijger'),
      questions: [
        {
          id: 'jungle68-3-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🐯',
          question: 'Wat is de verleden tijd van "besluipen"? (De tijger ... zijn prooi)',
          type: 'choice',
          options: ['besloop', 'besluipte', 'besloopen'],
          correctOptionIndex: 0,
          hint: 'Besluipen - besloop - beslopen.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'jungle68-3-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🐾',
          question: 'Wat is de verleden tijd van "springen"? (Toby ... over de brede beek)',
          type: 'choice',
          options: ['sprong', 'springde', 'sprang'],
          correctOptionIndex: 0,
          hint: 'Springen - sprong - gesprongen.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'jungle68-3-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom heeft elke tijger een ander streepjespatroon?',
          passage: 'Net zoals menselijke vingerafdrukken is het streeppatroon van een tijger 100% uniek. Zelfs als je een tijger zou scheren, zitten de strepen precies op dezelfde plek in zijn huid gegroeid!',
          type: 'choice',
          options: [
            'Omdat het streeppatroon een unieke natuurlijke vingerafdruk is',
            'Omdat tijgers hun strepen zelf schilderen',
            'Door de stand van de maan bij hun geboorte'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de unieke vingerafdruk in de huid.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 4,
      name: 'Koko’s Grijpstaarten School',
      biome: 'jungle',
      theme: 'Sterk Werkwoord Grijpen & Zwaaien',
      themeColor: '#8D6E63',
      bannerEmoji: '🐒',
      chapterTitle: 'Hoofdstuk 4: De Vijfde Hand',
      introStory: 'Koko zwaait met topsnelheid tussen de boomkruinen: "Vervoeg het werkwoord grijpen en werpen!"',
      animalReward: findAnimal('koko-aap'),
      questions: [
        {
          id: 'jungle68-4-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🐒',
          question: 'Wat is de verleden tijd van "grijpen"? (Koko ... de rijpe banaan)',
          type: 'choice',
          options: ['greep', 'grijpte', 'greept'],
          correctOptionIndex: 0,
          hint: 'Grijpen - greep - gegrepen.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'jungle68-4-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🌴',
          question: 'Wat is de verleden tijd van "werpen"? (Het aapje ... de schil op de grond)',
          type: 'choice',
          options: ['wierp', 'werpte', 'worp'],
          correctOptionIndex: 0,
          hint: 'Werpen - wierp - geworpen.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'jungle68-4-3',
          category: 'Letters Leggen (Sterke Werkwoorden)',
          categoryIcon: '✏️',
          question: 'Spel het voltooid deelwoord van "HANGEN":',
          type: 'spell',
          targetWord: 'GEHANGEN',
          scrambledLetters: ['G', 'E', 'H', 'A', 'N', 'G', 'E', 'N'],
          hint: 'Hangen - hing - gehangen.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    },
    {
      id: 5,
      name: 'Charlie’s Celkristallen',
      biome: 'jungle',
      theme: 'Sterk Werkwoord Kijken & Kleurverandering Begrip',
      themeColor: '#43A047',
      bannerEmoji: '🦎',
      chapterTitle: 'Hoofdstuk 5: Nano-kristallen in de Huid',
      introStory: 'Charlie verandert van turquoise naar zonnegeel: "Kijk mee naar de verleden tijd van kijken en veranderen!"',
      animalReward: findAnimal('charlie-kameleon'),
      questions: [
        {
          id: 'jungle68-5-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🦎',
          question: 'Wat is de verleden tijd van "kijken"? (Charlie ... met één oog naar boven)',
          type: 'choice',
          options: ['keek', 'kijkte', 'kook'],
          correctOptionIndex: 0,
          hint: 'Kijken - keek - gekeken.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'jungle68-5-2',
          category: 'Werkwoordspelling (VT regelmatig)',
          categoryIcon: '🎨',
          question: 'Vul in: De kameleon ___ binnen enkele seconden van kleur.',
          type: 'choice',
          options: ['veranderde', 'veranderte', 'veranderdde'],
          correctOptionIndex: 0,
          hint: 'Veranderen -> stam verander (r zit niet in ’t kofschip) -> veranderde.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'jungle68-5-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Hoe verandert een kameleon werkelijk van kleur volgens de wetenschap?',
          passage: 'Kameleons veranderen van kleur door de afstand tussen microscopische nanokristallen in hun huidcellen aan te passen. Hierdoor buigt het licht op een andere manier af en zien we een andere kleur!',
          type: 'choice',
          options: [
            'Door de afstand tussen microscopische nanokristallen in hun huid aan te passen',
            'Omdat ze kleurstof drinken uit bloemen',
            'Door heel hard te knipperen met hun ogen'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de nanokristallen in de huidcellen.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 6,
      name: 'Maya’s Thermische Snavel',
      biome: 'jungle',
      theme: 'Sterk Werkwoord Plukken & Warmtehuishouding',
      themeColor: '#FF6F00',
      bannerEmoji: '🪶',
      chapterTitle: 'Hoofdstuk 6: De Kleurrijke Kroon',
      introStory: 'Maya kijkt trots met haar reuzensnavel: "Vervoeg het werkwoord vliegen en ontdek de geheimen van mijn snavel!"',
      animalReward: findAnimal('maya-toekan'),
      questions: [
        {
          id: 'jungle68-6-1',
          category: '’t Kofschip Voltooid Deelwoord',
          categoryIcon: '🪶',
          question: 'Kies de juiste spelling: De toekan heeft een rijpe vrucht ___.',
          type: 'choice',
          options: ['geplukt', 'geplukd', 'geplukte'],
          correctOptionIndex: 0,
          hint: 'Plukken -> stam pluk (k zit in ’t kofschip) -> geplukt.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'jungle68-6-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🌳',
          question: 'Wat is de verleden tijd van "vliegen"? (De toekans ... naar het hoogste bladerdak)',
          type: 'choice',
          options: ['vlogen', 'vliegden', 'vloochten'],
          correctOptionIndex: 0,
          hint: 'Vliegen - vloog - gevlogen (meervoud: vlogen).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'jungle68-6-3',
          category: 'Letters Leggen (Sterke Werkwoorden)',
          categoryIcon: '✏️',
          question: 'Spel het voltooid deelwoord van "SCHIETEN":',
          type: 'spell',
          targetWord: 'GESCHOTEN',
          scrambledLetters: ['G', 'E', 'S', 'C', 'H', 'O', 'T', 'E', 'N'],
          hint: 'Schieten - schoot - geschoten.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    }
  ],

  outback: [
    {
      id: 1,
      name: 'Kiki’s Woestijn Werkwoorden',
      biome: 'outback',
      theme: 'Sterke Werkwoorden & Samengestelde Zinnen',
      themeColor: '#E65100',
      bannerEmoji: '🦘',
      chapterTitle: 'Hoofdstuk 1: De Grote Outback Sprong',
      introStory: 'Kiki de kangoeroe springt over de rotsen: "Geen sprong is te ver voor onze taalmeesters!"',
      animalReward: findAnimal('kiki-kangoeroe'),
      questions: [
        {
          id: 'outback68-1-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🦘',
          question: 'Wat is de verleden tijd van "springen"? (Gisteren ... Kiki over het ravijn)',
          type: 'choice',
          options: ['sprong', 'springde', 'sprang'],
          correctOptionIndex: 0,
          hint: 'Springen is een sterk werkwoord: springen - sprong - gesprongen.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'outback68-1-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🏜️',
          question: 'Wat is de verleden tijd van "dragen"? (De kangoeroe ... haar baby in de buidel)',
          type: 'choice',
          options: ['droeg', 'draagde', 'draagte'],
          correctOptionIndex: 0,
          hint: 'Dragen - droeg - gedragen.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'outback68-1-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Hoe overleven kangoeroes extreme droogte in de Outback?',
          passage: 'Kangoeroes kunnen hun lichaamstemperatuur reguleren door speeksel op hun voorpoten te likken. Als de wind langs de natte aderen waait, koelt het bloed onmiddellijk af.',
          type: 'choice',
          options: [
            'Door speeksel op hun voorpoten te likken voor verdampingskoeling',
            'Door ijsklontjes te zoeken in de woestijn',
            'Door een parasol vast te houden met hun staart'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over het likken van speeksel op de voorpoten.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 2,
      name: 'Coco’s Ontgiftingsles',
      biome: 'outback',
      theme: 'Sterk Werkwoord Slapen & Giftige Bladeren',
      themeColor: '#8D6E63',
      bannerEmoji: '🐨',
      chapterTitle: 'Hoofdstuk 2: Meesterlijke Spijsvertering',
      introStory: 'Coco ontwaakt uit haar 20-urige slaap: "Vervoeg het werkwoord slapen en verteren!"',
      animalReward: findAnimal('coco-koala'),
      questions: [
        {
          id: 'outback68-2-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🐨',
          question: 'Wat is de verleden tijd van "slapen"? (De koala ... hoog in de eucalyptusboom)',
          type: 'choice',
          options: ['sliep', 'slaapte', 'sloop'],
          correctOptionIndex: 0,
          hint: 'Slapen - sliep - geslapen.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'outback68-2-2',
          category: 'Werkwoordspelling (VT regelmatig)',
          categoryIcon: '🌿',
          question: 'Vul in: De speciale lever van de koala ___ alle gifstoffen uit de bladeren.',
          type: 'choice',
          options: ['ontgiftte', 'ontgifte', 'ontgiften'],
          correctOptionIndex: 0,
          hint: 'Ontgiften -> stam ontgift + te = ontgiftte.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'outback68-2-3',
          category: 'Letters Leggen (Sterke Werkwoorden)',
          categoryIcon: '✏️',
          question: 'Spel het voltooid deelwoord van "VALLEN":',
          type: 'spell',
          targetWord: 'GEVALLEN',
          scrambledLetters: ['G', 'E', 'V', 'A', 'L', 'L', 'E', 'N'],
          hint: 'Vallen - viel - gevallen.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    },
    {
      id: 3,
      name: 'Wally’s Kubus Fabriek',
      biome: 'outback',
      theme: 'Sterk Werkwoord Graven & Bijzondere Keutels',
      themeColor: '#795548',
      bannerEmoji: '🐻',
      chapterTitle: 'Hoofdstuk 3: De Kubusvormige Bouwer',
      introStory: 'Wally schudt het stof van zijn rug: "Onderzoek de verleden tijd van graven en stoten!"',
      animalReward: findAnimal('wally-wombat'),
      questions: [
        {
          id: 'outback68-3-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🐻',
          question: 'Wat is de verleden tijd van "graven"? (De wombat ... een gangenstelsel van 20 meter)',
          type: 'choice',
          options: ['groef', 'graafde', 'greef'],
          correctOptionIndex: 0,
          hint: 'Graven - groef - gegraven.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'outback68-3-2',
          category: 'Werkwoordspelling (VT)',
          categoryIcon: '🪵',
          question: 'Vul in: De wombat ___ zijn achterste tegen de ingang van zijn hol om roofdieren tegen te houden.',
          type: 'choice',
          options: ['stootte', 'stote', 'stootten'],
          correctOptionIndex: 0,
          hint: 'Stoten -> stam stoot + te = stootte.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'outback68-3-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom zijn de keutels van een wombat kubusvormig?',
          passage: 'Wombats gebruiken hun keutels om hun territorium op stenen en omgevallen bomen af te bakenen. Doordat de keutels kubusvormig zijn, rollen ze niet van ronde rotsen af!',
          type: 'choice',
          options: [
            'Zodat ze niet van rotsen en boomstammen af rollen bij territoriummarkering',
            'Omdat wombats alleen blokjes kaas eten',
            'Zodat ze er torentjes mee kunnen bouwen'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over het voorkomen van wegrollen op rotsen.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 4,
      name: 'Daan’s Woestijn Roedel',
      biome: 'outback',
      theme: 'Sterk Werkwoord Jagen & Huilen in de Nacht',
      themeColor: '#D84315',
      bannerEmoji: '🐕',
      chapterTitle: 'Hoofdstuk 4: De Geest van de Woestijn',
      introStory: 'Daan kijkt naar de sterrenhemel: "Vervoeg het werkwoord jagen en horen!"',
      animalReward: findAnimal('daan-dingo'),
      questions: [
        {
          id: 'outback68-4-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🐕',
          question: 'Wat is de verleden tijd van "jagen"? (De dingo’s ... samen op de vlakte)',
          type: 'choice',
          options: ['joegen', 'jaagden', 'joegden'],
          correctOptionIndex: 0,
          hint: 'Jagen - joeg - gejaagd (meervoud: joegen).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'outback68-4-2',
          category: 'Werkwoordspelling (VT regelmatig)',
          categoryIcon: '🌕',
          question: 'Vul in: De dingo ___ luid naar de volle maan.',
          type: 'choice',
          options: ['huilde', 'huilte', 'huillde'],
          correctOptionIndex: 0,
          hint: 'Huilen -> stam huil (l zit niet in ’t kofschip) -> huilde.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'outback68-4-3',
          category: 'Letters Leggen (Sterke Werkwoorden)',
          categoryIcon: '✏️',
          question: 'Spel het voltooid deelwoord van "HOREN":',
          type: 'spell',
          targetWord: 'GEHOORD',
          scrambledLetters: ['G', 'E', 'H', 'O', 'O', 'R', 'D'],
          hint: 'Horen - hoorde - gehoord.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    },
    {
      id: 5,
      name: 'Ellie’s Snelheidswedstrijd',
      biome: 'outback',
      theme: 'Sterk Werkwoord Rennen & Vleugelloze Vogels',
      themeColor: '#BF360C',
      bannerEmoji: '🦤',
      chapterTitle: 'Hoofdstuk 5: Gigantische Passen',
      introStory: 'Ellie rent over het rode zand: "Onderzoek de verleden tijd van rennen en leggen!"',
      animalReward: findAnimal('ellie-emoe'),
      questions: [
        {
          id: 'outback68-5-1',
          category: 'Werkwoordspelling (VT regelmatig)',
          categoryIcon: '🦤',
          question: 'Vul in: De emoe ___ in sneltreinvaart voorbij de heuvel.',
          type: 'choice',
          options: ['rende', 'rente', 'rendte'],
          correctOptionIndex: 0,
          hint: 'Rennen -> stam ren (n zit niet in ’t kofschip) -> rende.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'outback68-5-2',
          category: 'Sterke Werkwoorden (Voltooid Deelwoord)',
          categoryIcon: '🥚',
          question: 'De emoe heeft een donkergroen ei ___. (werkwoord: leggen)',
          type: 'choice',
          options: ['gelegd', 'geleid', 'gelegtt'],
          correctOptionIndex: 0,
          hint: 'Leggen - legde - gelegd.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'outback68-5-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom kunnen emoes niet vliegen maar wel uitstekend rennen?',
          passage: 'Emoes hebben hele kleine rudimentaire vleugeltjes die te zwak zijn om hun zware lichaam op te tillen. Hun beenspieren zijn daarentegen extreem ontwikkeld en voorzien van krachtige elastische pezen.',
          type: 'choice',
          options: [
            'Omdat hun vleugels te klein zijn maar hun beenspieren gigantisch sterk zijn',
            'Omdat emoes bang zijn voor hoogtes',
            'Omdat de lucht in Australië te dun is om te vliegen'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de kleine vleugels en krachtige beenspieren.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 6,
      name: 'Finn’s Zandkoeling',
      biome: 'outback',
      theme: 'Sterk Werkwoord Horen & Woestijnadaptaties',
      themeColor: '#FF8A65',
      bannerEmoji: '🦊',
      chapterTitle: 'Hoofdstuk 6: De Gouden Duinen',
      introStory: 'Finn spitst zijn reusachtige oren: "Vervoeg het werkwoord luisteren en vinden!"',
      animalReward: findAnimal('finn-vos'),
      questions: [
        {
          id: 'outback68-6-1',
          category: 'Werkwoordspelling (VT regelmatig)',
          categoryIcon: '🦊',
          question: 'Vul in: De woestijnvos ___ aandachtig naar geluiden onder het zand.',
          type: 'choice',
          options: ['luisterde', 'luisterte', 'luisterdde'],
          correctOptionIndex: 0,
          hint: 'Luisteren -> stam luister (r zit niet in ’t kofschip) -> luisterde.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'outback68-6-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '👂',
          question: 'Wat is de verleden tijd van "horen"? (Finn ... het zachte geritsel)',
          type: 'choice',
          options: ['hoorde', 'hoorte', 'horde'],
          correctOptionIndex: 0,
          hint: 'Horen - hoorde - gehoord.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'outback68-6-3',
          category: 'Letters Leggen (Sterke Werkwoorden)',
          categoryIcon: '✏️',
          question: 'Spel het voltooid deelwoord van "GRAVEN":',
          type: 'spell',
          targetWord: 'GEGRAVEN',
          scrambledLetters: ['G', 'E', 'G', 'R', 'A', 'V', 'E', 'N'],
          hint: 'Graven - groef - gegraven.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    }
  ],

  mountain: [
    {
      id: 1,
      name: 'Boris’ Hoge Grammatica Toppen',
      biome: 'mountain',
      theme: 'Moeilijke Spelling & Vaste Voorzetsels',
      themeColor: '#5C6BC0',
      bannerEmoji: '🏔️',
      chapterTitle: 'Hoofdstuk 1: De Berg der Wijsheid',
      introStory: 'Boris kijkt vanaf de hoogste bergtop: "We hebben de top bereikt! Tijd voor de ultieme taaltoets!"',
      animalReward: findAnimal('boris-steenbok'),
      questions: [
        {
          id: 'mountain68-1-1',
          category: 'Vaste Voorzetsels & Uitdrukkingen',
          categoryIcon: '🐐',
          question: 'Kies het juiste voorzetsel: Boris verbaast zich ___ de steile bergwand.',
          type: 'choice',
          options: ['over', 'aan', 'voor'],
          correctOptionIndex: 0,
          hint: 'Je verbaast je ALTIJD "over" iets.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'mountain68-1-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🏔️',
          question: 'Wat is de verleden tijd van "klimmen"? (De steenbokken ... naar de hoogste richel)',
          type: 'choice',
          options: ['klommen', 'klimden', 'kloommen'],
          correctOptionIndex: 0,
          hint: 'Klimmen - klom - geklommen (meervoud: klommen).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'mountain68-1-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom kunnen steenbokken zout likken van bijna verticale stuwdammen?',
          passage: 'Steenbokken hebben gespleten hoeven die onafhankelijk kunnen bewegen en voorzien zijn van gripkussentjes. Ze trotseren 90 graden steile stuwdamwanden om zouten en mineralen van de stenen te likken.',
          type: 'choice',
          options: [
            'Dankzij onafhankelijk bewegende gespleten hoeven met gripkussentjes',
            'Omdat ze aan de stenen blijven plakken met lijm',
            'Doordat ze touwen en berghaken gebruiken'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de onafhankelijk bewegende gespleten hoeven.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 2,
      name: 'Max’ Fluitsignalen',
      biome: 'mountain',
      theme: 'Sterk Werkwoord Fluiten & Winterslaap',
      themeColor: '#8D6E63',
      bannerEmoji: '🐿️',
      chapterTitle: 'Hoofdstuk 2: De Echo in het Dal',
      introStory: 'Max staat op de uitkijk: "Vervoeg het werkwoord fluiten en slapen!"',
      animalReward: findAnimal('max-marmot'),
      questions: [
        {
          id: 'mountain68-2-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🐿️',
          question: 'Wat is de verleden tijd van "fluiten"? (De marmot ... om zijn familie te waarschuwen)',
          type: 'choice',
          options: ['floot', 'fluitte', 'floet'],
          correctOptionIndex: 0,
          hint: 'Fluiten - floot - gefloten.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'mountain68-2-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '❄️',
          question: 'Wat is de verleden tijd van "slapen"? (De marmotten ... zeven maanden lang)',
          type: 'choice',
          options: ['sliepen', 'slaapten', 'sloopen'],
          correctOptionIndex: 0,
          hint: 'Slapen - sliep - geslapen (meervoud: sliepen).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'mountain68-2-3',
          category: 'Letters Leggen (Sterke Werkwoorden)',
          categoryIcon: '✏️',
          question: 'Spel het voltooid deelwoord van "WAARSCHUWEN":',
          type: 'spell',
          targetWord: 'GEWAARSCHUWD',
          scrambledLetters: ['G', 'E', 'W', 'A', 'A', 'R', 'S', 'C', 'H', 'U', 'W', 'D'],
          hint: 'Waarschuwen - waarschuwde - gewaarschuwd.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    },
    {
      id: 3,
      name: 'Luna’s Thermische Wol',
      biome: 'mountain',
      theme: 'Sterk Werkwoord Spugen & Thermische Isolatie',
      themeColor: '#A1887F',
      bannerEmoji: '🦙',
      chapterTitle: 'Hoofdstuk 3: De Edele Alpacavezels',
      introStory: 'Luna kijkt parmantig: "Wist je dat alpacawol holle vezels heeft die geen water opnemen?"',
      animalReward: findAnimal('luna-alpaca'),
      questions: [
        {
          id: 'mountain68-3-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🦙',
          question: 'Wat is de verleden tijd van "spugen"? (De boze alpaca ... naar de belager)',
          type: 'choice',
          options: ['spoog', 'spuugde', 'spoeg'],
          correctOptionIndex: 0,
          hint: 'Spugen - spoog - gespogen.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'mountain68-3-2',
          category: 'Werkwoordspelling (VT)',
          categoryIcon: '🧶',
          question: 'Vul in: De bergbewoners ___ prachtige truien van alpacawol.',
          type: 'choice',
          options: ['weefden', 'weevden', 'weoften'],
          correctOptionIndex: 0,
          hint: 'Weven -> stam weef (f zit in ’t kofschip, maar weven heeft verleden tijd weefde / weefden).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'mountain68-3-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom is alpacawol lichter en warmer dan gewone schapenwol?',
          passage: 'Alpacavezels zijn van binnen microscopisch hol. Deze opgesloten luchtkamers zorgen voor een uitzonderlijke thermische isolatie zonder extra gewicht toe te voegen.',
          type: 'choice',
          options: [
            'Omdat de vezels microscopisch hol zijn en warme lucht vasthouden',
            'Omdat alpacawol van zonnestralen is geweven',
            'Doordat alpacawol ingesmeerd is met honing'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de microscopisch holle vezels en isolatie.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 4,
      name: 'Alex’ Koninklijke Thermiek',
      biome: 'mountain',
      theme: 'Sterk Werkwoord Zweven & Zien, Telescoopogen',
      themeColor: '#4E342E',
      bannerEmoji: '🦅',
      chapterTitle: 'Hoofdstuk 4: Blik vanaf de Wolken',
      introStory: 'Alex cirkelt op de warme opstijgende lucht: "Vervoeg het werkwoord zweven en zien!"',
      animalReward: findAnimal('alex-arend'),
      questions: [
        {
          id: 'mountain68-4-1',
          category: 'Werkwoordspelling (VT regelmatig)',
          categoryIcon: '🦅',
          question: 'Vul in: De koningsarend ___ urenlang geruisloos op de thermiek.',
          type: 'choice',
          options: ['zweefde', 'zweefte', 'zweevde'],
          correctOptionIndex: 0,
          hint: 'Zweven -> stam zweef (v verandert in f bij stam, maar verleden tijd is zweefde).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'mountain68-4-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '👀',
          question: 'Wat is de verleden tijd van "zien"? (Alex ... het prooidier van kilometers ver)',
          type: 'choice',
          options: ['zag', 'zagte', 'zaag'],
          correctOptionIndex: 0,
          hint: 'Zien - zag - gezien.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'mountain68-4-3',
          category: 'Letters Leggen (Sterke Werkwoorden)',
          categoryIcon: '✏️',
          question: 'Spel het voltooid deelwoord van "DUIKEN":',
          type: 'spell',
          targetWord: 'GEDOKEN',
          scrambledLetters: ['G', 'E', 'D', 'O', 'K', 'E', 'N'],
          hint: 'Duiken - dook - gedoken.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    },
    {
      id: 5,
      name: 'Saar’s Lawine Redding',
      biome: 'mountain',
      theme: 'Sterk Werkwoord Vinden & Reddingshonden Regels',
      themeColor: '#BCAAA4',
      bannerEmoji: '🐕‍🦺',
      chapterTitle: 'Hoofdstuk 5: Moed in de Sneeuwstorm',
      introStory: 'Saar blaft bemoedigend: "Vervoeg het werkwoord redden en vinden!"',
      animalReward: findAnimal('saar-sint-bernard'),
      questions: [
        {
          id: 'mountain68-5-1',
          category: 'Werkwoordspelling (VT regelmatig)',
          categoryIcon: '🐕‍🦺',
          question: 'Vul in: De trouwe hulphond ___ de verdwaalde wandelaar uit de sneeuw.',
          type: 'choice',
          options: ['redde', 'redte', 'reddde'],
          correctOptionIndex: 0,
          hint: 'Redden -> stam red + de = redde.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'mountain68-5-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '❄️',
          question: 'Wat is de verleden tijd van "vinden"? (Saar ... het juiste spoor)',
          type: 'choice',
          options: ['vond', 'vintte', 'voond'],
          correctOptionIndex: 0,
          hint: 'Vinden - vond - gevonden.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'mountain68-5-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Hoe kunnen Sint-Bernards mensen ruiken onder meters dikke sneeuw?',
          passage: 'Honden hebben meer dan 220 miljoen geurreceptoren (vergeleken met slechts 5 miljoen bij mensen). Hierdoor kunnen ze geurmoleculen die door microscopische luchtspleetjes in de sneeuw naar boven sijpelen direct lokaliseren.',
          type: 'choice',
          options: [
            'Dankzij 220 miljoen geurreceptoren die opstijgende geurmoleculen detecteren',
            'Omdat ze door sneeuw heen kunnen kijken met röntgenogen',
            'Doordat mensen altijd bellen met een toeter'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de 220 miljoen geurreceptoren.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 6,
      name: 'Bella’s Bergtop Finale',
      biome: 'mountain',
      theme: 'Sterk Werkwoord Ontsnappen & Ultieme Kloofsprong',
      themeColor: '#795548',
      bannerEmoji: '🦌',
      chapterTitle: 'Hoofdstuk 6: De Grote Bergfinale',
      introStory: 'Bella het gemsje staat fier op de hoogste bergtop van het Wonderrijk: "Gefeliciteerd! Je hebt alle 42 dierenlocaties bereikt!"',
      animalReward: findAnimal('bella-gems'),
      questions: [
        {
          id: 'mountain68-6-1',
          category: '’t Kofschip Voltooid Deelwoord',
          categoryIcon: '🦌',
          question: 'Kies de juiste spelling: De gems is behendig aan het gevaar ___.',
          type: 'choice',
          options: ['ontsnapt', 'ontsnapd', 'ontsnapte'],
          correctOptionIndex: 0,
          hint: 'Ontsnappen -> stam ontsnap (p zit in ’t kofschip) -> ontsnapt.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'mountain68-6-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🏔️',
          question: 'Wat is de verleden tijd van "springen"? (De gemsen ... over de gletsjerspleet)',
          type: 'choice',
          options: ['sprongen', 'springden', 'sproengen'],
          correctOptionIndex: 0,
          hint: 'Springen - sprong - gesprongen (meervoud: sprongen).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'mountain68-6-3',
          category: 'Letters Leggen (Sterke Werkwoorden)',
          categoryIcon: '✏️',
          question: 'Spel het voltooid deelwoord van "WINNEN":',
          type: 'spell',
          targetWord: 'GEWONNEN',
          scrambledLetters: ['G', 'E', 'W', 'O', 'N', 'N', 'E', 'N'],
          hint: 'Winnen - won - gewonnen!',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    }
  ]
};
