import { apiConfig } from "@/configs/apiConfig";
import { IUser } from "@/types/userTypes";
import { userApiSlice } from "../apis/userApiSlice";
import Cookies from "js-cookie";

const userApi = userApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //
    // * Update font
    //
    updateFont: builder.mutation({
      query: ({ data }: { data: Partial<IUser> }) => ({
        url: `${apiConfig.USER.UPDATE_FONT}`,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }),
      invalidatesTags: [],
    }),
    //
    // * Get All Users
    //
    getAllUsers: builder.query({
      query: () => ({
        url: apiConfig.USER.GET_ALL,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }),
    }),
    //
    // *
    //
    getActiveTimeStatus: builder.query({
      query: ({ email }: { email: string }) => ({
        url: `${apiConfig.USER.GET_ACTIVE_TIME}?email=${email}`,
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useUpdateFontMutation,
  useGetAllUsersQuery,
  useGetActiveTimeStatusQuery,
} = userApi;
