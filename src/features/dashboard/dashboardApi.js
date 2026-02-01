import { api } from "../../services/api";

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => "/dashboard",
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardApi;
