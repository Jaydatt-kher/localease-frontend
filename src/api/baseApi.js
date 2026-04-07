import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../redux/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8000",
    credentials: "include",
    prepareHeaders: (headers) => { headers.set("Content-Type", "application/json"); return headers },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        console.warn("baseApi warning: Unauthorized access. Attempting to refresh token...");
        const refreshResult = await baseQuery({ url: '/api/auth/refresh-token', method: 'POST' }, api, extraOptions);
        if (refreshResult.data) {
            result = await baseQuery(args, api, extraOptions);
        } else {
            console.error("baseApi error: Session expired or token refresh failed. Logging out.");
            api.dispatch(logout());
        }
    }
    return result;
};

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["User", "Provider", "ProviderProfile", "Services", "Categories", "Enquiries", "Bookings", "Reviews", "Offers", "ProviderServices", "Cities", "WalletTransactions", "Notifications", "ProviderRequests", "AdminDashboard", "AdminUsers", "AdminProviders", "AdminServices", "AdminCategories", "AdminBookings"],
    endpoints: () => ({}),
})