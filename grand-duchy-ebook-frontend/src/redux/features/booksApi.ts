import { apiConfig } from "@/configs/apiConfig";
import { bookApiSlice } from "../apis/bookApiSlice";
import { IAct, IBooks, IChapter, IUpdateBook } from "@/types/bookTypes";
import Cookies from "js-cookie";

const booksApi = bookApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //
    // * Upload Book
    //
    uploadBook: builder.mutation({
      query: ({ data }: { data: IBooks }) => ({
        url: apiConfig.BOOK.UPLOAD,
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
    // * Get Book's
    //
    getBooks: builder.query({
      query: () => ({
        url: apiConfig.BOOK.GET_ALL,
      }),
    }),
    //
    // * Get Book Titles
    //
    getBooksTitle: builder.query({
      query: () => ({
        url: apiConfig.BOOK.GET_TITLES,
      }),
    }),
    //
    // * Get Book By ID
    //
    getBookById: builder.query({
      query: ({ id, epIndex }: { id: string; epIndex: number }) => ({
        url: `${apiConfig.BOOK.GET_BY_ID}/${id}?epIndex=${epIndex}`,
      }),
    }),
    //
    // * Get Episode Count By ID
    //
    getEpisodeCountById: builder.query({
      query: ({ id }: { id: string }) => ({
        url: `${apiConfig.BOOK.GET_EPISODE_COUNT_BY_ID}/${id}`,
      }),
    }),
    //
    // * Add Act
    //
    uploadAct: builder.mutation({
      query: ({ data, id }: { data: IAct; id: string }) => ({
        url: `${apiConfig.BOOK.UPLOAD_ACT}/${id}`,
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
    // * Add Chapter
    //
    uploadChapter: builder.mutation({
      query: ({
        data,
        id,
        actTitle,
      }: {
        data: IChapter;
        id: string;
        actTitle: string;
      }) => ({
        url: `${apiConfig.BOOK.UPLOAD_CHAPTER}/${id}?actTitle=${actTitle}`,
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
    // * Add Episode
    //
    uploadEpisode: builder.mutation({
      query: ({
        data,
        id,
        actTitle,
        chapterTitle,
      }: {
        data: IChapter;
        id: string;
        actTitle: string;
        chapterTitle: string;
      }) => ({
        url: `${apiConfig.BOOK.UPLOAD_EPISODE}/${id}?actTitle=${actTitle}&chapterTitle=${chapterTitle}`,
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
    // * Update Book
    //
    updateBook: builder.mutation({
      query: ({ data }: { data: IUpdateBook }) => ({
        url: `${apiConfig.BOOK.UPDATE_BOOK}`,
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
    // * Get Book's
    //
    getLatestEpisode: builder.query({
      query: () => ({
        url: apiConfig.BOOK.GET_LATEST_EPISODE,
      }),
    }),
    //
    // * Get Book By ID
    //
    getFormattedBookById: builder.query({
      query: ({ id }: { id: string }) => ({
        url: `${apiConfig.BOOK.GET_FORMATTED_BOOK_BY_ID}/${id}`,
      }),
    }),
  }),
});

export const {
  useUploadBookMutation,
  useGetBooksQuery,
  useGetBookByIdQuery,
  useGetEpisodeCountByIdQuery,
  useUploadActMutation,
  useUploadChapterMutation,
  useUploadEpisodeMutation,
  useUpdateBookMutation,
  useGetBooksTitleQuery,
  useGetLatestEpisodeQuery,
  useGetFormattedBookByIdQuery,
} = booksApi;
