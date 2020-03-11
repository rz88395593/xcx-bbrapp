/**
 * @author caolili
 * 接口
 */

var core = require('anysignWXCore.js');
var anysignBean = require('../../utils/anysignBean.js');
var anysignUI = require('anysignWXUI.js');

function initAnySignApi(callback, channel,context){
  if (callback && (typeof callback == "function") && callback.length >= 3) {
    core.initAnySignApi(callback, channel, context);
    return true;
  }
  else {
    return false;
  }
}

/**
 * 配置一个签名，context_id区间为[20,30)，20~29为普通签名，30~39为多字批示。
 * 根据signatureConfig配置签字相应属性。
 * @param context_id 签字对象唯一标识
 * @param signatureConfig 签字配置信息
 * @returns {boolean}
 */
function addSignatureObj(context_id, signatureConfig) {
  if (!signatureConfig instanceof anysignBean.SignatureConfig)
    return false;

  return core._addSignatureObj(context_id, signatureConfig);
}

function addDataObj(context_id, dataConfig) {
  if (!dataConfig instanceof anysignBean.DataConfig) {
    return false;
  }

  return core._addDataObj(context_id, dataConfig);
}

 /**
 * 添加证据接口
 */
function addEvidence(context_id, content, format, bioType, index) {
  return core._addEvidence(context_id, content, format, bioType, index);
}

/**
 * 配置一个公司签章
 * @param signatureConfig 公司签章对象
 * @returns {boolean}
 */
function addCachetObj(cachetConfig) {
  if (!(cachetConfig instanceof anysignBean.CachetConfig)) {
    return false;
  }

  return core._addChachetobj(cachetConfig);
}

/**
 * 设置表单数据，每次业务都需要set一次
 * @param template_type 签名所用的模板id, 即context id
 * @param contentUtf8Str 表单数据，类型为Utf8字符串
 * @param template_serial 模板序列号
 * @param businessId 业务工单号
 * @returns {*} 是否设置成功
 */
function setTemplate(template_type, contentUtf8Str, businessId, template_serial) {
  if (core)
    return core._setTemplate(template_type, contentUtf8Str, businessId, template_serial);
  else
    return false;
}

function setTID(tid) {
  return core._setTID(tid);
}

/**
 *
 * @param context_id
 * @param data utf8字符串或者uint8Array数组
 * @returns {*} 是否设置成功
 */
function setData(context_id, data) {
  return core._setData(context_id, data);
}

/**
 * 弹出根据context_id区分的普通、批示签名
 * @param context_id
 * @return 是否成功弹出：成功：0 错误：相应EC错误码定义
 */
function showSignatureDialog(context_id,that) {
  return core._showSignatureDialog(context_id,that);
}

/**
 * 提交更改，一旦调用，在本次签名流程中不允许再设置表单数据(setTableData)和签名、拍照配置等信息
 */
function commitConfig() {
  return core._commitConfig();
}

/**
 * 重新配置Api，调用之后可以设置表单数据(setTableData)和签名、拍照配置等信息
 * 注：前一次业务的签名、拍照等数据会被清空
 */
function resetConfig() {
  return core._resetConfig();
}

/**
 * 一次业务完成(签名、拍照均做完)后，调用此接口判断上传诗句是否准备就绪
 * @return ture false
 */
function isReadyToUpload() {
  return core._isReadyToUpload();
}



/**
   * 一次业务完成(签名、拍照均做完)后，调用此接口获取须上传至信手书服务器的业务加密数据
   * @return 加密的业务数据。如果
   */
function getUploadDataGram() {
  return core._getUploadDataGram();
}

/**
 * 获得版本信息
 * @param null
 * @returns null
 */
function getVersion() {
  return "AnySignMiniCoreV2.3.1M1.0-miniProgram";
}

/**
 * 获取操作系统信息，格式为"操作系统名##版本号"，如"android##4.1.2"、"ios##7.1.2"
 * @returns {*}
 */
function getOSInfo() {
  return core._getOSInfo();
}


function canvasStart(event){
  anysignUI.canvasStart(event);
}

function canvasMove(event){
  anysignUI.canvasMove(event);
}

function canvasEnd(event) {
  anysignUI.canvasEnd(event);
}

/**
 * 点击确定按钮生成图片
 */
function sign_confirm(){
  anysignUI.sign_confirm();
}

/**
 * 清屏
 */
function clear_canvas(){
  anysignUI.clear_canvas();
}

/**
 * 取消签名框
 */
function cancel_sign(){
  anysignUI.sign_cancel();
}

function anysignScollLeft(){
  anysignUI.scollLeft();
}

function anysignScollRight() {
  anysignUI.scollRight();
}


/**
 * 测试加密包，加密包可以在log中打印出来
 */
function _CSJIAMIBAO(){
  core._CSJIAMIBAO();
}



////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
  init: initAnySignApi,
  addDataobj: addDataObj,
  addSignatureObj: addSignatureObj,
  addEvidence: addEvidence,
  addCachetObj: addCachetObj,
  setTemplate: setTemplate,
  setTID: setTID,
  setData: setData,
  showSignatureDialog: showSignatureDialog,
  commitConfig: commitConfig,
  resetConfig: resetConfig,
  isReadyToUpload: isReadyToUpload,
  getUploadDataGram: getUploadDataGram,
  getVersion: getVersion,
  getOSInfo: getOSInfo,
  canvasStart: canvasStart,
  canvasMove: canvasMove,
  canvasEnd: canvasEnd,
  sign_confirm: sign_confirm,
  clear_canvas: clear_canvas,
  cancel_sign: cancel_sign,
  anysignScollLeft: anysignScollLeft,
  anysignScollRight: anysignScollRight,
  CSJIAMIBAO: _CSJIAMIBAO
}