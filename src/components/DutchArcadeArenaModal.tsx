import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Zap, Sparkles, Heart, Trophy, Flame, RotateCcw, Award,
  Volume2, VolumeX, Play, Pause, Clock, Star, ShieldAlert,
  ChevronRight, ArrowRight, Gamepad2, Rocket, HelpCircle,
  Maximize2, Minimize2
} from 'lucide-react';
import { PlayerProfile } from '../types';
import { COMPREHENSIVE_SPELLING_FACTORY_ITEMS } from '../data/comprehensiveSpellingData';
import { sound } from '../services/soundService';
import { speech } from '../services/speechService';
import { useFullscreen } from '../hooks/useFullscreen';
import confetti from 'canvas-confetti';

interface DutchArcadeArenaModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
}

type ArcadeGameMode = 'hub' | 'bubble_pop' | 'syllable_blitz' | 'cito_turbo';

interface BubbleItem {
  id: string;
  text: string;
  type: 'correct' | 'distractor' | 'bomb' | 'clock' | 'star';
  x: number; // percentage 5 - 85
  y: number; // percentage from top 10 - 80
  speed: number;
  categoryName: string;
  points: number;
  popped?: boolean;
}

const BUBBLE_MISSIONS = [
  {
    title: '⚡ Dubbelzetters Klopjacht',
    targetRule: 'dubbelzetter',
    description: 'Pop alle woorden met een korte klank & dubbele medeklinker (-mm-, -ll-, -kk-, -nn-)!',
    correctWords: ['klimmen', 'savanne', 'vallen', 'kikkers', 'ballonnen', 'stoppen', 'kuddes', 'krokodillen', 'raketten'],
    distractorWords: ['bomen', 'slapen', 'jagers', 'vogels', 'kamelen', 'apen', 'bliksem', 'hond']
  },
  {
    title: '🌴 Klinkerdief Jacht',
    targetRule: 'klinkerdief',
    description: 'Pop alle woorden met een lange klank die een klinker verliest (bomen, slapen, apen)!',
    correctWords: ['bomen', 'slapen', 'jagers', 'vogels', 'kamelen', 'apen', 'olifanten'],
    distractorWords: ['klimmen', 'kikkers', 'vallen', 'stoppen', 'nacht', 'licht', 'schildpad']
  },
  {
    title: '🌙 Luchtwoorden Speurtocht',
    targetRule: 'luchtwoord',
    description: 'Pop alle woorden met korte klank + -cht (de ch van lucht)!',
    correctWords: ['nachtegaal', 'lichtflits', 'uitzicht', 'vrachtwagen', 'speurtocht', 'nacht', 'licht', 'zacht'],
    distractorWords: ['klimmen', 'bomen', 'hond', 'paard', 'kabeljauw', 'woestijn', 'strand']
  },
  {
    title: '🐢 Langermaakwoorden (-d/-t)',
    targetRule: 'langermaak',
    description: 'Pop alle woorden die eindigen op een -d omdat je die hoort als je het langer maakt!',
    correctWords: ['schildpad', 'hondenhok', 'luipaard', 'strandbal', 'arendsnest', 'olifantshuid', 'hond', 'paard'],
    distractorWords: ['kat', 'fiets', 'klimmen', 'bomen', 'slapen', 'nachtegaal']
  },
  {
    title: '🦊 Weetwoorden (ij/ei & au/ou)',
    targetRule: 'weetwoord',
    description: 'Pop alle weetwoorden met ij, ei, au of ou!',
    correctWords: ['woestijn', 'aardbei', 'kabeljauw', 'kabouter', 'ijs', 'trein', 'saus', 'hout'],
    distractorWords: ['bomen', 'klimmen', 'savanne', 'vallen', 'kikkers', 'schildpad']
  },
  {
    title: '🗺️ Cito Signaalwoorden Express',
    targetRule: 'signaalwoord',
    description: 'Pop alle Cito signaalwoorden die verbanden aangeven!',
    correctWords: ['desondanks', 'daardoor', 'echter', 'immers', 'bovendien', 'kortom', 'daarentegen', 'zodat'],
    distractorWords: ['olifant', 'klimmen', 'speeltuin', 'huis', 'rennen', 'bomen', 'leeuw']
  }
];

export interface CitoTurboQuestionItem {
  id: string;
  sentence: string;
  options: string[];
  correctIndex: number;
  rule: string;
  points: number;
}

