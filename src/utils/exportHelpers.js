/**
 * Export utilities for poster downloads
 */

/**
 * Export canvas as PNG
 * @param {HTMLCanvasElement} canvas - The canvas element to export
 * @param {string} filename - Filename without extension
 */
export const exportAsPNG = (canvas, filename = 'poster') => {
  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
};

/**
 * Export canvas as JPEG with quality control
 * @param {HTMLCanvasElement} canvas - The canvas element to export
 * @param {string} filename - Filename without extension
 * @param {number} quality - JPEG quality (0.0 to 1.0)
 */
export const exportAsJPEG = (canvas, filename = 'poster', quality = 0.92) => {
  const link = document.createElement('a');
  link.download = `${filename}.jpg`;
  link.href = canvas.toDataURL('image/jpeg', quality);
  link.click();
};

/**
 * Get estimated file size for different formats
 * @param {HTMLCanvasElement} canvas - The canvas element
 * @returns {Object} Estimated sizes in KB
 */
export const getEstimatedSizes = (canvas) => {
  // Rough estimates based on canvas dimensions
  const pixels = canvas.width * canvas.height;
  return {
    png: Math.round((pixels * 4) / 1024), // ~4 bytes per pixel for PNG
    jpegHigh: Math.round((pixels * 0.5) / 1024), // ~0.5 bytes per pixel for high quality JPEG
    jpegMedium: Math.round((pixels * 0.3) / 1024),
    jpegLow: Math.round((pixels * 0.15) / 1024),
  };
};

/**
 * Format file size for display
 * @param {number} sizeKB - Size in kilobytes
 * @returns {string} Formatted size string
 */
export const formatFileSize = (sizeKB) => {
  if (sizeKB < 1024) {
    return `${sizeKB} KB`;
  }
  return `${(sizeKB / 1024).toFixed(1)} MB`;
};
