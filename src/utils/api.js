const baseUrl = "https://api.alijian.net/index.php?r="
const token = "55153687b70ff363249b2653b14f8608"

const apiMethod = {
	matchView: 'match/view',
	gatMatchList: 'match/index',
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
			reject(err)
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

// --------- User Api --------- //
const getUserInfo = () => request(apiMethod.getUserInfo)
// --------- /User Api --------- //


// --------- exports --------- //
module.exports = {
	matchView,
	getUserInfo,
	gatMatchList
}
// --------- /exports --------- //