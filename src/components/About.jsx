export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-grid reveal">
          <div className="about__visual">
            <div className="about__glow"></div>
            <div className="about__emoji">👨‍🍳</div>
            <div className="about__badge"><span>Open Daily</span><strong>11AM–1AM</strong></div>
          </div>
          <div className="about__content">
            <span className="section__label">Our Story</span>
            <h2 className="section__title">The Planet of Great Food</h2>
            <div className="divider"></div>
            <p className="about__text">
              Pizza Planet opened its doors on Murree Road, Abbottabad with one simple mission: serve <em>out-of-this-world</em> food at down-to-earth prices. We're not just a pizza place — we're a full food destination covering <strong>Pizza, Pasta, Burgers, Wraps, Fried Chicken, and Chinese</strong> — all under one roof.
            </p>
            <p className="about__text">
              Every pizza is hand-stretched and loaded with the freshest toppings. Our burgers are made to order with signature sauces. Our pasta is creamy, rich, and served in generous portions. Whether you're dining in, taking away, or ordering delivery — we treat every order like it's for our own family.
            </p>
            <div className="about__highlights">
              {[['🍕','30+ Pizza Flavours'],['🚚','Free Delivery (2km)'],['⭐','4.8 Rating'],['🎁','Member Deals']].map(([icon, label]) => (
                <div key={label} className="about__highlight">
                  <span className="about__highlight-icon">{icon}</span>
                  <span className="about__highlight-label">{label}</span>
                </div>
              ))}
            </div>
            <div className="about__signature">
              <div className="about__sig-line"></div>
              <span>— The Pizza Planet Team, Abbottabad</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}