# 📖 Using OpenGrammar - Complete User Guide

Master OpenGrammar with this comprehensive guide to all features and functionality.

---

## 📋 Table of Contents

1. [Getting Started](#getting-started)
2. [Grammar Checking](#grammar-checking)
3. [Tone Rewriting](#tone-rewriting)
4. [Writing Statistics](#writing-statistics)
5. [Custom Dictionary](#custom-dictionary)
6. [Site-Specific Settings](#site-specific-settings)
7. [Keyboard Shortcuts](#keyboard-shortcuts)
8. [Tips & Best Practices](#tips--best-practices)

---

## 🚀 Getting Started

### First Time Setup

1. **Install the Extension**
   - See [Browser Extension Setup](04-browser-extension-setup.md)
   
2. **Configure Backend**
   - Click extension icon → Settings
   - Enter Backend URL (local or deployed)
   
3. **Set Up AI Provider**
   - Choose provider (Groq recommended for free tier)
   - Enter API key
   - Select model
   
4. **Test It Out**
   - Open any text box
   - Type: `me and him went to store`
   - You should see red underline

---

## ✍️ Grammar Checking

### How It Works

OpenGrammar uses a **dual-engine approach**:

1. **Rule-Based Engine** (Free, Offline)
   - 40+ grammar rules
   - Instant checking
   - No API required
   
2. **AI-Powered Engine** (Advanced)
   - Context understanding
   - Complex grammar
   - Requires API key

### Color-Coded Underlines

| Color | Meaning | Example |
|-------|---------|---------|
| **Red** | Spelling/Grammar | "teh" → "the" |
| **Amber** | Clarity | Long sentences |
| **Blue** | Style | Passive voice |

### Using Grammar Checking

#### Step 1: Start Typing
Open any text input:
- Gmail compose
- Google Docs
- Notion
- Any text box on the web

#### Step 2: Watch for Underlines
As you type, OpenGrammar automatically checks:
- After you stop typing (800ms delay)
- Only text with 5+ characters
- Works in real-time

#### Step 3: Review Suggestions
Click any underlined text to see:
```
┌─────────────────────────────┐
│ 🔴 Grammar Error            │
│                             │
│ Original: me and him        │
│ Suggestion: he and I        │
│                             │
│ Subject pronoun error.      │
│ Use subject pronouns for    │
│ the subject of a sentence.  │
│                             │
│ [Apply] [Ignore] [Dictionary]│
└─────────────────────────────┘
```

#### Step 4: Apply Changes
- **Apply** - Replace text with suggestion
- **Ignore** - Dismiss this instance
- **Add to Dictionary** - Never flag this word again

### Grammar Rules Included

#### Spelling (100+ rules)
- Common misspellings: teh → the
- Missing apostrophes: dont → don't
- Wrong word: alot → a lot

#### Basic Grammar (35+ rules)
- Pronoun errors: me and him → he and I
- Irregular verbs: buyed → bought
- Their/there/they're confusion
- Your/you're confusion
- Its/it's confusion

#### Style (50+ rules)
- Passive voice detection
- Weak words: very good → excellent
- Redundant phrases: absolutely essential → essential
- Clichés: think outside the box

#### Clarity
- Long sentences (>35 words)
- Complex sentence structure
- Hard to read passages

### Examples

#### Example 1: Basic Grammar
```
Input:  "me and him went to the store"
Output: "he and I went to the store"
         ^^^^^^^^
         Grammar error detected
```

#### Example 2: Spelling
```
Input:  "I dont belive in teh supernatural"
Output: "I don't believe in the supernatural"
         ^^^^  ^^^^^^^    ^^
         3 spelling errors detected
```

#### Example 3: Style
```
Input:  "The report was written by John yesterday"
Output: "John wrote the report yesterday"
         ^^^^^^^^^^^^^^^
         Passive voice detected
```

---

## 🎨 Tone Rewriting

### Overview

Rewrite any text in 8 different tones:

| Tone | Use Case | Example |
|------|----------|---------|
| **Formal** 🎩** | Business, academic | "Hey" → "Greetings" |
| **Casual** 😊 | Friends, chat | "Greetings" → "Hey" |
| **Professional** 💼 | Work emails | "wanna" → "would like to" |
| **Friendly** 🤗 | Social media | "Hello" → "Hey there!" |
| **Concise** ⚡ | Quick messages | "In order to" → "To" |
| **Detailed** 📚 | Explanations | "Go" → "Proceed forward" |
| **Persuasive** 💪 | Sales, pitches | "Try this" → "Experience this" |
| **Neutral** 😐 | General use | Balanced tone |

### How to Use Tone Rewriting

#### Method 1: Right-Click Menu
1. Select any text on a webpage
2. Right-click
3. Choose **"Rewrite with OpenGrammar"**
4. Rewrite popup opens

#### Method 2: Keyboard Shortcut
1. Select text
2. Press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
3. Rewrite popup opens

#### Method 3: Extension Menu
1. Click extension icon
2. Click **"Rewrite Text"**
3. Paste or type text
4. Click rewrite

### Using the Rewrite Popup

```
┌───────────────────────────────────────┐
│ Rewrite with OpenGrammar          [X] │
├───────────────────────────────────────┤
│                                       │
│ Original Text:                        │
│ ┌─────────────────────────────────┐   │
│ │ hey whats up can we talk        │   │
│ │                                 │   │
│ └─────────────────────────────────┘   │
│                                       │
│ Choose Tone:                          │
│ [Formal] [Casual] [Professional]      │
│ [Friendly] [Concise] [Detailed]       │
│ [Persuasive] [Neutral]                │
│                                       │
│ ┌─────────────────────────────────┐   │
│ │ Rewritten Text:                 │   │
│ │ Hello, how are you? May we      │   │
│ │ have a conversation?            │   │
│ └─────────────────────────────────┘   │
│                                       │
│ [Apply] [Copy] [Close]                │
└───────────────────────────────────────┘
```

### Step-by-Step Example

**Original Text:**
```
hey whats up can we talk bout the project
```

**Step 1: Select Tone**
Click **Professional** 💼

**Step 2: Click Rewrite**
Wait for AI to process (~1-2 seconds)

**Step 3: Review Result**
```
Hello, how are you? May we discuss the project?
```

**Step 4: Apply or Copy**
- **Apply** - Replaces original text
- **Copy** - Copies to clipboard

### Tips for Tone Rewriting

✅ **Do:**
- Select complete sentences
- Use appropriate tone for context
- Review before applying
- Try different tones for variety

❌ **Don't:**
- Rewrite single words (select phrases)
- Use formal tone for casual chats
- Apply without reviewing
- Overuse rewriting

---

## 📊 Writing Statistics

### Overview

Get detailed insights into your writing:

### Metrics Available

#### Basic Counts
- **Words** - Total word count
- **Characters** - Total characters (with/without spaces)
- **Sentences** - Number of sentences
- **Paragraphs** - Number of paragraphs
- **Syllables** - Total syllable count

#### Readability Scores

**Flesch Reading Ease** (0-100)
```
90-100: Very Easy (5th grade)
80-89: Easy (6th grade)
70-79: Fairly Easy (7th grade)
60-69: Standard (8th-9th grade)
50-59: Fairly Difficult (10th-12th grade)
30-49: Difficult (College)
0-29: Very Difficult (College Graduate+)
```

**Flesch-Kincaid Grade Level**
```
1-6: Elementary
7-9: Middle School
10-12: High School
13-16: College
17+: Graduate
```

**Automated Readability Index (ARI)**
```
1-6: Ages 5-12
7-9: Ages 12-15
10-12: Ages 15-18
13+: Ages 18+
```

#### Time Estimates
- **Reading Time** - Based on 200 words per minute
- **Speaking Time** - Based on 150 words per minute

#### Vocabulary Analysis
- **Unique Words** - Number of different words
- **Vocabulary Diversity** - Percentage of unique words
- **Average Word Length** - Mean characters per word

### Accessing Statistics

#### Method 1: Extension Popup
1. Click extension icon
2. Click **Statistics** tab
3. View real-time stats

#### Method 2: Options Page
1. Right-click extension icon
2. Choose **Options**
3. Navigate to **Statistics** section

#### Method 3: Keyboard Shortcut
(If configured)
1. Press shortcut
2. Statistics popup appears

### Example Statistics Report

```
┌─────────────────────────────────────┐
│ Writing Statistics                  │
├─────────────────────────────────────┤
│                                     │
│ Basic Counts                        │
│ ─────────────────────────────────── │
│ Words:          1,248               │
│ Characters:     6,542               │
│ Sentences:      87                  │
│ Paragraphs:     12                  │
│                                     │
│ Readability                         │
│ ─────────────────────────────────── │
│ Flesch Ease:    78 (Excellent)      │
│ Grade Level:    8.5 (Good)          │
│ ARI:            9 (Good)            │
│                                     │
│ Time Estimates                      │
│ ─────────────────────────────────── │
│ Reading Time:   4 minutes           │
│ Speaking Time:  6 minutes           │
│                                     │
│ Vocabulary                          │
│ ─────────────────────────────────── │
│ Unique Words:   542                 │
│ Diversity:      43% (Good)          │
│ Avg Word Length: 4.8 characters     │
│                                     │
│ Issue Breakdown                     │
│ ─────────────────────────────────── │
│ Grammar:   3 issues  🔴             │
│ Clarity:   5 issues  🟡             │
│ Style:     7 issues  🔵             │
└─────────────────────────────────────┘
```

### Improving Your Score

**To Improve Readability:**
1. Shorten long sentences
2. Use simpler words
3. Break up paragraphs
4. Reduce passive voice

**To Improve Vocabulary:**
1. Use synonyms for repeated words
2. Vary sentence structure
3. Learn new words
4. Read diverse content

---

## 📚 Custom Dictionary

### Overview

Add words that OpenGrammar should never flag as errors:
- Proper nouns (names, places)
- Technical terms
- Industry jargon
- Made-up words

### Managing Your Dictionary

#### Add Words

**Method 1: From Suggestion Popup**
1. Click underlined word
2. Click **Add to Dictionary**
3. Word is saved

**Method 2: Options Page**
1. Right-click extension → Options
2. Go to **Custom Dictionary**
3. Click **Add Word**
4. Enter word
5. Click **Save**

**Method 3: Bulk Import**
1. Options → Custom Dictionary
2. Click **Import**
3. Upload text file (one word per line)
4. Words are added

#### Remove Words

1. Options → Custom Dictionary
2. Find word in list
3. Click **Remove** (trash icon)
4. Confirm deletion

#### Export Dictionary

1. Options → Custom Dictionary
2. Click **Export**
3. Download JSON file
4. Save for backup

### Dictionary Tips

✅ **Good Words to Add:**
- Your name
- Company names
- Product names
- Technical terminology
- Common abbreviations you use

❌ **Don't Add:**
- Common misspellings
- Offensive words
- Temporary terms

### Example Dictionary

```
My Custom Dictionary (127 words)
─────────────────────────────────
✓ opengrammar
✓ typescript
✓ javascript
✓ swadhin
✓ api
✓ backend
✓ frontend
✓ devops
✓ kubernetes
✓ docker
...

[Add Word] [Import] [Export] [Clear All]
```

---

## 🌐 Site-Specific Settings

### Overview

Control OpenGrammar behavior per website:
- Disable on specific domains
- Different settings per site
- Automatic detection

### Disabling Sites

#### Method 1: Quick Disable
1. Click extension icon
2. Toggle **Enable on this site**
3. Site is added to disabled list

#### Method 2: Options Page
1. Right-click extension → Options
2. Go to **Site-Specific Settings**
3. Click **Add Domain**
4. Enter domain (e.g., `twitter.com`)
5. Toggle enabled/disabled
6. Click **Save**

### Managing Disabled Sites

```
Site-Specific Settings
─────────────────────────────────────
✓ gmail.com          [Disable] [Remove]
✓ docs.google.com    [Disable] [Remove]
✓ notion.so          [Disable] [Remove]
✗ twitter.com        [Enable]  [Remove]
✗ facebook.com       [Enable]  [Remove]

[Add Domain] [Disable All] [Enable All]
```

### When to Disable

**Good Candidates:**
- Social media (casual writing)
- Code editors (technical text)
- Gaming sites (chat)
- Sites with custom text inputs

**Keep Enabled:**
- Email clients
- Document editors
- Writing tools
- Forms and applications

---

## ⌨️ Keyboard Shortcuts

### Default Shortcuts

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| **Rewrite Selected Text** | `Ctrl+Shift+R` | `Cmd+Shift+R` |
| **Toggle Extension** | `Ctrl+Shift+E` | `Cmd+Shift+E` |
| **Open Statistics** | `Ctrl+Shift+S` | `Cmd+Shift+S` |
| **Open Settings** | `Ctrl+Shift+,` | `Cmd+Shift+,` |

### Customizing Shortcuts

#### Chrome/Brave/Edge
1. Go to `chrome://extensions/shortcuts`
2. Find OpenGrammar
3. Click shortcut field
4. Press new key combination
5. Click **Save**

#### Firefox
1. Go to `about:addons`
2. Click gear icon → **Manage Extension Shortcuts**
3. Find OpenGrammar
4. Set new shortcuts

### Shortcut Tips

✅ **Best Practices:**
- Use memorable combinations
- Avoid system shortcuts
- Keep hands on home row
- Practice muscle memory

❌ **Avoid:**
- `Ctrl+C`, `Ctrl+V` (copy/paste)
- `Ctrl+Z` (undo)
- `Ctrl+T` (new tab)
- Browser-reserved shortcuts

---

## 💡 Tips & Best Practices

### Daily Usage Tips

#### 1. Start with Rule-Based Only
- No API key needed
- Works offline
- Catches basic errors
- Fast and free

#### 2. Add AI for Complex Writing
- Use for important emails
- Enable for documents
- Disable for casual chat
- Choose right model

#### 3. Build Your Dictionary
- Add names early
- Include technical terms
- Import from other tools
- Sync across devices

#### 4. Use Tone Rewriting Wisely
- Professional for work
- Casual for friends
- Concise for messages
- Formal for documents

#### 5. Check Statistics Regularly
- Monitor readability
- Track vocabulary
- Set improvement goals
- Compare documents

### Workflow Integration

#### For Email
1. Compose in Gmail
2. Wait for grammar check
3. Review suggestions
4. Apply important fixes
5. Use tone rewriting for polish

#### For Documents
1. Write in Google Docs
2. Enable full checking
3. Review all suggestions
4. Check statistics
5. Rewrite key sections

#### For Social Media
1. Disable on casual sites
2. Enable for professional posts
3. Use concise tone
4. Quick grammar check only

#### For Coding/Technical
1. Disable in code editors
2. Enable for comments/docs
3. Add technical terms to dictionary
4. Use custom rules

### Common Mistakes to Avoid

❌ **Over-relying on AI**
- Review all suggestions
- Understand the changes
- Learn from mistakes
- Don't accept blindly

❌ **Ignoring Context**
- Consider your audience
- Match tone to situation
- Keep your voice
- Don't over-edit

❌ **Not Customizing**
- Add domain-specific terms
- Adjust settings per site
- Configure shortcuts
- Personalize dictionary

❌ **Skipping Statistics**
- Check readability
- Monitor progress
- Set goals
- Track improvements

### Advanced Tips

#### 1. Hybrid Mode
Use both engines:
- Rules for basic errors (free, fast)
- AI for complex issues (smart, contextual)

#### 2. Batch Processing
For long documents:
- Write first draft
- Enable checking
- Review all at once
- Apply in batches

#### 3. Custom Prompts
(If supported)
- Create custom instructions
- Save favorite tones
- Set default styles
- Automate common tasks

#### 4. Export & Backup
Regularly:
- Export settings
- Backup dictionary
- Save statistics
- Document custom rules

---

## 🆘 Troubleshooting

### Common Issues

**Problem:** No underlines appear

**Solutions:**
1. Check extension is enabled
2. Verify site not disabled
3. Test backend connection
4. Reload page
5. Check browser console

**Problem:** Suggestions not applying

**Solutions:**
1. Click directly on suggestion
2. Wait for popup to load
3. Check permissions
4. Try keyboard shortcut
5. Restart browser

**Problem:** Rewrite not working

**Solutions:**
1. Select text first
2. Check API key valid
3. Verify backend running
4. Try different tone
5. Check network connection

---

## 📚 Related Documentation

- [Browser Setup](04-browser-extension-setup.md) - Install on your browser
- [AI Providers](07-ai-providers.md) - Configure AI
- [Tone Rewriting](10-tone-rewriting.md) - Detailed rewriting guide
- [Troubleshooting](18-troubleshooting.md) - Fix common issues

---

**Happy Writing! ✨**

OpenGrammar is your companion for clear, confident writing. Use it wisely, customize it to your needs, and watch your writing improve!
