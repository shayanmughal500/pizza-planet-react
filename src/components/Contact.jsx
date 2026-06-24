import { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const { success } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    success('Message sent! We\'ll get back to you soon ✉️', { duration: 3000 });
    setTimeout(() => setSent(false), 2500);
    e.target.reset();
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="reveal">
          <span className="section__label">Get In Touch</span>
          <h2 className="section__title section__title--centered">We Would Love To Talk To You</h2>
          <p className="section__subtitle section__subtitle--centered">Dine in, take away, or delivery — we're here for you every day of the week.</p>
        </div>
        <div className="contact-grid reveal">
          <div>
            <h3 style={{ marginBottom: 'var(--space-lg)' }}>Send Us a Message</h3>
            <form id="contactForm" onSubmit={handleSubmit} autoComplete="off">
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Name</label>
                <input type="text" id="contact-name" className="input" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email Address</label>
                <input type="email" id="contact-email" className="input" placeholder="john@email.com" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-msg">Message</label>
                <textarea id="contact-msg" className="textarea" placeholder="Tell us what's up..." required></textarea>
              </div>
              <button type="submit" className="btn btn--primary btn--lg"
                style={sent ? { background: 'var(--color-success)', width: '100%' } : { width: '100%' }}>
                {sent ? '✓ Message Sent!' : 'Send Message ✉️'}
              </button>
            </form>
          </div>
          <div>
            <h3 style={{ marginBottom: 'var(--space-lg)' }}>Visit Us</h3>
            {[
              ['📍','Location','Opposite Old Grid Station, Murree Road, Abbottabad'],
              ['📞','Landline','0992-33-66-66'],
              ['💬','Phone / WhatsApp','0313-262-11-11'],
              ['📞','Alternate Phone','0303-800-1-888'],
              ['✉️','Email','pizzaplanetatd@gmail.com'],
              ['🕐','Hours','Open Daily: 11:00 AM – 01:00 AM'],
              ['🚚','Delivery','FREE within 2km (Rs 100 beyond)'],
            ].map(([icon, label, value]) => (
              <div key={label} className="contact-info__item">
                <div className="contact-info__icon">{icon}</div>
                <div>
                  <div className="contact-info__label">{label}</div>
                  <div className="contact-info__value">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}