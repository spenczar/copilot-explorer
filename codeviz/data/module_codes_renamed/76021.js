Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.agentFileSystem = undefined;
const M_fs = require("fs");
exports.agentFileSystem = {
  readFile: function (e) {
    return M_fs.promises.readFile(e);
  },
  mtime: async function (e) {
    return (await M_fs.promises.stat(e)).mtimeMs;
  },
  stat: async function (e) {
    const t = await M_fs.promises.stat(e);
    return {
      ctime: t.ctimeMs,
      mtime: t.mtimeMs,
      size: t.size,
    };
  },
};
