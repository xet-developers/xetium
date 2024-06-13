import {rtkApi} from "@/shared/api/rtkApi.ts";
import {ICreateRequestResp, IntentType} from "@/widgets/CreateRequest1/model/types/ICreateRequest1SliceSchema.ts";


interface ICreateRequestArg {
    keywords: string;
    numberOfGeneratedWords: number;
    intentType: IntentType;
}


export const CreateRequest1Api = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        postCreateRequest1: build.query<ICreateRequestResp, ICreateRequestArg>({
                query: (body) => ({
                    url: '/generation/auto',
                    method: "POST",
                    body: JSON.stringify(body)
                })
            }
        )
    })
})
//прописать нужный хук
export const {useLazyPostCreateRequest1Query} = CreateRequest1Api;
