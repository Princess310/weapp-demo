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
	}

	async onLoad() {
		// get list first
		const self = this;
		wx.showToast({
			title: '加载中',
			icon: 'loading'
		})

		this.props.getList({
			page: 1
		});

		wx.hideToast();
	}

	async onPullDownRefresh() {
		if(this.state.refreshing) return false;

		this.setState({
			refreshing: true
		});

		this.props.getList({
			page: 1,
		});

		this.setState({
			refreshing: false,
			page: 1
		});

		wx.stopPullDownRefresh();
	}

	async onReachBottom() {
		// if has next page
		if(!this.props.moment.hasMyNext){
			return false;
		}

		wx.showToast({
			title: '加载中',
			icon: 'loading'
		})

		let { page } = this.state;

		page = page + 1;

		this.props.getList({
			page: page,
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

	handleTodo(e){
		const self = this;
		const { id, uid } = e.currentTarget.dataset;

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
	}
}

export default connect(
	({ moment, user }) => ({ moment, user }),
	(dispatch) => bindActionCreators({
		getList: momentActions.fetchMyMoments,
		deleteMoment: momentActions.del,
	}, dispatch)
)(Index);
