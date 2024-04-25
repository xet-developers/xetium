import {rtkApi} from "@/shared/api/rtkApi.ts";

interface IPostLoginArgs{
    UserName: string;
    Password: string
}

export const AuthorizationFormApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        postLogin: build.mutation<string, Partial<IPostLoginArgs>>({
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
