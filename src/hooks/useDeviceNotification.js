import { useState, useCallback, useEffect, useRef } from 'react';

const BELL_SOUND_URL = 'https://upload.wikimedia.org/wikipedia/commons/1/15/Bicycle_bell.wav';
let globalAudio = null;

export default function useDeviceNotification() {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (!globalAudio) {
      globalAudio = new Audio(BELL_SOUND_URL);
      globalAudio.preload = 'auto';
    }
  }, []);

  const enableAudio = useCallback(() => {
    try {
      if (!globalAudio) {
        globalAudio = new Audio(BELL_SOUND_URL);
      }
      // Play and immediately pause to unlock the audio element on iOS
      globalAudio.volume = 0;
      globalAudio.play().then(() => {
        globalAudio.pause();
        globalAudio.currentTime = 0;
        globalAudio.volume = 1;
        setAudioEnabled(true);
      }).catch(e => console.error('Audio unlock failed:', e));
    } catch (e) {
      console.error('Audio enable failed', e);
    }
  }, []);

  const notify = useCallback((title, options = {}) => {
    // 1. Play the HTML5 audio
    if (globalAudio && audioEnabled) {
      try {
        globalAudio.currentTime = 0;
        globalAudio.volume = 1;
        globalAudio.play().catch(e => console.error('Play failed:', e));
      } catch (e) {
        console.error('Audio play error:', e);
      }
    }

    // 2. Also try OS notifications if permitted
    try {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { icon: '/favicon.ico', ...options });
      }
    } catch (e) {}
  }, [audioEnabled]);

  return { audioEnabled, enableAudio, notify };
}
