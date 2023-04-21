Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.agentFileSystem = undefined;
const n = require("fs");
exports.agentFileSystem = {
  readFile: function (e) {
    return n.promises.readFile(e);
  },
  mtime: async function (e) {
    return (await n.promises.stat(e)).mtimeMs;
  },
  stat: async function (e) {
    const t = await n.promises.stat(e);
    return {
      ctime: t.ctimeMs,
      mtime: t.mtimeMs,
      size: t.size,
    };
  },
};