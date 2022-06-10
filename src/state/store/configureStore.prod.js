import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { api } from 'services/api';
import reducer from 'state/reducer';

const middleware = getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware, thunk);

const store = configureStore({
  reducer,
  middleware,
  devTools: false,
});

export default store;
