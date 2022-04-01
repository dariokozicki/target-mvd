import { createSlice } from '@reduxjs/toolkit';
import { tabsEnum } from 'components/common/Tabs';

const initialState = {
  homeTab: tabsEnum.intro,
  showMenu: true,
};

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setHomeTab(state, { payload }) {
      state.homeTab = payload;
      state.showMenu = false;
    },
    setShowMenu(state, { payload }) {
      state.showMenu = payload;
    },
  },
});

export const { setHomeTab, setShowMenu } = tabSlice.actions;

export const selectTab = state => state.tab;

export default tabSlice.reducer;
