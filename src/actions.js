import api from './utils/api.js';

export async function macthView(){
	const {data} =  await api.matchView()
	return {
		type: 'MACTH_VIEW',
		data: data
	}
}