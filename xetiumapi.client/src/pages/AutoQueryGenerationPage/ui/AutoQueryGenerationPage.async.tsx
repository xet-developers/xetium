import { type ComponentType, lazy } from 'react';

export const AutoQueryGenerationPageAsync = lazy<ComponentType>(
    async () =>
        await import('./AutoQueryGenerationPage'
            ).then((module) => ({ default: module.AutoQueryGenerationPage })),
);
