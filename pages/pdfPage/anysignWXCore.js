/**
 * bjca
 * @author caolili
 */
function _initAnySignApi(t, n, e) {
  return !(!t || !n) && (_resetVariables(), mCallback = t, mChannel = n, context_view = e, anysignUI.setCallback(mCallback), !0)
}

function _addDataObj(t, n) {
  if (!mIsInitialized && _isDataObj(t)) {
    n.cid = t, mDataObjArray[t] = n;
    var e = new anysignWebBean.DataObj;
    return e.Format = n.format, e.Name = n.name, e.Cid = t, mDatas[t] = e, !0
  }
  return !1
}

function _addSignatureObj(t, n) {
  if (!mIsInitialized && n && _isSigObj(t)) {
    n.cid = t, signObjArray[t] = n;
    var e = new anysignWebBean.SignatureObj;
    return e.Cid = t, e.Signer = n.signer, e.SignRule = n.signRule, e.IsTSS = n.isTSS, e.TimeTag = n.timeTag, signData[t] = e, !0
  }
  return !1
}

function _addEvidence(t, n, e, r, i) {
  var o = signData[t];
  if (o.Points || (o.Points = new anysignWebBean.PlainData), o.Points.P10Data || (o.Points.P10Data = new anysignWebBean.P10Data), o.Points.CertOID || (o.Points.CertOID = new anysignWebBean.CertOID), o.Points.CertOID.BioFeature || (o.Points.CertOID.BioFeature = new anysignWebBean.BioFeature), o.Points.CertOID.BioFeature.Script) return !1;
  if (r == getApp().globalData.BioType.PHOTO_SIGNER_IDENTITY_CARD_BACK || r == getApp().globalData.BioType.PHOTO_SIGNER_IDENTITY_CARD_FRONT) {
    var a = new anysignWebBean.PhotoEvidence;
    a.Format = e;
    var s = sha1Digest(n);
    return a.Hash = "BS64:" + s.toString().toUpperCase(), a.BioType = r, o.Points.CertOID.BioFeature.PhotoArray[i] = a, !0
  }
  if (r == getApp().globalData.BioType.SOUND_SIGNER_RETELL || r == getApp().globalData.BioType.SOUND_SIGNER_OTHER) {
    var u = new anysignWebBean.SoundEvidence;
    u.Format = e;
    var l = sha1Digest(n);
    return u.Hash = "BS64:" + l.toString().toUpperCase(), u.BioType = r, o.Points.CertOID.BioFeature.SoundArray[i] = u, !0
  }
  return !1
}

function _addChachetObj(t) {
  return !(mIsInitialized || !t) && (mCachetObjArray.push(t), !0)
}

function _setTemplate(t, n, e, r) {
  if (!mIsInitialized) return console.log("mIsInitialized is false"), !1;
  if (!mTemplateSet && _isTemplate(t)) {
    if (null == n || 0 === n.length) return console.log("contentUtf8Str must not be null or empty"), !1;
    if (null == e || 0 === e.length) return console.log("businessId must not be null or empty"), !1;
    if (null == r || 0 === r.length) return console.log("template_serial must not be null or empty"), !1;
    mWONo = e, mWOHash = sha1DigestBase64(e) + "";
    var i = new anysignWebBean.DataObj;
    if (i.Cid = t, i.Data = n, ContextID.FORMDATA_XML === t || ContextID.FORMDATA_JSON === t) {
      var o = new anysignWebBean.PDFCrdRule;
      o.DocFormat = t, o.DocStyleTid = r, i.PDFCrdRule = o
    }
    var a = new anysignBean.DataConfig;
    return a.cid = t, a.nessesary = !0, mDatas[t] = i, mDataObjArray[t] = a, mTemplateSet = !0, !0
  }
  return !1
}

function _setTID(t) {
  return mTid = t, !0
}

function _setData(t, n) {
  if (_getDataObj(t) && n) {
    if ("string" == typeof n)(e = mDatas[t]).Data = tools.encodeUint8Array(tools.strToUtf8ArrayUint8(n));
    else if (n instanceof Uint8Array) {
      var e = mDatas[t];
      e.Data = tools.encodeUint8Array(n)
    }
    return !0
  }
  return !1
}

function _commitConfig() {
  return mIsInitialized = !0, !0
}

