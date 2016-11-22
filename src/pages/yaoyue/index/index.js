import wx from 'labrador';
import { getMacthList } from '../../../actions';

class Index extends wx.Component {
	app = getApp()

	data = {
		page: 2,
		refreshing: false,
		pageCount: -1,
		scrollTop: 20,
		matchCount: 0,
		showMacth: false,
		matchAnimationData: {}
	}

	async onPullDownRefresh() {
		if(this.data.refreshing) return false;
		this.setData({
			page: 1,
			refreshing: true
		});

		await wx.app.dispatch(getMacthList(0, 0 , "", this.data.page));

		wx.stopPullDownRefresh();
		// animation start
		this.animation.translateY('0').opacity('1').step();
		this.setData({
			matchAnimationData: this.animation.export()
		});

		// animation end
		this.setData({
			refreshing: false,
			showMacth: true,
			matchCount: this.data.list.length
		});

		this.animation.translateY('-54rpx').opacity('0').step();
		setTimeout(() => {
			this.setData({
				showMacth: false,
				matchAnimationData: this.animation.export()
			});
		}, 2500);
	}

	onReady() {
		wx.setNavigationBarTitle({title: "邀约"})
	}

	onShow() {
		let animation = wx.createAnimation({
			duration: 250,
			timingFunction: 'linear'
		});

		this.animation = animation;
	}

	async onLoad(option) {
		const self = this;

		wx.showToast({
			title: '加载中',
			icon: 'loading'
		})
		const data = await wx.app.dispatch(getMacthList(0, 0 , "", this.data.page)).then((result) => {
			self.setData({
				pageCount: result.page.page_count
			});
		});

		this.setData({
			paged: 2
		})
		wx.hideToast();
	}

	async nextpage(e) {
		let page = this.data.page + 1;

		if(page > this.data.pageCount){return false}

		wx.showToast({
			title: '加载中',
			icon: 'loading'
		})
		await wx.app.dispatch(getMacthList(0, 0 , "", page));
		this.setData({
			page: page
		});
		wx.hideToast();
	}
}

export default wx.app.connect(
	state => ({
		list: state.match.list
	})
)(Index)