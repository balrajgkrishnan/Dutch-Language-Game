import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Mic, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Sparkles, 
  User, 
  RefreshCw,
  Printer,
  Compass,
  Timer,
  PenTool,
  Calendar,
  Layers,
  Star,
  FileText
} from 'lucide-react';
import { PlayerProfile, SkillMastery, AssessmentSnapshot } from '../types';
import { loadUserProfile } from '../services/authService';
import { ReadingHeroDashboard } from './assessment/ReadingHeroDashboard';
import { CommunicationDashboard } from './assessment/CommunicationDashboard';
import { SafariPlacementModal } from './assessment/SafariPlacementModal';
import { FluencyAssessmentModal } from './assessment/FluencyAssessmentModal';
import { WritingEvaluatorModal } from './assessment/WritingEvaluatorModal';
import { GrowthMilestonesModal } from './assessment/GrowthMilestonesModal';
import { PrintablePortfolioReportModal } from './assessment/PrintablePortfolioReportModal';

interface EnhancedParentDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: PlayerProfile;
  onResetProgress?: () => void;
  onUpdateProfile?: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
}

type DashboardTab = 'overview' | 'growth_trends' | 'child_focus' | 'portfolio' | 'milestones';
type TimeFilter = '7_days' | '30_days' | '90_days' | 'all_time';

