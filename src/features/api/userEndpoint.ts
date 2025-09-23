// src/features/api/userEndpoint.ts
import { User } from "../../intrfaceces/types";
import { baseApi } from "./api";


export interface IProfits {
  profit1?:number;
  profit2?:number;
  profit3?:number;
  profit4?:number;

}

export interface IUserStats {
  total_assets?: number;
  forex_earnings?: number;
  referral_earnings?: number;
  active_referrals?: number;
}

export interface IInvestment {
  id?: number;
  pool_id?: number;
  pool_name?: string;
  capital_invested?: number;
  profitability?: string;
  status?: 'active' | 'inactive';
}

export interface IBankAffiliation {
  id?: number;
  bank_id?: number;
  bank_name?: string;
  capital_invested?: number;
  profitability?: string;
  status?: 'active' | 'pending';
}

export interface IReferral {
  id?: number;
  name?: string;
  email?: string;
  status?: 'active' | 'pending';
  joined_at?: string;
}

export interface ILoan {
  id?: number;
  loan_id?: string;
  amount?: number;
  interest_rate?: number;
  term?: number;
  remaining_payments?: number;
  status?: 'active' | 'pending' | 'completed';
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCurrentUser: build.query<User, void>({
      query: () => "/auth/me",
      transformResponse: (response: { success: boolean; user: User }) => {
        if (response.success) return response.user;
        throw new Error("Failed to fetch user profile");
      },
    }),
    getUserStats: build.query<IUserStats, void>({
      query: () => "/users/stats",
      transformResponse: (response: { success: boolean; data: IUserStats }) => {
        if (response.success) return response.data;
        throw new Error("Failed to fetch user stats");
      },
    }),
    getUserInvestments: build.query<IInvestment[], void>({
      query: () => "/users/investments",
      transformResponse: (response: { success: boolean; data: IInvestment[] }) => {
        if (response.success) return response.data;
        throw new Error("Failed to fetch investments");
      },
    }),
    getUserBankAffiliations: build.query<IBankAffiliation[], void>({
      query: () => "/users/bank-affiliations",
      transformResponse: (response: { success: boolean; data: IBankAffiliation[] }) => {
        if (response.success) return response.data;
        throw new Error("Failed to fetch bank affiliations");
      },
    }),
    getUserReferrals: build.query<IReferral[], void>({
      query: () => "/users/referrals",
      transformResponse: (response: { success: boolean; data: IReferral[] }) => {
        if (response.success) return response.data;
        throw new Error("Failed to fetch referrals");
      },
    }),
    getUserLoans: build.query<ILoan[], void>({
      query: () => "/users/loans",
      transformResponse: (response: { success: boolean; data: ILoan[] }) => {
        if (response.success) return response.data;
        throw new Error("Failed to fetch loans");
      },
    }),
    updateUserProfile: build.mutation<User, Partial<User>>({
      query: (userData) => ({
        url: "/users/profile",
        method: "PUT",
        body: userData,
      }),
      transformResponse: (response: { success: boolean; data: User }) => {
        if (response.success) return response.data;
        throw new Error("Failed to update profile");
      },
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useGetUserStatsQuery,
  useGetUserInvestmentsQuery,
  useGetUserBankAffiliationsQuery,
  useGetUserReferralsQuery,
  useGetUserLoansQuery,
  useUpdateUserProfileMutation
} = userApi;