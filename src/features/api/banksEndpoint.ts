// src/features/api/banksEndpoint.ts
import { baseApi } from "./api";
import type { IBank } from "../../intrfaceces/types";

export const banksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBanks: build.query<IBank[], void>({
      query: () => "/banks",
      transformResponse: (response: { success: boolean; banks: IBank[] }) => {
        if (response.success) {
          return response.banks;
        }
        throw new Error("Failed to load banks");
      },
    }),
    getBankServices: build.query<
      { key: string; value: string }[],
      number
    >({
      query: (bankId) => `/banks/${bankId}/services`,
      transformResponse: (response: { success: boolean; data: any[] }) => {
        if (response.success) {
          return response.data;
        }
        throw new Error("Failed to load bank services");
      },
    }),
  }),
});

export const {
  useGetBanksQuery,
  useGetBankServicesQuery
} = banksApi;