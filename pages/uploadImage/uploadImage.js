// pages/uploadImage/uploadImage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageArray: [{
      number: 0,
      title: "保单证明",
      image: "/image/addImage.png"
    }, {
      number: 0,
      title: "身份证明",
      image: "/image/addImage.png"
    }, {
      number: 0,
      title: "居住证明",
      image: "/image/addImage.png"
    }, {
      number: 0,
      title: "个人征信查询授权委托书",
      image: "/image/addImage.png"
    }, {
      number: 0,
      title: "小微金融风险信息共享平台查询授权书",
      image: "/image/addImage.png"
    }],
    rootHeight: 0,
    imageWidth: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.getSystemInfo({
      success: function(res) {
        let width = res.windowWidth
        that.setData({
          imageWidth: parseInt((width - 4 * 20) / 3)
        })

        let imageArray = that.data.imageArray
        if (imageArray !== undefined && imageArray !== null && imageArray.length > 0) {
          console.log(parseInt(imageArray.length % 3))
          let rowOne = parseInt(imageArray.length / 3)
          let rowTwo = imageArray.length % 3 > 0 ? 1 : 0
          let row = rowOne + rowTwo
          that.setData({
            rootHeight: row * (that.data.imageWidth + 60)
          })
        }
      },
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
   * 下一步
   */
  nextStep: function() {
    wx.navigateTo({
      url: '/pages/confirm/confirm',
    })
  },


  /**
   * 上传影像
   */
  upload: function(e) {
    let that = this
    let imageArray = that.data.imageArray
    let index = e.target.dataset.index
    let json = imageArray[index]
    json.imageWidth = that.data.imageWidth
    let jsonString = JSON.stringify(json)
    wx.navigateTo({
      url: '/pages/upload/upload?jsonData=' + jsonString,
    })
  },

})