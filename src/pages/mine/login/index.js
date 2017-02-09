import wx, { Component, PropTypes } from 'labrador-immutable';
import { connect } from 'labrador-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../../redux/login';

class Index extends Component {
	state = {
		username: '',
		password: ''
	}

	handleUsername(e) {
		this.setState({
			username: e.detail.value
		});
	}

	handlePassword(e) {
		this.setState({
			password: e.detail.value
		});
	}

	handleLogin() {
		this.props.login({
			username: this.state.username,
			password: this.state.password
		});
	}

	handleWxLogin() {
		this.props.wxLogin();
	}
}

export default connect(
	({}) => ({}),
	(dispatch) => bindActionCreators({
		wxLogin: loginActions.wxLogin,
		login: loginActions.accountLogin
	}, dispatch)
)(Index);