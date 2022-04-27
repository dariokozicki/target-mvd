import endpoints from 'constants/endpoints';
import { api } from 'services/api';

const authApi = api.injectEndpoints({
  endpoints: builder => ({
    signup: builder.mutation({
      query: user => ({
        url: endpoints.SIGN_UP,
        method: 'POST',
        body: { user },
      }),
    }),
    login: builder.mutation({
      query: user => ({
        url: endpoints.SIGN_IN,
        method: 'POST',
        body: { user },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: endpoints.SIGN_OUT,
        method: 'DELETE',
      }),
    }),
    changePassword: builder.mutation({
      query: body => ({
        url: endpoints.CHANGE_PASSWORD,
        method: 'PUT',
        body,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, user }) => ({
        url: endpoints.USERS + '/' + id,
        method: 'PUT',
        body: { user },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateUserMutation,
  useChangePasswordMutation,
  endpoints: {
    signup: { matchFulfilled: signupFulfilled },
    login: { matchFulfilled: loginFulfilled },
    logout: { matchFulfilled: logoutFulfilled },
    updateUser: { matchFulfilled: updateUserFulfilled },
    changePassword: { matchFulfilled: changePasswordFulfilled },
  },
} = authApi;

export const selectAuth = state => state.auth;
