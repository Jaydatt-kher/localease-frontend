import { logout, setCredentials } from "../redux/authSlice";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (data) => ({ url: "/api/auth/signup", method: "POST", body: data })
        }),
        signIn: builder.mutation({
            query: (data) => ({ url: "/api/auth/signin", method: "POST", body: data }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.userResponse) dispatch(setCredentials(data.userResponse));
                } catch { }
            }
        }),
        googleAuth: builder.mutation({
            query: (data) => ({ url: "/api/auth/google-auth", method: "POST", body: data }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.user) dispatch(setCredentials(data.user));
                } catch { }
            }
        }),
        verifyEmail: builder.mutation({
            query: (data) => ({ url: "/api/auth/verify-otp-email", method: "POST", body: data }),
        }),
        resendVerification: builder.mutation({
            query: (data) => ({ url: "/api/auth/resend-otp-email", method: "POST", body: data }),
        }),
        forgotPasswordOtp: builder.mutation({
            query: (data) => ({ url: "/api/auth/reset-password-otp", method: "POST", body: data }),
        }),
        forgotPasswordVerifyOtp: builder.mutation({
            query: (data) => ({ url: "/api/auth/verify-reset-password-otp", method: "POST", body: data }),
        }),
        resetPassword: builder.mutation({
            query: (data) => ({ url: "/api/auth/reset-password", method: "PATCH", body: data }),
        }),
        signOut: builder.mutation({
            query: () => ({ url: "/api/auth/signout", method: "POST" }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try { await queryFulfilled; } finally { dispatch(logout()) }
            }
        }),
    }),
});

export const { useSignUpMutation, useSignInMutation, useGoogleAuthMutation, useVerifyEmailMutation, useResendVerificationMutation, useForgotPasswordOtpMutation, useForgotPasswordVerifyOtpMutation, useResetPasswordMutation, useSignOutMutation } = authApi