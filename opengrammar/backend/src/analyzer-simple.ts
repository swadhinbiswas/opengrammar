import type { Issue, CustomRule } from './shared-types.js';

export class RuleBasedAnalyzer {
  private static dictionary: Set<string> = new Set();
  private static customRules: CustomRule[] = [];

  static analyze(text: string, options?: { dictionary?: string[]; customRules?: CustomRule[] }): Issue[] {
    const issues: Issue[] = [];

    if (options?.dictionary) {
      this.dictionary = new Set(options.dictionary.map(w => w.toLowerCase()));
    }

    if (options?.customRules) {
      this.customRules = options.customRules;
    }

    // Run all checks
    issues.push(...this.checkRepetition(text));
    issues.push(...this.checkSpacingErrors(text));
    issues.push(...this.checkBasicGrammar(text));
    issues.push(...this.checkCommonMisspellings(text));
    issues.push(...this.checkPassiveVoice(text));
    issues.push(...this.checkItsIt(text));
    issues.push(...this.checkYourYoure(text));
    issues.push(...this.checkTheirThereTheyre(text));
    issues.push(...this.checkApostropheErrors(text));
    issues.push(...this.checkWeakWords(text));
    issues.push(...this.checkRedundantPhrases(text));
    issues.push(...this.checkLongSentences(text));
    issues.push(...this.checkCustomRules(text));

    return issues;
  }

