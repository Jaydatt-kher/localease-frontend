import { baseApi } from "./baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    updateUserLocation: builder.mutation({
      query: (body) => ({
        url: "/api/customer/update-location",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    getAllEnquiries: builder.query({
      query: () => "/api/customer/all-request",
      providesTags: ["Enquiries"],
      transformResponse: (res) => res?.data ?? res,
    }),

    getEnquiryById: builder.query({
      query: (id) => `/api/customer/enquiry/${id}`,
      providesTags: (r, e, id) => [{ type: "Enquiries", id }],
      transformResponse: (res) => res?.data ?? res,
    }),

    createEnquiry: builder.mutation({
      query: (body) => ({ url: "/api/customer/create-enquiry", method: "POST", body }),
      invalidatesTags: ["Enquiries"],
    }),

    cancelEnquiry: builder.mutation({
      query: (enquiryId) => ({
        url: `/api/customer/cancel-enquiry/${enquiryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Enquiries"],
    }),

    acceptProviderBid: builder.mutation({
      query: (responseId) => ({
        url: `/api/customer/enquiry/${responseId}/accept`,
        method: "POST",
      }),
      invalidatesTags: ["Bookings", "Enquiries"],
    }),

    getMyBookings: builder.query({
      query: (status) =>
        `/api/customer/bookings${status ? `?status=${status}` : ""}`,
      providesTags: ["Bookings"],
      transformResponse: (res) => res?.data ?? res,
    }),

    getBookingById: builder.query({
      query: (id) => `/api/customer/bookings/${id}`,
      providesTags: (r, e, id) => [{ type: "Bookings", id }],
      transformResponse: (res) => res?.data ?? res,
    }),

    getProviderBookings: builder.query({
      query: (status) =>
        `/api/provider/bookings${status ? `?status=${status}` : ""}`,
      providesTags: ["Bookings"],
      transformResponse: (res) => res?.data ?? res,
    }),

    getProviderBookingById: builder.query({
      query: (id) => `/api/provider/bookings/${id}`,
      providesTags: (r, e, id) => [{ type: "Bookings", id }],
      transformResponse: (res) => res?.data ?? res,
    }),

    cancelBooking: builder.mutation({
      query: ({ id, reason }) => ({
        url: `/api/customer/bookings/${id}/cancel`,
        method: "PATCH",
        body: { reason },
      }),
      invalidatesTags: (r, e, { id }) => ["Bookings", { type: "Bookings", id }, "Notifications"],
    }),

    cancelProviderBooking: builder.mutation({
      query: ({ id, reason }) => ({
        url: `/api/provider/bookings/${id}/cancel`,
        method: "PATCH",
        body: { reason },
      }),
      invalidatesTags: (r, e, { id }) => ["Bookings", { type: "Bookings", id }, "Notifications"],
    }),

    startProviderJob: builder.mutation({
      query: ({ id, otp }) => ({
        url: `/api/provider/bookings/${id}/start-job`,
        method: "POST",
        body: { otp }
      }),
      invalidatesTags: (r, e, { id }) => ["Bookings", { type: "Bookings", id }],
    }),

    generateCompleteOtp: builder.mutation({
      query: (id) => ({
        url: `/api/provider/bookings/${id}/generate-complete-otp`,
        method: "POST"
      }),
      invalidatesTags: (r, e, id) => ["Bookings", { type: "Bookings", id }],
    }),
  }),
});

export const {
  useUpdateUserLocationMutation,
  useGetAllEnquiriesQuery,
  useGetEnquiryByIdQuery,
  useCreateEnquiryMutation,
  useCancelEnquiryMutation,
  useAcceptProviderBidMutation,
  useGetMyBookingsQuery,
  useGetBookingByIdQuery,
  useCancelBookingMutation,
  useGetProviderBookingsQuery,
  useGetProviderBookingByIdQuery,
  useCancelProviderBookingMutation,
  useStartProviderJobMutation,
  useGenerateCompleteOtpMutation,
} = bookingApi;
