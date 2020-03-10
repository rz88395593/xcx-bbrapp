// pages/bussinessRecover/bussinessRecover.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comTypeArray: [{
      id: '1110',
      name: '国有企业'
    }, {
      id: '4100',
      name: '国有事业'
    }, {
      id: '1121',
      name: '三资企业'
    }, {
      id: '4500"',
      name: '私营企业'
    }, {
      id: '4550',
      name: '股份制企业'
    }, {
      id: '4200',
      name: '社会团体'
    }, {
      id: '9999',
      name: '个体工商户'
    }, {
      id: '1120',
      name: '外商投资'
    }, {
      id: '2000',
      name: '其他'
    }],
    comTypeIndex: 0,
    comName:"",
    detailed: "",
    pickerWidth:0
  },
  bindComTypePickerChange: function(e) {
    this.setData({
      comTypeIndex: e.detail.value
    })
  },
  //省市联动
  bindRegionChange: function (e) {
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  //输入框输入时赋值
  saveInput: function (e) {
    let that = this
    let type = e.currentTarget.dataset['type'];
    if (type == 'comname') {
      that.setData({
        comName: e.detail.value
      })
    } 
  },

})