export default function TrustBar() {
  return (
    <section className="section--tight reveal" id="trust-bar">
      <div className="container">
        <div className="trust-bar">
          {[
            ['10K+', 'Happy Customers'],
            ['4.8', '★ Average Rating'],
            ['60+', 'Menu Items'],
            ['Daily', '11 AM – 1 AM'],
            ['Free', 'Delivery Within 2km'],
          ].map(([num, label]) => (
            <div key={label} className="trust-stat">
              <div className="trust-stat__number">{num}</div>
              <div className="trust-stat__label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}