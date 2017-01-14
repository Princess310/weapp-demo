import * as moment from '../redux/moment';
import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { FETCH_MATCH, FETCH_CITY } from '../redux/match';
import { request } from '../utils/request';
import { load, loadCity } from '../redux/match';

// --------- Invite Interface --------- //
function* fetchIvites(action){
	try {
		let { list, page: resPage } = yield request(true).get("match/index", action.payload);

		yield put(load({
			page: resPage,
			list: list
		}));
	} catch (error) {
		console.log('login error', error);
	}
}
// --------- Invite Interface --------- //

// --------- City Interface --------- //
function* fetchCityList(){
	try {
		let { data } = yield request(true).get("area");

		yield put(loadCity({
			data: data
		}));
	} catch (error) {
		console.log('login error', error);
	}
}
// --------- /City Interface --------- //

function* matchSaga() {
	yield [
		takeLatest(FETCH_MATCH, fetchIvites),
		takeLatest(FETCH_CITY, fetchCityList)
	];
}

export default matchSaga;