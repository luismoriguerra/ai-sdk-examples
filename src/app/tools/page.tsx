'use client';

import { useChat } from 'ai/react';
import { type Message } from 'ai';

// Main Page Component
export default function Page() {
    const { messages, input, handleInputChange, handleSubmit, addToolResult } =
        useChat({
            api: '/api/tools',
            maxSteps: 5,

            // run client-side tools that are automatically executed:
            async onToolCall({ toolCall }) {
                if (toolCall.toolName === 'getLocation') {
                    const cities = [
                        'New York',
                        'Los Angeles',
                        'Chicago',
                        'San Francisco',
                    ];
                    return cities[Math.floor(Math.random() * cities.length)];
                }
            },
        });

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-4">
            <MessageList messages={messages} addToolResult={addToolResult} />
            <ChatInput 
                input={input} 
                handleInputChange={handleInputChange} 
                handleSubmit={handleSubmit} 
            />
            <div className="h-16" />
        </div>
    );
}

// Message List Component
function MessageList({ 
    messages, 
    addToolResult 
}: { 
    messages: Message[], 
    addToolResult: (result: { toolCallId: string; result: string }) => void 
}) {
    return (
        <div className="space-y-6">
            {messages?.map(message => (
                <MessageItem 
                    key={message.id} 
                    message={message} 
                    addToolResult={addToolResult} 
                />
            ))}
        </div>
    );
}

// Individual Message Component
function MessageItem({ 
    message, 
    addToolResult 
}: { 
    message: Message, 
    addToolResult: (result: { toolCallId: string; result: string }) => void 
}) {
    return (
        <div className="whitespace-pre-wrap">
            <div className={`font-medium mb-2 ${
                message.role === 'assistant' ? 'text-blue-600' : 'text-gray-700'
            }`}>
                {message.role.charAt(0).toUpperCase() + message.role.slice(1)}
            </div>
            {message.parts?.map(part => (
                <MessagePart key={part.type} part={part} addToolResult={addToolResult} />
            ))}
        </div>
    );
}

// Message Part Component
function MessagePart({ part, addToolResult }) {
    switch (part.type) {
        case 'text':
            return <div className="text-gray-700">{part.text}</div>;
        case 'tool-invocation':
            return <ToolInvocation toolInvocation={part.toolInvocation} addToolResult={addToolResult} />;
        default:
            return null;
    }
}

// Tool Invocation Component
function ToolInvocation({ toolInvocation, addToolResult }) {
    const callId = toolInvocation.toolCallId;

    switch (toolInvocation.toolName) {
        case 'askForConfirmation':
            return <AskForConfirmation toolInvocation={toolInvocation} addToolResult={addToolResult} />;
        case 'getLocation':
            return <GetLocation toolInvocation={toolInvocation} />;
        case 'getWeatherInformation':
            return <GetWeatherInformation toolInvocation={toolInvocation} />;
        default:
            return null;
    }
}

// Confirmation Tool Component
function AskForConfirmation({ toolInvocation, addToolResult }) {
    const callId = toolInvocation.toolCallId;

    switch (toolInvocation.state) {
        case 'call':
            return (
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="text-gray-700">{toolInvocation.args.message}</div>
                    <div className="flex gap-3">
                        <button
                            className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                            onClick={() => addToolResult({
                                toolCallId: callId,
                                result: 'Yes, confirmed.',
                            })}
                        >
                            Yes
                        </button>
                        <button
                            className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                            onClick={() => addToolResult({
                                toolCallId: callId,
                                result: 'No, denied',
                            })}
                        >
                            No
                        </button>
                    </div>
                </div>
            );
        case 'result':
            return (
                <div className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                    Location access allowed: {toolInvocation.result}
                </div>
            );
        default:
            return null;
    }
}

// Location Tool Component
function GetLocation({ toolInvocation }) {
    switch (toolInvocation.state) {
        case 'call':
            return (
                <div className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                    Getting location...
                </div>
            );
        case 'result':
            return (
                <div className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                    Location: {toolInvocation.result}
                </div>
            );
        default:
            return null;
    }
}

// Weather Tool Component
function GetWeatherInformation({ toolInvocation }) {
    switch (toolInvocation.state) {
        case 'partial-call':
            return (
                <pre className="bg-gray-50 p-3 rounded-lg overflow-x-auto">
                    {JSON.stringify(toolInvocation, null, 2)}
                </pre>
            );
        case 'call':
            return (
                <div className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                    Getting weather information for {toolInvocation.args.city}...
                </div>
            );
        case 'result':
            return (
                <div className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                    Weather in {toolInvocation.args.city}: {toolInvocation.result}
                </div>
            );
        default:
            return null;
    }
}

// Chat Input Component
function ChatInput({ 
    input, 
    handleInputChange, 
    handleSubmit 
}: {
    input: string,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}) {
    return (
        <form onSubmit={handleSubmit} className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
            <div className="max-w-3xl mx-auto">
                <input 
                    value={input} 
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Type your message..."
                />
            </div>
        </form>
    );
}