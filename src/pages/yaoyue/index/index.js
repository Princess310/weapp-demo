import wx, { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import * as matchActions from '../../../redux/match';

class Index extends Component {
	state = {
		pageStart: 2,
		page: 2,
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

		wx.getLocation({
			complete: (res) => {
				let latitude = res.latitude;
				let longitude = res.longitude;

				if(latitude && longitude){
					self.props.getLocation({
						lng: longitude,
						lat: latitude
					});
				}else {
					wx.showModal({
						content: '定位失败，可选择城市改变筛选',
						showCancel: false
					});
				}
			}
		})

		this.props.getList({
			page: page,
			city_id: self.props.match.city.current.id
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
			city_id: this.props.match.city.current.id
		});

		this.setState({
			refreshing: false,
			page: this.state.pageStart
		});

		wx.stopPullDownRefresh();
	}

	handleCall(e) {
		const { tel } = e.currentTarget.dataset;

		wx.makePhoneCall({
			phoneNumber: tel
		});
	}
}

export default connect(
	({ match, user }) => ({ match, user }),
	(dispatch) => bindActionCreators({
		getList: matchActions.list,
		getLocation: matchActions.fetchLoaction
	}, dispatch)
)(Index);