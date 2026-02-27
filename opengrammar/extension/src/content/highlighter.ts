import { Issue } from '../types';

export interface TooltipPosition {
  top: number;
  left: number;
  width: number;
}

/**
 * Creates an interactive tooltip for grammar issues
 */
export function createTooltip(
  issue: Issue,
  position: TooltipPosition,
  onApply: (suggestion: string) => void,
  onIgnore: (issueId: string) => void,
  onAddToDictionary: (word: string) => void
): HTMLElement {
  const tooltip = document.createElement('div');
  tooltip.className = 'opengrammar-tooltip';
  tooltip.style.cssText = `
    position: absolute;
    top: ${position.top + 8}px;
    left: ${position.left}px;
    max-width: 320px;
    min-width: 280px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
    z-index: 100001;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 13px;
    line-height: 1.5;
    overflow: hidden;
    animation: opengrammar-fade-in 0.15s ease-out;
  `;

  const typeColor = getTypeColor(issue.type);
  
  tooltip.innerHTML = `
    <div style="padding: 12px 14px; border-bottom: 1px solid #f3f4f6;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${typeColor};
        "></span>
        <span style="font-weight: 600; color: #1f2937; text-transform: capitalize;">${issue.type}</span>
      </div>
      <div style="color: #6b7280; margin-bottom: 8px;">${escapeHtml(issue.reason)}</div>
      <div style="
        background: #fef2f2;
        border-left: 3px solid ${typeColor};
        padding: 8px 10px;
        border-radius: 0 4px 4px 0;
      ">
        <span style="color: #dc2626; text-decoration: line-through;">${escapeHtml(issue.original)}</span>
        <span style="color: #9ca3af; margin: 0 6px;">→</span>
        <span style="color: #059669; font-weight: 500;">${escapeHtml(issue.suggestion)}</span>
      </div>
    </div>
    <div style="display: flex; border-top: 1px solid #f3f4f6;">
      <button class="opengrammar-apply-btn" style="
        flex: 1;
        padding: 10px 14px;
        background: #2563eb;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        transition: background 0.15s;
      ">
        Apply
      </button>
      <button class="opengrammar-ignore-btn" style="
        flex: 1;
        padding: 10px 14px;
        background: #ffffff;
        color: #6b7280;
        border: none;
        border-left: 1px solid #f3f4f6;
        cursor: pointer;
        font-size: 13px;
        transition: background 0.15s;
      ">
        Ignore
      </button>
      <button class="opengrammar-dictionary-btn" style="
        flex: 1;
        padding: 10px 14px;
        background: #ffffff;
        color: #6b7280;
        border: none;
        border-left: 1px solid #f3f4f6;
        cursor: pointer;
        font-size: 13px;
        transition: background 0.15s;
      ">
        Add to Dictionary
      </button>
    </div>
  `;

  // Add hover effects
  const applyBtn = tooltip.querySelector('.opengrammar-apply-btn') as HTMLButtonElement;
  const ignoreBtn = tooltip.querySelector('.opengrammar-ignore-btn') as HTMLButtonElement;
  const dictionaryBtn = tooltip.querySelector('.opengrammar-dictionary-btn') as HTMLButtonElement;

  applyBtn.addEventListener('mouseenter', () => {
    applyBtn.style.background = '#1d4ed8';
  });
  applyBtn.addEventListener('mouseleave', () => {
    applyBtn.style.background = '#2563eb';
  });

  ignoreBtn.addEventListener('mouseenter', () => {
    ignoreBtn.style.background = '#f9fafb';
  });
  ignoreBtn.addEventListener('mouseleave', () => {
    ignoreBtn.style.background = '#ffffff';
  });

  dictionaryBtn.addEventListener('mouseenter', () => {
    dictionaryBtn.style.background = '#f9fafb';
  });
  dictionaryBtn.addEventListener('mouseleave', () => {
    dictionaryBtn.style.background = '#ffffff';
  });

  // Event listeners
  applyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    onApply(issue.suggestion);
  });

  ignoreBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const issueId = issue.id || `${issue.type}-${issue.offset}-${issue.original}`;
    onIgnore(issueId);
  });

  dictionaryBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    // Extract the misspelled word from original
    const word = issue.original.trim().split(/\s+/)[0];
    if (word) {
      onAddToDictionary(word);
    }
  });

  return tooltip;
}

/**
 * Main highlighter function with interactive tooltips
 */
