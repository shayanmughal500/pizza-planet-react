import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand-name"><span className="footer__brand-icon">🍕</span> Pizza Planet</div>
            <p className="footer__brand-desc">The Planet of Pizza, Pasta, Burgers, Wraps, Fried Chicken &amp; Chinese. Serving Abbottabad with love since day one. <em>Just love it...</em></p>
            <div className="footer__social">
              <a href="https://www.instagram.com/pizzaplanetatd" target="_blank" rel="noopener" className="footer__social-link">📷 Instagram</a>
            </div>
          </div>
          <div>
            <div className="footer__col-title">Find Us</div>
            <div className="footer__contact-item"><span className="footer__contact-icon">📍</span><span>Opposite Old Grid Station<br/>Murree Road, Abbottabad</span></div>
            <div className="footer__contact-item"><span className="footer__contact-icon">📞</span><span>0992-33-66-66</span></div>
            <div className="footer__contact-item"><span className="footer__contact-icon">💬</span><span>0313-262-11-11</span></div>
            <div className="footer__contact-item"><span className="footer__contact-icon">✉️</span><span>pizzaplanetatd@gmail.com</span></div>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <div className="footer__map" style={{ width: '100%', height: '200px' }}>
              <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=73.22%2C34.14%2C73.27%2C34.17&amp;layer=mapnik&amp;marker=34.155%2C73.245"
                title="Pizza Planet Abbottabad Location" loading="lazy" style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-md)' }}></iframe>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>&copy; 2026 Pizza Planet — Abbottabad. All rights reserved.</span>
          <span>
            <a href="#" style={{color:'var(--color-text-muted)'}}>Privacy Policy</a> · <a href="#" style={{color:'var(--color-text-muted)'}}>Terms of Service</a> · <span style={{color:'var(--color-text-muted)'}}>Made with 🍕 in Abbottabad</span>
          </span>
        </div>
      </div>
    </footer>
  );
}