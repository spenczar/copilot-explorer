module.exports = function (e) {
  function t(e) {
    let r;
    let i;
    let o;
    let s = null;
    function a(...e) {
      if (!a.enabled) return;
      const n = a;
      const i = Number(new Date());
      const o = i - (r || i);
      n.diff = o;
      n.prev = r;
      n.curr = i;
      r = i;
      e[0] = t.coerce(e[0]);
      if ("string" != typeof e[0]) {
        e.unshift("%O");
      }
      let s = 0;
      e[0] = e[0].replace(/%([a-zA-Z%])/g, (r, i) => {
        if ("%%" === r) return "%";
        s++;
        const o = t.formatters[i];
        if ("function" == typeof o) {
          const t = e[s];
          r = o.call(n, t);
          e.splice(s, 1);
          s--;
        }
        return r;
      });
      t.formatArgs.call(n, e);
      (n.log || t.log).apply(n, e);
    }
    a.namespace = e;
    a.useColors = t.useColors();
    a.color = t.selectColor(e);
    a.extend = n;
    a.destroy = t.destroy;
    Object.defineProperty(a, "enabled", {
      enumerable: true,
      configurable: false,
      get: () =>
        null !== s
          ? s
          : (i !== t.namespaces && ((i = t.namespaces), (o = t.enabled(e))), o),
      set: (e) => {
        s = e;
      },
    });
    if ("function" == typeof t.init) {
      t.init(a);
    }
    return a;
  }
  function n(e, r) {
    const n = t(this.namespace + (undefined === r ? ":" : r) + e);
    n.log = this.log;
    return n;
  }
  function i(e) {
    return e
      .toString()
      .substring(2, e.toString().length - 2)
      .replace(/\.\*\?$/, "*");
  }
  t.debug = t;
  t.default = t;
  t.coerce = function (e) {
    return e instanceof Error ? e.stack || e.message : e;
  };
  t.disable = function () {
    const e = [...t.names.map(i), ...t.skips.map(i).map((e) => "-" + e)].join(
      ","
    );
    t.enable("");
    return e;
  };
  t.enable = function (e) {
    let r;
    t.save(e);
    t.namespaces = e;
    t.names = [];
    t.skips = [];
    const n = ("string" == typeof e ? e : "").split(/[\s,]+/);
    const i = n.length;
    for (r = 0; r < i; r++)
      if (n[r]) {
        if ("-" === (e = n[r].replace(/\*/g, ".*?"))[0]) {
          t.skips.push(new RegExp("^" + e.slice(1) + "$"));
        } else {
          t.names.push(new RegExp("^" + e + "$"));
        }
      }
  };
  t.enabled = function (e) {
    if ("*" === e[e.length - 1]) return true;
    let r;
    let n;
    for (r = 0, n = t.skips.length; r < n; r++)
      if (t.skips[r].test(e)) return false;
    for (r = 0, n = t.names.length; r < n; r++)
      if (t.names[r].test(e)) return true;
    return false;
  };
  t.humanize = require("time-converter-utils");
  t.destroy = function () {
    console.warn(
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
  };
  Object.keys(e).forEach((r) => {
    t[r] = e[r];
  });
  t.names = [];
  t.skips = [];
  t.formatters = {};
  t.selectColor = function (e) {
    let r = 0;
    for (let t = 0; t < e.length; t++) {
      r = (r << 5) - r + e.charCodeAt(t);
      r |= 0;
    }
    return t.colors[Math.abs(r) % t.colors.length];
  };
  t.enable(t.load());
  return t;
};
