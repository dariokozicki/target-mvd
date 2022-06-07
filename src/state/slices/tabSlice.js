import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { tabsEnum } from 'components/common/Tabs';
import { setConversationSelected } from './targetSlice';

const initialState = {
  homeTab: tabsEnum.intro,
  showContactDialog: false,
  newMatch: null,
  showMapMobile: false,
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
    setNewMatch(state, { payload }) {
      state.newMatch = payload;
    },
    setShowMapMobile(state, { payload }) {
      state.showMapMobile = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(isAnyOf(setConversationSelected), state => {
      state.homeTab = tabsEnum.chat;
    });
  },
});

export const { setHomeTab, setShowContactDialog, setNewMatch, setShowMapMobile } = tabSlice.actions;

export const selectTab = state => state.tab;

export default tabSlice.reducer;