export function highlightIssues(element: HTMLElement, issues: Issue[]) {
  // Clear existing highlights
  const existingOverlay = document.getElementById('opengrammar-overlay');
  if (existingOverlay) existingOverlay.remove();

  // Remove any existing tooltips
  document.querySelectorAll('.opengrammar-tooltip').forEach((el) => el.remove());

  if (issues.length === 0) return;

  const overlay = document.createElement('div');
  overlay.id = 'opengrammar-overlay';
  overlay.style.position = 'absolute';
  overlay.style.pointerEvents = 'none';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.zIndex = '99999';

  document.body.appendChild(overlay);

  // Handle input/textarea differently
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    showFloatingIndicator(element, issues, overlay);
    return;
  }

  // For contenteditable elements, create interactive highlights
  issues.forEach((issue) => {
    if (issue.ignored) return; // Skip ignored issues

    try {
      const range = findRange(element, issue.original, issue.offset);
      if (range) {
        const rects = range.getClientRects();
        for (let i = 0; i < rects.length; i++) {
          const rect = rects[i];
          const highlight = createHighlight(
            rect,
            issue,
            element,
            range,
            overlay
          );
          overlay.appendChild(highlight);
        }
      }
    } catch (e) {
      console.warn('Could not highlight issue:', issue, e);
    }
  });
}

/**
 * Creates an interactive highlight element
 */
function createHighlight(
  rect: DOMRect,
  issue: Issue,
  element: HTMLElement,
  range: Range,
  overlay: HTMLElement
): HTMLElement {
  const highlight = document.createElement('div');
  highlight.className = 'opengrammar-highlight';
  highlight.style.cssText = `
    position: absolute;
    left: ${rect.left + window.scrollX}px;
    top: ${rect.bottom + window.scrollY - 2}px;
    width: ${rect.width}px;
    height: 3px;
    background-color: ${getColor(issue.type)};
    opacity: 0.8;
    cursor: pointer;
    border-radius: 2px;
    transition: opacity 0.15s, height 0.15s;
  `;

  let tooltip: HTMLElement | null = null;
  let tooltipTimeout: ReturnType<typeof setTimeout> | null = null;

  const showTooltip = () => {
    if (tooltip) return;

    const position = {
      top: rect.bottom + window.scrollY,
      left: Math.min(rect.left + window.scrollX, window.innerWidth - 340),
      width: rect.width,
    };

    tooltip = createTooltip(
      issue,
      position,
      // On Apply
      (suggestion) => {
        applySuggestion(element, range, suggestion, issue);
        hideTooltip();
        // Re-analyze after applying
        element.dispatchEvent(new Event('input', { bubbles: true }));
      },
      // On Ignore
      (issueId) => {
        ignoreIssue(issueId);
        hideTooltip();
        highlight.style.opacity = '0.3';
        highlight.style.textDecoration = 'line-through';
      },
      // On Add to Dictionary
      (word) => {
        addToDictionary(word);
        hideTooltip();
      }
    );

    document.body.appendChild(tooltip);

    // Close tooltip when clicking outside
    const closeOnOutsideClick = (e: MouseEvent) => {
      if (tooltip && !tooltip.contains(e.target as Node)) {
        hideTooltip();
        document.removeEventListener('click', closeOnOutsideClick);
      }
    };
    setTimeout(() => {
      document.addEventListener('click', closeOnOutsideClick);
    }, 100);
  };

  const hideTooltip = () => {
    if (tooltip) {
      tooltip.remove();
      tooltip = null;
    }
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
      tooltipTimeout = null;
    }
  };

  highlight.addEventListener('mouseenter', () => {
    tooltipTimeout = setTimeout(showTooltip, 200);
  });

  highlight.addEventListener('mouseleave', () => {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
      tooltipTimeout = null;
    }
    setTimeout(() => {
      if (tooltip && !tooltip.matches(':hover')) {
        hideTooltip();
      }
    }, 100);
  });

  highlight.addEventListener('click', (e) => {
    e.stopPropagation();
    showTooltip();
  });

  return highlight;
}

/**
 * Shows a floating indicator for input/textarea elements
 */
