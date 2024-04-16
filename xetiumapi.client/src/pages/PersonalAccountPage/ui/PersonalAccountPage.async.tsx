import { type ComponentType, lazy } from 'react';

export const PersonalAccountPageAsync = lazy<ComponentType>(
    async () =>
        await import('./PersonalAccountPage'
            ).then((module) => ({ default: module.PersonalAccountPage })),
);
