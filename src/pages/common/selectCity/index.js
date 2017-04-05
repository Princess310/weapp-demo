import wx, { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import city from '../../../utils/city';
import { LOAD_LOCATION, SET_FILTER } from '../../../redux/match';
import { LOAD_SYS_CITY } from '../../../redux/sysEmit';
import * as redux from 'labrador-redux';
import * as matchActions from '../../../redux/match';

class Index extends Component {
	state = {
		searchLetter: [],
		showLetter: "",
		winHeight: 0,
		tHeight:0,
		bHeight:0,
		startPageY:0,
		cityList:[],
		isShowLetter:false,
		scrollTop:0,
		city:"",
		cityArr:[],
		src:'../../../images/dw.png',
		action: ''
	}

	onLoad(options) {
		const { action } = options;
		if(options){
			this.setState({
				action: action
			});
		}

		// get list first
		const self = this;

		const { page } = this.state;
		this.props.getList();
		// 生命周期函数--监听页面加载
		let searchLetter = city.searchLetter;

		let sysInfo = wx.getSystemInfoSync();
		let winHeight = sysInfo.windowHeight;

		//添加要匹配的字母范围值
		//1、更加屏幕高度设置子元素的高度
		let itemH = (winHeight-50) / searchLetter.length;
		let tempObj = [];
		for (let i = 0; i < searchLetter.length; i++) {
			let temp = {};
			temp.name = searchLetter[i];
			temp.tHeight = i * itemH;
			temp.bHeight = (i + 1) * itemH;

			tempObj.push(temp)
		}

		this.setState({
			winHeight: winHeight,
			itemH: itemH,
			searchLetter: tempObj,
		})
	}

	searchStart(e) {
		let showLetter = e.currentTarget.dataset.letter;
		let pageY = e.touches[0].pageY;
		this.setScrollTop(this,showLetter);
		this.nowLetter(pageY,this);
		this.setState({
			showLetter: showLetter,
			startPageY: pageY,
			isShowLetter:true,
		})
	}

	searchMove(e) {
		let pageY = e.touches[0].pageY;
		let startPageY=this.state.startPageY;
		let tHeight=this.state.tHeight;
		let bHeight=this.state.bHeight;
		let showLetter = 0;
		if(startPageY-pageY>0){ //向上移动
			if(pageY<tHeight){
				// showLetter=this.mateLetter(pageY,this);
				this.nowLetter(pageY,this);
			}
		}else{//向下移动
			if(pageY>bHeight){
				// showLetter=this.mateLetter(pageY,this);
				this.nowLetter(pageY,this);
			}
		}
	}

	searchEnd(e) {
		// console.log(e);
		// var showLetter=e.currentTarget.dataset.letter;
		let that = this;
		setTimeout(function(){
			that.setState({
				isShowLetter:false
			})
		},1000)

	}

	nowLetter(pageY, that) {//当前选中的信息
		let letterData = this.state.searchLetter;
		let bHeight = 0;
		let tHeight = 0;
		let showLetter = "";
		for (let i = 0; i < letterData.length; i++) {
			if (letterData[i].tHeight <= pageY && pageY <= letterData[i].bHeight) {
				bHeight = letterData[i].bHeight;
				tHeight = letterData[i].tHeight;
				showLetter = letterData[i].name;
				break;
			}
		}

		this.setScrollTop(that,showLetter);

		that.setState({
			bHeight:bHeight,
			tHeight:tHeight,
			showLetter:showLetter,
			startPageY:pageY
		})
	}

	bindScroll(e){
		//console.log(e.detail)
	}

	setScrollTop(that,showLetter){
		let scrollTop=0;
		let cityList=that.state.cityList;
		let cityCount=0;
		let initialCount=0;
		for(let i=0;i<cityList.length;i++){
			if(showLetter==cityList[i].initial){
				scrollTop=initialCount*30+cityCount*41;
				break;
			}else{
				initialCount++;
				cityCount+=cityList[i].cityInfo.length;
			}
		}
		that.setState({
			scrollTop:scrollTop-1558
		})
	}

	bindCity(e){
		let city = e.currentTarget.dataset.city;
		this.setState({city:city})
	}

	wxSortPickerViewItemTap(e){
		let { id, text } = e.target.dataset;
		let { filter } = this.props.match;
		const { action } = this.state;

		const store = redux.getStore();

		if(action === 'sysEmit'){
			store.dispatch({
				type: LOAD_SYS_CITY,
				payload: {
					name: text
				}
			});
		}else {
			let props = {
				...filter.current,
				city_id: id
			};
			
			store.dispatch({
				type: LOAD_LOCATION,
				payload: {
					data: {
						id: id,
						name: text
					}
				}
			});

			store.dispatch({
				type: SET_FILTER,
				data: props
			});

			// refresh match list then
			this.props.getMatchList(props);
		}
		
		wx.navigateBack({
			delta: 1
		});
	}
}

export default connect(
	({ match }) => ({ match }),
	(dispatch) => bindActionCreators({
		getMatchList: matchActions.list,
		getList: matchActions.fetchCity
	}, dispatch)
)(Index);