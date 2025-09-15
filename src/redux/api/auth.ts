import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import { mainApi } from "./index";

const invalidateCustomerTag = async (
  queryFulfilled: Promise<any>,
  dispatch: any
) => {
  try {
    await queryFulfilled;
    dispatch(extendedApi.util.invalidateTags([]));
  } catch (error) {
    console.error("Error:", error);
  }
};

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    // createOwner: build.mutation<any, any>({
    //   query: (body) => ({
    //     url: "/auth/signup",
    //     method: "POST",
    //     body,
    //   }),
    // }),

    signInAdmin: build.mutation<any, any>({
      query: (body) => ({
        url: "auth/signin",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await invalidateCustomerTag(queryFulfilled, dispatch);
      },
    }),
    checkToken: build.query<any, void>({
      query: () => ({
        url: "auth/profile",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useSignInAdminMutation,
  useCheckTokenQuery,
} = extendedApi;
