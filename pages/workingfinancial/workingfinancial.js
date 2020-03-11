// pages/workingfinancial/workingfinancial.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewHeight: 0,
    nowDate: "",

    /**
     * 单位电话
     */
    unitPhoneNumber: "",

    /**
     * 职务级别
     */
    dutyLevelArray: [{
      comcode: "301",
      comname: "机关事业单位厅局级以上"
    }, {
      comcode: "302",
      comname: "机关事业单位处级"
    }, {
      comcode: "303",
      comname: "机关事业单位科级"
    }, {
      comcode: "304",
      comname: "机关事业单位其他"
    }, {
      comcode: "307",
      comname: "企业一般职员"
    }, {
      comcode: "308",
      comname: "企业其他"
    }, {
      comcode: "401",
      comname: "机关事业单位厅局级"
    }, {
      comcode: "404",
      comname: "机关事业单位一般工作人员"
    }, {
      comcode: "406",
      comname: "企业公司级管理人员"
    }, {
      comcode: "407",
      comname: "企业部门级管理人员"
    }, {
      comcode: "408",
      comname: "企业初级管理人员"
    }, {
      comcode: "411",
      comname: "无工作单位"
    }, {
      comcode: "999",
      comname: "企业其他"
    }],
    dutyLevelIndex: 0,

    /**
     * 入职时间
     */
    entryDate: "",

    /**
     * 发薪时间
     */
    payTimeArray: [{
      comcode: "1",
      comname: "1日"
    }, {
      comcode: "2",
      comname: "2日"
    }, {
      comcode: "3",
      comname: "3日"
    }, {
      comcode: "4",
      comname: "4日"
    }, {
      comcode: "5",
      comname: "5日"
    }, {
      comcode: "6",
      comname: "6日"
    }, {
      comcode: "7",
      comname: "7日"
    }, {
      comcode: "8",
      comname: "8日"
    }, {
      comcode: "9",
      comname: "9日"
    }, {
      comcode: "10",
      comname: "10日"
    }, {
      comcode: "11",
      comname: "11日"
    }, {
      comcode: "12",
      comname: "12日"
    }, {
      comcode: "13",
      comname: "13日"
    }, {
      comcode: "14",
      comname: "14日"
    }, {
      comcode: "15",
      comname: "15日"
    }, {
      comcode: "16",
      comname: "16日"
    }, {
      comcode: "17",
      comname: "17日"
    }, {
      comcode: "18",
      comname: "18日"
    }, {
      comcode: "19",
      comname: "19日"
    }, {
      comcode: "20",
      comname: "20日"
    }, {
      comcode: "21",
      comname: "21日"
    }, {
      comcode: "22",
      comname: "22日"
    }, {
      comcode: "23",
      comname: "23日"
    }, {
      comcode: "24",
      comname: "24日"
    }, {
      comcode: "25",
      comname: "25日"
    }, {
      comcode: "26",
      comname: "26日"
    }, {
      comcode: "27",
      comname: "27日"
    }, {
      comcode: "28",
      comname: "28日"
    }, {
      comcode: "29",
      comname: "29日"
    }, {
      comcode: "30",
      comname: "30日"
    }, {
      comcode: "31",
      comname: "31日"
    }],
    payTimeIndex: 0,

    /**
     * 发薪方式
     */
    payTypeArray: [{
      comcode: "1",
      comname: "现金"
    }, {
      comcode: "2",
      comname: "银行转账"
    }, {
      comcode: "9",
      comname: "其他"
    }],
    payTypeIndex: 0,

    /**
     * 近一年月均工资收入
     */
    selfMonthIncome: "",

    /**
     * 家庭年收入
     */
    homeYearIncome: "",

    /**
     * 近一年月均非工资收入
     */
    monthIncome: "",

    bankWaterArray: [{
      item: [{
        name: "开户行",
        value: ""
      }, {
        name: "银行卡号",
        value: ""
      }, {
        name: "流水月份",
        value: ""
      }, {
        name: "金额",
        value: ""
      }]
    }, {
      item: [{
        name: "开户行",
        value: ""
      }, {
        name: "银行卡号",
        value: ""
      }, {
        name: "流水月份",
        value: ""
      }, {
        name: "金额",
        value: ""
      }]
    }],

    /**
     * 公积金缴费基数
     */
    compayBasic: "",

    /**
     * 公积金月缴存额
     */
    mouthDeposit: "",

    /**
     * 公积金缴存单位
     */
    compayUnit: "",

    /**
     * 社保缴存基数
     */
    socialPayBasic: "",

    /**
     * 社保缴存单位
     */
    socialPayUnit: "",

    /**
     * 房产地址
     */
    address: "",

    /**
     * 房产价格
     */
    rate: "",

    /**
     * 房产面积
     */
    acreage: "",

    /**
     * 购房时间
     */
    paydate: "",

    /**
     * 房屋商业月供
     */
    commonthly: "",

    /**
     * 房屋公积金月供
     */
    publicmonthly: "",

    /**
     * 车辆保险起期
     */
    startDate: "",

    /**
     * 车险保额
     */
    coverage: "",

    /**
     * 车辆投保公司
     */
    companyArray: [{
      comcode: "人保财险",
      comname: "人保财险"
    }, {
      comcode: "平安财险",
      comname: "平安财险"
    }, {
      comcode: "太平洋财险",
      comname: "太平洋财险"
    }, {
      comcode: "国寿财险",
      comname: "国寿财险"
    }, {
      comcode: "其他",
      comname: "其他"
    }],
    companyIndex: 0,

    /**
     * 保险金额
     */
    payment: "",

    /**
     * 保单种类
     */
    kindArray: [{
      comcode: "01",
      comname: "两全保险"
    }, {
      comcode: "02",
      comname: "终身寿险"
    }, {
      comcode: "03",
      comname: "养老保险"
    }, {
      comcode: "04",
      comname: "分红保险"
    }, {
      comcode: "05",
      comname: "重疾保险"
    }, {
      comcode: "06",
      comname: "其他"
    }],
    kindIndex: 0,

    /**
     * 保单缴费方式
     */
    modeArray: [{
      comcode: "1",
      comname: "趸缴"
    }, {
      comcode: "2",
      comname: "月缴"
    }, {
      comcode: "3",
      comname: "年缴"
    }],
    modeIndex: 0,

    /**
     * 保单生效起始时间
     */
    insuranceStartDate: "",

    /**
     * 保单缴费起始时间
     */
    insurancePayDate: "",

    /**
     * 保单年缴费额
     */
    paymentYear: "",

    /**
     * 发卡银行
     */
    bankArray: [{
      comcode: "农业银行",
      comname: "农业银行"
    }, {
      comcode: "建设银行",
      comname: "建设银行"
    }, {
      comcode: "交通银行",
      comname: "交通银行"
    }, {
      comcode: "工商银行",
      comname: "工商银行"
    }, {
      comcode: "中国银行",
      comname: "中国银行"
    }, {
      comcode: "招商银行",
      comname: "招商银行"
    }, {
      comcode: "邮储银行",
      comname: "邮储银行"
    }, {
      comcode: "中信银行",
      comname: "中信银行"
    }, {
      comcode: "光大银行",
      comname: "光大银行"
    }, {
      comcode: "华夏银行",
      comname: "华夏银行"
    }, {
      comcode: "民生银行",
      comname: "民生银行"
    }, {
      comcode: "浦发银行",
      comname: "浦发银行"
    }, {
      comcode: "兴业银行",
      comname: "兴业银行"
    }, {
      comcode: "广发银行",
      comname: "广发银行"
    }, {
      comcode: "河北银行",
      comname: "河北银行"
    }, {
      comcode: "宁波银行",
      comname: "宁波银行"
    }, {
      comcode: "北京银行",
      comname: "北京银行"
    }],
    bankIndex: 0,

    /**
     * 账单日
     */
    statementDateIndex: 0,

    /**
     * 授信额度
     */
    lineCredit: "",

    /**
     * 发卡日期
     */
    buildDate: "",

    /**
     * 近6月月均使用额度
     */
    sixAveuse: "",

    /**
     * 使用额度
     */
    useLimit: "",
  },

  bindPickerChange: function(e) {
    let that = this
    let value = e.detail.value
    let type = e.currentTarget.dataset.type
    if (type === "dutyLevel") {
      that.setData({
        dutyLevelIndex: value
      })
    } else if (type === "entryDate") {
      that.setData({
        entryDate: value
      })
    } else if (type === "payTime") {
      that.setData({
        payTimeIndex: value
      })
    } else if (type === "payType") {
      that.setData({
        payTypeIndex: value
      })
    } else if (type === "paydate") {
      that.setData({
        paydate: value
      })
    } else if (type === "startDate") {
      that.setData({
        startDate: value
      })
    } else if (type === "company") {
      that.setData({
        companyIndex: value
      })
    } else if (type === "insuranceStartDate") {
      that.setData({
        insuranceStartDate: value
      })
    } else if (type === "insurancePayDate") {
      that.setData({
        insurancePayDate: value
      })
    } else if (type === "kind") {
      that.setData({
        kindIndex: value
      })
    } else if (type === "mode") {
      that.setData({
        modeIndex: value
      })
    } else if (type === "bank") {
      that.setData({
        bankIndex: value
      })
    } else if (type === "statementDate") {
      that.setData({
        statementDateIndex: value
      })
    } else if (type === "buildDate") {
      that.setData({
        buildDate: value
      })
    }
  },

  bindDataInput: function(e) {
    let that = this
    let value = e.detail.value
    let type = e.currentTarget.dataset.type
    if (type === "unitPhoneNumber") {
      that.setData({
        unitPhoneNumber: value
      })
    } else if (type === "selfMonthIncome") {
      that.setData({
        selfMonthIncome: value
      })
    } else if (type === "homeYearIncome") {
      that.setData({
        homeYearIncome: value
      })
    } else if (type === "monthIncome") {
      that.setData({
        monthIncome: value
      })
    } else if (type === "compayBasic") {
      that.setData({
        compayBasic: value
      })
    } else if (type === "mouthDeposit") {
      that.setData({
        mouthDeposit: value
      })
    } else if (type === "compayUnit") {
      that.setData({
        compayUnit: value
      })
    } else if (type === "socialPayBasic") {
      that.setData({
        socialPayBasic: value
      })
    } else if (type === "socialPayUnit") {
      that.setData({
        socialPayUnit: value
      })
    } else if (type === "address") {
      that.setData({
        address: value
      })
    } else if (type === "rate") {
      that.setData({
        rate: value
      })
    } else if (type === "acreage") {
      that.setData({
        acreage: value
      })
    } else if (type === "commonthly") {
      that.setData({
        commonthly: value
      })
    } else if (type === "publicmonthly") {
      that.setData({
        publicmonthly: value
      })
    } else if (type === "coverage") {
      that.setData({
        coverage: value
      })
    } else if (type === "lineCredit") {
      that.setData({
        lineCredit: value
      })
    } else if (type === "sixAveuse") {
      that.setData({
        sixAveuse: value
      })
    } else if (type === "useLimit") {
      that.setData({
        useLimit: value
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let nowDate = util.formatDate(new Date())
    that.setData({
      nowDate: nowDate,
      entryDate: nowDate,
      paydate: nowDate,
      insuranceStartDate: nowDate,
      insurancePayDate: nowDate,
      buildDate: nowDate
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
    let that = this
    that.setData({
      viewHeight: wx.getSystemInfoSync().windowHeight - (wx.getSystemInfoSync().windowWidth / 750 * (60 * 2 + 64 * 2)),
    })
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
   * 下一步
   */
  nextStep: function() {
    wx.navigateTo({
      url: '/pages/contacts/contacts',
    })
  },

  /**
   * 银行流水
   */
  gotoBankWater: function() {
    wx.navigateTo({
      url: '/pages/bankwater/bankwater',
    })
  },
})