  private static checkBasicGrammar(text: string): Issue[] {
    const issues: Issue[] = [];

    const grammarRules: Array<{pattern: RegExp, suggestion: string, reason: string}> = [
      {
        pattern: /\b(me|him|her|them|us)\s+and\s+(I|he|she|they|we)\b/gi,
        suggestion: '$2 and $1',
        reason: 'Use subject pronouns (I, he, she, they, we) when they are part of the subject.'
      },
      {
        pattern: /\bbuyed\b/gi,
        suggestion: 'bought',
        reason: '"Buyed" is not a word. The past tense of "buy" is "bought".'
      },
      {
        pattern: /\brunned\b/gi,
        suggestion: 'ran',
        reason: '"Runned" is not a word. The past tense of "run" is "ran".'
      },
      {
        pattern: /\bgoed\b/gi,
        suggestion: 'went',
        reason: '"Goed" is not a word. The past tense of "go" is "went".'
      },
      {
        pattern: /\beated\b/gi,
        suggestion: 'ate',
        reason: '"Eated" is not a word. The past tense of "eat" is "ate".'
      },
      {
        pattern: /\bseed\b/gi,
        suggestion: 'saw',
        reason: '"Seed" is not the past tense. The past tense of "see" is "saw".'
      },
      {
        pattern: /\bcomed\b/gi,
        suggestion: 'came',
        reason: '"Comed" is not a word. The past tense of "come" is "came".'
      },
      {
        pattern: /\btaked\b/gi,
        suggestion: 'took',
        reason: '"Taked" is not a word. The past tense of "take" is "took".'
      },
      {
        pattern: /\bbringed\b/gi,
        suggestion: 'brought',
        reason: '"Bringed" is not a word. The past tense of "bring" is "brought".'
      },
      {
        pattern: /\bthinked\b/gi,
        suggestion: 'thought',
        reason: '"Thinked" is not a word. The past tense of "think" is "thought".'
      },
      {
        pattern: /\bknowed\b/gi,
        suggestion: 'knew',
        reason: '"Knowed" is not a word. The past tense of "know" is "knew".'
      },
      {
        pattern: /\bwanna\b/gi,
        suggestion: 'want to',
        reason: '"Wanna" is informal. Use "want to" in formal writing.'
      },
      {
        pattern: /\bgotta\b/gi,
        suggestion: 'have to',
        reason: '"Gotta" is informal. Use "have to" in formal writing.'
      },
      {
        pattern: /\bkinda\b/gi,
        suggestion: 'kind of',
        reason: '"Kinda" is informal. Use "kind of" in formal writing.'
      },
      {
        pattern: /\bcould\s+of\b/gi,
        suggestion: 'could have',
        reason: '"Could of" is incorrect. Use "could have".'
      },
      {
        pattern: /\bwould\s+of\b/gi,
        suggestion: 'would have',
        reason: '"Would of" is incorrect. Use "would have".'
      },
      {
        pattern: /\bshould\s+of\b/gi,
        suggestion: 'should have',
        reason: '"Should of" is incorrect. Use "should have".'
      },
      {
        pattern: /\balot\b/gi,
        suggestion: 'a lot',
        reason: '"Alot" is misspelled. Use "a lot" (two words).'
      },
      {
        pattern: /\bshouldnt\b/gi,
        suggestion: "shouldn't",
        reason: 'Missing apostrophe in "shouldn\'t".'
      },
      {
        pattern: /\bcouldnt\b/gi,
        suggestion: "couldn't",
        reason: 'Missing apostrophe in "couldn\'t".'
      },
      {
        pattern: /\bwouldnt\b/gi,
        suggestion: "wouldn't",
        reason: 'Missing apostrophe in "wouldn\'t".'
      },
      {
        pattern: /\bdidnt\b/gi,
        suggestion: "didn't",
        reason: 'Missing apostrophe in "didn\'t".'
      },
      {
        pattern: /\bdoesnt\b/gi,
        suggestion: "doesn't",
        reason: 'Missing apostrophe in "doesn\'t".'
      },
      {
        pattern: /\bisnt\b/gi,
        suggestion: "isn't",
        reason: 'Missing apostrophe in "isn\'t".'
      },
      {
        pattern: /\barent\b/gi,
        suggestion: "aren't",
        reason: 'Missing apostrophe in "aren\'t".'
      },
      {
        pattern: /\bwasnt\b/gi,
        suggestion: "wasn't",
        reason: 'Missing apostrophe in "wasn\'t".'
      },
      {
        pattern: /\bwerent\b/gi,
        suggestion: "weren't",
        reason: 'Missing apostrophe in "weren\'t".'
      },
      {
        pattern: /\bdont\b/gi,
        suggestion: "don't",
        reason: 'Missing apostrophe in "don\'t".'
      },
      {
        pattern: /\bwrited\b/gi,
        suggestion: 'wrote',
        reason: '"Writed" is not a word. The past tense of "write" is "wrote".'
      },
      {
        pattern: /\bwas\s+(\w+ed)\b/gi,
        suggestion: 'Consider active voice',
        reason: 'Passive voice construction detected.'
      },
      {
        pattern: /\bwere\s+(\w+ed)\b/gi,
        suggestion: 'Consider active voice',
        reason: 'Passive voice construction detected.'
      },
    ];

    for (const rule of grammarRules) {
      const matches = text.matchAll(rule.pattern);
      for (const match of matches) {
        if (match[0] && match.index !== undefined) {
          issues.push({
            type: 'grammar',
            original: match[0],
            suggestion: match[0].replace(rule.pattern, rule.suggestion),
            reason: rule.reason,
            offset: match.index,
            length: match[0].length,
          });
        }
      }
    }

    return issues;
  }

