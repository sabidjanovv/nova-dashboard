import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import { mainApi } from "./index";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    addCategory: build.mutation<any, Partial<any>>({
      query: (body) => ({
        url: `categories`,
        method: "POST",
        body,
      }),
    }),
    updateCategory: build.mutation<any, { id: number; body: Partial<any> }>({
      query: ({ id, body }) => ({
        url: `categories/${id}`,
        method: "PUT",
        body,
      }),
    }),

    // O'chirish uchun mutation
    deleteCategory: build.mutation<any, number>({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
    }),
    getAllCategories: build.query<any, any>({
      query: (params) => ({
        url: "categories",
        method: "GET",
        params,
      }),
    }),
    getCategoryById: build.query<any, any>({
      query: (id) => ({
        url: `categories/${id}`,
        method: "GET",
      }),
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
