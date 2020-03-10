// pages/confirm/confirm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    confirmArray: [{
      listName: '贷款方案',
      show: true,
      item: [{
        name: "产品类型",
        value: ""
      }, {
        name: "贷款类型",
        value: ""
      }, {
        name: "放款银行",
        value: ""
      }, {
        name: "贷款金额",
        value: ""
      }, {
        name: "贷款期数",
        value: ""
      }, {
        name: "还款方式",
        value: ""
      }, {
        name: "缴费方式",
        value: ""
      }, {
        name: "贷款用途",
        value: ""
      }, {
        name: "业务来源",
        value: ""
      }]
    }, {
      listName: '基本信息',
      show: true,
      item: [{
        name: "身份信息",
        value: "",
        head: ""
      }, {
        name: "姓名",
        value: ""
      }, {
        name: "手机号",
        value: ""
      }, {
        name: "身份证号",
        value: ""
      }, {
        name: "户口所在地",
        value: ""
      }, {
        name: "婚姻状况",
        value: ""
      }, {
        name: "文化程度",
        value: ""
      }, {
        name: "常驻地址",
        value: "",
        head: ""
      }, {
        name: "来此地时间",
        value: ""
      }, {
        name: "房屋类型",
        value: ""
      }, {
        name: "邮编",
        value: ""
      }, {
        name: "现住地址",
        value: ""
      }, {
        name: "是否本地居民",
        value: ""
      }]
    }, {
      listName: '工作与财力',
      show: true,
      item: [{
        name: "工作单位与收入",
        value: "",
        head: ""
      }, {
        name: "工作单位",
        value: ""
      }, {
        name: "单位地址",
        value: ""
      }, {
        name: "单位电话",
        value: ""
      }, {
        name: "职务级别",
        value: ""
      }, {
        name: "入职时间",
        value: ""
      }, {
        name: "发薪时间",
        value: ""
      }, {
        name: "发薪方式",
        value: "",
      }, {
        name: "近一年月均工资收入",
        value: ""
      }, {
        name: "家庭年收入",
        value: ""
      }, {
        name: "近一年月均非工资收入",
        value: ""
      }, {
        name: "公积金/社保证明",
        value: "",
        head: ""
      }, {
        name: "公积金缴费基数",
        value: ""
      }, {
        name: "公积金月缴存额",
        value: ""
      }, {
        name: "公积金缴存单位",
        value: ""
      }, {
        name: "社保缴费基数",
        value: ""
      }, {
        name: "社保缴存单位",
        value: ""
      }, {
        name: "房产证明",
        value: "",
        head: ""
      }, {
        name: "房屋地址",
        value: ""
      }, {
        name: "房产价格",
        value: ""
      }, {
        name: "建筑面积",
        value: ""
      }, {
        name: "购房时间",
        value: ""
      }, {
        name: "房屋商业月供",
        value: ""
      }, {
        name: "房屋公积金月供",
        value: ""
      }, {
        name: "车辆证明",
        value: "",
        head: ""
      }, {
        name: "车辆保险起期",
        value: ""
      }, {
        name: "车险保额",
        value: ""
      }, {
        name: "车辆投保公司",
        value: ""
      }, {
        name: "保单证明",
        value: "",
        head: ""
      }, {
        name: "保险金额",
        value: ""
      }, {
        name: "保单种类",
        value: ""
      }, {
        name: "保单缴费方式",
        value: ""
      }, {
        name: "保单生效起始时间",
        value: ""
      }, {
        name: "保单缴费起始时间",
        value: ""
      }, {
        name: "保单年缴费额",
        value: ""
      }, {
        name: "信用卡证明",
        value: "",
        head: ""
      }, {
        name: "发卡银行",
        value: ""
      }, {
        name: "账单日",
        value: ""
      }, {
        name: "授信额度",
        value: ""
      }, {
        name: "发卡日期",
        value: ""
      }, {
        name: "近六个月月均使用额度",
        value: ""
      }, {
        name: "已使用额度",
        value: ""
      }]
    }, {
      listName: '联系人信息',
      show: true,
      item: [{
        name: "姓名",
        relation: "与贷款人关系",
        phone: "手机号码",
        knowing: "贷款知情"
      }]
    }, {
      listName: '本次贷款争议处理方式为诉讼',
      show: true,
      item: []
    }],
    isSelect: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
   * 点击最外层列表展开收起
   */
  confirmTap: function(e) {
    console.log('触发了最外层');
    //获取点击的下标值
    let index = e.currentTarget.dataset.parentindex
    let confirmArray = this.data.confirmArray;
    confirmArray[index].show = !confirmArray[index].show || false;
    this.setData({
      confirmArray: confirmArray
    });
  },

  /**
   * 确认同意
   */
  selectConfirmImage: function(e) {
    let that = this
    that.data.isSelect = !that.data.isSelect
    that.setData({
      isSelect: that.data.isSelect
    })
  }
})