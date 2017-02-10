import * as moment from '../redux/moment';
import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { LOAD, REFRESH, SAVE_USER, SAVE_USERNAME, SAVE_BUSINESS, SAVE_USER_INFO, 
		 GET_VERIFY_CODE, SAVE_CHANGE_MOBILE } from '../redux/user';
import { FETCH_BUSINESS_INFO} from '../redux/match';
import { FETCH_MATCH } from '../redux/user';
import { request } from '../utils/request';
import { load } from '../redux/user';
import { uploadFile } from '../utils/utils';

function* save(action) {
	try {
		let { avatar } = action.payload;
		avatar = (avatar instanceof Array) ? avatar.join(',') : avatar;

		if(avatar !== '' && (avatar.indexOf('wxfile://') >= 0)){
			let { url } = yield uploadFile(avatar);
			action.payload.avatar = url;
		}

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
		let { pictures } = action.payload;
		let urls = [];
		
		// upload files to server
		if(pictures.length > 0){
			for(let i = 0; i < pictures.length; i++){
				let { url } = yield uploadFile(pictures[i]);
				urls.push(url);
			}
		}

		action.payload.pictures = JSON.stringify(urls);

		yield request(true).put("user/business", action.payload);

		// refresh user and business info
		yield put({type: REFRESH, payload: {}});
		yield put({type: FETCH_BUSINESS_INFO, payload: {}});
	} catch (error) {
		console.log('login error', error);
	}
}

function* saveUserInfo(action){
	try {
		yield request(true).put("user/complete-info", action.payload);

		// refresh user and business info
		yield put({type: REFRESH, payload: {}});
	} catch (error) {
		console.log('login error', error);
	}
}

function* fetchCode(action){
	try {
		yield request(true).get("code/getcode", action.payload);

		wx.showToast({
			title: '验证码已经发送，注意查收'
		});
	} catch (error) {
		console.log('login error', error);
	}
}

function* saveMobile(action){
	try {
		yield request(true).put("user/bind-mobile", action.payload);

		// refresh user info
		yield put({type: REFRESH});
		wx.navigateBack({
			delta: 1
		});
	} catch (error) {
		console.log('login error', error);
	}
}

function* userSaga() {
  yield [
	takeLatest(SAVE_USER, save),
	takeLatest(REFRESH, refresh),
	takeLatest(SAVE_USERNAME, saveUsername),
	takeLatest(SAVE_BUSINESS, saveBusiness),
	takeLatest(SAVE_USER_INFO, saveUserInfo),
	takeLatest(GET_VERIFY_CODE, fetchCode),
	takeLatest(SAVE_CHANGE_MOBILE, saveMobile)
  ];
}

export default userSaga;