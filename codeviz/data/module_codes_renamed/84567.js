Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.RealUrlOpener = exports.UrlOpener = undefined;
const M_xdg_open_launcher_maybe = require("xdg-open-launcher");
exports.UrlOpener = class {};
exports.RealUrlOpener = class {
  async open(e) {
    await M_xdg_open_launcher_maybe(e);
  }
};
