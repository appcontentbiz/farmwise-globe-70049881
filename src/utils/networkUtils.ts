
import { useState, useEffect } from 'react';

/**
 * Utility to check if the browser is currently online
 */
export const isOnline = (): boolean => {
  return navigator.onLine;
};

/**
 * Register callbacks for online and offline events with debouncing
 * and reliability improvements
 */
export const registerNetworkListeners = (
  onOnline: () => void,
  onOffline: () => void,
  debounceMs: number = 1000
): (() => void) => {
  let onlineTimer: number | null = null;
  let offlineTimer: number | null = null;
  let pingInterval: number | null = null;
  
  // Function to check actual connectivity by sending a tiny request
  const checkRealConnectivity = async (): Promise<boolean> => {
    try {
      // Use favicon or a small endpoint that's guaranteed to exist
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('/favicon.ico', { 
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-store',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return true;
    } catch (error) {
      return false;
    }
  };
  
  const handleOnline = async () => {
    if (offlineTimer) window.clearTimeout(offlineTimer);
    if (onlineTimer) window.clearTimeout(onlineTimer);
    
    onlineTimer = window.setTimeout(async () => {
      // Double check we're really online
      const isReallyOnline = await checkRealConnectivity();
      if (isReallyOnline) {
        onOnline();
      } else {
        // Browser thinks we're online but we can't reach the server
        // Wait a bit and try to reconnect
        setTimeout(handleOnline, 3000);
      }
      onlineTimer = null;
    }, debounceMs);
  };
  
  const handleOffline = () => {
    if (onlineTimer) window.clearTimeout(onlineTimer);
    if (offlineTimer) window.clearTimeout(offlineTimer);
    
    offlineTimer = window.setTimeout(() => {
      onOffline();
      offlineTimer = null;
    }, debounceMs);
  };
  
  // Set up ping to periodically check connectivity
  pingInterval = window.setInterval(async () => {
    const online = await checkRealConnectivity();
    if (online && !navigator.onLine) {
      // We're actually online but browser thinks we're offline
      handleOnline();
    } else if (!online && navigator.onLine) {
      // We're actually offline but browser thinks we're online
      handleOffline();
    }
  }, 30000); // Check every 30 seconds
  
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  return () => {
    if (onlineTimer) window.clearTimeout(onlineTimer);
    if (offlineTimer) window.clearTimeout(offlineTimer);
    if (pingInterval) window.clearInterval(pingInterval);
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

/**
 * Utility to throttle function calls
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let lastFunc: number;
  let lastRan: number;
  
  return function(...args: Parameters<T>) {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = window.setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

/**
 * More robust online/offline detection that handles edge cases
 */
export function useNetworkStatus(initialState: boolean = navigator.onLine) {
  const [isOnline, setIsOnline] = useState(initialState);
  const [lastChange, setLastChange] = useState(Date.now());
  
  useEffect(() => {
    // Add a stabilization period to avoid quick state changes
    const handleOnline = () => {
      // Only update if we've been in the previous state for at least 2 seconds
      if (Date.now() - lastChange > 2000) {
        setIsOnline(true);
        setLastChange(Date.now());
      }
    };
    
    const handleOffline = () => {
      // Only update if we've been in the previous state for at least 2 seconds
      if (Date.now() - lastChange > 2000) {
        setIsOnline(false);
        setLastChange(Date.now());
      }
    };
    
    const cleanup = registerNetworkListeners(handleOnline, handleOffline, 1500);
    
    // Initialize with a check but don't immediately change state
    checkRealConnectivity().then(online => {
      if (online !== isOnline) {
        // Only update if actual connectivity differs from current state
        setIsOnline(online);
        setLastChange(Date.now());
      }
    });
    
    return cleanup;
  }, [lastChange, isOnline]);
  
  return isOnline;
}

/**
 * Check real connectivity by sending a tiny request
 */
export const checkRealConnectivity = async (): Promise<boolean> => {
  try {
    // Use favicon or a small endpoint that's guaranteed to exist
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch('/favicon.ico', { 
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return true;
  } catch (error) {
    return false;
  }
};
