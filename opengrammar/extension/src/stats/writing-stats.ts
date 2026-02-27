export interface WritingStats {
  // Basic counts
  characterCount: number;
  characterCountNoSpaces: number;
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  syllableCount: number;
  
  // Readability scores
  fleschReadingEase: number;
  fleschKincaidGrade: number;
  automatedReadabilityIndex: number;
  
  // Vocabulary metrics
  uniqueWords: number;
  vocabularyDiversity: number;
  averageWordLength: number;
  averageSentenceLength: number;
  
  // Time estimates
  readingTimeSeconds: number;
  speakingTimeSeconds: number;
  
  // Issue breakdown
  grammarIssues: number;
  spellingIssues: number;
  clarityIssues: number;
  styleIssues: number;
  
  // Historical data (optional)
  sessionWordCount?: number;
  dailyAverage?: number;
}

export function calculateWritingStats(text: string, issues?: any[]): WritingStats {
  // Basic counts
  const characterCount = text.length;
  const characterCountNoSpaces = text.replace(/\s/g, '').length;
  
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceCount = sentences.length || 1;
  
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const paragraphCount = paragraphs.length || 1;
  
  const syllableCount = countSyllables(text);
  
  // Readability scores
  const fleschReadingEase = calculateFleschReadingEase(wordCount, sentenceCount, syllableCount);
  const fleschKincaidGrade = calculateFleschKincaidGrade(wordCount, sentenceCount, syllableCount);
  const automatedReadabilityIndex = calculateARI(characterCount, wordCount, sentenceCount);
  
  // Vocabulary metrics
  const uniqueWordsSet = new Set(words.map(w => w.toLowerCase()));
  const uniqueWords = uniqueWordsSet.size;
  const vocabularyDiversity = wordCount > 0 ? (uniqueWords / wordCount) * 100 : 0;
  const averageWordLength = wordCount > 0 ? words.reduce((acc, w) => acc + w.length, 0) / wordCount : 0;
  const averageSentenceLength = sentenceCount > 0 ? wordCount / sentenceCount : 0;
  
  // Time estimates (average: 200 wpm reading, 150 wpm speaking)
  const readingTimeSeconds = Math.ceil((wordCount / 200) * 60);
  const speakingTimeSeconds = Math.ceil((wordCount / 150) * 60);
  
  // Issue breakdown
  const issueCounts = {
    grammarIssues: 0,
    spellingIssues: 0,
    clarityIssues: 0,
    styleIssues: 0,
  };
  
  if (issues) {
    issues.forEach((issue: any) => {
      if (issue.type === 'grammar') issueCounts.grammarIssues++;
      else if (issue.type === 'spelling') issueCounts.spellingIssues++;
      else if (issue.type === 'clarity') issueCounts.clarityIssues++;
      else if (issue.type === 'style') issueCounts.styleIssues++;
    });
  }
  
  return {
    characterCount,
    characterCountNoSpaces,
    wordCount,
    sentenceCount,
    paragraphCount,
    syllableCount,
    fleschReadingEase,
    fleschKincaidGrade,
    automatedReadabilityIndex,
    uniqueWords,
    vocabularyDiversity,
    averageWordLength,
    averageSentenceLength,
    readingTimeSeconds,
    speakingTimeSeconds,
    ...issueCounts,
  };
}

function countSyllables(text: string): number {
  let count = 0;
  const words = text.toLowerCase().split(/\s+/);
  
  for (const word of words) {
    if (word.length <= 3) {
      count += 1;
      continue;
    }
    
    // Count vowel groups
    const vowelGroups = word.match(/[aeiouy]+/g);
    if (vowelGroups) {
      count += vowelGroups.length;
    }
    
    // Adjust for silent e
    if (word.endsWith('e') && !word.endsWith('le')) {
      count -= 1;
    }
    
    // Minimum 1 syllable per word
    count = Math.max(1, count);
  }
  
  return count;
}

function calculateFleschReadingEase(words: number, sentences: number, syllables: number): number {
  if (words === 0 || sentences === 0) return 0;
  const score = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
  return Math.round(score * 10) / 10;
}

function calculateFleschKincaidGrade(words: number, sentences: number, syllables: number): number {
  if (words === 0 || sentences === 0) return 0;
  const score = (0.39 * (words / sentences)) + (11.8 * (syllables / words)) - 15.59;
  return Math.round(score * 10) / 10;
}

function calculateARI(characters: number, words: number, sentences: number): number {
  if (words === 0 || sentences === 0) return 0;
  const score = 4.71 * (characters / words) + 0.5 * (words / sentences) - 21.43;
  return Math.round(score * 10) / 10;
}

export function getReadabilityLevel(score: number): string {
  if (score >= 90) return 'Very Easy (5th grade)';
  if (score >= 80) return 'Easy (6th grade)';
  if (score >= 70) return 'Fairly Easy (7th grade)';
  if (score >= 60) return 'Standard (8th-9th grade)';
  if (score >= 50) return 'Fairly Difficult (10th-12th grade)';
  if (score >= 30) return 'Difficult (College)';
  return 'Very Difficult (College Graduate+)';
}