function _showSignatureDialog(t, n) {
  if (mIsInitialized) {
    if (mTemplateSet) {
      if (null == signObjArray[t]) return "EC_WRONG_CONTEXT_ID";
      n.setData({
        showView: !0
      });
      var e = signObjArray[t];
      return anysignUI.onloadAnysignView(e, function(n, r, i, o, a) {
        var s = signData[t];
        if (_compressSigToHolder(s, e.penColor, r, i, o, a), s.ImageSize = new anysignWebBean.ImageSize(o, a), s.Image = n, s.SignRule && s.SignRule instanceof anysignBean.SignRule_XYZ) {
          var u = s.SignRule.XYZRule;
          "dp" === u.Unit ? s.SignRule.XYZRule = {
            Left: u.Left,
            Top: u.Top,
            Right: u.Left + o,
            Bottom: u.Top - a,
            Pageno: u.Pageno,
            Unit: u.Unit
          } : "pt" === u.Unit && (s.SignRule.XYZRule = {
            Left: u.Left,
            Top: u.Top,
            Right: u.Left + .45 * o,
            Bottom: u.Top - .45 * a,
            Pageno: u.Pageno,
            Unit: u.Unit
          })
        }
      }, n), "OK"
    }
    return "EC_TEMPLATE_NOT_SET"
  }
  return "EC_API_NOT_INITED"
}

function _isReadyToUpload() {
  if (!mIsInitialized || !mTemplateSet) return !1;
  for (var t in signObjArray) {
    var n = (r = signObjArray[t]).cid;
    if (r.nessesary) {
      var e = signData[n];
      if (null == e || null == e.Points || null == e.Points.CertOID || null == e.Points.CertOID.BioFeature || null == e.Points.CertOID.BioFeature.Script) return !1
    }
  }
  for (t in mDataObjArray) {
    var r = mDataObjArray[t],
      i = mDatas[r.cid];
    if ((null == i || null == i.Data) && r.nessesary) return !1
  }
  return !0
}

function _getUploadDataGram() {
  if (mIsInitialized && this._isReadyToUpload() && mTemplateSet) {
    context_view.setData({
      hidden: !0
    }), root = new anysignWebBean.AnySignRoot;
    for (var t = new anysignWebBean.FormInfo, n = new Uint8Array(24), e = 0; e < 24; e++) {
      var r = 100 * Math.random();
      n[e] = r
    }
    root.EncKey = rsaPubkeyUint8EncByDefault(n), root.EncCertSN = encCertSN;
    var i, o = [];
    for (var a in signObjArray) i = signObjArray[a], "" != signData[i.cid].Image && null != signData[i.cid].Image && o.push(signData[i.cid]);
    var s = [];
    for (a in mDataObjArray) i = mDataObjArray[a], s.push(mDatas[i.cid]);
    t.WONo = mWONo, t.WOHash = mWOHash, t.Channel = mChannel, null != mCachetObjArray && mCachetObjArray.length > 0 && (t.IsUnit = !0), t.USignArray = o, t.DataArray = s, t.CachetArray = mCachetObjArray, t.ExtInfo = new anysignWebBean.ExtInfo, t.EncAlg = getApp().globalData.EncAlg;
    var u = tools.stringify(t);
    return root.EncData = tripleDesEncrypt(u, tools.uint8ArrayToHexStr(n)) + "", root.Digest = new anysignWebBean.Digest, root.Digest.Alg = "CRC32", root.Digest.Value = tools.crc32(root.EncData).toString(16).toUpperCase(), context_view.setData({
      hidden: !1
    }), tools.stringify(root)
  }
  return console.log("UploadDataGram is null"), null
}

function _resetVariables() {
  isLock = !1, mCallback = null, mChannel = null, mIsInitialized = !1, mTemplateSet = !1, signData = [], signObjArray = [], mDatas = [], mCachetObjArray = []
}

function _getDataObj(t) {
  for (var n in mDataObjArray) {
    var e = mDataObjArray[n];
    if (e && e.cid == t) return e
  }
  return null
}

function _isTemplate(t) {
  return ContextID.FORMDATA_XML <= t && t <= ContextID.FORMDATA_PRESERVED
}

function _isSigObj(t) {
  return t >= 20 && t <= 29 || t >= 200 && t <= 299
}

