# Accessibility Guide

OpenGrammar is committed to making writing assistance accessible to everyone. This document outlines our accessibility features and ongoing efforts.

## WCAG Compliance

We aim to comply with [WCAG 2.1 Level AA](https://www.w3.org/WAI/WCAG21/quickref/) guidelines.

## Features

### Visual Accessibility

#### Color Contrast
- All UI elements meet minimum 4.5:1 contrast ratio
- Grammar issue underlines use distinct colors:
  - **Red**: Spelling errors
  - **Yellow**: Grammar issues
  - **Blue**: Style suggestions
- Dark mode support for reduced eye strain

#### Scalable UI
- Extension popup supports browser zoom up to 200%
- Text sizes use relative units (rem, em)
- No fixed font sizes that prevent scaling

#### Color Independence
- Issue types indicated by icons, not just color
- Tooltips provide text descriptions
- Patterns supplement color coding

### Keyboard Navigation

#### Full Keyboard Support
- All features accessible via keyboard
- Tab order follows logical flow
- Focus indicators clearly visible
- Skip links for main content

#### Keyboard Shortcuts
| Action | Shortcut |
|--------|----------|
| Open popup | Alt + Shift + G |
| Accept suggestion | Enter |
| Dismiss suggestion | Escape |
| Navigate issues | Arrow keys |
| Quick rewrite | Ctrl + Shift + R |

### Screen Reader Support

#### ARIA Labels
- All interactive elements have accessible names
- Issue highlights have descriptive labels
- Dynamic updates announced via live regions

#### Semantic HTML
- Proper heading hierarchy
- Lists used for issue suggestions
- Buttons for actions, links for navigation

#### Focus Management
- Focus trapped in modal dialogs
- Focus returned after actions
- No keyboard traps

### Cognitive Accessibility

#### Clear Language
- Simple, direct error messages
- Consistent terminology
- Avoid jargon in UI

#### Predictable Behavior
- Consistent navigation patterns
- No unexpected context changes
- Clear indication of current location

#### Customization
- Users can adjust suggestion sensitivity
- Option to disable specific issue types
- Custom dictionary for personal vocabulary

## Implementation Details

### Extension Popup

```html
<!-- Example accessible button -->
<button 
  aria-label="Accept suggestion: change 'teh' to 'the'"
  class="suggestion-accept"
>
  <svg aria-hidden="true">...</svg>
  <span class="visually-hidden">Accept</span>
</button>
```

### Content Script Highlights

```typescript
// Accessible highlight creation
function createHighlight(issue: Issue) {
  const highlight = document.createElement('span');
  highlight.setAttribute('role', 'mark');
  highlight.setAttribute('aria-label', `${issue.type}: ${issue.reason}`);
  highlight.setAttribute('tabindex', '0');
  // ... rest of implementation
}
```

### Live Regions

```typescript
// Announce issue count to screen readers
function announceIssues(count: number) {
  const announcement = count === 0 
    ? 'No issues found' 
    : `${count} issue${count > 1 ? 's' : ''} found`;
  
  const liveRegion = document.getElementById('og-live-region');
  if (liveRegion) {
    liveRegion.textContent = announcement;
  }
}
```

## Testing

### Manual Testing

- [ ] Test with keyboard only
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Test with high contrast mode
- [ ] Test with browser zoom at 200%
- [ ] Test with reduced motion preference

### Automated Testing

- [ ] axe-core for accessibility violations
- [ ] Lighthouse accessibility score
- [ ] WAVE browser extension
- [ ] Color contrast analyzer

### User Testing

We actively seek feedback from users with disabilities. Please report accessibility issues via:
- GitHub Issues (tag: accessibility)
- Email: swadhinbiswas.cse@gmail.com

## Known Limitations

### Current Limitations

1. **Rich Text Editors**: Some complex editors (Google Docs) may have limited highlight accessibility
2. **Dynamic Content**: Rapidly updating content may not always announce changes
3. **Third-party Sites**: Limited control over host site's accessibility

### Workarounds

- Use the popup interface for full accessibility
- Enable "high contrast" mode in browser
- Use keyboard shortcuts for common actions

## Browser Accessibility Features

OpenGrammar works with these browser accessibility features:

- **Chrome**: Select-to-speak, ChromeVox, High Contrast extension
- **Edge**: Immersive Reader, Read Aloud
- **Firefox**: Reader View, High Contrast theme

## Future Improvements

### Planned Enhancements

- [ ] Voice control support (Dragon, Voice Access)
- [ ] Dyslexia-friendly font option
- [ ] Reading ruler feature
- [ ] Simplified UI mode
- [ ] Customizable issue colors
- [ ] Haptic feedback (on supported devices)

### Research Areas

- Eye-tracking compatibility
- Brain-computer interface support
- AI-powered accessibility improvements

## Feedback

We welcome feedback on accessibility. Please help us improve by reporting:

- Screen reader compatibility issues
- Keyboard navigation problems
- Color contrast concerns
- Cognitive load suggestions
- Any other accessibility barriers

Contact: swadhinbiswas.cse@gmail.com

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Checklist](https://webaim.org/standards/wcag/checklist)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

---

Last updated: March 2024
