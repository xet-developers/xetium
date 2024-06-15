import {rtkApi} from "@/shared/api/rtkApi.ts";

interface ICreteReportArg{
    firstDate: string;
    lastDate: string;
    projectId: string;
    clusterId: string
}

export const ResultsLastApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        createReport: build.mutation<Blob, ICreteReportArg>({
                query: (body) => ({
                    url: '/generation/positionreport',
                    method: "POST",
                    body: JSON.stringify(body)
                })
            }
        )
    })
})

export const {useCreateReportMutation} = ResultsLastApi;
