import {rtkApi} from "@/shared/api/rtkApi.ts";

interface ICluster {
    keywords: string[]
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

        getAllWordCluster: build.query<ICluster[], void>({
            query: () => ({
                method: 'GET',
                url: '/cluster'
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
