import wx from 'labrador';
import { getUserInfo } from '../../../actions';

class Index extends wx.Component {
	onReady() {
		wx.setNavigationBarTitle({title: "消息"})
	}

	async onLoad(option) {
		// try to get user state info first
		await wx.app.dispatch(getUserInfo())
	}
}

export default wx.app.connect(
	state => ({
		data: {}
	})
)(Index)