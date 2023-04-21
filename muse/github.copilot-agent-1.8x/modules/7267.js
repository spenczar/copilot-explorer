var n = require(94403);
var i = n.wrap;
var o = n.unwrap;
var s = "wrap@before";
function a(e, t, r) {
  var n = !!e[t] && e.propertyIsEnumerable(t);
  Object.defineProperty(e, t, {
    configurable: true,
    enumerable: n,
    writable: true,
    value: r,
  });
}
function c(e, t) {
  var r;
  r = e._events && e._events[t];
  if (Array.isArray(r)) {
    r = r ? [r] : [];
  }
  return r;
}
function l(e, t) {
  if (e) {
    var r = e;
    if ("function" == typeof e) r = t(e);
    else if (Array.isArray(e)) {
      r = [];
      for (var n = 0; n < e.length; n++) r[n] = t(e[n]);
    }
    return r;
  }
}
module.exports = function (e, t, r) {
  if (!(e && e.on && e.addListener && e.removeListener && e.emit))
    throw new Error("can only wrap real EEs");
  if (!t) throw new Error("must have function to run on listener addition");
  if (!r) throw new Error("must have function to wrap listeners when emitting");
  function n(e) {
    return function (t, r) {
      var o = c(this, t).slice();
      try {
        var a = e.call(this, t, r);
        (function (e, t, r) {
          var n = c(e, t).filter(function (e) {
            return -1 === r.indexOf(e);
          });
          if (n.length > 0) {
            (function (e, t) {
              for (r = t.length, n = 0, undefined; n < r; n++) {
                var r;
                var n;
                var i = t[n];
                var o = e[s];
                if ("function" == typeof o) o(i);
                else if (Array.isArray(o))
                  for (a = o.length, c = 0, undefined; c < a; c++) {
                    var a;
                    var c;
                    o[c](i);
                  }
              }
            })(e, n);
          }
        })(this, t, o);
        return a;
      } finally {
        if (this.on.__wrapped) {
          i(this, "on", n);
        }
        if (this.addListener.__wrapped) {
          i(this, "addListener", n);
        }
      }
    };
  }
  if (e[s]) {
    if ("function" == typeof e[s]) {
      a(e, s, [e[s], t]);
    } else {
      if (Array.isArray(e[s])) {
        e[s].push(t);
      }
    }
  } else {
    a(e, s, t);
  }
  if (e.__wrapped) {
    i(e, "addListener", n);
    i(e, "on", n);
    i(e, "emit", function (e) {
      return function (t) {
        if (!this._events || !this._events[t]) return e.apply(this, arguments);
        var n = this._events[t];
        function s(e) {
          return function () {
            this._events[t] = n;
            try {
              return e.apply(this, arguments);
            } finally {
              n = this._events[t];
              this._events[t] = l(n, r);
            }
          };
        }
        i(this, "removeListener", s);
        try {
          this._events[t] = l(n, r);
          return e.apply(this, arguments);
        } finally {
          o(this, "removeListener");
          this._events[t] = n;
        }
      };
    });
    a(e, "__unwrap", function () {
      o(e, "addListener");
      o(e, "on");
      o(e, "emit");
      delete e[s];
      delete e.__wrapped;
    });
    a(e, "__wrapped", true);
  }
};