  private static checkCommonMisspellings(text: string): Issue[] {
    const issues: Issue[] = [];

    const commonMisspellings: Record<string, string> = {
      'teh': 'the',
      'taht': 'that',
      'waht': 'what',
      'whta': 'what',
      'hte': 'the',
      'iwth': 'with',
      'witht': 'with',
      'adn': 'and',
      'nad': 'and',
      'becuase': 'because',
      'becasue': 'because',
      'beacuse': 'because',
      'becomeing': 'becoming',
      'begining': 'beginning',
      'buisness': 'business',
      'calender': 'calendar',
      'cant': "can't",
      'collegue': 'colleague',
      'comming': 'coming',
      'completly': 'completely',
      'definately': 'definitely',
      'definitly': 'definitely',
      'dissapear': 'disappear',
      'enviroment': 'environment',
      'existance': 'existence',
      'experiance': 'experience',
      'familar': 'familiar',
      'finaly': 'finally',
      'freind': 'friend',
      'goverment': 'government',
      'grammer': 'grammar',
      'happend': 'happened',
      'immediatly': 'immediately',
      'independant': 'independent',
      'knowlege': 'knowledge',
      'libary': 'library',
      'neccessary': 'necessary',
      'occured': 'occurred',
      'seperate': 'separate',
      'similer': 'similar',
      'sincerly': 'sincerely',
      'speach': 'speech',
      'strenght': 'strength',
      'succesful': 'successful',
      'tommorrow': 'tomorrow',
      'truely': 'truly',
      'unfortunatly': 'unfortunately',
      'untill': 'until',
      'usefull': 'useful',
      'wether': 'whether',
      'wich': 'which',
    };

    for (const [wrong, correct] of Object.entries(commonMisspellings)) {
      const regex = new RegExp(`\\b${wrong}\\b`, 'gi');
      const matches = text.matchAll(regex);
      for (const match of matches) {
        if (match[0] && match.index !== undefined) {
          issues.push({
            type: 'spelling',
            original: match[0],
            suggestion: correct,
            reason: `Misspelled word. The correct spelling is "${correct}".`,
            offset: match.index,
            length: match[0].length,
          });
        }
      }
    }

    return issues;
  }

