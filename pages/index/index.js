// pages/index/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userImage: "",
    userName: "",
    gridsArray: [{
      title: '征信查询',
      userName: "",
      targetUrl: '/pages/bindManager/bindManager',
      image: '/image/home_client.png',
      num: 0
    }, {
      title: '进度查询',
        targetUrl: '/pages/progressList/progressList',
        image: '/image/home_afterloan.png',
      num: 0
    }],
    background: [{
      src: "/image/home_banner.png"
    }
    ],
    indicatorDots: true,
    vertical: false,
    interval: 3000,
    duration: 1000,
    loading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.wxLogin("")
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
   * 微信授权
   */
  getUserInfo: function () {
    let that = this
    that.wxLogin("")
  },
  /**
     * 微信登录
     */
  wxLogin: function (type) {
    let that = this
    //检查登录态是否过期
    wx.checkSession({
      success() {
        // session_key 未过期，并且在本生命周期一直有效
        console.log("session_key未过期")
        let jsCode = wx.getStorageSync('jsCode')
        if (app.stringFormat(jsCode) !== "") {
          that.getWXlogin(type)
        } else {
          that.getWXlogin(type)
        }
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        //重新登录
        console.log("session_key已经失效")
        that.getWXlogin(type)
      }
    })
  },
  /**
  * 微信登录
  */
  getWXlogin: function (type) {
    let that = this
    wx.login({
      success(res) {
        if (res.code) {
          console.log('登录成功，' + res.code)
          that.getWXUser()
          
        } else {
          console.log('登录失败，' + res.errMsg)
        }
      },
      fail(err) {
        console.log(err)
        let errMsg = err.errMsg
        if (errMsg !== undefined && errMsg !== null) {
          console.log(errMsg)
          if (errMsg === "login:fail timeout") {
            errMsg = "抱歉！请求超时，请稍后重试"
          } else { //if (errMsg === "login:fail ")
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
  },
  /**
   * 获取微信用户信息/微信授权
   */
  getWXUser: function () {
    let that = this
    // 查看是否授权
    wx.getSetting({
      success: (res) => {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          that.setData({
            loading: true
          })
          /**
           * 获取微信用户信息/微信授权
           */
          wx.getUserInfo({
            success: function (res) {
              console.log("微信用户信息：")
              console.log(res)
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country
              that.setData({
                userName: nickName,
                userImage: avatarUrl
              })
            }
          })
        } else {
          that.setData({
            loading: false
          })
        }
      },
      fail: (res) => {
        console.log("失败");
        console.log(res);
      }
    })
  },

})