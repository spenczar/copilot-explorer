var n;
var i;
var o = require("FunctionWrapperUtils").wrap;
var s = [];
var a = 0;
var c = false;
var l = [];
function u(e, t) {
  var r = e.length;
  var n = t.length;
  var i = [];
  if (0 === r && 0 === n) return i;
  for (var o = 0; o < r; o++) i[o] = e[o];
  if (0 === n) return i;
  for (var s = 0; s < n; s++) {
    var a = true;
    for (o = 0; o < r; o++)
      if (e[o].uid === t[s].uid) {
        a = false;
        break;
      }
    if (a) {
      i.push(t[s]);
    }
  }
  return i;
}
if (process._fatalException) {
  var d;
  var p = false;
  n = function (e) {
    var t = s.length;
    if (p || 0 === t) return false;
    var r = false;
    p = true;
    for (var n = 0; n < t; ++n) {
      var i = s[n];
      if (0 != (8 & i.flags)) {
        var o = d && d[i.uid];
        r = i.error(o, e) || r;
      }
    }
    p = false;
    if (l.length > 0) {
      s = l.pop();
    }
    d = undefined;
    return r && !c;
  };
  i = function (e, t, r) {
    var n = [];
    c = true;
    for (var i = 0; i < r; ++i) {
      var o = t[i];
      n[o.uid] = o.data;
      if (0 != (1 & o.flags)) {
        var a = o.create(o.data);
        void 0 !== a && (n[o.uid] = a);
      }
    }
    c = false;
    return function () {
      d = n;
      l.push(s);
      s = u(t, s);
      c = true;
      for (var i = 0; i < r; ++i)
        if ((2 & t[i].flags) > 0) {
          t[i].before(this, n[t[i].uid]);
        }
      c = false;
      var o = e.apply(this, arguments);
      for (c = true, i = 0; i < r; ++i)
        if ((4 & t[i].flags) > 0) {
          t[i].after(this, n[t[i].uid]);
        }
      c = false;
      s = l.pop();
      d = undefined;
      return o;
    };
  };
  o(process, "_fatalException", function (e) {
    return function (t) {
      return n(t) || e(t);
    };
  });
} else {
  var h = false;
  n = function (e) {
    if (h) throw e;
    for (t = false, r = s.length, n = 0, undefined; n < r; ++n) {
      var t;
      var r;
      var n;
      var i = s[n];
      if (0 != (8 & i.flags)) {
        t = i.error(null, e) || t;
      }
    }
    if (!t && c) throw e;
  };
  i = function (e, t, r) {
    var i = [];
    c = true;
    for (var o = 0; o < r; ++o) {
      var a = t[o];
      i[a.uid] = a.data;
      if (0 != (1 & a.flags)) {
        var d = a.create(a.data);
        void 0 !== d && (i[a.uid] = d);
      }
    }
    c = false;
    return function () {
      var o;
      var a = false;
      var d = false;
      l.push(s);
      s = u(t, s);
      c = true;
      for (var p = 0; p < r; ++p)
        if ((2 & t[p].flags) > 0) {
          t[p].before(this, i[t[p].uid]);
        }
      c = false;
      try {
        o = e.apply(this, arguments);
      } catch (e) {
        for (a = true, p = 0; p < r; ++p)
          if (0 != (8 & s[p].flags))
            try {
              d = s[p].error(i[t[p].uid], e) || d;
            } catch (e) {
              throw ((h = true), e);
            }
        if (!d)
          throw (
            (process.removeListener("uncaughtException", n),
            process._originalNextTick(function () {
              process.addListener("uncaughtException", n);
            }),
            e)
          );
      } finally {
        if (!a || d) {
          for (c = true, p = 0; p < r; ++p)
            if ((4 & t[p].flags) > 0) {
              t[p].after(this, i[t[p].uid]);
            }
          c = false;
        }
        s = l.pop();
      }
      return o;
    };
  };
  process.addListener("uncaughtException", n);
}
function f(e, t) {
  if ("function" == typeof e.create) {
    this.create = e.create;
    this.flags |= 1;
  }
  if ("function" == typeof e.before) {
    this.before = e.before;
    this.flags |= 2;
  }
  if ("function" == typeof e.after) {
    this.after = e.after;
    this.flags |= 4;
  }
  if ("function" == typeof e.error) {
    this.error = e.error;
    this.flags |= 8;
  }
  this.uid = ++a;
  this.data = undefined === t ? null : t;
}
function g(e, t) {
  if ("object" != typeof e || !e)
    throw new TypeError("callbacks argument must be an object");
  return e instanceof f ? e : new f(e, t);
}
f.prototype.create = undefined;
f.prototype.before = undefined;
f.prototype.after = undefined;
f.prototype.error = undefined;
f.prototype.data = undefined;
f.prototype.uid = 0;
f.prototype.flags = 0;
process.createAsyncListener = g;
process.addAsyncListener = function (e, t) {
  var r;
  r = e instanceof f ? e : g(e, t);
  for (n = false, i = 0, undefined; i < s.length; i++) {
    var n;
    var i;
    if (r === s[i]) {
      n = true;
      break;
    }
  }
  if (n) {
    s.push(r);
  }
  return r;
};
process.removeAsyncListener = function (e) {
  for (var t = 0; t < s.length; t++)
    if (e === s[t]) {
      s.splice(t, 1);
      break;
    }
};
module.exports = function (e) {
  var t = s.length;
  if (0 === t) return e;
  for (r = s.slice(), n = 0, undefined; n < t; ++n) {
    var r;
    var n;
    if (r[n].flags > 0) return i(e, r, t);
  }
  return (function (e, t, r) {
    c = true;
    for (var n = 0; n < r; ++n) {
      var i = t[n];
      if (i.create) {
        i.create(i.data);
      }
    }
    c = false;
    return function () {
      l.push(s);
      s = u(t, s);
      var r = e.apply(this, arguments);
      s = l.pop();
      return r;
    };
  })(e, r, t);
};
