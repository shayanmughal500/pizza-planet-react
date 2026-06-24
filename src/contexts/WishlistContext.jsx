import { createContext, useContext, useState, useCallback } from 'react';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { const s = localStorage.getItem('pizzaplanet_wishlist'); return s ? JSON.parse(s) : []; }
    catch { return []; }
  });

  const toggle = useCallback((itemId) => {
    setItems(prev => {
      const next = prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId];
      try { localStorage.setItem('pizzaplanet_wishlist', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const isFavorited = useCallback((itemId) => items.includes(itemId), [items]);

  return (
    <WishlistContext.Provider value={{ items, toggle, isFavorited }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);