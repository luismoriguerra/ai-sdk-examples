'use client';

import { useChat } from 'ai/react';
import { Weather } from './components/weather';
import { Stock } from './components/stock';

export default function Page() {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: '/api/generative-ui',
    });

    return (
        <div className="max-w-3xl mx-auto p-4 min-h-screen">
            <div className="space-y-4 mb-4">
                {messages.map(message => (
                    <div key={message.id} className={`p-4 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                        <div className="font-semibold mb-2">
                            {message.role === 'user' ? 'User: ' : 'AI: '}
                        </div>
                        {/* <small><pre>{JSON.stringify(message, null, 2)}</pre></small> */}
                        {message.parts?.map((part, i) => {
                            if (part.type === 'text') {
                                return (
                                    <div key={i} className="whitespace-pre-wrap">
                                        {part.text}
                                    </div>
                                );
                            }

                            if (part.type === 'tool-invocation') {
                                const { toolName, toolCallId, state, result } = part.toolInvocation as any;

                                if (state === 'result') {
                                    if (toolName === 'displayWeather') {
                                        return (
                                            <div key={toolCallId} className="mt-2">
                                                <Weather {...result} />
                                            </div>
                                        );
                                    } else if (toolName === 'getStockPrice') {
                                        const { result } = part.toolInvocation as any;
                                        return <Stock key={toolCallId} {...result} />;
                                    }
                                }

                                return (
                                    <div key={toolCallId}>
                                        {toolName === 'displayWeather' ? (
                                            <div>Loading weather...</div>
                                        ) : toolName === 'getStockPrice' ? (
                                            <div>Loading stock price...</div>
                                        ) : (
                                            <div>Loading...</div>
                                        )}
                                    </div>
                                );
                            }
                        })}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="sticky bottom-0 left-0 right-0 bg-white p-4 border-t">
                <div className="max-w-3xl mx-auto flex gap-2">
                    <input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Type a message..."
                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}