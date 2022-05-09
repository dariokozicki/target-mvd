import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from 'utils/customQueries';

export const tagTypes = {
  TARGETS: 'TARGETS',
  CONVERSATIONS: 'CONVERSATIONS',
};

// initialize an empty api service that we'll inject endpoints into later as needed

export const api = createApi({
  reducerPath: 'api',
  tagTypes: Object.values(tagTypes),
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
