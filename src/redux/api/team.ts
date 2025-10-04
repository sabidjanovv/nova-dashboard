import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import { mainApi } from "./index";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    // CREATE
    addTeam: build.mutation<any, FormData>({
      query: (body) => ({
        url: "team",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TEAM"],
    }),

    // GET ALL
    getAllTeam: build.query<any[], void>({
      query: () => ({
        url: "team",
        method: "GET",
      }),
      providesTags: ["TEAM"],
    }),

    // UPDATE (edit by id)
    editTeam: build.mutation<any, { id: number; body: FormData }>({
      query: ({ id, body }) => ({
        url: `team/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["TEAM"],
    }),
  }),
  overrideExisting: false,
});

export const { useAddTeamMutation, useGetAllTeamQuery, useEditTeamMutation } =
  extendedApi;
