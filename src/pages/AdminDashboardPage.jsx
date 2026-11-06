import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { getOptimizedImageUrl } from '../utils/image';

export default function AdminDashboardPage({ onLogout }) {
  const {
    products,
    orders,
    messages,
    addProduct,
    editProduct,
    deleteProduct,
    updateOrderStatus,
    deleteMessage,
  } = useProducts();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'catalog' | 'orders' | 'messages'
  const [editingProduct, setEditingProduct] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Form State
  const [form, setForm] = useState({
    title: '',
    arabicTitle: '',
    price: '',
    originalPrice: '',
    category: 'abstract',
    image: '',
    imageFiles: [],
    existingImages: [],
    description: '',
    dimensions: '',
    materials: '',
    availability: 'In Stock',
    featured: false,
    popular: false,
    tags: '',
  });

  const categories = [
    { id: 'abstract', label: 'Abstract Expressionism' },
    { id: 'cubism', label: 'Cubism & Geometry' },
    { id: 'miniature', label: 'Miniature Painting' },
    { id: 'calligraphy', label: 'Islamic Calligraphy' },
    { id: 'modern-fusion', label: 'Contemporary Fusion' },
    { id: 'custom', label: 'Bespoke Commissions' },
    // Legacy support
    { id: 'allah-names', label: "Allah's Names (Legacy)" },
    { id: 'quranic-verses', label: 'Quranic Verses (Legacy)' },
    { id: 'arabic-calligraphy', label: 'Arabic Calligraphy (Legacy)' },
    { id: 'modern-islamic', label: 'Modern Islamic (Legacy)' },
  ];

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setForm({
      title: '',
      arabicTitle: '',
      price: '',
      originalPrice: '',
      category: 'abstract',
      image: '', 
      imageFiles: [],
      existingImages: [],
      description: '',
      dimensions: '50 × 70 cm',
      materials: 'Archival canvas, gold leaf, handmade inks',
      availability: 'In Stock',
      featured: false,
      popular: false,
      tags: '',
    });
    setShowFormModal(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    const existing = product.images && product.images.length > 0
      ? product.images
      : (product.image ? [product.image] : []);

    setForm({
      title: product.title,
      arabicTitle: product.arabicTitle || '',
      price: product.price,
      originalPrice: product.originalPrice || '',
      category: product.category,
      image: product.image,
      imageFiles: [],
      existingImages: existing,
      description: product.description || '',
      dimensions: product.dimensions || '',
      materials: product.materials || '',
      availability: product.availability || 'In Stock',
      featured: product.featured || false,
      popular: product.popular || false,
      tags: product.tags && Array.isArray(product.tags) ? product.tags.join(', ') : '',
    });
    setShowFormModal(true);
  };

  const handleFilesChange = (e) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length > 0) {
      setForm((prev) => ({
        ...prev,
        imageFiles: [...prev.imageFiles, ...selected],
      }));
    }
  };

  const handleRemoveNewFile = (idx) => {
    setForm((prev) => ({
      ...prev,
      imageFiles: prev.imageFiles.filter((_, i) => i !== idx),
    }));
  };

  const handleRemoveExistingImage = (idx) => {
    setForm((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, i) => i !== idx),
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    if (form.arabicTitle) formData.append('arabicTitle', form.arabicTitle);
    formData.append('price', form.price);
    if (form.originalPrice) formData.append('originalPrice', form.originalPrice);
    formData.append('category', form.category);
    if (form.description) formData.append('description', form.description);
    if (form.dimensions) formData.append('dimensions', form.dimensions);
    if (form.materials) formData.append('materials', form.materials);
    formData.append('availability', form.availability);
    formData.append('featured', form.featured ? 1 : 0);
    formData.append('popular', form.popular ? 1 : 0);
    
    if (form.tags) {
        const tagsArr = form.tags.split(',').map(t => t.trim());
        tagsArr.forEach(t => formData.append('tags[]', t));
    }
    
    // Multiple image files
    if (form.imageFiles && form.imageFiles.length > 0) {
      form.imageFiles.forEach((file) => {
        formData.append('images', file);
      });
      // Primary cover file for legacy compatibility
      formData.append('image', form.imageFiles[0]);
    }

    // Remaining existing images kept by user
    if (form.existingImages && form.existingImages.length > 0) {
      form.existingImages.forEach((imgUrl) => {
        formData.append('existingImages[]', imgUrl);
      });
    }

    if (editingProduct) {
      editProduct(editingProduct._id || editingProduct.id, formData);
    } else {
      addProduct(formData);
    }
    setShowFormModal(false);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this painting from catalog?')) {
      deleteProduct(id);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    updateOrderStatus(id, newStatus);
  };

  const handleDeleteMessage = (id) => {
    if (window.confirm('Delete this message?')) {
      deleteMessage(id);
    }
  };

  // Stats Calculations
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const averageOrderVal = orders.length > 0 ? (totalSales / orders.length).toFixed(0) : 0;

  return (
    <div style={{ background: '#121212', minHeight: '100vh', color: '#ffffff', fontFamily: 'Inter, sans-serif' }}>
      {/* Mobile Top Header Bar */}
      <div className="admin-mobile-header" style={{
        display: 'none',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        background: '#1A1A1A',
        borderBottom: '1px solid rgba(201, 168, 76, 0.15)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'none',
              border: '1px solid rgba(201, 168, 76, 0.3)',
              color: '#C9A84C',
              fontSize: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 700, color: '#fff' }}>
            Admin Panel
          </span>
        </div>
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to logout?')) {
              localStorage.removeItem('amir_admin_auth');
              onLogout();
            }
          }}
          style={{
            padding: '6px 12px',
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#f87171',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ color: '#C9A84C', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px' }}>Navigation</h3>
            <button onClick={() => setIsMobileMenuOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}>✕</button>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: '📊' },
              { id: 'catalog', label: 'Manage Catalog', icon: '🎨' },
              { id: 'orders', label: 'Order Requests', icon: '📦' },
              { id: 'messages', label: 'Inbox Messages', icon: '✉' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  background: activeTab === tab.id ? 'rgba(201, 168, 76, 0.2)' : '#1A1A1A',
                  color: activeTab === tab.id ? '#C9A84C' : '#fff',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '4px',
                  fontSize: '16px',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}

      <div className="admin-layout" style={{
        display: 'grid',
        gridTemplateColumns: '260px minmax(0, 1fr)',
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100vw',
        background: '#121212',
        color: '#ffffff',
        fontFamily: 'Inter, sans-serif',
      }}>
        {/* Desktop Sidebar */}
        <aside className="admin-sidebar-desktop" style={{
          background: '#1A1A1A',
          borderRight: '1px solid rgba(201, 168, 76, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px 0',
        }}>
          <div>
            {/* Logo */}
            <div style={{ padding: '0 24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{
                color: '#C9A84C',
                fontSize: '9px',
                letterSpacing: '5px',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '4px',
              }}>
                بسم الله
              </span>
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '20px',
                fontWeight: 700,
                color: '#ffffff',
              }}>
                ArtGallery
              </h2>
              <span style={{
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.4)',
                display: 'inline-block',
                marginTop: '4px',
                background: 'rgba(201, 168, 76, 0.15)',
                padding: '2px 8px',
                borderRadius: '12px',
                border: '1px solid rgba(201, 168, 76, 0.2)'
              }}>
                Admin Dashboard
              </span>
            </div>

            {/* Navigation Links */}
            <nav style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { id: 'overview', label: 'Dashboard Overview', icon: '📊' },
                { id: 'catalog', label: 'Manage Catalog', icon: '🎨' },
                { id: 'orders', label: 'Order Requests', icon: '📦' },
                { id: 'messages', label: 'Inbox Messages', icon: '✉' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    background: activeTab === tab.id ? 'rgba(201, 168, 76, 0.15)' : 'transparent',
                    color: activeTab === tab.id ? '#C9A84C' : 'rgba(255, 255, 255, 0.65)',
                    border: 'none',
                    borderLeft: activeTab === tab.id ? '3px solid #C9A84C' : '3px solid transparent',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: activeTab === tab.id ? 600 : 500,
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    borderRadius: '0 4px 4px 0',
                  }}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Footer Logout */}
          <div style={{ padding: '0 16px' }}>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to logout?')) {
                  localStorage.removeItem('amir_admin_auth');
                  onLogout();
                }
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '12px',
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#f87171',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.2s',
              }}
            >
              <span>🚪</span> Logout
            </button>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="admin-main-padding" style={{
          padding: '36px 32px',
          overflowY: 'auto',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          maxHeight: '100vh',
          minWidth: 0,
          width: '100%',
          boxSizing: 'border-box',
        }}>
          {/* Header */}
          <div className="admin-header-flex" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            paddingBottom: '20px',
          }}>
          <div>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '32px',
              fontWeight: 700,
              color: '#ffffff',
            }}>
              {activeTab === 'overview' && 'Overview'}
              {activeTab === 'catalog' && 'Paintings Catalog'}
              {activeTab === 'orders' && 'Order Management'}
              {activeTab === 'messages' && 'Inbox Messages'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '4px' }}>
              Welcome back, Admin. System is active.
            </p>
          </div>

          {activeTab === 'catalog' && (
            <button
              onClick={handleOpenAddModal}
              style={{
                padding: '12px 24px',
                background: '#C9A84C',
                color: '#1A1A1A',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '2px',
                boxShadow: '0 4px 12px rgba(201, 168, 76, 0.2)',
              }}
            >
              + Add Painting
            </button>
          )}
        </div>

        {/* ---------------- OVERVIEW TAB ---------------- */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0, width: '100%' }}>
            {/* Stats Cards */}
            <div className="admin-stats-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
            }}>
              {[
                { title: 'Total Revenue', value: `$${totalSales}`, desc: 'Total Sales Volume', icon: '💵', gradient: 'linear-gradient(135deg, #A07830 0%, #6B4A2A 100%)' },
                { title: 'Paintings Catalog', value: products.length, desc: 'Artwork items listed', icon: '🎨', gradient: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)' },
                { title: 'Order Requests', value: orders.length, desc: 'Orders placed by users', icon: '📦', gradient: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)' },
                { title: 'Inbox Messages', value: messages.length, desc: 'Contact submissions', icon: '✉', gradient: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)' },
              ].map((stat, i) => (
                <div
                  key={stat.title}
                  style={{
                    background: stat.gradient,
                    padding: '24px',
                    borderRadius: '4px',
                    border: '1px solid rgba(201, 168, 76, 0.15)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <span style={{ position: 'absolute', right: '16px', top: '16px', fontSize: '32px', opacity: 0.25 }}>{stat.icon}</span>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.title}</p>
                  <h3 style={{ fontSize: '28px', fontWeight: 800, marginTop: '8px', color: '#ffffff' }}>{stat.value}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '8px' }}>{stat.desc}</p>
                </div>
              ))}
            </div>

            {/* Quick Lists */}
            <div className="admin-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
              {/* Recent Orders */}
              <div style={{ background: '#1A1A1A', padding: '24px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 700, marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
                  Recent Orders
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {orders.slice(0, 4).map((order) => (
                    <div
                      key={order.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.03)',
                      }}
                    >
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: 600 }}>{order.customer}</p>
                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>
                          Order #{order.id} • {order.date}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#C9A84C' }}>${order.total}</span>
                        <span style={{
                          display: 'block',
                          fontSize: '10px',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                          color: order.status === 'Delivered' ? '#4ade80' : order.status === 'Processing' ? '#60a5fa' : '#facc15',
                          marginTop: '2px',
                        }}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Messages */}
              <div style={{ background: '#1A1A1A', padding: '24px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 700, marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
                  Recent Contact Messages
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {messages.slice(0, 3).map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        padding: '12px',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.03)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontSize: '14px', fontWeight: 600 }}>{msg.name}</p>
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{msg.date}</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#C9A84C', fontWeight: 500, marginTop: '2px' }}>{msg.subject}</p>
                      <p style={{
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.6)',
                        marginTop: '6px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        "{msg.message}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- CATALOG TAB ---------------- */}
        {activeTab === 'catalog' && (
          <div style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px' }}>
            {/* Scroll Navigation Controls for Table */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 18px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
              flexWrap: 'wrap',
              gap: '10px',
            }}>
              <span style={{ fontSize: '12px', color: '#C9A84C', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter, sans-serif' }}>
                <span>⇄</span>
                <span>Scroll or swipe horizontally to view all columns & actions</span>
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('admin-catalog-scroll');
                    if (el) el.scrollBy({ left: -240, behavior: 'smooth' });
                  }}
                  style={{
                    padding: '6px 12px',
                    background: '#242424',
                    border: '1px solid rgba(201,168,76,0.25)',
                    color: '#C9A84C',
                    fontSize: '12px',
                    cursor: 'pointer',
                    borderRadius: '2px',
                    fontWeight: 600,
                  }}
                >
                  ◀ Scroll Left
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('admin-catalog-scroll');
                    if (el) el.scrollBy({ left: 240, behavior: 'smooth' });
                  }}
                  style={{
                    padding: '6px 12px',
                    background: '#242424',
                    border: '1px solid rgba(201,168,76,0.25)',
                    color: '#C9A84C',
                    fontSize: '12px',
                    cursor: 'pointer',
                    borderRadius: '2px',
                    fontWeight: 600,
                  }}
                >
                  Scroll Right ▶
                </button>
              </div>
            </div>

            <div
              id="admin-catalog-scroll"
              className="admin-table-container"
              style={{
                width: '100%',
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-x pan-y',
                paddingBottom: '8px',
              }}
            >
              <table style={{ width: '100%', minWidth: '840px', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                    <th style={{
                      padding: '14px 18px',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.45)',
                      letterSpacing: '1px',
                      minWidth: '220px',
                    }}>
                      Painting
                    </th>
                    <th style={{ padding: '14px 18px', fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', letterSpacing: '1px', minWidth: '150px' }}>Category</th>
                    <th style={{ padding: '14px 18px', fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', letterSpacing: '1px', minWidth: '100px' }}>Price</th>
                    <th style={{ padding: '14px 18px', fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', letterSpacing: '1px', minWidth: '100px' }}>Status</th>
                    <th style={{ padding: '14px 18px', fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', letterSpacing: '1px', minWidth: '100px' }}>Badges</th>
                    <th style={{ padding: '14px 18px', fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', letterSpacing: '1px', textAlign: 'right', minWidth: '130px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id || product._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }} className="hover:bg-white/[0.02]">
                      {/* Image + Title */}
                      <td style={{
                        padding: '14px 18px',
                        verticalAlign: 'middle',
                        minWidth: '220px',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <img
                            src={getOptimizedImageUrl(product.image, 200)}
                            alt={product.title}
                            loading="lazy"
                            style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '3px', flexShrink: 0, background: '#222', border: '1px solid rgba(255,255,255,0.08)' }}
                          />
                          <div style={{ minWidth: 0, overflow: 'hidden' }}>
                            <p style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                              {product.title}
                            </p>
                            {product.arabicTitle && (
                              <p style={{ fontSize: '12px', color: '#C9A84C', fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', margin: '2px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                                {product.arabicTitle}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td style={{ padding: '14px 18px', fontSize: '13px', color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                        {categories.find((c) => c.id === product.category)?.label || product.category}
                      </td>

                      {/* Price */}
                      <td style={{ padding: '14px 18px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>${product.price}</span>
                        {product.originalPrice && (
                          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through', marginLeft: '6px' }}>
                            ${product.originalPrice}
                          </span>
                        )}
                      </td>

                      {/* Availability */}
                      <td style={{ padding: '14px 18px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          padding: '4px 8px',
                          borderRadius: '2px',
                          background: product.availability === 'In Stock' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(251, 191, 36, 0.15)',
                          color: product.availability === 'In Stock' ? '#4ade80' : '#fbbf24',
                          border: product.availability === 'In Stock' ? '1px solid rgba(74, 222, 128, 0.3)' : '1px solid rgba(251, 191, 36, 0.3)',
                        }}>
                          {product.availability}
                        </span>
                      </td>

                      {/* Badges */}
                      <td style={{ padding: '14px 18px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {product.featured && (
                            <span style={{ fontSize: '9px', background: 'rgba(201, 168, 76, 0.2)', color: '#C9A84C', padding: '2px 6px', fontWeight: 700, borderRadius: '2px', border: '1px solid rgba(201, 168, 76, 0.3)' }}>FEATURED</span>
                          )}
                          {product.popular && (
                            <span style={{ fontSize: '9px', background: 'rgba(96, 165, 250, 0.2)', color: '#60a5fa', padding: '2px 6px', fontWeight: 700, borderRadius: '2px', border: '1px solid rgba(96, 165, 250, 0.3)' }}>POPULAR</span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px 18px', textAlign: 'right', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          style={{
                            background: 'transparent',
                            color: '#C9A84C',
                            border: '1px solid rgba(201, 168, 76, 0.3)',
                            padding: '5px 10px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            marginRight: '6px',
                            borderRadius: '2px',
                            transition: 'all 0.2s',
                          }}
                          className="hover:bg-[#C9A84C] hover:text-[#1A1A1A]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id || product._id)}
                          style={{
                            background: 'transparent',
                            color: '#ef4444',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            padding: '5px 10px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            borderRadius: '2px',
                            transition: 'all 0.2s',
                          }}
                          className="hover:bg-[#ef4444] hover:text-[#fff]"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---------------- ORDERS TAB ---------------- */}
        {activeTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {orders.map((order) => (
              <div
                key={order.id}
                style={{
                  background: '#1A1A1A',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  padding: '24px',
                  borderRadius: '4px',
                }}
              >
                {/* Order Top Bar */}
                <div className="admin-order-top-bar" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  paddingBottom: '16px',
                  marginBottom: '16px',
                }}>
                  <div>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>ORDER ID</span>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#C9A84C', marginTop: '2px' }}>#{order.id}</h3>
                  </div>
                  <div>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', display: 'block', textAlign: 'right' }}>DATE PLACED</span>
                    <p style={{ fontSize: '15px', fontWeight: 500, marginTop: '2px' }}>{order.date}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', display: 'block', textAlign: 'right' }}>TOTAL</span>
                    <p style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>${order.total}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '4px' }}>STATUS</label>
                    <select
                      id={`order-status-${order.id}`}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{
                        padding: '8px 12px',
                        background: '#222',
                        border: '1px solid rgba(201, 168, 76, 0.3)',
                        color: order.status === 'Delivered' ? '#4ade80' : order.status === 'Processing' ? '#60a5fa' : '#facc15',
                        fontWeight: 700,
                        fontSize: '13px',
                        cursor: 'pointer',
                        borderRadius: '2px',
                      }}
                    >
                      <option value="Pending" style={{ color: '#facc15' }}>Pending</option>
                      <option value="Processing" style={{ color: '#60a5fa' }}>Processing</option>
                      <option value="Shipped" style={{ color: '#fb923c' }}>Shipped</option>
                      <option value="Delivered" style={{ color: '#4ade80' }}>Delivered</option>
                    </select>
                  </div>
                </div>

                {/* Customer Details & Items */}
                <div className="admin-order-details-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '40px' }}>
                  <div>
                    <h4 style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Customer Info</h4>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>{order.customer}</p>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>{order.email}</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Items Ordered</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {order.items.map((item, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', padding: '8px 12px', border: '1px solid rgba(255,255,255,0.03)' }}>
                          <span style={{ fontSize: '14px', color: '#ffffff' }}>{item.title} <span style={{ color: 'rgba(255,255,255,0.4)' }}>x{item.quantity}</span></span>
                          <span style={{ fontSize: '14px', fontWeight: 600, color: '#C9A84C' }}>${item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ---------------- MESSAGES TAB ---------------- */}
        {activeTab === 'messages' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '64px 0', background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ fontSize: '32px', marginBottom: '16px' }}>✉</p>
                <h3 style={{ fontSize: '20px', fontWeight: 600 }}>Inbox is empty</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '6px' }}>No messages submitted from the contact form yet.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    background: '#1A1A1A',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    padding: '24px',
                    borderRadius: '4px',
                    position: 'relative',
                  }}
                >
                  <button
                    onClick={() => handleDeleteMessage(msg.id)}
                    style={{
                      position: 'absolute',
                      right: '24px',
                      top: '24px',
                      background: 'transparent',
                      border: 'none',
                      color: 'rgba(255, 255, 255, 0.3)',
                      fontSize: '18px',
                      cursor: 'pointer',
                      transition: 'color 0.2s',
                    }}
                    className="hover:text-red-500"
                    title="Delete message"
                  >
                    🗑
                  </button>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Sender</span>
                      <p style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', marginTop: '2px' }}>{msg.name}</p>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Email</span>
                      <p style={{ fontSize: '15px', fontWeight: 500, color: '#C9A84C', marginTop: '2px' }}>{msg.email}</p>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Subject</span>
                      <p style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', marginTop: '2px' }}>{msg.subject || 'N/A'}</p>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Date</span>
                      <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{msg.date}</p>
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Message Body</span>
                    <p style={{
                      fontSize: '15px',
                      lineHeight: 1.6,
                      color: 'rgba(255, 255, 255, 0.8)',
                      marginTop: '6px',
                      background: 'rgba(0,0,0,0.15)',
                      padding: '16px',
                      borderLeft: '3px solid #C9A84C',
                    }}>
                      "{msg.message}"
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* ---------------- ADD/EDIT FORM MODAL ---------------- */}
      {showFormModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '24px',
        }}>
          <div style={{
            background: '#1A1A1A',
            border: '1px solid rgba(201, 168, 76, 0.3)',
            borderRadius: '4px',
            width: '100%',
            maxWidth: '700px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '36px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px' }}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', color: '#ffffff' }}>
                {editingProduct ? 'Edit Painting Details' : 'Add New Painting to Catalog'}
              </h2>
              <button
                onClick={() => setShowFormModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#ffffff', fontSize: '24px', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="admin-modal-grid">
                {/* Title */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#C9A84C', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Painting Title *</label>
                  <input
                    id="modal-title"
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    style={{ width: '100%', border: '1px solid rgba(255,255,255,0.1)', background: '#222', padding: '10px 14px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
                {/* Arabic Title */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#C9A84C', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Arabic Title / Script</label>
                  <input
                    id="modal-arabic"
                    type="text"
                    value={form.arabicTitle}
                    onChange={(e) => setForm({ ...form, arabicTitle: e.target.value })}
                    style={{ width: '100%', border: '1px solid rgba(255,255,255,0.1)', background: '#222', padding: '10px 14px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div className="admin-modal-grid">
                {/* Price */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#C9A84C', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Sale Price ($) *</label>
                  <input
                    id="modal-price"
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    style={{ width: '100%', border: '1px solid rgba(255,255,255,0.1)', background: '#222', padding: '10px 14px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
                {/* Original Price */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#C9A84C', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Original Price ($) (Optional Sale)</label>
                  <input
                    id="modal-original-price"
                    type="number"
                    value={form.originalPrice}
                    onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                    style={{ width: '100%', border: '1px solid rgba(255,255,255,0.1)', background: '#222', padding: '10px 14px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div className="admin-modal-grid">
                {/* Category */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#C9A84C', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Category *</label>
                  <select
                    id="modal-category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    style={{ width: '100%', border: '1px solid rgba(255,255,255,0.1)', background: '#222', padding: '10px 14px', color: '#fff', fontSize: '14px', cursor: 'pointer', boxSizing: 'border-box' }}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>
                {/* Availability */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#C9A84C', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Availability Status *</label>
                  <select
                    id="modal-availability"
                    value={form.availability}
                    onChange={(e) => setForm({ ...form, availability: e.target.value })}
                    style={{ width: '100%', border: '1px solid rgba(255,255,255,0.1)', background: '#222', padding: '10px 14px', color: '#fff', fontSize: '14px', cursor: 'pointer', boxSizing: 'border-box' }}
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Made to Order">Made to Order</option>
                  </select>
                </div>
              </div>

              <div className="admin-modal-grid">
                {/* Dimensions */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#C9A84C', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Dimensions (e.g. 60 × 80 cm) *</label>
                  <input
                    id="modal-dimensions"
                    type="text"
                    required
                    value={form.dimensions}
                    onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                    style={{ width: '100%', border: '1px solid rgba(255,255,255,0.1)', background: '#222', padding: '10px 14px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
                {/* Materials */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#C9A84C', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Materials (e.g. Archival canvas, 24K gold leaf) *</label>
                  <input
                    id="modal-materials"
                    type="text"
                    required
                    value={form.materials}
                    onChange={(e) => setForm({ ...form, materials: e.target.value })}
                    style={{ width: '100%', border: '1px solid rgba(255,255,255,0.1)', background: '#222', padding: '10px 14px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Multiple Images Upload & Preview */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#C9A84C', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                  Artwork Images (Select One or Multiple Photos)
                </label>

                {/* Previews: Existing + Newly Selected Images */}
                {((form.existingImages && form.existingImages.length > 0) || (form.imageFiles && form.imageFiles.length > 0)) && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '14px', padding: '12px', background: '#1c1c1c', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px' }}>
                    {/* Existing Images */}
                    {form.existingImages.map((imgUrl, idx) => (
                      <div key={`existing-${idx}`} style={{ position: 'relative', width: '84px', height: '84px', border: idx === 0 ? '2px solid #C9A84C' : '1px solid #444', borderRadius: '3px', overflow: 'hidden', background: '#111' }}>
                        <img src={getOptimizedImageUrl(imgUrl, 200)} alt="Existing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {idx === 0 && (
                          <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(201,168,76,0.95)', color: '#111', fontSize: '9px', fontWeight: 700, textAlign: 'center', padding: '1px 0', letterSpacing: '0.5px' }}>
                            COVER
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveExistingImage(idx)}
                          style={{ position: 'absolute', top: '2px', right: '2px', background: 'rgba(0,0,0,0.8)', color: '#ff4d4f', border: 'none', borderRadius: '50%', width: '18px', height: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}
                          title="Remove image"
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    {/* New Selected Files */}
                    {form.imageFiles.map((file, idx) => {
                      const isFirstCover = form.existingImages.length === 0 && idx === 0;
                      return (
                        <div key={`new-${idx}`} style={{ position: 'relative', width: '84px', height: '84px', border: isFirstCover ? '2px solid #C9A84C' : '1px dashed #C9A84C', borderRadius: '3px', overflow: 'hidden', background: '#111' }}>
                          <img src={URL.createObjectURL(file)} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          {isFirstCover && (
                            <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(201,168,76,0.95)', color: '#111', fontSize: '9px', fontWeight: 700, textAlign: 'center', padding: '1px 0', letterSpacing: '0.5px' }}>
                              COVER
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveNewFile(idx)}
                            style={{ position: 'absolute', top: '2px', right: '2px', background: 'rgba(0,0,0,0.8)', color: '#ff4d4f', border: 'none', borderRadius: '50%', width: '18px', height: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}
                            title="Remove image"
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                <input
                  id="modal-image"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFilesChange}
                  style={{ width: '100%', border: '1px solid rgba(255,255,255,0.15)', background: '#222', padding: '10px 14px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', cursor: 'pointer' }}
                />
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', marginTop: '6px', margin: '6px 0 0' }}>
                  💡 Tip: You can select multiple images at once (or pick more by clicking Choose Files again). The first image will be used as the primary cover picture.
                </p>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#C9A84C', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Painting Description *</label>
                <textarea
                  id="modal-desc"
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  style={{ width: '100%', border: '1px solid rgba(255,255,255,0.1)', background: '#222', padding: '10px 14px', color: '#fff', fontSize: '14px', resize: 'none', boxSizing: 'border-box' }}
                />
              </div>

              {/* Tags */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#C9A84C', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Search Tags (comma separated, e.g. gold, allah, thuluth)</label>
                <input
                  id="modal-tags"
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="gold, allah, thuluth"
                  style={{ width: '100%', border: '1px solid rgba(255,255,255,0.1)', background: '#222', padding: '10px 14px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              {/* Checkboxes */}
              <div style={{ display: 'flex', gap: '30px', margin: '10px 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    style={{ accentColor: '#C9A84C', width: '16px', height: '16px' }}
                  />
                  <span>Show as Featured Painting</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={form.popular}
                    onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                    style={{ accentColor: '#C9A84C', width: '16px', height: '16px' }}
                  />
                  <span>Show as Popular Painting</span>
                </label>
              </div>

              {/* Form Buttons */}
              <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  style={{ flex: 1, padding: '14px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#fff', fontWeight: 600, fontSize: '14px', cursor: 'pointer', borderRadius: '2px' }}
                >
                  Cancel
                </button>
                <button
                  id="modal-submit-btn"
                  type="submit"
                  style={{ flex: 1, padding: '14px', background: '#C9A84C', color: '#1A1A1A', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer', borderRadius: '2px' }}
                >
                  {editingProduct ? 'Save Changes ✓' : 'Add Painting ✦'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Responsive Layout Styles */}
      <style>{`
        /* Custom visible scrollbar for admin table */
        .admin-table-container::-webkit-scrollbar {
          height: 10px !important;
          display: block !important;
        }
        .admin-table-container::-webkit-scrollbar-track {
          background: #141414 !important;
          border-radius: 4px !important;
        }
        .admin-table-container::-webkit-scrollbar-thumb {
          background: #C9A84C !important;
          border-radius: 4px !important;
          border: 2px solid #141414 !important;
        }
        .admin-table-container::-webkit-scrollbar-thumb:hover {
          background: #E8C97A !important;
        }

        @media (max-width: 1024px) {
          .admin-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          .admin-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }

        @media (max-width: 900px) {
          .admin-layout {
            grid-template-columns: 1fr !important;
          }
          .admin-sidebar-desktop {
            display: none !important;
          }
          .admin-mobile-header {
            display: flex !important;
          }
          .admin-main-padding {
            padding: 20px 16px !important;
          }
          .admin-header-flex {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
        }

        @media (max-width: 600px) {
          .admin-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  </div>
);
}
