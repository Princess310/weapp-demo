import wx from 'labrador';
import Moment from '../../../components/moment/moment';
import MomentList from '../../../components/momentList/momentList';
import { getMomentsList, getPlazaList } from '../../../actions';

const sliderWidth = 96;
class Index extends wx.Component {
	data = {
		tabs: ["动态", "广场"],
		refreshing: false,
		activeIndex: "0",
		sliderOffset: 0,
		sliderLeft: 0,
		sliderWidth: 0,
		scrollTop: 20,
		momentPage: 1,
		plazaPage: 1,
		momentPageCount: -1,
		plazaPageCount: -1,
		testStr: 'test1'
	}

	children = {
		momentListComp: new MomentList({ list: "@momentsList" }),
		plazaListComp: new MomentList({ list: "@plazaList" })
	}

	async onPullDownRefresh() {
		if(this.data.refreshing) return false;
		this.setData({
			refreshing: true
		});

		if(this.data.activeIndex === "0"){
			this.setData({
				momentPage: 1
			});
			await wx.app.dispatch(getMomentsList(this.data.momentPage));
		}else {
			this.setData({
				plazaPage: 1
			});

			await wx.app.dispatch(getPlazaList(this.data.plazaPage));
		}

		wx.stopPullDownRefresh();

		this.setData({
			refreshing: false
		});
	}

	async nextpage(e) {
		const { momentPage, plazaPage } = this.data;
		let page = 0;

		if(this.data.activeIndex === "0"){
			page = momentPage + 1;
			console.log(page);
			if(page > this.data.momentPageCount){return false}

			wx.showToast({
				title: '加载中',
				icon: 'loading'
			})

			await wx.app.dispatch(getMomentsList(page));

			this.setData({
				momentPage: page
			});
		}else {
			console.log("plazaPage");
			page = plazaPage + 1;
			if(page > this.data.plazaPageCount){return false}

			wx.showToast({
				title: '加载中',
				icon: 'loading'
			})

			await wx.app.dispatch(getPlazaList(page));

			this.setData({
				plazaPage: page
			});
		}

		wx.hideToast();
	}

	onReady() {
		wx.setNavigationBarTitle({title: "商务圈"})
	}

	async onLoad(option) {
		const self = this;
		wx.showToast({
			title: '加载中',
			icon: 'loading'
		})

		wx.getSystemInfo({
			success: function(res) {
				self.setData({
					sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2
				});
			}
		});

		// 初始化商务圈和广场
		wx.app.dispatch(getPlazaList(this.data.plazaPage)).then((result) => {
			self.setData({
				plazaPageCount: result.page.page_count
			});
		});

		await wx.app.dispatch(getMomentsList(this.data.momentPage)).then((result) => {
			self.setData({
				momentPageCount: result.page.page_count
			});
		});

		wx.hideToast();
	}

	tabClick(e) {
		this.setData({
			sliderOffset: e.currentTarget.offsetLeft,
			activeIndex: e.currentTarget.id
		});
	}
}

export default wx.app.connect(
	state => ({
		momentsList: state.moment.moments,
		plazaList: state.moment.plaza
	})
)(Index)