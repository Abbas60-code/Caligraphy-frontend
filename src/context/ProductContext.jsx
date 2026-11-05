import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { products as initialProducts } from '../data/products';

const API_BASE = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'http://localhost:9000/api';

const ProductContext = createContext(null);

const initialOrders = [
  {
    id: 1001,
    customer: 'Fatima Al-Hassan',
    email: 'fatima@example.com',
    date: '2026-07-10',
    total: 149,
    status: 'Delivered',
    items: [{ title: 'Allah – The Divine Name', quantity: 1, price: 149 }],
  },
  {
    id: 1002,
    customer: 'Ahmed Malik',
    email: 'ahmed@example.com',
    date: '2026-07-11',
    total: 189,
    status: 'Processing',
    items: [{ title: 'Bismillah – In the Name of God', quantity: 1, price: 189 }],
  },
  {
    id: 1003,
    customer: 'Yasmin Rahman',
    email: 'yasmin@example.com',
    date: '2026-07-12',
    total: 219,
    status: 'Shipped',
    items: [{ title: 'Ayatul Kursi – The Throne Verse', quantity: 1, price: 219 }],
  },
];



export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/paintings`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        // Normalize _id → id for consistency with frontend
        setProducts(data.data.map(p => ({ ...p, id: p._id || p.id })));
      } else {
        // Fallback to local catalog if DB is empty or unavailable
        setProducts(initialProducts);
      }
    } catch (err) {
      console.error('Failed to fetch paintings:', err);
      // Fallback to local catalog on network error
      setProducts(initialProducts);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('amir_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    localStorage.setItem('amir_orders', JSON.stringify(orders));
  }, [orders]);

  // Fetch messages from database on mount
  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/messages`);
      const data = await res.json();
      if (data.success) {
        setMessages(data.data.map((m) => ({
          id: m.id,
          name: m.name,
          email: m.email,
          subject: m.subject || '',
          message: m.message,
          date: m.created_at ? m.created_at.split('T')[0] : '',
        })));
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const addProduct = async (formData) => {
    try {
      const res = await fetch(`${API_BASE}/paintings`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        const p = data.data;
        setProducts(prev => [...prev, { ...p, id: p._id || p.id }]);
      } else {
        alert('Failed to add painting: ' + (data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Failed to add painting:', err);
      alert('Error adding painting.');
    }
  };

  const editProduct = async (id, formData) => {
    try {
      const res = await fetch(`${API_BASE}/paintings/${id}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        const p = data.data;
        setProducts(prev => prev.map(existing =>
          (existing._id === id || existing.id === id) ? { ...p, id: p._id || p.id } : existing
        ));
      } else {
        alert('Failed to update painting: ' + (data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Failed to update painting:', err);
      alert('Error updating painting.');
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/paintings/${id}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' },
      });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => prev.filter(p => p._id !== id && p.id !== id));
      } else {
        alert('Failed to delete painting.');
      }
    } catch (err) {
      console.error('Failed to delete painting:', err);
    }
  };

  const addOrder = (order) => {
    setOrders((prev) => {
      const nextId = prev.length > 0 ? Math.max(...prev.map((o) => o.id)) + 1 : 1004;
      return [
        {
          ...order,
          id: nextId,
          date: new Date().toISOString().split('T')[0],
          status: 'Pending',
        },
        ...prev,
      ];
    });
  };

  const updateOrderStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  const addMessage = async (msg) => {
    try {
      const res = await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(msg),
      });
      const data = await res.json();
      if (data.success) {
        const m = data.data;
        setMessages((prev) => [
          {
            id: m.id,
            name: m.name,
            email: m.email,
            subject: m.subject || '',
            message: m.message,
            date: m.created_at ? m.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
          },
          ...prev,
        ]);
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const deleteMessage = async (id) => {
    try {
      await fetch(`${API_BASE}/messages/${id}`, { method: 'DELETE' });
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        orders,
        messages,
        addProduct,
        editProduct,
        deleteProduct,
        addOrder,
        updateOrderStatus,
        addMessage,
        deleteMessage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used within ProductProvider');
  return ctx;
}
