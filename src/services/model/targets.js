import endpoints from 'constants/endpoints';
import { api, tagTypes } from 'services/api';

const targetsApi = api.injectEndpoints({
  endpoints: builder => ({
    getTargets: builder.query({
      query: () => ({
        url: endpoints.TARGETS,
        method: 'GET',
      }),
      providesTags: [tagTypes.TARGETS],
    }),
    createTarget: builder.mutation({
      query: creation => ({
        url: endpoints.TARGETS,
        method: 'POST',
        body: creation,
      }),
      invalidatesTags: [tagTypes.TARGETS],
    }),
    destroyTarget: builder.mutation({
      query: targetId => ({
        url: endpoints.TARGETS + '/' + targetId,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.TARGETS],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetTargetsQuery,
  useCreateTargetMutation,
  useDestroyTargetMutation,
  endpoints: {
    getTargets: { matchFulfilled: getTargetsFulfilled },
    createTarget: { matchFulfilled: createTargetFulfilled, matchRejected: createTargetRejected },
    destroyTarget: { matchFulfilled: destroyTargetFulfilled },
  },
} = targetsApi;

export const selectTargets = state => {
  return state.target;
};
