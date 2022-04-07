import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  creation: {},
  position: null,
};

const targetSlice = createSlice({
  name: 'target',
  initialState,
  reducers: {
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
});

export const { setPosition, fillCreationTarget, resetCreationTarget } = targetSlice.actions;

export default targetSlice.reducer;
