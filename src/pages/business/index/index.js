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
		if(this.data.refreshing) return false;
		this.setData({
			refreshing: true
		});

		this.props.getList({
			page: 1
		});

		this.setData({
			refreshing: false,
			page: page
		});
	}

	nextpage() {
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
}

export default connect(
	({ moment }) => ({ moment }),
	(dispatch) => bindActionCreators({
		getList: momentActions.list,
	}, dispatch)
)(Index);