import {rtkApi} from "@/shared/api/rtkApi.ts";

interface IProject{
    name: string;
    description: string;
    id: string;
    url: string;
    searches: []
}

export const ProjectApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getProject: build.query<IProject[], void>({
                query: () => ({
                    method: 'GET',
                    url: '/project',
                }),
            providesTags: ['Project'],
        }
    )
    })
})
//прописать нужный хук


export const {useGetProjectQuery} = ProjectApi;
