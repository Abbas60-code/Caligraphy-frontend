import { createContext, useContext, useReducer, useState } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + (action.payload.quantity || 1) }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ).filter(i => i.quantity > 0),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'APPLY_COUPON':
      return { ...state, coupon: action.payload };
    case 'REMOVE_COUPON':
      return { ...state, coupon: null };
    default:
      return state;
  }
};

const initialState = {
  items: [],
  coupon: null,
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = state.coupon === 'BLESSED10' ? subtotal * 0.1 : 0;
  const shipping = subtotal > 200 ? 0 : 25;
  const total = subtotal - discount + shipping;
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const addItem = (product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity } });
  };

  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  
  const applyCoupon = (code) => dispatch({ type: 'APPLY_COUPON', payload: code });
  
  const removeCoupon = () => dispatch({ type: 'REMOVE_COUPON' });

  return (
    <CartContext.Provider value={{
      items: state.items,
      coupon: state.coupon,
      subtotal,
      discount,
      shipping,
      total,
      itemCount,
      isCartOpen,
      setIsCartOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      applyCoupon,
      removeCoupon,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
