import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {TYPES} from './sagatypes';
import {PayloadAction} from '@reduxjs/toolkit';
import {decrement, increment, setIsLoading, setSearchData} from '../authSlice';
import {handleSearchCall} from '../../API/ApiServices';
import {response} from '../../API/api';

export function* isLoadingSaga(action: PayloadAction<boolean>) {
  yield put(setIsLoading(action.payload));
}

export function* handleIncrement() {
  console.log('increment');
  yield put(increment());
}

export function* handleDecrement() {
  console.log('decrement');
  yield put(decrement());
}

export function* handleSearchData(action: PayloadAction<string>) {
  console.log('payload', action.payload);

  const res: response = yield call(handleSearchCall, action.payload);

  if (res.status) {
    yield put(setSearchData(res.data));
  } else {
    console.log('no data');
  }
}
