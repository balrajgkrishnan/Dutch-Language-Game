import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Zap, Shield, Sparkles, Heart, Trophy, Flame, RotateCcw, 
  Award, CheckCircle2, HelpCircle, Swords, Backpack, Compass, 
  Volume2, FastForward, Play, ChevronRight, Eye, ArrowRight, RefreshCw
} from 'lucide-react';
import { PlayerProfile } from '../types';
import { sound } from '../services/soundService';
import { speech } from '../services/speechService';
import confetti from 'canvas-confetti';

interface WerkwoordBossArenaModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
}

export interface BossDuelQuestion {
  id: string;
  category: 'tt_dt' | 'ovt_kofschip' | 'vdw_dt' | 'leenwoorden' | 'signaalwoorden' | 'klankgroepen';
  categoryLabel: string;
  moveType: string;
  typeColor: string;
  sentencePrompt: string;
  verbInfinitive: string;
  subjectHint: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  ruleTip: string;
}

export interface BossProfile {
  id: string;
  name: string;
  speciesTitle: string;
  level: number;
  elementTypes: { name: string; bg: string; text: string }[];
  emoji: string;
  arenaTheme: 'volcano' | 'gothic' | 'cyber' | 'palace' | 'desert' | 'jungle';
  platformGradient: string;
  bgGradient: string;
  maxHp: number;
  dialogueIntro: string;
  defeatDialogue: string;
  targetGrade: 'Groep 4-5' | 'Groep 6-7' | 'Groep 7-8' | 'Groep 8';
  questionPool: BossDuelQuestion[];
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPREHENSIVE QUESTION REPOSITORY (60+ High Quality Curriculum Questions)
// ═══════════════════════════════════════════════════════════════════════════
export const ALL_BOSS_PROFILES: BossProfile[] = [
  {
    id: 'dt-dragon',
    name: 'DT-DRAAK IGNIS',
    speciesTitle: 'Heerser van de Tegenwoordige Tijd & Inversie',
    level: 85,
    elementTypes: [
      { name: 'VUUR', bg: 'bg-red-600', text: 'text-white' },
      { name: 'DRAAK', bg: 'bg-amber-600', text: 'text-white' }
    ],
    emoji: '🐉',
    arenaTheme: 'volcano',
    platformGradient: 'from-amber-700 via-red-800 to-slate-900',
    bgGradient: 'from-red-950 via-slate-900 to-amber-950',
    maxHp: 100,
    dialogueIntro: 'Wilde DT-DRAAK IGNIS verschijnt! "Haha! Niemand beheerst stam+t en inversie beter dan ik!"',
    defeatDialogue: 'Aaaargh! Jouw stam+t kennis is super effectief! DT-Draak Ignis buigt voor jouw meesterschap!',
    targetGrade: 'Groep 8',
    questionPool: [
      {
        id: 'dtd-inv-1',
        category: 'tt_dt',
        categoryLabel: 'Tegenwoordige Tijd (Inversie)',
        moveType: 'INVERSIE SPREUK',
        typeColor: 'from-amber-600 to-orange-600',
        sentencePrompt: '... jij morgen ook mee naar het grote Cito-oefenfeest? (komen)',
        verbInfinitive: 'komen',
        subjectHint: 'Vraagzin: jij staat direct achter de persoonsvorm',
        options: ['Kom', 'Komt', 'Komdt', 'Koomt'],
        correctIndex: 0,
        explanation: 'Bij de vraagvorm met "jij" direct achter de persoonsvorm vervalt de -t: "Kom jij".',
        ruleTip: 'Regel: Bij persoonsvorm + jij/je (vraagzin) schrijf je alleen de ik-vorm stam!'
      },
      {
        id: 'dtd-dt-2',
        category: 'tt_dt',
        categoryLabel: 'Tegenwoordige Tijd (Stam + t bij D-werkwoorden)',
        moveType: 'DT-FLITSAANVAL',
        typeColor: 'from-red-600 to-rose-600',
        sentencePrompt: 'Mijn slimme teamgenoot ... elk moeilijk raadsel feilloos. (beantwoorden)',
        verbInfinitive: 'beantwoorden',
        subjectHint: 'Teamgenoot = hij/zij (3e persoon enkelvoud) -> stam + t',
        options: ['beantwoordt', 'beantwoord', 'beantwoorde', 'beantwoort'],
        correctIndex: 0,
        explanation: 'Stam is "beantwoord" (eindigt op d) + t = "beantwoordt". Teamgenoot is 3e persoon enkelvoud.',
        ruleTip: 'Regel: In de tegenwoordige tijd schrijf je bij hij/zij altijd stam + t (eindigt op d -> dt)!'
      },
      {
        id: 'dtd-trap-3',
        category: 'tt_dt',
        categoryLabel: 'Tegenwoordige Tijd (Verraderlijke je/jij)',
        moveType: 'PSYCHO-VALSTRIK',
        typeColor: 'from-purple-600 to-pink-600',
        sentencePrompt: '... je vader ook van spannende avonturenboeken? (houden)',
        verbInfinitive: 'houden',
        subjectHint: 'Let op: het onderwerp is "je vader" (hij), NIET "je"!',
        options: ['Houdt', 'Houd', 'Hout', 'Houwdt'],
        correctIndex: 0,
        explanation: '"Je vader" = hij-vorm (jouw vader), dus wél stam + t: "Houdt je vader".',
        ruleTip: 'Valstrik: "Je" is hier bezittelijk voornaamwoord (jouw vader = hij), dus stam + t!'
      },
      {
        id: 'dtd-word-4',
        category: 'tt_dt',
        categoryLabel: 'Tegenwoordige Tijd (Worden)',
        moveType: 'DRAKEN-VUUR',
        typeColor: 'from-red-600 to-amber-600',
        sentencePrompt: 'Wie ... er dit jaar gekozen tot beste voorlezer van de klas? (worden)',
        verbInfinitive: 'worden',
        subjectHint: 'Wie = 3e persoon enkelvoud (hij-vorm) -> stam + t',
        options: ['wordt', 'word', 'worddt', 'wort'],
        correctIndex: 0,
        explanation: '"Wie" is hier het onderwerp (3e persoon enkelvoud), dus stam "word" + t = "wordt".',
        ruleTip: 'Regel: Bij "Wie wordt er..." gebruik je altijd stam + t (wordt).'
      },
      {
        id: 'dtd-vind-5',
        category: 'tt_dt',
        categoryLabel: 'Tegenwoordige Tijd (Vinden)',
        moveType: 'VIND-DRAAI',
        typeColor: 'from-amber-600 to-yellow-600',
        sentencePrompt: 'Ridheya ... altijd de allermooiste schelpen op het strand. (vinden)',
        verbInfinitive: 'vinden',
        subjectHint: 'Ridheya = zij (3e persoon enkelvoud) -> stam + t',
        options: ['vindt', 'vind', 'vint', 'vindte'],
        correctIndex: 0,
        explanation: 'Stam is "vind" + t = "vindt". Ridheya is de zij-vorm.',
        ruleTip: 'Regel: Stam vind + t = vindt (met dt!).'
      },
      {
        id: 'dtd-inv-6',
        category: 'tt_dt',
        categoryLabel: 'Tegenwoordige Tijd (Vind jij)',
        moveType: 'SPEL-BLIKSEM',
        typeColor: 'from-blue-600 to-indigo-600',
        sentencePrompt: 'Wat ... jij van de nieuwe schoolbibliotheek? (vinden)',
        verbInfinitive: 'vinden',
        subjectHint: 'Inversie: persoonsvorm voor "jij" -> -t valt weg!',
        options: ['vind', 'vindt', 'vint', 'vin'],
        correctIndex: 0,
        explanation: 'Bij vraagvorm persoonsvorm + jij valt de -t weg: alleen de stam "vind".',
        ruleTip: 'Regel: "Vind jij" schrijf je met een d, nooit met dt!'
      },
      {
        id: 'dtd-gebeur-7',
        category: 'tt_dt',
        categoryLabel: 'Tegenwoordige Tijd (Gebeuren)',
        moveType: 'MAGISCHE DAMP',
        typeColor: 'from-teal-600 to-cyan-600',
        sentencePrompt: 'Er ... de laatste tijd heel vreemde dingen in het kasteel. (gebeuren)',
        verbInfinitive: 'gebeuren',
        subjectHint: 'Onderwerp = "heel vreemde dingen" (meervoud!)',
        options: ['gebeuren', 'gebeurt', 'gebeurd', 'gebeurente'],
        correctIndex: 0,
        explanation: 'Het onderwerp is "heel vreemde dingen" (meervoud), dus de persoonsvorm is het hele werkwoord "gebeuren".',
        ruleTip: 'Kijk altijd goed naar het onderwerp: bij meervoud schrijf je het hele werkwoord!'
      },
      {
        id: 'dtd-bedoel-8',
        category: 'tt_dt',
        categoryLabel: 'Tegenwoordige Tijd (Bedoelen)',
        moveType: 'DRAKEN VLEUGEL',
        typeColor: 'from-orange-600 to-red-600',
        sentencePrompt: 'Mijn zus ... het altijd heel goed als ze advies geeft. (bedoelen)',
        verbInfinitive: 'bedoelen',
        subjectHint: 'Mijn zus = zij (3e persoon enkelvoud) -> stam + t',
        options: ['bedoelt', 'bedoeld', 'bedoel', 'bedoelde'],
        correctIndex: 0,
        explanation: 'In de tegenwoordige tijd krijgt de zij-vorm stam + t: bedoel + t = "bedoelt".',
        ruleTip: 'Let op: "bedoelt" is persoonsvorm in de tt (stam+t), niet te verwarren met het voltooid deelwoord "bedoeld".'
      },
      {
        id: 'dtd-bereid-9',
        category: 'tt_dt',
        categoryLabel: 'Tegenwoordige Tijd (Bereiden)',
        moveType: 'FLAMMEN-STEEK',
        typeColor: 'from-red-700 to-amber-700',
        sentencePrompt: 'De chef-kok ... vanavond een heerlijk feestmaal voor ons. (bereiden)',
        verbInfinitive: 'bereiden',
        subjectHint: 'De chef-kok = hij (3e persoon) -> stam bereid + t',
        options: ['bereidt', 'bereid', 'bereidde', 'bereitt'],
        correctIndex: 0,
        explanation: 'De stam is "bereid". Bij hij-vorm komt er een -t achter: "bereidt".',
        ruleTip: 'Regel: Stam eindigt op d? Dan hij-vorm altijd dt!'
      },
      {
        id: 'dtd-verrass-10',
        category: 'tt_dt',
        categoryLabel: 'Tegenwoordige Tijd (Verrassen)',
        moveType: 'VULKAAN BURST',
        typeColor: 'from-rose-600 to-orange-600',
        sentencePrompt: 'Hemali ... haar zusje met een zelfgemaakt detective-diploma. (verrassen)',
        verbInfinitive: 'verrassen',
        subjectHint: 'Hemali = zij -> stam verras + t (dubbel r, dubbel s)',
        options: ['verrast', 'verast', 'verrasst', 'verrasdt'],
        correctIndex: 0,
        explanation: 'Stam is "verras" + t = "verrast" (met dubbel r en dubbel s).',
        ruleTip: 'Verrassen: 2 r-en, 2 s-en! In de tt: stam (verras) + t = verrast.'
      }
    ]
  },
  {
    id: 'count-kofschip',
    name: "GRAAF 'T KOFSCHIP",
    speciesTitle: "Kasteelheer van de Verleden Tijd (o.v.t. & v.d.w.)",
    level: 75,
    elementTypes: [
      { name: 'SPOOK', bg: 'bg-purple-700', text: 'text-white' },
      { name: 'DUISTER', bg: 'bg-indigo-900', text: 'text-white' }
    ],
    emoji: '🧛',
    arenaTheme: 'gothic',
    platformGradient: 'from-purple-900 via-indigo-950 to-slate-900',
    bgGradient: 'from-purple-950 via-slate-950 to-indigo-950',
    maxHp: 100,
    dialogueIntro: "Wilde GRAAF 'T KOFSCHIP zweeft uit de mist! \"Weet jij of de verleden tijd op -te of -de eindigt?\"",
    defeatDialogue: "Onmogelijk! Jouw 't Kofschip analyse heeft mijn kasteel bevrijd! De vleermuizen buigen voor je!",
    targetGrade: 'Groep 7-8',
    questionPool: [
      {
        id: 'ck-verhuizen-1',
        category: 'ovt_kofschip',
        categoryLabel: 'Verleden Tijd (o.v.t. met Z -> S)',
        moveType: 'KOFSCHIP BLASTER',
        typeColor: 'from-indigo-600 to-purple-600',
        sentencePrompt: 'De ontdekkingsreiziger ... vorig jaar naar een mysterieus eiland. (verhuizen)',
        verbInfinitive: 'verhuizen',
        subjectHint: 'Hele werkwoord min -en = verhuiz- (eindigt op Z, niet in kofschip!)',
        options: ['verhuisde', 'verhuiste', 'verhuisden', 'is verhuist'],
        correctIndex: 0,
        explanation: 'Kijk naar het hele werkwoord: verhuizen min -en = verhuiz-. De "z" zit NIET in \'t kofschip, dus + de: "verhuisde".',
        ruleTip: "Regel: Kijk altijd naar de letter vóór -en van het hele werkwoord (verhuiz-). Z niet in kofschip -> -de(n)!"
      },
      {
        id: 'ck-fietsen-2',
        category: 'ovt_kofschip',
        categoryLabel: 'Verleden Tijd (o.v.t. met S)',
        moveType: 'SCHADUW SPRINT',
        typeColor: 'from-slate-700 to-purple-800',
        sentencePrompt: 'De speurhond ... gisteren urenlang door het bos. (fietsen / rennen)',
        verbInfinitive: 'fietsen',
        subjectHint: 'Hele werkwoord min -en = fiets- (S zit in \'t koFSChip!)',
        options: ['fietste', 'fietsde', 'fietsten', 'heeft gefietst'],
        correctIndex: 0,
        explanation: 'Fietsen min -en = fiets-. De "s" zit wél in \'t koFSChip, dus stam + te = "fietste".',
        ruleTip: "Regel: Zit de medeklinker in 't kofschip (t, k, f, s, ch, p)? Dan +te(n) in de verleden tijd!"
      },
      {
        id: 'ck-landen-3',
        category: 'ovt_kofschip',
        categoryLabel: 'Verleden Tijd (Dubbele D: -dde)',
        moveType: 'AARD-BEVING',
        typeColor: 'from-amber-700 to-stone-800',
        sentencePrompt: 'Het onderzoeksschip ... gisteravond veilig in de baai. (landen)',
        verbInfinitive: 'landen',
        subjectHint: 'Stam is "land" + de = dubbel d (-dde)',
        options: ['landde', 'landte', 'lande', 'geland'],
        correctIndex: 0,
        explanation: 'Stam is "land". De "d" zit niet in \'t kofschip, dus stam + de = "landde".',
        ruleTip: 'Regel: Stam eindigt al op d? In de verleden tijd schrijf je dan dubbel-d (-dde)!'
      },
      {
        id: 'ck-beloven-4',
        category: 'ovt_kofschip',
        categoryLabel: 'Verleden Tijd (V -> F klank)',
        moveType: 'MIST-GORDYN',
        typeColor: 'from-purple-800 to-indigo-900',
        sentencePrompt: 'De kapitein ... plechtig om ons te helpen met het onderzoek. (beloven)',
        verbInfinitive: 'beloven',
        subjectHint: 'Hele werkwoord min -en = belov- (V zit NIET in kofschip!)',
        options: ['beloofde', 'beloofte', 'beloofden', 'is beloofd'],
        correctIndex: 0,
        explanation: 'Beloven min -en = belov-. De letter "v" zit NIET in \'t kofschip, dus stam + de = "beloofde".',
        ruleTip: 'Regel: Hele werkwoord beloven heeft een "v". V niet in kofschip -> beloofde!'
      },
      {
        id: 'ck-ontdekken-5',
        category: 'ovt_kofschip',
        categoryLabel: 'Verleden Tijd (K -> -te)',
        moveType: 'KASTEEL-KLAP',
        typeColor: 'from-violet-700 to-purple-900',
        sentencePrompt: 'De twee zusjes ... een geheime doorgang achter de boekenkast. (ontdekken)',
        verbInfinitive: 'ontdekken',
        subjectHint: 'Onderwerp = "De twee zusjes" (meervoud!) / K zit in kofschip',
        options: ['ontdekten', 'ontdekden', 'ontdekte', 'hebben ontdekt'],
        correctIndex: 0,
        explanation: 'Ontdekken min -en = ontdek-. De "k" zit in \'t koFSChip. Onderwerp is meervoud, dus + ten = "ontdekten".',
        ruleTip: 'Regel: K zit in \'t kofschip. Meervoud onderwerp -> -ten!'
      },
      {
        id: 'ck-praten-6',
        category: 'ovt_kofschip',
        categoryLabel: 'Verleden Tijd (Dubbele T: -tte)',
        moveType: 'NACHT-ROEP',
        typeColor: 'from-indigo-800 to-slate-800',
        sentencePrompt: 'De wijze professor ... urenlang over oude fossielen. (praten)',
        verbInfinitive: 'praten',
        subjectHint: 'Stam is "praat" + te = dubbel t (-tte)',
        options: ['praatte', 'praatde', 'prate', 'gepraat'],
        correctIndex: 0,
        explanation: 'Stam is "praat". De "t" zit in \'t kofschip, dus stam + te = "praatte" (met dubbel t).',
        ruleTip: 'Regel: Stam praat + te = praatte (dubbel t in verleden tijd!).'
      },
      {
        id: 'ck-gebeuren-7',
        category: 'vdw_dt',
        categoryLabel: 'Voltooid Deelwoord (Gebeuren)',
        moveType: 'SPOOK-SIFON',
        typeColor: 'from-purple-600 to-indigo-700',
        sentencePrompt: 'Er is vanmiddag iets heel bijzonders ... . (gebeuren)',
        verbInfinitive: 'gebeuren',
        subjectHint: 'Voltooid deelwoord: gebeuren min -en = gebeur- (r niet in kofschip -> d)',
        options: ['gebeurd', 'gebeurt', 'gebeurde', 'gebeuren'],
        correctIndex: 0,
        explanation: 'Het is een voltooid deelwoord (er staat "is" bij). R zit niet in \'t kofschip, dus eindigt op -d: "gebeurd".',
        ruleTip: 'Ezelsbrug: Is het voltooid deelwoord (met heeft/is)? Dan \'t kofschip toepassen: gebeurd (met een d)!'
      },
      {
        id: 'ck-branden-8',
        category: 'ovt_kofschip',
        categoryLabel: 'Verleden Tijd (Branden)',
        moveType: 'KASTEEL-VUUR',
        typeColor: 'from-red-800 to-purple-900',
        sentencePrompt: 'Het kampvuur ... de hele nacht zachtjes door. (branden)',
        verbInfinitive: 'branden',
        subjectHint: 'Stam is brand + de = brandde',
        options: ['brandde', 'brandte', 'brande', 'heeft gebrand'],
        correctIndex: 0,
        explanation: 'Stam is "brand". D zit niet in \'t kofschip, dus stam + de = "brandde".',
        ruleTip: 'Regel: brand + de = brandde (dubbel d!).'
      }
    ]
  },
  {
    id: 'loanword-zombie',
    name: 'CYBER-ZOMBIE BYTER',
    speciesTitle: 'Meester van Engelse Werkwoorden in het Nederlands',
    level: 80,
    elementTypes: [
      { name: 'STAAL', bg: 'bg-slate-500', text: 'text-white' },
      { name: 'ELEKTRO', bg: 'bg-yellow-500', text: 'text-slate-950' }
    ],
    emoji: '🧟',
    arenaTheme: 'cyber',
    platformGradient: 'from-teal-800 via-emerald-900 to-slate-900',
    bgGradient: 'from-emerald-950 via-slate-950 to-teal-950',
    maxHp: 100,
    dialogueIntro: 'Wilde CYBER-ZOMBIE BYTER activeert! "Beep boop! Zelfs experts maken fouten met Engelse werkwoorden!"',
    defeatDialogue: 'Systeem oververhit! Jouw leenwoord-spelling is geprogrammeerd tot in absolute perfectie!',
    targetGrade: 'Groep 8',
    questionPool: [
      {
        id: 'lw-streamen-1',
        category: 'leenwoorden',
        categoryLabel: 'Engelse Leenwoorden (Voltooid Deelwoord)',
        moveType: 'CYBER BEAM',
        typeColor: 'from-teal-600 to-cyan-600',
        sentencePrompt: 'Wij hebben de nieuwste RPG-aflevering direct online ... . (streamen)',
        verbInfinitive: 'streamen',
        subjectHint: 'Engelse stam is stream (eindigt op m-klank). M zit niet in \'t kofschip -> +d',
        options: ['gestreamd', 'gestreamt', 'gestreamed', 'ge-streamt'],
        correctIndex: 0,
        explanation: 'Voltooid deelwoord van streamen: ge + stream + d = "gestreamd". M zit niet in \'t kofschip.',
        ruleTip: "Regel: Ook bij Engelse leenwoorden gebruik je 't kofschip op de uitspraak van de stam!"
      },
      {
        id: 'lw-updaten-2',
        category: 'leenwoorden',
        categoryLabel: 'Engelse Leenwoorden (Verleden Tijd)',
        moveType: 'DATA IMPULS',
        typeColor: 'from-blue-600 to-indigo-600',
        sentencePrompt: 'Gisteren ... onze leraar het hele schoolrooster op het scherm. (updaten)',
        verbInfinitive: 'updaten',
        subjectHint: 'Stam is update (eindigt op t-klank in uitspraak) -> +te',
        options: ['updatete', 'updatede', 'ge-updatet', 'updatte'],
        correctIndex: 0,
        explanation: 'De stam is update. De uitspraak eindigt op een t-klank (in \'t kofschip), dus stam + te = "updatete".',
        ruleTip: 'Regel: Bij updaten schrijf je in de verleden tijd de hele Engelse stam "update" + "te" = updatete!'
      },
      {
        id: 'lw-email-3',
        category: 'leenwoorden',
        categoryLabel: 'Engelse Leenwoorden (Koppelstreepje)',
        moveType: 'LASER MATRIX',
        typeColor: 'from-purple-600 to-teal-600',
        sentencePrompt: 'De onderzoeker heeft gisteren het verslag naar de kliniek ... . (e-mailen)',
        verbInfinitive: 'e-mailen',
        subjectHint: 'Let op het voorvoegsel ge- en het koppelstreepje',
        options: ['ge-e-maild', 'geëmaild', 'ge-e-mailt', 'ge-emaild'],
        correctIndex: 0,
        explanation: 'Bij afkortingen en Engelse letters met voorvoegsel ge- gebruik je koppeltekens: "ge-e-maild".',
        ruleTip: 'Regel: Bij e-mailen behoud je het streepje en zet je ge- ervoor met een koppelteken: ge-e-maild.'
      },
      {
        id: 'lw-deleten-4',
        category: 'leenwoorden',
        categoryLabel: 'Engelse Leenwoorden (Voltooid Deelwoord)',
        moveType: 'GLITCH STOOT',
        typeColor: 'from-rose-600 to-pink-600',
        sentencePrompt: 'Oeps! Per ongeluk heb ik het verkeerde bestand ... . (deleten)',
        verbInfinitive: 'deleten',
        subjectHint: 'Engelse stam is delete (uitspraak eindigt op t-klank -> t in kofschip)',
        options: ['gedeletet', 'gedeleted', 'gedelete', 'ge-deletet'],
        correctIndex: 0,
        explanation: 'Stam delete eindigt op een t-klank (in \'t kofschip), dus ge + delete + t = "gedeletet".',
        ruleTip: 'Regel: Stam delete hoor je /t/ aan het eind -> dus +t: gedeletet!'
      },
      {
        id: 'lw-appen-5',
        category: 'leenwoorden',
        categoryLabel: 'Engelse Leenwoorden (Verleden Tijd)',
        moveType: 'NANO-BLASTER',
        typeColor: 'from-emerald-600 to-teal-700',
        sentencePrompt: 'Ridheya ... vanochtend meteen naar haar vriendin. (appen)',
        verbInfinitive: 'appen',
        subjectHint: 'Stam app- (P zit in \'t koFSChip) -> +te',
        options: ['appte', 'appde', 'appten', 'heeft geappt'],
        correctIndex: 0,
        explanation: 'Stam van appen is app. De "p" zit in \'t kofschip, dus + te = "appte".',
        ruleTip: 'Regel: P zit in \'t kofschip -> appte!'
      },
      {
        id: 'lw-downloaden-6',
        category: 'leenwoorden',
        categoryLabel: 'Engelse Leenwoorden (Voltooid Deelwoord)',
        moveType: 'MEGA-BYTE',
        typeColor: 'from-cyan-600 to-blue-700',
        sentencePrompt: 'De meisjes hebben de nieuwste update al helemaal ... . (downloaden)',
        verbInfinitive: 'downloaden',
        subjectHint: 'Stam download (eindigt op d-klank -> d niet in kofschip)',
        options: ['gedownload', 'gedownloadt', 'gedownloadd', 'ge-download'],
        correctIndex: 0,
        explanation: 'Stam download eindigt al op d. In het Nederlands schrijf je nooit dubbel-d aan het eind: "gedownload".',
        ruleTip: 'Regel: ge + download + d -> maar Nederlands heeft nooit -dd aan woordeinde, dus "gedownload".'
      },
      {
        id: 'lw-checken-7',
        category: 'leenwoorden',
        categoryLabel: 'Engelse Leenwoorden (Tegenwoordige Tijd)',
        moveType: 'SCAN-PULSE',
        typeColor: 'from-amber-600 to-yellow-600',
        sentencePrompt: 'Hemali ... altijd of alle antwoorden goed zijn ingevuld. (checken)',
        verbInfinitive: 'checken',
        subjectHint: 'Hemali = zij -> stam check + t',
        options: ['checkt', 'checked', 'check', 'checkdt'],
        correctIndex: 0,
        explanation: 'In de tegenwoordige tijd krijgt de zij-vorm gewoon stam + t: check + t = "checkt".',
        ruleTip: 'Regel: In de tt gelden ook voor leenwoorden de gewone regels: hij/zij = stam + t.'
      },
      {
        id: 'lw-scoren-8',
        category: 'leenwoorden',
        categoryLabel: 'Engelse Leenwoorden (Verleden Tijd)',
        moveType: 'CYBER CRUSH',
        typeColor: 'from-violet-600 to-indigo-800',
        sentencePrompt: 'Onze spits ... in de laatste minuut het winnende doelpunt! (scoren)',
        verbInfinitive: 'scoren',
        subjectHint: 'Hele werkwoord scoren min -en = scor- (R zit niet in kofschip -> de)',
        options: ['scoorde', 'scoorte', 'scoorden', 'gescoord'],
        correctIndex: 0,
        explanation: 'Scoren min -en = scor-. R zit niet in \'t kofschip, dus stam + de = "scoorde".',
        ruleTip: 'Regel: R zit niet in \'t kofschip -> scoorde!'
      }
    ]
  },
  {
    id: 'sphinx-luxor',
    name: 'SPHINX VAN LUXOR',
    speciesTitle: 'Hoedster van Cito Signaalwoorden & Hoofdgedachte',
    level: 85,
    elementTypes: [
      { name: 'STEEN', bg: 'bg-stone-600', text: 'text-white' },
      { name: 'PSYCHIC', bg: 'bg-pink-600', text: 'text-white' }
    ],
    emoji: '🦁',
    arenaTheme: 'desert',
    platformGradient: 'from-amber-600 via-orange-800 to-stone-900',
    bgGradient: 'from-amber-950 via-slate-900 to-stone-950',
    maxHp: 100,
    dialogueIntro: 'Wilde SPHINX VAN LUXOR ontwaakt! "Wie mijn raadsels over signaalwoorden niet kent, zal hier niet passeren!"',
    defeatDialogue: 'Verbluffend! Jouw tekstbegrip en inzicht in signaalwoorden hebben de geheime piramide geopend!',
    targetGrade: 'Groep 8',
    questionPool: [
      {
        id: 'sph-desondanks-1',
        category: 'signaalwoorden',
        categoryLabel: 'Signaalwoorden (Tegenstelling)',
        moveType: 'PIRAMIDE FLITS',
        typeColor: 'from-amber-600 to-yellow-600',
        sentencePrompt: 'De storm was hevig, ... zette de dappere bemanning koers naar het eiland.',
        verbInfinitive: 'signaalwoord tegenstelling',
        subjectHint: 'Welk woord geeft een tegenstelling aan tussen het gevaar en het toch doorgaan?',
        options: ['desondanks', 'daardoor', 'omdat', 'zodat'],
        correctIndex: 0,
        explanation: '"Desondanks" betekent: toch / ondanks dat. Het geeft een tegenstelling aan.',
        ruleTip: 'Cito Signaalwoord: "desondanks", "daarentegen" en "echter" duiden op een tegenstelling.'
      },
      {
        id: 'sph-daardoor-2',
        category: 'signaalwoorden',
        categoryLabel: 'Signaalwoorden (Oorzaak & Gevolg)',
        moveType: 'ZANDSTORM STIK',
        typeColor: 'from-orange-600 to-amber-700',
        sentencePrompt: 'Het kompas was gebroken, ... raakten de verkenners tijdelijk de weg kwijt.',
        verbInfinitive: 'signaalwoord gevolg',
        subjectHint: 'Welk woord geeft het directe gevolg van het gebroken kompas aan?',
        options: ['daardoor', 'desondanks', 'hoewel', 'tenzij'],
        correctIndex: 0,
        explanation: '"Daardoor" geeft een oorzaak -> gevolg relatie aan.',
        ruleTip: 'Cito Signaalwoord: "daardoor", "waardoor" en "zodoende" geven een gevolg aan.'
      },
      {
        id: 'sph-verwijs-3',
        category: 'signaalwoorden',
        categoryLabel: 'Verwijswoorden (Relatie in de tekst)',
        moveType: 'TELEKINESE STOOT',
        typeColor: 'from-pink-600 to-rose-600',
        sentencePrompt: 'De dokter gaf de gewonde aap een warm deken. ... herstelde binnen twee dagen.',
        verbInfinitive: 'verwijswoord',
        subjectHint: 'Verwijswoord naar "de aap" (mannelijk dier)',
        options: ['Hij', 'Zij', 'Het', 'Welke'],
        correctIndex: 0,
        explanation: '"De aap" is een mannelijk zelfstandig naamwoord, dus je verwijst met "Hij".',
        ruleTip: 'Verwijswoorden: Mannelijke woorden -> hij/hem/zijn. Vrouwelijke woorden -> zij/haar.'
      },
      {
        id: 'sph-echter-4',
        category: 'signaalwoorden',
        categoryLabel: 'Signaalwoorden (Contrast)',
        moveType: 'SPHINX RAADSEL',
        typeColor: 'from-purple-600 to-pink-700',
        sentencePrompt: 'We wilden vroeg vertrekken, ... bleek de toegangspoort nog op slot te zitten.',
        verbInfinitive: 'signaalwoord contrast',
        subjectHint: 'Welk woord geeft een onverwachte tegenvaller/tegenstelling aan?',
        options: ['echter', 'zodat', 'mits', 'doordat'],
        correctIndex: 0,
        explanation: '"Echter" betekent \'maar\' en geeft een tegenstelling aan in de zin.',
        ruleTip: 'Signaalwoord: "echter" is synoniem voor "maar", maar staat vaker middenin de zin.'
      },
      {
        id: 'sph-zodat-5',
        category: 'signaalwoorden',
        categoryLabel: 'Signaalwoorden (Doel & Middel)',
        moveType: 'GOUDEN STRAAL',
        typeColor: 'from-yellow-600 to-amber-600',
        sentencePrompt: 'Ridheya poetste de oude lens zorgvuldig, ... ze de kleine sterren goed kon zien.',
        verbInfinitive: 'signaalwoord doel',
        subjectHint: 'Welk woord geeft het doel aan van het poetsen?',
        options: ['zodat', 'hoewel', 'daarentegen', 'noch'],
        correctIndex: 0,
        explanation: '"Zodat" geeft het beoogde doel of resultaat aan.',
        ruleTip: 'Cito Doel-Middel verband: "zodat", "om te", "met als doel" geven het doel aan.'
      },
      {
        id: 'sph-immers-6',
        category: 'signaalwoorden',
        categoryLabel: 'Signaalwoorden (Redengevend)',
        moveType: 'OUDE SPREUK',
        typeColor: 'from-indigo-600 to-stone-700',
        sentencePrompt: 'We moeten extra voorzichtig lopen; de stenen zijn ... spekglad door de regen.',
        verbInfinitive: 'signaalwoord reden',
        subjectHint: 'Welk woord betekent \'want\' of \'namelijk\'?',
        options: ['immers', 'daarentegen', 'desondanks', 'tenzij'],
        correctIndex: 0,
        explanation: '"Immers" geeft een algemeen bekende reden aan (betekent \'want/namelijk\').',
        ruleTip: 'Cito Verband: "immers", "aangezien" en "namelijk" geven een reden aan.'
      },
      {
        id: 'sph-daarentegen-7',
        category: 'signaalwoorden',
        categoryLabel: 'Signaalwoorden (Tegenstelling)',
        moveType: 'ZONNE-VUUR',
        typeColor: 'from-amber-600 to-red-600',
        sentencePrompt: 'Hemali houdt van oude boeken. Ridheya ... rent het liefst buiten door het bos.',
        verbInfinitive: 'signaalwoord contrast',
        subjectHint: 'Welk woord vergelijkt twee verschillende voorkeuren?',
        options: ['daarentegen', 'daardoor', 'bovendien', 'zodoende'],
        correctIndex: 0,
        explanation: '"Daarentegen" geeft een direct contrast/verschil aan tussen twee personen of situaties.',
        ruleTip: 'Cito Verband: "daarentegen" gebruik je bij een vergelijking met een tegenstelling.'
      },
      {
        id: 'sph-waarmee-8',
        category: 'signaalwoorden',
        categoryLabel: 'Verwijswoorden (Voorwerp)',
        moveType: 'HIEROGLYFEN KRACHT',
        typeColor: 'from-stone-700 to-amber-800',
        sentencePrompt: 'Hemali vond een antieke sleutel, ... ze de schatkist kon ontgrendelen.',
        verbInfinitive: 'betrekkelijk voornaamwoord',
        subjectHint: 'Verwijst naar "een sleutel" (met de sleutel -> waarmee)',
        options: ['waarmee', 'waarop', 'waarvan', 'waarnaar'],
        correctIndex: 0,
        explanation: 'Ze ontgrendelt met de sleutel -> met + wat = "waarmee".',
        ruleTip: 'Verwijswoorden: Voorzetsel + ding = waar + voorzetsel (met de sleutel -> waarmee).'
      }
    ]
  },
  {
    id: 'klinkerdief-golem',
    name: 'KLANKEN-GOLEM GOR',
    speciesTitle: 'Bewaker van Dubbelzetters & Klinkerdieven',
    level: 45,
    elementTypes: [
      { name: 'GRAS', bg: 'bg-emerald-600', text: 'text-white' },
      { name: 'AARDE', bg: 'bg-amber-700', text: 'text-white' }
    ],
    emoji: '🗿',
    arenaTheme: 'jungle',
    platformGradient: 'from-emerald-700 via-teal-900 to-slate-900',
    bgGradient: 'from-emerald-950 via-slate-950 to-teal-950',
    maxHp: 100,
    dialogueIntro: 'Wilde KLANKEN-GOLEM GOR stampt de grond in! "Breek jij mijn stenen klanken over korte en lange klinkers?"',
    defeatDialogue: 'Waaaah! Jouw klankgroepen-kennis heeft mijn rotsblokken gekraakt! Super goed gespeld!',
    targetGrade: 'Groep 4-5',
    questionPool: [
      {
        id: 'kg-kikkers-1',
        category: 'klankgroepen',
        categoryLabel: 'Dubbelzetter (Korte Klank)',
        moveType: 'ROTS STOOT',
        typeColor: 'from-emerald-600 to-green-600',
        sentencePrompt: 'In de vijver kwaken zes vrolijke ... . (kik-kers)',
        verbInfinitive: 'kikkers',
        subjectHint: 'Klankgroep kik- / korte klank "i" -> dubbelzetter op je pad (2x k)!',
        options: ['kikkers', 'kikers', 'kickers', 'kiekkers'],
        correctIndex: 0,
        explanation: 'Klankgroep is "kik-". De "i" is een korte klank, dus je schrijft 2 keer de k: kikkers!',
        ruleTip: 'Klankvoet regel: Korte klank (a, e, i, o, u) -> dubbelzetter op je pad (2 medeklinkers)!'
      },
      {
        id: 'kg-apen-2',
        category: 'klankgroepen',
        categoryLabel: 'Klinkerdief (Lange Klank)',
        moveType: 'BLADER-DANS',
        typeColor: 'from-teal-600 to-emerald-600',
        sentencePrompt: 'In het oerwoud slingeren vrolijke ... van tak naar tak. (a-pen)',
        verbInfinitive: 'apen',
        subjectHint: 'Klankgroep aa- / lange klank "aa" -> klinkerdief steelt één letter!',
        options: ['apen', 'appen', 'aapen', 'aappen'],
        correctIndex: 0,
        explanation: 'Klankgroep is "aa-". De "aa" is een lange klank aan het einde van de klankgroep, dus de klinkerdief pakt één a: apen!',
        ruleTip: 'Klankvoet regel: Lange klank aan het eind van de klankgroep -> klinkerdief steelt 1 letter (aa -> a)!'
      },
      {
        id: 'kg-hond-3',
        category: 'klankgroepen',
        categoryLabel: 'Langermaakwoord (-d of -t)',
        moveType: 'AARD TRIL',
        typeColor: 'from-amber-600 to-orange-700',
        sentencePrompt: 'De trouwe speur... Kopi blaft vrolijk naar de vogels. (hond)',
        verbInfinitive: 'hond',
        subjectHint: 'Maak het woord langer: één hond, twee hon-den -> je hoort een D!',
        options: ['hond', 'hont', 'hondt', 'hontje'],
        correctIndex: 0,
        explanation: 'Maak het woord langer: honden. Je hoort duidelijk de "d", dus je schrijft "hond".',
        ruleTip: 'Langermaakwoord: Hoor je aan het eind een /t/? Maak het woord langer (hond -> honden)!'
      },
      {
        id: 'kg-savanne-4',
        category: 'klankgroepen',
        categoryLabel: 'Dubbelzetter (Savanne)',
        moveType: 'SAVANNE WIND',
        typeColor: 'from-yellow-600 to-amber-700',
        sentencePrompt: 'De giraffen rennen over de uitgestrekte ... . (sa-van-ne)',
        verbInfinitive: 'savanne',
        subjectHint: 'Klankgroep van- / korte klank "a" -> dubbele n!',
        options: ['savanne', 'savane', 'savanna', 'safanne'],
        correctIndex: 0,
        explanation: 'Sa-van-ne: na de korte "a" in van- schrijf je een dubbele n: savanne.',
        ruleTip: 'Korte klank a -> dubbelzetter nn: savanne!'
      },
      {
        id: 'kg-bomen-5',
        category: 'klankgroepen',
        categoryLabel: 'Klinkerdief (Bomen)',
        moveType: 'WORTEL-GREEP',
        typeColor: 'from-emerald-700 to-stone-800',
        sentencePrompt: 'De uil zit hoog in de takken van de oude ... . (bo-men)',
        verbInfinitive: 'bomen',
        subjectHint: 'Klankgroep bo- / lange klank "oo" -> klinkerdief steelt één o!',
        options: ['bomen', 'boomen', 'bommen', 'boommen'],
        correctIndex: 0,
        explanation: 'Klankgroep is "bo-". Lange klank oo aan het eind -> klinkerdief pakt een o: bomen.',
        ruleTip: 'Lange klank oo -> bomen met één o!'
      },
      {
        id: 'kg-nacht-6',
        category: 'klankgroepen',
        categoryLabel: 'Luchtwoord (-cht)',
        moveType: 'NACHT-NEVEL',
        typeColor: 'from-indigo-700 to-slate-900',
        sentencePrompt: 'In de donkere ... zien de kattenogen er prachtig uit. (nacht)',
        verbInfinitive: 'nacht',
        subjectHint: 'Korte klank "a" + -cht (behalve bij hij ligt, hij legt, hij zegt)',
        options: ['nacht', 'nagt', 'nagtje', 'naght'],
        correctIndex: 0,
        explanation: 'Luchtwoord: korte klank "a" + cht met de ch van lucht: "nacht".',
        ruleTip: 'Luchtwoord regel: Korte klank + cht (behalve bij ligt, legt, zegt).'
      },
      {
        id: 'kg-klimmen-7',
        category: 'klankgroepen',
        categoryLabel: 'Dubbelzetter (Klimmen)',
        moveType: 'JUNGLE-SLINGER',
        typeColor: 'from-teal-600 to-green-700',
        sentencePrompt: 'De kleine apen ... behendig in de lianen. (klim-men)',
        verbInfinitive: 'klimmen',
        subjectHint: 'Klankgroep klim- / korte klank "i" -> dubbelzetter mm!',
        options: ['klimmen', 'klimen', 'klimmmen', 'klymen'],
        correctIndex: 0,
        explanation: 'Klim-men: na de korte klank "i" schrijf je 2 m-en: "klimmen".',
        ruleTip: 'Korte klank i -> dubbelzetter mm: klimmen!'
      },
      {
        id: 'kg-aardig-8',
        category: 'klankgroepen',
        categoryLabel: 'Achtervoegsel (-ig)',
        moveType: 'BLOEMEN-POEDER',
        typeColor: 'from-amber-600 to-rose-600',
        sentencePrompt: 'De boswachter is altijd ontzettend ... voor alle dieren. (aar-dig)',
        verbInfinitive: 'aardig',
        subjectHint: 'Achtervoegsel -ig: je hoort /ug/, maar schrijft -ig!',
        options: ['aardig', 'aardeg', 'aardug', 'aardigh'],
        correctIndex: 0,
        explanation: 'Achtervoegsel -ig: je hoort \'ug\', maar je schrijft altijd -ig: "aardig".',
        ruleTip: 'Achtervoegsel regel: Woorden op -ig (aardig, rustig, modderig) schrijf je met -ig!'
      }
    ]
  }
];

// Helper: Prepare and securely shuffle options for a question so the correct answer is uniformly distributed
function prepareShuffledQuestion(rawQ: BossDuelQuestion): BossDuelQuestion {
  const correctAnswer = rawQ.options[rawQ.correctIndex];
  const shuffledOptions = [...rawQ.options];
  
  // Fisher-Yates shuffle
  for (let i = shuffledOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
  }
  
  const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);
  
