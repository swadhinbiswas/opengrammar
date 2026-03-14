# 📊 Writing Statistics Guide

Analyze and improve your writing with detailed statistics and metrics.

---

## 📋 Overview

OpenGrammar provides comprehensive writing analytics to help you understand and improve your writing style.

---

## 📈 Available Metrics

### Basic Counts

#### Words
**What it measures:** Total number of words in your text

**Why it matters:**
- Track writing progress
- Meet word count requirements
- Monitor document length

**Example:**
```
Text: "The quick brown fox jumps over the lazy dog"
Word Count: 9
```

#### Characters
**What it measures:** Total characters (with and without spaces)

**Why it matters:**
- Social media limits (Twitter: 280 chars)
- SMS message length
- Meta descriptions

**Example:**
```
Text: "Hello World"
Characters (with spaces): 11
Characters (no spaces): 10
```

#### Sentences
**What it measures:** Number of complete sentences

**Why it matters:**
- Sentence variety
- Writing rhythm
- Readability

**Example:**
```
Text: "Hello. How are you? I hope you're well!"
Sentences: 3
```

#### Paragraphs
**What it measures:** Number of paragraph breaks

**Why it matters:**
- Document structure
- Visual breaks
- Organization

---

### Readability Scores

#### Flesch Reading Ease Score

**Scale:** 0-100 (higher = easier to read)

**Interpretation:**
```
90-100: Very Easy (5th grade)     ████████████████████
80-89:  Easy (6th grade)          ██████████████████
70-79:  Fairly Easy (7th grade)   ████████████████
60-69:  Standard (8th-9th grade)  ██████████████
50-59:  Fairly Difficult (10th-12th) ████████████
30-49:  Difficult (College)       ██████████
0-29:   Very Difficult (Graduate) ██████
```

**Formula:**
```
206.835 - 1.015 × (words/sentences) - 84.6 × (syllables/words)
```

**Tips to Improve:**
- Use shorter sentences
- Choose simpler words
- Break up complex ideas

#### Flesch-Kincaid Grade Level

**Scale:** US grade levels (1-18+)

**Interpretation:**
```
1-6:   Elementary School
7-9:   Middle School
10-12: High School
13-16: College
17+:   Graduate School
```

**Example:**
```
Grade 8.5: Understandable by average 8th grader
Grade 12:  High school senior level
Grade 16:  College graduate level
```

**Tips to Improve:**
- Reduce sentence length
- Use fewer complex words
- Simplify sentence structure

#### Automated Readability Index (ARI)

**Scale:** 1-14+ (similar to grade levels)

**Formula:**
```
4.71 × (characters/words) + 0.5 × (words/sentences) - 21.43
```

**Interpretation:**
```
1-6:   Ages 5-12 (Elementary)
7-9:   Ages 12-15 (Middle School)
10-12: Ages 15-18 (High School)
13+:   Ages 18+ (Adult)
```

---

### Time Estimates

#### Reading Time

**Calculation:**
```
Words ÷ 200 words per minute = Reading time in minutes
```

**Example:**
```
1,000 words ÷ 200 = 5 minutes reading time
```

**Use cases:**
- Blog posts
- Articles
- Documents
- Emails

#### Speaking Time

**Calculation:**
```
Words ÷ 150 words per minute = Speaking time in minutes
```

**Example:**
```
1,000 words ÷ 150 = 6.67 minutes speaking time
```

**Use cases:**
- Presentations
- Speeches
- Video scripts
- Podcasts

---

### Vocabulary Analysis

#### Unique Words

**What it measures:** Number of different words used

**Example:**
```
Text: "The cat sat on the mat. The cat was happy."
Total words: 10
Unique words: 7 (the, cat, sat, on, mat, was, happy)
```

#### Vocabulary Diversity

**Calculation:**
```
(Unique Words ÷ Total Words) × 100 = Diversity %
```

**Interpretation:**
```
60%+: Excellent vocabulary
50-59%: Good vocabulary
40-49%: Average vocabulary
30-39%: Limited vocabulary
<30%:  Very limited vocabulary
```

**Tips to Improve:**
- Use synonyms
- Vary word choice
- Learn new words
- Read diverse content

#### Average Word Length

**What it measures:** Mean characters per word

**Interpretation:**
```
3-4 chars: Simple vocabulary
4-5 chars: Average vocabulary
5-6 chars: Advanced vocabulary
6+ chars:  Complex vocabulary
```

---

## 📊 Viewing Statistics

### Method 1: Extension Popup

1. **Click Extension Icon**
2. **Select Statistics Tab**
3. **View Real-time Stats**

**Displays:**
- Word count
- Reading time
- Readability score
- Issue breakdown

### Method 2: Options Page

1. **Right-click Extension → Options**
2. **Navigate to Statistics**
3. **View Detailed Analytics**

**Displays:**
- All metrics
- Historical data
- Trends over time

### Method 3: Manual Check

1. **Select Text**
2. **Right-click → "Analyze with OpenGrammar"**
3. **View Statistics Popup**

---

## 📈 Example Statistics Report

