// pages/loanProgress/loanProgress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    progressData: [{
      "node": "fail"
    }, {
      "node": "pass"
    },
    {
      "node": "going"
    },
    {
      "node": "no"
    }]
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
  /**
    * 跳转工商或出单
    */
  nextStep: function () {
    let json = ""
    wx.navigateTo({
      url: '/pages/bussinessAdd/bussinessAdd' + '?jsonData=' + json,
    })
  }
})