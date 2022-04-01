import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getTargetsFulfilled } from 'services/model/targets';

const initialState = {
  targets: [],
  creation: null,
  position: null,
};

const targetSlice = createSlice({
  name: 'target',
  initialState,
  reducers: {
    setTargets(state, { payload: { targets } }) {
      state.targets = targets;
    },
    fillCreationTarget(state, { payload }) {
      state.creation = { ...state.creation, ...payload };
    },
    resetCreationTarget(state) {
      state.creation = null;
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

export const { setTargets, setPosition, fillCreationTarget, resetCreationTarget } =
  targetSlice.actions;

export default targetSlice.reducer;
