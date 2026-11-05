import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { categories } from '../data/products';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const sortOptions = [
  { value: 'latest', label: 'Latest Additions' },
  { value: 'popular', label: 'Most Collected' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export default function GalleryPage() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('latest');
  const [priceRange, setPriceRange] = useState([0, 700]);
  const [availabilityFilter, setAvailabilityFilter] = useState('all'); // 'all' | 'In Stock' | 'Made to Order'

  const activeCategory = searchParams.get('category') || 'all';

  const setCategory = (cat) => {
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const filtered = useMemo(() => {
    let result = [...products];

    // Category / Movement filter with legacy backward-compatibility
    if (activeCategory !== 'all') {
      result = result.filter((p) => {
        if (p.category === activeCategory) return true;
        // Map legacy calligraphy subcategories
        if (activeCategory === 'calligraphy') {
          return (
            p.category === 'allah-names' ||
            p.category === 'quranic-verses' ||
            p.category === 'arabic-calligraphy' ||
            p.category === 'modern-islamic'
          );
        }
        return false;
      });
    }

    // Search filter across title, movement, description, tags, materials
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => {
        const titleMatch = p.title?.toLowerCase().includes(q);
        const movementMatch = p.artMovement?.toLowerCase().includes(q);
        const descMatch = p.description?.toLowerCase().includes(q);
        const matMatch = p.materials?.toLowerCase().includes(q);
        const tagMatch = Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase().includes(q));
        return titleMatch || movementMatch || descMatch || matMatch || tagMatch;
      });
    }

    // Availability filter
    if (availabilityFilter !== 'all') {
      result = result.filter((p) => p.availability === availabilityFilter);
    }

    // Price range filter
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sorting
    switch (sort) {
      case 'popular':
        result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        result.sort((a, b) => (b.id || 0) - (a.id || 0));
    }

    return result;
  }, [products, activeCategory, search, sort, priceRange, availabilityFilter]);

  // Categories for navigation tabs (excluding 'all' which is handled first)
  const navCategories = categories.filter((c) => c.id !== 'all');

  return (
    <div style={{ background: '#FDFAF3', minHeight: '100vh' }} className="page-enter">
      {/* Page Header */}
      <div style={{
        background: '#161413',
        padding: '120px 24px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="arabic-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.08 }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          {/* Breadcrumb */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255, 255, 255, 0.45)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '20px',
          }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:text-[#C9A84C]">Home</Link>
            <span>/</span>
            <span style={{ color: '#C9A84C' }}>Fine Art Collections</span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '16px',
            lineHeight: 1.15,
          }}>
            The Fine Art Gallery
          </h1>

          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            lineHeight: 1.7,
            maxWidth: '680px',
            margin: 0,
          }}>
            Curated original canvases spanning Abstract Expressionism, Modernist Cubism, fine Persian & Mughal Miniature painting, and Sacred Islamic Calligraphy.
          </p>

          {/* Quick Filter Horizontal Scroll Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            overflowX: 'auto',
            paddingTop: '32px',
            paddingBottom: '8px',
            scrollbarWidth: 'none',
          }}>
            <button
              onClick={() => setCategory('all')}
              style={{
                whiteSpace: 'nowrap',
                padding: '9px 18px',
                borderRadius: '2px',
                border: activeCategory === 'all' ? '1px solid #C9A84C' : '1px solid rgba(255,255,255,0.15)',
                background: activeCategory === 'all' ? '#C9A84C' : 'rgba(255,255,255,0.06)',
                color: activeCategory === 'all' ? '#1A1A1A' : 'rgba(255,255,255,0.85)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                letterSpacing: '1px',
                fontWeight: activeCategory === 'all' ? 700 : 500,
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              All Works ({products.length})
            </button>
            {navCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  style={{
                    whiteSpace: 'nowrap',
                    padding: '9px 18px',
                    borderRadius: '2px',
                    border: isActive ? '1px solid #C9A84C' : '1px solid rgba(255,255,255,0.15)',
                    background: isActive ? '#C9A84C' : 'rgba(255,255,255,0.06)',
                    color: isActive ? '#1A1A1A' : 'rgba(255,255,255,0.85)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    letterSpacing: '1px',
                    fontWeight: isActive ? 700 : 500,
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Gallery Area */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px 96px' }}>
        {/* Top Controls Bar */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '36px',
          borderBottom: '1px solid #E8DFC8',
          paddingBottom: '24px',
        }}>
          {/* Search Input */}
          <div style={{ position: 'relative', width: '360px', maxWidth: '100%' }}>
            <input
              id="gallery-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, style, movement, or material..."
              style={{
                width: '100%',
                padding: '12px 16px 12px 42px',
                border: '1px solid #D4C4A0',
                background: '#ffffff',
                color: '#1A1A1A',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                boxSizing: 'border-box',
                outline: 'none',
              }}
            />
            <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8A7A6A', width: '17px', height: '17px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {/* Sort Dropdown */}
            <select
              id="gallery-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #D4C4A0',
                background: '#ffffff',
                color: '#1A1A1A',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <span style={{ color: '#8A7A6A', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500 }}>
              Showing {filtered.length} of {products.length} works
            </span>
          </div>
        </div>

        {/* 2-Column Layout: Sidebar + Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '40px',
        }} className="gallery-main-grid">
          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} className="gallery-sidebar">
            {/* Art Movement Filter */}
            <div>
              <h3 style={{
                fontSize: '11px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                color: '#1A1A1A',
                marginBottom: '16px',
              }}>
                Art Movement
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button
                  onClick={() => setCategory('all')}
                  style={{
                    textAlign: 'left',
                    padding: '9px 12px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    border: 'none',
                    cursor: 'pointer',
                    background: activeCategory === 'all' ? '#C9A84C' : 'transparent',
                    color: activeCategory === 'all' ? '#1A1A1A' : '#5C5046',
                    fontWeight: activeCategory === 'all' ? 700 : 400,
                    transition: 'all 0.2s',
                    borderRadius: '2px',
                  }}
                >
                  All Disciplines ({products.length})
                </button>
                {navCategories.map((cat) => {
                  const count = products.filter((p) => {
                    if (p.category === cat.id) return true;
                    if (cat.id === 'calligraphy') {
                      return (
                        p.category === 'allah-names' ||
                        p.category === 'quranic-verses' ||
                        p.category === 'arabic-calligraphy' ||
                        p.category === 'modern-islamic'
                      );
                    }
                    return false;
                  }).length;

                  const isSelected = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      style={{
                        textAlign: 'left',
                        padding: '9px 12px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        border: 'none',
                        cursor: 'pointer',
                        background: isSelected ? '#C9A84C' : 'transparent',
                        color: isSelected ? '#1A1A1A' : '#5C5046',
                        fontWeight: isSelected ? 700 : 400,
                        transition: 'all 0.2s',
                        borderRadius: '2px',
                      }}
                    >
                      {cat.label} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <h3 style={{
                fontSize: '11px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                color: '#1A1A1A',
                marginBottom: '16px',
              }}>
                Price Filter
              </h3>
              <div style={{ padding: '0 4px' }}>
                <input
                  id="gallery-price-slider"
                  type="range"
                  min="0"
                  max="700"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  style={{ width: '100%', accentColor: '#C9A84C' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontFamily: 'Inter, sans-serif', color: '#8A7A6A', marginTop: '8px' }}>
                  <span>$0</span>
                  <span style={{ color: '#C9A84C', fontWeight: 700 }}>Up to ${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div>
              <h3 style={{
                fontSize: '11px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                color: '#1A1A1A',
                marginBottom: '16px',
              }}>
                Availability
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: 'All Statuses', value: 'all' },
                  { label: 'In Stock Originals', value: 'In Stock' },
                  { label: 'Bespoke / Made to Order', value: 'Made to Order' },
                ].map((item) => (
                  <label
                    key={item.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      color: availabilityFilter === item.value ? '#1A1A1A' : '#6B5E52',
                      fontWeight: availabilityFilter === item.value ? 600 : 400,
                    }}
                  >
                    <input
                      type="radio"
                      name="availability"
                      checked={availabilityFilter === item.value}
                      onChange={() => setAvailabilityFilter(item.value)}
                      style={{ accentColor: '#C9A84C', width: '16px', height: '16px' }}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Bespoke Commission Banner */}
            <div style={{
              background: '#1A1A1A',
              padding: '24px 20px',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: '2px',
            }}>
              <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', fontWeight: 600, margin: '0 0 8px' }}>
                Bespoke Atelier
              </p>
              <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', color: '#ffffff', margin: '0 0 10px', lineHeight: 1.3 }}>
                Need a specific size or style?
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontFamily: 'Inter, sans-serif', margin: '0 0 16px', lineHeight: 1.6 }}>
                Amir accepts custom commissions for luxury residences, corporate offices, and private galleries.
              </p>
              <Link
                to="/contact"
                style={{
                  display: 'inline-block',
                  background: '#C9A84C',
                  color: '#1A1A1A',
                  fontSize: '11px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  padding: '10px 18px',
                  textDecoration: 'none',
                  borderRadius: '2px',
                }}
              >
                Inquire Commission →
              </Link>
            </div>
          </div>

          {/* Artworks Grid */}
          <div>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '96px 0', background: '#ffffff', border: '1px solid #E8DFC8' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎨</div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 700, color: '#1A1A1A', marginBottom: '8px' }}>
                  No Artworks Found
                </h3>
                <p style={{ color: '#8A7A6A', fontFamily: 'Inter, sans-serif', fontSize: '15px', marginBottom: '20px' }}>
                  No paintings matched your current filter criteria.
                </p>
                <button
                  onClick={() => {
                    setCategory('all');
                    setSearch('');
                    setPriceRange([0, 700]);
                    setAvailabilityFilter('all');
                  }}
                  style={{
                    padding: '12px 24px',
                    background: '#C9A84C',
                    color: '#1A1A1A',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '28px',
              }}>
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 860px) {
          .gallery-main-grid {
            grid-template-columns: 1fr !important;
          }
          .gallery-sidebar {
            border-bottom: 1px solid #E8DFC8;
            padding-bottom: 32px;
          }
        }
      `}</style>
    </div>
  );
}
