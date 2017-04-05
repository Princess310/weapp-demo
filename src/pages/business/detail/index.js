import wx, { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import * as momentActions from '../../../redux/moment';
import * as matchActions from '../../../redux/match';
import { matchPhone } from '../../../utils/utils';

class Index extends Component {
	state = {
		id: '',
		activeIndex: 0,
		sliderLeft: 20,
		sliderOffset: 0,
		showChat: false,
		comment: {
			cid: '',
			content: ''
		},
		showShareGuide: false,
	}

	onShareAppMessage() {
		const { id, nickname, content } = this.props.moment.detail;
		const { company, position, nickname: uNickname } = this.props.user;
		const self = this;
		const matchResult = matchPhone(content);

		let shareTitle = '分享' + nickname + '的健康汇销动态';
		let shareCntent = '会销行业自己的APP：' + 
							(company !== '' ? company + '.' : '') +
							(position !== '' ? position + '.' : '') +
							uNickname + '在分享动态，邀请您也来分享！';


		console.log(matchResult);
		if(content !== '') {
			shareTitle = matchResult.replaceContent.substring(0, 60);
		}

		return {
			title: shareTitle,
			desc: shareCntent,
			path: '/pages/business/detail/index?id=' + id,
			success: function() {
				self.props.shareMoment({ id: id });
				self.setState({
					showShareGuide: false
				});
			}
		}
	}

	async onLoad(options) {
		const { id } = options;

		this.setState({
			id: id
		});

		this.props.getInfo({
			id: id
		});
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

	handleInputValue(e) {
		const { cid } = this.state.comment;
		let value = e.detail.value;

		this.setState({
			comment: {
				cid: cid,
				content: value
			}
		});
	}

	handleShowChat(){
		this.setState({
			showChat: true
		});
	}

	handleBlur(){
		this.setState({
			showChat: false
		});
	}

	handleFocusComment(e){
		const self = this;
		const { id } = e.currentTarget.dataset;

		wx.showActionSheet({
			itemList: ['回复'],
			complete: function(res) {
				if(res && res.tapIndex == 0){
					self.setState({
						showChat: true,
						comment: {
							cid: id,
							content: ''
						}
					});
				}
			}
		})
	}

	handleSendComment(e){
		const { cid, content } = this.state.comment;
		const { id, uid } = this.props.moment.detail;

		if(content === ''){
			return false;
		}

		let props = {
			moments_id: id,
			content: content,
			to_uid: uid
		}


		if(cid !== ''){
			props.pid = cid;
		}

		this.props.sendComment(props);

		this.setState({
			showChat: false,
			comment: {
				cid: '',
				content: '',
				focus: false
			}
		});
	}

	handleFollow(e){
		const { action, id } = e.currentTarget.dataset;
		const { id: mid } = this.props.moment.detail;

		if(action === 'follow'){
			this.props.followUser({
				fid: id,
				type: 'moment',
				mid: mid,
			});
		}else {
			this.props.cancelFollowUser({
				fid: id,
				type: 'moment',
				mid: mid,
			});
		}
	}

	handleShare(e) {
		this.setState({
			showShareGuide: true
		});
	}

	handleHideShare(e) {
		this.setState({
			showShareGuide: false
		});
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
		doJoinReward: momentActions.doJoinReward,
		sendComment: momentActions.sendComment,
		shareMoment: momentActions.shareMoment,
		followUser: matchActions.followUser,
		cancelFollowUser: matchActions.cancelFollowUser,
	}, dispatch)
)(Index);