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

export const BIOME_LEVELS_GROEP_4_5: Record<BiomeType, Level[]> = {
  farm: [
    {
      id: 1,
      name: 'Bella’s Weilanden',
      biome: 'farm',
      theme: 'Korte en Lange Klanken (Bomen vs Bommen)',
      themeColor: '#4CAF50',
      bannerEmoji: '🐮',
      chapterTitle: 'Hoofdstuk 1: Ochtendgloren op de Boerderij',
      introStory: 'De ochtendzon schijnt over de weilanden. Bella de koe loeit: "Moeh! Help je me de verse bomen en kruiden op de juiste manier te spellen?"',
      animalReward: findAnimal('bella-koe'),
      questions: [
        {
          id: 'farm45-1-1',
          category: 'Klinkers & Klankgroepen',
          categoryIcon: '🐮',
          question: 'Kies het juist gespelde woord: In de wei staan mooie grote ___.',
          type: 'choice',
          options: ['boomen', 'bomen', 'boommen'],
          correctOptionIndex: 1,
          hint: 'Klankgroep bo-men: lange klank aan het einde van de klankgroep, dus één klinker!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-1-2',
          category: 'Klinkers (Dubbele Medeklinker)',
          categoryIcon: '🥛',
          question: 'Welk woord is goed gespeld: De boer vult twee emmers vol verse ___.',
          type: 'choice',
          options: ['melk', 'mellek', 'melek'],
          correctOptionIndex: 0,
          hint: 'In melk hoor je een stomme e tussen de l en k, maar je schrijft hem niet!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-1-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor het edele dier in de wei:',
          type: 'spell',
          targetWord: 'KOE',
          scrambledLetters: ['K', 'O', 'E'],
          hint: 'Begint met een K en heeft twee klinkers: oe.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-1-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom hebben koeien vier magen?',
          passage: 'Koeien zijn herkauwers. Ze eten taai gras dat moeilijk te verteren is. Dankzij hun vier magen kunnen ze het gras twee keer fijnmalen en alle vitamines opnemen.',
          type: 'choice',
          options: ['Om het taaie gras goed te verteren', 'Omdat ze 4 liter water drinken', 'Om harder te kunnen rennen'],
          correctOptionIndex: 0,
          hint: 'Zoek in de tekst naar het woord "verteren".',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 2,
      name: 'Wolletje’s Schaapskooi',
      biome: 'farm',
      theme: 'Woorden met -ng en -nk (Plankwoorden)',
      themeColor: '#81C784',
      bannerEmoji: '🐑',
      chapterTitle: 'Hoofdstuk 2: Zachte Wolletjes',
      introStory: 'Wolletje huppelt door het klaverveld. "Bèèh! Wie helpt mee met het sorteren van de woorden met de ring- en bankklank?"',
      animalReward: findAnimal('wolletje-schaap'),
      questions: [
        {
          id: 'farm45-2-1',
          category: 'Plankwoorden (-nk)',
          categoryIcon: '🐑',
          question: 'Kies het juiste woord: De schapen drinken water bij de houten ___.',
          type: 'choice',
          options: ['plaank', 'plank', 'plang'],
          correctOptionIndex: 1,
          hint: 'Onthoud: in een plankwoord zit geen g tussen de n en de k!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-2-2',
          category: 'Zingwoorden (-ng)',
          categoryIcon: '💍',
          question: 'Kies het juiste woord: De bel aan het hek maakt een vrolijke ___.',
          type: 'choice',
          options: ['klang', 'klank', 'klanck'],
          correctOptionIndex: 1,
          hint: 'Net als bank, plank en klank.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-2-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor de zachte vacht:',
          type: 'spell',
          targetWord: 'WOL',
          scrambledLetters: ['W', 'O', 'L'],
          hint: 'Korte klank o tussen de w en l.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    },
    {
      id: 3,
      name: 'Storm’s Paardenweide',
      biome: 'farm',
      theme: 'Dubbelzetters & Open Lettergrepen (Draven & Rennen)',
      themeColor: '#A1887F',
      bannerEmoji: '🐴',
      chapterTitle: 'Hoofdstuk 3: Galop over het Veld',
      introStory: 'Storm hinnikt vrolijk bij het hek: "Hinnik! Laten we in volle galop oefenen met dubbele medeklinkers!"',
      animalReward: findAnimal('storm-paard'),
      questions: [
        {
          id: 'farm45-3-1',
          category: 'Dubbelzetter (Korte Klank)',
          categoryIcon: '🐴',
          question: 'Kies het juiste woord: De paarden ___ vrolijk door het malse gras.',
          type: 'choice',
          options: ['renen', 'rennen', 'reennen'],
          correctOptionIndex: 1,
          hint: 'Korte klank e, dus twee n-en!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-3-2',
          category: 'Enkelzetter (Lange Klank)',
          categoryIcon: '🌾',
          question: 'Kies het juiste woord: Storm kan heel sierlijk ___.',
          type: 'choice',
          options: ['draven', 'draaven', 'dravven'],
          correctOptionIndex: 0,
          hint: 'Klankgroep dra-ven: lange klank a, dus één a en één v!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-3-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor het dier met manen:',
          type: 'spell',
          targetWord: 'PAARD',
          scrambledLetters: ['P', 'A', 'A', 'R', 'D'],
          hint: 'Lange klank aa en eindigt op een d.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    },
    {
      id: 4,
      name: 'Pip’s Modderpoel',
      biome: 'farm',
      theme: 'Eindletter d of t & Samenstellingen',
      themeColor: '#F48FB1',
      bannerEmoji: '🐷',
      chapterTitle: 'Hoofdstuk 4: Plonsen in de Modder',
      introStory: 'Pip knort tevreden: "Knor knor! In de modderpoel leren we welke woorden op een d of t eindigen!"',
      animalReward: findAnimal('pip-varken'),
      questions: [
        {
          id: 'farm45-4-1',
          category: 'Eindletter d of t',
          categoryIcon: '🐷',
          question: 'Kies het juiste woord: Pip neemt een heerlijk modder___ om af te koelen.',
          type: 'choice',
          options: ['bat', 'bad', 'badd'],
          correctOptionIndex: 1,
          hint: 'Maak het woord langer: één bad, twee baden (d-klank)!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-4-2',
          category: 'Samenstellingen',
          categoryIcon: '🧼',
          question: 'Welk samengesteld woord is juist gespeld?',
          type: 'choice',
          options: ['varkensstal', 'varkenstal', 'varkens-stal'],
          correctOptionIndex: 0,
          hint: 'Varkens + stal = varkensstal (met tussenletter s).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-4-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom rollen varkens graag in de modder?',
          passage: 'Varkens kunnen niet zweten zoals mensen. Door een laagje natte modder op hun huid aan te brengen, blijven ze lekker koel en beschermt de opgedroogde modder tegen vliegen en zonnebrand.',
          type: 'choice',
          options: [
            'Omdat ze niet kunnen zweten en koel moeten blijven',
            'Omdat ze modder graag opeten',
            'Om zich te verstoppen voor de boerin'
          ],
          correctOptionIndex: 0,
          hint: 'Lees de eerste zin over zweten en koel blijven.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 5,
      name: 'Haantje’s Hooizolder',
      biome: 'farm',
      theme: 'Woorden met -aai, -ooi, -oei',
      themeColor: '#FF7043',
      bannerEmoji: '🐓',
      chapterTitle: 'Hoofdstuk 5: Kraaien op de Hooiberg',
      introStory: 'Haantje staat bovenop het nachthok: "Kukeleku! Vandaag zingen we woorden met aai, ooi en oei!"',
      animalReward: findAnimal('haantje-haan'),
      questions: [
        {
          id: 'farm45-5-1',
          category: 'Aai/Ooi/Oei woorden',
          categoryIcon: '🐓',
          question: 'Kies het juiste woord: De haan begint al vroeg te ___.',
          type: 'choice',
          options: ['kraajen', 'kraaien', 'kraaiden'],
          correctOptionIndex: 1,
          hint: 'Aai-woord: je hoort een j, maar je schrijft een i!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-5-2',
          category: 'Ooi-woord',
          categoryIcon: '🌾',
          question: 'Kies het juiste woord: De boer brengt vers ___ naar de paardenstal.',
          type: 'choice',
          options: ['hooi', 'hooj', 'hooy'],
          correctOptionIndex: 0,
          hint: 'Ooi-woord: je hoort een j, maar je schrijft een i!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-5-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor de vroege wekker:',
          type: 'spell',
          targetWord: 'HAAN',
          scrambledLetters: ['H', 'A', 'A', 'N'],
          hint: 'Lange klank aa tussen h en n.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    },
    {
      id: 6,
      name: 'Daisy’s Boerensloot',
      biome: 'farm',
      theme: 'Woorden met f naar v en s naar z',
      themeColor: '#26A69A',
      bannerEmoji: '🦆',
      chapterTitle: 'Hoofdstuk 6: Kwekken in de Vijver',
      introStory: 'Daisy spettert met haar vleugels: "Kwek kwek! Help mee met woorden waarin letters veranderen in het meervoud!"',
      animalReward: findAnimal('daisy-eend'),
      questions: [
        {
          id: 'farm45-6-1',
          category: 'f naar v meervoud',
          categoryIcon: '🦆',
          question: 'Wat is het meervoud van "duif"?',
          type: 'choice',
          options: ['duifen', 'duiven', 'duivven'],
          correctOptionIndex: 1,
          hint: 'De f verandert in een v bij het meervoud: duiven.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-6-2',
          category: 's naar z meervoud',
          categoryIcon: '🌾',
          question: 'Wat is het meervoud van "gans"?',
          type: 'choice',
          options: ['ganzen', 'gansen', 'ganzzen'],
          correctOptionIndex: 0,
          hint: 'De s verandert in een z: ganzen.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-6-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom worden eendenveren nooit nat?',
          passage: 'Eenden smeren hun veren in met een speciale vettige olie uit een klier bij hun staart. Hierdoor glijden waterdruppels er meteen vanaf en blijven ze warm en droog.',
          type: 'choice',
          options: [
            'Door een speciale vettige olie op hun veren',
            'Omdat eenden onder water een regenjas dragen',
            'Omdat hun veren van plastic zijn'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de vettige olie uit de klier.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    }
  ],

  safari: [
    {
      id: 1,
      name: 'Gigi’s Savanne Vlakte',
      biome: 'safari',
      theme: 'Korte en Lange Klinkers & Begrijpend Lezen',
      themeColor: '#FFB300',
      bannerEmoji: '🦒',
      chapterTitle: 'Hoofdstuk 1: De Hoge Acacia',
      introStory: 'De zon straalt over de savanne. Gigi buigt haar lange nek omlaag: "Welkom op de savanne! Laten we speuren naar de juiste spelling!"',
      animalReward: findAnimal('gigi-giraf'),
      questions: [
        {
          id: 'safari45-1-1',
          category: 'Klinkers (Dubbelzetter)',
          categoryIcon: '🦒',
          question: 'Kies het juiste woord: De giraf eet van de hoogste ___.',
          type: 'choice',
          options: ['takken', 'taken', 'tacken'],
          correctOptionIndex: 0,
          hint: 'Korte klank a, dus twee medeklinkers (k-k)!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'safari45-1-2',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor het dier met de lange nek:',
          type: 'spell',
          targetWord: 'GIRAF',
          scrambledLetters: ['G', 'I', 'R', 'A', 'F'],
          hint: 'Begint met een G en eindigt op een F.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'safari45-1-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom is de tong van een giraf donkerblauw?',
          passage: 'Giraffen steken hun tong wel 45 centimeter uit om blaadjes tussen scherpe doorns vandaan te plukken. Doordat de tong donker pigment bevat, verbrandt hij niet in de felle Afrikaanse zon.',
          type: 'choice',
          options: [
            'Als bescherming tegen zonnebrand',
            'Omdat ze alleen blauwe bessen eten',
            'Om roofdieren af te schrikken'
          ],
          correctOptionIndex: 0,
          hint: 'Kijk naar de bescherming tegen de felle zon.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 2,
      name: 'Leo’s Leeuwenrots',
      biome: 'safari',
      theme: 'Woorden met -eeuw en -ieuw',
      themeColor: '#FFA726',
      bannerEmoji: '🦁',
      chapterTitle: 'Hoofdstuk 2: De Koning Brult',
      introStory: 'Leo de leeuw rekt zich uit op de warme rots: "Brrr! Wie weet hoe je het woord leeuw en schreeuw spelt?"',
      animalReward: findAnimal('leo-leeuw'),
      questions: [
        {
          id: 'safari45-2-1',
          category: 'Eeuw/Ieuw woorden',
          categoryIcon: '🦁',
          question: 'Kies het juist gespelde woord: De koning van de savanne is de ___.',
          type: 'choice',
          options: ['leeuw', 'leuw', 'leew'],
          correctOptionIndex: 0,
          hint: 'Denk aan de regel: in eeuw-woorden vergeet je de u niet!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'safari45-2-2',
          category: 'Woordenschat',
          categoryIcon: '👑',
          question: 'Welk woord past in de zin: De leeuw laat een luide ___ horen.',
          type: 'choice',
          options: ['brul', 'bruhl', 'brull'],
          correctOptionIndex: 0,
          hint: 'Een korte klank met één l aan het einde.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'safari45-2-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor de koning der dieren:',
          type: 'spell',
          targetWord: 'LEEUW',
          scrambledLetters: ['L', 'E', 'E', 'U', 'W'],
          hint: 'Vergeet de letter u niet voor de w.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    },
    {
      id: 3,
      name: 'Ollie’s Modderbad',
      biome: 'safari',
      theme: 'Woorden met -f en -v & Slurven Kennis',
      themeColor: '#90CAF9',
      bannerEmoji: '🐘',
      chapterTitle: 'Hoofdstuk 3: De Spetterende Slurf',
      introStory: 'Ollie spuit een fontein van water in de lucht: "Toet toet! Tijd voor verfrissende woorden met f en v!"',
      animalReward: findAnimal('ollie-olifant'),
      questions: [
        {
          id: 'safari45-3-1',
          category: 'f naar v regel',
          categoryIcon: '🐘',
          question: 'Wat is het meervoud van "slurf"?',
          type: 'choice',
          options: ['slurfen', 'slurven', 'slurwven'],
          correctOptionIndex: 1,
          hint: 'De f aan het eind wordt in het meervoud een v: slurven.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'safari45-3-2',
          category: 'Klankgroepen',
          categoryIcon: '💧',
          question: 'Kies het juiste woord: Ollie kan reusachtige bellen ___.',
          type: 'choice',
          options: ['blaazen', 'blazen', 'blazzen'],
          correctOptionIndex: 1,
          hint: 'Klankgroep bla-zen: lange klank a, dus één a en één z!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'safari45-3-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Hoeveel liter water past er in de slurf van een olifant?',
          passage: 'De slurf van een olifant heeft meer dan 40.000 verschillende spieren. Een volwassen olifant kan in één teug wel 8 tot 10 liter water opzuigen om te drinken of te sproeien.',
          type: 'choice',
          options: ['Ongeveer 8 tot 10 liter', 'Slechts één theelepeltje', 'Meer dan 500 liter'],
          correctOptionIndex: 0,
          hint: 'Kijk naar de getallen 8 tot 10 liter in de tekst.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 4,
      name: 'Zara’s Streepjes Steppe',
      biome: 'safari',
      theme: 'Woorden met -s en -z & Woordcombinaties',
      themeColor: '#78909C',
      bannerEmoji: '🦓',
      chapterTitle: 'Hoofdstuk 4: Streepjes op de Steppe',
      introStory: 'Zara draaft sierlijk langs de acaciastruik: "Kijk naar mijn streepjes! Laten we z- en s-woorden ontdekken!"',
      animalReward: findAnimal('zara-zebra'),
      questions: [
        {
          id: 'safari45-4-1',
          category: 'Beginletter s of z',
          categoryIcon: '🦓',
          question: 'Kies het juiste woord: De zebra rent over het gouden ___.',
          type: 'choice',
          options: ['zant', 'zand', 'sant'],
          correctOptionIndex: 1,
          hint: 'Begint met een zachte z en eindigt op een d (zanden).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'safari45-4-2',
          category: 'Verkleinwoorden',
          categoryIcon: '✨',
          question: 'Wat is het juiste verkleinwoord van "streep"?',
          type: 'choice',
          options: ['streepje', 'streepie', 'streepetje'],
          correctOptionIndex: 0,
          hint: 'Grondwoord streep + je = streepje.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'safari45-4-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor het gestreepte dier:',
          type: 'spell',
          targetWord: 'ZEBRA',
          scrambledLetters: ['Z', 'E', 'B', 'R', 'A'],
          hint: 'Begint met een Z en eindigt op een A.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    },
    {
      id: 5,
      name: 'Mimi’s Acaciaboom',
      biome: 'safari',
      theme: 'Verkleinwoorden (-pje, -tje, -je)',
      themeColor: '#A1887F',
      bannerEmoji: '🐒',
      chapterTitle: 'Hoofdstuk 5: Slingeren in de Boom',
      introStory: 'Mimi zwaait aan een tak: "Hihihi! Ik ben dol op kleine banaantjes en verkleinwoorden!"',
      animalReward: findAnimal('mimi-aap'),
      questions: [
        {
          id: 'safari45-5-1',
          category: 'Verkleinwoord (-pje)',
          categoryIcon: '🐒',
          question: 'Wat is het juiste verkleinwoord van "boom"?',
          type: 'choice',
          options: ['boomtje', 'boompje', 'boomje'],
          correctOptionIndex: 1,
          hint: 'Na een m komt meestal -pje (boompje, bloempje).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'safari45-5-2',
          category: 'Verkleinwoord (-tje)',
          categoryIcon: '🍌',
          question: 'Wat is het juiste verkleinwoord van "banaan"?',
          type: 'choice',
          options: ['banaantje', 'banaanpje', 'banaanje'],
          correctOptionIndex: 0,
          hint: 'Banaan eindigt op n, dus er komt -tje achter: banaantje.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'safari45-5-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor het slimme dier:',
          type: 'spell',
          targetWord: 'AAP',
          scrambledLetters: ['A', 'A', 'P'],
          hint: 'Twee a’s en een p.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    },
    {
      id: 6,
      name: 'Kiki’s Cheetaheuvel',
      biome: 'safari',
      theme: 'Woorden met -ch en -cht & Snelheidsbegrip',
      themeColor: '#FF6F00',
      bannerEmoji: '🐆',
      chapterTitle: 'Hoofdstuk 6: De Snelste Sprinter',
      introStory: 'Kiki de cheeta kijkt scherp over de horizon: "Klaar voor de start? Woorden met ch en cht vliegen voorbij!"',
      animalReward: findAnimal('kiki-cheeta'),
      questions: [
        {
          id: 'safari45-6-1',
          category: 'Luchtwoorden (-cht)',
          categoryIcon: '🐆',
          question: 'Kies het juiste woord: De cheeta heeft een vlijmscherp gezichts___.',
          type: 'choice',
          options: ['vermogen', 'vermogen', 'vermogen'],
          correctOptionIndex: 0,
          hint: 'Kies het woord dat past bij scherpe ogen.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'safari45-6-2',
          category: 'Woorden met -cht',
          categoryIcon: '⚡',
          question: 'Kies het juiste woord: Kiki rent met topsnelheid door de ___.',
          type: 'choice',
          options: ['lugt', 'lucht', 'luygt'],
          correctOptionIndex: 1,
          hint: 'Korte klank u + cht: lucht.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'safari45-6-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Hoe snel kan een cheeta sprinten?',
          passage: 'Een cheeta is het snelste landdier ter wereld. Binnen 3 seconden accelereert hij van 0 naar bijna 100 kilometer per uur, net zo snel als een sportwagen!',
          type: 'choice',
          options: [
            'Binnen 3 seconden naar 100 km/u',
            'Maximaal 15 km/u als een fietser',
            'Hij kan niet hard rennen'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de 3 seconden en 100 km/u.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    }
  ],

  sea: [
    {
      id: 1,
      name: 'Dolly’s Koraalbaai',
      biome: 'sea',
      theme: 'D/T Eindklank & Meervoud van f naar v',
      themeColor: '#0288D1',
      bannerEmoji: '🐬',
      chapterTitle: 'Hoofdstuk 1: De Sprong in de Baai',
      introStory: 'Dolly de dolfijn springt boven het water uit: "Klik-klik! Duik mee naar het koraalrif en ontdek de geheimen van de oceaan!"',
      animalReward: findAnimal('dolly-dolfijn'),
      questions: [
        {
          id: 'sea45-1-1',
          category: 'Eindklank (d/t)',
          categoryIcon: '🐬',
          question: 'Kies het juiste woord: De dolfijn zwemt naar het zandige ___.',
          type: 'choice',
          options: ['strant', 'strand', 'straant'],
          correctOptionIndex: 1,
          hint: 'Maak het woord langer: één strand, twee stranden.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sea45-1-2',
          category: 'Meervoud (f naar v)',
          categoryIcon: '🌊',
          question: 'Wat is het juiste meervoud van "golf"?',
          type: 'choice',
          options: ['golfen', 'golven', 'golwen'],
          correctOptionIndex: 1,
          hint: 'De letter f verandert vaak in een v bij het meervoud.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sea45-1-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor het zeedier met de glimlach:',
          type: 'spell',
          targetWord: 'DOLFIJN',
          scrambledLetters: ['D', 'O', 'L', 'F', 'I', 'J', 'N'],
          hint: 'Begint met DOL en heeft een lange ij.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    },
    {
      id: 2,
      name: 'Wally’s Diepe Oceaan',
      biome: 'sea',
      theme: 'Korte/Lange Klanken & Zingende Walvissen',
      themeColor: '#01579B',
      bannerEmoji: '🐋',
      chapterTitle: 'Hoofdstuk 2: Het Lied van de Walvis',
      introStory: 'Wally blaast een gigantische fontein omhoog: "Oooo-aaah! Luister naar de diepe klanken van de oceaan!"',
      animalReward: findAnimal('wally-walvis'),
      questions: [
        {
          id: 'sea45-2-1',
          category: 'Dubbele klinker',
          categoryIcon: '🐋',
          question: 'Kies het juiste woord: De walvis zwemt in de ___ diepzee.',
          type: 'choice',
          options: ['blauwe', 'blouwe', 'blaauwe'],
          correctOptionIndex: 0,
          hint: 'Blauw schrijf je met au (atje-au).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sea45-2-2',
          category: 'Meervoud met dubbelzetter',
          categoryIcon: '🌊',
          question: 'Wat is het juiste meervoud van "walvis"?',
          type: 'choice',
          options: ['walvissen', 'walvisen', 'walvissun'],
          correctOptionIndex: 0,
          hint: 'Korte klank i -> twee s-en: walvissen.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sea45-2-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Hoe communiceren blauwe vinvissen met elkaar over grote afstanden?',
          passage: 'Walvissen maken hele lage, zingende geluiden die honderden kilometers ver onder water kunnen reizen zonder te verzwakken.',
          type: 'choice',
          options: [
            'Door hele lage zangtonen onder water',
            'Door met hun staart op stenen te slaan',
            'Door te bellen met zeemeeuwen'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de lage zingende geluiden.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 3,
      name: 'Sammy’s Zeeschildpaddenstrand',
      biome: 'sea',
      theme: 'Samenstellingen & Woorden met -sch',
      themeColor: '#00897B',
      bannerEmoji: '🐢',
      chapterTitle: 'Hoofdstuk 3: Het Oude Schild',
      introStory: 'Sammy peddelt rustig met haar vinnen: "Al honderd jaar zwem ik rond! Laten we mooie samenstellingen maken!"',
      animalReward: findAnimal('sammy-zeeschildpad'),
      questions: [
        {
          id: 'sea45-3-1',
          category: 'Samenstellingen',
          categoryIcon: '🐢',
          question: 'Welk samengesteld woord is juist gespeld?',
          type: 'choice',
          options: ['schildpad', 'schiltpad', 'schilpad'],
          correctOptionIndex: 0,
          hint: 'Schild + pad = schildpad (beide met een d aan het eind).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sea45-3-2',
          category: 'Woorden met -sch',
          categoryIcon: '🐚',
          question: 'Kies het juiste woord: Op het strand vind je een mooie ___.',
          type: 'choice',
          options: ['schelp', 'sgelp', 'schellep'],
          correctOptionIndex: 0,
          hint: 'Begint met sch-.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sea45-3-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor het harde pantser:',
          type: 'spell',
          targetWord: 'SCHILD',
          scrambledLetters: ['S', 'C', 'H', 'I', 'L', 'D'],
          hint: 'Begint met SCH en eindigt op een D.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    },
    {
      id: 4,
      name: 'Otto’s Octopus Grot',
      biome: 'sea',
      theme: 'Woorden met -ct & Klinkerbotsingen',
      themeColor: '#7E57C2',
      bannerEmoji: '🐙',
      chapterTitle: 'Hoofdstuk 4: Acht Slimme Armen',
      introStory: 'Otto kleurt van paars naar zandgeel: "Blub! Met mijn acht armen kan ik acht woorden tegelijk spellen!"',
      animalReward: findAnimal('otto-octopus'),
      questions: [
        {
          id: 'sea45-4-1',
          category: 'C of K klank',
          categoryIcon: '🐙',
          question: 'Kies het juiste woord: De octopus heeft ___ armen vol zuignappen.',
          type: 'choice',
          options: ['acht', 'agt', 'aacht'],
          correctOptionIndex: 0,
          hint: 'Acht schrijf je met -cht.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sea45-4-2',
          category: 'Meervoud',
          categoryIcon: '🌊',
          question: 'Wat is het juiste meervoud van "arm"?',
          type: 'choice',
          options: ['armen', 'armmen', 'armun'],
          correctOptionIndex: 0,
          hint: 'Arm + en = armen (met één m).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sea45-4-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom heeft een octopus drie harten?',
          passage: 'Een octopus heeft drie harten. Twee harten pompen bloed naar de kieuwen om zuurstof op te nemen, en het derde hart pompt het blauwe bloed door de rest van zijn lichaam.',
          type: 'choice',
          options: [
            'Twee voor de kieuwen en één voor het lichaam',
            'Omdat hij drie keer zo verliefd is',
            'Om sneller inkt te kunnen spuiten'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de kieuwen en het lichaam.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 5,
      name: 'Nemo’s Koraal Anemoon',
      biome: 'sea',
      theme: 'Woorden met -ou en -au & Kleurwoorden',
      themeColor: '#FF7043',
      bannerEmoji: '🐠',
      chapterTitle: 'Hoofdstuk 5: Schuilplaats in de Anemoon',
      introStory: 'Nemo fladdert tussen de zachte anemoontentakels: "Kijk naar mijn oranje en witte strepen! Laten we ou- en au-woorden oefenen!"',
      animalReward: findAnimal('nemo-clownvis'),
      questions: [
        {
          id: 'sea45-5-1',
          category: 'Au/Ou woorden',
          categoryIcon: '🐠',
          question: 'Kies het juiste woord: De clownvis zwemt in het ___ water van het koraalrif.',
          type: 'choice',
          options: ['zoute', 'zaute', 'zoutte'],
          correctOptionIndex: 0,
          hint: 'Zout schrijf je met otje-ou.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sea45-5-2',
          category: 'Kleurwoorden',
          categoryIcon: '🎨',
          question: 'Kies het juist gespelde woord: Nemo heeft prachtige ___ strepen.',
          type: 'choice',
          options: ['oranje', 'oranjee', 'ooranje'],
          correctOptionIndex: 0,
          hint: 'Oranje heeft aan het begin één o.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sea45-5-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor de zeebewoner:',
          type: 'spell',
          targetWord: 'VIS',
          scrambledLetters: ['V', 'I', 'S'],
          hint: 'Begint met een V en eindigt op een S.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    },
    {
      id: 6,
      name: 'Hugo’s Hamerhaai Rif',
      biome: 'sea',
      theme: 'Woorden met -aai & Roofdieren Woordenschat',
      themeColor: '#546E7A',
      bannerEmoji: '🦈',
      chapterTitle: 'Hoofdstuk 6: De Brede Kop',
      introStory: 'Hugo zwemt kalm door de blauwe stroming: "Mijn hamerkop helpt me speuren naar de juiste antwoorden!"',
      animalReward: findAnimal('hugo-haai'),
      questions: [
        {
          id: 'sea45-6-1',
          category: 'Aai-woord',
          categoryIcon: '🦈',
          question: 'Kies het juiste woord: De grote hamer___ zwemt geruisloos voorbij.',
          type: 'choice',
          options: ['haai', 'haaj', 'haay'],
          correctOptionIndex: 0,
          hint: 'Aai-woord: je hoort een j maar schrijft een i.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sea45-6-2',
          category: 'Woorden met -eeuw',
          categoryIcon: '🌊',
          question: 'Kies het juiste woord: Boven het water vliegt een witte zee___.',
          type: 'choice',
          options: ['meeuw', 'meuw', 'meew'],
          correctOptionIndex: 0,
          hint: 'Eeuw-woord: vergeet de u niet!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sea45-6-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom heeft een hamerhaai zo’n brede kop?',
          passage: 'Dankzij zijn brede hamerkop staan de ogen van de hamerhaai ver uit elkaar. Hierdoor heeft hij een gezichtsveld van 360 graden en kan hij zowel boven als onder zich kijken.',
          type: 'choice',
          options: [
            'Om 360 graden om zich heen te kunnen kijken',
            'Om spijkers in de zeebodem te slaan',
            'Omdat zijn hoed anders niet past'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over het gezichtsveld van 360 graden.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    }
  ],

  snow: [
    {
      id: 1,
      name: 'Barny’s IJsschotsen',
      biome: 'snow',
      theme: 'Woorden met ij / ei en au / ou',
      themeColor: '#00ACC1',
      bannerEmoji: '🐻‍❄️',
      chapterTitle: 'Hoofdstuk 1: Het Krakende IJs',
      introStory: 'Barny de ijsbeer schudt zijn dikke vacht uit. "Brrr! Laten we ons opwarmen met slimme taalopgaven!"',
      animalReward: findAnimal('barny-ijsbeer'),
      questions: [
        {
          id: 'snow45-1-1',
          category: 'Klinkers (ij/ei)',
          categoryIcon: '🐻‍❄️',
          question: 'Kies het juiste woord: De ijsbeer glijdt over het gladde ___.',
          type: 'choice',
          options: ['ijs', 'eys', 'eijs'],
          correctOptionIndex: 0,
          hint: 'IJs schrijf je met de lange ij.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'snow45-1-2',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor de noordpool:',
          type: 'spell',
          targetWord: 'POOL',
          scrambledLetters: ['P', 'O', 'O', 'L'],
          hint: 'Lange klank oo tussen p en l.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'snow45-1-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Welke kleur heeft de huid van een ijsbeer onder zijn witte haren?',
          passage: 'De haren van een ijsbeer zijn eigenlijk hol en doorzichtig. De huid eronder is gitzwart om alle warmte van de zon direct op te nemen.',
          type: 'choice',
          options: [
            'Gitzwart, om zonnewarmte vast te houden',
            'Roze met witte vlekjes',
            'Felblauw'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de gitzwarte huid onder de holle haren.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 2,
      name: 'Piet’s Pinguïnrots',
      biome: 'snow',
      theme: 'Woorden met -ui en -eu & Buikglijders',
      themeColor: '#0097A7',
      bannerEmoji: '🐧',
      chapterTitle: 'Hoofdstuk 2: Glijden op de Buik',
      introStory: 'Piet de keizerspinguïn wobbelt vrolijk: "Kijk hoe hard ik op mijn buik over het ijs kan roetsjen!"',
      animalReward: findAnimal('piet-pinguin'),
      questions: [
        {
          id: 'snow45-2-1',
          category: 'Tweeklank ui',
          categoryIcon: '🐧',
          question: 'Kies het juiste woord: De pinguïn glijdt over zijn zachte ___.',
          type: 'choice',
          options: ['buik', 'beuk', 'buyk'],
          correctOptionIndex: 0,
          hint: 'Buik schrijf je met -ui-.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'snow45-2-2',
          category: 'Tweeklank eu',
          categoryIcon: '❄️',
          question: 'Kies het juiste woord: Buiten valt een dik pak witte ___.',
          type: 'choice',
          options: ['sneeuw', 'sneu', 'sneeu'],
          correctOptionIndex: 0,
          hint: 'Eeuw-woord: vergeet de w niet!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'snow45-2-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor de ijsvogel in smoking:',
          type: 'spell',
          targetWord: 'PINGUIN',
          scrambledLetters: ['P', 'I', 'N', 'G', 'U', 'I', 'N'],
          hint: 'P - IN - GU - IN.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    },
    {
      id: 3,
      name: 'Sam’s Zeehondenstrand',
      biome: 'snow',
      theme: 'Woorden met -d en -t & Zwemmers Kennis',
      themeColor: '#37474F',
      bannerEmoji: '🦭',
      chapterTitle: 'Hoofdstuk 3: Zonnen op het IJs',
      introStory: 'Sam klapt vrolijk in haar vinnen: "Plons! Tijd voor verfrissende woorden met eindletters d en t!"',
      animalReward: findAnimal('sam-zeehond'),
      questions: [
        {
          id: 'snow45-3-1',
          category: 'Eindletter d of t',
          categoryIcon: '🦭',
          question: 'Kies het juiste woord: De zee___ ligt lekker te rusten op een ijsschots.',
          type: 'choice',
          options: ['hond', 'hont', 'honnd'],
          correctOptionIndex: 0,
          hint: 'Maak langer: honden (dus met een d).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'snow45-3-2',
          category: 'Klinkers (Dubbelzetter)',
          categoryIcon: '🌊',
          question: 'Kies het juiste woord: De zeehond kan heel diep ___.',
          type: 'choice',
          options: ['duiken', 'duikken', 'duyken'],
          correctOptionIndex: 0,
          hint: 'Tweeklank ui krijgt maar één k: duiken.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'snow45-3-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Hoe lang kan een zeehond onder water blijven zonder adem te halen?',
          passage: 'Zeehonden hebben extra veel zuurstofrijk bloed. Sommige zeehonden kunnen wel 30 minuten lang onder water blijven tijdens het jagen op vis.',
          type: 'choice',
          options: [
            'Tot wel 30 minuten',
            'Slechts 2 seconden',
            'Een hele week'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de 30 minuten.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 4,
      name: 'Fay’s Sneeuwhol',
      biome: 'snow',
      theme: 'Verkleinwoorden & Sneeuw Camouflage',
      themeColor: '#78909C',
      bannerEmoji: '🦊',
      chapterTitle: 'Hoofdstuk 4: Het Witte Vossehol',
      introStory: 'Fay de poolvos springt met een boog in de diepe sneeuw: "Mijn dikke pluimstaart houdt me lekker warm!"',
      animalReward: findAnimal('fay-poolvos'),
      questions: [
        {
          id: 'snow45-4-1',
          category: 'Verkleinwoord',
          categoryIcon: '🦊',
          question: 'Wat is het juiste verkleinwoord van "staart"?',
          type: 'choice',
          options: ['staartje', 'staarttje', 'staartpje'],
          correctOptionIndex: 0,
          hint: 'Staart + je = staartje.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'snow45-4-2',
          category: 'Woorden met -s of -z',
          categoryIcon: '❄️',
          question: 'Kies het juiste woord: De pool___ heeft in de winter een sneeuwwitte vacht.',
          type: 'choice',
          options: ['vos', 'voz', 'voss'],
          correctOptionIndex: 0,
          hint: 'Vos schrijf je met een s aan het eind.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'snow45-4-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor het witte dier:',
          type: 'spell',
          targetWord: 'VOS',
          scrambledLetters: ['V', 'O', 'S'],
          hint: 'V - O - S.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    },
    {
      id: 5,
      name: 'Hedwig’s IJspiek',
      biome: 'snow',
      theme: 'Woorden met -uw & Geruisloos Vliegen',
      themeColor: '#B0BEC5',
      bannerEmoji: '🦉',
      chapterTitle: 'Hoofdstuk 5: Ogen in de Nacht',
      introStory: 'Hedwig knippert met haar gele ogen: "Oeh-oeh! Mijn vleugels maken geen enkel geluid!"',
      animalReward: findAnimal('hedwig-sneeuwuil'),
      questions: [
        {
          id: 'snow45-5-1',
          category: 'Woorden met -uw',
          categoryIcon: '🦉',
          question: 'Kies het juiste woord: Boven de bergen valt zachte witte ___.',
          type: 'choice',
          options: ['sneeuw', 'sneeu', 'sneu'],
          correctOptionIndex: 0,
          hint: 'Eeuw-woord: sneeuw.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'snow45-5-2',
          category: 'Klankgroepen',
          categoryIcon: '✨',
          question: 'Kies het juiste woord: De uil kan heel stil ___.',
          type: 'choice',
          options: ['vliegen', 'vlieggen', 'vlieghen'],
          correctOptionIndex: 0,
          hint: 'Tweeklank ie krijgt één g: vliegen.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'snow45-5-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom kan een sneeuwuil geruisloos vliegen?',
          passage: 'De veren aan de rand van de vleugels van een uil hebben een zachte, kamvormige structuur die de luchtstroom dempt. Hierdoor hoort een prooidier de uil pas als het te laat is.',
          type: 'choice',
          options: [
            'Dankzij speciale zachte veerrandjes die het geluid dempen',
            'Omdat uilen geen vleugels hebben',
            'Doordat ze met motortjes vliegen'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de zachte kamvormige structuur.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 6,
      name: 'Sven’s Toendrapad',
      biome: 'snow',
      theme: 'Samenstellingen & Rendier Hoefkracht',
      themeColor: '#8D6E63',
      bannerEmoji: '🦌',
      chapterTitle: 'Hoofdstuk 6: Stappen door de Storm',
      introStory: 'Sven krabt met zijn brede hoeven in de sneeuw: "Mijn gewei reikt tot aan de sterren!"',
      animalReward: findAnimal('sven-rendier'),
      questions: [
        {
          id: 'snow45-6-1',
          category: 'Samenstellingen',
          categoryIcon: '🦌',
          question: 'Welk samengesteld woord is juist gespeld?',
          type: 'choice',
          options: ['sneeuwstorm', 'sneeustorm', 'sneeuw-storm'],
          correctOptionIndex: 0,
          hint: 'Sneeuw + storm = sneeuwstorm.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'snow45-6-2',
          category: 'Klinkers (Dubbelzetter)',
          categoryIcon: '🌲',
          question: 'Kies het juiste woord: Rendieren eten in de winter zacht groen ___.',
          type: 'choice',
          options: ['mos', 'moss', 'moos'],
          correctOptionIndex: 0,
          hint: 'Mos heeft één s aan het einde.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'snow45-6-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor het noordelijke hert:',
          type: 'spell',
          targetWord: 'RENDIER',
          scrambledLetters: ['R', 'E', 'N', 'D', 'I', 'E', 'R'],
          hint: 'Ren + dier = Rendier.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    }
  ],

  jungle: [
    {
      id: 1,
      name: 'Pippa’s Bamboebos',
      biome: 'jungle',
      theme: 'Dubbele Medeklinkers & Bamboe Kennis',
      themeColor: '#388E3C',
      bannerEmoji: '🐼',
      chapterTitle: 'Hoofdstuk 1: Knapperige Bamboescheuten',
      introStory: 'Pippa kauwt rustig op een verse bamboestengel: "Welkom in het regenwoud! Laten we smullen van taal!"',
      animalReward: findAnimal('pippa-panda'),
      questions: [
        {
          id: 'jungle45-1-1',
          category: 'Dubbele Medeklinker',
          categoryIcon: '🐼',
          question: 'Kies het juiste woord: Pippa kan heel grappig van de heuvel ___.',
          type: 'choice',
          options: ['rollen', 'rolen', 'rollun'],
          correctOptionIndex: 0,
          hint: 'Korte klank o -> dubbele l: rollen.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'jungle45-1-2',
          category: 'Klinkers',
          categoryIcon: '🎋',
          question: 'Kies het juiste woord: Panda’s eten het liefst verse ___.',
          type: 'choice',
          options: ['bamboe', 'bambou', 'bambo'],
          correctOptionIndex: 0,
          hint: 'Bamboe schrijf je met oe aan het eind.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'jungle45-1-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor de zwart-witte beer:',
          type: 'spell',
          targetWord: 'PANDA',
          scrambledLetters: ['P', 'A', 'N', 'D', 'A'],
          hint: 'P - A - N - D - A.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    },
    {
      id: 2,
      name: 'Paco’s Papegaaienkooi',
      biome: 'jungle',
      theme: 'Woorden met -aai en -ooi & Woordenschat',
      themeColor: '#E53935',
      bannerEmoji: '🦜',
      chapterTitle: 'Hoofdstuk 2: Kleurrijke Woordenkunstenaars',
      introStory: 'Paco zwaait met zijn rode en blauwe vleugels: "Koko! Ik praat je alle woorden na!"',
      animalReward: findAnimal('paco-papegaai'),
      questions: [
        {
          id: 'jungle45-2-1',
          category: 'Aai-woord',
          categoryIcon: '🦜',
          question: 'Kies het juiste woord: De kleurrijke ___ fladdert door het woud.',
          type: 'choice',
          options: ['papegaai', 'papegaaj', 'papegay'],
          correctOptionIndex: 0,
          hint: 'Aai-woord: je hoort j maar schrijft i.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'jungle45-2-2',
          category: 'Ooi-woord',
          categoryIcon: '🌺',
          question: 'Kies het juiste woord: In de jungle bloeit een hele ___ bloem.',
          type: 'choice',
          options: ['mooie', 'mooje', 'moyie'],
          correctOptionIndex: 0,
          hint: 'Mooi + e = mooie.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'jungle45-2-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom kunnen papegaaien menselijke woorden nadoen?',
          passage: 'Papegaaien hebben geen stembanden zoals mensen, maar een speciaal orgaan genaamd de syrinx. Hiermee kunnen ze trillingen zo precies sturen dat ze bijna elk geluid kunnen imiteren.',
          type: 'choice',
          options: [
            'Dankzij een speciaal zangorgaan (de syrinx)',
            'Omdat ze elke dag naar school gaan',
            'Omdat ze stiekem mensen zijn'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de syrinx en het sturen van trillingen.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 3,
      name: 'Toby’s Tijgerpad',
      biome: 'jungle',
      theme: 'Korte/Lange Klanken & Tijgerstrepen',
      themeColor: '#FB8C00',
      bannerEmoji: '🐯',
      chapterTitle: 'Hoofdstuk 3: De Koning van het Woud',
      introStory: 'Toby stapt geruisloos door de varens: "Mijn strepen vallen helemaal weg tussen de lianen!"',
      animalReward: findAnimal('toby-tijger'),
      questions: [
        {
          id: 'jungle45-3-1',
          category: 'Klankgroepen (Lange Klank)',
          categoryIcon: '🐯',
          question: 'Kies het juiste woord: De tijger heeft oranje en zwarte ___.',
          type: 'choice',
          options: ['strepen', 'streeppen', 'streppen'],
          correctOptionIndex: 0,
          hint: 'Klankgroep stre-pen: lange klank e -> één e en één p.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'jungle45-3-2',
          category: 'Lange ij',
          categoryIcon: '🐾',
          question: 'Kies het juiste woord: De ___ sluipt door het dichte woud.',
          type: 'choice',
          options: ['tijger', 'teiger', 'tieger'],
          correctOptionIndex: 0,
          hint: 'Tijger schrijf je met de lange ij.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'jungle45-3-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor het roofdier:',
          type: 'spell',
          targetWord: 'TIJGER',
          scrambledLetters: ['T', 'I', 'J', 'G', 'E', 'R'],
          hint: 'T - IJ - G - E - R.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    },
    {
      id: 4,
      name: 'Koko’s Lianenbos',
      biome: 'jungle',
      theme: 'Woorden met -ng en -nk & Grijpstaarten',
      themeColor: '#8D6E63',
      bannerEmoji: '🐒',
      chapterTitle: 'Hoofdstuk 4: Zwaaien aan Lianen',
      introStory: 'Koko slingert ondersteboven aan zijn staart: "Oeh-oeh! Vang jij de juiste woorden in de lucht?"',
      animalReward: findAnimal('koko-aap'),
      questions: [
        {
          id: 'jungle45-4-1',
          category: 'Zingwoord (-ng)',
          categoryIcon: '🐒',
          question: 'Kies het juiste woord: De slingeraap kan aan één pootje ___.',
          type: 'choice',
          options: ['hangen', 'hanggen', 'hanngen'],
          correctOptionIndex: 0,
          hint: 'Hangen is een zingwoord net als ring.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'jungle45-4-2',
          category: 'Plankwoord (-nk)',
          categoryIcon: '🌿',
          question: 'Kies het juiste woord: Koko zwaait naar een stevige ___.',
          type: 'choice',
          options: ['taank', 'tak', 'takk'],
          correctOptionIndex: 1,
          hint: 'Tak heeft een korte a en één k.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'jungle45-4-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom wordt de staart van een slingeraap een "vijfde hand" genoemd?',
          passage: 'De staart van een slingeraap is zo sterk dat het dier zijn hele lichaamsgewicht eraan kan laten hangen. Aan de onderkant zit geen haar, maar zachte geribbelde huid voor extra grip.',
          type: 'choice',
          options: [
            'Omdat hij er stevig mee aan takken kan hangen en dingen grijpen',
            'Omdat er vingers aan zijn staart groeien',
            'Omdat hij ermee kan zwaaien als een vlag'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de sterke grijpkracht van de staart.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 5,
      name: 'Charlie’s Kleurenboom',
      biome: 'jungle',
      theme: 'Woorden met c en k & Camouflage',
      themeColor: '#43A047',
      bannerEmoji: '🦎',
      chapterTitle: 'Hoofdstuk 5: De Magische Huid',
      introStory: 'Charlie knippert met zijn onafhankelijke ogen: "Zie je me? Nu ben ik groen, en nu ben ik geel!"',
      animalReward: findAnimal('charlie-kameleon'),
      questions: [
        {
          id: 'jungle45-5-1',
          category: 'K-klank',
          categoryIcon: '🦎',
          question: 'Kies het juiste woord: De kameleon verandert van ___.',
          type: 'choice',
          options: ['kleur', 'cleur', 'kloor'],
          correctOptionIndex: 0,
          hint: 'Kleur begint met een k en heeft -eu-.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'jungle45-5-2',
          category: 'Verkleinwoord',
          categoryIcon: '🍃',
          question: 'Wat is het juiste verkleinwoord van "blad"?',
          type: 'choice',
          options: ['blaadje', 'bladtje', 'blaadpje'],
          correctOptionIndex: 0,
          hint: 'Blad verandert in blaadje (lange klank aa).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'jungle45-5-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor het reptiel:',
          type: 'spell',
          targetWord: 'HAGEDIS',
          scrambledLetters: ['H', 'A', 'G', 'E', 'D', 'I', 'S'],
          hint: 'Hage + dis = Hagedis.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    },
    {
      id: 6,
      name: 'Maya’s Toekanentak',
      biome: 'jungle',
      theme: 'Woorden met -oe en -oei & Vruchten Kennis',
      themeColor: '#FF6F00',
      bannerEmoji: '🪶',
      chapterTitle: 'Hoofdstuk 6: De Reuzensnavel',
      introStory: 'Maya wipt op haar tak met haar gigantische oranje snavel: "Mijn snavel is supergroot maar weegt bijna niks!"',
      animalReward: findAnimal('maya-toekan'),
      questions: [
        {
          id: 'jungle45-6-1',
          category: 'Oe/Oei woorden',
          categoryIcon: '🪶',
          question: 'Kies het juiste woord: In de jungle staan alle bomen volop in de ___.',
          type: 'choice',
          options: ['bloei', 'bloej', 'bloey'],
          correctOptionIndex: 0,
          hint: 'Oei-woord: je hoort j maar schrijft i.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'jungle45-6-2',
          category: 'Klankgroepen',
          categoryIcon: '🫐',
          question: 'Kies het juiste woord: Maya plukt sappige paarse ___.',
          type: 'choice',
          options: ['bessen', 'besen', 'bezen'],
          correctOptionIndex: 0,
          hint: 'Korte klank e -> twee s-en: bessen.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'jungle45-6-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom valt een toekan niet voorover door zijn grote snavel?',
          passage: 'De snavel van een toekan ziet er zwaar uit, maar van binnen bestaat hij uit een honingraatstructuur van botjes vol lucht. Hierdoor is de snavel vederlicht.',
          type: 'choice',
          options: [
            'Doordat de snavel vol lucht en honingraatstructuur zit',
            'Omdat zijn staart van zwaar lood is gemaakt',
            'Omdat hij zijn snavel vastplakt aan de tak'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de honingraatstructuur vol lucht.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    }
  ],

  outback: [
    {
      id: 1,
      name: 'Kiki’s Outback Heuvel',
      biome: 'outback',
      theme: 'Woorden met -oe & Kangoeroe Sprongkracht',
      themeColor: '#E65100',
      bannerEmoji: '🦘',
      chapterTitle: 'Hoofdstuk 1: De Rode Aarde',
      introStory: 'Kiki de kangoeroe springt meters hoog over de rode rotsen: "Boing! Laten we springen naar het goede antwoord!"',
      animalReward: findAnimal('kiki-kangoeroe'),
      questions: [
        {
          id: 'outback45-1-1',
          category: 'Tweeklank oe',
          categoryIcon: '🦘',
          question: 'Kies het juist gespelde woord:',
          type: 'choice',
          options: ['kangoeroe', 'kangoero', 'kangoerou'],
          correctOptionIndex: 0,
          hint: 'Kangoeroe eindigt op -oe.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'outback45-1-2',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom kunnen kangoeroes zulke enorme sprongen maken?',
          passage: 'Kangoeroes hebben lange, elastische pezen in hun achterpoten. Bij elke landing slaan die pezen energie op als een ingedrukte veer, waardoor de volgende sprong bijna vanzelf gaat.',
          type: 'choice',
          options: [
            'Hun pezen werken als elastische veren die energie opslaan',
            'Omdat ze speciale springveerschoenen dragen',
            'Omdat er geen zwaartekracht is in de Outback'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de elastische pezen die als een veer werken.',
          gradeBadge: 'Begrijpend Lezen'
        },
        {
          id: 'outback45-1-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor de babykangoeroe buidel:',
          type: 'spell',
          targetWord: 'BUIDEL',
          scrambledLetters: ['B', 'U', 'I', 'D', 'E', 'L'],
          hint: 'B - UI - D - E - L.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    },
    {
      id: 2,
      name: 'Coco’s Eucalyptustak',
      biome: 'outback',
      theme: 'Woorden met -aa en -ee & Luie Slapers',
      themeColor: '#8D6E63',
      bannerEmoji: '🐨',
      chapterTitle: 'Hoofdstuk 2: Slapen in de Boom',
      introStory: 'Coco gaapt slaperig tussen de blaadjes: "Gaaaap! Ik slaap 20 uur per dag, maar voor spelling word ik wakker!"',
      animalReward: findAnimal('coco-koala'),
      questions: [
        {
          id: 'outback45-2-1',
          category: 'Dubbele klinker',
          categoryIcon: '🐨',
          question: 'Kies het juiste woord: De koala ligt heerlijk te ___.',
          type: 'choice',
          options: ['slaapen', 'slapen', 'slappen'],
          correctOptionIndex: 1,
          hint: 'Klankgroep sla-pen: lange klank a -> één a en één p.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'outback45-2-2',
          category: 'Klankgroepen',
          categoryIcon: '🌿',
          question: 'Kies het juiste woord: Koala’s eten alleen taaie ___.',
          type: 'choice',
          options: ['bladeren', 'blaaderen', 'bladdren'],
          correctOptionIndex: 0,
          hint: 'Klankgroep bla-de-ren: één a aan het eind van de klankgroep.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'outback45-2-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor het buideldier:',
          type: 'spell',
          targetWord: 'KOALA',
          scrambledLetters: ['K', 'O', 'A', 'L', 'A'],
          hint: 'K - O - A - L - A.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    },
    {
      id: 3,
      name: 'Wally’s Wombathol',
      biome: 'outback',
      theme: 'Woorden met -cht & Gravers Kennis',
      themeColor: '#795548',
      bannerEmoji: '🐻',
      chapterTitle: 'Hoofdstuk 3: Graven in de Grond',
      introStory: 'Wally schudt het rode zand van zijn neus: "Mijn stevige klauwen graven de diepste tunnels!"',
      animalReward: findAnimal('wally-wombat'),
      questions: [
        {
          id: 'outback45-3-1',
          category: 'Luchtwoord (-cht)',
          categoryIcon: '🐻',
          question: 'Kies het juiste woord: De wombat is vooral actief in de ___.',
          type: 'choice',
          options: ['nagt', 'nacht', 'naagt'],
          correctOptionIndex: 1,
          hint: 'Nacht is een luchtwoord (korte klank a + cht).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'outback45-3-2',
          category: 'Samenstellingen',
          categoryIcon: '🪵',
          question: 'Welk samengesteld woord is juist gespeld?',
          type: 'choice',
          options: ['zandheuvel', 'zand-heuvel', 'zantheuvel'],
          correctOptionIndex: 0,
          hint: 'Zand + heuvel = zandheuvel (zand met een d).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'outback45-3-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom zit de buidel van een wombat naar achteren gericht?',
          passage: 'Omdat wombats de hele dag met hun voorpoten in de aarde graven, zit hun buidel naar achteren geopend. Zo komt er geen zand in de oogjes van de baby!',
          type: 'choice',
          options: [
            'Zodat er tijdens het graven geen zand over de baby komt',
            'Omdat wombats alleen achteruit kunnen lopen',
            'Zodat de baby naar de wolken kan kijken'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over het voorkomen van zand bij het graven.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 4,
      name: 'Daan’s Dingopad',
      biome: 'outback',
      theme: 'Woorden met -ng & Wilde Honden Kennis',
      themeColor: '#D84315',
      bannerEmoji: '🐕',
      chapterTitle: 'Hoofdstuk 4: De Wilde Wachter',
      introStory: 'Daan de dingo spitst zijn oren: "Awoooo! Ik bewaak de rode rotsen van de woestijn!"',
      animalReward: findAnimal('daan-dingo'),
      questions: [
        {
          id: 'outback45-4-1',
          category: 'Zingwoord (-ng)',
          categoryIcon: '🐕',
          question: 'Kies het juiste woord: De dingo kan heel hard rennen en over rotsen ___.',
          type: 'choice',
          options: ['springen', 'springgen', 'sprinngen'],
          correctOptionIndex: 0,
          hint: 'Springen is een zingwoord (-ng-).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'outback45-4-2',
          category: 'Eindletter d of t',
          categoryIcon: '🐾',
          question: 'Kies het juiste woord: Daan is een trouwe wilde ___.',
          type: 'choice',
          options: ['hond', 'hont', 'hondt'],
          correctOptionIndex: 0,
          hint: 'Maak langer: honden (dus met een d).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'outback45-4-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor de Australische wilde hond:',
          type: 'spell',
          targetWord: 'DINGO',
          scrambledLetters: ['D', 'I', 'N', 'G', 'O'],
          hint: 'D - IN - GO.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    },
    {
      id: 5,
      name: 'Ellie’s Emoevlakte',
      biome: 'outback',
      theme: 'Woorden met -oe & Loopvogels',
      themeColor: '#BF360C',
      bannerEmoji: '🦤',
      chapterTitle: 'Hoofdstuk 5: Rennen op Lange Poten',
      introStory: 'Ellie stapt met grote passen door het struikgewas: "Ik kan niet vliegen, maar op mijn poten houd niemand me bij!"',
      animalReward: findAnimal('ellie-emoe'),
      questions: [
        {
          id: 'outback45-5-1',
          category: 'Klinkers',
          categoryIcon: '🦤',
          question: 'Kies het juist gespelde woord voor de grote loopvogel:',
          type: 'choice',
          options: ['emoe', 'emou', 'emoo'],
          correctOptionIndex: 0,
          hint: 'Emoe eindigt op -oe.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'outback45-5-2',
          category: 'Klankgroepen (Dubbelzetter)',
          categoryIcon: '🏃',
          question: 'Kies het juiste woord: Emoes kunnen wel 50 kilometer per uur ___.',
          type: 'choice',
          options: ['rennen', 'renen', 'reennen'],
          correctOptionIndex: 0,
          hint: 'Korte klank e -> twee n-en: rennen.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'outback45-5-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Welke bijzondere kleur hebben de eieren van een emoe?',
          passage: 'Emoe-eieren zijn opvallend groot en hebben een donkergroene, bijna zwarte kleur met kleine spikkeltjes, zodat ze niet opvallen tussen het gras.',
          type: 'choice',
          options: [
            'Donkergroen tot bijna zwart',
            'Felroze met gele stippen',
            'Helderblauw als de lucht'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de donkergroene kleur.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 6,
      name: 'Finn’s Zandduin',
      biome: 'outback',
      theme: 'Woorden met -s en -z & Grote Oren',
      themeColor: '#FF8A65',
      bannerEmoji: '🦊',
      chapterTitle: 'Hoofdstuk 6: Oren in de Woestijnwind',
      introStory: 'Finn wappert met zijn reusachtige oren: "Met mijn oren hoor ik zelfs een kevertje onder het zand kruipen!"',
      animalReward: findAnimal('finn-vos'),
      questions: [
        {
          id: 'outback45-6-1',
          category: 'Beginletter s of z',
          categoryIcon: '🦊',
          question: 'Kies het juiste woord: In de woestijn waait heet rood ___.',
          type: 'choice',
          options: ['zand', 'sant', 'zant'],
          correctOptionIndex: 0,
          hint: 'Zand begint met een z en eindigt op een d (zanden).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'outback45-6-2',
          category: 'Verkleinwoord',
          categoryIcon: '👂',
          question: 'Wat is het juiste verkleinwoord van "oor"?',
          type: 'choice',
          options: ['oortje', 'oorpje', 'oorje'],
          correctOptionIndex: 0,
          hint: 'Oor + tje = oortje.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'outback45-6-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom heeft een woestijnvos zulke gigantische oren?',
          passage: 'De grote oren van een woestijnvos zitten vol dunne bloedvaatjes. Als er wind langs waait, koelt het bloed snel af, waardoor het hele dier fris blijft in de hitte.',
          type: 'choice',
          options: [
            'Om warmte af te voeren en zijn lichaam koel te houden',
            'Om mee te vliegen als een vogel',
            'Om zich mee te bedekken als een dekentje'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over het afkoelen van het bloed.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    }
  ],

  mountain: [
    {
      id: 1,
      name: 'Boris’ Steenbokwand',
      biome: 'mountain',
      theme: 'Woorden met -cht & Rotsklimmers',
      themeColor: '#5C6BC0',
      bannerEmoji: '🐐',
      chapterTitle: 'Hoofdstuk 1: De Kaarsrechte Rots',
      introStory: 'Boris staat op een minuscuul richel op 2000 meter hoogte: "Geen berg is te steil voor een taalheld!"',
      animalReward: findAnimal('boris-steenbok'),
      questions: [
        {
          id: 'mountain45-1-1',
          category: 'Luchtwoord (-cht)',
          categoryIcon: '🐐',
          question: 'Kies het juiste woord: Vanaf de hoge bergtop heb je een prachtig ___.',
          type: 'choice',
          options: ['uitzicht', 'uitzigt', 'uitzygt'],
          correctOptionIndex: 0,
          hint: 'Luchtwoord: na een korte klank schrijf je -cht.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'mountain45-1-2',
          category: 'Eindletter d of t',
          categoryIcon: '🏔️',
          question: 'Kies het juiste woord: Boris klimt behendig tegen de steile rots___.',
          type: 'choice',
          options: ['wand', 'want', 'wannd'],
          correctOptionIndex: 0,
          hint: 'Maak langer: wanden (dus met een d).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'mountain45-1-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom vallen steenbokken niet van steile rotsen af?',
          passage: 'Steenbokken hebben hoeven met een zachte, rubberachtige kern omringd door een harde buitenrand. De hoef zuigt zich als het ware vast aan minuscule richeltjes.',
          type: 'choice',
          options: [
            'Dankzij een zachte rubberachtige kern in hun hoeven',
            'Omdat ze magneten in hun poten hebben',
            'Omdat rotsen van klei zijn gemaakt'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de rubberachtige kern in de hoef.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 2,
      name: 'Max’ Marmottenweide',
      biome: 'mountain',
      theme: 'Woorden met -nk & Winterslaap',
      themeColor: '#8D6E63',
      bannerEmoji: '🐿️',
      chapterTitle: 'Hoofdstuk 2: De Fluitende Bewaker',
      introStory: 'Max staat op zijn achterpootjes en fluit keihard: "Fuuuut! Gevaar geweken, tijd voor spelling!"',
      animalReward: findAnimal('max-marmot'),
      questions: [
        {
          id: 'mountain45-2-1',
          category: 'Plankwoord (-nk)',
          categoryIcon: '🐿️',
          question: 'Kies het juiste woord: De fluittoon van Max klinkt als een felle ___.',
          type: 'choice',
          options: ['klank', 'klaank', 'klang'],
          correctOptionIndex: 0,
          hint: 'Plankwoord: geen g tussen n en k.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'mountain45-2-2',
          category: 'Woorden met -eeuw',
          categoryIcon: '❄️',
          question: 'Kies het juiste woord: In de winter ligt er op de alpenweide dikke ___.',
          type: 'choice',
          options: ['sneeuw', 'sneu', 'sneeu'],
          correctOptionIndex: 0,
          hint: 'Eeuw-woord: sneeuw.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'mountain45-2-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor het kleine knaagdier:',
          type: 'spell',
          targetWord: 'MARMOT',
          scrambledLetters: ['M', 'A', 'R', 'M', 'O', 'T'],
          hint: 'Mar + mot = Marmot.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    },
    {
      id: 3,
      name: 'Luna’s Alpacaveld',
      biome: 'mountain',
      theme: 'Woorden met -cht & Zachte Wol',
      themeColor: '#A1887F',
      bannerEmoji: '🦙',
      chapterTitle: 'Hoofdstuk 3: De Zachte Bergbewoner',
      introStory: 'Luna knippert met haar lange wimpers: "Mijn wol kriebelt nooit en houdt iedereen lekker warm!"',
      animalReward: findAnimal('luna-alpaca'),
      questions: [
        {
          id: 'mountain45-3-1',
          category: 'Luchtwoord (-cht)',
          categoryIcon: '🦙',
          question: 'Kies het juiste woord: De wol van een alpaca voelt heerlijk ___ aan.',
          type: 'choice',
          options: ['zacht', 'zagt', 'zaagt'],
          correctOptionIndex: 0,
          hint: 'Luchtwoord: zacht.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'mountain45-3-2',
          category: 'Klankgroepen (Lange Klank)',
          categoryIcon: '🌾',
          question: 'Kies het juiste woord: Luna kauwt op bergkruiden en droog ___.',
          type: 'choice',
          options: ['hooi', 'hooj', 'hooy'],
          correctOptionIndex: 0,
          hint: 'Ooi-woord: hooi.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'mountain45-3-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor het zachte bergdier:',
          type: 'spell',
          targetWord: 'ALPACA',
          scrambledLetters: ['A', 'L', 'P', 'A', 'C', 'A'],
          hint: 'Al - pa - ca.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    },
    {
      id: 4,
      name: 'Alex’ Koningshorizor',
      biome: 'mountain',
      theme: 'Woorden met -eeuw & Haviksoog',
      themeColor: '#4E342E',
      bannerEmoji: '🦅',
      chapterTitle: 'Hoofdstuk 4: Heerser van de Lucht',
      introStory: 'Alex zweeft op de thermiek hoog boven de bergtoppen: "Mijn ogen zien alles, van bergtop tot dal!"',
      animalReward: findAnimal('alex-arend'),
      questions: [
        {
          id: 'mountain45-4-1',
          category: 'Eindletter d of t',
          categoryIcon: '🦅',
          question: 'Kies het juiste woord: De konings___ zweeft hoog in de lucht.',
          type: 'choice',
          options: ['arend', 'arent', 'arennd'],
          correctOptionIndex: 0,
          hint: 'Maak langer: arenden (dus met een d).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'mountain45-4-2',
          category: 'Klankgroepen',
          categoryIcon: '🪶',
          question: 'Kies het juiste woord: De spanwijdte van zijn ___ is meer dan 2 meter.',
          type: 'choice',
          options: ['vleugels', 'vleuggels', 'vleuguls'],
          correctOptionIndex: 0,
          hint: 'Tweeklank eu krijgt één g: vleugels.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'mountain45-4-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Hoe scherp kunnen arenden zien vergeleken met mensen?',
          passage: 'Arenden hebben ogen die wel vier tot acht keer scherper zien dan mensenogen. Vanaf 3 kilometer hoogte kunnen ze een klein konijntje in het gras zien bewegen.',
          type: 'choice',
          options: [
            'Vier tot acht keer scherper dan een mens',
            'Arenden zijn bijna blind',
            'Net zo scherp als een muis'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de 4 tot 8 keer scherper.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 5,
      name: 'Saar’s Berghut',
      biome: 'mountain',
      theme: 'Woorden met -d en -t & Lawine Hulphonden',
      themeColor: '#BCAAA4',
      bannerEmoji: '🐕‍🦺',
      chapterTitle: 'Hoofdstuk 5: De Trouwe Redder',
      introStory: 'Saar kwispelt met haar grote staart bij de open haard: "Woef! Met mijn superneus help ik iedereen veilig door de bergen!"',
      animalReward: findAnimal('saar-sint-bernard'),
      questions: [
        {
          id: 'mountain45-5-1',
          category: 'Eindletter d of t',
          categoryIcon: '🐕‍🦺',
          question: 'Kies het juiste woord: De hulphond brengt de wandelaar in ___ naar het dorp.',
          type: 'choice',
          options: ['veiligheid', 'veiligheit', 'veilicheid'],
          correctOptionIndex: 0,
          hint: 'Woorden op -heid schrijf je altijd met een d!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'mountain45-5-2',
          category: 'Klankgroepen (Dubbelzetter)',
          categoryIcon: '❄️',
          question: 'Kies het juiste woord: De hond kan mensen onder de sneeuw ___.',
          type: 'choice',
          options: ['redden', 'reden', 'reddun'],
          correctOptionIndex: 0,
          hint: 'Korte klank e -> twee d-en: redden.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'mountain45-5-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor het hondenmaatje:',
          type: 'spell',
          targetWord: 'HOND',
          scrambledLetters: ['H', 'O', 'N', 'D'],
          hint: 'H - O - N - D.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    },
    {
      id: 6,
      name: 'Bella’s Gletsjerkloof',
      biome: 'mountain',
      theme: 'Korte/Lange Klanken & Edelweiss',
      themeColor: '#795548',
      bannerEmoji: '🦌',
      chapterTitle: 'Hoofdstuk 6: Sprongen over de Kloof',
      introStory: 'Bella het gemsje springt over een diepe gletsjerkloof: "Hop! We hebben de hoogste piek van het hele bergrijk bereikt!"',
      animalReward: findAnimal('bella-gems'),
      questions: [
        {
          id: 'mountain45-6-1',
          category: 'Korte klank',
          categoryIcon: '🦌',
          question: 'Kies het juist gespelde woord voor het bergdiertje:',
          type: 'choice',
          options: ['gems', 'gemz', 'gempz'],
          correctOptionIndex: 0,
          hint: 'Gems heeft een korte e en eindigt op -s.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'mountain45-6-2',
          category: 'Klankgroepen (Dubbelzetter)',
          categoryIcon: '🌸',
          question: 'Kies het juiste woord: Tussen de rotsen plukt Bella verse ___.',
          type: 'choice',
          options: ['klaver', 'klaaver', 'klavver'],
          correctOptionIndex: 0,
          hint: 'Klankgroep kla-ver: lange klank a -> één a en één v.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'mountain45-6-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Hoe ver kan een gems over een rotsspleet springen?',
          passage: 'Gemsen zijn ware acrobaten. Ze kunnen met gemak sprongen maken van wel 6 meter ver en 2 meter hoog om van rots naar rots te springen.',
          type: 'choice',
          options: [
            'Tot wel 6 meter ver over rotskloven',
            'Slechts 10 centimeter',
            'Ze kunnen helemaal niet springen'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de 6 meter ver.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    }
  ]
};
