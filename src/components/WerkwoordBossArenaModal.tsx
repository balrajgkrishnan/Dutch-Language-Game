import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Zap, Shield, Sparkles, Heart, Trophy, Flame, RotateCcw, Award, CheckCircle2, HelpCircle } from 'lucide-react';
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

interface BossDuelQuestion {
  id: string;
  category: 'tt_dt' | 'ovt_kofschip' | 'vdw_dt' | 'leenwoorden' | 'onregelmatig';
  categoryLabel: string;
  sentencePrompt: string;
  verbInfinitive: string;
  subjectHint: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  ruleTip: string;
}

interface BossProfile {
  id: string;
  name: string;
  title: string;
  emoji: string;
  bgGradient: string;
  maxHp: number;
  dialogueIntro: string;
  defeatDialogue: string;
  questions: BossDuelQuestion[];
}

const BOSSES: BossProfile[] = [
  {
    id: 'dt-dragon',
    name: 'De DT-Draak Ignis',
    title: 'Heerser van de Tegenwoordige Tijd & Inversie',
    emoji: '🐉',
    bgGradient: 'from-red-900 via-amber-900 to-slate-950',
    maxHp: 100,
    dialogueIntro: 'Haha! Niemand weet wanneer er een T achter de stam moet! Durf jij het tegen mij op te nemen, Hemali?',
    defeatDialogue: 'Aaaargh! Jouw stam+t kennis is onverslaanbaar! De schat is van jou!',
    questions: [
      {
        id: 'dtd-1',
        category: 'tt_dt',
        categoryLabel: 'Tegenwoordige Tijd (Inversie)',
        sentencePrompt: '... jij morgen ook naar het grote Cito-oefenfeest? (komen)',
        verbInfinitive: 'komen',
        subjectHint: 'Onderwerp staat achter de persoonsvorm (jij-vorm inversie)',
        options: ['Kom', 'Komt', 'Komdt', 'Koomt'],
        correctIndex: 0,
        explanation: 'Bij de vraagvorm met "jij" achter de persoonsvorm krijg je alleen de stam: "Kom jij".',
        ruleTip: 'Regel: Bij persoonsvorm + jij/je (vraagvorm) valt de -t weg! (Loop jij, Vind jij).'
      },
      {
        id: 'dtd-2',
        category: 'tt_dt',
        categoryLabel: 'Tegenwoordige Tijd (Stam + t bij D-werkwoorden)',
        sentencePrompt: 'Mijn slimme zus Hemali ... elk moeilijk raadsel feilloos. (beantwoorden)',
        verbInfinitive: 'beantwoorden',
        subjectHint: 'Zij / Hemali (hij-vorm) = stam + t',
        options: ['beantwoord', 'beantwoordt', 'beantwoorde', 'beantwoort'],
        correctIndex: 1,
        explanation: 'Stam is "beantwoord" + t = "beantwoordt". Hemali is 3e persoon enkelvoud (zij).',
        ruleTip: 'Regel: In de tt is de hij/zij-vorm altijd stam + t. Stam eindigt op d? Dan schrijf je dt!'
      },
      {
        id: 'dtd-3',
        category: 'tt_dt',
        categoryLabel: 'Tegenwoordige Tijd (Verraderlijke je/jij)',
        sentencePrompt: '... je vader ook van spannende fantasyboeken? (houden)',
        verbInfinitive: 'houden',
        subjectHint: 'Let op: het onderwerp is "je vader" (hij), niet "je"!',
        options: ['Houd', 'Houdt', 'Hout', 'Houwdt'],
        correctIndex: 1,
        explanation: '"Je vader" = hij-vorm (3e persoon), dus stam + t: "Houdt je vader".',
        ruleTip: 'Valstrik: "Je" is hier een bezittelijk voornaamwoord (jouw vader = hij), dus wél stam + t!'
      }
    ]
  },
  {
    id: 'count-kofschip',
    name: 'Graaf \'t Kofschip',
    title: 'Kasteelheer van de Verleden Tijd (o.v.t.)',
    emoji: '🧛',
    bgGradient: 'from-purple-950 via-indigo-900 to-slate-950',
    maxHp: 100,
    dialogueIntro: 'Welkom in mijn kasteel! Weet jij of de verleden tijd op -te(n) of -de(n) eindigt?',
    defeatDialogue: 'Onmogelijk! Je hebt \'t Kofschip feilloos toegepast! Mijn vleermuizen buigen voor je!',
    questions: [
      {
        id: 'ck-1',
        category: 'ovt_kofschip',
        categoryLabel: 'Verleden Tijd (o.v.t. met V $\to$ F)',
        sentencePrompt: 'De familie van Ridheya en Hemali ... vorig jaar naar een nieuw huis. (verhuizen)',
        verbInfinitive: 'verhuizen',
        subjectHint: 'Stam van hele werkwoord min -en = verhuiz- (eindigt op Z)',
        options: ['verhuiste', 'verhuisde', 'verhuisden', 'is verhuist'],
        correctIndex: 1,
        explanation: 'Kijk naar het hele werkwoord: verhuizen min -en = verhuiz-. De "z" zit NIET in \'t kofschip, dus + de.',
        ruleTip: 'Regel: Kijk altijd naar de stam van het hele werkwoord (verhuizen - en = verhuiz-). Z niet in kofschip $\to$ -de!'
      },
      {
        id: 'ck-2',
        category: 'ovt_kofschip',
        categoryLabel: 'Verleden Tijd (o.v.t. met S-klank)',
        sentencePrompt: 'De dappere speurhond Kopi ... de hele middag door het bos. (fietsen / rennen)',
        verbInfinitive: 'fietsen',
        subjectHint: 'Stam van fietsen min -en = fiets- (eindigt op TS)',
        options: ['fietste', 'fietsde', 'fietsten', 'heeft gefietst'],
        correctIndex: 0,
        explanation: 'Fietsen min -en = fiets-. De "s" zit wél in \'t koFSChip, dus + te: "fietste".',
        ruleTip: 'Regel: Zit de laatste letter van de ruwe stam in \'t kofschip (t, k, f, s, ch, p)? Dan +te(n)!'
      },
      {
        id: 'ck-3',
        category: 'ovt_kofschip',
        categoryLabel: 'Verleden Tijd (Dubbele D of T)',
        sentencePrompt: 'Het onderzoeksschip ... gisteravond veilig in de baai. (landen)',
        verbInfinitive: 'landen',
        subjectHint: 'Stam is "land" + de = landde',
        options: ['landde', 'landte', 'lande', 'geland'],
        correctIndex: 0,
        explanation: 'Stam is "land". De "d" zit niet in \'t kofschip, dus stam + de = "landde".',
        ruleTip: 'Regel: Stam eindigt al op d? In de verleden tijd schrijf je dan dubbel-d (-dde)!'
      }
    ]
  },
  {
    id: 'loanword-zombie',
    name: 'De Leenwoord Cyber-Zombie',
    title: 'Meester van Engelse Werkwoorden in het Nederlands',
    emoji: '🧟',
    bgGradient: 'from-emerald-950 via-teal-900 to-slate-950',
    maxHp: 100,
    dialogueIntro: 'Beep boop! Zelfs volwassenen maken fouten bij het vervoegen van leenwoorden! Laat zien wat je kunt!',
    defeatDialogue: 'Systeem oververhit! Jouw leenwoord-spelling is geprogrammeerd tot in perfectie!',
    questions: [
      {
        id: 'lw-1',
        category: 'leenwoorden',
        categoryLabel: 'Engelse Leenwoorden (Voltooid Deelwoord)',
        sentencePrompt: 'Hemali heeft de nieuwste RPG-aflevering direct online ... . (streamen)',
        verbInfinitive: 'streamen',
        subjectHint: 'Engelse stam is stream (eindigt op m-klank). M zit niet in \'t kofschip $\to$ +d',
        options: ['gestreamd', 'gestreamt', 'gestreamed', 'ge-streamt'],
        correctIndex: 0,
        explanation: 'Voltooid deelwoord van streamen: ge + stream + d = "gestreamd". M zit niet in \'t kofschip.',
        ruleTip: 'Regel: Ook bij Engelse leenwoorden gebruik je \'t kofschip op de uitspraak van de stam!'
      },
      {
        id: 'lw-2',
        category: 'leenwoorden',
        categoryLabel: 'Engelse Leenwoorden (Verleden Tijd)',
        sentencePrompt: 'Gisteren ... onze leraar het hele schoolrooster. (updaten)',
        verbInfinitive: 'updaten',
        subjectHint: 'Stam is update (eindigt op t-klank in uitspraak) $\to$ +te',
        options: ['updatete', 'updatede', 'ge-updatet', 'updatte'],
        correctIndex: 0,
        explanation: 'De stam is update. Uitspraak eindigt op een t-klank (in \'t kofschip), dus stam + te = "updatete".',
        ruleTip: 'Regel: Bij updaten schrijf je in de verleden tijd de hele stam "update" + "te" = updatete!'
      },
      {
        id: 'lw-3',
        category: 'leenwoorden',
        categoryLabel: 'Engelse Leenwoorden (Koppelstreepje bij klinkerbotsing)',
        sentencePrompt: 'Ridheya heeft gisteren een verslag naar de dierenkliniek ... . (e-mailen)',
        verbInfinitive: 'e-mailen',
        subjectHint: 'Let op het voorvoegsel ge- en het koppelstreepje',
        options: ['ge-e-maild', 'geëmaild', 'ge-e-mailt', 'ge-emaild'],
        correctIndex: 0,
        explanation: 'Bij afkortingen en Engelse letters met voorvoegsel ge- gebruik je koppeltekens: "ge-e-maild".',
        ruleTip: 'Regel: Bij e-mailen behoud je het streepje en zet je ge- ervoor met een koppelteken: ge-e-maild.'
      }
    ]
  }
];

