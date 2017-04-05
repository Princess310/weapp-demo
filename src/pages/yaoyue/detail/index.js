import wx, { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import * as matchActions from '../../../redux/match';

class Index extends Component {
	state = {
		id: '',
		page: 1,
		swiper: {
			indicatorDots: true,
			color: '#50abf1',
			autoplay: false,
			interval: 5000,
			duration: 1000
		}
	}

	onShareAppMessage() {
		const { id, nickname } = this.props.match.detail;
		const { company, position, nickname: uNickname } = this.props.user;

		let shareTitle = nickname + '的健康汇销名片';
		let shareContent = '点击查看详情' + 
							(company !== '' ? company + '.' : '') +
							(position !== '' ? position + '.' : '') +
							uNickname + '邀请您加入80万行业资源平台，找讲师，找厂家，找经销商就上健康汇销！';

		return {
			title: shareTitle,
			desc: shareContent,
			path: '/pages/yaoyue/detail/index?id=' + id
		}
	}

	onUnload() {
		console.log('onUnload detail');
	}

	async onLoad(options) {
		const { id } = options;

		this.setState({
			id: id
		});

		await this.props.getInfo({
			id: id
		});

		await this.props.getMomentsList({
			uid: id,
			page: this.state.page
		});
	}

	async onReachBottom() {
		// if has next page
		if(!this.props.match.hasMyNext){
			return false;
		}

		let { id, page } = this.state;

		page = page + 1;
		console.log("page", page);

		await this.props.getMomentsList({
			uid: id,
			page: page
		});

		this.setState({
			page: page
		});
	}

	handleViewImage(e) {
		const { src } = e.currentTarget.dataset;

		wx.previewImage({
			current: src,
			urls: this.props.match.detail.pictures
		});
	}

	handlViewAvatar(e) {
		const { src } = e.currentTarget.dataset;

		wx.previewImage({
			current: src,
			urls: [src]
		});
	}

	handleFollow(e){
		const { action } = e.currentTarget.dataset;

		if(action === 'follow'){
			this.props.followUser({
				fid: this.props.match.detail.id
			});
		}else {
			this.props.cancelFollowUser({
				fid: this.props.match.detail.id
			});
		}
	}

	handleCall(e) {
		const { tel } = e.currentTarget.dataset;

		wx.makePhoneCall({
			phoneNumber: tel
		});
	}
}

export default connect(
	({ user, match }) => ({ user, match }),
	(dispatch) => bindActionCreators({
		getInfo: matchActions.fetchDetail,
		getMomentsList: matchActions.fetchMyList,
		followUser: matchActions.followUser,
		cancelFollowUser: matchActions.cancelFollowUser
	}, dispatch)
)(Index);
