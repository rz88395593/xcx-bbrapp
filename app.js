//app.js
const Base64 = require('utils/base64.js').Base64

//引用RSA源码JS
const RSA = require('utils/wxapp-rsa.js')

//RSA私钥
const privateKey_pkcs1 = '-----BEGIN RSA PRIVATE KEY-----MIICXQIBAAKBgQCk7WKdggwBOtteLL5sPom8RYCjuw0hy6R1jH39tCaep1Dns02bi4CYHk2dSR / t0ABgF5pHYeMxHa74Dp6Z6SjfAKMUu53BbTR615ehK + 03BjtzJzviTF1 / NtLmGaR3aawrDp7oQgq33dfIYbWLuAMkHNiWaoXaGyHh3a8jS2vxfQIDAQABAoGAIKRnLzts + tVWU5ZRfgUGp7 + tzToZSEYQ378VtJ / yQNZmueUQCCgdJH5i6C1v51aSrHIfc99Y4wC3/ 5qNI3M1RlRpIakmcaiEv1m6huDPLKFq6Y1e+ AZ0Cb0xo3bny + VTOvfGgcAdSa6++K47bGaxyKzwGeNZQkltm5sgbVcKvkECQQDVjWbSU8P8nDb+TP5Aqr + DaMVA425wv2ra2jhxd6KqKxgHHB7yYWlODiYNrtALOEG9zfSpHVQWhZpiKq8XcWwRAkEAxbWzPAqZxaZ / XTs65uCL0 + iqif0qCSDUNis61wYm2UwOh4LqBZIFop94B3ybEXbCvUl0v26H0fgXjFUErvlKrQJBAKjbAe5U5accLi + t2WxwlrXlZfME4hKsiGU8H10455n+ MSWOCrpEY + ugLF6tVztH5FOcQlRmKFMWmRf + ACxdNsECQDBjkEKZtZkSbwm6fWgUfSSYRWUQeUFSr52yZuxJrShx3Px9phlG6 + opbY8niCx2DKOXXuObgdJ6DglipYrNqOECQQCndP + zU / jwlvjQzEabKdP05uFc5JV6ySFBQwuoENbEvW3uz + Yz31xDYbrwIzrysVDovlj0ExL6LC + JRvpJmHcN-----END RSA PRIVATE KEY-----'

//RSA公钥
const publicKey_pkcs1 = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCk7WKdggwBOtteLL5sPom8RYCjuw0hy6R1jH39tCaep1Dns02bi4CYHk2dSR / t0ABgF5pHYeMxHa74Dp6Z6SjfAKMUu53BbTR615ehK + 03BjtzJzviTF1/ NtLmGaR3aawrDp7oQgq33dfIYbWLuAMkHNiWaoXaGyHh3a8jS2vxfQIDAQAB-----END PUBLIC KEY-----'

//引用AES源码JS
const AES = require('utils/crypto-aes.js');
//十六位十六进制数作为秘钥
// const key = AES.enc.Utf8.parse("1234567890ABCDEF");
const key = AES.enc.Utf8.parse("1234567890123456");
//十六位十六进制数作为秘钥偏移量
// const iv = AES.enc.Utf8.parse('1234567890ABCDEF');
const iv = AES.enc.Utf8.parse('1234567890123456');

