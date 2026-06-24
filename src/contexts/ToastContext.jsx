import { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const show = useCallback((message, options = {}) => {
    const id = ++idRef.current;
    const toast = { id, message, type: options.type || 'info', duration: options.duration || 3000 };
    setToasts(prev => [...prev, toast]);
    setTimeout(() => remove(id), toast.duration);
  }, []);

  const remove = useCallback((id) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, removing: true } : t));
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 300);
  }, []);

  const success = (msg, opts) => show(msg, { ...opts, type: 'success' });
  const error = (msg, opts) => show(msg, { ...opts, type: 'error' });
  const info = (msg, opts) => show(msg, { ...opts, type: 'info' });

  return (
    <ToastContext.Provider value={{ toasts, show, success, error, info, remove }}>
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);