import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Admin() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [lastOrderId, setLastOrderId] = useState(0);
  const [newOrderAlert, setNewOrderAlert] = useState(false);
  const API = 'http://localhost:5000/api/admin';

  const playSound = useCallback((type) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      gain.gain.value = 0.15;
      if (type === 'new-order') {
        osc.frequency.value = 880; osc.type = 'sine';
        osc.start(); osc.stop(ctx.currentTime + 0.15);
        setTimeout(() => {
          const o2 = ctx.createOscillator(); o2.connect(gain);
          o2.frequency.value = 1100; o2.type = 'sine';
          o2.start(); o2.stop(ctx.currentTime + 0.2);
        }, 180);
      } else if (type === 'status') {
        osc.frequency.value = 660; osc.type = 'triangle';
        osc.start(); osc.stop(ctx.currentTime + 0.3);
      }
    } catch(e) {}
  }, []);

  useEffect(() => {
    if (!token || user?.role !== 'admin') { navigate('/'); return; }
    fetchDashboard();
    fetchOrders();
    const poll = setInterval(() => { fetchDashboard(); fetchOrders(true); }, 30000);
    return () => clearInterval(poll);
  }, [token, user]);

  async function fetchDashboard() {
    try {
      const res = await fetch(`${API}/dashboard`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setDashboard(data.data);
    } catch (e) {}
  }

  async function fetchOrders(silent = false) {
    if (!silent) setLoading(true);
    try {
      const url = statusFilter ? `${API}/orders?status=${statusFilter}` : `${API}/orders`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) {
        if (data.data.length > 0 && lastOrderId > 0 && !silent) {
          const newOrders = data.data.filter(o => o.id > lastOrderId);
          if (newOrders.length > 0) {
            playSound('new-order');
            setNewOrderAlert(true);
            setTimeout(() => setNewOrderAlert(false), 5000);
          }
        }
        if (data.data.length > 0) setLastOrderId(Math.max(...data.data.map(o => o.id)));
        setOrders(data.data);
      }
    } catch (e) {}
    setLoading(false);
  }

  useEffect(() => { fetchOrders(); }, [statusFilter]);

  async function updateStatus(orderId, newStatus) {
    try {
      const res = await fetch(`${API}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) { playSound('status'); fetchOrders(); fetchDashboard(); }
    } catch (e) {}
  }

  const statusColors = {
    pending: 'var(--color-warning)', confirmed: 'var(--color-info)', preparing: 'var(--color-accent)',
    ready: 'var(--color-success)', out_for_delivery: '#8B5CF6', delivered: 'var(--color-success)', cancelled: 'var(--color-error)'
  };

  const nextStatuses = {
    pending: ['confirmed', 'cancelled'], confirmed: ['preparing', 'cancelled'], preparing: ['ready', 'cancelled'],
    ready: ['out_for_delivery', 'cancelled'], out_for_delivery: ['delivered', 'cancelled'], delivered: [], cancelled: []
  };

  if (!token || user?.role !== 'admin') {
    return (
      <div style={{ padding: '120px var(--content-pad)', textAlign: 'center', minHeight: '100vh', background: 'var(--color-bg)' }}>
        <h2>Access Denied</h2>
        <p style={{ color: 'var(--color-text-dim)', marginTop: '1rem' }}>Admin access only.</p>
        <button className="btn btn--primary" style={{ marginTop: '1.5rem' }} onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px var(--content-pad) 60px', minHeight: '100vh', background: 'var(--color-bg)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1>🍕 Admin Panel</h1>
            <p style={{ color: 'var(--color-text-dim)' }}>Pizza Planet — Order Management</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {newOrderAlert && (
              <span className="badge badge--popular" style={{ padding: '0.5rem 1rem', fontSize: 'var(--fs-small)' }}>🔔 New Order!</span>
            )}
          </div>
        </div>

        {dashboard && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {[
              ['📦', 'Total Orders', dashboard.totalOrders],
              ['⏳', 'Pending', dashboard.pendingOrders],
              ['📅', 'Today', dashboard.todayOrders],
              ['💰', 'Revenue', `Rs ${Number(dashboard.revenue).toLocaleString('en-PK')}`],
              ['👥', 'Customers', dashboard.customers],
            ].map(([icon, label, value]) => (
              <div key={label} className="card" style={{ padding: '1.25rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{value}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text-muted)' }}>{label}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {['', 'pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'].map(s => (
            <button key={s} className={`chip${statusFilter === s ? ' chip--active' : ''}`} onClick={() => setStatusFilter(s)}>
              {s || 'All'}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '3rem' }}>Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <p style={{ color: 'var(--color-text-dim)' }}>No orders yet. Orders will appear here when customers place them.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {orders.map(order => (
              <div key={order.id} className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: '1.1rem' }}>#{order.order_number}</strong>
                      <span className="badge" style={{ background: statusColors[order.status] || 'var(--color-border)', color: '#fff' }}>
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div style={{ fontSize: 'var(--fs-small)', color: 'var(--color-text-dim)' }}>
                      <strong>{order.customer_name}</strong> · {order.customer_phone}
                    </div>
                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                      📍 {order.delivery_address?.substring(0, 80)}...
                    </div>
                    {order.special_instructions && (
                      <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-accent)', marginTop: '0.25rem', fontStyle: 'italic' }}>
                        💬 {order.special_instructions}
                      </div>
                    )}
                    {order.items && (
                      <div style={{ marginTop: '0.5rem', fontSize: 'var(--fs-xs)', color: 'var(--color-text-dim)' }}>
                        {order.items.map((it, i) => (
                          <span key={i}>{it.name} ×{it.qty}{i < order.items.length - 1 ? ', ' : ''}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                      Rs {Number(order.total).toLocaleString('en-PK')}
                    </div>
                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text-muted)' }}>
                      {new Date(order.created_at).toLocaleString()}
                    </div>
                    {nextStatuses[order.status]?.length > 0 && (
                      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                        {nextStatuses[order.status].map(ns => (
                          <button key={ns} className="btn btn--sm"
                            style={ns === 'cancelled' ? { background: 'var(--color-error)', color: '#fff', border: 'none' } : { background: 'var(--color-primary)', color: '#fff', border: 'none' }}
                            onClick={() => updateStatus(order.id, ns)}>
                            {ns.replace(/_/g, ' ')}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}