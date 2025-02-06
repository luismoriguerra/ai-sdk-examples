'use client';

import { experimental_useObject as useObject } from 'ai/react';
import { notificationSchema } from '../api/object-generation/schema';
import Spinner from '@/components/Spinner';

export default function Page() {
    const { object, submit, isLoading } = useObject({
        api: '/api/object-generation',
        schema: notificationSchema,
    });

    return (
        <div className="max-w-2xl mx-auto p-6">
            {isLoading && <Spinner />}
            <button 
                onClick={() => submit('Messages during finals week.')}
                className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
                Generate notifications
            </button>

            <div className="space-y-4">
                {object?.notifications?.map((notification, index) => (
                    <div 
                        key={index} 
                        className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                    >
                        <h3 className="font-semibold text-lg text-gray-800 mb-2">
                            {notification?.name}
                        </h3>
                        <p className="text-gray-600">
                            {notification?.message}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}