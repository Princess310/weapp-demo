import { createAction, handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';

export const REFRESH_MOMENTS = 'REFRESH_MOMENTS';
export const LOAD_MOMENTS = 'LOAD_MOMENTS';
export const FETCH_MOMENTS = 'FETCH_MOMENTS';
export const ADD_MOMENT = 'ADD_MOMENT';

export const FETCH_REWARD = 'FETCH_REWARD';
export const LOAD_REWARD = 'LOAD_REWARD';

// 初始state
export const INITIAL_STATE = immutable({
	detail: {},
	page: {},
	list: [],
	rewardList: []
});

export const refresh = createAction(REFRESH_MOMENTS);
export const list = createAction(FETCH_MOMENTS);
export const load = createAction(LOAD_MOMENTS, (list) => (list));
export const add = createAction(ADD_MOMENT, (moment) => (moment));

export const fetchReward = createAction(FETCH_REWARD);
export const loadReward = createAction(LOAD_REWARD, (list) => (list));

export default handleActions({
	[FETCH_MOMENTS]: (state, action) => {
		return state;
	},
	[LOAD_MOMENTS]: (state, action) => {
		const page = action.payload.page;
		let list = [];
		let hasNext = page && page.current_page < page.page_count;

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
	[LOAD_REWARD]: (state, action) => {
		return {
			...state,
			rewardList: action.payload.list
		};
	}
}, INITIAL_STATE);
