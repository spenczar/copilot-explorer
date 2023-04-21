Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.agentEditorSession = undefined;
const M_crypto = require("crypto");
const M_os = require("os");
const M_url_opener = require("url-opener");
const M_editor_config_constants_maybe = require("editor-config-constants");
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
const u = M_url_opener.v4() + Date.now();
exports.agentEditorSession = new M_editor_config_constants_maybe.EditorSession(
  u,
  (function () {
    if (!l) {
      const e = (function () {
        try {
          const e = (function () {
            const e = M_os.networkInterfaces();
            for (const t in e) {
              const r = e[t];
              if (r) for (const { mac: e } of r) if (c(e)) return e;
            }
            throw new Error(
              "Unable to retrieve mac address (unexpected format)"
            );
          })();
          return M_crypto.createHash("sha256").update(e, "utf8").digest("hex");
        } catch (e) {
          return;
        }
      })();
      l = e || M_url_opener.v4();
    }
    return l;
  })()
);
