import baseApi from "@/redux/api/api";
import { CategoriesResponse } from "./categories.type";

const categoriesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<CategoriesResponse, void>({
            query: () => {
                return {
                    url: '/news/categories/',
                    method: "GET",
                    params: { page: 200 }
                }
            }
        })
    })
})

export const {
    useGetCategoriesQuery
} = categoriesApi;
export default categoriesApi;
