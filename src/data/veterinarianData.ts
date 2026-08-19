import { VetPatientCase } from '../types';

export const VET_PATIENT_CASES: VetPatientCase[] = [
  {
    id: 'vet-1',
    patientName: 'Pip het Poolvosje',
    species: 'Poolvos',
    animalEmoji: '🦊',
    age: '1 jaar (Speels welpje)',
    biome: 'snow',
    symptoms: ['Koud pootje', 'Hinkt op het ijs', 'Zacht piepgeluidje'],
    temperature: '38.2°C (Normaal)',
    caseReport: 'Pip rende vrolijk over een bevroren sneeuwberg, maar gleed uit over een gladde ijspegel. Nu doet haar linker achterpootje een beetje zeer. Ze heeft een zacht warm verbandje en veel liefde nodig!',
    targetProblem: 'Verstuikt pootje door uitglijden',
    treatmentTool: {
      id: 'tool-bandage',
      name: 'Zacht Verband',
      icon: '🩹',
      description: 'Wikkel het pootje voorzichtig in om de spieren rust te geven.'
    },
    toolOptions: [
      {
        id: 'tool-bandage',
        name: 'Zacht Verband',
        icon: '🩹',
        description: 'Wikkel het pootje voorzichtig in om de spieren rust te geven.'
      },
      {
        id: 'tool-thermometer',
        name: 'Thermometer',
        icon: '🌡️',
        description: 'Meet de lichaamstemperatuur van het diertje.'
      },
      {
        id: 'tool-eyedrops',
        name: 'Oogdruppels',
        icon: '💧',
        description: 'Verzacht prikkende en vermoeide oogjes.'
      }
    ],
    spellingWord: {
      word: 'POOTJE',
      hint: 'Verkleinwoord van poot met lange oo-klank.',
      scrambledLetters: ['P', 'O', 'O', 'T', 'J', 'E']
    },
    cureCheerMessage: 'Hoera! Pip springt weer vrolijk door de sneeuw en geeft dokter Ridheya een vrolijke poot!',
    rewardStars: 30,
    rewardCoins: 25,
    badgeRewardId: 'vet-snow-hero'
  },
  {
    id: 'vet-2',
    patientName: 'Leo het Leeuwenwelpje',
    species: 'Leeuw',
    animalEmoji: '🦁',
    age: '8 maanden',
    biome: 'safari',
    symptoms: ['Scherpe doorn in voorpoot', 'Knorrende buik', 'Wil niet brullen'],
    temperature: '38.6°C',
    caseReport: 'Kleine Leo kroop door een acaciastruik om een vlinder te vangen. Ai! Er zit een klein prikkelend dorntje vast tussen zijn kussentjes. Dokter Ridheya kan het doorn met een zacht pincetje verwijderen!',
    targetProblem: 'Scherpe doorn in de pootkussentjes',
    treatmentTool: {
      id: 'tool-tweezers',
      name: 'Zacht Pincet',
      icon: '✂️',
      description: 'Haal het prikkende takje er heel voorzichtig uit.'
    },
    toolOptions: [
      {
        id: 'tool-tweezers',
        name: 'Zacht Pincet',
        icon: '✂️',
        description: 'Haal het prikkende takje er heel voorzichtig uit.'
      },
      {
        id: 'tool-icepack',
        name: 'IJskompres',
        icon: '🧊',
        description: 'Koelt een bultje op het hoofd af.'
      },
      {
        id: 'tool-syrup',
        name: 'Honingdrankje',
        icon: '🍯',
        description: 'Verzacht een zere keel.'
      }
    ],
    spellingWord: {
      word: 'GENEZEN',
      hint: 'Het werkwoord voor weer helemaal beter en gezond worden.',
      scrambledLetters: ['G', 'E', 'N', 'E', 'Z', 'E', 'N']
    },
    cureCheerMessage: 'Koning Leo brult een vrolijke "Dankjewel!" over de hele savanne!',
    rewardStars: 35,
    rewardCoins: 30,
    badgeRewardId: 'vet-safari-master'
  },
  {
    id: 'vet-3',
    patientName: 'Koko het Koalabeertje',
    species: 'Koala',
    animalEmoji: '🐨',
    age: '2 jaar',
    biome: 'outback',
    symptoms: ['Prikkende oogjes door zandstorm', 'Slaperig', 'Wrijft met pootjes'],
    temperature: '37.8°C',
    caseReport: 'In de Australische outback waaide een warme woestijnwind met fijn rood zand. Koko heeft een paar zandkorreltjes in haar oogjes gekregen. Een paar zachte, verzorgende waterdruppels maken haar oogjes weer schoon!',
    targetProblem: 'Stof en zand in de oogjes',
    treatmentTool: {
      id: 'tool-eyedrops',
      name: 'Kruidige Oogdruppels',
      icon: '💧',
      description: 'Spoel het zand voorzichtig weg met zacht water.'
    },
    toolOptions: [
      {
        id: 'tool-stethoscope',
        name: 'Stethoscoop',
        icon: '🩺',
        description: 'Luister naar het kloppende hartje en de longen.'
      },
      {
        id: 'tool-eyedrops',
        name: 'Kruidige Oogdruppels',
        icon: '💧',
        description: 'Spoel het zand voorzichtig weg met zacht water.'
      },
      {
        id: 'tool-bandage',
        name: 'Zacht Verband',
        icon: '🩹',
        description: 'Voor verstuikte pootjes en knieën.'
      }
    ],
    spellingWord: {
      word: 'BETER',
      hint: 'Niet meer ziek zijn, maar weer helemaal fris en...',
      scrambledLetters: ['B', 'E', 'T', 'E', 'R']
    },
    cureCheerMessage: 'Koko knippert met haar glanzende oogjes en eet meteen een lekker eucalyptusblad!',
    rewardStars: 30,
    rewardCoins: 25
  },
  {
    id: 'vet-4',
    patientName: 'Plons de Pinguïn',
    species: 'Pinguïn',
    animalEmoji: '🐧',
    age: '6 maanden',
    biome: 'snow',
    symptoms: ['Zere snavel door schelp', 'Koude vleugeltjes', 'Wil visjes eten'],
    temperature: '38.0°C',
    caseReport: 'Plons dook in het ijskoude water naar een zilvervisje, maar stootte per ongeluk tegen een harde zeeschelp. Haar snaveltje heeft een beschermend verzachtend zalfje nodig!',
    targetProblem: 'Snaveltje gestoten tegen schelp',
    treatmentTool: {
      id: 'tool-ointment',
      name: 'Verzachtende Wonderzalf',
      icon: '🧴',
      description: 'Smeer een dun laagje zalf op de schram.'
    },
    toolOptions: [
      {
        id: 'tool-ointment',
        name: 'Verzachtende Wonderzalf',
        icon: '🧴',
        description: 'Smeer een dun laagje zalf op de schram.'
      },
      {
        id: 'tool-tweezers',
        name: 'Zacht Pincet',
        icon: '✂️',
        description: 'Voor het weghalen van takjes.'
      },
      {
        id: 'tool-thermometer',
        name: 'Thermometer',
        icon: '🌡️',
        description: 'Meet lichaamstemperatuur.'
      }
    ],
    spellingWord: {
      word: 'ZALF',
      hint: 'Crème die je zachtjes op een zere plek smeert.',
      scrambledLetters: ['Z', 'A', 'L', 'F']
    },
    cureCheerMessage: 'Plons maakt een vrolijke buikschuiver over het ijs en zwaait met haar vleugels!',
    rewardStars: 30,
    rewardCoins: 25
  },
  {
    id: 'vet-5',
    patientName: 'Bella het Kalfje',
    species: 'Koe / Kalfje',
    animalEmoji: '🐮',
    age: '3 maanden',
    biome: 'farm',
    symptoms: ['Knorrende buik', 'Te veel klavertjes gegeten', 'Wil lekker slapen'],
    temperature: '38.4°C',
    caseReport: 'Kleine Bella vond het klaverveldje zo lekker dat ze haar buikje véél te vol heeft gegeten. Dokter Ridheya luistert met de stethoscoop naar het rommelende buikje en geeft een kopje kalmerende kamillethee!',
    targetProblem: 'Bolle buikpijn door te veel klaver',
    treatmentTool: {
      id: 'tool-stethoscope',
      name: 'Dierenarts Stethoscoop',
      icon: '🩺',
      description: 'Luister naar de rustige ademhaling en het buikje.'
    },
    toolOptions: [
      {
        id: 'tool-stethoscope',
        name: 'Dierenarts Stethoscoop',
        icon: '🩺',
        description: 'Luister naar de rustige ademhaling en het buikje.'
      },
      {
        id: 'tool-icepack',
        name: 'IJskompres',
        icon: '🧊',
        description: 'Voor bultjes.'
      },
      {
        id: 'tool-eyedrops',
        name: 'Oogdruppels',
        icon: '💧',
        description: 'Voor zand in de ogen.'
      }
    ],
    spellingWord: {
      word: 'BUIKJE',
      hint: 'Verkleinwoord van buik met de klank / ui /.',
      scrambledLetters: ['B', 'U', 'I', 'K', 'J', 'E']
    },
    cureCheerMessage: 'Bella loeit zachtjes van geluk en drinkt een grote emmer verse melk!',
    rewardStars: 35,
    rewardCoins: 30
  },
  {
    id: 'vet-6',
    patientName: 'Kiki de Regenwoud Luiaard',
    species: 'Luiaard',
    animalEmoji: '🦥',
    age: '4 jaar',
    biome: 'jungle',
    symptoms: ['Moeie armspieren', 'Heeft lang aan een tak gehangen', 'Lichte kramp'],
    temperature: '36.5°C (Normaal voor luiaard)',
    caseReport: 'Kiki heeft 14 uur achter elkaar ondersteboven aan de hoogste tak van de jungle gehangen om de zonsondergang te bekijken. Nu zijn haar armspieren stijf. Een warme kruidenmassage maakt haar weer soepel!',
    targetProblem: 'Stijve spieren door lang hangen',
    treatmentTool: {
      id: 'tool-herbal-heat',
      name: 'Warme Kruidenolie',
      icon: '🌿',
      description: 'Verwarmt en verzacht vermoeide spiertjes.'
    },
    toolOptions: [
      {
        id: 'tool-herbal-heat',
        name: 'Warme Kruidenolie',
        icon: '🌿',
        description: 'Verwarmt en verzacht vermoeide spiertjes.'
      },
      {
        id: 'tool-tweezers',
        name: 'Pincet',
        icon: '✂️',
        description: 'Voor doornen.'
      },
      {
        id: 'tool-bandage',
        name: 'Verband',
        icon: '🩹',
        description: 'Voor wondjes.'
      }
    ],
    spellingWord: {
      word: 'WARMTE',
      hint: 'Het tegenovergestelde van koude, geschreven met -te.',
      scrambledLetters: ['W', 'A', 'R', 'M', 'T', 'E']
    },
    cureCheerMessage: 'Kiki knijpt haar oogjes tevreden dicht en geeft een super langzame glimlach!',
    rewardStars: 30,
    rewardCoins: 25
  },
  {
    id: 'vet-7',
    patientName: 'Kora het Zeepaardje',
    species: 'Zeepaardje',
    animalEmoji: '🐡',
    age: '1 jaar',
    biome: 'sea',
    symptoms: ['Verstrikte staart in zeewier', 'Kan niet rechtop drijven'],
    temperature: '24.0°C (Oceaanwater)',
    caseReport: 'Tijdens een speelse stroming raakte het krulstaartje van Kora verstrikt in een zacht stukje zeegras. Met een veilige stompe schaar knipt dokter Ridheya het zeegras los, zodat Kora weer sierlijk kan dansen!',
    targetProblem: 'Krulstaartje verstrikt in zeegras',
    treatmentTool: {
      id: 'tool-safety-scissors',
      name: 'Veilige Dierenartsschaar',
      icon: '✂️',
      description: 'Knipt verstrikt gras voorzichtig los zonder het dier te raken.'
    },
    toolOptions: [
      {
        id: 'tool-safety-scissors',
        name: 'Veilige Dierenartsschaar',
        icon: '✂️',
        description: 'Knipt verstrikt gras voorzichtig los zonder het dier te raken.'
      },
      {
        id: 'tool-ointment',
        name: 'Wonderzalf',
        icon: '🧴',
        description: 'Voor schrammetjes.'
      },
      {
        id: 'tool-thermometer',
        name: 'Thermometer',
        icon: '🌡️',
        description: 'Meet temperatuur.'
      }
    ],
    spellingWord: {
      word: 'ZWEMMEN',
      hint: 'Korte / e / met dubbele medeklinker -mm-.',
      scrambledLetters: ['Z', 'W', 'E', 'M', 'M', 'E', 'N']
    },
    cureCheerMessage: 'Kora krult haar gouden staartje om de vinger van dokter Ridheya als dank!',
    rewardStars: 35,
    rewardCoins: 30
  },
  {
    id: 'vet-8',
    patientName: 'Maya het Berggeitje',
    species: 'Berggeit',
    animalEmoji: '🐐',
    age: '9 maanden',
    biome: 'mountain',
    symptoms: ['Schrammetje op knie door bergsteen', 'Kleine schrik', 'Dappere oogjes'],
    temperature: '38.5°C',
    caseReport: 'Maya sprong behendig van rots naar rots op de berghelling, maar schampte een scherpe steen. Een vrolijke gekleurde dierenpleister beschermt haar knietje tegen vuil en stof!',
    targetProblem: 'Kleine schram op de knie',
    treatmentTool: {
      id: 'tool-plaster',
      name: 'Vrolijke Dierenpleister',
      icon: '🩹',
      description: 'Plak een vrolijke beschermende pleister op de schram.'
    },
    toolOptions: [
      {
        id: 'tool-plaster',
        name: 'Vrolijke Dierenpleister',
        icon: '🩹',
        description: 'Plak een vrolijke beschermende pleister op de schram.'
      },
      {
        id: 'tool-stethoscope',
        name: 'Stethoscoop',
        icon: '🩺',
        description: 'Luister naar het hartje.'
      },
      {
        id: 'tool-eyedrops',
        name: 'Oogdruppels',
        icon: '💧',
        description: 'Voor oogjes.'
      }
    ],
    spellingWord: {
      word: 'PLEISTER',
      hint: 'Plakstrip met de korte / ei / van trein.',
      scrambledLetters: ['P', 'L', 'E', 'I', 'S', 'T', 'E', 'R']
    },
    cureCheerMessage: 'Maya huppelt met haar dierenpleister direct naar de hoogste bergtop!',
    rewardStars: 35,
    rewardCoins: 30
  }
];
