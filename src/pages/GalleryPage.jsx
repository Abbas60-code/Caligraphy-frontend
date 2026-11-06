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
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const activeCategory = searchParams.get('category') || 'all';

  const activeFiltersCount =
    (activeCategory !== 'all' ? 1 : 0) +
    (priceRange[1] < 5000 ? 1 : 0) +
    (availabilityFilter !== 'all' ? 1 : 0);

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
        if (activeCategory === 'calligraphy') {
          return (
            p.category === 'allah-names' ||
            p.category === 'quranic-verses' ||
            p.category === 'arabic-calligraphy' ||
            p.category === 'modern-islamic' ||
            p.category === 'calligraphy'
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
        const tagMatch = Array.isArray(p.tags) && p.tags.some((t) => t.toLowerCase().includes(q));
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
        // latest first
        result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return result;
  }, [products, activeCategory, search, sort, priceRange, availabilityFilter]);

  const navCategories = categories.filter((c) => c.id !== 'all');

  return (
    <div style={{ background: '#FDFAF3', minHeight: '100vh' }} className="page-enter">
      {/* Page Header */}
      <div className="gallery-page-header" style={{
        background: '#161413',
        padding: '110px 24px 50px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="arabic-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.08 }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          {/* Breadcrumb */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            color: 'rgba(255, 255, 255, 0.45)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '16px',
          }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span style={{ color: '#C9A84C' }}>Fine Art Collections</span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(28px, 4.5vw, 52px)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '14px',
            lineHeight: 1.15,
          }}>
            The Fine Art Gallery
          </h1>

          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',
            lineHeight: 1.65,
            maxWidth: '680px',
            margin: 0,
          }}>
            Curated original canvases spanning Sacred Islamic Calligraphy, Abstract Expressionism, and Modernist Cubism.
          </p>

          {/* Quick Filter Horizontal Scroll Bar */}
          <div
            className="category-pills-scroll"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              overflowX: 'auto',
              paddingTop: '28px',
              paddingBottom: '8px',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
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
                flexShrink: 0,
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
                    flexShrink: 0,
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
      <div className="gallery-main-padding" style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px 96px' }}>
        {/* Top Controls Bar */}
        <div className="gallery-controls-bar" style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px',
          borderBottom: '1px solid #E8DFC8',
          paddingBottom: '20px',
        }}>
          {/* Search Input */}
          <div className="gallery-search-wrap" style={{ position: 'relative', width: '360px', maxWidth: '100%' }}>
            <input
              id="gallery-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, style, or material..."
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

          <div className="gallery-sort-wrap" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {/* Sort Dropdown */}
            <select
              id="gallery-sort"
              className="gallery-sort-select"
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

            <span style={{ color: '#8A7A6A', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500 }}>
              Showing {filtered.length} of {products.length} works
            </span>
          </div>
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="mobile-filter-toggle-container">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '13px 18px',
              background: showMobileFilters ? 'rgba(201,168,76,0.1)' : '#ffffff',
              border: showMobileFilters ? '1px solid #C9A84C' : '1px solid #D4C4A0',
              color: '#1A1A1A',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              marginBottom: '20px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {showMobileFilters ? 'Hide Filters' : 'Filter by Movement & Price'}
              {activeFiltersCount > 0 && (
                <span style={{ background: '#C9A84C', color: '#1A1A1A', padding: '2px 7px', borderRadius: '10px', fontSize: '11px', fontWeight: 700 }}>
                  {activeFiltersCount}
                </span>
              )}
            </span>
            <span style={{ color: '#8A7A6A', fontSize: '12px' }}>
              {showMobileFilters ? '▲ Close' : '▼ Refine'}
            </span>
          </button>
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
                        p.category === 'modern-islamic' ||
                        p.category === 'calligraphy'
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
                  max="5000"
                  step="100"
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
                  {products.length === 0 ? 'No Artworks in Gallery Yet' : 'No Artworks Match Your Filters'}
                </h3>
                <p style={{ color: '#8A7A6A', fontFamily: 'Inter, sans-serif', fontSize: '15px', marginBottom: '20px' }}>
                  {products.length === 0
                    ? 'Artworks added from the Admin Dashboard will appear here immediately.'
                    : 'Try adjusting your search or filters to see available pieces.'}
                </p>
                {products.length > 0 && (
                  <button
                    onClick={() => {
                      setCategory('all');
                      setSearch('');
                      setPriceRange([0, 5000]);
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
                )}
              </div>
            ) : (
              <div
                className="gallery-artworks-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '28px',
                }}
              >
                {filtered.map((product, i) => (
                  <ProductCard key={product.id || product._id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Commission CTA */}
      <div className="gallery-cta-section" style={{
        background: '#1A1A1A',
        padding: '80px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="arabic-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.08 }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{
            color: '#C9A84C',
            fontSize: '11px',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            marginBottom: '16px',
          }}>
            Bespoke Atelier
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '20px',
            lineHeight: 1.2,
          }}>
            Commission Your Original Artwork
          </h2>
          <div style={{
            width: '60px', height: '2px',
            background: 'linear-gradient(to right, #C9A84C, #E8C97A)',
            margin: '0 auto 24px',
          }} />
          <p style={{
            color: 'rgba(255,255,255,0.72)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            lineHeight: 1.75,
            marginBottom: '36px',
          }}>
            Every artwork can be commissioned to your preferred dimensions, colour palette,
            and spiritual or aesthetic vision. Contact Amir directly to begin.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-block',
                padding: '16px 44px',
                background: '#C9A84C',
                color: '#1A1A1A',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(201,168,76,0.25)',
              }}
            >
              Commission Artwork →
            </Link>
            <a
              href="https://wa.me/923002161412"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 36px',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#ffffff',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '13px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#25D366')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <style>{`
        /* Quick Category Pill Scroll */
        .category-pills-scroll::-webkit-scrollbar {
          display: none;
        }

        /* Tablet & Mobile Layout Breakpoints */
        @media (max-width: 860px) {
          .gallery-main-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .mobile-filter-toggle-container {
            display: block !important;
          }
          .gallery-sidebar {
            display: ${showMobileFilters ? 'flex' : 'none'} !important;
            background: #ffffff;
            padding: 24px 20px;
            border: 1px solid #E8DFC8;
            border-radius: 2px;
            margin-bottom: 24px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          }
          .gallery-controls-bar {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 14px !important;
            margin-bottom: 20px !important;
          }
          .gallery-search-wrap {
            width: 100% !important;
          }
          .gallery-sort-wrap {
            width: 100% !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
          }
          .gallery-sort-select {
            flex: 1 !important;
            max-width: 60% !important;
          }
        }

        @media (min-width: 861px) {
          .mobile-filter-toggle-container {
            display: none !important;
          }
          .gallery-sidebar {
            display: flex !important;
          }
        }

        @media (max-width: 640px) {
          .gallery-page-header {
            padding: 96px 16px 28px !important;
          }
          .gallery-main-padding {
            padding: 24px 16px 64px !important;
          }
          .gallery-artworks-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)) !important;
            gap: 18px !important;
          }
          .gallery-cta-section {
            padding: 56px 16px !important;
          }
        }

        @media (max-width: 480px) {
          .gallery-artworks-grid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }
          .gallery-sort-wrap {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 8px !important;
          }
          .gallery-sort-select {
            max-width: 100% !important;
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
