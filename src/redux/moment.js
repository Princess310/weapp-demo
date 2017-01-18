import { createAction, handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';

export const REFRESH_MOMENTS = 'REFRESH_MOMENTS';
export const LOAD_MOMENTS = 'LOAD_MOMENTS';
export const FETCH_MOMENTS = 'FETCH_MOMENTS';

export const DELETE_MOMENT = 'DELETE_MOMENT';
export const ADD_MOMENT = 'ADD_MOMENT';

export const SHIELD_MOMENT = 'SHIELD_MOMENT';

export const FETCH_MOMENT_DETAIL = 'FETCH_MOMENT_DETAIL';
export const LOAD_MOMENT_DETAIL = 'LOAD_MOMENT_DETAIL';

export const DO_LIKE_MOMENT = 'DO_LIKE_MOMENT';
export const LOAD_LIKE_MOMENT = 'LOAD_LIKE_MOMENT';

export const DO_LIKE_COMMENT = 'DO_LIKE_COMMENT';
export const LOAD_LIKE_COMMENT= 'LOAD_LIKE_COMMENT';

export const DO_SEND_COMMENT = 'DO_SEND_COMMENT';

export const DO_JOIN_REWARD = 'DO_JOIN_REWARD';
export const LOAD_JOIN_REWARD= 'LOAD_JOIN_REWARD';

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
export const del = createAction(DELETE_MOMENT);
export const add = createAction(ADD_MOMENT, (moment) => (moment));

export const shieldMoment = createAction(SHIELD_MOMENT);

export const sendComment = createAction(DO_SEND_COMMENT);

export const fetchDetail = createAction(FETCH_MOMENT_DETAIL);
export const loadDetail = createAction(LOAD_MOMENT_DETAIL, (data) => (data));

export const doLikeMoment = createAction(DO_LIKE_MOMENT);
export const loadLikeMoment = createAction(LOAD_LIKE_MOMENT, (data) => (data));

export const doLikeComment = createAction(DO_LIKE_COMMENT);
export const loadLikeComment = createAction(LOAD_LIKE_COMMENT, (data) => (data));

export const doJoinReward = createAction(DO_JOIN_REWARD);
export const loadJoinReward = createAction(LOAD_JOIN_REWARD, (data) => (data));

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
	[LOAD_MOMENT_DETAIL]: (state, action) => {
		const { data } = action.payload;

		return {
			...state,
			detail: data
		};
	},
	[LOAD_REWARD]: (state, action) => {
		return {
			...state,
			rewardList: action.payload.list
		};
	}
}, INITIAL_STATE);
