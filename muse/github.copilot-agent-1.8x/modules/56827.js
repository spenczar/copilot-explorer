var n = require(56105);
var i = require(36147);
var o = (module.exports = n.util = n.util || {});
function s(e) {
  if (8 !== e && 16 !== e && 24 !== e && 32 !== e)
    throw new Error("Only 8, 16, 24, or 32 bits supported: " + e);
}
function a(e) {
  this.data = "";
  this.read = 0;
  if ("string" == typeof e) this.data = e;
  else if (o.isArrayBuffer(e) || o.isArrayBufferView(e)) {
    if ("undefined" != typeof Buffer && e instanceof Buffer)
      this.data = e.toString("binary");
    else {
      var t = new Uint8Array(e);
      try {
        this.data = String.fromCharCode.apply(null, t);
      } catch (e) {
        for (var r = 0; r < t.length; ++r) this.putByte(t[r]);
      }
    }
  } else
    (e instanceof a ||
      ("object" == typeof e &&
        "string" == typeof e.data &&
        "number" == typeof e.read)) &&
      ((this.data = e.data), (this.read = e.read));
  this._constructedStringLength = 0;
}
!(function () {
  if ("undefined" != typeof process && process.nextTick && !process.browser) {
    o.nextTick = process.nextTick;
    return void ("function" == typeof setImmediate
      ? (o.setImmediate = setImmediate)
      : (o.setImmediate = o.nextTick));
  }
  if ("function" == typeof setImmediate) {
    o.setImmediate = function () {
      return setImmediate.apply(undefined, arguments);
    };
    return void (o.nextTick = function (e) {
      return setImmediate(e);
    });
  }
  o.setImmediate = function (e) {
    setTimeout(e, 0);
  };
  if ("undefined" != typeof window && "function" == typeof window.postMessage) {
    var e = "forge.setImmediate",
      t = [];
    (o.setImmediate = function (r) {
      t.push(r), 1 === t.length && window.postMessage(e, "*");
    }),
      window.addEventListener(
        "message",
        function (r) {
          if (r.source === window && r.data === e) {
            r.stopPropagation();
            var n = t.slice();
            (t.length = 0),
              n.forEach(function (e) {
                e();
              });
          }
        },
        !0
      );
  }
  if ("undefined" != typeof MutationObserver) {
    var r = Date.now();
    var n = true;
    var i = document.createElement("div");
    t = [];
    new MutationObserver(function () {
      var e = t.slice();
      t.length = 0;
      e.forEach(function (e) {
        e();
      });
    }).observe(i, {
      attributes: true,
    });
    var s = o.setImmediate;
    o.setImmediate = function (e) {
      if (Date.now() - r > 15) {
        r = Date.now();
        s(e);
      } else {
        t.push(e);
        if (1 === t.length) {
          i.setAttribute("a", (n = !n));
        }
      }
    };
  }
  o.nextTick = o.setImmediate;
})();
o.isNodejs =
  "undefined" != typeof process && process.versions && process.versions.node;
o.globalScope = o.isNodejs
  ? global
  : "undefined" == typeof self
  ? window
  : self;
o.isArray =
  Array.isArray ||
  function (e) {
    return "[object Array]" === Object.prototype.toString.call(e);
  };
