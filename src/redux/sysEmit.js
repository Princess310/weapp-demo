import { createAction, handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';

export const SET_SYS_INFO = 'SET_SYS_INFO';
export const LOAD_SYS_INFO = 'LOAD_SYS_INFO';

export const SET_SYS_CITY = 'SET_SYS_CITY';
export const LOAD_SYS_CITY = 'LOAD_SYS_CITY';

export const SET_SYS_INDUSTRY = 'SET_SYS_INDUSTRY';
export const LOAD_SYS_INDUSTRY = 'LOAD_SYS_INDUSTRY';

// 初始state
export const INITIAL_STATE = immutable({
  selectMsg: {},
  selectCity: {},
  selectIndustry: {}
});

export const set = createAction(SET_SYS_INFO);
export const load = createAction(LOAD_SYS_INFO, (msg) => (msg));

export const setCity = createAction(SET_SYS_CITY);
export const loadCity = createAction(LOAD_SYS_CITY);

export const setIndustry = createAction(SET_SYS_INDUSTRY);
export const loadIndustry = createAction(LOAD_SYS_INDUSTRY);

export default handleActions({
	[LOAD_SYS_INFO]: (state, action) => {
		return {
			...state,
			selectMsg: action.payload
		};
	},
	[LOAD_SYS_CITY]: (state, action) => {
		return {
			...state,
			selectCity: action.payload
		};
	},
	[LOAD_SYS_INDUSTRY]: (state, action) => {
		return {
			...state,
			selectIndustry: action.payload
		}
	}
}, INITIAL_STATE);
