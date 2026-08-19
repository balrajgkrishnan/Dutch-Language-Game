import React from 'react';
import { Mic, Sparkles, TrendingUp, Award, MessageSquare, BookOpen, PenTool, CheckCircle2, Zap } from 'lucide-react';
import { PlayerProfile } from '../../types';

interface CommunicationDashboardProps {
  profile: PlayerProfile;
  onOpenReporterModal?: () => void;
  onOpenWritingModal?: () => void;
}

export const CommunicationDashboard: React.FC<CommunicationDashboardProps> = ({
  profile,
  onOpenReporterModal,
  onOpenWritingModal
}) => {
  const snapshots = profile.monthlySnapshots || [];
  const baseline = profile.baseline;
  const currentConfidence = profile.mastery.confidence;
  const currentSpeaking = profile.mastery.speaking;
  const baselineConfidence = baseline?.confidence || 42;
  const growthConfidence = currentConfidence - baselineConfidence;

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-800 via-purple-800 to-indigo-950 rounded-3xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between flex-wrap gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-3xl shadow-inner">
              🎙️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                  Communicatie &amp; Spreekdurf
                </span>
                <span className="text-xs text-indigo-200 font-bold">Hemali Focus (Groep 8)</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                {profile.name}'s Journalistiek &amp; Zelfvertrouwen
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenReporterModal && (
              <button
                onClick={onOpenReporterModal}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md cursor-pointer transition-all flex items-center gap-1.5"
              >
                <Mic className="w-4 h-4" />
                <span>Reporter Missie Starten</span>
              </button>
            )}
            {onOpenWritingModal && (
              <button
                onClick={onOpenWritingModal}
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-all flex items-center gap-1.5"
              >
                <PenTool className="w-4 h-4" />
                <span>Schrijfstudio</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>🦁 Spreekdurf</span>
            <span className="text-emerald-600 font-black">+{growthConfidence}%</span>
          </div>
          <p className="text-2xl font-black text-slate-900">{currentConfidence}%</p>
          <p className="text-[10px] text-emerald-600 font-bold">Start: {baselineConfidence}% (Nulmeting)</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>🎙️ Reporter Missies</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{profile.confidenceMetrics?.speakingMissionsCount || 6}</p>
          <p className="text-[10px] text-slate-400 font-medium">Voltooide nieuwsberichten</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>💬 Mondelinge Uitleg</span>
            <MessageSquare className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{profile.confidenceMetrics?.voluntaryExplanationsCount || 8}</p>
          <p className="text-[10px] text-slate-400 font-medium">Vrijwillig ingesproken</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>✍️ Schrijfstukken</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{profile.writingSamples?.length || 1}</p>
          <p className="text-[10px] text-indigo-600 font-bold">Rijke zinsopbouw</p>
        </div>
      </div>

      {/* Monthly Confidence Curve Chart */}
      <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Maandelijkse Spreekdurf &amp; Zelfvertrouwen Groeicurve
            </h4>
          </div>
          <span className="text-xs font-bold text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
            +{growthConfidence}% Stijging
          </span>
        </div>

        {/* Visual Bars for Hemali's Confidence Growth */}
        <div className="space-y-3 pt-2">
          {snapshots.map((snap) => (
            <div key={snap.id} className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>{snap.monthLabel}</span>
                <span className="text-indigo-900 font-black">Zelfvertrouwen: {snap.confidence}% | Spraak: {snap.pronunciation}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                  style={{ width: `${snap.confidence}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Communication Strengths */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-2xl space-y-1">
          <div className="text-xs font-bold text-indigo-900">🗣️ Duidelijke Articulatie</div>
          <p className="text-lg font-black text-indigo-950">{profile.mastery.pronunciation}%</p>
          <p className="text-[10px] text-slate-600">Heldere klemtonen en uitspraak</p>
        </div>
        <div className="p-3.5 bg-purple-50/70 border border-purple-200 rounded-2xl space-y-1">
          <div className="text-xs font-bold text-purple-900">📚 Woordkeuze &amp; Expressie</div>
          <p className="text-lg font-black text-purple-950">{profile.mastery.vocabulary}%</p>
          <p className="text-[10px] text-slate-600">Gebruikt academische en journalistieke woorden</p>
        </div>
        <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-1">
          <div className="text-xs font-bold text-amber-900">🌟 Vragen Durven Stellen</div>
          <p className="text-lg font-black text-amber-950">75%</p>
          <p className="text-[10px] text-slate-600">Actieve deelname tijdens safarivragen</p>
        </div>
      </div>
    </div>
  );
};
