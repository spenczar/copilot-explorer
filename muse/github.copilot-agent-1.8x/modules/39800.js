Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.editorVersionHeaders =
  exports.EditorAndPluginInfo =
  exports.formatNameAndVersion =
  exports.EditorSession =
  exports.getVersion =
  exports.getBuild =
  exports.getBuildType =
  exports.isProduction =
  exports.BuildInfo =
  exports.fimSuffixLengthThreshold =
  exports.suffixMatchThreshold =
  exports.suffixPercent =
  exports.getEnabledConfig =
  exports.getLanguageConfig =
  exports.dumpConfig =
  exports.getHiddenConfig =
  exports.isDefaultSettingOverwritten =
  exports.getConfig =
  exports.getConfigDefaultForObjectKey =
  exports.getConfigDefaultForKey =
  exports.InMemoryConfigProvider =
  exports.DefaultsOnlyConfigProvider =
  exports.ConfigProvider =
  exports.ConfigBlockModeConfig =
  exports.BlockModeConfig =
  exports.BuildType =
  exports.shouldDoServerTrimming =
  exports.shouldDoParsingTrimming =
  exports.BlockMode =
  exports.ConfigKey =
    undefined;
const n = require(44617);
const i = require(68139);
const o = require(16905);
const s = require(99876);
var a;
var c;
exports.ConfigKey = {
  Enable: "enable",
  InlineSuggestEnable: "inlineSuggest.enable",
  ShowEditorCompletions: ["editor", "showEditorCompletions"],
  EnableAutoCompletions: ["editor", "enableAutoCompletions"],
  DelayCompletions: ["editor", "delayCompletions"],
  FilterCompletions: ["editor", "filterCompletions"],
  DisplayStyle: ["advanced", "displayStyle"],
  SecretKey: ["advanced", "secret_key"],
  SolutionLength: ["advanced", "length"],
  Stops: ["advanced", "stops"],
  Temperature: ["advanced", "temperature"],
  TopP: ["advanced", "top_p"],
  IndentationMode: ["advanced", "indentationMode"],
  InlineSuggestCount: ["advanced", "inlineSuggestCount"],
  ListCount: ["advanced", "listCount"],
  DebugOverrideProxyUrl: ["advanced", "debug.overrideProxyUrl"],
  DebugTestOverrideProxyUrl: ["advanced", "debug.testOverrideProxyUrl"],
  DebugOverrideEngine: ["advanced", "debug.overrideEngine"],
  DebugShowScores: ["advanced", "debug.showScores"],
  DebugOverrideLogLevels: ["advanced", "debug.overrideLogLevels"],
  DebugFilterLogCategories: ["advanced", "debug.filterLogCategories"],
  DebugUseSuffix: ["advanced", "debug.useSuffix"],
  DebugCodeQuote: ["advanced", "debug.codeQuote"],
};
(function (e) {
  e.Parsing = "parsing";
  e.Server = "server";
  e.ParsingAndServer = "parsingandserver";
})((a = exports.BlockMode || (exports.BlockMode = {})));
exports.shouldDoParsingTrimming = function (e) {
  return [a.Parsing, a.ParsingAndServer].includes(e);
};
exports.shouldDoServerTrimming = function (e) {
  return [a.Server, a.ParsingAndServer].includes(e);
};
(c = exports.BuildType || (exports.BuildType = {})).DEV = "dev";
c.PROD = "prod";
c.NIGHTLY = "nightly";
class BlockModeConfig {}
function u(e, t) {
  return e !== a.ParsingAndServer || n.isSupportedLanguageId(t) ? e : a.Server;
}
exports.BlockModeConfig = BlockModeConfig;
exports.ConfigBlockModeConfig = class extends BlockModeConfig {
  async forLanguage(e, r) {
    if (
      e
        .get(ConfigProvider)
        .isDefaultSettingOverwritten(exports.ConfigKey.IndentationMode)
    )
      switch (
        e
          .get(ConfigProvider)
          .getLanguageConfig(exports.ConfigKey.IndentationMode, r)
      ) {
        case "client":
        case true:
        case "server":
          return a.Server;
        case "clientandserver":
          return u(a.ParsingAndServer, r);
        default:
          return a.Parsing;
      }
    const i = await e.get(o.Features).overrideBlockMode();
    return i
      ? u(i, r)
      : "ruby" == r
      ? a.Parsing
      : n.isSupportedLanguageId(r)
      ? a.ParsingAndServer
      : a.Server;
  }
};
class ConfigProvider {}
function getConfigDefaultForKey(e) {
  try {
    const t =
      s.contributes.configuration[0].properties[`${i.CopilotConfigPrefix}.${e}`]
        .default;
    if (undefined === t)
      throw new Error(
        `Missing config default value: ${i.CopilotConfigPrefix}.${e}`
      );
    return t;
  } catch (t) {
    throw new Error(
      `Error inspecting config default value ${i.CopilotConfigPrefix}.${e}: ${t}`
    );
  }
}
function getConfigDefaultForObjectKey(e, t) {
  try {
    const r =
      s.contributes.configuration[0].properties[`${i.CopilotConfigPrefix}.${e}`]
        .properties[t].default;
    if (undefined === r)
      throw new Error(
        `Missing config default value: ${i.CopilotConfigPrefix}.${e}`
      );
    return r;
  } catch (r) {
    throw new Error(
      `Error inspecting config default value ${i.CopilotConfigPrefix}.${e}.${t}: ${r}`
    );
  }
}
function getConfig(e, t) {
  return e.get(ConfigProvider).getConfig(t);
}
function isDefaultSettingOverwritten(e, t) {
  return e.get(ConfigProvider).isDefaultSettingOverwritten(t);
}
function getHiddenConfig(e, t, r) {
  return isDefaultSettingOverwritten(e, t) ? getConfig(e, t) : r.default;
}
function getLanguageConfig(e, t, r) {
  return e.get(ConfigProvider).getLanguageConfig(t, r);
}
exports.ConfigProvider = ConfigProvider;
exports.DefaultsOnlyConfigProvider = class extends ConfigProvider {
  getConfig(e) {
    return Array.isArray(e)
      ? getConfigDefaultForObjectKey(e[0], e[1])
      : getConfigDefaultForKey(e);
  }
  isDefaultSettingOverwritten(e) {
    return false;
  }
  dumpConfig() {
    return {};
  }
  getLanguageConfig(e, t) {
    const r = this.getConfig(e);
    return t && t in r ? r[t] : r["*"];
  }
};
exports.InMemoryConfigProvider = class {
  constructor(e, t) {
    this.baseConfigProvider = e;
    this.overrides = t;
  }
  getConfig(e) {
    const t = this.overrides.get(e);
    return undefined !== t ? t : this.baseConfigProvider.getConfig(e);
  }
  setConfig(e, t) {
    if (undefined !== t) {
      this.overrides.set(e, t);
    } else {
      this.overrides.delete(e);
    }
  }
  setLanguageEnablement(e, r) {
    this.overrides.set(exports.ConfigKey.Enable, {
      [e]: r,
    });
  }
  isDefaultSettingOverwritten(e) {
    return (
      !!this.overrides.has(e) ||
      this.baseConfigProvider.isDefaultSettingOverwritten(e)
    );
  }
  keyAsString(e) {
    return Array.isArray(e) ? e.join(".") : e;
  }
  dumpConfig() {
    const e = this.baseConfigProvider.dumpConfig();
    this.overrides.forEach((t, r) => {
      e[this.keyAsString(r)] = JSON.stringify(t);
    });
    return e;
  }
  getLanguageConfig(e, t) {
    const r = this.overrides.get(e);
    return undefined !== r
      ? undefined !== t
        ? r[t]
        : r["*"]
      : this.baseConfigProvider.getLanguageConfig(e, t);
  }
};
exports.getConfigDefaultForKey = getConfigDefaultForKey;
exports.getConfigDefaultForObjectKey = getConfigDefaultForObjectKey;
exports.getConfig = getConfig;
exports.isDefaultSettingOverwritten = isDefaultSettingOverwritten;
exports.getHiddenConfig = getHiddenConfig;
exports.dumpConfig = function (e) {
  return e.get(ConfigProvider).dumpConfig();
};
exports.getLanguageConfig = getLanguageConfig;
exports.getEnabledConfig = function (e, r) {
  return getLanguageConfig(e, exports.ConfigKey.Enable, r);
};
exports.suffixPercent = async function (e, r, n, i, s) {
  return getHiddenConfig(e, exports.ConfigKey.DebugUseSuffix, {
    default: false,
  })
    ? 15
    : e.get(o.Features).suffixPercent(r, n, i, s);
};
exports.suffixMatchThreshold = async function (e, r, n, i, s) {
  return getHiddenConfig(e, exports.ConfigKey.DebugUseSuffix, {
    default: false,
  })
    ? 10
    : e.get(o.Features).suffixMatchThreshold(r, n, i, s);
};
exports.fimSuffixLengthThreshold = async function (e, r, n, i, s) {
  return getHiddenConfig(e, exports.ConfigKey.DebugUseSuffix, {
    default: false,
  })
    ? 0
    : e.get(o.Features).fimSuffixLengthThreshold(r, n, i, s);
};
class BuildInfo {
  constructor() {
    this.packageJson = s;
  }
  isProduction() {
    return "dev" != this.getBuildType();
  }
  getBuildType() {
    return this.packageJson.buildType;
  }
  getVersion() {
    return this.packageJson.version;
  }
  getBuild() {
    return this.packageJson.build;
  }
  getName() {
    return this.packageJson.name;
  }
}
function formatNameAndVersion({ name: e, version: t }) {
  return `${e}/${t}`;
}
exports.BuildInfo = BuildInfo;
exports.isProduction = function (e) {
  return e.get(BuildInfo).isProduction();
};
exports.getBuildType = function (e) {
  return e.get(BuildInfo).getBuildType();
};
exports.getBuild = function (e) {
  return e.get(BuildInfo).getBuild();
};
exports.getVersion = function (e) {
  return e.get(BuildInfo).getVersion();
};
exports.EditorSession = class {
  constructor(e, t) {
    this.sessionId = e;
    this.machineId = t;
  }
};
exports.formatNameAndVersion = formatNameAndVersion;
class EditorAndPluginInfo {}
exports.EditorAndPluginInfo = EditorAndPluginInfo;
exports.editorVersionHeaders = function (e) {
  const t = e.get(EditorAndPluginInfo);
  return {
    "Editor-Version": formatNameAndVersion(t.getEditorInfo(e)),
    "Editor-Plugin-Version": formatNameAndVersion(t.getEditorPluginInfo(e)),
  };
};