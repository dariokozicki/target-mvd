import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getTargetsFulfilled } from 'services/model/targets';

const initialState = {
  targets: [],
  creation: {},
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
      state.creation.target = { ...state.creation.target, ...payload };
    },
    resetCreationTarget(state) {
      state.creation = {};
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
