import baseApi from "@/redux/api/api";

const articleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => {
                return {
                    url: '/auth/profile/',
                    method: "GET"
                }
            },
            providesTags: ["Profile"]
        })
    })
})

export const {
    
} = articleApi;
