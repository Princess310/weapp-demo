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

		let shareTitle = nickname + '的健康汇销名片';
		let shareContent = '点击查看详情：' +
							(company !== '' ? company + '.' : '') +
							(position !== '' ? position + '.' : '') +
							nickname + '邀请您加入80万行业资源平台，找讲师，找厂家，找经销商就上健康汇销！';

		return {
			title: shareTitle,
			desc: shareContent,
			path: '/pages/yaoyue/detail/index?id=' + id
		}
	}

	handlViewAvatar(e) {
		const { src } = e.currentTarget.dataset;

		wx.previewImage({
			current: src,
			urls: [src]
		});
	}
}

export default connect(
	({ user }) => ({ user }),
	(dispatch) => bindActionCreators({
		getBusinessInfo: matchActions.fetchBusinessInfo
	}, dispatch)
)(Index);