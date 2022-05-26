import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ContactsResponse } from "./response-types";
import { AppState } from "../index";
import {
  ContactsParams,
  LoginParams,
  MessagesParams,
  RegisterParams,
} from "./params-types";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_API,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as AppState).session.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      !headers.has("Content-Type") &&
        headers.set("Content-Type", "application/ld+json");
      !headers.has("Accept") && headers.set("Accept", "application/ld+json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // LOGIN
    login: builder.mutation({
      query: (params: LoginParams) => ({
        url: "/login",
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
    }),
    // REGISTER
    register: builder.mutation({
      query: (params: RegisterParams) => ({
        url: "/register",
        method: "POST",
        body: params,
      }),
    }),
    // GET CONTACTS
    getContacts: builder.query<
      ContactsResponse,
      { page: number; itemsPerPage: number }
    >({
      query: (params) => ({
        url: "/contacts",
        params: { page: params.page, itemsPerPage: params.itemsPerPage },
      }),
    }),
    // POST CONTACT
    addContact: builder.mutation({
      query: (params: ContactsParams) => ({
        url: "/contacts",
        method: "POST",
        body: JSON.stringify(params),
      }),
    }),
    // POST MESSAGE
    postMessage: builder.mutation({
      query: (params: MessagesParams) => ({
        url: "/messages",
        method: "POST",
        body: JSON.stringify(params),
      }),
    }),
  }),
});

export const {
  useGetContactsQuery,
  useLoginMutation,
  useRegisterMutation,
  useAddContactMutation,
  usePostMessageMutation: usePostMessage,
} = api;
export default api;
