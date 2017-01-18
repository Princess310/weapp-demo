import * as moment from '../redux/moment';
import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { LOAD, REFRESH, SAVE_USER, SAVE_USERNAME, SAVE_BUSINESS } from '../redux/user';
import { FETCH_BUSINESS_INFO} from '../redux/match';
import { FETCH_MATCH } from '../redux/user';
import { request } from '../utils/request';
import { load } from '../redux/user';

function* save(action) {
	try {
		yield request(true).put("user/edit", action.payload);

		// refresh user info
		yield put({type: REFRESH});
	} catch (error) {
		console.log('login error', error);
	}
}

function* refresh(action){
	try {
		const { data } = yield request(true).get("user/info", action.payload);

		yield put(load(data));
	} catch (error) {
		console.log('login error', error);
	}
}

function* saveUsername(action){
	try {
		yield request(true).put("user/we-meet-no", {
			username: action.payload.username
		});

		yield put({type: REFRESH, payload: {}});
	} catch (error) {
		console.log('login error', error);
	}
}

function* saveBusiness(action){
	try {
		yield request(true).put("user/business", action.payload);

		// refresh user and business info
		yield put({type: REFRESH, payload: {}});
		yield put({type: FETCH_BUSINESS_INFO, payload: {}});
	} catch (error) {
		console.log('login error', error);
	}
}

function* userSaga() {
  yield [
  	takeLatest(SAVE_USER, save),
  	takeLatest(REFRESH, refresh),
  	takeLatest(SAVE_USERNAME, saveUsername),
  	takeLatest(SAVE_BUSINESS, saveBusiness)
  ];
}

export default userSaga;