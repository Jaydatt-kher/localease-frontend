import { baseApi } from "./baseApi";

export const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addReview: builder.mutation({
            query: (body) => ({
                url: "/customer/reviews",
                method: "POST",
                body
            }),
            invalidatesTags: ["Bookings", "Provider"]
        })
    })
});

export const { useAddReviewMutation } = reviewApi;
