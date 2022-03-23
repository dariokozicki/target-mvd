import endpoints from 'constants/endpoints';
import { api } from 'services/api';

const authApi = api.injectEndpoints({
  endpoints: builder => ({
    createQuestion: builder.mutation({
      query: (email, body) => ({
        url: endpoints.QUESTIONS,
        method: 'POST',
        body: { email, body },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateQuestionMutation,
  endpoints: {
    createQuestion: { matchFulfilled: createQuestionFulfilled },
  },
} = authApi;

export const selectQuestions = state => state.questions;
