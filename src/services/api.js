import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from 'utils/customQueries';

export const tagTypes = {
  TARGETS: 'TARGETS',
};

// initialize an empty api service that we'll inject endpoints into later as needed

export const api = createApi({
  reducerPath: 'api',
  tagTypes: Object.keys(tagTypes).map(tag => tagTypes[tag]),
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
