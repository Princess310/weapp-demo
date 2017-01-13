import { createAction, handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';

export const SET_SYS_INFO = 'SET_SYS_INFO';
export const LOAD_SYS_INFO = 'LOAD_SYS_INFO';

// 初始state
export const INITIAL_STATE = immutable({
  selectMsg: {}
});

export const set = createAction(SET_SYS_INFO);
export const load = createAction(LOAD_SYS_INFO, (msg) => (msg));

export default handleActions({
  [LOAD_SYS_INFO]: (state, action) => {
  	console.log("action", action);
  	return {
  		...state,
  		selectMsg: action.payload
  	};
  }
}, INITIAL_STATE);
