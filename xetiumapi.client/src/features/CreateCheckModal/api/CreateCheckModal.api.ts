import {rtkApi} from "@/shared/api/rtkApi.ts";

// "completedTask": [],
//     "uncompletedTask": [
//     {

//     },

interface ScheduleTaskDetails {

}

interface ICompT {
    ProjectId: string
    Date: string
    Keyword: string
    Position: number
    SearchSystem: number
    ScheduleTaskDetailId: string
    ScheduleTaskDetails: ScheduleTaskDetails
}

interface IUncompletedTask {
    scheduleTime: string,
    userId: string,
    projectID: string,
    jobId: number,
    url: string,
    top: number,
    frequency: number,
    Keywords: string[],
    searchSystem: number,
    isCompleted: boolean,
    id: string,
}

interface IScheduleTaskResp {
    CompletedTask: ICompT[]
    UncompletedTask: IUncompletedTask[]
}

interface IScheduleTaskArg {
    projectID: string;
    dateTime: string;
    frequency: number;
    url: string;
    keywords: string[];
    searchSystem: number;
    top: number;
    clusterId: string;
}

export const CreateCheckModalApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getAllCheck: build.query<IScheduleTaskResp, { id: string, date: string }>({
            query: (data) => ({
                url: '/scheduletask?projectId=' + data.id + '&' + data.date,
                // subscriptionOptions: { pollingInterval: 300 },
                // polling: { intervalMS: 600 }
            }),
            providesTags: ['UserChecks']
        }),
        postCreateCheck: build.mutation<void, IScheduleTaskArg>({
                query: (body) => ({
                    url: '/scheduletask/create',
                    method: 'POST',
                    body: JSON.stringify(body),
                }),
                invalidatesTags: ['UserChecks']
            }
        ),
    })
})

export const {useGetAllCheckQuery, usePostCreateCheckMutation} = CreateCheckModalApi;
