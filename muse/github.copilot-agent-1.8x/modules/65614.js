Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.defaultFileSystem = exports.FileSystem = undefined;
const n = require("fs");
exports.FileSystem = class {};
exports.defaultFileSystem = {
  readFile: (e) => n.promises.readFile(e),
  mtime: async (e) => (await n.promises.stat(e)).mtimeMs,
  async stat(e) {
    const t = await n.promises.stat(e);
    return {
      ctime: t.ctimeMs,
      mtime: t.mtimeMs,
      size: t.size,
    };
  },
};