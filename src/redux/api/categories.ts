import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import { mainApi } from "./index";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    // ➕ ADD category
    addCategory: build.mutation<any, Partial<any>>({
      query: (body) => ({
        url: `categories`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["CATEGORY"], // 🔥 yangilanish uchun
    }),

    // ✏️ UPDATE category
    updateCategory: build.mutation<any, { id: number; body: Partial<any> }>({
      query: ({ id, body }) => ({
        url: `categories/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["CATEGORY"], // 🔥 cache yangilash
    }),

    // ❌ DELETE category
    deleteCategory: build.mutation<any, number>({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CATEGORY"], // 🔥 cache tozalash
    }),

    // 🔎 GET all categories
    getAllCategories: build.query<any, any>({
      query: (params) => ({
        url: "categories",
        method: "GET",
        params,
      }),
      providesTags: ["CATEGORY"], // 🔥 bu query cache yaratadi
    }),

    // 🔎 GET category by ID
    getCategoryById: build.query<any, any>({
      query: (id) => ({
        url: `categories/${id}`,
        method: "GET",
      }),
      providesTags: ["CATEGORY"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = extendedApi;
