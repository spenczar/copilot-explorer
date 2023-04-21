Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.parsesWithoutError =
  exports.getPrompt =
  exports.getNodeStart =
  exports.getFunctionPositions =
  exports.getBlockCloseToken =
  exports.isSupportedLanguageId =
  exports.isBlockBodyFinished =
  exports.isEmptyBlockStart =
  exports.terminate =
  exports.init =
    undefined;
const n = require(44617);
let i = null;
const o = new Map();
let s = 0;
exports.init = function (t, u, d) {
  if (!u) {
    const t = require(13094);
    for (const r of [...a, ...c]) module.exports[r] = t[r];
    return;
  }
  for (const r of a) module.exports[r] = l(t, d, r);
  module.exports.getPrompt = (function (e, t) {
    return function (r, ...n) {
      const a = s++;
      return new Promise((r, s) => {
        o.set(a, {
          resolve: r,
          reject: s,
        });
        t.debug(e, `Proxy getPrompt - ${a}`);
        i?.postMessage({
          id: a,
          fn: "getPrompt",
          args: n,
        });
      });
    };
  })(t, d);
  i = n.createWorker();
  o.clear();
  s = 0;
  const p = t.get(n.FileSystem);
  function h(e) {
    d.error(t, e);
    for (const t of o.values()) t.reject(e);
    o.clear();
  }
  i.on("message", ({ id: e, err: r, res: n }) => {
    const i = o.get(e);
    d.debug(t, `Response ${e} - ${n}, ${r}`);
    if (i) {
      o.delete(e);
      if (r) {
        i.reject(r);
      } else {
        i.resolve(n);
      }
    }
  });
  i.on("error", h);
  i.on("exit", (e) => {
    if (0 !== e) {
      h(new Error(`Worker thread exited with code ${e}.`));
    }
  });
  i.on("readFileReq", (e) => {
    d.debug(t, `READ_FILE_REQ - ${e}`);
    p.readFile(e)
      .then((e) => {
        i?.emit("readFileRes", e);
      })
      .catch(h);
  });
  i.on("mtimeRes", (e) => {
    d.debug(t, `mTime_REQ - ${e}`);
    p.mtime(e)
      .then((e) => {
        i?.emit("mtimeRes", e);
      })
      .catch(h);
  });
};
exports.terminate = function () {
  if (i) {
    i.removeAllListeners();
    i.terminate();
    i = null;
    o.clear();
  }
};
const a = [
  "getFunctionPositions",
  "isEmptyBlockStart",
  "isBlockBodyFinished",
  "getNodeStart",
  "parsesWithoutError",
];
const c = ["isSupportedLanguageId", "getBlockCloseToken", "getPrompt"];
function l(e, t, r) {
  return function (...n) {
    const a = s++;
    return new Promise((s, c) => {
      o.set(a, {
        resolve: s,
        reject: c,
      });
      t.debug(e, `Proxy ${r}`);
      i?.postMessage({
        id: a,
        fn: r,
        args: n,
      });
    });
  };
}
exports.isEmptyBlockStart = n.isEmptyBlockStart;
exports.isBlockBodyFinished = n.isBlockBodyFinished;
exports.isSupportedLanguageId = n.isSupportedLanguageId;
exports.getBlockCloseToken = n.getBlockCloseToken;
exports.getFunctionPositions = n.getFunctionPositions;
exports.getNodeStart = n.getNodeStart;
exports.getPrompt = n.getPrompt;
exports.parsesWithoutError = n.parsesWithoutError;