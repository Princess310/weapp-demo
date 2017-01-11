import wx from 'labrador';
import { put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import request from 'al-request';
import { load } from '../redux/user';
import { STARTUP } from '../redux/startup';

// 刷新用户信息
function* login() {
  try {
    let res = yield wx.login();
    let data = yield wx.getUserInfo();
    let user = yield request.post('user/wx-small-login', {
      code: res.code,
      ...data
    });
    yield put(load(user));
  } catch (error) {
    console.log('refresh error', error);
  }
}

function* userSaga() {
  yield [
    takeLatest(STARTUP, login)
  ];
}

export default userSaga;