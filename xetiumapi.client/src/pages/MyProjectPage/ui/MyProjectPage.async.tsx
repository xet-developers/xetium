import { type ComponentType, lazy } from 'react';

export const MyProjectPageAsync = lazy<ComponentType>(
    async () =>
        await import('./MyProjectPage'
            ).then((module) => ({ default: module.MyProjectPage })),
);
