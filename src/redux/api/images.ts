import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import { mainApi } from "./index";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    // ➕ ADD images to collection
    addImages: build.mutation<any, { collectionId: number; files: File[] }>({
      query: ({ collectionId, files }) => {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files", file);
        });

        return {
          url: `images/${collectionId}`,
          method: "POST",
          body: formData,
        };
      },
    }),

    // ❌ DELETE image by id
    deleteImage: build.mutation<any, number>({
      query: (id) => ({
        url: `images/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAddImagesMutation, useDeleteImageMutation } = extendedApi;
