import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, subtotal, discount, shipping, total, coupon, applyCoupon, removeCoupon, removeItem, updateQuantity, clearCart } = useCart();

  const handleCoupon = () => {
    const code = document.getElementById('coupon-input')?.value?.trim().toUpperCase();
    if (code === 'BLESSED10') applyCoupon(code);
    else alert('Invalid coupon. Try: BLESSED10');
  };

  return (
    <div className="bg-[#FDFAF3] min-h-screen page-enter pt-24 pb-20">
      
      {/* Header */}
      <div className="cart-page-header bg-[#1A1A1A] py-20 px-6 relative overflow-hidden text-center mb-16 border-b-4 border-[#C9A84C]">
        <div className="absolute inset-0 opacity-5 bg-[url('/path/to/pattern.png')] bg-repeat"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 text-white/40 font-sans text-xs uppercase tracking-[3px] mb-8">
            <Link to="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#C9A84C]">Cart</span>
          </div>
          <p className="text-[#C9A84C] text-[10px] tracking-[6px] uppercase font-bold mb-4">
            Your Selection
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-white">
            Shopping Cart
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {items.length === 0 ? (
          /* ── Empty Cart ── */
          <div className="text-center py-20 animate-fadeInUp">
            <div className="w-32 h-32 rounded-full bg-[#F5EFE0] flex items-center justify-center mx-auto mb-10 shadow-inner">
              <svg className="w-12 h-12 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-4">
              Your cart is empty
            </h2>
            <p className="text-[#8A7A6A] font-sans text-sm max-w-md mx-auto leading-relaxed mb-10">
              Discover our handmade Islamic calligraphy masterpieces and add elegance to your space.
            </p>
            <Link
              to="/gallery"
              className="inline-block bg-[#1A1A1A] text-white hover:bg-[#C9A84C] hover:text-[#1A1A1A] font-sans font-bold text-xs tracking-[3px] uppercase py-4 px-10 transition-colors duration-300 shadow-md"
            >
              Browse Gallery
            </Link>
          </div>
        ) : (
          /* ── Cart with Items ── */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Items Column (Left) */}
            <div className="lg:col-span-8">
              
              {/* Items header */}
              <div className="flex justify-between items-center pb-6 border-b border-[#E8DFC8] mb-8">
                <h2 className="font-serif text-2xl text-[#1A1A1A]">
                  {items.length} {items.length === 1 ? 'Artwork' : 'Artworks'}
                </h2>
                <button
                  onClick={clearCart}
                  className="text-[#8A7A6A] hover:text-red-500 font-sans text-xs tracking-[1px] uppercase transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear All
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex flex-col gap-8">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-8 pb-8 border-b border-[#E8DFC8]/50 last:border-0"
                  >
                    {/* Image */}
                    <Link to={`/product/${item.id}`} className="shrink-0 group">
                      <div className="w-32 h-40 bg-white border border-[#E8DFC8] p-2 shadow-sm flex items-center justify-center overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="min-w-0">
                        <div className="flex justify-between items-start gap-6">
                          <Link to={`/product/${item.id}`} className="hover:opacity-80 transition-opacity min-w-0">
                            <h3 className="font-serif text-xl text-[#1A1A1A] leading-tight mb-2 truncate">
                              {item.title}
                            </h3>
                          </Link>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#8A7A6A] hover:text-red-500 p-2 -mr-2 transition-colors flex-shrink-0"
                            title="Remove"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-[#8A7A6A] font-sans text-xs uppercase tracking-[1px]">
                          {item.dimensions || 'Standard Size'} • {item.availability || 'In Stock'}
                        </p>
                      </div>

                      {/* Bottom row: Qty + Price */}
                      <div className="flex items-end justify-between mt-6">
                        <div className="flex items-center border border-[#D4C4A0] bg-white h-12 w-32 shadow-sm">
                          <button 
                            className="flex-1 h-full text-[#8A7A6A] hover:text-[#1A1A1A] hover:bg-[#F5EFE0] transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >−</button>
                          <span className="w-10 text-center font-sans text-sm font-medium text-[#1A1A1A]">
                            {item.quantity}
                          </span>
                          <button 
                            className="flex-1 h-full text-[#8A7A6A] hover:text-[#1A1A1A] hover:bg-[#F5EFE0] transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >+</button>
                        </div>
                        <div className="text-right">
                          <p className="font-serif text-3xl text-[#1A1A1A]">
                            ${(item.price * item.quantity).toFixed(0)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-[#8A7A6A] text-xs font-sans mt-1">
                              ${item.price} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="mt-12 p-8 bg-white border border-[#E8DFC8] shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-5 h-5 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                  <h3 className="font-sans text-sm font-bold text-[#1A1A1A] uppercase tracking-[2px]">
                    Have a promo code?
                  </h3>
                </div>
                
                {coupon ? (
                  <div className="flex items-center justify-between p-5 bg-green-50 border border-green-200">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-sans font-bold text-green-700 tracking-[1px]">{coupon}</span>
                      <span className="font-sans text-sm text-green-600 hidden sm:inline">— 10% off applied</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-sm font-sans text-red-500 hover:text-red-700 uppercase tracking-[1px] font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      id="coupon-input"
                      type="text"
                      placeholder="Enter code (try BLESSED10)"
                      className="flex-1 border border-[#D4C4A0] px-5 py-4 font-sans text-sm bg-[#FDFAF3] focus:outline-none focus:border-[#C9A84C] transition-colors"
                    />
                    <button
                      onClick={handleCoupon}
                      className="bg-[#1A1A1A] hover:bg-[#C9A84C] text-white hover:text-[#1A1A1A] px-10 py-4 font-sans font-bold text-xs tracking-[2px] uppercase transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Continue Shopping */}
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 mt-10 text-[#8A7A6A] hover:text-[#C9A84C] font-sans text-sm uppercase tracking-[1px] transition-colors group"
              >
                <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary Sidebar (Right) */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-[#E8DFC8] p-8 shadow-md sticky top-28">
                <h2 className="font-serif text-2xl text-[#1A1A1A] mb-8 pb-4 border-b border-[#E8DFC8]">
                  Order Summary
                </h2>

                {/* Price Breakdown */}
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex justify-between font-sans text-sm text-[#8A7A6A]">
                    <span>Subtotal</span>
                    <span className="text-[#1A1A1A] font-medium">${subtotal.toFixed(0)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between font-sans text-sm text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">−${discount.toFixed(0)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-sans text-sm text-[#8A7A6A]">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-medium tracking-wide uppercase text-xs">Complimentary</span>
                      ) : (
                        <span className="text-[#1A1A1A] font-medium">${shipping}</span>
                      )}
                    </span>
                  </div>
                  
                  {shipping > 0 && (
                    <div className="mt-2 bg-[#F5EFE0] p-4 border border-[#E8DFC8]/50 flex gap-3 items-start">
                      <span className="text-lg">💡</span>
                      <p className="font-sans text-[11px] text-[#8A7A6A] leading-relaxed uppercase tracking-[1px]">
                        Add <span className="font-bold text-[#1A1A1A]">${200 - subtotal > 0 ? (200 - subtotal).toFixed(0) : 0}</span> more for complimentary shipping.
                      </p>
                    </div>
                  )}
                </div>

                <div className="h-px bg-[#E8DFC8] w-full my-6 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-px bg-[#C9A84C]"></div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-end mb-10">
                  <span className="font-sans text-sm font-bold uppercase tracking-[2px] text-[#1A1A1A]">Total</span>
                  <span className="font-serif text-4xl text-[#C9A84C] leading-none">${total.toFixed(0)}</span>
                </div>

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  className="w-full relative overflow-hidden group bg-[#1A1A1A] text-white py-5 flex items-center justify-center shadow-md transition-all duration-300 hover:shadow-lg mb-6"
                >
                  <div className="absolute inset-0 bg-[#C9A84C] transform origin-left transition-transform duration-500 ease-out scale-x-0 group-hover:scale-x-100"></div>
                  <span className="relative font-sans text-xs font-bold tracking-[3px] uppercase transition-colors duration-300 group-hover:text-[#1A1A1A] flex items-center gap-3">
                    Proceed to Checkout
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Link>

                {/* Security note */}
                <div className="flex items-center justify-center gap-2 mb-8 text-[#8A7A6A]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="font-sans text-[10px] tracking-[1px] uppercase">
                    Secure checkout • 256-bit SSL encrypted
                  </span>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-2 pt-6 border-t border-[#E8DFC8]">
                  <div className="flex flex-col items-center text-center">
                    <svg className="w-6 h-6 text-[#C9A84C] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <p className="font-sans text-[9px] text-[#8A7A6A] font-bold uppercase tracking-[1px]">30-Day Return</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <svg className="w-6 h-6 text-[#C9A84C] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <p className="font-sans text-[9px] text-[#8A7A6A] font-bold uppercase tracking-[1px]">Secure Pack</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <svg className="w-6 h-6 text-[#C9A84C] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="font-sans text-[9px] text-[#8A7A6A] font-bold uppercase tracking-[1px]">Global Ship</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
