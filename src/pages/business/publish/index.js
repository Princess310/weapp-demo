import wx, { Component, PropTypes } from 'labrador-immutable';
import { connect } from 'labrador-redux';

class Index extends Component {
	onReady() {
	}
}

export default connect(
	({ moment }) => ({ moment })
)(Index);