/**
 * Formats image URLs (especially Cloudinary) to serve auto-formatted (WebP/AVIF),
 * compressed (q_auto), and size-optimized images for fast browser rendering.
 */
export function getOptimizedImageUrl(url, width = 800) {
  if (!url || typeof url !== 'string') return url || '';

  // Cloudinary auto-optimization
  if (url.includes('cloudinary.com') && url.includes('/upload/')) {
    if (!url.includes('/f_auto') && !url.includes('/q_auto')) {
      return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},c_limit/`);
    }
  }

  return url;
}
