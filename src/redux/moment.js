import { createAction, handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';
import date from '../utils/date';
import { getImgSuitablePath, matchPhone } from '../utils/utils';

export const REFRESH_MOMENTS = 'REFRESH_MOMENTS';
export const LOAD_MOMENTS = 'LOAD_MOMENTS';
export const FETCH_MOMENTS = 'FETCH_MOMENTS';

export const FETCH_MOMENTS_ROLES = 'FETCH_MOMENTS_ROLES';
export const LOAD_MOMENTS_ROLES = 'LOAD_MOMENTS_ROLES';
export const LOAD_CURRENT_ROLE = 'LOAD_CURRENT_ROLE';

export const DELETE_MOMENT = 'DELETE_MOMENT';
export const ADD_MOMENT = 'ADD_MOMENT';

export const SHIELD_MOMENT = 'SHIELD_MOMENT';

export const FETCH_MOMENT_DETAIL = 'FETCH_MOMENT_DETAIL';
export const LOAD_MOMENT_DETAIL = 'LOAD_MOMENT_DETAIL';

export const DO_LIKE_MOMENT = 'DO_LIKE_MOMENT';
export const LOAD_LIKE_MOMENT = 'LOAD_LIKE_MOMENT';

export const DO_SHARE_MOMENT = 'DO_SHARE_MOMENT';

export const DO_LIKE_COMMENT = 'DO_LIKE_COMMENT';
export const LOAD_LIKE_COMMENT= 'LOAD_LIKE_COMMENT';

export const DO_SEND_COMMENT = 'DO_SEND_COMMENT';

export const DO_JOIN_REWARD = 'DO_JOIN_REWARD';
export const LOAD_JOIN_REWARD= 'LOAD_JOIN_REWARD';

export const FETCH_REWARD = 'FETCH_REWARD';
export const LOAD_REWARD = 'LOAD_REWARD';

export const FETCH_MY_MOMENTS = 'FETCH_MY_MOMENTS';
export const LOAD_MY_MOMENTS = 'LOAD_MY_MOMENTS';

export const FETCH_SEARCH_MOMENTS = 'FETCH_SEARCH_MOMENTS';
export const LOAD_SEARCH_MOMENTS = 'LOAD_SEARCH_MOMENTS';
export const CLEAR_SEARCH_MOMENTS = 'CLEAR_SEARCH_MOMENTS';

// 初始state
export const INITIAL_STATE = immutable({
	detail: {},
	page: {},
	list: [],
	rewardList: [],
	roles: [],
	currentRole: 0,
	myList: [],
	searchList: [],
});

export const refresh = createAction(REFRESH_MOMENTS);
export const list = createAction(FETCH_MOMENTS);
export const load = createAction(LOAD_MOMENTS, (list) => (list));
export const del = createAction(DELETE_MOMENT);
export const add = createAction(ADD_MOMENT, (moment) => (moment));

export const fetchRoles = createAction(FETCH_MOMENTS_ROLES);
export const loadRoles=  createAction(LOAD_MOMENTS_ROLES, (list) => (list));
export const loadCurrentRole=  createAction(LOAD_CURRENT_ROLE, (role) => (role));

export const shieldMoment = createAction(SHIELD_MOMENT);
export const shareMoment = createAction(DO_SHARE_MOMENT);

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

export const fetchMyMoments = createAction(FETCH_MY_MOMENTS);
export const loadMyMoments = createAction(LOAD_MY_MOMENTS, (list) => (list));

export const fetchSearchMoments = createAction(FETCH_SEARCH_MOMENTS);
export const loadSearchMoments = createAction(LOAD_SEARCH_MOMENTS, (list) => (list));
export const clearSearchMoments = createAction(CLEAR_SEARCH_MOMENTS);

export default handleActions({
	[FETCH_MOMENTS]: (state, action) => {
		return state;
	},
	[LOAD_MOMENTS_ROLES]: (state, action) => {
		const { list } = action.payload;

		return {
			...state,
			roles: list,
		}
	},
	[LOAD_CURRENT_ROLE]: (state, action) => {
		const { role } = action.payload;

		return {
			...state,
			currentRole: role,
		}
	},
	[LOAD_MOMENTS]: (state, action) => {
		const page = action.payload.page;
		let list = [];
		let hasNext = page && page.current_page < page.page_count;

		// tansform date here
		action.payload.list.map((m) => {
			m.created_at = date.parseDate(m.created_at);

			if(m.pictures.length > 0){
				m.pictures = m.pictures.map((p) => {
					return getImgSuitablePath(p);
				});
			}

			const matchResult = matchPhone(m.content);
			if(matchResult.hasPhone){
				m.content = matchResult.content;
				m.phone = matchResult.phone;
				m.nodes = matchResult.nodes;
			}
		});

		if((page && page.current_page === 1) || !page){
			list = action.payload.list;
		}else {
			list = state.list.concat(action.payload.list);
		}

		return {
			...state,
			hasNext: hasNext,
			list: list
		};
	},
	[LOAD_MOMENT_DETAIL]: (state, action) => {
		const { data } = action.payload;

		// date format
		data.created_at = date.parseDate(data.created_at);

		if(data.pictures.length > 0){
			data.pictures = data.pictures.map((p) => {
				return getImgSuitablePath(p);
			});
		}

		const matchResult = matchPhone(data.content);
		if(matchResult.hasPhone){
			data.content = matchResult.content;
			data.phone = matchResult.phone;
			data.nodes = matchResult.nodes;
		}

		if(data.comments.length > 0) {
			data.comments = data.comments.map((c) => {
				const mc = matchPhone(c.content);
				c.nodes = mc.nodes;
				return c;
			});
		}

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
	},
	[LOAD_MY_MOMENTS]: (state, action) => {
		const page = action.payload.page;
		let list = [];
		let hasNext = page && page.current_page < page.page_count;

		// tansform date here
		action.payload.list.map((m) => {
			m.created_at = date.parseDate(m.created_at);

			if(m.pictures.length > 0){
				m.pictures = m.pictures.map((p) => {
					return getImgSuitablePath(p);
				});
			}

			const matchResult = matchPhone(m.content);
			if(matchResult.hasPhone){
				m.content = matchResult.content;
				m.phone = matchResult.phone;
				m.nodes = matchResult.nodes;
			}
		});

		if((page && page.current_page === 1) || !page){
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
	[LOAD_SEARCH_MOMENTS]: (state, action) => {
		const page = action.payload.page;
		let list = [];
		let hasNext = page && page.current_page < page.page_count;

		// tansform date here
		action.payload.list.map((m) => {
			m.created_at = date.parseDate(m.created_at);

			if(m.pictures.length > 0){
				m.pictures = m.pictures.map((p) => {
					return getImgSuitablePath(p);
				});
			}

			const matchResult = matchPhone(m.content);
			if(matchResult.hasPhone){
				m.content = matchResult.content;
				m.phone = matchResult.phone;
				m.nodes = matchResult.nodes;
			}
		});

		if((page && page.current_page === 1) || !page){
			list = action.payload.list;
		}else {
			list = state.searchList.concat(action.payload.list);
		}

		return {
			...state,
			hasSearchNext: hasNext,
			searchList: list
		};
	},
	[CLEAR_SEARCH_MOMENTS]: (state, action) => {
		return {
			...state,
			hasSearchNext: false,
			searchList: []
		};
	}
}, INITIAL_STATE);
