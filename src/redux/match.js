import { createAction, handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';
import date from '../utils/date';
import city from '../utils/city';

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
export const SET_FILTER = 'SET_FILTER';

export const FETCH_LOCATION = 'FETCH_LOCATION';
export const LOAD_LOCATION = 'LOAD_LOCATION';

export const FETCH_INDUSTRY = 'FETCH_INDUSTRY';
export const LOAD_INDUSTRY = 'LOAD_INDUSTRY';

export const FETCH_BUSINESS_INFO = 'FETCH_BUSINESS_INFO';
export const LOAD_BUSINESS_INFO = 'LOAD_BUSINESS_INFO';

export const FETCH_TAG_LIST = 'FETCH_TAG_LIST';
export const LOAD_TAG_LIST = 'LOAD_TAG_LIST';
export const ADD_TAG = 'ADD_TAG';
export const DELETE_TAG = 'DELETE_TAG';
export const SELECT_TAG = 'SELECT_TAG';
export const SAVE_TAGS = 'SAVE_TAGS';

export const FOLLOW_USER = 'FOLLOW_USER';
export const CANCEL_FOLLOW_USER = 'CANCEL_FOLLOW_USER';

// 初始state
export const INITIAL_STATE = immutable({
	detail: {},
	page: {},
	list: [],
	myList: [],
	filter: {
		items: [],
		roles: [],
		current: {
			page: 2,
			city_id: "5101",
			keyword: ''
		}
	},
	city: {
		current: {
			id: "5101",
			name: "成都市"
		},
		hot_city: [],
		normal_city: []
	},
	industry: [],
	business: {},
	tags: {}
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
export const setFilter = createAction(SET_FILTER);

export const fetchLoaction = createAction(FETCH_LOCATION);
export const loadLoaction = createAction(LOAD_LOCATION);

export const fetchIndustry = createAction(FETCH_INDUSTRY);
export const loadIndustry = createAction(LOAD_INDUSTRY);

export const fetchBusinessInfo = createAction(FETCH_BUSINESS_INFO);
export const loadBusinessInfo = createAction(LOAD_BUSINESS_INFO);

export const fetchTags = createAction(FETCH_TAG_LIST);
export const loadTags = createAction(LOAD_TAG_LIST);
export const addTag = createAction(ADD_TAG);
export const deleteTag = createAction(DELETE_TAG);
export const selectTag = createAction(SELECT_TAG);
export const saveTags = createAction(SAVE_TAGS);

export const followUser = createAction(FOLLOW_USER);
export const cancelFollowUser = createAction(CANCEL_FOLLOW_USER);

export default handleActions({
	[LOAD_MATCH]: (state, action) => {
		const page = action.payload.page;
		let list = [];
		// page start as 2
		let hasNext = page && page.current_page < (page.page_count + 1);

		// tansform date and city here
		action.payload.list.map((m) => {
			m.event_at = date.parseDate(m.event_at);
			m.distance = city.parseDistance(m.distance, m.city_name);
		});

		if(page && (page.current_page === 1 || page.current_page === 2)){
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
				...state.filter,
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
	},
	[SET_FILTER]: (state, action) => {
		const { data } = action;
		let filter = {
			...state.filter,
			current: data
		}
		return {
			...state,
			filter: filter
		}
	},
	[LOAD_INDUSTRY]: (state, action) => {
		const { list } = action.payload;
		return {
			...state,
			industry: list
		}
	},
	[LOAD_BUSINESS_INFO]: (state, action) => {
		const { data } = action.payload;
		return {
			...state,
			business: data
		}
	},
	[LOAD_TAG_LIST]: (state, action) => {
		let { data } = action.payload;

		return {
			...state,
			tags: data
		}
	},
	[SELECT_TAG]: (state, action) => {
		let { id, type } = action.payload;
		let { display_list } = state.tags;
		let { advantage, needs } = display_list;

		if(type == 'advantage'){
			advantage = advantage.map((a) => {
				if(a.id === id){
					a.selected =  a.selected == 1 ? 0 : 1;
				}

				return a;
			});
		}else {
			needs = needs.map((n) => {
				if(n.id === id){
					n.selected =  n.selected == 1 ? 0 : 1;
				}

				return n;
			});
		}

		return{
			...state,
			tags: {
				...state.tags,
				display_list: {
					advantage: advantage,
					needs: needs
				}
			}
		}

	}
}, INITIAL_STATE);
