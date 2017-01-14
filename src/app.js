import request from 'al-request';
import { setStore } from 'labrador-redux';
import { sleep } from './utils/utils';
import store from './redux';

if (__DEV__) {
  console.log('DEV-ENV');
}

// 向labrador-redux注册store
setStore(store);

export default class {
  async onLaunch() {
    request.setOptionset({
      session: false
    });

    try {
      await request('initialize/check', {
        app_version: 'web_'
      });
    } catch (error) {
      console.error(error);
    }
  }
}
