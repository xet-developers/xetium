import {rtkApi} from "@/shared/api/rtkApi.ts";

interface IProject {
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
        ),
        deleteProject: build.mutation<void, string>({
                query: (id) => ({
                    method: 'DELETE',
                    url: '/project/' + id,
                }),

                invalidatesTags: ['Project']
            }
        ),
        updateProject: build.mutation<IProject, IProject>({
                query: (body) => ({
                    method: 'PATCH',
                    body: JSON.stringify(body),
                    url: '/project/update',
                }),

                invalidatesTags: ['Project']
            }
        )
    })
})
//прописать нужный хук


export const {useGetProjectQuery,
    useUpdateProjectMutation,
    useDeleteProjectMutation} = ProjectApi;
