// pages/progressList/progressList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [{}, {}],
    showCountAll: 0,
    hideHeader: false, //头部刷新
    hideBottom: false, //底部刷新
    stopRefreshTiem: false, //判断多次刷新判断使用 
    stopLoadMoreTiem: false, //判断多次加载更多判断使用
  },

  touchStart: function (e) {
    // console.log(e.touches[0].pageX)
    let sx = e.touches[0].pageX
    let sy = e.touches[0].pageY
    this.data.touchS = [sx, sy]
  },
  /**
   * 判断下滑进行刷新
   */
  touchMove: function (event) {
    let that = this;
    var currentX = event.touches[0].pageX
    var currentY = event.touches[0].pageY
    var tx = currentX - this.data.touchS[0]
    var ty = currentY - this.data.touchS[1]
    // this.data.touchE = [sx, sy]
    //左右方向滑动
    var text = ""
    if (Math.abs(tx) > Math.abs(ty)) {
      if (tx < 0) {
        text = "向左滑动"
      } else if (tx > 0) {
        text = "向右滑动"
      }
    }
    //上下方向滑动
    else {
      if (ty < 0) {
        text = "向上滑动"
      } else if (ty > 100) {
        text = "向下滑动"
        that.initNetData();
      }
    }
    // //将当前坐标进行保存以进行下一次计算
    // this.data.lastX = currentX
    // this.data.lastY = currentY
  },
  touchEnd: function (e) { },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      // scrollHeight: wx.getSystemInfoSync().windowHeight - (wx.getSystemInfoSync().windowWidth / 750 * 280),
      scrollHeight: wx.getSystemInfoSync().windowHeight,
    })
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

  //加载更多
  loadMoreData: function () {
    var that = this;
    if (that.stopLoadMoreTiem) {
      return;
    }
    if (that.data.showCountAll == that.data.managerList.length) {
      return;
    }
    that.setData({
      hideBottom: true, //底部刷新控件隐藏
      stopLoadMoreTiem: true
    });
    that.getDataListData();
  },
  /**
   * 获取保单数据
   */
  getDataListData: function () {

  },
  /**
   * 绑定展业岗 存储数据
   */
  nextStep: function () {
    let json = ""
    wx.navigateTo({
      url: '/pages/loanProgress/loanProgress' + '?jsonData=' + json,
    })
  }
})