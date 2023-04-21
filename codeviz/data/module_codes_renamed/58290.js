Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.RootCertificateConfigurator = undefined;
const M_tls = require("tls");
const M_RootCertificateReaderManager_maybe = require("RootCertificateReaderManager");
exports.RootCertificateConfigurator = class {
  constructor(e) {
    this._certificateReader = e.get(
      M_RootCertificateReaderManager_maybe.RootCertificateReader
    );
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
    e.secureContext = M_tls.createSecureContext(r);
    t.map((t) => {
      e.secureContext.context.addCACert(t);
    });
  }
};
