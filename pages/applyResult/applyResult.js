// pages/applyResult/applyResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    promotMsg:"结果",
    promotDetailMsg:"提示详情"
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

  bindNextStep: function () {
    let json = ""
    wx.navigateTo({
      url: '/pages/programme/programme' + '?jsonData=' + json,
    })
  }
})