  private static checkPassiveVoice(text: string): Issue[] {
    const issues: Issue[] = [];
    
    const passivePatterns = [
      /\b(am|are|is|was|were|be|been|being)\s+(\w+ed)\b/gi,
      /\b(am|are|is|was|were|be|been|being)\s+(\w+en)\b/gi,
    ];

    for (const pattern of passivePatterns) {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        if (match[0] && match.index !== undefined) {
          issues.push({
            type: 'style',
            original: match[0],
            suggestion: 'Consider using active voice',
            reason: 'Passive voice can make sentences weaker and less direct.',
            offset: match.index,
            length: match[0].length,
          });
        }
      }
    }
    return issues;
  }

  private static checkRepetition(text: string): Issue[] {
    const issues: Issue[] = [];
    const repetitionRegex = /\b(\w+)\s+\1\b/gi;
    const matches = text.matchAll(repetitionRegex);
    for (const match of matches) {
      if (match[0] && match.index !== undefined && match[1]) {
        issues.push({
          type: 'grammar',
          original: match[0],
          suggestion: match[1],
          reason: 'Repeated word detected.',
          offset: match.index,
          length: match[0].length,
        });
      }
    }
    return issues;
  }

  private static checkLongSentences(text: string): Issue[] {
    const issues: Issue[] = [];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    let currentIndex = 0;
    
    for (const sentence of sentences) {
      const words = sentence.trim().split(/\s+/).length;
      if (words > 35) {
        issues.push({
          type: 'clarity',
          original: sentence.substring(0, 30) + '...',
          suggestion: 'Consider splitting into shorter sentences',
          reason: `This sentence has ${words} words. Shorter sentences are easier to read.`,
          offset: currentIndex,
          length: sentence.length,
        });
      }
      currentIndex += sentence.length + 1;
    }
    return issues;
  }

  private static checkSpacingErrors(text: string): Issue[] {
    const issues: Issue[] = [];
    
    // Double spaces
    const doubleSpaceRegex = / {2,}/g;
    const doubleMatches = text.matchAll(doubleSpaceRegex);
    for (const match of doubleMatches) {
      if (match[0] && match.index !== undefined) {
        issues.push({
          type: 'grammar',
          original: match[0],
          suggestion: ' ',
          reason: 'Multiple spaces detected. Use single space.',
          offset: match.index,
          length: match[0].length,
        });
      }
    }
    
    return issues;
  }

  private static checkItsIt(text: string): Issue[] {
    const issues: Issue[] = [];
    
    // "its" followed by common verb forms should be "it's"
    const itsWrongRegex = /\bits\s+(been|become|seemed|gotten|made|done|said|written|created)\b/gi;
    const itsMatches = text.matchAll(itsWrongRegex);
    for (const match of itsMatches) {
      if (match[0] && match.index !== undefined && match[1]) {
        issues.push({
          type: 'spelling',
          original: match[0],
          suggestion: `it's ${match[1]}`,
          reason: "Use 'it's' (contraction) when you mean 'it is' or 'it has'.",
          offset: match.index,
          length: match[0].length,
        });
      }
    }
    return issues;
  }

  private static checkTheirThereTheyre(text: string): Issue[] {
    const issues: Issue[] = [];
    
    // "their" followed by verb forms should be "they're"
    const theirWrongRegex = /\btheir\s+(going|coming|working|doing|making|taking|getting|having|being)\b/gi;
    const theirMatches = text.matchAll(theirWrongRegex);
    for (const match of theirMatches) {
      if (match[0] && match.index !== undefined && match[1]) {
        issues.push({
          type: 'spelling',
          original: match[0],
          suggestion: `they're ${match[1]}`,
          reason: "Use 'they're' (contraction of 'they are') here.",
          offset: match.index,
          length: match[0].length,
        });
      }
    }
    return issues;
  }

  private static checkYourYoure(text: string): Issue[] {
    const issues: Issue[] = [];
    
    // "your" followed by adjectives should be "you're"
    const yourWrongRegex = /\byour\s+(welcome|right|wrong|amazing|awesome|great|excellent|perfect|beautiful|brilliant|smart|intelligent|ready|finished|done|correct|incorrect|mistaken|confused|lost|found|gone|here|there|early|late|busy|free|important|necessary)\b/gi;
    const yourMatches = text.matchAll(yourWrongRegex);
    for (const match of yourMatches) {
      if (match[0] && match.index !== undefined && match[1]) {
        issues.push({
          type: 'spelling',
          original: match[0],
          suggestion: `you're ${match[1]}`,
          reason: "Use 'you're' (contraction of 'you are') here.",
          offset: match.index,
          length: match[0].length,
        });
      }
    }
    return issues;
  }

  private static checkApostropheErrors(text: string): Issue[] {
    const issues: Issue[] = [];
    return issues;
  }

  private static checkWeakWords(text: string): Issue[] {
    const issues: Issue[] = [];
    
    const weakWords: Record<string, string> = {
      'very good': 'excellent',
      'very bad': 'terrible',
      'very big': 'enormous',
      'very small': 'tiny',
      'very important': 'crucial',
      'very interesting': 'fascinating',
      'kind of': 'somewhat',
      'sort of': 'somewhat',
      'a lot': 'much',
      'stuff': 'things',
    };
    
    for (const [weak, strong] of Object.entries(weakWords)) {
      const regex = new RegExp(`\\b${weak}\\b`, 'gi');
      const matches = text.matchAll(regex);
      for (const match of matches) {
        if (match[0] && match.index !== undefined) {
          issues.push({
            type: 'style',
            original: match[0],
            suggestion: strong,
            reason: `Consider a stronger word: "${strong}".`,
            offset: match.index,
            length: match[0].length,
          });
        }
      }
    }
    return issues;
  }

  private static checkRedundantPhrases(text: string): Issue[] {
    const issues: Issue[] = [];
    
    const redundantPhrases: Record<string, string> = {
      'absolutely essential': 'essential',
      'advance planning': 'planning',
      'basic fundamentals': 'fundamentals',
      'close proximity': 'proximity',
      'completely eliminate': 'eliminate',
      'end result': 'result',
      'exact same': 'same',
      'final outcome': 'outcome',
      'free gift': 'gift',
      'future plans': 'plans',
      'past history': 'history',
      'personal opinion': 'opinion',
      'true fact': 'fact',
      'unexpected surprise': 'surprise',
    };
    
    for (const [phrase, replacement] of Object.entries(redundantPhrases)) {
      const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
      const matches = text.matchAll(regex);
      for (const match of matches) {
        if (match[0] && match.index !== undefined) {
          issues.push({
            type: 'clarity',
            original: match[0],
            suggestion: replacement,
            reason: `Redundant phrase. Use "${replacement}" instead.`,
            offset: match.index,
            length: match[0].length,
          });
        }
      }
    }
    return issues;
  }

  private static checkCustomRules(text: string): Issue[] {
    const issues: Issue[] = [];
    return issues;
  }
}
