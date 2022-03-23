import { combineReducers } from 'redux';

import { api } from 'services/api';
import authReducer from './slices/authSlice';
import targetReducer from './slices/targetSlice';
import topicReducer from './slices/topicSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  target: targetReducer,
  topic: topicReducer,
});

export default rootReducer;
