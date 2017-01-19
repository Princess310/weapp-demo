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
		const { id, nickname, company, position, advantage, needs } = this.props.match.detail;
		return {
			title: '分享' + nickname + '的名片',
			desc: '公司：' + company + '，职位：' + position + '，优势：' + advantage.join(' | ') + '，需求：' + needs.join(' | '),
			path: '/pages/yaoyue/detail/index?id=' + id
		}
	}

	async onLoad(options) {
		const { id } = options;

		this.setState({
			id: id
		});

		// get reward list
		wx.showToast({
			title: '加载中',
			icon: 'loading'
		});

		await this.props.getInfo({
			id: id
		});

		await this.props.getMomentsList({
			uid: id,
			page: this.state.page
		});

		wx.hideToast();
	}

	async onReachBottom() {
		// if has next page
		if(!this.props.match.hasMyNext){
			return false;
		}

		wx.showToast({
			title: '加载中',
			icon: 'loading'
		})

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

		wx.hideToast();
	}

	handleViewImage(e) {
		const { src } = e.currentTarget.dataset;

		wx.previewImage({
			current: src,
			urls: this.props.match.detail.pictures
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