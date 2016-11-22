import api from './utils/api.js';

// --------- Match Actions --------- //
export async function macthView(){
	const {data} =  await api.matchView();
	return {
		type: 'MATCH_VIEW',
		data: data
	}
}

export async function getMacthList(cityId, tagId, keyword, pageCount){
	const {list, page} =  await api.gatMatchList(cityId, tagId, keyword, pageCount);
	return {
		type: 'MATCH_LIST',
		list: list,
		page: page
	}
}
// --------- /Match Actions --------- //

// --------- Moments Actions --------- //
export async function getMomentsList(pageCount){
	const {list, page} =  await api.getMomentsList(pageCount);
	return {
		type: 'MOMENTS_LIST',
		list: list,
		page: page
	}
}

export async function getPlazaList(pageCount){
	const {list, page} =  await api.getPlazaList(pageCount);
	return {
		type: 'PLAZA_LIST',
		list: list,
		page: page
	}
}
// --------- /Moments Actions --------- //

// --------- User Actions --------- //
export async function getUserInfo(){
	const {data} =  await api.getUserInfo();
	return {
		type: 'USER_INFO',
		data: data
	}
}
// --------- /User Actions --------- //