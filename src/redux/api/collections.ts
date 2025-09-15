import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import { mainApi } from "./index";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    // 🔎 GET all collections (with filters)
    getAllCollections: build.query<
      any,
      {
        search?: string;
        lang?: "uz" | "ru" | "en";
        type?: "interior" | "exterior";
        orderDir?: "ASC" | "DESC";
        page?: number;
        limit?: number;
        category_id?: string;
      }
    >({
      query: (params) => ({
        url: "collections", 
        method: "GET",
        params,
      }),
    }),

    // 🔎 GET single collection by ID
    getCollectionById: build.query<any, number>({
      query: (id) => ({
        url: `collections/${id}`,
        method: "GET",
      }),
    }),

    // ➕ ADD collection
    addCollection: build.mutation<any, Partial<any>>({
      query: (body) => ({
        url: "collections",
        method: "POST",
        body,
      }),
    }),

    // ✏️ UPDATE collection
    updateCollection: build.mutation<any, { id: number; body: Partial<any> }>({
      query: ({ id, body }) => ({
        url: `collections/${id}`,
        method: "PATCH", // ✅ faqat qisman yangilash
        body,
      }),
    }),

    // ❌ DELETE collection
    deleteCollection: build.mutation<any, number>({
      query: (id) => ({
        url: `collections/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllCollectionsQuery,
  useGetCollectionByIdQuery,
  useAddCollectionMutation,
  useUpdateCollectionMutation,
  useDeleteCollectionMutation,
} = extendedApi;
