import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Search, Volume2, Sparkles, X, Puzzle, ArrowRight } from 'lucide-react';
import { DUTCH_DICTIONARY_DB, DictionaryEntry } from '../data/dutchDictionaryData';
import { lookupDutchWord, searchDictionaryWords } from '../services/dutchDictionaryService';
import { sound } from '../services/soundService';

interface DutchDictionaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

type TabType = 'all' | 'cito' | 'compounds' | 'verbs';

export const DutchDictionaryModal: React.FC<DutchDictionaryModalProps> = ({
  isOpen,
  onClose,
  initialQuery = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [selectedWord, setSelectedWord] = useState<DictionaryEntry | null>(null);

  // Filtered dictionary entries
  const displayedEntries = useMemo(() => {
    if (searchQuery.trim().length > 0) {
      return searchDictionaryWords(searchQuery, 25);
    }

    const all = Object.values(DUTCH_DICTIONARY_DB);

    switch (activeTab) {
      case 'cito':
        return all.filter(e => e.citoCategory !== undefined || e.wordType.includes('Signaalwoord'));
      case 'compounds':
        return all.filter(e => e.compound !== undefined);
      case 'verbs':
        return all.filter(e => e.wordType === 'Werkwoord');
      case 'all':
      default:
        return all;
    }
  }, [searchQuery, activeTab]);

  const handleSpeak = (entry: DictionaryEntry, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sound.speakDutch(`${entry.word}. ${entry.meaningNl}`);
  };

  const handleLookupCustomWord = (word: string) => {
    const entry = lookupDutchWord(word);
    setSelectedWord(entry);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-4 sm:p-5 text-white flex items-center justify-between gap-3 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner border border-white/30">
                📖
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                  <span>Nederlands Woordenboek</span>
                  <span className="text-xs bg-amber-300/30 text-amber-100 font-bold px-2 py-0.5 rounded-full border border-amber-200/40">
                    Voor Ridheya & Hemali
                  </span>
                </h2>
                <p className="text-xs text-amber-100 font-medium">
                  Zweef over elk woord in verhalen voor directe betekenis & uitspraak!
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-white/20 hover:bg-white/30 text-white cursor-pointer transition-colors"
              title="Sluiten"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="p-4 bg-amber-50/70 border-b border-amber-200/60 flex-shrink-0 space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-5 h-5 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Typ een Nederlands woord (bijv. desondanks, onderzoekschip, lopen, achterdochtig)..."
                className="w-full pl-11 pr-10 py-3 bg-white rounded-2xl border-2 border-amber-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-200 outline-hidden font-bold text-slate-800 text-sm placeholder:text-slate-400 shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-black">
              <button
                onClick={() => {
                  setActiveTab('all');
                  setSearchQuery('');
                }}
                className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'all' && !searchQuery
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Alle Woorden ({Object.keys(DUTCH_DICTIONARY_DB).length}+)</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('cito');
                  setSearchQuery('');
                }}
                className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'cito' && !searchQuery
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-indigo-50 border border-indigo-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Cito Signaalwoorden (Hemali)</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('compounds');
                  setSearchQuery('');
                }}
                className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'compounds' && !searchQuery
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 border border-emerald-200'
                }`}
              >
                <Puzzle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Samenstellingen [Stam + Woord]</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('verbs');
                  setSearchQuery('');
                }}
                className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'verbs' && !searchQuery
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-orange-50 border border-orange-200'
                }`}
              >
                <span>🏃 Werkwoorden</span>
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column: Word List */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-black text-slate-500 uppercase px-1">
                <span>Gevonden Woorden ({displayedEntries.length})</span>
                <span className="text-[11px] text-amber-700 font-bold">Klik voor details</span>
              </div>

              {displayedEntries.length === 0 ? (
                <div className="bg-amber-50/60 rounded-2xl p-6 text-center border-2 border-dashed border-amber-200 text-slate-600">
                  <p className="font-bold text-sm mb-1">Geen exact woord gevonden.</p>
                  <p className="text-xs mb-3">Onze slimme ontleder kan dit woord alsnog voor je uitleggen!</p>
                  <button
                    onClick={() => handleLookupCustomWord(searchQuery)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs rounded-xl cursor-pointer shadow-xs"
                  >
                    Ontleed "{searchQuery}" met Woordenschat Hulp 🔍
                  </button>
                </div>
              ) : (
                displayedEntries.map((entry, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedWord(entry)}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      selectedWord?.word === entry.word
                        ? 'bg-amber-100/90 border-amber-400 shadow-sm'
                        : 'bg-white hover:bg-amber-50/80 border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-slate-900 text-sm capitalize">{entry.word}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                          {entry.wordType}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium line-clamp-1 mt-0.5">
                        {entry.meaningNl}
                      </p>
                      <p className="text-[11px] text-emerald-700 font-semibold italic">
                        {entry.translationEn}
                      </p>
                    </div>

                    <button
                      onClick={(e) => handleSpeak(entry, e)}
                      className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 cursor-pointer transition-colors flex-shrink-0"
                      title="Beluister uitspraak"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Right Column: Detailed Word Card */}
            <div className="sticky top-0 self-start">
              {selectedWord ? (
                <div className="bg-amber-50/50 rounded-3xl p-5 border-2 border-amber-300 shadow-md space-y-4">
                  <div className="flex items-start justify-between gap-2 border-b border-amber-200 pb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-2xl font-black text-slate-900 capitalize">
                          {selectedWord.word}
                        </h3>
                        <span className="text-xs font-black uppercase px-2.5 py-1 rounded-lg bg-amber-200 text-amber-950 border border-amber-300">
                          {selectedWord.wordType}
                        </span>
                      </div>

                      {/* Syllables */}
                      <div className="flex items-center gap-2 mt-1 text-xs font-bold text-amber-900">
                        <span className="text-slate-400 uppercase text-[10px]">Klankgroepen:</span>
                        <span className="bg-white px-2 py-0.5 rounded-lg border border-amber-300 tracking-wider font-mono">
                          {selectedWord.syllables?.join(' - ') || selectedWord.word}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSpeak(selectedWord)}
                      className="px-3 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
                      title="Spreek uit met natuurlijke stem"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Beluister</span>
                    </button>
                  </div>

                  {/* Root Lemma Badge */}
                  {selectedWord.lemma && selectedWord.lemma !== selectedWord.word && (
                    <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-indigo-700">Grondwoord:</span>
                        <span className="font-black text-indigo-900">{selectedWord.lemma}</span>
                      </div>
                      <button
                        onClick={() => handleLookupCustomWord(selectedWord.lemma!)}
                        className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        Bekijk grondwoord <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Compound Breakdown */}
                  {selectedWord.compound && (
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center gap-2">
                      <Puzzle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <div>
                        <span className="font-bold block">Samenstelling:</span>
                        <span className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-300 font-black text-emerald-800 inline-block mt-0.5">
                          {selectedWord.compound}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Cito Category */}
                  {selectedWord.citoCategory && (
                    <div className="flex items-center gap-1.5 text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-200 w-fit">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{selectedWord.citoCategory}</span>
                    </div>
                  )}

                  {/* Dutch Definition */}
                  <div>
                    <span className="text-xs font-black uppercase text-amber-950 block mb-1">
                      📖 Uitleg & Betekenis:
                    </span>
                    <p className="text-sm font-semibold leading-relaxed text-slate-800 bg-white p-3.5 rounded-2xl border border-amber-200/80 shadow-2xs">
                      {selectedWord.meaningNl}
                    </p>
                  </div>

                  {/* English Translation */}
                  <div>
                    <span className="text-xs font-black uppercase text-slate-500 block mb-1">
                      🇬🇧 Engelse Vertaling (Kobo Fallback):
                    </span>
                    <p className="text-xs font-bold text-emerald-900 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200 italic">
                      {selectedWord.translationEn}
                    </p>
                  </div>

                  {/* Synonyms (If Present) */}
                  {selectedWord.synonyms && selectedWord.synonyms.length > 0 && (
                    <div>
                      <span className="text-xs font-black uppercase text-slate-500 block mb-1">
                        🔄 Synoniemen & Verwante Woorden:
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {selectedWord.synonyms.map((s, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleLookupCustomWord(s)}
                            className="px-2.5 py-1 rounded-xl bg-white hover:bg-amber-100 text-slate-800 border border-amber-200 text-xs font-semibold cursor-pointer transition-colors shadow-2xs"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggestions / "Did you mean?" */}
                  {selectedWord.suggestions && selectedWord.suggestions.length > 0 && (
                    <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300">
                      <span className="text-xs font-black uppercase text-amber-900 block mb-1">
                        💡 Bedoelde je wellicht:
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {selectedWord.suggestions.map((s, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleLookupCustomWord(s)}
                            className="px-2.5 py-1 rounded-xl bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold cursor-pointer transition-colors shadow-2xs"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Example Sentence */}
                  {selectedWord.exampleNl && (
                    <div>
                      <span className="text-xs font-black uppercase text-slate-500 block mb-1">
                        🌟 Voorbeeld in een zin:
                      </span>
                      <p className="text-xs font-medium text-slate-700 italic bg-slate-50 p-3 rounded-2xl border border-slate-200">
                        "{selectedWord.exampleNl}"
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-amber-50/40 rounded-3xl p-8 border-2 border-dashed border-amber-200 text-center text-slate-500 space-y-2">
                  <div className="text-4xl">🔍</div>
                  <h4 className="font-black text-slate-700">Kies een woord uit de lijst</h4>
                  <p className="text-xs leading-relaxed max-w-xs mx-auto">
                    Klik op een woord aan de linkerkant om de klankgroepen, samenstellingen, betekenis en Engelse vertaling te bekijken!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer note */}
          <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-center text-xs font-bold text-slate-600 flex-shrink-0 flex items-center justify-between px-6 flex-wrap gap-2">
            <span>💡 Tip: In elk verhaal en Cito-oefening kun je direct met je muis over elk woord bewegen!</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl text-xs cursor-pointer"
            >
              Klaar met Zoeken
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
