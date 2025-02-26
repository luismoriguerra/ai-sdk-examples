'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { streamComponent } from '../api/streaming-ui/actions';


export default function Page() {
    const [component, setComponent] = useState<React.ReactNode>();

    return (
        <div>
            <form
                onSubmit={async e => {
                    e.preventDefault();
                    setComponent(await streamComponent());
                }}
            >
                <Button>Stream Component</Button>
            </form>
            <div>{component}</div>
        </div>
    );
}