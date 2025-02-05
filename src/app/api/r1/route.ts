import { deepseek } from '@ai-sdk/deepseek';
import { generateText } from 'ai';

const { reasoning, text } = await generateText({
  model: deepseek('deepseek-reasoner'),
  prompt: 'Explain quantum entanglement.',
});