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
    facebook: builder.mutation({
      query: user => ({
        url: endpoints.SIGN_FACEBOOK,
        method: 'POST',
        body: { access_token: user.accessToken },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useFacebookMutation,
  endpoints: {
    signup: { matchFulfilled: signupFulfilled },
    login: { matchFulfilled: loginFulfilled },
    logout: { matchFulfilled: logoutFulfilled },
    facebook: { matchFulfilled: facebookFulfilled },
  },
} = authApi;

export const selectAuth = state => state.auth;
