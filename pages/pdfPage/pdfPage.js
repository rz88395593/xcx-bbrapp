// pages/pdfPage/pdfPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ios:true,
    url:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  bindNextStep:function(){
    let that = this
    let json = ""
    wx.navigateTo({
      url: '/pages/applyResult/applyResult' + '?jsonData=' + json,
    })
  }
})