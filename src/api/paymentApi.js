import { baseApi } from "./baseApi";

export const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        initiatePayment: builder.mutation({
            query: (body) => ({ url: "/api/payments/initiate", method: "POST", body }),
            invalidatesTags: ["Bookings"]
        }),

        verifyPayment: builder.mutation({
            query: (body) => ({ url: "/api/payments/verify", method: "POST", body }),
            invalidatesTags: ["Bookings", "ProviderProfile"]
        }),

        getProviderPayments: builder.query({
            query: () => "/api/payments/provider/payments",
            providesTags: ["Payments"],
            transformResponse: (res) => res?.data ?? []
        }),

        getWalletTransactions: builder.query({
            query: ({ page = 1, limit = 20 } = {}) =>
                `/api/payments/wallet/transactions?page=${page}&limit=${limit}`,
            providesTags: ["WalletTransactions"],
            transformResponse: (res) => res?.data ?? { walletBalance: 0, transactions: [], pagination: {} }
        }),

        rechargeWallet: builder.mutation({
            query: (body) => ({ url: "/api/payments/recharge", method: "POST", body }),
        }),

        verifyRecharge: builder.mutation({
            query: (body) => ({ url: "/api/payments/verify-recharge", method: "POST", body }),
            invalidatesTags: ["ProviderProfile", "WalletTransactions"]
        }),

        initiateWithdrawal: builder.mutation({
            query: (body) => ({ url: "/api/payments/wallet/withdraw", method: "POST", body }),
            invalidatesTags: ["ProviderProfile", "WalletTransactions"]
        }),

        getAdminSettings: builder.query({
            query: () => "/api/payments/admin-settings",
            transformResponse: (res) => res?.data ?? {}
        })
    })
});

export const {
    useInitiatePaymentMutation,
    useVerifyPaymentMutation,
    useGetProviderPaymentsQuery,
    useGetWalletTransactionsQuery,
    useRechargeWalletMutation,
    useVerifyRechargeMutation,
    useInitiateWithdrawalMutation,
    useGetAdminSettingsQuery
} = paymentApi;
