import { apiConfig } from "@/configs/apiConfig";
import { summaryApiSlice } from "../apis/summaryApiSlice";
import { ISummary, ISummeryFilters } from "@/types/summaryTypes";
import Cookies from "js-cookie";

const summaryApi = summaryApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //
    // * Upload Summary
    //
    addSummary: builder.mutation({
      query: ({ data }: { data: ISummary }) => ({
        url: apiConfig.SUMMARY.ADD,
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
    // * Get Summary's
    //
    getSummary: builder.query({
      query: (data: ISummeryFilters) => {
        const queryParameters = new URLSearchParams();
        if (data.page) {
          queryParameters.append("page", data.page);
        }
        if (data.limit) {
          queryParameters.append("limit", data.limit);
        }
        if (data.searchTerm) {
          queryParameters.append("searchTerm", data.searchTerm);
        }
        if (data.bookId) {
          queryParameters.append("bookId", data.bookId);
        }
        if (data.characterName) {
          queryParameters.append("characterName", data.characterName);
        }
        if (data.actTitle) {
          queryParameters.append("actTitle", data.actTitle);
        }
        if (data.chapterTitle) {
          queryParameters.append("chapterTitle", data.chapterTitle);
        }
        if (data.episodeTitle) {
          queryParameters.append("episodeTitle", data.episodeTitle);
        }
        return `${apiConfig.SUMMARY.GET_ALL}?${queryParameters.toString()}`;
      },
    }),
    //
    // * Get Books Summary
    //
    getBooksSummary: builder.query({
      query: ({
        actTitle,
        bookId,
        chapterTitle,
        episodeTitle,
      }: {
        bookId: string;
        actTitle: string;
        chapterTitle: string;
        episodeTitle: string;
      }) => ({
        url: `${
          apiConfig.SUMMARY.GET_BOOKS_SUMMARY
        }/${bookId}/${encodeURIComponent(actTitle)}/${encodeURIComponent(
          chapterTitle
        )}/${encodeURIComponent(episodeTitle)}`,
      }),
    }),
    //
    // * Update Summary
    //
    updateSummary: builder.mutation({
      query: ({ data, id }: { id: string; data: Partial<ISummary> }) => ({
        url: `${apiConfig.SUMMARY.UPDATE}/${id}`,
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
    // * Delete Summary
    //
    deleteSummary: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `${apiConfig.SUMMARY.DELETE}/${id}`,
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
  useAddSummaryMutation,
  useGetSummaryQuery,
  useGetBooksSummaryQuery,
  useUpdateSummaryMutation,
  useDeleteSummaryMutation,
} = summaryApi;
