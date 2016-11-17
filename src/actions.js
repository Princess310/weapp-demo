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

// --------- User Actions --------- //
export async function getUserInfo(){
	const {data} =  await api.getUserInfo();
	return {
		type: 'USER_INFO',
		data: data
	}
}
// --------- /User Actions --------- //