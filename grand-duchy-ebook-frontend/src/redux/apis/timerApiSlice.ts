import { apiConfig } from "@/configs/apiConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const timerApiSlice = createApi({
  reducerPath: "timerApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: apiConfig.BASE_URL,
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
