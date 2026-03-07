import type { IgnoredIssue, Issue } from "../types";

let currentTooltip: HTMLElement | null = null;
let highlightContainer: HTMLElement | null = null;
let assistantBubble: HTMLElement | null = null;
let inputMirrorOverlay: HTMLElement | null = null;
let inputMirrorContent: HTMLElement | null = null;
let inputMirrorTarget: HTMLElement | null = null;
let cleanupInputMirror: (() => void) | null = null;
let uiActive = false;

/**
 * Returns true when OpenGrammar UI (tooltip/panel) is actively shown.
 * Used by content script to prevent deactivating the target element.
 */
export function isUIActive(): boolean {
  return uiActive;
}

/**
 * Initialize the highlight overlay system
 */
function initHighlightContainer() {
  if (!highlightContainer) {
    highlightContainer = document.createElement("div");
    highlightContainer.id = "opengrammar-highlights";
    highlightContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2147483647;
    `;
    document.body.appendChild(highlightContainer);
  }
}

/**
 * Grammarly-style highlighter with proper wavy underlines
 */
export function highlightIssues(element: HTMLElement, issues: Issue[]) {
  initHighlightContainer();

  // Clear existing highlights
  clearHighlights();

  if (issues.length === 0) return;

  showAssistantBubble(element, issues);

  // For input/textarea, we can't show inline highlights
  // Show a mirrored overlay + badge on the element instead
  if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
    showInputMirror(element, issues);
    showInputBadge(element, issues);
    return;
  }

  // For contenteditable elements, create inline highlights by wrapping text
  issues.forEach((issue, issueIndex) => {
    if (issue.ignored) return;
    try {
      wrapTextWithHighlight(element, issue, issueIndex);
    } catch (e) {
      console.debug("Could not create highlight for issue:", issue, e);
    }
  });
}

/**
 * Wrap text nodes with highlighted spans - Grammarly's actual approach
 */
function wrapTextWithHighlight(
  root: HTMLElement,
  issue: Issue,
  issueIndex: number,
) {
  const textNodes: Node[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

  let node: Node | null;
  while ((node = walker.nextNode())) {
    textNodes.push(node);
  }

  let charCount = 0;

  for (const textNode of textNodes) {
    const nodeLength = textNode.textContent?.length || 0;
    const nodeStart = charCount;
    const nodeEnd = charCount + nodeLength;

    // Check if issue overlaps with this text node
    if (issue.offset < nodeEnd && issue.offset + issue.length > nodeStart) {
      const startInNode = Math.max(0, issue.offset - nodeStart);
      const endInNode = Math.min(
        nodeLength,
        issue.offset + issue.length - nodeStart,
      );

      if (startInNode < endInNode && textNode.parentNode) {
        const range = document.createRange();
        range.setStart(textNode, startInNode);
        range.setEnd(textNode, endInNode);

        const span = document.createElement("span");
        span.className = "opengrammar-highlight";
        span.style.cssText = `
          background: ${getInlineBackground(issue.type)};
          border-bottom: 2px wavy ${getColor(issue.type)};
          cursor: pointer;
          padding-bottom: 1px;
          border-radius: 2px;
          box-shadow: inset 0 -1px 0 rgba(255,255,255,0.45);
        `;
        span.dataset.issue = JSON.stringify(issue);
        span.dataset.index = issueIndex.toString();

        // Add hover effect
        span.addEventListener("mouseenter", (e) => {
          e.stopPropagation();
          span.style.background = getHoverBackground(issue.type);
        });
        span.addEventListener("mouseleave", (e) => {
          e.stopPropagation();
          span.style.background = "transparent";
        });

        // Click to show tooltip
        span.addEventListener("click", (e) => {
          e.stopPropagation();
          e.preventDefault();
          showTooltip(span, issue, root);
        });

        try {
          range.surroundContents(span);
        } catch (e) {
          // If surrounding fails, try alternative approach
          console.debug("surroundContents failed, using alternative:", e);
          const text = textNode.textContent || "";
          const before = text.substring(0, startInNode);
          const middle = text.substring(startInNode, endInNode);
          const after = text.substring(endInNode);

          const parent = textNode.parentNode;
          if (parent) {
            const frag = document.createDocumentFragment();
            if (before) frag.appendChild(document.createTextNode(before));

            const highlightSpan = document.createElement("span");
            highlightSpan.className = "opengrammar-highlight";
            highlightSpan.style.cssText = `
              background: ${getInlineBackground(issue.type)};
              border-bottom: 2px wavy ${getColor(issue.type)};
              cursor: pointer;
              padding-bottom: 1px;
              border-radius: 2px;
            `;
            highlightSpan.textContent = middle;
            highlightSpan.dataset.issue = JSON.stringify(issue);

            highlightSpan.addEventListener("mouseenter", () => {
              highlightSpan.style.background = getHoverBackground(issue.type);
            });
            highlightSpan.addEventListener("mouseleave", () => {
              highlightSpan.style.background = "transparent";
            });
            highlightSpan.addEventListener("click", (e) => {
              e.stopPropagation();
              e.preventDefault();
              showTooltip(highlightSpan, issue, root);
            });

            frag.appendChild(highlightSpan);
            if (after) frag.appendChild(document.createTextNode(after));

            parent.replaceChild(frag, textNode);
          }
        }
      }
    }

    charCount = nodeEnd;
  }
}

function getHoverBackground(type: string): string {
  switch (type) {
    case "grammar":
    case "spelling":
      return "rgba(239, 68, 68, 0.1)";
    case "clarity":
      return "rgba(245, 158, 11, 0.1)";
    case "style":
      return "rgba(59, 130, 246, 0.1)";
    default:
      return "rgba(239, 68, 68, 0.1)";
  }
}

function getInlineBackground(type: string): string {
  switch (type) {
    case "grammar":
    case "spelling":
      return "rgba(239, 68, 68, 0.12)";
    case "clarity":
      return "rgba(245, 158, 11, 0.14)";
    case "style":
      return "rgba(59, 130, 246, 0.12)";
    default:
      return "rgba(239, 68, 68, 0.1)";
  }
}

/**
 * Clear all OpenGrammar highlights and tooltips
 */
export function clearHighlights() {
  // Remove all highlights and success-animation spans from the page
  document
    .querySelectorAll(".opengrammar-highlight, .opengrammar-success")
    .forEach((el) => {
      const parent = el.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent || ""), el);
        parent.normalize();
      }
    });

  // Remove badge
  document.querySelectorAll(".opengrammar-badge").forEach((el) => el.remove());

  destroyInputMirror();

  if (assistantBubble) {
    assistantBubble.remove();
    assistantBubble = null;
  }

  // Remove tooltip
  if (currentTooltip) {
    currentTooltip.remove();
    currentTooltip = null;
  }
  uiActive = false;
}

export function refreshFloatingDecorations() {
  if (assistantBubble && inputMirrorTarget) {
    const summary = assistantBubble.querySelector('[data-og-summary="true"]') as HTMLElement | null;
    if (summary && assistantBubble.dataset.issueSummary) {
      summary.textContent = assistantBubble.dataset.issueSummary;
    }
  }

  if (inputMirrorOverlay && inputMirrorTarget) {
    positionInputMirror(inputMirrorTarget);
    syncInputMirrorScroll(inputMirrorTarget);
  }

  document.querySelectorAll(".opengrammar-badge").forEach((badge) => {
    const target = inputMirrorTarget;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    (badge as HTMLElement).style.left = `${rect.right - 35}px`;
    (badge as HTMLElement).style.top = `${rect.top + 5}px`;
  });
}

function showAssistantBubble(element: HTMLElement, issues: Issue[]) {
  if (assistantBubble) {
    assistantBubble.remove();
    assistantBubble = null;
  }

  const summary = summarizeIssues(issues);
  const bubble = document.createElement("button");
  bubble.className = "opengrammar-assistant";
  bubble.type = "button";
  bubble.style.cssText = `
    position: fixed;
    right: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    padding: 10px 12px;
    border-radius: 999px;
    background: rgba(17, 24, 39, 0.94);
    background: rgba(17, 24, 39, 0.96);
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.22);
    box-shadow: 0 10px 28px rgba(15, 23, 42, 0.26);
    z-index: 2147483646;
    cursor: pointer;
    pointer-events: auto;
    text-align: left;
    backdrop-filter: blur(10px);
  `;

    <span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background:linear-gradient(135deg,#6d5efc,#1d4ed8);font-size:15px;font-weight:700;box-shadow:inset 0 1px 0 rgba(255,255,255,0.2);">G</span>
    <span data-og-count="true" style="position:absolute;top:-2px;right:-2px;min-width:18px;height:18px;padding:0 5px;border-radius:999px;background:#ef4444;color:white;font-size:10px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 4px 10px rgba(239,68,68,0.35);">${issues.length}</span>
    </span>
  `;
  bubble.title = summary || `${issues.length} issue${issues.length === 1 ? '' : 's'} found`;
  bubble.dataset.issueSummary = summary || 'Click to review suggestions';

  bubble.addEventListener("mouseenter", () => {
    const count = assistantBubble.querySelector('[data-og-count="true"]') as HTMLElement | null;
    if (count && assistantBubble.dataset.issueCount) {
      count.textContent = assistantBubble.dataset.issueCount;
    }
    bubble.style.transform = "translateY(0) scale(1)";
  });

  bubble.dataset.issueCount = String(issues.length);
  bubble.addEventListener("mousedown", (e) => {
    e.preventDefault();
  });

  bubble.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
      showIssuePanel(bubble, issues, element, 0, () => undefined);
      return;
    }

    const firstHighlight = document.querySelector(".opengrammar-highlight") as HTMLElement | null;
    if (firstHighlight) {
      showTooltip(firstHighlight, issues[0]!, element);
    }
  });

  document.body.appendChild(bubble);
  assistantBubble = bubble;
}

