const M_net = require("net");
class i extends Error {
  constructor(e) {
    super(`${e} is locked`);
  }
}
const o = {
  old: new Set(),
  young: new Set(),
};
let s;
const a = (e) =>
  new Promise((t, r) => {
    const i = M_net.createServer();
    i.unref();
    i.on("error", r);
    i.listen(e, () => {
      const { port: e } = i.address();
      i.close(() => {
        t(e);
      });
    });
  });
module.exports = async (e) => {
  let t;
  if (e) {
    t = "number" == typeof e.port ? [e.port] : e.port;
  }
  if (undefined === s) {
    s = setInterval(() => {
      o.old = o.young;
      o.young = new Set();
    }, 15e3);
    if (s.unref) {
      s.unref();
    }
  }
  for (const r of (function* (e) {
    if (e) {
      yield* e;
    }
    yield 0;
  })(t))
    try {
      let t = await a({
        ...e,
        port: r,
      });
      for (; o.old.has(t) || o.young.has(t); ) {
        if (0 !== r) throw new i(r);
        t = await a({
          ...e,
          port: r,
        });
      }
      o.young.add(t);
      return t;
    } catch (e) {
      if (!(["EADDRINUSE", "EACCES"].includes(e.code) || e instanceof i))
        throw e;
    }
  throw new Error("No available ports found");
};
module.exports.makeRange = (e, t) => {
  if (!Number.isInteger(e) || !Number.isInteger(t))
    throw new TypeError("`from` and `to` must be integer numbers");
  if (e < 1024 || e > 65535)
    throw new RangeError("`from` must be between 1024 and 65535");
  if (t < 1024 || t > 65536)
    throw new RangeError("`to` must be between 1024 and 65536");
  if (t < e)
    throw new RangeError("`to` must be greater than or equal to `from`");
  return (function* (e, t) {
    for (let r = e; r <= t; r++) yield r;
  })(e, t);
};
