import { Level } from '../types';
import { findAnimal } from './biomeLevels68_part1';

// ==========================================
// 3. OCEAAN (OCEAN) - GROEP 6-7-8 NEW
// ==========================================
export const OCEAN_LEVELS_68: Level[] = [
  {
    id: 1,
    name: 'Willy’s Sonardiepte',
    biome: 'sea',
    theme: 'Werkwoordspelling (Voltooid Deelwoord als Bijvoeglijk Naamwoord)',
    themeColor: '#0288D1',
    bannerEmoji: '🐋',
    chapterTitle: 'Hoofdstuk 1: Echo’s in de Afgrond',
    introStory: 'Willy de blauwe vinvis zingt in de peilloze diepte. "Weet jij hoe je een voltooid deelwoord spelt als het vóór een zelfstandig naamwoord staat als bijvoeglijk naamwoord?"',
    animalReward: findAnimal('willy-walvis'),
    questions: [
      {
        id: 'ocean68-new-1-1',
        category: 'Verbuiging Voltooid Deelwoord',
        categoryIcon: '🐋',
        question: 'Kies de juiste spelling: "De ___ walvis zingt een prachtig lied."',
        type: 'choice',
        options: ['gestrande', 'gestrandde', 'gestrante'],
        correctOptionIndex: 0,
        hint: 'Een verbogen voltooid deelwoord krijgt zo kort mogelijke spelling met enkel -e: gestrande.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'ocean68-new-1-2',
        category: 'Sterke Werkwoorden (VT)',
        categoryIcon: '🌊',
        question: 'Wat is de verleden tijd van "duiken"? (Gisteren ... de walvis naar 500 meter diepte)',
        type: 'choice',
        options: ['dook', 'duikte', 'gedoken'],
        correctOptionIndex: 0,
        hint: 'Duiken - dook - gedoken.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'ocean68-new-1-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor geluidsnavigatie onder water:',
        type: 'spell',
        targetWord: 'ECHOLOCATIE',
        scrambledLetters: ['E', 'C', 'H', 'O', 'L', 'O', 'C', 'A', 'T', 'I', 'E'],
        hint: 'E - CH - O - L - O - C - A - T - IE (11 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'ocean68-new-1-4',
        category: 'Begrijpend Lezen',
        categoryIcon: '📖',
        question: 'Hoe slaan walvissen zuurstof op voor extreem lange duiken?',
        passage: 'Walvissen hebben enorme hoeveelheden myoglobine in hun spierweefsel. Dit speciale eiwit bindt zuurstof veel efficiënter dan menselijk bloed, waardoor walvissen wel twee uur lang onder water kunnen blijven zonder adem te halen.',
        type: 'choice',
        options: ['Dankzij een hoog gehalte myoglobine in hun spierweefsel dat zuurstof bindt', 'Ze hebben verborgen kieuwen achter hun vinnen', 'Ze drinken zeewater voor zuurstof'],
        correctOptionIndex: 0,
        hint: 'Lees over het speciale eiwit myoglobine in het spierweefsel.',
        gradeBadge: 'Begrijpend Lezen'
      }
    ]
  },
  {
    id: 2,
    name: 'Dolly’s Intellectrif',
    biome: 'sea',
    theme: 'Woordsoorten (Koppelwerkwoorden & Hulpwerkwoorden)',
    themeColor: '#00ACC1',
    bannerEmoji: '🐬',
    chapterTitle: 'Hoofdstuk 2: Intelligente Communicatie',
    introStory: 'Dolly de dolfijn fluit met een unieke klikfrequentie. "Herken jij koppelwerkwoorden zoals zijn, worden, blijven, blijken, lijken, schijnen, heten, dunken, voorkomen?"',
    animalReward: findAnimal('dolly-dolfijn'),
    questions: [
      {
        id: 'ocean68-new-2-1',
        category: 'Koppelwerkwoorden (ZWABBELS)',
        categoryIcon: '🐬',
        question: 'Welk werkwoord fungeert als koppelwerkwoord in: "Dolfijnen lijken buitengewoon leergierig."',
        type: 'choice',
        options: ['lijken', 'dolfijnen', 'leergierig'],
        correctOptionIndex: 0,
        hint: 'Lijken is een koppelwerkwoord dat het onderwerp koppelt aan het bijvoeglijk naamwoord leergierig!',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'ocean68-new-2-2',
        category: 'Werkwoordspelling (d/t)',
        categoryIcon: '🌊',
        question: 'Vul in: "De trainer ___ het jonge dier met complimenten."',
        type: 'choice',
        options: ['beloont', 'beloond', 'beloon'],
        correctOptionIndex: 0,
        hint: 'Onderwerp is "de trainer" (hij-vorm). Stam beloon + t = beloont.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'ocean68-new-2-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het synoniem voor scherpzinnig en pienter:',
        type: 'spell',
        targetWord: 'INTELLIGENT',
        scrambledLetters: ['I', 'N', 'T', 'E', 'L', 'L', 'I', 'G', 'E', 'N', 'T'],
        hint: 'I - N - T - E - LL - I - G - E - N - T (11 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'ocean68-new-2-4',
        category: 'Woordenschat & Uitdrukkingen',
        categoryIcon: '💡',
        question: 'Wat betekent de uitdrukking: "Roeien met de riemen die men heeft"?',
        type: 'choice',
        options: ['Het moeten doen met de middelen die op dat moment beschikbaar zijn', 'Een snelle boottocht maken', 'Zwemmen in diep water'],
        correctOptionIndex: 0,
        hint: 'Je redt jezelf met wat je toevallig bij de hand hebt.',
        gradeBadge: 'Spreekwoorden'
      }
    ]
  },
  {
    id: 3,
    name: 'Sammy’s Eeuwenoude Koers',
    biome: 'sea',
    theme: 'Signaalwoorden & Oorzaak/Gevolg Relaties',
    themeColor: '#26A69A',
    bannerEmoji: '🐢',
    chapterTitle: 'Hoofdstuk 3: Navigeren op het Aardmagnetisch Veld',
    introStory: 'Sammy de zeeschildpad steekt duizenden zeemijlen over. "Kijk goed naar signaalwoorden die een oorzaak en gevolg aangeven!"',
    animalReward: findAnimal('sammy-schildpad'),
    questions: [
      {
        id: 'ocean68-new-3-1',
        category: 'Signaalwoorden (Oorzaak & Gevolg)',
        categoryIcon: '🐢',
        question: 'Welk signaalwoord duidt op een GEVOLG in een zin?',
        type: 'choice',
        options: ['daardoor', 'omdat', 'aangezien'],
        correctOptionIndex: 0,
        hint: '"Daardoor" leidt het gevolg in. "Omdat" en "aangezien" noemen de oorzaak/reden.',
        gradeBadge: 'Begrijpend Lezen'
      },
      {
        id: 'ocean68-new-3-2',
        category: 'Werkwoordspelling (VT)',
        categoryIcon: '🧭',
        question: 'Wat is de verleden tijd van "verlaten"? (Het schildpadje ... gisteren het strand)',
        type: 'choice',
        options: ['verliet', 'verlaatte', 'verloet'],
        correctOptionIndex: 0,
        hint: 'Verlaten is een sterk werkwoord: verlaten - verliet - verlaten.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'ocean68-new-3-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor het bepalen van de juiste koers:',
        type: 'spell',
        targetWord: 'NAVIGATIE',
        scrambledLetters: ['N', 'A', 'V', 'I', 'G', 'A', 'T', 'I', 'E'],
        hint: 'N - A - V - I - G - A - T - IE (9 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'ocean68-new-3-4',
        category: 'Begrijpend Lezen',
        categoryIcon: '📖',
        question: 'Hoe vinden jonge zeeschildpadden na decennia hun geboortestrand weer terug?',
        passage: 'Pasgeboren schildpadden prenten het unieke magnetische signatuur van hun geboortestrand in hun hersenen in. Jaren later gebruiken ze dit ingebouwde magnetische kompas om exact naar datzelfde strand terug te keren om eieren te leggen.',
        type: 'choice',
        options: ['Ze onthouden het unieke magnetische veld van hun geboortestrand', 'Ze volgen de sterrenhemel', 'Ze ruiken de kokospalmen'],
        correctOptionIndex: 0,
        hint: 'Lees over het ingeprente magnetische signatuur.',
        gradeBadge: 'Begrijpend Lezen'
      }
    ]
  },
  {
    id: 4,
    name: 'Octo’s Neuro-Doolhof',
    biome: 'sea',
    theme: 'Griekse & Latijnse Leenwoorden & Meervoudsvormen',
    themeColor: '#AB47BC',
    bannerEmoji: '🐙',
    chapterTitle: 'Hoofdstuk 4: Drie Harten en Negen Breinen',
    introStory: 'Octo de octopus demonstreert zijn camouflage. "In de bovenbouw leren we leenwoorden uit het Grieks en Latijn correct te spellen!"',
    animalReward: findAnimal('octo-octopus'),
    questions: [
      {
        id: 'ocean68-new-4-1',
        category: 'Meervoud Leenwoorden',
        categoryIcon: '🐙',
        question: 'Wat is het correcte Nederlandse meervoud van "tentakel"?',
        type: 'choice',
        options: ['tentakels', 'tentakelen', 'tentakels’s'],
        correctOptionIndex: 0,
        hint: 'Eindigt op -el: meervoud krijgt een -s: tentakels.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'ocean68-new-4-2',
        category: 'Werkwoordspelling (d/t)',
        categoryIcon: '🧬',
        question: 'Vul in: "De huidstructuur ___ zich binnen een seconde aan de rots aan."',
        type: 'choice',
        options: ['past', 'pasd', 'pastt'],
        correctOptionIndex: 0,
        hint: 'Aanpassen: stam pas + t = past.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'ocean68-new-4-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor de verfkorrels in de huid van de octopus:',
        type: 'spell',
        targetWord: 'PIGMENT',
        scrambledLetters: ['P', 'I', 'G', 'M', 'E', 'N', 'T'],
        hint: 'P - I - G - M - E - N - T (7 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'ocean68-new-4-4',
        category: 'Zinsleer',
        categoryIcon: '🔍',
        question: 'Wat is het lijdend voorwerp (LV) in: "De octopus spuit een donkere inktwolk ter verdediging."',
        type: 'choice',
        options: ['een donkere inktwolk', 'de octopus', 'spuit'],
        correctOptionIndex: 0,
        hint: 'Vraag: WAT spuit de octopus? -> een donkere inktwolk.',
        gradeBadge: 'Grammatica'
      }
    ]
  },
  {
    id: 5,
    name: 'Kora’s Koraalbehoud',
    biome: 'sea',
    theme: 'Taalkundige Argumentatie & Betogende Teksten',
    themeColor: '#29B6F6',
    bannerEmoji: '🐡',
    chapterTitle: 'Hoofdstuk 5: Bescherming van Kwetsbare ecosystemen',
    introStory: 'Kora het zeepaardje waakt over het rif. "Laat zien dat jij feiten van meningen kunt onderscheiden!"',
    animalReward: findAnimal('kora-zeepaardje'),
    questions: [
      {
        id: 'ocean68-new-5-1',
        category: 'Feit of Mening',
        categoryIcon: '🐡',
        question: 'Welke van de volgende uitspraken is een FEIT (controleerbaar waar)?',
        type: 'choice',
        options: ['Koraalriffen herbergen meer dan 25% van al het zeeleven.', 'Het zeepaardje is het mooiste dier in de oceaan.', 'Duiken bij koraalriffen is de leukste hobby.'],
        correctOptionIndex: 0,
        hint: 'Het percentage van 25% is wetenschappelijk gemeten en controleerbaar!',
        gradeBadge: 'Begrijpend Lezen'
      },
      {
        id: 'ocean68-new-5-2',
        category: 'Werkwoordspelling (Sterke Werkwoorden)',
        categoryIcon: '🌿',
        question: 'Wat is het voltooid deelwoord van "hechten"? (Het zeepaardje heeft zich aan het wier ...)',
        type: 'choice',
        options: ['gehecht', 'gehechtte', 'gehechd'],
        correctOptionIndex: 0,
        hint: 'Hechten - hechtte - gehecht (t-kofschip).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'ocean68-new-5-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor het geheel van levende wezens in een gebied:',
        type: 'spell',
        targetWord: 'ECOSYSTEEM',
        scrambledLetters: ['E', 'C', 'O', 'S', 'Y', 'S', 'T', 'E', 'E', 'M'],
        hint: 'E - C - O - S - Y - S - T - EE - M (10 letters, met een Griekse y).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'ocean68-new-5-4',
        category: 'Zinsleer',
        categoryIcon: '🔍',
        question: 'Wat is de persoonsvorm (PV) in: "Tijdens de storm zochten de zeepaardjes beschutting tussen het dichte zeegras."',
        type: 'choice',
        options: ['zochten', 'zeepaardjes', 'beschutting'],
        correctOptionIndex: 0,
        hint: 'Vragend maken: "Zochten de zeepaardjes beschutting...?" -> zochten staat vooraan!',
        gradeBadge: 'Grammatica'
      }
    ]
  },
  {
    id: 6,
    name: 'Oscar’s Apex Academie',
    biome: 'sea',
    theme: 'Eindtoets Oceaan (Moeilijke Cito Vraagstukken)',
    themeColor: '#1A237E',
    bannerEmoji: '🦈',
    chapterTitle: 'Hoofdstuk 6: De Heerser van de Voedselketen',
    introStory: 'Oscar de orka cirkelt krachtig door het water. "Gefeliciteerd met het bereiken van de oceaanfinale! Laat jouw ultieme taalvaardigheid zien!"',
    animalReward: findAnimal('oscar-orka'),
    questions: [
      {
        id: 'ocean68-new-6-1',
        category: 'Cito Tekststructuur',
        categoryIcon: '🦈',
        question: 'Waarom gebruiken auteurs tussenkopjes (alineatitels) in een lange tekst?',
        type: 'choice',
        options: ['Om de tekst overzichtelijk in te delen en de lezer te vertellen waar het tekstgedeelte over gaat', 'Om de bladzijde sneller vol te krijgen', 'Omdat het verplicht is bij wet'],
        correctOptionIndex: 0,
        hint: 'Tussenkopjes geven structuur en kondigen het onderwerp van de volgende alinea aan.',
        gradeBadge: 'Begrijpend Lezen'
      },
      {
        id: 'ocean68-new-6-2',
        category: 'Werkwoordspelling (d/t/dt)',
        categoryIcon: '🌊',
        question: 'Vul in: "De orka ___ samen met zijn familie op haringen."',
        type: 'choice',
        options: ['jaagt', 'jaagd', 'jaagdt'],
        correctOptionIndex: 0,
        hint: 'Jagen: stam jaag + t = jaagt.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'ocean68-new-6-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor de top van de voedselpiramide:',
        type: 'spell',
        targetWord: 'APEXPREDATOR',
        scrambledLetters: ['A', 'P', 'E', 'X', 'P', 'R', 'E', 'D', 'A', 'T', 'O', 'R'],
        hint: 'A - P - E - X - P - R - E - D - A - T - O - R (12 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'ocean68-new-6-4',
        category: 'Zinsleer',
        categoryIcon: '🔍',
        question: 'Wat is het onderwerp in: "Volgens mariene biologen hebben orka’s zelfs verschillende dialecten per familie."',
        type: 'choice',
        options: ['orka’s (wie hebben dialecten?)', 'mariene biologen', 'verschillende dialecten'],
        correctOptionIndex: 0,
        hint: 'Vraag: WIE hebben dialecten? -> orka’s.',
        gradeBadge: 'Grammatica'
      }
    ]
  }
];

