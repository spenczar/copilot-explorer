var n;
n = require(58112);
(function () {
  if ("function" == typeof ArrayBuffer) {
    var e = n.lib.WordArray;
    var t = e.init;
    var r = (e.init = function (e) {
      if (e instanceof ArrayBuffer) {
        e = new Uint8Array(e);
      }
      if (
        e instanceof Int8Array ||
        ("undefined" != typeof Uint8ClampedArray &&
          e instanceof Uint8ClampedArray) ||
        e instanceof Int16Array ||
        e instanceof Uint16Array ||
        e instanceof Int32Array ||
        e instanceof Uint32Array ||
        e instanceof Float32Array ||
        e instanceof Float64Array
      ) {
        e = new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
      }
      if (e instanceof Uint8Array) {
        for (var r = e.byteLength, n = [], i = 0; i < r; i++)
          n[i >>> 2] |= e[i] << (24 - (i % 4) * 8);
        t.call(this, n, r);
      } else t.apply(this, arguments);
    });
    r.prototype = e;
  }
})();
module.exports = n.lib.WordArray;