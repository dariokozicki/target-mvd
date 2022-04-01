import endpoints from 'constants/endpoints';
import { api } from 'services/api';

const topicsApi = api.injectEndpoints({
  endpoints: builder => ({
    getTopics: builder.query({
      query: () => ({
        url: endpoints.TOPICS,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetTopicsQuery,
  endpoints: {
    getTopics: { matchFulfilled: getTopicsFulfilled },
  },
} = topicsApi;

export const selectTopics = state => state.topic;
