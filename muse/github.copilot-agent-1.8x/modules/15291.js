Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getRootCertificateReader = exports.RootCertificateReader = undefined;
const n = require("child_process");
const i = require("fs");
const o = require("os");
const s = require("path");
const a = require(40084);
const c = require(5798);
const l = new c.Logger(c.LogLevel.WARN, "certificates");
class RootCertificateReader {}
exports.RootCertificateReader = RootCertificateReader;
const d = new Map();
exports.getRootCertificateReader = (e, t = process.platform) =>
  new p(e.get(a.CopilotTokenNotifier), h(t, e), new w());
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
      const t = await i.promises.readFile(e, {
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
    const e = require(11240);
    const t = require(35758);
    return e.all().map((e) => t.pki.certificateToPem(e));
  }
}
class _ extends RootCertificateReader {
  async getAllRootCAs() {
    return new Promise((e, t) => {
      const i = this.setupExecFileWithLargeBuffer(t);
      try {
        const t = require(79321);
        if (this.exePath) {
          this.exePath = this.setupCertificateFallbackExecutable();
        }
        t.exe(this.exePath);
        const o = [];
        t({
          format: t.der2.pem,
          fallback: true,
          async: true,
          ondata: (e) => o.push(e),
          onend: () => e(o),
        });
      } catch (e) {
        t(e);
      } finally {
        n.execFile = i;
      }
    });
  }
  setupExecFileWithLargeBuffer(e) {
    const t = n.execFile;
    n.execFile = function (r, n, i) {
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
    if ("dist" === s.basename(__dirname)) {
      e = s.dirname(__dirname);
    }
    const t = s.join(e, "dist", "roots.exe");
    const r = i.mkdtempSync(s.join(o.tmpdir(), "copilot-"));
    const n = s.join(r, "copilot-find-certificates.exe");
    i.copyFileSync(t, n);
    i.chmodSync(n, 493);
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