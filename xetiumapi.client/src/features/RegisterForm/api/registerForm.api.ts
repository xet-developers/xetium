import {rtkApi} from "@/shared/api/rtkApi.ts";

interface IPostRegisterFormArg {
    name: string,
    username: string,
    email: string,
    password: string,
    checkboxData: boolean,
    checkboxConf: boolean,
    checkboxSpam: boolean
}

export const RegisterFormApi = rtkApi.injectEndpoints({

    endpoints: (build) => ({
        postRegisterForm: build.mutation<string, Partial<IPostRegisterFormArg> >({
                query: ({...data}) => ({
                    url: '/account/register',
                    method: 'POST',
                    body: JSON.stringify(data),
                })
            }
        )
    })
})

export const useRegisterFormApi = RegisterFormApi.usePostRegisterFormMutation;
