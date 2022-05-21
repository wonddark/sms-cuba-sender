import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ContactsResponse } from "./response-types";
import { AppState } from "../index";
import { LoginParams } from "./params-types";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_API,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as AppState).session.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Accept", "application/ld+json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (params: LoginParams) => ({
        url: "/login",
        method: "POST",
        body: params,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    getContacts: builder.query<
      ContactsResponse,
      { page: number; itemsPerPage: number }
    >({
      query: (params) => ({
        url: "/contacts",
        params: { page: params.page, itemsPerPage: params.itemsPerPage },
      }),
    }),
  }),
});

export const { useGetContactsQuery, useLoginMutation } = api;
export default api;