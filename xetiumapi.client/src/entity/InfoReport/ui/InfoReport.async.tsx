import {type ComponentType, lazy} from "react";

export const InfoReportAsync = lazy<ComponentType>(
    async () => await import('./InfoReport.tsx')
        .then((module) => ({default: module.InfoReport})),
);
