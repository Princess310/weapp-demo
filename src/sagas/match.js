import * as moment from '../redux/moment';
import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { FETCH_MATCH, FETCH_DETAIL, FETCH_MY_LIST,
		 FETCH_CITY, FETCH_FILTERS, FETCH_LOCATION,
		 FETCH_INDUSTRY, FETCH_BUSINESS_INFO, FETCH_TAG_LIST,
		 ADD_TAG, DELETE_TAG, SAVE_TAGS,
		 FOLLOW_USER, CANCEL_FOLLOW_USER, FETCH_MY_MATCH,
	   FETCH_SEARCH_MATCH } from '../redux/match';
import { REFRESH } from '../redux/user';
import { request } from '../utils/request';
import { load, loadDetail, loadMyList, loadCity,
		 loadFilters, loadLoaction, loadIndustry,
		 loadBusinessInfo, loadTags, saveTags,
	   loadMyMatch, loadSearchMatch } from '../redux/match';

// --------- Invite Interface --------- //
function* fetchIvites(action){
	try {
		let { list, page: resPage } = yield request(true).get("match/index", action.payload);

		yield put(load({
			page: resPage,
			list: list
		}));
	} catch (error) {
		console.log('login error', error);
	}
}

function* fetchDetail(action){
	try {
		let { data } = yield request(true).get("match/view", action.payload);

		yield put(loadDetail({
			data: data
		}));
	} catch (error) {
		console.log('login error', error);
	}
}

function* fetchMyList(action){
	try {
		let { list, page: resPage } = yield request(true).get("moments/my-moments", action.payload);

		yield put(loadMyList({
			page: resPage,
			list: list
		}));
	} catch (error) {
		console.log('login error', error);
	}
}

function* fetchFilters(){
	try {
		let { items, roles } = yield request(true).get("match/filters");

		yield put(loadFilters({
			items: items,
			roles: roles
		}));
	} catch (error) {
		console.log('login error', error);
	}
}

function* followUser(action){
	try {
		yield request(true).post("follow/add-follow", action.payload);

		yield put({type: FETCH_DETAIL, payload: {
			id: action.payload.fid
		}});
	} catch (error) {
		console.log('login error', error);
	}
}

function* cancelFollowUser(action){
	try {
		yield request(true).put("follow/cancel-follow", action.payload);

		yield put({type: FETCH_DETAIL, payload: {
			id: action.payload.fid
		}});
	} catch (error) {
		console.log('login error', error);
	}
}

function* fetchMyMatch(action){
	try {
		let { list, page: resPage } = yield request(true).get("moments/my-reward", action.payload);

		yield put(loadMyMatch({
			page: resPage,
			list: list
		}));
	} catch (error) {
		console.log('login error', error);
	}
}

function* fetchSearchMatch(action) {
	try {
		let { list, page: resPage } = yield request(true).get("follow/search-friend", {
			...action.payload,
			type: 0,
		});

		yield put(loadSearchMatch({
			page: resPage,
			list: list
		}));
	} catch (error) {
		console.log('login error', error);
	}
}
// --------- Invite Interface --------- //

// --------- City Interface --------- //
function* fetchCityList(){
	try {
		let { data } = yield request(true).get("area");

		yield put(loadCity({
			data: data
		}));
	} catch (error) {
		console.log('login error', error);
	}
}

function* fetchLocation(action){
	let { lng, lat } = action.payload;
	try {
		let { data } = yield request(true).get("area/location", {
			location: lng + ',' + lat
		});

		yield put(loadLoaction({
			data: data
		}));
	} catch (error) {
		console.log('login error', error);
	}
}
// --------- /City Interface --------- //

// --------- Industry Interface --------- //
function* fetchIndustry(action){
	try {
		let { list } = yield request(true).get("industry/industry-lists");

		yield put(loadIndustry({
			list: list
		}));
	} catch (error) {
		console.log('login error', error);
	}
}
// --------- /Industry Interface --------- //

// --------- Business Interface --------- //
function* fetchBusinessInfo(action){
	try {
		let { data } = yield request(true).get("user/business-info");

		yield put(loadBusinessInfo({
			data: data
		}));
	} catch (error) {
		console.log('login error', error);
	}
}

function* fetchTags(action){
	try {
		let { data } = yield request(true).get("tag/business-tag-list");

		yield put(loadTags({
			data: data
		}));
	} catch (error) {
		console.log('login error', error);
	}
}

function* addTag(action){
	try {
		yield request(true).post("tag/add-tag", action.payload);

		yield put({type: FETCH_TAG_LIST, payload: {}});
	} catch (error) {
		console.log('login error', error);
	}
}

function* delTag(action){
	try {
		yield request(true).delete("tag/delete-tags", action.payload);

		yield put({type: FETCH_TAG_LIST, payload: {}});
	} catch (error) {
		console.log('login error', error);
	}
}

function* saveTagInfo(action){
	try {
		yield request(true).put("tag/business-edit-tags", action.payload);

		yield put({type: FETCH_TAG_LIST, payload: {}});
		yield put({type: FETCH_BUSINESS_INFO, payload: {}});
		yield put({type: REFRESH, payload: {}});
	} catch (error) {
		console.log('login error', error);
	}
}
// --------- /Business Interface --------- //

function* matchSaga() {
	yield [
		takeLatest(FETCH_MATCH, fetchIvites),
		takeLatest(FETCH_DETAIL, fetchDetail),
		takeLatest(FETCH_MY_LIST, fetchMyList),
		takeLatest(FETCH_CITY, fetchCityList),
		takeLatest(FETCH_LOCATION, fetchLocation),
		takeLatest(FETCH_FILTERS, fetchFilters),
		takeLatest(FETCH_INDUSTRY, fetchIndustry),
		takeLatest(FETCH_BUSINESS_INFO, fetchBusinessInfo),
		takeLatest(FETCH_TAG_LIST, fetchTags),
		takeLatest(ADD_TAG, addTag),
		takeLatest(DELETE_TAG, delTag),
		takeLatest(SAVE_TAGS, saveTagInfo),
		takeLatest(FOLLOW_USER, followUser),
		takeLatest(CANCEL_FOLLOW_USER, cancelFollowUser),
		takeLatest(FETCH_MY_MATCH, fetchMyMatch),
		takeLatest(FETCH_SEARCH_MATCH, fetchSearchMatch)
	];
}

export default matchSaga;
