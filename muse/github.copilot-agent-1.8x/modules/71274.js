if (process.addAsyncListener)
  throw new Error("Don't require polyfill unless needed");
var n = require(94403);
var i = require(3341);
var o = n.wrap;
var s = n.massWrap;
var a = require(61747);
var c = require("util");
var l = i.gte(process.version, "6.0.0");
var u = i.gte(process.version, "7.0.0");
var d = i.gte(process.version, "8.0.0");
var p = i.gte(process.version, "11.0.0");
var h = require("net");
function f(e) {
  return function () {
    this.on("connection", function (e) {
      if (e._handle) {
        e._handle.onread = a(e._handle.onread);
      }
    });
    try {
      return e.apply(this, arguments);
    } finally {
      if (this._handle && this._handle.onconnection) {
        this._handle.onconnection = a(this._handle.onconnection);
      }
    }
  };
}
function g(e) {
  if (e && e._handle) {
    var t = e._handle;
    if (t._originalOnread) {
      t._originalOnread = t.onread;
    }
    t.onread = a(t._originalOnread);
  }
}
if (u && !h._normalizeArgs) {
  h._normalizeArgs = function (e) {
    if (0 === e.length) return [{}, null];
    var t;
    var r;
    var n = e[0];
    var i = {};
    if ("object" == typeof n && null !== n) {
      i = n;
    } else {
      if (
        "string" == typeof (t = n) &&
        false === ((r = t), (r = Number(r)) >= 0 && r)
      ) {
        i.path = n;
      } else {
        i.port = n;
        if (e.length > 1 && "string" == typeof e[1]) {
          i.host = e[1];
        }
      }
    }
    var o = e[e.length - 1];
    return "function" != typeof o ? [i, null] : [i, o];
  };
} else {
  if (u || h._normalizeConnectArgs) {
    h._normalizeConnectArgs = function (e) {
      var t;
      var r = {};
      if ("object" == typeof e[0] && null !== e[0]) {
        r = e[0];
      } else {
        if (
          "string" == typeof e[0] &&
          false === ((t = e[0]), (t = Number(t)) >= 0 && t)
        ) {
          r.path = e[0];
        } else {
          r.port = e[0];
          if ("string" == typeof e[1]) {
            r.host = e[1];
          }
        }
      }
      var n = e[e.length - 1];
      return "function" == typeof n ? [r, n] : [r];
    };
  }
}
if ("_setUpListenHandle" in h.Server.prototype) {
  o(h.Server.prototype, "_setUpListenHandle", f);
} else {
  o(h.Server.prototype, "_listen2", f);
}
o(h.Socket.prototype, "connect", function (e) {
  return function () {
    var t;
    if (
      (t =
        d &&
        Array.isArray(arguments[0]) &&
        Object.getOwnPropertySymbols(arguments[0]).length > 0
          ? arguments[0]
          : u
          ? h._normalizeArgs(arguments)
          : h._normalizeConnectArgs(arguments))[1]
    ) {
      t[1] = a(t[1]);
    }
    var r = e.apply(this, t);
    g(this);
    return r;
  };
});
var m = require("http");
o(m.Agent.prototype, "addRequest", function (e) {
  return function (t) {
    var r = t.onSocket;
    t.onSocket = a(function (e) {
      g(e);
      return r.apply(this, arguments);
    });
    return e.apply(this, arguments);
  };
});
var y = require("child_process");
function v(e) {
  if (Array.isArray(e.stdio)) {
    e.stdio.forEach(function (e) {
      if (e && e._handle) {
        e._handle.onread = a(e._handle.onread);
        o(e._handle, "close", N);
      }
    });
  }
  if (e._handle) {
    e._handle.onexit = a(e._handle.onexit);
  }
}
if (y.ChildProcess) {
  o(y.ChildProcess.prototype, "spawn", function (e) {
    return function () {
      var t = e.apply(this, arguments);
      v(this);
      return t;
    };
  });
} else {
  s(y, ["execFile", "fork", "spawn"], function (e) {
    return function () {
      var t = e.apply(this, arguments);
      v(t);
      return t;
    };
  });
}
if (process._fatalException) {
  process._originalNextTick = process.nextTick;
}
var _ = [];
if (process._nextDomainTick) {
  _.push("_nextDomainTick");
}
if (process._tickDomainCallback) {
  _.push("_tickDomainCallback");
}
s(process, _, R);
o(process, "nextTick", N);
var b = ["setTimeout", "setInterval"];
if (global.setImmediate) {
  b.push("setImmediate");
}
var w = require("timers");
var C = global.setTimeout === w.setTimeout;
s(w, b, N);
if (C) {
  s(global, b, N);
}
var E = require("dns");
s(
  E,
  [
    "lookup",
    "resolve",
    "resolve4",
    "resolve6",
    "resolveCname",
    "resolveMx",
    "resolveNs",
    "resolveTxt",
    "resolveSrv",
    "reverse",
  ],
  R
);
if (E.resolveNaptr) {
  o(E, "resolveNaptr", R);
}
var T;
var S;
var x = require("fs");
s(
  x,
  [
    "watch",
    "rename",
    "truncate",
    "chown",
    "fchown",
    "chmod",
    "fchmod",
    "stat",
    "lstat",
    "fstat",
    "link",
    "symlink",
    "readlink",
    "realpath",
    "unlink",
    "rmdir",
    "mkdir",
    "readdir",
    "close",
    "open",
    "utimes",
    "futimes",
    "fsync",
    "write",
    "read",
    "readFile",
    "writeFile",
    "appendFile",
    "watchFile",
    "unwatchFile",
    "exists",
  ],
  R
);
if (x.lchown) {
  o(x, "lchown", R);
}
if (x.lchmod) {
  o(x, "lchmod", R);
}
if (x.ftruncate) {
  o(x, "ftruncate", R);
}
try {
  T = require("zlib");
} catch (e) {}
if (T && T.Deflate && T.Deflate.prototype) {
  var k = Object.getPrototypeOf(T.Deflate.prototype);
  if (k._transform) {
    o(k, "_transform", R);
  } else {
    if (k.write && k.flush && k.end) {
      s(k, ["write", "flush", "end"], R);
    }
  }
}
try {
  S = require("crypto");
} catch (e) {}
if (S) {
  var I = ["pbkdf2", "randomBytes"];
  if (p) {
    I.push("pseudoRandomBytes");
  }
  s(S, I, R);
}
var A =
  !!global.Promise &&
  "function Promise() { [native code] }" === Promise.toString() &&
  "function toString() { [native code] }" === Promise.toString.toString();
