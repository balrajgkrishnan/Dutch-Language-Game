import React from 'react';
import { BookOpen, Flame, Timer, TrendingUp, Sparkles, CheckCircle2, Award, Zap, ArrowUpRight } from 'lucide-react';
import { PlayerProfile } from '../../types';

interface ReadingHeroDashboardProps {
  profile: PlayerProfile;
  onOpenFluencyTest?: () => void;
  onOpenReadingAdventure?: () => void;
}

export const ReadingHeroDashboard: React.FC<ReadingHeroDashboardProps> = ({
  profile,
  onOpenFluencyTest,
  onOpenReadingAdventure
}) => {
  const snapshots = profile.monthlySnapshots || [];
  const baseline = profile.baseline;
  const currentFluency = profile.mastery.readingFluency;
  const currentComprehension = profile.mastery.readingComprehension;
  const baselineFluency = baseline?.readingFluency || 48;
  const growthFluency = currentFluency - baselineFluency;

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-900 rounded-3xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between flex-wrap gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-3xl shadow-inner">
              📖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                  Leesheld Dashboard
                </span>
                <span className="text-xs text-teal-200 font-bold">Ridheya Focus (Groep 5)</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                {profile.name}'s Leesavonturen &amp; Vloeiendheid
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenFluencyTest && (
              <button
                onClick={onOpenFluencyTest}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md cursor-pointer transition-all flex items-center gap-1.5"
              >
                <Timer className="w-4 h-4" />
                <span>Nieuwe WPM Test</span>
              </button>
            )}
            {onOpenReadingAdventure && (
              <button
                onClick={onOpenReadingAdventure}
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-all flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4" />
                <span>Leesverhaal Openen</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>⏱️ Leesminuten</span>
            <span className="text-teal-600 font-black">+{profile.readingMinutes}m</span>
          </div>
          <p className="text-2xl font-black text-slate-900">{profile.readingMinutes} min</p>
          <p className="text-[10px] text-slate-400 font-medium">Doel: 15 min per dag</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>🔥 Leesreeks</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{profile.streak} dagen</p>
          <p className="text-[10px] text-slate-400 font-medium">Hoogste reeks: {profile.highestStreak}d</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>⚡ Leessnelheid</span>
            <span className="text-emerald-600 font-black">+{growthFluency}%</span>
          </div>
          <p className="text-2xl font-black text-slate-900">
            {profile.fluencySessions?.[0]?.wpm || 68} <span className="text-xs font-normal text-slate-500">WPM</span>
          </p>
          <p className="text-[10px] text-emerald-600 font-bold">Start: {baseline?.initialWpm || 52} WPM</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>📚 Begrip Score</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{currentComprehension}%</p>
          <p className="text-[10px] text-teal-600 font-bold">Uitstekend begrip</p>
        </div>
      </div>

      {/* Monthly Fluency Growth Chart Visualizer */}
      <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Maandelijkse Leesvloeiendheid &amp; WPM Groeicurve
            </h4>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            +{growthFluency}% Totale Groei
          </span>
        </div>

        {/* Visual Growth Bars */}
        <div className="space-y-3 pt-2">
          {snapshots.map((snap, idx) => (
            <div key={snap.id} className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>{snap.monthLabel}</span>
                <span className="text-teal-900 font-black">{snap.wpm} Woorden/min ({snap.readingFluency}%)</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all"
                  style={{ width: `${snap.readingFluency}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehension Dimensions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-1">
          <div className="text-xs font-bold text-emerald-900">🔍 Letterlijk Begrip</div>
          <p className="text-lg font-black text-emerald-950">84%</p>
          <p className="text-[10px] text-slate-600">Vindt feiten direct in de safaritekst</p>
        </div>
        <div className="p-3.5 bg-teal-50/70 border border-teal-200 rounded-2xl space-y-1">
          <div className="text-xs font-bold text-teal-900">💡 Conclusies &amp; Inzicht</div>
          <p className="text-lg font-black text-teal-950">72%</p>
          <p className="text-[10px] text-slate-600">Begrijpt waarom dieren bepaald gedrag vertonen</p>
        </div>
        <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-2xl space-y-1">
          <div className="text-xs font-bold text-indigo-900">🔮 Voorspellen &amp; Volgorde</div>
          <p className="text-lg font-black text-indigo-950">78%</p>
          <p className="text-[10px] text-slate-600">Rangschikt gebeurtenissen chronologisch</p>
        </div>
      </div>
    </div>
  );
};
