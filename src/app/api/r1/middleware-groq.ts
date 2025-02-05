import { groq } from '@ai-sdk/groq';
import {
  generateText,
  wrapLanguageModel,
  extractReasoningMiddleware,
} from 'ai';

// middleware to extract reasoning tokens
const enhancedModel = wrapLanguageModel({
  model: groq('deepseek-r1-distill-llama-70b'),
  middleware: extractReasoningMiddleware({ tagName: 'think' }),
});

const { reasoning, text } = await generateText({
  model: enhancedModel,
  prompt: 'Explain quantum entanglement.',
});