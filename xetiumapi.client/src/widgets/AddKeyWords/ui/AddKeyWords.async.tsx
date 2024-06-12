import {type ComponentType, lazy} from "react";

export const AddKeyWordsAsync = lazy<ComponentType>(
    async () => await import('./AddKeyWords.tsx')
        .then((module) => ({default: module.AddKeyWords})),
);
