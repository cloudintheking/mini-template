// pages/login/index.js

import {
  store as userStore
} from '../../store/user'

import {
  DefaultRoutePath
} from "../../store/constants"

import util, {
  sleep
} from '../../utils/util'

import wxp from '../../utils/wxApiPromise'

import WxValidate from '../../utils/wxValidate'

// 验证字段的规则
const rules = {
  username: {
    required: true,
    tel: true,
  },
  password: {
    required: true,
    rangelength: [6, 10],
  },
}

// 验证字段的提示信息，若不传则调用默认的信息
const messages = {
  username: {
    required: '请输入手机号',
    tel: '请输入正确的手机格式',
  },
  password: {
    required: '请输入密码',
    rangelength: '请输入6到10位密码',
  }
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    form: {
      username: '',
      password: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('当前页面', this.route)
    this.validate = new WxValidate(rules, messages)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  submit: util.throttle(async function (e) {
    console.log('表单参数', e.detail.value)
    // 传入表单数据，调用验证方法
    if (!this.validate.checkForm(e.detail.value)) {
      const error = this.validate.errorList[0]
      console.log('错误信息', error)
      wxp.showToast({
        title: error.msg,
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
      return false
    }
    await userStore.Login({
      username: e.detail.value.username,
      password: e.detail.value.password
    })
    wx.showToast({
      title: "登录成功",
      icon: "success",
      duration: 1500,
      mask: true,
      success: () => {
        setTimeout(function () {
          wx.switchTab({
            url: DefaultRoutePath,
          })
        }, 600)
      }
    })
  }, 1500)
})