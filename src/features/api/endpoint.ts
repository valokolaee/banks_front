// src/features/api/endpoint.ts  // ****It is no longer usable and should be deleted
import { baseApi } from "./api";
import type { IPool } from "../../intrfaceces/types";

export const poolsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPools: build.query<IPool[], void>({
      query: () => "/pools",
      transformResponse: (response: { success: boolean; data: IPool[] }) => {
        if (response.success) {
          return response.data;
        }
        throw new Error("Failed to load pools");
      },
    }),
  }),
});

export const { useGetPoolsQuery } = poolsApi;