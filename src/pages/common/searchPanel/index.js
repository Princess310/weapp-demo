import wx, { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import * as matchActions from '../../../redux/match';
import * as momentActions from '../../../redux/moment';

class Index extends Component {
  state = {
    action: '',
    placeholder: '',
    inputVal: '',
    page: 1,
    keyword: '',
  }

  async onLoad(options) {
		const { action } = options;

		this.setState({
			action: action
		});

    if(action === 'moment'){
      this.setState({
        placeholder: '搜索动态'
      });
    }else {
      this.setState({
        placeholder: '搜索人脉'
      });
    }
	}

  async onUnload() {
    // clear the search things
    this.props.clearSearchMoments();
    this.props.clearSearchMatch();
  }

  handleSearch() {
    const { inputVal, page, action } = this.state;

    if(action === 'moment'){
      this.props.searchMoment({
        keyword: inputVal,
        page: 1
      });
    }else {
      this.props.searchMatch({
        search: inputVal,
        page: 1
      });
    }


    this.setState({
      page: 1,
      keyword: inputVal,
    });
  }

  async onReachBottom() {
		let { page, action, keyword } = this.state;

		// if has next page
		if(action === 'moment' && !this.props.moment.hasSearchNext){
			return false;
		}

    if(action === 'match' && !this.props.match.hasSearchNext){
			return false;
		}

		wx.showToast({
			title: '加载中',
			icon: 'loading'
		})
		const { currentRole } = this.props.moment;

		page = page + 1;

    if(action === 'moment'){
      this.props.searchMoment({
        keyword: keyword,
        page: page
      });
    }else {
      this.props.searchMatch({
        search: keyword,
        page: page
      });
    }

		this.setState({
			page: page
		});

		wx.hideToast();
	}

  inputTyping(e) {
		this.setState({
			inputVal: e.detail.value
		});
	}

  clearInput() {
		this.setState({
			inputVal: ""
		});

    this.props.clearSearchMoments();
    this.props.clearSearchMatch();
	}

  handleBack() {
    wx.navigateBack();
  }

  handleViewImage(e) {
		let data = e.currentTarget.dataset;
		let src = data.src;
		let pid = data.pid;
		let urls = [];
		const list = this.props.moment.searchList || [];

		list.map((item, i) => {
			if(pid === item.id){
				urls = item.pictures.map((p) => {
					return p;
				});
			}
		});

		wx.previewImage({
			current: src,
			urls: urls
		});
	}
}

export default connect(
	({ match, moment }) => ({ match, moment }),
	(dispatch) => bindActionCreators({
    searchMoment: momentActions.fetchSearchMoments,
    clearSearchMoments: momentActions.clearSearchMoments,
    searchMatch: matchActions.fetchSearchMatch,
    clearSearchMatch: matchActions.clearSearchMatch,
	}, dispatch)
)(Index);
