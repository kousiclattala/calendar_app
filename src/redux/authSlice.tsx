import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {AuthState} from './types';

const initialState: AuthState = {
  isLoading: false,
  userData: {},
  value: 0,
  searchData: [],
  searchValue: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    setIsLoading: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSearchValue: (state: AuthState, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSearchData: (state: AuthState, action: PayloadAction<any>) => {
      state.searchData = action.payload;
    },
  },
});

export const {
  setIsLoading,
  increment,
  decrement,
  setSearchData,
  setSearchValue,
} = authSlice.actions;

export default authSlice;
