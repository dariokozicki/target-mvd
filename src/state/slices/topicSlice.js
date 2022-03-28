import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getTopicsFulfilled } from 'services/model/topics';

const initialState = {
  topics: [],
};

const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    setTopics(state, { payload: { topics } }) {
      state.topics = topics;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(isAnyOf(getTopicsFulfilled), (state, { payload: { topics } }) => {
      state.topics = topics;
    });
  },
});

export const { setTopics } = topicSlice.actions;

export default topicSlice.reducer;
