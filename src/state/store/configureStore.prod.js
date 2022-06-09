import { configureStore } from '@reduxjs/toolkit';
import reducer from 'state/reducer';

const middleware = getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware, thunk);

const store = configureStore({
  reducer,
  middleware,
  devTools: false,
});

export default store;
