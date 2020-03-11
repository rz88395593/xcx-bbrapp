// pages/elementary/elementary.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewHeight: 0,
    nowDate: "",

    /**
     * 文化程度
     */
    educationArray: [{
      comcode: "10",
      comname: "研究生及以上"
    }, {
      comcode: "20",
      comname: "大学本科"
    }, {
      comcode: "30",
      comname: "大专"
    }, {
      comcode: "40",
      comname: "中专"
    }, {
      comcode: "60",
      comname: "高中"
    }, {
      comcode: "70",
      comname: "初中及以下"
    }],
    educationIndex: 0,

    /**
     * 来此地时间
     */
    comeTime: "",

    /**
     * 房屋类型
     */
    roomTypeArray: [{
      comcode: "1",
      comname: "自有"
    }, {
      comcode: "2",
      comname: "配偶所有"
    }, {
      comcode: "3",
      comname: "其他亲属"
    }, {
      comcode: "4",
      comname: "租用"
    }, {
      comcode: "5",
      comname: "单位住房"
    }, {
      comcode: "6",
      comname: "其他"
    }],
    roomTypeIndex: 0,

    /**
     * 邮编
     */
    roomPostCode: "",

    /**
     * 现住地址
     */
    roomAddress: "",

    /**
     * 是否本地居民
     */
    localArray: [{
      comcode: "1",
      comname: "是"
    }, {
      comcode: "0",
      comname: "否"
    }],
    localIndex: 0,
  },

  bindPickerChange: function(e) {
    let that = this
    let value = e.detail.value
    let type = e.currentTarget.dataset.type
    if (type === "education") {
      that.setData({
        educationIndex: value
      })
    } else if (type === "comeTime") {
      that.setData({
        comeTime: value
      })
    } else if (type === "roomType") {
      that.setData({
        roomTypeIndex: value
      })
    } else if (type === "local") {
      that.setData({
        localIndex: value
      })
    }
  },

  bindDataInput: function(e) {
    let that = this
    let value = e.detail.value
    let type = e.currentTarget.dataset.type
    if (type === "roomPostCode") {
      that.setData({
        roomPostCode: value
      })
    } else if (type === "roomAddress") {
      that.setData({
        roomAddress: value
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let nowDate = util.formatDate(new Date())
    that.setData({
      nowDate: nowDate,
      comeTime: nowDate
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
    let that = this
    that.setData({
      viewHeight: wx.getSystemInfoSync().windowHeight - (wx.getSystemInfoSync().windowWidth / 750 * (60 * 2 + 64 * 2)),
    })
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
      url: '/pages/workingfinancial/workingfinancial',
    })
  },
})