function t() {}
module.exports = function () {
  const e = this._hooks;
  const r = this._state;
  const n = process.nextTick;
  process.nextTick = function () {
    if (!r.enabled) return n.apply(process, arguments);
    const i = new Array(arguments.length);
    for (let e = 0; e < arguments.length; e++) i[e] = arguments[e];
    const o = i[0];
    if ("function" != typeof o)
      throw new TypeError("callback is not a function");
    const s = new t();
    const a = --r.counter;
    e.init.call(s, a, 0, null, null);
    i[0] = function () {
      e.pre.call(s, a);
      let t = true;
      try {
        o.apply(this, arguments);
        t = false;
      } finally {
        if (t && process.listenerCount("uncaughtException") > 0) {
          process.once("uncaughtException", function () {
            e.post.call(s, a, true);
            e.destroy.call(null, a);
          });
        }
      }
      e.post.call(s, a, false);
      e.destroy.call(null, a);
    };
    return n.apply(process, i);
  };
};
