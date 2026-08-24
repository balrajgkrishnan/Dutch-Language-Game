// High-Quality Dutch Speech Synthesis and Recognition Service with Excited Female Storyteller Optimization

export interface VoicePreset {
  id: 'tess_excited' | 'fleur_warm' | 'rpg_adventure' | 'ollie_wise' | 'custom';
  name: string;
  description: string;
  emoji: string;
  pitch: number;
  rate: number;
  preferredGender: 'female' | 'neutral';
}

export const VOICE_PRESETS: Record<string, VoicePreset> = {
  tess_excited: {
    id: 'tess_excited',
    name: 'Boerin Tess (Vrolijk & Enthousiast 👩‍🌾)',
    description: 'Enthousiaste, warme vrouwelijke stem vol energie voor jonge kinderen!',
    emoji: '👩‍🌾',
    pitch: 1.22,
    rate: 0.96,
    preferredGender: 'female'
  },
  fleur_warm: {
    id: 'fleur_warm',
    name: 'Juf Fleur (Vriendelijk & Rustig 🌸)',
    description: 'Zachte, vriendelijke en super duidelijke uitlegstem.',
    emoji: '🌸',
    pitch: 1.12,
    rate: 0.90,
    preferredGender: 'female'
  },
  rpg_adventure: {
    id: 'rpg_adventure',
    name: 'Avontuurlijke Vertelster (Spannend 🗺️)',
    description: 'Levendige en expressieve voorleesstem voor de Cito RPG verhalen.',
    emoji: '🗺️',
    pitch: 1.18,
    rate: 0.98,
    preferredGender: 'female'
  },
  ollie_wise: {
    id: 'ollie_wise',
    name: 'Professor Ollie (Wijs & Kalm 🦉)',
    description: 'Rustige, wijze uilenstem voor moeilijke woordjes.',
    emoji: '🦉',
    pitch: 0.96,
    rate: 0.90,
    preferredGender: 'neutral'
  }
};

export interface VoiceSettings {
  presetId: 'tess_excited' | 'fleur_warm' | 'rpg_adventure' | 'ollie_wise' | 'custom';
  pitch: number;
  rate: number;
  selectedVoiceURI: string;
  femaleOnly: boolean;
}

export interface VoiceMetadata {
  voice: SpeechSynthesisVoice;
  name: string;
  gender: 'female' | 'male' | 'unknown';
  isNeural: boolean;
  isCompact: boolean;
  isPreferred: boolean;
  qualityBadge: string;
  platform: string;
}

export interface SpeechScoreResult {
  accuracy: number; // 0 - 100
  recognizedText: string;
  targetText: string;
  matchedWords: string[];
  missingWords: string[];
  feedback: string;
}

const STORAGE_KEY = 'DUTCH_VOICE_SETTINGS_V3';

// Known voice lists for robust gender detection
const KNOWN_FEMALE_DUTCH_NAMES = [
  'fenna', 'colette', 'claire', 'saskia', 'fleur', 'laura', 'ellen', 
  'lotte', 'maaike', 'sanne', 'sofie', 'emma', 'eva', 'tess', 'anouk',
  'inge', 'marieke', 'roos', 'lisa', 'femke', 'amber', 'diewertje',
  'siri stem 2', 'siri voice 2', 'stem 2', 'voice 2', 'female', 'vrouw',
  'wavenet-a', 'wavenet-c', 'wavenet-d', 'wavenet-e', 'standard-a', 'standard-c', 'standard-d'
];