function _compressSigToHolder(t, n, e, r, i, o) {
  t.Points || (t.Points = new anysignWebBean.PlainData), t.Points.P10Data || (t.Points.P10Data = new anysignWebBean.P10Data), t.Points.CertOID || (t.Points.CertOID = new anysignWebBean.CertOID), t.Points.CertOID.BioFeature || (t.Points.CertOID.BioFeature = new anysignWebBean.BioFeature), t.Points.CertOID.IDNumber = t.Signer.IDNumber, t.Points.CertOID.IDType = t.Signer.IDType, t.Points.CertOID.BioFeature.Script = new anysignWebBean.Script, t.Points.CertOID.ClientOS = new anysignWebBean.ClientOS, wx.getSystemInfo({
    success: function(n) {
      t.Points.CertOID.ClientOS.Name = "ANDROID_" + n.system, t.Points.CertOID.ClientOS.Edition = n.model, t.Points.CertOID.ClientOS.Version = n.version, t.Points.CertOID.ClientOS.DeviceID = n.platform
    }
  });
  var a = t.Points.CertOID.BioFeature.Script;
  a.Color = parseInt("0x" + n.substr(1)) + "", a.Data = tools.compressToB64(tools.strToUint8ArrayAscII(e)), a.Count = r + "", a.Device = new anysignWebBean.Device, a.Device.Width = 99999, a.Device.Height = 99999, wx.getSystemInfo({
    success: function(t) {
      a.Device.DeviceName = "ANDROID_" + t.system, a.Device.DeviceID = t.version
    }
  }), a.RefWidth = i, a.RefHeight = o
}

function _isDataObj(t) {
  return !!(t >= 50 && t <= 59 || t >= 500 && t <= 599 || _isTemplate(t))
}

function sha1DigestBase64(t) {
  return tools.encodeUint8Array(tools.hexStrToUint8Array(fun_sha1.hex_sha1(t) + ""))
}

function CSJIAMIBAO() {
  console.log("加密包:" + tools.stringify(root))
}

function BigInteger(t, n, e) {
  null != t && ("number" == typeof t ? this.fromNumber(t, n, e) : null == n && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, n))
}

function nbi() {
  return new BigInteger(null)
}

function am1(t, n, e, r, i, o) {
  for (; --o >= 0;) {
    var a = n * this[t++] + e[r] + i;
    i = Math.floor(a / 67108864), e[r++] = 67108863 & a
  }
  return i
}

function am2(t, n, e, r, i, o) {
  for (var a = 32767 & n, s = n >> 15; --o >= 0;) {
    var u = 32767 & this[t],
      l = this[t++] >> 15,
      p = s * u + l * a;
    i = ((u = a * u + ((32767 & p) << 15) + e[r] + (1073741823 & i)) >>> 30) + (p >>> 15) + s * l + (i >>> 30), e[r++] = 1073741823 & u
  }
  return i
}

function am3(t, n, e, r, i, o) {
  for (var a = 16383 & n, s = n >> 14; --o >= 0;) {
    var u = 16383 & this[t],
      l = this[t++] >> 14,
      p = s * u + l * a;
    i = ((u = a * u + ((16383 & p) << 14) + e[r] + i) >> 28) + (p >> 14) + s * l, e[r++] = 268435455 & u
  }
  return i
}

function int2char(t) {
  return BI_RM.charAt(t)
}

function intAt(t, n) {
  var e = BI_RC[t.charCodeAt(n)];
  return null == e ? -1 : e
}

function bnpCopyTo(t) {
  for (var n = this.t - 1; n >= 0; --n) t[n] = this[n];
  t.t = this.t, t.s = this.s
}

function bnpFromInt(t) {
  this.t = 1, this.s = t < 0 ? -1 : 0, t > 0 ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
}

function nbv(t) {
  var n = nbi();
  return n.fromInt(t), n
}

function bnpFromString(t, n) {
  var e;
  if (16 == n) e = 4;
  else if (8 == n) e = 3;
  else if (256 == n) e = 8;
  else if (2 == n) e = 1;
  else if (32 == n) e = 5;
  else {
    if (4 != n) return void this.fromRadix(t, n);
    e = 2
  }
  this.t = 0, this.s = 0;
  for (var r = t.length, i = !1, o = 0; --r >= 0;) {
    var a = 8 == e ? 255 & t[r] : intAt(t, r);
    a < 0 ? "-" == t.charAt(r) && (i = !0) : (i = !1, 0 == o ? this[this.t++] = a : o + e > this.DB ? (this[this.t - 1] |= (a & (1 << this.DB - o) - 1) << o, this[this.t++] = a >> this.DB - o) : this[this.t - 1] |= a << o, (o += e) >= this.DB && (o -= this.DB))
  }
  8 == e && 0 != (128 & t[0]) && (this.s = -1, o > 0 && (this[this.t - 1] |= (1 << this.DB - o) - 1 << o)), this.clamp(), i && BigInteger.ZERO.subTo(this, this)
}

