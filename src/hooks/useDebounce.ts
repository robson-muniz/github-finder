import { useEffect, useState } from 'react';

/**
 * Custom hook to debounce a value.
 * Useful for delaying API calls or expensive calculations until the user stops typing.
 *
 * @template T - The type of the value being debounced
 * @param {T} value - The value to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {[T]} - The debounced value inside an array (for consistency with other hooks or future expansion)
 */
export function useDebounce<T>(value: T, delay: number): [T] {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: Cancel the timer if the value or delay changes
    // This is crucial to prevent state updates on unmounted components and ensure only the latest value is processed
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debouncedValue];
}
