import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminKPIs: builder.query({
      query: () => "/admin/dashboard/kpis",
      providesTags: ["AdminDashboard"],
    }),
    getBookingsTrend: builder.query({
      query: (range = "last7days") => `/admin/dashboard/bookings-trend?range=${range}`,
      providesTags: (result, error, range) => [{ type: "AdminDashboard", id: `bookings-${range}` }],
    }),
    getRevenueTrend: builder.query({
      query: (range = "last7days") => `/admin/dashboard/revenue-trend?range=${range}`,
      providesTags: (result, error, range) => [{ type: "AdminDashboard", id: `revenue-${range}` }],
    }),
    getProviderStatus: builder.query({
      query: () => "/admin/dashboard/provider-status",
      providesTags: ["AdminDashboard"],
    }),
    getBookingStatus: builder.query({
      query: () => "/admin/dashboard/booking-status",
      providesTags: ["AdminDashboard"],
    }),
    getCategoryPopularity: builder.query({
      query: () => "/admin/dashboard/category-popularity",
      providesTags: ["AdminDashboard"],
    }),

    getUserStats: builder.query({
      query: () => "/admin/users/stats",
      providesTags: ["AdminUsers"],
    }),
    getUsers: builder.query({
      query: ({ page = 1, limit = 10, search = "", status = "all" } = {}) => {
        const params = new URLSearchParams({ page, limit, search, status });
        return `/admin/users?${params.toString()}`;
      },
      providesTags: ["AdminUsers"],
    }),
    getUserById: builder.query({
      query: (id) => `/admin/users/${id}`,
      providesTags: (result, error, id) => [{ type: "AdminUsers", id }],
    }),
    blockUser: builder.mutation({
      query: (id) => ({ url: `/admin/users/${id}/block`, method: "PATCH" }),
      invalidatesTags: ["AdminUsers"],
    }),
    unblockUser: builder.mutation({
      query: (id) => ({ url: `/admin/users/${id}/unblock`, method: "PATCH" }),
      invalidatesTags: ["AdminUsers"],
    }),

    getProviderStats: builder.query({
      query: () => "/admin/providers/stats",
      providesTags: ["AdminProviders"],
    }),
    getPendingProviders: builder.query({
      query: () => "/admin/providers/pending-list",
      providesTags: ["AdminProviders"],
      transformResponse: (res) => res?.providers ?? [],
    }),
    getProviders: builder.query({
      query: ({ page = 1, limit = 10, search = "", status = "all" } = {}) => {
        const params = new URLSearchParams({ page, limit });
        if (search) params.set("search", search);
        if (status === "approved") { params.set("isVerified", "true"); params.set("isActive", "true"); }
        if (status === "blocked") params.set("isBlocked", "true");
        if (status === "pending") { params.set("isVerified", "false"); }
        return `/admin/providers?${params.toString()}`;
      },
      providesTags: ["AdminProviders"],
    }),
    getProviderById: builder.query({
      query: (id) => `/admin/providers/${id}`,
      providesTags: (result, error, id) => [{ type: "AdminProviders", id }],
    }),
    approveProvider: builder.mutation({
      query: (id) => ({ url: `/admin/providers/${id}/approve`, method: "PATCH" }),
      invalidatesTags: ["AdminProviders"],
    }),
    rejectProvider: builder.mutation({
      query: (id) => ({ url: `/admin/providers/${id}/reject`, method: "PATCH" }),
      invalidatesTags: ["AdminProviders"],
    }),
    blockProvider: builder.mutation({
      query: (id) => ({ url: `/admin/providers/${id}/block`, method: "PATCH" }),
      invalidatesTags: ["AdminProviders"],
    }),
    unblockProvider: builder.mutation({
      query: (id) => ({ url: `/admin/providers/${id}/unblock`, method: "PATCH" }),
      invalidatesTags: ["AdminProviders"],
    }),
    deleteProvider: builder.mutation({
      query: (id) => ({ url: `/admin/providers/${id}/delete`, method: "PATCH" }),
      invalidatesTags: ["AdminProviders"],
    }),

    getAdminServiceStats: builder.query({
      query: () => "/admin/services/stats",
      providesTags: ["AdminServices"],
    }),
    getAdminServices: builder.query({
      query: ({ page = 1, limit = 10, search = "", status = "", cityId = "", categoryId = "" } = {}) => {
        const params = new URLSearchParams({ page, limit });
        if (search) params.set("search", search);
        if (status === "active") params.set("isAvailable", "true");
        if (status === "inactive") params.set("isAvailable", "false");
        if (cityId) params.set("cityId", cityId);
        if (categoryId) params.set("categoryId", categoryId);
        return `/admin/services?${params.toString()}`;
      },
      providesTags: ["AdminServices"],
    }),
    createAdminService: builder.mutation({
      query: (formData) => ({
        url: "/admin/services",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["AdminServices"],
    }),
    updateAdminService: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin/services/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["AdminServices"],
    }),
    deleteAdminService: builder.mutation({
      query: (id) => ({
        url: `/admin/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminServices"],
    }),

    getAdminCategoryStats: builder.query({
      query: () => "/admin/categories/stats",
      providesTags: ["AdminCategories"],
    }),
    getAdminCategories: builder.query({
      query: ({ page = 1, limit = 10, search = "", status = "" } = {}) => {
        const params = new URLSearchParams({ page, limit });
        if (search) params.set("search", search);
        if (status === "active") params.set("isActive", "true");
        if (status === "inactive") params.set("isActive", "false");
        return `/admin/categories?${params.toString()}`;
      },
      providesTags: ["AdminCategories"],
    }),
    createAdminCategory: builder.mutation({
      query: (body) => ({
        url: "/admin/categories",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AdminCategories"],
    }),
    updateAdminCategory: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/admin/categories/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["AdminCategories"],
    }),
    deleteAdminCategory: builder.mutation({
      query: (id) => ({
        url: `/admin/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminCategories"],
    }),

    getAdminBookingStats: builder.query({
      query: () => "/admin/bookings/stats",
      providesTags: ["AdminBookings"],
    }),
    getAdminBookings: builder.query({
      query: ({ page = 1, limit = 10, search = "", status = "" } = {}) => {
        const params = new URLSearchParams({ page, limit });
        if (search) params.set("search", search);
        if (status && status !== "all") params.set("status", status);
        return `/admin/bookings?${params.toString()}`;
      },
      providesTags: ["AdminBookings"],
    }),
    getAdminBookingById: builder.query({
      query: (id) => `/admin/bookings/${id}`,
      providesTags: (result, error, id) => [{ type: "AdminBookings", id }],
    }),

    getAdminPaymentStats: builder.query({
      query: () => "/admin/payments/stats",
      providesTags: ["AdminPayments"],
    }),
    getAdminPayments: builder.query({
      query: ({ page = 1, limit = 10, search = "", status = "", method = "" } = {}) => {
        const params = new URLSearchParams({ page, limit });
        if (search) params.set("search", search);
        if (status && status !== "all") params.set("status", status);
        if (method && method !== "all") params.set("method", method);
        return `/admin/payments?${params.toString()}`;
      },
      providesTags: ["AdminPayments"],
    }),

    getAdminReviewStats: builder.query({
      query: () => "/admin/reviews/stats",
      providesTags: ["AdminReviews"],
    }),
    getAdminReviews: builder.query({
      query: ({ page = 1, limit = 10, search = "", rating = "" } = {}) => {
        const params = new URLSearchParams({ page, limit });
        if (search) params.set("search", search);
        if (rating && rating !== "all") params.set("rating", rating);
        return `/admin/reviews?${params.toString()}`;
      },
      providesTags: ["AdminReviews"],
    }),
    deleteAdminReview: builder.mutation({
      query: (id) => ({ url: `/admin/reviews/${id}`, method: "DELETE" }),
      invalidatesTags: ["AdminReviews"],
    }),

    getAdminNotificationStats: builder.query({
      query: () => "/admin/notifications/stats",
      providesTags: ["AdminNotifications"],
    }),
    getAdminNotifications: builder.query({
      query: ({ page = 1, limit = 10, search = "", type = "", status = "" } = {}) => {
        const params = new URLSearchParams({ page, limit });
        if (search) params.set("search", search);
        if (type && type !== "all") params.set("type", type);
        if (status && status !== "all") params.set("status", status);
        return `/admin/notifications?${params.toString()}`;
      },
      providesTags: ["AdminNotifications"],
    }),
    toggleNotificationRead: builder.mutation({
      query: (id) => ({ url: `/admin/notifications/${id}/toggle-read`, method: "PATCH" }),
      invalidatesTags: ["AdminNotifications"],
    }),
    deleteAdminNotification: builder.mutation({
      query: (id) => ({ url: `/admin/notifications/${id}`, method: "DELETE" }),
      invalidatesTags: ["AdminNotifications"],
    }),

    getAdminSettings: builder.query({
      query: () => "/admin/settings",
      providesTags: ["AdminSettings"],
    }),
    updateAdminSettings: builder.mutation({
      query: (data) => ({
        url: "/admin/settings",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AdminSettings"],
    }),

    getAdminProfile: builder.query({
      query: () => "/admin/profile",
      providesTags: ["AdminProfile"],
    }),
    updateAdminProfile: builder.mutation({
      query: (data) => ({ url: "/admin/profile", method: "PUT", body: data }),
      invalidatesTags: ["AdminProfile"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.user) {
            dispatch({
              type: "auth/updateUser", payload: {
                fullName: data.user.fullName,
                mobileNo: data.user.mobileNo,
                photoUrl: data.user.photoUrl,
              }
            });
          }
        } catch { }
      }
    }),
    updateAdminPassword: builder.mutation({
      query: (data) => ({ url: "/admin/profile/password", method: "PUT", body: data }),
    }),
    adminSendOtpMobile: builder.mutation({
      query: () => ({ url: "/admin/profile/send-otp-mobile", method: "POST" }),
    }),
    adminVerifyOtpMobile: builder.mutation({
      query: (body) => ({ url: "/admin/profile/verify-otp-mobile", method: "POST", body }),
      invalidatesTags: ["AdminProfile"],
    }),

    getAdminCityStats: builder.query({
      query: () => "/admin/cities/stats",
      providesTags: ["AdminCities"],
    }),
    getAdminCities: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => {
        const params = new URLSearchParams({ page, limit });
        if (search) params.set("search", search);
        return `/admin/cities?${params.toString()}`;
      },
      providesTags: ["AdminCities"],
    }),
    createAdminCity: builder.mutation({
      query: (data) => ({ url: "/admin/cities", method: "POST", body: data }),
      invalidatesTags: ["AdminCities"],
    }),
    updateAdminCity: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/admin/cities/${id}`, method: "PUT", body: data }),
      invalidatesTags: ["AdminCities"],
    }),
    deleteAdminCity: builder.mutation({
      query: (id) => ({ url: `/admin/cities/${id}`, method: "DELETE" }),
      invalidatesTags: ["AdminCities"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAdminKPIsQuery,
  useGetBookingsTrendQuery,
  useGetRevenueTrendQuery,
  useGetProviderStatusQuery,
  useGetBookingStatusQuery,
  useGetCategoryPopularityQuery,
  useGetUserStatsQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useGetProviderStatsQuery,
  useGetPendingProvidersQuery,
  useGetProvidersQuery,
  useGetProviderByIdQuery,
  useApproveProviderMutation,
  useRejectProviderMutation,
  useBlockProviderMutation,
  useUnblockProviderMutation,
  useDeleteProviderMutation,
  useGetAdminServiceStatsQuery,
  useGetAdminServicesQuery,
  useCreateAdminServiceMutation,
  useUpdateAdminServiceMutation,
  useDeleteAdminServiceMutation,
  useGetAdminCategoryStatsQuery,
  useGetAdminCategoriesQuery,
  useCreateAdminCategoryMutation,
  useUpdateAdminCategoryMutation,
  useDeleteAdminCategoryMutation,
  useGetAdminBookingsQuery,
  useGetAdminBookingStatsQuery,
  useGetAdminBookingByIdQuery,
  useGetAdminPaymentStatsQuery,
  useGetAdminPaymentsQuery,
  useGetAdminReviewStatsQuery,
  useGetAdminReviewsQuery,
  useDeleteAdminReviewMutation,
  useGetAdminNotificationStatsQuery,
  useGetAdminNotificationsQuery,
  useToggleNotificationReadMutation,
  useDeleteAdminNotificationMutation,
  useGetAdminSettingsQuery,
  useUpdateAdminSettingsMutation,
  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,
  useUpdateAdminPasswordMutation,
  useAdminSendOtpMobileMutation,
  useAdminVerifyOtpMobileMutation,
  useGetAdminCityStatsQuery,
  useGetAdminCitiesQuery,
  useCreateAdminCityMutation,
  useUpdateAdminCityMutation,
  useDeleteAdminCityMutation,
} = adminApi;