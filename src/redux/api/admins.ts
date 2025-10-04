import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import { mainApi } from "./index";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    // ➕ Create new admin
    addAdmin: build.mutation<any, any>({
      query: (data) => ({
        url: "admins",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ADMIN"],
    }),

    // 🔎 Get all admins
    getAllAdmins: build.query<any, any>({
      query: (params) => ({
        url: "admins",
        method: "GET",
        params,
      }),
      providesTags: ["ADMIN"],
    }),

    // 🔍 Get admin by ID
    getAdminById: build.query<any, string>({
      query: (id) => ({
        url: `admins/${id}`,
        method: "GET",
      }),
      providesTags: ["ADMIN"],
    }),

    // ✏️ Update admin by ID
    updateAdmin: build.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `admins/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ADMIN"],
    }),
  }),

  overrideExisting: false,
});

// ✅ export all hooks
export const {
  useAddAdminMutation,
  useGetAllAdminsQuery,
  useGetAdminByIdQuery,
  useUpdateAdminMutation,
} = extendedApi;
