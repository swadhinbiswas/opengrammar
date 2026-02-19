import { debounce } from './utils';
import { extractText } from './textExtractor';
import { highlightIssues } from './highlighter';

let activeElement: HTMLElement | null = null;

document.addEventListener('focusin', (e) => {
  const target = e.target as HTMLElement;
  if (isEditable(target)) {
    activeElement = target;
    // Attach input listener
    target.addEventListener('input', debouncedCheck);
  }
});

document.addEventListener('focusout', (e) => {
  const target = e.target as HTMLElement;
  if (target === activeElement) {
    target.removeEventListener('input', debouncedCheck);
    activeElement = null;
    // Clear highlights
  }
});

const checkGrammar = async () => {
  if (!activeElement) return;

  const text = extractText(activeElement);
  if (!text || text.trim().length < 5) return;

  try {
    const response = await chrome.runtime.sendMessage({
      type: 'CHECK_GRAMMAR',
      text,
    });

    if (response && response.issues) {
      highlightIssues(activeElement, response.issues);
    }
  } catch (err) {
    console.error('Error checking grammar', err);
  }
};

const debouncedCheck = debounce(checkGrammar, 1000);

function isEditable(el: HTMLElement): boolean {
  return (
    el.tagName === 'TEXTAREA' ||
    el.tagName === 'INPUT' ||
    el.isContentEditable
  );
}
