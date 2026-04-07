import { baseApi } from "./baseApi";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllCategories: builder.query({
      query: () => "/api/customer/services/categories",
      providesTags: ["Categories"],
      transformResponse: (res) => res?.data ?? res,
    }),

    getServicesByCategory: builder.query({
      query: (categoryId) => `/api/customer/categories/${categoryId}/services`,
      providesTags: (r, e, id) => [{ type: "Services", id }],
      transformResponse: (res) => res?.data ?? res,
    }),

    searchService: builder.query({
      query: (q) => `/api/customer/services/search?query=${encodeURIComponent(q)}`,
      providesTags: ["Services"],
      transformResponse: (res) => res?.data ?? res,
    }),

    getAllServices: builder.query({
      query: ({ page = 1, limit = 50 } = {}) =>
        `/api/customer/services/all?page=${page}&limit=${limit}`,
      providesTags: ["Services"],
      transformResponse: (res) => res?.data ?? res,
    }),

    getServiceDetails: builder.query({
      query: (id) => `/api/customer/services/${id}`,
      providesTags: (r, e, id) => [{ type: "Services", id }],
      transformResponse: (res) => res?.data ?? res,
    }),

    getCities: builder.query({
      query: () => "/api/provider/cities",
      providesTags: ["Cities"],
      transformResponse: (res) => res?.data ?? res,
    }),
    searchUnified: builder.query({
      query: (q) => `/api/customer/services/search-unified?query=${encodeURIComponent(q)}`,
      providesTags: ["Services", "Categories"],
      transformResponse: (res) => ({ categories: res?.categories ?? [], services: res?.services ?? [] }),
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetServicesByCategoryQuery,
  useSearchServiceQuery,
  useSearchUnifiedQuery,
  useLazySearchUnifiedQuery,
  useGetServiceDetailsQuery,
  useGetCitiesQuery,
  useGetAllServicesQuery
} = serviceApi;