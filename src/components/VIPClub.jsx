import { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

export default function VIPClub() {
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { success } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setSubmitted(true);
    success('Welcome to the Orbit Club! 🌟', { duration: 3000 });
    setTimeout(() => setSubmitted(false), 2200);
    setPhone('');
  };

  return (
    <section className="section" id="vip">
      <div className="container">
        <div className="vip-card reveal">
          <div className="vip-card__content">
            <span className="section__label">Pizza Planet VIP</span>
            <h2 className="vip-card__title">Join the Orbit Club</h2>
            <p style={{ color: 'var(--color-text-dim)', marginBottom: 'var(--space-lg)' }}>
              Become a member and unlock exclusive deals: Buy 1 Get 1 Free, 40% off on pizzas, and access to member-only combo deals. It's <strong style={{ color: 'var(--color-primary)' }}>FREE</strong> to join!
            </p>
            <ul className="vip-card__perks">
              <li>Buy 1 Get 1 Free on Pizza Flavours</li>
              <li>40% Off on selected items</li>
              <li>Exclusive member-only combo deals</li>
              <li>Treat on Planet bundle deals</li>
              <li>FREE delivery within 2km</li>
            </ul>
            <form className="vip-card__form" id="vipForm" onSubmit={handleSubmit} autoComplete="off">
              <input type="tel" className="input" placeholder="03XX-XXXXXXX" required value={phone}
                onChange={e => setPhone(e.target.value)} aria-label="Phone number" />
              <button type="submit" className="btn btn--primary"
                style={submitted ? { background: 'var(--color-success)' } : {}}>
                {submitted ? '✓ Joined!' : 'Join Free 🚀'}
              </button>
            </form>
            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-sm)' }}>
              Already a member? Just tell us at the counter or mention it on WhatsApp!
            </p>
          </div>
          <div className="vip-card__illustration">🌟</div>
        </div>
      </div>
    </section>
  );
}