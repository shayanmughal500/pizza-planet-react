import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthModal from './auth/AuthModal';

export default function Header() {
  const { itemCount, openDrawer } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = document.querySelectorAll('section[id], div[id]');
      let current = '';
      sections.forEach(sec => {
        const id = sec.getAttribute('id');
        if (id && window.scrollY >= sec.offsetTop - 100) current = id;
      });
      setActiveLink(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.classList.remove('no-scroll');
  }, []);

  const toggleMenu = () => {
    if (menuOpen) { closeMenu(); }
    else { setMenuOpen(true); document.body.classList.add('no-scroll'); }
  };

  const navClick = (e, id) => {
    e.preventDefault();
    closeMenu();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else navigate('/');
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  // Admin page gets a minimal header
  if (isAdmin) {
    return (
      <>
        <header className="header scrolled" id="header" style={{ height: 'auto', padding: '10px 0' }}>
          <div className="container header__inner" style={{ flexWrap: 'wrap', gap: '10px', height: 'auto' }}>
            <a href="/" className="header__logo" onClick={e => { e.preventDefault(); navigate('/'); }}>
              <span className="header__logo-icon">🍕</span>
              <span>Pizza Planet <small style={{fontSize:'0.6em',color:'var(--color-text-muted)',display:'block',lineHeight:1,fontFamily:'var(--font-body)'}}>Admin Panel</small></span>
            </a>
            <div className="header__actions" style={{ flexWrap: 'wrap' }}>
              <button className="btn btn--ghost btn--sm" onClick={handleLogout}>Logout</button>
              <button className="btn btn--outline btn--sm" onClick={() => navigate('/')}>← Site</button>
            </div>
          </div>
        </header>
        <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
      </>
    );
  }

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
        <div className="container header__inner">
          <a href="/" className="header__logo" onClick={e => { e.preventDefault(); navigate('/'); }}>
            <span className="header__logo-icon">🍕</span>
            <span>Pizza Planet <small style={{fontSize:'0.6em',color:'var(--color-text-muted)',display:'block',lineHeight:1,fontFamily:'var(--font-body)'}}>Just love it...</small></span>
          </a>

          <nav className={`header__nav${menuOpen ? ' header__nav--open' : ''}`} id="headerNav">
            {['home','menu','about','reviews','vip','contact'].map(link => (
              <a key={link} href={`#${link}`} className={`header__nav-link${activeLink === link ? ' active' : ''}`}
                 onClick={e => navClick(e, link)}>
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            ))}
            {user?.role === 'admin' && (
              <a href="/admin" className="header__nav-link" onClick={e => { e.preventDefault(); navigate('/admin'); closeMenu(); }}
                 style={{color:'var(--color-accent)'}}>
                ⚙️ Admin
              </a>
            )}
          </nav>

          <div className="header__actions">
            {user ? (
              <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
                <button className="btn btn--ghost btn--sm" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <button className="btn btn--ghost btn--sm" onClick={() => setShowAuth(true)}>
                👤 Login
              </button>
            )}
            <button className="header__cart-btn" id="cartBtn" aria-label="Open cart" onClick={openDrawer}>
              <svg viewBox="0 0 24 24">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <span className={`cart-badge${itemCount > 0 ? ' cart-badge--visible' : ''}`} id="cartBadge">
                {itemCount}
              </span>
            </button>
            <button className={`header__menu-toggle${menuOpen ? ' header__menu-toggle--open' : ''}`}
                    id="menuToggle" aria-label="Toggle menu" onClick={toggleMenu}>
              <span></span>
            </button>
          </div>
        </div>
      </header>
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
}