import baseApi from "@/redux/api/api";
import { ArticlesResponse, Article } from "./article.type";

const articleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMineArticles: builder.query<ArticlesResponse, { page?: number; search?: string } | void>({
            query: (args) => {
                const params: Record<string, any> = {}
                if (args) {
                    if (args.page) params.page = args.page
                    if (args.search) params.search = args.search
                }
                return {
                    url: '/news/mine/',
                    method: "GET",
                    params
                }
            },
            providesTags: ["Articles"]
        }),
        getArticleDetails: builder.query<Article, string>({
            query: (slug) => {
                return {
                    url: `/news/${slug}/`,
                    method: "GET"
                }
            },
            providesTags: ["Articles"]
        }),
        addArticle: builder.mutation<Article, FormData>({
            query: (data) => {
                return {
                    url: '/news/submit/',
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["Articles"]
        }),
        deleteArticle: builder.mutation<{ success: boolean }, string>({
            query: (id) => {
                return {
                    url: `/news/${id}/manage/`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["Articles"]
        }),
    })
})

export const {
    useGetMineArticlesQuery,
    useGetArticleDetailsQuery,
    useAddArticleMutation,
    useDeleteArticleMutation
} = articleApi;