function showFloatingIndicator(element: HTMLElement, issues: Issue[], overlay: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const indicator = document.createElement('div');
  indicator.className = 'opengrammar-indicator';
  indicator.textContent = `${issues.length}`;
  indicator.style.cssText = `
    position: absolute;
    left: ${rect.right + window.scrollX - 30}px;
    top: ${rect.top + window.scrollY + 10}px;
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    z-index: 100000;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
    transition: transform 0.15s, box-shadow 0.15s;
  `;

  indicator.addEventListener('mouseenter', () => {
    indicator.style.transform = 'scale(1.1)';
    indicator.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.5)';
  });

  indicator.addEventListener('mouseleave', () => {
    indicator.style.transform = 'scale(1)';
    indicator.style.boxShadow = '0 2px 8px rgba(239, 68, 68, 0.4)';
  });

  // Show tooltip on click
  indicator.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Remove existing tooltips
    document.querySelectorAll('.opengrammar-tooltip').forEach((el) => el.remove());

    const position = {
      top: rect.bottom + window.scrollY,
      left: rect.right + window.scrollX - 320,
      width: 320,
    };

    // Show first issue or summary
    const summaryIssue: Issue = {
      type: 'style',
      original: `${issues.length} issue${issues.length > 1 ? 's' : ''} found`,
      suggestion: 'Review suggestions',
      reason: `Found ${issues.filter(i => i.type === 'grammar').length} grammar, ${issues.filter(i => i.type === 'spelling').length} spelling, and ${issues.filter(i => i.type === 'clarity' || i.type === 'style').length} style issues.`,
      offset: 0,
      length: 0,
    };

    const tooltip = createTooltip(
      summaryIssue,
      position,
      () => {},
      () => {},
      () => {}
    );

    // Add issue list
    const issueList = document.createElement('div');
    issueList.style.cssText = `
      max-height: 200px;
      overflow-y: auto;
      padding: 8px 0;
      border-top: 1px solid #f3f4f6;
    `;

    issues.slice(0, 5).forEach((issue, idx) => {
      const issueItem = document.createElement('div');
      issueItem.style.cssText = `
        padding: 8px 14px;
        cursor: pointer;
        transition: background 0.1s;
      `;
      issueItem.addEventListener('mouseenter', () => {
        issueItem.style.background = '#f9fafb';
      });
      issueItem.addEventListener('mouseleave', () => {
        issueItem.style.background = 'transparent';
      });
      issueItem.innerHTML = `
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
          <span style="color: ${getTypeColor(issue.type)}; font-weight: 600; text-transform: capitalize;">${issue.type}</span>
          <span style="color: #9ca3af;">•</span>
          <span style="color: #6b7280;">${escapeHtml(issue.original.substring(0, 30))}${issue.original.length > 30 ? '...' : ''}</span>
        </div>
      `;
      issueList.appendChild(issueItem);
    });

    if (issues.length > 5) {
      const moreItem = document.createElement('div');
      moreItem.style.cssText = `
        padding: 8px 14px;
        color: #6b7280;
        font-style: italic;
      `;
      moreItem.textContent = `+ ${issues.length - 5} more issues...`;
      issueList.appendChild(moreItem);
    }

    tooltip.appendChild(issueList);
    document.body.appendChild(tooltip);
  });

  overlay.appendChild(indicator);
}

/**
 * Applies a suggestion to the text
 */
function applySuggestion(element: HTMLElement, range: Range, suggestion: string, issue: Issue) {
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    const inputElement = element as HTMLInputElement | HTMLTextAreaElement;
    const text = inputElement.value;
    const before = text.substring(0, issue.offset);
    const after = text.substring(issue.offset + issue.length);
    inputElement.value = before + suggestion + after;
    inputElement.dispatchEvent(new Event('input', { bubbles: true }));
  } else if (element.isContentEditable) {
    // For contenteditable, use the range to replace text
    range.deleteContents();
    range.insertNode(document.createTextNode(suggestion));
    element.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

/**
 * Ignores an issue (stores in chrome.storage)
 */
function ignoreIssue(issueId: string) {
  chrome.storage.sync.get(['ignoredIssues'], (result) => {
    const ignoredIssues = result.ignoredIssues || [];
    if (!ignoredIssues.includes(issueId)) {
      ignoredIssues.push(issueId);
      chrome.storage.sync.set({ ignoredIssues });
    }
  });
}

/**
 * Adds a word to the user's dictionary
 */
function addToDictionary(word: string) {
  chrome.storage.sync.get(['dictionary'], (result) => {
    const dictionary = result.dictionary || [];
    if (!dictionary.includes(word.toLowerCase())) {
      dictionary.push(word.toLowerCase());
      chrome.storage.sync.set({ dictionary });
    }
  });
}

/**
 * Gets color based on issue type
 */
function getColor(type: string): string {
  switch (type) {
    case 'grammar': return '#ef4444';
    case 'spelling': return '#ef4444';
    case 'clarity': return '#f59e0b';
    case 'style': return '#3b82f6';
    default: return '#ef4444';
  }
}

/**
 * Gets type color for indicators
 */
function getTypeColor(type: string): string {
  return getColor(type);
}

/**
 * Finds a range in the DOM for highlighting
 */
function findRange(root: HTMLElement, textToFind: string, startOffset: number): Range | null {
  if (root.tagName === 'TEXTAREA' || root.tagName === 'INPUT') {
    return null;
  }

  const range = document.createRange();
  const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

  let currentNode: Node | null = treeWalker.nextNode();
  let currentOffset = 0;

  while (currentNode) {
    const nodeLength = currentNode.textContent?.length || 0;

    if (currentOffset + nodeLength > startOffset) {
      const startInNode = startOffset - currentOffset;

      if (startInNode + textToFind.length <= nodeLength) {
        range.setStart(currentNode, startInNode);
        range.setEnd(currentNode, startInNode + textToFind.length);
        return range;
      } else {
        range.setStart(currentNode, startInNode);
        range.setEnd(currentNode, nodeLength);
        return range;
      }
    }

    currentOffset += nodeLength;
    currentNode = treeWalker.nextNode();
  }

  return null;
}

/**
 * Escapes HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
