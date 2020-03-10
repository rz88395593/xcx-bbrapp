// pages/bankOcr/bankOcr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bankName:"",
    bandCard:""
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
  //输入框输入时赋值
  saveInput: function (e) {
    let that = this
    let type = e.currentTarget.dataset['type'];
    if (type == 'name') {
      that.setData({
        bankName: e.detail.value
      })
    } else if (type == 'card') {
      that.setData({
        bankCard: e.detail.value
      })
    }
  },
  //图片选择
  showImageType: function (e) {
    let that = this
    let type = e.currentTarget.dataset['type'];
    wx.showActionSheet({
      itemList: ['拍照', '从相册中选择'],
      success: function (res) {
        if (res.tapIndex == 0) {
          that.chooseImageOnCamera(type)
        } else if (res.tapIndex == 1) {
          that.chooseImageOnAlbum(type)
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  chooseImageOnCamera: function (cardType) {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera'],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths
        let filePath = tempFilePaths[0]
        // that.ocrService("idCardOcrService", filePath, cardType)
      },
      fail: function (error) {
        console.log('相机打开错误：' + error.data)
      }
    })
  },
  chooseImageOnAlbum: function (cardType) {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths
        let filePath = tempFilePaths[0]
        // that.ocrService("idCardOcrService", filePath, cardType)
      },
      fail: function (error) {
        console.log('相册选择错误：' + error.data)
      }
    })
  },
  /**
    * 银行
    */
  request: function () {
    let that = this
    let uploadPhone = that.data.uploadPhone
    let url = app.globalData.baseUrl + ''
    let data = {
    } 
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
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        wx.hideLoading()
        console.log("查询成功")
        console.log(res)
        let data = res.data
        let code = ""
        let result = "抱歉！查询失败，请稍后重试"
        if (data !== undefined && data !== "") {
          if (data.message === undefined && data.message === null) { } else {
          }
        } else {
          if (res.statusCode == 200) { }
        }
        if (code === '200') {
          wx.showToast({
            title: '请求成功',
            icon: 'none',
            duration: 2000
          })
          //
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
      },
      fail: (err) => {
        wx.hideLoading()
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
    });
  },
  bindNextStep() {
    let that = this
    // if (that.data.bandCard == "") {
    //   wx.showModal({
    //     title: "提示",
    //     content: "请输入银行名称",
    //     showCancel: false,
    //     success(res) {
    //       if (res.confirm) { }
    //     }
    //   })
    //   return
    // } else if (that.data.bankName == "") {
    //   wx.showModal({
    //     title: "提示",
    //     content: "请输入银行卡号",
    //     showCancel: false,
    //     success(res) {
    //       if (res.confirm) { }
    //     }
    //   })
    //   return
    // } 
    let json = ""
    wx.navigateTo({
      url: '/pages/pdfPage/pdfPage' + '?jsonData=' + json,
    })
  }
})