// src/hooks/useSmartImage.ts
import { useState, useCallback, useEffect, useRef } from 'react';

interface UseSmartImageOptions {
  maxRetries?: number;     // Maximum number of retry attempts
  retryDelay?: number;     // Delay between retries in milliseconds
  fallbackSrc?: string;    // Fallback image source when all retries fail
  enableCache?: boolean;   // Whether to use browser cache
}

/**
 * A sophisticated hook for handling image loading with retry mechanism,
 * loading states, and proper error handling for production environments.
 * 
 * @param initialSrc - The initial image source URL
 * @param options - Configuration options for the hook
 * @returns Object containing image state and handlers
 */
export const useSmartImage = (
  initialSrc: string,
  options: UseSmartImageOptions = {}
) => {
  // Default configuration
  const {
    maxRetries = 2,
    retryDelay = 150,
    fallbackSrc = '/images/fallback-logo.png',
    enableCache = true
  } = options;

  // State management
  const [src, setSrc] = useState(initialSrc);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Refs for cleanup and tracking
  const retryTimeoutRef = useRef<NodeJS.Timeout>();
  const isMountedRef = useRef(true);

  /**
   * Handles image loading errors with retry logic and fallback
   */
  const handleError = useCallback(() => {
    if (!isMountedRef.current) return;

    // Clear any pending retry timeouts
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }

    if (retryCount < maxRetries) {
      // Schedule a retry with cache-busting parameter
      retryTimeoutRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;
        
        const newRetryCount = retryCount + 1;
        setRetryCount(newRetryCount);
        
        // Add cache-busting parameter to avoid browser cache issues
        const cacheBuster = enableCache ? `&attempt=${newRetryCount}` : `?t=${Date.now()}&attempt=${newRetryCount}`;
        setSrc(`${initialSrc}${cacheBuster}`);
        
        setIsLoading(true);
      }, retryDelay);
    } else {
      // All retries failed, use fallback
      setSrc(fallbackSrc);
      setHasError(true);
      setIsLoading(false);
      
      // Log the error for monitoring (can be connected to analytics)
      console.warn(`Image load failed after ${maxRetries} attempts:`, initialSrc);
    }
  }, [initialSrc, fallbackSrc, maxRetries, retryCount, retryDelay, enableCache]);

  /**
   * Handles successful image load
   */
  const handleLoad = useCallback(() => {
    if (!isMountedRef.current) return;
    
    // Clean up any pending retries
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }
    
    setIsLoading(false);
    setHasError(false);
  }, []);

  // Effect for handling source changes and cleanup
  useEffect(() => {
    isMountedRef.current = true;
    
    // Reset state when initial source changes
    setSrc(initialSrc);
    setRetryCount(0);
    setIsLoading(true);
    setHasError(false);

    // Clean up any pending timeouts
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }

    // Component unmount cleanup
    return () => {
      isMountedRef.current = false;
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [initialSrc]);

  return {
    src,            // Current image source (may be fallback)
    isLoading,      // Whether image is currently loading
    hasError,       // Whether all retries failed
    retryCount,     // Number of retry attempts made
    handleError,    // Error handler for img onError
    handleLoad      // Load handler for img onLoad
  };
};

// Optional: Cache layer for production optimization
const imageCache = new Map<string, string>();

export const getCachedImage = async (url: string): Promise<string> => {
  if (imageCache.has(url)) {
    return imageCache.get(url)!;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      imageCache.set(url, url);
      resolve(url);
    };
    img.onerror = () => {
      resolve('/images/fallback-logo.png');
    };
    img.src = url;
  });
};