function summarizeIssues(issues: Issue[]): string {
  const counts = issues.reduce<Record<string, number>>((acc, issue) => {
    acc[issue.type] = (acc[issue.type] || 0) + 1;
    return acc;
  }, {});

  const ordered: Array<Issue["type"]> = ["grammar", "spelling", "clarity", "style"];
  return ordered
    .filter((type) => counts[type])
    .map((type) => `${counts[type]} ${type}`)
    .join(" • ");
}

function showInputMirror(element: HTMLElement, issues: Issue[]) {
  destroyInputMirror();

  inputMirrorTarget = element;

  const overlay = document.createElement('div');
  overlay.className = 'opengrammar-input-mirror';
  overlay.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 2147483645;
    overflow: hidden;
    background: transparent;
    border-radius: inherit;
  `;

  const content = document.createElement('div');
  content.className = 'opengrammar-input-mirror-content';
  content.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: max-content;
    min-width: 100%;
    color: inherit;
    white-space: ${element.tagName === 'TEXTAREA' ? 'pre-wrap' : 'pre'};
    word-break: break-word;
  `;

  copyTypographyStyles(element, overlay, content);
  content.innerHTML = buildMirrorMarkup(getElementText(element), issues);
  overlay.appendChild(content);
  document.body.appendChild(overlay);

  const input = element as HTMLInputElement | HTMLTextAreaElement;
  const originalColor = input.dataset.ogOriginalColor || window.getComputedStyle(input).color;
  input.dataset.ogOriginalColor = originalColor;
  input.style.color = 'transparent';
  input.style.webkitTextFillColor = 'transparent';
  input.style.caretColor = originalColor;

  const sync = () => syncInputMirrorScroll(element);
  input.addEventListener('scroll', sync, { passive: true });

  inputMirrorOverlay = overlay;
  inputMirrorContent = content;
  positionInputMirror(element);
  syncInputMirrorScroll(element);

  cleanupInputMirror = () => {
    input.removeEventListener('scroll', sync);
    input.style.color = input.dataset.ogOriginalColor || '';
    input.style.webkitTextFillColor = '';
  };
}

