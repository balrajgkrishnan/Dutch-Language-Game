import { StoryAdventure } from '../types';

export const READING_ADVENTURES: StoryAdventure[] = [
  {
    id: 'lost-elephant',
    title: 'Het Verdwaalde Olifantje Ella',
    subtitle: 'Een hartverwarmend avontuur op de Afrikaanse Savanne',
    biome: 'safari',
    grade: 'group_4_5',
    coverEmoji: '🐘',
    heroAnimalId: 'tambo-olifant',
    vocabulary: [
      {
        word: 'trompetteren',
        syllables: ['trom', 'pet', 'te', 'ren'],
        meaning: 'Het harde toeterende geluid dat een olifant maakt met zijn slurf.',
        exampleSentence: 'Kleine Ella begon luid te trompetteren toen ze haar moeder zag.',
        emoji: '🎺'
      },
      {
        word: 'acaciaboom',
        syllables: ['a', 'ca', 'cia', 'boom'],
        meaning: 'Een boom met stekels en gele bloemen die veel op de savanne groeit.',
        exampleSentence: 'De giraffen smulden van de blaadjes bovenin de acaciaboom.',
        emoji: '🌳'
      },
      {
        word: 'waterpoel',
        syllables: ['wa', 'ter', 'poel'],
        meaning: 'Een kleine vijver op de droge savanne waar dieren komen drinken.',
        exampleSentence: 'In de brandende middagzon renden de zebra’s naar de koele waterpoel.',
        emoji: '💧'
      },
      {
        word: 'spoorzoeker',
        syllables: ['spoor', 'zoe', 'ker'],
        meaning: 'Iemand die pootafdrukken in het zand volgt om dieren te vinden.',
        exampleSentence: 'Boerin Tess is een slimme spoorzoeker die alle voetafdrukken herkent.',
        emoji: '🔍'
      }
    ],
    paragraphs: [
      'De zon scheen warm over de gouden savanne. Kleine Ella het olifantje was vrolijk achter een fladderende vlinder aan gerend. Maar toen ze om zich heen keek, zag ze haar kudde nergens meer!',
      'Ella voelde haar hartje kloppen. Ze wist dat ze rustig moest blijven. Ze liep naar een grote, schaduwrijke acaciaboom en hief haar slurfje hoog in de lucht om te ruiken.',
      'In de verte hoorde ze het geluid van spetterend water. "De grote waterpoel!" dacht Ella opgewekt. Ze begon dapper te stappen en liet diepe pootafdrukken achter in het zachte zand.',
      'Ondertussen was Boerin Tess samen met Max de Lees-Aap al op zoek. Als echte spoorzoekers volgden ze de ronde voetafdrukken. Bij de waterpoel zag Ella haar moeder en begon blij te trompetteren. Wat een prachtige hereniging!'
    ],
    comprehensionQuestions: [
      {
        id: 'le-q1',
        category: 'Begrijpend Lezen',
        categoryIcon: '🐘',
        question: 'Waarom was kleine Ella achter de kudde vandaan gelopen?',
        type: 'choice',
        options: [
          'Ze rende achter een mooie vlinder aan',
          'Ze wilde gaan slapen in het gras',
          'Ze zocht naar vers fruit',
          'Ze was geschrokken van een leeuw'
        ],
        correctOptionIndex: 0,
        hint: 'Kijk goed naar de eerste alinea van het verhaal.'
      },
      {
        id: 'le-q2',
        category: 'Begrijpend Lezen',
        categoryIcon: '🔍',
        question: 'Hoe vonden Boerin Tess en Max het olifantje terug?',
        type: 'choice',
        options: [
          'Ze keken door een telescoop vanuit een vliegtuig',
          'Ze volgden de diepe ronde pootafdrukken in het zand',
          'Ze riepen heel hard haar naam over het hek',
          'De moederolifant had een briefje geschreven'
        ],
        correctOptionIndex: 1,
        hint: 'Ze waren slimme spoorzoekers!'
      },
      {
        id: 'le-q3',
        category: 'Woordbetekenis',
        categoryIcon: '🎺',
        question: 'Wat betekent het woord "trompetteren" in deze zin?',
        type: 'choice',
        options: [
          'Een muziekinstrument bespelen in een fanfare',
          'Het luide toetergeluid van een olifant met zijn slurf',
          'Heel snel rennen door het zand',
          'Water spuiten over je rug'
        ],
        correctOptionIndex: 1,
        hint: 'Denk aan het geluid dat een olifant maakt.'
      }
    ],
    sequenceEvents: [
      { id: 'seq-1', text: 'Ella rent vrolijk achter een fladderende vlinder aan.', correctOrder: 1 },
      { id: 'seq-2', text: 'Ella merkt dat ze haar kudde kwijt is en zoekt schaduw onder de acaciaboom.', correctOrder: 2 },
      { id: 'seq-3', text: 'Boerin Tess volgt de ronde pootafdrukken in het zand.', correctOrder: 3 },
      { id: 'seq-4', text: 'Ella vindt haar moeder bij de waterpoel en trompettert van blijdschap.', correctOrder: 4 }
    ],
    summaryPrompt: {
      charactersQuestion: 'Wie zijn de belangrijkste personages in dit verhaal?',
      problemQuestion: 'Wat was het probleem dat Ella tegenkwam?',
      solutionQuestion: 'Hoe werd het probleem op een fijne manier opgelost?'
    }
  },
  {
    id: 'zebra-stripes',
    title: 'Het Mysterie van de Zebra Zonder Strepen',
    subtitle: 'Logisch redeneren en speuren op de savanne',
    biome: 'safari',
    grade: 'group_6_7_8',
    coverEmoji: '🦓',
    heroAnimalId: 'zuri-zebra',
    vocabulary: [
      {
        word: 'camouflage',
        syllables: ['ca', 'mou', 'fla', 'ge'],
        meaning: 'Kleuren of patronen waardoor een dier bijna onzichtbaar wordt in zijn omgeving.',
        exampleSentence: 'De zwart-witte strepen van de zebra werken als een verwarrende camouflage.',
        emoji: '🎭'
      },
      {
        word: 'hypothese',
        syllables: ['hy', 'po', 'the', 'se'],
        meaning: 'Een slimme voorlopige verklaring die je gaat onderzoeken.',
        exampleSentence: 'Professor Ollie Uil stelde de hypothese dat de zebra in witte klei had gerold.',
        emoji: '💡'
      },
      {
        word: 'observatie',
        syllables: ['ob', 'ser', 'va', 'tie'],
        meaning: 'Het heel nauwkeurig en aandachtig bekijken van iets om informatie te verzamelen.',
        exampleSentence: 'Na een scherpe observatie zagen de onderzoekers witte poederresten op het gras.',
        emoji: '🔬'
      }
    ],
    paragraphs: [
      'Tijdens de vroege ochtendronde over de uitgestrekte savanne stuitte verslaggever Hemali op een wonderlijk schouwspel. Tussen de grazende zebra’s stond één dier dat er spierwit uitzag! Waar waren de karakteristieke zwarte strepen gebleven?',
      'Professor Ollie Uil streek zijn veren glad en stelde direct een onderzoek in. "Geen paniek," sprak de wijze uil, "laten we systematisch te werk gaan. Een zebra verliest niet zomaar zijn natuurlijke camouflagepatroon."',
      'Hemali pakte haar notitieblok en begon getuigen te interviewen. Bella de koe had vroeg in de ochtend een plons gehoord bij de kalksteenheuvels. Zuri de zebra bleek tijdens het spelen in een poel met zachte, witte kalkklei te zijn gerold!',
      'Na een verfrissende duik onder de waterval spoelde de witte kalklaag volledig weg. Zuri’s schitterende zwarte en witte strepen kwamen weer glanzend tevoorschijn. Het mysterie was met wetenschappelijke precisie en een glimlach opgelost!'
    ],
    comprehensionQuestions: [
      {
        id: 'zs-q1',
        category: 'Begrijpend Lezen & Conclusies',
        categoryIcon: '🦓',
        question: 'Wat was de echte reden dat de zebra er helemaal wit uitzag?',
        type: 'choice',
        options: [
          'De zebra was in een poel met witte kalkklei gerold',
          'De zebra was zijn strepen permanent kwijtgeraakt door de zon',
          'Iemand had de zebra stiekem met witte verf geverfd',
          'Het was een zeldzame ijsbeer die verdwaald was op de savanne'
        ],
        correctOptionIndex: 0,
        hint: 'Lees alinea 3 over de kalksteenheuvels.'
      },
      {
        id: 'zs-q2',
        category: 'Kritisch Denken',
        categoryIcon: '🦉',
        question: 'Welke wetenschappelijke aanpak gebruikte verslaggever Hemali om het mysterie op te lossen?',
        type: 'choice',
        options: [
          'Ze interviewde getuigen en verzamelde bewijsmateriaal',
          'Ze gokte zomaar wat zonder te kijken',
          'Ze wachtte tot het ging regenen zonder actie te ondernemen',
          'Ze vroeg aan de leeuw om de zebra weg te jagen'
        ],
        correctOptionIndex: 0,
        hint: 'Ze pakte haar notitieblok en sprak met Bella de koe.'
      }
    ],
    sequenceEvents: [
      { id: 'seq-z1', text: 'Hemali ontdekt een spierwitte zebra op de savanne.', correctOrder: 1 },
      { id: 'seq-z2', text: 'Professor Ollie stelt een onderzoek in en vraagt om observaties.', correctOrder: 2 },
      { id: 'seq-z3', text: 'Bella de koe vertelt over de kalksteenheuvels.', correctOrder: 3 },
      { id: 'seq-z4', text: 'De zebra neemt een duik onder de waterval en krijgt zijn strepen terug.', correctOrder: 4 }
    ],
    summaryPrompt: {
      charactersQuestion: 'Wie hielpen er allemaal mee aan het onderzoek?',
      problemQuestion: 'Waarom dacht iedereen eerst dat er iets mis was met de zebra?',
      solutionQuestion: 'Hoe hielp de waterval bij het oplossen van het mysterie?'
    }
  },
  {
    id: 'ocean-coral-rescue',
    title: 'Het Geheime Koraalrif & De Zeeschildpad',
    subtitle: 'Duik mee in de azuurblauwe dieptes van de oceaan',
    biome: 'sea',
    grade: 'group_4_5',
    coverEmoji: '🐢',
    heroAnimalId: 'sami-schildpad',
    vocabulary: [
      {
        word: 'koraalrif',
        syllables: ['ko', 'raal', 'rif'],
        meaning: 'Een kleurrijke onderwaterstad gebouwd door kleine koraaldiertjes.',
        exampleSentence: 'Tussen het koraalrif zwommen honderden gele en blauwe visjes.',
        emoji: '🪸'
      },
      {
        word: 'schild',
        syllables: ['schild'],
        meaning: 'Het harde, stevige pantser op de rug van een schildpad dat bescherming biedt.',
        exampleSentence: 'Sami trok haar pootjes voorzichtig onder haar gladde schild.',
        emoji: '🛡️'
      },
      {
        word: 'stroming',
        syllables: ['stro', 'ming'],
        meaning: 'De beweging van het water in de zee die vissen helpt om snel te zwemmen.',
        exampleSentence: 'De zeeschildpad liet zich ontspannen meedrijven op de warme zeestroming.',
        emoji: '🌊'
      }
    ],
    paragraphs: [
      'Diep onder het glinsterende oceaanoppervlak lag het mooiste koraalrif van de wereld. Overal zwommen felgekleurde anemoonvissen en dansten zeepaardjes tussen het zeegras.',
      'Sami de zeeschildpad gleed rustig door het heldere water. Maar vandaag zag ze iets dat er niet thuishoorde: een oud visnet zat verstrikt rondom een prachtig koraalbos!',
      'Sami wist dat de vissen nu niet veilig konden spelen. Ze zwom snel naar boven en tikte met haar flippers tegen de duikboot van Boerin Tess.',
      'Samen knipten ze het net voorzichtig los. Binnen enkele minuten zwommen alle kleine zeedieren weer vrolijk rond. Sami kreeg als bedankje een heerlijke portie knapperig zeewier!'
    ],
    comprehensionQuestions: [
      {
        id: 'oc-q1',
        category: 'Begrijpend Lezen',
        categoryIcon: '🪸',
        question: 'Wat was het gevaar dat Sami de schildpad ontdekte bij het koraalrif?',
        type: 'choice',
        options: [
          'Er zat een oud visnet verstrikt rond het koraal',
          'Het water was veel te koud geworden',
          'Er was geen zeewier meer te vinden',
          'De haaien waren verdwaald'
        ],
        correctOptionIndex: 0,
        hint: 'Lees alinea 2 over het oude net.'
      }
    ],
    summaryPrompt: {
      charactersQuestion: 'Wie hielpen er in de oceaan mee?',
      problemQuestion: 'Wat was er aan de hand bij het koraalrif?',
      solutionQuestion: 'Hoe maakten ze het rif weer helemaal schoon en veilig?'
    }
  }
];
