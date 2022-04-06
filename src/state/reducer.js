import { combineReducers } from 'redux';

import { api } from 'services/api';
import authReducer from './slices/authSlice';
import targetReducer from './slices/targetSlice';
import tabReducer from './slices/tabSlice';
import { toastsReducer } from 'react-toastify-redux';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  target: targetReducer,
  tab: tabReducer,
  toasts: toastsReducer,
});

export default rootReducer;
