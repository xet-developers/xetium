import {rtkApi} from "@/shared/api/rtkApi.ts";

interface ICluster {
    projectId: string;
    keywords: string[]
    id: string
}


export const WordsClusterApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        createWordCluster: build.mutation<string, ICluster>({
                query: (cluster: ICluster) => ({
                    url: '/cluster/create',
                    body: JSON.stringify(cluster),
                    method: 'POST',
                }),

                invalidatesTags: ['WordCluster']
            },
        ),

        deleteWordCluster: build.mutation<void, string>({
                query: (id: string) => ({
                    url: '/cluster/delete/' + id,
                    method: 'DELETE',
                }),

                invalidatesTags: ['WordCluster']
            },
        ),

        getAllWordCluster: build.query<ICluster[], string>({
            query: (projectId: string) => ({
                method: 'GET',
                url: '/cluster?projectId=' + projectId
            }),

            providesTags: ['WordCluster']
        }),
    })
})

export const {
    useGetAllWordClusterQuery,
    useCreateWordClusterMutation,
    useDeleteWordClusterMutation,
} = WordsClusterApi;
