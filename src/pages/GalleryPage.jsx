import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { categories } from '../data/products';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const sortOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export default function GalleryPage() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('latest');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeCategory = searchParams.get('category') || 'all';

  const setCategory = (cat) => {
    if (cat === 'all') searchParams.delete('category');
    else searchParams.set('category', cat);
    setSearchParams(searchParams);
  };

  const filtered = useMemo(() => {
    let result = [...products];
    if (activeCategory !== 'all') result = result.filter((p) => p.category === activeCategory);
    if (search) result = result.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sort) {
      case 'popular': result.sort((a, b) => b.reviews - a.reviews); break;
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      default: result.sort((a, b) => b.id - a.id);
    }
    return result;
  }, [activeCategory, search, sort, priceRange]);

  return (
    <div style={{ background: '#FDFAF3', minHeight: '100vh' }} className="page-enter">
      {/* Page Header */}
      <div style={{
        background: '#1A1A1A',
        padding: '120px 24px 64px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="arabic-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.1 }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          {/* Breadcrumb */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255, 255, 255, 0.4)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '24px',
          }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:text-[#C9A84C]">Home</Link>
            <span>/</span>
            <span style={{ color: '#C9A84C' }}>Gallery</span>
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '16px',
          }}>
            The Gallery
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            lineHeight: 1.7,
            maxWidth: '600px',
          }}>
            Explore our complete collection of handmade Islamic calligraphy paintings, each a unique expression of faith and artistry.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Top Controls */}
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
          {/* Search */}
          <div style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
            <input
              id="gallery-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search paintings..."
              style={{
                width: '100%',
                padding: '12px 16px 12px 40px',
                border: '1px solid #D4C4A0',
                background: '#ffffff',
                color: '#1A1A1A',
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                boxSizing: 'border-box',
              }}
            />
            <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#8A7A6A', width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {/* Sort */}
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
                fontSize: '15px',
                cursor: 'pointer',
              }}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            {/* Filter toggle (mobile) */}
            <button
              id="gallery-filter-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                display: 'none', // Managed by responsive CSS below or handled simply
                padding: '12px 16px',
                border: '1px solid #D4C4A0',
                background: '#ffffff',
                color: '#1A1A1A',
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
              className="md:hidden gallery-filter-btn-mobile"
            >
              Filters
            </button>

            <span style={{ color: '#8A7A6A', fontFamily: 'Inter, sans-serif', fontSize: '15px' }}>
              {filtered.length} works
            </span>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '40px',
        }} className="gallery-main-grid">
          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} className="gallery-sidebar">
            {/* Categories */}
            <div>
              <h3 style={{
                fontSize: '11px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                color: '#1A1A1A',
                marginBottom: '16px',
              }}>
                Category
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button
                  onClick={() => setCategory('all')}
                  style={{
                    textAlign: 'left',
                    padding: '8px 12px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    border: 'none',
                    cursor: 'pointer',
                    background: activeCategory === 'all' ? '#C9A84C' : 'transparent',
                    color: activeCategory === 'all' ? '#1A1A1A' : '#8A7A6A',
                    fontWeight: activeCategory === 'all' ? 600 : 400,
                    transition: 'all 0.2s',
                  }}
                >
                  All Collections ({products.length})
                </button>
                {categories.map((cat) => {
                  const count = products.filter((p) => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      style={{
                        textAlign: 'left',
                        padding: '8px 12px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        border: 'none',
                        cursor: 'pointer',
                        background: activeCategory === cat.id ? '#C9A84C' : 'transparent',
                        color: activeCategory === cat.id ? '#1A1A1A' : '#8A7A6A',
                        fontWeight: activeCategory === cat.id ? 600 : 400,
                        transition: 'all 0.2s',
                      }}
                    >
                      {cat.label} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 style={{
                fontSize: '11px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                color: '#1A1A1A',
                marginBottom: '16px',
              }}>
                Price Range
              </h3>
              <div style={{ padding: '0 4px' }}>
                <input
                  id="gallery-price-slider"
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  style={{ width: '100%', accentColor: '#C9A84C' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'Inter, sans-serif', color: '#8A7A6A', marginTop: '8px' }}>
                  <span>$0</span>
                  <span style={{ color: '#C9A84C', fontWeight: 600 }}>Up to ${priceRange[1]}</span>
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
                fontWeight: 600,
                color: '#1A1A1A',
                marginBottom: '16px',
              }}>
                Availability
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['In Stock', 'Made to Order'].map((status) => (
                  <label key={status} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#8A7A6A' }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: '#C9A84C', width: '16px', height: '16px' }} />
                    <span>{status}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '96px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 700, color: '#1A1A1A', marginBottom: '8px' }}>No results found</h3>
                <p style={{ color: '#8A7A6A', fontFamily: 'Inter, sans-serif', fontSize: '15px' }}>Try adjusting your filters or search term</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '24px',
              }}>
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Inline media query CSS hack */}
      <style>{`
        @media (max-width: 768px) {
          .gallery-main-grid {
            grid-template-columns: 1fr !important;
          }
          .gallery-sidebar {
            margin-bottom: 24px;
          }
        }
      `}</style>
    </div>
  );
}
