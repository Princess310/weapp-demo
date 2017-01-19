import * as moment from '../redux/moment';
import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { STARTUP } from '../redux/startup';
import { LOAD_MOMENTS, FETCH_MOMENTS, REFRESH_MOMENTS, DELETE_MOMENT, ADD_MOMENT,
		 FETCH_MOMENT_DETAIL, FETCH_INVITES, DO_LIKE_MOMENT, DO_LIKE_COMMENT,
		 DO_JOIN_REWARD, FETCH_REWARD, LOAD_REWARD, SHIELD_MOMENT, DO_SEND_COMMENT } from '../redux/moment';
import { FETCH_MATCH } from '../redux/match';
import { request, setSession } from '../utils/request';
import { load, loadDetail, loadReward, loadLikeMoment, loadLikeComment, loadJoinReward } from '../redux/moment';
import * as userActions from '../redux/user';
import * as redux from 'labrador-redux';
import wx from 'labrador';

// --------- Moment Interface --------- //
function* fetchMoments(action) {
	const { page } = action.payload;

	try {
		const { id } = redux.getStore().getState().user;
		
		// do login first here for now
		if(!id){
			let res = yield wx.login();
			let data = yield wx.getUserInfo();
			let user = yield request(false).post('user/wx-small-login', {
				code: res.code,
				type: 'cbeb1b',
				...data
			});

			setSession(user.access_token);
			yield put(userActions.load(user.data));

			// if have not industry, should load the guide page
			if(user.data.industry_son_id <= 0){
				wx.navigateTo({
					url: '../../../pages/common/guide/index'
				});
			}
		}

		let { list, page: resPage } = yield request(true).get("moments/moments", {
			page: page
		});

		yield put(load({
			page: resPage,
			list: list
		}));
	} catch (error) {
		console.log('login error', error);
	}
}

function* addMoment(action){
	try {
		const { city, filter } = redux.getStore().getState().match;
		yield request(true).post("moments/release", action.payload);

		// after add moment, should refresh list for invites and moments
		yield put({type: FETCH_MOMENTS, payload: {
			page: 1
		}});
		yield put({type: FETCH_MATCH, payload: filter.current});
	} catch (error) {
		console.log('login error', error);
	}
}

function* delMoment(action){
	try {
		let { data } = yield request(true).delete("moments/delete", {
			moments_id: action.payload.id
		});

		// then refresh list
		yield put({type: FETCH_MOMENTS, payload: {
			page: 1
		}});
	} catch (error) {
		console.log('login error', error);
	}
}

function* shieldMoment(action){
	try {
		let { data } = yield request(true).post("privacy/set-moments", {
			type: 3,
			uid: action.payload.uid
		});

		// then refresh list
		yield put({type: FETCH_MOMENTS, payload: {
			page: 1
		}});
	} catch (error) {
		console.log('login error', error);
	}
}

function* fetchDetail(action){
	try {
		let { data } = yield request(true).get("moments/details", {
			moments_id: action.payload.id
		});

		yield put(loadDetail({
			data: data
		}));
	} catch (error) {
		console.log('login error', error);
	}
}

function* likeMoment(action){
	const { id, uid } = action.payload;
	try {
		yield request(true).post("moments/like", {
			moments_id: id,
			to_uid: uid
		});
		// then refresh detail
		yield put({type: FETCH_MOMENTS, payload: {
			page: 1
		}});
		yield put({type: FETCH_MOMENT_DETAIL, payload: {
			id: id
		}});
	} catch (error) {
		console.log('login error', error);
	}
}

function* likeComment(action){
	const { id, cid, uid } = action.payload;
	try {
		yield request(true).post("moments/comment-like", {
			comment_id: id,
			to_uid: uid
		});
		// then refresh detail
		yield put({type: FETCH_MOMENT_DETAIL, payload: {
			id: cid
		}});
	} catch (error) {
		console.log('login error', error);
	}
}

function* joinReward(action){
	const { id } = action.payload;

	try {
		yield request(true).post("moments/participate", {
			moments_id: id
		});
		
		// then refresh detail
		yield put({type: FETCH_MOMENT_DETAIL, payload: {
			id: id
		}});
	} catch (error) {
		console.log('login error', error);
	}
}

function* sendComment(action){
	try {
		yield request(true).post("moments/comment", action.payload);

		// then refresh detail and list
		yield put({type: FETCH_MOMENT_DETAIL, payload: {
			id: action.payload.moments_id
		}});

		// then refresh list
		yield put({type: FETCH_MOMENTS, payload: {
			page: 1
		}});
	} catch (error) {
		console.log('login error', error);
	}
}
// --------- /Moment Interface --------- //

// --------- Reward Interface --------- //
function* fetchReword(){
	try {
		let { list } = yield request(true).get("moments/reward-item");
		yield put(loadReward({
			list: list
		}));
	} catch (error) {
		console.log('login error', error);
	}
}
// --------- /Reward Interface --------- //

function* momentSaga() {
	yield [
		takeLatest(REFRESH_MOMENTS, fetchMoments),
		takeLatest(FETCH_MOMENTS, fetchMoments),
		takeLatest(FETCH_MOMENT_DETAIL, fetchDetail),
		takeLatest(FETCH_REWARD, fetchReword),
		takeLatest(ADD_MOMENT, addMoment),
		takeLatest(DELETE_MOMENT, delMoment),
		takeLatest(SHIELD_MOMENT, shieldMoment),
		takeLatest(DO_SEND_COMMENT, sendComment),
		takeLatest(DO_LIKE_MOMENT, likeMoment),
		takeLatest(DO_LIKE_COMMENT, likeComment),
		takeLatest(DO_JOIN_REWARD, joinReward)
	];
}

export default momentSaga;