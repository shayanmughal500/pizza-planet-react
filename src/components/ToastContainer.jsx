import { useToast } from '../contexts/ToastContext';

const ICONS = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️', cart: '🛒', wishlist: '❤️' };

export default function ToastContainer() {
  const { toasts, remove } = useToast();

  return (
    <div className="toast-container" id="toastContainer">
      {toasts.map(t => (
        <div key={t.id} className={`toast${t.removing ? ' toast--removing' : ''}`}>
          <span className="toast__icon">{ICONS[t.type] || ICONS.info}</span>
          <span className="toast__text">{t.message}</span>
          <button className="toast__action" onClick={() => remove(t.id)}>✕</button>
        </div>
      ))}
    </div>
  );
}