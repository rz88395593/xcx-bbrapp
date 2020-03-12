// pages/idcardOcr/idcardOcr.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardName:"",
    cardNumber: "",
    cardAddress: "",
    cardCom: "",
    cardDate: "",
    submitJson:[],
    personPhone:"",

    //验证码 设置初始的状态、包含字体、颜色、还有等待事件 
    sendTime: '获取验证码',
    sendColor: '#363636',
    snsMsgWait: 60,

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
  // 获取验证码
  sendCode: function () {
    let that = this
    let personPhone = that.data.personPhone
    // if (app.stringFormat(personPhone) === "") {
    //   wx.showModal({
    //     title: "提示",
    //     content: "请输入手机号码",
    //     showCancel: false,
    //     success(res) {
    //       if (res.confirm) {

    //       }
    //     }
    //   })
    //   return
    // }
    // if (!util.isPoneAvailable(that.data.personPhone)) {
    //   wx.showModal({
    //     title: "提示",
    //     content: "请确认手机号码是否正确",
    //     showCancel: false,
    //     success(res) {
    //       if (res.confirm) { }
    //     }
    //   })
    //   return
    // }
    that.sendButtonChange()
    that.sendMessage()
  },
  /**
 * 60秒后重新获取验证码
 */
  sendButtonChange: function () {
    let that = this
    var inter = setInterval(function () {
      that.setData({

        smsFlag: true,
        sendColor: '#cccccc',
        sendTime: that.data.snsMsgWait + 's后重发',
        snsMsgWait: that.data.snsMsgWait - 1
      });
      if (that.data.snsMsgWait < 0) {
        clearInterval(inter)
        that.setData({
          sendColor: '#363636',
          sendTime: '获取验证码',
          snsMsgWait: 60,
          smsFlag: false
        });
      }
    }.bind(this), 1000);
  },
  //输入框输入时赋值
  saveInput: function (e) {
    let that = this
    let type = e.currentTarget.dataset['type'];
    if (type == 'name') {
      that.setData({
        cardName: e.detail.value
      })
      that.data.submitJson.idName = e.detail.value
    } else if (type == 'idcard') {
      that.setData({
        cardNumber: e.detail.value
      })
      that.data.submitJson.idNumber = e.detail.value
    } else if (type == 'address') {
      that.setData({
        cardAddress: e.detail.value
      })
      that.data.submitJson.idAddress = e.detail.value
    } else if (type == 'com') {
      that.setData({
        cardCom: e.detail.value
      })
      that.data.submitJson.idOffice = e.detail.value
    } else if (type == 'date') {
      that.setData({
        cardDate: e.detail.value
      })
      that.data.submitJson.idDate = e.detail.value
    } else if (type == 'phone') {
      that.setData({
        personPhone: e.detail.value
      })
      that.data.submitJson.phone = e.detail.value
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
 * 发送短信
 */
  sendMessage: function () {
    let that = this
    let personPhone = that.data.personPhone
    let url = app.globalData.baseUrl 
    wx.showLoading({
      icon: "loading",
      title: "加载中...",
      mask: true
    })
    wx.request({
      url: url,
      method: "POST",
      success: (res) => {
        wx.hideLoading()
        console.log("发送验证码成功")
        console.log(res)
        let data = res.data
        let code = ""
        let result = "抱歉！发送验证码失败，请稍后重试"
        if (data !== undefined && data !== "") {
          if (data.message === undefined && data.message === null) { } else {
            let info = data.result
          }
        } else {
          if (res.statusCode == 200) { }
        }
        if (code === '200') {
          wx.showToast({
            title: '发送验证码成功',
            icon: 'none',
            duration: 2000
          })
          that.sendButtonChange()
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
        console.log("发送短信失败")
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
  bindNextStep(){
    let that = this
    // if (that.data.cardName == "") {
    //   wx.showModal({
    //     title: "提示",
    //     content: "请输入姓名",
    //     showCancel: false,
    //     success(res) {
    //       if (res.confirm) { }
    //     }
    //   })
    //   return
    // } else if (that.data.cardNumber == "") {
    //   wx.showModal({
    //     title: "提示",
    //     content: "请输入身份证号",
    //     showCancel: false,
    //     success(res) {
    //       if (res.confirm) { }
    //     }
    //   })
    //   return
    // } else if (that.data.cardAddress == "") {
    //   wx.showModal({
    //     title: "提示",
    //     content: "请输入身份证地址",
    //     showCancel: false,
    //     success(res) {
    //       if (res.confirm) { }
    //     }
    //   })
    //   return
    // } else if (that.data.cardCom == "") {
    //   wx.showModal({
    //     title: "提示",
    //     content: "请输入身份证发证机关",
    //     showCancel: false,
    //     success(res) {
    //       if (res.confirm) { }
    //     }
    //   })
    //   return
    // } else if (that.data.cardDate == "") {
    //   wx.showModal({
    //     title: "提示",
    //     content: "请输入身份证有效期限",
    //     showCancel: false,
    //     success(res) {
    //       if (res.confirm) { }
    //     }
    //   })
    //   return
    // }
    let json = that.data.submitJson
    console.log(json)
    wx.navigateTo({
      url: '/pages/marriageInfoPage/marriageInfoPage' + '?jsonData=' + json,
    })
  }

})