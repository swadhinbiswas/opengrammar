#!/usr/bin/env node
/**
 * Test script for Groq API integration
 * Usage: node test-groq.js
 */

import { Groq } from 'groq-sdk';

// Get API key from environment
const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  console.error('❌ Error: GROQ_API_KEY not found in .env file');
  console.error('Please edit backend/.env and add your Groq API key');
  console.error('Get your free API key at: https://console.groq.com');
  process.exit(1);
}

const groq = new Groq({ apiKey });

async function testGrammarCheck() {
  console.log('🧪 Testing Groq Grammar Check API...\n');
  
  const testText = 'me and him went to the store and buyed some milks';
  
  console.log('Input text:', testText);
  console.log('\nSending request to Groq...\n');

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { 
          role: 'system', 
          content: 'You are an expert grammar assistant. Return ONLY valid JSON.' 
        },
        { 
          role: 'user', 
          content: `Analyze this text for grammar, spelling, clarity, and style issues.

TEXT:
${testText}

Return JSON:
{
  "issues": [
    {
      "type": "grammar|spelling|clarity|style",
      "original": "exact text",
      "suggestion": "correction",
      "reason": "brief explanation"
    }
  ]
}

Return ONLY JSON. If no issues: {"issues": []}`
        }
      ],
      model: 'llama-3.1-70b-versatile',
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    let content = chatCompletion.choices[0]?.message?.content;
    
    if (!content) {
      console.error('❌ No response from API');
      return;
    }

    // Parse response
    content = content.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    const result = JSON.parse(content);

    console.log('✅ Success! Response:');
    console.log(JSON.stringify(result, null, 2));
    
    if (result.issues && result.issues.length > 0) {
      console.log(`\n✅ Found ${result.issues.length} issues:`);
      result.issues.forEach((issue, i) => {
        console.log(`\n${i + 1}. Type: ${issue.type}`);
        console.log(`   Original: "${issue.original}"`);
        console.log(`   Suggestion: "${issue.suggestion}"`);
        console.log(`   Reason: ${issue.reason}`);
      });
    } else {
      console.log('\n✅ No issues found');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

// Run test
testGrammarCheck().catch(console.error);
