# Brand Guidelines

This document outlines OpenGrammar's brand identity and usage guidelines.

## Logo

### Primary Logo

The OpenGrammar logo consists of a feather quill icon with the project name.

**Usage:**
- Minimum size: 24px height
- Clear space: 1x logo height on all sides
- Background: Light or dark (see variants)

### Logo Variants

| Variant | File | Use Case |
|---------|------|----------|
| Primary | `logo.svg` | Light backgrounds |
| Inverse | `logo-inverse.svg` | Dark backgrounds |
| Icon | `logo-icon.svg` | Favicons, avatars |
| Wordmark | `logo-wordmark.svg` | Header, footer |

### Logo Colors

```
Primary Blue: #3B82F6
Dark Blue: #1E40AF
Light Blue: #93C5FD
Gray: #6B7280
White: #FFFFFF
```

## Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| OpenGrammar Blue | `#3B82F6` | 59, 130, 246 | Primary actions, links |
| Deep Blue | `#1E40AF` | 30, 64, 175 | Headers, emphasis |
| Sky Blue | `#93C5FD` | 147, 197, 253 | Backgrounds, accents |

### Secondary Colors

| Name | Hex | Usage |
|------|-----|-------|
| Success Green | `#10B981` | Correct suggestions |
| Warning Yellow | `#F59E0B` | Grammar warnings |
| Error Red | `#EF4444` | Spelling errors |
| Info Blue | `#3B82F6` | Style suggestions |

### Neutral Colors

| Name | Hex | Usage |
|------|-----|-------|
| Dark Gray | `#1F2937` | Primary text |
| Medium Gray | `#6B7280` | Secondary text |
| Light Gray | `#F3F4F6` | Backgrounds |
| White | `#FFFFFF` | Cards, surfaces |

## Typography

### Primary Font

**Inter** - Used for all UI text

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text |
| Medium | 500 | Subtitles, buttons |
| Semibold | 600 | Headings |
| Bold | 700 | Emphasis, titles |

### Font Sizes

| Size | Value | Usage |
|------|-------|-------|
| XS | 12px | Captions, labels |
| SM | 14px | Secondary text |
| Base | 16px | Body text |
| LG | 18px | Subtitles |
| XL | 20px | Section headers |
| 2XL | 24px | Page titles |

## Voice and Tone

### Brand Personality

- **Helpful**: Supportive and encouraging
- **Expert**: Knowledgeable but not condescending
- **Friendly**: Approachable and warm
- **Clear**: Direct and easy to understand

### Writing Guidelines

**Do:**
- Use simple, clear language
- Be encouraging ("Great job!")
- Explain why, not just what
- Use active voice

**Don't:**
- Use jargon without explanation
- Sound robotic or cold
- Be overly formal
- Use negative language

### Example Messages

| Situation | Good | Avoid |
|-----------|------|-------|
| Error found | "Consider using 'their' instead of 'there'" | "Wrong word" |
| Success | "No issues found! Your writing looks great." | "Clean" |
| Suggestion | "This could be more concise" | "Too wordy" |

## Iconography

### Style

- Outline icons with 2px stroke
- Rounded corners (4px radius)
- Consistent visual weight
- 24x24px grid

### Icon Library

Primary: **Lucide React**

```tsx
import { Check, X, AlertCircle } from 'lucide-react';
```

## UI Components

### Buttons

```css
/* Primary Button */
background: #3B82F6;
color: #FFFFFF;
border-radius: 6px;
padding: 8px 16px;

/* Secondary Button */
background: transparent;
color: #3B82F6;
border: 1px solid #3B82F6;
border-radius: 6px;
```

### Cards

```css
background: #FFFFFF;
border: 1px solid #E5E7EB;
border-radius: 8px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
```

### Highlights

| Type | Color | Underline Style |
|------|-------|-----------------|
| Spelling | `#EF4444` | Red wavy |
| Grammar | `#F59E0B` | Yellow wavy |
| Style | `#3B82F6` | Blue wavy |

## Dark Mode

### Colors

| Element | Light | Dark |
|---------|-------|------|
| Background | `#FFFFFF` | `#1F2937` |
| Surface | `#F9FAFB` | `#374151` |
| Text Primary | `#1F2937` | `#F9FAFB` |
| Text Secondary | `#6B7280` | `#9CA3AF` |

## Accessibility

### Contrast Ratios

- Normal text: Minimum 4.5:1
- Large text: Minimum 3:1
- UI components: Minimum 3:1

### Focus States

```css
:focus-visible {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
}
```

## Usage Examples

### Social Media

- Profile picture: Logo icon
- Cover image: Logo with tagline
- Post images: Consistent color scheme

### Presentations

- Title slide: Logo + project name
- Section slides: Blue background
- Content slides: White background

### Merchandise

- T-shirts: Logo on left chest
- Stickers: Logo with transparent background
- Mugs: Logo centered

## File Formats

| Format | Use Case |
|--------|----------|
| SVG | Web, print (scalable) |
| PNG | Web, presentations |
| ICO | Favicons |
| PDF | Print materials |

## Brand Assets

Download all assets from:
- GitHub repository: `/public` folder
- Brand kit: [Link to come]

## Questions?

For brand-related questions, contact:
- Email: swadhinbiswas.cse@gmail.com
- GitHub Discussions: Brand category

---

Last updated: March 2024