if (A) {
  var P = process.addAsyncListener({
    create: function () {
      A = false;
    },
  });
  global.Promise.resolve(true).then(function () {
    A = false;
  });
  process.removeAsyncListener(P);
}
function R(e) {
  var t = function () {
    var t;
    var r = arguments.length - 1;
    if ("function" == typeof arguments[r]) {
      t = Array(arguments.length);
      for (var n = 0; n < arguments.length - 1; n++) t[n] = arguments[n];
      t[r] = a(arguments[r]);
    }
    return e.apply(this, t || arguments);
  };
  switch (e.length) {
    case 1:
      return function (r) {
        return 1 !== arguments.length
          ? t.apply(this, arguments)
          : ("function" == typeof r && (r = a(r)), e.call(this, r));
      };
    case 2:
      return function (r, n) {
        return 2 !== arguments.length
          ? t.apply(this, arguments)
          : ("function" == typeof n && (n = a(n)), e.call(this, r, n));
      };
    case 3:
      return function (r, n, i) {
        return 3 !== arguments.length
          ? t.apply(this, arguments)
          : ("function" == typeof i && (i = a(i)), e.call(this, r, n, i));
      };
    case 4:
      return function (r, n, i, o) {
        return 4 !== arguments.length
          ? t.apply(this, arguments)
          : ("function" == typeof o && (o = a(o)), e.call(this, r, n, i, o));
      };
    case 5:
      return function (r, n, i, o, s) {
        return 5 !== arguments.length
          ? t.apply(this, arguments)
          : ("function" == typeof s && (s = a(s)), e.call(this, r, n, i, o, s));
      };
    case 6:
      return function (r, n, i, o, s, c) {
        return 6 !== arguments.length
          ? t.apply(this, arguments)
          : ("function" == typeof c && (c = a(c)),
            e.call(this, r, n, i, o, s, c));
      };
    default:
      return t;
  }
}
function N(e) {
  var t = function () {
    var t;
    if ("function" == typeof arguments[0]) {
      (t = Array(arguments.length))[0] = a(arguments[0]);
      for (var r = 1; r < arguments.length; r++) t[r] = arguments[r];
    }
    return e.apply(this, t || arguments);
  };
  switch (e.length) {
    case 1:
      return function (r) {
        return 1 !== arguments.length
          ? t.apply(this, arguments)
          : ("function" == typeof r && (r = a(r)), e.call(this, r));
      };
    case 2:
      return function (r, n) {
        return 2 !== arguments.length
          ? t.apply(this, arguments)
          : ("function" == typeof r && (r = a(r)), e.call(this, r, n));
      };
    case 3:
      return function (r, n, i) {
        return 3 !== arguments.length
          ? t.apply(this, arguments)
          : ("function" == typeof r && (r = a(r)), e.call(this, r, n, i));
      };
    case 4:
      return function (r, n, i, o) {
        return 4 !== arguments.length
          ? t.apply(this, arguments)
          : ("function" == typeof r && (r = a(r)), e.call(this, r, n, i, o));
      };
    case 5:
      return function (r, n, i, o, s) {
        return 5 !== arguments.length
          ? t.apply(this, arguments)
          : ("function" == typeof r && (r = a(r)), e.call(this, r, n, i, o, s));
      };
    case 6:
      return function (r, n, i, o, s, c) {
        return 6 !== arguments.length
          ? t.apply(this, arguments)
          : ("function" == typeof r && (r = a(r)),
            e.call(this, r, n, i, o, s, c));
      };
    default:
      return t;
  }
}
if (A) {
  (function () {
    var e = global.Promise;
    function t(r) {
      if (!(this instanceof t)) return e(r);
      if ("function" != typeof r) return new e(r);
      var i;
      var o;
      var s = new e(function (e, t) {
        i = this;
        o = [
          function (t) {
            n(s, false);
            return e(t);
          },
          function (e) {
            n(s, false);
            return t(e);
          },
        ];
      });
      s.__proto__ = t.prototype;
      try {
        r.apply(i, o);
      } catch (e) {
        o[1](e);
      }
      return s;
    }
    function n(e, t) {
      if (e.__asl_wrapper && !t) {
        e.__asl_wrapper = a(i);
      }
    }
    function i(t, r, o, s) {
      var a;
      try {
        return {
          returnVal: (a = r.call(t, o)),
          error: false,
        };
      } catch (e) {
        return {
          errorVal: e,
          error: true,
        };
      } finally {
        if (a instanceof e) {
          s.__asl_wrapper = function () {
            return (a.__asl_wrapper || i).apply(this, arguments);
          };
        } else {
          n(s, true);
        }
      }
    }
    function s(e) {
      return function () {
        var t = this;
        var r = e.apply(t, Array.prototype.map.call(arguments, n));
        r.__asl_wrapper = function (e, n, o, s) {
          return t.__asl_wrapper
            ? (t.__asl_wrapper(e, function () {}, null, r),
              r.__asl_wrapper(e, n, o, s))
            : i(e, n, o, s);
        };
        return r;
        function n(e) {
          return "function" != typeof e
            ? e
            : a(function (n) {
                var o = (t.__asl_wrapper || i)(this, e, n, r);
                if (o.error) throw o.errorVal;
                return o.returnVal;
              });
        }
      };
    }
    c.inherits(t, e);
    o(e.prototype, "then", s);
    if (e.prototype.chain) {
      o(e.prototype, "chain", s);
    }
    if (l) {
      global.Promise = require(57600)(e, n);
    } else {
      ["all", "race", "reject", "resolve", "accept", "defer"].forEach(function (
        r
      ) {
        if ("function" == typeof e[r]) {
          t[r] = e[r];
        }
      });
      global.Promise = t;
    }
  })();
}