function destroyInputMirror() {
  cleanupInputMirror?.();
  cleanupInputMirror = null;
  inputMirrorOverlay?.remove();
  inputMirrorOverlay = null;
  inputMirrorContent = null;
  inputMirrorTarget = null;
}

function copyTypographyStyles(element: HTMLElement, overlay: HTMLElement, content: HTMLElement) {
  const styles = window.getComputedStyle(element);
  const target = element as HTMLInputElement | HTMLTextAreaElement;

  overlay.style.left = `${element.getBoundingClientRect().left}px`;
  overlay.style.top = `${element.getBoundingClientRect().top}px`;
  overlay.style.width = `${element.getBoundingClientRect().width}px`;
  overlay.style.height = `${element.getBoundingClientRect().height}px`;
  overlay.style.borderRadius = styles.borderRadius;

  content.style.font = styles.font;
  content.style.fontFamily = styles.fontFamily;
  content.style.fontSize = styles.fontSize;
  content.style.fontWeight = styles.fontWeight;
  content.style.lineHeight = styles.lineHeight;
  content.style.letterSpacing = styles.letterSpacing;
  content.style.textTransform = styles.textTransform;
  content.style.textAlign = styles.textAlign;
  content.style.padding = styles.padding;
  content.style.color = target.dataset.ogOriginalColor || styles.color;
}

