import { Issue } from '../types';

export function highlightIssues(element: HTMLElement, issues: Issue[]) {
  // Clear existing highlights
  const existingOverlay = document.getElementById('opengrammar-overlay');
  if (existingOverlay) existingOverlay.remove();

  if (issues.length === 0) return;

  const overlay = document.createElement('div');
  overlay.id = 'opengrammar-overlay';
  overlay.style.position = 'absolute';
  overlay.style.pointerEvents = 'none'; // Pass through clicks
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.zIndex = '99999';

  document.body.appendChild(overlay);

  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    showFloatingIndicator(element, issues, overlay);
    return;
  }

  issues.forEach((issue) => {
    try {
      const range = findRange(element, issue.original, issue.offset);
      if (range) {
        const rects = range.getClientRects();
        for (let i = 0; i < rects.length; i++) {
          const rect = rects[i];
          const highlight = document.createElement('div');
          highlight.style.position = 'absolute';
          // Account for scroll
          highlight.style.left = `${rect.left + window.scrollX}px`;
          highlight.style.top = `${rect.bottom + window.scrollY - 2}px`; // Underline position
          highlight.style.width = `${rect.width}px`;
          highlight.style.height = '2px';
          highlight.style.backgroundColor = getColor(issue.type);
          highlight.style.opacity = '0.8';
          
          // Tooltip (simple title for now)
          highlight.title = `${issue.reason}\nSuggestion: ${issue.suggestion}`;
          highlight.style.pointerEvents = 'auto'; // Allow hover for tooltip
          
          overlay.appendChild(highlight);
        }
      }
    } catch (e) {
      console.warn('Could not highlight issue:', issue, e);
    }
  });
}

function showFloatingIndicator(element: HTMLElement, issues: Issue[], overlay: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const indicator = document.createElement('div');
  indicator.textContent = `${issues.length}`;
  indicator.style.position = 'absolute';
  
  // Position to the right of the element
  const left = rect.right + window.scrollX - 30; // 30px inside from right edge
  const top = rect.bottom + window.scrollY - 30; // 30px up from bottom edge

  indicator.style.left = `${left}px`;
  indicator.style.top = `${top}px`;
  
  indicator.style.backgroundColor = '#ef4444';
  indicator.style.color = 'white';
  indicator.style.borderRadius = '50%';
  indicator.style.width = '24px';
  indicator.style.height = '24px';
  indicator.style.display = 'flex';
  indicator.style.alignItems = 'center';
  indicator.style.justifyContent = 'center';
  indicator.style.fontSize = '12px';
  indicator.style.fontWeight = 'bold';
  indicator.style.zIndex = '100000';
  indicator.style.pointerEvents = 'auto';
  indicator.style.cursor = 'pointer';
  indicator.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
  
  indicator.title = issues.map(i => `${i.reason}: ${i.suggestion}`).join('\n');
  
  overlay.appendChild(indicator);
}

function getColor(type: string): string {
  switch (type) {
    case 'grammar': return '#ef4444'; // Red
    case 'spelling': return '#ef4444'; // Red
    case 'clarity': return '#f59e0b'; // Amber
    case 'style': return '#3b82f6'; // Blue
    default: return '#ef4444';
  }
}

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
        
        // Check if our start is within this node
        if (currentOffset + nodeLength > startOffset) {
            // Found the start node
            const startInNode = startOffset - currentOffset;
            
            // Check if end is also in this node (simple case)
            if (startInNode + textToFind.length <= nodeLength) {
                range.setStart(currentNode, startInNode);
                range.setEnd(currentNode, startInNode + textToFind.length);
                return range;
            } else {
                // Spans multiple nodes - simplified logic: just highlight what we can in first node
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
