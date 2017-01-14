import wx, { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import * as matchActions from '../../../redux/match';

class Index extends Component {
	state = {
		pageStart: 2,
		page: 2,
		refreshing: false,
		pageCount: -1,
		city_id: 5101
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
			page: page,
			city_id: this.state.city_id
		});

		wx.hideToast();
	}

	async onPullDownRefresh() {
		if(this.state.refreshing) return false;
		this.setState({
			refreshing: true
		});

		this.props.getList({
			page: this.state.pageStart,
			city_id: this.state.city_id
		});

		this.setState({
			refreshing: false,
			page: this.state.pageStart
		});

		wx.stopPullDownRefresh();
	}
}

export default connect(
	({ match, user }) => ({ match, user }),
	(dispatch) => bindActionCreators({
		getList: matchActions.list
	}, dispatch)
)(Index);