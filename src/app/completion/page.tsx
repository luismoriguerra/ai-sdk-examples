'use client';

import { useCompletion } from 'ai/react';

export default function Page() {
    const { completion, input, handleInputChange, handleSubmit } = useCompletion({
        api: '/api/completion',
    });

    return (
        <div className="max-w-2xl mx-auto p-4 md:p-8">
            <h1 className="text-2xl font-bold mb-6">AI Completion</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2">
                    <input
                        name="prompt"
                        value={input}
                        onChange={handleInputChange}
                        id="input"
                        placeholder="Enter your prompt..."
                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Submit
                    </button>
                </div>
                {completion && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg prose max-w-none">
                        {completion}
                    </div>
                )}
            </form>
        </div>
    );
}