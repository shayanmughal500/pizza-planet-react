import { useCallback } from 'react';

export default function useDeviceNotification() {
  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notification');
      return false;
    }
    if (Notification.permission === 'granted') {
      return true;
    }
    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }, []);

  const notify = useCallback(async (title, options = {}) => {
    const granted = await requestPermission();
    if (granted) {
      new Notification(title, {
        icon: '/favicon.ico', // assuming there is a favicon
        ...options
      });
    }
  }, [requestPermission]);

  return { notify, requestPermission };
}
