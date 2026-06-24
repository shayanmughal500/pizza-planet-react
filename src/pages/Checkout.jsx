import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import AuthModal from '../components/auth/AuthModal';
import { useNavigate } from 'react-router-dom';
import useDeviceNotification from '../hooks/useDeviceNotification';

export default function Checkout() {
  const { items, total, deliveryFee, clearCart } = useCart();
  const { user, token, addAddress } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const { notify } = useDeviceNotification();

  const [showAuth, setShowAuth] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');

  // Address state
  const savedAddresses = user?.addresses || [];
  const [selectedSavedId, setSelectedSavedId] = useState(savedAddresses.length > 0 ? savedAddresses[0].id : null);
  const [showNewAddress, setShowNewAddress] = useState(savedAddresses.length === 0);
  const [newAddress, setNewAddress] = useState('');
  const [newAddressLabel, setNewAddressLabel] = useState('Home');
  const [saveAddress, setSaveAddress] = useState(true);

  // Determine the actual delivery address
  const getActualAddress = () => {
    if (showNewAddress) return newAddress;
    if (selectedSavedId) {
      const saved = savedAddresses.find(a => a.id === selectedSavedId);
      return saved ? saved.address : '';
    }
    return newAddress;
  };

  const finalTotal = total + deliveryFee;

  const handleOrder = async () => {
    const actualAddress = getActualAddress();
    if (!actualAddress.trim()) {
      error('Please enter a delivery address');
      return;
    }
    if (!phone.trim()) {
      error('Please enter your phone number');
      return;
    }
    if (items.length === 0) {
      error('Your cart is empty');
      return;
    }

    // If user is logged in and wants to save the new address
    if (user && showNewAddress && saveAddress && newAddress.trim()) {
      await addAddress(newAddressLabel, newAddress.trim(), savedAddresses.length === 0);
    }

    setSubmitting(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL + '/orders' : 'http://localhost:5000/api/orders';
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(it => ({
            name: it.name, emoji: it.emoji, sizeLabel: it.sizeLabel,
            price: it.price, qty: it.qty
          })),
          customerName: name || 'Guest',
          customerPhone: phone,
          customerEmail: email || null,
          deliveryAddress: actualAddress,
          specialInstructions: instructions,
        })
      });
      const data = await res.json();
      if (data.success) {
        success(`Order #${data.data.orderNumber} placed! 🎉`);
        notify('Order Placed! 🍕', { body: `Your order #${data.data.orderNumber} was successfully placed!` });
        clearCart();
        navigate('/order/' + data.data.orderNumber);
      } else {
        error(data.message || 'Order failed');
      }
    } catch (err) {
      error('Could not connect to server');
    }
    setSubmitting(false);
  };

  if (items.length === 0) {
    return (
      <div style={{padding:'120px var(--content-pad) 60px',textAlign:'center',minHeight:'100vh',background:'var(--color-bg)'}}>
        <div className="container" style={{maxWidth:500,margin:'0 auto'}}>
          <div style={{fontSize:'4rem',marginBottom:'1rem'}}>🛒</div>
          <h2 style={{marginBottom:'0.5rem'}}>Your cart is empty</h2>
          <p style={{color:'var(--color-text-dim)',marginBottom:'2rem'}}>Add some items first, then come back to checkout.</p>
          <button className="btn btn--primary btn--lg" onClick={() => navigate('/')}>Browse Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{padding:'120px var(--content-pad) 60px',minHeight:'100vh',background:'var(--color-bg)'}}>
      <div className="container">
        <h1 style={{marginBottom:'0.25rem'}}>Checkout</h1>
        <p style={{color:'var(--color-text-dim)',marginBottom:'2rem'}}>Review your order and place it</p>

        <div className="checkout-grid">
          {/* LEFT — Delivery Info */}
          <div>
            {/* Auth prompt for guests */}
            {!user && (
              <div style={{background:'var(--color-primary-soft)',border:'1px solid var(--color-primary)',borderRadius:'var(--radius-md)',padding:'1rem 1.5rem',marginBottom:'1.5rem',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem'}}>
                <span style={{fontSize:'var(--fs-small)'}}>🔐 <strong>Log in</strong> to save your address for next time</span>
                <button className="btn btn--primary btn--sm" onClick={() => setShowAuth(true)}>Log In / Sign Up</button>
              </div>
            )}

            <div className="card" style={{padding:'1.5rem',marginBottom:'1rem'}}>
              <h3 style={{marginBottom:'1rem'}}>📦 Delivery Details</h3>
              
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required />
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
                <div className="form-group">
                  <label className="form-label">Phone *</label>
                  <input type="tel" className="input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="03XX-XXXXXXX" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email (optional)</label>
                  <input type="email" className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" />
                </div>
              </div>

              {/* ---- ADDRESS SECTION ---- */}
              {user && savedAddresses.length > 0 && !showNewAddress && (
                <div style={{marginBottom:'1rem'}}>
                  <label className="form-label" style={{marginBottom:'0.5rem'}}>Saved Addresses</label>
                  {savedAddresses.map(addr => (
                    <div key={addr.id}
                      onClick={() => setSelectedSavedId(addr.id)}
                      style={{
                        padding:'0.75rem 1rem', marginBottom:'0.5rem', borderRadius:'var(--radius-md)',
                        border:`2px solid ${selectedSavedId === addr.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                        background: selectedSavedId === addr.id ? 'var(--color-primary-soft)' : 'var(--color-bg-alt)',
                        cursor:'pointer', transition:'all var(--dur-fast)'
                      }}>
                      <div style={{fontWeight:600,fontSize:'var(--fs-small)',marginBottom:'0.2rem'}}>
                        {addr.label} {addr.is_default ? '🏠' : ''}
                      </div>
                      <div style={{fontSize:'var(--fs-xs)',color:'var(--color-text-dim)'}}>{addr.address}</div>
                    </div>
                  ))}
                  <button
                    onClick={() => setShowNewAddress(true)}
                    style={{
                      width:'100%', padding:'0.6rem', borderRadius:'var(--radius-md)',
                      border:'2px dashed var(--color-border)', background:'transparent',
                      color:'var(--color-text-dim)', cursor:'pointer', fontSize:'var(--fs-small)',
                      display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
                      transition:'all var(--dur-fast)'
                    }}
                    onMouseEnter={e => { e.target.style.borderColor='var(--color-primary)'; e.target.style.color='var(--color-primary)'; }}
                    onMouseLeave={e => { e.target.style.borderColor='var(--color-border)'; e.target.style.color='var(--color-text-dim)'; }}
                  >
                    <span style={{fontSize:'1.2rem',fontWeight:700}}>+</span> Add New Address
                  </button>
                </div>
              )}

              {/* New address form — shown for first-time users, guests, or when "+" is clicked */}
              {showNewAddress && (
                <div style={{marginBottom:'1rem',padding:'1rem',background:'var(--color-bg-alt)',borderRadius:'var(--radius-md)',border:'1px solid var(--color-border)'}}>
                  {user && savedAddresses.length > 0 && (
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.5rem'}}>
                      <span style={{fontSize:'var(--fs-xs)',color:'var(--color-text-dim)'}}>New Address</span>
                      <button onClick={() => setShowNewAddress(false)}
                        style={{fontSize:'var(--fs-xs)',color:'var(--color-text-muted)',background:'none',border:'none',cursor:'pointer'}}>
                        ← Back to saved
                      </button>
                    </div>
                  )}
                  <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:'0.5rem',marginBottom:'0.5rem'}}>
                    <select className="input" value={newAddressLabel} onChange={e => setNewAddressLabel(e.target.value)}
                      style={{fontSize:'var(--fs-xs)'}}>
                      <option>Home</option>
                      <option>Office</option>
                      <option>Other</option>
                    </select>
                    <input type="text" className="input" value={newAddress} onChange={e => setNewAddress(e.target.value)}
                      placeholder="House no, street, area, city" style={{fontSize:'var(--fs-xs)'}} />
                  </div>
                  {user && (
                    <label style={{display:'flex',alignItems:'center',gap:'0.5rem',fontSize:'var(--fs-xs)',color:'var(--color-text-dim)',cursor:'pointer'}}>
                      <input type="checkbox" checked={saveAddress} onChange={e => setSaveAddress(e.target.checked)} />
                      Save this address for next time
                    </label>
                  )}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Special Instructions (optional)</label>
                <textarea className="textarea" value={instructions} onChange={e => setInstructions(e.target.value)}
                  placeholder="e.g. Ring the bell, leave at the door"
                  style={{minHeight:'60px'}}
                />
              </div>
            </div>

            {/* Payment */}
            <div className="card" style={{padding:'1.5rem',marginBottom:'1rem'}}>
              <h3 style={{marginBottom:'0.5rem'}}>💵 Payment</h3>
              <p style={{fontSize:'var(--fs-small)',color:'var(--color-text-dim)'}}>
                <strong>Cash on Delivery</strong> — pay when your food arrives.
              </p>
            </div>
          </div>

          {/* RIGHT — Order Summary */}
          <div>
            <div className="card" style={{padding:'1.5rem',position:'sticky',top:'100px'}}>
              <h3 style={{marginBottom:'1rem'}}>🛒 Your Order</h3>
              {items.map(it => (
                <div key={it.cartId} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0.6rem 0',borderBottom:'1px solid var(--color-border)',fontSize:'var(--fs-small)'}}>
                  <span>{it.emoji} {it.name} {it.sizeLabel && <span style={{color:'var(--color-text-muted)',fontSize:'var(--fs-xs)'}}>({it.sizeLabel})</span>} ×{it.qty}</span>
                  <span style={{fontWeight:600}}>Rs {(it.price * it.qty).toLocaleString('en-PK')}</span>
                </div>
              ))}
              <div style={{marginTop:'1rem',paddingTop:'1rem',borderTop:'1px solid var(--color-border)'}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'var(--fs-small)',color:'var(--color-text-dim)',marginBottom:'0.25rem'}}>
                  <span>Subtotal</span><span>Rs {total.toLocaleString('en-PK')}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'var(--fs-small)',color:deliveryFee===0?'var(--color-success)':'var(--color-text-dim)',marginBottom:'0.5rem'}}>
                  <span>Delivery</span><span>{deliveryFee === 0 ? 'FREE' : `Rs ${deliveryFee}`}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',fontWeight:700,fontSize:'1.1rem',paddingTop:'0.5rem',borderTop:'1px solid var(--color-border)'}}>
                  <span>Total</span><span style={{color:'var(--color-primary)'}}>Rs {finalTotal.toLocaleString('en-PK')}</span>
                </div>
              </div>
              <button className="btn btn--primary btn--block btn--lg" style={{marginTop:'1.5rem'}}
                onClick={handleOrder} disabled={submitting}>
                {submitting ? 'Placing Order...' : 'Place Order 💳'}
              </button>
              <p style={{textAlign:'center',fontSize:'var(--fs-xs)',color:'var(--color-text-muted)',marginTop:'0.75rem'}}>
                Cash on Delivery · FREE delivery over Rs 2,000
              </p>
            </div>
          </div>
        </div>
      </div>
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
}