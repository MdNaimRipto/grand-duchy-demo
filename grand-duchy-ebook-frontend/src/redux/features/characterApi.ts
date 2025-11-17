import { apiConfig } from "@/configs/apiConfig";
import { ICharacter } from "@/types/characterTypes";
import { characterApiSlice } from "../apis/characterApiSlice";
import Cookies from "js-cookie";

const characterApi = characterApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //
    // * Upload Character
    //
    addCharacter: builder.mutation({
      query: ({ data }: { data: ICharacter }) => ({
        url: apiConfig.CHARACTER.ADD,
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
    // * Get Characters
    //
    getCharacter: builder.query({
      query: () => ({
        url: apiConfig.CHARACTER.GET_ALL,
      }),
    }),
    //
    // * Get Random Characters
    //
    getRandomCharacter: builder.query({
      query: () => ({
        url: apiConfig.CHARACTER.GET_RANDOM,
      }),
    }),

    //
    // * Update Character
    //
    updateCharacter: builder.mutation({
      query: ({ data, id }: { id: string; data: Partial<ICharacter> }) => ({
        url: `${apiConfig.CHARACTER.UPDATE}/${id}`,
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
    // * Delete Character
    //
    deleteCharacter: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `${apiConfig.CHARACTER.DELETE}/${id}`,
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
  useGetCharacterQuery,
  useGetRandomCharacterQuery,
  useAddCharacterMutation,
  useDeleteCharacterMutation,
  useUpdateCharacterMutation,
} = characterApi;
