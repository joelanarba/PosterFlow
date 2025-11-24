import React, { useState, useEffect } from 'react';
import { X, Cookie, Settings } from 'lucide-react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always required
    analytics: false,
    marketing: false,
  });

  const applyConsent = (prefs) => {
    // Update Google Analytics consent mode
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: prefs.analytics ? 'granted' : 'denied',
        ad_storage: prefs.marketing ? 'granted' : 'denied',
      });
    }

    // Store consent for other services
    window.cookieConsent = prefs;
  };

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
        // Apply consent to analytics
        applyConsent(saved);
      } catch (e) {
        console.error('Error loading cookie preferences:', e);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(allAccepted);
  };

  const handleRejectAll = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    saveConsent(essentialOnly);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const saveConsent = (prefs) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    applyConsent(prefs);
    setIsVisible(false);
    setShowPreferences(false);
  };

  const togglePreference = (key) => {
    if (key === 'essential') return; // Can't toggle essential cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none">
      {/* Backdrop for preferences modal */}
      {showPreferences && (
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
          onClick={() => setShowPreferences(false)}
        />
      )}

      {/* Main Banner */}
      <div className="max-w-4xl w-full bg-gray-900 border border-gray-700 rounded-xl shadow-2xl pointer-events-auto relative overflow-hidden">
        {/* Gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-600" />

        <div className="p-6">
          {!showPreferences ? (
            // Main Cookie Banner
            <>
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Cookie className="text-white" size={24} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">🍪 Cookie Preferences</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    We use cookies to enhance your experience, analyze site usage, and improve our services. 
                    Essential cookies are required for basic functionality. You can customize your preferences or accept all cookies.
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    By clicking "Accept All", you consent to our use of cookies. 
                    Read our{' '}
                    <a href="/privacy" className="text-pink-500 hover:underline">Privacy Policy</a>
                    {' '}for more information.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
                >
                  Accept All
                </button>
                
                <button
                  onClick={handleRejectAll}
                  className="flex-1 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all"
                >
                  Reject All
                </button>
                
                <button
                  onClick={() => setShowPreferences(true)}
                  className="flex-1 px-6 py-3 bg-transparent border border-gray-600 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                >
                  <Settings size={18} />
                  Customize
                </button>
              </div>
            </>
          ) : (
            // Preferences Panel
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Cookie Preferences</h3>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-gray-400 hover:text-white transition"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {/* Essential Cookies */}
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-white">Essential Cookies</h4>
                      <p className="text-xs text-gray-400 mt-1">Always Active</p>
                    </div>
                    <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-not-allowed opacity-50">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">
                    Required for authentication, security, and basic functionality. Cannot be disabled.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-white">Analytics Cookies</h4>
                      <p className="text-xs text-gray-400 mt-1">Google Analytics 4</p>
                    </div>
                    <button
                      onClick={() => togglePreference('analytics')}
                      className={`w-12 h-6 rounded-full relative transition-colors ${
                        preferences.analytics ? 'bg-pink-500' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences.analytics ? 'right-1' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-300">
                    Help us understand how you use PosterFlow to improve the service and user experience.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-white">Marketing Cookies</h4>
                      <p className="text-xs text-gray-400 mt-1">Future use</p>
                    </div>
                    <button
                      onClick={() => togglePreference('marketing')}
                      className={`w-12 h-6 rounded-full relative transition-colors ${
                        preferences.marketing ? 'bg-pink-500' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences.marketing ? 'right-1' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-300">
                    Used to deliver personalized content and ads relevant to you (not currently used).
                  </p>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex gap-3">
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
                >
                  Save Preferences
                </button>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
