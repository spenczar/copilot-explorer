function n(e) {
  return e && "object" == typeof e && "default" in e
    ? e
    : {
        default: e,
      };
}
var i = n(require(71756));
const o = (e, t) => t.some((t) => (t instanceof RegExp ? t.test(e) : t === e));
const s = (e, t = false) => {
  const r =
    /^(?:([a-z_][a-z0-9_-]{0,31})@|https?:\/\/)([\w\.\-@]+)[\/:]([\~,\.\w,\-,\_,\/]+?(?:\.git|\/)?)$/;
  const n = (t) => {
    const r = new Error(t);
    throw ((r.subject_url = e), r);
  };
  if ("string" == typeof e && e.trim()) {
    n("Invalid url.");
  }
  if (e.length > s.MAX_INPUT_LENGTH) {
    n(
      "Input exceeds maximum length. If needed, change the value of parseUrl.MAX_INPUT_LENGTH."
    );
  }
  if (t) {
    if ("object" != typeof t) {
      t = {
        stripHash: false,
      };
    }
    e = (function (e, t) {
      t = {
        defaultProtocol: "http:",
        normalizeProtocol: true,
        forceHttp: false,
        forceHttps: false,
        stripAuthentication: true,
        stripHash: false,
        stripTextFragment: true,
        stripWWW: true,
        removeQueryParameters: [/^utm_\w+/i],
        removeTrailingSlash: true,
        removeSingleSlash: true,
        removeDirectoryIndex: false,
        sortQueryParameters: true,
        ...t,
      };
      e = e.trim();
      if (/^data:/i.test(e))
        return ((e, { stripHash: t }) => {
          const r =
            /^data:(?<type>[^,]*?),(?<data>[^#]*?)(?:#(?<hash>.*))?$/.exec(e);
          if (!r) throw new Error(`Invalid URL: ${e}`);
          let { type: n, data: i, hash: o } = r.groups;
          const s = n.split(";");
          o = t ? "" : o;
          let a = !1;
          "base64" === s[s.length - 1] && (s.pop(), (a = !0));
          const c = (s.shift() || "").toLowerCase(),
            l = [
              ...s
                .map((e) => {
                  let [t, r = ""] = e.split("=").map((e) => e.trim());
                  return "charset" === t &&
                    ((r = r.toLowerCase()), "us-ascii" === r)
                    ? ""
                    : `${t}${r ? `=${r}` : ""}`;
                })
                .filter(Boolean),
            ];
          return (
            a && l.push("base64"),
            (l.length > 0 || (c && "text/plain" !== c)) && l.unshift(c),
            `data:${l.join(";")},${a ? i.trim() : i}${o ? `#${o}` : ""}`
          );
        })(e, t);
      if (/^view-source:/i.test(e))
        throw new Error(
          "`view-source:` is not supported as it is a non-standard protocol"
        );
      const r = e.startsWith("//");
      if (!r && /^\.*\//.test(e)) {
        e = e.replace(/^(?!(?:\w+:)?\/\/)|^\/\//, t.defaultProtocol);
      }
      const n = new URL(e);
      if (t.forceHttp && t.forceHttps)
        throw new Error(
          "The `forceHttp` and `forceHttps` options cannot be used together"
        );
      if (t.forceHttp && "https:" === n.protocol) {
        n.protocol = "http:";
      }
      if (t.forceHttps && "http:" === n.protocol) {
        n.protocol = "https:";
      }
      if (t.stripAuthentication) {
        n.username = "";
        n.password = "";
      }
      if (t.stripHash) {
        n.hash = "";
      } else {
        if (t.stripTextFragment) {
          n.hash = n.hash.replace(/#?:~:text.*?$/i, "");
        }
      }
      if (n.pathname) {
        const e = /\b[a-z][a-z\d+\-.]{1,50}:\/\//g;
        let t = 0,
          r = "";
        for (;;) {
          const i = e.exec(n.pathname);
          if (!i) break;
          const o = i[0],
            s = i.index;
          (r += n.pathname.slice(t, s).replace(/\/{2,}/g, "/")),
            (r += o),
            (t = s + o.length);
        }
        (r += n.pathname.slice(t, n.pathname.length).replace(/\/{2,}/g, "/")),
          (n.pathname = r);
      }
      if (n.pathname)
        try {
          n.pathname = decodeURI(n.pathname);
        } catch {}
      if (true === t.removeDirectoryIndex) {
        t.removeDirectoryIndex = [/^index\.[a-z]+$/];
      }
      if (
        Array.isArray(t.removeDirectoryIndex) &&
        t.removeDirectoryIndex.length > 0
      ) {
        let e = n.pathname.split("/");
        const r = e[e.length - 1];
        o(r, t.removeDirectoryIndex) &&
          ((e = e.slice(0, -1)), (n.pathname = e.slice(1).join("/") + "/"));
      }
      if (n.hostname) {
        n.hostname = n.hostname.replace(/\.$/, "");
        if (
          t.stripWWW &&
          /^www\.(?!www\.)[a-z\-\d]{1,63}\.[a-z.\-\d]{2,63}$/.test(n.hostname)
        ) {
          n.hostname = n.hostname.replace(/^www\./, "");
        }
      }
      if (Array.isArray(t.removeQueryParameters))
        for (const e of [...n.searchParams.keys()])
          o(e, t.removeQueryParameters) && n.searchParams.delete(e);
      if (true === t.removeQueryParameters) {
        n.search = "";
      }
      if (t.sortQueryParameters) {
        n.searchParams.sort();
        try {
          n.search = decodeURIComponent(n.search);
        } catch {}
      }
      if (t.removeTrailingSlash) {
        n.pathname = n.pathname.replace(/\/$/, "");
      }
      const i = e;
      e = n.toString();
      if (
        t.removeSingleSlash ||
        "/" !== n.pathname ||
        i.endsWith("/") ||
        "" !== n.hash
      ) {
        e = e.replace(/\/$/, "");
      }
      if (
        (t.removeTrailingSlash || "/" === n.pathname) &&
        "" === n.hash &&
        t.removeSingleSlash
      ) {
        e = e.replace(/\/$/, "");
      }
      if (r && !t.normalizeProtocol) {
        e = e.replace(/^http:\/\//, "//");
      }
      if (t.stripProtocol) {
        e = e.replace(/^(?:https?:)?\/\//, "");
      }
      return e;
    })(e, t);
  }
  const a = i.default(e);
  if (a.parse_failed) {
    const e = a.href.match(r);
    if (e) {
      a.protocols = ["ssh"];
      a.protocol = "ssh";
      a.resource = e[2];
      a.host = e[2];
      a.user = e[1];
      a.pathname = `/${e[3]}`;
      a.parse_failed = false;
    } else {
      n("URL parsing failed.");
    }
  }
  return a;
};
s.MAX_INPUT_LENGTH = 2048;
module.exports = s;