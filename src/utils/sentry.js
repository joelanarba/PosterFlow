import * as Sentry from "@sentry/react";

/**
 * Initialize Sentry for error tracking and performance monitoring
 * Only initializes in production and if DSN is provided
 */
export const initSentry = () => {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  const environment = import.meta.env.MODE || 'development';

  // Only initialize if DSN is provided
  if (!dsn) {
    console.warn('Sentry DSN not configured. Error tracking disabled.');
    return;
  }

  Sentry.init({
    dsn,
    environment,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    
    // Performance Monitoring
    tracesSampleRate: environment === 'production' ? 0.1 : 1.0, // 10% in prod, 100% in dev
    
    // Session Replay
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors
    
    // Before sending, add user context if available
    beforeSend(event, hint) {
      // Don't send events in development unless explicitly enabled
      if (environment === 'development' && !import.meta.env.VITE_SENTRY_DEBUG) {
        return null;
      }
      return event;
    },
    
    // Ignore common non-errors
    ignoreErrors: [
      // Browser extensions
      'top.GLOBALS',
      // Random plugins/extensions
      'originalCreateNotification',
      'canvas.contentDocument',
      'MyApp_RemoveAllHighlights',
      // Facebook borked
      'fb_xd_fragment',
      // Network errors that we can't control
      'NetworkError',
      'Network request failed',
      // Firebase auth errors (handled gracefully in UI)
      'auth/popup-closed-by-user',
      'auth/cancelled-popup-request',
    ],
  });
};

/**
 * Set user context for error tracking
 * @param {object} user - User object with id, email, etc.
 */
export const setSentryUser = (user) => {
  if (user) {
    Sentry.setUser({
      id: user.uid,
      email: user.email,
    });
  } else {
    Sentry.setUser(null);
  }
};

/**
 * Add breadcrumb for debugging
 * @param {string} message - Breadcrumb message
 * @param {string} category - Category (e.g., 'auth', 'api', 'ui')
 * @param {string} level - Level (info, warning, error)
 */
export const addBreadcrumb = (message, category = 'app', level = 'info') => {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
    timestamp: Date.now(),
  });
};

/**
 * Manually capture an exception
 * @param {Error} error - Error object
 * @param {object} context - Additional context
 */
export const captureException = (error, context = {}) => {
  Sentry.captureException(error, {
    extra: context,
  });
};

/**
 * Capture a message (non-error event)
 * @param {string} message - Message to capture
 * @param {string} level - Level (info, warning, error)
 */
export const captureMessage = (message, level = 'info') => {
  Sentry.captureMessage(message, level);
};
