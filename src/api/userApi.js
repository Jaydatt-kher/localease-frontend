import { baseApi } from "./baseApi";
import { updateUser, logout } from "../redux/authSlice";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getMyProfile: builder.query({
            query: () => "/api/customer/profile",
            providesTags: ["User"],
            transformResponse: (res) => res?.data ?? res,
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        dispatch(updateUser({
                            fullName: data.fullName,
                            mobileNo: data.mobileNo,
                            photoUrl: data.photoUrl,
                        }));
                    }
                } catch { }
            },
        }),

        updateMyProfile: builder.mutation({
            query: (body) => ({ url: "/api/customer/update-profile", method: "PATCH", body }),
            invalidatesTags: ["User"],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // Backend returns { success, message, data: updatedUser }
                    const updatedUser = data?.data ?? data?.user;
                    if (updatedUser) dispatch(updateUser({
                        fullName: updatedUser.fullName,
                        mobileNo: updatedUser.mobileNo,
                        address: updatedUser.address,
                        photoUrl: updatedUser.photoUrl,
                    }));
                } catch { }
            },
        }),

        deleteMyAccount: builder.mutation({
            query: () => ({ url: "/api/customer/delete-account", method: "DELETE" }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(logout());
                } catch { }
            },
        }),

        sendOtpMobile: builder.mutation({
            query: () => ({ url: "/api/auth/send-otp-mobile", method: "POST" }),
            invalidatesTags: ["User"],
        }),

        verifyOtpMobile: builder.mutation({
            query: (body) => ({ url: "/api/auth/verify-otp-mobile", method: "POST", body }),
            invalidatesTags: ["User"],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.isMobileVerified) {
                        dispatch(updateUser({ isMobileVerified: true }));
                    }
                } catch { }
            },
        }),

    }),
});

export const {
    useGetMyProfileQuery,
    useUpdateMyProfileMutation,
    useDeleteMyAccountMutation,
    useSendOtpMobileMutation,
    useVerifyOtpMobileMutation,
} = userApi;    