  return {
    ...rawQ,
    options: shuffledOptions,
    correctIndex: newCorrectIndex
  };
}

export const WerkwoordBossArenaModal: React.FC<WerkwoordBossArenaModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile
}) => {
  const [selectedBossIndex, setSelectedBossIndex] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [activeQuestions, setActiveQuestions] = useState<BossDuelQuestion[]>([]);
  
  const [bossHp, setBossHp] = useState<number>(100);
  const [playerHp, setPlayerHp] = useState<number>(100);
  const [playerExp, setPlayerExp] = useState<number>(65);
  
  // Battle Interaction State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [dialogueText, setDialogueText] = useState<string>('');
  const [isDefeated, setIsDefeated] = useState<boolean>(false);
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<number | null>(null);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(3);
  
  // Visual Animation Triggers
  const [isBossAttacking, setIsBossAttacking] = useState<boolean>(false);
  const [isPlayerAttacking, setIsPlayerAttacking] = useState<boolean>(false);
  const [isBossDamaged, setIsBossDamaged] = useState<boolean>(false);
  const [isPlayerDamaged, setIsPlayerDamaged] = useState<boolean>(false);
  const [floatingCombatText, setFloatingCombatText] = useState<{ text: string; type: 'super' | 'hit' | 'miss'; id: number } | null>(null);
  const [activeProjectile, setActiveProjectile] = useState<{ emoji: string; color: string } | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentBoss = ALL_BOSS_PROFILES[selectedBossIndex] || ALL_BOSS_PROFILES[0];
  const currentQ = activeQuestions[currentQuestionIndex] || activeQuestions[0];
  const isRidheya = profile.name.toLowerCase().includes('ridheya');

  // Load and prioritize unseen questions for this boss
  const loadBossBattleQuestions = (bossIdx: number) => {
    const targetBoss = ALL_BOSS_PROFILES[bossIdx] || ALL_BOSS_PROFILES[0];
    const seenSet = new Set(profile.seenQuestionIds || []);
    
    // Split into unseen and seen
    const unseen = targetBoss.questionPool.filter(q => !seenSet.has(q.id));
    const seen = targetBoss.questionPool.filter(q => seenSet.has(q.id));
    
    // Shuffle both sets
    const shuffledUnseen = [...unseen].sort(() => Math.random() - 0.5);
    const shuffledSeen = [...seen].sort(() => Math.random() - 0.5);
    
    // Prioritize unseen questions first, then cycle through seen
    const combined = [...shuffledUnseen, ...shuffledSeen];
    
    // Select 4-5 questions for the duel
    const selectedRaw = combined.slice(0, 5);
    
    // Prepare each with Fisher-Yates shuffled options (so index 0 is NOT always correct!)
    const prepared = selectedRaw.map(prepareShuffledQuestion);
    
    setActiveQuestions(prepared);
    setCurrentQuestionIndex(0);
    setBossHp(100);
    setPlayerHp(100);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsDefeated(false);
    setFloatingCombatText(null);
    setActiveProjectile(null);
    setDialogueText(targetBoss.dialogueIntro);
  };

  // Initialize questions when modal opens or boss index changes
  useEffect(() => {
    if (isOpen) {
      loadBossBattleQuestions(selectedBossIndex);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [isOpen, selectedBossIndex]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  if (!isOpen || activeQuestions.length === 0 || !currentQ) return null;

  const handleSelectBoss = (idx: number) => {
    sound.playPokemonMenuSelect();
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setSelectedBossIndex(idx);
    loadBossBattleQuestions(idx);
  };

  const handleCastSpell = (idx: number) => {
    if (isAnswerChecked || isDefeated) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    setSelectedOption(idx);
    setIsAnswerChecked(true);

    const isCorrect = idx === currentQ.correctIndex;
    const trainerName = isRidheya ? 'Ridheya' : 'Hemali';

    // Register question as seen across sessions in PlayerProfile
    onUpdateProfile(prev => {
      const currentSeen = prev.seenQuestionIds || [];
      const updatedSeen = currentSeen.includes(currentQ.id) ? currentSeen : [...currentSeen, currentQ.id];
      const history = prev.questionHistory || {};
      const prevEntry = history[currentQ.id] || { count: 0, lastSeen: 0 };
      return {
        ...prev,
        seenQuestionIds: updatedSeen,
        questionHistory: {
          ...history,
          [currentQ.id]: {
            count: prevEntry.count + 1,
            lastSeen: Date.now(),
            wasCorrect: isCorrect
          }
        }
      };
    });

    if (isCorrect) {
      // Player attack animation
      setIsPlayerAttacking(true);
      setActiveProjectile({ 
        emoji: isRidheya ? '⚡' : '✨', 
        color: 'from-amber-400 to-yellow-300' 
      });
      sound.playPokemonAttack();

      setDialogueText(`${trainerName} gebruikt ${currentQ.moveType}: "${currentQ.options[idx]}"!`);

      setTimeout(() => {
        setIsPlayerAttacking(false);
        setActiveProjectile(null);
        setIsBossDamaged(true);
        sound.playPokemonSuperEffective();

        const damage = Math.ceil(100 / activeQuestions.length);
        const newBossHp = Math.max(0, bossHp - damage);
        setBossHp(newBossHp);
        
        setFloatingCombatText({
          text: `SUPER EFFECTIEF! -${damage} HP 💥`,
          type: 'super',
          id: Date.now()
        });

        setDialogueText(`Het is SUPER EFFECTIEF! ${currentBoss.name} verliest ${damage} HP!`);

        setTimeout(() => {
          setIsBossDamaged(false);
        }, 600);

        if (newBossHp === 0) {
          setTimeout(() => {
            setIsDefeated(true);
            sound.playPokemonFaint();
            sound.playVictory();
            confetti({ particleCount: 120, spread: 85, origin: { y: 0.6 } });
            setDialogueText(currentBoss.defeatDialogue);

            onUpdateProfile(prev => ({
              ...prev,
              stars: prev.stars + 60,
              score: prev.score + 150,
              mastery: {
                ...prev.mastery,
                grammar: Math.min(100, prev.mastery.grammar + 6),
                spelling: Math.min(100, prev.mastery.spelling + 6)
              }
            }));
          }, 800);
        }
      }, 650);

    } else {
      // Incorrect answer: Boss retaliates
      sound.playPokemonHit();
      setIsBossAttacking(true);
      setDialogueText(`${trainerName} koos "${currentQ.options[idx]}", maar dat mist precisie! ${currentBoss.name} slaat terug!`);

      setTimeout(() => {
        setIsBossAttacking(false);
        setIsPlayerDamaged(true);
        sound.playIncorrect();

        const playerDamage = 25;
        setPlayerHp(prev => Math.max(15, prev - playerDamage));

        setFloatingCombatText({
          text: `MIS! Schild geraakt! 🛡️`,
          type: 'miss',
          id: Date.now()
        });

        setTimeout(() => {
          setIsPlayerDamaged(false);
        }, 500);
      }, 650);
    }

    // Start auto-advance countdown (3.2 seconds) so the battle progresses automatically without getting stuck
    setCountdownSeconds(3);
    let secondsLeft = 3;
    
    countdownIntervalRef.current = setInterval(() => {
      secondsLeft -= 1;
      setCountdownSeconds(secondsLeft);
      if (secondsLeft <= 0 && countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    }, 1000);

    timerRef.current = setTimeout(() => {
      handleNextTurn();
    }, 3200);
  };

  const handleNextTurn = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    sound.playPokemonMenuSelect();

    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setFloatingCombatText(null);
      setDialogueText(`Wat gaat ${isRidheya ? 'Ridheya' : 'Hemali'} doen?`);
    } else {
      // Reached end of questions for this battle
      if (bossHp <= 25) {
        // Count as defeat if boss is critically low
        setIsDefeated(true);
        sound.playPokemonFaint();
        sound.playVictory();
        confetti({ particleCount: 100, spread: 80 });
      } else {
        // Rematch or load fresh questions
        loadBossBattleQuestions((selectedBossIndex + 1) % ALL_BOSS_PROFILES.length);
      }
    }
  };

  const handleUsePotion = () => {
    sound.playStar();
    setPlayerHp(100);
    setDialogueText(`🎒 Je gebruikte een Grammatica Potion! HP is weer 100%!`);
  };

  const handleCompanionCheer = () => {
    sound.playAnimalHappy('owl');
    setDialogueText(`🦉 Professor Ollie roept: "Onthoud de tip: ${currentQ.subjectHint}!"`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto font-sans">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="bg-slate-900 rounded-3xl w-full max-w-4xl shadow-2xl border-4 border-amber-400/60 overflow-hidden flex flex-col text-white max-h-[96vh] relative"
      >
        {/* TOP RETRO POKÉMON BANNER */}
        <div className="bg-slate-950 px-4 py-2.5 border-b-2 border-amber-500/40 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xl animate-pulse">🔴</span>
            <div className="flex items-center gap-1.5">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
                POKÉ-DUEL ARENA
              </span>
              <span className="text-xs font-bold text-slate-300 hidden sm:inline">
                Taalmeester Boss Battles
              </span>
            </div>
          </div>

          {/* Quick Boss Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-[55%] sm:max-w-none">
            {ALL_BOSS_PROFILES.map((boss, bIdx) => (
              <button
                key={boss.id}
                onClick={() => handleSelectBoss(bIdx)}
                className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap border ${
                  selectedBossIndex === bIdx
                    ? 'bg-amber-400 text-slate-950 border-amber-300 scale-105 shadow-md'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span>{boss.emoji}</span>
                <span className="hidden md:inline">{boss.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-rose-900/80 text-white flex items-center justify-center transition-all cursor-pointer border border-slate-700 active:scale-90"
            title="Sluit Arena"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* POKÉMON BATTLEFIELD STAGE (ISOMETRIC 3D SCENE) */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className={`relative min-h-[280px] sm:min-h-[340px] bg-gradient-to-b ${currentBoss.bgGradient} p-4 sm:p-6 overflow-hidden flex flex-col justify-between select-none border-b-4 border-slate-950`}>
          
          {/* Subtle battle grid & particles */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />

          {/* ────────────────────────────────────────────────────────── */}
          {/* TOP SECTION: OPPONENT BOSS HUD (LEFT) & SPRITE (RIGHT)     */}
          {/* ────────────────────────────────────────────────────────── */}
          <div className="flex items-start justify-between gap-4 z-10">
            
            {/* Boss Pokémon HUD Box (Top Left) */}
            <motion.div 
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-slate-950/90 border-2 border-slate-700 rounded-2xl p-3 sm:p-3.5 shadow-2xl backdrop-blur-md w-60 sm:w-72"
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-black text-xs sm:text-sm text-white tracking-wide">
                    {currentBoss.name}
                  </span>
                  <div className="flex items-center gap-1">
                    {currentBoss.elementTypes.map((elem, eIdx) => (
                      <span key={eIdx} className={`${elem.bg} ${elem.text} text-[9px] font-black px-1.5 py-0.2 rounded`}>
                        {elem.name}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-[11px] font-black text-amber-400">
                  Lv.{currentBoss.level}
                </span>
              </div>

              {/* Boss HP Bar */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-400 bg-slate-800 px-1 rounded">HP</span>
                  <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700 p-0.5">
                    <motion.div
                      className={`h-full rounded-full transition-all duration-500 ${
                        bossHp > 50 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' :
                        bossHp > 20 ? 'bg-gradient-to-r from-amber-500 to-orange-400' :
                        'bg-gradient-to-r from-rose-600 to-red-500 animate-pulse'
                      }`}
                      animate={{ width: `${bossHp}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                  <span className="text-amber-300/90">{currentBoss.targetGrade}</span>
                  <span className="text-white font-mono">{bossHp} / 100 HP</span>
                </div>
              </div>
            </motion.div>

            {/* Boss Sprite & Pedestal (Top Right) */}
            <div className="relative flex flex-col items-center justify-center mr-2 sm:mr-8">
              {/* Boss 3D Ellipse Battle Platform */}
              <div className={`w-36 sm:w-48 h-12 sm:h-16 rounded-[100%] bg-gradient-to-r ${currentBoss.platformGradient} opacity-80 shadow-2xl border border-white/20 blur-[0.5px] translate-y-8`} />

              {/* Boss Animated Sprite Avatar */}
              <motion.div
                animate={
                  isBossDamaged
                    ? { x: [-15, 15, -10, 10, 0], scale: [1.1, 0.9, 1.05, 1], filter: ['brightness(2) saturate(2)', 'brightness(1)'] }
                    : isBossAttacking
                    ? { x: [-30, -50, 0], scale: 1.15 }
                    : isDefeated
                    ? { y: [0, 40], rotate: [0, 90], opacity: [1, 0] }
                    : { y: [-6, 6, -6], rotate: [-1, 1, -1] }
                }
                transition={isDefeated ? { duration: 1.2 } : { repeat: isBossDamaged || isBossAttacking ? 0 : Infinity, duration: 3, ease: 'easeInOut' }}
                className="text-6xl sm:text-8xl relative z-10 drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)]"
              >
                {currentBoss.emoji}
              </motion.div>

              {/* Floating Combat Text Indicator */}
              <AnimatePresence>
                {floatingCombatText && (
                  <motion.div
                    key={floatingCombatText.id}
                    initial={{ y: 0, opacity: 0, scale: 0.5 }}
                    animate={{ y: -45, opacity: 1, scale: 1.2 }}
                    exit={{ opacity: 0 }}
                    className={`absolute -top-6 font-black text-sm sm:text-base px-3 py-1 rounded-xl shadow-2xl z-30 whitespace-nowrap border-2 ${
                      floatingCombatText.type === 'super'
                        ? 'bg-amber-400 border-yellow-200 text-slate-950'
                        : 'bg-rose-600 border-rose-300 text-white'
                    }`}
                  >
                    {floatingCombatText.text}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Projectile FX flying across arena */}
          <AnimatePresence>
            {activeProjectile && (
              <motion.div
                initial={{ x: '15%', y: '60%', scale: 0.5, opacity: 0 }}
                animate={{ x: '75%', y: '-30%', scale: 2.2, opacity: 1 }}
                exit={{ scale: 3, opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="absolute z-20 text-4xl pointer-events-none"
              >
                {activeProjectile.emoji}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ────────────────────────────────────────────────────────── */}
          {/* BOTTOM SECTION: PLAYER SPRITE (LEFT) & PLAYER HUD (RIGHT)  */}
          {/* ────────────────────────────────────────────────────────── */}
          <div className="flex items-end justify-between gap-4 z-10 mt-auto pt-2">
            
            {/* Player Trainer & Mascot Platform (Bottom Left) */}
            <div className="relative flex flex-col items-center justify-center ml-2 sm:ml-8">
              {/* Player 3D Ellipse Battle Platform */}
              <div className="w-36 sm:w-48 h-12 sm:h-16 rounded-[100%] bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 opacity-80 shadow-2xl border border-white/20 blur-[0.5px] translate-y-8" />

              {/* Trainer & Mascot Sprites */}
              <motion.div
                animate={
                  isPlayerAttacking
                    ? { x: [0, 40, 0], scale: 1.15 }
                    : isPlayerDamaged
                    ? { x: [-10, 10, -5, 5, 0], filter: ['brightness(1.8) contrast(1.5)', 'brightness(1)'] }
                    : { y: [4, -4, 4] }
                }
                transition={{ repeat: isPlayerAttacking || isPlayerDamaged ? 0 : Infinity, duration: 2.8, ease: 'easeInOut' }}
                className="flex items-end gap-1 relative z-10 drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)]"
              >
                {/* Trainer Avatar */}
                <div className="text-5xl sm:text-6xl">
                  {isRidheya ? '🩺' : '🎓'}
                </div>
                {/* Mascot Companion */}
                <div className="text-3xl sm:text-4xl -ml-2 mb-1 animate-bounce">
                  {isRidheya ? '🐶' : '🦉'}
                </div>
              </motion.div>
            </div>

            {/* Player Pokémon HUD Box (Bottom Right) */}
            <motion.div 
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-slate-950/90 border-2 border-emerald-500/50 rounded-2xl p-3 sm:p-3.5 shadow-2xl backdrop-blur-md w-60 sm:w-72"
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-black text-xs sm:text-sm text-emerald-300 tracking-wide flex items-center gap-1">
                  <span>{isRidheya ? 'RIDHEYA & KOPI' : 'HEMALI & OLLIE'}</span>
                </span>
                <span className="text-[11px] font-black text-emerald-400">
                  Lv.{isRidheya ? '50' : '75'}
                </span>
              </div>

              {/* Player HP Bar */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-400 bg-slate-800 px-1 rounded">HP</span>
                  <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700 p-0.5">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                      animate={{ width: `${playerHp}%` }}
                    />
                  </div>
                </div>
                
                {/* EXP / Stamina Bar */}
                <div className="flex items-center justify-between text-[9px] font-bold text-slate-400">
                  <div className="flex items-center gap-1.5 flex-1 mr-2">
                    <span className="text-amber-400 text-[8px]">EXP</span>
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400" style={{ width: `${playerExp}%` }} />
                    </div>
                  </div>
                  <span className="text-white font-mono text-[10px]">{playerHp} / 100 HP</span>
                </div>
              </div>
            </motion.div>

          </div>

        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* POKÉMON BATTLE CONTROL INTERFACE (BOTTOM CONSOLE)              */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="bg-slate-950 p-3.5 sm:p-4 border-t-2 border-slate-800 flex flex-col gap-3">
          
          {/* TYPEWRITER DIALOGUE BOX */}
          <div className="bg-slate-900/95 rounded-2xl p-3 sm:p-3.5 border-2 border-amber-400/40 shadow-inner flex items-center justify-between gap-3 min-h-[60px]">
            <div className="flex items-center gap-2.5">
              <span className="text-amber-400 text-lg animate-pulse flex-shrink-0">▶</span>
              <p className="text-xs sm:text-sm font-black text-white leading-relaxed">
                {dialogueText}
              </p>
            </div>

            <button
              onClick={() => speech.speak(dialogueText)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer flex-shrink-0"
              title="Lees gevechtsbericht voor"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* VICTORY STATE */}
          {isDefeated ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border-2 border-amber-400 rounded-2xl p-4 text-center space-y-3"
            >
              <div className="flex items-center justify-center gap-4 text-xs sm:text-sm font-black text-amber-300 flex-wrap">
                <span className="bg-amber-400/20 px-3 py-1 rounded-xl border border-amber-400/40">⭐ +60 Sterren</span>
                <span className="bg-amber-400/20 px-3 py-1 rounded-xl border border-amber-400/40">🪙 +150 Munten</span>
                <span className="bg-emerald-400/20 px-3 py-1 rounded-xl border border-emerald-400/40">📜 +6% Grammaticameesterschap</span>
              </div>
              <button
                onClick={() => handleSelectBoss((selectedBossIndex + 1) % ALL_BOSS_PROFILES.length)}
                className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 mx-auto"
              >
                <span>Volgende Baas Uitdagen</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <>
              {/* MOVE QUESTION PROMPT */}
              <div className="bg-slate-900 rounded-2xl p-3 sm:p-3.5 border border-slate-800 flex items-center justify-between gap-2 flex-wrap">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-indigo-600/30 text-indigo-300 text-[10px] font-black px-2 py-0.5 rounded border border-indigo-400/30 uppercase">
                      {currentQ.categoryLabel}
                    </span>
                    <span className="text-[11px] font-bold text-amber-400">
                      Doel: <span className="underline italic">{currentQ.verbInfinitive}</span>
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-white">
                    "{currentQ.sentencePrompt}"
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-400 bg-slate-800 px-2 py-1 rounded-lg">
                    Aanval {currentQuestionIndex + 1}/{activeQuestions.length}
                  </span>
                </div>
              </div>

              {/* 4-QUADRANT POKÉMON MOVE & ACTION SELECTOR */}
              <div className="grid grid-cols-2 gap-2.5">
                {currentQ.options.map((opt, optIdx) => {
                  let btnStyle = 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-white hover:border-amber-400/60';
                  
                  if (isAnswerChecked) {
                    if (optIdx === currentQ.correctIndex) {
                      btnStyle = 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-300 text-white ring-2 ring-emerald-400 shadow-xl';
                    } else if (selectedOption === optIdx) {
                      btnStyle = 'bg-gradient-to-r from-rose-800 to-red-900 border-rose-400 text-rose-100 ring-2 ring-rose-400';
                    } else {
                      btnStyle = 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-40';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleCastSpell(optIdx)}
                      disabled={isAnswerChecked}
                      className={`p-3 sm:p-3.5 rounded-2xl border-2 font-black text-sm sm:text-base text-left transition-all flex items-center justify-between gap-2 cursor-pointer shadow-md active:scale-95 ${btnStyle}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 font-mono text-xs">#{optIdx + 1}</span>
                        <span>{opt}</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-black text-slate-400 uppercase bg-slate-800/80 px-1.5 py-0.5 rounded">
                          PP 15/15
                        </span>
                        {isAnswerChecked && optIdx === currentQ.correctIndex && (
                          <span className="text-[10px] bg-white text-emerald-950 px-1.5 py-0.5 rounded-full font-black">
                            ✓ Super
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* POST-ATTACK AUTO-ADVANCE & EXPLANATION BANNER */}
              {isAnswerChecked && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-indigo-950/80 border border-indigo-400/40 rounded-2xl p-3 space-y-2 shadow-lg"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-xs sm:text-sm font-semibold text-indigo-100 flex-1">
                      💡 <strong className="text-amber-300">Uitleg:</strong> {currentQ.explanation}
                    </p>
                    
                    {/* Instant Next Turn Button */}
                    <button
                      onClick={handleNextTurn}
                      className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 animate-pulse"
                    >
                      <span>Volgende Aanval</span>
                      <span className="text-[11px] opacity-80">({countdownSeconds}s)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-[11px] font-bold text-amber-200/90 bg-slate-950/60 p-2 rounded-xl border border-white/5">
                    📜 {currentQ.ruleTip}
                  </p>

                  {/* Visual auto-advance progress timer line */}
                  <div className="w-full bg-indigo-900/60 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-amber-400 h-full rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3.2, ease: 'linear' }}
                    />
                  </div>
                </motion.div>
              )}

              {/* RETRO ACTION BUTTONS: VECHT | RUGZAK | COMPANION | KIES BAAS */}
              {!isAnswerChecked && (
                <div className="grid grid-cols-4 gap-2 pt-1">
                  <button
                    onClick={() => {
                      sound.playPop();
                      setDialogueText(`Kies de juiste spelling/grammatica aanval hierboven!`);
                    }}
                    className="p-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:brightness-110 active:scale-95 shadow-md"
                  >
                    <Swords className="w-3.5 h-3.5" />
                    <span>VECHT</span>
                  </button>

                  <button
                    onClick={handleUsePotion}
                    className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:brightness-110 active:scale-95 shadow-md"
                  >
                    <Backpack className="w-3.5 h-3.5" />
                    <span>RUGZAK</span>
                  </button>

                  <button
                    onClick={handleCompanionCheer}
                    className="p-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:brightness-110 active:scale-95 shadow-md"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>HULP</span>
                  </button>

                  <button
                    onClick={() => handleSelectBoss((selectedBossIndex + 1) % ALL_BOSS_PROFILES.length)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 border border-slate-700"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>WISSEL</span>
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </motion.div>
    </div>
  );
};
