import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';

/**
 * Check if user has consented to analytics
 */
const hasAnalyticsConsent = () => {
  try {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) return false;
    const parsed = JSON.parse(consent);
    return parsed.analytics === true;
  } catch (e) {
    return false;
  }
};

/**
 * Track a custom event
 * @param {string} eventName - Name of the event
 * @param {object} eventParams - Event parameters
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (!hasAnalyticsConsent() || !analytics) return;
  
  try {
    logEvent(analytics, eventName, eventParams);
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
};

/**
 * Track page view
 * @param {string} pagePath - Page path
 * @param {string} pageTitle - Page title
 */
export const trackPageView = (pagePath, pageTitle) => {
  if (!hasAnalyticsConsent() || !analytics) return;
  
  try {
    logEvent(analytics, 'page_view', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  } catch (error) {
    console.error('Page view tracking error:', error);
  }
};

/**
 * Track poster creation event
 * @param {object} posterData - Poster metadata
 */
export const trackPosterCreation = (posterData = {}) => {
  trackEvent('poster_created', {
    has_ai_background: !!posterData.hasAIBackground,
    element_count: posterData.elementCount || 0,
    social_size: posterData.socialSize || 'custom',
  });
};

/**
 * Track poster export/download
 * @param {string} format - Export format (png, jpg, etc.)
 */
export const trackExport = (format = 'png') => {
  trackEvent('poster_exported', {
    export_format: format,
  });
};

/**
 * Track AI background generation
 * @param {string} prompt - User prompt
 * @param {boolean} success - Whether generation succeeded
 */
export const trackAIGeneration = (prompt, success = true) => {
  trackEvent('ai_background_generated', {
    prompt_length: prompt?.length || 0,
    success,
  });
};

/**
 * Track credit purchase
 * @param {number} amount - Purchase amount
 * @param {number} credits - Credits purchased
 */
export const trackPurchase = (amount, credits) => {
  trackEvent('purchase', {
    currency: 'GHS',
    value: amount,
    items: [{
      item_id: 'credits',
      item_name: 'Design Credits',
      quantity: credits,
    }],
  });
};

/**
 * Track user login
 * @param {string} method - Login method (google, email, etc.)
 */
export const trackLogin = (method = 'unknown') => {
  trackEvent('login', {
    method,
  });
};

/**
 * Track user signup
 * @param {string} method - Signup method
 */
export const trackSignup = (method = 'unknown') => {
  trackEvent('sign_up', {
    method,
  });
};
