import {all, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  handleDecrement,
  handleIncrement,
  handleSearchData,
  isLoadingSaga,
} from './saga';
import {TYPES} from './sagatypes';
import {decrement, increment, setIsLoading, setSearchValue} from '../authSlice';

export default function* rootSaga() {
  yield all([watchSaga()]);
}

export function* watchSaga() {
  yield takeLatest(setIsLoading.type, isLoadingSaga);
  yield takeLatest(increment.type, handleIncrement);
  yield takeLatest(decrement.type, handleDecrement);

  yield takeLatest(setSearchValue.type, handleSearchData);
}
