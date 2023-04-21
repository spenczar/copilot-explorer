var M_path;
var M_child_process;
var M_Stream_Splitter_Transformer_maybe;
var s;
var a;
var c = exports || this;
function l(e) {
  var t;
  if (null == e) {
    e = "roots.exe";
  }
  t = s;
  s = M_path.resolve(__dirname, e);
  return t;
}
function u(e) {
  return M_Stream_Splitter_Transformer_maybe(function (t) {
    if (t.length) {
      e(a(t, "hex"));
    }
  });
}
M_path = require("path");
M_child_process = require("child_process");
M_Stream_Splitter_Transformer_maybe = require("Stream-Splitter-Transformer");
l();
c.exe = l;
c.sync = function (e) {
  var t;
  var r;
  return {
    run: n,
    next: function () {
      if (t) {
        t = [];
        r = 0;
        n(function (e) {
          if (e) {
            t.push(e);
          }
        });
      }
      if (r < t.length) return t[r++];
      t = [];
    },
    done: function () {
      t = [];
    },
  };
  function n(t) {
    u(t)
      .on("end", function () {
        t();
      })
      .end(M_child_process.execFileSync(s, e));
  }
};
c.async = function (e) {
  var t;
  var r;
  var n;
  return {
    run: c,
    next: function () {
      if (t) {
        t = [];
        r = [];
        c(o);
      }
      return t.length
        ? Promise.resolve(t.shift())
        : n
        ? Promise.resolve()
        : new Promise(function (e) {
            r.push(e);
          });
    },
    done: function () {
      t = [];
      a();
    },
  };
  function o(e) {
    if (n) {
      if (e) {
        if (r.length) {
          r.shift()(e);
        } else {
          t.push(e);
        }
      } else {
        a();
      }
    }
  }
  function a() {
    var e;
    var t;
    var i;
    for (n = true, e = 0, i = (t = r).length; e < i; ++e) t[e]();
  }
  function c(t) {
    M_child_process.execFile(s, e, function () {})
      .stdout.pipe(u(t))
      .on("end", function () {
        t();
      });
  }
};
a =
  Buffer.from ||
  function (e, t) {
    return new Buffer(e, t);
  };
