import {combineReducers} from 'redux';
import createReducer from 'redux-create-reducer-curry'

const initState = {
	macthView: {}
}

const macthView = createReducer(initState.macthView)({
	MACTH_VIEW: (state, action) => ({
		...state,
		data: action.data
	})
})

export default combineReducers({
	macthView
})