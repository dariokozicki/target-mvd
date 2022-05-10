import { createSlice } from '@reduxjs/toolkit';
import { tabsEnum } from 'components/common/Tabs';

const initialState = {
  homeTab: tabsEnum.intro,
  showContactDialog: false,
};

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setHomeTab(state, { payload }) {
      state.homeTab = payload;
    },
    setShowContactDialog(state, { payload }) {
      state.showContactDialog = payload;
    },
  },
});

export const { setHomeTab, setShowContactDialog } = tabSlice.actions;

export const selectTab = state => state.tab;

export default tabSlice.reducer;
