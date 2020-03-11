// pages/contacts/contacts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewHeight: 0,

    contactsList: [{
      linerela: 0,
      linkname: "",
      phoneNumber: "",
      currency1: 0
    }, {
      linerela: 0,
      linkname: "",
      phoneNumber: "",
      currency1: 0
    }, {
      linerela: 0,
      linkname: "",
      phoneNumber: "",
      currency1: 0
    }, {
      linerela: 0,
      linkname: "",
      phoneNumber: "",
      currency1: 0
    }, {
      linerela: 0,
      linkname: "",
      phoneNumber: "",
      currency1: 0
    }],

    /**
     * 与投保人关系
     */
    linerelaArray: [{
      comcode: "1",
      comname: "配偶"
    }, {
      comcode: "2",
      comname: "父母"
    }, {
      comcode: "3",
      comname: "子女"
    }, {
      comcode: "4",
      comname: "同事"
    }, {
      comcode: "5",
      comname: "兄弟姐妹"
    }, {
      comcode: "8",
      comname: "朋友"
    }, {
      comcode: "9",
      comname: "其他"
    }],

    /**
     * 联系人名称
     */
    linkname: "",

    /**
     * 联系人电话号码
     */
    phoneNumber: "",

    /**
     * 贷款是否知情
     */
    currency1Array: [{
      comcode: "1",
      comname: "是"
    }, {
      comcode: "0",
      comname: "否"
    }]
  },

  bindPickerChange: function(e) {
    let that = this
    let value = e.detail.value
    let type = e.currentTarget.dataset.type
    let index = e.currentTarget.dataset.index
    let contactsInfo = that.data.contactsList[index]
    if (type === "linerela") {
      contactsInfo.linerela = value
    } else if (type === "currency1") {
      contactsInfo.currency1 = value
    }
    that.setData({
      contactsList: that.data.contactsList
    })
  },

  bindDataInput: function(e) {
    let that = this
    let value = e.detail.value
    let type = e.currentTarget.dataset.type
    let index = e.currentTarget.dataset.index
    let contactsInfo = that.data.contactsList[index]
    if (type === "linkname") {
      contactsInfo.linkname = value
    } else if (type === "phoneNumber") {
      contactsInfo.phoneNumber = value
    }
    that.setData({
      contactsList: that.data.contactsList
    })
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
      url: '/pages/uploadImage/uploadImage',
    })
  },
})