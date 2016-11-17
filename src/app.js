import wx from 'labrador';
import { sleep } from './utils/util';
import createStore from './utils/store'
import reducers from './reducers'
import connect from './utils/wechat-weapp-redux/connect'
import Provider from './utils/wechat-weapp-redux/Provider'

const store = createStore(reducers)

export default class {
	store = store
	dispatch = store.dispatch
	connect = connect
}