import { createAction, handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';

export const REFRESH = 'REFRESH';
export const LOAD = 'LOAD';
export const CLEAR = 'CLEAR';
export const SAVE_USER = 'SAVE_USER';
export const SAVE_USERNAME = 'SAVE_USERNAME';
export const SAVE_BUSINESS = 'SAVE_BUSINESS';
export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const GET_VERIFY_CODE = 'GET_VERIFY_CODE';
export const SAVE_CHANGE_MOBILE = 'SAVE_CHANGE_MOBILE';

// 初始state
export const INITIAL_STATE = immutable({
  id: '',
  nickname: '',
  avatar: '',
  access_token: ''
});

export const refresh = createAction(REFRESH);
export const load = createAction(LOAD, (user) => (user));
export const clear = createAction(CLEAR);
export const save = createAction(SAVE_USER);
export const saveUsername = createAction(SAVE_USERNAME);
export const saveBusiness = createAction(SAVE_BUSINESS);
export const saveUserInfo = createAction(SAVE_USER_INFO);
export const getVerifyCode = createAction(GET_VERIFY_CODE);
export const saveChangeMobile = createAction(SAVE_CHANGE_MOBILE);

export default handleActions({
  [LOAD]: (state, action) => {
  	return state.merge(action.payload);
  }
}, INITIAL_STATE);
