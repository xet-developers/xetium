import {ComponentType, lazy} from "react";

export const SitePositionTableAsync = lazy<ComponentType>(
    async () => await import('./SitePositionTable')
        .then((module) => ({default: module.ResultCheckTable})),
);
