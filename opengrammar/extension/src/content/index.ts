import { debounce } from './utils';
import { extractText, getElementFromTarget } from './textExtractor';
import { highlightIssues } from './highlighter';

interface EditableElement {
  element: HTMLElement;
  observer?: MutationObserver;
  lastText: string;
}

const activeElements = new Map<HTMLElement, EditableElement>();
let currentFocusElement: HTMLElement | null = null;

/**
 * Initialize the content script
 */
function initialize() {
  // Listen for focus events on editable elements
  document.addEventListener('focusin', handleFocusIn, true);
  document.addEventListener('focusout', handleFocusOut, true);
  
  // Handle scroll events to reposition highlights
  window.addEventListener('scroll', handleScroll, true);
  window.addEventListener('resize', handleScroll, true);
  
  // Check for already focused elements on page load
  checkExistingFocusedElement();
  
  console.log('OpenGrammar content script initialized');
}

/**
 * Check for already focused elements on page load
 */
function checkExistingFocusedElement() {
  const activeElement = document.activeElement as HTMLElement;
  if (activeElement && isEditable(activeElement)) {
    activateElement(activeElement);
  }
}

/**
 * Handle focus in event
 */
function handleFocusIn(event: FocusEvent) {
  const target = getElementFromTarget(event.target);
  if (target && isEditable(target)) {
    activateElement(target);
  }
}

/**
 * Handle focus out event
 */
function handleFocusOut(event: FocusEvent) {
  const target = getElementFromTarget(event.target);
  if (target && activeElements.has(target)) {
    // Delay deactivation to allow for new focus
    setTimeout(() => {
      if (document.activeElement !== target) {
        deactivateElement(target);
      }
    }, 100);
  }
}

/**
 * Handle scroll event to update highlight positions
 */
const handleScroll = debounce(() => {
  // Highlights are positioned absolutely, so they should scroll with the page
  // This is handled by the highlighter, but we can trigger re-analysis if needed
}, 100);

/**
 * Activate an editable element for grammar checking
 */
function activateElement(element: HTMLElement) {
  if (activeElements.has(element)) {
    return; // Already active
  }

  currentFocusElement = element;
  
  const editableElement: EditableElement = {
    element,
    lastText: extractText(element),
  };

  // Set up mutation observer for contenteditable elements
  if (element.isContentEditable && element.tagName !== 'INPUT' && element.tagName !== 'TEXTAREA') {
    const observer = new MutationObserver(debounce(() => {
      const newText = extractText(element);
      if (newText !== editableElement.lastText) {
        editableElement.lastText = newText;
        debouncedCheck(element);
      }
    }, 500));

    observer.observe(element, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    editableElement.observer = observer;
  }

  // Also listen for input events
  element.addEventListener('input', handleInput as EventListener);
  
  activeElements.set(element, editableElement);
  
  // Initial check
  debouncedCheck(element);
}

/**
 * Deactivate an editable element
 */
function deactivateElement(element: HTMLElement) {
  const editableElement = activeElements.get(element);
  if (!editableElement) return;

  // Disconnect observer
  if (editableElement.observer) {
    editableElement.observer.disconnect();
  }

  // Remove event listeners
  element.removeEventListener('input', handleInput as EventListener);
  
  // Clear highlights
  const existingOverlay = document.getElementById('opengrammar-overlay');
  if (existingOverlay) {
    existingOverlay.remove();
  }

  activeElements.delete(element);
  
  if (currentFocusElement === element) {
    currentFocusElement = null;
  }
}

/**
 * Handle input event
 */
function handleInput(event: Event) {
  const target = getElementFromTarget(event.target);
  if (target && activeElements.has(target)) {
    const editableElement = activeElements.get(target)!;
    editableElement.lastText = extractText(target);
    debouncedCheck(target);
  }
}

/**
 * Check grammar for an element
 */
const checkGrammar = async (element: HTMLElement) => {
  if (!activeElements.has(element)) return;

  const text = extractText(element);
  
  // Skip very short text
  if (!text || text.trim().length < 5) {
    // Clear highlights for short text
    const existingOverlay = document.getElementById('opengrammar-overlay');
    if (existingOverlay) existingOverlay.remove();
    return;
  }

  try {
    const response = await chrome.runtime.sendMessage({
      type: 'CHECK_GRAMMAR',
      text,
    });

    if (response && response.issues) {
      highlightIssues(element, response.issues);
    }
    
    if (response && response.error) {
      showNotification(response.error, 'error');
    }
  } catch (err) {
    console.error('Error checking grammar', err);
    showNotification('Failed to check grammar. Is the backend running?', 'error');
  }
};

const debouncedCheck = debounce(checkGrammar, 800);

/**
 * Check if an element is editable
 */
function isEditable(el: HTMLElement): boolean {
  if (!el) return false;
  
  // Check for input/textarea
  if (el.tagName === 'INPUT' && !['button', 'submit', 'reset', 'image', 'checkbox', 'radio'].includes((el as HTMLInputElement).type)) {
    return true;
  }
  if (el.tagName === 'TEXTAREA') {
    return true;
  }
  
  // Check for contenteditable
  if (el.isContentEditable) {
    return true;
  }
  
  // Check for role attribute indicating editability
  const role = el.getAttribute('role');
  if (role === 'textbox') {
    return true;
  }
  
  return false;
}

/**
 * Show a notification to the user
 */
function showNotification(message: string, type: 'error' | 'warning' | 'info') {
  // Remove existing notifications
  const existing = document.getElementById('opengrammar-notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.id = 'opengrammar-notification';
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    max-width: 400px;
    padding: 12px 16px;
    background: ${type === 'error' ? '#dc2626' : type === 'warning' ? '#f59e0b' : '#2563eb'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 100002;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    animation: opengrammar-slide-in 0.3s ease-out;
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes opengrammar-fade-in {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes opengrammar-slide-in {
    from { opacity: 0; transform: translateX(100%); }
    to { opacity: 1; transform: translateX(0); }
  }
`;
document.head.appendChild(style);

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}
