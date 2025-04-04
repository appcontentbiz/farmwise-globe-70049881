
// Utility functions for handling network state and offline/online transitions

/**
 * Check if the browser is currently online
 */
export const isOnline = (): boolean => {
  return navigator.onLine;
};

/**
 * Register callbacks for online and offline events
 * @param onOnline Function to call when the application comes online
 * @param onOffline Function to call when the application goes offline
 * @returns Cleanup function to remove event listeners
 */
export const registerNetworkListeners = (
  onOnline: () => void,
  onOffline: () => void
): (() => void) => {
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
};

/**
 * Create a debounced version of a function
 * @param func The function to debounce
 * @param delay Delay in milliseconds
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function(...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Check if IndexedDB is available in the browser
 */
export const isIndexedDBAvailable = (): boolean => {
  try {
    return !!window.indexedDB;
  } catch (e) {
    return false;
  }
};

/**
 * Check if localStorage is available in the browser
 */
export const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Simple function to create a unique ID for offline data
 */
export const generateOfflineId = (): string => {
  return `offline-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