export const WerkwoordBossArenaModal: React.FC<WerkwoordBossArenaModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile
}) => {
  const [selectedBossIndex, setSelectedBossIndex] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [bossHp, setBossHp] = useState<number>(100);
  const [playerHp, setPlayerHp] = useState<number>(100);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [combatLog, setCombatLog] = useState<string>('Gevecht gestart! Kies de juiste werkwoordvorm om een spreuk af te vuren!');
  const [isDefeated, setIsDefeated] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentBoss = BOSSES[selectedBossIndex] || BOSSES[0];
  const currentQ = currentBoss.questions[currentQuestionIndex] || currentBoss.questions[0];

  const handleSelectBoss = (idx: number) => {
    sound.playPop();
    setSelectedBossIndex(idx);
    setCurrentQuestionIndex(0);
    setBossHp(100);
    setPlayerHp(100);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsDefeated(false);
    setCombatLog(`Je staat oog in oog met ${BOSSES[idx].name}!`);
  };

  const handleCastSpell = (idx: number) => {
    if (isAnswerChecked || isDefeated) return;
    setSelectedOption(idx);
    setIsAnswerChecked(true);

    const isCorrect = idx === currentQ.correctIndex;

    if (isCorrect) {
      sound.playSuccess();
      const damage = Math.ceil(100 / currentBoss.questions.length);
      const newBossHp = Math.max(0, bossHp - damage);
      setBossHp(newBossHp);
      setCombatLog(`⚡ VOLTREFFER! Hemali vuurt een Magische Cito-Spreuk af! ${currentBoss.name} verliest ${damage} HP!`);

      if (newBossHp === 0) {
        setIsDefeated(true);
        sound.playVictory();
        confetti({ particleCount: 100, spread: 80 });
        onUpdateProfile(prev => ({
          ...prev,
          stars: prev.stars + 50,
          score: prev.score + 100,
          mastery: {
            ...prev.mastery,
            grammar: Math.min(100, prev.mastery.grammar + 5),
            spelling: Math.min(100, prev.mastery.spelling + 4)
          }
        }));
      }
    } else {
      sound.playError();
      const playerDamage = 25;
      setPlayerHp(prev => Math.max(10, prev - playerDamage));
      setCombatLog(`🛡️ Mis! ${currentBoss.name} blokkeert je spreuk en slaat terug op je schild! Bekijk de grammaticaregel.`);
    }
  };

  const handleNextTurn = () => {
    if (currentQuestionIndex < currentBoss.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      sound.playPop();
    } else {
      // Re-challenge or finish
      handleSelectBoss((selectedBossIndex + 1) % BOSSES.length);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        className="bg-slate-900 rounded-3xl w-full max-w-3xl shadow-2xl border-2 border-indigo-500/40 overflow-hidden flex flex-col text-white max-h-[94vh]"
      >
        {/* Top Header */}
        <div className={`p-4 sm:p-5 bg-gradient-to-r ${currentBoss.bgGradient} flex items-center justify-between border-b border-white/15`}>
          <div className="flex items-center gap-3">
            <div className="w-13 h-13 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl shadow-inner">
              ⚔️
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-amber-400 text-slate-950 font-black text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  Werkwoord Boss Duel • Groep 8
                </span>
                <span className="text-xs text-amber-200 font-bold">
                  't Kofschip, d/t/dt &amp; Leenwoorden
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-0.5 tracking-tight">
                {currentBoss.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Boss Selection Tabs */}
        <div className="bg-slate-950/80 px-4 py-2.5 flex items-center gap-2 overflow-x-auto border-b border-white/10">
          <span className="text-xs font-bold text-slate-400 whitespace-nowrap">Kies Baas:</span>
          {BOSSES.map((b, idx) => (
            <button
              key={b.id}
              onClick={() => handleSelectBoss(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                selectedBossIndex === idx
                  ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>{b.emoji}</span>
              <span>{b.name.split(' ')[1] || b.name}</span>
            </button>
          ))}
        </div>

        {/* Battle Arena Stage */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* Health Bars: Boss vs Hemali */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950/60 p-3.5 rounded-2xl border border-white/10">
            {/* Player Side */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-emerald-400 flex items-center gap-1">
                  <span>✨ Hemali (Magiër Gr 8)</span>
                </span>
                <span>{playerHp} / 100 HP</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                  animate={{ width: `${playerHp}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Boss Side */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-red-400 flex items-center gap-1">
                  <span>{currentBoss.emoji} {currentBoss.name}</span>
                </span>
                <span>{bossHp} / 100 HP</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-500 to-amber-500"
                  animate={{ width: `${bossHp}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>

          {/* Combat Log Banner */}
          <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-3 text-xs sm:text-sm font-medium text-indigo-200 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400 flex-shrink-0 animate-pulse" />
            <span>{combatLog}</span>
          </div>

          {/* Boss Victory State */}
          {isDefeated ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border-2 border-amber-400 rounded-3xl p-6 text-center space-y-3"
            >
              <div className="text-5xl animate-bounce">🏆</div>
              <h3 className="text-xl font-black text-amber-300">
                BAAS VERSLAGEN!
              </h3>
              <p className="text-sm text-slate-200 max-w-md mx-auto">
                "{currentBoss.defeatDialogue}"
              </p>
              <div className="flex items-center justify-center gap-4 text-xs font-black text-emerald-300">
                <span>+50 Sterren ⭐</span>
                <span>+100 Munten 🪙</span>
                <span>+5% Werkwoordmeesterschap 📜</span>
              </div>
              <button
                onClick={() => handleSelectBoss((selectedBossIndex + 1) % BOSSES.length)}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm px-6 py-2.5 rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer mt-2"
              >
                Volgende Baas Uitdagen ➔
              </button>
            </motion.div>
          ) : (
            /* Active Duel Question Card */
            <div className="bg-slate-800/80 rounded-3xl p-4 sm:p-5 border border-white/15 space-y-4">
              
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="bg-indigo-500/20 text-indigo-300 font-black text-xs px-2.5 py-1 rounded-xl border border-indigo-400/30">
                  {currentQ.categoryLabel}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Aanval {currentQuestionIndex + 1} van {currentBoss.questions.length}
                </span>
              </div>

              {/* Prompt Sentence */}
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-white/10">
                <div className="text-xs text-amber-400 font-bold mb-1">
                  Werkwoord: <span className="underline italic">{currentQ.verbInfinitive}</span>
                </div>
                <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {currentQ.sentencePrompt}
                </p>
                <p className="text-[11px] text-slate-400 mt-2 italic flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                  <span>Hint: {currentQ.subjectHint}</span>
                </p>
              </div>

              {/* Spell Choice Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentQ.options.map((opt, idx) => {
                  let btnStyle = 'bg-slate-700/80 hover:bg-slate-600 text-white border-white/10 hover:border-amber-400/50';
                  if (isAnswerChecked) {
                    if (idx === currentQ.correctIndex) {
                      btnStyle = 'bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-950/40 ring-2 ring-emerald-300';
                    } else if (selectedOption === idx) {
                      btnStyle = 'bg-red-600/80 text-white border-red-400';
                    } else {
                      btnStyle = 'bg-slate-800/50 text-slate-500 border-transparent opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleCastSpell(idx)}
                      disabled={isAnswerChecked}
                      className={`p-3 rounded-2xl border-2 font-black text-sm sm:text-base text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswerChecked && idx === currentQ.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-200 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Rule Card */}
              {isAnswerChecked && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-indigo-950/60 border border-indigo-400/40 rounded-2xl p-3.5 space-y-2"
                >
                  <p className="text-xs sm:text-sm font-semibold text-indigo-100">
                    💡 <span className="font-black text-amber-300">Uitleg:</span> {currentQ.explanation}
                  </p>
                  <p className="text-[11px] font-bold text-amber-200/90 bg-black/30 p-2 rounded-xl">
                    📜 {currentQ.ruleTip}
                  </p>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleNextTurn}
                      className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Volgende Aanval ➔</span>
                    </button>
                  </div>
                </motion.div>
              )}

            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
};
