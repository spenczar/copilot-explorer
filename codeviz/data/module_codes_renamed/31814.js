const M_path = require("path");
const M_child_process = require("child_process");
const { promises: o, constants: s } = require("fs");
const M_is_wsl_checker_maybe = require("is-wsl-checker");
const M_docker_detector_maybe = require("docker-detector");
const M_Object_Property_Definer_maybe = require("Object-Property-Definer");
const u = M_path.join(__dirname, "xdg-open");
const { platform: d, arch: p } = process;
const h = (() => {
  const e = "/mnt/";
  let t;
  return async function () {
    if (t) return t;
    const r = "/etc/wsl.conf";
    let n = false;
    try {
      await o.access(r, s.F_OK);
      n = true;
    } catch {}
    if (!n) return e;
    const i = await o.readFile(r, {
      encoding: "utf8",
    });
    const a = /(?<!#.*)root\s*=\s*(?<mountPoint>.*)/g.exec(i);
    return a
      ? ((t = a.groups.mountPoint.trim()),
        (t = t.endsWith("/") ? t : `${t}/`),
        t)
      : e;
  };
})();
const f = async (e, t) => {
  let r;
  for (const n of e)
    try {
      return await t(n);
    } catch (e) {
      r = e;
    }
  throw r;
};
const g = async (e) => {
  e = {
    wait: false,
    background: false,
    newInstance: false,
    allowNonzeroExitCode: false,
    ...e,
  };
  if (Array.isArray(e.app))
    return f(e.app, (t) =>
      g({
        ...e,
        app: t,
      })
    );
  let t;
  let { name: r, arguments: n = [] } = e.app || {};
  n = [...n];
  if (Array.isArray(r))
    return f(r, (t) =>
      g({
        ...e,
        app: {
          name: t,
          arguments: n,
        },
      })
    );
  const l = [];
  const p = {};
  if ("darwin" === d) {
    t = "open";
    if (e.wait) {
      l.push("--wait-apps");
    }
    if (e.background) {
      l.push("--background");
    }
    if (e.newInstance) {
      l.push("--new");
    }
    if (r) {
      l.push("-a", r);
    }
  } else if (
    "win32" === d ||
    (M_is_wsl_checker_maybe && !M_docker_detector_maybe())
  ) {
    const i = await h();
    t = M_is_wsl_checker_maybe
      ? `${i}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe`
      : `${process.env.SYSTEMROOT}\\System32\\WindowsPowerShell\\v1.0\\powershell`;
    l.push(
      "-NoProfile",
      "-NonInteractive",
      "–ExecutionPolicy",
      "Bypass",
      "-EncodedCommand"
    );
    if (M_is_wsl_checker_maybe) {
      p.windowsVerbatimArguments = true;
    }
    const o = ["Start"];
    if (e.wait) {
      o.push("-Wait");
    }
    if (r) {
      o.push(`"\`"${r}\`""`, "-ArgumentList");
      if (e.target) {
        n.unshift(e.target);
      }
    } else {
      if (e.target) {
        o.push(`"${e.target}"`);
      }
    }
    if (n.length > 0) {
      n = n.map((e) => `"\`"${e}\`""`);
      o.push(n.join(","));
    }
    e.target = Buffer.from(o.join(" "), "utf16le").toString("base64");
  } else {
    if (r) t = r;
    else {
      const e = "/" === __dirname;
      let r = false;
      try {
        await o.access(u, s.X_OK);
        r = true;
      } catch {}
      t =
        process.versions.electron || "android" === d || e || !r
          ? "xdg-open"
          : u;
    }
    if (n.length > 0) {
      l.push(...n);
    }
    if (e.wait) {
      p.stdio = "ignore";
      p.detached = true;
    }
  }
  if (e.target) {
    l.push(e.target);
  }
  if ("darwin" === d && n.length > 0) {
    l.push("--args", ...n);
  }
  const m = M_child_process.spawn(t, l, p);
  return e.wait
    ? new Promise((t, r) => {
        m.once("error", r);
        m.once("close", (n) => {
          if (e.allowNonzeroExitCode && n > 0) {
            r(new Error(`Exited with code ${n}`));
          } else {
            t(m);
          }
        });
      })
    : (m.unref(), m);
};
const m = (e, t) => {
  if ("string" != typeof e) throw new TypeError("Expected a `target`");
  return g({
    ...t,
    target: e,
  });
};
function y(e) {
  if ("string" == typeof e || Array.isArray(e)) return e;
  const { [p]: t } = e;
  if (!t) throw new Error(`${p} is not supported`);
  return t;
}
function v({ [d]: e }, { wsl: t }) {
  if (t && M_is_wsl_checker_maybe) return y(t);
  if (!e) throw new Error(`${d} is not supported`);
  return y(e);
}
const _ = {};
M_Object_Property_Definer_maybe(_, "chrome", () =>
  v(
    {
      darwin: "google chrome",
      win32: "chrome",
      linux: ["google-chrome", "google-chrome-stable", "chromium"],
    },
    {
      wsl: {
        ia32: "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
        x64: [
          "/mnt/c/Program Files/Google/Chrome/Application/chrome.exe",
          "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
        ],
      },
    }
  )
);
M_Object_Property_Definer_maybe(_, "firefox", () =>
  v(
    {
      darwin: "firefox",
      win32: "C:\\Program Files\\Mozilla Firefox\\firefox.exe",
      linux: "firefox",
    },
    {
      wsl: "/mnt/c/Program Files/Mozilla Firefox/firefox.exe",
    }
  )
);
M_Object_Property_Definer_maybe(_, "edge", () =>
  v(
    {
      darwin: "microsoft edge",
      win32: "msedge",
      linux: ["microsoft-edge", "microsoft-edge-dev"],
    },
    {
      wsl: "/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    }
  )
);
m.apps = _;
m.openApp = (e, t) => {
  if ("string" != typeof e) throw new TypeError("Expected a `name`");
  const { arguments: r = [] } = t || {};
  if (null != r && !Array.isArray(r))
    throw new TypeError("Expected `appArguments` as Array type");
  return g({
    ...t,
    app: {
      name: e,
      arguments: r,
    },
  });
};
module.exports = m;
