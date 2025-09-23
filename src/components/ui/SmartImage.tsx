// src/components/ui/SmartImage.tsx
import React from 'react';
import { useSmartImage } from '../../hooks/useSmartImage';

interface SmartImageProps {
  src: string;  // Required string (not undefined)
  alt: string;
  fallbackSrc?: string;
  maxRetries?: number;
  retryDelay?: number;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

/**
 * A production-ready image component with built-in retry logic,
 * loading states, and error handling for financial applications.
 */
const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  fallbackSrc = '/images/fallback-bank.png',
  maxRetries = 2,
  retryDelay = 150,
  className = '',
  width,
  height,
  loading = 'lazy'
}) => {
  const { src: currentSrc, isLoading, handleError, handleLoad } = useSmartImage(
    src,  // src is always string now
    {
      maxRetries,
      retryDelay,
      fallbackSrc,
      enableCache: true
    }
  );

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Loading skeleton with shimmer effect */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 
                   animate-pulse rounded-lg animate-shimmer"
          style={{
            backgroundSize: '200% 100%',
            backgroundImage: 'linear-gradient(90deg, #374151 0%, #4B5563 50%, #374151 100%)'
          }}
        />
      )}
      
      {/* Error indicator badge */}
      {!isLoading && currentSrc === fallbackSrc && (
        <div 
          className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"
          title="Failed to load image"
        />
      )}
      
      {/* Actual image element */}
      <img 
        src={currentSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        loading={loading}
        decoding="async"
        width={width}
        height={height}
        className={`object-contain transition-all duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${
          currentSrc === fallbackSrc 
            ? 'border border-red-400/50' 
            : 'border border-gold/20'
        } rounded-lg`}
      />
    </div>
  );
};

export default SmartImage;