function positionInputMirror(element: HTMLElement) {
  if (!inputMirrorOverlay) return;
  const rect = element.getBoundingClientRect();
  inputMirrorOverlay.style.left = `${rect.left}px`;
  inputMirrorOverlay.style.top = `${rect.top}px`;
  inputMirrorOverlay.style.width = `${rect.width}px`;
  inputMirrorOverlay.style.height = `${rect.height}px`;
}

function syncInputMirrorScroll(element: HTMLElement) {
  if (!inputMirrorContent) return;
  const input = element as HTMLInputElement | HTMLTextAreaElement;
  inputMirrorContent.style.transform = `translate(${-input.scrollLeft}px, ${-input.scrollTop}px)`;
}

function buildMirrorMarkup(text: string, issues: Issue[]): string {
  if (!issues.length) {
    return escapeHtmlPreservingWhitespace(text);
  }

  const sorted = [...issues].sort((a, b) => a.offset - b.offset);
  let cursor = 0;
  const parts: string[] = [];

  for (const issue of sorted) {
    const start = Math.max(0, Math.min(issue.offset, text.length));
    const end = Math.max(start, Math.min(issue.offset + issue.length, text.length));

    if (cursor < start) {
      parts.push(escapeHtmlPreservingWhitespace(text.slice(cursor, start)));
    }

    const segment = text.slice(start, end);
    const color = getColor(issue.type);
    const bg = getInlineBackground(issue.type);
    parts.push(
      `<span style="color:${color};background:${bg};border-bottom:2px wavy ${color};border-radius:2px;">${escapeHtmlPreservingWhitespace(segment || issue.original)}</span>`,
    );
    cursor = end;
  }

  if (cursor < text.length) {
    parts.push(escapeHtmlPreservingWhitespace(text.slice(cursor)));
  }

  return parts.join('');
}

function getElementText(element: HTMLElement): string {
  if (element.tagName === 'TEXTAREA') {
    return (element as HTMLTextAreaElement).value;
  }
  return (element as HTMLInputElement).value;
}

function escapeHtmlPreservingWhitespace(text: string): string {
  return escapeHtml(text)
    .replace(/\n/g, '<br>')
    .replace(/ {2}/g, ' &nbsp;');
}

/**
 * Show Grammarly-style tooltip popup
 */
