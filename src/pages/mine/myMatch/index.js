import wx, { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import { SET_FILTER } from '../../../redux/match';
import * as redux from 'labrador-redux';
import * as matchActions from '../../../redux/match';

class Index extends Component {
	state = {
		pageStart: 1,
		page: 1,
		refreshing: false,
		pageCount: -1,
	}

	async onLoad() {
		// get list first
		const self = this;

		const { page } = this.state;

		this.props.getList({
			page: page
		});

		// reward filter
		this.props.getFilters();
	}

	async onPullDownRefresh() {
		if(this.state.refreshing) return false;
		this.setState({
			refreshing: true
		});

		this.props.getList({
			page: this.state.pageStart
		});

		this.setState({
			refreshing: false,
			page: this.state.pageStart
		});

		wx.stopPullDownRefresh();
	}

	async onReachBottom() {
		// if has next page
		if(!this.props.match.hasMyMatchNext){
			return false;
		}

		let { page } = this.state;

		page = page + 1;

		await this.props.getList({
			page: page,
		});

		this.setState({
			page: page
		});
	}
}

export default connect(
	({ match, user }) => ({ match, user }),
	(dispatch) => bindActionCreators({
		getList: matchActions.fetchMyMatch,
	}, dispatch)
)(Index);
