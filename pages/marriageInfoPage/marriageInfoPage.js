// pages/marriageInfoPage/marriageInfoPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerWidth: 0,
    marriageStatusArray: [{
      id: '10',
      name: '未婚'
    }, {
      id: '20',
      name: '已婚'
    }, {
      id: '30',
      name: '丧偶'
    }, {
      id: '41',
      name: '离异'
    }], //婚姻状况
    marriageStatusIndex: 0,
    detailed: "",
    spouseName: "",
    spouseCard: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          pickerWidth: res.windowWidth * 0.6 - 40
        })
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
  //输入框输入时赋值
  saveInput: function(e) {
    let that = this
    let type = e.currentTarget.dataset['type'];
    if (type == 'spousename') {
      that.setData({
        spouseName: e.detail.value
      })
    } else if (type == 'spousecard') {
      that.setData({
        spouseCard: e.detail.value
      })
    }
  },
  bindMarriageStatusPickerChange: function(e) {
    this.setData({
      marriageStatusIndex: e.detail.value
    })
  },
  //省市联动
  bindRegionChange: function(e) {
    var that = this
    //为了让选择框有个默认值，    
    that.setData({
      clas: ''
    })　　　 //下拉框所选择的值
    console.log('picker发送选择改变，携带值为', e.detail.value)

    this.setData({
      //拼的字符串传后台
      detailed: e.detail.value[0] + " " + e.detail.value[1] + " " + e.detail.value[2],
      //下拉框选中的值
      region: e.detail.value
    })

    this.setData({
      "AddSite.area": e.detail.value[0] + " " + e.detail.value[1] + " " + e.detail.value[2]
    })
    console.log(this.data.AddSite)
  },
  /**
   * 提交小贷审核
   */
  queryMsgData: function() {
    let that = this
    let uploadPhone = that.data.uploadPhone
    let url = app.globalData.baseUrl + ''
    let data = {
      operatecode: "",
      managerCode: "",
      comcode: "",
      marryStatus: "",
      spouseName: "",
      spouseNumber: "",
      phone: "",

      idName: "",
      idNumber: "",
      idAddress: "",
      idOffice: "",
      idDate: "",
      idOCRName: "",
      idOCRNumber: "",
      idOCRAddress: "",
      idOCROffice: "",
      idOCRDate: "",

      facePath: "",
      backPath: ""
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
        console.log("请求成功")
        console.log(res)
        let data = res.data
        let code = ""
        let result = "抱歉！请求失败，请稍后重试"
        if (data !== undefined && data !== "") {
          if (data.message === undefined && data.message === null) {} else {}
        } else {
          if (res.statusCode == 200) {}
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
  bindManager:function(){
    let json = ""
    wx.navigateTo({
      url: '/pages/bindManager/bindManager' + '?jsonData=' + json,
    })
  },
  bindNextStep() {
    let that = this
    // if (that.data.spouseName == "") {
    //   wx.showModal({
    //     title: "提示",
    //     content: "请输入配偶姓名",
    //     showCancel: false,
    //     success(res) {
    //       if (res.confirm) {}
    //     }
    //   })
    //   return
    // } else if (that.data.spouseCard == "") {
    //   wx.showModal({
    //     title: "提示",
    //     content: "请输入配偶身份证号",
    //     showCancel: false,
    //     success(res) {
    //       if (res.confirm) {}
    //     }
    //   })
    //   return
    // } else if (that.data.detailed == "") {
    //   wx.showModal({
    //     title: "提示",
    //     content: "请选择常驻地址",
    //     showCancel: false,
    //     success(res) {
    //       if (res.confirm) {}
    //     }
    //   })
    //   return
    // }
    let json = ""
    wx.navigateTo({
      url: '/pages/faceIdentity/faceIdentity' + '?jsonData=' + json,
    })
  }
})