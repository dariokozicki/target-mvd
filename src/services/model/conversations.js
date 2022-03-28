import endpoints from 'constants/endpoints';
import { api } from 'services/api';

const conversationsApi = api.injectEndpoints({
  endpoints: builder => ({
    getConversations: builder.mutation({
      query: () => ({
        url: endpoints.CONVERSATIONS,
        method: 'GET',
      }),
    }),
    getMessages: builder.mutation({
      query: (conversationId, page = 1) => ({
        url: [
          endpoints.CONVERSATIONS,
          '/',
          conversationId,
          endpoints.MESSAGES,
          '?page=',
          page,
        ].join(''),
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetConversationsMutation,
  useGetMessagesMutation,
  getConversations: { matchFulfilled: getConversationsFulfilled },
  getMessages: { matchFulfilled: getMessagesFulfilled },
} = conversationsApi;

export const selectConversations = state => state.conversations;
