import wx, { Component, PropTypes } from 'labrador-immutable';
import { connect } from 'labrador-redux';
import { bindActionCreators } from 'redux';
import { SELECT_TAG } from '../../../redux/match';
import * as macthActions from '../../../redux/match';
import * as redux from 'labrador-redux';

class Index extends Component {
	state = {
		type: '',
		showInput: false,
		inputValue: '',
		tags: {}
	}

	onLoad() {
		this.props.getTags();
	}

	showInput(e){
		const { type } = e.currentTarget.dataset;
		this.setState({
			type: type,
			showInput: true
		});
	}

	handleBlur(){
		this.setState({
			showInput: false
		});
	}

	handleInputValue(e){
		this.setState({
			inputValue: e.detail.value
		});
	}

	handleAddTag(e){
		const { type, inputValue } = this.state;
		let type_custom = 0;

		if(inputValue === ''){
			wx.showModal({
				title: "提示",
				showCancel: false,
				content: "标签内容不能为空！"
			});
			return false;
		}

		if(type === 'needs'){
			type_custom = 1;
		}

		this.props.addTag({
			name: inputValue,
			type_custom: type_custom
		});

		this.setState({
			inputValue: '',
			showInput: false
		});
	}

	clearTag(e) {
		const { id } = e.currentTarget.dataset;

		this.props.delTag({
			id: id
		});
	}

	getSelectedTags(){
		const { advantage, needs } = this.props.match.tags.display_list;

		let rAdvantage = advantage.filter((a) => {
			return a.selected == 1;
		});

		let rNeeds = needs.filter((n) => {
			return n.selected == 1;
		});

		return {
			advantage: rAdvantage,
			needs: rNeeds
		};
	}

	handleItem(e){
		const { id, type, select } = e.currentTarget.dataset;
		const store = redux.getStore();
		let selectArr = this.getSelectedTags();
		
		if(select != 1 && selectArr[type].length >= 3){
			wx.showModal({
				title: "提示",
				showCancel: false,
				content: "选择标签不能超过指定数量"
			});
			return false;
		}else if(select == 1 && selectArr[type].length == 1){
			wx.showModal({
				title: "提示",
				showCancel: false,
				content: "至少选择一个标签"
			});
			return false;
		}

		store.dispatch({
			type: SELECT_TAG,
			payload: {
				id: id,
				type: type
			}
		});
	}

	handleSave() {
		let { advantage, needs } = this.getSelectedTags();
		let advantage_ids = advantage.map(a => {
			return a.id
		});
		let needs_ids = needs.map(n => {
			return n.id
		});

		this.props.saveTags({
			advantage_ids: advantage_ids.join(','),
			needs_ids: needs_ids.join(',')
		});

		wx.navigateBack({
			delta: 1
		});
	}
}

export default connect(
	({ match }) => ({ match }),
	(dispatch) => bindActionCreators({
		addTag: macthActions.addTag,
		delTag: macthActions.deleteTag,
		getTags: macthActions.fetchTags,
		saveTags: macthActions.saveTags
	}, dispatch)
)(Index);