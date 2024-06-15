import {rtkApi} from "@/shared/api/rtkApi.ts";
import {User} from "../model/types/IUserSliceSchema.ts";


export const UserApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUserData: build.query<User, void>({
                query: () => ({
                    url: '/account/info',
                }),
                providesTags: ['User']
            }
        ),
        updateUser: build.mutation<void, Pick<User, 'mail' | 'userName'>>({
                query: (body) => ({
                    url: '/account/update',
                    method: "PATCH",
                    body: JSON.stringify(body),
                }),
                invalidatesTags: ['User']
            }
        ),
    })
})

export const getUserDataQuery = UserApi.endpoints.getUserData.initiate;
export const {useGetUserDataQuery, useUpdateUserMutation} = UserApi
