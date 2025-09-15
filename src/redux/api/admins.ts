import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import { mainApi } from "./index";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    updateAdmin: build.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `admins/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateAdminMutation } = extendedApi;
