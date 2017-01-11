import wx, { Component, PropTypes } from 'labrador-immutable';
import { connect } from 'labrador-redux';

class Index extends Component {
	onReady() {
		wx.setNavigationBarTitle({title: "消息"})
	}
}

export default connect(
)(Index);