function showTooltip(anchor: HTMLElement, issue: Issue, element: HTMLElement) {
  uiActive = true;

  // Remove existing tooltip
  if (currentTooltip) {
    currentTooltip.remove();
  }

  const anchorRect = anchor.getBoundingClientRect();

  // Create tooltip
  const tooltip = document.createElement("div");
  tooltip.className = "opengrammar-tooltip";

  // Calculate position - show below the highlight, or above if near bottom
  let top = anchorRect.bottom + window.scrollY + 10;
  if (top + 200 > window.innerHeight + window.scrollY) {
    top = anchorRect.top + window.scrollY - 210;
  }

  tooltip.style.cssText = `
    position: absolute;
    left: ${Math.max(10, Math.min(anchorRect.left + window.scrollX - 150, window.innerWidth - 320))}px;
    top: ${top}px;
    width: 300px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    overflow: hidden;
  `;

  const typeColor = getColor(issue.type);
  const typeLabel = getTypeLabel(issue.type);
  const typeBg = getTypeBg(issue.type);
  const confidence = typeof issue.confidence === "number" ? `${Math.round(issue.confidence * 100)}% confidence` : "Suggested";
  const sourceLabel = issue.source ? issue.source.toUpperCase() : "RULE";

  tooltip.innerHTML = `
    <div style="background: ${typeBg}; padding: 14px 16px; border-bottom: 1px solid #e5e7eb;">
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
        <span style="
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${typeColor};
          color: white;
          font-size: 12px;
          font-weight: bold;
        ">!</span>
        <span style="font-weight: 600; color: #1f2937; font-size: 15px;">${typeLabel}</span>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap;">
        <span style="display:inline-flex;align-items:center;padding:4px 8px;border-radius:999px;background:white;color:#374151;font-size:11px;font-weight:600;">${confidence}</span>
        <span style="display:inline-flex;align-items:center;padding:4px 8px;border-radius:999px;background:rgba(255,255,255,0.7);color:#4b5563;font-size:11px;font-weight:600;">${sourceLabel}</span>
      </div>
      <div style="color: #4b5563; line-height: 1.5; font-size: 14px;">${escapeHtml(issue.reason)}</div>
    </div>
    <div style="padding: 14px 16px; background: #f9fafb;">
      <div style="margin-bottom: 12px;">
        <div style="font-size: 12px; color: #6b7280; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">Original</div>
        <div style="color: #dc2626; text-decoration: line-through; background: #fef2f2; padding: 8px 10px; border-radius: 6px; font-family: inherit;">${escapeHtml(issue.original)}</div>
      </div>
      <div>
        <div style="font-size: 12px; color: #6b7280; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">Suggestion</div>
        <div style="color: #059669; background: #f0fdf4; padding: 8px 10px; border-radius: 6px; font-weight: 600; font-family: inherit; border-left: 3px solid #059669;">${escapeHtml(issue.suggestion)}</div>
      </div>
    </div>
    <div style="display: flex; border-top: 1px solid #e5e7eb; background: white;">
      <button class="og-apply-btn" style="
        flex: 1;
        padding: 12px;
        background: #2563eb;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        transition: background 0.15s;
        border-right: 1px solid #e5e7eb;
      ">
        Apply
      </button>
      <button class="og-ignore-btn" style="
        flex: 1;
        padding: 12px;
        background: white;
        color: #6b7280;
        border: none;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: background 0.15s;
      ">
        Ignore
      </button>
    </div>
  `;

  // Add event listeners
  const applyBtn = tooltip.querySelector(".og-apply-btn") as HTMLButtonElement;
  const ignoreBtn = tooltip.querySelector(
    ".og-ignore-btn",
  ) as HTMLButtonElement;

  applyBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    applySuggestion(element, issue, anchor);
    hideTooltip();
  });

  ignoreBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    ignoreIssue(issue, anchor);
    hideTooltip();
  });

  // Button hover effects
  applyBtn.addEventListener("mouseenter", () => {
    applyBtn.style.background = "#1d4ed8";
  });
  applyBtn.addEventListener("mouseleave", () => {
    applyBtn.style.background = "#2563eb";
  });

  ignoreBtn.addEventListener("mouseenter", () => {
    ignoreBtn.style.background = "#f9fafb";
  });
  ignoreBtn.addEventListener("mouseleave", () => {
    ignoreBtn.style.background = "#ffffff";
  });

  // Close tooltip when clicking outside
  const closeOnOutsideClick = (e: MouseEvent) => {
    if (
      !tooltip.contains(e.target as Node) &&
      !anchor.contains(e.target as Node)
    ) {
      hideTooltip();
      document.removeEventListener("click", closeOnOutsideClick);
    }
  };

  setTimeout(() => {
    document.addEventListener("click", closeOnOutsideClick);
  }, 100);

  // Prevent focus loss from target element when interacting with tooltip
  tooltip.addEventListener("mousedown", (e) => {
    e.preventDefault();
  });

  document.body.appendChild(tooltip);
  currentTooltip = tooltip;
}

function getTypeLabel(type: string): string {
  switch (type) {
    case "grammar":
      return "Grammar";
    case "spelling":
      return "Spelling";
    case "clarity":
      return "Clarity";
    case "style":
      return "Style";
    default:
      return "Suggestion";
  }
}

function getTypeBg(type: string): string {
  switch (type) {
    case "grammar":
    case "spelling":
      return "#fef2f2";
    case "clarity":
      return "#fffbeb";
    case "style":
      return "#eff6ff";
    default:
      return "#fef2f2";
  }
}

/**
 * Hide current tooltip
 */
function hideTooltip() {
  if (currentTooltip) {
    currentTooltip.remove();
    currentTooltip = null;
  }
  uiActive = false;
}

/**
 * Apply suggestion to text
 */
