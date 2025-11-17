import { apiConfig } from "@/configs/apiConfig";
import { quoteApiSlice } from "../apis/quoteApiSlice";
import Cookies from "js-cookie";
import { INote } from "@/types/noteTypes";

const notesApi = quoteApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //
    // * Upload quote
    //
    addNote: builder.mutation({
      query: ({ data }: { data: INote }) => ({
        url: apiConfig.NOTE.ADD,
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
    getAllNotes: builder.query({
      query: () => ({
        url: apiConfig.NOTE.GET_ALL,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }),
    }),
    //
    // * Get quote
    //
    getLatestNote: builder.query({
      query: () => ({
        url: apiConfig.NOTE.GET_LATEST,
      }),
    }),
    //
    // * Update Summary
    //
    updateNote: builder.mutation({
      query: ({ data, id }: { id: string; data: string }) => ({
        url: `${apiConfig.NOTE.UPDATE}/${id}`,
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
    deleteNote: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `${apiConfig.NOTE.DELETE}/${id}`,
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
  useAddNoteMutation,
  useGetAllNotesQuery,
  useGetLatestNoteQuery,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
