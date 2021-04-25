// logs.js
const util = require('../../utils/util.js')
import {
  callPage,
  checkLogin
} from '../../utils/filter'
Page({
  data: {
    logs: []
  },
  onLoad() {
    console.log('当前页面', this.route)
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})