import {rtkApi} from "@/shared/api/rtkApi.ts";

export const ProjectApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        postProject: build.query({
                query: () => ({
                    url: '/',
                    params: {},
                })
            }
        )
    })
})
//прописать нужный хук
export const useProjectApi = ProjectApi;
