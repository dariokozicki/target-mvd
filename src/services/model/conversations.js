import endpoints from 'constants/endpoints';
import { api, tagTypes } from 'services/api';

const conversationsApi = api.injectEndpoints({
  endpoints: builder => ({
    getConversations: builder.query({
      query: userId => ({
        url: endpoints.CONVERSATIONS,
        method: 'GET',
      }),
      providesTags: [tagTypes.CONVERSATIONS],
    }),
    getMessages: builder.query({
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
  useGetConversationsQuery,
  useGetMessagesQuery,
  endpoints: {
    getConversations: { matchFulfilled: getConversationsFulfilled },
    getMessages: { matchFulfilled: getMessagesFulfilled },
  },
} = conversationsApi;

export const selectConversations = state => state.conversations;
