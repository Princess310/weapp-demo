import * as moment from '../redux/moment';
import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { LOAD_MOMENTS, FETCH_MOMENTS, REFRESH_MOMENTS, ADD_MOMENT,
		 FETCH_INVITES,
		 FETCH_REWARD, LOAD_REWARD } from '../redux/moment';
import { request } from '../utils/request';
import { load, loadReward } from '../redux/moment';
import wx from 'labrador';

// --------- Moment Interface --------- //
function* fetchMoments(action) {
	const { page } = action.payload;

	try {
		let { list, page: resPage } = yield request(true).get("moments/moments", {
			page: page
		});

		yield put(load({
			page: resPage,
			list: list
		}));
	} catch (error) {
		console.log('login error', error);
	}
}

function* addMoment(action){
	try {
		yield request(true).post("moments/release", action.payload);
	} catch (error) {
		console.log('login error', error);
	}
}
// --------- /Moment Interface --------- //

// --------- Reward Interface --------- //
function* fetchReword(){
	try {
		let { list } = yield request(true).get("moments/reward-item");
		yield put(loadReward({
			list: list
		}));
	} catch (error) {
		console.log('login error', error);
	}
}
// --------- /Reward Interface --------- //

function* momentSaga() {
	yield [
		takeLatest(REFRESH_MOMENTS, fetchMoments),
		takeLatest(FETCH_MOMENTS, fetchMoments),
		takeLatest(FETCH_REWARD, fetchReword),
		takeLatest(ADD_MOMENT, addMoment)
	];
}

export default momentSaga;