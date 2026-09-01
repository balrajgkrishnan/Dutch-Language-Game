import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, BookOpen, Sparkles, Volume2, ArrowRight, CheckCircle2, 
  RotateCcw, Award, Compass, HelpCircle, FileText, Download, 
  Copy, Check, UserCheck, Flame, Star, Lightbulb, ExternalLink,
  Maximize2, Minimize2, Eye
} from 'lucide-react';
import { 
  PROTAGONISTS, 
  INTEREST_QUESTIONS, 
  PLACEMENT_QUESTIONS, 
  STORY_CAMPAIGNS,
  StoryCampaign,
  ProtagonistProfile, 
  PlacementQuestion, 
  RpgPage 
} from '../data/citoRpgData';
import { sound } from '../services/soundService';
import { speech } from '../services/speechService';
import { useFullscreen } from '../hooks/useFullscreen';
import { InteractiveDutchText } from './InteractiveDutchText';
import { StoryCutsceneStage } from './StoryCutsceneStage';
import confetti from 'canvas-confetti';

interface CitoRpgExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultActiveProfile?: 'ridheya' | 'hemali';
  onRewardStars?: (stars: number) => void;
}

type TabType = 'rpg_adventure' | 'cito_diagnostic' | 'interest_quiz' | 'json_export';

