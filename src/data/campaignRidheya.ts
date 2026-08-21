import { RpgPage } from './citoRpgData';

export const RIDHEYA_12_PAGES_CAMPAIGN: RpgPage[] = [
  {
    pageNumber: 1,
    title: 'De Noodroep uit het Nevelwoud',
    biome: 'Tropische Regenwoudrand in Borneo 🇲🇾',
    storyText: `Ridheya zet haar ronde bril recht en kijkt vol spanning naar de dichte groene bomenrij. Aan haar schouder hangt haar rode **dierenartstas**. Opeens hoort ze een zacht gepiep bij het **oerwoudpad**. Haar trouwe geadopteerde zwerfhond Kopi spitst direct zijn oren en blaft waakzaam. 

Ridheya knielt rustig neer. Tussen de grote varens ligt een klein diertje met gouden veertjes te rillen. "Geen paniek, lief vogeltje," zegt Ridheya zacht. "Ik ben dierenarts Ridheya en ik ga je helpen." Ze haalt haar vergrootglas tevoorschijn om het veertje te bekijken.`,
    targetWords: [
      {
        word: 'dierenartstas',
        breakdown: 'dierenarts + tas',
        dutchMeaning: 'een tas met medische spullen zoals verband, zalf en een stethoscoop om dieren te helpen.',
        englishMeaning: 'Veterinarian medical kit bag'
      },
      {
        word: 'oerwoudpad',
        breakdown: 'oerwoud + pad',
        dutchMeaning: 'een smal wandelweggetje dat diep door het dichte bos loopt.',
        englishMeaning: 'Jungle trail / forest path'
      },
      {
        word: 'waakzaam',
        breakdown: 'waak + zaam',
        dutchMeaning: 'heel goed opletten of er gevaar dreigt.',
        englishMeaning: 'Watchful / alert'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🔍 Dierenarts Observatie #1',
      question: 'Wat ontdekt Ridheya tussen de varens langs het oerwoudpad?',
      options: [
        'Een verloren speelgoedauto van plastic',
        'Een klein rillend diertje met gouden veertjes dat hulp nodig heeft',
        'Een slapende draak van steen',
        'Een bak vol appels'
      ],
      correctIndex: 1,
      explanation: 'Ridheya vindt een klein diertje met gouden veertjes dat zachtjes piept tussen de varens.'
    },
    choices: [
      { label: 'Onderzoek de vleugel van de vogel voorzichtig met het vergrootglas', nextPage: 2, skillBonus: '+10 Observatiekracht', icon: '🔍' },
      { label: 'Roep Amir met de bakfiets om dekens en water te brengen', nextPage: 2, skillBonus: '+10 Vriendschapsband', icon: '🚲' }
    ]
  },
  {
    pageNumber: 2,
    title: 'De Gouden Zonnepapegaai & De Wonderzalf',
    biome: 'Bamboe Schuilhut van Mei-Ling',
    storyText: `Het diertje blijkt een zeldzame **zonnepapegaai** te zijn. Ridheya onderzoekt zijn **vleugeltje**. Gelukkig is het botje niet gebroken, maar er zit wel een schrammetje van een scherpe doorn op. 

Haar vriendin Mei-Ling komt aangerend met verse aloë vera. Ridheya mengt het plantensap met kokosolie tot een weldadige **wonderzalf**. Ze smeert het met een wattenstaafje zachtjes op de veertjes, **zodat** het wondje snel kan genezen. De vogel tsjilpt dankbaar en vlijt zich tegen Ridheya’s hand.`,
    targetWords: [
      {
        word: 'zonnepapegaai',
        breakdown: 'zon + ne + papegaai',
        dutchMeaning: 'een prachtige tropische vogel met felgele en gouden veertjes.',
        englishMeaning: 'Sun parakeet'
      },
      {
        word: 'wonderzalf',
        breakdown: 'wonder + zalf',
        dutchMeaning: 'een zachte helende balsem van natuurlijke kruiden die pijn verzacht.',
        englishMeaning: 'Healing ointment'
      },
      {
        word: 'vleugeltje',
        breakdown: 'vleugel + tje',
        dutchMeaning: 'een kleine vleugel van een jonge vogel.',
        englishMeaning: 'Little wing'
      }
    ],
    mysteryQuestion: {
      clueTitle: '💡 Medische Kennis #2',
      question: 'Waarom smeert Ridheya wonderzalf op het vleugeltje van de vogel?',
      options: [
        'Zodat de vogel lekker gaat ruiken naar kokosnoot',
        'Zodat het schrammetje van de doorn snel en pijnloos dichtgroeit',
        'Om de vogel geel te verven',
        'Omdat ze geen pleisters meer heeft'
      ],
      correctIndex: 1,
      explanation: 'De natuurlijke wonderzalf helpt het wondje van de vogel snel en zacht te herstellen.'
    },
    choices: [
      { label: 'Geef de papegaai een paar zoete papajazaadjes en vlieglessen', nextPage: 3, skillBonus: '+10 Dierenverzorging', icon: '🦜' },
      { label: 'Volg Kopi die verder het struikgewas in snuffelt naar een nieuw spoor', nextPage: 3, skillBonus: '+10 Speurdersgevoel', icon: '🐕' }
    ]
  },
  {
    pageNumber: 3,
    title: 'Het Zilveren Dwerghoefhertje Pip',
    biome: 'Banyanbomenbos',
    storyText: `Kopi stopt bij de reusachtige wortels van een oude banyanboom. Daar zit een piepklein **dwerghoefhert** klem tussen twee dikke houten takken. Het beestje heeft glinsterende bruine oogjes en is niet groter dan een konijntje!

Ridheya praat met een rustgevende stem. "Rustig maar Pip, we halen je eruit." Amir wrikken voorzichtig met een houten stok de takken een paar centimeter uit elkaar. Ridheya tilt het hertje **behoedzaam** op. Het beestje rilt, maar is kerngezond!`,
    targetWords: [
      {
        word: 'dwerghoefhert',
        breakdown: 'dwerg + hoef + hert',
        dutchMeaning: 'een heel klein, schattig hertje uit de bossen van Zuidoost-Azië.',
        englishMeaning: 'Mouse-deer (Kanchil)'
      },
      {
        word: 'behoedzaam',
        breakdown: 'behoed + zaam',
        dutchMeaning: 'heel voorzichtig en aandachtig om niemand pijn te doen.',
        englishMeaning: 'Cautiously / gently'
      },
      {
        word: 'hulpvaardig',
        breakdown: 'hulp + vaardig',
        dutchMeaning: 'altijd klaarstaan om anderen met plezier te helpen.',
        englishMeaning: 'Helpful'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🧠 Leesbegrip #3',
      question: 'Hoe slagen Ridheya en Amir erin om dwerghoefhertje Pip te bevrijden?',
      options: [
        'Ze zagen de hele banyanboom omver met lawaai.',
        'Ze wrikken de takken voorzichtig uit elkaar en tillen het hertje behoedzaam op.',
        'Ze roepen een helikopter.',
        'Ze wachten tot het gaat regenen.'
      ],
      correctIndex: 1,
      explanation: 'Met geduld en een houten stok wrikken ze de takken voorzichtig los zonder het hertje pijn te doen.'
    },
    choices: [
      { label: 'Onderzoek de hartslag van Pip met je stethoscoop', nextPage: 4, skillBonus: '+10 Diagnose', icon: '🩺' },
      { label: 'Draag Pip naar de koele waterbron om wat te drinken', nextPage: 4, skillBonus: '+10 Zorgzaamheid', icon: '💧' }
    ]
  },
  {
    pageNumber: 4,
    title: 'De Kristalheldere Lotusbron',
    biome: 'Bergrivier & Lotusvijver',
    storyText: `Aan het einde van het pad ontdekken de vrienden een verborgen bergstroom met een **kristalhelder** meertje vol roze lotusbloemen. Hier stroomt zuiver mineraalwater dat rijk is aan vitamines.

Ridheya vult haar veldfles met het koele water en geeft Pip te drinken. Kopi drinkt vrolijk slurpend mee. Opeens wijst Mei-Ling naar de overkant van het water: "Kijk Ridheya! Er drijft een oude houten **medicijnkist** aan een touw bij de oever!"`,
    targetWords: [
      {
        word: 'kristalhelder',
        breakdown: 'kristal + helder',
        dutchMeaning: 'zo zuiver en transparant dat je de bodem erdoorheen kunt zien.',
        englishMeaning: 'Crystal clear'
      },
      {
        word: 'medicijnkist',
        breakdown: 'medicijn + kist',
        dutchMeaning: 'een houten kist met flesjes, verband en kruidenpoeders.',
        englishMeaning: 'Medicine chest'
      },
      {
        word: 'lotusvijver',
        breakdown: 'lotus + vijver',
        dutchMeaning: 'een vijver waarin prachtige lotusbloemen drijven op grote bladeren.',
        englishMeaning: 'Lotus pond'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🔍 Speurwerk #4',
      question: 'Wat drijft er aan een touw bij de oever van de lotusvijver?',
      options: [
        'Een oude houten medicijnkist vol flesjes en kruiden',
        'Een gezonken piratenschip vol goudstukken',
        'Een plastic emmer vol verf',
        'Een kapotte kano'
      ],
      correctIndex: 0,
      explanation: 'Mei-Ling ontdekt een oude houten medicijnkist die aan een touw bij de oever drijft.'
    },
    choices: [
      { label: 'Trek de kist aan wal en bekijk de oude doktersrecepten', nextPage: 5, skillBonus: '+10 Wetenschap', icon: '📜' },
      { label: 'Laat Kopi eerst snuffelen of de kist veilig is', nextPage: 5, skillBonus: '+10 Veiligheid', icon: '🐕' }
    ]
  },
  {
    pageNumber: 5,
    title: 'De Geheime Kruidenkaarten van Borneo',
    biome: 'Bamboe Paviljoen',
    storyText: `In de kist vinden ze oude, met de hand getekende **kruidenkaarten**. Op de tekeningen staat precies uitgelegd welke planten helpen tegen bijensteken, buikpijn en pootwonden. 

Amir laadt zijn bakfiets in met bamboestengels en schone doeken. "Met deze kaarten kunnen we een echte mobiele **dierenkliniek** bouwen!" roept hij enthousiast. Ridheya bestudeert een tekening van een zeldzame gele bergmadelief die koorts verlaagt.`,
    targetWords: [
      {
        word: 'kruidenkaarten',
        breakdown: 'kruiden + kaarten',
        dutchMeaning: 'oude perkamenten met tekeningen en uitleg over geneeskrachtige planten.',
        englishMeaning: 'Herbal remedy charts'
      },
      {
        word: 'dierenkliniek',
        breakdown: 'dieren + kliniek',
        dutchMeaning: 'een ziekenhuis speciaal ingericht voor de verzorging van dieren.',
        englishMeaning: 'Animal clinic'
      },
      {
        word: 'bergmadelief',
        breakdown: 'berg + madelief',
        dutchMeaning: 'een zeldzaam geel bloemetje dat op rotshellingen bloeit.',
        englishMeaning: 'Mountain daisy'
      }
    ],
    mysteryQuestion: {
      clueTitle: '💡 Woordenschat #5',
      question: 'Wat is een "bergmadelief" volgens de tekst?',
      options: [
        'Een zeldzaam geel bloemetje dat op rotshellingen groeit en helpt bij koorts',
        'Een grote vogel met zwarte veren',
        'Een soort rotssteen die licht geeft in het donker',
        'Een houten wiel van een fiets'
      ],
      correctIndex: 0,
      explanation: 'De bergmadelief is een geneeskrachtig geel bloemetje dat groeit op berghellingen.'
    },
    choices: [
      { label: 'Volg het bergpad omhoog naar de rotshelling voor bergmadelieven', nextPage: 6, skillBonus: '+10 Moed', icon: '⛰️' },
      { label: 'Blijf bij de oase om een zachte slaapplek voor Pip en de vogel te maken', nextPage: 6, skillBonus: '+10 Zorg', icon: '🛏️' }
    ]
  },
  {
    pageNumber: 6,
    title: 'De Gloeiwormengrot van Kinabatangan',
    biome: 'Lichtgevende Druipsteengrot',
    storyText: `Het pad leidt de vrienden naar een geheimzinnige ingang in de rotswand. Binnen in de grot is het niet donker, want duizenden **gloeiwormen** schitteren als kleine groene sterretjes aan het gewelf!

In het midden van de grot horen ze een zacht gebrul. Het is geen eng monster, maar een kleine **zonnebeer** die met zijn snuitje in een holle boomstam vastzit op zoek naar wilde honing. Ridheya lacht zacht: "Wat een hongerig beertje ben jij!"`,
    targetWords: [
      {
        word: 'gloeiwormen',
        breakdown: 'gloei + wormen',
        dutchMeaning: 'kleine insectenlarven die prachtig licht geven in het donker.',
        englishMeaning: 'Glowworms / bioluminescent larvae'
      },
      {
        word: 'zonnebeer',
        breakdown: 'zon + ne + beer',
        dutchMeaning: 'de kleinste beversoort ter wereld met een gouden vlek op zijn borst.',
        englishMeaning: 'Sun bear (Malayan bear)'
      },
      {
        word: 'schitteren',
        dutchMeaning: 'mooi en helder fonkelen met lichtjes.',
        englishMeaning: 'Sparkling / shining'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🔍 Begrijpend Lezen #6',
      question: 'Waarom zit het zonnebeertje met zijn snuitje vast in de boomstam?',
      options: [
        'Hij wilde zich verstoppen voor de regen',
        'Hij zocht naar lekkere wilde honing in de holle stam',
        'Hij was zijn bril kwijtgeraakt',
        'Hij wilde de boom omver duwen'
      ],
      correctIndex: 1,
      explanation: 'Het hongerige beertje zocht naar zoete wilde honing in de holle stam.'
    },
    choices: [
      { label: 'Smeer een beetje plantaardige olie om zijn snuitje zachtjes los te maken', nextPage: 7, skillBonus: '+10 Vindingrijkheid', icon: '🍯' },
      { label: 'Leid het beertje af met zoete bananen terwijl Amir helpt', nextPage: 7, skillBonus: '+10 Tactiek', icon: '🍌' }
    ]
  },
  {
    pageNumber: 7,
    title: 'De Zachte Zonnebeerverzorging',
    biome: 'Grotuitgang bij de Rivier',
    storyText: `Met wat lauwe kokosolie glijdt het snuitje van het beertje soepel uit het hout. Het beertje niest hard: "Hatsjoe!" en wrijft met zijn pootjes over zijn neus.

Ridheya pakt haar stethoscoop. Ze luistert naar zijn **ademhaling**. "Alles klinkt helemaal zuiver!" stelt ze vast. Op zijn voorhoofd zit alleen een klein schaafwondje. Ridheya wikkelt een vrolijk geel **verbandje** om zijn voorhoofd. Het beertje knort tevreden en geeft Kopi een zacht duwtje met zijn neus.`,
    targetWords: [
      {
        word: 'ademhaling',
        breakdown: 'adem + haling',
        dutchMeaning: 'het in- en uitademen van lucht door de longen.',
        englishMeaning: 'Respiration / breathing'
      },
      {
        word: 'verbandje',
        breakdown: 'verband + je',
        dutchMeaning: 'een zacht strookje stof om een wondje te beschermen tegen vuil.',
        englishMeaning: 'Little bandage'
      },
      {
        word: 'tevreden',
        breakdown: 'te + vreden',
        dutchMeaning: 'blij en gerustgesteld met hoe het gaat.',
        englishMeaning: 'Content / satisfied'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🩺 Dierenarts Controle #7',
      question: 'Wat hoort Ridheya als ze met haar stethoscoop naar de zonnebeer luistert?',
      options: [
        'Dat het beertje een zware longontsteking heeft',
        'Dat zijn ademhaling helemaal zuiver en gezond klinkt',
        'Dat zijn hartslag niet klopt',
        'Dat hij een toeter in zijn keel heeft'
      ],
      correctIndex: 1,
      explanation: 'Ridheya stelt met haar stethoscoop vast dat zijn ademhaling helemaal zuiver is.'
    },
    choices: [
      { label: 'Geef het beertje de naam Baloe en laat hem meelopen', nextPage: 8, skillBonus: '+10 Vriendschap', icon: '🐻' },
      { label: 'Bouw een veilige hangbrug over de wilde rivier', nextPage: 8, skillBonus: '+10 Bouwkunst', icon: '🌉' }
    ]
  },
  {
    pageNumber: 8,
    title: 'De Oversteek over de Bamboe Hangbrug',
    biome: 'Diepe Tropische Kloof',
    storyText: `Om bij de grote **dierenvallei** te komen, moeten de vrienden een diepe kloof oversteken. Boven het kolkende water hangt een eeuwenoude **bamboebrug**. 

Kopi loopt voorop om te testen of het hout stevig is. Ridheya houdt Pip het dwerghoefhertje stevig in haar armen. "Kijk recht vooruit en zet rustige stappen," zegt ze bemoedigend tegen Amir. Samen bewaren ze perfect hun **evenwicht** en bereiken veilig de overkant.`,
    targetWords: [
      {
        word: 'bamboebrug',
        breakdown: 'bamboe + brug',
        dutchMeaning: 'een flexibele maar sterke hangbrug gemaakt van dikke bamboepalen en touw.',
        englishMeaning: 'Bamboo suspension bridge'
      },
      {
        word: 'evenwicht',
        breakdown: 'even + wicht',
        dutchMeaning: 'de toestand waarin je niet naar links of rechts omvalt.',
        englishMeaning: 'Balance / equilibrium'
      },
      {
        word: 'dierenvallei',
        breakdown: 'dieren + vallei',
        dutchMeaning: 'een beschermd dal waar wilde dieren in vrijheid en vrede leven.',
        englishMeaning: 'Animal sanctuary valley'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🧠 Begrijpend Lezen #8',
      question: 'Wie loopt er als eerste over de brug om te testen of het hout stevig is?',
      options: [
        'Amir met zijn zware bakfiets',
        'De dappere hond Kopi',
        'Het kleine hertje Pip',
        'De zonnebeer Baloe'
      ],
      correctIndex: 1,
      explanation: 'Kopi loopt voorop om het pad en de stevigheid van de bamboebrug te testen.'
    },
    choices: [
      { label: 'Klim omhoog naar het uitkijkpunt om de hele vallei te overzien', nextPage: 9, skillBonus: '+10 Overzicht', icon: '🔭' },
      { label: 'Volg de geur van bloesem naar de geheime oase', nextPage: 9, skillBonus: '+10 Natuurkennis', icon: '🌸' }
    ]
  },
  {
    pageNumber: 9,
    title: 'Baby Orang-oetan Bintang in de Boomtop',
    biome: 'Reuzen Vijgenboom',
    storyText: `In een torenhoge vijgenboom horen ze een vrolijk gekwetter. Hoog in de takken zit een kleine oranje **baby-orang-oetan**. Hij zwaait met een kokosnootschil en zwaait naar Ridheya.

Het aapje heet Bintang, wat 'ster' betekent in het Maleisisch. Hij heeft echter een splinter in zijn duimpje gekregen. Ridheya pakt haar fijne **pincet** uit het etui. Met een behendige beweging haalt ze de splinter eruit zonder dat Bintang ook maar één kik geeft. Bintang knuffelt Ridheya vol vreugde om haar nek!`,
    targetWords: [
      {
        word: 'orang-oetan',
        breakdown: 'orang + oetan (bosmens)',
        dutchMeaning: 'een slimme mensaap met lange oranje haren die hoog in de bomen leeft.',
        englishMeaning: 'Orangutan'
      },
      {
        word: 'pincet',
        dutchMeaning: 'een klein metalen grijpertje om splinters heel precies mee vast te pakken.',
        englishMeaning: 'Tweezers'
      },
      {
        word: 'behendig',
        breakdown: 'be + hendig',
        dutchMeaning: 'vlug, handig en heel vaardig met de vingers.',
        englishMeaning: 'Dexterous / agile / skillful'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🩺 Snelle Behandeling #9',
      question: 'Welk gereedschap gebruikt Ridheya om de splinter uit Bintangs duim te halen?',
      options: [
        'Een grote hamer van ijzer',
        'Een fijne pincet uit haar medische etui',
        'Een houten lepel',
        'Een stuk touw'
      ],
      correctIndex: 1,
      explanation: 'Met haar fijne pincet verwijdert Ridheya de splinter heel precies en pijnloos.'
    },
    choices: [
      { label: 'Trakteer Bintang op zoete mango en laat hem meerijden in de bakfiets', nextPage: 10, skillBonus: '+10 Gastvrijheid', icon: '🥭' },
      { label: 'Ga naar het centrum van het reservaat waar het grote waterrad staat', nextPage: 10, skillBonus: '+10 Ontdekking', icon: '🎡' }
    ]
  },
  {
    pageNumber: 10,
    title: 'Het Herstel van het Grote Waterrad',
    biome: 'Historisch Dierenreservaat van Borneo',
    storyText: `In het hart van het natuurreservaat staat een groot houten **waterrad** dat vroeger vers drinkwater naar alle drinkbakken in de vallei pompte. Maar er zit een dikke tak vast tussen de spaken!

"Als we onze krachten bundelen, krijgen we hem los!" roept Ridheya. Amir duwt met een bamboestok, Kopi trekt aan het touw, en de zonnebeer geeft een reuzenduwtje. **Krak!** De tak schiet los en het waterrad begint weer majestueus te draaien. Zuiver bergwater stroomt overal door de stenen geulen!`,
    targetWords: [
      {
        word: 'waterrad',
        breakdown: 'water + rad',
        dutchMeaning: 'een groot rad met schoepen dat door stromend water in beweging wordt gezet.',
        englishMeaning: 'Waterwheel'
      },
      {
        word: 'majestueus',
        dutchMeaning: 'groots, prachtig en indrukwekkend om te zien.',
        englishMeaning: 'Majestic / magnificent'
      },
      {
        word: 'drinkbakken',
        breakdown: 'drink + bakken',
        dutchMeaning: 'stenen of houten bakken waar dieren vers water uit drinken.',
        englishMeaning: 'Drinking troughs'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🌟 Teamwork Logica #10',
      question: 'Wat gebeurt er als de vrienden de tak losmaken uit het waterrad?',
      options: [
        'De hele vallei overstroomt met modder',
        'Het rad begint weer majestueus te draaien en zuiver water stroomt naar alle drinkbakken',
        'Het rad valt uit elkaar in duizend stukjes',
        'Amir raakt zijn fiets kwijt'
      ],
      correctIndex: 1,
      explanation: 'Door hun samenwerking draait het rad weer en krijgen alle dieren vers stromend drinkwater.'
    },
    choices: [
      { label: 'Organiseer een groot genezingsfeest voor alle geredde dieren', nextPage: 11, skillBonus: '+10 Vreugde', icon: '🎉' },
      { label: 'Plant nieuwe geneeskrachtige kruiden rond het waterrad', nextPage: 11, skillBonus: '+10 Tuinieren', icon: '🌱' }
    ]
  },
  {
    pageNumber: 11,
    title: 'Het Grote Genezingsfeest bij de Rivier',
    biome: 'Tropische Bloementuin',
    storyText: `Alle dieren uit de jungle hebben zich verzameld bij de oase. De gouden zonnepapegaai vliegt sierlijke rondjes door de lucht, Pip het dwerghoefhertje dartelt vrolijk door het gras, en zonnebeer Baloe smult van verse honing met fruit.

Mei-Ling deelt schalen met rijst, papaja en bessen uit. Ridheya kijkt met een warm hart rond. Ieder dier dat gewond of bang was, is nu veilig, gezond en vol **levensvreugde**. Kopi kwispelt zo hard dat zijn hele lijfje meeschudt!`,
    targetWords: [
      {
        word: 'levensvreugde',
        breakdown: 'leven + s + vreugde',
        dutchMeaning: 'het blije en energieke gevoel van gelukkig zijn.',
        englishMeaning: 'Joy of living / zest for life'
      },
      {
        word: 'dartelen',
        dutchMeaning: 'vrolijk en speels rondhuppelen in het gras.',
        englishMeaning: 'Frolicking / skipping happily'
      },
      {
        word: 'onvergetelijk',
        breakdown: 'on + vergetelijk',
        dutchMeaning: 'zo mooi en bijzonder dat je het je hele leven zult herinneren.',
        englishMeaning: 'Unforgettable'
      }
    ],
    mysteryQuestion: {
      clueTitle: '💡 Tekstverband #11',
      question: 'Waarom is het feest bij de oase zo bijzonder?',
      options: [
        'Omdat het de verjaardag van de koning is',
        'Omdat alle gewonde dieren nu genezen zijn en veilig samen vieren',
        'Omdat het de hele dag sneeuwt in het oerwoud',
        'Omdat niemand naar huis wil'
      ],
      correctIndex: 1,
      explanation: 'Het feest viert dat alle zieke en gewonde dieren dankzij de goede zorg weer gezond zijn.'
    },
    choices: [
      { label: 'Ontvang de officiële onderscheiding als Meester-Dierenarts', nextPage: 12, skillBonus: '+20 Eindtoets Glorie', icon: '👑' },
      { label: 'Schrijf alle medische tips op in je permanente dierenartslogboek', nextPage: 12, skillBonus: '+20 Kennisoverdracht', icon: '📖' }
    ]
  },
  {
    pageNumber: 12,
    title: 'De Eretitel: Meester-Dierenarts van Borneo',
    biome: 'Gouden Zonsondergang & Dierenpaviljoen',
    storyText: `Terwijl de zon als een grote gouden bol wegzakt achter de palmbomen, hangt Mei-Ling een prachtige **bloemenkrans** van wilde orchideeën om Ridheya’s schouders. 

"Jij bent niet zomaar een dokter," zegt Amir trots. "Jij bent de Meester-Dierenarts van Borneo!" Ridheya glimlacht stralend achter haar ronde bril. Met haar observatiekracht, vriendelijkheid en stethoscoop heeft ze bewezen dat liefde voor dieren en kennis van de natuur de wereld mooier maken. Ridheya aait Kopi en Pip: "Dit is pas het begin van onze grote avonturen!"`,
    targetWords: [
      {
        word: 'bloemenkrans',
        breakdown: 'bloemen + krans',
        dutchMeaning: 'een gevlochten cirkel van bloemen als feestelijk eerbetoon.',
        englishMeaning: 'Flower garland / floral wreath'
      },
      {
        word: 'observatiekracht',
        breakdown: 'observatie + kracht',
        dutchMeaning: 'het talent om heel goed en aandachtig details op te merken.',
        englishMeaning: 'Power of observation'
      },
      {
        word: 'heldendaad',
        breakdown: 'helden + daad',
        dutchMeaning: 'een moedige en nobele actie waarmee je anderen redt.',
        englishMeaning: 'Heroic deed'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🏆 Eindconclusie #12',
      question: 'Wat is de belangrijkste les die Ridheya heeft bewezen in haar 12-delige reis?',
      options: [
        'Dat je dieren het beste met rust kunt laten in de stad',
        'Dat observatiekracht, vriendelijkheid en goede medische zorg dierenlevens redden',
        'Dat bakfietsen altijd sneller zijn dan treinen',
        'Dat orchideeën alleen in het donker groeien'
      ],
      correctIndex: 1,
      explanation: 'Ridheya heeft bewezen dat aandacht, vakkennis en dierenliefde elk gewond wezen kunnen helpen genezen.'
    },
    choices: [
      { label: 'Voltooi de Campagne & Bewaar je Diploma in je Rapport', nextPage: 1, skillBonus: '🌟 Goud Cito AVI E4 Certificaat!', icon: '🎓' }
    ]
  }
];
