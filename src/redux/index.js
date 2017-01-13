import { combineReducers } from 'redux';
import configureStore from './createStore';
import rootSaga from '../sagas/';

import loginReducer from './login';
import userReducer from './user';
import momentReducer from './moment';
import todosReducer from './todos';

import sysEmitReducer from './sysEmit';

function createStore() {
  const rootReducer = combineReducers({
    login: loginReducer,
    user: userReducer,
    moment: momentReducer,
    todos: todosReducer,
    sysEmit: sysEmitReducer
  });

  return configureStore(rootReducer, rootSaga);
}

export default createStore();
