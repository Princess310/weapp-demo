import wx, { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import * as sysEmitActions from '../../../redux/sysEmit';
import * as momentActions from '../../../redux/moment';
import * as matchActions from '../../../redux/match';

class Index extends Component {
	state = {
		type: 1,
		reward_amount: 0,
		content: '',
		fileCount: 0,
		files: [],
		filesLimit: 9,
		showTel: true,
		category: 3,
		tel: ''
	}

	async onLoad() {
		this.props.setSelectInfo({
			id: 1,
			name: "模式"
		});
	}

	selectCategory(e) {
		wx.navigateTo({
			url: '../../common/selectPanel/index?type=reward&val=' + this.props.sysEmit.selectMsg.id
		})
	}

	switchType(e) {
		const type = e.currentTarget.dataset.type;
		this.setState({
			type: type
		});
	}

	switchTel(e){
		this.setState({
			showTel: !this.state.showTel
		});
	}

	chooseImage(e) {
		let self = this;
		let count = this.state.filesLimit - this.state.files.length;
		if(self.state.fileCount >= self.state.filesLimit){
			wx.showModal({
				title: "提示",
				showCancel: false,
				content: "已达最大图片数"
			});
			return false;
		}
		wx.chooseImage({
			count: count,
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			complete: (res) => {
				if(res.tempFilePaths && res.tempFilePaths.length > 0){
					self.setState({
						fileCount: (self.state.fileCount + res.tempFilePaths.length),
						files: self.state.files.concat(res.tempFilePaths)
					});
				}
			}
		})
	}

	clearFile(e){
		const { index } = e.currentTarget.dataset;
		const self = this;
		self.setState({
			files: self.state.files.filter((f, i) => {
				return (i != index)
			}),
			fileCount: (self.state.fileCount - 1)
		});
	}

	handleAmount(e){
		this.setState({
			reward_amount: e.detail.value
		});
	}

	handleContent(e){
		this.setState({
			content: e.detail.value
		});
	}

	handleTel(e){
		this.setState({
			tel: e.detail.value
		});
	}

	async handleSubmit(e){
		const { type, reward_amount, content, files, showTel, tel, category } = this.state;
		const { selectMsg } = this.props.sysEmit;

		const props = {
			content: content,
			pictures: files.join(','),
			reward_item: selectMsg.id,
			reward_as: type,
			category: category,
			reward_amount: reward_amount
		};

		if(showTel){
			if(tel === "" || (tel.length !== 7 && tel.length !== 11)){
				wx.showModal({
					content: '请输入正确电话号码和格式',
					showCancel: false,
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定')
						}
					}
				});

				return flase;
			}

			props.mobile = tel;
		}

		if(content === '' && files.length === 0){
			wx.showModal({
				content: '请上传图片或者输入内容',
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定')
					}
				}
			});

			return flase;
		}

		await this.props.addReward(props);
		// refresh moment
		await this.props.refreshMomentList({
			page: 1
		});
		// refresh macth
		await this.props.refreshMatchList({
			page: 2,
			city_id: 2
		});

		wx.navigateBack({
			delta: 1
		});
	}
}

export default connect(
	(sysEmit) => (sysEmit),
	(dispatch) => bindActionCreators({
		setSelectInfo: sysEmitActions.set,
		refreshMomentList: momentActions.refresh,
		addReward: momentActions.add,
		refreshMatchList: matchActions.list
	}, dispatch)
)(Index);