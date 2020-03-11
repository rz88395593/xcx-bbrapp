// pages/programme/programme.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 产品类型
     */
    productTypeArray: [{
      comcode: "",
      comname: ""
    }],
    productTypeIndex: 0,
    viewHeight: 0,

    /**
     * 贷款类型
     */
    loanNatureArray: [{
      comcode: "0",
      comname: "非追加贷款"
    }, {
      comcode: "1",
      comname: "追加贷款"
    }],
    loanNatureIndex: 0,

    /**
     * 业务来源
     */
    businessNatureArray: [{
      comcode: "1",
      comname: "直销展业"
    }, {
      comcode: "2",
      comname: "电话营销"
    }, {
      comcode: "3",
      comname: "客户转介绍"
    }, {
      comcode: "4",
      comname: "同业转介绍"
    }, {
      comcode: "5",
      comname: "寿险渠道"
    }, {
      comcode: "6",
      comname: "中介渠道"
    }, {
      comcode: "7",
      comname: "互联网引流业务"
    }, {
      comcode: "8",
      comname: "朋友介绍"
    }],
    businessNatureIndex: 0,

    /**
     * 放款银行
     */
    loanBankArray: [{
      comcode: "",
      comname: ""
    }],
    loanBankIndex: 0,

    /**
     * 贷款金额
     */
    loanAmount: "",

    /**
     * 贷款期数
     */
    applyPeriodArray: [{
      comcode: "",
      comname: ""
    }],
    applyPeriodIndex: 0,

    /**
     * 还款方式
     */
    payTypeArray: [{
      comcode: "1",
      comname: "等额本息"
    }],
    payTypeIndex: 0,

    /**
     * 缴费方式
     */
    repaidTypeArray: [{
      comcode: "10",
      comname: "期缴"
    }],
    repaidTypeIndex: 0,

    /**
     * 贷款用途
     */
    loanUsageArray: [{
      comcode: "01",
      comname: "经营用途"
    }, {
      comcode: "02",
      comname: "日常生活消费"
    }, {
      comcode: "03",
      comname: "购车"
    }, {
      comcode: "04",
      comname: "房屋装修"
    }, {
      comcode: "05",
      comname: "教育支出"
    }, {
      comcode: "06",
      comname: "旅游"
    }, {
      comcode: "99",
      comname: "其他"
    }],
    loanUsageIndex: 0,
  },

  bindPickerChange: function(e) {
    let that = this
    let value = e.detail.value
    let type = e.currentTarget.dataset.type
    if (type === "productType") {
      that.setData({
        productTypeIndex: value
      })
    } else if (type === "loanNature") {
      that.setData({
        loanNatureIndex: value
      })
    } else if (type === "businessNature") {
      that.setData({
        businessNatureIndex: value
      })
    } else if (type === "loanBank") {
      that.setData({
        loanBankIndex: value
      })
    } else if (type === "applyPeriod") {
      that.setData({
        applyPeriodIndex: value
      })
    } else if (type === "payType") {
      that.setData({
        payTypeIndex: value
      })
    } else if (type === "repaidType") {
      that.setData({
        repaidTypeIndex: value
      })
    } else if (type === "loanUsage") {
      that.setData({
        loanUsageIndex: value
      })
    }
  },

  bindDataInput: function(e) {
    let that = this
    let value = e.detail.value
    let type = e.currentTarget.dataset.type
    if (type === "loanAmount") {
      that.setData({
        loanAmount: value
      })
    }
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
      url: '/pages/elementary/elementary',
    })
  },
})