
/**
 * Utility to check if the browser is currently online
 */
export const isOnline = (): boolean => {
  return navigator.onLine;
};

/**
 * Register callbacks for online and offline events with debouncing
 */
export const registerNetworkListeners = (
  onOnline: () => void,
  onOffline: () => void,
  debounceMs: number = 1000
): (() => void) => {
  let onlineTimer: number | null = null;
  let offlineTimer: number | null = null;
  
  const handleOnline = () => {
    if (offlineTimer) window.clearTimeout(offlineTimer);
    if (onlineTimer) window.clearTimeout(onlineTimer);
    
    onlineTimer = window.setTimeout(() => {
      onOnline();
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
  
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  return () => {
    if (onlineTimer) window.clearTimeout(onlineTimer);
    if (offlineTimer) window.clearTimeout(offlineTimer);
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
