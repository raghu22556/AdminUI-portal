import { all, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from '../constants';
import API from '../requests';

export function* login(params) {
  try {
    //const response = yield API.login(params.payload);
    const response = yield call(API.login, payload);
    yield put({
      type: ActionTypes.LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ActionTypes.LOGIN_FAILURE,
      error: error,
    });
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.LOGIN_REQUEST, login)]);
}
