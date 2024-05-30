import {rtkApi} from "@/shared/api/rtkApi.ts";

interface IPostLoginArgs{
    UserName: string;
    Password: string
}

interface IPostLoginRes {
    expiration: string;
    token: string;
}

export const AuthorizationFormApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        postLogin: build.mutation<IPostLoginRes, Partial<IPostLoginArgs>>({
                query: ({...data}) => ({
                    url: '/account/login',
                    method: 'POST',
                    body: JSON.stringify(data)
                })
            }
        )
    })
})

export const useAuthorizationFormApi = AuthorizationFormApi.usePostLoginMutation;
