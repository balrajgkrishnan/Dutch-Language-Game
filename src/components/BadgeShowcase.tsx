import React from 'react';
import { Award, Lock, Sparkles, CheckCircle } from 'lucide-react';
import { Badge } from '../types';
import { sound } from '../services/soundService';

interface BadgeShowcaseProps {
  badges: Badge[];
  totalCorrect: number;
  highestStreak: number;
  unlockedAnimalsCount: number;
  totalFedCount: number;
}

export const BadgeShowcase: React.FC<BadgeShowcaseProps> = ({
  badges,
  totalCorrect,
  highestStreak,
  unlockedAnimalsCount,
  totalFedCount
}) => {
  const unlockedBadges = badges.filter(b => b.unlocked);

  const getCategoryTitle = (cat: string) => {
    switch (cat) {
      case 'spelling':
        return '🔤 Taal & Begrip Medailles';
      case 'streaks':
        return '🔥 Snelle Denker Badges';
      case 'safari':
        return '🐾 Natuur & Dieren Trofeeën';
      case 'feeding':
        return '🍏 Dierenverzorging & Vriendschap';
      default:
        return '⭐ Safari Badges';
    }
  };

  const categories = ['safari', 'spelling', 'streaks', 'feeding'] as const;

  return (
    <div id="badge-showcase-container" className="w-full max-w-5xl mx-auto px-4 py-2">
      {/* Banner */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 mb-6 shadow-xl shadow-emerald-950/5 border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-amber-100/80 border border-amber-300 flex items-center justify-center text-xl shadow-xs">
              🎖️
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tight">
                Ere-Galerij & Medailles
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm font-medium">
                Verzamel alle glimmende trofeeën door goed te spellen, te lezen en dieren te verzorgen!
              </p>
            </div>
          </div>
        </div>

        {/* Badge Count Pill */}
        <div className="bg-amber-100/80 px-4 py-2 rounded-full border border-amber-300 font-black text-xs sm:text-sm text-amber-900 uppercase tracking-wider flex items-center gap-2 shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>{unlockedBadges.length}/{badges.length} Vrijgespeeld</span>
        </div>
      </div>

      {/* Badges By Category */}
      <div className="space-y-6">
        {categories.map(cat => {
          const categoryBadges = badges.filter(b => b.category === cat);
          if (categoryBadges.length === 0) return null;

          return (
            <div key={cat} className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-xl shadow-emerald-950/5 border border-emerald-100">
              <h3 className="text-sm sm:text-base font-black text-slate-800 mb-4 flex items-center gap-2 pb-2 border-b border-slate-100 uppercase tracking-wider">
                <span>{getCategoryTitle(cat)}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {categoryBadges.map(badge => {
                  return (
                    <div
                      key={badge.id}
                      id={`badge-card-${badge.id}`}
                      onClick={() => {
                        if (badge.unlocked) {
                          sound.playStar();
                        } else {
                          sound.playPop();
                        }
                      }}
                      className={`p-4 rounded-2xl border transition-all relative flex items-start gap-3.5 cursor-pointer ${
                        badge.unlocked
                          ? 'bg-white hover:bg-emerald-50/40 border-emerald-200 shadow-sm hover:shadow-md -translate-y-0.5'
                          : 'bg-slate-50 border-slate-200 opacity-60'
                      }`}
                    >
                      {/* Badge Icon Box */}
                      <div
                        className={`w-13 h-13 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl border ${
                          badge.unlocked
                            ? 'bg-gradient-to-br from-amber-100 to-emerald-100 border-amber-300 shadow-inner'
                            : 'bg-slate-100 border-slate-200 text-slate-400'
                        }`}
                      >
                        <span className={`select-none ${badge.unlocked ? '' : 'filter grayscale opacity-40'}`}>
                          {badge.unlocked ? badge.emoji : '🔒'}
                        </span>
                      </div>

                      {/* Badge Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <h4 className={`font-black text-sm truncate ${
                            badge.unlocked ? 'text-slate-900' : 'text-slate-500'
                          }`}>
                            {badge.name}
                          </h4>
                          {badge.unlocked && (
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          )}
                        </div>

                        <p className="text-xs text-slate-500 font-medium leading-tight mb-2">
                          {badge.description}
                        </p>

                        <div className="inline-block text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 uppercase">
                          {badge.condition}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
