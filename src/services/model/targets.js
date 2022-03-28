import endpoints from 'constants/endpoints';
import { api } from 'services/api';

const targetsApi = api.injectEndpoints({
  endpoints: builder => ({
    getTargets: builder.mutation({
      query: () => ({
        url: endpoints.TARGETS,
        method: 'GET',
      }),
    }),
    createTarget: builder.mutation({
      query: target => ({
        url: endpoints.TARGETS,
        method: 'POST',
        body: { target },
      }),
    }),
    destroyTarget: builder.mutation({
      query: targetId => ({
        url: endpoints.TARGETS + '/' + targetId,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetTargetsMutation,
  useCreateTargetMutation,
  useDestroyTargetMutation,
  endpoints: {
    getTargets: { matchFulfilled: getTargetsFulfilled },
    createTarget: { matchFulfilled: createTargetFulfilled },
    destroyTarget: { matchFulfilled: destroyTargetFulfilled },
  },
} = targetsApi;

export const selectTargets = state => {
  return state.target;
};
