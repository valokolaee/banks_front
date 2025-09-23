// src/features/api/poolsEndpoint.ts
import { baseApi } from "./api";
import type { IPool, IService } from "../../intrfaceces/types";

export const poolsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPools: build.query<IPool[], void>({
      query: () => "/pools",
      transformResponse: (response: { success: boolean; data: IPool[] }) => {
        if (response.success) return response.data;
        throw new Error("Failed to load pools");
      },
    }),
    getPoolServices: build.query<IService[], number>({
      query: (poolId) => `/pools/${poolId}/services`,
      transformResponse: (response: { success: boolean; data: IService[] }) => {
        if (response.success) return response.data;
        throw new Error("Failed to load pool services");
      },
    }),
  }),
});

export const {
  useGetPoolsQuery,
  useGetPoolServicesQuery
} = poolsApi;