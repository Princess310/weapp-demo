import { createAction, handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';

export const REFRESH_MOMENTS = 'REFRESH_MOMENTS';
export const LOAD_MOMENTS = 'LOAD_MOMENTS';
export const FETCH_MOMENTS = 'FETCH_MOMENTS';

// 初始state
export const INITIAL_STATE = immutable({
	detail: {},
	page: {},
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
		const page = action.payload.page;
		let list = [];
		let hasNaxt = page && page.current_page < page.page_count;

		if(page && page.current_page === 1){
			list = action.payload.list;
		}else {
			list = state.list.concat(action.payload.list);
		}

		return {
			...state,
			hasNaxt: hasNaxt,
			page: state.list.concat(action.payload.page),
			list: list
		};
	}
}, INITIAL_STATE);
