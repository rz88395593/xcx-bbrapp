// pages/bankwater/bankwater.js

//获取应用实例
var app = getApp()
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bankaccountArray: [],
    bankaccountIndex: 0,

    cardtypeArray: [],
    cardtypeIndex: 0,
  },

  bindPickerChange: function(e) {
    let that = this
    let value = e.detail.value
    let type = e.currentTarget.dataset.type
    if (type === "bankaccount") {
      that.setData({
        bankaccountIndex: value
      })
    } else if (type === "cardtype") {
      that.setData({
        cardtypeIndex: value
      })
    }
  },

  bindDataInput: function(e) {
    let that = this
    let value = e.detail.value
    let type = e.currentTarget.dataset.type
    if (type === "") {
      that.setData({
        roomPostCode: value
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    that.setData({
      bankaccountArray: app.globalData.bankArray,
      cardtypeArray: app.globalData.cardtypeArray
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 返回
   */
  goBack: function() {
    wx.navigateBack({

    })
  }
})