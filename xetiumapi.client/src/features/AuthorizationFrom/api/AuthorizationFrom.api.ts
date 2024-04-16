import {rtkApi} from "@/shared/api/rtkApi.ts";

export const AuthorizationFromApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        postAuthorizationFrom: build.query({
                query: () => ({
                    url: '/',
                    params: {},
                })
            }
        )
    })
})
//прописать нужный хук
export const useAuthorizationFromApi = AuthorizationFromApi;
