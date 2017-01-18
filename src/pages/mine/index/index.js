import wx, { Component, PropTypes } from 'labrador-immutable';
import { connect } from 'labrador-redux';
import { bindActionCreators } from 'redux';
import * as macthActions from '../../../redux/match';

class Index extends Component {
	onLoad() {
		this.props.getBusinessInfo();
	}
}

export default connect(
	({ user }) => ({ user }),
	(dispatch) => bindActionCreators({
		getBusinessInfo: macthActions.fetchBusinessInfo
	}, dispatch)
)(Index);