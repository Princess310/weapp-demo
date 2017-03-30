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

export function matchPhone(content) {
  const reg = /<a href\="tel:\d*"\>\d*\<\/a\>/i;
  const regPhone = /\d{11}/i;
  let hasPhone = false;
  let phone = '';

  const matchUrlArr = content.match(reg);
  if(matchUrlArr !== null && matchUrlArr.length > 0){
    const macthPhoneArr = matchUrlArr[0].match(regPhone);

    if(macthPhoneArr !== null && macthPhoneArr.length > 0){
      hasPhone = true;
      phone = macthPhoneArr[0];
      content = content.replace(matchUrlArr[0], macthPhoneArr[0]);
    }
  }

  return {
    hasPhone: hasPhone,
    content: content,
    phone: phone,
  }
}
