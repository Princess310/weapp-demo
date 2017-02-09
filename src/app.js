import request from 'al-request';
import { setStore } from 'labrador-redux';
import { sleep } from './utils/utils';
import store from './redux';
import { LOGIN } from './redux/login';

if (__DEV__) {
  console.log('DEV-ENV');
}

// 向labrador-redux注册store
setStore(store);

export default class {
  async onLaunch() {

    try {
      /*store.dispatch({
        type: LOGIN
      });*/
    } catch (error) {
      console.error(error);
    }
  }
}
