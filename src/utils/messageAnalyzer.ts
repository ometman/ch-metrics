import natural from 'natural';
import { Message } from '../types/message';

const tokenizer = new natural.WordTokenizer();
const condolenceKeywords = [
  'sorry', 'condolences', 'sympathy', 'loss', 'passed', 'passing', 'rip',
  'rest in peace', 'deepest', 'thoughts and prayers', 'thinking of you',
  'heartfelt', 'grief', 'mourning', 'departed'
];

export function analyzeMessage(message: string): boolean {
  const tokens = tokenizer.tokenize(message.toLowerCase());
  if (!tokens) return false;
  
  return tokens.some(token => 
    condolenceKeywords.some(keyword => 
      keyword.includes(token) || token.includes(keyword)
    )
  );
}