import wx, { Component, PropTypes } from 'labrador-immutable';
import { connect } from 'labrador-redux';

class Index extends Component {
	state = {
		type: 1,
		reward_amount: '',
		fileCount: 0,
		files: [],
		filesLimit: 9,
		showTel: true
	}

	selectCategory(e) {
		
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
}

export default connect()(Index);