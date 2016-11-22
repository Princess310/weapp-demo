import {combineReducers} from 'redux';
import createReducer from 'redux-create-reducer-curry'

// --------- IinitState --------- //
const initState = {
	user: {},
	moment: {
		detail: {},
		moments: [],
		plaza: [],
	},
	match: {
		detail: {},
		list: []
	}
}
// --------- /IinitState --------- //


// --------- Match Reducers --------- //
const match = createReducer(initState.match)({
	MATCH_VIEW: (state, action) => ({
		...state,
		data: action.data
	}),
	MATCH_LIST: (state, action) => {
		let list = [];
		if(action.page.current_page === 1){
			list = action.list;
		}else {
			list = state.list.concat(action.list);
		}

		return {
			...state,
			list: list
		}
	}
})
// --------- /Match Reducers --------- //

// --------- Moments Reducers --------- //
const moment = createReducer(initState.moment)({
	MOMENTS_LIST: (state, action) => {
		let list = [];
		if(action.page.current_page === 1){
			list = action.list;
		}else {
			list = state.moments.concat(action.list);
		}

		return {
			...state,
			moments: list
		}
	},
	PLAZA_LIST: (state, action) => {
		let list = [];
		if(action.page.current_page === 1){
			list = action.list;
		}else {
			list = state.plaza.concat(action.list);
		}

		return {
			...state,
			plaza: list
		}
	}
})
// --------- /Moments Reducers --------- //


// --------- User Reducers --------- //
const user = createReducer(initState.user)({
	USER_INFO: (state, action) => (action.data)
})
// --------- /User Reducers --------- //

export default combineReducers({
	user,
	moment,
	match
})