import wx from 'labrador';

const { string, number, array } = wx.PropTypes;

export default class Moment extends wx.Component {

	propTypes = {
		id: string,
		uid: string,
		balance: number,
		avatar: string,
		nickname: string,
		verify_status: string,
		username: string,
		company: string,
		position: string,
		integrity_level: string,
		influence: string,
		tag_identity_name: string,
		content: string,
		pictures: array,
		hits: string,
		share_count: string,
		comment_count: string,
		like_count: string
	};

	data = {
		id: "",
		uid: "",
		balance: 0,
		avatar: "",
		nickname: "",
		verify_status: "-1",
		username: "",
		company: "",
		position: "",
		integrity_level: "0",
		influence: "0",
		tag_identity_name: "",
		content: "",
		pictures: [],
		hits: "0",
		share_count: "0",
		comment_count: "0",
		like_count: ""
	};

	onUpdate(props) {
		this.setData({
			id: props.id,
			uid: props.uid,
			balance: props.balance,
			avatar: props.avatar,
			nickname: props.nickname,
			verify_status: props.verify_status,
			username: props.username,
			company: props.company,
			position: props.position,
			integrity_level: props.integrity_level,
			influence: props.influence,
			tag_identity_name: props.tag_identity_name,
			content: props.content,
			pictures: props.pictures,
			hits: props.hits,
			share_count: props.share_count,
			comment_count: props.comment_count,
			like_count: props.like_count,
		});
	}

	handleTap() {
	
	}
}