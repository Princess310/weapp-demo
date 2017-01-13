import wx from 'labrador';
import { create } from './request.base';

export function setSession(sessionId){
	wx.app.sessionId = sessionId;
}

// session -> true: should login
export function request(session){
	const rq = create({
		apiRoot: typeof API_ROOT === 'undefined' ? '' : API_ROOT,
		headerKey: 'X-Access-Token',
		session: session
	});

	return  rq;
}