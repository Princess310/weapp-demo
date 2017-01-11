import { combineReducers } from 'redux';
import configureStore from './createStore';
import rootSaga from '../sagas/';

import loginReducer from './login';
import userReducer from './user';
import momentReducer from './moment';
import todosReducer from './todos';

function createStore() {
  const rootReducer = combineReducers({
    login: loginReducer,
    user: userReducer,
    moment: momentReducer,
    todos: todosReducer
  });

  return configureStore(rootReducer, rootSaga);
}

export default createStore();