function applySuggestion(
  element: HTMLElement,
  issue: Issue,
  highlightEl: HTMLElement,
) {
  void chrome.runtime.sendMessage({
    type: 'TRACK_ANALYTICS_EVENT',
    eventType: 'suggestions_applied',
    payload: { count: 1, domain: window.location.hostname },
  });

  if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
    const input = element as HTMLInputElement | HTMLTextAreaElement;
    const text = input.value;
    const before = text.substring(0, issue.offset);
    const after = text.substring(issue.offset + issue.length);
    input.value = before + issue.suggestion + after;

    // Focus back on the input element
    input.focus();

    // Show success on badge: green checkmark, then fade away
    document.querySelectorAll(".opengrammar-badge").forEach((b) => {
      const badge = b as HTMLElement;
      badge.textContent = "\u2713";
      badge.style.background = "linear-gradient(135deg, #10b981, #059669)";
      badge.style.boxShadow = "0 2px 8px rgba(16, 185, 129, 0.5)";
      setTimeout(() => {
        badge.style.opacity = "0";
        badge.style.transform = "scale(0.8)";
        badge.style.transition = "opacity 0.3s, transform 0.3s";
        setTimeout(() => badge.remove(), 300);
      }, 600);
    });

    // Trigger re-analysis
    input.dispatchEvent(new Event("input", { bubbles: true }));
  } else if (element.isContentEditable) {
    // Replace the highlighted span with corrected text + green success flash
    const parent = highlightEl.parentNode;
    if (parent) {
      const successSpan = document.createElement("span");
      successSpan.className = "opengrammar-success";
      successSpan.textContent = issue.suggestion;
      successSpan.style.cssText = `
        background: rgba(16, 185, 129, 0.15);
        border-bottom: 2px solid #10b981;
        border-radius: 2px;
        padding-bottom: 1px;
        transition: background 0.5s, border-color 0.5s;
      `;
      parent.replaceChild(successSpan, highlightEl);

      // Fade out the green highlight then unwrap to plain text
      requestAnimationFrame(() => {
        setTimeout(() => {
          successSpan.style.background = "transparent";
          successSpan.style.borderColor = "transparent";
          setTimeout(() => {
            const textNode = document.createTextNode(issue.suggestion);
            if (successSpan.parentNode) {
              successSpan.parentNode.replaceChild(textNode, successSpan);
              textNode.parentNode?.normalize();
            }
          }, 500);
        }, 50);
      });
    }

    // Trigger re-analysis
    element.dispatchEvent(new Event("input", { bubbles: true }));
  }
}

/**
 * Ignore an issue
 */
function ignoreIssue(issue: Issue, highlightEl: HTMLElement) {
  void chrome.runtime.sendMessage({
    type: 'TRACK_ANALYTICS_EVENT',
    eventType: 'suggestions_ignored',
    payload: { count: 1, domain: window.location.hostname },
  });

  // Save to storage
  chrome.storage.sync.get(["ignoredIssues"], (result) => {
    const ignoredIssues = normalizeIgnoredIssues(result.ignoredIssues);
    const issueId = `${issue.type}-${issue.offset}-${issue.original}`;
    if (!ignoredIssues.some((entry) => entry.id === issueId)) {
      ignoredIssues.push({
        id: issueId,
        type: issue.type,
        original: issue.original,
        suggestion: issue.suggestion,
        ignoredAt: Date.now(),
      });
      chrome.storage.sync.set({ ignoredIssues });
    }
  });

  // For inline highlights (contenteditable)
  if (highlightEl.classList.contains("opengrammar-highlight")) {
    highlightEl.style.borderBottom = "none";
    highlightEl.style.background = "transparent";
    highlightEl.classList.remove("opengrammar-highlight");
    highlightEl.classList.add("opengrammar-ignored");
  }

  // For badge (textarea/input) - show success then fade
  if (highlightEl.classList.contains("opengrammar-badge")) {
    highlightEl.textContent = "\u2713";
    highlightEl.style.background = "linear-gradient(135deg, #10b981, #059669)";
    highlightEl.style.boxShadow = "0 2px 8px rgba(16, 185, 129, 0.5)";
    setTimeout(() => {
      highlightEl.style.opacity = "0";
      highlightEl.style.transform = "scale(0.8)";
      highlightEl.style.transition = "opacity 0.3s, transform 0.3s";
      setTimeout(() => highlightEl.remove(), 300);
    }, 600);
  }
}

function normalizeIgnoredIssues(value: unknown): IgnoredIssue[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => {
      if (typeof entry === 'string') {
        return {
          id: entry,
          type: 'grammar' as const,
          original: entry,
          suggestion: '',
          ignoredAt: Date.now(),
        };
      }

      if (
        entry &&
        typeof entry === 'object' &&
        'id' in entry &&
        'type' in entry &&
        'original' in entry &&
        'suggestion' in entry
      ) {
        return entry as IgnoredIssue;
      }

      return null;
    })
    .filter((entry): entry is IgnoredIssue => Boolean(entry));
}

/**
 * Show badge for input/textarea elements
 */
