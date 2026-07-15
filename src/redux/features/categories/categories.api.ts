import baseApi from "@/redux/api/api";

const categoriesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => {
                return {
                    url: '/news/categories/',
                    method: "GET"
                }
            }
        })
    })
})

export const {
    
} = categoriesApi;
