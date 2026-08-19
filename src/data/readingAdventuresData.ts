import { StoryAdventure } from '../types';

export const READING_ADVENTURES: StoryAdventure[] = [
  // ==========================================
  // RIDHEYA (GROEP 4-5) SHORT & ENGAGING STORIES (<100 words)
  // ==========================================
  {
    id: 'vlinder-tuin',
    title: 'Het Vlindertuintje van Ridheya',
    subtitle: 'Kort & vrolijk dierenverhaal met Max de Aap',
    biome: 'farm',
    grade: 'group_4_5',
    coverEmoji: '🦋',
    heroAnimalId: 'max-monkey',
    vocabulary: [
      {
        word: 'vlinder',
        syllables: ['vlin', 'der'],
        meaning: 'Een kleurrijk vliegend insect met zachte vleugels.',
        exampleSentence: 'De gele vlinder drinkt zoete nectar uit de bloem.',
        emoji: '🦋'
      },
      {
        word: 'honing',
        syllables: ['ho', 'ning'],
        meaning: 'Een zoete, gouden lekkernij die bijen maken.',
        exampleSentence: 'Max eet graag een klein lepeltje honing.',
        emoji: '🍯'
      }
    ],
    paragraphs: [
      'In de zonnige tuin van de boerderij fladderen tien vrolijke vlinders. Ridheya en Max de Lees-Aap planten paarse lavendelbloemen.',
      'Een klein geel vlindertje landt zachtjes op het topje van Ridheya’s neus. Ridheya moet heel hard giechelen!',
      'Max geeft het vlindertje een druppeltje zoet suikerwater op een blad. Nu zijn ze voor altijd de beste vriendjes in de tuin.'
    ],
    comprehensionQuestions: [
      {
        id: 'vt-q1',
        category: 'Begrijpend Lezen',
        categoryIcon: '🦋',
        question: 'Waar landt het gele vlindertje?',
        type: 'choice',
        options: [
          'Op het puntje van Ridheya’s neus',
          'In een emmer vol water',
          'Bovenin een hoge boom',
          'Op de schoen van de boer'
        ],
        correctOptionIndex: 0,
        hint: 'Lees de tweede zin van het verhaaltje.'
      },
      {
        id: 'vt-q2',
        category: 'Dierenweetjes',
        categoryIcon: '🍯',
        question: 'Wat geeft Max aan het vlindertje?',
        type: 'choice',
        options: [
          'Een druppeltje zoet suikerwater op een blad',
          'Een groot stuk bruin brood',
          'Een schijfje harde kaas',
          'Een koude ijspegel'
        ],
        correctOptionIndex: 0,
        hint: 'Kijk naar wat Max op het blad legt.'
      }
    ],
    sequenceEvents: [
      { id: 'vt-seq-1', text: 'Ridheya en Max planten paarse lavendelbloemen.', correctOrder: 1 },
      { id: 'vt-seq-2', text: 'Het gele vlindertje landt op Ridheya’s neus.', correctOrder: 2 },
      { id: 'vt-seq-3', text: 'Max geeft het diertje lekker suikerwater.', correctOrder: 3 }
    ],
    summaryPrompt: {
      charactersQuestion: 'Wie zijn de vriendjes in de bloementuin?',
      problemQuestion: 'Waarom moest Ridheya giechelen?',
      solutionQuestion: 'Hoe zorgden ze goed voor het vlindertje?'
    }
  },
  {
    id: 'pinguin-ijs',
    title: 'Pip de Pinguïn Glijdt over het IJs',
    subtitle: 'Een koud maar supergrappig winteravontuur',
    biome: 'snow',
    grade: 'group_4_5',
    coverEmoji: '🐧',
    heroAnimalId: 'plons-pinguin',
    vocabulary: [
      {
        word: 'buikschuiver',
        syllables: ['buik', 'schui', 'ver'],
        meaning: 'Op je buik over glad ijs glijden alsof je een slee bent.',
        exampleSentence: 'Pip maakt een supersnelle buikschuiver over de sneeuwhelling.',
        emoji: '❄️'
      },
      {
        word: 'zilvervis',
        syllables: ['zil', 'ver', 'vis'],
        meaning: 'Een klein glanzend visje waar pinguïns dol op zijn.',
        exampleSentence: 'Pip duikt onder water en vangt een zilvervisje.',
        emoji: '🐟'
      }
    ],
    paragraphs: [
      'Pip de kleine pinguïn staat bovenop een grote ijsberg. Haar vriendjes roepen: "Kijk eens hoe snel ik kan glijden!"',
      'Pip neemt een aanloopje, springt op haar zachte witte buik en roetsjt naar beneden. Wheee!',
      'Ze plonst pardoes in het heldere water en vangt direct een lekker zilvervisje voor haar lunch. Wat een feest!'
    ],
    comprehensionQuestions: [
      {
        id: 'pi-q1',
        category: 'Begrijpend Lezen',
        categoryIcon: '🐧',
        question: 'Hoe glijdt Pip van de ijsberg af?',
        type: 'choice',
        options: [
          'Op haar zachte buik als een buikschuiver',
          'Op een houten hockeyschaats',
          'Met een rode parachute',
          'In een snelle raceauto'
        ],
        correctOptionIndex: 0,
        hint: 'Ze springt op haar buik en roetsjt naar beneden!'
      },
      {
        id: 'pi-q2',
        category: 'Woordenschat',
        categoryIcon: '🐟',
        question: 'Wat vangt Pip als ze in het water plonst?',
        type: 'choice',
        options: [
          'Een lekker zilvervisje',
          'Een oude laars',
          'Een stuk drijfhout',
          'Een gele strandbal'
        ],
        correctOptionIndex: 0,
        hint: 'Lees de laatste zin over haar lunch.'
      }
    ],
    sequenceEvents: [
      { id: 'pi-seq-1', text: 'Pip staat bovenop de hoge ijsberg.', correctOrder: 1 },
      { id: 'pi-seq-2', text: 'Ze glijdt op haar buik naar beneden.', correctOrder: 2 },
      { id: 'pi-seq-3', text: 'Pip plonst in het water en eet een zilvervisje.', correctOrder: 3 }
    ],
    summaryPrompt: {
      charactersQuestion: 'Wie is de hoofdrolspeler op het ijs?',
      problemQuestion: 'Wat wilde Pip graag aan haar vriendjes laten zien?',
      solutionQuestion: 'Hoe eindigde haar buikschuiver?'
    }
  },
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
      }
    ],
    paragraphs: [
      'De zon scheen warm over de gouden savanne. Kleine Ella het olifantje was vrolijk achter een fladderende vlinder aan gerend. Maar plotseling zag ze haar kudde nergens meer!',
      'Ella liep dapper naar een grote acaciaboom en hief haar slurfje hoog in de lucht om te ruiken waar water was.',
      'In de verte hoorde ze spetterend water. Bij de koele waterpoel vond ze haar moeder en begon blij te trompetteren!'
    ],
    comprehensionQuestions: [
      {
        id: 'le-q1',
        category: 'Begrijpend Lezen',
        categoryIcon: '🐘',
        question: 'Waarom was kleine Ella haar kudde kwijtgeraakt?',
        type: 'choice',
        options: [
          'Ze rende achter een vlinder aan',
          'Ze was gaan slapen in het zand',
          'Ze zocht een nieuwe acaciaboom',
          'Ze was bang voor een leeuw'
        ],
        correctOptionIndex: 0,
        hint: 'Kijk goed naar de eerste alinea van het verhaal.'
      },
      {
        id: 'le-q2',
        category: 'Woordbetekenis',
        categoryIcon: '🎺',
        question: 'Wat betekent het woord "trompetteren"?',
        type: 'choice',
        options: [
          'Het luide toetergeluid van een olifant met zijn slurf',
          'Gitaar spelen bij het kampvuur',
          'Heel snel rondjes rennen',
          'Zand over je rug strooien'
        ],
        correctOptionIndex: 0,
        hint: 'Denk aan het geluid van een olifantenslurf.'
      }
    ],
    sequenceEvents: [
      { id: 'le-seq-1', text: 'Ella rent achter een vlinder aan op de savanne.', correctOrder: 1 },
      { id: 'le-seq-2', text: 'Ella ruikt met haar slurfje onder de acaciaboom.', correctOrder: 2 },
      { id: 'le-seq-3', text: 'Ella vindt haar kudde bij de waterpoel en trompettert.', correctOrder: 3 }
    ],
    summaryPrompt: {
      charactersQuestion: 'Wie raakte verdwaald op de savanne?',
      problemQuestion: 'Wat was het probleem van Ella?',
      solutionQuestion: 'Hoe vond ze haar moeder weer terug?'
    }
  },
  {
    id: 'ocean-coral-rescue',
    title: 'Het Geheime Koraalrif & De Zeeschildpad',
    subtitle: 'Zwemmen tussen glinsterende vissen en zeesterren',
    biome: 'sea',
    grade: 'group_4_5',
    coverEmoji: '🐢',
    heroAnimalId: 'sami-zeeschildpad',
    vocabulary: [
      {
        word: 'koraalrif',
        syllables: ['ko', 'raal', 'rif'],
        meaning: 'Een kleurrijke onderwaterstad gebouwd door kleine koraaldieren.',
        exampleSentence: 'In het koraalrif zwemmen duizenden vissen.',
        emoji: '🪸'
      },
      {
        word: 'zeegras',
        syllables: ['zee', 'gras'],
        meaning: 'Groene plantjes die op de bodem van de oceaan groeien.',
        exampleSentence: 'De zeeschildpad smult van vers zeegras.',
        emoji: '🌿'
      }
    ],
    paragraphs: [
      'Onder het blauwe zeewater zwemt Sami de zeeschildpad rustig over het koraalrif. Het rif lijkt wel een sprookjeskasteel met roze en gouden koralen.',
      'Sami ontdekt een klein geel visje dat vastzit tussen wat los zeegras. Met haar sterke flipper duwt Sami het zeegras voorzichtig opzij.',
      'Het visje danst een vrolijk rondje door het water. Als dank wijst het visje Sami de weg naar het lekkerste sappige zeegrasveld!'
    ],
    comprehensionQuestions: [
      {
        id: 'ocr-q1',
        category: 'Begrijpend Lezen',
        categoryIcon: '🐢',
        question: 'Wie helpt Sami de zeeschildpad in het koraalrif?',
        type: 'choice',
        options: [
          'Een klein geel visje dat vastzat in zeegras',
          'Een grote gevaarlijke haai',
          'Een zeemeeuw in de lucht',
          'Een duiker met een camera'
        ],
        correctOptionIndex: 0,
        hint: 'Lees de tweede alinea over het visje.'
      },
      {
        id: 'ocr-q2',
        category: 'Onderwaterkennis',
        categoryIcon: '🪸',
        question: 'Waarmee duwt Sami het zeegras opzij?',
        type: 'choice',
        options: [
          'Met haar sterke flipper',
          'Met een stok',
          'Met haar snavel',
          'Met een schelp'
        ],
        correctOptionIndex: 0,
        hint: 'Schildpadden zwemmen met hun flippers!'
      }
    ],
    sequenceEvents: [
      { id: 'ocr-seq-1', text: 'Sami zwemt over het kleurrijke koraalrif.', correctOrder: 1 },
      { id: 'ocr-seq-2', text: 'Sami bevrijdt het gele visje uit het zeegras.', correctOrder: 2 },
      { id: 'ocr-seq-3', text: 'Het visje wijst Sami het sappige zeegrasveld.', correctOrder: 3 }
    ],
    summaryPrompt: {
      charactersQuestion: 'Wie zwemmen er in de oceaan?',
      problemQuestion: 'Waar zat het gele visje vast?',
      solutionQuestion: 'Hoe hielpen de twee dieren elkaar?'
    }
  },

  // ==========================================
  // HEMALI (GROEP 6-7-8) INVESTIGATIVE & SCIENCE ADVENTURES
  // ==========================================
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
        meaning: 'Een beredeneerde voorlopige verklaring die je met onderzoek gaat toetsen.',
        exampleSentence: 'Professor Ollie Uil stelde de hypothese op dat de zebra in witte kalkklei had gerold.',
        emoji: '💡'
      },
      {
        word: 'observatie',
        syllables: ['ob', 'ser', 'va', 'tie'],
        meaning: 'Het heel nauwkeurig en methodisch waarnemen van verschijnselen.',
        exampleSentence: 'Na een scherpe observatie zagen de onderzoekers witte poederresten op de grassprieten.',
        emoji: '🔬'
      }
    ],
    paragraphs: [
      'Tijdens de vroege ochtendronde over de uitgestrekte savanne stuitte verslaggever Hemali op een wonderlijk schouwspel. Tussen de grazende zebra’s stond één dier dat er spierwit uitzag! Waar waren de karakteristieke zwarte strepen gebleven?',
      'Professor Ollie Uil streek zijn veren glad en stelde direct een wetenschappelijk onderzoek in. "Laten we methodisch te werk gaan," sprak de wijze uil. "Een zebra verliest niet plotseling zijn genetische strepenpatroon."',
      'Hemali boog zich voorover en bekeek de sporen in de aarde met een vergrootglas. Ze ontdekte poederachtige witte vegen op een heuvel met zachte kalkklei. De zebra had daar heerlijk liggen rollen om zichzelf te beschermen tegen vervelende steekvliegen!',
      'Met een zachte waterstraal spoelde Hemali een stukje van de flank schoon, waarna de schitterende zwarte strepen weer zichtbaar werden. Het mysterie was met glans opgelost!'
    ],
    comprehensionQuestions: [
      {
        id: 'zs-q1',
        category: 'Onderzoeksvaardigheid',
        categoryIcon: '🔬',
        question: 'Waarom bleek de zebra spierwit te zijn?',
        type: 'choice',
        options: [
          'De zebra had in een kalkklei-heuvel gerold tegen de vliegen',
          'De zebra was zijn strepen voor altijd verloren door de zon',
          'Het was een zeldzame albino zebra uit het noorden',
          'Iemand had de zebra per ongeluk geschilderd'
        ],
        correctOptionIndex: 0,
        hint: 'Lees alinea 3 over de sporen in de kalkheuvel.'
      },
      {
        id: 'zs-q2',
        category: 'Begrijpend Lezen',
        categoryIcon: '🦓',
        question: 'Waarom rollen zebra’s in stof of klei volgens het biologische verslag?',
        type: 'choice',
        options: [
          'Als beschermende laag tegen vervelende steekvliegen en hitte',
          'Om sneller te kunnen rennen dan leeuwen',
          'Om zich voor te doen als een wit paard',
          'Omdat ze water proberen te vermijden'
        ],
        correctOptionIndex: 0,
        hint: 'Dieren gebruiken kleilagen als natuurlijk afweermiddel.'
      }
    ],
    sequenceEvents: [
      { id: 'zs-seq-1', text: 'Hemali ontdekt een spierwitte zebra tussen de kudde.', correctOrder: 1 },
      { id: 'zs-seq-2', text: 'Professor Ollie stelt een wetenschappelijke hypothese op.', correctOrder: 2 },
      { id: 'zs-seq-3', text: 'Hemali vindt poedersporen bij de kalkklei-heuvel.', correctOrder: 3 },
      { id: 'zs-seq-4', text: 'Water wast de klei weg en onthult de zwarte strepen.', correctOrder: 4 }
    ],
    summaryPrompt: {
      charactersQuestion: 'Wie deden het onderzoek op de savanne?',
      problemQuestion: 'Welk mysterie moest worden opgelost?',
      solutionQuestion: 'Welk wetenschappelijk bewijs vond Hemali?'
    }
  },
  {
    id: 'regenwoud-communicatie',
    title: 'De Geheime Spraak van het Regenwoud',
    subtitle: 'Hoe bomen en dieren signalen doorgeven via het bladerdak',
    biome: 'jungle',
    grade: 'group_6_7_8',
    coverEmoji: '🌿',
    heroAnimalId: 'kiki-kameleon',
    vocabulary: [
      {
        word: 'ecosysteem',
        syllables: ['e', 'co', 'sys', 'teem'],
        meaning: 'Een leefgemeenschap van planten en dieren die precies met elkaar in balans leven.',
        exampleSentence: 'Elk insect vervult een onmisbare rol in het tropische ecosysteem.',
        emoji: '🌍'
      },
      {
        word: 'communicatie',
        syllables: ['com', 'mu', 'ni', 'ca', 'tie'],
        meaning: 'Het uitwisselen van informatie, geluiden, geuren of kleuren.',
        exampleSentence: 'De kameleon gebruikt kleurveranderingen als visuele communicatie.',
        emoji: '📡'
      },
      {
        word: 'schimmelnetwerk',
        syllables: ['schim', 'mel', 'net', 'werk'],
        meaning: 'Ondergrondse schimmeldraden waarmee bomen voedingsstoffen en waarschuwingen delen.',
        exampleSentence: 'Via het ondergrondse schimmelnetwerk waarschuwde de moederboom voor droogte.',
        emoji: '🍄'
      }
    ],
    paragraphs: [
      'Diep in het Amazoneregenwoud ontdekte onderzoeksjournaliste Hemali dat het woud nooit werkelijk stil is. Zelfs zonder woorden praten bomen, bloemen en dieren voortdurend met elkaar via slimme biologische netwerken.',
      'Onder de grond zijn de wortels van woudreuzen verbonden door een gigantisch schimmelnetwerk, ook wel het "Wood Wide Web" genoemd. Wanneer een boom wordt aangevallen door rupsen, zendt hij chemische waarschuwingsstoffen naar zijn buurbomen.',
      'Tegelijkertijd veranderen kameleons van kleur om territoria af te bakenen en bootsen vogels alarmroepen na om apen te waarschuwen voor naderende roofdieren. Alles in het oerwoud werkt naadloos samen in een wonderbaarlijk evenwicht.'
    ],
    comprehensionQuestions: [
      {
        id: 'rc-q1',
        category: 'Wetenschap & Natuur',
        categoryIcon: '🍄',
        question: 'Wat is het "Wood Wide Web" in het regenwoud?',
        type: 'choice',
        options: [
          'Een ondergronds netwerk van schimmeldraden waarmee bomen communiceren',
          'Een computernetwerk van de safari-onderzoekers',
          'Een touwbrug tussen de hoogste boomtoppen',
          'Een spinnenweb van de vogelspin'
        ],
        correctOptionIndex: 0,
        hint: 'Lees de uitleg over de ondergrondse wortels en schimmels.'
      },
      {
        id: 'rc-q2',
        category: 'Begrijpend Lezen',
        categoryIcon: '🌿',
        question: 'Wat doet een boom als hij wordt aangevallen door schadelijke insecten?',
        type: 'choice',
        options: [
          'Hij stuurt chemische waarschuwingsstoffen naar omliggende bomen',
          'Hij laat onmiddellijk al zijn takken vallen',
          'Hij stopt voor altijd met groeien',
          'Hij maakt harde geluiden met zijn bladeren'
        ],
        correctOptionIndex: 0,
        hint: 'Kijk naar alinea 2 over chemische waarschuwingen.'
      }
    ],
    sequenceEvents: [
      { id: 'rc-seq-1', text: 'Hemali observeert de verborgen communicatie in het oerwoud.', correctOrder: 1 },
      { id: 'rc-seq-2', text: 'Ondergrondse schimmeldraden delen voedingsstoffen en waarschuwingen.', correctOrder: 2 },
      { id: 'rc-seq-3', text: 'Kameleons en vogels stemmen hun kleuren en geluiden af op het ecosysteem.', correctOrder: 3 }
    ],
    summaryPrompt: {
      charactersQuestion: 'Wie onderzocht het tropische bladerdak?',
      problemQuestion: 'Hoe geven bomen signalen door zonder stem?',
      solutionQuestion: 'Waarom is dit evenwicht zo belangrijk voor de aarde?'
    }
  }
];
