// pages/idcardOcr/idcardOcr.js
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
    personPhone:""
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