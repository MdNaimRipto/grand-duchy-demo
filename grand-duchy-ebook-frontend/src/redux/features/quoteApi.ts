import { apiConfig } from "@/configs/apiConfig";
import { IQuote } from "@/types/quotesType";
import { quoteApiSlice } from "../apis/quoteApiSlice";
import Cookies from "js-cookie";

const quoteApi = quoteApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //
    // * Upload quote
    //
    addQuote: builder.mutation({
      query: ({ data }: { data: IQuote }) => ({
        url: apiConfig.QUOTE.ADD,
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(data),
      }),
      invalidatesTags: [],
    }),
    //
    // * Get quote
    //
    getQuotes: builder.query({
      query: () => ({
        url: apiConfig.QUOTE.GET_ALL,
      }),
    }),
    //
    // * Get quote
    //
    getRandomQuotes: builder.query({
      query: () => ({
        url: apiConfig.QUOTE.GET_RANDOM,
      }),
    }),
    //
    // * Update Summary
    //
    updateQuote: builder.mutation({
      query: ({ data, id }: { id: string; data: string }) => ({
        url: `${apiConfig.QUOTE.UPDATE}/${id}`,
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(data),
      }),
      invalidatesTags: [],
    }),
    //
    // * Delete quote
    //
    deleteQuote: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `${apiConfig.QUOTE.DELETE}/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }),
      invalidatesTags: [],
    }),
  }),
});

export const {
  useGetQuotesQuery,
  useGetRandomQuotesQuery,
  useAddQuoteMutation,
  useDeleteQuoteMutation,
  useUpdateQuoteMutation,
} = quoteApi;
