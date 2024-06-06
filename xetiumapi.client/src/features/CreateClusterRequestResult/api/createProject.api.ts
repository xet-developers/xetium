import {rtkApi} from "@/shared/api/rtkApi.ts";

export const CreateProjectApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        postCreateProject: build.query({
                query: () => ({
                    url: '/',
                    params: {},
                })
            }
        )
    })
})

export const useCreateProjectApi = CreateProjectApi.useLazyPostCreateProjectQuery;
