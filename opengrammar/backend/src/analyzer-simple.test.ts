import { describe, it, expect } from 'bun:test';
import { RuleBasedAnalyzer } from './analyzer-simple';

describe('RuleBasedAnalyzer', () => {
  describe('checkRepetition', () => {
    it('should detect repeated words', () => {
      const issues = RuleBasedAnalyzer.analyze('This is is a test');
      expect(issues.length).toBeGreaterThan(0);
      expect(issues.some(i => i.type === 'grammar')).toBe(true);
    });

    it('should not flag non-repeated words', () => {
      const issues = RuleBasedAnalyzer.analyze('This is a test');
      const repetitionIssues = issues.filter(i => i.type === 'grammar' && i.reason.includes('Repeated'));
      expect(repetitionIssues.length).toBe(0);
    });
  });

  describe('checkBasicGrammar', () => {
    it('should detect incorrect past tense "buyed"', () => {
      const issues = RuleBasedAnalyzer.analyze('I buyed a car yesterday');
      expect(issues.some(i => i.original.toLowerCase().includes('buyed'))).toBe(true);
    });

    it('should detect incorrect past tense "runned"', () => {
      const issues = RuleBasedAnalyzer.analyze('He runned to the store');
      expect(issues.some(i => i.original.toLowerCase().includes('runned'))).toBe(true);
    });

    it('should detect "could of" error', () => {
      const issues = RuleBasedAnalyzer.analyze('I could of gone');
      expect(issues.some(i => i.original.toLowerCase().includes('could of'))).toBe(true);
    });

    it('should detect "alot" misspelling', () => {
      const issues = RuleBasedAnalyzer.analyze('I have alot of work');
      expect(issues.some(i => i.original.toLowerCase() === 'alot')).toBe(true);
    });

    it('should detect missing apostrophes', () => {
      const issues = RuleBasedAnalyzer.analyze('I dont know');
      expect(issues.some(i => i.original.toLowerCase() === 'dont')).toBe(true);
    });
  });

  describe('checkCommonMisspellings', () => {
    it('should detect "teh" misspelling', () => {
      const issues = RuleBasedAnalyzer.analyze('teh quick brown fox');
      expect(issues.some(i => i.original.toLowerCase() === 'teh')).toBe(true);
    });

    it('should detect "becuase" misspelling', () => {
      const issues = RuleBasedAnalyzer.analyze('becuase it is');
      expect(issues.some(i => i.original.toLowerCase() === 'becuase')).toBe(true);
    });

    it('should detect "grammer" misspelling', () => {
      const issues = RuleBasedAnalyzer.analyze('Good grammer is important');
      expect(issues.some(i => i.original.toLowerCase() === 'grammer')).toBe(true);
    });
  });

  describe('checkItsIt', () => {
    it('should detect "its" when "it\'s" is needed', () => {
      const issues = RuleBasedAnalyzer.analyze('Its been a long day');
      expect(issues.some(i => i.original.toLowerCase() === 'its been')).toBe(true);
    });

    it('should not flag correct "its" usage', () => {
      const issues = RuleBasedAnalyzer.analyze('The dog wagged its tail');
      const itsIssues = issues.filter(i => i.type === 'spelling' && i.original.toLowerCase().includes('its'));
      expect(itsIssues.length).toBe(0);
    });
  });

  describe('checkYourYoure', () => {
    it('should detect "your" when "you\'re" is needed', () => {
      const issues = RuleBasedAnalyzer.analyze('Your welcome');
      expect(issues.some(i => i.original.toLowerCase() === 'your welcome')).toBe(true);
    });

    it('should detect "your right" error', () => {
      const issues = RuleBasedAnalyzer.analyze('I think your right');
      expect(issues.some(i => i.original.toLowerCase() === 'your right')).toBe(true);
    });
  });

  describe('checkTheirThereTheyre', () => {
    it('should detect "their" when "they\'re" is needed', () => {
      const issues = RuleBasedAnalyzer.analyze('Their going to the store');
      expect(issues.some(i => i.original.toLowerCase() === 'their going')).toBe(true);
    });
  });

  describe('checkWeakWords', () => {
    it('should detect "very good"', () => {
      const issues = RuleBasedAnalyzer.analyze('This is very good');
      expect(issues.some(i => i.original.toLowerCase() === 'very good')).toBe(true);
    });

    it('should detect "very bad"', () => {
      const issues = RuleBasedAnalyzer.analyze('That is very bad');
      expect(issues.some(i => i.original.toLowerCase() === 'very bad')).toBe(true);
    });
  });

  describe('checkRedundantPhrases', () => {
    it('should detect "absolutely essential"', () => {
      const issues = RuleBasedAnalyzer.analyze('This is absolutely essential');
      expect(issues.some(i => i.original.toLowerCase() === 'absolutely essential')).toBe(true);
    });

    it('should detect "free gift"', () => {
      const issues = RuleBasedAnalyzer.analyze('It was a free gift');
      expect(issues.some(i => i.original.toLowerCase() === 'free gift')).toBe(true);
    });
  });

  describe('checkLongSentences', () => {
    it('should flag very long sentences', () => {
      const longSentence = 'This is a very long sentence that continues on and on with many words because it needs to be long enough to trigger the warning and it keeps going with more and more words added to it without any break or pause or consideration for the reader who might find it difficult to follow such a lengthy construction.';
      const issues = RuleBasedAnalyzer.analyze(longSentence);
      expect(issues.some(i => i.type === 'clarity')).toBe(true);
    });

    it('should not flag normal sentences', () => {
      const issues = RuleBasedAnalyzer.analyze('This is a short sentence. This is another one.');
      const clarityIssues = issues.filter(i => i.type === 'clarity');
      expect(clarityIssues.length).toBe(0);
    });
  });

  describe('checkArticleErrors', () => {
    it('should detect "a hour" error', () => {
      const issues = RuleBasedAnalyzer.analyze('Wait a hour');
      expect(issues.some(i => i.original.toLowerCase().includes('a hour'))).toBe(true);
    });

    it('should detect "an university" error', () => {
      const issues = RuleBasedAnalyzer.analyze('An university student');
      expect(issues.some(i => i.original.toLowerCase().includes('an university'))).toBe(true);
    });
  });

  describe('checkSubjectVerbAgreement', () => {
    it('should detect "everyone are" error', () => {
      const issues = RuleBasedAnalyzer.analyze('Everyone are happy');
      expect(issues.some(i => i.original.toLowerCase().includes('everyone are'))).toBe(true);
    });

    it('should detect "nobody have" error', () => {
      const issues = RuleBasedAnalyzer.analyze('Nobody have seen it');
      expect(issues.some(i => i.original.toLowerCase().includes('nobody have'))).toBe(true);
    });
  });

  describe('checkCapitalizationErrors', () => {
    it('should detect lowercase "i" pronoun', () => {
      const issues = RuleBasedAnalyzer.analyze('i think this is good');
      expect(issues.some(i => i.type === 'spelling' && i.reason.includes('capitalized'))).toBe(true);
    });

    it('should detect sentence not starting with capital', () => {
      const issues = RuleBasedAnalyzer.analyze('Hello world. this is a test.');
      expect(issues.some(i => i.type === 'grammar' && i.reason.includes('capital'))).toBe(true);
    });
  });

  describe('checkSpacingErrors', () => {
    it('should detect double spaces', () => {
      const issues = RuleBasedAnalyzer.analyze('This  has  double  spaces');
      expect(issues.some(i => i.reason.includes('Multiple spaces'))).toBe(true);
    });
  });

  describe('checkPassiveVoice', () => {
    it('should detect passive voice', () => {
      const issues = RuleBasedAnalyzer.analyze('The ball was thrown by the boy');
      expect(issues.some(i => i.reason.toLowerCase().includes('passive'))).toBe(true);
    });
  });

  describe('analyze with options', () => {
    it('should use custom dictionary', () => {
      const issues = RuleBasedAnalyzer.analyze('This is opengrammar', {
        dictionary: ['opengrammar']
      });
      const spellingIssues = issues.filter(i => i.type === 'spelling' && i.original === 'opengrammar');
      expect(spellingIssues.length).toBe(0);
    });
  });

  describe('edge cases', () => {
    it('should handle empty text', () => {
      const issues = RuleBasedAnalyzer.analyze('');
      expect(issues.length).toBe(0);
    });

    it('should handle single word', () => {
      const issues = RuleBasedAnalyzer.analyze('Hello');
      expect(issues.length).toBe(0);
    });

    it('should handle special characters', () => {
      const issues = RuleBasedAnalyzer.analyze('Hello! How are you? I\'m fine.');
      expect(issues.length).toBe(0);
    });

    it('should handle multiline text', () => {
      const issues = RuleBasedAnalyzer.analyze('Line one.\nLine two.\nLine three.');
      expect(issues.length).toBe(0);
    });
  });
});
