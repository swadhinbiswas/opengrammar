import { Issue } from '../types';

let currentTooltip: HTMLElement | null = null;

/**
 * Grammarly-style highlighter
 * Shows underlines and clickable popups with suggestions
 */
export function highlightIssues(element: HTMLElement, issues: Issue[]) {
  // Clear existing highlights
  clearHighlights();

  if (issues.length === 0) return;

  // For input/textarea, show badge instead of inline highlights
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    showInputBadge(element, issues);
    return;
  }

  // For contenteditable, create inline highlights
  issues.forEach((issue, issueIndex) => {
    if (issue.ignored) return;

    try {
      const range = findTextRange(element, issue.original, issue.offset);
      if (range) {
        createHighlight(range, issue, element, issueIndex);
      }
    } catch (e) {
      console.debug('Could not create highlight:', issue, e);
    }
  });
}

/**
 * Clear all OpenGrammar highlights and tooltips
 */
export function clearHighlights() {
  // Remove all highlights
  document.querySelectorAll('.opengrammar-highlight').forEach(el => el.remove());
  // Remove all tooltips
  document.querySelectorAll('.opengrammar-tooltip').forEach(el => el.remove());
  currentTooltip = null;
}

/**
 * Create a Grammarly-style underline highlight
 */
function createHighlight(range: Range, issue: Issue, element: HTMLElement, issueIndex: number) {
  const rects = range.getClientRects();
  
  for (let i = 0; i < rects.length; i++) {
    const rect = rects[i];
    
    // Create underline
    const underline = document.createElement('div');
    underline.className = 'opengrammar-highlight';
    underline.style.cssText = `
      position: absolute;
      left: ${rect.left + window.scrollX}px;
      top: ${rect.bottom + window.scrollY - 2}px;
      width: ${rect.width}px;
      height: 3px;
      background-color: ${getColor(issue.type)};
      cursor: pointer;
      border-radius: 2px;
      z-index: 10000;
      transition: opacity 0.2s;
    `;
    
    // Store issue data
    (underline as any).__opengrammar_issue = issue;
    (underline as any).__opengrammar_element = element;
    
    // Click to show tooltip
    underline.addEventListener('click', (e) => {
      e.stopPropagation();
      showTooltip(underline, issue, element);
    });
    
    // Hover to show tooltip (after 500ms)
    let hoverTimeout: any;
    underline.addEventListener('mouseenter', () => {
      hoverTimeout = setTimeout(() => {
        showTooltip(underline, issue, element);
      }, 500);
    });
    underline.addEventListener('mouseleave', () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    });
    
    document.body.appendChild(underline);
  }
}

/**
 * Show Grammarly-style tooltip popup
 */
