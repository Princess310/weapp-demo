import { createAction, handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';

export const FETCH_MATCH = 'FETCH_MATCH';
export const LOAD_MATCH = 'LOAD_MATCH';

export const FETCH_CITY = 'FETCH_CITY';
export const LOAD_CITY = 'LOAD_CITY';

// 初始state
export const INITIAL_STATE = immutable({
	detail: {},
	page: {},
	list: [],
	city: {
		current: {},
		hot_city: [],
		normal_city: []
	},
});

export const list = createAction(FETCH_MATCH);
export const load = createAction(LOAD_MATCH);

export const fetchCity = createAction(FETCH_CITY);
export const loadCity = createAction(LOAD_CITY);

export default handleActions({
	[LOAD_MATCH]: (state, action) => {
		const page = action.payload.page;
		let list = [];
		// page start as 2
		let hasNaxt = page && page.current_page < (page.page_count + 1);

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
	},
	[LOAD_CITY]: (state, action) => {
		const { data } = action.payload;
		let city = {
			...state.city,
			hot_city: data.hot_city,
			normal_city: data.normal_city
		};

		return {
			...state,
			city: city
		};
	}
}, INITIAL_STATE);
