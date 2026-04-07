import { baseApi } from "./baseApi";

export const providerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getNearbyProviders: builder.query({
      query: ({ lat, lng, radius = 10, serviceId } = {}) => {
        const p = new URLSearchParams({ lat, lng, radius });
        if (serviceId) p.set("serviceId", serviceId);
        return `/customer/providers/nearby?${p}`;
      },
      providesTags: ["Provider"],
      transformResponse: (res) => res?.data ?? res,
    }),

    getProvidersByService: builder.query({
      query: (serviceId) => `/customer/providers/${serviceId}`,
      providesTags: ["Provider"],
      transformResponse: (res) => res?.data ?? res,
    }),

    getProviderDetails: builder.query({
      query: (id) => `/customer/provider-details/${id}`,
      providesTags: (r, e, id) => [{ type: "Provider", id }],
      transformResponse: (res) => res?.data ?? res,
    }),

    getFilteredProviders: builder.query({
      query: ({ serviceId, ...filters }) => {
        const cleanFilters = Object.fromEntries(
          Object.entries(filters).filter(([key, v]) => {
            if (v == null) return false; if (v === "") return false; if (key === "minRating" && Number(v) === 0) return false; return true;
          })
        );
        const p = new URLSearchParams(cleanFilters);
        return `/customer/filter-providers/${serviceId}?${p}`;
      },
      providesTags: ["Provider"],
      transformResponse: (res) => res,
    }),

    getMyProviderProfile: builder.query({
      query: () => "/provider/get-profile",
      providesTags: ["ProviderProfile"],
      transformResponse: (res) => res?.providerResponse ?? res,
    }),

    createProviderProfile: builder.mutation({
      query: (body) => ({ url: "/provider/profile", method: "POST", body }),
      invalidatesTags: ["ProviderProfile"],
    }),

    updateProviderProfile: builder.mutation({
      query: (body) => ({ url: "/provider/update-profile", method: "PUT", body }),
      invalidatesTags: ["ProviderProfile"],
    }),

    providerSendOtpMobile: builder.mutation({
      query: () => ({ url: "/provider/send-otp-mobile", method: "POST" }),
    }),

    providerVerifyOtpMobile: builder.mutation({
      query: (body) => ({ url: "/provider/verify-otp-mobile", method: "POST", body }),
      invalidatesTags: ["ProviderProfile"],
    }),

    getMyProviderServices: builder.query({
      query: () => "/provider/get-all-service",
      providesTags: ["ProviderServices"],
      transformResponse: (res) => res?.services ?? res,
    }),

    getProviderServiceById: builder.query({
      query: (id) => `/provider/get-service/${id}`,
      providesTags: (r, e, id) => [{ type: "ProviderServices", id }],
      transformResponse: (res) => res?.services ?? res,
    }),

    createProviderService: builder.mutation({
      query: (body) => ({ url: "/provider/create-service", method: "POST", body }),
      invalidatesTags: ["ProviderServices"],
    }),

    updateProviderService: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/provider/update-service/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["ProviderServices"],
    }),

    deleteProviderService: builder.mutation({
      query: (id) => ({
        url: `/provider/delete-service/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProviderServices"],
    }),

    getNewRequests: builder.query({
      query: () => "/provider/new-request",
      providesTags: ["ProviderRequests"],
      transformResponse: (res) => res?.data ?? [],
    }),

    getMyBidHistory: builder.query({
      query: ({ status, page = 1, limit = 10 } = {}) => {
        const p = new URLSearchParams({ page, limit });
        if (status) p.set("status", status);
        return `/provider/get-my-bid?${p}`;
      },
      providesTags: ["ProviderRequests"],
      transformResponse: (res) => res,
    }),

    respondToRequest: builder.mutation({
      query: ({ responseId, ...body }) => ({
        url: `/provider/requests/${responseId}/respond`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["ProviderRequests", "Notifications"],
    }),

    updateMyBid: builder.mutation({
      query: ({ responseId, ...body }) => ({
        url: `/provider/requests/${responseId}/update`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["ProviderRequests"],
    }),

    ignoreRequest: builder.mutation({
      query: (responseId) => ({
        url: `/provider/requests/${responseId}/ignore`,
        method: "PUT",
      }),
      invalidatesTags: ["ProviderRequests", "Notifications"],
    }),

    getProviderBookings: builder.query({
      query: (status) => {
        const p = status ? `?status=${status}` : "";
        return `/provider/bookings${p}`;
      },
      providesTags: ["Bookings"],
      transformResponse: (res) => res?.data ?? [],
    }),

    getProviderBookingDetail: builder.query({
      query: (id) => `/provider/bookings/${id}`,
      providesTags: (r, e, id) => [{ type: "Bookings", id }],
      transformResponse: (res) => res?.data ?? res,
    }),

    setFinalAmount: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/provider/bookings/${id}/set-final-amount`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (r, e, { id }) => ["Bookings", { type: "Bookings", id }],
    }),
  }),
});

export const {
  useGetNearbyProvidersQuery,
  useGetProvidersByServiceQuery,
  useGetProviderDetailsQuery,
  useGetFilteredProvidersQuery,
  useGetMyProviderProfileQuery,
  useCreateProviderProfileMutation,
  useUpdateProviderProfileMutation,
  useProviderSendOtpMobileMutation,
  useProviderVerifyOtpMobileMutation,
  useGetMyProviderServicesQuery,
  useGetProviderServiceByIdQuery,
  useCreateProviderServiceMutation,
  useUpdateProviderServiceMutation,
  useDeleteProviderServiceMutation,
  useGetNewRequestsQuery,
  useGetMyBidHistoryQuery,
  useRespondToRequestMutation,
  useUpdateMyBidMutation,
  useIgnoreRequestMutation,
  useGetProviderBookingsQuery,
  useGetProviderBookingDetailQuery,
  useSetFinalAmountMutation,
} = providerApi;

