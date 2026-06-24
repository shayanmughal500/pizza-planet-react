import { useState, useEffect, useCallback } from 'react';

const REVIEWS = [
  { stars:5, text:'Best pizza in Abbottabad, hands down. The Chicken Tikka flavour is incredible — perfectly spiced and loaded with cheese. My family orders from here every weekend!', author:'Ahmed Khan', role:'Regular Customer, Abbottabad' },
  { stars:5, text:'The combo deals are amazing value. We ordered Combo 9 for a family dinner and everything was fresh, hot, and delicious. The Zinger Burger is also top-notch!', author:'Fatima Bibi', role:'Loyal Customer since 2020' },
  { stars:5, text:'I\'m from Peshawar and I stop at Pizza Planet every time I\'m in Abbottabad. The Crown Crust pizza is out of this world. Their pasta is also surprisingly good for a pizza place!', author:'Usman Ali', role:'Food Enthusiast, Peshawar' },
  { stars:5, text:'The delivery is super fast and the food always arrives piping hot. Free delivery within 2km is a blessing. Their Afghani Pizza and Behari Roll are my go-to orders.', author:'Saima Javed', role:'Verified Customer' },
  { stars:5, text:'We hosted a party for 30 people and Pizza Planet handled everything perfectly. The Treat on Planet deals are unbeatable for large gatherings. Highly recommended!', author:'Bilal & Sana Ahmed', role:'Catering Customers' },
];

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback((idx) => {
    setFading(true);
    setTimeout(() => { setCurrent(idx); setFading(false); }, 200);
  }, []);

  const next = useCallback(() => goTo((current + 1) % REVIEWS.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + REVIEWS.length) % REVIEWS.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const r = REVIEWS[current];

  return (
    <section className="section" id="reviews">
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center' }}>
          <span className="section__label">Testimonials</span>
          <h2 className="section__title section__title--centered">Loved by Abbottabad</h2>
        </div>

        <div className="review-card reveal" id="reviewCard"
          style={{ opacity: fading ? 0 : 1, transform: fading ? 'translateY(10px)' : 'translateY(0)', transition: 'opacity 200ms ease, transform 200ms ease' }}>
          <div className="review-card__stars" id="reviewStars">
            {'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}
          </div>
          <p className="review-card__text" id="reviewText">{r.text}</p>
          <div className="review-card__author" id="reviewAuthor">{r.author}</div>
          <div className="review-card__author-role" id="reviewRole">{r.role}</div>
        </div>

        <div className="reviews__controls reveal">
          <button className="reviews__btn" id="reviewPrev" onClick={prev} aria-label="Previous">←</button>
          <div className="reviews__dots" id="reviewDots">
            {REVIEWS.map((_, i) => (
              <button key={i} className={`reviews__dot${i === current ? ' reviews__dot--active' : ''}`} onClick={() => goTo(i)} />
            ))}
          </div>
          <button className="reviews__btn" id="reviewNext" onClick={next} aria-label="Next">→</button>
        </div>
      </div>
    </section>
  );
}