const KNOWN_MALE_DUTCH_NAMES = [
  'frank', 'bart', 'ruben', 'xander', 'stefan', 'maarten', 'paul', 
  'jan', 'willem', 'daan', 'geert', 'bram', 'arjan', 'thijs', 'koen', 
  'lucas', 'arthur', 'dirk', 'siri stem 1', 'siri voice 1', 'stem 1', 
  'voice 1', 'male', 'man', 'mannelijk', 'wavenet-b', 'standard-b'
];

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private dutchVoice: SpeechSynthesisVoice | null = null;
  public availableVoices: SpeechSynthesisVoice[] = [];
  public settings: VoiceSettings = {
    presetId: 'tess_excited',
    pitch: 1.22,
    rate: 0.96,
    selectedVoiceURI: '',
    femaleOnly: true
  };
  public isListening: boolean = false;
  private recognition: any = null;
  private onVoicesLoadedCallbacks: Array<() => void> = [];

  constructor() {
    this.loadSettings();

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoice();

      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {
          this.initVoice();
          this.onVoicesLoadedCallbacks.forEach(cb => cb());
        };
      }

      // Retry voice loading after slight delay for Chrome/Safari async voice registry
      setTimeout(() => {
        this.initVoice();
        this.onVoicesLoadedCallbacks.forEach(cb => cb());
      }, 300);
      setTimeout(() => {
        this.initVoice();
      }, 1000);
    }
    this.initRecognition();
  }

  public onVoicesLoaded(cb: () => void) {
    this.onVoicesLoadedCallbacks.push(cb);
  }

  private loadSettings() {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.settings = {
          ...this.settings,
          ...parsed
        };
      }
    } catch {
      // ignore JSON parse error
    }
  }

  public saveSettings(newSettings: Partial<VoiceSettings>) {
    this.settings = { ...this.settings, ...newSettings };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
      } catch {}
    }
    this.applySelectedVoice();
  }

  public setPreset(presetId: 'tess_excited' | 'fleur_warm' | 'rpg_adventure' | 'ollie_wise') {
    const preset = VOICE_PRESETS[presetId];
    if (preset) {
      this.saveSettings({
        presetId,
        pitch: preset.pitch,
        rate: preset.rate
      });
    }
  }

  public classifyVoiceGender(v: SpeechSynthesisVoice): 'female' | 'male' | 'unknown' {
    const name = (v.name || '').toLowerCase();
    const uri = (v.voiceURI || '').toLowerCase();
    const full = `${name} ${uri}`;

    if (KNOWN_FEMALE_DUTCH_NAMES.some(fn => full.includes(fn))) {
      return 'female';
    }
    if (KNOWN_MALE_DUTCH_NAMES.some(mn => full.includes(mn))) {
      return 'male';
    }
    // Google TTS voices often default to female when nl-NL unless marked otherwise
    if (full.includes('google nederlands') || full.includes('google dutch')) {
      return 'female';
    }
    return 'unknown';
  }

  public getVoiceMetadata(v: SpeechSynthesisVoice): VoiceMetadata {
    const name = v.name;
    const lower = (name + ' ' + (v.voiceURI || '')).toLowerCase();
    const gender = this.classifyVoiceGender(v);
    const isNeural = lower.includes('natural') || lower.includes('online') || lower.includes('premium') || lower.includes('enhanced') || lower.includes('neural') || lower.includes('google');
    const isCompact = lower.includes('compact');
    
    let qualityBadge = 'Standaard Stem';
    if (isNeural) {
      qualityBadge = '✨ Natuurlijke HD Stem';
    } else if (isCompact) {
      qualityBadge = '📱 Compacte Systeemstem';
    }

    let platform = 'Algemeen';
    if (lower.includes('microsoft')) platform = 'Windows / Edge';
    else if (lower.includes('apple') || lower.includes('siri') || lower.includes('claire') || lower.includes('xander')) platform = 'Apple (iOS/macOS)';
    else if (lower.includes('google')) platform = 'Google / Chrome / Android';

    return {
      voice: v,
      name,
      gender,
      isNeural,
      isCompact,
      isPreferred: gender === 'female' && isNeural,
      qualityBadge,
      platform
    };
  }

  public getAvailableDutchVoices(forceAll: boolean = false): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    const allVoices = this.synth.getVoices();

    // Strict Dutch filter (nl-NL, nl-BE, etc. - NEVER German de-DE or English)
    const dutchVoices = allVoices.filter(v => {
      const lang = (v.lang || '').toLowerCase();
      const name = (v.name || '').toLowerCase();
      return (
        lang.startsWith('nl') ||
        lang.includes('nld') ||
        (name.includes('dutch') && !name.includes('german') && !name.includes('deutsch')) ||
        name.includes('nederlands') ||
        name.includes('vlaams')
      );
    });

    // If femaleOnly setting is on and we are not forcing all, filter out strict male voices if female voices exist
    if (this.settings.femaleOnly && !forceAll) {
      const femaleOrUnknown = dutchVoices.filter(v => this.classifyVoiceGender(v) !== 'male');
      if (femaleOrUnknown.length > 0) {
        return femaleOrUnknown.sort((a, b) => this.scoreVoice(b) - this.scoreVoice(a));
      }
    }

    // Score voices: prioritize high quality natural female Dutch voices
    return dutchVoices.sort((a, b) => this.scoreVoice(b) - this.scoreVoice(a));
  }

  // Scoring function: High priority on natural female Dutch voices, severely demotes male voices
  private scoreVoice(v: SpeechSynthesisVoice): number {
    let score = 0;
    const name = (v.name || '').toLowerCase();
    const lang = (v.lang || '').toLowerCase();
    const uri = (v.voiceURI || '').toLowerCase();
    const full = `${name} ${uri}`;
    const gender = this.classifyVoiceGender(v);

    // nl-NL preferred over nl-BE
    if (lang === 'nl-nl' || lang === 'nl_nl') score += 30;
    else if (lang.startsWith('nl')) score += 15;

    // Female voice boost
    if (gender === 'female') {
      score += 120;
    } else if (gender === 'male') {
      // Heavily penalize male voices when user prefers female storytelling
      score -= 300;
    }

    // Top tier premium online / neural female voices (Microsoft Fenna/Colette, Apple Claire/Saskia/Siri 2, Google Nederlands)
    const topFemaleNeural = ['fenna', 'colette', 'claire', 'saskia', 'fleur', 'laura', 'ellen', 'lotte', 'siri stem 2', 'siri voice 2'];
    if (topFemaleNeural.some(fn => full.includes(fn))) {
      score += 80;
    }

    if (full.includes('natural') || full.includes('online')) score += 60;
    if (full.includes('google nederlands') || full.includes('google dutch')) score += 45;
    if (full.includes('premium') || full.includes('enhanced') || full.includes('neural')) score += 45;
    if (full.includes('female') || full.includes('vrouw')) score += 40;

    // Penalize robotic / eSpeak / compact voices
    if (full.includes('espeak') || full.includes('mbrola')) score -= 200;
    if (full.includes('compact')) score -= 25;

    return score;
  }

  private initVoice() {
    if (!this.synth) return;
    const voices = this.getAvailableDutchVoices(true);
    this.availableVoices = voices;

    this.applySelectedVoice();
  }

  public getActiveVoice(): SpeechSynthesisVoice | null {
    if (!this.dutchVoice) {
      this.applySelectedVoice();
    }
    return this.dutchVoice;
  }

  private applySelectedVoice() {
    const voices = this.getAvailableDutchVoices();
    if (voices.length === 0) {
      const allDutch = this.getAvailableDutchVoices(true);
      this.dutchVoice = allDutch[0] || null;
      return;
    }

    if (this.settings.selectedVoiceURI) {
      const chosen = voices.find(v => v.voiceURI === this.settings.selectedVoiceURI);
      if (chosen) {
        this.dutchVoice = chosen;
        return;
      }
    }

    // Default to the highest scoring female Dutch voice
    this.dutchVoice = voices[0];
  }

  private initRecognition() {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'nl-NL';
      } catch (e) {
        console.warn('SpeechRecognition initialization error:', e);
      }
    }
  }

  public isRecognitionSupported(): boolean {
    return !!this.recognition;
  }

  /**
   * Pre-process text to enhance Dutch pronunciation cadence:
   * Expands abbreviations, cleans tags, adds natural breath pauses for exclamation & question marks.
   */
  private preprocessDutchText(rawText: string): string {
    let t = rawText
      .replace(/<[^>]*>?/gm, ' ') // Strip HTML tags
      .replace(/\*\*/g, '')        // Strip markdown bold asterisks
      .replace(/•/g, '')           // Strip bullet points
      .trim();

    // Expand common Dutch abbreviations
    t = t.replace(/\bo\.a\.\b/gi, 'onder andere')
         .replace(/\bbijv\.\b/gi, 'bijvoorbeeld')
         .replace(/\bblz\.\b/gi, 'bladzijde')
         .replace(/\benz\.\b/gi, 'enzovoort')
         .replace(/\bd\.w\.z\.\b/gi, 'dat wil zeggen')
         .replace(/\bca\.\b/gi, 'ongeveer')
         .replace(/\bAVI-(\w+)\b/gi, 'A-V-I $1')
         .replace(/\bGroep (\d)\b/gi, 'Groep $1,');

    // Add natural micro-pauses after colons and exclamations for expressive storytelling
    t = t.replace(/:/g, '... ')
         .replace(/!+/g, '! ')
         .replace(/\?+/g, '? ');

    return t;
  }

  public speak(
    text: string,
    options?: {
      rate?: number;
      pitch?: number;
      voiceURI?: string;
      onWord?: (charIndex: number, length: number) => void;
      onEnd?: () => void;
    }
  ) {
    if (!this.synth) return;
    this.stop();

    const cleanText = this.preprocessDutchText(text);
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'nl-NL';

    // Apply active voice or override
    let voiceToUse = this.dutchVoice;
    if (options?.voiceURI) {
      const v = this.availableVoices.find(item => item.voiceURI === options.voiceURI);
      if (v) voiceToUse = v;
    }

    if (voiceToUse) {
      utterance.voice = voiceToUse;
    }

    // Set cheerful, enthusiastic pitch & speed from settings or options
    utterance.rate = options?.rate ?? this.settings.rate;
    utterance.pitch = options?.pitch ?? this.settings.pitch;
    utterance.volume = 1.0;

    if (options?.onWord) {
      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          options.onWord?.(event.charIndex, event.charLength || 5);
        }
      };
    }

    if (options?.onEnd) {
      utterance.onend = options.onEnd;
    }

    // Workaround for some mobile/Safari browsers pausing speech after ~15s
    try {
      this.synth.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  /**
   * Preview / Test the current voice settings with a lively Dutch phrase
   */
  public testVoice(phrase?: string) {
    const samplePhrases = [
      'Hoi Ridheya en Hemali! Wauw, wat een superleuk avontuur! Zullen we snel beginnen?',
      'Fantastisch gedaan! Je hebt een nieuwe gouden ster verdiend!',
      'Boerin Tess en professor Ollie heten je van harte welkom in het Safaripark!'
    ];
    const text = phrase || samplePhrases[Math.floor(Math.random() * samplePhrases.length)];
    this.speak(text);
  }

  public speakSyllables(syllables: string[], delayMs: number = 350) {
    if (!this.synth) return;
    this.stop();
    const joined = syllables.join(' ... ');
    this.speak(joined, { rate: 0.82, pitch: 1.25 });
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public recordSpeech(
    targetText: string,
    onResult: (result: SpeechScoreResult) => void,
    onError: (errorMsg: string) => void
  ) {
    if (!this.recognition) {
      onError('Spraakherkenning wordt niet ondersteund in deze browser. Probeer Chrome, Edge of Safari.');
      return;
    }

    this.isListening = true;

    this.recognition.onresult = (event: any) => {
      this.isListening = false;
      const transcript = event.results[0][0].transcript.trim();
      const score = this.evaluatePronunciation(transcript, targetText);
      onResult(score);
    };

    this.recognition.onerror = () => {
      this.isListening = false;
      onError('Kon je stem niet goed horen. Klik op de microfoon en probeer het nog een keer rustig!');
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
    } catch {
      this.isListening = false;
      onError('Microfoon kon niet gestart worden.');
    }
  }

  public startListening(
    onTranscript: (text: string) => void,
    onEnd?: () => void
  ) {
    if (!this.recognition) return;
    this.isListening = true;

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim() || '';
      onTranscript(transcript);
    };

    this.recognition.onerror = () => {
      this.isListening = false;
      onEnd?.();
    };

    this.recognition.onend = () => {
      this.isListening = false;
      onEnd?.();
    };

    try {
      this.recognition.start();
    } catch {
      this.isListening = false;
    }
  }

  public stopListening() {
    this.stopRecording();
  }

  public calculateSpeechAccuracy(spoken: string, target: string): number {
    return this.evaluatePronunciation(spoken, target).accuracy;
  }

  public stopRecording() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {}
      this.isListening = false;
    }
  }

  public evaluatePronunciation(spoken: string, target: string): SpeechScoreResult {
    const normalize = (s: string) => s.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?"'!]/g, '').trim();
    const cleanSpoken = normalize(spoken);
    const cleanTarget = normalize(target);

    const spokenWords = cleanSpoken.split(/\s+/).filter(Boolean);
    const targetWords = cleanTarget.split(/\s+/).filter(Boolean);

    const matchedWords: string[] = [];
    const missingWords: string[] = [];

    targetWords.forEach(tw => {
      if (spokenWords.includes(tw)) {
        matchedWords.push(tw);
      } else {
        missingWords.push(tw);
      }
    });

    const accuracy = targetWords.length > 0
      ? Math.round((matchedWords.length / targetWords.length) * 100)
      : 100;

    let feedback = '';
    if (accuracy >= 85) {
      feedback = '🌟 Wauw, fantastisch uitgesproken! Je klonk heel vrolijk, helder en zelfverzekerd!';
    } else if (accuracy >= 60) {
      feedback = '👍 Goed geprobeerd! Let nog even extra op de moeilijke klanken.';
    } else {
      feedback = '💪 Blijf oefenen! Luister nog eens naar het voorbeeld en zeg het rustig na.';
    }

    return {
      accuracy,
      recognizedText: spoken,
      targetText: target,
      matchedWords,
      missingWords,
      feedback
    };
  }
}

export const speech = new SpeechService();
export const speechService = speech;


