// pages/pdfPage/pdfPage.js
var app = getApp();
var anysignWXInterface = require('anysignWXInterface.js');
var anysignBean = require('../../utils/anysignBean.js');
var apiInstance;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ios: true,
    url: "",

    text: "请投保人XX签字",
    // result:"",
    showView: false,
    hidden: true,
    viewLeft: 0,
    canvasWidth: 800,
    canvasHeight: 300,
    imageWidth: 100,
    imageHeight: 100,
    canvasColor: true,
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
    let that = this
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this
    that.testAnySign()
  },
  //手写签初始化
  testAnySign: function(e) {
    // id = "112321321"
    // var channel = e.currentTarget.id;
    var channel = "112321321"
    var res;
    var that = this;

    function callback(context_id, context_type, val) {
      console.log("context_id:" + context_id);
      if (context_type == "CALLBACK_TYPE_SIGNATURE") {
        if (context_id == 20) {
          that.setData({
            imageUrl: val
          })
          console.log("context_id:" + context_id + ";" + context_type + ";" + val);
          wx.showToast({
            title: '回调' + context_id + '成功！',
            icon: 'success',
            duration: 2000
          })

        } else if (context_id == 21) {
          that.setData({
            imageUrl: val
          })
          console.log("context_id:" + context_id + ";" + context_type + ";" + val);
          wx.showToast({
            title: '回调' + context_id + '成功！',
            icon: 'success',
            duration: 2000
          })
        }
      }
    }
    //设置签名算法，默认为RSA，可以设置成SM2
    app.globalData.EncAlg = "RSA";
    var res = anysignWXInterface.init(callback, channel, this);
    if (!res) {
      wx.showToast({
        title: 'init error',
        duration: 2000
      })
    }
    /////////////////////////////////////////////////
    var res = testAddSignatureObj1(20);
    if (!res) {
      wx.showModal({
        title: '提示',
        content: 'testAddSignatureObj 20 error'
      })
      return;
    }
    var res = testAddSignatureObj2(21);
    if (!res) {
      wx.showModal({
        title: '提示',
        content: 'testAddSignatureObj 21 error'
      })
      return;
    }
    /////////////////////////////////////////////////
    //注册一个单位签章
    var signer = new anysignBean.signer("小明", "110111111");
    /**
     * 使用服务器规则配置签名
     * @param tid 服务器端生成的配置规则
     * @constructor
     */
    var signerRule = new anysignBean.SignRule_Tid("1112");
    var cachet_config = new anysignBean.CachetConfig(signer, signerRule, false);
    // anysignWXInterface.addCachetObj(cachet_config);
    ////////////////////////////////////////////////
    //将配置提交
    res = anysignWXInterface.commitConfig();
    if (res) {
      // wx.showModal({
      //   title: '提示',
      //   content: '初始化成功！'
      // })
      that.testSetTemplateData()
    } else {
      wx.showModal({
        title: '提示',
        content: '初始化失败！'
      })
    }
  },
  //设置表单数据
  testSetTemplateData: function() {
    var formData = "PGh0bWw+PGhlYWQ+PHRpdGxlPjwvdGl0bGU+PG1ldGEgaHR0cC1lcXVpdj0nQ29udGVudC1UeXBlJyBjb250ZW50PSd0ZXh0L2h0bWw7IGNoYXJzZXQ9VVRGLTgnIC8+PC9oZWFkPjxib2R5PjxkaXY+PGRpdj48bGFiZWw+a2V5d29yZDo8L2xhYmVsPjwvZGl2PjxkaXY+PGxhYmVsPuWIl+WQjTLvvJo8L2xhYmVsPjwvZGl2PjxkaXY+PGxhYmVsPuWIl+WQjTPvvJo8L2xhYmVsPjwvZGl2PjwvZGl2PjwvYm9keT48L2h0bWw+";

    var businessId = "123123"; //集成信手书业务的唯一标识

    var template_serial = "1513136380043"; //用于生成PDF的模板ID

    //配置JSON格式签名原文
    /**
     * 设置表单数据，每次业务都需要set一次
     * @param template_type 签名所用的模板类型
     * @param contentUtf8Str 表单数据，类型为Utf8字符串
     * @param businessId 业务工单号
     * @param template_serial 模板序列号
     * @returns {*} 是否设置成功
     */
    var res = anysignWXInterface.setTemplate(app.globalData.TemplateType.HTML, formData, businessId, template_serial);
    if (res) {
      wx.showModal({
        title: '提示',
        content: '设置表单数据成功！'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '设置表单数据失败！'
      })
    }
  },

  //弹出单签签名框
  testPopupDialog: function(e) {
    var context_id = e.currentTarget.id;
    var windowHeight = 0;
    var windowWidth = 0;
    if (!anysignWXInterface) {
      wx.showModal({
        title: '提示',
        content: '信手书接口没有初始化！'
      })
    }
    var that = this;
    switch (anysignWXInterface.showSignatureDialog(context_id, that)) {
      case "OK":
        console.log("OK");
        break;
      case "EC_API_NOT_INITED":
        console.log("信手书接口没有初始化");
        break;
      case "EC_WRONG_CONTEXT_ID":
        console.log("没有配置相应context_id的签字对象");
        break;
    }
  },
  canvasStart: function (event) {
    anysignWXInterface.canvasStart(event);
  },
  canvasMove: function (event) {
    anysignWXInterface.canvasMove(event);
  },
  canvasEnd: function (event) {
    anysignWXInterface.canvasEnd(event);
  },
  //确定
  sign_confirm: function () {
    anysignWXInterface.sign_confirm();
  },
  //清屏
  clear_canvas: function () {
    anysignWXInterface.clear_canvas();
  },
  //取消
  cancel_sign: function () {
    anysignWXInterface.cancel_sign();
  },
  scrollbar_left: function () {
    anysignWXInterface.anysignScollLeft();
  },
  scrollbar_right: function () {
    anysignWXInterface.anysignScollRight();
  },
  bindNextStep: function() {
    let that = this
    let json = ""
    wx.navigateTo({
      url: '/pages/applyResult/applyResult' + '?jsonData=' + json,
    })
  }
})
//添加单签签名框
function testAddSignatureObj1(objId) {
  var context_id = objId;
  var signer = new anysignBean.signer("李明", "11011111111");
  /**
   * 根据坐标定位签名方式
   * @param left 签名图片最左边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
   * @param top 签名图片顶边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
   * @param right 签名图片最右边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
   * @param bottom 签名图片底边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
   * @param pageNo 签名在PDF中的页码，从1开始
   * @param unit 坐标系单位，目前支持"dp"和"pt"
   * @constructor
   */
  if (objId == 20) {
    try {
      var signerRule = new anysignBean.SignRule_XYZ(50.0, 110.1, 180.2, 50.3, 1, "pt");
    } catch (e) {
      console.log(e);
      return false;
    }
    // var signerRule = new anysignBean.SignRule_XYZ(100.0, 110.1, 180.2, 50.3, 1, "pt");
  } else {
    var signerRule = new anysignBean.SignRule_Tid(1112);
  }

  var signatureConfig = new anysignBean.SignatureConfig(signer, signerRule);
  //                   1:时间在上、2：时间在下、3：时间在右
  var timeTag = new anysignBean.TimeTag(1, "yyMMdd hh:mm;ss");
  signatureConfig.timeTag = timeTag;
  signatureConfig.singleWidth = 400;
  signatureConfig.singleHeight = 400;
  signatureConfig.penColor = "#FF0000";
  signatureConfig.isTSS = false; //是否开始时间戳服务
  signatureConfig.nessesary = false;
  var res = anysignWXInterface.addSignatureObj(context_id, signatureConfig);
  return res;
}
function testAddSignatureObj2(objId) {
  var context_id = objId;
  var signer = new anysignBean.signer("李明刘", "11011111111");
  /**
   * 根据坐标定位签名方式
   * @param left 签名图片最左边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
   * @param top 签名图片顶边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
   * @param right 签名图片最右边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
   * @param bottom 签名图片底边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
   * @param pageNo 签名在PDF中的页码，从1开始
   * @param unit 坐标系单位，目前支持"dp"和"pt"
   * @constructor
   */
  if (objId == 21) {
    // var signerRule = new anysignBean.SignRule_XYZ(100.0, 110.1, 180.2, 50.3, 1, "pt");
    //var signerRule = new anysignBean.SignRule_XYZ(50.0, 110.1, 180.2, 50.3, 1, "pt");
    // var signerRule = new anysignBean.SignRule_KeyWord("客户确认",1,0,1,1);
    //SignRule_KeyWordV2(keyword, xOffset, yOffset, pageNo, KWIndex)
    var signerRule = new anysignBean.SignRule_KeyWordV2("列名2", 130, 5, 1, 0);

  } else {

    var signerRule = new anysignBean.SignRule_Tid(1112);
  }

  var signatureConfig = new anysignBean.SignatureConfig(signer, signerRule);
  //                   1:时间在上、2：时间在下、3：时间在右
  var timeTag = new anysignBean.TimeTag(1, "yyMMdd hh:mm;ss");
  signatureConfig.timeTag = timeTag;
  signatureConfig.singleWidth = 100;
  signatureConfig.singleHeight = 100;
  signatureConfig.penColor = "#000000";
  signatureConfig.isTSS = false;//是否开始时间戳服务
  signatureConfig.signatureImgRatio = 3.0;
  signatureConfig.nessesary = false;
  var res = anysignWXInterface.addSignatureObj(context_id, signatureConfig);

  return res;

}