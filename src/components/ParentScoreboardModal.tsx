import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  Flame, 
  Sparkles, 
  Star, 
  X, 
  Users,
  Activity,
  Award,
  ChevronRight
} from 'lucide-react';
import { getAllUsersProfiles, getDefaultProfileForUser } from '../services/authService';
import { PlayerProfile, ActivityLogItem } from '../types';
import { sound } from '../services/soundService';

interface ParentScoreboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUser: (username: string) => void;
}

export const ParentScoreboardModal: React.FC<ParentScoreboardModalProps> = ({
  isOpen,
  onClose,
  onSelectUser
}) => {
  const [activeDaughter, setActiveDaughter] = useState<'all' | 'Hemali' | 'Ridheya'>('all');
  const [selectedDay, setSelectedDay] = useState<string>('today');

  if (!isOpen) return null;

  const allProfiles = getAllUsersProfiles();
  const hemaliProfile: PlayerProfile = allProfiles['Hemali'] || getDefaultProfileForUser('Hemali');
  const ridheyaProfile: PlayerProfile = allProfiles['Ridheya'] || getDefaultProfileForUser('Ridheya');

  const todayStr = new Date().toLocaleDateString('nl-NL', { day: '2-digit', month: '2-digit', year: 'numeric' });

  // Compute logs for Hemali & Ridheya
  const hemaliLogs = hemaliProfile.activityLogs || [];
  const ridheyaLogs = ridheyaProfile.activityLogs || [];

  const hemaliTodayLogs = hemaliLogs.filter(l => l.dateFormatted === todayStr);
  const ridheyaTodayLogs = ridheyaLogs.filter(l => l.dateFormatted === todayStr);

  // Group hourly logs for today
  const getHourlyStats = (logs: ActivityLogItem[]) => {
    const hoursMap: Record<number, { hour: number; correct: number; total: number }> = {};
    for (let h = 0; h < 24; h++) {
      hoursMap[h] = { hour: h, correct: 0, total: 0 };
    }
    logs.forEach(l => {
      const h = new Date(l.timestamp).getHours();
      if (hoursMap[h]) {
        hoursMap[h].total += 1;
        if (l.isCorrect) hoursMap[h].correct += 1;
      }
    });
    return Object.values(hoursMap).filter(item => item.total > 0);
  };

  const hemaliHourly = getHourlyStats(hemaliTodayLogs);
  const ridheyaHourly = getHourlyStats(ridheyaTodayLogs);

  const getAccuracy = (correct: number, total: number) => {
    if (!total || total === 0) return '0%';
    return `${Math.round((correct / total) * 100)}%`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-4xl bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-200 text-slate-800 relative max-h-[90vh] flex flex-col"
        >
          {/* Top Bar Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xl">
                📊
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                  Ouder Dashboard &amp; Scorebord
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Volg de dagelijkse en uurlijkse leervoortgang van Hemali &amp; Ridheya
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Tabs (All / Hemali / Ridheya) */}
          <div className="flex items-center justify-between gap-2 mt-4 flex-shrink-0 flex-wrap">
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl">
              <button
                onClick={() => setActiveDaughter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeDaughter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Beide Dochters
              </button>
              <button
                onClick={() => setActiveDaughter('Hemali')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeDaughter === 'Hemali'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                👧 Hemali (Groep 6-7-8)
              </button>
              <button
                onClick={() => setActiveDaughter('Ridheya')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeDaughter === 'Ridheya'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                👩‍🌾 Ridheya (Groep 4-5)
              </button>
            </div>

            <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              <span>Vandaag: {todayStr}</span>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="mt-4 space-y-5 overflow-y-auto pr-1">
            
            {/* 1. Comparison Scorecards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* CARD 1: HEMALI */}
              {(activeDaughter === 'all' || activeDaughter === 'Hemali') && (
                <div className="bg-gradient-to-br from-amber-50/90 to-orange-50/50 rounded-2xl p-4 border border-amber-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="text-3xl">👧</div>
                      <div>
                        <h3 className="font-black text-slate-900 text-base flex items-center gap-1.5">
                          <span>Hemali</span>
                          <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                            Groep 6-7-8
                          </span>
                        </h3>
                        <span className="text-xs text-slate-500 font-medium">
                          {hemaliProfile.avatarTitle || 'De Dierenredder'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onSelectUser('Hemali');
                        onClose();
                      }}
                      className="text-xs font-bold text-amber-800 bg-white hover:bg-amber-100 px-2.5 py-1.5 rounded-xl border border-amber-300 shadow-2xs cursor-pointer flex items-center gap-1"
                    >
                      <span>Speel Nu</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-4 gap-2 text-center pt-2 border-t border-amber-200/60">
                    <div className="bg-white/80 rounded-xl p-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Vandaag</div>
                      <div className="text-sm font-black text-amber-900">{hemaliTodayLogs.length} v.</div>
                    </div>
                    <div className="bg-white/80 rounded-xl p-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Nauwkeurig</div>
                      <div className="text-sm font-black text-emerald-700">
                        {getAccuracy(hemaliTodayLogs.filter(l => l.isCorrect).length, hemaliTodayLogs.length)}
                      </div>
                    </div>
                    <div className="bg-white/80 rounded-xl p-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Dieren</div>
                      <div className="text-sm font-black text-indigo-700">
                        {(hemaliProfile.unlockedAnimals || []).length}/42
                      </div>
                    </div>
                    <div className="bg-white/80 rounded-xl p-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Sterren</div>
                      <div className="text-sm font-black text-amber-600">{hemaliProfile.stars || 0} 🌟</div>
                    </div>
                  </div>
                </div>
              )}

              {/* CARD 2: RIDHEYA */}
              {(activeDaughter === 'all' || activeDaughter === 'Ridheya') && (
                <div className="bg-gradient-to-br from-emerald-50/90 to-teal-50/50 rounded-2xl p-4 border border-emerald-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="text-3xl">👩‍🌾</div>
                      <div>
                        <h3 className="font-black text-slate-900 text-base flex items-center gap-1.5">
                          <span>Ridheya</span>
                          <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                            Groep 4-5
                          </span>
                        </h3>
                        <span className="text-xs text-slate-500 font-medium">
                          {ridheyaProfile.avatarTitle || 'De Vrolijke Boerderijheld'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onSelectUser('Ridheya');
                        onClose();
                      }}
                      className="text-xs font-bold text-emerald-800 bg-white hover:bg-emerald-100 px-2.5 py-1.5 rounded-xl border border-emerald-300 shadow-2xs cursor-pointer flex items-center gap-1"
                    >
                      <span>Speel Nu</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-4 gap-2 text-center pt-2 border-t border-emerald-200/60">
                    <div className="bg-white/80 rounded-xl p-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Vandaag</div>
                      <div className="text-sm font-black text-emerald-900">{ridheyaTodayLogs.length} v.</div>
                    </div>
                    <div className="bg-white/80 rounded-xl p-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Nauwkeurig</div>
                      <div className="text-sm font-black text-emerald-700">
                        {getAccuracy(ridheyaTodayLogs.filter(l => l.isCorrect).length, ridheyaTodayLogs.length)}
                      </div>
                    </div>
                    <div className="bg-white/80 rounded-xl p-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Dieren</div>
                      <div className="text-sm font-black text-indigo-700">
                        {(ridheyaProfile.unlockedAnimals || []).length}/42
                      </div>
                    </div>
                    <div className="bg-white/80 rounded-xl p-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Sterren</div>
                      <div className="text-sm font-black text-amber-600">{ridheyaProfile.stars || 0} 🌟</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Hourly Breakdown for Today */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>Uurlijkse Activiteit Vandaag ({todayStr})</span>
                </h4>
                <span className="text-[11px] text-slate-500 font-semibold">
                  Totaal {hemaliTodayLogs.length + ridheyaTodayLogs.length} vragen beantwoord
                </span>
              </div>

              {/* Hourly Rows */}
              {(hemaliHourly.length === 0 && ridheyaHourly.length === 0) ? (
                <div className="py-6 text-center text-xs text-slate-400 font-medium">
                  Nog geen activiteit gelogd vandaag. Zodra de meiden vragen beantwoorden verschijnt hier het uurlijkse overzicht! 🌟
                </div>
              ) : (
                <div className="space-y-2">
                  {/* Hemali hours */}
                  {hemaliHourly.map(item => (
                    <div key={`h-hemali-${item.hour}`} className="bg-white rounded-xl p-2.5 border border-slate-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-700 w-16">{item.hour}:00 - {item.hour + 1}:00</span>
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md">👧 Hemali</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-600 font-bold">{item.total} vragen</span>
                        <span className="text-emerald-600 font-black">{item.correct} goed ({getAccuracy(item.correct, item.total)})</span>
                      </div>
                    </div>
                  ))}

                  {/* Ridheya hours */}
                  {ridheyaHourly.map(item => (
                    <div key={`h-ridheya-${item.hour}`} className="bg-white rounded-xl p-2.5 border border-slate-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-700 w-16">{item.hour}:00 - {item.hour + 1}:00</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md">👩‍🌾 Ridheya</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-600 font-bold">{item.total} vragen</span>
                        <span className="text-emerald-600 font-black">{item.correct} goed ({getAccuracy(item.correct, item.total)})</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Recent Questions Log */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
              <h4 className="font-black text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>Recente Vragen Logboek</span>
              </h4>

              <div className="space-y-1.5 max-h-56 overflow-y-auto">
                {([...hemaliLogs, ...ridheyaLogs].sort((a, b) => b.timestamp - a.timestamp).slice(0, 15)).map(log => {
                  return (
                    <div key={log.id} className="bg-white rounded-xl p-2.5 border border-slate-200 flex items-center justify-between text-xs gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        {log.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                        )}
                        <span className="text-[11px] text-slate-400 font-mono flex-shrink-0">{log.timeFormatted}</span>
                        <span className="font-bold text-slate-700 truncate">{log.question}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                          {log.category}
                        </span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                          log.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {log.isCorrect ? `+${log.pointsEarned} pt` : '0 pt'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Footer Action */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end flex-shrink-0">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer transition-colors shadow-xs"
            >
              Sluiten
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
