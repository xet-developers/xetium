import {rtkApi} from "@/shared/api/rtkApi.ts";

interface IScheduleTaskArg {
    projectID: string;
    dateTime: string;
    frequency: number;
    url: string;
    keywords: string[];
    searchSystem: number;
    top: number
}

export const CreateCheckModalApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getAllCheck: build.query<[], {id: string,date: string}>({
            query: (data) => ({
                url: '/scheduletask?projectId=' + data.id + '&' + data.date,
        }
        )
        }),
        postCreateCheck: build.mutation<void, IScheduleTaskArg>({
                query: (body) => ({
                    url: '/scheduletask/create',
                    method: 'POST',
                    body: JSON.stringify(body),
                })
            }
        ),
    })
})

export const {useGetAllCheckQuery, usePostCreateCheckMutation} = CreateCheckModalApi;