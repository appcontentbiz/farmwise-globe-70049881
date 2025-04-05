
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
  debounceMs: number = 2000 // Increased default debounce time
): (() => void) => {
  let onlineTimer: number | null = null;
  let offlineTimer: number | null = null;
  let pingInterval: number | null = null;
  let consecutiveFailures = 0;
  let consecutiveSuccesses = 0;
  
  // Function to check actual connectivity by sending a tiny request
  const checkRealConnectivity = async (): Promise<boolean> => {
    try {
      // Use favicon or a small endpoint that's guaranteed to exist
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // Increased timeout
      
      const response = await fetch('/favicon.ico', { 
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-store',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      consecutiveSuccesses++;
      consecutiveFailures = 0;
      return true;
    } catch (error) {
      consecutiveFailures++;
      consecutiveSuccesses = 0;
      return false;
    }
  };
  
  const handleOnline = async () => {
    if (offlineTimer) window.clearTimeout(offlineTimer);
    if (onlineTimer) window.clearTimeout(onlineTimer);
    
    onlineTimer = window.setTimeout(async () => {
      // Double check we're really online, require multiple successes
      const isReallyOnline = await checkRealConnectivity();
      if (isReallyOnline && consecutiveSuccesses >= 2) {
        onOnline();
      } else {
        // Browser thinks we're online but we can't reach the server
        // Wait a bit and try to reconnect with backoff
        const backoff = Math.min(10000, 1000 * Math.pow(2, consecutiveFailures));
        setTimeout(handleOnline, backoff);
      }
      onlineTimer = null;
    }, debounceMs);
  };
  
  const handleOffline = () => {
    if (onlineTimer) window.clearTimeout(onlineTimer);
    if (offlineTimer) window.clearTimeout(offlineTimer);
    
    offlineTimer = window.setTimeout(() => {
      // Only consider offline if we've had multiple consecutive failures
      if (consecutiveFailures >= 2) {
        onOffline();
      }
      offlineTimer = null;
    }, debounceMs);
  };
  
  // Set up ping to periodically check connectivity, but with less frequency
  pingInterval = window.setInterval(async () => {
    const online = await checkRealConnectivity();
    if (online && consecutiveSuccesses >= 2 && !navigator.onLine) {
      // We're actually online but browser thinks we're offline
      handleOnline();
    } else if (!online && consecutiveFailures >= 2 && navigator.onLine) {
      // We're actually offline but browser thinks we're online
      handleOffline();
    }
  }, 60000); // Increased to check every 60 seconds
  
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  // Initial connectivity check
  checkRealConnectivity().then((isConnected) => {
    if (isConnected !== navigator.onLine) {
      if (isConnected) {
        handleOnline();
      } else {
        handleOffline();
      }
    }
  });
  
  return () => {
    if (onlineTimer) window.clearTimeout(onlineTimer);
    if (offlineTimer) window.clearTimeout(offlineTimer);
    if (pingInterval) window.clearInterval(pingInterval);
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

/**
 * Utility to throttle function calls with increased limits
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
 * with increased stability requirements
 */
export function useNetworkStatus(initialState: boolean = navigator.onLine) {
  const [isOnline, setIsOnline] = useState(initialState);
  const [lastChange, setLastChange] = useState(Date.now());
  const consecutiveStateRef = useState<{online: number, offline: number}>({online: 0, offline: 0});
  
  useEffect(() => {
    // Add a stabilization period to avoid quick state changes
    const handleOnline = () => {
      // Only update if we've been in the previous state for at least 5 seconds
      if (Date.now() - lastChange > 5000) {
        // Require consecutive online states before changing
        consecutiveStateRef[0].online++;
        consecutiveStateRef[0].offline = 0;
        
        if (consecutiveStateRef[0].online >= 2) {
          setIsOnline(true);
          setLastChange(Date.now());
        }
      }
    };
    
    const handleOffline = () => {
      // Only update if we've been in the previous state for at least 5 seconds
      if (Date.now() - lastChange > 5000) {
        // Require consecutive offline states before changing
        consecutiveStateRef[0].offline++;
        consecutiveStateRef[0].online = 0;
        
        if (consecutiveStateRef[0].offline >= 2) {
          setIsOnline(false);
          setLastChange(Date.now());
        }
      }
    };
    
    const cleanup = registerNetworkListeners(handleOnline, handleOffline, 3000);
    
    // Initialize with a check but don't immediately change state
    checkRealConnectivity().then(online => {
      if (online !== isOnline && Math.abs(Date.now() - lastChange) > 5000) {
        // Only update if actual connectivity differs from current state
        // and we haven't changed state recently
        setIsOnline(online);
        setLastChange(Date.now());
      }
    });
    
    return cleanup;
  }, [lastChange, isOnline, consecutiveStateRef]);
  
  return isOnline;
}

/**
 * Check real connectivity by sending a tiny request
 * with improved error handling and timeout
 */
export const checkRealConnectivity = async (): Promise<boolean> => {
  try {
    // Use favicon or a small endpoint that's guaranteed to exist
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // Increased timeout
    
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
