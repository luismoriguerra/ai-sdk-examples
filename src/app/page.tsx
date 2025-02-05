'use client';

import Spinner from '@/components/Spinner';
import { useChat } from 'ai/react';

export default function Page() {
  const { messages, setMessages, input, handleInputChange, handleSubmit, isLoading, stop, error, reload } =
    useChat({
      experimental_throttle: 50,

      // only send the last message to the server:
      // experimental_prepareRequestBody({ messages, id }) {
      //   return { message: messages[messages.length - 1], id };
      // },


      onFinish: (message, { usage, finishReason }) => {
        console.log('Finished streaming message:', message);
        console.log('Token usage:', usage);
        console.log('Finish reason:', finishReason);
      },
      onError: error => {
        console.error('An error occurred:', error);
      },
      onResponse: response => {
        console.log('Received HTTP response from server:', response);
      },
    });


  const handleDelete = (id: string) => {
    setMessages(messages.filter(message => message.id !== id))
  }

  return (
    <div className="max-w-3xl mx-auto p-4 min-h-screen">
      <div className="space-y-4 mb-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`p-4 rounded-lg ${
              message.role === 'user' 
                ? 'bg-blue-100 ml-12' 
                : 'bg-gray-100 mr-12'
            }`}
          >
            <div className="font-semibold mb-2">
              {message.role === 'user' ? 'User: ' : 'AI: '}
            </div>
            <div className="whitespace-pre-wrap">
              {message.parts.map((part, index) => {
                if (part.type === 'text') {
                  return <div key={index}>{part.text}</div>;
                }
                if (part.type === 'reasoning') {
                  return (
                    <pre key={index} className="bg-gray-50 p-2 rounded mt-2">
                      {part.reasoning}
                    </pre>
                  );
                }
              })}
            </div>
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="flex items-center gap-4 my-4">
          <Spinner />
          <button
            type="button"
            onClick={() => stop()}
            className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
          >
            Stop
          </button>
        </div>
      )}

      {error && (
        <div className="my-4 p-4 bg-red-50 rounded-lg">
          <div className="text-red-600 mb-2">An error occurred.</div>
          <button
            type="button"
            onClick={() => reload()}
            className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
          >
            Retry
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
        <div className="max-w-3xl mx-auto flex gap-4">
          <input
            name="prompt"
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            placeholder="Type your message..."
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
          >
            Submit
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              reload();
            }} 
            disabled={isLoading}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:bg-gray-100"
          >
            Regenerate
          </button>
        </div>
      </form>
    </div>
  );
}