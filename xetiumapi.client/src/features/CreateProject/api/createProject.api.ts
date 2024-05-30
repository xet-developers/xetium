import {rtkApi} from "@/shared/api/rtkApi.ts";

interface ICreateProjectArgs {
    description: string;
    url: string;
    name: string
}

interface ICreateProjectAns {
    id: string
}


export const CreateProjectApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        postCreateProject: build.mutation<ICreateProjectAns, Partial<ICreateProjectArgs>>({
                query: (body) => ({
                    method: 'POST',
                    url: '/project/create',
                    body: JSON.stringify(body),
                }),
                invalidatesTags: ['Project']
            }
        )
    })
})

export const {usePostCreateProjectMutation} = CreateProjectApi;
