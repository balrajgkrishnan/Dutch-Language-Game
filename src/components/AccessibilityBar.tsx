import React from 'react';
import { Type, Eye, Volume2, Sparkles } from 'lucide-react';
import { AccessibilitySettings } from '../types';
import { sound } from '../services/soundService';

interface AccessibilityBarProps {
  settings: AccessibilitySettings;
  onChangeSettings: (updater: (prev: AccessibilitySettings) => AccessibilitySettings) => void;
  onOpenVoiceModal?: () => void;
  onOpenDictionaryModal?: () => void;
}

export const AccessibilityBar: React.FC<AccessibilityBarProps> = ({
  settings,
  onChangeSettings,
  onOpenVoiceModal,
  onOpenDictionaryModal
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-1.5 flex items-center justify-between gap-2 text-xs flex-wrap bg-white/70 backdrop-blur-xs rounded-2xl border border-slate-200 shadow-2xs mb-2">
      <div className="flex items-center gap-1.5 text-slate-700 font-black text-[11px]">
        <Eye className="w-3.5 h-3.5 text-emerald-700" />
        <span>Toegankelijkheid &amp; Leeshulp:</span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {/* Dictionary Button */}
        {onOpenDictionaryModal && (
          <button
            onClick={() => {
              sound.playPop();
              onOpenDictionaryModal();
            }}
            className="px-2.5 py-1 rounded-xl text-[10px] font-black cursor-pointer transition-all bg-amber-50 hover:bg-amber-100 text-amber-900 shadow-2xs flex items-center gap-1 border border-amber-300 active:scale-95"
            title="Open het interactieve Nederlandse woordenboek"
          >
            <span>📖 Woordenboek</span>
          </button>
        )}

        {/* Voice Persona / Audio Tuning Button */}
        {onOpenVoiceModal && (
          <button
            onClick={() => {
              sound.playPop();
              onOpenVoiceModal();
            }}
            className="px-2.5 py-1 rounded-xl text-[10px] font-black cursor-pointer transition-all bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-2xs flex items-center gap-1 border border-amber-600 active:scale-95"
            title="Kies een vrolijke, vrouwelijke voorleesstem of stel de snelheid in"
          >
            <span>🎙️ Vrolijke Stem 🌸</span>
          </button>
        )}

        {/* Dyslexia Font Button */}
        <button
          onClick={() => {
            sound.playPop();
            onChangeSettings(prev => ({ ...prev, dyslexiaFont: !prev.dyslexiaFont }));
          }}
          className={`px-2.5 py-1 rounded-xl text-[10px] font-black cursor-pointer transition-all border ${
            settings.dyslexiaFont
              ? 'bg-emerald-600 text-white border-emerald-700'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
          title="Schakel dyslexie-vriendelijk lettertype in"
        >
          Dyslexie Font {settings.dyslexiaFont ? 'Aan' : 'Uit'}
        </button>

        {/* Font Size Selector */}
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-0.5">
          <button
            onClick={() => {
              sound.playPop();
              onChangeSettings(prev => ({ ...prev, fontSize: 'normal' }));
            }}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-black cursor-pointer ${
              settings.fontSize === 'normal' ? 'bg-emerald-100 text-emerald-900' : 'text-slate-600'
            }`}
          >
            A
          </button>
          <button
            onClick={() => {
              sound.playPop();
              onChangeSettings(prev => ({ ...prev, fontSize: 'large' }));
            }}
            className={`px-2 py-0.5 rounded-lg text-[11px] font-black cursor-pointer ${
              settings.fontSize === 'large' ? 'bg-emerald-100 text-emerald-900' : 'text-slate-600'
            }`}
          >
            A+
          </button>
          <button
            onClick={() => {
              sound.playPop();
              onChangeSettings(prev => ({ ...prev, fontSize: 'xlarge' }));
            }}
            className={`px-2 py-0.5 rounded-lg text-[12px] font-black cursor-pointer ${
              settings.fontSize === 'xlarge' ? 'bg-emerald-100 text-emerald-900' : 'text-slate-600'
            }`}
          >
            A++
          </button>
        </div>

        {/* High Contrast */}
        <button
          onClick={() => {
            sound.playPop();
            onChangeSettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
          }}
          className={`px-2.5 py-1 rounded-xl text-[10px] font-black cursor-pointer transition-all border ${
            settings.highContrast
              ? 'bg-slate-900 text-yellow-300 border-slate-900'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
          title="Hoog contrast weergave"
        >
          {settings.highContrast ? 'Hoog Contrast Aan' : 'Normaal'}
        </button>
      </div>
    </div>
  );
};
