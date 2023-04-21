Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.GitHubDeviceFlow = undefined;
const M_editor_config_constants_maybe = require("editor-config-constants");
const M_SelfSignedCertificateNotifier_maybe = require("SelfSignedCertificateNotifier");
const M_FetcherRequestManager_maybe = require("FetcherRequestManager");
const s = "Iv1.b507a08c87ecfe98";
async function a(e, t) {
  const r = {
    method: "POST",
    headers: {
      Accept: "application/json",
      ...M_editor_config_constants_maybe.editorVersionHeaders(e),
    },
    json: {
      client_id: s,
      device_code: t,
      grant_type: "urn:ietf:params:oauth:grant-type:device_code",
    },
    timeout: 3e4,
  };
  return e
    .get(M_FetcherRequestManager_maybe.Fetcher)
    .fetch("https://github.com/login/oauth/access_token", r)
    .then((e) => e.json());
}
async function c(e, t) {
  return e
    .get(M_FetcherRequestManager_maybe.Fetcher)
    .fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${t}`,
        Accept: "application/json",
      },
    })
    .then((e) => e.json());
}
exports.GitHubDeviceFlow = class {
  async getToken(e) {
    try {
      return await this.getTokenUnguarded(e);
    } catch (t) {
      throw (
        (e
          .get(M_SelfSignedCertificateNotifier_maybe.UserErrorNotifier)
          .notifyUser(e, t),
        t)
      );
    }
  }
  async getTokenUnguarded(e) {
    const t = await (async function (e) {
      const t = {
        method: "POST",
        headers: {
          Accept: "application/json",
          ...M_editor_config_constants_maybe.editorVersionHeaders(e),
        },
        json: {
          client_id: s,
          scope: "read:user",
        },
        timeout: 3e4,
      };
      const r = e
        .get(M_FetcherRequestManager_maybe.Fetcher)
        .fetch("https://github.com/login/device/code", t);
      return (await r).json();
    })(e);
    const r = new Promise(async (r, n) => {
      let i;
      let o = t.expires_in;
      for (; o > 0; ) {
        const n = await a(e, t.device_code);
        o -= t.interval;
        await new Promise((e) => setTimeout(e, 1e3 * t.interval));
        i = n.access_token;
        if (i)
          return void r({
            user: (await c(e, i)).login,
            oauth_token: i,
          });
      }
      n("Timed out waiting for login to complete");
    });
    return {
      ...t,
      waitForAuth: r,
    };
  }
};
