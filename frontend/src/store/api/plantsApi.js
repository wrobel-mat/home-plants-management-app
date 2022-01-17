import { createApi } from "@reduxjs/toolkit/dist/query/react";
import axiosBaseQuery from "store/util/axiosBaseQuery";

export const plantsApi = createApi({
  reducerPath: "plants",
  baseQuery: axiosBaseQuery({ baseUrl: "/api/plant" }),
  tagTypes: ["Plants"],
  endpoints: (builder) => ({
    getAllPlants: builder.query({
      query: () => ({
        method: "GET",
        url: "/all",
      }),
      transformResponse: (result) => {
        if (result !== undefined) {
          return result.reduce((accumulator, plant) => {
            accumulator[plant.id] = plant;
            return accumulator;
          }, {});
        }
      },
      providesTags: (result, error, arg) => {
        return result
          ? [
              {
                type: "Plants",
                id: "LIST",
              },
              ...Object.keys(result).map((id) => ({
                type: "Plants",
                id,
              })),
            ]
          : [
              {
                type: "Plants",
                id: "LIST",
              },
            ];
      },
    }),
    getPlant: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/${id}`,
      }),
      providesTags: (result, error, id) => [
        {
          type: "Plants",
          id,
        },
      ],
    }),
    addPlant: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "",
        data,
      }),
      invalidatesTags: [
        {
          type: "Plants",
          id: "LIST",
        },
      ],
    }),
    deletePlant: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/${id}`,
      }),
      invalidatesTags: (result, error, id) => [
        {
          type: "Plants",
          id,
        },
      ],
    }),
    updatePlant: builder.mutation({
      query: ({ id, data }) => ({
        method: "PATCH",
        url: `/${id}`,
        data,
      }),
      invalidatesTags: (result, error, { id }) => [
        {
          type: "Plants",
          id,
        },
      ],
    }),
    updatePlantImg: builder.mutation({
      query: ({ id, data }) => ({
        method: "PATCH",
        url: `/${id}?img`,
        data,
      }),
      invalidatesTags: (result, error, { id }) => [
        {
          type: "Plants",
          id,
        },
      ],
    }),
    waterPlant: builder.mutation({
      query: (id) => ({
        method: "POST",
        url: `/${id}?watering`,
      }),
      invalidatesTags: (result, error, id) => [
        {
          type: "Plants",
          id,
        },
      ],
    }),
    replantPlant: builder.mutation({
      query: (id) => ({
        method: "POST",
        url: `/${id}?replant`,
      }),
      invalidatesTags: (result, error, id) => [
        {
          type: "Plants",
          id,
        },
      ],
    }),
    fertilizePlant: builder.mutation({
      query: (id) => ({
        method: "POST",
        url: `/${id}?fertilization`,
      }),
      invalidatesTags: (result, error, id) => [
        {
          type: "Plants",
          id,
        },
      ],
    }),
  }),
});

export const {
  useGetAllPlantsQuery,
  useGetPlantQuery,
  useAddPlantMutation,
  useDeletePlantMutation,
  useUpdatePlantMutation,
  useUpdatePlantImgMutation,
  useWaterPlantMutation,
  useReplantPlantMutation,
  useFertilizePlantMutation,
  util: { resetApiState }
} = plantsApi;
