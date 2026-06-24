import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { const saved = localStorage.getItem('pizzaplanet_cart'); return saved ? JSON.parse(saved) : []; }
    catch { return []; }
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem('pizzaplanet_cart', JSON.stringify(items)); } catch {}
  }, [items]);

  const addItem = useCallback((menuItem, size, sizeLabel, price) => {
    const cid = menuItem.id + '__' + (size || 'default');
    setItems(prev => {
      const existing = prev.find(it => it.cartId === cid);
      if (existing) {
        return prev.map(it => it.cartId === cid ? { ...it, qty: it.qty + 1 } : it);
      }
      return [...prev, {
        cartId: cid, id: menuItem.id, name: menuItem.name,
        emoji: menuItem.emoji, size: size || '', sizeLabel: sizeLabel || '',
        price: price || menuItem.price || menuItem.defaultPrice, qty: 1
      }];
    });
  }, []);

  const removeItem = useCallback((cartId) => {
    setItems(prev => prev.filter(it => it.cartId !== cartId));
  }, []);

  const updateQty = useCallback((cartId, delta) => {
    setItems(prev => {
      return prev.map(it => {
        if (it.cartId !== cartId) return it;
        return { ...it, qty: it.qty + delta };
      }).filter(it => it.qty > 0);
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = items.reduce((s, i) => s + i.qty, 0);
  const deliveryFee = total >= 2000 ? 0 : (total > 0 ? 100 : 0);

  const openDrawer = useCallback(() => { setDrawerOpen(true); document.body.classList.add('no-scroll'); }, []);
  const closeDrawer = useCallback(() => { setDrawerOpen(false); document.body.classList.remove('no-scroll'); }, []);

  return (
    <CartContext.Provider value={{
      items, total, itemCount, deliveryFee, drawerOpen,
      addItem, removeItem, updateQty, clearCart,
      openDrawer, closeDrawer
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);