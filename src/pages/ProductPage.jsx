import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { getOptimizedImageUrl } from '../utils/image';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, setIsCartOpen } = useCart();
  const { products } = useProducts();

  const product = products.find((p) => String(p.id) === String(id) || String(p._id) === String(id));
  const related = products.filter((p) => String(p.id) !== String(id) && p.category === product?.category).slice(0, 4);

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FDFAF3' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', color: '#1A1A1A', marginBottom: '16px' }}>
            Artwork Not Found
          </h2>
          <Link to="/gallery" style={{ color: '#C9A84C', fontFamily: 'Inter, sans-serif', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>
            ← Return to Gallery
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedToCart(true);
    setIsCartOpen(true); // Open cart immediately
    setTimeout(() => { setAddedToCart(false); }, 900);
  };

  const handleBuyNow = () => { addItem(product, quantity); navigate('/checkout'); };

  const whatsappMsg = encodeURIComponent(
    `Hello! I'm interested in the original artwork: "${product.title}" (${product.artMovement || 'Fine Art'})\nPrice: $${product.price}\nDimensions: ${product.dimensions || 'N/A'}`
  );

  return (
    <div style={{ background: '#FDFAF3', minHeight: '100vh', paddingTop: '80px' }}>

      {/* Breadcrumb */}
      <div className="product-padding-x product-breadcrumb" style={{ background: '#F5EFE0', borderBottom: '1px solid #E8DFC8', padding: '16px 40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8A7A6A' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
            onMouseLeave={e => e.currentTarget.style.color = '#8A7A6A'}>Home</Link>
          <span style={{ color: '#D4C4A0' }}>›</span>
          <Link to="/gallery" style={{ color: 'inherit', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
            onMouseLeave={e => e.currentTarget.style.color = '#8A7A6A'}>Gallery</Link>
          <span style={{ color: '#D4C4A0' }}>›</span>
          <span style={{ color: '#1A1A1A', fontWeight: 600 }}>{product.title}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="product-detail-container">
        <div className="product-detail-grid">

          {/* LEFT: Image Gallery */}
          <div className="product-gallery-sticky">
            {/* Main Image */}
            <div
              onClick={() => setZoomed(!zoomed)}
              style={{
                background: '#fff',
                border: '1px solid #E8DFC8',
                borderRadius: '2px',
                overflow: 'hidden',
                aspectRatio: '4/5',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: zoomed ? 'zoom-out' : 'zoom-in',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                marginBottom: '16px',
                position: 'relative',
              }}
            >
              {images.length > 0 ? (
                <img
                  src={getOptimizedImageUrl(images[activeImage], 1200)}
                  alt={product.title}
                  loading="eager"
                  decoding="async"
                  style={{
                    maxWidth: '100%', maxHeight: '100%',
                    objectFit: 'contain',
                    padding: '24px',
                    transform: zoomed ? 'scale(1.7)' : 'scale(1)',
                    transition: 'transform 0.6s ease',
                  }}
                />
              ) : (
                <div style={{ color: '#8A7A6A', fontFamily: 'Inter, sans-serif', fontSize: '13px', letterSpacing: '1px' }}>No image</div>
              )}
              {/* Zoom hint */}
              {!zoomed && images.length > 0 && (
                <div style={{
                  position: 'absolute', bottom: '16px', right: '16px',
                  background: 'rgba(26,26,26,0.7)', color: '#fff',
                  fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase',
                  padding: '6px 12px', borderRadius: '2px',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
                  </svg>
                  Click to enlarge
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '12px' }}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveImage(i); setZoomed(false); }}
                    style={{
                      width: '76px', height: '76px',
                      border: i === activeImage ? '2px solid #C9A84C' : '2px solid #E8DFC8',
                      background: '#fff',
                      padding: '4px',
                      cursor: 'pointer',
                      opacity: i === activeImage ? 1 : 0.6,
                      transition: 'all 0.2s',
                      flexShrink: 0,
                    }}
                    onMouseEnter={e => { if (i !== activeImage) e.currentTarget.style.opacity = '1'; }}
                    onMouseLeave={e => { if (i !== activeImage) e.currentTarget.style.opacity = '0.6'; }}
                  >
                    <img src={getOptimizedImageUrl(img, 200)} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Info */}
          <div>

            {/* Badges */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
              {product.artMovement && (
                <span style={{
                  background: '#1A1A1A', color: '#C9A84C',
                  border: '1px solid rgba(201,168,76,0.3)',
                  fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700,
                  letterSpacing: '2px', textTransform: 'uppercase',
                  padding: '6px 14px',
                }}>
                  {product.artMovement}
                </span>
              )}
              {product.originalPrice && (
                <span style={{
                  background: '#C9A84C', color: '#1A1A1A',
                  fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700,
                  letterSpacing: '2px', textTransform: 'uppercase',
                  padding: '5px 12px',
                }}>
                  Special Offer
                </span>
              )}
              <span style={{
                background: product.availability === 'In Stock' ? '#f0fdf4' : '#fffbeb',
                color: product.availability === 'In Stock' ? '#15803d' : '#92400e',
                border: `1px solid ${product.availability === 'In Stock' ? '#bbf7d0' : '#fde68a'}`,
                fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700,
                letterSpacing: '2px', textTransform: 'uppercase',
                padding: '5px 12px',
              }}>
                {product.availability || 'In Stock'}
              </span>
            </div>

            {/* Arabic Title */}
            {product.arabicTitle && (
              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '28px',
                fontStyle: 'italic',
                color: '#C9A84C',
                marginBottom: '12px',
                lineHeight: 1.3,
              }}>
                {product.arabicTitle}
              </p>
            )}

            {/* Main Title */}
            <h1 className="product-title-responsive" style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              color: '#1A1A1A',
              lineHeight: 1.15,
              marginBottom: '20px',
            }}>
              {product.title}
            </h1>

            {/* Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', gap: '3px' }}>
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="16" height="16" viewBox="0 0 20 20" fill={s <= (product.rating || 5) ? '#C9A84C' : '#E8DFC8'}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#8A7A6A', letterSpacing: '1px' }}>
                {product.rating || 5}.0 · {product.reviews || 0} Reviews
              </span>
            </div>

            {/* Price */}
            <div style={{ borderTop: '1px solid #E8DFC8', borderBottom: '1px solid #E8DFC8', padding: '28px 0', marginBottom: '32px', display: 'flex', alignItems: 'baseline', gap: '16px' }}>
              <span className="product-price-responsive" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, color: '#1A1A1A', lineHeight: 1 }}>
                ${product.price}
              </span>
              {product.originalPrice && (
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', color: '#B0A090', textDecoration: 'line-through' }}>
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              lineHeight: 1.8,
              color: '#5A5050',
              marginBottom: '36px',
            }}>
              {product.description}
            </p>

            {/* Specs Card */}
            <div className="product-specs-responsive" style={{
              background: '#F5EFE0',
              border: '1px solid #E8DFC8',
              borderLeft: '4px solid #C9A84C',
              padding: '24px 28px',
              marginBottom: '36px',
            }}>
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '8px' }}>
                  Art Movement
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', fontWeight: 600 }}>
                  {product.artMovement || 'Contemporary Fine Art'}
                </p>
              </div>
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '8px' }}>
                  Dimensions
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', fontWeight: 500 }}>
                  {product.dimensions || 'Standard Canvas'}
                </p>
              </div>
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '8px' }}>
                  Medium & Materials
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', fontWeight: 500 }}>
                  {product.materials || 'Archival Canvas & Mineral Pigments'}
                </p>
              </div>
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '8px' }}>
                  Provenance
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', fontWeight: 500 }}>
                  Original signed with wax seal & certificate
                </p>
              </div>
            </div>

            {/* Quantity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#8A7A6A' }}>
                Quantity
              </span>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #D4C4A0', background: '#fff', height: '48px', width: '130px' }}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{ flex: 1, height: '100%', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#8A7A6A', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F5EFE0'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >−</button>
                <span style={{ width: '40px', textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 600, color: '#1A1A1A' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  style={{ flex: 1, height: '100%', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#8A7A6A', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F5EFE0'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >+</button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="product-actions-responsive" style={{ marginBottom: '16px' }}>
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1, height: '56px',
                  background: addedToCart ? '#C9A84C' : '#1A1A1A',
                  color: addedToCart ? '#1A1A1A' : '#fff',
                  border: 'none', cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif', fontWeight: 700,
                  fontSize: '12px', letterSpacing: '2.5px', textTransform: 'uppercase',
                  transition: 'all 0.3s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}
                onMouseEnter={e => { if (!addedToCart) { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#1A1A1A'; } }}
                onMouseLeave={e => { if (!addedToCart) { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.color = '#fff'; } }}
              >
                {addedToCart ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Added!
                  </>
                ) : 'Add to Cart'}
              </button>
              <button
                onClick={handleBuyNow}
                style={{
                  flex: 1, height: '56px',
                  background: '#fff',
                  color: '#1A1A1A',
                  border: '2px solid #D4C4A0', cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif', fontWeight: 700,
                  fontSize: '12px', letterSpacing: '2.5px', textTransform: 'uppercase',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.color = '#C9A84C'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#D4C4A0'; e.currentTarget.style.color = '#1A1A1A'; }}
              >
                Buy Now
              </button>
            </div>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/923002161412?text=${whatsappMsg}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                width: '100%', height: '52px',
                background: '#fff',
                border: '2px solid #25D366',
                color: '#25D366',
                fontFamily: 'Inter, sans-serif', fontWeight: 700,
                fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.25s',
                marginBottom: '40px',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#25D366'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#25D366'; }}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Inquire on WhatsApp
            </a>

            {/* Trust Badges */}
            <div className="product-trust-responsive" style={{ borderTop: '1px solid #E8DFC8', paddingTop: '32px' }}>
              {[
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                  title: '100% Authentic', sub: 'Certificate Included'
                },
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                  title: 'Secure Transit', sub: 'Fully Insured'
                },
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.2"><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                  title: 'Global Delivery', sub: 'To Your Doorstep'
                },
              ].map((b) => (
                <div key={b.title} style={{ textAlign: 'center' }}>
                  <div style={{ marginBottom: '10px' }}>{b.icon}</div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#1A1A1A', marginBottom: '4px' }}>
                    {b.title}
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#8A7A6A' }}>
                    {b.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ marginTop: '100px', borderTop: '1px solid #E8DFC8', paddingTop: '80px' }}>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '5px', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '16px' }}>
                Curated For You
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '40px', fontWeight: 700, color: '#1A1A1A' }}>
                More Masterpieces
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '32px' }}>
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
