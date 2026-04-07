import { baseApi } from "./baseApi";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getNotifications: builder.query({
      query: ({ page = 1, limit = 20, unreadOnly = false } = {}) => {
        const p = new URLSearchParams({ page, limit });
        if (unreadOnly) p.set("unreadOnly", "true");
        return `/api/notifications?${p}`;
      },
      providesTags: ["Notifications"],
      transformResponse: (res) => res,
    }),

    getUnreadCount: builder.query({
      query: () => "/api/notifications/unread-count",
      providesTags: ["Notifications"],
      transformResponse: (res) => res?.count ?? 0,
    }),

    markAsRead: builder.mutation({
      query: (id) => ({
        url: `/api/notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications"],
    }),

    markAllAsRead: builder.mutation({
      query: () => ({
        url: "/api/notifications/read-all",
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications"],
    }),

    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `/api/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications"],
    }),

    clearAllNotifications: builder.mutation({
      query: () => ({
        url: "/api/notifications",
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useDeleteNotificationMutation,
  useClearAllNotificationsMutation,
} = notificationApi;