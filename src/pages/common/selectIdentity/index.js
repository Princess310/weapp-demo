import wx, { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import * as matchActions from '../../../redux/match';
import * as sysEmitActions from '../../../redux/sysEmit';

class Index extends Component {
	state = {
		id: '',
		selectedId: '',
		name: '',
		acion: ''
	}

	onLoad(options) {
		const { id } = options;
		if(id){
			let arr = id.split('_');
			this.setState({
				action: 'sysEmit',
				id: arr[1],
				activeIndex: arr[1] - 1, 
				selectedId: arr[0]
			});
		}

		this.props.getList();
	}

	handleTab(e){
		const { id } = e.currentTarget.dataset;

		this.setState({
			id: id
		});
	}

	handleSelect(e){
		const { id, name } = e.currentTarget.dataset;

		this.setState({
			selectedId: id,
			name: name
		});
	}

	handleConfirm(e){
		const { action, id, selectedId, name } = this.state;

		if(selectedId == ''){
			wx.showModal({
				content: '请选择行业角色',
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定')
					}
				}
			});
		}

		if(action === 'sysEmit'){
			this.props.setSysIndustry({
				id: selectedId,
				sid: id,
				name: name
			});
		}

		wx.navigateBack({
			delta: 1
		});
	}
}

export default connect(
	({ match }) => ({ match }),
	(dispatch) => bindActionCreators({
		getList: matchActions.fetchIndustry,
		setSysIndustry: sysEmitActions.setIndustry
	}, dispatch)
)(Index);