import wx, { Component, PropTypes } from 'labrador-immutable';
import { connect } from 'labrador-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../../redux/user';

class Index extends Component {
	state = {
		content: '',
		fileCount: 0,
		files: [],
		filesLimit: 9,
	}

	onLoad() {
		// get info first
		const { business_intro, pictures } = this.props.match.business;

		this.setState({
			content: business_intro,
			files: pictures,
			fileCount: pictures.length
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

	handleContent(e){
		this.setState({
			content: e.detail.value
		});
	}

	handleSubmit(){
		const { content, files } = this.state;
		this.props.save({
			business_intro: content,
			pictures: files
		});

		wx.navigateBack({
			delta: 1
		});
	}

	clearFile(e){
		const { index } = e.currentTarget.dataset;
		const { files } = this.state;

		let newFiles = files.filter((f, i) => {
			if(index !== i){
				return f;
			}
		});

		this.setState({
			fileCount: this.state.fileCount - 1,
			files: newFiles
		});
	}
}

export default connect(
	({ user, match }) => ({ user, match }),
	(dispatch) => bindActionCreators({
		save: userActions.saveBusiness
	}, dispatch)
)(Index);