App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //第一次启动清空图片缓存和唯一标识缓存
    wx.setStorageSync('openID', "")
    wx.setStorageSync('takePhotoArray', [])
  },

  globalData: {

    //个人环境 外网
    // baseUrl: "",

    //个人环境 内网
    // baseUrl: "",

    //测试环境
    baseUrl: "",

    //生产环境
    // baseUrl: "",

    userCode: "",
    userName: "",
    userPhone: "",
    mapApiKey: "DIZBZ-TX663-SVG3P-YP37W-72LNJ-KVF6Z",
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

    cardtypeArray: [{
      comcode: "1",
      comname: "个人卡"
    }, {
      comcode: "2",
      comname: "对公卡"
    }],
    DataFormat: {
      IMAGE_GIF: "image/gif",
      IMAGE_JPEG: "image/jpeg",
      IMAGE_PNG: "image/png",
      MEDIA_AU: "media/au",
      MEDIA_AIFF: "media/aiff",
      MEDIA_WAVE: "media/wave",
      MEDIA_MIDI: "media/midi",
      MEDIA_MP4: "media/mp4",
      MEDIA_M4V: "media/m4v",
      MEDIA_3G2: "media/3g2",
      MEDIA_3GP2: "media/3gp2",
      MEDIA_3GP: "media/3gp",
      MEDIA_3GPP: "media/3gpp"
    },
    TemplateType: {
      XML: 10,
      HTML: 11,
      PDF: 12,
      JSON: 13,
      PRESERVED: 19
    },
    BioType: {
      /** 签名人居民身份证正面 **/
      PHOTO_SIGNER_IDENTITY_CARD_FRONT: 0,
      /** 签名人居民身份证背面 **/
      PHOTO_SIGNER_IDENTITY_CARD_BACK: 1,
      /** 签名人复述录音 **/
      SOUND_SIGNER_RETELL: 2,
      /** 签名人自定义录音 **/
      SOUND_SIGNER_OTHER: 3
    },
  },

  /**
   * 判断字符串是否为JSON格式
   */
  isJSON: function(str) {
    if (typeof str == 'string') {
      try {
        var obj = JSON.parse(str)
        if (typeof obj == 'object' && obj) {
          return true
        } else {
          return false
        }
      } catch (e) {
        console.log('------error：' + str + '!!!' + e + '------')
        return false
      }
    }
  },

  /**
   * 日期格式化YYYY-MM-dd
   */
  stringToyyyy_MM_dd: function(setDate) {
    let valDate = "";
    if (setDate.length == 8) {
      valDate = setDate.substring(0, 4) + "-" + setDate.substring(4, 6) + "-" + setDate.substring(6, 8);
      return valDate;
    } else if (setDate.length == 6) {
      valDate = setDate.substring(0, 4) + "-" + setDate.substring(4, 6);
      return valDate;
    }
    return valDate;
  },

 
  /**
   * RSA加密-返回加密数据
   */
  rsaEncrypt: function(encrypt) {
    var encrypt_rsa = new RSA.RSAKey();
    encrypt_rsa = RSA.KEYUTIL.getKey(publicKey_pkcs1);
    console.log('加密RSA:');
    console.log(encrypt_rsa);
    var encStr = encrypt_rsa.encrypt(encrypt);
    encStr = RSA.hex2b64(encStr);
    console.log("加密结果：" + encStr);
    return encStr;
  },

  /**
   * RSA解密-返回解密数据
   */
  rsaDecrypt: function(decrypt) {
    var decrypt_rsa = new RSA.RSAKey();
    decrypt_rsa = RSA.KEYUTIL.getKey(privateKey_pkcs1);
    console.log('解密RSA:');
    console.log(decrypt_rsa);
    var decStr = RSA.b64tohex(decrypt);
    decStr = decrypt_rsa.decrypt(decStr);
    console.log("解密结果：" + decStr);
    return decStr;
  },

  /**
   * AES加密(有秘钥偏移量)-返回加密数据（大写字母）
   */
  aesEncryptWithOffset: function(word) {
    let srcs = AES.enc.Utf8.parse(word);
    let encrypted = AES.AES.encrypt(srcs, key, {
      iv: iv,
      mode: AES.mode.CBC,
      padding: AES.pad.Pkcs7
    });
    return encrypted.ciphertext.toString().toUpperCase();
  },

  /**
   * AES解密(有秘钥偏移量)-返回解密数据
   */
  aesDecryptWithOffset: function(word) {
    let encryptedHexStr = AES.enc.Hex.parse(word);
    let srcs = AES.enc.Base64.stringify(encryptedHexStr);
    let decrypt = AES.AES.decrypt(srcs, key, {
      iv: iv,
      mode: AES.mode.CBC,
      padding: AES.pad.Pkcs7
    });
    let decryptedStr = decrypt.toString(AES.enc.Utf8);
    return decryptedStr.toString();
  },

  /**
   * 微信AES解密(有秘钥偏移量)-返回解密数据
   */
  aesDecryptWithOffsetOfWX: function(word, keyString, ivString) {
    let encryptedHexStrOfKey = AES.enc.Hex.parse(keyString);
    let key = AES.enc.Utf8.parse(AES.enc.Base64.stringify(encryptedHexStrOfKey));
    console.log("key")
    console.log(key)

    let encryptedHexStrOfIV = AES.enc.Hex.parse(ivString);
    let iv = AES.enc.Utf8.parse(AES.enc.Base64.stringify(encryptedHexStrOfIV));
    console.log("iv")
    console.log(iv)

    console.log(word)
    let encryptedHexStr = AES.enc.Hex.parse(word);
    let srcs = AES.enc.Base64.stringify(encryptedHexStr);
    console.log("srcs")
    console.log(srcs)

    // let key = AES.enc.Base64.parse(keyString)
    // console.log("key")
    // console.log(key)
    // let iv = AES.enc.Base64.parse(ivString)
    // console.log("iv")
    // console.log(iv)
    let decrypt = AES.AES.decrypt(srcs, key, {
      iv: iv,
      mode: AES.mode.CBC,
      padding: AES.pad.Pkcs7
    });
    console.log("decrypt")
    console.log(decrypt)

    let decryptedStr = Base64.decode(AES.enc.Base64.stringify(decrypt));
    console.log("decryptedStr")
    console.log(decryptedStr)

    return decryptedStr;
  },

  /**
   * AES加密-返回加密数据
   * AES加密后在Base64加密
   */
  aesEncrypt: function(word) {
    var srcs = AES.enc.Utf8.parse(word);
    let encrypted = AES.AES.encrypt(srcs, key, {
      mode: AES.mode.ECB,
      padding: AES.pad.Pkcs7
    });
    let encryptStr = encrypted.ciphertext.toString().toUpperCase();
    return encryptStr;
  },

  /**
   * AES解密-返回解密数据
   * Base64解密后在AES解密
   */
  aesDecrypt: function(word) {
    let encryptedHexStr = AES.enc.Hex.parse(word);
    let srcs = AES.enc.Base64.stringify(encryptedHexStr);
    let decrypt = AES.AES.decrypt(srcs, key, {
      mode: AES.mode.ECB,
      padding: AES.pad.Pkcs7
    });
    let decryptedStr = decrypt.toString(AES.enc.Utf8);
    return decryptedStr.toString();
  },

  /**
   * BASE64加密-返回加密数据
   */
  base64Encrypt: function(val) {
    let str = AES.enc.Utf8.parse(val);
    let base64 = AES.enc.Base64.stringify(str);
    return base64;
  },

  /**
   * BASE64解密-返回解密数据
   */
  base64Decrypt: function(val) {
    let words = AES.enc.Base64.parse(val);
    return words.toString(AES.enc.Utf8);
  },

  /**
   * 格式花日期
   */
  dateFormat: function(date, fmt) {
    if (date === undefined || date === null) {
      return ""
    }
    if (date && date !== "" && date.indexOf("T") !== -1) {
      let newYMD = date.split("T");
      let newHMS = newYMD[1].split(".");
      if (fmt === "yyyy-MM-dd hh:mm:ss" || fmt === "yyyy-MM-dd HH:mm:ss") {
        /*年月日 时分秒*/
        return newYMD[0] + ' ' + newHMS[0]
      } else if (fmt === "yyyy-MM-dd") {
        /*年月日*/
        return newYMD[0]
      } else if (fmt === "hh:mm:ss" || fmt === "HH:mm:ss") {
        /*时分秒*/
        return newHMS[0]
      } else if (fmt === "hh:mm" || fmt === "HH:mm") {
        /*时分*/
        if (newHMS[0].indexOf(":") !== -1) {
          let theNewHMS = newHMS[0].split(":");
          return theNewHMS[0] + ":" + theNewHMS[1];
        } else {
          /*时分秒*/
          return newHMS[0];
        }
      } else if (fmt === "yyyy-MM-ddhh:mm:ss" || fmt === "yyyy-MM-ddHH:mm:ss") {
        /*年月日时分秒*/
        return newYMD[0] + newHMS[0]
      } else if (fmt === "yyyy年MM月dd日") {
        if (newYMD[0].indexOf("-") !== -1) {
          let theNewYMD = newYMD[0].split("-");
          return theNewYMD[0] + "年" + theNewYMD[1] + "月" + theNewYMD[2] + "日";
        } else {
          /*年月日*/
          return newYMD[0];
        }
      }
    } else {
      return date
    }
  },

  /**
   * 格式化金额
   */
  moneyFormat: function(s, n) {
    if (s === undefined || s === null) {
      return "";
    }
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
      r = s.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
  },

  /**
   * 格式化字符串undefined 或者 null
   */
  stringFormat: function(s) {
    if (s === undefined || s === null) {
      return "";
    } else {
      return s;
    }
  },

  /**
   * 格式化是否字段
   */
  boolFormat: function(s) {
    if (s === undefined) {
      return null;
    } else if (s === "true") {
      return true;
    } else if (s === "false") {
      return false;
    } else if (s === true) {
      return "true";
    } else if (s === false) {
      return "false";
    } else {
      return s;
    }
  },

  /**
   * 隐藏部分字符
   * str：字符串
   * frontLen：前面保留位数
   * endLen：后面保留位数
   */
  hiddenSomeString: function(str, frontLen, endLen) {
    if (str === undefined || str === null || str.length === 0) {
      return ""
    }
    let len = str.length - frontLen - endLen;
    let xing = '';
    for (let i = 0; i < len; i++) {
      xing += '*';
    }
    return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
  },

  /**
   * 正常日期格式转换
   */
  dateFormatNormal: (date, fmt) => {
    var date = new Date(date);
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S+": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      // console.log("k：" + k)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return fmt;
  },

  /**
   * 提交后返回
   */
  returnBack: function() {
    let pages = getCurrentPages(); // 当前页面
    let beforePage = pages[pages.length - 2]; // 前一个页面
    wx.navigateBack({
      success: function() {
        beforePage.refreshAllData(); // 执行前一个页面的onLoad方法
      }
    });
  },

  /**
   * 判断数据类型
   */
  objectPrototypeToString: function(e) {
    if (Object.prototype.toString.call(e) === "[object Array]") {
      //数组
      return "Array"
    } else if (Object.prototype.toString.call(e) === "[object Object]") {
      //对象
      return "Object"
    } else if (Object.prototype.toString.call(e) === "[object Number]") {
      //数字
      return "Number"
    } else if (Object.prototype.toString.call(e) === "[object String]") {
      //字符串
      return "String"
    } else if (Object.prototype.toString.call(e) === "[object Undefined]") {
      //未定义
    } else if (Object.prototype.toString.call(e) === "[object Boolean]") {
      //布尔
      return "Boolean"
    } else if (Object.prototype.toString.call(e) === "[object Function]") {
      //方法
      return "Function"
    } else {
      return ""
    }
  },

  /**
   * 刷新首页数据
   */
  initDataOfHome: function(e) {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1]; //当前页面
    let prevPage = pages[pages.length - 2]; //首页
    prevPage.initData()
  },

  /**
   * 选择位置
   */
  chooseLocationAddress: function(that) {
    let self = this
    wx.chooseLocation({
      success: function(res) {
        console.log("定位信息为：")
        console.log(res)
        if (res !== undefined && res !== null) {
          if (self.stringFormat(res.address) !== "" && self.stringFormat(res.name) !== "") {
            that.setData({
              locationData: res.address + res.name,
              // showAddress: res.name,
              place: res.address + res.name,
            })
          }
        }
      },
      fail: function() {},
      complete: function() {}
    })
  },

  /**
   * 通过Code获取数组Array某个Name或者角标
   * codeName Code键名
   * nameName Name键名
   * returnType 不为空 返回角标；为空 返回 Name
   */
  getNameWithCode: function(array, code, codeName, nameName, returnType) {
    if (array !== undefined && array !== null && array.length > 0) {
      for (let i = 0; i < array.length; i++) {
        let dataInfo = array[i]
        let codeString = dataInfo[codeName]
        let nameString = dataInfo[nameName]
        console.log("通过Code获取数组Array某个Name或者角标：")
        console.log(code + "，" + codeString + "，" + nameString)
        if (returnType === "area") {
          let replaceString = /(省|市|维吾尔自治区|回族自治区|自治区)/
          let newString = code.replace(replaceString, '')
          console.log(newString)
          if (codeString === newString || codeString === code) {
            return i
          }
        } else {
          if (codeString === code) {
            if (returnType !== undefined && returnType !== null) {
              if (returnType === "index") {
                return i
              } else if (returnType === "name") {
                return nameString
              } else if (returnType === "code") {
                return codeString
              }
            } else {
              return nameString
            }
          }
        }
      }
      if (returnType !== undefined && returnType !== null) {
        if (returnType === "index") {
          return 0
        } else if (returnType === "name") {
          return null
        } else if (returnType === "code") {
          return null
        } else {
          return 0
        }
      } else {
        return null
      }
    } else {
      if (returnType !== undefined && returnType !== null) {
        if (returnType === "index") {
          return 0
        } else if (returnType === "name") {
          return null
        } else if (returnType === "code") {
          return null
        } else {
          return 0
        }
      } else {
        return null
      }
    }
  }
})