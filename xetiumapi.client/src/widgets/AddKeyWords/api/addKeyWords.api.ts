import {rtkApi} from "@/shared/api/rtkApi.ts";

interface ISitePositionArg {
    uri: string;
    keyWords: string[];
    Top: number;
    SearchSystem: 0 | 1;
}

interface ISitePosition {
    Date: string;
    Keyword: string;
    Position: number;
    SearchSystem: 0 | 1
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
