import { useEffect, useCallback, useRef } from "react";

/**
 * Custom hook for persisting form data to localStorage
 * Automatically saves form data and restores it on component mount
 *
 * @param {string} key - Unique localStorage key for this form
 * @param {Object} formData - Current form data object
 * @param {Function} setFormData - Function to update form data
 * @param {boolean} isOpen - Whether the modal/form is open
 * @param {number} debounceMs - Debounce delay in milliseconds (default: 500ms)
 */
export const useFormPersistence = (
  key,
  formData,
  setFormData,
  isOpen,
  debounceMs = 500,
) => {
  const timeoutRef = useRef(null);
  const hasLoadedRef = useRef(false);

  // Load persisted data on mount or when modal opens
  useEffect(() => {
    if (isOpen && !hasLoadedRef.current) {
      try {
        const savedData = localStorage.getItem(key);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          const savedTimestamp = parsedData._timestamp;
          const currentTime = Date.now();

          // Check if data is less than 24 hours old
          const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
          if (savedTimestamp && currentTime - savedTimestamp < maxAge) {
            // Remove metadata before setting form data
            const { _timestamp, ...formDataOnly } = parsedData;
            setFormData((prev) => ({
              ...prev,
              ...formDataOnly,
            }));
            // console.log(`[Form Persistence] Restored form data from ${key}`);
          } else {
            // Data is too old, clear it
            localStorage.removeItem(key);
            // console.log(`[Form Persistence] Cleared expired data from ${key}`);
          }
        }
        hasLoadedRef.current = true;
      } catch (error) {
        // console.error(`[Form Persistence] Error loading data from ${key}:`, error);
        // If there's an error parsing, clear the corrupted data
        localStorage.removeItem(key);
      }
    }
  }, [isOpen, key, setFormData]);

  // Save form data to localStorage with debouncing
  const saveToLocalStorage = useCallback(() => {
    try {
      const dataToSave = {
        ...formData,
        _timestamp: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(dataToSave));
      // console.log(`[Form Persistence] Saved form data to ${key}`);
    } catch (error) {
      // console.error(`[Form Persistence] Error saving data to ${key}:`, error);
    }
  }, [formData, key]);

  // Debounced save effect
  useEffect(() => {
    if (isOpen && hasLoadedRef.current) {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout for debounced save
      timeoutRef.current = setTimeout(() => {
        saveToLocalStorage();
      }, debounceMs);

      // Cleanup timeout on unmount or dependency change
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [formData, isOpen, saveToLocalStorage, debounceMs]);

  // Clear persisted data
  const clearPersistedData = useCallback(() => {
    try {
      localStorage.removeItem(key);
      hasLoadedRef.current = false;
      // console.log(`[Form Persistence] Cleared form data from ${key}`);
    } catch (error) {
      // console.error(`[Form Persistence] Error clearing data from ${key}:`, error);
    }
  }, [key]);

  // Save immediately (for emergency situations)
  const saveImmediately = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    saveToLocalStorage();
  }, [saveToLocalStorage]);

  return {
    clearPersistedData,
    saveImmediately,
  };
};

export default useFormPersistence;
