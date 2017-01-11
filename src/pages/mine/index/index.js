import wx, { Component, PropTypes } from 'labrador-immutable';
import { connect } from 'labrador-redux';

class Index extends Component {
	onReady() {
		wx.setNavigationBarTitle({title: "个人中心"});
	}
}

export default connect(
	({ user }) => ({ user })
)(Index);