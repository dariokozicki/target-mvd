import endpoints from 'constants/endpoints';
import { api } from 'services/api';

const topicsApi = api.injectEndpoints({
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
} = topicsApi;

export const selectTopics = state => state.topic;
