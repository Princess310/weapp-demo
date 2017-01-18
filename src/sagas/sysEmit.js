import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { SET_SYS_INFO, SET_SYS_CITY, SET_SYS_INDUSTRY} from '../redux/sysEmit';
import { load, loadCity, loadIndustry } from '../redux/sysEmit';

function* setSysInfo(action){
	try {
		yield put(load(action.payload));
	} catch (error) {
		console.log('login error', error);
	}
}

function* setSysCity(action){
	try {
		yield put(loadCity(action.payload));
	} catch (error) {
		console.log('login error', error);
	}
}

function* setSysIndustry(action){
	try {
		yield put(loadIndustry(action.payload));
	} catch (error) {
		console.log('login error', error);
	}
}

function* sysEmitSaga() {
	yield [
		takeLatest(SET_SYS_INFO, setSysInfo),
		takeLatest(SET_SYS_CITY, setSysCity),
		takeLatest(SET_SYS_INDUSTRY, setSysIndustry)
	];
}

export default sysEmitSaga;