const CITO_TURBO_RAW_QUESTIONS: CitoTurboQuestionItem[] = [
  {
    id: 'ct-echter-1',
    sentence: "Ridheya zocht naar haar vergrootglas, [...] vond ze een oud geheim kompas.",
    options: ["echter", "zodat", "omdat", "waardoor"],
    correctIndex: 0,
    rule: "Tegenstelling: 'echter' geeft een contrast of onverwachte wending aan.",
    points: 150
  },
  {
    id: 'ct-daardoor-2',
    sentence: "Het begon hevig te onweren in het oerwoud, [...] moesten de zussen snel schuilen.",
    options: ["daardoor", "desondanks", "hoewel", "tenzij"],
    correctIndex: 0,
    rule: "Oorzaak en gevolg: 'daardoor' verklaart het logische gevolg van het onweer.",
    points: 150
  },
  {
    id: 'ct-zodat-3',
    sentence: "Hemali bestudeerde de oude kaart, [...] ze precies wist waar de tempel lag.",
    options: ["zodat", "maar", "hoewel", "ondanks"],
    correctIndex: 0,
    rule: "Doel en gevolg: 'zodat' geeft aan wat het doel of bereikte resultaat is.",
    points: 150
  },
  {
    id: 'ct-desondanks-4',
    sentence: "De tocht was zwaar en steil, [...] gaven de twee zussen de moed niet op.",
    options: ["desondanks", "daarom", "want", "mits"],
    correctIndex: 0,
    rule: "Tegenstellend verband: 'desondanks' betekent 'toch' of 'ondanks dat'.",
    points: 200
  },
  {
    id: 'ct-omdat-5',
    sentence: "Ridheya hielp het kleine vosje, [...] het diertje verstrikt zat in de struiken.",
    options: ["omdat", "daardoor", "zodat", "echter"],
    correctIndex: 0,
    rule: "Redengevend verband: 'omdat' geeft de reden aan waarom Ridheya hielp.",
    points: 150
  },
  {
    id: 'ct-aangezien-6',
    sentence: "De zussen namen warme jassen mee, [...] het 's avonds erg koud werd op de savanne.",
    options: ["aangezien", "ondanks", "daarentegen", "hoewel"],
    correctIndex: 0,
    rule: "Redengevend verband: 'aangezien' verklaart de reden.",
    points: 150
  },
  {
    id: 'ct-verwijs-uil-7',
    sentence: "Hemali zag een wijze uil in de boom. **Zij** keek **hem** recht in de ogen. Wie is 'hem'?",
    options: ["de uil", "Hemali", "de boom", "de nacht"],
    correctIndex: 0,
    rule: "Verwijswoord: 'hem' verwijst naar de mannelijke uil.",
    points: 150
  },
  {
    id: 'ct-verwijs-water-8',
    sentence: "Ridheya gaf de leeuwin vers water. **Het dier** dronk **ervan** met grote teugen. Wat is 'ervan'?",
    options: ["van het water", "van de leeuwin", "van Ridheya", "van de beker"],
    correctIndex: 0,
    rule: "Verwijswoord: 'ervan' vervangt 'van het verse water'.",
    points: 150
  },
  {
    id: 'ct-daarentegen-9',
    sentence: "Ridheya rent graag door de regen. Hemali [...] leest liever een boek bij het haardvuur.",
    options: ["daarentegen", "daardoor", "zodoende", "bovendien"],
    correctIndex: 0,
    rule: "Contrast / Vergelijking: 'daarentegen' markeert het verschil tussen de twee zussen.",
    points: 175
  },
  {
    id: 'ct-immers-10',
    sentence: "De boot mocht niet uitvaren; de golven waren [...] metershoog door de noorderstorm.",
    options: ["immers", "desondanks", "hoewel", "tenzij"],
    correctIndex: 0,
    rule: "Redengevend: 'immers' betekent 'want' of 'zoals bekend'.",
    points: 175
  },
  {
    id: 'ct-tenzij-11',
    sentence: "We kunnen vanmiddag naar het strand, [...] het straks alsnog begint te stormen.",
    options: ["tenzij", "zodat", "omdat", "waardoor"],
    correctIndex: 0,
    rule: "Voorwaarde (ontkennend): 'tenzij' betekent 'behalve als'.",
    points: 200
  },
  {
    id: 'ct-mits-12',
    sentence: "Je mag het eeuwenoude manuscript vasthouden, [...] je eerst witte handschoenen aandoet.",
    options: ["mits", "echter", "hoewel", "desondanks"],
    correctIndex: 0,
    rule: "Voorwaarde (bevestigend): 'mits' betekent 'op voorwaarde dat'.",
    points: 200
  },
  {
    id: 'ct-bovendien-13',
    sentence: "Het museum was gratis toegankelijk. [...], kregen alle kinderen een speurtochtkaart mee.",
    options: ["Bovendien", "Daarentegen", "Desondanks", "Noch"],
    correctIndex: 0,
    rule: "Opsomming: 'bovendien' voegt extra informatie toe.",
    points: 150
  },
  {
    id: 'ct-hoewel-14',
    sentence: "[...] de zon fel scheen, voelde de poolwind ijzig koud aan.",
    options: ["Hoewel", "Doordat", "Zodat", "Aangezien"],
    correctIndex: 0,
    rule: "Toegevend / Tegenstellend: 'hoewel' verbindt twee tegengestelde feiten.",
    points: 175
  },
  {
    id: 'ct-verwijs-sleutel-15',
    sentence: "Hemali vond een antieke sleutel **waarmee** het mysterie werd opgelost. Wat is 'waarmee'?",
    options: ["met de sleutel", "met het mysterie", "met de kist", "met Hemali"],
    correctIndex: 0,
    rule: "Verwijswoord: 'waarmee' verwijst naar 'met de sleutel'.",
    points: 175
  },
  {
    id: 'ct-verwijs-dokters-16',
    sentence: "De dierenartsen verzorgden het gewonde hertje. **Zij** gaven **het** vers hooi en medicijnen. Wie is 'het'?",
    options: ["het hertje", "de dierenartsen", "het medicijn", "het hooi"],
    correctIndex: 0,
    rule: "Verwijswoord: 'het' (onzijdig enkelvoud) verwijst naar 'het hertje'.",
    points: 150
  }
];

