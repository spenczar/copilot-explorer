const n = require("timers");
function i() {}
function o() {}
function s() {}
const a = new Map();
const c = new Map();
const l = new Map();
let u = null;
let d = false;
function p(e, t, r, i, o, s, a) {
  const c = n[r];
  const l = n[i];
  n[r] = function () {
    if (!t.enabled) return c.apply(n, arguments);
    const r = new Array(arguments.length);
    for (let e = 0; e < arguments.length; e++) r[e] = arguments[e];
    const i = r[0];
    if ("function" != typeof i)
      throw new TypeError('"callback" argument must be a function');
    const l = new o();
    const p = --t.counter;
    let h;
    e.init.call(l, p, 0, null, null);
    r[0] = function () {
      u = h;
      e.pre.call(l, p);
      let t = true;
      try {
        i.apply(this, arguments);
        t = false;
      } finally {
        if (t && process.listenerCount("uncaughtException") > 0) {
          process.once("uncaughtException", function () {
            e.post.call(l, p, true);
            s.delete(h);
            e.destroy.call(null, p);
          });
        }
      }
      e.post.call(l, p, false);
      u = null;
      if (a || d) {
        d = false;
        s.delete(h);
        e.destroy.call(null, p);
      }
    };
    h = c.apply(n, r);
    s.set(h, p);
    return h;
  };
  n[i] = function (t) {
    if (u === t && null !== t) d = true;
    else if (s.has(t)) {
      const r = s.get(t);
      s.delete(t);
      e.destroy.call(null, r);
    }
    l.apply(n, arguments);
  };
}
module.exports = function () {
  p(this._hooks, this._state, "setTimeout", "clearTimeout", i, a, true);
  p(this._hooks, this._state, "setInterval", "clearInterval", o, c, false);
  p(this._hooks, this._state, "setImmediate", "clearImmediate", s, l, true);
  global.setTimeout = n.setTimeout;
  global.setInterval = n.setInterval;
  global.setImmediate = n.setImmediate;
  global.clearTimeout = n.clearTimeout;
  global.clearInterval = n.clearInterval;
  global.clearImmediate = n.clearImmediate;
};