export default function Hero() {
  return (
    <section className="hero reveal" id="home">
      <div className="hero__bg"></div>
      <div className="container hero__inner">
        <span className="section__label anim-fade-in-down">THE PLANET OF — PIZZA | PASTA | BURGER | WRAPS | FRIED CHICKEN | CHINESE</span>
        <h1 className="hero__title anim-fade-in-up" style={{animationDelay:'100ms'}}>
          Pizza That<br/><span className="hero__title-accent">Orbits</span> The Rest
        </h1>
        <p className="hero__subtitle anim-fade-in-up" style={{animationDelay:'200ms'}}>
          Just love it... Wood-fired artisan pizza, juicy burgers, creamy pasta, and more — served fresh daily in Abbottabad. <strong>FREE delivery within 2km.</strong>
        </p>
        <div className="hero__actions anim-fade-in-up" style={{animationDelay:'300ms'}}>
          <a href="#menu" className="btn btn--primary btn--lg">🍕 Explore Our Menu</a>
          <a href="#contact" className="btn btn--outline btn--lg">📍 Find Us</a>
        </div>
        <div className="hero__pizza anim-float">🍕</div>
        <div className="hero__scroll-indicator">
          <span>Scroll</span>
          <div className="hero__scroll-line"></div>
        </div>
      </div>
    </section>
  );
}