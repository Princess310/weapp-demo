import wx from 'labrador';

class Index extends wx.Component {
	onReady() {
		wx.setNavigationBarTitle({title: "个人中心"})
	}

	async onLoad(option) {
	}

	handlePreview() {
		wx.previewImage({
			current: this.data.avatar,
			urls: [this.data.avatar]
		})
	}
}

export default wx.app.connect(
	state => (
		state.user
	)
)(Index)