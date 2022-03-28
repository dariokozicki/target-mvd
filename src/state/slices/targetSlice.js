import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getTargetsFulfilled } from 'services/model/targets';

const initialState = {
  targets: [],
  creation: {
    lat: null,
    lng: null,
    radius: null,
    topic: null,
    title: null,
  },
};

const targetSlice = createSlice({
  name: 'target',
  initialState,
  reducers: {
    setTargets(state, { payload: { targets } }) {
      state.targets = targets;
    },
    setCreationTarget(state, { payload: { creation } }) {
      state.creation = creation;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(isAnyOf(getTargetsFulfilled), (state, { payload: { targets } }) => {
      state.targets = targets;
    });
  },
});

export const { setTargets, setCreationTarget } = targetSlice.actions;

export default targetSlice.reducer;
