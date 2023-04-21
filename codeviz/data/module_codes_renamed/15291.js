Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getRootCertificateReader = exports.RootCertificateReader = undefined;
const M_child_process = require("child_process");
const M_fs = require("fs");
const M_os = require("os");
const M_path = require("path");
const M_TokenNotifierModule_maybe = require("TokenNotifierModule");
const M_LoggingUtils_maybe = require("LoggingUtils");
const l = new M_LoggingUtils_maybe.Logger(
  M_LoggingUtils_maybe.LogLevel.WARN,
  "certificates"
);
class RootCertificateReader {}
exports.RootCertificateReader = RootCertificateReader;
const d = new Map();
exports.getRootCertificateReader = (e, t = process.platform) =>
  new p(
    e.get(M_TokenNotifierModule_maybe.CopilotTokenNotifier),
    h(t, e),
    new w()
  );
class p {
  constructor(e, t, r) {
    this.realReader = t;
    this.noopReader = r;
    this.delegate = t;
    e.on("onCopilotToken", (e) => {
      this.delegate =
        "1" === e.getTokenValue("ssc") ? this.realReader : this.noopReader;
    });
  }
  getAllRootCAs() {
    return this.delegate.getAllRootCAs();
  }
}
const h = (e, t) => {
  let r = d.get(e);
  if (!r) {
    const n = f(e);
    const i = new m(n);
    r = new g(t, i);
    d.set(e, r);
  }
  return r;
};
const f = (e) => {
  switch (e) {
    case "linux":
      return new y();
    case "darwin":
      return new v();
    case "win32":
      return new _();
    default:
      return new b();
  }
};
class g {
  constructor(e, t) {
    this.ctx = e;
    this.delegate = t;
  }
  async getAllRootCAs() {
    try {
      return await this.delegate.getAllRootCAs();
    } catch (e) {
      l.warn(this.ctx, `Failed to read root certificates: ${e}`);
      return [];
    }
  }
}
class m extends RootCertificateReader {
  constructor(e) {
    super();
    this.delegate = e;
  }
  async getAllRootCAs() {
    if (this.certificates) {
      this.certificates = await this.delegate.getAllRootCAs();
    }
    return this.certificates;
  }
}
class y extends RootCertificateReader {
  async getAllRootCAs() {
    let e = [];
    for (const t of [
      "/etc/ssl/certs/ca-certificates.crt",
      "/etc/ssl/certs/ca-bundle.crt",
    ]) {
      const r = await this.readCerts(t);
      e = e.concat(r);
    }
    return e;
  }
  async readCerts(e) {
    try {
      const t = await M_fs.promises.readFile(e, {
        encoding: "utf8",
      });
      const r = new Set(
        t.split(/(?=-----BEGIN CERTIFICATE-----)/g).filter((e) => !!e.length)
      );
      return Array.from(r);
    } catch (e) {
      if ("ENOENT" !== e?.code) throw e;
    }
    return [];
  }
}
class v extends RootCertificateReader {
  async getAllRootCAs() {
    const M_Certificate_Manager_maybe = require("Certificate-Manager");
    const M_require_manager_maybe = require("require-manager");
    return M_Certificate_Manager_maybe.all().map((e) =>
      M_require_manager_maybe.pki.certificateToPem(e)
    );
  }
}
class _ extends RootCertificateReader {
  async getAllRootCAs() {
    return new Promise((e, t) => {
      const i = this.setupExecFileWithLargeBuffer(t);
      try {
        const M_ContextualDataParsingUtils_maybe = require("ContextualDataParsingUtils");
        if (this.exePath) {
          this.exePath = this.setupCertificateFallbackExecutable();
        }
        M_ContextualDataParsingUtils_maybe.exe(this.exePath);
        const o = [];
        M_ContextualDataParsingUtils_maybe({
          format: M_ContextualDataParsingUtils_maybe.der2.pem,
          fallback: true,
          async: true,
          ondata: (e) => o.push(e),
          onend: () => e(o),
        });
      } catch (e) {
        t(e);
      } finally {
        M_child_process.execFile = i;
      }
    });
  }
  setupExecFileWithLargeBuffer(e) {
    const t = M_child_process.execFile;
    M_child_process.execFile = function (r, n, i) {
      return t(
        r,
        n,
        {
          maxBuffer: 12582912,
        },
        function (t) {
          i(t, "", "");
          e(t);
        }
      );
    };
    return t;
  }
  setupCertificateFallbackExecutable() {
    let e = __dirname;
    if ("dist" === M_path.basename(__dirname)) {
      e = M_path.dirname(__dirname);
    }
    const t = M_path.join(e, "dist", "roots.exe");
    const r = M_fs.mkdtempSync(M_path.join(M_os.tmpdir(), "copilot-"));
    const n = M_path.join(r, "copilot-find-certificates.exe");
    M_fs.copyFileSync(t, n);
    M_fs.chmodSync(n, 493);
    return n;
  }
}
class b extends RootCertificateReader {
  async getAllRootCAs() {
    throw new Error("No certificate reader available for unsupported platform");
  }
}
class w extends RootCertificateReader {
  async getAllRootCAs() {
    return [];
  }
}
