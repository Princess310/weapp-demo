import wx, { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import * as momentActions from '../../../redux/moment';

class Index extends Component {
	state = {
		content: '',
		fileCount: 0,
		files: [],
		filesLimit: 9,
		showTel: true,
		tel: ''
	}

	handleContent(e){
		this.setState({
			content: e.detail.value
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

	switchTel(e){
		this.setState({
			showTel: !this.state.showTel
		});
	}

	handleTel(e){
		this.setState({
			tel: e.detail.value
		});
	}

	async handleSubmit(){
		const { content, files, tel, showTel } = this.state;

		const props = {
			content: content,
			pictures: files.join(',')
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


		await this.props.addMoment(props);

		wx.navigateBack({
			delta: 1
		});
	}
}

export default connect(
	({ moment }) => ({ moment }),
	(dispatch) => bindActionCreators({
		refreshMomentList: momentActions.refresh,
		addMoment: momentActions.add
	}, dispatch)
)(Index);