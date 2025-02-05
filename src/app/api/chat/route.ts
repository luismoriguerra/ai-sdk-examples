import { openai } from '@ai-sdk/openai';
import { streamText, tool, StreamData } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const data = new StreamData();

    const result = streamText({
        model: openai('gpt-4o-mini'),
        messages,
        maxSteps: 10,
        tools: {
            weather: tool({
                description: 'Get the weather in a location (fahrenheit)',
                parameters: z.object({
                    location: z.string().describe('The location to get the weather for'),
                }),
                execute: async ({ location }, { toolCallId }) => {

                    data.appendMessageAnnotation({
                        type: 'tool-status',
                        toolCallId,
                        status: 'in-progress',
                    });

                    await new Promise(resolve => setTimeout(resolve, 5000));

                    const temperature = Math.round(Math.random() * (90 - 32) + 32);
                    return {
                        location,
                        temperature,
                    };
                },
            }),
            convertFahrenheitToCelsius: tool({
                description: 'Convert a temperature in fahrenheit to celsius',
                parameters: z.object({
                    temperature: z
                        .number()
                        .describe('The temperature in fahrenheit to convert'),
                }),
                execute: async ({ temperature }) => {
                    const celsius = Math.round((temperature - 32) * (5 / 9));
                    return {
                        celsius,
                    };
                },
            }),
        },
        onFinish: () => {
            data.close();
        },
    });

    return result.toDataStreamResponse({
        sendReasoning: true,
        sendUsage: true,
    });
}