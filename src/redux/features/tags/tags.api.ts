import baseApi from "@/redux/api/api";

const tagsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTags: builder.query({
            query: () => {
                return {
                    url: '/news/tags/',
                    method: "GET"
                }
            }
        })
    })
})

export const {
    
} = tagsApi;
