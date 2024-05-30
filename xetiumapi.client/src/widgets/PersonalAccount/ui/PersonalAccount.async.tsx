import {type ComponentType, lazy} from "react";

export const PersonalAccountAsync = lazy<ComponentType>(
    async () => await import('./PersonalAccount.tsx')
        .then((module) => ({default: module.PersonalAccount})),
);
