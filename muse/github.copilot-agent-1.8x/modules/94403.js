function t(e) {
  return "function" == typeof e;
}
var r = console.error.bind(console);
function n(e, t, r) {
  var n = !!e[t] && e.propertyIsEnumerable(t);
  Object.defineProperty(e, t, {
    configurable: true,
    enumerable: n,
    writable: true,
    value: r,
  });
}
function i(e) {
  if (e && e.logger) {
    if (t(e.logger)) {
      r = e.logger;
    } else {
      r("new logger isn't a function, not replacing");
    }
  }
}
function o(e, i, o) {
  if (e && e[i]) {
    if (!o) {
      r("no wrapper function");
      return void r(new Error().stack);
    }
    if (t(e[i]) && t(o)) {
      var s = e[i];
      var a = o(s, i);
      n(a, "__original", s);
      n(a, "__unwrap", function () {
        if (e[i] === a) {
          n(e, i, s);
        }
      });
      n(a, "__wrapped", true);
      n(e, i, a);
      return a;
    }
    r("original object and wrapper must be functions");
  } else r("no original function " + i + " to wrap");
}
function s(e, t) {
  return e && e[t]
    ? e[t].__unwrap
      ? e[t].__unwrap()
      : void r(
          "no original to unwrap to -- has " + t + " already been unwrapped?"
        )
    : (r("no function to unwrap."), void r(new Error().stack));
}
i.wrap = o;
i.massWrap = function (e, t, n) {
  if (!e) {
    r("must provide one or more modules to patch");
    return void r(new Error().stack);
  }
  if (Array.isArray(e)) {
    e = [e];
  }
  if (t && Array.isArray(t)) {
    e.forEach(function (e) {
      t.forEach(function (t) {
        o(e, t, n);
      });
    });
  } else {
    r("must provide one or more functions to wrap on modules");
  }
};
i.unwrap = s;
i.massUnwrap = function (e, t) {
  if (!e) {
    r("must provide one or more modules to patch");
    return void r(new Error().stack);
  }
  if (Array.isArray(e)) {
    e = [e];
  }
  if (t && Array.isArray(t)) {
    e.forEach(function (e) {
      t.forEach(function (t) {
        s(e, t);
      });
    });
  } else {
    r("must provide one or more functions to unwrap on modules");
  }
};
module.exports = i;