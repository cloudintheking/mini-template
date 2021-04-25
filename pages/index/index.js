// index.js
import {
  checkLogin,
  bindStore,
  callPage
} from '../../utils/filter'

import {
  store
} from '../../store/user'

import mixin from './testMixin'
import wxp from '../../utils/wxApiPromise'
import {
  LoginRoutePath
} from '../../store/constants'
import util from '../../utils/util'
// 获取应用实例
const app = getApp()

callPage(checkLogin(bindStore(store, {
  mixins: [mixin],
  data: {
    motto: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: false,
    canIUseGetUserProfile: false,
    canIUseOpenData: false // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.switchTab({
      url: '../logs/logs'
    })
  },
  onLoad() {
    console.log('当前页面', this.route)
    this.setData({
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      canIUseGetUserProfile: true,
      canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),
      motto: "Quit"
    })
  },
  onShow() {},
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 退出
   */
  logout: util.throttle(async function () {
    await store.LogOut()
    wxp.showToast({
      title: '退出成功',
      icon: 'success',
      image: '',
      duration: 1800,
      mask: true
    }).then(res => {
      //跳转登陆页面
      setTimeout(function () {
        wx.redirectTo({
          url: LoginRoutePath,
          success: (result) => {},
          fail: () => {},
          complete: () => {}
        });
      }, 800)
    });
  }, 1500)

})))