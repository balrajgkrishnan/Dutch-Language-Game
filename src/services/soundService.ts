// Web Audio API & Speech Synthesis for kid-friendly interactive sounds

class SoundService {
  private ctx: AudioContext | null = null;
  public soundEnabled: boolean = true;
  public speechEnabled: boolean = true;

  private getAudioContext(): AudioContext | null {
    if (!this.soundEnabled) return null;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  // Play a cheerful high chime for correct answers
  playCorrect() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.18, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.35);
    });
  }

  // Gentle, friendly retry sound (not harsh)
  playIncorrect() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.25);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.28);
  }

  playWrong() {
    this.playIncorrect();
  }

  playSuccess() {
    this.playCorrect();
  }

  playError() {
    this.playIncorrect();
  }

  playLevelUp() {
    this.playFanfare();
  }

  playVictory() {
    this.playFanfare();
  }

  playMunch() {
    this.playPop();
  }

  // Pop sound for clicking buttons and letters
  playPop() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450 + Math.random() * 100, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.06);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  }

  // Star collection sound
  playStar() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.18);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Level complete fanfare
  playFanfare() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const chordNotes = [
      { f: 523.25, time: 0 },
      { f: 659.25, time: 0.12 },
      { f: 783.99, time: 0.24 },
      { f: 1046.5, time: 0.36 },
      { f: 1318.5, time: 0.52 },
      { f: 1567.98, time: 0.7 }
    ];

    chordNotes.forEach(({ f, time }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + time);

      gain.gain.setValueAtTime(0, now + time);
      gain.gain.linearRampToValueAtTime(0.2, now + time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + time + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + 0.6);
    });
  }

  // Animal happy chirp / purr sound
  playAnimalHappy(type: string = 'general') {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === 'lion') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(220, now + 0.15);
      osc.frequency.linearRampToValueAtTime(130, now + 0.4);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    } else if (type === 'elephant') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.3);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.linearRampToValueAtTime(900, now + 0.1);
      osc.frequency.linearRampToValueAtTime(1200, now + 0.2);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.45);
  }

  // Spoken Dutch text-to-speech for young learners
  speakDutch(text: string) {
    if (!this.speechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    try {
      window.speechSynthesis.cancel(); // cancel any active speech
      const cleanText = text.replace(/<[^>]*>?/gm, ''); // strip HTML tags
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'nl-NL';
      utterance.rate = 0.92; // slightly slower for young learners
      utterance.pitch = 1.1; // friendly, warm pitch

      const voices = window.speechSynthesis.getVoices();
      const dutchVoice = voices.find(v => v.lang.startsWith('nl') || v.lang.includes('NL'));
      if (dutchVoice) {
        utterance.voice = dutchVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore TTS errors safely
    }
  }

  speak(text: string) {
    this.speakDutch(text);
  }

  stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const sound = new SoundService();
