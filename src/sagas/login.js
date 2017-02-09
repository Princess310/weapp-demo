import wx from 'labrador';
import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { request, setSession } from '../utils/request';
import { loginSuccess, loginFailure } from '../redux/login';
import { load } from '../redux/user';
import { LOGIN, REFRESH_LOGIN, ACCOUNT_LOGIN } from '../redux/login';
import { FETCH_MOMENTS } from '../redux/moment';
import { REFRESH } from '../redux/user';
import { FETCH_MATCH } from '../redux/match';
import * as userActions from '../redux/user';

// 请求登录
function* login() {
  try {
    let res = yield wx.login();
    let data = yield wx.getUserInfo();
    let user = yield request(false).post('user/wx-small-login', {
      code: res.code,
      type: 'cbeb1b',
      ...data
    });

    setSession(user.access_token);
    yield put(userActions.load(user.data));

    // if have not industry, should load the guide page
    if(user.data.industry_son_id <= 0){
      wx.navigateTo({
        url: '../../../pages/common/guide/index'
      });
    }
  } catch (error) {
    console.log('login error', error);
    yield put(loginFailure(error));
  }
}

// 一键登录
function* reLogin() {
  try {
    let res = yield wx.login();
    let data = yield wx.getUserInfo();

    if(res.code){
      let user = yield request(false).post('user/wx-small-login', {
        code: res.code,
        type: 'cbeb1b',
        ...data
      });

      setSession(user.access_token);
      yield put(userActions.load(user.data));

      wx.navigateBack({
        delta: 1
      });

      // 刷新信息
      yield put({type: FETCH_MOMENTS, payload: {
        page: 1
      }});
      yield put({type: FETCH_MATCH, payload: filter.current});
      yield put({type: REFRESH});

      // if have not industry, should load the guide page
      if(user.data.industry_son_id <= 0){
        wx.navigateTo({
          url: '../../../pages/common/guide/index'
        });
      }
    }
  } catch (error) {
    console.log('login error', error);
    yield put(loginFailure(error));
  }
}

// 账号登录
function* accountLogin(action) {
  try {
    let user = yield request(false).put('user/login', action.payload);

    setSession(user.access_token);
    yield put(userActions.load(user.data));

    wx.navigateBack({
      delta: 1
    });

    // 刷新信息
    yield put({type: FETCH_MOMENTS, payload: {
      page: 1
    }});
    yield put({type: FETCH_MATCH, payload: filter.current});
    yield put({type: REFRESH});

    // if have not industry, should load the guide page
    if(user.data.industry_son_id <= 0){
      wx.navigateTo({
        url: '../../../pages/common/guide/index'
      });
    }
  } catch (error) {
    console.log('login error', error);
    yield put(loginFailure(error));
  }
}


function* loginSaga() {
  yield [
    takeLatest(LOGIN, login),
    takeLatest(REFRESH_LOGIN, reLogin),
    takeLatest(ACCOUNT_LOGIN, accountLogin)
  ];
}

export default loginSaga;