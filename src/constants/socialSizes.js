/**
 * Social media size presets for different platforms
 */

export const SOCIAL_SIZES = {
  instagram: {
    label: 'Instagram',
    icon: '📷',
    sizes: {
      square: { width: 1080, height: 1080, label: 'Square Post', ratio: '1:1' },
      story: { width: 1080, height: 1920, label: 'Story', ratio: '9:16' },
      landscape: { width: 1080, height: 566, label: 'Landscape', ratio: '1.91:1' },
    }
  },
  facebook: {
    label: 'Facebook',
    icon: '👍',
    sizes: {
      post: { width: 1200, height: 630, label: 'Post', ratio: '1.91:1' },
      story: { width: 1080, height: 1920, label: 'Story', ratio: '9:16' },
      cover: { width: 820, height: 312, label: 'Cover Photo', ratio: '2.63:1' },
    }
  },
  twitter: {
    label: 'Twitter/X',
    icon: '🐦',
    sizes: {
      post: { width: 1600, height: 900, label: 'Post', ratio: '16:9' },
      header: { width: 1500, height: 500, label: 'Header', ratio: '3:1' },
    }
  },
  linkedin: {
    label: 'LinkedIn',
    icon: '💼',
    sizes: {
      post: { width: 1200, height: 627, label: 'Post', ratio: '1.91:1' },
      cover: { width: 1584, height: 396, label: 'Cover Photo', ratio: '4:1' },
    }
  },
  youtube: {
    label: 'YouTube',
    icon: '▶️',
    sizes: {
      thumbnail: { width: 1280, height: 720, label: 'Thumbnail', ratio: '16:9' },
      banner: { width: 2560, height: 1440, label: 'Channel Banner', ratio: '16:9' },
    }
  },
};

// Default size
export const DEFAULT_SIZE = {
  platform: 'instagram',
  sizeKey: 'square',
  ...SOCIAL_SIZES.instagram.sizes.square
};

/**
 * Get all available sizes as a flat array for dropdown
 */
export const getAllSizes = () => {
  const allSizes = [];
  
  Object.entries(SOCIAL_SIZES).forEach(([platformKey, platformData]) => {
    Object.entries(platformData.sizes).forEach(([sizeKey, sizeData]) => {
      allSizes.push({
        platform: platformKey,
        platformLabel: platformData.label,
        platformIcon: platformData.icon,
        sizeKey,
        ...sizeData,
        id: `${platformKey}-${sizeKey}`,
      });
    });
  });
  
  return allSizes;
};

/**
 * Get size configuration by platform and size key
 */
export const getSizeConfig = (platform, sizeKey) => {
  return SOCIAL_SIZES[platform]?.sizes[sizeKey] || DEFAULT_SIZE;
};
