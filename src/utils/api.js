const baseUrl = "https://api.alijian.net/index.php?r="
const token = "878cec809844f1a298e1898c48d7d69d"

const apiMethod = {
	matchView: 'match/view',
	gatMatchList: 'match/index',
	getMomentsList: 'moments/moments',
	getPlazaList: 'moments/plaza',
	getUserInfo: 'user/info'
}

const request = (path, data) => new Promise((resolve, reject) => {
	wx.request({
		url: baseUrl + path,
		data: data,
		header: {
			"X-Access-Token": token
		},
		success: (res) => {
			resolve(res.data);
		},
		fail: err => {
			reject(err);
		}
	})
})


// --------- Match Api --------- //
const matchView = (keyword) => request(apiMethod.matchView, {
	id: 8
})

const gatMatchList = (cityId, tagId, keyword, page) => request(apiMethod.gatMatchList, {
	city_id: 5101,
	tag_id: 0,
	keyword: "",
	page: page,
	"per-page": 10
})
// --------- /Match Api --------- //

// --------- Moments Api --------- //
const getMomentsList = (page) => request(apiMethod.getMomentsList, {
	page: page
})

const getPlazaList = (page) => request(apiMethod.getPlazaList, {
	page: page
})
// --------- /Moments Api --------- //

// --------- User Api --------- //
const getUserInfo = () => request(apiMethod.getUserInfo)
// --------- /User Api --------- //


// --------- exports --------- //
module.exports = {
	matchView,
	gatMatchList,
	getMomentsList,
	getPlazaList,
	getUserInfo
}
// --------- /exports --------- //