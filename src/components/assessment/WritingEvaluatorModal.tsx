import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PenTool, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Award, 
  X, 
  Flame, 
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { PlayerProfile, WritingSample } from '../../types';
import { sound } from '../../services/soundService';
import confetti from 'canvas-confetti';

interface WritingEvaluatorModalProps {
  isOpen: boolean;
  profile: PlayerProfile;
  onClose: () => void;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
}

const WRITING_PROMPTS = [
  {
    id: 'prompt_1',
    title: 'De Geheime Grot Achter de Waterval',
    category: 'Creatief & Avontuurlijk',
    prompt: 'Jij en jouw metgezel ontdekken een geheime doorgang achter de brullende safarivaterval. Wat zien, horen en voelen jullie binnen?',
    starter: 'Toen we door het kletterende water stapten, zagen we...'
  },
  {
    id: 'prompt_2',
    title: 'Het Pleidooi van de Veldwachter',
    category: 'Mening & Overtuiging (Hemali Focus)',
    prompt: 'Waarom is het beschermen van bedreigde dieren zoals de neushoorn en cheeta zo belangrijk voor ons hele ecosysteem?',
    starter: 'Ik vind dat we dieren moeten beschermen, omdat...'
  },
  {
    id: 'prompt_3',
    title: 'Een Verrassing op de Boerderij',
    category: 'Verhalend (Ridheya Focus)',
    prompt: 'Bella de koe heeft vannacht stiekem het hek geopend en alle boerderijdieren meegenomen naar de boomgaard. Wat gebeurt er als Boerin Tess wakker wordt?',
    starter: 'De zon kwam op en plotseling hoorde Tess...'
  }
];