function showInputBadge(element: HTMLElement, issues: Issue[]) {
  // Remove existing badge
  document.querySelectorAll(".opengrammar-badge").forEach((el) => el.remove());

  const rect = element.getBoundingClientRect();

  const badge = document.createElement("div");
  badge.className = "opengrammar-badge";
  badge.style.cssText = `
    position: fixed;
    left: ${rect.right - 35}px;
    top: ${rect.top + 5}px;
    min-width: 24px;
    height: 24px;
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    z-index: 2147483646;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.5);
    transition: transform 0.15s, box-shadow 0.15s, background 0.3s, opacity 0.3s;
    pointer-events: auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    padding: 0 6px;
  `;

  badge.textContent = issues.length.toString();
  let currentIssueIndex = 0;

  badge.addEventListener("mouseenter", () => {
    badge.style.transform = "scale(1.1)";
    badge.style.boxShadow = "0 4px 12px rgba(239, 68, 68, 0.6)";
  });
  badge.addEventListener("mouseleave", () => {
    badge.style.transform = "scale(1)";
    badge.style.boxShadow = "0 2px 8px rgba(239, 68, 68, 0.5)";
  });

  // Prevent textarea/input from losing focus when badge is clicked
  badge.addEventListener("mousedown", (e) => {
    e.preventDefault();
  });

  badge.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (issues.length > 0) {
      showIssuePanel(badge, issues, element, currentIssueIndex, (newIndex) => {
        currentIssueIndex = newIndex;
      });
    }
  });

  document.body.appendChild(badge);
}

/**
 * Grammarly-style issue panel for input/textarea elements.
 * Shows current issue with Apply/Dismiss buttons and prev/next navigation.
 */
