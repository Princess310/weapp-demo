var baseUrl = "https://api.alijian.net/index.php?r="

var apiMethod = {
	matchView: 'match/view'
}

var request = (path, data) => new Promise((resolve, reject) => {
	wx.request({
		url: baseUrl + path,
		data: data,
		success: (res) => {
			resolve(res.data);
		},
		fail: err => {
			reject(err)
		}
	})
})

var matchView = (keyword) => request(apiMethod.matchView, {
	id: 8
})

module.exports = {
	matchView
}