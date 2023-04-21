Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.ComputationStatus =
  exports.getRepoUrlFromConfigText =
  exports.parseRepoUrl =
  exports.extractRepoInfoForTesting =
  exports.extractRepoInfoInBackground =
  exports.tryGetGitHubNWO =
  exports.getDogFood =
  exports.getUserKind =
  exports.isNotRepo =
  exports.isRepoInfo =
    undefined;
const n = require(44617);
const i = require(36314);
const o = require("path");
const s = require(35765);
const a = require(70140);
function tryGetGitHubNWO(e) {
  if (undefined !== e && e !== h.PENDING)
    return "github.com" === e.hostname ? e.owner + "/" + e.repo : undefined;
}
exports.isRepoInfo = function (e) {
  return undefined !== e && e !== h.PENDING;
};
exports.isNotRepo = function (e) {
  return undefined === e;
};
exports.getUserKind = async function (e) {
  const t =
    (await e.get(s.CopilotTokenManager).getCopilotToken(e, false))
      .organization_list ?? [];
  return (
    [
      "a5db0bcaae94032fe715fb34a5e4bce2",
      "7184f66dfcee98cb5f08a1cb936d5225",
      "4535c7beffc844b46bb1ed4aa04d759a",
    ].find((e) => t.includes(e)) ?? ""
  );
};
exports.getDogFood = function (e) {
  if (undefined === e) return "";
  if (e === h.PENDING) return "";
  const t = tryGetGitHubNWO(e);
  if ("github/github" === t) return t;
  const r = (function (e) {
    if (undefined !== e && e !== h.PENDING)
      return e.hostname.endsWith("azure.com") ||
        e.hostname.endsWith("visualstudio.com")
        ? e.owner + "/" + e.repo
        : undefined;
  })(e)?.toLowerCase();
  return undefined !== r ? r : "";
};
exports.tryGetGitHubNWO = tryGetGitHubNWO;
exports.extractRepoInfoInBackground = function (e, t) {
  if (!t) return;
  const r = o.dirname(t);
  return l(e, r);
};
const l = (function (e, t) {
  const r = new a.LRUCache(1e4);
  const n = new Set();
  return (t, ...i) => {
    const o = JSON.stringify(i);
    const s = r.get(o);
    if (s) return s.result;
    if (n.has(o)) return h.PENDING;
    const a = e(t, ...i);
    n.add(o);
    a.then((e) => {
      r.put(o, new f(e));
      n.delete(o);
    });
    return h.PENDING;
  };
})(u);
async function u(e, t) {
  const r = await (async function (e, t) {
    let r = t + "_add_to_make_longer";
    const i = e.get(n.FileSystem);
    for (; t.length > 1 && t.length < r.length; ) {
      const e = o.join(t, ".git", "config");
      let n = false;
      try {
        await i.stat(e);
        n = true;
      } catch (e) {
        n = false;
      }
      if (n) return t;
      r = t;
      t = o.dirname(t);
    }
  })(e, t);
  if (!r) return;
  const i = e.get(n.FileSystem);
  const s = o.join(r, ".git", "config");
  const a = getRepoUrlFromConfigText((await i.readFile(s)).toString()) ?? "";
  const c = parseRepoUrl(a);
  return undefined === c
    ? {
        baseFolder: r,
        url: a,
        hostname: "",
        owner: "",
        repo: "",
        pathname: "",
      }
    : {
        baseFolder: r,
        url: a,
        ...c,
      };
}
function parseRepoUrl(e) {
  let t = {};
  try {
    t = i(e);
    if ("" == t.host || "" == t.owner || "" == t.name || "" == t.pathname)
      return;
  } catch (e) {
    return;
  }
  return {
    hostname: t.host,
    owner: t.owner,
    repo: t.name,
    pathname: t.pathname,
  };
}
function getRepoUrlFromConfigText(e) {
  const t = /^\s*\[\s*remote\s+"((\\\\|\\"|[^\\"])+)"/;
  const r = /^\s*\[remote.([^"\s]+)/;
  const n = /^\s*url\s*=\s*([^\s#;]+)/;
  const i = /^\s*\[/;
  let o;
  let s;
  let a = false;
  for (const c of e.split("\n"))
    if (a && undefined !== o) {
      o += c;
      if (c.endsWith("\\")) o = o.substring(0, o.length - 1);
      else if (((a = !1), "origin" === s)) return o;
    } else {
      const e = c.match(t) ?? c.match(r);
      if (e) s = e[1];
      else if (c.match(i)) s = undefined;
      else {
        if (o && "origin" !== s) continue;
        {
          const e = c.match(n);
          if (e) {
            o = e[1];
            if (o.endsWith("\\")) {
              o = o.substring(0, o.length - 1);
              a = true;
            } else if ("origin" === s) return o;
          }
        }
      }
    }
  return o;
}
var h;
exports.extractRepoInfoForTesting = async function (e, t) {
  return u(e, t);
};
exports.parseRepoUrl = parseRepoUrl;
exports.getRepoUrlFromConfigText = getRepoUrlFromConfigText;
(function (e) {
  e[(e.PENDING = 0)] = "PENDING";
})((h = exports.ComputationStatus || (exports.ComputationStatus = {})));
class f {
  constructor(e) {
    this.result = e;
  }
}