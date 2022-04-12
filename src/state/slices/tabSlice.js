import { createSlice } from '@reduxjs/toolkit';
import { tabsEnum } from 'components/common/Tabs';

const initialState = {
  homeTab: tabsEnum.intro,
};

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setHomeTab(state, { payload }) {
      state.homeTab = payload;
    },
  },
});

export const { setHomeTab } = tabSlice.actions;

export const selectTab = state => state.tab;

export default tabSlice.reducer;
