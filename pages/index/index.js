// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  *  下一步
  */
  bindNextStep:function(){
      let that = this
      let url = app.globalData.baseUrl + ''
      let data = {
        id: "",
      }
      let dataStr = JSON.stringify(data);
      console.log('获取入参为：');
      console.log(dataStr);
      let encrypt = app.aesEncrypt(dataStr);
      wx.showLoading({
        icon: "loading",
        title: "加载中...",
        mask: true
      })
      wx.request({
        url: url,
        method: "POST",
        data: {
          "data": encrypt
        },
        success: function (res) {
          wx.hideLoading()
          console.log("获取成功：")
          console.log(res)
          let data = res.data
          let code = ""
          let result = "抱歉！服务器暂时没有响应，请稍后重试"
          if (data !== undefined && data !== "") {
            if (data.code === '200') {
              let info = data.result.result
             
            } else {
              wx.hideLoading()
              wx.showModal({
                title: "提示",
                content: result,
                showCancel: false,
                success(res) {
                  if (res.confirm) {

                  } else if (res.cancel) {

                  }
                }
              })
            }
          } else {
            if (res.statusCode == 200) {

            }
          }

        },
        fail: function (err) {
          wx.hideLoading()
          console.log("获取失败：")
          console.log(err)
          let errMsg = err.errMsg
          if (errMsg !== undefined && errMsg !== null) {
            console.log(errMsg)
            if (errMsg === "request:fail timeout") {
              errMsg = "抱歉！请求超时，请稍后重试"
            } else { //if (errMsg === "request:fail ")
              errMsg = "网络请求失败，请检查您的网络设置"
            }
            wx.showModal({
              title: "提示",
              content: errMsg,
              showCancel: false,
              success(res) {
                if (res.confirm) {

                } else if (res.cancel) {

                }
              }
            })
          } else {
            wx.showModal({
              title: "提示",
              content: "网络请求失败，请检查您的网络设置",
              showCancel: false,
              success(res) {
                if (res.confirm) {

                } else if (res.cancel) {

                }
              }
            })
          }
        }
      })
  }
})