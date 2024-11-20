import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import reactotron from '../../ReactotronConfig';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer.reducer,
  },
  enhancers: getDefaultEnhancers =>
    getDefaultEnhancers().concat(reactotron.createEnhancer()),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;