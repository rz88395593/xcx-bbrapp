// pages/bussinessAdd/bussinessAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comTypeArray: [{
      id: 'A',
      name: '农、林、牧、渔业'
    }, {
        id: 'B',
        name: '采矿业'
      }, {
        id: 'C',
        name: '制造业'
      }, {
        id: 'D',
        name: '电力、燃气及水的生产和供应业'
      }, {
        id: 'E',
        name: '建筑业'
      }, {
        id: 'F',
        name: '交通运输、仓储和邮政业'
      }, {
        id: 'G',
        name: '信息传输、计算机服务和软件业'
      }, {
        id: 'H',
        name: '批发和零售业'
      }, {
        id: 'I',
        name: '住宿和餐饮业'
      }, {
        id: 'J',
        name: '金融业'
      }, {
        id: 'K',
        name: '房地产业'
      }, {
        id: 'L',
        name: '租赁和商务服务业'
      }, {
        id: 'M',
        name: '科学研究、技术服务和地质勘查业'
      }, {
        id: 'N',
        name: '水利、环境和公共设施管理业'
      }, {
        id: 'O',
        name: '居民服务和其他服务业'
      }, {
        id: 'P',
        name: '教育业'
      }, {
        id: 'Q',
        name: '卫生、社会保障和社会福利业'
      }, {
        id: 'R',
        name: '文化、体育和娱乐业'
      }, {
        id: 'S',
        name: '公共管理和社会组织'
      }],
    comTypeIndex:0,
    comName:"",
    comCode:"",
    comZipCode:"",
    pickerWidth: 0,
  },
  bindComTypePickerChange: function (e) {
    this.setData({
      comTypeIndex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          pickerWidth: res.windowWidth * 0.6 - 40
        })
      },
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

  //输入框输入时赋值
  saveInput: function (e) {
    let that = this
    let type = e.currentTarget.dataset['type'];
    if (type == 'comname') {
      that.setData({
        comName: e.detail.value
      })
    } else if (type == 'comcode') {
      that.setData({
        comCode: e.detail.value
      })
    } else if (type == 'comzip') {
      that.setData({
        comZipCode: e.detail.value
      })
    }
  },
})