import {rtkApi} from "@/shared/api/rtkApi.ts";
import {User} from "../model/types/IUserSliceSchema.ts";


export const UserApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUserData: build.query<User, void>({
                query: () => ({
                    url: '/account/info',
                    providesTags: ['User']
                })
            }
        )
    })
})

//прописать нужный хук
export const dasdsadas = UserApi.useGetUserDataQuery
export const getUserDataQuery = UserApi.endpoints.getUserData.initiate;
