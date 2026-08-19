// High-Quality Dutch Speech Synthesis and Recognition Service

export interface SpeechScoreResult {
  accuracy: number; // 0 - 100
  recognizedText: string;
  targetText: string;
  matchedWords: string[];
  missingWords: string[];
  feedback: string;
}

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private dutchVoice: SpeechSynthesisVoice | null = null;
  public speechRate: number = 1.0; // 0.75, 1.0, 1.25
  public isListening: boolean = false;
  private recognition: any = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoice();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.initVoice();
      }
    }
    this.initRecognition();
  }

  private initVoice() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Look for Dutch voices (nl-NL, nl-BE, Google Nederlands, etc.)
    const nlVoices = voices.filter(v => v.lang.startsWith('nl') || v.lang.includes('Dutch'));
    if (nlVoices.length > 0) {
      // Prioritize natural / Google voices if available
      const naturalNl = nlVoices.find(v => v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('premium'));
      this.dutchVoice = naturalNl || nlVoices[0];
    }
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

  public speak(
    text: string,
    options?: {
      rate?: number;
      pitch?: number;
      onWord?: (charIndex: number, length: number) => void;
      onEnd?: () => void;
    }
  ) {
    if (!this.synth) return;
    this.stop();

    const cleanText = text.replace(/<[^>]*>?/gm, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'nl-NL';
    if (this.dutchVoice) {
      utterance.voice = this.dutchVoice;
    }
    utterance.rate = options?.rate ?? this.speechRate;
    utterance.pitch = options?.pitch ?? 1.05; // Slightly cheerful and warm for kids

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

    this.synth.speak(utterance);
  }

  public speakSyllables(syllables: string[], delayMs: number = 350) {
    if (!this.synth) return;
    this.stop();
    const joined = syllables.join(' ... ');
    this.speak(joined, { rate: 0.8, pitch: 1.1 });
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

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      onError('Kon je stem niet goed horen. Klik op de microfoon en probeer het nog een keer rustig!');
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
    } catch (e) {
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
    } catch (e) {
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
      } catch (e) {}
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
      feedback = '🌟 Fantastisch uitgesproken! Je klonk heel zelfverzekerd en helder!';
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

