import { apiConfig } from "@/configs/apiConfig";

import { timerApiSlice } from "../apis/timerApiSlice";
import Cookies from "js-cookie";

const userApi = timerApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //
    // * Update font
    //
    updateTimer: builder.mutation({
      query: ({
        data,
      }: {
        data: Partial<{
          time: Date;
        }>;
      }) => ({
        url: `${apiConfig.TIMER.UPDATE}/67d7ba6dc695dcdf7da4843d`,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(data),
      }),
      invalidatesTags: [],
    }),
    //
    // *
    //
    getTimer: builder.query({
      query: () => ({
        url: apiConfig.TIMER.GET,
      }),
    }),
  }),
});

export const { useUpdateTimerMutation, useGetTimerQuery } = userApi;
