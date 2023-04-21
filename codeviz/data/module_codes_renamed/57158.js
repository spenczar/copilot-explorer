Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.HelixFetcher = undefined;
const M_fetch_helper_maybe = require("fetch-helper");
const M_ProxyAgent_maybe = require("ProxyAgent");
const M_editor_config_constants_maybe = require("editor-config-constants");
const M_FetcherRequestManager_maybe = require("FetcherRequestManager");
const M_RootCertificateConfiguratorModule_maybe = require("RootCertificateConfiguratorModule");
class HelixFetcher extends M_FetcherRequestManager_maybe.Fetcher {
  constructor(e) {
    super();
    this.ctx = e;
    this.createSocketFactory = (e) => async (t) => {
      const r = await this.certificateConfigurator.createTunnelSettings(e);
      const n = M_ProxyAgent_maybe.httpOverHttp({
        proxy: r,
      });
      t.rejectUnauthorized = e.rejectUnauthorized;
      await this.certificateConfigurator.applyToRequestOptions(t);
      return new Promise((i, o) => {
        this.fixTunnelErrorHandling(t, o);
        const s = setTimeout(() => {
          o({
            message: `tunneling socket could not be established, proxy socket connection timeout while connecting to ${r.host}:${r.port}`,
          });
        }, e.connectionTimeoutInMs ?? 1e4);
        n.createSocket(t, (e) => {
          clearTimeout(s);
          i(e);
        });
      });
    };
    this.fetchApi = this.createFetchApi(e);
    this.certificateConfigurator =
      new M_RootCertificateConfiguratorModule_maybe.RootCertificateConfigurator(
        e
      );
  }
  fixTunnelErrorHandling(e, t) {
    if (e.request?.emit) {
      e.request = {};
      e.request.emit = function (e, r) {
        t(r);
      };
    }
  }
  set proxySettings(e) {
    this._proxySettings = e;
    this.fetchApi = this.createFetchApi(this.ctx);
  }
  get proxySettings() {
    return this._proxySettings;
  }
  createFetchApi(e) {
    const t = e.get(M_editor_config_constants_maybe.BuildInfo);
    if (false === this._proxySettings?.rejectUnauthorized) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }
    return M_fetch_helper_maybe.context({
      userAgent: `GithubCopilot/${t.getVersion()}`,
      socketFactory: this._proxySettings
        ? this.createSocketFactory(this._proxySettings)
        : undefined,
    });
  }
  async fetch(e, t) {
    const r = {
      ...t,
      body: t.body ? t.body : t.json,
      signal: t.signal,
    };
    const n = await this.fetchApi.fetch(e, r);
    return new M_FetcherRequestManager_maybe.Response(
      n.status,
      n.statusText,
      n.headers,
      () => n.text(),
      () => n.json(),
      async () => n.body
    );
  }
  disconnectAll() {
    return this.fetchApi.reset();
  }
  makeAbortController() {
    return new M_fetch_helper_maybe.AbortController();
  }
}
exports.HelixFetcher = HelixFetcher;
