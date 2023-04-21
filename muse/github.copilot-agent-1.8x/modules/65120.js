Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.agentEditorSession = undefined;
const n = require("crypto");
const i = require("os");
const o = require(7057);
const s = require(39800);
const a = new Set([
  "00:00:00:00:00:00",
  "ff:ff:ff:ff:ff:ff",
  "ac:de:48:00:11:22",
]);
function c(e) {
  const t = e.replace(/-/g, ":").toLowerCase();
  return !a.has(t);
}
let l;
const u = o.v4() + Date.now();
exports.agentEditorSession = new s.EditorSession(
  u,
  (function () {
    if (!l) {
      const e = (function () {
        try {
          const e = (function () {
            const e = i.networkInterfaces();
            for (const t in e) {
              const r = e[t];
              if (r) for (const { mac: e } of r) if (c(e)) return e;
            }
            throw new Error(
              "Unable to retrieve mac address (unexpected format)"
            );
          })();
          return n.createHash("sha256").update(e, "utf8").digest("hex");
        } catch (e) {
          return;
        }
      })();
      l = e || o.v4();
    }
    return l;
  })()
);