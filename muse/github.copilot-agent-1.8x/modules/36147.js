var t = {};
module.exports = t;
var r = {};
t.encode = function (e, t, r) {
  if ("string" != typeof t) throw new TypeError('"alphabet" must be a string.');
  if (undefined !== r && "number" != typeof r)
    throw new TypeError('"maxline" must be a number.');
  var n = "";
  if (e instanceof Uint8Array) {
    var i = 0;
    var o = t.length;
    var s = t.charAt(0);
    var a = [0];
    for (i = 0; i < e.length; ++i) {
      for (c = 0, l = e[i], undefined; c < a.length; ++c) {
        var c;
        var l;
        l += a[c] << 8;
        a[c] = l % o;
        l = (l / o) | 0;
      }
      for (; l > 0; ) {
        a.push(l % o);
        l = (l / o) | 0;
      }
    }
    for (i = 0; 0 === e[i] && i < e.length - 1; ++i) n += s;
    for (i = a.length - 1; i >= 0; --i) n += t[a[i]];
  } else
    n = (function (e, t) {
      var r = 0;
      var n = t.length;
      var i = t.charAt(0);
      var o = [0];
      for (r = 0; r < e.length(); ++r) {
        for (s = 0, a = e.at(r), undefined; s < o.length; ++s) {
          var s;
          var a;
          a += o[s] << 8;
          o[s] = a % n;
          a = (a / n) | 0;
        }
        for (; a > 0; ) {
          o.push(a % n);
          a = (a / n) | 0;
        }
      }
      var c = "";
      for (r = 0; 0 === e.at(r) && r < e.length() - 1; ++r) c += i;
      for (r = o.length - 1; r >= 0; --r) c += t[o[r]];
      return c;
    })(e, t);
  if (r) {
    var u = new RegExp(".{1," + r + "}", "g");
    n = n.match(u).join("\r\n");
  }
  return n;
};
t.decode = function (e, t) {
  if ("string" != typeof e) throw new TypeError('"input" must be a string.');
  if ("string" != typeof t) throw new TypeError('"alphabet" must be a string.');
  var n = r[t];
  if (!n) {
    n = r[t] = [];
    for (var i = 0; i < t.length; ++i) n[t.charCodeAt(i)] = i;
  }
  e = e.replace(/\s/g, "");
  var o = t.length;
  var s = t.charAt(0);
  var a = [0];
  for (i = 0; i < e.length; i++) {
    var c = n[e.charCodeAt(i)];
    if (undefined === c) return;
    for (l = 0, u = c, undefined; l < a.length; ++l) {
      var l;
      var u;
      u += a[l] * o;
      a[l] = 255 & u;
      u >>= 8;
    }
    for (; u > 0; ) {
      a.push(255 & u);
      u >>= 8;
    }
  }
  for (var d = 0; e[d] === s && d < e.length - 1; ++d) a.push(0);
  return "undefined" != typeof Buffer
    ? Buffer.from(a.reverse())
    : new Uint8Array(a.reverse());
};