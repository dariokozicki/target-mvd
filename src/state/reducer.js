import { toastsReducer } from 'react-toastify-redux';
import { combineReducers } from 'redux';
import { api } from 'services/api';
import authReducer from './slices/authSlice';
import tabReducer from './slices/tabSlice';
import targetReducer from './slices/targetSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  target: targetReducer,
  tab: tabReducer,
  toasts: toastsReducer,
});

export default rootReducer;
