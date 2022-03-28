import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getTargetsFulfilled } from 'services/model/targets';

const initialState = {
  targets: [],
  position: null,
};

const targetSlice = createSlice({
  name: 'target',
  initialState,
  reducers: {
    setTargets(state, { payload: { targets } }) {
      state.targets = targets;
    },
    setPosition(state, { payload }) {
      state.position = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(isAnyOf(getTargetsFulfilled), (state, { payload: { targets } }) => {
      state.targets = targets;
    });
  },
});

export const { setTargets, setPosition } = targetSlice.actions;

export default targetSlice.reducer;
