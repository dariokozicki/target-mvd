import { combineReducers } from 'redux';

import { api } from 'services/api';
import authReducer from './slices/authSlice';
import targetReducer from './slices/targetSlice';
import tabReducer from './slices/tabSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  target: targetReducer,
  tab: tabReducer,
});

export default rootReducer;
