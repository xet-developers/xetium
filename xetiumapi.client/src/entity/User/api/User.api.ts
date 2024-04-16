import {rtkApi} from "@/shared/api/rtkApi.ts";

export const UserApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        postUser: build.query({
                query: () => ({
                    url: '/',
                    params: {},
                })
            }
        )
    })
})
//прописать нужный хук
export const useUserApi = UserApi;
