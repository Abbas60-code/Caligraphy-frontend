// Frontend catalog — empty, all artworks managed via Admin Dashboard
// No fallback products — DB is the single source of truth

export const products = [];

// ─── Art Categories (used by GalleryPage & HomePage filters) ─────────────────
export const categories = [
  {
    id: 'all',
    label: 'All Works',
    arabic: 'جميع الأعمال',
    subtitle: 'Complete Atelier',
    description: 'Explore the full spectrum of original masterworks created across all fine art movements.',
    image: '/calligraphy_allah.png',
  },
  {
    id: 'calligraphy',
    label: 'Calligraphy',
    arabic: 'الخط العربي',
    subtitle: 'Sacred Islamic Script',
    description: 'Classical Thuluth, Diwani, and Naskh scripts rendered with genuine 24-karat gold leaf.',
    image: '/calligraphy_allah.png',
  },
  {
    id: 'abstract',
    label: 'Abstract',
    arabic: 'تجريدي',
    subtitle: 'Expression & Texture',
    description: 'Gestural canvases capturing pure emotion, rich textural impasto, and luminous oil tones.',
    image: '/art/0d46b64eeeb730ae9051b8b5afd24924.jpg',
  },
  {
    id: 'cubism',
    label: 'Cubism',
    arabic: 'تكعيبي',
    subtitle: 'Geometry & Planes',
    description: 'Deconstructed forms, multifaceted architectural planes, and dynamic chiaroscuro rhythms.',
    image: '/art/2de1289a41c9897deddc6a0e82ddfb5a.jpg',
  },
  {
    id: 'miniature',
    label: 'Miniature',
    arabic: 'مصغرات',
    subtitle: 'Heritage Detailing',
    description: 'Classical Mughal and Persian miniatures painted with single-hair brushes on archival wasli.',
    image: '/art/4b283e3e87631b9887cd07b0525bac2e.jpg',
  },
  {
    id: 'modern-fusion',
    label: 'Modern Fusion',
    arabic: 'المزج المعاصر',
    subtitle: 'Contemporary Dialogue',
    description: 'Contemporary harmonization blending eastern aesthetics, spiritual grace, and modern scale.',
    image: '/calligraphy_modern.png',
  },
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
