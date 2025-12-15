import { useEffect } from 'react';

/**
 * Hook to sync values from localStorage on mount
 * @param key - localStorage key
 * @param setValue - Function to set the value in state
 * @param defaultValue - Default value if localStorage is empty
 */
export function useLocalStorage<T>(
  key: string,
  setValue: (value: T) => void,
  defaultValue: T
): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        setValue(parsed);
      } catch {
        // If parsing fails, use default
        setValue(defaultValue);
      }
    }
  }, [key, setValue, defaultValue]);
}

/**
 * Hook to save values to localStorage whenever they change
 * @param key - localStorage key
 * @param value - Value to save
 */
export function useSaveToLocalStorage<T>(key: string, value: T): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
}

