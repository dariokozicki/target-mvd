import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  creation: {},
  position: null,
  selected: null,
  conversationSelected: null,
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
    setSelected(state, { payload }) {
      state.selected = payload;
    },
    setConversationSelected(state, { payload }) {
      state.conversationSelected = payload;
    },
  },
});

export const {
  setPosition,
  fillCreationTarget,
  resetCreationTarget,
  setSelected,
  setConversationSelected,
} = targetSlice.actions;

export default targetSlice.reducer;
