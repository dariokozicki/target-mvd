import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getTargetsFulfilled } from 'services/model/targets';

const initialState = {
  targets: [],
};

const targetSlice = createSlice({
  name: 'target',
  initialState,
  reducers: {
    setTargets(state, { payload: { targets } }) {
      state.targets = targets;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(isAnyOf(getTargetsFulfilled), (state, { payload: { targets } }) => {
      state.targets = targets;
    });
  },
});

export const { setTargets } = targetSlice.actions;

export default targetSlice.reducer;
