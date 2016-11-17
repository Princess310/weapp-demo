import wx from 'labrador';
import {macthView, getUserInfo} from '../../actions';

class Index extends wx.Component {
	app = getApp()

	onReady() {
		wx.app.dispatch(macthView())
		wx.app.dispatch(getUserInfo())
	}
}

export default wx.app.connect(
	state => ({
		list: state.match.detail
	})
)(Index)