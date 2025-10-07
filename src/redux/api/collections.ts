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
      providesTags: ["COLLECTION"], // ✅ cache tag
    }),

    // 🔎 GET single collection by ID
    getCollectionById: build.query<any, number>({
      query: (id) => ({
        url: `collections/${id}`,
        method: "GET",
      }),
      providesTags: ["COLLECTION"], // ✅
    }),

    // ➕ ADD collection
    addCollection: build.mutation<any, Partial<any>>({
      query: (body) => ({
        url: "collections",
        method: "POST",
        body,
      }),
      invalidatesTags: ["COLLECTION"], // ✅ yangi qo‘shilganda cache yangilanadi
    }),

    // ✏️ UPDATE collection
    updateCollection: build.mutation<any, { id: number; body: Partial<any> }>({
      query: ({ id, body }) => ({
        url: `collections/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["COLLECTION"], // ✅ yangilanganda cache tozalanadi
    }),

    updateMainImage: build.mutation<any, { id: number; main_image_id: number }>(
      {
        query: ({ id, main_image_id }) => {
          return {
            url: `collections/${id}/main-image`,
            method: "PATCH",
            body: { main_image_id },
          };
        },
        invalidatesTags: ["COLLECTION"], // yangilanganidan keyin cache tozalanadi
      }
    ),

    // ❌ DELETE collection
    deleteCollection: build.mutation<any, number>({
      query: (id) => ({
        url: `collections/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["COLLECTION"], // ✅ o‘chirilib bo‘lgach cache yangilanadi
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllCollectionsQuery,
  useGetCollectionByIdQuery,
  useAddCollectionMutation,
  useUpdateCollectionMutation,
  useUpdateMainImageMutation,
  useDeleteCollectionMutation,
} = extendedApi;
