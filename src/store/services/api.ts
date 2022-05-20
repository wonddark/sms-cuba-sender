import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ContactsResponse } from "./response-types";
import { AppState } from "../index";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_API,
    prepareHeaders: (headers, { getState }) => {
      const token = getState() as AppState;
      // If we have a token set in state, let's assume that we should be passing it.
      // if (token) {
      headers.set(
        "Authorization",
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTMwODQxNzUsImV4cCI6MTY1MzA4Nzc3NSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoid29uZGRhcmsifQ.ZO2kssBQJDuTSWsp4iHF96hBank4imkVPwi59gNMnO6ptDILP16D6jWtD31okLw2vtZ6giwCqWjiEzVkAv8til0TY2NxoUgarA5i6wxtOq1j1A3-msyJNANrL5NcV4vRkPt5hKLnhfO4JdzlgHJA4qIP-JXvliLrTgOrcTLfwrOSTv5WEj3PbwBYSycgLFKFUS538JQqgoHJbiaaagpgHrP8BsyyXmXwZPizlFMwrJ9dUFcEns7N7mChUrSbdUDllUmI3C_DEV8Vcb5w8KXGkHLLLkoNqN00W1-xDXhKGVl4YeXW1ZI6b04cik3CnzjimQ6wHCiSb0EqcB6bci9qnA"
      );
      // headers.set('Authorization', `Bearer ${token}`);
      // }
      headers.set("Accept", "application/ld+json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
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

export const { useGetContactsQuery } = api;
export default api;
