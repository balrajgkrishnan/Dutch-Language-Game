import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Volume2, Sparkles, Mic, Check, RotateCcw, 
  Play, Sliders, Info, Heart, Star, Music, Settings,
  Tablet, Smartphone, Laptop, HelpCircle, ChevronDown, ChevronUp
} from 'lucide-react';
import { speech, VOICE_PRESETS, VoicePreset, VoiceMetadata } from '../services/speechService';
import { sound } from '../services/soundService';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activePreset, setActivePreset] = useState<string>(speech.settings.presetId);
  const [pitch, setPitch] = useState<number>(speech.settings.pitch);
  const [rate, setRate] = useState<number>(speech.settings.rate);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>(speech.settings.selectedVoiceURI);
  const [femaleOnly, setFemaleOnly] = useState<boolean>(speech.settings.femaleOnly ?? true);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [customTestPhrase, setCustomTestPhrase] = useState<string>('Hoi Ridheya en Hemali! Wauw, wat een spannend avontuur!');
  const [isPlayingTest, setIsPlayingTest] = useState<boolean>(false);
  const [showDeviceGuide, setShowDeviceGuide] = useState<boolean>(false);

  useEffect(() => {
    const refreshVoices = () => {
      const v = speech.getAvailableDutchVoices(!femaleOnly);
      setAvailableVoices(v);
      if (speech.settings.selectedVoiceURI) {
        setSelectedVoiceURI(speech.settings.selectedVoiceURI);
      }
    };

    refreshVoices();
    speech.onVoicesLoaded(refreshVoices);
  }, [isOpen, femaleOnly]);

  if (!isOpen) return null;

  const handleSelectPreset = (presetId: 'tess_excited' | 'fleur_warm' | 'rpg_adventure' | 'ollie_wise') => {
    sound.playPop();
    setActivePreset(presetId);
    const p = VOICE_PRESETS[presetId];
    if (p) {
      setPitch(p.pitch);
      setRate(p.rate);
      speech.saveSettings({
        presetId,
        pitch: p.pitch,
        rate: p.rate
      });
      // Play instant test
      speech.speak(`Hoi! Ik ben ${p.name.split(' ')[0]} ${p.name.split(' ')[1] || ''}. Zullen we samen op avontuur gaan?`);
    }
  };

  const handlePitchChange = (newPitch: number) => {
    setPitch(newPitch);
    setActivePreset('custom');
    speech.saveSettings({ pitch: newPitch, presetId: 'custom' });
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
    setActivePreset('custom');
    speech.saveSettings({ rate: newRate, presetId: 'custom' });
  };

  const handleFemaleOnlyToggle = (checked: boolean) => {
    sound.playPop();
    setFemaleOnly(checked);
    speech.saveSettings({ femaleOnly: checked });
    const v = speech.getAvailableDutchVoices(!checked);
    setAvailableVoices(v);
  };

  const handleVoiceChange = (uri: string) => {
    sound.playPop();
    setSelectedVoiceURI(uri);
    speech.saveSettings({ selectedVoiceURI: uri });
    const allVoices = speech.getAvailableDutchVoices(true);
    const chosenVoice = allVoices.find(v => v.voiceURI === uri);
    const voiceName = chosenVoice ? chosenVoice.name.split(' ')[0] : 'deze stem';
    speech.speak(`Dit is een test met ${voiceName}. Klink ik zo leuk en gezellig voor Ridheya en Hemali?`);
  };

  const handlePlayTest = (phrase?: string) => {
    sound.playPop();
    setIsPlayingTest(true);
    const text = phrase || customTestPhrase;
    speech.speak(text, {
      onEnd: () => setIsPlayingTest(false)
    });
  };

  const handleResetDefaults = () => {
    sound.playPop();
    handleSelectPreset('tess_excited');
    setSelectedVoiceURI('');
    speech.saveSettings({ 
      selectedVoiceURI: '', 
      presetId: 'tess_excited', 
      pitch: 1.22, 
      rate: 0.96,
      femaleOnly: true
    });
    setPitch(1.22);
    setRate(0.96);
    setFemaleOnly(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-3xl shadow-2xl border-4 border-amber-300 max-w-2xl w-full overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-4 sm:p-5 text-white flex items-center justify-between gap-3 shadow-md relative overflow-hidden flex-shrink-0">
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-2xl shadow-inner">
                🎙️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-black tracking-tight">
                    Vrolijke Stem &amp; Audio Instellingen
                  </h2>
                  <span className="bg-pink-200 text-pink-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    👩 Alleen Vrouwelijk
                  </span>
                </div>
                <p className="text-xs text-amber-100 font-medium mt-0.5">
                  Gezellige, warme voorleesstemmen voor <b>Ridheya</b> en <b>Hemali</b>!
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer relative z-10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">

            {/* Female-Only Mode Banner */}
            <div className="p-3.5 rounded-2xl bg-pink-50/90 border-2 border-pink-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">👩‍🌾</span>
                <div>
                  <h4 className="text-xs font-black text-pink-950">
                    Vrouwelijke Voorleesstemmen Forceren
                  </h4>
                  <p className="text-[11px] text-pink-800 font-medium">
                    Filtert automatisch mannelijke en lage stemmen weg voor de leukste kindervriendelijke ervaring.
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input
                  type="checkbox"
                  checked={femaleOnly}
                  onChange={(e) => handleFemaleOnlyToggle(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
              </label>
            </div>
            
            {/* Section 1: Character Voice Presets */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎭</span>
                  <h3 className="text-sm sm:text-base font-black text-slate-900">
                    Kies een Vrouwelijke Stem Persona:
                  </h3>
                </div>
                <span className="text-[11px] font-bold text-slate-500">
                  Tik om direct te luisteren
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(Object.values(VOICE_PRESETS) as VoicePreset[]).map(preset => {
                  const isSelected = activePreset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset.id as any)}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-3 relative ${
                        isSelected
                          ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                          : 'bg-slate-50 hover:bg-amber-50/50 border-slate-200'
                      }`}
                    >
                      <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-2xl flex-shrink-0 shadow-xs">
                        {preset.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                            {preset.name}
                          </h4>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 font-medium line-clamp-2 mt-0.5">
                          {preset.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Interactive Voice Tester */}
            <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Probeer de stem uit:</span>
                </span>
                <span className="text-[11px] text-amber-800 font-bold">
                  {isPlayingTest ? '🔊 Aan het spreken...' : 'Klaar om te testen'}
                </span>
              </div>

              {/* Sample phrases chips */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => handlePlayTest('Hoi Ridheya en Hemali! Wauw, wat een superleuk avontuur!')}
                  className="px-2.5 py-1 rounded-xl bg-white border border-amber-300 text-amber-950 text-xs font-bold hover:bg-amber-100 cursor-pointer shadow-xs transition-colors"
                >
                  🌟 "Hoi Ridheya en Hemali!"
                </button>
                <button
                  onClick={() => handlePlayTest('Geweldig gedaan! Je hebt een nieuwe gouden ster verdiend!')}
                  className="px-2.5 py-1 rounded-xl bg-white border border-amber-300 text-amber-950 text-xs font-bold hover:bg-amber-100 cursor-pointer shadow-xs transition-colors"
                >
                  🎉 "Gouden ster verdiend!"
                </button>
                <button
                  onClick={() => handlePlayTest('Kijk eens goed naar de letters van het woordje!')}
                  className="px-2.5 py-1 rounded-xl bg-white border border-amber-300 text-amber-950 text-xs font-bold hover:bg-amber-100 cursor-pointer shadow-xs transition-colors"
                >
                  📖 "Kijk naar de letters!"
                </button>
              </div>

              {/* Custom input test */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customTestPhrase}
                  onChange={(e) => setCustomTestPhrase(e.target.value)}
                  placeholder="Typ een eigen zin om te testen..."
                  className="flex-1 bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  onClick={() => handlePlayTest()}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-sm cursor-pointer flex items-center gap-1.5 transition-all active:scale-95 whitespace-nowrap"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Test Stem</span>
                </button>
              </div>
            </div>

            {/* Section 3: Fine-Tuning Sliders (Pitch / Cheerfulness & Speed) */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-slate-600" />
                  <span>Vrolijkheid &amp; Snelheid Instellen:</span>
                </h4>
                <button
                  onClick={handleResetDefaults}
                  className="text-[11px] font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Standaard Vrolijk</span>
                </button>
              </div>

              {/* Pitch Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Toonhoogte / Vrouwelijke Klank (Pitch):</span>
                  <span className="text-amber-800 font-black bg-amber-100 px-2 py-0.5 rounded-md">
                    {pitch > 1.15 ? '✨ Super Vrolijk & Vrouwelijk' : pitch >= 1.05 ? '🌸 Warm & Vriendelijk' : '🦉 Neutraal'} ({pitch.toFixed(2)})
                  </span>
                </div>
                <input
                  type="range"
                  min="0.9"
                  max="1.45"
                  step="0.02"
                  value={pitch}
                  onChange={(e) => handlePitchChange(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>Neutraal (0.9)</span>
                  <span className="text-amber-600 font-bold">Ideaal voor meiden (1.20 - 1.25)</span>
                  <span>Speels Hoog (1.45)</span>
                </div>
              </div>

              {/* Rate / Speed Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Voorleessnelheid (Tempo):</span>
                  <span className="text-indigo-800 font-black bg-indigo-100 px-2 py-0.5 rounded-md">
                    {rate <= 0.85 ? '🐢 Rustig (Groep 3 - Ridheya)' : rate <= 1.0 ? '🎯 Duidelijk' : '⚡ Vlot (Groep 6 - Hemali)'} ({rate.toFixed(2)})
                  </span>
                </div>
                <input
                  type="range"
                  min="0.7"
                  max="1.25"
                  step="0.02"
                  value={rate}
                  onChange={(e) => handleRateChange(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>Rustig (0.7)</span>
                  <span>Standaard (0.95)</span>
                  <span>Vlot (1.25)</span>
                </div>
              </div>
            </div>

            {/* Section 4: Device Voice Selection Dropdown */}
            {availableVoices.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                    Gedetecteerde Stem op jouw Apparaat:
                  </label>
                  <span className="text-[11px] font-bold text-indigo-600">
                    {availableVoices.length} stem(men) beschikbaar
                  </span>
                </div>
                <select
                  value={selectedVoiceURI}
                  onChange={(e) => handleVoiceChange(e.target.value)}
                  className="w-full bg-white border-2 border-slate-300 rounded-2xl p-3 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-amber-500 cursor-pointer shadow-xs"
                >
                  <option value="">✨ Automatisch beste Vrouwelijke Nederlandse stem kiezen (Aanbevolen)</option>
                  {availableVoices.map((v, i) => {
                    const meta = speech.getVoiceMetadata(v);
                    const genderIcon = meta.gender === 'female' ? '👩' : meta.gender === 'male' ? '👨' : '👤';
                    return (
                      <option key={v.voiceURI || i} value={v.voiceURI}>
                        {genderIcon} {meta.isNeural ? '🌟 ' : ''}{v.name} ({meta.qualityBadge} - {v.lang})
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            {/* Section 5: Troubleshooting & iPad/Mobile HD Voice Guide */}
            <div className="rounded-2xl border-2 border-indigo-200 overflow-hidden bg-indigo-50/50">
              <button
                onClick={() => {
                  sound.playPop();
                  setShowDeviceGuide(!showDeviceGuide);
                }}
                className="w-full p-3.5 bg-indigo-100/70 hover:bg-indigo-100 text-left flex items-center justify-between gap-2 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-indigo-950">
                  <HelpCircle className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>Waarom klinkt de stem op iPad/Mobiel anders &amp; hoe fix je dat?</span>
                </div>
                {showDeviceGuide ? <ChevronUp className="w-4 h-4 text-indigo-700" /> : <ChevronDown className="w-4 h-4 text-indigo-700" />}
              </button>

              {showDeviceGuide && (
                <div className="p-4 space-y-4 text-xs text-indigo-950">
                  <p className="leading-relaxed">
                    Op laptops (in Chrome of Edge) downloadt de browser automatisch <b>Google Nederlands</b> of <b>Microsoft Fenna (Natural HD)</b>. Op een <b>iPad, iPhone of Android</b> gebruikt het apparaat standaard een compacte/robotachtige stem om geheugen te sparen.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="bg-white p-3 rounded-xl border border-indigo-200 shadow-2xs space-y-1">
                      <div className="font-black text-indigo-900 flex items-center gap-1.5">
                        <Tablet className="w-3.5 h-3.5 text-indigo-600" />
                        <span>iPad &amp; iPhone (Apple)</span>
                      </div>
                      <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-700 font-medium leading-normal">
                        <li>Open de iPad <b>Instellingen</b> app.</li>
                        <li>Ga naar <b>Toegankelijkheid</b> $\to$ <b>Gesproken inhoud</b> $\to$ <b>Stemmen</b>.</li>
                        <li>Tik op <b>Nederlands</b>.</li>
                        <li>Kies <b>Claire</b> of <b>Siri (Stem 2)</b> en tik op <b>Verbeterd / Premium downloaden</b>.</li>
                        <li>Herlaad deze pagina op je iPad $\to$ klinkt direct super mooi!</li>
                      </ol>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-indigo-200 shadow-2xs space-y-1">
                      <div className="font-black text-indigo-900 flex items-center gap-1.5">
                        <Laptop className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Andere Laptop &amp; Android</span>
                      </div>
                      <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-700 font-medium leading-normal">
                        <li>Open de app in <b>Google Chrome</b> of <b>Microsoft Edge</b>.</li>
                        <li>In Edge: kies <b>Microsoft Fenna (Online)</b> of <b>Colette</b> in het menu hierboven.</li>
                        <li>Op Android: Instellingen $\to$ Toegankelijkheid $\to$ Tekst-naar-spraak $\to$ Download Nederlands spraakpakket.</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Footer */}
          <div className="bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-between gap-3 flex-shrink-0">
            <button
              onClick={() => {
                sound.playPop();
                speech.testVoice('Wat fijn! De vrouwelijke stem staat nu perfect ingesteld voor Ridheya en Hemali!');
              }}
              className="text-xs font-black text-amber-900 hover:text-amber-950 flex items-center gap-1.5 cursor-pointer"
            >
              <span>🔊 Hoor Eindresultaat</span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-emerald-600/20 cursor-pointer transition-all active:scale-95 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Instellingen Bewaren</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
