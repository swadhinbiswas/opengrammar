/**
 * Extracts text from an editable element
 * Handles input, textarea, and contenteditable elements
 */
export function extractText(element: HTMLElement): string {
  if (!element) return '';
  
  if (element.tagName === 'INPUT') {
    return (element as HTMLInputElement).value;
  }
  
  if (element.tagName === 'TEXTAREA') {
    return (element as HTMLTextAreaElement).value;
  }
  
  if (element.isContentEditable) {
    // For contenteditable, use innerText for better text representation
    // This handles line breaks and formatting better than textContent
    return element.innerText || element.textContent || '';
  }
  
  // Check for role="textbox"
  if (element.getAttribute('role') === 'textbox') {
    return element.getAttribute('aria-valuetext') || element.innerText || '';
  }
  
  return '';
}

/**
 * Gets the HTMLElement from an event target
 * Handles shadow DOM and other edge cases
 */
export function getElementFromTarget(target: EventTarget | null): HTMLElement | null {
  if (!target) return null;
  
  if (target instanceof HTMLElement) {
    return target;
  }
  
  return null;
}

/**
 * Gets the caret position within an editable element
 */
export function getCaretPosition(element: HTMLElement): number {
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    return (element as HTMLInputElement | HTMLTextAreaElement).selectionStart || 0;
  }
  
  if (element.isContentEditable) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return 0;
    
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    
    return preCaretRange.toString().length;
  }
  
  return 0;
}

/**
 * Sets the caret position within an editable element
 */
export function setCaretPosition(element: HTMLElement, position: number) {
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    (element as HTMLInputElement | HTMLTextAreaElement).setSelectionRange(position, position);
    return;
  }
  
  if (element.isContentEditable) {
    const range = document.createRange();
    const selection = window.getSelection();
    
    if (!selection) return;
    
    // Find the node and offset for the position
    let currentPos = 0;
    const treeWalker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    
    let node: Node | null = treeWalker.nextNode();
    while (node) {
      const nodeLength = node.textContent?.length || 0;
      
      if (currentPos + nodeLength >= position) {
        range.setStart(node, position - currentPos);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        return;
      }
      
      currentPos += nodeLength;
      node = treeWalker.nextNode();
    }
  }
}

/**
 * Checks if an element is visible and in the viewport
 */
export function isElementVisible(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element);
  
  // Check if element is hidden
  if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
    return false;
  }
  
  // Check if element is in viewport
  const rect = element.getBoundingClientRect();
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  
  return (
    rect.top >= -rect.height &&
    rect.left >= -rect.width &&
    rect.bottom <= viewportHeight + rect.height &&
    rect.right <= viewportWidth + rect.width
  );
}

/**
 * Gets the visible text ranges in an element
 * Useful for complex contenteditable elements with nested structures
 */
export function getVisibleTextRanges(element: HTMLElement): Array<{ text: string; start: number; end: number; rect: DOMRect }> {
  const ranges: Array<{ text: string; start: number; end: number; rect: DOMRect }> = [];
  let currentOffset = 0;
  
  const treeWalker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  
  let node: Node | null = treeWalker.nextNode();
  while (node) {
    const text = node.textContent || '';
    if (text.trim().length > 0) {
      const range = document.createRange();
      range.selectNodeContents(node);
      const rect = range.getBoundingClientRect();
      
      // Only include visible text
      if (rect.width > 0 && rect.height > 0) {
        ranges.push({
          text,
          start: currentOffset,
          end: currentOffset + text.length,
          rect,
        });
      }
    }
    
    currentOffset += text.length;
    node = treeWalker.nextNode();
  }
  
  return ranges;
}
