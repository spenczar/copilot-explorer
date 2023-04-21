Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.RootCertificateConfigurator = undefined;
const n = require("tls");
const i = require(15291);
exports.RootCertificateConfigurator = class {
  constructor(e) {
    this._certificateReader = e.get(i.RootCertificateReader);
  }
  async createTunnelSettings(e) {
    return {
      ...e,
      ca: await this.getCertificates(),
    };
  }
  async getCertificates() {
    const e = await this._certificateReader.getAllRootCAs();
    if (0 !== e.length) return e;
  }
  async applyToRequestOptions(e) {
    const t = await this._certificateReader.getAllRootCAs();
    const r = {
      _vscodeAdditionalCaCerts: t,
    };
    e.secureContext = n.createSecureContext(r);
    t.map((t) => {
      e.secureContext.context.addCACert(t);
    });
  }
};