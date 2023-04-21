Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.resolveModulePath =
  exports.FileSystem =
  exports.resolveGlobalYarnPath =
  exports.resolveGlobalNodePath =
  exports.resolve =
  exports.uriToFilePath =
    undefined;
const n = require("url");
const i = require("path");
const o = require("fs");
const s = require("child_process");
function a() {
  return "win32" === process.platform;
}
function resolve(e, t, r, n) {
  const a = "NODE_PATH";
  const c = [
    "var p = process;",
    "p.on('message',function(m){",
    "if(m.c==='e'){",
    "p.exit(0);",
    "}",
    "else if(m.c==='rs'){",
    "try{",
    "var r=require.resolve(m.a);",
    "p.send({c:'r',s:true,r:r});",
    "}",
    "catch(err){",
    "p.send({c:'r',s:false});",
    "}",
    "}",
    "});",
  ].join("");
  return new Promise((l, u) => {
    let d = process.env;
    let p = Object.create(null);
    Object.keys(d).forEach((e) => (p[e] = d[e]));
    if (t && o.existsSync(t)) {
      if (p[a]) {
        p[a] = t + i.delimiter + p[a];
      } else {
        p[a] = t;
      }
      if (n) {
        n(`NODE_PATH value is: ${p[a]}`);
      }
    }
    p.ELECTRON_RUN_AS_NODE = "1";
    try {
      let t = s.fork("", [], {
        cwd: r,
        env: p,
        execArgv: ["-e", c],
      });
      if (undefined === t.pid)
        return void u(
          new Error(`Starting process to resolve node module  ${e} failed`)
        );
      t.on("error", (e) => {
        u(e);
      });
      t.on("message", (r) => {
        if ("r" === r.c) {
          t.send({
            c: "e",
          });
          if (r.s) {
            l(r.r);
          } else {
            u(new Error(`Failed to resolve module: ${e}`));
          }
        }
      });
      let n = {
        c: "rs",
        a: e,
      };
      t.send(n);
    } catch (e) {
      u(e);
    }
  });
}
function resolveGlobalNodePath(e) {
  let t = "npm";
  const r = Object.create(null);
  Object.keys(process.env).forEach((e) => (r[e] = process.env[e]));
  r.NO_UPDATE_NOTIFIER = "true";
  const n = {
    encoding: "utf8",
    env: r,
  };
  if (a()) {
    t = "npm.cmd";
    n.shell = true;
  }
  let o = () => {};
  try {
    process.on("SIGPIPE", o);
    let r = s.spawnSync(t, ["config", "get", "prefix"], n).stdout;
    if (!r)
      return void (e && e("'npm config get prefix' didn't return a value."));
    let c = r.trim();
    if (e) {
      e(`'npm config get prefix' value is: ${c}`);
    }
    return c.length > 0
      ? a()
        ? i.join(c, "node_modules")
        : i.join(c, "lib", "node_modules")
      : undefined;
  } catch (e) {
    return;
  } finally {
    process.removeListener("SIGPIPE", o);
  }
}
var u;
exports.uriToFilePath = function (e) {
  let t = n.parse(e);
  if ("file:" !== t.protocol || !t.path) return;
  let r = t.path.split("/");
  for (o = 0, s = r.length, undefined; o < s; o++) {
    var o;
    var s;
    r[o] = decodeURIComponent(r[o]);
  }
  if ("win32" === process.platform && r.length > 1) {
    let e = r[0];
    let t = r[1];
    if (0 === e.length && t.length > 1 && ":" === t[1]) {
      r.shift();
    }
  }
  return i.normalize(r.join("/"));
};
exports.resolve = resolve;
exports.resolveGlobalNodePath = resolveGlobalNodePath;
exports.resolveGlobalYarnPath = function (e) {
  let t = "yarn";
  let r = {
    encoding: "utf8",
  };
  if (a()) {
    t = "yarn.cmd";
    r.shell = true;
  }
  let n = () => {};
  try {
    process.on("SIGPIPE", n);
    let o = s.spawnSync(t, ["global", "dir", "--json"], r);
    let a = o.stdout;
    if (!a)
      return void (
        e &&
        (e("'yarn global dir' didn't return a value."), o.stderr && e(o.stderr))
      );
    let c = a.trim().split(/\r?\n/);
    for (let e of c)
      try {
        let t = JSON.parse(e);
        if ("log" === t.type) return i.join(t.data, "node_modules");
      } catch (e) {}
    return;
  } catch (e) {
    return;
  } finally {
    process.removeListener("SIGPIPE", n);
  }
};
(function (e) {
  let t;
  function r() {
    if (undefined !== t) {
      t = !(
        "win32" === process.platform ||
        (o.existsSync(__filename.toUpperCase()) &&
          o.existsSync(__filename.toLowerCase()))
      );
    }
    return t;
  }
  e.isCaseSensitive = r;
  e.isParent = function (e, t) {
    return r()
      ? 0 === i.normalize(t).indexOf(i.normalize(e))
      : 0 ===
          i.normalize(t).toLowerCase().indexOf(i.normalize(e).toLowerCase());
  };
})((u = exports.FileSystem || (exports.FileSystem = {})));
exports.resolveModulePath = function (e, t, r, n) {
  return r
    ? (i.isAbsolute(r) || (r = i.join(e, r)),
      resolve(t, r, r, n)
        .then((e) =>
          u.isParent(r, e)
            ? e
            : Promise.reject(
                new Error(`Failed to load ${t} from node path location.`)
              )
        )
        .then(undefined, (r) => resolve(t, resolveGlobalNodePath(n), e, n)))
    : resolve(t, resolveGlobalNodePath(n), e, n);
};