function showIssuePanel(
  anchor: HTMLElement,
  issues: Issue[],
  element: HTMLElement,
  currentIndex: number,
  onIndexChange: (newIndex: number) => void,
) {
  uiActive = true;

  if (currentTooltip) {
    currentTooltip.remove();
  }

  const issue = issues[currentIndex];
  const anchorRect = anchor.getBoundingClientRect();

  const panel = document.createElement("div");
  panel.className = "opengrammar-tooltip";

  let top = anchorRect.bottom + 10;
  if (top + 280 > window.innerHeight) {
    top = anchorRect.top - 290;
  }

  panel.style.cssText = `
    position: fixed;
    left: ${Math.max(10, Math.min(anchorRect.left - 130, window.innerWidth - 320))}px;
    top: ${top}px;
    width: 300px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    overflow: hidden;
    animation: og-panel-in 0.15s ease-out;
  `;

  const typeColor = getColor(issue.type);
  const typeLabel = getTypeLabel(issue.type);
  const typeBg = getTypeBg(issue.type);
  const hasMultiple = issues.length > 1;

  panel.innerHTML = `
    <style>
      @keyframes og-panel-in {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
    </style>
    ${
      hasMultiple
        ? `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: #f3f4f6; border-bottom: 1px solid #e5e7eb;">
      <button class="og-prev-btn" style="
        padding: 4px 10px; background: white; border: 1px solid #d1d5db; border-radius: 6px;
        cursor: ${currentIndex === 0 ? "default" : "pointer"}; font-size: 12px; color: #374151;
        opacity: ${currentIndex === 0 ? "0.4" : "1"};
      ">&#8592;</button>
      <span style="font-size: 12px; color: #6b7280; font-weight: 600;">${currentIndex + 1} of ${issues.length} issues</span>
      <button class="og-next-btn" style="
        padding: 4px 10px; background: white; border: 1px solid #d1d5db; border-radius: 6px;
        cursor: ${currentIndex >= issues.length - 1 ? "default" : "pointer"}; font-size: 12px; color: #374151;
        opacity: ${currentIndex >= issues.length - 1 ? "0.4" : "1"};
      ">&#8594;</button>
    </div>
    `
        : ""
    }
    <div style="background: ${typeBg}; padding: 14px 16px; border-bottom: 1px solid #e5e7eb;">
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
        <span style="
          display: inline-flex; align-items: center; justify-content: center;
          width: 20px; height: 20px; border-radius: 50%;
          background: ${typeColor}; color: white; font-size: 12px; font-weight: bold;
        ">!</span>
        <span style="font-weight: 600; color: #1f2937; font-size: 15px;">${typeLabel}</span>
      </div>
      <div style="color: #4b5563; line-height: 1.5; font-size: 14px;">${escapeHtml(issue.reason)}</div>
    </div>
    <div style="padding: 14px 16px; background: #f9fafb;">
      <div style="margin-bottom: 12px;">
        <div style="font-size: 11px; color: #9ca3af; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Original</div>
        <div style="color: #dc2626; text-decoration: line-through; background: #fef2f2; padding: 8px 10px; border-radius: 6px; font-family: inherit;">${escapeHtml(issue.original)}</div>
      </div>
      <div>
        <div style="font-size: 11px; color: #9ca3af; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Suggestion</div>
        <div class="og-suggestion-click" style="
          color: #059669; background: #f0fdf4; padding: 8px 10px; border-radius: 6px;
          font-weight: 600; font-family: inherit; border-left: 3px solid #059669;
          cursor: pointer; transition: background 0.15s;
        ">${escapeHtml(issue.suggestion)}</div>
      </div>
    </div>
    <div style="display: flex; border-top: 1px solid #e5e7eb; background: white;">
      <button class="og-apply-btn" style="
        flex: 1; padding: 12px; background: #2563eb; color: white;
        border: none; cursor: pointer; font-size: 14px; font-weight: 600;
        transition: background 0.15s; border-right: 1px solid #e5e7eb;
        border-radius: 0 0 0 12px;
      ">&#10003; Apply Fix</button>
      <button class="og-ignore-btn" style="
        flex: 1; padding: 12px; background: white; color: #6b7280;
        border: none; cursor: pointer; font-size: 14px; font-weight: 500;
        transition: background 0.15s; border-radius: 0 0 12px 0;
      ">Dismiss</button>
    </div>
  `;

  // Prevent focus loss from the textarea when interacting with the panel
  panel.addEventListener("mousedown", (e) => {
    e.preventDefault();
  });

  const applyBtn = panel.querySelector(".og-apply-btn") as HTMLButtonElement;
  const ignoreBtn = panel.querySelector(".og-ignore-btn") as HTMLButtonElement;
  const suggestionEl = panel.querySelector(
    ".og-suggestion-click",
  ) as HTMLElement;

  // Clicking the green suggestion text also applies the fix (Grammarly-style)
  if (suggestionEl) {
    suggestionEl.addEventListener("click", (e) => {
      e.stopPropagation();
      applySuggestion(element, issue, anchor);
      hideTooltip();
    });
    suggestionEl.addEventListener("mouseenter", () => {
      suggestionEl.style.background = "#dcfce7";
    });
    suggestionEl.addEventListener("mouseleave", () => {
      suggestionEl.style.background = "#f0fdf4";
    });
  }

  applyBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    applySuggestion(element, issue, anchor);
    hideTooltip();
  });

  ignoreBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    ignoreIssue(issue, anchor);
    hideTooltip();
  });

  // Hover effects
  applyBtn.addEventListener("mouseenter", () => {
    applyBtn.style.background = "#1d4ed8";
  });
  applyBtn.addEventListener("mouseleave", () => {
    applyBtn.style.background = "#2563eb";
  });
  ignoreBtn.addEventListener("mouseenter", () => {
    ignoreBtn.style.background = "#f9fafb";
  });
  ignoreBtn.addEventListener("mouseleave", () => {
    ignoreBtn.style.background = "#ffffff";
  });

  // Navigation for multiple issues
  if (hasMultiple) {
    const prevBtn = panel.querySelector(".og-prev-btn") as HTMLButtonElement;
    const nextBtn = panel.querySelector(".og-next-btn") as HTMLButtonElement;

    if (prevBtn && currentIndex > 0) {
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const newIndex = currentIndex - 1;
        onIndexChange(newIndex);
        showIssuePanel(anchor, issues, element, newIndex, onIndexChange);
      });
    }
    if (nextBtn && currentIndex < issues.length - 1) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const newIndex = currentIndex + 1;
        onIndexChange(newIndex);
        showIssuePanel(anchor, issues, element, newIndex, onIndexChange);
      });
    }
  }

  // Close on outside click
  const closeOnOutsideClick = (e: MouseEvent) => {
    if (
      !panel.contains(e.target as Node) &&
      !anchor.contains(e.target as Node)
    ) {
      hideTooltip();
      document.removeEventListener("click", closeOnOutsideClick);
    }
  };

  setTimeout(() => {
    document.addEventListener("click", closeOnOutsideClick);
  }, 100);

  document.body.appendChild(panel);
  currentTooltip = panel;
}

/**
 * Get color based on issue type
 */
function getColor(type: string): string {
  switch (type) {
    case "grammar":
      return "#ef4444"; // Red
    case "spelling":
      return "#ef4444"; // Red
    case "clarity":
      return "#f59e0b"; // Amber
    case "style":
      return "#3b82f6"; // Blue
    default:
      return "#ef4444";
  }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Initialize highlight container on load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHighlightContainer);
} else {
  initHighlightContainer();
}
