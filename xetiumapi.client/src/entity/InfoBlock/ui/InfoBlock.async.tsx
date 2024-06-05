import {type ComponentType, lazy} from "react";

export const InfoBlockAsync = lazy<ComponentType>(
    async () => await import('./InfoBlock.tsx')
        .then((module) => ({default: module.InfoBlock})),
);
