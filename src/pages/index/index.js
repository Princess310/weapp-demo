import wx from 'labrador';
import {macthView} from '../../actions';

class Index extends wx.Component {
	app = getApp()

	onReady() {
		wx.app.dispatch(macthView())
	}
}

export default wx.app.connect(
	state => ({
		data: state.macthView.data
	})
)(Index)