import wx, { Component, PropTypes } from 'labrador-immutable';
import { connect } from 'labrador-redux';
import { bindActionCreators } from 'redux';
import * as matchActions from '../../../redux/match';

class Index extends Component {
	onLoad() {
		this.props.getBusinessInfo();
	}

	onShareAppMessage() {
		const { id, nickname, company, position, intro } = this.props.user;
		return {
			title: '分享' + nickname + '的名片',
			desc: '公司：' + company + '，职位：' + position + '，个人简介：' + intro,
			path: '/pages/yaoyue/detail/index?id=' + id
		}
	}
}

export default connect(
	({ user }) => ({ user }),
	(dispatch) => bindActionCreators({
		getBusinessInfo: matchActions.fetchBusinessInfo
	}, dispatch)
)(Index);