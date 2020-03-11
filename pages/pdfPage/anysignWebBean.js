/**
 * bjca
 * @author caolili
 */
function AnySignRoot() {
  this.Version = "4.7", this.EncCertSN = null, this.EncKey = null, this.TermSrc = "PAD", this.Digest = null, this.EncData = null
}

function Digest() {
  this.Alg = null, this.Value = null
}

function FormInfo() {
  this.WONo = null, this.WOHash = null, this.IsSync = !1, this.IsUnit = !1, this.EncAlg = "RSA", this.FlowID = null, this.Channel = null, this.USignArray = [], this.DataArray = [], this.CachetArray = [], this.ExtInfo = null
}

function SaveFormInfo() {
  this.WONo = null, this.WOHash = null, this.Channel = null, this.EncAlg = "RSA", this.USignObjs = [], this.USignConfigs = [], this.DataObjs = [], this.DataConfigs = [], this.CachetArray = []
}

function ExtInfo() {}

function PlainData() {
  this.P10Data = null, this.CertOID = null
}

function P10Data() {
  this.RawHash = null, this.Hash = null, this.Value = null, this.ValueType = null, this.P10SignValue = null, this.Hashalg = null, this.Dn = null, this.IDType = null, this.IDNumber = null, this.Templname = "3", this.Channel = "10000"
}

function CertOID() {
  this.Version = "3.2", this.IDType = null, this.IDNumber = null, this.RawHash = null, this.BioFeature = null, this.ClientOS = null
}

function BioFeature() {
  this.PhotoArray = [], this.SoundArray = [], this.Script = null
}

function Script() {
  this.Format = "zip", this.Width = "180", this.Color = null, this.Count = null, this.Data = null, this.Device = null, this.RefHeight = 99999, this.RefWidth = 99999, this.Geoloca = null
}

function Device() {
  this.DeviceName = "", this.SampleRate = "1024", this.PressMax = "1024", this.Width = 99999, this.Height = 99999, this.DriverVer = "v1.0", this.DeviceID = "", this.CertInfo = null
}

function ClientOS() {
  this.Name = "", this.Edition = "", this.ServicePack = "None", this.Version = "", this.OSArch = "32/64", this.DeviceID = ""
}

function ImageSize(t, i) {
  this.Width = t, this.Height = i, this.Unit = "dp"
}

function SignatureObj() {
  this.Cid = 0, this.SignRule = null, this.Signer = null, this.Image = null, this.ImageSize = null, this.IsTSS = !1, this.Points = null, this.ImageFMT = getApp().globalData.DataFormat.IMAGE_PNG, this.TimeTag = null
}

function DataObj() {
  this.Cid = 0, this.OwnerCid = 0, this.PointHash = null, this.Data = null, this.Name = null, this.Format = null, this.PDFCrdRule = null
}

function PDFCrdRule() {
  this.DocCrdTid = null, this.DocFormat = null, this.DocStyleTid = null
}
var SoundEvidence = function() {
    this.Format = null, this.Hash = null, this.BioType = null
  },
  PhotoEvidence = function() {
    this.Format = null, this.Hash = null, this.BioType = null
  };
module.exports = {
  AnySignRoot: AnySignRoot,
  Digest: Digest,
  FormInfo: FormInfo,
  SaveFormInfo: SaveFormInfo,
  ExtInfo: ExtInfo,
  PlainData: PlainData,
  P10Data: P10Data,
  CertOID: CertOID,
  BioFeature: BioFeature,
  Script: Script,
  Device: Device,
  ClientOS: ClientOS,
  ImageSize: ImageSize,
  SignatureObj: SignatureObj,
  DataObj: DataObj,
  PDFCrdRule: PDFCrdRule,
  SoundEvidence: SoundEvidence,
  PhotoEvidence: PhotoEvidence
};