export const WritingEvaluatorModal: React.FC<WritingEvaluatorModalProps> = ({
  isOpen,
  profile,
  onClose,
  onUpdateProfile
}) => {
  const [selectedPromptIdx, setSelectedPromptIdx] = useState(
    profile.name.toLowerCase() === 'hemali' ? 1 : 2
  );
  const [textInput, setTextInput] = useState('');
  const [analyzedSample, setAnalyzedSample] = useState<WritingSample | null>(null);

  if (!isOpen) return null;

  const currentPrompt = WRITING_PROMPTS[selectedPromptIdx] || WRITING_PROMPTS[0];

  const handleAnalyze = () => {
    const rawText = textInput.trim();
    if (!rawText) return;

    const words = rawText.split(/\s+/);
    const wordCount = words.length;
    const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^a-z0-9äöüëï]/gi, '')));
    const uniqueCount = uniqueWords.size;

    // Richness: ratio of unique to total words
    const richnessRatio = wordCount > 0 ? (uniqueCount / wordCount) : 0;
    const vocabularyRichnessScore = Math.min(100, Math.round(richnessRatio * 85 + Math.min(15, wordCount / 2)));

    // Connective words for complexity
    const connectives = ['omdat', 'doordat', 'want', 'terwijl', 'hoewel', 'zodra', 'daardoor', 'waardoor', 'echter', 'tenslotte'];
    const connectiveCount = words.filter(w => connectives.includes(w.toLowerCase())).length;
    const sentenceComplexityScore = Math.min(100, Math.round(55 + (connectiveCount * 12) + (wordCount >= 20 ? 15 : 5)));

    const grammarScore = Math.min(100, Math.round(75 + (rawText.endsWith('.') || rawText.endsWith('!') ? 10 : 0) + (rawText[0] === rawText[0]?.toUpperCase() ? 10 : 0)));
    const creativityScore = Math.min(100, Math.round(70 + Math.min(25, wordCount)));
    const structureScore = Math.min(100, Math.round((sentenceComplexityScore + grammarScore) / 2));

    let feedback = 'Mooie creatieve beschrijving!';
    if (wordCount >= 25 && connectiveCount >= 2) {
      feedback = 'Uitstekend! Je gebruikt sterke verbindingswoorden en een rijke woordenschat met prachtige details.';
    } else if (wordCount >= 12) {
      feedback = 'Goed geschreven! Probeer de volgende keer nog een extra verbindingswoord zoals "omdat" of "terwijl" toe te voegen.';
    }

    const sample: WritingSample = {
      id: `write_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now(),
      promptTitle: currentPrompt.title,
      userText: rawText,
      wordCount,
      uniqueWordsCount: uniqueCount,
      vocabularyRichnessScore,
      sentenceComplexityScore,
      grammarScore,
      creativityScore,
      structureScore,
      teacherFeedback: feedback
    };

    setAnalyzedSample(sample);

    onUpdateProfile(prev => {
      const updatedSamples = [sample, ...(prev.writingSamples || [])];
      return {
        ...prev,
        stars: prev.stars + 50,
        score: prev.score + 50,
        writingSamples: updatedSamples,
        mastery: {
          ...prev.mastery,
          writing: Math.min(100, Math.round((prev.mastery.writing + structureScore) / 2)),
          vocabulary: Math.min(100, prev.mastery.vocabulary + 1)
        }
      };
    });

    sound.playLevelUp();
    try {
      confetti({ particleCount: 60, spread: 70 });
    } catch {
      // ignore
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-indigo-500/20 overflow-hidden flex flex-col my-auto"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-950 p-5 sm:p-6 text-white relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-2xl shadow-inner">
                  ✍️
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                    Safari Schrijfstudio &amp; Tekstanalyse
                  </h2>
                  <p className="text-xs sm:text-sm text-indigo-200">
                    Schrijf jouw verhaal en meet jouw woordrijkdom, zinsbouw en structuur
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Prompt Selector */}
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
              {WRITING_PROMPTS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedPromptIdx(idx);
                    setAnalyzedSample(null);
                    sound.playPop();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedPromptIdx === idx
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 space-y-5 overflow-y-auto max-h-[70vh]">
            {!analyzedSample ? (
              <div className="space-y-4">
                {/* Prompt Card */}
                <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-indigo-900 tracking-wider">
                      🎯 {currentPrompt.category}
                    </span>
                    <span className="text-xs font-bold text-indigo-700">
                      {profile.companion.emoji} {profile.companion.name} kijkt mee
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 leading-snug">
                    {currentPrompt.prompt}
                  </p>
                  <div className="text-xs text-indigo-950 font-medium bg-white/80 p-2.5 rounded-xl border border-indigo-200/60 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Beginzin ter inspiratie: <em>"{currentPrompt.starter}"</em></span>
                  </div>
                </div>

                {/* Text Area */}
                <div className="space-y-2">
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Schrijf hier jouw tekst in het Nederlands..."
                    rows={6}
                    className="w-full p-4 border border-slate-300 rounded-2xl text-sm focus:outline-indigo-600 focus:ring-2 focus:ring-indigo-200 leading-relaxed"
                  />
                  <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                    <span>Woorden: {textInput.trim() ? textInput.trim().split(/\s+/).length : 0}</span>
                    <span>Tip: Gebruik verbindingswoorden (omdat, want, terwijl)</span>
                  </div>
                </div>

                {/* Submit button */}
                <div className="flex justify-end pt-2">
                  <button
                    disabled={!textInput.trim()}
                    onClick={handleAnalyze}
                    className={`px-6 py-3 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer transition-all ${
                      textInput.trim()
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Analyseer Schrijfvaardigheid (+50 🌟)</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Writing Analysis Results */
              <div className="space-y-5 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-indigo-100 border-2 border-indigo-300 text-3xl shadow-sm">
                  📜
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">
                    Schrijfbeoordeling &amp; Groei
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Docentenfeedback en structurele score voor {profile.name}
                  </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-left">
                  <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-200">
                    <span className="text-xs font-bold text-indigo-800">🔤 Woordrijkdom</span>
                    <p className="text-xl font-black text-indigo-950">{analyzedSample.vocabularyRichnessScore}%</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200">
                    <span className="text-xs font-bold text-purple-800">🏗️ Zinscomplexiteit</span>
                    <p className="text-xl font-black text-purple-950">{analyzedSample.sentenceComplexityScore}%</p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                    <span className="text-xs font-bold text-emerald-800">✨ Creativiteit</span>
                    <p className="text-xl font-black text-emerald-950">{analyzedSample.creativityScore}%</p>
                  </div>
                  <div className="p-3 bg-teal-50 rounded-2xl border border-teal-200">
                    <span className="text-xs font-bold text-teal-800">✍️ Totale Structuur</span>
                    <p className="text-xl font-black text-teal-950">{analyzedSample.structureScore}%</p>
                  </div>
                </div>

                {/* Feedback Box */}
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-left space-y-1">
                  <span className="text-xs font-black text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Feedback van {profile.companion.name}:</span>
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium">
                    "{analyzedSample.teacherFeedback}"
                  </p>
                </div>

                <div className="flex gap-2 justify-center pt-2">
                  <button
                    onClick={() => {
                      setAnalyzedSample(null);
                      setTextInput('');
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer"
                  >
                    Nog een tekst schrijven
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Sluiten
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
