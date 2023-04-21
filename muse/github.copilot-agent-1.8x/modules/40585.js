Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.makeXdgPersistenceManager = exports.PersistenceManager = undefined;
const n = require("fs");
const i = require("os");
const o = require("process");
class PersistenceManager {
  constructor(e) {
    this.directory = e;
  }
  async read(e, t) {
    const r = `${this.directory}/${e}.json`;
    try {
      const e = await n.promises.readFile(r, {
        encoding: "utf8",
      });
      return JSON.parse(e)[t];
    } catch (e) {
      return;
    }
  }
  async update(e, t, r) {
    await n.promises.mkdir(this.directory, {
      recursive: true,
      mode: 448,
    });
    const i = `${this.directory}/${e}.json`;
    let o = {};
    try {
      const e = await n.promises.readFile(i, {
        encoding: "utf8",
      });
      o = JSON.parse(e);
    } catch (e) {}
    o[t] = r;
    await n.promises.writeFile(i, JSON.stringify(o) + "\n", {
      encoding: "utf8",
    });
  }
  async delete(e, t) {
    const r = `${this.directory}/${e}.json`;
    try {
      const e = await n.promises.readFile(r, {
        encoding: "utf8",
      });
      const i = JSON.parse(e);
      delete i[t];
      await n.promises.writeFile(r, JSON.stringify(i) + "\n", {
        encoding: "utf8",
      });
    } catch (e) {}
  }
}
exports.PersistenceManager = PersistenceManager;
exports.makeXdgPersistenceManager = function () {
  return new PersistenceManager(
    o.env.XDG_CONFIG_HOME
      ? o.env.XDG_CONFIG_HOME + "/github-copilot"
      : "win32" === i.platform()
      ? o.env.USERPROFILE + "\\AppData\\Local\\github-copilot"
      : o.env.HOME + "/.config/github-copilot"
  );
};