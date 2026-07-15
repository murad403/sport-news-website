import baseApi from "@/redux/api/api";
import { TagsResponse } from "./tags.type";

const tagsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTags: builder.query<TagsResponse, string | void>({
            query: (search) => {
                const params: Record<string, any> = { page: 200 }
                if (search) {
                    params.search = search
                }
                return {
                    url: '/news/tags/',
                    method: "GET",
                    params
                }
            }
        })
    })
})

export const {
    useGetTagsQuery
} = tagsApi;
export default tagsApi;
