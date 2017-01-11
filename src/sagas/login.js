import wx from 'labrador';
import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import request from 'al-request';
import { loginSuccess, loginFailure } from '../redux/login';
import { load } from '../redux/user';
import { LOGIN } from '../redux/login';

// 请求登录
function* login() {
  try {
    let res = yield wx.login();
    let data = yield wx.getUserInfo();
    let user = yield request.post('user/wx-small-login', {
      code: res.code,
      ...data
    });
    console.log("user", user);
    yield put(loginSuccess(user.id));
    yield put(load(user));
  } catch (error) {
    console.log('login error', error);
    yield put(loginFailure(error));
  }
}


function* loginSaga() {
  yield [
    takeLatest(LOGIN, login)
  ];
}

export default loginSaga;