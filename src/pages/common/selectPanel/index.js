import wx, { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import * as momentActions from '../../../redux/moment';
import * as sysEmitActions from '../../../redux/sysEmit';

class Index extends Component {
	state = {
		config: {
			'reward': {
				title: "选择类目",
				url: "moments/reward-item",
				key: 'id',
				val: 'name'
			}
		},
		val: 0,
		type: ""
	}

	handleSelect(e){
		const { val, name } = e.currentTarget.dataset;
		this.setState({
			val: val
		});

		this.props.setSelectInfo({
			id: val,
			name: name
		});

		wx.navigateBack({
			delta: 1
		});
	}

	async onLoad(options) {		
		const { type, val } = options;
		const conf = this.state.config[type];

		wx.setNavigationBarTitle({title: conf.title})
		this.setState({
			val: Number(val),
			type: "reward"
		});

		// get reward list
		wx.showToast({
			title: '加载中',
			icon: 'loading'
		})

		if(type === "reward"){
			this.props.getRewardList();
		}

		wx.hideToast();
	}
}

export default connect(
	({ moment }) => ({ moment }),
	(dispatch) => bindActionCreators({
		setSelectInfo: sysEmitActions.set,
		getRewardList: momentActions.fetchReward
	}, dispatch)
)(Index);