Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.logEnginePrompt =
  exports.logEngineCompletion =
  exports.telemetryError =
  exports.telemetryException =
  exports.telemetryRaw =
  exports.telemetryExpProblem =
  exports.telemetry =
  exports.TelemetryEndpointUrl =
  exports.now =
  exports.telemetrizePromptLength =
  exports.TelemetryData =
  exports.TelemetryUserConfig =
  exports.TelemetryReporters =
  exports.CopilotTelemetryReporter =
    undefined;
const M_schema_code_generator_maybe = require("schema-code-generator");
const M_url_opener = require("url-opener");
const M_TokenNotifierModule_maybe = require("TokenNotifierModule");
const M_editor_config_constants_maybe = require("editor-config-constants");
const M_ExperimentCacheManager_maybe = require("ExperimentCacheManager");
const M_exp_service_telemetry_constants_maybe = require("exp-service-telemetry-constants");
const M_RuntimeModeManager_maybe = require("RuntimeModeManager");
const M_TelemetryCaptureUtils_maybe = require("TelemetryCaptureUtils");
const M_PathRedactor_maybe = require("PathRedactor");
exports.CopilotTelemetryReporter = class {};
class TelemetryReporters {
  getReporter(e) {
    return this.reporter;
  }
  getSecureReporter(e) {
    return y(e)
      ? this.reporterSecure
      : M_RuntimeModeManager_maybe.shouldFailForDebugPurposes(e)
      ? new M_TelemetryCaptureUtils_maybe.FailingTelemetryReporter()
      : undefined;
  }
  setReporter(e) {
    this.reporter = e;
  }
  setSecureReporter(e) {
    this.reporterSecure = e;
  }
  async deactivate() {
    let e = Promise.resolve();
    if (this.reporter) {
      e = this.reporter.dispose();
      this.reporter = undefined;
    }
    let t = Promise.resolve();
    if (this.reporterSecure) {
      t = this.reporterSecure.dispose();
      this.reporterSecure = undefined;
    }
    await Promise.all([e, t]);
  }
}
exports.TelemetryReporters = TelemetryReporters;
class TelemetryUserConfig {
  constructor(e, t, r) {
    this.trackingId = t;
    this.optedIn = r ?? false;
    this.setupUpdateOnToken(e);
  }
  setupUpdateOnToken(e) {
    e.get(M_TokenNotifierModule_maybe.CopilotTokenNotifier).on(
      "onCopilotToken",
      (e) => {
        const t = "1" === e.getTokenValue("rt");
        const r = e.getTokenValue("tid");
        if (undefined !== r) {
          this.trackingId = r;
          this.optedIn = t;
        }
      }
    );
  }
}
exports.TelemetryUserConfig = TelemetryUserConfig;
class TelemetryData {
  constructor(e, t, r) {
    this.properties = e;
    this.measurements = t;
    this.issuedTime = r;
  }
  static createAndMarkAsIssued(e, t) {
    return new TelemetryData(e || {}, t || {}, now());
  }
  extendedBy(e, t) {
    const r = {
      ...this.properties,
      ...e,
    };
    const n = {
      ...this.measurements,
      ...t,
    };
    const i = new TelemetryData(r, n, this.issuedTime);
    i.displayedTime = this.displayedTime;
    i.filtersAndExp = this.filtersAndExp;
    return i;
  }
  markAsDisplayed() {
    if (undefined === this.displayedTime) {
      this.displayedTime = now();
    }
  }
  async extendWithExpTelemetry(e) {
    if (this.filtersAndExp) {
      await e
        .get(M_ExperimentCacheManager_maybe.Features)
        .addExpAndFilterToTelemetry(this);
    }
    this.filtersAndExp.exp.addToTelemetry(this);
    this.filtersAndExp.filters.addToTelemetry(this);
  }
  extendWithEditorAgnosticFields(e) {
    this.properties.editor_version =
      M_editor_config_constants_maybe.formatNameAndVersion(
        e
          .get(M_editor_config_constants_maybe.EditorAndPluginInfo)
          .getEditorInfo(e)
      );
    this.properties.editor_plugin_version =
      M_editor_config_constants_maybe.formatNameAndVersion(
        e
          .get(M_editor_config_constants_maybe.EditorAndPluginInfo)
          .getEditorPluginInfo(e)
      );
    const t = e.get(M_editor_config_constants_maybe.EditorSession);
    this.properties.client_machineid = t.machineId;
    this.properties.client_sessionid = t.sessionId;
    this.properties.copilot_version = `copilot/${M_editor_config_constants_maybe.getVersion(
      e
    )}`;
    this.properties.common_extname = e
      .get(M_editor_config_constants_maybe.EditorAndPluginInfo)
      .getEditorPluginInfo(e).name;
    this.properties.common_extversion = e
      .get(M_editor_config_constants_maybe.EditorAndPluginInfo)
      .getEditorPluginInfo(e).version;
  }
  extendWithConfigProperties(e) {
    const t = M_editor_config_constants_maybe.dumpConfig(e);
    t["copilot.build"] = M_editor_config_constants_maybe.getBuild(e);
    t["copilot.buildType"] = M_editor_config_constants_maybe.getBuildType(e);
    const r = e.get(TelemetryUserConfig);
    if (r.trackingId) {
      t["copilot.trackingId"] = r.trackingId;
    }
    this.properties = {
      ...this.properties,
      ...t,
    };
  }
  extendWithRequestId(e) {
    const t = {
      completionId: e.completionId,
      created: e.created.toString(),
      headerRequestId: e.headerRequestId,
      serverExperiments: e.serverExperiments,
      deploymentId: e.deploymentId,
    };
    this.properties = {
      ...this.properties,
      ...t,
    };
  }
  static maybeRemoveRepoInfoFromPropertiesHack(e, t) {
    if (e) return t;
    const r = {};
    for (const e in t)
      if (TelemetryData.keysToRemoveFromStandardTelemetryHack.includes(e)) {
        r[e] = t[e];
      }
    return r;
  }
  sanitizeKeys() {
    this.properties = TelemetryData.sanitizeKeys(this.properties);
    this.measurements = TelemetryData.sanitizeKeys(this.measurements);
  }
  static sanitizeKeys(e) {
    e = e || {};
    const t = {};
    for (const r in e)
      t[
        TelemetryData.keysExemptedFromSanitization.includes(r)
          ? r
          : r.replace(/\./g, "_")
      ] = e[r];
    return t;
  }
  updateTimeSinceIssuedAndDisplayed() {
    const e = now() - this.issuedTime;
    this.measurements.timeSinceIssuedMs = e;
    if (void 0 !== this.displayedTime) {
      const e = now() - this.displayedTime;
      this.measurements.timeSinceDisplayedMs = e;
    }
  }
  validateData(e, t) {
    let r;
    if (TelemetryData.validateTelemetryProperties(this.properties)) {
      r = {
        problem: "properties",
        error: JSON.stringify(TelemetryData.validateTelemetryProperties.errors),
      };
    }
    if (!TelemetryData.validateTelemetryMeasurements(this.measurements)) {
      const e = JSON.stringify(
        TelemetryData.validateTelemetryMeasurements.errors
      );
      void 0 === r
        ? (r = {
            problem: "measurements",
            error: e,
          })
        : ((r.problem = "both"), (r.error += `; ${e}`));
    }
    if (undefined === r) return true;
    if (M_RuntimeModeManager_maybe.shouldFailForDebugPurposes(e))
      throw new Error(
        `Invalid telemetry data: ${r.problem} ${
          r.error
        } properties=${JSON.stringify(
          this.properties
        )} measurements=${JSON.stringify(this.measurements)}`
      );
    telemetryError(
      e,
      "invalidTelemetryData",
      TelemetryData.createAndMarkAsIssued({
        properties: JSON.stringify(this.properties),
        measurements: JSON.stringify(this.measurements),
        problem: r.problem,
        validationError: r.error,
      }),
      t
    );
    if (t) {
      telemetryError(
        e,
        "invalidTelemetryData_in_secure",
        TelemetryData.createAndMarkAsIssued({
          problem: r.problem,
          requestId: this.properties.requestId ?? "unknown",
        }),
        false
      );
    }
    return false;
  }
  async makeReadyForSending(e, t, r) {
    this.extendWithConfigProperties(e);
    this.extendWithEditorAgnosticFields(e);
    this.sanitizeKeys();
    if ("IncludeExp" === r) {
      await this.extendWithExpTelemetry(e);
    }
    this.updateTimeSinceIssuedAndDisplayed();
    if (this.validateData(e, t)) {
      this.properties.telemetry_failed_validation = "true";
    }
    _(this.properties);
  }
}
function g(e, t, r, n) {
  const i = t
    ? e.get(TelemetryReporters).getSecureReporter(e)
    : e.get(TelemetryReporters).getReporter(e);
  if (i) {
    i.sendTelemetryEvent(
      r,
      TelemetryData.maybeRemoveRepoInfoFromPropertiesHack(t, n.properties),
      n.measurements
    );
  }
}
function now() {
  return new Date().getTime();
}
function y(e) {
  return e.get(TelemetryUserConfig).optedIn;
}
async function telemetry(e, t, r, n) {
  if (n && !y(e)) return;
  const i = r || TelemetryData.createAndMarkAsIssued({}, {});
  await i.makeReadyForSending(e, n ?? false, "IncludeExp");
  g(e, n ?? false, t, i);
}
function _(e) {
  e.unique_id = M_url_opener.v4();
}
async function telemetryError(e, t, r, n) {
  if (n && !y(e)) return;
  const i = r || TelemetryData.createAndMarkAsIssued({}, {});
  await i.makeReadyForSending(e, n ?? false, "IncludeExp");
  (function (e, t, r, n) {
    const i = t
      ? e.get(TelemetryReporters).getSecureReporter(e)
      : e.get(TelemetryReporters).getReporter(e);
    if (i) {
      i.sendTelemetryErrorEvent(
        r,
        TelemetryData.maybeRemoveRepoInfoFromPropertiesHack(t, n.properties),
        n.measurements
      );
    }
  })(e, n ?? false, t, i);
}
exports.TelemetryData = TelemetryData;
TelemetryData.ajv = new M_schema_code_generator_maybe.default({
  strictNumbers: false,
});
TelemetryData.validateTelemetryProperties = TelemetryData.ajv.compile({
  type: "object",
  additionalProperties: {
    type: "string",
  },
  required: [],
});
TelemetryData.validateTelemetryMeasurements = TelemetryData.ajv.compile({
  type: "object",
  properties: {
    meanLogProb: {
      type: "number",
      nullable: true,
    },
    meanAlternativeLogProb: {
      type: "number",
      nullable: true,
    },
  },
  additionalProperties: {
    type: "number",
  },
  required: [],
});
TelemetryData.keysExemptedFromSanitization = [
  M_exp_service_telemetry_constants_maybe.ExpServiceTelemetryNames
    .assignmentContextTelemetryPropertyName,
  M_exp_service_telemetry_constants_maybe.ExpServiceTelemetryNames
    .featuresTelemetryPropertyName,
];
TelemetryData.keysToRemoveFromStandardTelemetryHack = [
  "gitRepoHost",
  "gitRepoName",
  "gitRepoOwner",
  "gitRepoUrl",
  "gitRepoPath",
  "repo",
  "request_option_nwo",
];
exports.telemetrizePromptLength = function (e) {
  return e.isFimEnabled
    ? {
        promptPrefixCharLen: e.prefix.length,
        promptSuffixCharLen: e.suffix.length,
      }
    : {
        promptCharLen: e.prefix.length,
      };
};
exports.now = now;
exports.TelemetryEndpointUrl = class {
  constructor(e = "https://copilot-telemetry.githubusercontent.com/telemetry") {
    this.url = e;
  }
  getUrl() {
    return this.url;
  }
  setUrlForTesting(e) {
    this.url = e;
  }
};
exports.telemetry = telemetry;
exports.telemetryExpProblem = async function (e, t) {
  const r = TelemetryData.createAndMarkAsIssued(t, {});
  await r.makeReadyForSending(e, false, "SkipExp");
  g(e, false, "expProblem", r);
};
exports.telemetryRaw = async function (e, t, r, n) {
  _(r);
  g(e, false, t, {
    properties: r,
    measurements: n,
  });
};
exports.telemetryException = async function (e, t, r, n) {
  const i = t instanceof Error ? t : new Error("Non-error thrown: " + t);
  const o = y(e);
  const s = TelemetryData.createAndMarkAsIssued({
    origin: M_PathRedactor_maybe.redactPaths(r),
    reason: o
      ? "Exception logged to restricted telemetry"
      : "Exception, not logged due to opt-out",
    ...n,
  });
  await s.makeReadyForSending(e, false, "IncludeExp");
  g(e, false, "exception", s);
  if (!o) return;
  const a = TelemetryData.createAndMarkAsIssued({
    origin: r,
    ...n,
  });
  await a.makeReadyForSending(e, true, "IncludeExp");
  (function (e, t, r, n) {
    const i = e.get(TelemetryReporters).getSecureReporter(e);
    if (i) {
      i.sendTelemetryException(
        r,
        TelemetryData.maybeRemoveRepoInfoFromPropertiesHack(true, n.properties),
        n.measurements
      );
    }
  })(e, 0, i, a);
};
exports.telemetryError = telemetryError;
exports.logEngineCompletion = async function (e, t, r, n, i) {
  const o = TelemetryData.createAndMarkAsIssued({
    completionTextJson: JSON.stringify(t),
    choiceIndex: i.toString(),
  });
  if (r.logprobs)
    for (const [e, t] of Object.entries(r.logprobs))
      o.properties["logprobs_" + e] = JSON.stringify(t) ?? "unset";
  o.extendWithRequestId(n);
  await telemetry(e, "engine.completion", o, true);
};
exports.logEnginePrompt = async function (e, t, r) {
  let n;
  n = t.isFimEnabled
    ? {
        promptPrefixJson: JSON.stringify(t.prefix),
        promptSuffixJson: JSON.stringify(t.suffix),
        promptElementRanges: JSON.stringify(t.promptElementRanges),
      }
    : {
        promptJson: JSON.stringify(t.prefix),
        promptElementRanges: JSON.stringify(t.promptElementRanges),
      };
  const i = r.extendedBy(n);
  await telemetry(e, "engine.prompt", i, true);
};
