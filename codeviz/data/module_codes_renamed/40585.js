Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.makeXdgPersistenceManager = exports.PersistenceManager = undefined;
const M_fs = require("fs");
const M_os = require("os");
const M_process = require("process");
class PersistenceManager {
  constructor(e) {
    this.directory = e;
  }
  async read(e, t) {
    const r = `${this.directory}/${e}.json`;
    try {
      const e = await M_fs.promises.readFile(r, {
        encoding: "utf8",
      });
      return JSON.parse(e)[t];
    } catch (e) {
      return;
    }
  }
  async update(e, t, r) {
    await M_fs.promises.mkdir(this.directory, {
      recursive: true,
      mode: 448,
    });
    const i = `${this.directory}/${e}.json`;
    let o = {};
    try {
      const e = await M_fs.promises.readFile(i, {
        encoding: "utf8",
      });
      o = JSON.parse(e);
    } catch (e) {}
    o[t] = r;
    await M_fs.promises.writeFile(i, JSON.stringify(o) + "\n", {
      encoding: "utf8",
    });
  }
  async delete(e, t) {
    const r = `${this.directory}/${e}.json`;
    try {
      const e = await M_fs.promises.readFile(r, {
        encoding: "utf8",
      });
      const i = JSON.parse(e);
      delete i[t];
      await M_fs.promises.writeFile(r, JSON.stringify(i) + "\n", {
        encoding: "utf8",
      });
    } catch (e) {}
  }
}
exports.PersistenceManager = PersistenceManager;
exports.makeXdgPersistenceManager = function () {
  return new PersistenceManager(
    M_process.env.XDG_CONFIG_HOME
      ? M_process.env.XDG_CONFIG_HOME + "/github-copilot"
      : "win32" === M_os.platform()
      ? M_process.env.USERPROFILE + "\\AppData\\Local\\github-copilot"
      : M_process.env.HOME + "/.config/github-copilot"
  );
};
