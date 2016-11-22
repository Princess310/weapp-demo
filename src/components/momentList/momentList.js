import wx from 'labrador';
import Moment from '../moment/moment';

export default class MomentList extends wx.Component {

	data = {
		momentList: []
	}

	children = {
		listComp: new wx.List(Moment, 'momentList', {
			moment: '>>',
			id: '>id',
			uid: '>uid',
			balance: '>balance',
			avatar: '>avatar',
			nickname: '>nickname',
			verify_status: '>verify_status',
			username: '>username',
			company: '>company',
			position: '>position',
			integrity_level: '>integrity_level',
			influence: '>influence',
			tag_identity_name: '>tag_identity_name',
			content: '>content',
			pictures: '>pictures',
			hits: '>hits',
			share_count: '>share_count',
			comment_count: '>comment_count',
			like_count: '>like_count'
		})
	}

	onUpdate(props) {
		this.setData({
			momentList: props.list
		});
	}
}