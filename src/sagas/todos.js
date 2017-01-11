import wx from 'labrador';
import { takeLatest } from 'redux-saga';
import { REMOVE } from '../redux/todos';

function remove() {
  wx.showToast({ title: '删除成功' });
}

function* todosSaga() {
  yield [
    takeLatest(REMOVE, remove)
  ];
}

export default todosSaga;