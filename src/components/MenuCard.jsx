import { useState, useMemo } from 'react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useToast } from '../contexts/ToastContext';

const CAT_IMAGES = {
  combos:'/images/combo.jpg', meals:'/images/meal.jpg', starters:'/images/wings.jpg',
  pasta:'/images/pasta.jpg', chinese:'/images/chinese.jpg', rice:'/images/rice.jpg',
  pizza:'/images/pizza-classic.jpg', special:'/images/pizza-special.jpg',
  premium:'/images/pizza-premium.jpg', treats:'/images/combo.jpg', burgers:'/images/burger.jpg'
};

function hashId(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) { h = ((h << 5) - h) + id.charCodeAt(i); h |= 0; }
  return Math.abs(h);
}

function getRating(id) {
  const base = 4.0 + (hashId(id) % 10) / 10;
  return Math.min(5, Math.round(base * 10) / 10);
}

function getReviewCount(id) { return 15 + (hashId(id) % 200); }

function renderStars(rating) {
  const full = Math.floor(rating);
  const empty = 5 - full;
  let stars = '';
  for (let i = 0; i < full; i++) stars += '★';
  for (let i = 0; i < empty; i++) stars += '☆';
  return stars;
}

function formatPrice(price) {
  return 'Rs ' + price.toLocaleString('en-PK');
}

function badgeClass(tag) {
  if (tag === 'No Deal' || tag === 'No Further Discount') return 'badge--outline';
  if (tag === 'Bestseller') return 'badge--popular';
  if (tag === 'BOGO/40% Off' || tag === 'Special') return 'badge--accent';
  if (tag === 'Spicy') return 'badge--error';
  if (tag === 'Vegetarian') return 'badge--success';
  if (tag === 'Premium' || tag === 'Members Only') return 'badge--premium';
  if (tag === 'Deal') return 'badge--warning';
  if (tag === 'Signature') return 'badge--info';
  return 'badge--primary';
}

export default function MenuCard({ item, index }) {
  const { addItem } = useCart();
  const { isFavorited, toggle } = useWishlist();
  const { success } = useToast();
  const [selectedSize, setSelectedSize] = useState(item.defaultSize || '');
  const [added, setAdded] = useState(false);

  const hasSizes = item.hasSizes;
  const image = CAT_IMAGES[item.category] || null;
  const rating = useMemo(() => getRating(item.id), [item.id]);
  const reviewCount = useMemo(() => getReviewCount(item.id), [item.id]);
  const price = hasSizes && item.sizes?.[selectedSize]
    ? item.sizes[selectedSize].price
    : item.defaultPrice;
  const favorited = isFavorited(item.id);

  const handleAdd = () => {
    const sizeLabel = hasSizes && item.sizes?.[selectedSize] ? item.sizes[selectedSize].label : '';
    addItem(item, selectedSize || 'default', sizeLabel, price);
    success(item.name + ' added to cart!', { type: 'cart', duration: 2500 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="menu-item" data-category={item.category} style={{ animationDelay: (index * 40) + 'ms' }}>
      <div className="menu-item__image">
        {image && <img className="menu-item__image-img" src={image} alt={item.name} loading="lazy" />}
        {image && <div className="menu-item__image-overlay"></div>}
        <span className="menu-item__emoji" style={image ? { position: 'relative', zIndex: 1 } : {}}>{item.emoji}</span>
        <div className="menu-item__badges">
          {item.tags?.map(tag => (
            <span key={tag} className={`badge ${badgeClass(tag)}`}>{tag}</span>
          ))}
        </div>
        <button
          className={`heart-btn menu-item__heart${favorited ? ' heart-btn--active' : ''}`}
          onClick={() => toggle(item.id)}
          aria-label="Toggle wishlist"
        >
          {favorited ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="menu-item__body">
        <span className="menu-item__category-tag">{item.category}</span>
        <h3 className="menu-item__name">{item.name}</h3>

        <div className="menu-item__rating">
          <span className="stars stars--sm" title={`${rating} out of 5`}>{renderStars(rating)}</span>
          <span className="menu-item__rating-value">{rating.toFixed(1)}</span>
          <span style={{ fontSize: 'var(--fs-2xs)', color: 'var(--color-text-muted)' }}>({reviewCount})</span>
        </div>

        <p className="menu-item__desc">{item.description}</p>

        {item.note && <p className="menu-item__note">{item.note}</p>}

        {hasSizes && (
          <div className="menu-item__sizes">
            {Object.entries(item.sizes).map(([key, sz]) => (
              <button
                key={key}
                className={`size-btn${selectedSize === key ? ' size-btn--selected' : ''}`}
                onClick={() => setSelectedSize(key)}
              >
                {sz.label}
              </button>
            ))}
          </div>
        )}

        <div className="menu-item__footer">
          <span className="menu-item__price">{formatPrice(price)}</span>
          <button
            className="menu-item__add-btn"
            onClick={handleAdd}
            style={added ? { background: 'var(--color-success)', color: '#000' } : {}}
          >
            {added ? <><span>✓</span> Added</> : <><span>+</span> Add</>}
          </button>
        </div>
      </div>
    </div>
  );
}