export const EnhancedParentDashboardModal: React.FC<EnhancedParentDashboardModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onResetProgress,
  onUpdateProfile
}) => {
  const [activeChild, setActiveChild] = useState<'hemali' | 'ridheya'>(
    currentProfile.name.toLowerCase() === 'ridheya' ? 'ridheya' : 'hemali'
  );
  const [activeTab, setActiveTab] = useState<DashboardTab>('growth_trends');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('30_days');

  // Sub-modal states
  const [showPlacementModal, setShowPlacementModal] = useState(false);
  const [showFluencyModal, setShowFluencyModal] = useState(false);
  const [showWritingModal, setShowWritingModal] = useState(false);
  const [showMilestonesModal, setShowMilestonesModal] = useState(false);
  const [showPrintableModal, setShowPrintableModal] = useState(false);

  if (!isOpen) return null;

  const childProfile = activeChild === currentProfile.name.toLowerCase()
    ? currentProfile
    : loadUserProfile(activeChild);

  const mastery: SkillMastery = childProfile.mastery || {
    vocabulary: 70,
    reading: 70,
    readingFluency: 65,
    readingComprehension: 75,
    listening: 80,
    speaking: 60,
    pronunciation: 65,
    spelling: 75,
    grammar: 70,
    writing: 65,
    mathematics: 90,
    confidence: 60,
    communication: 65
  };

  const baseline = childProfile.baseline;
  const snapshots: AssessmentSnapshot[] = childProfile.monthlySnapshots || [];

  const accuracy = childProfile.totalAnswered > 0
    ? Math.round((childProfile.totalCorrect / childProfile.totalAnswered) * 100)
    : 100;

  const skillBars = [
    { label: 'Leesvloeiendheid (WPM)', value: mastery.readingFluency, color: 'from-teal-500 to-emerald-500', baseline: baseline?.readingFluency || 50 },
    { label: 'Begrijpend Lezen', value: mastery.readingComprehension, color: 'from-emerald-500 to-green-500', baseline: baseline?.readingComprehension || 68 },
    { label: 'Woordenschat in Context', value: mastery.vocabulary, color: 'from-amber-500 to-orange-500', baseline: baseline?.vocabulary || 60 },
    { label: 'Spelling & Klankregels', value: mastery.spelling, color: 'from-blue-500 to-indigo-500', baseline: baseline?.spelling || 60 },
    { label: 'Spreekdurf & Zelfvertrouwen', value: mastery.confidence, color: 'from-purple-500 to-pink-500', baseline: baseline?.confidence || 45 },
    { label: 'Wiskunde & Logica', value: mastery.mathematics, color: 'from-indigo-500 to-teal-500', baseline: baseline?.mathematics || 85 },
    { label: 'Uitspraak & Articulatie', value: mastery.pronunciation, color: 'from-rose-500 to-amber-500', baseline: baseline?.pronunciation || 60 },
    { label: 'Schrijfvaardigheid & Structuur', value: mastery.writing, color: 'from-teal-500 to-blue-500', baseline: baseline?.writing || 55 }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl border border-indigo-100 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-emerald-900 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-3xl shadow-inner">
              📊
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black tracking-tight">Ouder- &amp; Docentendashboard</h3>
              <p className="text-xs text-indigo-200 font-medium">
                Longitudinaal assessment, maandelijkse groeitracking &amp; portfolio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPrintableModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
              title="Exporteer of print PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Exporteer PDF</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Child & Action Toolbar */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
          {/* Child Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveChild('hemali')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black cursor-pointer transition-all flex items-center gap-1.5 ${
                activeChild === 'hemali'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <span>👧 Hemali (Groep 8)</span>
            </button>

            <button
              onClick={() => setActiveChild('ridheya')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black cursor-pointer transition-all flex items-center gap-1.5 ${
                activeChild === 'ridheya'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <span>👩‍🌾 Ridheya (Groep 5)</span>
            </button>
          </div>

          {/* Quick Launch Assessment Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setShowPlacementModal(true)}
              className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-emerald-800 border border-emerald-300 font-bold text-[11px] flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>Plaatsingsexpeditie</span>
            </button>

            <button
              onClick={() => setShowFluencyModal(true)}
              className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-teal-800 border border-teal-300 font-bold text-[11px] flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <Timer className="w-3.5 h-3.5 text-teal-600" />
              <span>WPM Leestest</span>
            </button>

            <button
              onClick={() => setShowWritingModal(true)}
              className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-indigo-800 border border-indigo-300 font-bold text-[11px] flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <PenTool className="w-3.5 h-3.5 text-indigo-600" />
              <span>Schrijfstudio</span>
            </button>

            <button
              onClick={() => setShowMilestonesModal(true)}
              className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[11px] flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Mijlpalen</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs & Time Filter */}
        <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveTab('growth_trends')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'growth_trends'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Groei &amp; Maandcurven</span>
            </button>

            <button
              onClick={() => setActiveTab('child_focus')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'child_focus'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeChild === 'hemali' ? 'Hemali Communicatie' : 'Ridheya Leesheld'}</span>
            </button>

            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Vaardighedenboom</span>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'portfolio'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Woorden &amp; Portfolio</span>
            </button>
          </div>

          {/* Time Filter Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(['7_days', '30_days', '90_days', 'all_time'] as TimeFilter[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeFilter(tf)}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                  timeFilter === tf
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tf === '7_days' ? '7 Dagen' : tf === '30_days' ? '30 Dagen' : tf === '90_days' ? '90 Dagen' : 'Alles'}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Main Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 bg-slate-50/50">
          
          {/* TAB 1: MONTHLY GROWTH CURVES & ASSESSMENTS */}
          {activeTab === 'growth_trends' && (
            <div className="space-y-4">
              
              {/* Baseline vs Current Delta Hero Card */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📈</span>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                        Reële Groeicurve van {childProfile.name}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Vergelijking van Nulmeting ({baseline?.completedDate || 'Juni'}) tot Huidig ({snapshots[snapshots.length - 1]?.monthLabel || 'Augustus'})
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-black text-xs rounded-xl">
                    +15% Gemiddelde Groei
                  </span>
                </div>

                {/* Monthly Snapshots Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  {snapshots.map((snap, idx) => (
                    <div key={snap.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-indigo-950 uppercase">{snap.monthLabel}</span>
                        <span className="text-[11px] font-bold text-slate-500">{snap.date}</span>
                      </div>

                      <div className="space-y-1.5 text-xs font-medium">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Leesvloeiendheid:</span>
                          <strong className="text-teal-900">{snap.readingFluency}% ({snap.wpm} WPM)</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Begrijpend Lezen:</span>
                          <strong className="text-emerald-900">{snap.readingComprehension}%</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Woordenschat:</span>
                          <strong className="text-amber-900">{snap.vocabulary}%</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Spreekdurf / Conf.:</span>
                          <strong className="text-purple-900">{snap.confidence}%</strong>
                        </div>
                      </div>

                      {snap.notes && (
                        <p className="text-[11px] text-slate-600 italic bg-white p-2 rounded-xl border border-slate-200/60 mt-2">
                          "{snap.notes}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill Trees Visual Bar Display */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Vaardigheden &amp; Progressie t.o.v. Baseline</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skillBars.map((skill, i) => {
                    const diff = skill.value - skill.baseline;
                    return (
                      <div key={i} className="space-y-1.5 p-3 rounded-2xl bg-slate-50/70 border border-slate-200">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span>{skill.label}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-emerald-700 font-black">+{diff}%</span>
                            <span className="text-slate-900 font-black">{skill.value}%</span>
                          </div>
                        </div>
                        <div className="h-3 bg-slate-200 rounded-full overflow-hidden p-0.5">
                          <div
                            className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all`}
                            style={{ width: `${skill.value}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                          <span>Start: {skill.baseline}%</span>
                          <span>Doel: 100%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SPECIALIZED CHILD FOCUS DASHBOARD */}
          {activeTab === 'child_focus' && (
            <div>
              {activeChild === 'hemali' ? (
                <CommunicationDashboard
                  profile={childProfile}
                  onOpenReporterModal={() => setShowPlacementModal(true)}
                  onOpenWritingModal={() => setShowWritingModal(true)}
                />
              ) : (
                <ReadingHeroDashboard
                  profile={childProfile}
                  onOpenFluencyTest={() => setShowFluencyModal(true)}
                  onOpenReadingAdventure={() => setShowPlacementModal(true)}
                />
              )}
            </div>
          )}

          {/* TAB 3: COMPLETE SKILL TREE OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Quick Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[11px] font-bold text-slate-500">Totaal Beantwoord</span>
                  <p className="text-xl font-black text-slate-900">{childProfile.totalAnswered}</p>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[11px] font-bold text-slate-500">Nauwkeurigheid</span>
                  <p className="text-xl font-black text-emerald-800">{accuracy}%</p>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[11px] font-bold text-slate-500">Dieren Vrijgespeeld</span>
                  <p className="text-xl font-black text-indigo-900">{childProfile.unlockedAnimals.length} / 42</p>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[11px] font-bold text-slate-500">Sterren Verzameld</span>
                  <p className="text-xl font-black text-amber-900">{childProfile.stars} 🌟</p>
                </div>
              </div>

              {/* Weekly/Monthly Teacher Recommendations */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                    Pedagogisch Week- &amp; Maandadvies
                  </h4>
                </div>

                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs text-emerald-950 space-y-2">
                  <p className="font-bold">
                    🎯 Aanbeveling voor {childProfile.name}:
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    {activeChild === 'hemali'
                      ? 'Hemali blinkt uit in wiskundig redeneren en spelling. Blijf inzetten op de Safari Reporter spraakmissies om haar natuurlijke communicatiekracht en zelfvertrouwen bij open interviews te versterken.'
                      : 'Ridheya boekt grote vooruitgang in leessnelheid (nu 68 WPM). Moedig het dagelijks 10 minuten hardop lezen van safariteksten aan om samengestelde woorden soepel te laten verlopen.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: VOCABULARY & WRITING PORTFOLIO */}
          {activeTab === 'portfolio' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mastered Words */}
                <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-emerald-900">
                      ✅ Beheerste Woorden ({childProfile.masteredWords?.length || 6})
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(childProfile.masteredWords || ['savanne', 'acaciaboom', 'territorium', 'kudde', 'nachtdier', 'koudbloedig']).map((w, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-900 font-bold text-xs border border-emerald-200">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Words Needing Review */}
                <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-amber-900">
                      🔄 Woorden in Herhaling ({childProfile.wordsNeedingReview?.length || 3})
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(childProfile.wordsNeedingReview || ['onmiddellijk', 'enthousiast', 'herbivoor']).map((w, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 font-bold text-xs border border-amber-200">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Writing Samples History */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">
                  📜 Recent Ingezonden Schrijfstukken
                </h4>

                {(childProfile.writingSamples || []).map((ws) => (
                  <div key={ws.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-indigo-950">{ws.promptTitle}</span>
                      <span className="text-slate-500 font-medium">{ws.date} • {ws.wordCount} woorden</span>
                    </div>
                    <p className="text-slate-800 bg-white p-2.5 rounded-xl border border-slate-200/60 italic font-medium">
                      "{ws.userText}"
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-emerald-800 font-bold">
                      <span>Rijkdom: {ws.vocabularyRichnessScore}% | Complexiteit: {ws.sentenceComplexityScore}%</span>
                      <span>Feedback: {ws.teacherFeedback}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 border-t border-slate-200 p-3.5 flex items-center justify-between text-xs text-slate-600">
          <span className="text-[11px]">
            Actieve Safari Leerling: <strong>{childProfile.name}</strong> • Longitudinaal Portfolio
          </span>

          <div className="flex items-center gap-2">
            {onResetProgress && (
              <button
                onClick={onResetProgress}
                className="text-rose-600 hover:text-rose-800 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Voortgang Resetten</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
            >
              Sluiten
            </button>
          </div>
        </div>
      </motion.div>

      {/* Sub-Modals */}
      <SafariPlacementModal
        isOpen={showPlacementModal}
        profile={childProfile}
        onClose={() => setShowPlacementModal(false)}
        onCompletePlacement={(baseline, updated) => {
          if (onUpdateProfile) {
            onUpdateProfile(() => updated);
          }
        }}
      />

      <FluencyAssessmentModal
        isOpen={showFluencyModal}
        profile={childProfile}
        onClose={() => setShowFluencyModal(false)}
        onUpdateProfile={(updater) => {
          if (onUpdateProfile) {
            onUpdateProfile(updater);
          }
        }}
      />

      <WritingEvaluatorModal
        isOpen={showWritingModal}
        profile={childProfile}
        onClose={() => setShowWritingModal(false)}
        onUpdateProfile={(updater) => {
          if (onUpdateProfile) {
            onUpdateProfile(updater);
          }
        }}
      />

      <GrowthMilestonesModal
        isOpen={showMilestonesModal}
        profile={childProfile}
        onClose={() => setShowMilestonesModal(false)}
      />

      <PrintablePortfolioReportModal
        isOpen={showPrintableModal}
        profile={childProfile}
        onClose={() => setShowPrintableModal(false)}
      />
    </div>
  );
};
