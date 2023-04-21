const n = require("fs");
const i = require("path");
const o = require(55575);
const s = {
  mode: 511 & ~process.umask(),
  fs: n,
};
const a = (e) => {
  if (
    "win32" === process.platform &&
    /[<>:"|?*]/.test(e.replace(i.parse(e).root, ""))
  ) {
    const t = new Error(`Path contains invalid characters: ${e}`);
    throw ((t.code = "EINVAL"), t);
  }
};
module.exports = (e, t) =>
  Promise.resolve().then(() => {
    a(e);
    t = Object.assign({}, s, t);
    const r = o(t.fs.mkdir);
    const n = o(t.fs.stat);
    const c = (e) =>
      r(e, t.mode)
        .then(() => e)
        .catch((t) => {
          if ("ENOENT" === t.code) {
            if (t.message.includes("null bytes") || i.dirname(e) === e) throw t;
            return c(i.dirname(e)).then(() => c(e));
          }
          return n(e)
            .then((t) => (t.isDirectory() ? e : Promise.reject()))
            .catch(() => {
              throw t;
            });
        });
    return c(i.resolve(e));
  });
module.exports.sync = (e, t) => {
  a(e);
  t = Object.assign({}, s, t);
  const r = (e) => {
    try {
      t.fs.mkdirSync(e, t.mode);
    } catch (n) {
      if ("ENOENT" === n.code) {
        if (n.message.includes("null bytes") || i.dirname(e) === e) throw n;
        r(i.dirname(e));
        return r(e);
      }
      try {
        if (!t.fs.statSync(e).isDirectory())
          throw new Error("The path is not a directory");
      } catch (e) {
        throw n;
      }
    }
    return e;
  };
  return r(i.resolve(e));
};