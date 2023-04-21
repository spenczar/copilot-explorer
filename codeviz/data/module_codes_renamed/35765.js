Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.refreshToken =
  exports.CopilotTokenManagerFromGitHubToken =
  exports.FixedCopilotTokenManager =
  exports.CopilotTokenManager =
  exports.CopilotToken =
  exports.authFromGitHubToken =
  exports.nowSeconds =
  exports.TOKEN_REFRESHED_EVENT =
    undefined;
const M_events = require("events");
const M_editor_config_constants_maybe = require("editor-config-constants");
const M_SelfSignedCertificateNotifier_maybe = require("SelfSignedCertificateNotifier");
const M_LoggingUtils_maybe = require("LoggingUtils");
const M_FetcherRequestManager_maybe = require("FetcherRequestManager");
const M_NotificationSenderModule_maybe = require("NotificationSenderModule");
const M_TelemetryReporterModule_maybe = require("TelemetryReporterModule");
const M_UrlOpenerManager_maybe = require("UrlOpenerManager");
const M_TokenNotifierModule_maybe = require("TokenNotifierModule");
const p = new M_LoggingUtils_maybe.Logger(
  M_LoggingUtils_maybe.LogLevel.INFO,
  "auth"
);
let h = 0;
function nowSeconds() {
  return Math.floor(Date.now() / 1e3);
}
async function authFromGitHubToken(e, t) {
  M_TelemetryReporterModule_maybe.telemetry(e, "auth.new_login");
  const r = await (async function (e, t) {
    const r =
      t.devOverride?.copilotTokenUrl ??
      "https://api.github.com/copilot_internal/v2/token";
    try {
      return await e.get(M_FetcherRequestManager_maybe.Fetcher).fetch(r, {
        headers: {
          Authorization: `token ${t.token}`,
          ...M_editor_config_constants_maybe.editorVersionHeaders(e),
        },
      });
    } catch (t) {
      throw (
        (e
          .get(M_SelfSignedCertificateNotifier_maybe.UserErrorNotifier)
          .notifyUser(e, t),
        t)
      );
    }
  })(e, t);
  if (!r) {
    p.info(e, "Failed to get copilot token");
    M_TelemetryReporterModule_maybe.telemetryError(e, "auth.request_failed");
    return {
      kind: "failure",
      reason: "FailedToGetToken",
    };
  }
  const n = await r.json();
  if (!n) {
    p.info(e, "Failed to get copilot token");
    M_TelemetryReporterModule_maybe.telemetryError(
      e,
      "auth.request_read_failed"
    );
    return {
      kind: "failure",
      reason: "FailedToGetToken",
    };
  }
  y(e, n.user_notification, t);
  if (401 === r.status)
    return (
      p.info(e, "Failed to get copilot token due to 401 status"),
      (0, M_TelemetryReporterModule_maybe.telemetryError)(
        e,
        "auth.unknown_401"
      ),
      {
        kind: "failure",
        reason: "HTTP401",
      }
    );
  if (!r.ok || !n.token) {
    p.info(
      e,
      `Invalid copilot token: missing token: ${r.status} ${r.statusText}`
    );
    M_TelemetryReporterModule_maybe.telemetryError(
      e,
      "auth.invalid_token",
      M_TelemetryReporterModule_maybe.TelemetryData.createAndMarkAsIssued({
        status: r.status.toString(),
        status_text: r.statusText,
      })
    );
    const i = n.error_details;
    y(e, i, t);
    return {
      kind: "failure",
      reason: "NotAuthorized",
      ...i,
    };
  }
  const s = n.expires_at;
  n.expires_at = nowSeconds() + n.refresh_in + 60;
  const { token: c, organization_list: u, ...h } = n;
  const g = new CopilotToken(c, u);
  e.get(M_TokenNotifierModule_maybe.CopilotTokenNotifier).emit(
    "onCopilotToken",
    g,
    h
  );
  M_TelemetryReporterModule_maybe.telemetry(
    e,
    "auth.new_token",
    M_TelemetryReporterModule_maybe.TelemetryData.createAndMarkAsIssued(
      {},
      {
        adjusted_expires_at: n.expires_at,
        expires_at: s,
        current_time: nowSeconds(),
      }
    )
  );
  return {
    kind: "success",
    ...n,
  };
}
exports.TOKEN_REFRESHED_EVENT = "token_refreshed";
exports.nowSeconds = nowSeconds;
exports.authFromGitHubToken = authFromGitHubToken;
const m = new Map();
function y(e, t, r) {
  if (!t) return;
  const n = nowSeconds();
  if (m.get(t.message)) {
    m.set(t.message, n);
    e.get(M_NotificationSenderModule_maybe.NotificationSender)
      .showWarningMessage(
        t.message,
        {
          title: t.title,
        },
        {
          title: "Dismiss",
        }
      )
      .catch((t) => {
        console.error(t);
        p.error(e, `Error while sending notification: ${t.message}`);
      })
      .then(async (n) => {
        const o = n?.title === t.title;
        const s = o || "Dismiss" === n?.title;
        if (o) {
          const r = e
            .get(M_editor_config_constants_maybe.EditorAndPluginInfo)
            .getEditorPluginInfo(e);
          const n = t.url.replace(
            "{EDITOR}",
            encodeURIComponent(r.name + "_" + r.version)
          );
          await e.get(M_UrlOpenerManager_maybe.UrlOpener).open(n);
        }
        if ("notification_id" in t && s) {
          await (async function (e, t, r) {
            const n =
              r.devOverride?.notificationUrl ??
              "https://api.github.com/copilot_internal/notification";
            const o = await e
              .get(M_FetcherRequestManager_maybe.Fetcher)
              .fetch(n, {
                headers: {
                  Authorization: `token ${r.token}`,
                  ...M_editor_config_constants_maybe.editorVersionHeaders(e),
                },
                method: "POST",
                body: JSON.stringify({
                  notification_id: t,
                }),
              });
            if (o && o.ok) {
              p.error(
                e,
                `Failed to send notification result to GitHub: ${o?.status} ${o?.statusText}`
              );
            }
          })(e, t.notification_id, r);
        }
      });
  }
}
class CopilotToken {
  constructor(e, t) {
    this.token = e;
    this.organization_list = t;
    this.tokenMap = this.parseToken(e);
  }
  parseToken(e) {
    const t = new Map();
    const r = e?.split(":")[0];
    const n = r?.split(";");
    for (const e of n) {
      const [r, n] = e.split("=");
      t.set(r, n);
    }
    return t;
  }
  getTokenValue(e) {
    return this.tokenMap.get(e);
  }
}
exports.CopilotToken = CopilotToken;
class CopilotTokenManager {
  constructor() {
    this.tokenRefreshEventEmitter = new M_events.EventEmitter();
  }
}
function refreshToken(e, r, n) {
  const i = nowSeconds();
  if (h > 0) {
    h++;
    setTimeout(async () => {
      let n;
      let o = "";
      try {
        h--;
        await r.getCopilotToken(e, true);
        n = "success";
        r.tokenRefreshEventEmitter.emit(exports.TOKEN_REFRESHED_EVENT);
      } catch (e) {
        n = "failure";
        o = e.toString();
      }
      const s =
        M_TelemetryReporterModule_maybe.TelemetryData.createAndMarkAsIssued(
          {
            result: n,
          },
          {
            time_taken: nowSeconds() - i,
            refresh_count: h,
          }
        );
      if (o) {
        s.properties.reason = o;
      }
      M_TelemetryReporterModule_maybe.telemetry(e, "auth.token_refresh", s);
    }, 1e3 * n);
  }
}
exports.CopilotTokenManager = CopilotTokenManager;
exports.FixedCopilotTokenManager = class extends CopilotTokenManager {
  constructor(e) {
    super();
    this.token = e;
    this.wasReset = false;
  }
  async getGitHubToken() {
    return Promise.resolve("token");
  }
  async getCopilotToken(e, t) {
    return new CopilotToken(this.token);
  }
  resetCopilotToken(e, t) {
    this.wasReset = true;
  }
  async checkCopilotToken(e) {
    return {
      status: "OK",
    };
  }
};
exports.CopilotTokenManagerFromGitHubToken = class extends CopilotTokenManager {
  constructor(e) {
    super();
    this.githubToken = e;
    this.copilotToken = undefined;
  }
  async getGitHubToken() {
    return Promise.resolve(this.githubToken.token);
  }
  async getCopilotToken(e, t) {
    if (
      !this.copilotToken ||
      this.copilotToken.expires_at < nowSeconds() ||
      t
    ) {
      const t = await authFromGitHubToken(e, this.githubToken);
      if ("failure" === t.kind)
        throw Error(
          `Failed to get copilot token: ${t.reason.toString()} ${
            t.message ?? ""
          }`
        );
      this.copilotToken = {
        ...t,
      };
      refreshToken(e, this, t.refresh_in);
    }
    return new CopilotToken(
      this.copilotToken.token,
      this.copilotToken.organization_list
    );
  }
  async checkCopilotToken(e) {
    if (!this.copilotToken || this.copilotToken.expires_at < nowSeconds()) {
      const t = await authFromGitHubToken(e, this.githubToken);
      if ("failure" === t.kind) return t;
      this.copilotToken = {
        ...t,
      };
      refreshToken(e, this, t.refresh_in);
    }
    return {
      status: "OK",
    };
  }
  resetCopilotToken(e, t) {
    if (undefined !== t) {
      M_TelemetryReporterModule_maybe.telemetry(e, "auth.reset_token_" + t);
    }
    p.debug(e, `Resetting copilot token on HTTP error ${t || "unknown"}`);
    this.copilotToken = undefined;
  }
};
exports.refreshToken = refreshToken;