function bnpClamp() {
  for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;) --this.t
}

function bnToString(t) {
  if (this.s < 0) return "-" + this.negate().toString(t);
  var n;
  if (16 == t) n = 4;
  else if (8 == t) n = 3;
  else if (2 == t) n = 1;
  else if (32 == t) n = 5;
  else {
    if (4 != t) return this.toRadix(t);
    n = 2
  }
  var e, r = (1 << n) - 1,
    i = !1,
    o = "",
    a = this.t,
    s = this.DB - a * this.DB % n;
  if (a-- > 0)
    for (s < this.DB && (e = this[a] >> s) > 0 && (i = !0, o = int2char(e)); a >= 0;) s < n ? (e = (this[a] & (1 << s) - 1) << n - s, e |= this[--a] >> (s += this.DB - n)) : (e = this[a] >> (s -= n) & r, s <= 0 && (s += this.DB, --a)), e > 0 && (i = !0), i && (o += int2char(e));
  return i ? o : "0"
}

function bnNegate() {
  var t = nbi();
  return BigInteger.ZERO.subTo(this, t), t
}

function bnAbs() {
  return this.s < 0 ? this.negate() : this
}

function bnCompareTo(t) {
  var n = this.s - t.s;
  if (0 != n) return n;
  var e = this.t;
  if (0 != (n = e - t.t)) return this.s < 0 ? -n : n;
  for (; --e >= 0;)
    if (0 != (n = this[e] - t[e])) return n;
  return 0
}

function nbits(t) {
  var n, e = 1;
  return 0 != (n = t >>> 16) && (t = n, e += 16), 0 != (n = t >> 8) && (t = n, e += 8), 0 != (n = t >> 4) && (t = n, e += 4), 0 != (n = t >> 2) && (t = n, e += 2), 0 != (n = t >> 1) && (t = n, e += 1), e
}

function bnBitLength() {
  return this.t <= 0 ? 0 : this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM)
}

function bnpDLShiftTo(t, n) {
  var e;
  for (e = this.t - 1; e >= 0; --e) n[e + t] = this[e];
  for (e = t - 1; e >= 0; --e) n[e] = 0;
  n.t = this.t + t, n.s = this.s
}

function bnpDRShiftTo(t, n) {
  for (var e = t; e < this.t; ++e) n[e - t] = this[e];
  n.t = Math.max(this.t - t, 0), n.s = this.s
}

function bnpLShiftTo(t, n) {
  var e, r = t % this.DB,
    i = this.DB - r,
    o = (1 << i) - 1,
    a = Math.floor(t / this.DB),
    s = this.s << r & this.DM;
  for (e = this.t - 1; e >= 0; --e) n[e + a + 1] = this[e] >> i | s, s = (this[e] & o) << r;
  for (e = a - 1; e >= 0; --e) n[e] = 0;
  n[a] = s, n.t = this.t + a + 1, n.s = this.s, n.clamp()
}

function bnpRShiftTo(t, n) {
  n.s = this.s;
  var e = Math.floor(t / this.DB);
  if (e >= this.t) n.t = 0;
  else {
    var r = t % this.DB,
      i = this.DB - r,
      o = (1 << r) - 1;
    n[0] = this[e] >> r;
    for (var a = e + 1; a < this.t; ++a) n[a - e - 1] |= (this[a] & o) << i, n[a - e] = this[a] >> r;
    r > 0 && (n[this.t - e - 1] |= (this.s & o) << i), n.t = this.t - e, n.clamp()
  }
}

function bnpSubTo(t, n) {
  for (var e = 0, r = 0, i = Math.min(t.t, this.t); e < i;) r += this[e] - t[e], n[e++] = r & this.DM, r >>= this.DB;
  if (t.t < this.t) {
    for (r -= t.s; e < this.t;) r += this[e], n[e++] = r & this.DM, r >>= this.DB;
    r += this.s
  } else {
    for (r += this.s; e < t.t;) r -= t[e], n[e++] = r & this.DM, r >>= this.DB;
    r -= t.s
  }
  n.s = r < 0 ? -1 : 0, r < -1 ? n[e++] = this.DV + r : r > 0 && (n[e++] = r), n.t = e, n.clamp()
}

