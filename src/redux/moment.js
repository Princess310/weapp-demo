import { createAction, handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';

export const REFRESH_MOMENTS = 'REFRESH_MOMENTS';
export const LOAD_MOMENTS = 'LOAD_MOMENTS';
export const FETCH_MOMENTS = 'FETCH_MOMENTS';

// 初始state
export const INITIAL_STATE = immutable({
	detail: {},
	list: []
});

export const refresh = createAction(REFRESH_MOMENTS);
export const list = createAction(FETCH_MOMENTS);
export const load = createAction(LOAD_MOMENTS, (list) => (list));

export default handleActions({
	[FETCH_MOMENTS]: (state, action) => {
		return state;
	},
	[LOAD_MOMENTS]: (state, action) => {
		return {
			...state,
			list: state.list.concat(action.payload)
		};
	}
}, INITIAL_STATE);
