import {rtkApi} from "@/shared/api/rtkApi.ts";

interface deleteCheckModalArg {
    jobId: string;
    taskId: string;
}

export const DeleteCheckModalApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        deleteCheckModal: build.mutation<void, deleteCheckModalArg>({
                query: (ids) => ({
                    url: '/scheduletask/delete?jobId=' + ids.jobId + '&taskId=' + ids.taskId,
                    method: "DELETE"
                }),
                invalidatesTags: ['UserChecks']
            }
        )
    })
})

export const {useDeleteCheckModalMutation} = DeleteCheckModalApi;
