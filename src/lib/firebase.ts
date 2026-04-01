// Firebase Analytics Setup (v9+ modular SDK)
// This file initializes Firebase and exports analytics utilities

import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAnalytics, logEvent, isSupported, Analytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1V2pL4WvLMW8WzBU0YhFIUSpfh6l3d8w",
  authDomain: "nura-landing-page.firebaseapp.com",
  projectId: "nura-landing-page",
  storageBucket: "nura-landing-page.firebasestorage.app",
  messagingSenderId: "529039841528",
  appId: "1:529039841528:web:066e29ca91130dee0f830d",
  measurementId: "G-5PLWS18M3R"
};

// App instance (singleton)
let app: FirebaseApp | null = null;
let analytics: Analytics | null = null;

/**
 * Initialize Firebase and Analytics
 * SSR-safe: only runs in browser environment
 */
export const initFirebase = async (): Promise<{ app: FirebaseApp | null; analytics: typeof analytics }> => {
  // Guard: Only run in browser (not during SSR/build)
  if (typeof window === 'undefined') {
    return { app: null, analytics };
  }

  // Initialize only once
  if (!app) {
    app = initializeApp(firebaseConfig);
  }

  // Initialize Analytics
  if (!analytics) {
    const supported = await isSupported();
    console.log('[Firebase] Analytics supported:', supported);
    if (supported) {
      analytics = getAnalytics(app);
      console.log('[Firebase] Analytics initialized');
    }
  }

  return { app, analytics };
};

/**
 * Log a custom event to Firebase Analytics
 * Safe to call anywhere - no-ops if analytics not initialized
 */
export const trackEvent = (eventName: string, _params?: Record<string, unknown>): void => {
  console.log('[Firebase] trackEvent:', eventName, _params);
  if (analytics) {
    logEvent(analytics, eventName, _params);
  } else {
    console.warn('[Firebase] Analytics not initialized!');
  }
};

/**
 * Track button clicks with a specific event name
 * eventName becomes the analytics event name (e.g. "hero_consultation_click")
 */
export const trackCtaClick = (eventName: string, additionalParams?: Record<string, unknown>): void => {
  console.log('[Firebase] trackCtaClick:', eventName, additionalParams);
  if (analytics) {
    trackEvent(eventName, additionalParams);
  } else {
    console.warn('[Firebase] Cannot track - analytics not initialized');
  }
};

/**
 * Track form submissions
 * Call this after successful form submission
 */
export const trackFormSubmit = (formName: string, additionalParams?: Record<string, unknown>): void => {
  trackEvent('form_submit', {
    form_name: formName,
    timestamp: new Date().toISOString(),
    ...additionalParams
  });
};

/**
 * Track page views manually (if needed beyond automatic tracking)
 * Useful for SPA route changes
 */
export const trackPageView = (pagePath?: string): void => {
  trackEvent('page_view', {
    page_path: pagePath || window.location.pathname,
    page_title: document.title
  });
};

// Export analytics instance for advanced usage
export { analytics };
