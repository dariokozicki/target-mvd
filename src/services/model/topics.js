import endpoints from 'constants/endpoints';
import { api } from 'services/api';

const authApi = api.injectEndpoints({
  endpoints: builder => ({
    getTopics: builder.mutation({
      query: () => ({
        url: endpoints.TOPICS,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetTopicsMutation,
  endpoints: {
    getTopics: { matchFulfilled: getTopicsFulfilled },
  },
} = authApi;

export const selectTopics = state => state.topic;
