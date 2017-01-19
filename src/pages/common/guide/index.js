import wx, { Component, PropTypes } from 'labrador-immutable';
import { connect } from 'labrador-redux';
import { bindActionCreators } from 'redux';
import * as sysEmitActions from '../../../redux/sysEmit';
import * as userActions from '../../../redux/user';

class Index extends Component {
	state = {
	}

	onLoad() {
		this.setState(this.props.user);

		// set select industry emit
		this.props.setSelectIndustry({
			id: this.props.user.tag_identity_id,
			sid: this.props.user.industry_son_id,
			name: this.props.user.tag_identity_name
		});
	}

	chooseImage(e) {
		let self = this;

		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			complete: (res) => {
				if(res.tempFilePaths && res.tempFilePaths.length > 0){
					self.setState({
						avatar: res.tempFilePaths
					});
				}
			}
		})
	}

	handleGender(e){
		const { value } = e.currentTarget.dataset;

		this.setState({
			gender: value
		});
	}

	handleNickname(e){
		this.setState({
			nickname: e.detail.value
		});
	}

	handleSave(){
		const { avatar, nickname, gender } = this.state;

		if(nickname === ''){
			wx.showModal({
				content: '姓名不能为空',
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定')
					}
				}
			});

			return false;
		}

		if(avatar === ''){
			wx.showModal({
				content: '头像不能为空',
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定')
					}
				}
			});

			return false;
		}

		if(!this.props.sysEmit.selectIndustry.id || this.props.sysEmit.selectIndustry.id === ''){
			wx.showModal({
				content: '请选择行业方向',
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定')
					}
				}
			});

			return false;
		}

		let props = {
			avatar: avatar,
			nickname: nickname,
			gender: gender,
			tag_identity_id: this.props.sysEmit.selectIndustry.id,
			industry_son_id: this.props.sysEmit.selectIndustry.sid
		}

		this.props.saveUserInfo(props);

		wx.navigateBack({
			delta: 1
		});
	}
}

export default connect(
	({ sysEmit, user }) => ({ sysEmit, user }),
	(dispatch) => bindActionCreators({
		setSelectIndustry: sysEmitActions.setIndustry,
		saveUserInfo: userActions.saveUserInfo
	}, dispatch)
)(Index);