import { STARTUP } from '../redux/startup';
import { takeLatest } from 'redux-saga';

function* startup() {
  console.log('startup');
}

function* startupSaga() {
  yield [
    takeLatest(STARTUP, startup)
  ];
}

export default startupSaga;