function bnpMultiplyTo(t, n) {
  var e = this.abs(),
    r = t.abs(),
    i = e.t;
  for (n.t = i + r.t; --i >= 0;) n[i] = 0;
  for (i = 0; i < r.t; ++i) n[i + e.t] = e.am(0, r[i], n, i, 0, e.t);
  n.s = 0, n.clamp(), this.s != t.s && BigInteger.ZERO.subTo(n, n)
}

function bnpSquareTo(t) {
  for (var n = this.abs(), e = t.t = 2 * n.t; --e >= 0;) t[e] = 0;
  for (e = 0; e < n.t - 1; ++e) {
    var r = n.am(e, n[e], t, 2 * e, 0, 1);
    (t[e + n.t] += n.am(e + 1, 2 * n[e], t, 2 * e + 1, r, n.t - e - 1)) >= n.DV && (t[e + n.t] -= n.DV, t[e + n.t + 1] = 1)
  }
  t.t > 0 && (t[t.t - 1] += n.am(e, n[e], t, 2 * e, 0, 1)), t.s = 0, t.clamp()
}

function bnpDivRemTo(t, n, e) {
  var r = t.abs();
  if (!(r.t <= 0)) {
    var i = this.abs();
    if (i.t < r.t) return null != n && n.fromInt(0), void(null != e && this.copyTo(e));
    null == e && (e = nbi());
    var o = nbi(),
      a = this.s,
      s = t.s,
      u = this.DB - nbits(r[r.t - 1]);
    u > 0 ? (r.lShiftTo(u, o), i.lShiftTo(u, e)) : (r.copyTo(o), i.copyTo(e));
    var l = o.t,
      p = o[l - 1];
    if (0 != p) {
      var h = p * (1 << this.F1) + (l > 1 ? o[l - 2] >> this.F2 : 0),
        g = this.FV / h,
        c = (1 << this.F1) / h,
        f = 1 << this.F2,
        m = e.t,
        y = m - l,
        b = null == n ? nbi() : n;
      for (o.dlShiftTo(y, b), e.compareTo(b) >= 0 && (e[e.t++] = 1, e.subTo(b, e)), BigInteger.ONE.dlShiftTo(l, b), b.subTo(o, o); o.t < l;) o[o.t++] = 0;
      for (; --y >= 0;) {
        var D = e[--m] == p ? this.DM : Math.floor(e[m] * g + (e[m - 1] + f) * c);
        if ((e[m] += o.am(0, D, e, y, 0, l)) < D)
          for (o.dlShiftTo(y, b), e.subTo(b, e); e[m] < --D;) e.subTo(b, e)
      }
      null != n && (e.drShiftTo(l, n), a != s && BigInteger.ZERO.subTo(n, n)), e.t = l, e.clamp(), u > 0 && e.rShiftTo(u, e), a < 0 && BigInteger.ZERO.subTo(e, e)
    }
  }
}

function bnMod(t) {
  var n = nbi();
  return this.abs().divRemTo(t, null, n), this.s < 0 && n.compareTo(BigInteger.ZERO) > 0 && t.subTo(n, n), n
}

function Classic(t) {
  this.m = t
}

function cConvert(t) {
  return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
}

function cRevert(t) {
  return t
}

function cReduce(t) {
  t.divRemTo(this.m, null, t)
}

function cMulTo(t, n, e) {
  t.multiplyTo(n, e), this.reduce(e)
}

function cSqrTo(t, n) {
  t.squareTo(n), this.reduce(n)
}

function bnpInvDigit() {
  if (this.t < 1) return 0;
  var t = this[0];
  if (0 == (1 & t)) return 0;
  var n = 3 & t;
  return n = n * (2 - (15 & t) * n) & 15, n = n * (2 - (255 & t) * n) & 255, n = n * (2 - ((65535 & t) * n & 65535)) & 65535, n = n * (2 - t * n % this.DV) % this.DV, n > 0 ? this.DV - n : -n
}

function Montgomery(t) {
  this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t
}

