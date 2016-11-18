import wx from 'labrador';
import { getMacthList } from '../../../actions';

class Index extends wx.Component {
	app = getApp()

	data = {
		page: 2,
		loading: false,
		refreshing: false,
		pageCount: -1,
		scrollTop: 20
	}

	loading(boolean) {
		this.setData({loading: boolean})
	}

	onPullDownRefresh() {
		if(this.data.refreshing) return false;
		this.setData({
			page: 1,
			refreshing: true
		});

		wx.app.dispatch(getMacthList(0, 0 , "", this.data.page)).then(() => {
			wx.stopPullDownRefresh();
			this.setData({
				refreshing: false
			});
		});
	}

	onReady() {
		wx.setNavigationBarTitle({title: "邀约"})
	}

	async onLoad(option) {
		const self = this;

		this.loading(true);
		const data = await wx.app.dispatch(getMacthList(0, 0 , "", this.data.page)).then((result) => {
			self.setData({
				pageCount: result.page.page_count
			});
		});
		this.setData({
			paged: 2,
			loading: false
		})
	}

	async nextpage(e) {
		let page = this.data.page + 1;

		if(page > this.data.pageCount){return false}

		this.loading(true);
		await wx.app.dispatch(getMacthList(0, 0 , "", page));
		this.setData({
			page: page,
			loading: false
		});
	}
}

export default wx.app.connect(
	state => ({
		list: state.match.list
	})
)(Index)