import wx from 'labrador';

class Index extends wx.Component {
	onReady() {
		wx.setNavigationBarTitle({title: "个人中心"})
	}

	async onLoad(option) {
	}
}

export default wx.app.connect(
	state => (
		state.user
	)
)(Index)