function prepareShuffledTurboItem(rawQ: CitoTurboQuestionItem): CitoTurboQuestionItem {
  const correctAnswer = rawQ.options[rawQ.correctIndex];
  const shuffledOptions = [...rawQ.options];
  
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

export const DutchArcadeArenaModal: React.FC<DutchArcadeArenaModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile
}) => {
  const { isFullscreen, containerRef, toggleFullscreen } = useFullscreen<HTMLDivElement>();
  const [activeGame, setActiveGame] = useState<ArcadeGameMode>('hub');

  // Universal Arcade State
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [lives, setLives] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isFeverMode, setIsFeverMode] = useState(false);
  const [floatingScores, setFloatingScores] = useState<{ id: number; text: string; x: number; y: number; color: string }[]>([]);

  // High Scores in localStorage
  const [highScores, setHighScores] = useState<{ bubble: number; blitz: number; turbo: number }>(() => {
    try {
      const saved = localStorage.getItem(`arcade_hs_${profile.name || 'default'}`);
      return saved ? JSON.parse(saved) : { bubble: 0, blitz: 0, turbo: 0 };
    } catch {
      return { bubble: 0, blitz: 0, turbo: 0 };
    }
  });

  // Save High Scores
  const updateHighScore = (game: 'bubble' | 'blitz' | 'turbo', finalScore: number) => {
    setHighScores(prev => {
      const updated = { ...prev, [game]: Math.max(prev[game], finalScore) };
      try {
        localStorage.setItem(`arcade_hs_${profile.name || 'default'}`, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // -------------------------------------------------------------
  // GAME 1: BUBBLE POP BLITZ STATE
  // -------------------------------------------------------------
  const [bubbleMissionIdx, setBubbleMissionIdx] = useState(0);
  const [bubbles, setBubbles] = useState<BubbleItem[]>([]);
  const [bubbleTimeLeft, setBubbleTimeLeft] = useState(45);
  const bubbleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const bubbleSpawnRef = useRef<NodeJS.Timeout | null>(null);

  // -------------------------------------------------------------
  // GAME 2: SYLLABLE BLITZ STATE
  // -------------------------------------------------------------
  const [blitzQuestions, setBlitzQuestions] = useState(() => 
    COMPREHENSIVE_SPELLING_FACTORY_ITEMS.map(item => ({
      ...item,
      options: [...item.options].sort(() => Math.random() - 0.5)
    }))
  );
  const [blitzIdx, setBlitzIdx] = useState(0);
  const [blitzTimeLeft, setBlitzTimeLeft] = useState(15);
  const [blitzSelectedOpt, setBlitzSelectedOpt] = useState<string | null>(null);
  const [isBlitzRevealing, setIsBlitzRevealing] = useState(false);
  const [blitzTimedOut, setBlitzTimedOut] = useState(false);
  const blitzTimerRef = useRef<NodeJS.Timeout | null>(null);

  // -------------------------------------------------------------
  // GAME 3: CITO TURBO DASH STATE
  // -------------------------------------------------------------
  const [turboQuestions, setTurboQuestions] = useState<CitoTurboQuestionItem[]>(() => 
    CITO_TURBO_RAW_QUESTIONS.map(prepareShuffledTurboItem)
  );
  const [turboIdx, setTurboIdx] = useState(0);
  const [turboTimeLeft, setTurboTimeLeft] = useState(15);
  const [turboSelectedOpt, setTurboSelectedOpt] = useState<number | null>(null);
  const [isTurboRevealing, setIsTurboRevealing] = useState(false);
  const [turboTimedOut, setTurboTimedOut] = useState(false);
  const turboTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper: Trigger Floating Point Feedback
  const triggerFloatingScore = (text: string, x: number, y: number, color: string = 'text-amber-400') => {
    const id = Date.now() + Math.random();
    setFloatingScores(prev => [...prev.slice(-8), { id, text, x, y, color }]);
    setTimeout(() => {
      setFloatingScores(prev => prev.filter(f => f.id !== id));
    }, 1000);
  };

  // Award Coins and Stats
  const grantArcadeRewards = (earnedScore: number) => {
    const earnedCoins = Math.max(15, Math.round(earnedScore / 10));
    onUpdateProfile(prev => ({
      ...prev,
      score: prev.score + earnedScore,
      coins: prev.coins + earnedCoins,
      mastery: {
        ...prev.mastery,
        spelling: Math.min(100, prev.mastery.spelling + 3),
        readingFluency: Math.min(100, prev.mastery.readingFluency + 3)
      }
    }));
  };

  // -------------------------------------------------------------
  // BUBBLE POP LOGIC
  // -------------------------------------------------------------
  const currentBubbleMission = BUBBLE_MISSIONS[bubbleMissionIdx % BUBBLE_MISSIONS.length];

  const startBubbleGame = () => {
    setActiveGame('bubble_pop');
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setLives(3);
    setIsGameOver(false);
    setIsFeverMode(false);
    setBubbleTimeLeft(45);
    setBubbles([]);

    sound.playArcadePowerup();
    speech.speak(currentBubbleMission.description, { rate: 0.9 });

    // Spawn Initial Batch
    spawnInitialBubbles();
  };

  const spawnInitialBubbles = () => {
    const newBubbles: BubbleItem[] = [];
    const count = 6;
    for (let i = 0; i < count; i++) {
      newBubbles.push(createRandomBubble(i));
    }
    setBubbles(newBubbles);
  };

  const createRandomBubble = (seed: number = 0): BubbleItem => {
    // Escalating difficulty: every 7 spawn ticks (~11s) makes bombs more
    // frequent, from the base 12% up to 24% by the end of a 45s round.
    // (Bubbles themselves are static -- no speed/fall animation exists to
    // ramp up -- so bomb density is the real difficulty lever here.)
    const difficultyTier = Math.floor(seed / 7);
    const bombChance = Math.min(0.12 + difficultyTier * 0.03, 0.24);

    const rand = Math.random();
    const isSpecial = rand < 0.12;
    const isBomb = !isSpecial && rand > 1 - bombChance;

    let type: BubbleItem['type'] = 'correct';
    let text = '';
    let points = 100;

    if (isBomb) {
      type = 'bomb';
      text = '💣 BOEM!';
      points = -50;
    } else if (isSpecial) {
      if (Math.random() > 0.5) {
        type = 'clock';
        text = '⏱️ +5s';
        points = 50;
      } else {
        type = 'star';
        text = '⭐ SUPER';
        points = 250;
      }
    } else {
      const isCorrect = Math.random() > 0.45;
      if (isCorrect) {
        type = 'correct';
        const wordList = currentBubbleMission.correctWords;
        text = wordList[Math.floor(Math.random() * wordList.length)];
        points = 100;
      } else {
        type = 'distractor';
        const wordList = currentBubbleMission.distractorWords;
        text = wordList[Math.floor(Math.random() * wordList.length)];
        points = 0;
      }
    }

    return {
      id: `b-${Date.now()}-${Math.random()}`,
      text,
      type,
      x: 10 + Math.random() * 75,
      y: 15 + Math.random() * 65,
      speed: 1 + Math.random() * 1.5,
      categoryName: currentBubbleMission.targetRule,
      points
    };
  };

  // Bubble Game Loop Timer
  useEffect(() => {
    if (activeGame !== 'bubble_pop' || isGameOver) return;

    bubbleTimerRef.current = setInterval(() => {
      setBubbleTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(bubbleTimerRef.current!);
          clearInterval(bubbleSpawnRef.current!);
          handleEndGame('bubble');
          return 0;
        }
        if (prev <= 6) {
          sound.playArcadeTick();
        }
        return prev - 1;
      });
    }, 1000);

    // Escalating difficulty: the board gets busier over the round (more
    // bubbles allowed on screen at once, alongside the rising bomb chance
    // in createRandomBubble) -- was confirmed flat-difficulty the whole 45s
    // before this, since nothing changed with elapsed time.
    let spawnTicks = 0;
    bubbleSpawnRef.current = setInterval(() => {
      spawnTicks++;
      const difficultyTier = Math.floor(spawnTicks / 7);
      const maxOnScreen = Math.min(9 + difficultyTier, 12);
      setBubbles(prev => {
        if (prev.length < maxOnScreen) {
          return [...prev, createRandomBubble(spawnTicks)];
        }
        return prev;
      });
    }, 1600);

    return () => {
      if (bubbleTimerRef.current) clearInterval(bubbleTimerRef.current);
      if (bubbleSpawnRef.current) clearInterval(bubbleSpawnRef.current);
    };
  }, [activeGame, isGameOver, bubbleMissionIdx]);

  const handlePopBubble = (bubble: BubbleItem, e: React.MouseEvent) => {
    if (isGameOver) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = rect.left + rect.width / 2;
    const clickY = rect.top;

    if (bubble.type === 'correct') {
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setMaxCombo(prev => Math.max(prev, nextCombo));

      const comboMult = nextCombo >= 5 ? 3 : nextCombo >= 3 ? 2 : 1;
      const pts = (isFeverMode ? bubble.points * 2 : bubble.points) * comboMult;
      
      setScore(prev => prev + pts);
      sound.playArcadeCombo(nextCombo);

      if (nextCombo === 5) {
        setIsFeverMode(true);
        sound.playArcadeFever();
        confetti({ particleCount: 50, spread: 60 });
        setTimeout(() => setIsFeverMode(false), 8000);
      }

      triggerFloatingScore(`+${pts} (${comboMult}x)!`, clickX, clickY, 'text-emerald-400 font-black');
    } else if (bubble.type === 'star') {
      sound.playStar();
      setScore(prev => prev + 300);
      triggerFloatingScore('+300 SUPER! ⭐', clickX, clickY, 'text-amber-300 font-black');
      confetti({ particleCount: 30, spread: 40 });
    } else if (bubble.type === 'clock') {
      sound.playArcadePowerup();
      setBubbleTimeLeft(prev => prev + 5);
      triggerFloatingScore('+5s TIJD! ⏱️', clickX, clickY, 'text-cyan-300 font-black');
    } else if (bubble.type === 'bomb') {
      sound.playWrong();
      setCombo(0);
      setIsFeverMode(false);
      setScore(prev => Math.max(0, prev - 50));
      setLives(prev => {
        const nextLives = prev - 1;
        if (nextLives <= 0) {
          handleEndGame('bubble');
        }
        return Math.max(0, nextLives);
      });
      triggerFloatingScore('-50 💥 BOM!', clickX, clickY, 'text-rose-500 font-black');
    } else {
      // Distractor word
      sound.playWrong();
      setCombo(0);
      setIsFeverMode(false);
      setLives(prev => {
        const nextLives = prev - 1;
        if (nextLives <= 0) {
          handleEndGame('bubble');
        }
        return Math.max(0, nextLives);
      });
      triggerFloatingScore('MIS! (-1 ❤️)', clickX, clickY, 'text-red-400 font-bold');
    }

    // Remove popped bubble and spawn replacement
    setBubbles(prev => prev.filter(b => b.id !== bubble.id));
  };

  // -------------------------------------------------------------
  // SYLLABLE BLITZ LOGIC
  // -------------------------------------------------------------
  const currentBlitzItem = blitzQuestions[blitzIdx % blitzQuestions.length];

  const startSyllableBlitz = () => {
    setActiveGame('syllable_blitz');
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setLives(3);
    setIsGameOver(false);
    setIsFeverMode(false);
    setBlitzIdx(0);
    setBlitzSelectedOpt(null);
    setIsBlitzRevealing(false);
    setBlitzTimedOut(false);
    setBlitzTimeLeft(15);

    // Shuffle questions AND shuffle the 4 options for each question so correct answer is randomly placed
    const shuffled = [...COMPREHENSIVE_SPELLING_FACTORY_ITEMS]
      .sort(() => Math.random() - 0.5)
      .map(item => ({
        ...item,
        options: [...item.options].sort(() => Math.random() - 0.5)
      }));
    setBlitzQuestions(shuffled);

    sound.playArcadePowerup();
  };

  useEffect(() => {
    if (activeGame !== 'syllable_blitz' || isGameOver || isBlitzRevealing) return;

    blitzTimerRef.current = setInterval(() => {
      setBlitzTimeLeft(prev => {
        if (prev <= 1) {
          // Timeout on this question
          handleBlitzTimeout();
          return 0;
        }
        if (prev <= 3) {
          sound.playArcadeTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (blitzTimerRef.current) clearInterval(blitzTimerRef.current);
    };
  }, [activeGame, blitzIdx, isGameOver, isBlitzRevealing]);

  const handleBlitzTimeout = () => {
    if (isBlitzRevealing) return;
    if (blitzTimerRef.current) clearInterval(blitzTimerRef.current);

    sound.playWrong();
    setCombo(0);
    setIsFeverMode(false);
    setBlitzTimedOut(true);
    setIsBlitzRevealing(true);

    setLives(prev => {
      const nextLives = prev - 1;
      if (nextLives <= 0) {
        setTimeout(() => handleEndGame('blitz'), 1500);
      }
      return Math.max(0, nextLives);
    });

    // Show correct answer for 1500ms before moving to next question
    setTimeout(() => {
      setBlitzSelectedOpt(null);
      setIsBlitzRevealing(false);
      setBlitzTimedOut(false);
      setBlitzIdx(prev => prev + 1);
      setBlitzTimeLeft(15);
    }, 1500);
  };

  const handleSelectBlitzOption = (opt: string, e: React.MouseEvent) => {
    if (isGameOver || isBlitzRevealing || blitzSelectedOpt !== null) return;
    if (blitzTimerRef.current) clearInterval(blitzTimerRef.current);

    setBlitzSelectedOpt(opt);
    setIsBlitzRevealing(true);

    const correctSyllable = currentBlitzItem.syllables[currentBlitzItem.missingIndex];
    const isCorrect = opt === correctSyllable;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = rect.left + rect.width / 2;
    const clickY = rect.top;

    if (isCorrect) {
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setMaxCombo(prev => Math.max(prev, nextCombo));

      const comboMult = nextCombo >= 5 ? 3 : nextCombo >= 3 ? 2 : 1;
      const pts = (isFeverMode ? 300 : 150) * comboMult;
      setScore(prev => prev + pts);
      sound.playArcadeCombo(nextCombo);

      if (nextCombo === 5) {
        setIsFeverMode(true);
        sound.playArcadeFever();
        confetti({ particleCount: 60, spread: 70 });
        setTimeout(() => setIsFeverMode(false), 7000);
      }

      triggerFloatingScore(`+${pts} XP! 🔥`, clickX, clickY, 'text-emerald-400 font-black');
    } else {
      sound.playWrong();
      setCombo(0);
      setIsFeverMode(false);
      setLives(prev => {
        const nextLives = prev - 1;
        if (nextLives <= 0) {
          setTimeout(() => handleEndGame('blitz'), 1500);
        }
        return Math.max(0, nextLives);
      });
      triggerFloatingScore('FOUT! (-1 ❤️)', clickX, clickY, 'text-rose-400 font-bold');
    }

    // Show correct answer clearly for 1500ms before advancing
    setTimeout(() => {
      setBlitzSelectedOpt(null);
      setIsBlitzRevealing(false);
      setBlitzTimedOut(false);
      setBlitzIdx(prev => prev + 1);
      setBlitzTimeLeft(15);
    }, 1500);
  };

  // -------------------------------------------------------------
  // CITO TURBO DASH LOGIC
  // -------------------------------------------------------------
  const currentTurboItem = turboQuestions[turboIdx % turboQuestions.length] || turboQuestions[0];

  const startCitoTurbo = () => {
    setActiveGame('cito_turbo');
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setLives(3);
    setIsGameOver(false);
    setIsFeverMode(false);
    setTurboIdx(0);
    setTurboSelectedOpt(null);
    setIsTurboRevealing(false);
    setTurboTimedOut(false);
    setTurboTimeLeft(15);

    // Prioritize unseen questions from profile.seenQuestionIds across sessions
    const seenSet = new Set(profile.seenQuestionIds || []);
    const unseen = CITO_TURBO_RAW_QUESTIONS.filter(q => !seenSet.has(q.id));
    const seen = CITO_TURBO_RAW_QUESTIONS.filter(q => seenSet.has(q.id));
    
    const shuffledCombined = [
      ...[...unseen].sort(() => Math.random() - 0.5),
      ...[...seen].sort(() => Math.random() - 0.5)
    ];

    // For EACH question, Fisher-Yates shuffle the options so the correct answer is randomly distributed
    const prepared = shuffledCombined.map(prepareShuffledTurboItem);
    setTurboQuestions(prepared);

    sound.playArcadePowerup();
  };

  useEffect(() => {
    if (activeGame !== 'cito_turbo' || isGameOver || isTurboRevealing) return;

    turboTimerRef.current = setInterval(() => {
      setTurboTimeLeft(prev => {
        if (prev <= 1) {
          handleTurboTimeout();
          return 0;
        }
        if (prev <= 4) {
          sound.playArcadeTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (turboTimerRef.current) clearInterval(turboTimerRef.current);
    };
  }, [activeGame, turboIdx, isGameOver, isTurboRevealing]);

  const handleTurboTimeout = () => {
    if (isTurboRevealing) return;
    if (turboTimerRef.current) clearInterval(turboTimerRef.current);

    sound.playWrong();
    setCombo(0);
    setIsFeverMode(false);
    setTurboTimedOut(true);
    setIsTurboRevealing(true);

    setLives(prev => {
      const nextLives = prev - 1;
      if (nextLives <= 0) {
        setTimeout(() => handleEndGame('turbo'), 1600);
      }
      return Math.max(0, nextLives);
    });

    // Show correct answer for 1600ms before advancing
    setTimeout(() => {
      setTurboSelectedOpt(null);
      setIsTurboRevealing(false);
      setTurboTimedOut(false);
      setTurboIdx(prev => prev + 1);
      setTurboTimeLeft(15);
    }, 1600);
  };

  const handleSelectTurboOption = (optIdx: number, e: React.MouseEvent) => {
    if (isGameOver || isTurboRevealing || turboSelectedOpt !== null) return;
    if (turboTimerRef.current) clearInterval(turboTimerRef.current);

    setTurboSelectedOpt(optIdx);
    setIsTurboRevealing(true);

    const isCorrect = optIdx === currentTurboItem.correctIndex;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = rect.left + rect.width / 2;
    const clickY = rect.top;

    // Record answered question in profile seenQuestionIds for cross-session progression
    if (currentTurboItem?.id) {
      onUpdateProfile(prev => {
        const currentSeen = prev.seenQuestionIds || [];
        if (currentSeen.includes(currentTurboItem.id)) return prev;
        return {
          ...prev,
          seenQuestionIds: [...currentSeen, currentTurboItem.id]
        };
      });
    }

    if (isCorrect) {
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setMaxCombo(prev => Math.max(prev, nextCombo));

      const comboMult = nextCombo >= 4 ? 3 : nextCombo >= 2 ? 2 : 1;
      const pts = currentTurboItem.points * comboMult * (isFeverMode ? 2 : 1);
      setScore(prev => prev + pts);
      sound.playArcadeCombo(nextCombo);

      if (nextCombo === 4) {
        setIsFeverMode(true);
        sound.playArcadeFever();
        confetti({ particleCount: 70, spread: 80 });
        setTimeout(() => setIsFeverMode(false), 8000);
      }

      triggerFloatingScore(`+${pts} CITO TURBO! 🚀`, clickX, clickY, 'text-cyan-300 font-black');
    } else {
      sound.playWrong();
      setCombo(0);
      setIsFeverMode(false);
      setLives(prev => {
        const nextLives = prev - 1;
        if (nextLives <= 0) {
          setTimeout(() => handleEndGame('turbo'), 1600);
        }
        return Math.max(0, nextLives);
      });
      triggerFloatingScore('FOUT! (-1 ❤️)', clickX, clickY, 'text-rose-400 font-bold');
    }

    // Show correct answer for 1600ms before advancing
    setTimeout(() => {
      setTurboSelectedOpt(null);
      setIsTurboRevealing(false);
      setTurboTimedOut(false);
      setTurboIdx(prev => prev + 1);
      setTurboTimeLeft(15);
    }, 1600);
  };

  // Universal End Game Handler
  const handleEndGame = (game: 'bubble' | 'blitz' | 'turbo') => {
    setIsGameOver(true);
    sound.playVictory();
    confetti({ particleCount: 120, spread: 100, origin: { y: 0.6 } });
    grantArcadeRewards(score);
    updateHighScore(game, score);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-2 sm:p-4'} bg-slate-950/85 backdrop-blur-md overflow-hidden`}>
      {/* Floating Scores Overlay */}
      {floatingScores.map(f => (
        <motion.div
          key={f.id}
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={{ opacity: 0, y: -45, scale: 1.3 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{ position: 'fixed', left: f.x, top: f.y, pointerEvents: 'none', zIndex: 100 }}
          className={`text-xl sm:text-2xl font-black drop-shadow-md ${f.color}`}
        >
          {f.text}
        </motion.div>
      ))}

      <motion.div
        ref={containerRef}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className={`bg-slate-900 text-white ${
          isFullscreen
            ? 'w-full h-full max-w-none max-h-none rounded-none border-0'
            : 'w-full max-w-3xl rounded-3xl shadow-2xl border-2 border-indigo-500/50 max-h-[95vh]'
        } overflow-hidden flex flex-col relative`}
      >
        {/* Neon Arcade Banner */}
        <div className={`p-3.5 sm:p-4 flex items-center justify-between transition-colors ${
          isFeverMode
            ? 'bg-gradient-to-r from-amber-500 via-rose-600 to-indigo-600 animate-pulse'
            : 'bg-gradient-to-r from-indigo-950 via-purple-900 to-slate-950 border-b border-indigo-500/30'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-2xl shadow-inner animate-bounce-short">
              🕹️
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black tracking-wider uppercase text-cyan-300">
                  Safari Arcade Arena
                </h3>
                {isFeverMode && (
                  <span className="text-[10px] font-black uppercase bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full shadow-lg animate-bounce">
                    ⚡ FEVER MODE (3x PUNTEN!)
                  </span>
                )}
                {combo > 1 && (
                  <span className="text-[10px] font-black bg-rose-500 text-white px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    <Flame className="w-3 h-3 text-amber-300" />
                    {combo}x Reeks!
                  </span>
                )}
              </div>
              <p className="text-xs text-indigo-200">
                Snelle reflexen, klankgroepen, spellingregels &amp; Cito records
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeGame !== 'hub' && (
              <button
                onClick={() => {
                  sound.playPop();
                  setActiveGame('hub');
                }}
                className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 cursor-pointer transition-colors"
              >
                Menu
              </button>
            )}
            <button
              onClick={toggleFullscreen}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-all"
              title={isFullscreen ? 'Verlaat Volledig Scherm' : 'Volledig Scherm'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                speech.stop();
                onClose();
              }}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Arcade Status Bar (When in a game) */}
        {activeGame !== 'hub' && (
          <div className="bg-slate-950 px-4 py-2 flex items-center justify-between border-b border-indigo-500/20 text-xs font-mono">
            {/* Lives */}
            <div className="flex items-center gap-1">
              <span className="text-slate-400 font-bold mr-1">LEVENS:</span>
              {[1, 2, 3].map(heartIdx => (
                <Heart
                  key={heartIdx}
                  className={`w-4 h-4 transition-all ${
                    heartIdx <= lives
                      ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)] scale-110'
                      : 'text-slate-700 fill-slate-800'
                  }`}
                />
              ))}
            </div>

            {/* Timer */}
            <div className="flex items-center gap-1.5 font-bold">
              <Clock className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
              <span className="text-cyan-300">
                TIJD: {activeGame === 'bubble_pop' ? `${bubbleTimeLeft}s` : activeGame === 'syllable_blitz' ? `${blitzTimeLeft}s` : `${turboTimeLeft}s`}
              </span>
            </div>

            {/* Live Score */}
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-black text-sm tracking-wider">
                {score.toLocaleString()} PTS
              </span>
            </div>
          </div>
        )}

        {/* Content Container */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col justify-between">
          
          {/* ========================================================= */}
          {/* 1. ARCADE HUB / GAME SELECTOR */}
          {/* ========================================================= */}
          {activeGame === 'hub' && (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <h4 className="text-xl sm:text-2xl font-black text-white">
                  Kies Jouw Arcade Uitdaging 🚀
                </h4>
                <p className="text-xs sm:text-sm text-indigo-300 max-w-md mx-auto">
                  Speel tegen de klok, bouw supercombo's en verbreek je persoonlijke highscores!
                </p>
              </div>

              {/* Game Mode Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Mode 1: Bubble Pop Blitz */}
                <div
                  onClick={startBubbleGame}
                  className="bg-gradient-to-br from-indigo-900/60 to-purple-950/80 p-5 rounded-3xl border-2 border-indigo-500/40 hover:border-cyan-400 cursor-pointer transition-all hover:scale-103 group shadow-xl relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute top-2 right-2 text-2xl group-hover:scale-125 transition-transform">
                    🎈
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800">
                      Reflex &amp; Klanken
                    </span>
                    <h5 className="text-lg font-black text-white group-hover:text-cyan-300">
                      Klank Ballon Popper
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Pop alle juiste categorie-ballonnen (dubbelzetters, klinkerdieven, luchtwoorden) en ontwijk bommen!
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-indigo-800/40 flex items-center justify-between text-xs">
                    <span className="text-amber-400 font-bold">🏆 HS: {highScores.bubble}</span>
                    <span className="text-cyan-300 font-black flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Speel ➔
                    </span>
                  </div>
                </div>

                {/* Mode 2: Syllable Meteor Rush */}
                <div
                  onClick={startSyllableBlitz}
                  className="bg-gradient-to-br from-purple-900/60 to-pink-950/80 p-5 rounded-3xl border-2 border-purple-500/40 hover:border-pink-400 cursor-pointer transition-all hover:scale-103 group shadow-xl relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute top-2 right-2 text-2xl group-hover:scale-125 transition-transform">
                    ⚡
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-pink-400 bg-pink-950/80 px-2 py-0.5 rounded-full border border-pink-800">
                      Rapid Fire Spelling
                    </span>
                    <h5 className="text-lg font-black text-white group-hover:text-pink-300">
                      Woord Meteor Sprint
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Kies in 15 seconden het ontbrekende lettergreeptype! Schiet raketten en activeer Fever Mode!
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-purple-800/40 flex items-center justify-between text-xs">
                    <span className="text-amber-400 font-bold">🏆 HS: {highScores.blitz}</span>
                    <span className="text-pink-300 font-black flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Speel ➔
                    </span>
                  </div>
                </div>

                {/* Mode 3: Cito Turbo Dash */}
                <div
                  onClick={startCitoTurbo}
                  className="bg-gradient-to-br from-emerald-900/60 to-teal-950/80 p-5 rounded-3xl border-2 border-emerald-500/40 hover:border-emerald-300 cursor-pointer transition-all hover:scale-103 group shadow-xl relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute top-2 right-2 text-2xl group-hover:scale-125 transition-transform">
                    🏎️
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                      Begrijpend Lezen &amp; Cito
                    </span>
                    <h5 className="text-lg font-black text-white group-hover:text-emerald-300">
                      Cito Turbo Dash
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Snelheidsrace met 15-seconden timer voor signaalwoorden (desondanks, daardoor, echter) en verwijswoorden!
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-emerald-800/40 flex items-center justify-between text-xs">
                    <span className="text-amber-400 font-bold">🏆 HS: {highScores.turbo}</span>
                    <span className="text-emerald-300 font-black flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Speel ➔
                    </span>
                  </div>
                </div>
              </div>

              {/* Player Trophy & Arcade Stats Banner */}
              <div className="bg-slate-950/80 p-4 rounded-3xl border border-indigo-500/30 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center text-xl">
                    🏆
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400">Arcade Kampioen</span>
                    <h6 className="text-sm font-black text-white">{profile.name || 'Speler'}</h6>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold">
                  <div>
                    <span className="text-slate-400 block">Totale Score</span>
                    <span className="text-amber-400 font-black text-base">{profile.score} 🌟</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Arcade Munten</span>
                    <span className="text-emerald-400 font-black text-base">{profile.coins} 🪙</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. GAME: BUBBLE POP BLITZ */}
          {/* ========================================================= */}
          {activeGame === 'bubble_pop' && !isGameOver && (
            <div className="flex-1 flex flex-col justify-between space-y-3">
              {/* Mission Header */}
              <div className="bg-indigo-950/90 p-3 rounded-2xl border border-cyan-500/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-wide block">
                    {currentBubbleMission.title}
                  </span>
                  <p className="text-xs text-white font-bold">
                    {currentBubbleMission.description}
                  </p>
                </div>
                <button
                  onClick={() => {
                    sound.playPop();
                    speech.speak(currentBubbleMission.description);
                  }}
                  className="p-2 rounded-xl bg-indigo-800 hover:bg-indigo-700 text-cyan-300 cursor-pointer"
                  title="Lees regel voor"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Floating Bubble Stage */}
              <div className="relative w-full h-[320px] sm:h-[360px] bg-slate-950/90 rounded-3xl border-2 border-indigo-500/30 overflow-hidden shadow-inner flex items-center justify-center">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 pointer-events-none" />

                {bubbles.map(b => {
                  let bubbleBg = 'bg-gradient-to-br from-indigo-500/80 to-purple-600/90 border-indigo-300 text-white';
                  if (b.type === 'bomb') {
                    bubbleBg = 'bg-gradient-to-br from-red-600 to-rose-900 border-red-400 text-white animate-pulse';
                  } else if (b.type === 'star') {
                    bubbleBg = 'bg-gradient-to-br from-amber-400 to-yellow-600 border-amber-200 text-slate-950 font-black animate-bounce-short';
                  } else if (b.type === 'clock') {
                    bubbleBg = 'bg-gradient-to-br from-cyan-400 to-teal-600 border-cyan-200 text-slate-950 font-black animate-pulse';
                  }

                  return (
                    <motion.button
                      key={b.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        opacity: 1,
                        y: [0, -8, 0]
                      }}
                      transition={{ 
                        y: { repeat: Infinity, duration: 2 + Math.random(), ease: 'easeInOut' } 
                      }}
                      onClick={(e) => handlePopBubble(b, e)}
                      style={{
                        position: 'absolute',
                        left: `${b.x}%`,
                        top: `${b.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-full border-2 text-xs sm:text-sm font-black shadow-lg cursor-pointer transition-all active:scale-90 hover:scale-110 z-10 select-none ${bubbleBg}`}
                    >
                      {b.text}
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>🎯 Tik snel op de juiste woorden om combo's te bouwen!</span>
                <span>Ontwijk 💣 bommen!</span>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. GAME: SYLLABLE METEOR RUSH */}
          {/* ========================================================= */}
          {activeGame === 'syllable_blitz' && !isGameOver && (
            <div className="flex-1 flex flex-col justify-between space-y-4">
              {/* Progress & Category */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-pink-400 uppercase tracking-wide">
                  {currentBlitzItem.categoryLabel || 'Spelling Fabriek Rush'}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Woord #{blitzIdx + 1}
                </span>
              </div>

              {/* Word Console */}
              <div className="bg-slate-950 p-5 sm:p-6 rounded-3xl border-2 border-pink-500/40 flex flex-col items-center justify-center gap-3.5 shadow-2xl relative">
                <div className="text-3xl">{currentBlitzItem.emoji || '🚀'}</div>
                
                {/* Syllables */}
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  {currentBlitzItem.syllables.map((syl, sIdx) => {
                    const isMissing = sIdx === currentBlitzItem.missingIndex;
                    const correctSyllable = currentBlitzItem.syllables[currentBlitzItem.missingIndex];
                    let boxStyle = 'bg-slate-800 border-slate-600 text-white';

                    if (isMissing) {
                      if (isBlitzRevealing) {
                        if (blitzSelectedOpt === correctSyllable) {
                          boxStyle = 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-300 text-white scale-110 shadow-lg ring-2 ring-emerald-300';
                        } else {
                          boxStyle = 'bg-gradient-to-r from-amber-500 to-emerald-600 border-emerald-300 text-white scale-110 shadow-lg ring-2 ring-emerald-400';
                        }
                      } else {
                        boxStyle = 'bg-pink-900/60 border-dashed border-pink-400 text-pink-300 animate-pulse';
                      }
                    }

                    return (
                      <div
                        key={sIdx}
                        className={`h-14 px-4 min-w-[56px] rounded-2xl border-2 flex items-center justify-center font-black text-xl sm:text-2xl transition-all shadow-md ${boxStyle}`}
                      >
                        {isMissing ? (isBlitzRevealing ? correctSyllable : '??') : syl}
                      </div>
                    );
                  })}
                </div>

                <p className="text-xs text-slate-300 italic text-center max-w-sm">
                  "{currentBlitzItem.exampleSentence}"
                </p>

                {/* Answer Reveal Feedback Banner */}
                {isBlitzRevealing && (
                  <div className={`w-full py-2 px-3 rounded-xl border text-center font-bold text-xs sm:text-sm animate-fade-in ${
                    blitzSelectedOpt === currentBlitzItem.syllables[currentBlitzItem.missingIndex]
                      ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200'
                      : blitzTimedOut
                        ? 'bg-amber-950/90 border-amber-400 text-amber-200'
                        : 'bg-rose-950/90 border-rose-400 text-rose-200'
                  }`}>
                    {blitzSelectedOpt === currentBlitzItem.syllables[currentBlitzItem.missingIndex] ? (
                      <span>✅ Juist! <strong>"{currentBlitzItem.syllables.join('')}"</strong> is correct gespeld!</span>
                    ) : blitzTimedOut ? (
                      <span>⏰ Tijd om! Het juiste antwoord was: <strong>"{currentBlitzItem.syllables[currentBlitzItem.missingIndex]}"</strong> ({currentBlitzItem.syllables.join('')})</span>
                    ) : (
                      <span>❌ Helaas! Het juiste antwoord is: <strong>"{currentBlitzItem.syllables[currentBlitzItem.missingIndex]}"</strong> ({currentBlitzItem.syllables.join('')})</span>
                    )}
                  </div>
                )}

                {/* Shrinking Time Bar */}
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
                  <motion.div
                    className={`h-full ${blitzTimeLeft <= 3 ? 'bg-rose-500' : 'bg-pink-500'}`}
                    animate={{ width: `${(blitzTimeLeft / 15) * 100}%` }}
                    transition={{ ease: 'linear', duration: 0.2 }}
                  />
                </div>
              </div>

              {/* 4 Arcade Option Buttons */}
              <div className="grid grid-cols-2 gap-3">
                {currentBlitzItem.options.map((opt, optIdx) => {
                  const correctSyllable = currentBlitzItem.syllables[currentBlitzItem.missingIndex];
                  const isCorrect = opt === correctSyllable;
                  const isChosen = opt === blitzSelectedOpt;

                  let btnStyle = 'border-purple-500/50 bg-gradient-to-r from-purple-900/80 to-indigo-900/80 hover:from-purple-800 hover:to-indigo-800 text-white';

                  if (isBlitzRevealing) {
                    if (isCorrect) {
                      btnStyle = 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-300 ring-2 ring-emerald-400 text-white scale-102 shadow-xl';
                    } else if (isChosen) {
                      btnStyle = 'bg-gradient-to-r from-rose-800 to-red-900 border-rose-400 ring-2 ring-rose-400 text-rose-100 shadow-md';
                    } else {
                      btnStyle = 'bg-slate-900/60 border-slate-700 text-slate-500 opacity-40';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={(e) => handleSelectBlitzOption(opt, e)}
                      disabled={isBlitzRevealing || blitzSelectedOpt !== null}
                      className={`p-3.5 sm:p-4 rounded-2xl border-2 font-black text-lg sm:text-xl cursor-pointer shadow-lg active:scale-95 transition-all text-center flex items-center justify-center gap-2 ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isBlitzRevealing && isCorrect && (
                        <span className="text-[11px] bg-white text-emerald-950 px-2 py-0.5 rounded-full font-black">
                          ✓ Juist!
                        </span>
                      )}
                      {isBlitzRevealing && isChosen && !isCorrect && (
                        <span className="text-[11px] bg-rose-950 text-rose-200 px-2 py-0.5 rounded-full font-bold">
                          ✗ Jouw keuze
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 4. GAME: CITO TURBO DASH */}
          {/* ========================================================= */}
          {activeGame === 'cito_turbo' && !isGameOver && (
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-400 uppercase tracking-wide">
                  Cito Signaalwoorden Turbo Track
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Track #{turboIdx + 1}
                </span>
              </div>

              {/* Question Dashboard */}
              <div className="bg-slate-950 p-5 sm:p-6 rounded-3xl border-2 border-emerald-500/40 space-y-3.5 shadow-2xl">
                <p className="text-base sm:text-lg font-black text-white text-center leading-relaxed">
                  "{currentTurboItem.sentence}"
                </p>

                {/* Answer Reveal Feedback Banner */}
                {isTurboRevealing && (
                  <div className={`w-full py-2.5 px-3 rounded-xl border text-center font-bold text-xs sm:text-sm animate-fade-in ${
                    turboSelectedOpt === currentTurboItem.correctIndex
                      ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200'
                      : turboTimedOut
                        ? 'bg-amber-950/90 border-amber-400 text-amber-200'
                        : 'bg-rose-950/90 border-rose-400 text-rose-200'
                  }`}>
                    {turboSelectedOpt === currentTurboItem.correctIndex ? (
                      <span>✅ Juist! <strong>"{currentTurboItem.options[currentTurboItem.correctIndex]}"</strong> ({currentTurboItem.rule})</span>
                    ) : turboTimedOut ? (
                      <span>⏰ Tijd om! Het juiste antwoord was: <strong>"{currentTurboItem.options[currentTurboItem.correctIndex]}"</strong> ({currentTurboItem.rule})</span>
                    ) : (
                      <span>❌ Helaas! Het juiste antwoord is: <strong>"{currentTurboItem.options[currentTurboItem.correctIndex]}"</strong> ({currentTurboItem.rule})</span>
                    )}
                  </div>
                )}

                {/* Shrinking Time Bar */}
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${turboTimeLeft <= 3 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                    animate={{ width: `${(turboTimeLeft / 15) * 100}%` }}
                    transition={{ ease: 'linear', duration: 0.2 }}
                  />
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-2 gap-3">
                {currentTurboItem.options.map((opt, optIdx) => {
                  const isCorrect = optIdx === currentTurboItem.correctIndex;
                  const isChosen = optIdx === turboSelectedOpt;

                  let btnStyle = 'border-emerald-500/50 bg-gradient-to-r from-emerald-950 to-teal-900 hover:from-emerald-900 hover:to-teal-800 text-white';

                  if (isTurboRevealing) {
                    if (isCorrect) {
                      btnStyle = 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-300 ring-2 ring-emerald-400 text-white scale-102 shadow-xl';
                    } else if (isChosen) {
                      btnStyle = 'bg-gradient-to-r from-rose-800 to-red-900 border-rose-400 ring-2 ring-rose-400 text-rose-100 shadow-md';
                    } else {
                      btnStyle = 'bg-slate-900/60 border-slate-700 text-slate-500 opacity-40';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={(e) => handleSelectTurboOption(optIdx, e)}
                      disabled={isTurboRevealing || turboSelectedOpt !== null}
                      className={`p-3.5 rounded-2xl border-2 font-black text-base sm:text-lg cursor-pointer shadow-lg active:scale-95 transition-all text-center flex items-center justify-center gap-2 ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isTurboRevealing && isCorrect && (
                        <span className="text-[11px] bg-white text-emerald-950 px-2 py-0.5 rounded-full font-black">
                          ✓ Juist!
                        </span>
                      )}
                      {isTurboRevealing && isChosen && !isCorrect && (
                        <span className="text-[11px] bg-rose-950 text-rose-200 px-2 py-0.5 rounded-full font-bold">
                          ✗ Jouw keuze
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 5. UNIVERSAL GAME OVER SUMMARY */}
          {/* ========================================================= */}
          {isGameOver && (
            <div className="p-6 text-center space-y-5">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400/20 border-2 border-amber-400/50 flex items-center justify-center text-4xl shadow-xl animate-bounce">
                🏆
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl font-black text-white">
                  Arcade Ronde Voltooid!
                </h4>
                <p className="text-sm text-indigo-200">
                  Geweldige reflexen en taalmeesterschap!
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                <div className="bg-slate-950 p-3 rounded-2xl border border-amber-500/40">
                  <span className="text-[10px] text-amber-300 font-bold uppercase block">Score</span>
                  <span className="text-xl font-black text-amber-400">{score}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-rose-500/40">
                  <span className="text-[10px] text-rose-300 font-bold uppercase block">Max Combo</span>
                  <span className="text-xl font-black text-rose-400">{maxCombo}x</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-emerald-500/40">
                  <span className="text-[10px] text-emerald-300 font-bold uppercase block">Munten</span>
                  <span className="text-xl font-black text-emerald-400">+{Math.round(score / 10)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <button
                  onClick={() => {
                    if (activeGame === 'bubble_pop') startBubbleGame();
                    else if (activeGame === 'syllable_blitz') startSyllableBlitz();
                    else if (activeGame === 'cito_turbo') startCitoTurbo();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Opnieuw Spelen</span>
                </button>

                <button
                  onClick={() => {
                    sound.playPop();
                    setActiveGame('hub');
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Andere Game Kiezen</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
};