function showTooltip(anchor: HTMLElement, issue: Issue, element: HTMLElement) {
  // Remove existing tooltip
  if (currentTooltip) {
    currentTooltip.remove();
  }

  const anchorRect = anchor.getBoundingClientRect();
  
  // Create tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'opengrammar-tooltip';
  tooltip.style.cssText = `
    position: absolute;
    left: ${Math.min(anchorRect.left + window.scrollX, window.innerWidth - 320)}px;
    top: ${anchorRect.bottom + window.scrollY + 8}px;
    width: 300px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    z-index: 100001;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 13px;
    overflow: hidden;
    animation: opengrammar-slide-up 0.2s ease-out;
  `;

  const typeColor = getColor(issue.type);
  const typeLabel = issue.type.charAt(0).toUpperCase() + issue.type.slice(1);

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
        <span style="font-weight: 600; color: #1f2937;">${typeLabel}</span>
      </div>
      <div style="color: #6b7280; margin-bottom: 10px; line-height: 1.4;">${escapeHtml(issue.reason)}</div>
      <div style="
        background: #f9fafb;
        border-radius: 6px;
        padding: 10px 12px;
      ">
        <div style="margin-bottom: 6px;">
          <span style="color: #dc2626; text-decoration: line-through;">${escapeHtml(issue.original)}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: #9ca3af;">→</span>
          <span style="color: #059669; font-weight: 600;">${escapeHtml(issue.suggestion)}</span>
        </div>
      </div>
    </div>
    <div style="display: flex; border-top: 1px solid #e5e7eb;">
      <button class="og-apply-btn" style="
        flex: 1;
        padding: 10px;
        background: #2563eb;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        transition: background 0.15s;
      ">
        ✓ Apply
      </button>
      <button class="og-ignore-btn" style="
        flex: 1;
        padding: 10px;
        background: #ffffff;
        color: #6b7280;
        border: none;
        border-left: 1px solid #e5e7eb;
        cursor: pointer;
        font-size: 13px;
        transition: background 0.15s;
      ">
        ✕ Ignore
      </button>
    </div>
  `;

  // Add event listeners
  const applyBtn = tooltip.querySelector('.og-apply-btn') as HTMLButtonElement;
  const ignoreBtn = tooltip.querySelector('.og-ignore-btn') as HTMLButtonElement;

  applyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    applySuggestion(element, issue);
    hideTooltip();
  });

  ignoreBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    ignoreIssue(issue);
    hideTooltip();
    anchor.style.opacity = '0.3';
  });

  // Button hover effects
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

  // Close tooltip when clicking outside
  const closeOnOutsideClick = (e: MouseEvent) => {
    if (!tooltip.contains(e.target as Node) && !anchor.contains(e.target as Node)) {
      hideTooltip();
      document.removeEventListener('click', closeOnOutsideClick);
    }
  };

  setTimeout(() => {
    document.addEventListener('click', closeOnOutsideClick);
  }, 100);

  document.body.appendChild(tooltip);
  currentTooltip = tooltip;
}

/**
 * Hide current tooltip
 */
function hideTooltip() {
  if (currentTooltip) {
    currentTooltip.remove();
    currentTooltip = null;
  }
}

/**
 * Apply suggestion to text
 */
function applySuggestion(element: HTMLElement, issue: Issue) {
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    const input = element as HTMLInputElement | HTMLTextAreaElement;
    const text = input.value;
    const before = text.substring(0, issue.offset);
    const after = text.substring(issue.offset + issue.length);
    input.value = before + issue.suggestion + after;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  } else if (element.isContentEditable) {
    // For contenteditable, we need to find and replace the text
    const range = findTextRange(element, issue.original, issue.offset);
    if (range) {
      range.deleteContents();
      range.insertNode(document.createTextNode(issue.suggestion));
      element.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  // Trigger re-analysis
  setTimeout(() => {
    element.dispatchEvent(new Event('input', { bubbles: true }));
  }, 100);
}

/**
 * Ignore an issue
 */
function ignoreIssue(issue: Issue) {
  chrome.storage.sync.get(['ignoredIssues'], (result) => {
    const ignoredIssues = result.ignoredIssues || [];
    const issueId = `${issue.type}-${issue.offset}-${issue.original}`;
    if (!ignoredIssues.includes(issueId)) {
      ignoredIssues.push(issueId);
      chrome.storage.sync.set({ ignoredIssues });
    }
  });
}

/**
 * Show badge for input/textarea elements
 */
function showInputBadge(element: HTMLElement, issues: Issue[]) {
  const rect = element.getBoundingClientRect();
  
  const badge = document.createElement('div');
  badge.className = 'opengrammar-badge';
  badge.style.cssText = `
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
    z-index: 10000;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
    transition: transform 0.2s;
  `;
  
  badge.textContent = issues.length.toString();
  
  badge.addEventListener('mouseenter', () => {
    badge.style.transform = 'scale(1.1)';
  });
  badge.addEventListener('mouseleave', () => {
    badge.style.transform = 'scale(1)';
  });
  
  badge.addEventListener('click', (e) => {
    e.stopPropagation();
    // Show first issue as tooltip
    if (issues.length > 0) {
      showTooltip(badge, issues[0], element);
    }
  });
  
  document.body.appendChild(badge);
}

/**
 * Get color based on issue type
 */
function getColor(type: string): string {
  switch (type) {
    case 'grammar': return '#ef4444'; // Red
    case 'spelling': return '#ef4444'; // Red
    case 'clarity': return '#f59e0b'; // Amber
    case 'style': return '#3b82f6'; // Blue
    default: return '#ef4444';
  }
}

/**
 * Find text range in DOM
 */
function findTextRange(root: HTMLElement, textToFind: string, startOffset: number): Range | null {
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
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Add CSS animation
if (!document.getElementById('opengrammar-styles')) {
  const style = document.createElement('style');
  style.id = 'opengrammar-styles';
  style.textContent = `
    @keyframes opengrammar-slide-up {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes opengrammar-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}
