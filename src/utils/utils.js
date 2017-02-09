import wx from 'labrador';
import date from './date';

export function add(a, b) {
  return a + b;
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getFolderName(){
	let folder = 'sapp';

}

export async function uploadFile(filePath) {
	let res = await wx.uploadFile({
		url: (typeof API_ROOT === 'undefined' ? '' : API_ROOT) + 'moments/sapp-upload',
		filePath: filePath,
		name: 'file',
		header: {
			'X-Access-Token': wx.app.sessionId
		},
		formData: {
			time: date.getRoundTimeStr(),
			suffix: filePath.split('.')[1]
		}
	});
	return JSON.parse(res.data);
}

export function getImgSuitablePath(path) {
	if(path.indexOf('sapp') > 0){
		let arr1 = path.split("__");
		let size = arr1[arr1.length - 2];

		// 150kb for now
		let checkPicSize = 150 * 1024;
		let resizePercent = 100;

		size = Number(size);

		if(size > checkPicSize){
			resizePercent = Math.round(checkPicSize / size * 100);

			if(resizePercent === 0){
				resizePercent = 1;
			}
		}

		path = path + "@" + resizePercent + "p";
	}

	return path;
}