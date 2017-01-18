import * as moment from '../redux/moment';
import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { FETCH_MATCH, FETCH_DETAIL, FETCH_MY_LIST, 
		 FETCH_CITY, FETCH_FILTERS, FETCH_LOCATION,
		 FETCH_INDUSTRY, FETCH_BUSINESS_INFO } from '../redux/match';
import { request } from '../utils/request';
import { load, loadDetail, loadMyList, loadCity, loadFilters, loadLoaction, loadIndustry, loadBusinessInfo } from '../redux/match';

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
		takeLatest(FETCH_BUSINESS_INFO, fetchBusinessInfo)
	];
}

export default matchSaga;