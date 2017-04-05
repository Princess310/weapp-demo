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
		tag_identity_id: 0,
		reward_as: 0,
		reward_item: '',
		filter: {},
		showFilter: false,
		keyword: '',
		inputShowed: false,
		inputVal: ""
	}

	onShareAppMessage() {
		let shareTitle = nickname + '邀请您加入健康汇销APP';
		let shareContent = '80万行业资源平台，找讲师，找厂家，找经销商就上健康汇销！';

		return {
			title: shareTitle,
			desc: shareContent,
			path: '/pages/business/index/index'
		}
	}

	async onLoad() {
		// get list first
		const self = this;

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
			tag_identity_id: self.state.tag_identity_id,
			reward_as: self.state.reward_as,
			reward_item: self.state.reward_item,
			city_id: self.props.match.city.current.id
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
			page: this.state.pageStart,
			tag_identity_id: this.state.tag_identity_id,
			reward_as: this.state.reward_as,
			reward_item: this.state.reward_item,
			city_id: this.props.match.city.current.id
		});

		this.setState({
			refreshing: false,
			page: this.state.pageStart
		});

		wx.stopPullDownRefresh();
	}

	async onReachBottom() {
		// if has next page
		if(!this.props.match.hasNext){
			return false;
		}

		let { id, page } = this.state;

		page = page + 1;

		await this.props.getList({
			page: page,
			tag_identity_id: this.state.tag_identity_id,
			reward_as: this.state.reward_as,
			reward_item: this.state.reward_item,
			city_id: this.props.match.city.current.id,
			keyword: this.state.inputVal
		});

		this.setState({
			page: page
		});
	}

	handleNav(e) {
		const { id, mid, type } = e.currentTarget.dataset;

		if(type === 0) {
			wx.navigateTo({
				url: '../detail/index?id=' + id
			})
		}else {
			wx.navigateTo({
				url: '../../business/detail/index?id=' + mid
			})
		}
	}

	showFilter(e) {
		this.setState({
			showFilter: true
		});
	}

	handleFilter(e){
		const self = this;
		const { type, id } = e.currentTarget.dataset;
		let { reward_as, reward_item, tag_identity_id } = this.state;

		if(type !== 'type' && this.state.reward_as == 0){
			return false;
		}

		switch(type){
			case 'type':
				reward_as = id;
				reward_item = 0;
				tag_identity_id = 0;
				break;
			case 'item':
				reward_item = id;
				tag_identity_id = 0;
				break;
			case 'role':
				tag_identity_id = id;
				reward_item = 0;
				break;
		}

		self.setState({
			reward_as: reward_as,
			reward_item: reward_item,
			tag_identity_id: tag_identity_id
		});

		if(type !== 'type' || reward_as == 0){
			self.setState({
				showFilter: false
			});

			const props = {
				page: this.state.pageStart,
				tag_identity_id: tag_identity_id,
				reward_as: reward_as,
				reward_item: reward_item,
				city_id: self.props.match.city.current.id
			}

			// store filter
			redux.getStore().dispatch({
				type: SET_FILTER,
				data: props
			});
			// refresh list
			this.props.getList(props);
		}
	}

	showInput() {
		this.setState({
			inputShowed: true
		});
	}

	hideInput() {
		this.setState({
			inputVal: "",
			inputShowed: false
		});
	}

	clearInput() {
		this.setState({
			inputVal: ""
		});
	}

	inputTyping(e) {
		this.setState({
			inputVal: e.detail.value
		});
	}

	handleSearch(e){
		this.props.getList({
			page: this.state.pageStart,
			tag_identity_id: this.state.tag_identity_id,
			reward_as: this.state.reward_as,
			reward_item: this.state.reward_item,
			city_id: this.props.match.city.current.id,
			keyword: this.state.inputVal
		});

		this.setState({
			page: this.state.pageStart
		});
	}
}

export default connect(
	({ match, user }) => ({ match, user }),
	(dispatch) => bindActionCreators({
		getList: matchActions.list,
		getLocation: matchActions.fetchLoaction,
		getFilters: matchActions.fetchFilters
	}, dispatch)
)(Index);