```
┌─────────────────────────────────────────┐
│ Writing Statistics Report               │
├─────────────────────────────────────────┤
│                                         │
│ 📊 Basic Counts                         │
│ ─────────────────────────────────────── │
│ Words:              1,248               │
│ Characters:         6,542               │
│ Characters (no sp): 5,421               │
│ Sentences:          87                  │
│ Paragraphs:         12                  │
│ Syllables:          1,876               │
│                                         │
│ 📖 Readability Scores                   │
│ ─────────────────────────────────────── │
│ Flesch Ease:        78.5 (Excellent)    │
│ Grade Level:        8.5 (Good)          │
│ ARI:                9.2 (Good)          │
│ Reading Level:      8th-9th grade       │
│                                         │
│ ⏱️ Time Estimates                       │
│ ─────────────────────────────────────── │
│ Reading Time:       6 min 14 sec        │
│ Speaking Time:      8 min 19 sec        │
│                                         │
│ 🔤 Vocabulary Analysis                  │
│ ─────────────────────────────────────── │
│ Unique Words:       542                 │
│ Vocabulary Diversity: 43.4% (Good)      │
│ Average Word Length: 4.8 characters     │
│ Long Words (>6):    156                 │
│                                         │
│ ⚠️ Issue Breakdown                      │
│ ─────────────────────────────────────── │
│ Grammar Errors:     3 🔴                │
│ Spelling Errors:    5 🔴                │
│ Style Issues:       7 🔵                │
│ Clarity Issues:     4 🟡                │
│ Total Issues:       19                  │
│                                         │
│ 📈 Overall Score                        │
│ ─────────────────────────────────────── │
│ Writing Quality:    85/100 (Very Good)  │
│ ████████████████████░░░░                │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🎯 Improving Your Statistics

### Improve Readability

**Goal:** Higher Flesch score (easier to read)

**Strategies:**

1. **Shorten Sentences**
   ```
   Before: "The report, which was compiled over several months 
            by a team of researchers who worked tirelessly, 
            contains important findings." (32 words)
   
   After: "The report contains important findings. A team of 
           researchers compiled it over several months. They 
           worked tirelessly." (3 sentences, avg 8 words)
   ```

2. **Use Simpler Words**
   ```
   Before: "utilize, implement, facilitate, demonstrate"
   After:  "use, put in place, help, show"
   ```

3. **Break Up Paragraphs**
   - One idea per paragraph
   - 3-5 sentences max
   - White space helps readability

### Improve Vocabulary Diversity

**Goal:** 50%+ diversity score

**Strategies:**

1. **Use Synonyms**
   ```
   Before: "The product is good. The product is useful. 
            The product is reliable."
   
   After:  "The product is excellent. It's practical and 
            dependable. This item serves its purpose well."
   ```

2. **Vary Sentence Structure**
   ```
   Before: "I went to the store. I bought milk. I came home."
   After:  "After going to the store and buying milk, I 
            returned home."
   ```

3. **Learn New Words**
   - Read widely
   - Keep a word journal
   - Use a thesaurus
   - Practice new vocabulary

### Improve Sentence Length

**Goal:** 15-20 words average

**Strategies:**

1. **Identify Long Sentences**
   - Look for sentences >30 words
   - Check for multiple clauses
   - Find run-on sentences

2. **Split Long Sentences**
   ```
   Before: "The conference, which was held in San Francisco 
            last month and attended by over 500 professionals 
            from various industries, was highly successful."
   
   After:  "The conference was held in San Francisco last 
            month. Over 500 professionals attended from various 
            industries. The event was highly successful."
   ```

3. **Vary Sentence Length**
   - Mix short and long sentences
   - Short for impact
   - Long for detail
   - Creates rhythm

---

## 📊 Tracking Progress

### Set Goals

**Example Goals:**
```
Week 1: Reduce average sentence length to 20 words
Week 2: Improve Flesch score to 70+
Week 3: Increase vocabulary diversity to 50%
Week 4: Maintain 85+ overall score
```

### Monitor Trends

**Track Over Time:**
- Daily writing sessions
- Weekly averages
- Monthly improvements
- Document comparisons

### Compare Documents

**Compare:**
- Different writing styles
- Various topics
- Before/after edits
- Your writing vs. professionals

---

## 💡 Tips for Specific Use Cases

### Academic Writing

**Target Metrics:**
- Grade Level: 12-16
- Flesch: 50-60
- Sentence Length: 20-25 words
- Vocabulary Diversity: 60%+

**Tips:**
- Technical terms are okay
- Maintain clarity
- Cite sources properly
- Use formal tone

### Business Writing

**Target Metrics:**
- Grade Level: 10-12
- Flesch: 60-70
- Sentence Length: 15-20 words
- Vocabulary Diversity: 50%+

**Tips:**
- Be concise
- Use active voice
- Clear call-to-action
- Professional tone

### Blog Posts

**Target Metrics:**
- Grade Level: 8-10
- Flesch: 70-80
- Sentence Length: 15-18 words
- Vocabulary Diversity: 45%+

**Tips:**
- Write conversationally
- Use subheadings
- Short paragraphs
- Engaging tone

### Social Media

**Target Metrics:**
- Grade Level: 6-8
- Flesch: 80-90
- Sentence Length: 10-15 words
- Character Count: Platform limits

**Tips:**
- Be brief
- Use emojis appropriately
- Include hashtags
- Engaging hooks

---

## 🆘 Troubleshooting

### Problem: Scores Seem Wrong

**Solutions:**
- Check text selection (select all text)
- Ensure proper sentence punctuation
- Verify paragraph breaks
- Try recalculating

### Problem: Statistics Not Loading

**Solutions:**
- Refresh the page
- Check extension is enabled
- Verify backend connection
- Clear browser cache

### Problem: Metrics Inconsistent

**Solutions:**
- Different tools use different formulas
- Focus on trends, not absolute numbers
- Use OpenGrammar consistently
- Compare with multiple tools

---

## 📚 Related Documentation

- [Using OpenGrammar](09-using-opengrammar.md) - Complete user guide
- [Tone Rewriting](10-tone-rewriting.md) - Improve writing style
- [Grammar Rules](16-grammar-rules.md) - Understand errors

---

**Happy Writing! 📊**

Use statistics to understand and improve your writing over time!
