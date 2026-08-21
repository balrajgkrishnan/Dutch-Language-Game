import { RpgPage } from './citoRpgData';

export const RIDHEYA_CORAL_REEF_CAMPAIGN: RpgPage[] = [
  {
    pageNumber: 1,
    title: 'De Noodoproep van de Schildpaddenbaai',
    biome: 'Koraalstrand van Pulau Tioman',
    storyText: `Ridheya stond met haar witte **dierenartskit** op de steiger van Pulau Tioman. De warme zeewind blies door haar haren en haar ronde bril glansde in het zonlicht. Plotseling zag ze een jonge groene **zeeschildpad** die moeizaam over het koraalzand kroop.

Het diertje zat vast in een stuk aangespoeld visnet. "Rustig maar, dapper schildpadje," fluisterde Ridheya liefdevol. Ze pakte haar stompe medische schaartje om de touwen voorzichtig los te knippen.`,
    targetWords: [
      {
        word: 'dierenartskit',
        breakdown: 'dieren + arts + kit',
        dutchMeaning: 'een tas met medische spullen en verband om dieren te behandelen.',
        englishMeaning: 'Veterinary medical kit'
      },
      {
        word: 'zeeschildpad',
        breakdown: 'zee + schildpad',
        dutchMeaning: 'een groot reptiel met een schild en flipperpoten dat in warme zeeën zwemt.',
        englishMeaning: 'Sea turtle'
      },
      {
        word: 'aangespoeld',
        breakdown: 'aan + gespoeld',
        dutchMeaning: 'door de golven van de zee op het droge strand geworpen.',
        englishMeaning: 'Washed ashore'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🐢 Eerste Hulp #1',
      question: 'Waarom heeft de jonge zeeschildpad hulp nodig van Ridheya?',
      options: [
        'Hij wil een ijsje eten',
        'Hij zit verstrikt in een stuk aangespoeld visnet',
        'Hij zoekt zijn zonnebril',
        'Hij wil leren vliegen'
      ],
      correctIndex: 1,
      explanation: 'De schildpad zit vast in touwen van een visnet en Ridheya knipt deze voorzichtig los.'
    },
    choices: [
      { label: 'Smeer een verzachtende aloë-zalf op de flipper en geef het schildpadje de naam Sam', nextPage: 2, skillBonus: '+15 Wondverzorging', icon: '🐢' },
      { label: 'Onderzoek met je vergrootglas de sporen naar het koraalrif', nextPage: 2, skillBonus: '+15 Spoorzoeken', icon: '🔍' }
    ]
  },
  {
    pageNumber: 2,
    title: 'De Geheime Onderwatergrot met Lichtkoraal',
    biome: 'Onderwaterlagune vol Zacht Koraal',
    storyText: `Met haar duikbril en snorkeltas zwom Ridheya samen met Sam het heldere water in. Tussen het felroze en goudgele koraal zag ze een kleine, verborgen **onderwatergrot**. 

Binnenin dreef een geschrokken **clownvisje** rondom een bleke zeeanemoon. "De anemoon heeft te weinig zonlicht door het drijvende puin," zag Ridheya direct door haar heldere duikglas. Met zachte hand ruimde ze de bladeren en takjes weg zodat het lichtkoraal weer kon ademen.`,
    targetWords: [
      {
        word: 'onderwatergrot',
        breakdown: 'onder + water + grot',
        dutchMeaning: 'een holle ruimte in een rots onder het oppervlak van de zee.',
        englishMeaning: 'Underwater cave'
      },
      {
        word: 'clownvisje',
        breakdown: 'clown + vis + je',
        dutchMeaning: 'een klein oranje visje met witte strepen dat veilig tussen anemonen leeft.',
        englishMeaning: 'Little clownfish'
      },
      {
        word: 'zeeanemoon',
        breakdown: 'zee + anemoon',
        dutchMeaning: 'een kleurrijk zeedier met zachte tentakels dat vastzit op een rots.',
        englishMeaning: 'Sea anemone'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🐠 Koraal Biologie #2',
      question: 'Waarom was de zeeanemoon bleek geworden?',
      options: [
        'Omdat hij moe was van het zwemmen',
        'Omdat drijvend puin het zonlicht blokkeerde',
        'Omdat de vissen te hard zongen',
        'Omdat het water bevroren was'
      ],
      correctIndex: 1,
      explanation: 'Het drijvende puin hield het zonlicht tegen, waardoor het koraal en de anemoon verzwakten.'
    },
    choices: [
      { label: 'Plant een stekje van zeldzaam blauw sterrenkoraal', nextPage: 3, skillBonus: '+15 Koraalherstel', icon: '🪸' },
      { label: 'Volg de clownvis naar de diepere zandbank', nextPage: 3, skillBonus: '+15 Navigatie', icon: '🌊' }
    ]
  },
  {
    pageNumber: 3,
    title: 'De Gevangen Baby Dolfijn in de Zeegrasweide',
    biome: 'Uitgestrekte Zeegrasweide',
    storyText: `Op de zanderige bodem golfde een weelderige **zeegrasweide**. Daar hoorde Ridheya een zacht, klikkend geluidje. Een jonge **zeedolfijn** zat met zijn staartvin vast onder een zware schelpenkrans.

Ridheya zwom behoedzaam dichterbij. Ze gebruikte een houten hefboompje uit haar duiktas om de schelpenkrans voorzichtig op te tillen. "Geen zorgen kleintje, ik help je!" Met een sierlijke salto sprong de jonge dolfijn vrij door het water en gaf Ridheya een vrolijke neusduw.`,
    targetWords: [
      {
        word: 'zeegrasweide',
        breakdown: 'zee + gras + weide',
        dutchMeaning: 'een grote onderwaterweide vol groen gras waar zeedieren grazen en schuilen.',
        englishMeaning: 'Seagrass meadow'
      },
      {
        word: 'zeedolfijn',
        breakdown: 'zee + dolfijn',
        dutchMeaning: 'een heel intelligent en sociaal zoogdier dat in de oceaan leeft en ademt met een blaasgat.',
        englishMeaning: 'Marine dolphin'
      },
      {
        word: 'behoedzaam',
        breakdown: 'behoed + zaam',
        dutchMeaning: 'heel voorzichtig en aandachtig om niets kapot te maken of te laten schrikken.',
        englishMeaning: 'Cautiously / gently'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🐬 Dierenredding #3',
      question: 'Hoe bevrijdt Ridheya de jonge dolfijn?',
      options: [
        'Ze trekt hard aan zijn staart',
        'Ze tilt de zware schelpenkrans behoedzaam op met een houten hefboompje',
        'Ze roept een haai om hulp',
        'Ze zwemt weg naar het strand'
      ],
      correctIndex: 1,
      explanation: 'Ridheya gebruikt een hefboompje om de schelpenkrans voorzichtig op te lichten zonder het dier pijn te doen.'
    },
    choices: [
      { label: 'Zwem samen met de dolfijn en schildpad Sam naar het Koninginnenrif', nextPage: 4, skillBonus: '+20 Dolfijnenvriendschap', icon: '🐬' },
      { label: 'Verzamel geneeskrachtig parelpoeder van de zeebodem', nextPage: 4, skillBonus: '+20 Natuurgeneeskunde', icon: '✨' }
    ]
  },
  {
    pageNumber: 4,
    title: 'De Feestelijke Kroning tot Dokter van de Zee',
    biome: 'Het Stralende Koninginnenrif',
    storyText: `Bij het Koninginnenrif straalde het water in alle kleuren van de regenboog. Schildpad Sam, het clownvisje en de baby dolfijn cirkelden vrolijk om Ridheya heen. 

De oudste zeeschildpad van het rif overhandigde Ridheya een schitterende **parelketting** gemaakt van glanzend parelmoer. "Dankzij jouw moed en zachte zorg zijn onze jongen veilig," ruisten de golven. Ridheya zette haar bril recht en glimlachte trots: het koraalrif was weer een veilig thuis voor iedereen!`,
    targetWords: [
      {
        word: 'parelketting',
        breakdown: 'parel + ketting',
        dutchMeaning: 'een sieraad gemaakt van ronde, glanzende parels uit oesterschelpen.',
        englishMeaning: 'Pearl necklace'
      },
      {
        word: 'parelmoer',
        dutchMeaning: 'de glanzende, regenboogachtige binnenlaag van schelpen.',
        englishMeaning: 'Mother-of-pearl'
      },
      {
        word: 'veiligheid',
        breakdown: 'veilig + heid',
        dutchMeaning: 'de toestand waarin er geen gevaar of pijn dreigt.',
        englishMeaning: 'Safety'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🌟 Eindoverwinning #4',
      question: 'Welke les leert Ridheya van haar avontuur op het koraalrif?',
      options: [
        'Dat zeedieren nooit hulp nodig hebben',
        'Dat met geduld, zachtheid en medische zorg zelfs de kleinste zeedieren gered kunnen worden',
        'Dat vissen niet in het water kunnen zwemmen',
        'Dat koraal van plastic is gemaakt'
      ],
      correctIndex: 1,
      explanation: 'Met liefdevolle zorg, geduld en een EHBO-kit heeft Ridheya het hele rif beschermd.'
    },
    choices: [
      { label: 'Vier het feest op het strand met vers kokoswater en Kopi de hond', nextPage: 1, skillBonus: '🌟 Grote Koraaldokter Medaille!', icon: '🥥' }
    ]
  }
];

export const RIDHEYA_TREEHOUSE_CLINIC_CAMPAIGN: RpgPage[] = [
  {
    pageNumber: 1,
    title: 'De Geheime Boomhuttendokterij in de Jungle',
    biome: 'Grote Banyanboomhut in Taman Negara',
    storyText: `Hoog in de kruin van een eeuwenoude banyanboom had Ridheya haar eigen **boomhutkliniek** ingericht. Met houten plankjes, zachte mosbedjes en schone glazen potjes vol kruidenbalsem was ze klaar voor elke patiënt.

Onder aan de touwladder hoorde ze een zacht gepiep. Kopi de hond blafte vrolijk. Daar stond een klein **eekhoorntje** met een bezeerd pootje na een val uit een mangoboom.`,
    targetWords: [
      {
        word: 'boomhutkliniek',
        breakdown: 'boomhut + kliniek',
        dutchMeaning: 'een speciaal ingerichte behandelplek in een boom voor gewonde bosdieren.',
        englishMeaning: 'Treehouse clinic'
      },
      {
        word: 'kruidenbalsem',
        breakdown: 'kruiden + balsem',
        dutchMeaning: 'een zachte, geurige zalf gemaakt van planten om schrammen te verzorgen.',
        englishMeaning: 'Herbal balm'
      },
      {
        word: 'mangoboom',
        breakdown: 'mango + boom',
        dutchMeaning: 'een tropische boom waaraan zoete, sappige mangovruchten groeien.',
        englishMeaning: 'Mango tree'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🐿️ Diagnostiek #1',
      question: 'Wat is er aan de hand met het jonge eekhoorntje?',
      options: [
        'Hij heeft honger naar kaas',
        'Hij heeft een bezeerd pootje na een val uit een mangoboom',
        'Hij wil vliegen met een vlieger',
        'Hij is zijn schoenen kwijt'
      ],
      correctIndex: 1,
      explanation: 'Het eekhoorntje heeft zijn pootje bezeerd door een val en zoekt hulp bij dokter Ridheya.'
    },
    choices: [
      { label: 'Leg het eekhoorntje op een zacht mosbedje en breng kruidenbalsem aan', nextPage: 2, skillBonus: '+15 Eerste Hulp', icon: '🌿' },
      { label: 'Vraag Kopi om de omgeving van de boomhut te bewaken', nextPage: 2, skillBonus: '+15 Waakzaamheid', icon: '🐕' }
    ]
  },
  {
    pageNumber: 2,
    title: 'De Vleermuis met de Verstuikte Vleugel',
    biome: 'Schaduwrijk Prieel onder het Bladerdak',
    storyText: `Terwijl het eekhoorntje rustig lag te knabbelen op een stukje banaan, fladderde een kleine **vruchtenvleermuis** onhandig naar binnen. Het diertje heette Pipit en had een scheurtje in zijn dunne **vleugelvlies**.

Ridheya pakte een steriel stukje gaasverband en haar speciale kamillewater. "Heel stil blijven liggen, Pipit," zei ze met zachte stem. Met uiterste precisie bracht ze een ademend pleistertje aan op de vleugeltop.`,
    targetWords: [
      {
        word: 'vruchtenvleermuis',
        breakdown: 'vruchten + vleermuis',
        dutchMeaning: 'een nuttige vliegende zoogdiersoort die leeft van zoete vruchten en bloesem.',
        englishMeaning: 'Fruit bat'
      },
      {
        word: 'vleugelvlies',
        breakdown: 'vleugel + vlies',
        dutchMeaning: 'het dunne, elastische velletje tussen de vingers van een vleermuis waarmee hij vliegt.',
        englishMeaning: 'Wing membrane'
      },
      {
        word: 'steriel',
        dutchMeaning: 'volledig schoon en vrij van bacteriën of vuil.',
        englishMeaning: 'Sterile / germ-free'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🦇 Medische Zorg #2',
      question: 'Waarmee verzorgt Ridheya het scheurtje in het vleugelvlies van Pipit?',
      options: [
        'Met plakband uit een kantoor',
        'Met kamillewater en een steriel ademend pleistertje',
        'Met een stuk krantenpapier',
        'Met koud ijs'
      ],
      correctIndex: 1,
      explanation: 'Ridheya reinigt het wondje met kamillewater en plakt een steriel pleistertje.'
    },
    choices: [
      { label: 'Voer Pipit wat zoet papajasap met een pipetje', nextPage: 3, skillBonus: '+15 Voeding & Herstel', icon: '🫐' },
      { label: 'Maak een slaapnestje van donker vilt in de hoek van de hut', nextPage: 3, skillBonus: '+15 Dierenwelzijn', icon: '🛖' }
    ]
  },
  {
    pageNumber: 3,
    title: 'Het Verloren Nevelpantertje in de Regenbui',
    biome: 'Bamboebos bij de Boomhut tijdens een Tropische Buit',
    storyText: `Buiten begon een warme tropische regenbui zachtjes op de bladeren te tikken. Onder de veranda van de kliniek zagen Ridheya en Kopi een kletsnat **nevelpantertje** bibberen. Het beestje was de weg naar zijn moeder kwijtgeraakt.

Ridheya wikkelde het welpje in een grote warme handdoek en zette een kommetje warme geitenmelk klaar. Met haar **stethoscoop** luisterde ze naar het hartje: regelmatig en krachtig! Het pantertje begon luid te spinnen tegen haar schouder.`,
    targetWords: [
      {
        word: 'nevelpantertje',
        breakdown: 'nevel + panter + tje',
        dutchMeaning: 'een zeldzame kleine roofkat uit het regenwoud met mooie vlekken.',
        englishMeaning: 'Clouded leopard cub'
      },
      {
        word: 'stethoscoop',
        dutchMeaning: 'een medisch luisterinstrument om het kloppen van het hart en de longen te horen.',
        englishMeaning: 'Stethoscope'
      },
      {
        word: 'regelmatig',
        breakdown: 'regel + matig',
        dutchMeaning: 'in een gelijkmatig, rustig en gezond tempo achter elkaar doorgaand.',
        englishMeaning: 'Regular / steady'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🩺 Dierenonderzoek #3',
      question: 'Wat stelt Ridheya vast wanneer ze met haar stethoscoop naar het pantertje luistert?',
      options: [
        'Dat het hartje regelmatig en krachtig klopt',
        'Dat het pantertje kan praten',
        'Dat de stethoscoop kapot is',
        'Dat het pantertje trek heeft in pizza'
      ],
      correctIndex: 1,
      explanation: 'Ridheya hoort dat het hartje van het jonge welpje gezond en regelmatig klopt.'
    },
    choices: [
      { label: 'Blaas op de bamboefluit om de moederspoorlijn te volgen', nextPage: 4, skillBonus: '+20 Gezinshereniging', icon: '🪈' },
      { label: 'Droog het vachtje voorzichtig met de zachte handdoek', nextPage: 4, skillBonus: '+20 Verzorging', icon: '🐆' }
    ]
  },
  {
    pageNumber: 4,
    title: 'De Grote Jungle Hereniging & Dokterdiploma',
    biome: 'Verlichte Open Plek onder de Regenboog',
    storyText: `De regen hield op en een gouden zonnestraal brak door het bladerdak. Tussen het bamboe verscheen de moederpanter, die haar jong met een diep geruststellend gebrul begroette. Het eekhoorntje en vleermuisje Pipit zwaaiden vrolijk vanuit de boomhut.

Amir de fietskoerier arriveerde met een houten bordje: *'Officiële Hoofdkliniek Dokter Ridheya'*. Alle bosdieren bogen dankbaar. Ridheya voelde zich de gelukkigste dierenarts van heel Maleisië!`,
    targetWords: [
      {
        word: 'geruststellend',
        breakdown: 'gerust + stellend',
        dutchMeaning: 'zodanig dat de angst of zorgen helemaal verdwijnen.',
        englishMeaning: 'Reassuring'
      },
      {
        word: 'bladerdak',
        breakdown: 'blader + dak',
        dutchMeaning: 'de dichte laag van takken en bladeren hoog in de toppen van de bomen.',
        englishMeaning: 'Canopy / foliage roof'
      },
      {
        word: 'hereniging',
        breakdown: 'her + eniging',
        dutchMeaning: 'het moment waarop mensen of dieren na een scheiding weer fijn bij elkaar komen.',
        englishMeaning: 'Reunion'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🏆 Grote Uitkomst #4',
      question: 'Waarom is dit een gedenkwaardige dag voor Ridheya?',
      options: [
        'Omdat ze haar schoenen heeft verloren',
        'Omdat alle patiëntjes genezen zijn, het pantertje herenigd is met zijn moeder en haar kliniek officieel erkend is',
        'Omdat het de hele dag geregend heeft',
        'Omdat ze geen bomen meer hoeft te zien'
      ],
      correctIndex: 1,
      explanation: 'Alle diertjes zijn geholpen, het pantertje is veilig bij zijn moeder en Ridheya ontvangt haar officiële kliniekbord.'
    },
    choices: [
      { label: 'Hang het houten bordje aan de voordeur van de boomhut', nextPage: 1, skillBonus: '🎓 Officiële Jungle Dierenarts Diploma!', icon: '🌟' }
    ]
  }
];
