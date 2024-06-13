import {rtkApi} from "@/shared/api/rtkApi.ts";
import {ISitePosition} from "../model/types/IAddKeyWordsSliceSchema.ts";

interface ISitePositionArg {
    uri: string;
    keyWords: string[];
    top: number;
    searchSystem: 0 | 1;
}


interface ISitePositionResponse {
    sitePositions: ISitePosition[]
}

export const AddKeyWordsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getSitePosition: build.mutation<ISitePositionResponse, ISitePositionArg>({
                query: (body) => ({
                    url: '/analytics',
                    method: 'POST',
                    body: JSON.stringify(body)
                })
            }
        )
    })
})

export const {useGetSitePositionMutation} = AddKeyWordsApi;
