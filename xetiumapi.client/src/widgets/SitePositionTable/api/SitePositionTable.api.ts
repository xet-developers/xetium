import {rtkApi} from "@/shared/api/rtkApi.ts";

export const SitePositionTableApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        postSitePositionTable: build.query({
                query: () => ({
                    url: '/',
                    params: {},
                })
            }
        )
    })
})
//прописать нужный хук
export const useSitePositionTableApi = SitePositionTableApi.;
