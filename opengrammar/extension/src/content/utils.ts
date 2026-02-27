/**
 * Debounce function to limit the rate of function execution
 */
export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(this: any, ...args: any[]) {
    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  } as T;
}

/**
 * Throttle function to ensure a function is called at most once per interval
 */
export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
  let inThrottle: boolean = false;
  
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  } as T;
}

/**
 * Generates a unique ID
 */
export function generateId(): string {
  return `og_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Escapes special regex characters in a string
 */
export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Checks if a string is likely a URL or email
 */
export function isUrlOrEmail(text: string): boolean {
  const urlRegex = /^https?:\/\/[^\s]+$/i;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const wwwRegex = /^www\.[^\s]+$/i;
  
  return urlRegex.test(text) || emailRegex.test(text) || wwwRegex.test(text);
}

/**
 * Gets the word at a specific position in text
 */
export function getWordAtPosition(text: string, position: number): { word: string; start: number; end: number } {
  if (position < 0 || position > text.length) {
    return { word: '', start: 0, end: 0 };
  }
  
  // Find word boundaries
  let start = position;
  let end = position;
  
  while (start > 0 && /\w/.test(text[start - 1])) {
    start--;
  }
  
  while (end < text.length && /\w/.test(text[end])) {
    end++;
  }
  
  return {
    word: text.substring(start, end),
    start,
    end,
  };
}

/**
 * Counts words in text
 */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Calculates reading time in seconds (average 200 words per minute)
 */
export function calculateReadingTime(text: string): number {
  const words = countWords(text);
  return Math.ceil((words / 200) * 60);
}
