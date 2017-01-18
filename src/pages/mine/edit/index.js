import wx, { Component, PropTypes } from 'labrador-immutable';
import { connect } from 'labrador-redux';
import { bindActionCreators } from 'redux';
import * as sysEmitActions from '../../../redux/sysEmit';
import * as userActions from '../../../redux/user';

class Index extends Component {
	onLoad() {
		this.setState(this.props.user);

		let showEditUsername = this.props.user.username === '';
		this.setState({
			showEditUsername: showEditUsername
		});

		// set select city emit
		this.props.setSelectCity({
			name: this.props.user.company_locate
		});
		// set select industry emit
		this.props.setSelectIndustry({
			id: this.props.user.tag_identity_id,
			sid: this.props.user.industry_son_id,
			name: this.props.user.tag_identity_name
		});
	}

	handleName(e) {
		this.setState({
			nickname: e.detail.value
		});
	}

	handleGender(e){
		const { value } = e.currentTarget.dataset;

		this.setState({
			gender: value
		});
	}

	handleCompany(e) {
		this.setState({
			company: e.detail.value
		});
	}

	handlePosition(e) {
		this.setState({
			position: e.detail.value
		});
	}

	handleUsername(e) {
		this.setState({
			username: e.detail.value
		});
	}

	handleAddress(e) {
		this.setState({
			address: e.detail.value
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

	handleSubmit(e) {
		const { avatar, nickname, gender, company, position, address, intro } = this.state;
		let props = {
			avatar: avatar,
			nickname: nickname,
			gender: gender,
			company: company,
			position: position,
			address: address,
			intro: intro,
			tag_identity_id: this.props.sysEmit.selectIndustry.id,
			company_locate: this.props.sysEmit.selectCity.name,
			industry_son_id: this.props.sysEmit.selectIndustry.sid
		}

		// then save
		this.props.saveInfo(props);

		wx.navigateBack({
			delta: 1
		});
	}

	handleSaveUsername(e){
		const { username } = this.state;

		this.props.saveUsername({
			username: username
		});

		// refresh state for username
		this.setState({
			username: username
		});
	}
}

export default connect(
	({ sysEmit, user }) => ({ sysEmit, user }),
	(dispatch) => bindActionCreators({
		setSelectCity: sysEmitActions.setCity,
		setSelectIndustry: sysEmitActions.setIndustry,
		saveInfo: userActions.save,
		saveUsername: userActions.saveUsername
	}, dispatch)
)(Index);