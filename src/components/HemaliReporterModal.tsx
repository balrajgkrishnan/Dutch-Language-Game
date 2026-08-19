import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Mic, MicOff, Volume2, Sparkles, Award, CheckCircle2, MessageSquareText } from 'lucide-react';
import { ReporterMission, PlayerProfile } from '../types';
import { HEMALI_REPORTER_MISSIONS } from '../data/specialMissionsData';
import { sound } from '../services/soundService';
import { speech, SpeechScoreResult } from '../services/speechService';
import confetti from 'canvas-confetti';

interface HemaliReporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
}

export const HemaliReporterModal: React.FC<HemaliReporterModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile
}) => {
  const [selectedMissionIndex, setSelectedMissionIndex] = useState(0);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [spokenText, setSpokenText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [speechResult, setSpeechResult] = useState<SpeechScoreResult | null>(null);
  const [manualNote, setManualNote] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const mission = HEMALI_REPORTER_MISSIONS[selectedMissionIndex] || HEMALI_REPORTER_MISSIONS[0];
  const currentPrompt = mission.promptQuestions[currentPromptIndex] || mission.promptQuestions[0];

  const handleStartRecording = () => {
    sound.playPop();
    setErrorMessage('');
    setSpeechResult(null);

    if (!speech.isRecognitionSupported()) {
      setErrorMessage('Browser spraakherkenning is niet ingeschakeld in deze weergave. Typ je antwoord in het tekstvak en klik op Voorlezen!');
      return;
    }

    setIsRecording(true);
    speech.recordSpeech(
      mission.sampleGoodAnswer,
      (result) => {
        setIsRecording(false);
        setSpokenText(result.recognizedText);
        setSpeechResult(result);
        sound.playVictory();
        confetti({ particleCount: 50, spread: 70 });

        onUpdateProfile(prev => ({
          ...prev,
          score: prev.score + 25,
          coins: prev.coins + 15,
          mastery: {
            ...prev.mastery,
            speaking: Math.min(100, prev.mastery.speaking + 4),
            confidence: Math.min(100, prev.mastery.confidence + 5),
            communication: Math.min(100, prev.mastery.communication + 4)
          }
        }));
      },
      (err) => {
        setIsRecording(false);
        setErrorMessage(err);
      }
    );
  };

  const handleStopRecording = () => {
    speech.stopRecording();
    setIsRecording(false);
  };

  const handleSpeakSample = () => {
    sound.playPop();
    speech.speak(mission.sampleGoodAnswer, { rate: 0.95 });
  };

  const handleCompleteMission = () => {
    sound.playVictory();
    confetti({ particleCount: 100, spread: 90 });
    onUpdateProfile(prev => ({
      ...prev,
      score: prev.score + 50,
      coins: prev.coins + 30,
      mastery: {
        ...prev.mastery,
        speaking: Math.min(100, prev.mastery.speaking + 5),
        confidence: Math.min(100, prev.mastery.confidence + 6),
        communication: Math.min(100, prev.mastery.communication + 5)
      }
    }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl border border-indigo-100 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
              🎙️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black">Safari Nieuws Verslaggever</h3>
                <span className="text-[10px] font-black uppercase bg-white/20 px-2 py-0.5 rounded-full">
                  Hemali Modus 🦉
                </span>
              </div>
              <p className="text-xs text-indigo-100 font-medium">
                Spreekvaardigheid, Zelfvertrouwen &amp; Vragen Stellen
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              speech.stop();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mission Selectors */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center gap-2 overflow-x-auto">
          {HEMALI_REPORTER_MISSIONS.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => {
                sound.playPop();
                setSelectedMissionIndex(idx);
                setCurrentPromptIndex(0);
                setSpeechResult(null);
                setSpokenText('');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
                selectedMissionIndex === idx
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{m.targetAnimalEmoji}</span>
              <span>{m.title.split(':')[0]}</span>
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* Scenario Box */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-200 flex items-start gap-3">
            <span className="text-3xl filter drop-shadow-xs">{mission.targetAnimalEmoji}</span>
            <div>
              <h4 className="text-sm font-black text-amber-950">{mission.title}</h4>
              <p className="text-xs text-amber-900 mt-1 leading-relaxed">{mission.scenario}</p>
            </div>
          </div>

          {/* Target Vocabulary */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-black text-slate-700">Gebruik deze journalistwoorden:</span>
            {mission.vocabularyToUse.map((v, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 text-xs font-black border border-indigo-200">
                ✨ {v}
              </span>
            ))}
          </div>

          {/* Current Question / Prompt */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-indigo-900 uppercase">
                Vraag {currentPromptIndex + 1} van {mission.promptQuestions.length}
              </span>
              <button
                onClick={handleSpeakSample}
                className="text-xs font-black text-indigo-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Luister Voorbeeld</span>
              </button>
            </div>

            <div className="text-base sm:text-lg font-bold text-slate-900">
              "{currentPrompt}"
            </div>

            {/* Microphone / Record Button */}
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-black text-sm text-white flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse shadow-red-500/30'
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30'
                }`}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                <span>{isRecording ? 'Stop Opname (Ik Luister...)' : 'Druk & Spreek Je Antwoord In'}</span>
              </button>

              <span className="text-xs text-slate-500 font-semibold">
                Of typ jouw journalistenvraag hieronder:
              </span>
            </div>

            {/* Text input fallback */}
            <textarea
              value={manualNote}
              onChange={(e) => setManualNote(e.target.value)}
              placeholder="Typ hier jouw eigen journalistenvraag of uitleg..."
              className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium h-20 resize-none"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold">
              {errorMessage}
            </div>
          )}

          {/* Speech Result / Scoring */}
          {speechResult && (
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-950 uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Spraakherkenning Score</span>
                </span>
                <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-black">
                  {speechResult.accuracy}% Nauwkeurigheid ⭐
                </span>
              </div>
              <p className="text-xs text-emerald-900 font-medium">
                <b>Gehoord:</b> "{speechResult.recognizedText}"
              </p>
              <p className="text-xs text-emerald-800 font-bold">
                {speechResult.feedback}
              </p>
            </div>
          )}

          {/* Finish Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleCompleteMission}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-black text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/25"
            >
              <Award className="w-5 h-5" />
              <span>Voltooi Verslag &amp; Ontvang Beloning!</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
