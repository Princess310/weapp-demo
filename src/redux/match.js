import { createAction, handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';

export const FETCH_MATCH = 'FETCH_MATCH';
export const LOAD_MATCH = 'LOAD_MATCH';

export const FETCH_DETAIL = 'FETCH_DETAIL';
export const LOAD_DETAIL = 'LOAD_DETAIL';

export const FETCH_CITY = 'FETCH_CITY';
export const LOAD_CITY = 'LOAD_CITY';

export const FETCH_MY_LIST = 'FETCH_MY_LIST';
export const LOAD_MY_LIST = 'LOAD_MY_LIST';

export const FETCH_FILTERS = 'FETCH_FILTERS';
export const LOAD_FILTERS = 'LOAD_FILTERS';

export const FETCH_LOCATION = 'FETCH_LOCATION';
export const LOAD_LOCATION = 'LOAD_LOCATION';

// 初始state
export const INITIAL_STATE = immutable({
	detail: {},
	page: {},
	list: [],
	myList: [],
	filter: {
		items: [],
		roles: []
	},
	city: {
		current: {
			id: "5101",
			name: "成都市"
		},
		hot_city: [],
		normal_city: []
	},
});

export const list = createAction(FETCH_MATCH);
export const load = createAction(LOAD_MATCH);

export const fetchDetail = createAction(FETCH_DETAIL);
export const loadDetail = createAction(LOAD_DETAIL);

export const fetchCity = createAction(FETCH_CITY);
export const loadCity = createAction(LOAD_CITY);

export const fetchMyList = createAction(FETCH_MY_LIST);
export const loadMyList = createAction(LOAD_MY_LIST);

export const fetchFilters = createAction(FETCH_FILTERS);
export const loadFilters = createAction(LOAD_FILTERS);

export const fetchLoaction = createAction(FETCH_LOCATION);
export const loadLoaction = createAction(LOAD_LOCATION);

export default handleActions({
	[LOAD_MATCH]: (state, action) => {
		const page = action.payload.page;
		let list = [];
		// page start as 2
		let hasNext = page && page.current_page < (page.page_count + 1);

		if(page && page.current_page === 1){
			list = action.payload.list;
		}else {
			list = state.list.concat(action.payload.list);
		}

		return {
			...state,
			hasNext: hasNext,
			page: state.list.concat(action.payload.page),
			list: list
		};
	},
	[LOAD_DETAIL]: (state, action) => {
		const { data } = action.payload;

		return {
			...state,
			detail: data
		}
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
	},
	[LOAD_LOCATION]: (state, action) => {
		const { data } = action.payload;
		let city = {
			...state.city,
			current: data
		}

		return {
			...state,
			city: city
		}
	},
	[LOAD_FILTERS]: (state, action) => {
		const { items, roles } = action.payload;
		return {
			...state,
			filter: {
				items: items,
				roles: roles
			}
		}
	},
	[LOAD_MY_LIST]: (state, action) => {
		const page = action.payload.page;
		let list = [];
		let hasNext = page && page.current_page < page.page_count;

		if(page && page.current_page === 1){
			list = action.payload.list;
		}else {
			list = state.myList.concat(action.payload.list);
		}

		return {
			...state,
			hasMyNext: hasNext,
			myList: list
		};
	}
}, INITIAL_STATE);
