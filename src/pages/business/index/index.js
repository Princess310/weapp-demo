import wx, { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import * as momentActions from '../../../redux/moment';

class Index extends Component {
	state = {
		page: 1,
		role: 0,
		refreshing: false,
		pageCount: -1,
		sliderLeft: 26,
		sliderOffset: 0,
	}

	onShareAppMessage() {
		const { nickname } = this.props.user;

		let shareTitle = nickname + '邀请您加入健康汇销APP';
		let shareContent = '80万行业资源平台，找讲师，找厂家，找经销商就上健康汇销！';

		return {
			title: shareTitle,
			desc: shareContent,
			path: '/pages/business/index/index'
		}
	}

	async onLoad() {
		// get roles first
		this.props.getRoles();
	}

	tabClick(e) {
		const id = e.currentTarget.id;
		this.setState({
			sliderOffset: e.currentTarget.offsetLeft,
			activeIndex: id
		});

		this.props.loadCurrentRole({
			role: id
		});

		this.props.getList({
			page: 1,
			role: id,
		});

		this.setState({
			page: 1,
			role: id,
		});
	}

	async onPullDownRefresh() {
		if(this.state.refreshing) return false;
		const { currentRole } = this.props.moment;

		this.setState({
			refreshing: true
		});

		this.props.doRefresh({
			page: 1,
			role: currentRole,
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

		let { page } = this.state;
		const { currentRole } = this.props.moment;

		page = page + 1;

		this.props.getList({
			page: page,
			role: currentRole,
		});

		this.setState({
			page: page
		});
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
		getRoles: momentActions.fetchRoles,
		loadCurrentRole: momentActions.loadCurrentRole,
		getList: momentActions.list,
		deleteMoment: momentActions.del,
		shieldMoment: momentActions.shieldMoment,
		doLikeMoment: momentActions.doLikeMoment
	}, dispatch)
)(Index);
