import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { items, total, deliveryFee, drawerOpen, closeDrawer, updateQty, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const goToCheckout = () => {
    closeDrawer();
    navigate('/checkout');
  };

  return (
    <>
      <div className={`cart-overlay${drawerOpen ? ' cart-overlay--visible' : ''}`} id="cartOverlay" onClick={closeDrawer}></div>
      <aside className={`cart-drawer${drawerOpen ? ' cart-drawer--open' : ''}`} id="cartDrawer">
        <div className="cart-drawer__header">
          <h3 className="cart-drawer__title">🛒 Your Order <span className="cart-drawer__count"></span></h3>
          <button className="cart-drawer__close" id="cartCloseBtn" onClick={closeDrawer}>✕</button>
        </div>
        <div className="cart-drawer__body" id="cartBody">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty__icon">🛒</div>
              <p className="cart-empty__text">Your cart is empty.<br/>Add something delicious!</p>
              <button className="btn btn--outline" onClick={() => { closeDrawer(); document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Browse Menu
              </button>
            </div>
          ) : (
            items.map(it => (
              <div key={it.cartId} className="cart-item">
                <div className="cart-item__emoji">{it.emoji}</div>
                <div className="cart-item__info">
                  <div className="cart-item__name">{it.name}</div>
                  {it.sizeLabel && <div className="cart-item__size">{it.sizeLabel}</div>}
                  <div className="cart-item__actions">
                    <button className="qty-btn" onClick={() => updateQty(it.cartId, -1)}>−</button>
                    <span className="cart-item__qty">{it.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(it.cartId, 1)}>+</button>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <div className="cart-item__price">Rs {(it.price * it.qty).toLocaleString('en-PK')}</div>
                  <button className="cart-item__remove" onClick={() => removeItem(it.cartId)}>✕</button>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="cart-drawer__footer" id="cartFooter">
            {deliveryFee > 0 ? (
              <div className="cart-delivery-note">Rs 100 delivery fee (free over Rs 2,000)</div>
            ) : (
              <div className="cart-discount"><span>🎉</span><span>FREE Delivery</span></div>
            )}
            <div className="cart-total">
              <span className="cart-total__label">Total</span>
              <span className="cart-total__amount">Rs {(total + deliveryFee).toLocaleString('en-PK')}</span>
            </div>
            <button className="btn btn--cart-checkout" onClick={goToCheckout}>
              🛒 Proceed to Checkout
            </button>
            <button className="btn btn--ghost btn--block" style={{ marginTop: '8px', fontSize: 'var(--fs-xs)' }}
              onClick={clearCart}>Clear Cart</button>
          </div>
        )}
      </aside>
    </>
  );
}