import wx, { Component, PropTypes } from 'labrador-immutable';
import { connect } from 'labrador-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../../redux/user';

class Index extends Component {
	state = {
		mobile: '',
		password: '',
		code: ''
	}

	handleMoblie(e) {
		this.setState({
			mobile: e.detail.value
		})
	}

	handleCode(e) {
		this.setState({
			code: e.detail.value
		})
	}

	handlePassword(e){
		this.setState({
			password: e.detail.value
		})
	}

	handleGetCode(){
		const { mobile } = this.state;

		if(mobile === "" || (mobile.length !== 7 && mobile.length !== 11)){
			wx.showModal({
				content: '请输入正确电话号码和格式',
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定')
					}
				}
			});

			return false;
		}

		this.props.getVerifyCode({
			username: mobile
		});
	}

	handleSave() {
		const { mobile, password, code } = this.state;

		if(mobile === "" || (mobile.length !== 7 && mobile.length !== 11)){
			wx.showModal({
				content: '请输入正确电话号码和格式',
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定')
					}
				}
			});

			return false;
		}

		if(code === ''){
			if(mobile === "" || (mobile.length !== 7 && mobile.length !== 11)){
				wx.showModal({
					content: '请输入验证码',
					showCancel: false,
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定')
						}
					}
				});

				return false;
			}
		}

		if(password === ''){
			if(mobile === "" || (mobile.length !== 7 && mobile.length !== 11)){
				wx.showModal({
					content: '密码',
					showCancel: false,
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定')
						}
					}
				});

				return false;
			}
		}

		this.props.saveChangeMobile({
			mobile: mobile,
			code: code,
			type: 1,
			password: password
		});
	}
}

export default connect(
	({ user }) => ({ user }),
	(dispatch) => bindActionCreators({
		getVerifyCode: userActions.getVerifyCode,
		saveChangeMobile: userActions.saveChangeMobile
	}, dispatch)
)(Index);