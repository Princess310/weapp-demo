import loginSaga from './login';
import momentSaga from './moment';
import startupSagas from './startup';
import userSaga from './user';
import sysEmitSaga from './sysEmit';
import matchSaga from './match';

// 当action触发时，执行特定saga
export default function* root() {
  yield [loginSaga(), momentSaga(), startupSagas(), userSaga(), sysEmitSaga(), matchSaga()];
}
