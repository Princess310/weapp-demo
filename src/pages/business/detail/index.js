import wx, { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import * as momentActions from '../../../redux/moment';

class Index extends Component {
	state = {
		id: '',
		activeIndex: 0,
		sliderLeft: 20,
		sliderOffset: 0
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

		this.props.getInfo({
			id: id
		});

		wx.hideToast();
	}

	handleViewImage(e) {
		let data = e.currentTarget.dataset;
		let src = data.src;
		let urls = this.props.moment.detail.pictures;

		wx.previewImage({
			current: src,
			urls: urls
		});
	}

	handleCall(e) {
		const { tel } = e.currentTarget.dataset;

		wx.makePhoneCall({
			phoneNumber: tel
		});
	}

	handleAgree(e) {
		const { id, uid } = e.currentTarget.dataset;

		this.props.doLikeMoment({
			id: id,
			uid: 8
		});
	}

	handleAgreeComment(e) {
		const { id, uid } = e.currentTarget.dataset;

		this.props.doLikeComment({
			id: id,
			cid: this.state.id,
			uid: 8
		});
	}

	tabClick(e) {
		console.log('e.currentTarget.offsetLeft', e.currentTarget.offsetLeft,);
		this.setState({
			sliderOffset: e.currentTarget.offsetLeft,
			activeIndex: e.currentTarget.id
		});
	}

	handleJoin(e) {
		const { id } = e.currentTarget.dataset;

		this.props.doJoinReward({
			id: id
		});
	}

	handleTodo(e){
		const self = this;
		const { id, uid } = e.currentTarget.dataset;

		if(this.props.user.id == uid){
			wx.showActionSheet({
				itemList: ['删除'],
				complete: function(res) {
					if(res && res.tapIndex == 0){
						self.props.deleteMoment({
							id: id
						});

						wx.navigateBack({
							delta: 1
						});
					}
				}
			})
		}else {
			wx.showActionSheet({
				itemList: ['屏蔽'],
				complete: function(res) {
					if(res && res.tapIndex == 0){
						self.props.shieldMoment({
							uid: uid
						});

						wx.navigateBack({
							delta: 1
						});
					}
				}
			})
		}
	}
}

export default connect(
	({ moment, user }) => ({ moment, user }),
	(dispatch) => bindActionCreators({
		getInfo: momentActions.fetchDetail,
		doLikeMoment: momentActions.doLikeMoment,
		doLikeComment: momentActions.doLikeComment,
		deleteMoment: momentActions.del,
		shieldMoment: momentActions.shieldMoment,
		doJoinReward: momentActions.doJoinReward
	}, dispatch)
)(Index);