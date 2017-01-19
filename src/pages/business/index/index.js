import wx, { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import * as momentActions from '../../../redux/moment';

class Index extends Component {
	state = {
		page: 1,
		refreshing: false,
		pageCount: -1
	}

	onShareAppMessage() {
		return {
			title: '邀请您加入小邀约',
			desc: '做推广，找合作，就用商务邀约 ',
			path: '/pages/business/index/index'
		}
	}

	async onLoad() {
		// get list first
		const self = this;
		wx.showToast({
			title: '加载中',
			icon: 'loading'
		})

		const { page } = this.state;
		this.props.getList({
			page: page
		});

		wx.hideToast();
	}

	async onPullDownRefresh() {
		if(this.state.refreshing) return false;
		this.setState({
			refreshing: true
		});

		this.props.doRefresh({
			page: 1
		});

		this.setState({
			refreshing: false,
			page: 1
		});

		wx.stopPullDownRefresh();
	}

	async onReachBottom() {
		// if has next page
		if(!this.props.moment.hasNext){
			return false;
		}

		wx.showToast({
			title: '加载中',
			icon: 'loading'
		})

		let { page } = this.state;

		page = page + 1;

		this.props.getList({
			page: page
		});

		this.setState({
			page: page
		});

		wx.hideToast();
	}

	handleViewImage(e) {
		let data = e.currentTarget.dataset;
		let src = data.src;
		let pid = data.pid;
		let urls = [];
		const list = this.props.moment.list || [];

		list.map((item, i) => {
			if(pid === item.id){
				urls = item.pictures.map((p) => {
					return p;
				});
			}
		});

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
			uid: uid
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
					}
				}
			})
		}
	}
}

export default connect(
	({ moment, user }) => ({ moment, user }),
	(dispatch) => bindActionCreators({
		doRefresh: momentActions.refresh,
		getList: momentActions.list,
		deleteMoment: momentActions.del,
		shieldMoment: momentActions.shieldMoment,
		doLikeMoment: momentActions.doLikeMoment
	}, dispatch)
)(Index);