o.isArrayBuffer = function (e) {
  return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer;
};
o.isArrayBufferView = function (e) {
  return e && o.isArrayBuffer(e.buffer) && undefined !== e.byteLength;
};
o.ByteBuffer = a;
o.ByteStringBuffer = a;
o.ByteStringBuffer.prototype._optimizeConstructedString = function (e) {
  this._constructedStringLength += e;
  if (this._constructedStringLength > 4096) {
    this.data.substr(0, 1);
    this._constructedStringLength = 0;
  }
};
o.ByteStringBuffer.prototype.length = function () {
  return this.data.length - this.read;
};
o.ByteStringBuffer.prototype.isEmpty = function () {
  return this.length() <= 0;
};
o.ByteStringBuffer.prototype.putByte = function (e) {
  return this.putBytes(String.fromCharCode(e));
};
o.ByteStringBuffer.prototype.fillWithByte = function (e, t) {
  e = String.fromCharCode(e);
  for (var r = this.data; t > 0; ) {
    if (1 & t) {
      r += e;
    }
    if ((t >>>= 1) > 0) {
      e += e;
    }
  }
  this.data = r;
  this._optimizeConstructedString(t);
  return this;
};
o.ByteStringBuffer.prototype.putBytes = function (e) {
  this.data += e;
  this._optimizeConstructedString(e.length);
  return this;
};
o.ByteStringBuffer.prototype.putString = function (e) {
  return this.putBytes(o.encodeUtf8(e));
};
o.ByteStringBuffer.prototype.putInt16 = function (e) {
  return this.putBytes(
    String.fromCharCode((e >> 8) & 255) + String.fromCharCode(255 & e)
  );
};
o.ByteStringBuffer.prototype.putInt24 = function (e) {
  return this.putBytes(
    String.fromCharCode((e >> 16) & 255) +
      String.fromCharCode((e >> 8) & 255) +
      String.fromCharCode(255 & e)
  );
};
o.ByteStringBuffer.prototype.putInt32 = function (e) {
  return this.putBytes(
    String.fromCharCode((e >> 24) & 255) +
      String.fromCharCode((e >> 16) & 255) +
      String.fromCharCode((e >> 8) & 255) +
      String.fromCharCode(255 & e)
  );
};
o.ByteStringBuffer.prototype.putInt16Le = function (e) {
  return this.putBytes(
    String.fromCharCode(255 & e) + String.fromCharCode((e >> 8) & 255)
  );
};
o.ByteStringBuffer.prototype.putInt24Le = function (e) {
  return this.putBytes(
    String.fromCharCode(255 & e) +
      String.fromCharCode((e >> 8) & 255) +
      String.fromCharCode((e >> 16) & 255)
  );
};
o.ByteStringBuffer.prototype.putInt32Le = function (e) {
  return this.putBytes(
    String.fromCharCode(255 & e) +
      String.fromCharCode((e >> 8) & 255) +
      String.fromCharCode((e >> 16) & 255) +
      String.fromCharCode((e >> 24) & 255)
  );
};
o.ByteStringBuffer.prototype.putInt = function (e, t) {
  s(t);
  var r = "";
  do {
    t -= 8;
    r += String.fromCharCode((e >> t) & 255);
  } while (t > 0);
  return this.putBytes(r);
};
o.ByteStringBuffer.prototype.putSignedInt = function (e, t) {
  if (e < 0) {
    e += 2 << (t - 1);
  }
  return this.putInt(e, t);
};
o.ByteStringBuffer.prototype.putBuffer = function (e) {
  return this.putBytes(e.getBytes());
};
o.ByteStringBuffer.prototype.getByte = function () {
  return this.data.charCodeAt(this.read++);
};
o.ByteStringBuffer.prototype.getInt16 = function () {
  var e =
    (this.data.charCodeAt(this.read) << 8) ^
    this.data.charCodeAt(this.read + 1);
  this.read += 2;
  return e;
};
o.ByteStringBuffer.prototype.getInt24 = function () {
  var e =
    (this.data.charCodeAt(this.read) << 16) ^
    (this.data.charCodeAt(this.read + 1) << 8) ^
    this.data.charCodeAt(this.read + 2);
  this.read += 3;
  return e;
};
o.ByteStringBuffer.prototype.getInt32 = function () {
  var e =
    (this.data.charCodeAt(this.read) << 24) ^
    (this.data.charCodeAt(this.read + 1) << 16) ^
    (this.data.charCodeAt(this.read + 2) << 8) ^
    this.data.charCodeAt(this.read + 3);
  this.read += 4;
  return e;
};
o.ByteStringBuffer.prototype.getInt16Le = function () {
  var e =
    this.data.charCodeAt(this.read) ^
    (this.data.charCodeAt(this.read + 1) << 8);
  this.read += 2;
  return e;
};
o.ByteStringBuffer.prototype.getInt24Le = function () {
  var e =
    this.data.charCodeAt(this.read) ^
    (this.data.charCodeAt(this.read + 1) << 8) ^
    (this.data.charCodeAt(this.read + 2) << 16);
  this.read += 3;
  return e;
};
o.ByteStringBuffer.prototype.getInt32Le = function () {
  var e =
    this.data.charCodeAt(this.read) ^
    (this.data.charCodeAt(this.read + 1) << 8) ^
    (this.data.charCodeAt(this.read + 2) << 16) ^
    (this.data.charCodeAt(this.read + 3) << 24);
  this.read += 4;
  return e;
};
o.ByteStringBuffer.prototype.getInt = function (e) {
  s(e);
  var t = 0;
  do {
    t = (t << 8) + this.data.charCodeAt(this.read++);
    e -= 8;
  } while (e > 0);
  return t;
};
o.ByteStringBuffer.prototype.getSignedInt = function (e) {
  var t = this.getInt(e);
  var r = 2 << (e - 2);
  if (t >= r) {
    t -= r << 1;
  }
  return t;
};
o.ByteStringBuffer.prototype.getBytes = function (e) {
  var t;
  if (e) {
    e = Math.min(this.length(), e);
    t = this.data.slice(this.read, this.read + e);
    this.read += e;
  } else {
    if (0 === e) {
      t = "";
    } else {
      t = 0 === this.read ? this.data : this.data.slice(this.read);
      this.clear();
    }
  }
  return t;
};
o.ByteStringBuffer.prototype.bytes = function (e) {
  return undefined === e
    ? this.data.slice(this.read)
    : this.data.slice(this.read, this.read + e);
};
o.ByteStringBuffer.prototype.at = function (e) {
  return this.data.charCodeAt(this.read + e);
};
o.ByteStringBuffer.prototype.setAt = function (e, t) {
  this.data =
    this.data.substr(0, this.read + e) +
    String.fromCharCode(t) +
    this.data.substr(this.read + e + 1);
  return this;
};
o.ByteStringBuffer.prototype.last = function () {
  return this.data.charCodeAt(this.data.length - 1);
};
o.ByteStringBuffer.prototype.copy = function () {
  var e = o.createBuffer(this.data);
  e.read = this.read;
  return e;
};
o.ByteStringBuffer.prototype.compact = function () {
  if (this.read > 0) {
    this.data = this.data.slice(this.read);
    this.read = 0;
  }
  return this;
};
o.ByteStringBuffer.prototype.clear = function () {
  this.data = "";
  this.read = 0;
  return this;
};
o.ByteStringBuffer.prototype.truncate = function (e) {
  var t = Math.max(0, this.length() - e);
  this.data = this.data.substr(this.read, t);
  this.read = 0;
  return this;
};
o.ByteStringBuffer.prototype.toHex = function () {
  for (e = "", t = this.read, undefined; t < this.data.length; ++t) {
    var e;
    var t;
    var r = this.data.charCodeAt(t);
    if (r < 16) {
      e += "0";
    }
    e += r.toString(16);
  }
  return e;
};
o.ByteStringBuffer.prototype.toString = function () {
  return o.decodeUtf8(this.bytes());
};
o.DataBuffer = function (e, t) {
  t = t || {};
  this.read = t.readOffset || 0;
  this.growSize = t.growSize || 1024;
  var r = o.isArrayBuffer(e);
  var n = o.isArrayBufferView(e);
  if (r || n) {
    this.data = r
      ? new DataView(e)
      : new DataView(e.buffer, e.byteOffset, e.byteLength);
    return void (this.write =
      "writeOffset" in t ? t.writeOffset : this.data.byteLength);
  }
  this.data = new DataView(new ArrayBuffer(0));
  this.write = 0;
  if (null != e) {
    this.putBytes(e);
  }
  if ("writeOffset" in t) {
    this.write = t.writeOffset;
  }
};
o.DataBuffer.prototype.length = function () {
  return this.write - this.read;
};
o.DataBuffer.prototype.isEmpty = function () {
  return this.length() <= 0;
};
o.DataBuffer.prototype.accommodate = function (e, t) {
  if (this.length() >= e) return this;
  t = Math.max(t || this.growSize, e);
  var r = new Uint8Array(
    this.data.buffer,
    this.data.byteOffset,
    this.data.byteLength
  );
  var n = new Uint8Array(this.length() + t);
  n.set(r);
  this.data = new DataView(n.buffer);
  return this;
};
o.DataBuffer.prototype.putByte = function (e) {
  this.accommodate(1);
  this.data.setUint8(this.write++, e);
  return this;
};
o.DataBuffer.prototype.fillWithByte = function (e, t) {
  this.accommodate(t);
  for (var r = 0; r < t; ++r) this.data.setUint8(e);
  return this;
};
o.DataBuffer.prototype.putBytes = function (e, t) {
  if (o.isArrayBufferView(e)) {
    var r =
      (n = new Uint8Array(e.buffer, e.byteOffset, e.byteLength)).byteLength -
      n.byteOffset;
    this.accommodate(r);
    new Uint8Array(this.data.buffer, this.write).set(n);
    this.write += r;
    return this;
  }
  if (o.isArrayBuffer(e)) {
    var n = new Uint8Array(e);
    this.accommodate(n.byteLength);
    new Uint8Array(this.data.buffer).set(n, this.write);
    this.write += n.byteLength;
    return this;
  }
  if (
    e instanceof o.DataBuffer ||
    ("object" == typeof e &&
      "number" == typeof e.read &&
      "number" == typeof e.write &&
      o.isArrayBufferView(e.data))
  ) {
    n = new Uint8Array(e.data.byteLength, e.read, e.length());
    this.accommodate(n.byteLength);
    new Uint8Array(e.data.byteLength, this.write).set(n);
    this.write += n.byteLength;
    return this;
  }
  if (e instanceof o.ByteStringBuffer) {
    e = e.data;
    t = "binary";
  }
  t = t || "binary";
  if ("string" == typeof e) {
    var i;
    if ("hex" === t)
      return (
        this.accommodate(Math.ceil(e.length / 2)),
        (i = new Uint8Array(this.data.buffer, this.write)),
        (this.write += o.binary.hex.decode(e, i, this.write)),
        this
      );
    if ("base64" === t)
      return (
        this.accommodate(3 * Math.ceil(e.length / 4)),
        (i = new Uint8Array(this.data.buffer, this.write)),
        (this.write += o.binary.base64.decode(e, i, this.write)),
        this
      );
    if (
      ("utf8" === t && ((e = o.encodeUtf8(e)), (t = "binary")),
      "binary" === t || "raw" === t)
    )
      return (
        this.accommodate(e.length),
        (i = new Uint8Array(this.data.buffer, this.write)),
        (this.write += o.binary.raw.decode(i)),
        this
      );
    if ("utf16" === t)
      return (
        this.accommodate(2 * e.length),
        (i = new Uint16Array(this.data.buffer, this.write)),
        (this.write += o.text.utf16.encode(i)),
        this
      );
    throw new Error("Invalid encoding: " + t);
  }
  throw Error("Invalid parameter: " + e);
};
o.DataBuffer.prototype.putBuffer = function (e) {
  this.putBytes(e);
  e.clear();
  return this;
};
o.DataBuffer.prototype.putString = function (e) {
  return this.putBytes(e, "utf16");
};
o.DataBuffer.prototype.putInt16 = function (e) {
  this.accommodate(2);
  this.data.setInt16(this.write, e);
  this.write += 2;
  return this;
};
o.DataBuffer.prototype.putInt24 = function (e) {
  this.accommodate(3);
  this.data.setInt16(this.write, (e >> 8) & 65535);
  this.data.setInt8(this.write, (e >> 16) & 255);
  this.write += 3;
  return this;
};
o.DataBuffer.prototype.putInt32 = function (e) {
  this.accommodate(4);
  this.data.setInt32(this.write, e);
  this.write += 4;
  return this;
};
o.DataBuffer.prototype.putInt16Le = function (e) {
  this.accommodate(2);
  this.data.setInt16(this.write, e, true);
  this.write += 2;
  return this;
};
o.DataBuffer.prototype.putInt24Le = function (e) {
  this.accommodate(3);
  this.data.setInt8(this.write, (e >> 16) & 255);
  this.data.setInt16(this.write, (e >> 8) & 65535, true);
  this.write += 3;
  return this;
};
o.DataBuffer.prototype.putInt32Le = function (e) {
  this.accommodate(4);
  this.data.setInt32(this.write, e, true);
  this.write += 4;
  return this;
};
o.DataBuffer.prototype.putInt = function (e, t) {
  s(t);
  this.accommodate(t / 8);
  do {
    t -= 8;
    this.data.setInt8(this.write++, (e >> t) & 255);
  } while (t > 0);
  return this;
};
o.DataBuffer.prototype.putSignedInt = function (e, t) {
  s(t);
  this.accommodate(t / 8);
  if (e < 0) {
    e += 2 << (t - 1);
  }
  return this.putInt(e, t);
};
o.DataBuffer.prototype.getByte = function () {
  return this.data.getInt8(this.read++);
};
o.DataBuffer.prototype.getInt16 = function () {
  var e = this.data.getInt16(this.read);
  this.read += 2;
  return e;
};
o.DataBuffer.prototype.getInt24 = function () {
  var e =
    (this.data.getInt16(this.read) << 8) ^ this.data.getInt8(this.read + 2);
  this.read += 3;
  return e;
};
o.DataBuffer.prototype.getInt32 = function () {
  var e = this.data.getInt32(this.read);
  this.read += 4;
  return e;
};
o.DataBuffer.prototype.getInt16Le = function () {
  var e = this.data.getInt16(this.read, true);
  this.read += 2;
  return e;
};
o.DataBuffer.prototype.getInt24Le = function () {
  var e =
    this.data.getInt8(this.read) ^
    (this.data.getInt16(this.read + 1, true) << 8);
  this.read += 3;
  return e;
};
o.DataBuffer.prototype.getInt32Le = function () {
  var e = this.data.getInt32(this.read, true);
  this.read += 4;
  return e;
};
o.DataBuffer.prototype.getInt = function (e) {
  s(e);
  var t = 0;
  do {
    t = (t << 8) + this.data.getInt8(this.read++);
    e -= 8;
  } while (e > 0);
  return t;
};
o.DataBuffer.prototype.getSignedInt = function (e) {
  var t = this.getInt(e);
  var r = 2 << (e - 2);
  if (t >= r) {
    t -= r << 1;
  }
  return t;
};
o.DataBuffer.prototype.getBytes = function (e) {
  var t;
  if (e) {
    e = Math.min(this.length(), e);
    t = this.data.slice(this.read, this.read + e);
    this.read += e;
  } else {
    if (0 === e) {
      t = "";
    } else {
      t = 0 === this.read ? this.data : this.data.slice(this.read);
      this.clear();
    }
  }
  return t;
};
o.DataBuffer.prototype.bytes = function (e) {
  return undefined === e
    ? this.data.slice(this.read)
    : this.data.slice(this.read, this.read + e);
};
o.DataBuffer.prototype.at = function (e) {
  return this.data.getUint8(this.read + e);
};
o.DataBuffer.prototype.setAt = function (e, t) {
  this.data.setUint8(e, t);
  return this;
};
o.DataBuffer.prototype.last = function () {
  return this.data.getUint8(this.write - 1);
};
o.DataBuffer.prototype.copy = function () {
  return new o.DataBuffer(this);
};
o.DataBuffer.prototype.compact = function () {
  if (this.read > 0) {
    var e = new Uint8Array(this.data.buffer, this.read);
    var t = new Uint8Array(e.byteLength);
    t.set(e);
    this.data = new DataView(t);
    this.write -= this.read;
    this.read = 0;
  }
  return this;
};
o.DataBuffer.prototype.clear = function () {
  this.data = new DataView(new ArrayBuffer(0));
  this.read = this.write = 0;
  return this;
};
o.DataBuffer.prototype.truncate = function (e) {
  this.write = Math.max(0, this.length() - e);
  this.read = Math.min(this.read, this.write);
  return this;
};
o.DataBuffer.prototype.toHex = function () {
  for (e = "", t = this.read, undefined; t < this.data.byteLength; ++t) {
    var e;
    var t;
    var r = this.data.getUint8(t);
    if (r < 16) {
      e += "0";
    }
    e += r.toString(16);
  }
  return e;
};
o.DataBuffer.prototype.toString = function (e) {
  var t = new Uint8Array(this.data, this.read, this.length());
  if ("binary" === (e = e || "utf8") || "raw" === e)
    return o.binary.raw.encode(t);
  if ("hex" === e) return o.binary.hex.encode(t);
  if ("base64" === e) return o.binary.base64.encode(t);
  if ("utf8" === e) return o.text.utf8.decode(t);
  if ("utf16" === e) return o.text.utf16.decode(t);
  throw new Error("Invalid encoding: " + e);
};
o.createBuffer = function (e, t) {
  t = t || "raw";
  if (undefined !== e && "utf8" === t) {
    e = o.encodeUtf8(e);
  }
  return new o.ByteBuffer(e);
};
o.fillString = function (e, t) {
  for (var r = ""; t > 0; ) {
    if (1 & t) {
      r += e;
    }
    if ((t >>>= 1) > 0) {
      e += e;
    }
  }
  return r;
};
o.xorBytes = function (e, t, r) {
  for (n = "", i = "", o = "", s = 0, a = 0, undefined; r > 0; --r, ++s) {
    var n;
    var i;
    var o;
    var s;
    var a;
    i = e.charCodeAt(s) ^ t.charCodeAt(s);
    if (a >= 10) {
      n += o;
      o = "";
      a = 0;
    }
    o += String.fromCharCode(i);
    ++a;
  }
  return n + o;
};
o.hexToBytes = function (e) {
  var t = "";
  var r = 0;
  for (
    true & e.length &&
    ((r = 1), (t += String.fromCharCode(parseInt(e[0], 16))));
    r < e.length;
    r += 2
  )
    t += String.fromCharCode(parseInt(e.substr(r, 2), 16));
  return t;
};
o.bytesToHex = function (e) {
  return o.createBuffer(e).toHex();
};
o.int32ToBytes = function (e) {
  return (
    String.fromCharCode((e >> 24) & 255) +
    String.fromCharCode((e >> 16) & 255) +
    String.fromCharCode((e >> 8) & 255) +
    String.fromCharCode(255 & e)
  );
};
var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var l = [
  62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 64,
  -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  51,
];
var u = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
o.encode64 = function (e, t) {
  for (o = "", s = "", a = 0, undefined; a < e.length; ) {
    var r;
    var n;
    var i;
    var o;
    var s;
    var a;
    r = e.charCodeAt(a++);
    n = e.charCodeAt(a++);
    i = e.charCodeAt(a++);
    o += c.charAt(r >> 2);
    o += c.charAt(((3 & r) << 4) | (n >> 4));
    if (isNaN(n)) {
      o += "==";
    } else {
      o += c.charAt(((15 & n) << 2) | (i >> 6));
      o += isNaN(i) ? "=" : c.charAt(63 & i);
    }
    if (t && o.length > t) {
      s += o.substr(0, t) + "\r\n";
      o = o.substr(t);
    }
  }
  return s + o;
};
o.decode64 = function (e) {
  e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  for (o = "", s = 0, undefined; s < e.length; ) {
    var t;
    var r;
    var n;
    var i;
    var o;
    var s;
    t = l[e.charCodeAt(s++) - 43];
    r = l[e.charCodeAt(s++) - 43];
    n = l[e.charCodeAt(s++) - 43];
    i = l[e.charCodeAt(s++) - 43];
    o += String.fromCharCode((t << 2) | (r >> 4));
    if (64 !== n) {
      o += String.fromCharCode(((15 & r) << 4) | (n >> 2));
      if (64 !== i) {
        o += String.fromCharCode(((3 & n) << 6) | i);
      }
    }
  }
  return o;
};
o.encodeUtf8 = function (e) {
  return unescape(encodeURIComponent(e));
};
o.decodeUtf8 = function (e) {
  return decodeURIComponent(escape(e));
};
o.binary = {
  raw: {},
  hex: {},
  base64: {},
  base58: {},
  baseN: {
    encode: i.encode,
    decode: i.decode,
  },
};
o.binary.raw.encode = function (e) {
  return String.fromCharCode.apply(null, e);
};
o.binary.raw.decode = function (e, t, r) {
  var n = t;
  if (n) {
    n = new Uint8Array(e.length);
  }
  for (i = r = r || 0, o = 0, undefined; o < e.length; ++o) {
    var i;
    var o;
    n[i++] = e.charCodeAt(o);
  }
  return t ? i - r : n;
};
o.binary.hex.encode = o.bytesToHex;
o.binary.hex.decode = function (e, t, r) {
  var n = t;
  if (n) {
    n = new Uint8Array(Math.ceil(e.length / 2));
  }
  var i = 0;
  var o = (r = r || 0);
  for (
    1 & e.length && ((i = 1), (n[o++] = parseInt(e[0], 16)));
    i < e.length;
    i += 2
  )
    n[o++] = parseInt(e.substr(i, 2), 16);
  return t ? o - r : n;
};
o.binary.base64.encode = function (e, t) {
  for (o = "", s = "", a = 0, undefined; a < e.byteLength; ) {
    var r;
    var n;
    var i;
    var o;
    var s;
    var a;
    r = e[a++];
    n = e[a++];
    i = e[a++];
    o += c.charAt(r >> 2);
    o += c.charAt(((3 & r) << 4) | (n >> 4));
    if (isNaN(n)) {
      o += "==";
    } else {
      o += c.charAt(((15 & n) << 2) | (i >> 6));
      o += isNaN(i) ? "=" : c.charAt(63 & i);
    }
    if (t && o.length > t) {
      s += o.substr(0, t) + "\r\n";
      o = o.substr(t);
    }
  }
  return s + o;
};
o.binary.base64.decode = function (e, t, r) {
  var n;
  var i;
  var o;
  var s;
  var a = t;
  if (a) {
    a = new Uint8Array(3 * Math.ceil(e.length / 4));
  }
  e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  for (c = 0, u = r = r || 0, undefined; c < e.length; ) {
    var c;
    var u;
    n = l[e.charCodeAt(c++) - 43];
    i = l[e.charCodeAt(c++) - 43];
    o = l[e.charCodeAt(c++) - 43];
    s = l[e.charCodeAt(c++) - 43];
    a[u++] = (n << 2) | (i >> 4);
    if (64 !== o) {
      a[u++] = ((15 & i) << 4) | (o >> 2);
      if (64 !== s) {
        a[u++] = ((3 & o) << 6) | s;
      }
    }
  }
  return t ? u - r : a.subarray(0, u);
};
o.binary.base58.encode = function (e, t) {
  return o.binary.baseN.encode(e, u, t);
};
o.binary.base58.decode = function (e, t) {
  return o.binary.baseN.decode(e, u, t);
};
o.text = {
  utf8: {},
  utf16: {},
};
o.text.utf8.encode = function (e, t, r) {
  e = o.encodeUtf8(e);
  var n = t;
  if (n) {
    n = new Uint8Array(e.length);
  }
  for (i = r = r || 0, s = 0, undefined; s < e.length; ++s) {
    var i;
    var s;
    n[i++] = e.charCodeAt(s);
  }
  return t ? i - r : n;
};
o.text.utf8.decode = function (e) {
  return o.decodeUtf8(String.fromCharCode.apply(null, e));
};
o.text.utf16.encode = function (e, t, r) {
  var n = t;
  if (n) {
    n = new Uint8Array(2 * e.length);
  }
  for (
    i = new Uint16Array(n.buffer), o = r = r || 0, s = r, a = 0, undefined;
    a < e.length;
    ++a
  ) {
    var i;
    var o;
    var s;
    var a;
    i[s++] = e.charCodeAt(a);
    o += 2;
  }
  return t ? o - r : n;
};
o.text.utf16.decode = function (e) {
  return String.fromCharCode.apply(null, new Uint16Array(e.buffer));
};
o.deflate = function (e, t, r) {
  t = o.decode64(e.deflate(o.encode64(t)).rval);
  if (r) {
    var n = 2;
    32 & t.charCodeAt(1) && (n = 6), (t = t.substring(n, t.length - 4));
  }
  return t;
};
o.inflate = function (e, t, r) {
  var n = e.inflate(o.encode64(t)).rval;
  return null === n ? null : o.decode64(n);
};
var d = function (e, t, r) {
  if (!e) throw new Error("WebStorage not available.");
  var n;
  if (null === r) {
    n = e.removeItem(t);
  } else {
    r = o.encode64(JSON.stringify(r));
    n = e.setItem(t, r);
  }
  if (void 0 !== n && !0 !== n.rval) {
    var i = new Error(n.error.message);
    throw ((i.id = n.error.id), (i.name = n.error.name), i);
  }
};
var p = function (e, t) {
  if (!e) throw new Error("WebStorage not available.");
  var r = e.getItem(t);
  if (e.init)
    if (null === r.rval) {
      if (r.error) {
        var n = new Error(r.error.message);
        throw ((n.id = r.error.id), (n.name = r.error.name), n);
      }
      r = null;
    } else r = r.rval;
  if (null !== r) {
    r = JSON.parse(o.decode64(r));
  }
  return r;
};
var h = function (e, t, r, n) {
  var i = p(e, t);
  if (null === i) {
    i = {};
  }
  i[r] = n;
  d(e, t, i);
};
var f = function (e, t, r) {
  var n = p(e, t);
  if (null !== n) {
    n = r in n ? n[r] : null;
  }
  return n;
};
var g = function (e, t, r) {
  var n = p(e, t);
  if (null !== n && r in n) {
    delete n[r];
    var i = true;
    for (var o in n) {
      i = false;
      break;
    }
    if (i) {
      n = null;
    }
    d(e, t, n);
  }
};
var m = function (e, t) {
  d(e, t, null);
};
var y = function (e, t, r) {
  var n;
  var i = null;
  if (undefined === r) {
    r = ["web", "flash"];
  }
  var o = false;
  var s = null;
  for (var a in r) {
    n = r[a];
    try {
      if ("flash" === n || "both" === n) {
        if (null === t[0])
          throw new Error("Flash local storage not available.");
        i = e.apply(this, t);
        o = "flash" === n;
      }
      if ("web" !== n && "both" !== n) {
        t[0] = localStorage;
        i = e.apply(this, t);
        o = true;
      }
    } catch (e) {
      s = e;
    }
    if (o) break;
  }
  if (!o) throw s;
  return i;
};
o.setItem = function (e, t, r, n, i) {
  y(h, arguments, i);
};
o.getItem = function (e, t, r, n) {
  return y(f, arguments, n);
};
o.removeItem = function (e, t, r, n) {
  y(g, arguments, n);
};
o.clearItems = function (e, t, r) {
  y(m, arguments, r);
};
o.isEmpty = function (e) {
  for (var t in e) if (e.hasOwnProperty(t)) return false;
  return true;
};
o.format = function (e) {
  for (n = /%./g, i = 0, o = [], s = 0, undefined; (t = n.exec(e)); ) {
    var t;
    var r;
    var n;
    var i;
    var o;
    var s;
    if ((r = e.substring(s, n.lastIndex - 2)).length > 0) {
      o.push(r);
    }
    s = n.lastIndex;
    var a = t[0][1];
    switch (a) {
      case "s":
      case "o":
        if (i < arguments.length) {
          o.push(arguments[1 + i++]);
        } else {
          o.push("<?>");
        }
        break;
      case "%":
        o.push("%");
        break;
      default:
        o.push("<%" + a + "?>");
    }
  }
  o.push(e.substring(s));
  return o.join("");
};
o.formatNumber = function (e, t, r, n) {
  var i = e;
  var o = isNaN((t = Math.abs(t))) ? 2 : t;
  var s = undefined === r ? "," : r;
  var a = undefined === n ? "." : n;
  var c = i < 0 ? "-" : "";
  var l = parseInt((i = Math.abs(+i || 0).toFixed(o)), 10) + "";
  var u = l.length > 3 ? l.length % 3 : 0;
  return (
    c +
    (u ? l.substr(0, u) + a : "") +
    l.substr(u).replace(/(\d{3})(?=\d)/g, "$1" + a) +
    (o
      ? s +
        Math.abs(i - l)
          .toFixed(o)
          .slice(2)
      : "")
  );
};
o.formatSize = function (e) {
  return e >= 1073741824
    ? o.formatNumber(e / 1073741824, 2, ".", "") + " GiB"
    : e >= 1048576
    ? o.formatNumber(e / 1048576, 2, ".", "") + " MiB"
    : e >= 1024
    ? o.formatNumber(e / 1024, 0) + " KiB"
    : o.formatNumber(e, 0) + " bytes";
};
o.bytesFromIP = function (e) {
  return -1 !== e.indexOf(".")
    ? o.bytesFromIPv4(e)
    : -1 !== e.indexOf(":")
    ? o.bytesFromIPv6(e)
    : null;
};
o.bytesFromIPv4 = function (e) {
  if (4 !== (e = e.split(".")).length) return null;
  for (t = o.createBuffer(), r = 0, undefined; r < e.length; ++r) {
    var t;
    var r;
    var n = parseInt(e[r], 10);
    if (isNaN(n)) return null;
    t.putByte(n);
  }
  return t.getBytes();
};
o.bytesFromIPv6 = function (e) {
  for (
    t = 0,
      r =
        2 *
        (8 -
          (e = e.split(":").filter(function (e) {
            if (0 === e.length) {
              ++t;
            }
            return true;
          })).length +
          t),
      n = o.createBuffer(),
      i = 0,
      undefined;
    i < 8;
    ++i
  ) {
    var t;
    var r;
    var n;
    var i;
    if (e[i] && 0 !== e[i].length) {
      var s = o.hexToBytes(e[i]);
      if (s.length < 2) {
        n.putByte(0);
      }
      n.putBytes(s);
    } else {
      n.fillWithByte(0, r);
      r = 0;
    }
  }
  return n.getBytes();
};
o.bytesToIP = function (e) {
  return 4 === e.length
    ? o.bytesToIPv4(e)
    : 16 === e.length
    ? o.bytesToIPv6(e)
    : null;
};
o.bytesToIPv4 = function (e) {
  if (4 !== e.length) return null;
  for (t = [], r = 0, undefined; r < e.length; ++r) {
    var t;
    var r;
    t.push(e.charCodeAt(r));
  }
  return t.join(".");
};
o.bytesToIPv6 = function (e) {
  if (16 !== e.length) return null;
  for (t = [], r = [], n = 0, i = 0, undefined; i < e.length; i += 2) {
    var t;
    var r;
    var n;
    var i;
    for (var s = o.bytesToHex(e[i] + e[i + 1]); "0" === s[0] && "0" !== s; )
      s = s.substr(1);
    if ("0" === s) {
      var a = r[r.length - 1];
      var c = t.length;
      if (a && c === a.end + 1) {
        a.end = c;
        if (a.end - a.start > r[n].end - r[n].start) {
          n = r.length - 1;
        }
      } else {
        r.push({
          start: c,
          end: c,
        });
      }
    }
    t.push(s);
  }
  if (r.length > 0) {
    var l = r[n];
    if (l.end - l.start > 0) {
      t.splice(l.start, l.end - l.start + 1, "");
      if (0 === l.start) {
        t.unshift("");
      }
      if (7 === l.end) {
        t.push("");
      }
    }
  }
  return t.join(":");
};
o.estimateCores = function (e, t) {
  if ("function" == typeof e) {
    t = e;
    e = {};
  }
  e = e || {};
  if ("cores" in o && !e.update) return t(null, o.cores);
  if (
    "undefined" != typeof navigator &&
    "hardwareConcurrency" in navigator &&
    navigator.hardwareConcurrency > 0
  ) {
    o.cores = navigator.hardwareConcurrency;
    return t(null, o.cores);
  }
  if ("undefined" == typeof Worker) {
    o.cores = 1;
    return t(null, o.cores);
  }
  if ("undefined" == typeof Blob) {
    o.cores = 2;
    return t(null, o.cores);
  }
  var r = URL.createObjectURL(
    new Blob(
      [
        "(",
        function () {
          self.addEventListener("message", function (e) {
            for (t = Date.now(), r = t + 4, undefined; Date.now() < r; ) {
              var t;
              var r;
            }
            self.postMessage({
              st: t,
              et: r,
            });
          });
        }.toString(),
        ")()",
      ],
      {
        type: "application/javascript",
      }
    )
  );
  !(function e(n, i, s) {
    if (0 === i) {
      var a = Math.floor(
        n.reduce(function (e, t) {
          return e + t;
        }, 0) / n.length
      );
      o.cores = Math.max(1, a);
      URL.revokeObjectURL(r);
      return t(null, o.cores);
    }
    !(function (e, t) {
      for (n = [], i = [], o = 0, undefined; o < e; ++o) {
        var n;
        var i;
        var o;
        var s = new Worker(r);
        s.addEventListener("message", function (r) {
          i.push(r.data);
          if (i.length === e) {
            for (var o = 0; o < e; ++o) n[o].terminate();
            t(0, i);
          }
        });
        n.push(s);
      }
      for (o = 0; o < e; ++o) n[o].postMessage(o);
    })(s, function (t, r) {
      n.push(
        (function (e, t) {
          for (r = [], n = 0, undefined; n < e; ++n) {
            var r;
            var n;
            for (i = t[n], o = r[n] = [], s = 0, undefined; s < e; ++s) {
              var i;
              var o;
              var s;
              if (n !== s) {
                var a = t[s];
                if (
                  (i.st > a.st && i.st < a.et) ||
                  (a.st > i.st && a.st < i.et)
                ) {
                  o.push(s);
                }
              }
            }
          }
          return r.reduce(function (e, t) {
            return Math.max(e, t.length);
          }, 0);
        })(s, r)
      );
      e(n, i - 1, s);
    });
  })([], 5, 16);
};