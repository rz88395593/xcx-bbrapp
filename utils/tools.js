/**
 * bjca
 * @author caolili
 */
function encodeUint8Array(r){for(var t,n=0,e=r.length,o="",a="";n<e;){for(var i=0,c=(t=r.subarray(n,Math.min(n+32768,e))).length;i<c;i++)a+=String.fromCharCode(t[i]);o+=a,n+=32768,a=""}return btoa(o)}function decodeUint8ArrayB64(r){return new Uint8Array(atob(r).split("").map(function(r){return r.charCodeAt(0)}))}function encode(r){var t,n,e,o,a,i,c,f="",h=0;for(r=Base64._utf8_encode(r);h<r.length;)o=(t=r.charCodeAt(h++))>>2,a=(3&t)<<4|(n=r.charCodeAt(h++))>>4,i=(15&n)<<2|(e=r.charCodeAt(h++))>>6,c=63&e,isNaN(n)?i=c=64:isNaN(e)&&(c=64),f=f+this._keyStr.charAt(o)+this._keyStr.charAt(a)+this._keyStr.charAt(i)+this._keyStr.charAt(c);return f}function decode(r){var t,n,e,o,a,i,c="",f=0;for(r=r.replace(/[^A-Za-z0-9\+\/\=]/g,"");f<r.length;)t=this._keyStr.indexOf(r.charAt(f++))<<2|(o=this._keyStr.indexOf(r.charAt(f++)))>>4,n=(15&o)<<4|(a=this._keyStr.indexOf(r.charAt(f++)))>>2,e=(3&a)<<6|(i=this._keyStr.indexOf(r.charAt(f++))),c+=String.fromCharCode(t),64!=a&&(c+=String.fromCharCode(n)),64!=i&&(c+=String.fromCharCode(e));return c=Base64._utf8_decode(c)}function _utf8_encode(r){r=r.replace(/\r\n/g,"\n");for(var t="",n=0;n<r.length;n++){var e=r.charCodeAt(n);e<128?t+=String.fromCharCode(e):e>127&&e<2048?(t+=String.fromCharCode(e>>6|192),t+=String.fromCharCode(63&e|128)):(t+=String.fromCharCode(e>>12|224),t+=String.fromCharCode(e>>6&63|128),t+=String.fromCharCode(63&e|128))}return t}function _utf8_decode(r){for(var t="",n=0,e=0,o=0,a=0;n<r.length;)(e=r.charCodeAt(n))<128?(t+=String.fromCharCode(e),n++):e>191&&e<224?(o=r.charCodeAt(n+1),t+=String.fromCharCode((31&e)<<6|63&o),n+=2):(o=r.charCodeAt(n+1),a=r.charCodeAt(n+2),t+=String.fromCharCode((15&e)<<12|(63&o)<<6|63&a),n+=3);return t}function uint32ArrayToUint8Array(r){if(!r)return null;for(var t,n=new Uint8Array(4*r.length),e=0,o=r.length;e<o;e++)n[t=e<<2]=r[e]>>24&255,n[t+1]=r[e]>>16&255,n[t+2]=r[e]>>8&255,n[t+3]=255&r[e];return n}function uint8ArrayToHexStr(r){if(!r)return null;for(var t="",n=0;n<r.length;n++){var e=r[n];t+=hexEncodeArray[e>>>4],t+=hexEncodeArray[15&e]}return t}function hexStrToUint8Array(r){if(!r||r.length%2!=0)return null;for(var t=[],n=0;n<r.length;n+=2)t.push(parseInt("0x"+r.substr(n,2),16));return new Uint8Array(t)}function hexStrToUint8Str(r){if(!r||r.length%2!=0)return null;for(var t="",n=0;n<r.length;n+=2)t+=String.fromCharCode(parseInt("0x"+r.substr(n,2),16));return decodeURIComponent(escape(t))}function strToUtf8ArrayUint8(r){for(var t=unescape(encodeURIComponent(r)),n=new Uint8Array(t.length),e=0;e<t.length;e++)n[e]=t.charCodeAt(e);return n}function utf8ArrayUint8ToStr(r){for(var t="",n=0;n<r.length;n++)t+=String.fromCharCode(r[n]);return decodeURIComponent(escape(t))}function toUtf8str(r){return unescape(encodeURIComponent(r))}function uint8ArrayAscIIToStr(r){return String.fromCharCode.apply(null,r)}function strToUint8ArrayAscII(r){for(var t=new Uint8Array(r.length),n=0,e=r.length;n<e;++n)t[n]=r.charCodeAt(n);return t}function compressToB64(r){var t=new Zlibs.Deflate(r).compress();if(t instanceof Array){for(var n=new Uint8Array(t.length),e=0,o=n.length;e<o;++e)n[e]=t[e];t=n}return encodeUint8Array(t)}function stringify(r){return JSON.stringify(r)}function stringToObj(r){return JSON.parse(r)}function crc32(r){for(var t,n=[],e=0;e<256;e++){t=e;for(var o=0;o<8;o++)t=1&t?3988292384^t>>>1:t>>>1;n[e]=t}for(var a=-1,i=0;i<r.length;i++)a=a>>>8^n[255&(a^r.charCodeAt(i))];return(-1^a)>>>0}function btoa(r){var t,n,e="";for(t=0,n=r.length;t<n;t+=3){var o=255&r.charCodeAt(t),a=255&r.charCodeAt(t+1),i=255&r.charCodeAt(t+2),c=o>>2,f=(3&o)<<4|a>>4,h=t+1<n?(15&a)<<2|i>>6:64,d=t+2<n?63&i:64;e+=digits.charAt(c)+digits.charAt(f)+digits.charAt(h)+digits.charAt(d)}return e}var Zlibs=require("zlib.js"),_keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",hexEncodeArray=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],digits="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";module.exports={encodeUint8Array:encodeUint8Array,decodeUint8ArrayB64:decodeUint8ArrayB64,encode:encode,decode:decode,_utf8_encode:_utf8_encode,_utf8_decode:_utf8_decode,uint32ArrayToUint8Array:uint32ArrayToUint8Array,uint8ArrayToHexStr:uint8ArrayToHexStr,hexStrToUint8Array:hexStrToUint8Array,hexStrToUint8Str:hexStrToUint8Str,strToUtf8ArrayUint8:strToUtf8ArrayUint8,utf8ArrayUint8ToStr:utf8ArrayUint8ToStr,toUtf8str:toUtf8str,uint8ArrayAscIIToStr:uint8ArrayAscIIToStr,strToUint8ArrayAscII:strToUint8ArrayAscII,compressToB64:compressToB64,stringify:stringify,stringToObj:stringToObj,crc32:crc32};