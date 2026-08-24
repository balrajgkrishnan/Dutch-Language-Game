import { Question } from '../types';

export const GROEP_6_8_SPELLING_QUESTIONS: Question[] = [
  // WERKWOORD SPELLING: D / T / DT & INVERSIE
  {
    id: 'g68-sp-1',
    category: '⚡ Werkwoordspelling (d / t / dt)',
    categoryIcon: '⚡',
    gradeBadge: 'Groep 6-7',
    shortStory: 'Tess onderzoekt het gedrag van de cheeta.',
    question: "Kies de juiste spelling: 'Wat ___ er op de savanne?' (werkwoord: gebeuren)",
    type: 'choice',
    options: [
      'gebeurt (tegenwoordige tijd: stam gebeur + t)',
      'gebeurd (met een d)',
      'gebeurtte'
    ],
    correctOptionIndex: 0,
    hint: "Het gebeurt NU (tegenwoordige tijd). Vervang door 'loopt': Wat loopt er op de savanne? Dus met een 't'!",
    explanation: "Uitstekend! In de tegenwoordige tijd schrijf je stam + t (gebeur + t = gebeurt). 'Gebeurd' met een d is alleen een voltooid deelwoord (het is gebeurd)!"
  },
  {
    id: 'g68-sp-2',
    category: '⚡ Werkwoordspelling (Inversie: jij erachter)',
    categoryIcon: '⚡',
    gradeBadge: 'Groep 6-8',
    shortStory: 'Tess praat met de nieuwe safari-gids.',
    question: "Welke zin is grammaticaal en qua spelling JUIST?",
    type: 'choice',
    options: [
      'Word jij morgen de nieuwe ranger van het reservaat?',
      'Wordt jij morgen de nieuwe ranger van het reservaat?',
      'Wort jij morgen de nieuwe ranger van het reservaat?'
    ],
    correctOptionIndex: 0,
    hint: "Als 'jij' achter de persoonsvorm staat (inversie), verdwijnt de 't' (denk aan: loop jij)!",
    explanation: "Top! Loop jij? -> dus: Word jij (alleen de stam)! 'Jij wordt' heeft wél een t, maar 'word jij' niet!"
  },
  {
    id: 'g68-sp-3',
    category: '⚡ Werkwoordspelling (' + "'t Kofschip" + ')',
    categoryIcon: '⚡',
    gradeBadge: 'Groep 7-8',
    shortStory: 'De ranger heeft de jeeps klaargezet.',
    question: "Hoe schrijf je: 'De ranger heeft de route ___.' (werkwoord: verhuizen)",
    type: 'choice',
    options: [
      'verhuisd (stam van verhuizen eindigt op z, zit niet in ' + "'t kofschip" + ', dus d)',
      'verhuist (met een t)',
      'verhuizd'
    ],
    correctOptionIndex: 0,
    hint: "Kijk naar de stam van het hele werkwoord (verhuiz-). De 'z' zit niet in 't kofschip, dus +d!",
    explanation: "Heel scherp! Verhuizen -> stam met z (niet in 't kofschip) -> verhuisd met een d!"
  },
  {
    id: 'g68-sp-4',
    category: '⚡ Werkwoordspelling (Vinden / Bieden)',
    categoryIcon: '⚡',
    gradeBadge: 'Groep 6-7',
    shortStory: 'De gids zoekt naar sporen in het zand.',
    question: "Kies de juiste spelling: 'Mijn zus ___ het leeuwenwelpje prachtig.' (werkwoord: vinden)",
    type: 'choice',
    options: [
      'vindt (stam vind + t)',
      'vind (alleen stam)',
      'vint'
    ],
    correctOptionIndex: 0,
    hint: "Mijn zus = zij (derde persoon). Vervang door 'loopt': zus loopt -> dus stam + t!",
    explanation: "Briljant! Stam van vinden is vind + t = vindt!"
  },
  {
    id: 'g68-sp-5',
    category: '⚡ Werkwoordspelling (Beantwoorden)',
    categoryIcon: '⚡',
    gradeBadge: 'Groep 7-8',
    shortStory: 'Tess geeft uitleg aan de toeristen.',
    question: "Vul in: 'Boerin Tess ___ alle vragen van de bezoekers.' (werkwoord: beantwoorden)",
    type: 'choice',
    options: [
      'beantwoordt (stam beantwoord + t)',
      'beantwoord',
      'beantwoort'
    ],
    correctOptionIndex: 0,
    hint: "Stam = beantwoord. Hij/zij vorm = stam + t = beantwoordt!",
    explanation: "Super! Beantwoord + t = beantwoordt!"
  },

  // LEESTEKENS, TREMA'S & APOSTROFS
  {
    id: 'g68-sp-6',
    category: '🔤 Spelling (Trema & Meervoud)',
    categoryIcon: '🔤',
    gradeBadge: 'Groep 7-8',
    shortStory: 'In de waterpoel zwemmen allerlei insecten.',
    question: "Wat is het juiste meervoud van 'bacterie' en 'zee'?",
    type: 'choice',
    options: [
      'bacteriën & zeeën (met een trema om de klinkers te scheiden)',
      'bacterien & zeeen (zonder trema)',
      'bacterieën & zëen'
    ],
    correctOptionIndex: 0,
    hint: "Een trema (ë) gebruik je om te voorkomen dat je klinkers verkeerd samenvoegt!",
    explanation: "Perfect! Bacteriën en zeeën krijgen een trema om de uitspraak duidelijk te maken."
  },
  {
    id: 'g68-sp-7',
    category: '🔤 Spelling (Apostrof Meervoud & Tijd)',
    categoryIcon: '🔤',
    gradeBadge: 'Groep 7-8',
    shortStory: 'Vroeg op de dag ontwaken de dieren.',
    question: "Welke zin is 100% correct gespeld?",
    type: 'choice',
    options: [
      "'s Ochtends voeren de rangers twee baby's van de apenfamilie.",
      "S'ochtends voeren de rangers twee babys van de apenfamilie.",
      "'s-Ochtends voeren de rangers twee baby's van de apenfamilie."
    ],
    correctOptionIndex: 0,
    hint: "Denk aan: 's ochtends (met kleine 's en hoofdletter O) en baby's (apostrof-s na y)!",
    explanation: "Geweldig meesterschap! 's Ochtends en woorden op y (baby's, hobby's, pony's) krijgen apostrof-s!"
  },
  {
    id: 'g68-sp-8',
    category: '⚡ Werkwoordspelling (Voltooid Deelwoord als Bijvoeglijk Naamwoord)',
    categoryIcon: '⚡',
    gradeBadge: 'Groep 7-8',
    shortStory: 'De ranger onderzoekt het vergrendelde hek.',
    question: "Welke zin is correct gespeld?",
    type: 'choice',
    options: [
      'Het pas geverfde hek van het safarikamp beschermt de dieren.',
      'Het pas geverfte hek van het safarikamp beschermt de dieren.',
      'Het pas geverfdd hek van het safarikamp beschermt de dieren.'
    ],
    correctOptionIndex: 0,
    hint: "Als een voltooid deelwoord een bijvoeglijk naamwoord wordt (het geverfde hek), maak je het zo kort mogelijk!",
    explanation: "Uitstekend! Verf -> verfde -> geverfde hek (zo kort mogelijk geschreven)."
  },
  {
    id: 'g68-sp-9',
    category: '🔤 Spelling (Tussen-N Regel)',
    categoryIcon: '🔤',
    gradeBadge: 'Groep 7-8',
    shortStory: 'In de dierenkliniek bereiden ze het voer voor.',
    question: "Kies de juiste spelling van de samenstellingen:",
    type: 'choice',
    options: [
      'paardenbloem & apenkooi (alleen -en als het eerste woord alleen een meervoud op -en heeft)',
      'paardebloem & apenkooi',
      'paardenbloem & apekooi'
    ],
    correctOptionIndex: 0,
    hint: "Paard heeft alleen meervoud 'paarden' -> paardenbloem! Aap heeft alleen 'apen' -> apenkooi!",
    explanation: "Heel goed! De tussen-n regel: als het eerste deel alleen een meervoud op -en heeft, schrijf je -en."
  },
  {
    id: 'g68-sp-10',
    category: '🔤 Spelling (Koppelteken bij Aardrijkskundige Namen)',
    categoryIcon: '🔤',
    gradeBadge: 'Groep 7-8',
    shortStory: 'De expeditie reist naar Zuid-Amerika.',
    question: "Wat is de juiste spelling?",
    type: 'choice',
    options: [
      'Zuid-Amerikaanse savanne (met koppelteken en twee hoofdletters)',
      'Zuidamerikaanse savanne',
      'zuid-amerikaanse savanne'
    ],
    correctOptionIndex: 0,
    hint: "Aardrijkskundige samenstellingen met Zuid/Noord/Oost/West behouden een koppelteken en hoofdletters!",
    explanation: "Precies! Zuid-Amerikaanse krijgt een koppelteken en hoofdletters Z en A."
  },

  // BEGRIJPEND LEZEN (GROEP 6-7-8 ARTIKELEN)
  {
    id: 'g68-rc-1',
    category: '📖 Begrijpend Lezen (Ecosysteem & Oorzaak)',
    categoryIcon: '📖',
    gradeBadge: 'Begrijpend Lezen (Gr 6-8)',
    passage: "De 'Grote Trek' op de Serengeti is een van de meest indrukwekkende natuurverschijnselen ter wereld. Ruim 1,5 miljoen gnoes en honderdduizenden zebra's migreren jaarlijks in een gigantische cirkel achter de regens en het verse gras aan. Hierdoor worden voedingsstoffen over honderden kilometers verspreid en blijft de savanne vruchtbaar.",
    question: "Wat is de belangrijkste ecologische functie van de Grote Trek volgens de tekst?",
    type: 'choice',
    options: [
      'Het verspreiden van voedingsstoffen over honderden kilometers waardoor de savanne vruchtbaar blijft',
      'Het vermaken van duizenden safaritoeristen in jeeps',
      'Zorgen dat de rivieren overstromen'
    ],
    correctOptionIndex: 0,
    hint: "Lees de laatste zin over de 'voedingsstoffen' en 'vruchtbaar'!",
    explanation: "Uitstekend tekstbegrip! De trek verspreidt mest en voedingsstoffen die het landschap gezond houden."
  },
  {
    id: 'g68-rc-2',
    category: '📖 Begrijpend Lezen (Alineadoel & Signaalwoorden)',
    categoryIcon: '📖',
    gradeBadge: 'Begrijpend Lezen (Gr 7-8)',
    passage: "Hoewel cheeta's de snelste landdieren op aarde zijn (ze kunnen in 3 seconden accelereren naar 100 km/u), kost een sprint enorm veel energie. DAAROM moeten ze na een achtervolging van slechts 400 meter minstens 30 minuten uitrusten om af te koelen, waardoor andere roofdieren zoals hyena's hun prooi soms afpakken.",
    question: "Welk verband geeft het signaalwoord 'DAAROM' aan in deze alinea?",
    type: 'choice',
    options: [
      'Een gevolg / reden (de sprint kost zoveel energie, met als gevolg dat ze lang moeten rusten)',
      'Een tegenstelling (het is het tegenovergestelde van sprinten)',
      'Een opsomming van verschillende dieren'
    ],
    correctOptionIndex: 0,
    hint: "Daarom = om die reden / als gevolg daarvan!",
    explanation: "Top! 'Daarom' is een redengevend / causaal signaalwoord."
  },
  {
    id: 'g68-rc-3',
    category: '📖 Begrijpend Lezen (Feit versus Mening)',
    categoryIcon: '📖',
    gradeBadge: 'Begrijpend Lezen (Gr 6-8)',
    passage: "Afrikaanse olifanten kunnen communiceren via infrageluid. Dit zijn hele lage trillingen die mensen niet kunnen horen, maar die over de grond tot 10 kilometer ver reizen. Professor Van Dijk vindt dit het meest fascinerende zintuig van het hele dierenrijk.",
    question: "Welke bewering uit de tekst is een MENING van de professor?",
    type: 'choice',
    options: [
      'Dat infrageluid het meest fascinerende zintuig van het dierenrijk is',
      'Dat infrageluid over de grond tot 10 kilometer kan reizen',
      'Dat mensen infrageluid niet kunnen horen'
    ],
    correctOptionIndex: 0,
    hint: "Let op subjectieve woorden: 'vindt dit het meest fascinerende'!",
    explanation: "Exact! Wat iemand 'fascinerend' vindt is een mening/oordeel, terwijl de trillingen een meetbaar feit zijn."
  }
];
