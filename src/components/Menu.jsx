import { useState, useMemo, useCallback } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menu-data';
import MenuCard from './MenuCard';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    let items = MENU_ITEMS;
    if (activeCategory !== 'all') {
      items = items.filter(it => it.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(it =>
        it.name.toLowerCase().includes(q) ||
        it.description.toLowerCase().includes(q) ||
        it.category.toLowerCase().includes(q)
      );
    }
    return items;
  }, [activeCategory, searchQuery]);

  const handleSearchClear = useCallback(() => setSearchQuery(''), []);

  return (
    <section className="section" id="menu">
      <div className="container">
        <div className="reveal">
          <span className="section__label">Our Menu</span>
          <h2 className="section__title">The Planet of Great Food</h2>
          <p className="section__subtitle">
            From hand-tossed pizzas to juicy burgers, creamy pasta, crispy fried chicken, and Chinese favourites — we've got it all. Members get Buy 1 Get 1 Free &amp; 40% off on selected items.
          </p>
        </div>

        <div className="search-bar reveal reveal--delay-1">
          <span className="search-bar__icon">🔍</span>
          <input type="text" className="search-bar__input" id="menuSearch"
            placeholder="Search the menu... (e.g. pizza, burger, tikka)"
            value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            autoComplete="off"
          />
          <button className={`search-bar__clear${searchQuery ? ' search-bar__clear--visible' : ''}`}
            id="menuSearchClear" aria-label="Clear search" onClick={handleSearchClear}>✕</button>
        </div>

        <div className="menu__filters reveal reveal--delay-2" id="menuFilters">
          {MENU_CATEGORIES.map(cat => (
            <button key={cat.id}
              className={`chip${activeCategory === cat.id ? ' chip--active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        <p className="search-bar__results-count" id="menuResultsCount">
          {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
          {(searchQuery || activeCategory !== 'all') ? ' found' : ''}
        </p>

        <div className="menu__grid stagger" id="menuGrid">
          {filteredItems.length === 0 ? (
            <div className="menu-empty">
              <div className="menu-empty__icon">🔍</div>
              <p className="menu-empty__text">No items found.</p>
              <p style={{ fontSize: 'var(--fs-small)', color: 'var(--color-text-muted)' }}>Try a different search or category.</p>
            </div>
          ) : (
            filteredItems.map((item, i) => <MenuCard key={item.id} item={item} index={i} />)
          )}
        </div>
      </div>
    </section>
  );
}