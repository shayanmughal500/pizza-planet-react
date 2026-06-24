import { useState, useCallback, useEffect, useRef } from 'react';

// Global AudioContext so it persists across re-renders
let audioCtx = null;

export default function useDeviceNotification() {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    // If the browser already allowed audio without interaction (like on desktop)
    if (audioCtx && audioCtx.state === 'running') {
      setAudioEnabled(true);
    }
  }, []);

  const enableAudio = useCallback(async () => {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }
      
      // Play a silent 1ms sound to fully unlock the audio engine on iOS
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      gain.gain.value = 0;
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.01);

      setAudioEnabled(true);
    } catch (e) {
      console.error('Audio enable failed', e);
    }
  }, []);

  const notify = useCallback((title, options = {}) => {
    // 1. Play the crisp HTML5 audio ding!
    if (audioCtx && audioCtx.state === 'running') {
      try {
        const t = audioCtx.currentTime;
        
        // Main bell body
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1046.50, t); // C6 note
        
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.8, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.8);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.8);

        // Subtle harmony for premium sound
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1318.51, t); // E6 note
        
        gain2.gain.setValueAtTime(0, t);
        gain2.gain.linearRampToValueAtTime(0.4, t + 0.02);
        gain2.gain.exponentialRampToValueAtTime(0.01, t + 0.6);
        
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.start(t);
        osc2.stop(t + 0.6);
      } catch (e) {}
    }

    // 2. Also try OS notifications if permitted (fallback for desktop users)
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { icon: '/favicon.ico', ...options });
    }
  }, []);

  return { audioEnabled, enableAudio, notify };
}
