'use client';

import { Message, useChat } from 'ai/react';

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit, data, setData } =
        useChat({
            api: '/api/custom-data',
        });

    return (
        <div className="max-w-2xl mx-auto p-4 min-h-screen flex flex-col">
            <div className="flex-1 mb-4">
                {data && (
                    <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-auto">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                )}

                <div className="space-y-4">
                    {messages?.map((m: Message) => (
                        <div
                            key={m.id}
                            className={`p-4 rounded-lg ${m.role === 'assistant'
                                    ? 'bg-blue-100 ml-4'
                                    : 'bg-gray-100 mr-4'
                                }`}
                        >
                            {m.annotations && <>{JSON.stringify(m.annotations)}</>}
                            <div className="font-semibold mb-1 text-sm text-gray-600">
                                {m.role}
                            </div>
                            <div className="text-gray-800">{m.content}</div>
                        </div>
                    ))}
                </div>
            </div>

            <form
                onSubmit={e => {
                    setData(undefined);
                    handleSubmit(e);
                }}
                className="border-t bg-white p-4 -mx-4 -mb-4"
            >
                <input
                    value={input}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message..."
                />
            </form>
        </div>
    );
}