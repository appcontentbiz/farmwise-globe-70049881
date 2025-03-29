
/**
 * Helper functions for managing local storage data in the Beginning Farming module
 */

// Keys for local storage
const STORAGE_KEYS = {
  FARMING_TYPES_INTEREST: 'farmingTypesInterest',
  FARMING_TYPES_NOTES: 'farmingTypesNotes',
  FARMING_GUIDE_PREFERENCES: 'farmingGuidePreferences',
  COMPLETED_STEPS: 'beginningFarmingCompletedSteps',
  TRACKING_DATA: 'beginningFarmingTrackingData',
  USER_PROGRESS: 'beginningFarmingUserProgress'
};

/**
 * Save data to local storage
 */
export function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

/**
 * Get data from local storage
 */
export function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
  } catch (error) {
    console.error('Error retrieving from localStorage:', error);
    return defaultValue;
  }
}

/**
 * Track a completed step
 */
export function trackCompletedStep(stepId: string): void {
  const completedSteps = getFromStorage<string[]>(STORAGE_KEYS.COMPLETED_STEPS, []);
  if (!completedSteps.includes(stepId)) {
    completedSteps.push(stepId);
    saveToStorage(STORAGE_KEYS.COMPLETED_STEPS, completedSteps);
  }
}

/**
 * Check if a step is completed
 */
export function isStepCompleted(stepId: string): boolean {
  const completedSteps = getFromStorage<string[]>(STORAGE_KEYS.COMPLETED_STEPS, []);
  return completedSteps.includes(stepId);
}

/**
 * Track user progress
 */
export interface ProgressEntry {
  date: string;
  category: string;
  value: number;
  notes?: string;
}

export function trackProgress(entry: ProgressEntry): void {
  const progressData = getFromStorage<ProgressEntry[]>(STORAGE_KEYS.USER_PROGRESS, []);
  progressData.push({
    ...entry,
    date: entry.date || new Date().toISOString().split('T')[0]
  });
  saveToStorage(STORAGE_KEYS.USER_PROGRESS, progressData);
}

/**
 * Get user progress data
 */
export function getProgressData(): ProgressEntry[] {
  return getFromStorage<ProgressEntry[]>(STORAGE_KEYS.USER_PROGRESS, []);
}

/**
 * Clear specific storage data
 */
export function clearStorageData(key: string): void {
  localStorage.removeItem(key);
}

/**
 * Clear all beginning farming module data
 */
export function clearAllBeginningFarmingData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}

// Export storage keys for use in components
export { STORAGE_KEYS };
