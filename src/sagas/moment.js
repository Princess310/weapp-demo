import * as moment from '../redux/moment';
import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { LOAD_MOMENTS, FETCH_MOMENTS, REFRESH_MOMENTS, 
		 FETCH_REWARD, LOAD_REWARD } from '../redux/moment';
import { request } from '../utils/request';
import { load, loadReward } from '../redux/moment';

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

function* momentSaga() {
	yield [
		takeLatest(REFRESH_MOMENTS, fetchMoments),
		takeLatest(FETCH_MOMENTS, fetchMoments),
		takeLatest(FETCH_REWARD, fetchReword)
	];
}

export default momentSaga;