function montConvert(t) {
  var n = nbi();
  return t.abs().dlShiftTo(this.m.t, n), n.divRemTo(this.m, null, n), t.s < 0 && n.compareTo(BigInteger.ZERO) > 0 && this.m.subTo(n, n), n
}

function montRevert(t) {
  var n = nbi();
  return t.copyTo(n), this.reduce(n), n
}

function montReduce(t) {
  for (; t.t <= this.mt2;) t[t.t++] = 0;
  for (var n = 0; n < this.m.t; ++n) {
    var e = 32767 & t[n],
      r = e * this.mpl + ((e * this.mph + (t[n] >> 15) * this.mpl & this.um) << 15) & t.DM;
    for (t[e = n + this.m.t] += this.m.am(0, r, t, n, 0, this.m.t); t[e] >= t.DV;) t[e] -= t.DV, t[++e]++
  }
  t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
}

function montSqrTo(t, n) {
  t.squareTo(n), this.reduce(n)
}

function montMulTo(t, n, e) {
  t.multiplyTo(n, e), this.reduce(e)
}

function bnpIsEven() {
  return 0 == (this.t > 0 ? 1 & this[0] : this.s)
}

function bnpExp(t, n) {
  if (t > 4294967295 || t < 1) return BigInteger.ONE;
  var e = nbi(),
    r = nbi(),
    i = n.convert(this),
    o = nbits(t) - 1;
  for (i.copyTo(e); --o >= 0;)
    if (n.sqrTo(e, r), (t & 1 << o) > 0) n.mulTo(r, i, e);
    else {
      var a = e;
      e = r, r = a
    }
  return n.revert(e)
}

function bnModPowInt(t, n) {
  var e;
  return e = t < 256 || n.isEven() ? new Classic(n) : new Montgomery(n), this.exp(t, e)
}

function Arcfour() {
  this.i = 0, this.j = 0, this.S = new Array
}

function ARC4init(t) {
  var n, e, r;
  for (n = 0; n < 256; ++n) this.S[n] = n;
  for (e = 0, n = 0; n < 256; ++n) e = e + this.S[n] + t[n % t.length] & 255, r = this.S[n], this.S[n] = this.S[e], this.S[e] = r;
  this.i = 0, this.j = 0
}

function ARC4next() {
  var t;
  return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255]
}

function prng_newstate() {
  return new Arcfour
}

function rng_seed_int(t) {
  rng_pool[rng_pptr++] ^= 255 & t, rng_pool[rng_pptr++] ^= t >> 8 & 255, rng_pool[rng_pptr++] ^= t >> 16 & 255, rng_pool[rng_pptr++] ^= t >> 24 & 255, rng_pptr >= rng_psize && (rng_pptr -= rng_psize)
}

function rng_seed_time() {
  rng_seed_int((new Date).getTime())
}

function rng_get_byte() {
  if (null == rng_state) {
    for (rng_seed_time(), (rng_state = prng_newstate()).init(rng_pool), rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) rng_pool[rng_pptr] = 0;
    rng_pptr = 0
  }
  return rng_state.next()
}

function rng_get_bytes(t) {
  var n;
  for (n = 0; n < t.length; ++n) t[n] = rng_get_byte()
}

function SecureRandom() {}

function parseBigInt(t, n) {
  return new BigInteger(t, n)
}

function linebrk(t, n) {
  for (var e = "", r = 0; r + n < t.length;) e += t.substring(r, r + n) + "\n", r += n;
  return e + t.substring(r, t.length)
}

function byte2Hex(t) {
  return t < 16 ? "0" + t.toString(16) : t.toString(16)
}

function pkcs1pad2(t, n) {
  if (n < t.length + 11) return alert("Message too long for RSA"), null;
  for (var e = new Array, r = t.length - 1; r >= 0 && n > 0;) {
    var i = t.charCodeAt(r--);
    i < 128 ? e[--n] = i : i > 127 && i < 2048 ? (e[--n] = 63 & i | 128, e[--n] = i >> 6 | 192) : (e[--n] = 63 & i | 128, e[--n] = i >> 6 & 63 | 128, e[--n] = i >> 12 | 224)
  }
  e[--n] = 0;
  for (var o = new SecureRandom, a = new Array; n > 2;) {
    for (a[0] = 0; 0 == a[0];) o.nextBytes(a);
    e[--n] = a[0]
  }
  return e[--n] = 2, e[--n] = 0, new BigInteger(e)
}

