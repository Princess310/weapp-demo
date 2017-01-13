import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { SET_SYS_INFO, LOAD_SYS_INFO} from '../redux/sysEmit';
import { set, load } from '../redux/sysEmit';

function* setSysInfo(action){
	try {
		yield put(load(action.payload));
	} catch (error) {
		console.log('login error', error);
	}
}

function* sysEmitSaga() {
  yield [
  	takeLatest(SET_SYS_INFO, setSysInfo),
  ];
}

export default sysEmitSaga;