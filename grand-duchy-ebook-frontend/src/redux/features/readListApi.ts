import { apiConfig } from "@/configs/apiConfig";
import { readListApiSlice } from "../apis/readListApiSlice";
import { IReadList } from "@/types/readListTypes";

const readListApi = readListApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //
    // * Create / Update Read list
    //
    createReadList: builder.mutation({
      query: ({ data }: { data: IReadList }) => ({
        url: apiConfig.READ_LIST.CREATE,
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }),
      invalidatesTags: [],
    }),
    //
    // * Get Book's
    //
    getLatestReadList: builder.query({
      query: ({ email }: { email: string }) => ({
        url: `${apiConfig.READ_LIST.GET_LATEST}?email=${email}`,
      }),
    }),
    //
    // * Get Details
    //
    getReadListDetails: builder.query({
      query: ({ email, bookId }: { email: string; bookId: string }) => ({
        url: `${apiConfig.READ_LIST.GET_DETAILS}?email=${email}&bookId=${bookId}`,
      }),
    }),
  }),
});

export const {
  useCreateReadListMutation,
  useGetLatestReadListQuery,
  useGetReadListDetailsQuery,
} = readListApi;
