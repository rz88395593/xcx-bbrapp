// pages/upload/upload.js

//获取应用实例
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageArray: [],
    imageWidth: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    if (options.jsonData !== undefined && options.jsonData !== null) {
      let jsonInfo = JSON.parse(options.jsonData)
      let title = jsonInfo.title
      let imageWidth = jsonInfo.imageWidth
      wx.setNavigationBarTitle({
        title: title,
      })
      that.setData({
        imageWidth: imageWidth
      })
    }
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 返回
   */
  goBack: function() {
    wx.navigateBack({

    })
  },

  previewImage: function(event) {
    let index = event.currentTarget.dataset.index
    let that = this
    let iamgeUrls = []
    let imageArray = that.data.imageArray
    for (let i = 0; i < imageArray.length; i++) {
      let iamgeInfo = imageArray[i]
      iamgeUrls.push(iamgeInfo.path)
    }
    wx.previewImage({
      current: iamgeUrls[index],
      urls: iamgeUrls
    })
  },

  /**
   * 选择图片
   */
  chooseImage: function(event) {
    var that = this
    let index = event.currentTarget.dataset.index
    let files = []
    wx.chooseImage({
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有 ['original', 'compressed']
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let filesArray = files.concat(res.tempFilePaths)
        console.log("选择图片数量files：" + filesArray.length)
        for (let i = 0; i < filesArray.length; i++) {
          let tempFilePaths = filesArray[i]
          that.changePhotoPagesData(index, tempFilePaths)
        }
      }
    })
  },

  /**
   * 拍照或者选完图片完修改数据
   */
  changePhotoPagesData: function(pageListIndex, paths) {
    var that = this
    let filesArray = that.data.imageArray
    filesArray.push({
      "path": paths,
      "isUpload": false
    });
    that.setData({
      imageArray: filesArray
    })
    // that.getImageUploadStatus()

    //缓存拍照图片
    // try {
    //   let takePhotoArray = wx.getStorageSync('takePhotoArray')
    //   if (app.stringFormat(takePhotoArray) !== "" && takePhotoArray.length > 0) {
    //     takePhotoArray.push({
    //       "path": paths,
    //       "isUpload": false,
    //       'title': that.data.typeArray[pageListIndex].title,
    //       'imgType': that.data.typeArray[pageListIndex].imgType,
    //     })
    //     wx.setStorageSync('takePhotoArray', takePhotoArray)
    //   } else {
    //     let imageInfo = [{
    //       "path": paths,
    //       "isUpload": false,
    //       'title': that.data.typeArray[pageListIndex].title,
    //       'imgType': that.data.typeArray[pageListIndex].imgType,
    //     }]
    //     wx.setStorageSync('takePhotoArray', imageInfo)
    //   }
    // } catch (e) {
    //   console.log(e)
    // }
  },

  /**
   *  修改图片上传状态
   */
  getImageUploadStatus: function() {
    let that = this
    for (let i = 0; i < that.data.typeArray.length; i++) {
      let imageInfo = that.data.typeArray[i]
      for (let j = 0; j < imageInfo.files.length; j++) {
        let imageObject = imageInfo.files[j]
        if (imageObject.isUpload === false) {
          imageInfo.uploadStatus = "待上传"
          break
        } else {
          imageInfo.uploadStatus = "已上传"
        }
      }
      that.setData({
        typeArray: that.data.typeArray
      })
    }

    that.updateStoragePhoto()
  },

  /**
   * 删除
   */
  removeImage: function(event) {
    var that = this
    let index = event.currentTarget.dataset.index
    let imageArray = that.data.imageArray
    imageArray.splice(index, 1)
    that.setData({
      imageArray: imageArray
    })
  },
})