import wx, { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import city from '../../../utils/city';
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
		src:'../../../images/dw.png'
	}

	onLoad() {
		// get list first
		const self = this;
		wx.showToast({
			title: '加载中',
			icon: 'loading'
		})

		const { page } = this.state;
		this.props.getList();

		wx.hideToast();
		//历史选择，应该在缓存中记录，或者在在app中全局记录
		//当前城市通过之前的页面穿过来或者调用定位
		let c = '北京'
		let cityArr = ['上海','北京']
		this.setState({
			cityArr: cityArr,
			city:c
		})
		// 生命周期函数--监听页面加载
		let searchLetter = city.searchLetter;
		let cityList = city.cityList();
		// console.log(cityInfo);

		let sysInfo = wx.getSystemInfoSync();
		console.log(sysInfo);
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
			cityList:cityList
		})

		console.log(this.state.cityInfo);
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
		console.log(pageY);
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
		console.log(e.detail)
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
		let city = e.target.dataset.text;
		//可以跳转了
		console.log('选择了城市：',city);
	}

	cxgps(e) {
		let that = this;
		wx.getLocation({
			type: 'wgs84',
			success: (res) => {
				let latitude = res.latitude;
				let longitude = res.longitude;
				ajaxGes(latitude,longitude)
					.then(function (data) {
						if(data.status === 'success'){
								that.setState({

								})
						}else{
							that.setState({
								city: '定位失败'
							})
						}
					})
			},
			fail: () => {
				that.setState({
					city: '定位失败'
				})
			}
		})
	}
}

//经纬度定位获取站点
function ajaxGes(lat, lng) {
	//自己的定位接口
	var url = '';

	return new Promise(function (resolve, reject) {
		wx.request({
			url: url,
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {
				resolve(res.data);
			},
			fail:function (err) {
				reject(err);
			}
		})
	})

}

export default connect(
	({ match }) => ({ match }),
	(dispatch) => bindActionCreators({
		getList: matchActions.fetchCity
	}, dispatch)
)(Index);