// Frontend catalog — empty, all artworks managed via Admin Dashboard
// No fallback products — DB is the single source of truth

export const products = [];

// ─── Art Categories (used by GalleryPage & HomePage filters) ─────────────────
export const categories = [
  { id: 'all', label: 'All Works', arabic: 'جميع الأعمال' },
  { id: 'calligraphy', label: 'Calligraphy', arabic: 'الخط العربي' },
  { id: 'abstract', label: 'Abstract', arabic: 'تجريدي' },
  { id: 'cubism', label: 'Cubism', arabic: 'تكعيبي' },
  { id: 'miniature', label: 'Miniature', arabic: 'مصغرات' },
  { id: 'modern-fusion', label: 'Modern Fusion', arabic: 'المزج المعاصر' },
];

// ─── Testimonials (used by HomePage) ─────────────────────────────────────────
export const testimonials = [
  {
    id: 1,
    name: 'Fatima Al-Rashidi',
    location: 'Dubai, UAE',
    rating: 5,
    review: 'The custom art commission was an absolute masterpiece. The craftsmanship and texture exceeded every expectation.',
    artType: 'Custom Artwork',
    initials: 'FA',
  },
  {
    id: 2,
    name: 'Dr. Ahmed Khalil',
    location: 'London, UK',
    rating: 5,
    review: 'Commissioned a bespoke piece — the artist\'s attention to detail is unparalleled. A true heirloom quality work of art.',
    artType: 'Bespoke Atelier Commission',
    initials: 'AK',
  },
  {
    id: 3,
    name: 'Yasmin Noor',
    location: 'Toronto, Canada',
    rating: 5,
    review: 'The artwork transforms my living room completely. Vibrant, powerful, and deeply meaningful. Packaging was careful and prompt.',
    artType: 'Original Canvas',
    initials: 'YN',
  },
];

// ─── Studio Features (used by HomePage & AboutPage) ──────────────────────────
export const features = [
  {
    icon: '🎨',
    title: 'Multi-Art Mastery',
    description: 'From classical Islamic calligraphy to cubist abstraction, miniature heritage and modern fusion — every discipline mastered with equal depth.',
  },
  {
    icon: '✨',
    title: 'Archival Materials',
    description: 'Only museum-grade linen, 24K gold leaf, natural inks, and mineral pigments — sourced for longevity across centuries.',
  },
  {
    icon: '🖼️',
    title: 'Commission & Custom',
    description: 'Every artwork can be commissioned to your dimensions, colour palette, and spiritual or aesthetic vision.',
  },
  {
    icon: '📦',
    title: 'Museum Packaging',
    description: 'Each piece is hand-wrapped, corner-protected, and shipped in custom wood crates with certificate of authenticity.',
  },
];
