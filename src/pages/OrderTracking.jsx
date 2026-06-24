import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useDeviceNotification from '../hooks/useDeviceNotification';

export default function OrderTracking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevStatus = useRef(null);
  
  const { notify, requestPermission } = useDeviceNotification();

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  useEffect(() => {
    let intervalId;

    const fetchOrder = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL + '/orders/' + id : 'http://localhost:5000/api/orders/' + id;
        const res = await fetch(apiUrl);
        const data = await res.json();
        
        if (data.success) {
          setOrder(data.data);
          
          // Check if status changed
          if (prevStatus.current && prevStatus.current !== data.data.status) {
            notify(`Order Update: ${data.data.status.replace(/_/g, ' ')}`, {
              body: `Your order status has been updated to ${data.data.status.replace(/_/g, ' ')}`
            });
          }
          prevStatus.current = data.data.status;
          setError(null);
        } else {
          setError('Order not found');
        }
      } catch (err) {
        // silently fail on polling
        if (!order) setError('Could not connect to server');
      }
      setLoading(false);
    };

    fetchOrder();
    // Poll every 10 seconds
    intervalId = setInterval(fetchOrder, 10000);

    return () => clearInterval(intervalId);
  }, [id, notify, order]);

  if (loading) {
    return (
      <div style={{padding:'120px var(--content-pad)',textAlign:'center',minHeight:'100vh',background:'var(--color-bg)'}}>
        <div className="container"><h2>Loading Order...</h2></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div style={{padding:'120px var(--content-pad)',textAlign:'center',minHeight:'100vh',background:'var(--color-bg)'}}>
        <div className="container">
          <div style={{fontSize:'4rem',marginBottom:'1rem'}}>🤷</div>
          <h2>{error || 'Order not found'}</h2>
          <button className="btn btn--primary" onClick={() => navigate('/')} style={{marginTop:'1rem'}}>Return Home</button>
        </div>
      </div>
    );
  }

  const statusColors = {
    pending: 'var(--color-warning)',
    confirmed: 'var(--color-info)',
    preparing: 'var(--color-primary)',
    ready: 'var(--color-success)',
    out_for_delivery: 'var(--color-secondary)',
    delivered: 'var(--color-success)',
    cancelled: 'var(--color-error)'
  };

  return (
    <div style={{padding:'120px var(--content-pad) 60px',minHeight:'100vh',background:'var(--color-bg)'}}>
      <div className="container" style={{maxWidth:'600px',margin:'0 auto'}}>
        <div className="card" style={{padding:'2rem',textAlign:'center'}}>
          <div style={{fontSize:'3rem',marginBottom:'1rem'}}>🍕</div>
          <h1 style={{marginBottom:'0.5rem'}}>Order #{order.order_number}</h1>
          
          <div style={{
            display:'inline-block',
            padding:'0.5rem 1.5rem',
            borderRadius:'var(--radius-full)',
            background: statusColors[order.status] || 'var(--color-border)',
            color: '#fff',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            margin: '1.5rem 0'
          }}>
            {order.status.replace(/_/g, ' ')}
          </div>
          
          <p style={{color:'var(--color-text-dim)',marginBottom:'2rem'}}>
            We are tracking your order. Keep this page open to receive live updates and notifications!
          </p>

          <div style={{textAlign:'left',background:'var(--color-bg-alt)',padding:'1.5rem',borderRadius:'var(--radius-md)'}}>
            <h3 style={{marginBottom:'1rem',fontSize:'1.1rem'}}>Order Summary</h3>
            {order.items && order.items.map((it, idx) => (
              <div key={idx} style={{display:'flex',justifyContent:'space-between',marginBottom:'0.5rem',fontSize:'var(--fs-small)'}}>
                <span>{it.emoji} {it.name} {it.sizeLabel && `(${it.sizeLabel})`} ×{it.qty}</span>
                <span style={{fontWeight:600}}>Rs {(it.price * it.qty).toLocaleString()}</span>
              </div>
            ))}
            <div style={{borderTop:'1px solid var(--color-border)',marginTop:'1rem',paddingTop:'1rem',display:'flex',justifyContent:'space-between',fontWeight:700,fontSize:'1.1rem'}}>
              <span>Total</span>
              <span style={{color:'var(--color-primary)'}}>Rs {Number(order.total).toLocaleString()}</span>
            </div>
          </div>
          
          <button className="btn btn--outline btn--block" onClick={() => navigate('/')} style={{marginTop:'2rem'}}>
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
}