// ==========================================
// 4. REGENWOUD (RAINFOREST) - GROEP 6-7-8 NEW
// ==========================================
export const RAINFOREST_LEVELS_68: Level[] = [
  {
    id: 1,
    name: 'Toko’s Kruinenkoepel',
    biome: 'jungle',
    theme: 'Werkwoordspelling (Sterke Werkwoorden & Vervoeging)',
    themeColor: '#2E7D32',
    bannerEmoji: '🦜',
    chapterTitle: 'Hoofdstuk 1: Hoog Boven het Bladerdak',
    introStory: 'Toko de toekan poetst zijn feloranje snavel. "In het regenwoud wemelt het van de werkwoorden met klankverandering! Doe je mee?"',
    animalReward: findAnimal('toko-toekan'),
    questions: [
      {
        id: 'rain68-new-1-1',
        category: 'Sterke Werkwoorden (VT)',
        categoryIcon: '🦜',
        question: 'Wat is de verleden tijd van "vliegen"? (Gisteren ... de toekan)',
        type: 'choice',
        options: ['vloog', 'vliegde', 'gevlogen'],
        correctOptionIndex: 0,
        hint: 'Vliegen - vloog - gevlogen.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'rain68-new-1-2',
        category: 'Werkwoordspelling (d/t)',
        categoryIcon: '🍌',
        question: 'Vul in: "De vogel ___ zijn nest in een holle boomholte."',
        type: 'choice',
        options: ['bouwt', 'bouwd', 'bouwdt'],
        correctOptionIndex: 0,
        hint: 'Bouwen: stam bouw + t = bouwt.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'rain68-new-1-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het meervoud van "woud":',
        type: 'spell',
        targetWord: 'WOUDEN',
        scrambledLetters: ['W', 'O', 'U', 'D', 'E', 'N'],
        hint: 'W - OU - D - E - N (met de ou van hout).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'rain68-new-1-4',
        category: 'Begrijpend Lezen',
        categoryIcon: '📖',
        question: 'Waarom zijn toekans essentieel voor de herbebossing van het regenwoud?',
        passage: 'Toekans eten grote vruchten en vliegen kilometers ver door het oerwoud. De grote zaden kunnen hun maag onbeschadigd passeren en worden met hun uitwerpselen verspreid. Zo planten toekans ongemerkt duizenden nieuwe bomen aan!',
        type: 'choice',
        options: ['Ze poepen onverteerde zaden kilometers verderop uit en planten zo nieuwe bomen', 'Ze graven met hun snavel gaten in de grond', 'Ze vechten tegen houtkappers'],
        correctOptionIndex: 0,
        hint: 'Lees over het verspreiden van de onbeschadigde zaden.',
        gradeBadge: 'Begrijpend Lezen'
      }
    ]
  },
  {
    id: 2,
    name: 'Chico’s Acrobatenbos',
    biome: 'jungle',
    theme: 'Woordsoorten (Betrekkelijk Voornaamwoord & Voegwoorden)',
    themeColor: '#388E3C',
    bannerEmoji: '🐒',
    chapterTitle: 'Hoofdstuk 2: Schommelen door Bijzinnen',
    introStory: 'Chico de slingeraap zwaait aan een liaan. "Herken jij betrekkelijke voornaamwoorden zoals \'die\' en \'dat\'?"',
    animalReward: findAnimal('chico-slingeraap'),
    questions: [
      {
        id: 'rain68-new-2-1',
        category: 'Betrekkelijk Voornaamwoord',
        categoryIcon: '🐒',
        question: 'Kies het juiste betrekkelijk voornaamwoord: "De liaan ___ Chico vastgrijpt is heel stevig."',
        type: 'choice',
        options: ['die', 'dat', 'wat'],
        correctOptionIndex: 0,
        hint: 'Liaan is een de-woord ("de liaan"), dus verwijzen we met "die"!',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'rain68-new-2-2',
        category: 'Werkwoordspelling (d/t)',
        categoryIcon: '🌿',
        question: 'Vul in: "Chico ___ razendsnel van tak naar tak."',
        type: 'choice',
        options: ['springt', 'springd', 'springdt'],
        correctOptionIndex: 0,
        hint: 'Springen: stam spring + t = springt.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'rain68-new-2-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het synoniem voor behendig en lenig:',
        type: 'spell',
        targetWord: 'ACROBATISCH',
        scrambledLetters: ['A', 'C', 'R', 'O', 'B', 'A', 'T', 'I', 'S', 'C', 'H'],
        hint: 'A - C - R - O - B - A - T - I - SCH (11 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'rain68-new-2-4',
        category: 'Zinsleer',
        categoryIcon: '🔍',
        question: 'Wat is de persoonsvorm (PV) in: "Aan het einde van de middag rusten de apen uit in de hoogste boomtop."',
        type: 'choice',
        options: ['rusten', 'de apen', 'uit'],
        correctOptionIndex: 0,
        hint: 'Vragend maken: "Rusten de apen uit aan het einde...?" -> rusten staat vooraan!',
        gradeBadge: 'Grammatica'
      }
    ]
  },
  {
    id: 3,
    name: 'Bongo’s Wijsheidstroep',
    biome: 'jungle',
    theme: 'Taalkundig Ontleden & Bijwoordelijke Bepalingen',
    themeColor: '#1B5E20',
    bannerEmoji: '🦍',
    chapterTitle: 'Hoofdstuk 3: De Beschermer van het Nevelwoud',
    introStory: 'Bongo de zilverrug trommelt kalm op zijn borst. "Onderzoek de zin met aandacht en vind alle bepalingen!"',
    animalReward: findAnimal('bongo-gorilla'),
    questions: [
      {
        id: 'rain68-new-3-1',
        category: 'Zinsleer (Bepaling van Plaats)',
        categoryIcon: '🦍',
        question: 'Wat is de bepaling van plaats in: "De zilverrug bewaakt de familie in het dichte nevelwoud."',
        type: 'choice',
        options: ['in het dichte nevelwoud (WAAR bewaakt hij?)', 'de zilverrug', 'de familie'],
        correctOptionIndex: 0,
        hint: 'Vraag: WAAR bewaakt hij de familie? -> in het dichte nevelwoud.',
        gradeBadge: 'Grammatica'
      },
      {
        id: 'rain68-new-3-2',
        category: 'Sterke Werkwoorden',
        categoryIcon: '🌿',
        question: 'Wat is het voltooid deelwoord van "ontvangen"? (De gorilla heeft het voedsel ...)',
        type: 'choice',
        options: ['ontvangen', 'geontvangd', 'ontvangt'],
        correctOptionIndex: 0,
        hint: 'Werkwoorden met ont- krijgen geen extra ge- vooraan: ontvangen - ontving - ontvangen.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'rain68-new-3-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor de hechte familieband van primaten:',
        type: 'spell',
        targetWord: 'KUDDEGEEST',
        scrambledLetters: ['K', 'U', 'D', 'D', 'E', 'G', 'E', 'E', 'S', 'T'],
        hint: 'Kudde + geest (10 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'rain68-new-3-4',
        category: 'Begrijpend Lezen',
        categoryIcon: '📖',
        question: 'Waarom maken berggorilla’s elke avond een gloednieuw slaapnest van takken en bladeren?',
        passage: 'Berggorilla’s slapen bijna nooit twee nachten op dezelfde plek om parasieten en vuil te vermijden. Elke namiddag plooit elke gorilla binnen vijf minuten een schoon en comfortabel nest van verse twijgen op de grond of in een boom.',
        type: 'choice',
        options: ['Voor optimale hygiëne en het voorkomen van parasieten', 'Omdat ze hun oude nest kwijtraken', 'Omdat takken na één nacht breken'],
        correctOptionIndex: 0,
        hint: 'Lees over hygiëne en het vermijden van vuil en parasieten.',
        gradeBadge: 'Begrijpend Lezen'
      }
    ]
  },
  {
    id: 4,
    name: 'Maya’s Jachtterrein',
    biome: 'jungle',
    theme: 'Werkwoordspelling (Engelse & Franse Leenwoorden)',
    themeColor: '#F9A825',
    bannerEmoji: '🐆',
    chapterTitle: 'Hoofdstuk 4: Onzichtbare Schaduw',
    introStory: 'Maya de jaguar beweegt geruisloos. "In het Nederlands gebruiken we veel leenwoorden. Weet jij hoe je leenwerkwoorden vervoegt?"',
    animalReward: findAnimal('maya-jaguar'),
    questions: [
      {
        id: 'rain68-new-4-1',
        category: 'Leenwerkwoorden Vervoegen',
        categoryIcon: '🐆',
        question: 'Wat is de juiste verleden tijd van "chillen" (ontspannen)? (De jaguar ... op de tak)',
        type: 'choice',
        options: ['childe', 'chillde', 'chillede'],
        correctOptionIndex: 1,
        hint: 'Chillen: stam is chill (eindigt op l, geen t-kofschip) + de = chillde.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'rain68-new-4-2',
        category: 'Werkwoordspelling (d/t)',
        categoryIcon: '💧',
        question: 'Vul in: "De krachtige beet van de jaguar ___ zelfs het schild van een schildpad."',
        type: 'choice',
        options: ['verbrijzelt', 'verbrijzeld', 'verbrijzeldt'],
        correctOptionIndex: 0,
        hint: 'Verbrijzelen: stam verbrijzel + t = verbrijzelt.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'rain68-new-4-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor de zwarte kringen op de vacht van een jaguar:',
        type: 'spell',
        targetWord: 'ROZETTEN',
        scrambledLetters: ['R', 'O', 'Z', 'E', 'T', 'T', 'E', 'N'],
        hint: 'R - O - Z - E - TT - E - N (8 letters, met dubbel t).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'rain68-new-4-4',
        category: 'Begrijpend Lezen',
        categoryIcon: '📖',
        question: 'Hoe verschilt de bijtkracht van een jaguar van die van een leeuw of tijger?',
        passage: 'In verhouding tot zijn lichaamsgewicht heeft de jaguar de allersterkste kaakspieren van alle grote katachtigen. Waar leeuwen prooien verstikken, kan een jaguar met één beet dwars door het dikke pantser van kaaimannen en schildpadden bijten.',
        type: 'choice',
        options: ['Relatief de sterkste kaakspieren die zelfs door dikke schildpaddenpantsers heen bijten', 'Zwakker omdat hij kleiner is', 'Hij gebruikt zijn tanden niet'],
        correctOptionIndex: 0,
        hint: 'Lees over de verhouding en het doorboren van harde pantsers.',
        gradeBadge: 'Begrijpend Lezen'
      }
    ]
  },
  {
    id: 5,
    name: 'Pepe’s Waarschuwingskleuren',
    biome: 'jungle',
    theme: 'Signaalwoorden (Tegenstelling & Samenvatting)',
    themeColor: '#00E676',
    bannerEmoji: '🐸',
    chapterTitle: 'Hoofdstuk 5: Gif en Waarschuwing',
    introStory: 'Pepe de gifkikker glinstert in het felle licht. "Let goed op signaalwoorden in Cito-teksten!"',
    animalReward: findAnimal('pepe-gifkikker'),
    questions: [
      {
        id: 'rain68-new-5-1',
        category: 'Signaalwoorden (Tegenstelling)',
        categoryIcon: '🐸',
        question: 'Welk woord is een signaalwoord van een TEGENSTELLING?',
        type: 'choice',
        options: ['daarentegen', 'bovendien', 'ten eerste'],
        correctOptionIndex: 0,
        hint: '"Daarentegen" geeft aan dat iets anders/tegengesteld is.',
        gradeBadge: 'Begrijpend Lezen'
      },
      {
        id: 'rain68-new-5-2',
        category: 'Werkwoordspelling (d/t)',
        categoryIcon: '🎨',
        question: 'Vul in: "Zijn felle kleur ___ roofdieren af."',
        type: 'choice',
        options: ['schrikt', 'schrikd', 'schrikdt'],
        correctOptionIndex: 0,
        hint: 'Afschrikken: stam schrik + t = schrikt.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'rain68-new-5-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor de biologische waarschuwingskleur:',
        type: 'spell',
        targetWord: 'APOSEMATISCH',
        scrambledLetters: ['A', 'P', 'O', 'S', 'E', 'M', 'A', 'T', 'I', 'S', 'C', 'H'],
        hint: 'A - P - O - S - E - M - A - T - I - SCH (12 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'rain68-new-5-4',
        category: 'Zinsleer',
        categoryIcon: '🔍',
        question: 'Wat is het gezegde in: "Inheemse stammen hebben het kikkerextract eeuwenlang voor hun jachtpijlen gebruikt."',
        type: 'choice',
        options: ['hebben gebruikt', 'inheemse stammen', 'voor hun jachtpijlen'],
        correctOptionIndex: 0,
        hint: 'Het werkwoordelijk gezegde bestaat uit alle werkwoorden: hebben + gebruikt.',
        gradeBadge: 'Grammatica'
      }
    ]
  },
  {
    id: 6,
    name: 'Paco’s Luiaard Filosofie',
    biome: 'jungle',
    theme: 'Eindtoets Regenwoud (Meesterschap Groep 6-7-8)',
    themeColor: '#795548',
    bannerEmoji: '🦥',
    chapterTitle: 'Hoofdstuk 6: De Grote Amazone Meesterproef',
    introStory: 'Paco de luiaard kijkt tevreden vanuit zijn tak. "Gefeliciteerd! Je hebt alle geheimen van het regenwoud en de Nederlandse taal doorgrond!"',
    animalReward: findAnimal('paco-luiaard'),
    questions: [
      {
        id: 'rain68-new-6-1',
        category: 'Cito Tekstdoelen',
        categoryIcon: '🦥',
        question: 'Wat is het hoofddoel van een activerende tekst (zoals een poster voor regenwoudbehoud)?',
        type: 'choice',
        options: ['De lezer aansporen om direct in actie te komen of geld te doneren', 'Uitsluitend feiten vertellen over bomen', 'Een fictief sprookje vertellen'],
        correctOptionIndex: 0,
        hint: 'Activeren = aansporen tot actie!',
        gradeBadge: 'Begrijpend Lezen'
      },
      {
        id: 'rain68-new-6-2',
        category: 'Werkwoordspelling (Voltooid Deelwoord)',
        categoryIcon: '🌿',
        question: 'Kies de juiste spelling: "De luiaard is langzaam naar beneden ___."',
        type: 'choice',
        options: ['geklommen', 'geklomd', 'geklomt'],
        correctOptionIndex: 0,
        hint: 'Klimmen - klom - geklommen.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'rain68-new-6-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het synoniem voor biologische soortenrijkdom:',
        type: 'spell',
        targetWord: 'BIODIVERSITEIT',
        scrambledLetters: ['B', 'I', 'O', 'D', 'I', 'V', 'E', 'R', 'S', 'I', 'T', 'E', 'I', 'T'],
        hint: 'Bio + diversiteit (14 letters, met korte ei aan het eind).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'rain68-new-6-4',
        category: 'Zinsleer (Bijwoordelijke Bepaling)',
        categoryIcon: '🔍',
        question: 'Wat is de bijwoordelijke bepaling van tijd in: "Paco daalt slechts eenmaal per week uit de boomtop af."',
        type: 'choice',
        options: ['slechts eenmaal per week (WANNEER/HOE VAAK?)', 'uit de boomtop', 'Paco'],
        correctOptionIndex: 0,
        hint: 'Vraag: HOE VAAK daalt hij af? -> slechts eenmaal per week.',
        gradeBadge: 'Grammatica'
      }
    ]
  }
];