export const CitoRpgExamModal: React.FC<CitoRpgExamModalProps> = ({
  isOpen,
  onClose,
  defaultActiveProfile = 'hemali',
  onRewardStars
}) => {
  const [selectedProtagonist, setSelectedProtagonist] = useState<'ridheya' | 'hemali'>(defaultActiveProfile);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(
    defaultActiveProfile === 'ridheya' ? 'ridheya_malaysia' : 'hemali_jungle'
  );
  const [activeTab, setActiveTab] = useState<TabType>('rpg_adventure');

  // RPG Story State
  const [currentRpgPageNumber, setCurrentRpgPageNumber] = useState<number>(1);
  const [rpgMysteryAnswer, setRpgMysteryAnswer] = useState<number | null>(null);
  const [isRpgClueChecked, setIsRpgClueChecked] = useState<boolean>(false);

  // Helper functions for persistent storage
  const getStorageKey = (protagonist: 'ridheya' | 'hemali') => `cito_rpg_diagnostic_state_v2_${protagonist}`;

  const loadSavedState = (protagonist: 'ridheya' | 'hemali') => {
    try {
      const raw = localStorage.getItem(getStorageKey(protagonist));
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Failed to load Cito diagnostic state', e);
    }
    return null;
  };

  // Cito Diagnostic Placement State
  const initialSaved = loadSavedState(selectedProtagonist);
  const [currentPlacementIdx, setCurrentPlacementIdx] = useState<number>(initialSaved?.currentPlacementIdx ?? 0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [scores, setScores] = useState<{ totalAnswered: number; totalCorrect: number }>(
    initialSaved?.scores ?? { totalAnswered: 0, totalCorrect: 0 }
  );
  const [userAnswersHistory, setUserAnswersHistory] = useState<Record<string, { chosen: number; correct: boolean }>>(
    initialSaved?.userAnswersHistory ?? {}
  );

  // Interest Quiz State (supports multi-selection per question category)
  const [interestAnswers, setInterestAnswers] = useState<Record<string, string[]>>(
    initialSaved?.interestAnswers ?? {
      int_1: ['malaysia_vet'],
      int_2: ['city_malaysia'],
      int_3: ['stray_dog_kopi'],
      int_4: ['vet_toolkit'],
      int_5: ['adopted_kopi'],
      int_6: ['team_malaysia_friends']
    }
  );

  // Save changes to localStorage whenever answers or scores change
  useEffect(() => {
    try {
      const stateToSave = {
        currentPlacementIdx,
        scores,
        userAnswersHistory,
        interestAnswers,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(getStorageKey(selectedProtagonist), JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Failed to save Cito diagnostic state', e);
    }
  }, [selectedProtagonist, currentPlacementIdx, scores, userAnswersHistory, interestAnswers]);

  // JSON copy indicator
  const [hasCopiedJson, setHasCopiedJson] = useState<boolean>(false);

  const { isFullscreen, containerRef: modalContainerRef, toggleFullscreen } = useFullscreen<HTMLDivElement>();

  if (!isOpen) return null;

  const currentProfile: ProtagonistProfile = PROTAGONISTS[selectedProtagonist];
  
  // Find current campaign and active RPG page
  const currentCampaign: StoryCampaign = STORY_CAMPAIGNS.find(c => c.id === selectedCampaignId) || STORY_CAMPAIGNS[0];
  const campaignPages = currentCampaign.pages;
  const currentRpgPage: RpgPage = campaignPages.find(p => p.pageNumber === currentRpgPageNumber) || campaignPages[0];

  // Filter Cito questions for selected profile
  const filteredPlacementQuestions = PLACEMENT_QUESTIONS.filter(q => 
    selectedProtagonist === 'ridheya' 
      ? q.curriculumLevel.includes('Groep 3-4') 
      : q.curriculumLevel.includes('Groep 5-6')
  );
  
  const currentPlacementQ: PlacementQuestion = filteredPlacementQuestions[currentPlacementIdx] || filteredPlacementQuestions[0];

  const handleSelectProtagonist = (id: 'ridheya' | 'hemali') => {
    sound.playPop();
    setSelectedProtagonist(id);
    setSelectedCampaignId(id === 'ridheya' ? 'ridheya_malaysia' : 'hemali_jungle');
    setCurrentRpgPageNumber(1);
    setRpgMysteryAnswer(null);
    setIsRpgClueChecked(false);

    // Load saved diagnostic data for this protagonist
    const saved = loadSavedState(id);
    if (saved) {
      setCurrentPlacementIdx(saved.currentPlacementIdx ?? 0);
      setScores(saved.scores ?? { totalAnswered: 0, totalCorrect: 0 });
      setUserAnswersHistory(saved.userAnswersHistory ?? {});
      if (saved.interestAnswers) {
        setInterestAnswers(saved.interestAnswers);
      }
    } else {
      setCurrentPlacementIdx(0);
      setScores({ totalAnswered: 0, totalCorrect: 0 });
      setUserAnswersHistory({});
    }
    setSelectedOption(null);
    setIsAnswerChecked(false);
  };

  const handleResetDiagnostic = () => {
    sound.playPop();
    setCurrentPlacementIdx(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setScores({ totalAnswered: 0, totalCorrect: 0 });
    setUserAnswersHistory({});
    try {
      localStorage.removeItem(getStorageKey(selectedProtagonist));
    } catch (e) {
      console.warn('Failed to clear diagnostic state', e);
    }
  };

  const handleSelectCampaign = (campaignId: string) => {
    sound.playPop();
    setSelectedCampaignId(campaignId);
    setCurrentRpgPageNumber(1);
    setRpgMysteryAnswer(null);
    setIsRpgClueChecked(false);
  };

  const handleAnswerPlacement = (optionIdx: number) => {
    if (isAnswerChecked) return;
    sound.playPop();
    setSelectedOption(optionIdx);
    setIsAnswerChecked(true);

    const isCorrect = optionIdx === currentPlacementQ.correctIndex;
    setUserAnswersHistory(prev => ({
      ...prev,
      [currentPlacementQ.id]: { chosen: optionIdx, correct: isCorrect }
    }));

    setScores(prev => ({
      totalAnswered: prev.totalAnswered + 1,
      totalCorrect: isCorrect ? prev.totalCorrect + 1 : prev.totalCorrect
    }));

    if (isCorrect) {
      sound.playSuccess();
      confetti({ particleCount: 35, spread: 60 });
      if (onRewardStars) onRewardStars(15);
    } else {
      sound.playWrong();
    }
  };

  const handleNextPlacementQuestion = () => {
    sound.playPop();
    setSelectedOption(null);
    setIsAnswerChecked(false);
    if (currentPlacementIdx + 1 <= filteredPlacementQuestions.length) {
      setCurrentPlacementIdx(prev => prev + 1);
    }
    if (currentPlacementIdx + 1 === filteredPlacementQuestions.length) {
      sound.playLevelUp();
      confetti({ particleCount: 60, spread: 80 });
    }
  };

  const isExamCompleted = currentPlacementIdx >= filteredPlacementQuestions.length;

  const calculateDiagnosticReport = () => {
    const totalQ = filteredPlacementQuestions.length;
    let correctCount = 0;
    let answeredCount = 0;

    filteredPlacementQuestions.forEach(q => {
      const ans = userAnswersHistory[q.id];
      if (ans) {
        answeredCount++;
        if (ans.correct) correctCount++;
      }
    });

    const percent = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

    let diagnosedLevel = '';
    let levelBadge = '';
    let recommendation = '';
    let aviCode = '';

    if (selectedProtagonist === 'ridheya') {
      if (percent >= 80) {
        diagnosedLevel = 'Groep 5 (AVI E5) - Uitstekend';
        levelBadge = '🌟 Zelfstandig Lezer';
        aviCode = 'AVI E5 / Groep 5';
        recommendation = 'Ridheya heeft een uitstekende woordenschat en ontleedt samengestelde woorden en open/gesloten lettergrepen moeiteloos. Ze is klaar voor langere zelfstandige verhalen en avontuurlijke teksten.';
      } else if (percent >= 60) {
        diagnosedLevel = 'Groep 5 (AVI M5) - Op Schema';
        levelBadge = '🎯 Stevige Basis';
        aviCode = 'AVI M5 / Groep 5';
        recommendation = 'Ridheya begrijpt dialogen en contextaanwijzingen goed. Blijf oefenen met verkleinwoorden (-pje, -tje), voegwoorden en de ingebouwde woordenhulp.';
      } else {
        diagnosedLevel = 'Groep 4-5 (AVI E4-M5) - Begeleid Oefenen';
        levelBadge = '🌱 Groeipotentieel';
        aviCode = 'AVI E4 / Groep 4-5';
        recommendation = 'Ondersteun Ridheya met de voorleesfunctie en de klikbare woordenhulp. Korte dialogen en gerichte pre-teaching in de RPG stimuleren haar leesvloeiendheid.';
      }
    } else {
      if (percent >= 80) {
        diagnosedLevel = 'Groep 8 (Doorstroomtoets 1F-2F) - Meesterlijk';
        levelBadge = '👑 Doorstroomtoets Klaar';
        aviCode = 'Doorstroomtoets 1F/2F (Groep 8)';
        recommendation = 'Hemali beheerst complexe signaalwoorden (desondanks, desalniettemin, hetgeen) en logische tekststructuren uitstekend. Zij scoort optimaal op de Doorstroomtoets!';
      } else if (percent >= 60) {
        diagnosedLevel = 'Groep 7-8 (Cito E7-M8) - Vaardig';
        levelBadge = '🔍 Doelgericht Oefenen';
        aviCode = 'Cito M8 / Groep 8';
        recommendation = 'Hemali pikt de hoofdgedachte en humor snel op. Versterk de subtiele verwijswoorden en meerkeuze-afleiders via de mysterieuze Cito-clues in de RPG.';
      } else {
        diagnosedLevel = 'Groep 7 (Cito M7) - Basisontwikkeling';
        levelBadge = '📖 Extra Training';
        aviCode = 'Cito M7 / Groep 7';
        recommendation = 'Focus op signaalwoorden van tegenstelling en tijd en \'t kofschip werkwoordregels. Laat Hemali haar antwoorden hardop beredeneren.';
      }
    }

    return {
      totalQ,
      answeredCount,
      correctCount,
      percent,
      diagnosedLevel,
      levelBadge,
      aviCode,
      recommendation
    };
  };

  const diagnosticReport = calculateDiagnosticReport();

  const handleAnswerRpgClue = (idx: number) => {
    if (isRpgClueChecked) return;
    setRpgMysteryAnswer(idx);
    setIsRpgClueChecked(true);
    if (currentRpgPage.mysteryQuestion && idx === currentRpgPage.mysteryQuestion.correctIndex) {
      sound.playSuccess();
      confetti({ particleCount: 40, spread: 70 });
      if (onRewardStars) onRewardStars(20);
    } else {
      sound.playWrong();
    }
  };

  const handleChooseRpgPath = (nextPage: number) => {
    sound.playPageFlip();
    sound.playFootsteps();
    setCurrentRpgPageNumber(nextPage);
    setRpgMysteryAnswer(null);
    setIsRpgClueChecked(false);
  };

  const handleSpeakText = (text: string) => {
    sound.playPop();
    speech.speak(text, { rate: selectedProtagonist === 'ridheya' ? 0.85 : 1.0 });
  };

  // Generate Diagnostic JSON for export
  const exportDiagnosticJson = {
    assessmentTitle: `Diagnostic Reading & Interest Assessment - ${currentProfile.name} (${currentProfile.gradeLevel})`,
    timestamp: new Date().toISOString(),
    studentProfile: {
      name: currentProfile.name,
      gradeLevel: currentProfile.gradeLevel,
      aviLevel: currentProfile.aviLevel,
      readingFocus: currentProfile.readingFocus
    },
    performanceScore: {
      totalAnswered: scores.totalAnswered,
      totalCorrect: scores.totalCorrect,
      accuracyPercentage: scores.totalAnswered > 0 ? Math.round((scores.totalCorrect / scores.totalAnswered) * 100) : 0
    },
    interestPreferences: interestAnswers,
    placementQuestions: filteredPlacementQuestions.map(q => ({
      id: q.id,
      curriculumLevel: q.curriculumLevel,
      skillTested: q.skillTested,
      passage: q.passage,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      studentAnswer: userAnswersHistory[q.id]?.chosen ?? null,
      isCorrect: userAnswersHistory[q.id]?.correct ?? false,
      explanation: q.explanation
    }))
  };

  const handleCopyJson = () => {
    sound.playStar();
    navigator.clipboard.writeText(JSON.stringify(exportDiagnosticJson, null, 2));
    setHasCopiedJson(true);
    setTimeout(() => setHasCopiedJson(false), 2500);
  };

  const handleDownloadStandaloneHtml = () => {
    sound.playStar();
    const link = document.createElement('a');
    link.href = '/cito_rpg_diagnostic.html';
    link.download = 'Cito_RPG_Leesdiagnose_BoerinTess.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-2 sm:p-4'} overflow-y-auto`}>
      <motion.div
        ref={modalContainerRef}
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className={`bg-white ${
          isFullscreen 
            ? 'w-full h-full max-w-none max-h-none rounded-none border-0' 
            : 'rounded-3xl shadow-2xl border-2 border-emerald-300 w-full max-w-5xl max-h-[94vh]'
        } flex flex-col overflow-hidden text-slate-800 transition-all duration-150`}
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-800 text-white p-4 sm:p-5 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center text-2xl shadow-inner flex-shrink-0">
              {currentProfile.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-black tracking-tight">
                  Cito RPG Avontuur &amp; Diagnostische Toets
                </h2>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                  Doorstroomtoets &amp; AVI Scaffolds
                </span>
              </div>
              <p className="text-xs text-emerald-100 font-semibold mt-0.5">
                Interactief Choose-Your-Own-Adventure voor <b>Ridheya</b> &amp; <b>Hemali</b>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="bg-white/15 hover:bg-white/25 border border-white/30 text-white px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
              title={isFullscreen ? 'Verlaat Volledig Scherm' : 'Volledig Scherm (Laptop / Cito Modus)'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isFullscreen ? 'Venster' : 'Volledig Scherm'}</span>
            </button>

            <button
              onClick={handleDownloadStandaloneHtml}
              className="bg-emerald-500/20 hover:bg-emerald-500/35 border border-emerald-300/40 text-emerald-100 hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Download de zelfstandige offline HTML versie voor laptop of tablet"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Offline .HTML</span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Protagonist Selector Header Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
              Kies Hoofdrolspeler:
            </span>
            <div className="grid grid-cols-2 gap-2 flex-1 sm:flex-initial">
              <button
                onClick={() => handleSelectProtagonist('ridheya')}
                className={`px-3 py-2 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 border-2 cursor-pointer ${
                  selectedProtagonist === 'ridheya'
                    ? 'bg-amber-100 text-amber-950 border-amber-400 shadow-sm scale-102'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300'
                }`}
              >
                <span className="text-base">🔍</span>
                <div className="text-left">
                  <div className="leading-none">Ridheya</div>
                  <span className="text-[10px] text-amber-700 font-bold">Groep 3–4 (M3-E4)</span>
                </div>
              </button>

              <button
                onClick={() => handleSelectProtagonist('hemali')}
                className={`px-3 py-2 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 border-2 cursor-pointer ${
                  selectedProtagonist === 'hemali'
                    ? 'bg-indigo-100 text-indigo-950 border-indigo-400 shadow-sm scale-102'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                }`}
              >
                <span className="text-base">📖</span>
                <div className="text-left">
                  <div className="leading-none">Hemali</div>
                  <span className="text-[10px] text-indigo-700 font-bold">Groep 5–6 (M5-E6)</span>
                </div>
              </button>
            </div>
          </div>

          {/* Active Profile Traits Preview */}
          <div className="text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2 w-full sm:w-auto justify-between">
            <span className="text-emerald-700 font-extrabold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {currentProfile.gear}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 text-[11px]">
              Focus: {currentProfile.readingFocus.slice(0, 2).join(', ')}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-100/70 px-4 pt-2 gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('rpg_adventure');
            }}
            className={`px-4 py-2.5 rounded-t-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 border-t-2 border-x-2 cursor-pointer ${
              activeTab === 'rpg_adventure'
                ? 'bg-white text-emerald-800 border-emerald-400 border-b-transparent shadow-xs'
                : 'text-slate-500 border-transparent hover:text-slate-800 hover:bg-slate-200/60'
            }`}
          >
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>1. RPG Avonturen Verhaal</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('cito_diagnostic');
            }}
            className={`px-4 py-2.5 rounded-t-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 border-t-2 border-x-2 cursor-pointer ${
              activeTab === 'cito_diagnostic'
                ? 'bg-white text-indigo-800 border-indigo-400 border-b-transparent shadow-xs'
                : 'text-slate-500 border-transparent hover:text-slate-800 hover:bg-slate-200/60'
            }`}
          >
            <FileText className="w-4 h-4 text-indigo-600" />
            <span>2. Cito Diagnose Toets</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('interest_quiz');
            }}
            className={`px-4 py-2.5 rounded-t-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 border-t-2 border-x-2 cursor-pointer ${
              activeTab === 'interest_quiz'
                ? 'bg-white text-amber-800 border-amber-400 border-b-transparent shadow-xs'
                : 'text-slate-500 border-transparent hover:text-slate-800 hover:bg-slate-200/60'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>3. Interesse &amp; Voorkeuren</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('json_export');
            }}
            className={`px-4 py-2.5 rounded-t-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 border-t-2 border-x-2 cursor-pointer ${
              activeTab === 'json_export'
                ? 'bg-white text-purple-800 border-purple-400 border-b-transparent shadow-xs'
                : 'text-slate-500 border-transparent hover:text-slate-800 hover:bg-slate-200/60'
            }`}
          >
            <Copy className="w-4 h-4 text-purple-600" />
            <span>4. Vercel JSON Export</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
          
          {/* TAB 1: RPG ADVENTURE WITH ~150 WORD CHUNKS & BILINGUAL FOOTNOTES */}
          {activeTab === 'rpg_adventure' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              
              {/* Campaign Selector Pills */}
              <div className="bg-slate-100/90 border border-slate-200 rounded-2xl p-2 sm:p-2.5 space-y-1.5">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                    <span>🗺️</span>
                    <span>Kies Verhaal-Avontuur:</span>
                  </span>
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {currentCampaign.badge}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {STORY_CAMPAIGNS.map(camp => {
                    const isCampActive = camp.id === selectedCampaignId;
                    return (
                      <button
                        key={camp.id}
                        onClick={() => handleSelectCampaign(camp.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                          isCampActive
                            ? 'bg-white border-emerald-500 shadow-xs ring-2 ring-emerald-400/40 text-emerald-950'
                            : 'bg-white/60 border-slate-200/80 hover:bg-white text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-black text-xs">
                          <span>{camp.themeEmoji}</span>
                          <span className="truncate">{camp.title}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-semibold line-clamp-1">
                          {camp.subtitle}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Animated Interactive Chapter Stepping Trail (Pages 1 to 12) */}
              <div className="bg-white rounded-2xl p-3 border border-emerald-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-black text-emerald-950 px-1">
                  <span className="flex items-center gap-1.5">
                    <span>🐾</span>
                    <span>Avonturenkaart &amp; Mijlpalen:</span>
                  </span>
                  <span className="text-emerald-700 font-mono text-[11px]">
                    Pagina {currentRpgPage.pageNumber} van {campaignPages.length}
                  </span>
                </div>

                <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
                  {campaignPages.map((pg) => {
                    const isCurrent = pg.pageNumber === currentRpgPage.pageNumber;
                    const isPast = pg.pageNumber < currentRpgPage.pageNumber;
                    return (
                      <button
                        key={pg.pageNumber}
                        onClick={() => handleChooseRpgPath(pg.pageNumber)}
                        className={`h-8 sm:h-9 rounded-xl font-black text-[11px] flex items-center justify-center transition-all cursor-pointer border-2 relative ${
                          isCurrent
                            ? 'bg-gradient-to-tr from-amber-400 to-orange-400 text-slate-950 border-amber-300 shadow-md scale-105 ring-2 ring-amber-400/40'
                            : isPast
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200'
                            : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-white hover:text-slate-700'
                        }`}
                        title={`Ga direct naar Pagina ${pg.pageNumber}: ${pg.title}`}
                      >
                        {isCurrent ? (
                          <span className="animate-pulse">{selectedProtagonist === 'ridheya' ? '🩺' : '✨'}</span>
                        ) : isPast ? (
                          <span>✓</span>
                        ) : (
                          <span>{pg.pageNumber}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Visual Animated Cutscene Stage */}
              <StoryCutsceneStage
                protagonist={selectedProtagonist}
                pageTitle={currentRpgPage.title}
                biomeName={currentRpgPage.biome}
                pageNumber={currentRpgPage.pageNumber}
                totalPages={campaignPages.length}
                characterDialogue={
                  selectedProtagonist === 'ridheya'
                    ? (currentRpgPage.pageNumber === 1
                        ? "Kijk Kopi, door mijn ronde bril zie ik een gewond diertje! Snel mijn dierenartstas erbij pakken!"
                        : "Met deze wonderzalf en mijn vergrootglas genezen we de wondjes in een handomdraai!")
                    : (currentRpgPage.pageNumber === 1
                        ? "Dit kristalraadsel herinnert me aan een geniale scène uit mijn dagboek! Laten we het signaalwoord ontleden!"
                        : "Haha, met mijn saffieren amulet en logisch denkwerk kraken we elke Cito-puzzel!")
                }
                characterEmote={
                  currentRpgPage.pageNumber % 4 === 1 ? 'curious' :
                  currentRpgPage.pageNumber % 4 === 2 ? 'caring' :
                  currentRpgPage.pageNumber % 4 === 3 ? 'clever' : 'excited'
                }
              />

              {/* Page Number & Biome Location */}
              <div className="flex items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-600 text-white font-black text-xs px-2.5 py-1 rounded-xl uppercase tracking-wider shadow-xs">
                    PAGINA {currentRpgPage.pageNumber} / {campaignPages.length}
                  </span>
                  <span className="font-bold text-xs text-emerald-950">
                    🌍 {currentRpgPage.biome}
                  </span>
                </div>

                <button
                  onClick={() => handleSpeakText(currentRpgPage.storyText.replace(/\*\*/g, ''))}
                  className="bg-white hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-extrabold text-xs px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Lees Pagina Voor</span>
                </button>
              </div>

              {/* Story Title & Chunked Text Card (~150 words) */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-100 shadow-sm space-y-4">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                  <span>📜</span>
                  <span>{currentRpgPage.title}</span>
                </h3>

                {/* Interactive Story Text with Hover Dictionary */}
                <div className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium whitespace-pre-line bg-amber-50/40 p-4 sm:p-5 rounded-2xl border border-amber-100 relative">
                  <div className="mb-2 flex items-center justify-between gap-2 text-[11px] text-amber-800 font-bold bg-white/70 px-2.5 py-1 rounded-xl border border-amber-200/60 w-fit">
                    <span>✨ Beweeg je muis over elk woord voor betekenis & vertaling!</span>
                  </div>
                  <InteractiveDutchText text={currentRpgPage.storyText} highlightBold={true} />
                </div>

                {/* MANDATORY FOOTNOTE DICTIONARY: "Woordenhulp op deze pagina" */}
                <div className="bg-amber-50/90 border-2 border-amber-200/90 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-amber-950 font-black text-xs sm:text-sm">
                    <span className="text-base">💡</span>
                    <span>Woordenhulp op deze pagina:</span>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-slate-800 font-medium">
                    {currentRpgPage.targetWords.map((tw, idx) => (
                      <li key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleSpeakText(`${tw.word}. Betekenis: ${tw.dutchMeaning}`)}
                            className="p-1 rounded-lg bg-white border border-amber-300 hover:bg-amber-100 text-emerald-800 transition-colors cursor-pointer"
                            title={`Spreek ${tw.word} uit`}
                          >
                            <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                          </button>
                          <strong className="text-emerald-900 font-black">{tw.word}</strong>
                          {tw.breakdown && (
                            <span className="text-[11px] font-bold text-amber-800 bg-amber-200/60 px-1.5 py-0.5 rounded">
                              [{tw.breakdown}]
                            </span>
                          )}
                          <span>:</span>
                        </div>
                        <span className="text-slate-700">
                          {tw.dutchMeaning} <span className="text-slate-500 font-semibold italic">({tw.englishMeaning})</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Embedded Mystery Clue Question */}
              {currentRpgPage.mysteryQuestion && (
                <div className="bg-indigo-50/80 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h4 className="text-sm font-black text-indigo-950 flex items-center gap-2 uppercase tracking-wide">
                      <span>🧩</span>
                      <span>{currentRpgPage.mysteryQuestion.clueTitle}</span>
                    </h4>
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">
                      Cito Tekstbegrip Vraag
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-bold text-slate-900">
                    {currentRpgPage.mysteryQuestion.question}
                  </p>

                  <div className="space-y-2">
                    {currentRpgPage.mysteryQuestion.options.map((opt, oIdx) => {
                      const isSelected = rpgMysteryAnswer === oIdx;
                      const isCorrect = oIdx === currentRpgPage.mysteryQuestion?.correctIndex;
                      let btnStyle = 'bg-white hover:bg-indigo-50 border-slate-200 text-slate-800';

                      if (isRpgClueChecked) {
                        if (isCorrect) btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black';
                        else if (isSelected) btnStyle = 'bg-rose-100 border-rose-400 text-rose-950';
                        else btnStyle = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isRpgClueChecked}
                          onClick={() => handleAnswerRpgClue(oIdx)}
                          className={`w-full text-left p-3 sm:p-3.5 rounded-2xl border-2 text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between gap-3 ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isRpgClueChecked && isCorrect && <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {isRpgClueChecked && (
                    <div className="bg-white p-3 rounded-xl border border-indigo-200 text-xs font-bold text-indigo-950 flex items-center gap-2">
                      <span>💡</span>
                      <span>{currentRpgPage.mysteryQuestion.explanation}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Choose-Your-Own-Adventure Branching Decisions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <span>🧭</span>
                    <span>Wat doen {currentProfile.name} en haar zus nu? Kies jullie pad:</span>
                  </h4>

                  <div className="flex items-center gap-1.5">
                    {currentRpgPage.pageNumber > 1 && (
                      <button
                        onClick={() => handleChooseRpgPath(currentRpgPage.pageNumber - 1)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-all flex items-center gap-1"
                      >
                        <span>◀ Vorige</span>
                      </button>
                    )}
                    {currentRpgPage.pageNumber < campaignPages.length && (
                      <button
                        onClick={() => handleChooseRpgPath(currentRpgPage.pageNumber + 1)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs cursor-pointer transition-all flex items-center gap-1"
                      >
                        <span>Volgende ▶</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {currentRpgPage.choices.map((choice, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => handleChooseRpgPath(choice.nextPage)}
                      className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white p-4 rounded-2xl font-black text-xs sm:text-sm transition-all hover:scale-[1.01] active:scale-99 shadow-md flex items-center justify-between gap-3 cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl flex-shrink-0">{choice.icon}</span>
                        <div>
                          <div className="leading-snug">{choice.label}</div>
                          <span className="text-[10px] text-emerald-200 font-semibold">
                            {choice.skillBonus}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-amber-300 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CITO PLACEMENT / DIAGNOSTIC EXAM */}
          {activeTab === 'cito_diagnostic' && (
            <div className="space-y-5 max-w-3xl mx-auto">
              
              {/* Header Bar: Auto-save status & Mode Switcher */}
              <div className="flex items-center justify-between gap-3 bg-indigo-50 border border-indigo-200 rounded-2xl px-4 py-2.5 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  {!isExamCompleted ? (
                    <span className="bg-indigo-600 text-white font-black text-xs px-2.5 py-1 rounded-xl uppercase tracking-wider shadow-xs">
                      Vraag {currentPlacementIdx + 1} van {filteredPlacementQuestions.length}
                    </span>
                  ) : (
                    <span className="bg-emerald-600 text-white font-black text-xs px-2.5 py-1 rounded-xl uppercase tracking-wider shadow-xs flex items-center gap-1">
                      <span>✓</span> Toets Voltooid
                    </span>
                  )}
                  <span className="text-xs font-bold text-indigo-950">
                    {!isExamCompleted ? `🎯 ${currentPlacementQ.skillTested}` : `🏆 ${diagnosticReport.diagnosedLevel}`}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <span>💾</span> Opgeslagen
                  </span>
                  <div className="text-xs font-black text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                    Score: {diagnosticReport.correctCount} / {filteredPlacementQuestions.length} ({diagnosticReport.percent}%)
                  </div>
                </div>
              </div>

              {/* VIEW A: DIAGNOSTIC REPORT CARD (When completed or chosen) */}
              {isExamCompleted ? (
                <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-indigo-200 shadow-lg space-y-6">
                  
                  {/* Hero Level Certificate */}
                  <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 rounded-2xl p-5 sm:p-6 text-white space-y-3 relative overflow-hidden">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="space-y-1">
                        <span className="text-xs font-black text-amber-300 uppercase tracking-widest">
                          {diagnosticReport.levelBadge}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-white">
                          {currentProfile.name}’s Cito &amp; AVI Niveau:
                        </h3>
                        <p className="text-lg sm:text-xl font-extrabold text-amber-300">
                          {diagnosticReport.diagnosedLevel}
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/20 text-center min-w-[110px]">
                        <div className="text-2xl sm:text-3xl font-black text-emerald-300">
                          {diagnosticReport.percent}%
                        </div>
                        <div className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider">
                          Nauwkeurigheid
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-medium bg-black/20 p-3.5 rounded-xl border border-white/10">
                      💡 <b>Pedagogisch Inzicht:</b> {diagnosticReport.recommendation}
                    </p>
                  </div>

                  {/* Skills Grid */}
                  <div className="space-y-3">
                    <h4 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <span>📊</span>
                      <span>Toetsresultaten per Cito Leesvaardigheid:</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {filteredPlacementQuestions.map((q, qIdx) => {
                        const ans = userAnswersHistory[q.id];
                        const isCorrect = ans?.correct;
                        return (
                          <div 
                            key={q.id}
                            className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
                              isCorrect 
                                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950' 
                                : ans ? 'bg-rose-50/70 border-rose-300 text-rose-950' : 'bg-slate-50 border-slate-200 text-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between font-black">
                              <span>Vraag {qIdx + 1}: {q.skillTested}</span>
                              <span className={`px-2 py-0.5 rounded-md text-[10px] ${isCorrect ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'}`}>
                                {isCorrect ? '✓ Goed' : '✗ Verbeterpunt'}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-700 font-medium line-clamp-2">
                              {q.question}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                    <button
                      onClick={handleResetDiagnostic}
                      className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Toets Opnieuw Maken (Reset)</span>
                    </button>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => {
                          sound.playPop();
                          setCurrentPlacementIdx(0);
                        }}
                        className="w-full sm:w-auto bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Bekijk Vragen</span>
                      </button>

                      <button
                        onClick={() => {
                          sound.playPop();
                          setActiveTab('rpg_adventure');
                        }}
                        className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-black px-5 py-2.5 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
                      >
                        <span>Start {currentProfile.name}’s RPG Campagne</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              ) : (
                /* VIEW B: ACTIVE QUESTION PASSAGE */
                <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-indigo-100 shadow-sm space-y-4">
                  {currentPlacementQ.contextHeader && (
                    <div className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center justify-between">
                      <span>{currentPlacementQ.contextHeader}</span>
                      <button
                        onClick={() => handleSpeakText(currentPlacementQ.passage.replace(/\*\*/g, ''))}
                        className="text-indigo-700 hover:text-indigo-900 font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Lees tekst</span>
                      </button>
                    </div>
                  )}

                  <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
                    <InteractiveDutchText text={currentPlacementQ.passage} highlightBold={true} />
                  </div>

                  {/* Vocabulary Help if available */}
                  {currentPlacementQ.wordHelp && currentPlacementQ.wordHelp.length > 0 && (
                    <div className="bg-indigo-50/60 border border-indigo-200 rounded-xl p-3 text-xs space-y-1">
                      <span className="font-black text-indigo-900">💡 Woordenhulp:</span>
                      {currentPlacementQ.wordHelp.map((wh, wIdx) => (
                        <div key={wIdx} className="text-slate-700">
                          • <b>{wh.word}</b> {wh.breakdown && `[${wh.breakdown}]`}: {wh.dutchMeaning} <i>({wh.englishMeaning})</i>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Question */}
                  <div className="flex items-center justify-between gap-2 pt-2">
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      {currentPlacementQ.question}
                    </h3>
                    <button
                      onClick={() => handleSpeakText(currentPlacementQ.question)}
                      className="p-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 cursor-pointer transition-colors flex-shrink-0"
                      title="Lees vraag voor"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 gap-2.5">
                    {currentPlacementQ.options.map((opt, oIdx) => {
                      const isSelected = selectedOption === oIdx;
                      const isCorrect = oIdx === currentPlacementQ.correctIndex;
                      let style = 'bg-slate-50 hover:bg-indigo-50 border-slate-200 text-slate-800';

                      if (isAnswerChecked) {
                        if (isCorrect) style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black';
                        else if (isSelected) style = 'bg-rose-100 border-rose-400 text-rose-950';
                        else style = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isAnswerChecked}
                          onClick={() => handleAnswerPlacement(oIdx)}
                          className={`w-full text-left p-3.5 rounded-2xl border-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between gap-3 ${style}`}
                        >
                          <span>{opt}</span>
                          {isAnswerChecked && isCorrect && <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback & Next Button */}
                  {isAnswerChecked && (
                    <div className="pt-2 space-y-3">
                      <div className={`p-4 rounded-2xl text-xs sm:text-sm font-bold border ${
                        selectedOption === currentPlacementQ.correctIndex
                          ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                          : 'bg-rose-50 text-rose-950 border-rose-300'
                      }`}>
                        <div className="flex items-center gap-2 mb-1 font-black">
                          {selectedOption === currentPlacementQ.correctIndex ? '🎉 Helemaal Goed!' : '💡 Uitleg & Hulp:'}
                        </div>
                        <p>{currentPlacementQ.explanation}</p>
                      </div>

                      <button
                        onClick={handleNextPlacementQuestion}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-3 px-4 rounded-2xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20"
                      >
                        <span>{currentPlacementIdx + 1 < filteredPlacementQuestions.length ? 'Volgende Vraag' : 'Toets Voltooid! Bekijk Diagnose Rapport'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Option to skip to report if previously answered */}
                  {diagnosticReport.answeredCount > 0 && !isAnswerChecked && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => setCurrentPlacementIdx(filteredPlacementQuestions.length)}
                        className="text-xs text-indigo-700 hover:text-indigo-900 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Bekijk Huidig Diagnose Rapport ({diagnosticReport.percent}%)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* TAB 3: INTEREST & MOTIVATIONAL PREFERENCE ASSESSMENT */}
          {activeTab === 'interest_quiz' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-5 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🧭</span>
                    <h3 className="text-base sm:text-lg font-black">
                      Interesse- &amp; Diagnostisch Avonturenprofiel
                    </h3>
                  </div>
                  <p className="text-xs text-amber-100 font-medium">
                    Kies je favoriete heldenrol, locatie, gewonde dieren en toverkrachten voor {currentProfile.name}!
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  <button
                    onClick={() => {
                      sound.playPop();
                      setInterestAnswers({
                        int_1: ['malaysia_vet'],
                        int_2: ['city_malaysia'],
                        int_3: ['stray_dog_kopi', 'kingfisher_stone'],
                        int_4: ['vet_toolkit'],
                        int_5: ['adopted_kopi'],
                        int_6: ['team_malaysia_friends']
                      });
                    }}
                    className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/30 transition-all cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    🩺 Ridheya Preset
                  </button>
                  <button
                    onClick={() => {
                      sound.playPop();
                      setInterestAnswers({
                        int_1: ['jungle_magic'],
                        int_2: ['night_jungle'],
                        int_3: ['zombie_monkey'],
                        int_4: ['teleportation', 'detective_book'],
                        int_5: ['baby_giraffe_apple', 'talking_elephant_raja'],
                        int_6: ['talking_animals', 'sisters_team']
                      });
                    }}
                    className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/30 transition-all cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    ✨ Hemali Preset
                  </button>
                </div>
              </div>

              {/* Dynamic Recommendation Card if selections are made */}
              {Object.keys(interestAnswers).some(k => (interestAnswers[k] || []).length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-5 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                      <h4 className="text-sm sm:text-base font-black text-emerald-950">
                        Jouw Persoonlijke Verhaal Aanbeveling:
                      </h4>
                    </div>

                    <button
                      onClick={() => {
                        sound.playStar();
                        const chosenValues = Object.values(interestAnswers).flat() as string[];
                        const isMalaysia = chosenValues.some(v => ['malaysia_vet', 'city_malaysia', 'stray_dog_kopi', 'kingfisher_stone', 'vet_toolkit', 'adopted_kopi', 'team_malaysia_friends'].includes(v));
                        const isJungle = chosenValues.some(v => ['jungle_magic', 'night_jungle', 'zombie_monkey', 'teleportation', 'baby_giraffe_apple', 'talking_elephant_raja', 'guide_monkey_zazu', 'talking_animals'].includes(v));
                        
                        if (isMalaysia && !isJungle) {
                          setSelectedCampaignId('ridheya_malaysia');
                          setSelectedProtagonist('ridheya');
                        } else if (isJungle) {
                          setSelectedCampaignId('hemali_jungle');
                          setSelectedProtagonist('hemali');
                        } else {
                          setSelectedCampaignId('sisters_safari');
                        }
                        setCurrentRpgPageNumber(1);
                        setActiveTab('rpg_adventure');
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4 py-2 rounded-2xl flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-600/20 active:scale-95"
                    >
                      <span>🚀 Start Dit Avontuur Nu</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {Object.entries(interestAnswers).flatMap(([qId, valList]) => {
                      const questionObj = INTEREST_QUESTIONS.find(q => q.id === qId);
                      const list = Array.isArray(valList) ? valList : [valList];
                      return list.map(val => {
                        const optObj = questionObj?.options.find(o => o.themeKey === val);
                        if (!optObj) return null;
                        return (
                          <span key={`${qId}-${val}`} className="bg-white border border-emerald-200 text-emerald-900 text-xs font-bold px-2.5 py-1 rounded-xl shadow-2xs flex items-center gap-1.5">
                            <span>{optObj.icon}</span>
                            <span className="truncate max-w-[200px]">{optObj.text.split(':')[0]}</span>
                          </span>
                        );
                      });
                    })}
                  </div>
                </motion.div>
              )}

              {INTEREST_QUESTIONS.map((iq) => {
                const currentSelectedKeys = interestAnswers[iq.id] || [];
                return (
                  <div key={iq.id} className="bg-white rounded-3xl p-5 border-2 border-amber-100 shadow-xs space-y-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-[11px] font-black text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {iq.category}
                      </span>
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
                        ✨ Meerdere keuzes mogelijk ({currentSelectedKeys.length} gekozen)
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-black text-slate-900">
                      {iq.question}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {iq.options.map((opt, optIdx) => {
                        const isSelected = currentSelectedKeys.includes(opt.themeKey);
                        return (
                          <button
                            key={optIdx}
                            onClick={() => {
                              sound.playPop();
                              setInterestAnswers(prev => {
                                const prevList = prev[iq.id] || [];
                                const nextList = isSelected
                                  ? prevList.filter(k => k !== opt.themeKey)
                                  : [...prevList, opt.themeKey];
                                return { ...prev, [iq.id]: nextList };
                              });
                            }}
                            className={`p-3.5 rounded-2xl border-2 text-xs sm:text-sm font-bold text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                              isSelected
                                ? 'bg-amber-100 border-amber-500 text-amber-950 shadow-xs scale-101'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl flex-shrink-0">{opt.icon}</span>
                              <span className="leading-snug">{opt.text}</span>
                            </div>
                            <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                              isSelected ? 'bg-amber-600 border-amber-600 text-white' : 'border-slate-300 bg-white'
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 4: JSON EXPORT (NEXT.JS / VERCEL SCHEMA COMPATIBLE) */}
          {activeTab === 'json_export' && (
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="flex items-center justify-between gap-3 bg-purple-50 border border-purple-200 rounded-2xl p-4 flex-wrap">
                <div>
                  <h4 className="text-sm font-black text-purple-950">
                    Diagnostic Reading &amp; Interest Assessment JSON
                  </h4>
                  <p className="text-xs text-purple-800 mt-0.5">
                    Volledig compatibel met de Next.js/Vercel dashboard schema volgens de systeeminstructies.
                  </p>
                </div>

                <button
                  onClick={handleCopyJson}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-black px-4 py-2 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95"
                >
                  {hasCopiedJson ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{hasCopiedJson ? 'Gekopieerd!' : 'Kopieer JSON'}</span>
                </button>
              </div>

              <div className="bg-slate-900 text-emerald-400 font-mono text-xs p-4 rounded-2xl overflow-x-auto max-h-96 border border-slate-800 shadow-inner">
                <pre>{JSON.stringify(exportDiagnosticJson, null, 2)}</pre>
              </div>
            </div>
          )}

        </div>

        {/* Footer Bar */}
        <div className="bg-slate-100 border-t border-slate-200 p-4 px-6 flex items-center justify-between gap-3 flex-wrap text-xs">
          <div className="flex items-center gap-2 text-slate-600 font-bold">
            <Award className="w-4 h-4 text-amber-500" />
            <span>
              Verdien extra sterren voor je Safaripark door Cito raadsels en verhaalkeuzes op te lossen!
            </span>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="bg-slate-800 hover:bg-slate-900 text-white font-black px-5 py-2 rounded-xl cursor-pointer transition-all active:scale-95"
          >
            Sluiten
          </button>
        </div>
      </motion.div>
    </div>
  );
};
