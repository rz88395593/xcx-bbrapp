// pages/workingfinancial/workingfinancial.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productTypeArray: [{
      comcode: "",
      comname: ""
    }],
    productTypeIndex: 0,
    bankWaterArray: [{
      item: [{
        name: "开户行",
        value: ""
      }, {
        name: "银行卡号",
        value: ""
      }, {
        name: "流水月份",
        value: ""
      }, {
        name: "金额",
        value: ""
      }]
    }, {
      item: [{
        name: "开户行",
        value: ""
      }, {
        name: "银行卡号",
        value: ""
      }, {
        name: "流水月份",
        value: ""
      }, {
        name: "金额",
        value: ""
      }]
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
   * 下一步
   */
  nextStep: function() {
    wx.navigateTo({
      url: '/pages/contacts/contacts',
    })
  },

  /**
   * 银行流水
   */
  gotoBankWater: function() {
    wx.navigateTo({
      url: '/pages/bankwater/bankwater',
    })
  },
})