function pkcs1pad2Uint8(t, n) {
  if (n < t.length + 11) return alert("Message too long for RSA"), null;
  for (var e = new Array, r = t.length - 1; r >= 0 && n > 0;) {
    var i = t[r--];
    e[--n] = i
  }
  e[--n] = 0;
  for (var o = new SecureRandom, a = new Array; n > 2;) {
    for (a[0] = 0; 0 == a[0];) o.nextBytes(a);
    e[--n] = a[0]
  }
  return e[--n] = 2, e[--n] = 0, new BigInteger(e)
}

function RSAKey() {
  this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null
}

function RSASetPublic(t, n) {
  null != t && null != n && t.length > 0 && n.length > 0 ? (this.n = parseBigInt(t, 16), this.e = parseInt(n, 16)) : alert("Invalid RSA public key")
}

function RSADoPublic(t) {
  return t.modPowInt(this.e, this.n)
}

function RSAEncrypt(t) {
  var n = pkcs1pad2(t, this.n.bitLength() + 7 >> 3);
  if (null == n) return null;
  var e = this.doPublic(n);
  if (null == e) return null;
  var r = e.toString(16);
  return 0 == (1 & r.length) ? r : "0" + r
}

function RSAUint8ArrayEncrypt(t) {
  var n = pkcs1pad2Uint8(t, this.n.bitLength() + 7 >> 3);
  if (null == n) return null;
  var e = this.doPublic(n);
  if (null == e) return null;
  var r = e.toString(16);
  return 0 == (1 & r.length) ? r : "0" + r
}

function aesEncrypt(t, n) {
  var e = aes.CryptoJS.enc.Hex.parse(n);
  return aes.CryptoJS.AES.encrypt(t, e)
}

function tripleDesEncrypt(t, n) {
  var e = tripledes.CryptoJS.enc.Hex.parse(n);
  return tripledes.CryptoJS.TripleDES.encrypt(t, e, {
    mode: tripledes.CryptoJS.mode.ECB,
    padding: tripledes.CryptoJS.pad.Pkcs7
  })
}

function sha1Digest(t) {
  return fun_sha1.hex_sha1(t)
}

function md5Digest(t) {
  return aes.CryptoJS.MD5(t)
}

function rsaPubkeyEnc(t, n, e) {
  var r = new RSAKey;
  r.setPublic(t, n);
  var i = r.encrypt(e),
    o = tools.hexStrToUint8Array(i);
  return tools.encodeUint8Array(o)
}

function rsaPubkeyUint8Enc(t, n, e) {
  var r = new RSAKey;
  r.setPublic(t, n);
  var i = r.encryptUint8(e),
    o = tools.hexStrToUint8Array(i);
  return tools.encodeUint8Array(o)
}

function rsaPubkeyEncByDefault(t) {
  return rsaPubkeyEnc(pubN, pubE, t)
}

function rsaPubkeyUint8EncByDefault(t) {
  return rsaPubkeyUint8Enc(pubN, pubE, t)
}
var anysignWebBean = require("anysignWebBean.js"),
  fun_sha1 = require("../../utils/sha1.js"),
  tools = require("../../utils/tools.js"),
  anysignBean = require("../../utils/anysignBean.js"),
  anysignUI = require("anysignWXUI.js"),
  aes = require("../../utils/aesHand.js"),
  tripledes = require("../../utils/tripledes.js"),
  ContextID = {
    FORMDATA_XML: 10,
    FORMDATA_HTML: 11,
    FORMDATA_PDF: 12,
    FORMDATA_JSON: 13,
    FORMDATA_PRESERVED: 19
  },
  isLock = !1,
  mCallback, mIsInitialized = !1,
  mTemplateSet = !1,
  mTid, mWONo, mWOHash, mChannel, signData = [],
  signObjArray = [],
  soundObjArray = [],
  photoObjArray = [],
  mDatas = [],
  mDataObjArray = [],
  mCachetObjArray = [],
  mPhotoEviCache, mSoundEviCache, mPhotoArrayCache = [],
  mSoundArrayCache = [],
  identifyCallBack, context_view, root;
