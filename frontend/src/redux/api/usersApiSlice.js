import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    profile: builder.query({
      query: () => `${USERS_URL}/profile`,
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    getUserById: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "GET",
      }),
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileQuery,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = usersApiSlice;
