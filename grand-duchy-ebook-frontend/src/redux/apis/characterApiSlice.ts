import { apiConfig } from "@/configs/apiConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const characterApiSlice = createApi({
  reducerPath: "characterApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: apiConfig.BASE_URL,
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
