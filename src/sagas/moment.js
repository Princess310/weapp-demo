import * as moment from '../redux/moment';
import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { LOAD_MOMENTS, FETCH_MOMENTS } from '../redux/moment';
import request from 'al-request';
import { load } from '../redux/moment';

function* fetchMoments(action) {
	const { page } = action.payload;

	try {
		let { list } = yield request.get("moments/moments", {
			page: page
		}, {
			'X-Access-Token': '838d2be9f9ab52b0bf3fce11bbc6e7d5'
		});

		console.log("list", list);
		yield put(load(list));
	} catch (error) {
		console.log('login error', error);
	}
}

function* momentSaga() {
	yield [
		takeLatest(FETCH_MOMENTS, fetchMoments)
	];
}

export default momentSaga;