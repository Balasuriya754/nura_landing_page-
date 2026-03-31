// Analytics hook for React components
// Provides easy access to Firebase Analytics tracking functions

import { useEffect, useCallback } from 'react';
import { initFirebase, trackCtaClick, trackFormSubmit, trackPageView } from '../lib/firebase';

/**
 * Hook to initialize Firebase Analytics and provide tracking utilities
 * Automatically initializes Firebase on mount
 */
export const useAnalytics = () => {
  // Initialize Firebase Analytics on first use
  useEffect(() => {
    initFirebase();
  }, []);

  // Wrapped tracking functions for convenience
  const trackCta = useCallback((ctaName: string, params?: Record<string, unknown>) => {
    trackCtaClick(ctaName, params);
  }, []);

  const trackForm = useCallback((formName: string, params?: Record<string, unknown>) => {
    trackFormSubmit(formName, params);
  }, []);

  const trackPage = useCallback((path?: string) => {
    trackPageView(path);
  }, []);

  return {
    trackCta,
    trackForm,
    trackPage
  };
};

export default useAnalytics;