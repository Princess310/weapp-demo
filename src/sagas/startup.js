import wx from 'labrador';
import { STARTUP } from '../redux/startup';
import { put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { request, setSession } from '../utils/request';
import { load } from '../redux/user';

// 刷新用户信息
function* login() {
  try {
	let res = yield wx.login();
	let data = yield wx.getUserInfo();
	let user = yield request(false).post('user/wx-small-login', {
		code: res.code,
		...data
	});

	setSession(user.access_token);
	yield put(load(user.data));
  } catch (error) {
	console.log('refresh error', error);
  }
}

function* startupSaga() {
  yield [
	takeLatest(STARTUP, login),
  ];
}

export default startupSaga;