import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getOptimizedImageUrl } from '../utils/image';

function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="14"
          height="14"
          fill={star <= rating ? '#C9A84C' : '#D4C4A0'}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product, index = 0 }) {
  const [hovered, setHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAddedToCart(true);
    setIsCartOpen(true); // Open cart immediately
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="card-hover group cursor-pointer"
      style={{
        background: '#ffffff',
        opacity: 0,
        animation: `fadeInUp 0.6s ease ${index * 0.1}s forwards`,
        borderRadius: '2px',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${product.id}`} style={{ display: 'block', textDecoration: 'none' }}>
        {/* Image Container */}
        <div
          className="img-zoom"
          style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', background: '#F5EFE0' }}
        >
          <img
            src={getOptimizedImageUrl(product.image, 600)}
            alt={product.title}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />

          {/* Hover overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.45)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            <button
              onClick={handleQuickView}
              style={{
                padding: '10px 20px',
                background: '#ffffff',
                color: '#1A1A1A',
                fontSize: '11px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                width: '150px',
              }}
            >
              Quick View
            </button>
            <button
              onClick={handleAddToCart}
              style={{
                padding: '10px 20px',
                background: addedToCart ? '#22c55e' : '#C9A84C',
                color: '#1A1A1A',
                fontSize: '11px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                width: '150px',
                transition: 'background 0.3s',
              }}
            >
              {addedToCart ? '✓ Added' : 'Add to Cart'}
            </button>
          </div>

          {/* Badges */}
          <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {product.artMovement && (
              <span style={{
                background: '#1A1A1A',
                color: '#C9A84C',
                border: '1px solid rgba(201,168,76,0.3)',
                fontSize: '9px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                padding: '4px 8px',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                backdropFilter: 'blur(4px)',
              }}>
                {product.artMovement}
              </span>
            )}
            {product.originalPrice && (
              <span style={{
                background: '#ef4444',
                color: '#fff',
                fontSize: '10px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                padding: '3px 8px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                alignSelf: 'flex-start',
              }}>
                Sale
              </span>
            )}
            {product.availability === 'Made to Order' && (
              <span style={{
                background: '#C9A84C',
                color: '#1A1A1A',
                fontSize: '10px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                padding: '3px 8px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                alignSelf: 'flex-start',
              }}>
                Custom
              </span>
            )}
          </div>

          {/* Bottom badge / Arabic watermark if present */}
          {product.arabicTitle ? (
            <div style={{ position: 'absolute', bottom: '8px', right: '10px' }}>
              <p style={{
                color: 'rgba(255,255,255,0.85)',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '18px',
                textAlign: 'right',
                textShadow: '0 2px 6px rgba(0,0,0,0.7)',
                lineHeight: 1.2,
                margin: 0,
              }}>
                {product.arabicTitle}
              </p>
            </div>
          ) : (
            <div style={{ position: 'absolute', bottom: '8px', right: '10px' }}>
              <span style={{
                fontSize: '9px',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)',
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
              }}>
                Original Canvas
              </span>
            </div>
          )}
        </div>

        {/* Card Info */}
        <div style={{ padding: '16px 18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{
              color: '#C9A84C',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
            }}>
              {product.artMovement || 'Fine Art'}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <StarRating rating={product.rating || 5} />
              <span style={{ color: '#8A7A6A', fontSize: '11px', fontFamily: 'Inter, sans-serif' }}>
                ({product.reviews || 0})
              </span>
            </div>
          </div>

          <h3 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '17px',
            fontWeight: 600,
            color: hovered ? '#C9A84C' : '#1A1A1A',
            lineHeight: 1.3,
            marginBottom: '8px',
            transition: 'color 0.3s',
          }}>
            {product.title}
          </h3>

          <p style={{
            color: '#8A7A6A',
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif',
            lineHeight: 1.6,
            marginBottom: '12px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {product.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '18px', color: '#1A1A1A' }}>
                ${product.price}
              </span>
              {product.originalPrice && (
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#8A7A6A', textDecoration: 'line-through' }}>
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <span style={{
              fontSize: '11px',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              padding: '3px 8px',
              background: product.availability === 'In Stock' ? '#f0fdf4' : '#fffbeb',
              color: product.availability === 'In Stock' ? '#15803d' : '#b45309',
            }}>
              {product.availability}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
