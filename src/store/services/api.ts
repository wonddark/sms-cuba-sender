import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query/react";
import { ContactsResponse } from "./response-types";
import { AppState } from "../index";
import {
  ContactsParams,
  LoginParams,
  MessagesParams,
  RefreshTokenParams,
  RegisterParams,
} from "./params-types";
import { logout, refreshToken } from "../sessionSlice";
import { Mutex } from "async-mutex";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
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
});
const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url: "/refresh",
            method: "POST",
            body: {
              refresh_token: (
                api.getState() as { session: { tokenRefresh: string } }
              ).session.tokenRefresh,
            },
            headers: { "Content-Type": "application/json" },
          },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          api.dispatch(
            refreshToken({
              token: (refreshResult.data as { token: string }).token,
            })
          );
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["CONTACTS", "MESSAGES"],
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
    // REFRESH TOKEN
    refreshToken: builder.mutation({
      query: (params: RefreshTokenParams) => ({
        url: "/refresh",
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
      providesTags: (result) => (result ? ["CONTACTS"] : []),
    }),
    // POST CONTACT
    addContact: builder.mutation({
      query: (params: ContactsParams) => ({
        url: "/contacts",
        method: "POST",
        body: JSON.stringify(params),
      }),
      invalidatesTags: ["CONTACTS"],
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
