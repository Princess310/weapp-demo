import {combineReducers} from 'redux';
import createReducer from 'redux-create-reducer-curry'

// --------- IinitState --------- //
const initState = {
	user: {},
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

export default combineReducers({
	match
})