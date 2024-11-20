import {createAction} from '@reduxjs/toolkit';
import {setIsLoading} from './saga';
import authSlice from '../authSlice';

// const SET_IS_LOADING = createAction('auth/updateLoading', setIsLoading)
// const SET_IS_LOADING = authSlice.actions.setIsLoading;

export const TYPES = {
  SET_IS_LOADING: 'auth/setIsLoading',
};