module.exports = {
  initAnySignApi: _initAnySignApi,
  _addSignatureObj: _addSignatureObj,
  _commitConfig: _commitConfig,
  _setTemplate: _setTemplate,
  _addChachetobj: _addChachetObj,
  _showSignatureDialog: _showSignatureDialog,
  _isReadyToUpload: _isReadyToUpload,
  _getUploadDataGram: _getUploadDataGram,
  _addEvidence: _addEvidence,
  _CSJIAMIBAO: CSJIAMIBAO
};
var dbits, canary = 0xdeadbeefcafe,
  j_lm = 15715070 == (16777215 & canary);
BigInteger.prototype.am = am3, dbits = 28, BigInteger.prototype.DB = dbits, BigInteger.prototype.DM = (1 << dbits) - 1, BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP), BigInteger.prototype.F1 = BI_FP - dbits, BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz",
  BI_RC = new Array,
  rr, vv;
for (rr = "0".charCodeAt(0), vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
for (rr = "a".charCodeAt(0), vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
for (rr = "A".charCodeAt(0), vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
Classic.prototype.convert = cConvert, Classic.prototype.revert = cRevert, Classic.prototype.reduce = cReduce, Classic.prototype.mulTo = cMulTo, Classic.prototype.sqrTo = cSqrTo, Montgomery.prototype.convert = montConvert, Montgomery.prototype.revert = montRevert, Montgomery.prototype.reduce = montReduce, Montgomery.prototype.mulTo = montMulTo, Montgomery.prototype.sqrTo = montSqrTo, BigInteger.prototype.copyTo = bnpCopyTo, BigInteger.prototype.fromInt = bnpFromInt, BigInteger.prototype.fromString = bnpFromString, BigInteger.prototype.clamp = bnpClamp, BigInteger.prototype.dlShiftTo = bnpDLShiftTo, BigInteger.prototype.drShiftTo = bnpDRShiftTo, BigInteger.prototype.lShiftTo = bnpLShiftTo, BigInteger.prototype.rShiftTo = bnpRShiftTo, BigInteger.prototype.subTo = bnpSubTo, BigInteger.prototype.multiplyTo = bnpMultiplyTo, BigInteger.prototype.squareTo = bnpSquareTo, BigInteger.prototype.divRemTo = bnpDivRemTo, BigInteger.prototype.invDigit = bnpInvDigit, BigInteger.prototype.isEven = bnpIsEven, BigInteger.prototype.exp = bnpExp, BigInteger.prototype.toString = bnToString, BigInteger.prototype.negate = bnNegate, BigInteger.prototype.abs = bnAbs, BigInteger.prototype.compareTo = bnCompareTo, BigInteger.prototype.bitLength = bnBitLength, BigInteger.prototype.mod = bnMod, BigInteger.prototype.modPowInt = bnModPowInt, BigInteger.ZERO = nbv(0), BigInteger.ONE = nbv(1), Arcfour.prototype.init = ARC4init, Arcfour.prototype.next = ARC4next;
var rng_psize = 256,
  rng_state, rng_pool, rng_pptr;
if (null == rng_pool) {
  rng_pool = new Array, rng_pptr = 0;
  for (var t, ua = new Uint8Array(32), i = 0; i < 32; i++) {
    var r = 100 * Math.random();
    ua[i] = r
  }
  for (t = 0; t < 32; ++t) rng_pool[rng_pptr++] = ua[t];
  for (; rng_pptr < rng_psize;) t = Math.floor(65536 * Math.random()), rng_pool[rng_pptr++] = t >>> 8, rng_pool[rng_pptr++] = 255 & t;
  rng_pptr = 0, rng_seed_time()
}
SecureRandom.prototype.nextBytes = rng_get_bytes, RSAKey.prototype.doPublic = RSADoPublic, RSAKey.prototype.setPublic = RSASetPublic, RSAKey.prototype.encrypt = RSAEncrypt, RSAKey.prototype.encryptUint8 = RSAUint8ArrayEncrypt;
var iv = aes.CryptoJS.enc.Utf8.parse("6666666666666666"),
  pubN = "83e29ad607ef8b2ea80358780683ab860c50f55eef50e25b9fa0f4afefa8a2f3e1b570ecec707a0f2a65efcc74c6783a10c9d55a490ede7a542f6fe9e6cd525d4bb3772dd2315ceb1c5978ad83599965f5f8458c23e4c2169cb2ae101879c556785b67a13ce7e701c70061885a705e66057da79f64b1c9d8454320273336e6a1",
  pubE = "10001",
  encCertSN = "102450000000000001";