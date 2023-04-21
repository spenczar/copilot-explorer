var n = undefined !== n ? n : {};
var i = (function () {
  var t;
  var i =
    "object" == typeof window
      ? {
          currentScript: window.document.currentScript,
        }
      : null;
  class o {
    constructor() {
      this.initialize();
    }
    initialize() {
      throw new Error("cannot construct a Parser before calling `init()`");
    }
    static init(s) {
      return (
        t ||
        ((n = Object.assign({}, n, s)),
        (t = new Promise((t) => {
          var s = Object.assign({}, n);
          var a = [];
          var c = "./this.program";
          var l = (e, t) => {
            throw t;
          };
          var u = "object" == typeof window;
          var d = "function" == typeof importScripts;
          var p =
            "object" == typeof process &&
            "object" == typeof process.versions &&
            "string" == typeof process.versions.node;
          var h = !u && !p && !d;
          if (n.ENVIRONMENT)
            throw new Error(
              "Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)"
            );
          var f;
          var g;
          var m;
          var y = "";
          function v(e) {
            if (e instanceof Se) return;
            let t = e;
            if (e && "object" == typeof e && e.stack) {
              t = [e, e.stack];
            }
            E("exiting due to exception: " + t);
          }
          if (p) {
            if (
              "undefined" == typeof process ||
              !process.release ||
              "node" !== process.release.name
            )
              throw new Error(
                "not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)"
              );
            var M_fs;
            var M_path;
            y = d ? require("path").dirname(y) + "/" : __dirname + "/";
            M_fs = require("fs");
            M_path = require("path");
            f = (e, t) => (
              (e = M_path.normalize(e)),
              M_fs.readFileSync(e, t ? undefined : "utf8")
            );
            m = (e) => {
              var t = f(e, true);
              if (t.buffer) {
                t = new Uint8Array(t);
              }
              B(t.buffer);
              return t;
            };
            g = (e, t, r) => {
              e = M_path.normalize(e);
              M_fs.readFile(e, function (e, n) {
                if (e) {
                  r(e);
                } else {
                  t(n.buffer);
                }
              });
            };
            if (process.argv.length > 1) {
              c = process.argv[1].replace(/\\/g, "/");
            }
            a = process.argv.slice(2);
            module.exports = n;
            l = (e, t) => {
              if (ce()) throw ((process.exitCode = e), t);
              v(t);
              process.exit(e);
            };
            n.inspect = function () {
              return "[Emscripten Module object]";
            };
          } else if (h) {
            if (
              "object" == typeof process ||
              "object" == typeof window ||
              "function" == typeof importScripts
            )
              throw new Error(
                "not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)"
              );
            if ("undefined" != typeof read) {
              f = function (e) {
                return read(e);
              };
            }
            m = function (e) {
              let t;
              return "function" == typeof readbuffer
                ? new Uint8Array(readbuffer(e))
                : ((t = read(e, "binary")), B("object" == typeof t), t);
            };
            g = function (e, t, r) {
              setTimeout(() => t(m(e)), 0);
            };
            if ("undefined" != typeof scriptArgs) {
              a = scriptArgs;
            } else {
              if (undefined !== arguments) {
                a = arguments;
              }
            }
            if ("function" == typeof quit) {
              l = (e, t) => {
                v(t);
                quit(e);
              };
            }
            if ("undefined" != typeof print) {
              if ("undefined" == typeof console) {
                console = {};
              }
              console.log = print;
              console.warn = console.error =
                "undefined" != typeof printErr ? printErr : print;
            }
          } else {
            if (!u && !d) throw new Error("environment detection error");
            if (d) {
              y = self.location.href;
            } else {
              if (undefined !== i && i.currentScript) {
                y = i.currentScript.src;
              }
            }
            y =
              0 !== y.indexOf("blob:")
                ? y.substr(0, y.replace(/[?#].*/, "").lastIndexOf("/") + 1)
                : "";
            if ("object" != typeof window && "function" != typeof importScripts)
              throw new Error(
                "not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)"
              );
            f = (e) => {
              var t = new XMLHttpRequest();
              t.open("GET", e, false);
              t.send(null);
              return t.responseText;
            };
            if (d) {
              m = (e) => {
                var t = new XMLHttpRequest();
                t.open("GET", e, false);
                t.responseType = "arraybuffer";
                t.send(null);
                return new Uint8Array(t.response);
              };
            }
            g = (e, t, r) => {
              var n = new XMLHttpRequest();
              n.open("GET", e, true);
              n.responseType = "arraybuffer";
              n.onload = () => {
                if (200 == n.status || (0 == n.status && n.response)) {
                  t(n.response);
                } else {
                  r();
                }
              };
              n.onerror = r;
              n.send(null);
            };
          }
          var w;
          var C = n.print || console.log.bind(console);
          var E = n.printErr || console.warn.bind(console);
          function T(e, t) {
            if (Object.getOwnPropertyDescriptor(n, e)) {
              Object.defineProperty(n, e, {
                configurable: true,
                get: function () {
                  ge(
                    "Module." +
                      e +
                      " has been replaced with plain " +
                      t +
                      " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)"
                  );
                },
              });
            }
          }
          function S(e) {
            return (
              "FS_createPath" === e ||
              "FS_createDataFile" === e ||
              "FS_createPreloadedFile" === e ||
              "FS_unlink" === e ||
              "addRunDependency" === e ||
              "FS_createLazyFile" === e ||
              "FS_createDevice" === e ||
              "removeRunDependency" === e
            );
          }
          Object.assign(n, s);
          s = null;
          w = "fetchSettings";
          if (Object.getOwnPropertyDescriptor(n, w)) {
            ge(
              "`Module." +
                w +
                "` was supplied but `" +
                w +
                "` not included in INCOMING_MODULE_JS_API"
            );
          }
          if (n.arguments) {
            a = n.arguments;
          }
          T("arguments", "arguments_");
          if (n.thisProgram) {
            c = n.thisProgram;
          }
          T("thisProgram", "thisProgram");
          if (n.quit) {
            l = n.quit;
          }
          T("quit", "quit_");
          B(
            undefined === n.memoryInitializerPrefixURL,
            "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead"
          );
          B(
            undefined === n.pthreadMainPrefixURL,
            "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead"
          );
          B(
            undefined === n.cdInitializerPrefixURL,
            "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead"
          );
          B(
            undefined === n.filePackagePrefixURL,
            "Module.filePackagePrefixURL option was removed, use Module.locateFile instead"
          );
          B(
            undefined === n.read,
            "Module.read option was removed (modify read_ in JS)"
          );
          B(
            undefined === n.readAsync,
            "Module.readAsync option was removed (modify readAsync in JS)"
          );
          B(
            undefined === n.readBinary,
            "Module.readBinary option was removed (modify readBinary in JS)"
          );
          B(
            undefined === n.setWindowTitle,
            "Module.setWindowTitle option was removed (modify setWindowTitle in JS)"
          );
          B(
            undefined === n.TOTAL_MEMORY,
            "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY"
          );
          T("read", "read_");
          T("readAsync", "readAsync");
          T("readBinary", "readBinary");
          T("setWindowTitle", "setWindowTitle");
          B(
            !h,
            "shell environment detected but not enabled at build time.  Add 'shell' to `-sENVIRONMENT` to enable."
          );
          var x;
          var k = n.dynamicLibraries || [];
          if (n.wasmBinary) {
            x = n.wasmBinary;
          }
          T("wasmBinary", "wasmBinary");
          var I;
          var A = n.noExitRuntime || true;
          function P(e, t) {
            switch (e) {
              case 1:
                return "i8";
              case 2:
                return "i16";
              case 4:
                return t ? "float" : "i32";
              case 8:
                return t ? "double" : "i64";
              default:
                B(0);
            }
          }
          function R(e, t, r, n) {
            if (e <= 0) {
              ge("segmentation fault storing " + r + " bytes to address " + e);
            }
            if (e % r != 0) {
              ge(
                "alignment error storing to address " +
                  e +
                  ", which was expected to be aligned to a multiple of " +
                  r
              );
            }
            if (ae) {
              var i = Ct() >>> 0;
              e + r > i &&
                ge(
                  "segmentation fault, exceeded the top of the available dynamic heap when storing " +
                    r +
                    " bytes to address " +
                    e +
                    ". DYNAMICTOP=" +
                    i
                ),
                B(i >= St()),
                B(i <= j.length);
            }
            (function (e, t, r) {
              switch (r) {
                case "i1":
                case "i8":
                  j[e >> 0] = t;
                  break;
                case "i16":
                  $[e >> 1] = t;
                  break;
                case "i32":
                  q[e >> 2] = t;
                  break;
                case "i64":
                  _e = [
                    t >>> 0,
                    ((ve = t),
                    +Math.abs(ve) >= 1
                      ? ve > 0
                        ? (0 |
                            Math.min(
                              +Math.floor(ve / 4294967296),
                              4294967295
                            )) >>>
                          0
                        : ~~+Math.ceil((ve - +(~~ve >>> 0)) / 4294967296) >>> 0
                      : 0),
                  ];
                  q[e >> 2] = _e[0];
                  q[(e + 4) >> 2] = _e[1];
                  break;
                case "float":
                  H[e >> 2] = t;
                  break;
                case "double":
                  V[e >> 3] = t;
                  break;
                default:
                  ge("invalid type for setValue: " + r);
              }
            })(e, t, P(r, n));
            return t;
          }
          function N(e, t, r) {
            return R(e, t, r, true);
          }
          function O(e, t, r, n) {
            if (e <= 0) {
              ge(
                "segmentation fault loading " + t + " bytes from address " + e
              );
            }
            if (e % t != 0) {
              ge(
                "alignment error loading from address " +
                  e +
                  ", which was expected to be aligned to a multiple of " +
                  t
              );
            }
            if (ae) {
              var i = Ct() >>> 0;
              e + t > i &&
                ge(
                  "segmentation fault, exceeded the top of the available dynamic heap when loading " +
                    t +
                    " bytes from address " +
                    e +
                    ". DYNAMICTOP=" +
                    i
                ),
                B(i >= St()),
                B(i <= j.length);
            }
            var o;
            var s;
            var a = P(t, n);
            var c = (function (e, t) {
              switch (t) {
                case "i1":
                case "i8":
                  return j[e >> 0];
                case "i16":
                  return $[e >> 1];
                case "i32":
                case "i64":
                  return q[e >> 2];
                case "float":
                  return H[e >> 2];
                case "double":
                  return V[e >> 3];
                default:
                  ge("invalid type for getValue: " + t);
              }
            })(e, a);
            if (r) {
              o = c;
              s = parseInt(a.substr(1), 10);
              c =
                o >= 0
                  ? o
                  : s <= 32
                  ? 2 * Math.abs(1 << (s - 1)) + o
                  : Math.pow(2, s) + o;
            }
            return c;
          }
          function L(e, t, r) {
            return O(e, t, r, true);
          }
          T("noExitRuntime", "noExitRuntime");
          if ("object" != typeof WebAssembly) {
            ge("no native wasm support detected");
          }
          var D;
          var M = false;
          function B(e, t) {
            if (e) {
              ge("Assertion failed" + (t ? ": " + t : ""));
            }
          }
          var F;
          var j;
          var U;
          var $;
          var q;
          var H;
          var V;
          var z =
            "undefined" != typeof TextDecoder
              ? new TextDecoder("utf8")
              : undefined;
          function K(e, t, r) {
            for (n = t + r, i = t, undefined; e[i] && !(i >= n); ) {
              var n;
              var i;
              ++i;
            }
            if (i - t > 16 && e.buffer && z) return z.decode(e.subarray(t, i));
            for (var o = ""; t < i; ) {
              var s = e[t++];
              if (128 & s) {
                var a = 63 & e[t++];
                if (192 != (224 & s)) {
                  var c = 63 & e[t++];
                  if (224 == (240 & s)) {
                    s = ((15 & s) << 12) | (a << 6) | c;
                  } else {
                    if (240 != (248 & s)) {
                      Xe(
                        "Invalid UTF-8 leading byte 0x" +
                          s.toString(16) +
                          " encountered when deserializing a UTF-8 string in wasm memory to a JS string!"
                      );
                    }
                    s = ((7 & s) << 18) | (a << 12) | (c << 6) | (63 & e[t++]);
                  }
                  if (s < 65536) o += String.fromCharCode(s);
                  else {
                    var l = s - 65536;
                    o += String.fromCharCode(
                      55296 | (l >> 10),
                      56320 | (1023 & l)
                    );
                  }
                } else o += String.fromCharCode(((31 & s) << 6) | a);
              } else o += String.fromCharCode(s);
            }
            return o;
          }
          function W(e, t) {
            return e ? K(U, e, t) : "";
          }
          function G(e, t, r, n) {
            if (!(n > 0)) return 0;
            for (i = r, o = r + n - 1, s = 0, undefined; s < e.length; ++s) {
              var i;
              var o;
              var s;
              var a = e.charCodeAt(s);
              if (a >= 55296 && a <= 57343) {
                a = (65536 + ((1023 & a) << 10)) | (1023 & e.charCodeAt(++s));
              }
              if (a <= 127) {
                if (r >= o) break;
                t[r++] = a;
              } else if (a <= 2047) {
                if (r + 1 >= o) break;
                (t[r++] = 192 | (a >> 6)), (t[r++] = 128 | (63 & a));
              } else if (a <= 65535) {
                if (r + 2 >= o) break;
                (t[r++] = 224 | (a >> 12)),
                  (t[r++] = 128 | ((a >> 6) & 63)),
                  (t[r++] = 128 | (63 & a));
              } else {
                if (r + 3 >= o) break;
                a > 1114111 &&
                  Xe(
                    "Invalid Unicode code point 0x" +
                      a.toString(16) +
                      " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF)."
                  ),
                  (t[r++] = 240 | (a >> 18)),
                  (t[r++] = 128 | ((a >> 12) & 63)),
                  (t[r++] = 128 | ((a >> 6) & 63)),
                  (t[r++] = 128 | (63 & a));
              }
            }
            t[r] = 0;
            return r - i;
          }
          function Q(e, t, r) {
            B(
              "number" == typeof r,
              "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"
            );
            return G(e, U, t, r);
          }
          function J(e) {
            for (t = 0, r = 0, undefined; r < e.length; ++r) {
              var t;
              var r;
              var n = e.charCodeAt(r);
              if (n <= 127) {
                t++;
              } else {
                if (n <= 2047) {
                  t += 2;
                } else {
                  if (n >= 55296 && n <= 57343) {
                    t += 4;
                    ++r;
                  } else {
                    t += 3;
                  }
                }
              }
            }
            return t;
          }
          function Y(e) {
            F = e;
            n.HEAP8 = j = new Int8Array(e);
            n.HEAP16 = $ = new Int16Array(e);
            n.HEAP32 = q = new Int32Array(e);
            n.HEAPU8 = U = new Uint8Array(e);
            n.HEAPU16 = new Uint16Array(e);
            n.HEAPU32 = new Uint32Array(e);
            n.HEAPF32 = H = new Float32Array(e);
            n.HEAPF64 = V = new Float64Array(e);
          }
          var X = 5242880;
          if (n.STACK_SIZE) {
            B(
              X === n.STACK_SIZE,
              "the stack size can no longer be determined at runtime"
            );
          }
          var Z = n.INITIAL_MEMORY || 33554432;
          T("INITIAL_MEMORY", "INITIAL_MEMORY");
          B(
            Z >= X,
            "INITIAL_MEMORY should be larger than STACK_SIZE, was " +
              Z +
              "! (STACK_SIZE=" +
              X +
              ")"
          );
          B(
            "undefined" != typeof Int32Array &&
              "undefined" != typeof Float64Array &&
              null != Int32Array.prototype.subarray &&
              null != Int32Array.prototype.set,
            "JS engine does not provide full typed array support"
          );
          if (
            (I = n.wasmMemory
              ? n.wasmMemory
              : new WebAssembly.Memory({
                  initial: Z / 65536,
                  maximum: 32768,
                }))
          ) {
            F = I.buffer;
          }
          B((Z = F.byteLength) % 65536 == 0);
          Y(F);
          var ee = new WebAssembly.Table({
            initial: 25,
            element: "anyfunc",
          });
          function te() {
            if (!M) {
              var e = xt();
              var t = O(4 * (e >> 2), 4, 1);
              var r = O(4 * ((e + 4) >> 2), 4, 1);
              if (34821223 == t && 2310721022 == r) {
                ge(
                  "Stack overflow! Stack cookie has been overwritten at 0x" +
                    e.toString(16) +
                    ", expected hex dwords 0x89BACDFE and 0x2135467, but received 0x" +
                    r.toString(16) +
                    " 0x" +
                    t.toString(16)
                );
              }
            }
          }
          !(function () {
            var e = new Int16Array(1);
            var t = new Int8Array(e.buffer);
            e[0] = 25459;
            if (115 !== t[0] || 99 !== t[1])
              throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
          })();
          var re = [];
          var ne = [];
          var ie = [];
          var oe = [];
          var se = [];
          var ae = false;
          function ce() {
            return A;
          }
          B(
            Math.imul,
            "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"
          );
          B(
            Math.fround,
            "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"
          );
          B(
            Math.clz32,
            "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"
          );
          B(
            Math.trunc,
            "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"
          );
          var le = 0;
          var ue = null;
          var de = null;
          var pe = {};
          function he(e) {
            le++;
            if (n.monitorRunDependencies) {
              n.monitorRunDependencies(le);
            }
            if (e) {
              B(!pe[e]);
              pe[e] = 1;
              if (null === ue && "undefined" != typeof setInterval) {
                ue = setInterval(function () {
                  if (M) {
                    clearInterval(ue);
                    return void (ue = null);
                  }
                  var e = false;
                  for (var t in pe) {
                    if (e) {
                      e = true;
                      E("still waiting on run dependencies:");
                    }
                    E("dependency: " + t);
                  }
                  if (e) {
                    E("(end of list)");
                  }
                }, 1e4);
              }
            } else {
              E("warning: run dependency added without ID");
            }
          }
          function fe(e) {
            le--;
            if (n.monitorRunDependencies) {
              n.monitorRunDependencies(le);
            }
            if (e) {
              B(pe[e]);
              delete pe[e];
            } else {
              E("warning: run dependency removed without ID");
            }
            if (
              0 == le &&
              (null !== ue && (clearInterval(ue), (ue = null)), de)
            ) {
              var t = de;
              (de = null), t();
            }
          }
          function ge(e) {
            throw (
              (n.onAbort && n.onAbort(e),
              E((e = "Aborted(" + e + ")")),
              (M = true),
              (D = 1),
              new WebAssembly.RuntimeError(e))
            );
          }
          var me;
          var ye;
          var ve;
          var _e;
          var be = {
            error: function () {
              ge(
                "Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with -sFORCE_FILESYSTEM"
              );
            },
            init: function () {
              be.error();
            },
            createDataFile: function () {
              be.error();
            },
            createPreloadedFile: function () {
              be.error();
            },
            createLazyFile: function () {
              be.error();
            },
            open: function () {
              be.error();
            },
            mkdev: function () {
              be.error();
            },
            registerDevice: function () {
              be.error();
            },
            analyzePath: function () {
              be.error();
            },
            loadFilesFromDB: function () {
              be.error();
            },
            ErrnoError: function () {
              be.error();
            },
          };
          function we(e) {
            return e.startsWith("data:application/octet-stream;base64,");
          }
          function Ce(e) {
            return e.startsWith("file://");
          }
          function Ee(e, t) {
            return function () {
              var r = e;
              var i = t;
              if (t) {
                i = n.asm;
              }
              B(
                ae,
                "native function `" +
                  r +
                  "` called before runtime initialization"
              );
              if (i[e]) {
                B(i[e], "exported native function `" + r + "` not found");
              }
              return i[e].apply(null, arguments);
            };
          }
          function Te(e) {
            try {
              if (e == me && x) return new Uint8Array(x);
              if (m) return m(e);
              throw "both async and sync fetching of the wasm failed";
            } catch (e) {
              ge(e);
            }
          }
          function Se(e) {
            this.name = "ExitStatus";
            this.message = "Program terminated with exit(" + e + ")";
            this.status = e;
          }
          n.FS_createDataFile = be.createDataFile;
          n.FS_createPreloadedFile = be.createPreloadedFile;
          if (we((me = "tree-sitter.wasm"))) {
            ye = me;
            me = n.locateFile ? n.locateFile(ye, y) : y + ye;
          }
          var xe = {};
          var ke = new Set([]);
          var Ie = {
            get: function (e, t) {
              var r = xe[t];
              if (r) {
                r = xe[t] = new WebAssembly.Global({
                  value: "i32",
                  mutable: true,
                });
              }
              if (ke.has(t)) {
                r.required = true;
              }
              return r;
            },
          };
          function Ae(e) {
            for (; e.length > 0; ) e.shift()(n);
          }
          function Pe(e) {
            var t = 0;
            var r = 0;
            function n() {
              for (r = 0, n = 1, undefined; ; ) {
                var r;
                var n;
                var i = e[t++];
                r += (127 & i) * n;
                n *= 128;
                if (!(128 & i)) break;
              }
              return r;
            }
            function i() {
              var r = n();
              return K(e, (t += r) - r, r);
            }
            function o(e, t) {
              if (e) throw new Error(t);
            }
            var s = "dylink.0";
            if (e instanceof WebAssembly.Module) {
              var a = WebAssembly.Module.customSections(e, s);
              if (0 === a.length) {
                s = "dylink";
                a = WebAssembly.Module.customSections(e, s);
              }
              o(0 === a.length, "need dylink section");
              r = (e = new Uint8Array(a[0])).length;
            } else {
              o(
                !(
                  1836278016 ==
                  new Uint32Array(new Uint8Array(e.subarray(0, 24)).buffer)[0]
                ),
                "need to see wasm magic number"
              );
              o(0 !== e[8], "need the dylink section to be first");
              t = 9;
              var c = n();
              r = t + c;
              s = i();
            }
            var l = {
              neededDynlibs: [],
              tlsExports: new Set(),
              weakImports: new Set(),
            };
            if ("dylink" == s) {
              l.memorySize = n();
              l.memoryAlign = n();
              l.tableSize = n();
              l.tableAlign = n();
              for (u = n(), d = 0, undefined; d < u; ++d) {
                var u;
                var d;
                var p = i();
                l.neededDynlibs.push(p);
              }
            } else
              for (o("dylink.0" !== s); t < r; ) {
                var h = e[t++];
                var f = n();
                if (1 === h) {
                  l.memorySize = n();
                  l.memoryAlign = n();
                  l.tableSize = n();
                  l.tableAlign = n();
                } else if (2 === h)
                  for (u = n(), d = 0; d < u; ++d) {
                    p = i();
                    l.neededDynlibs.push(p);
                  }
                else if (3 === h)
                  for (var g = n(); g--; ) {
                    var m = i();
                    if (256 & n()) {
                      l.tlsExports.add(m);
                    }
                  }
                else if (4 === h)
                  for (g = n(); g--; ) {
                    i();
                    m = i();
                    if (1 == (3 & n())) {
                      l.weakImports.add(m);
                    }
                  }
                else {
                  E("unknown dylink.0 subsection: " + h);
                  t += f;
                }
              }
            var y = Math.pow(2, l.tableAlign);
            B(1 === y, "invalid tableAlign " + y);
            B(t == r);
            return l;
          }
          function Re(e, t = "i8") {
            switch ((t.endsWith("*") && (t = "*"), t)) {
              case "i1":
              case "i8":
                return O(e >> 0, 1, 0);
              case "i16":
                return O(2 * (e >> 1), 2, 0);
              case "i32":
              case "i64":
                return O(4 * (e >> 2), 4, 0);
              case "float":
                return L(4 * (e >> 2), 4, 0);
              case "double":
                return L(8 * (e >> 3), 8, 0);
              case "*":
                return O(4 * (e >> 2), 4, 1);
              default:
                ge("invalid type for getValue: " + t);
            }
            return null;
          }
          function Ne(e) {
            return 0 == e.indexOf("dynCall_") ||
              [
                "stackAlloc",
                "stackSave",
                "stackRestore",
                "getTempRet0",
                "setTempRet0",
              ].includes(e)
              ? e
              : "_" + e;
          }
          function Oe(e, t) {
            for (var r in e)
              if (e.hasOwnProperty(r)) {
                if (_t.hasOwnProperty(r)) {
                  _t[r] = e[r];
                }
                var i = Ne(r);
                if (n.hasOwnProperty(i)) {
                  n[i] = e[r];
                }
                if ("__main_argc_argv" == r) {
                  n._main = e[r];
                }
              }
          }
          var Le = {
            loadedLibsByName: {},
            loadedLibsByHandle: {},
          };
          var De = [];
          function Me(e) {
            var t = De[e];
            if (t) {
              if (e >= De.length) {
                De.length = e + 1;
              }
              De[e] = t = ee.get(e);
            }
            B(
              ee.get(e) == t,
              "JavaScript-side Wasm function table mirror is out of date!"
            );
            return t;
          }
          function Be(e, t, r) {
            return e.includes("j")
              ? (function (e, t, r) {
                  B(
                    "dynCall_" + e in n,
                    "bad function pointer type - dynCall function not found for sig '" +
                      e +
                      "'"
                  );
                  if (r && r.length) {
                    B(r.length === e.substring(1).replace(/j/g, "--").length);
                  } else {
                    B(1 == e.length);
                  }
                  var i = n["dynCall_" + e];
                  return r && r.length
                    ? i.apply(null, [t].concat(r))
                    : i.call(null, t);
                })(e, t, r)
              : (B(Me(t), "missing table entry in dynCall: " + t),
                Me(t).apply(null, r));
          }
          var Fe = 5255488;
          function je(e) {
            return [
              "__cpp_exception",
              "__c_longjmp",
              "__wasm_apply_data_relocs",
              "__dso_handle",
              "__tls_size",
              "__tls_align",
              "__set_stack_limits",
              "_emscripten_tls_init",
              "__wasm_init_tls",
              "__wasm_call_ctors",
            ].includes(e);
          }
          function Ue(e, t) {
            B(e < 16384);
            if (e < 128) {
              t.push(e);
            } else {
              t.push(e % 128 | 128, e >> 7);
            }
          }
          function $e(e, t) {
            if (qe)
              for (var r = e; r < e + t; r++) {
                var n = Me(r);
                if (n) {
                  qe.set(n, r);
                }
              }
          }
          var qe = undefined;
          var He = [];
          function Ve(e, t) {
            ee.set(e, t);
            De[e] = ee.get(e);
          }
          function ze(e, t) {
            B(undefined !== e);
            if (qe) {
              qe = new WeakMap();
              $e(0, ee.length);
            }
            if (qe.has(e)) return qe.get(e);
            var r = (function () {
              if (He.length) return He.pop();
              try {
                ee.grow(1);
              } catch (e) {
                if (!(e instanceof RangeError)) throw e;
                throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
              }
              return ee.length - 1;
            })();
            try {
              Ve(r, e);
            } catch (n) {
              if (!(n instanceof TypeError)) throw n;
              B(
                undefined !== t,
                "Missing signature argument to addFunction: " + e
              );
              Ve(
                r,
                (function (e, t) {
                  if ("function" == typeof WebAssembly.Function)
                    return new WebAssembly.Function(
                      (function (e) {
                        for (
                          t = {
                            i: "i32",
                            j: "i32",
                            f: "f32",
                            d: "f64",
                            p: "i32",
                          },
                            r = {
                              parameters: [],
                              results: "v" == e[0] ? [] : [t[e[0]]],
                            },
                            n = 1,
                            undefined;
                          n < e.length;
                          ++n
                        ) {
                          var t;
                          var r;
                          var n;
                          B(e[n] in t, "invalid signature char: " + e[n]);
                          r.parameters.push(t[e[n]]);
                          if ("j" === e[n]) {
                            r.parameters.push("i32");
                          }
                        }
                        return r;
                      })(t),
                      e
                    );
                  var r = [1];
                  !(function (e, t) {
                    var r = e.slice(0, 1);
                    var n = e.slice(1);
                    var i = {
                      i: 127,
                      p: 127,
                      j: 126,
                      f: 125,
                      d: 124,
                    };
                    t.push(96);
                    Ue(n.length, t);
                    for (var o = 0; o < n.length; ++o) {
                      B(n[o] in i, "invalid signature char: " + n[o]);
                      t.push(i[n[o]]);
                    }
                    if ("v" == r) {
                      t.push(0);
                    } else {
                      t.push(1, i[r]);
                    }
                  })(t, r);
                  var n = [0, 97, 115, 109, 1, 0, 0, 0, 1];
                  Ue(r.length, n);
                  n.push.apply(n, r);
                  n.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);
                  var i = new WebAssembly.Module(new Uint8Array(n));
                  return new WebAssembly.Instance(i, {
                    e: {
                      f: e,
                    },
                  }).exports.f;
                })(e, t)
              );
            }
            qe.set(e, r);
            return r;
          }
          function Ke(e, t, r) {
            var n = {};
            for (var i in e) {
              var o = e[i];
              if ("object" == typeof o) {
                o = o.value;
              }
              if ("number" == typeof o) {
                o += t;
              }
              n[i] = o;
            }
            (function (e, t) {
              for (var r in e)
                if (!je(r)) {
                  var n = e[r];
                  if (r.startsWith("orig$")) {
                    r = r.split("$")[1];
                    t = true;
                  }
                  if (xe[r]) {
                    xe[r] = new WebAssembly.Global({
                      value: "i32",
                      mutable: true,
                    });
                  }
                  if (t || 0 == xe[r].value) {
                    if ("function" == typeof n) {
                      xe[r].value = ze(n);
                    } else {
                      if ("number" == typeof n) {
                        xe[r].value = n;
                      } else {
                        E("unhandled export type for `" + r + "`: " + typeof n);
                      }
                    }
                  }
                }
            })(n, r);
            return n;
          }
          function We(e, t) {
            var r;
            var i;
            if (t) {
              r = _t["orig$" + e];
            }
            if (r) {
              if ((r = _t[e]) && r.stub) {
                r = undefined;
              }
            }
            if (r) {
              r = n[Ne(e)];
            }
            if (!r && e.startsWith("invoke_")) {
              i = e.split("_")[1];
              r = function () {
                var e = kt();
                try {
                  return Be(
                    i,
                    arguments[0],
                    Array.prototype.slice.call(arguments, 1)
                  );
                } catch (t) {
                  It(e);
                  if (t !== t + 0) throw t;
                  Et(1, 0);
                }
              };
            }
            return r;
          }
          function Ge(e, t, r) {
            var n = Pe(e);
            ke = n.weakImports;
            var i = ee;
            function o() {
              var o;
              var s;
              if (r && O((r + 24) >> 0, 1, 0)) {
                c = O(4 * ((r + 28) >> 2), 4, 1);
                l = O(4 * ((r + 36) >> 2), 4, 1);
              } else {
                var a = Math.pow(2, n.memoryAlign);
                a = Math.max(a, 16);
                var c = n.memorySize
                  ? ((o = (function (e) {
                      if (ae)
                        return (function (e, t) {
                          U.fill(0, e, e + t);
                          return e;
                        })(bt(e), e);
                      var t = Fe;
                      var r = (t + e + 15) & -16;
                      B(
                        r <= j.length,
                        "failure to getMemory - memory growth etc. is not supported there, call malloc/sbrk directly or increase INITIAL_MEMORY"
                      );
                      Fe = r;
                      xe.__heap_base.value = r;
                      return t;
                    })(n.memorySize + a)),
                    B((s = a), "alignment argument is required"),
                    Math.ceil(o / s) * s)
                  : 0;
                var l = n.tableSize ? ee.length : 0;
                if (r) {
                  R((r + 24) >> 0, 1, 1);
                  R(4 * ((r + 28) >> 2), c, 4);
                  R(4 * ((r + 32) >> 2), n.memorySize, 4);
                  R(4 * ((r + 36) >> 2), l, 4);
                  R(4 * ((r + 40) >> 2), n.tableSize, 4);
                }
              }
              var u;
              var d = l + n.tableSize - ee.length;
              function p(e) {
                var t = We(e, false);
                if (t) {
                  t = u[e];
                }
                B(
                  t,
                  "undefined symbol `" +
                    e +
                    "`. perhaps a side module was not linked in? if this global was expected to arrive from a system library, try to build the MAIN_MODULE with EMCC_FORCE_STDLIBS=1 in the environment"
                );
                return t;
              }
              if (d > 0) {
                ee.grow(d);
              }
              var h = {
                get: function (e, t) {
                  switch (t) {
                    case "__memory_base":
                      return c;
                    case "__table_base":
                      return l;
                  }
                  return t in _t
                    ? _t[t]
                    : (t in e ||
                        (e[t] = function () {
                          if (r) {
                            r = p(t);
                          }
                          return r.apply(null, arguments);
                        }),
                      e[t]);
                  var r;
                },
              };
              var f = new Proxy({}, h);
              var g = {
                "GOT.mem": new Proxy({}, Ie),
                "GOT.func": new Proxy({}, Ie),
                env: f,
                wasi_snapshot_preview1: f,
              };
              function m(e) {
                B(ee === i);
                $e(l, n.tableSize);
                u = Ke(e.exports, c);
                if (t.allowUndefined) {
                  Je();
                }
                var r = u.__wasm_apply_data_relocs;
                if (r) {
                  if (ae) {
                    r();
                  } else {
                    se.push(r);
                  }
                }
                var o = u.__wasm_call_ctors;
                if (o) {
                  if (ae) {
                    o();
                  } else {
                    ne.push(o);
                  }
                }
                return u;
              }
              if (t.loadAsync) {
                if (e instanceof WebAssembly.Module) {
                  var y = new WebAssembly.Instance(e, g);
                  return Promise.resolve(m(y));
                }
                return WebAssembly.instantiate(e, g).then(function (e) {
                  return m(e.instance);
                });
              }
              var v =
                e instanceof WebAssembly.Module ? e : new WebAssembly.Module(e);
              return m((y = new WebAssembly.Instance(v, g)));
            }
            return t.loadAsync
              ? n.neededDynlibs
                  .reduce(function (e, r) {
                    return e.then(function () {
                      return Qe(r, t);
                    });
                  }, Promise.resolve())
                  .then(function () {
                    return o();
                  })
              : (n.neededDynlibs.forEach(function (e) {
                  Qe(e, t);
                }),
                o());
          }
          function Qe(e, t, r) {
            t = t || {
              global: true,
              nodelete: true,
            };
            var n = Le.loadedLibsByName[e];
            if (n) {
              if (t.global && !n.global) {
                n.global = true;
                if ("loading" !== n.module) {
                  Oe(n.module);
                }
              }
              if (t.nodelete && n.refcount !== 1 / 0) {
                n.refcount = 1 / 0;
              }
              n.refcount++;
              if (r) {
                Le.loadedLibsByHandle[r] = n;
              }
              return !t.loadAsync || Promise.resolve(true);
            }
            function i(e) {
              if (t.fs && t.fs.findObject(e)) {
                var r = t.fs.readFile(e, {
                  encoding: "binary",
                });
                if (r instanceof Uint8Array) {
                  r = new Uint8Array(r);
                }
                return t.loadAsync ? Promise.resolve(r) : r;
              }
              if (t.loadAsync)
                return new Promise(function (t, r) {
                  g(e, (e) => t(new Uint8Array(e)), r);
                });
              if (!m)
                throw new Error(
                  e +
                    ": file not found, and synchronous loading of external files is not available"
                );
              return m(e);
            }
            function o() {
              if ("undefined" != typeof preloadedWasm && preloadedWasm[e]) {
                var n = preloadedWasm[e];
                return t.loadAsync ? Promise.resolve(n) : n;
              }
              return t.loadAsync
                ? i(e).then(function (e) {
                    return Ge(e, t, r);
                  })
                : Ge(i(e), t, r);
            }
            function s(e) {
              if (n.global) {
                Oe(e);
              }
              n.module = e;
            }
            n = {
              refcount: t.nodelete ? 1 / 0 : 1,
              name: e,
              module: "loading",
              global: t.global,
            };
            Le.loadedLibsByName[e] = n;
            if (r) {
              Le.loadedLibsByHandle[r] = n;
            }
            return t.loadAsync
              ? o().then(function (e) {
                  s(e);
                  return true;
                })
              : (s(o()), true);
          }
          function Je() {
            for (var e in xe)
              if (0 == xe[e].value) {
                var t = We(e, true);
                if (!t && !xe[e].required) continue;
                B(
                  t,
                  "undefined symbol `" +
                    e +
                    "`. perhaps a side module was not linked in? if this global was expected to arrive from a system library, try to build the MAIN_MODULE with EMCC_FORCE_STDLIBS=1 in the environment"
                );
                if ("function" == typeof t) xe[e].value = ze(t, t.sig);
                else {
                  if ("number" != typeof t)
                    throw new Error(
                      "bad export type for `" + e + "`: " + typeof t
                    );
                  xe[e].value = t;
                }
              }
          }
          function Ye(e, t, r = "i8") {
            switch ((r.endsWith("*") && (r = "*"), r)) {
              case "i1":
              case "i8":
                R(e >> 0, t, 1);
                break;
              case "i16":
                R(2 * (e >> 1), t, 2);
                break;
              case "i32":
              case "*":
                R(4 * (e >> 2), t, 4);
                break;
              case "i64":
                R(
                  4 * (e >> 2),
                  (_e = [
                    t >>> 0,
                    ((ve = t),
                    +Math.abs(ve) >= 1
                      ? ve > 0
                        ? (0 |
                            Math.min(
                              +Math.floor(ve / 4294967296),
                              4294967295
                            )) >>>
                          0
                        : ~~+Math.ceil((ve - +(~~ve >>> 0)) / 4294967296) >>> 0
                      : 0),
                  ])[0],
                  4
                );
                R(4 * ((e + 4) >> 2), _e[1], 4);
                break;
              case "float":
                N(4 * (e >> 2), t, 4);
                break;
              case "double":
                N(8 * (e >> 3), t, 8);
                break;
              default:
                ge("invalid type for setValue: " + r);
            }
          }
          function Xe(e) {
            if (Xe.shown) {
              Xe.shown = {};
            }
            if (Xe.shown[e]) {
              Xe.shown[e] = 1;
              if (p) {
                e = "warning: " + e;
              }
              E(e);
            }
          }
          var Ze;
          var et = new WebAssembly.Global(
            {
              value: "i32",
              mutable: false,
            },
            1024
          );
          var tt = new WebAssembly.Global(
            {
              value: "i32",
              mutable: true,
            },
            5255488
          );
          var rt = new WebAssembly.Global(
            {
              value: "i32",
              mutable: false,
            },
            1
          );
          function nt() {
            return true;
          }
          function it() {
            ge("native code called abort()");
          }
          function ot() {
            return Date.now();
          }
          function st(e, t, r) {
            U.copyWithin(e, t, t + r);
          }
          function at(e) {
            try {
              I.grow((e - F.byteLength + 65535) >>> 16);
              Y(I.buffer);
              return 1;
            } catch (t) {
              E(
                "emscripten_realloc_buffer: Attempted to grow heap from " +
                  F.byteLength +
                  " bytes to " +
                  e +
                  " bytes, but got error: " +
                  t
              );
            }
          }
          function ct(e) {
            var t = U.length;
            B((e >>>= 0) > t);
            var r;
            var n = 2147483648;
            if (e > n) {
              E(
                "Cannot enlarge memory, asked to go up to " +
                  e +
                  " bytes, but the limit is " +
                  n +
                  " bytes!"
              );
              return false;
            }
            for (var i = 1; i <= 4; i *= 2) {
              var o = t * (1 + 0.2 / i);
              o = Math.min(o, e + 100663296);
              var s = Math.min(
                n,
                (r = Math.max(e, o)) + ((65536 - (r % 65536)) % 65536)
              );
              if (at(s)) return true;
            }
            E(
              "Failed to grow the heap from " +
                t +
                " bytes to " +
                s +
                " bytes, not enough memory!"
            );
            return false;
          }
          nt.sig = "i";
          n._abort = it;
          it.sig = "v";
          ot.sig = "d";
          (Ze = p
            ? () => {
                var e = process.hrtime();
                return 1e3 * e[0] + e[1] / 1e6;
              }
            : () => performance.now()).sig = "d";
          st.sig = "vppp";
          ct.sig = "ip";
          var lt = {
            DEFAULT_POLLMASK: 5,
            calculateAt: function (e, t, r) {
              if (PATH.isAbs(t)) return t;
              var n;
              n = -100 === e ? be.cwd() : lt.getStreamFromFD(e).path;
              if (0 == t.length) {
                if (!r) throw new be.ErrnoError(44);
                return n;
              }
              return PATH.join2(n, t);
            },
            doStat: function (e, t, r) {
              try {
                var n = e(t);
              } catch (e) {
                if (
                  e &&
                  e.node &&
                  PATH.normalize(t) !== PATH.normalize(be.getPath(e.node))
                )
                  return -54;
                throw e;
              }
              R(4 * (r >> 2), n.dev, 4);
              R(4 * ((r + 8) >> 2), n.ino, 4);
              R(4 * ((r + 12) >> 2), n.mode, 4);
              R(4 * ((r + 16) >> 2), n.nlink, 4);
              R(4 * ((r + 20) >> 2), n.uid, 4);
              R(4 * ((r + 24) >> 2), n.gid, 4);
              R(4 * ((r + 28) >> 2), n.rdev, 4);
              R(
                4 * ((r + 40) >> 2),
                (_e = [
                  n.size >>> 0,
                  ((ve = n.size),
                  +Math.abs(ve) >= 1
                    ? ve > 0
                      ? (0 |
                          Math.min(
                            +Math.floor(ve / 4294967296),
                            4294967295
                          )) >>>
                        0
                      : ~~+Math.ceil((ve - +(~~ve >>> 0)) / 4294967296) >>> 0
                    : 0),
                ])[0],
                4
              );
              R(4 * ((r + 44) >> 2), _e[1], 4);
              R(4 * ((r + 48) >> 2), 4096, 4);
              R(4 * ((r + 52) >> 2), n.blocks, 4);
              R(
                4 * ((r + 56) >> 2),
                (_e = [
                  Math.floor(n.atime.getTime() / 1e3) >>> 0,
                  ((ve = Math.floor(n.atime.getTime() / 1e3)),
                  +Math.abs(ve) >= 1
                    ? ve > 0
                      ? (0 |
                          Math.min(
                            +Math.floor(ve / 4294967296),
                            4294967295
                          )) >>>
                        0
                      : ~~+Math.ceil((ve - +(~~ve >>> 0)) / 4294967296) >>> 0
                    : 0),
                ])[0],
                4
              );
              R(4 * ((r + 60) >> 2), _e[1], 4);
              R(4 * ((r + 64) >> 2), 0, 4);
              R(
                4 * ((r + 72) >> 2),
                (_e = [
                  Math.floor(n.mtime.getTime() / 1e3) >>> 0,
                  ((ve = Math.floor(n.mtime.getTime() / 1e3)),
                  +Math.abs(ve) >= 1
                    ? ve > 0
                      ? (0 |
                          Math.min(
                            +Math.floor(ve / 4294967296),
                            4294967295
                          )) >>>
                        0
                      : ~~+Math.ceil((ve - +(~~ve >>> 0)) / 4294967296) >>> 0
                    : 0),
                ])[0],
                4
              );
              R(4 * ((r + 76) >> 2), _e[1], 4);
              R(4 * ((r + 80) >> 2), 0, 4);
              R(
                4 * ((r + 88) >> 2),
                (_e = [
                  Math.floor(n.ctime.getTime() / 1e3) >>> 0,
                  ((ve = Math.floor(n.ctime.getTime() / 1e3)),
                  +Math.abs(ve) >= 1
                    ? ve > 0
                      ? (0 |
                          Math.min(
                            +Math.floor(ve / 4294967296),
                            4294967295
                          )) >>>
                        0
                      : ~~+Math.ceil((ve - +(~~ve >>> 0)) / 4294967296) >>> 0
                    : 0),
                ])[0],
                4
              );
              R(4 * ((r + 92) >> 2), _e[1], 4);
              R(4 * ((r + 96) >> 2), 0, 4);
              R(
                4 * ((r + 104) >> 2),
                (_e = [
                  n.ino >>> 0,
                  ((ve = n.ino),
                  +Math.abs(ve) >= 1
                    ? ve > 0
                      ? (0 |
                          Math.min(
                            +Math.floor(ve / 4294967296),
                            4294967295
                          )) >>>
                        0
                      : ~~+Math.ceil((ve - +(~~ve >>> 0)) / 4294967296) >>> 0
                    : 0),
                ])[0],
                4
              );
              R(4 * ((r + 108) >> 2), _e[1], 4);
              return 0;
            },
            doMsync: function (e, t, r, n, i) {
              if (!be.isFile(t.node.mode)) throw new be.ErrnoError(43);
              if (2 & n) return 0;
              var o = U.slice(e, e + r);
              be.msync(t, o, i, r, n);
            },
            varargs: undefined,
            get: function () {
              B(null != lt.varargs);
              lt.varargs += 4;
              return O(4 * ((lt.varargs - 4) >> 2), 4, 0);
            },
            getStr: function (e) {
              return W(e);
            },
            getStreamFromFD: function (e) {
              var t = be.getStream(e);
              if (!t) throw new be.ErrnoError(8);
              return t;
            },
          };
          function ut(e) {
            D = e;
            if (ce()) {
              if (n.onExit) {
                n.onExit(e);
              }
              M = true;
            }
            l(e, new Se(e));
          }
          function dt(e, t) {
            D = e;
            (function () {
              var e = C;
              var t = E;
              var r = false;
              C = E = (e) => {
                r = true;
              };
              try {
                wt(0);
              } catch (e) {}
              C = e;
              E = t;
              if (r) {
                Xe(
                  "stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the FAQ), or make sure to emit a newline when you printf etc."
                );
                Xe(
                  "(this may also be due to not including full filesystem support - try building with -sFORCE_FILESYSTEM)"
                );
              }
            })();
            if (ce() && !t) {
              E(
                "program exited (with status: " +
                  e +
                  "), but EXIT_RUNTIME is not set, so halting execution but not exiting the runtime or preventing further async execution (build with EXIT_RUNTIME=1, if you want a true shutdown)"
              );
            }
            ut(e);
          }
          ut.sig = "vi";
          var pt = dt;
          function ht(e) {
            try {
              var t = lt.getStreamFromFD(e);
              be.close(t);
              return 0;
            } catch (e) {
              if (undefined === be || !(e instanceof be.ErrnoError)) throw e;
              return e.errno;
            }
          }
          function ft(e, t, r, n, i) {
            try {
              var o =
                ((c = r),
                B((a = t) == a >>> 0 || a == (0 | a)),
                B(c === (0 | c)),
                (c + 2097152) >>> 0 < 4194305 - !!a
                  ? (a >>> 0) + 4294967296 * c
                  : NaN);
              if (isNaN(o)) return 61;
              var s = lt.getStreamFromFD(e);
              be.llseek(s, o, n);
              R(
                4 * (i >> 2),
                (_e = [
                  s.position >>> 0,
                  ((ve = s.position),
                  +Math.abs(ve) >= 1
                    ? ve > 0
                      ? (0 |
                          Math.min(
                            +Math.floor(ve / 4294967296),
                            4294967295
                          )) >>>
                        0
                      : ~~+Math.ceil((ve - +(~~ve >>> 0)) / 4294967296) >>> 0
                    : 0),
                ])[0],
                4
              );
              R(4 * ((i + 4) >> 2), _e[1], 4);
              if (s.getdents && 0 === o && 0 === n) {
                s.getdents = null;
              }
              return 0;
            } catch (e) {
              if (undefined === be || !(e instanceof be.ErrnoError)) throw e;
              return e.errno;
            }
            var a;
            var c;
          }
          function gt(e, t, r, n) {
            try {
              var i = (function (e, t, r, n) {
                for (i = 0, o = 0, undefined; o < r; o++) {
                  var i;
                  var o;
                  var s = O(4 * (t >> 2), 4, 1);
                  var a = O(4 * ((t + 4) >> 2), 4, 1);
                  t += 8;
                  var c = be.write(e, j, s, a, undefined);
                  if (c < 0) return -1;
                  i += c;
                }
                return i;
              })(lt.getStreamFromFD(e), t, r);
              R(4 * (n >> 2), i, 4);
              return 0;
            } catch (e) {
              if (undefined === be || !(e instanceof be.ErrnoError)) throw e;
              return e.errno;
            }
          }
          function mt(e, t, r) {
            B(
              t % 2 == 0,
              "Pointer passed to stringToUTF16 must be aligned to two bytes!"
            );
            B(
              "number" == typeof r,
              "stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"
            );
            if (undefined === r) {
              r = 2147483647;
            }
            if (r < 2) return 0;
            for (
              n = t,
                i = (r -= 2) < 2 * e.length ? r / 2 : e.length,
                o = 0,
                undefined;
              o < i;
              ++o
            ) {
              var n;
              var i;
              var o;
              R(2 * (t >> 1), e.charCodeAt(o), 2);
              t += 2;
            }
            R(2 * (t >> 1), 0, 2);
            return t - n;
          }
          function yt(e) {
            for (var t = ""; ; ) {
              var r = O(e++ >> 0, 1, 1);
              if (!r) return t;
              t += String.fromCharCode(r);
            }
          }
          pt.sig = "vi";
          ht.sig = "ii";
          ft.sig = "iijip";
          gt.sig = "iippp";
          var vt;
          var _t = {
            __heap_base: Fe,
            __indirect_function_table: ee,
            __memory_base: et,
            __stack_high: 5255488,
            __stack_low: 12608,
            __stack_pointer: tt,
            __table_base: rt,
            _emscripten_get_now_is_monotonic: nt,
            abort: it,
            alignfault: function () {
              ge("alignment fault");
            },
            emscripten_date_now: ot,
            emscripten_get_now: Ze,
            emscripten_memcpy_big: st,
            emscripten_resize_heap: ct,
            exit: pt,
            fd_close: ht,
            fd_seek: ft,
            fd_write: gt,
            memory: I,
            segfault: function () {
              ge("segmentation fault");
            },
            tree_sitter_log_callback: function (e, t) {
              if (Ht) {
                const r = W(t);
                Ht(r, 0 !== e);
              }
            },
            tree_sitter_parse_callback: function (e, t, r, n, i) {
              var o = qt(t, {
                row: r,
                column: n,
              });
              if ("string" == typeof o) {
                Ye(i, o.length, "i32");
                mt(o, e, 10240);
              } else {
                Ye(i, 0, "i32");
              }
            },
          };
          var bt =
            ((function () {
              var e = {
                env: _t,
                wasi_snapshot_preview1: _t,
                "GOT.mem": new Proxy(_t, Ie),
                "GOT.func": new Proxy(_t, Ie),
              };
              function t(e, t) {
                var r = e.exports;
                r = Ke(r, 1024);
                var i;
                var o = Pe(t);
                if (o.neededDynlibs) {
                  k = o.neededDynlibs.concat(k);
                }
                Oe(r);
                n.asm = r;
                i = n.asm.__wasm_call_ctors;
                ne.unshift(i);
                se.push(n.asm.__wasm_apply_data_relocs);
                fe("wasm-instantiate");
              }
              he("wasm-instantiate");
              var r = n;
              function i(e) {
                B(
                  n === r,
                  "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?"
                );
                r = null;
                t(e.instance, e.module);
              }
              function o(t) {
                return (function () {
                  if (!x && (u || d)) {
                    if ("function" == typeof fetch && !Ce(me))
                      return fetch(me, {
                        credentials: "same-origin",
                      })
                        .then(function (e) {
                          if (!e.ok)
                            throw (
                              "failed to load wasm binary file at '" + me + "'"
                            );
                          return e.arrayBuffer();
                        })
                        .catch(function () {
                          return Te(me);
                        });
                    if (g)
                      return new Promise(function (e, t) {
                        g(
                          me,
                          function (t) {
                            e(new Uint8Array(t));
                          },
                          t
                        );
                      });
                  }
                  return Promise.resolve().then(function () {
                    return Te(me);
                  });
                })()
                  .then(function (t) {
                    return WebAssembly.instantiate(t, e);
                  })
                  .then(function (e) {
                    return e;
                  })
                  .then(t, function (e) {
                    E("failed to asynchronously prepare wasm: " + e);
                    if (Ce(me)) {
                      E(
                        "warning: Loading from a file URI (" +
                          me +
                          ") is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing"
                      );
                    }
                    ge(e);
                  });
              }
              if (n.instantiateWasm)
                try {
                  return n.instantiateWasm(e, t);
                } catch (e) {
                  E("Module.instantiateWasm callback failed with error: " + e);
                  return false;
                }
              if (
                x ||
                "function" != typeof WebAssembly.instantiateStreaming ||
                we(me) ||
                Ce(me) ||
                p ||
                "function" != typeof fetch
              ) {
                o(i);
              } else {
                fetch(me, {
                  credentials: "same-origin",
                }).then(function (t) {
                  return WebAssembly.instantiateStreaming(t, e).then(
                    i,
                    function (e) {
                      E("wasm streaming compile failed: " + e);
                      E("falling back to ArrayBuffer instantiation");
                      return o(i);
                    }
                  );
                });
              }
            })(),
            (n.___wasm_call_ctors = Ee("__wasm_call_ctors")),
            (n.___wasm_apply_data_relocs = Ee("__wasm_apply_data_relocs")),
            (n._malloc = Ee("malloc")));
          var wt =
            ((n._calloc = Ee("calloc")),
            (n._realloc = Ee("realloc")),
            (n._free = Ee("free")),
            (n._ts_language_symbol_count = Ee("ts_language_symbol_count")),
            (n._ts_language_version = Ee("ts_language_version")),
            (n._ts_language_field_count = Ee("ts_language_field_count")),
            (n._ts_language_symbol_name = Ee("ts_language_symbol_name")),
            (n._ts_language_symbol_for_name = Ee(
              "ts_language_symbol_for_name"
            )),
            (n._ts_language_symbol_type = Ee("ts_language_symbol_type")),
            (n._ts_language_field_name_for_id = Ee(
              "ts_language_field_name_for_id"
            )),
            (n._memset = Ee("memset")),
            (n._memcpy = Ee("memcpy")),
            (n._ts_parser_delete = Ee("ts_parser_delete")),
            (n._ts_parser_set_language = Ee("ts_parser_set_language")),
            (n._ts_parser_reset = Ee("ts_parser_reset")),
            (n._ts_parser_timeout_micros = Ee("ts_parser_timeout_micros")),
            (n._ts_parser_set_timeout_micros = Ee(
              "ts_parser_set_timeout_micros"
            )),
            (n._ts_query_new = Ee("ts_query_new")),
            (n._ts_query_delete = Ee("ts_query_delete")),
            (n._iswspace = Ee("iswspace")),
            (n._ts_query_pattern_count = Ee("ts_query_pattern_count")),
            (n._ts_query_capture_count = Ee("ts_query_capture_count")),
            (n._ts_query_string_count = Ee("ts_query_string_count")),
            (n._ts_query_capture_name_for_id = Ee(
              "ts_query_capture_name_for_id"
            )),
            (n._ts_query_string_value_for_id = Ee(
              "ts_query_string_value_for_id"
            )),
            (n._ts_query_predicates_for_pattern = Ee(
              "ts_query_predicates_for_pattern"
            )),
            (n._memmove = Ee("memmove")),
            (n._memcmp = Ee("memcmp")),
            (n._ts_tree_copy = Ee("ts_tree_copy")),
            (n._ts_tree_delete = Ee("ts_tree_delete")),
            (n._iswalnum = Ee("iswalnum")),
            (n._ts_init = Ee("ts_init")),
            (n._ts_parser_new_wasm = Ee("ts_parser_new_wasm")),
            (n._ts_parser_enable_logger_wasm = Ee(
              "ts_parser_enable_logger_wasm"
            )),
            (n._ts_parser_parse_wasm = Ee("ts_parser_parse_wasm")),
            (n._ts_language_type_is_named_wasm = Ee(
              "ts_language_type_is_named_wasm"
            )),
            (n._ts_language_type_is_visible_wasm = Ee(
              "ts_language_type_is_visible_wasm"
            )),
            (n._ts_tree_root_node_wasm = Ee("ts_tree_root_node_wasm")),
            (n._ts_tree_edit_wasm = Ee("ts_tree_edit_wasm")),
            (n._ts_tree_get_changed_ranges_wasm = Ee(
              "ts_tree_get_changed_ranges_wasm"
            )),
            (n._ts_tree_cursor_new_wasm = Ee("ts_tree_cursor_new_wasm")),
            (n._ts_tree_cursor_delete_wasm = Ee("ts_tree_cursor_delete_wasm")),
            (n._ts_tree_cursor_reset_wasm = Ee("ts_tree_cursor_reset_wasm")),
            (n._ts_tree_cursor_goto_first_child_wasm = Ee(
              "ts_tree_cursor_goto_first_child_wasm"
            )),
            (n._ts_tree_cursor_goto_next_sibling_wasm = Ee(
              "ts_tree_cursor_goto_next_sibling_wasm"
            )),
            (n._ts_tree_cursor_goto_parent_wasm = Ee(
              "ts_tree_cursor_goto_parent_wasm"
            )),
            (n._ts_tree_cursor_current_node_type_id_wasm = Ee(
              "ts_tree_cursor_current_node_type_id_wasm"
            )),
            (n._ts_tree_cursor_current_node_is_named_wasm = Ee(
              "ts_tree_cursor_current_node_is_named_wasm"
            )),
            (n._ts_tree_cursor_current_node_is_missing_wasm = Ee(
              "ts_tree_cursor_current_node_is_missing_wasm"
            )),
            (n._ts_tree_cursor_current_node_id_wasm = Ee(
              "ts_tree_cursor_current_node_id_wasm"
            )),
            (n._ts_tree_cursor_start_position_wasm = Ee(
              "ts_tree_cursor_start_position_wasm"
            )),
            (n._ts_tree_cursor_end_position_wasm = Ee(
              "ts_tree_cursor_end_position_wasm"
            )),
            (n._ts_tree_cursor_start_index_wasm = Ee(
              "ts_tree_cursor_start_index_wasm"
            )),
            (n._ts_tree_cursor_end_index_wasm = Ee(
              "ts_tree_cursor_end_index_wasm"
            )),
            (n._ts_tree_cursor_current_field_id_wasm = Ee(
              "ts_tree_cursor_current_field_id_wasm"
            )),
            (n._ts_tree_cursor_current_node_wasm = Ee(
              "ts_tree_cursor_current_node_wasm"
            )),
            (n._ts_node_symbol_wasm = Ee("ts_node_symbol_wasm")),
            (n._ts_node_child_count_wasm = Ee("ts_node_child_count_wasm")),
            (n._ts_node_named_child_count_wasm = Ee(
              "ts_node_named_child_count_wasm"
            )),
            (n._ts_node_child_wasm = Ee("ts_node_child_wasm")),
            (n._ts_node_named_child_wasm = Ee("ts_node_named_child_wasm")),
            (n._ts_node_child_by_field_id_wasm = Ee(
              "ts_node_child_by_field_id_wasm"
            )),
            (n._ts_node_next_sibling_wasm = Ee("ts_node_next_sibling_wasm")),
            (n._ts_node_prev_sibling_wasm = Ee("ts_node_prev_sibling_wasm")),
            (n._ts_node_next_named_sibling_wasm = Ee(
              "ts_node_next_named_sibling_wasm"
            )),
            (n._ts_node_prev_named_sibling_wasm = Ee(
              "ts_node_prev_named_sibling_wasm"
            )),
            (n._ts_node_parent_wasm = Ee("ts_node_parent_wasm")),
            (n._ts_node_descendant_for_index_wasm = Ee(
              "ts_node_descendant_for_index_wasm"
            )),
            (n._ts_node_named_descendant_for_index_wasm = Ee(
              "ts_node_named_descendant_for_index_wasm"
            )),
            (n._ts_node_descendant_for_position_wasm = Ee(
              "ts_node_descendant_for_position_wasm"
            )),
            (n._ts_node_named_descendant_for_position_wasm = Ee(
              "ts_node_named_descendant_for_position_wasm"
            )),
            (n._ts_node_start_point_wasm = Ee("ts_node_start_point_wasm")),
            (n._ts_node_end_point_wasm = Ee("ts_node_end_point_wasm")),
            (n._ts_node_start_index_wasm = Ee("ts_node_start_index_wasm")),
            (n._ts_node_end_index_wasm = Ee("ts_node_end_index_wasm")),
            (n._ts_node_to_string_wasm = Ee("ts_node_to_string_wasm")),
            (n._ts_node_children_wasm = Ee("ts_node_children_wasm")),
            (n._ts_node_named_children_wasm = Ee(
              "ts_node_named_children_wasm"
            )),
            (n._ts_node_descendants_of_type_wasm = Ee(
              "ts_node_descendants_of_type_wasm"
            )),
            (n._ts_node_is_named_wasm = Ee("ts_node_is_named_wasm")),
            (n._ts_node_has_changes_wasm = Ee("ts_node_has_changes_wasm")),
            (n._ts_node_has_error_wasm = Ee("ts_node_has_error_wasm")),
            (n._ts_node_is_missing_wasm = Ee("ts_node_is_missing_wasm")),
            (n._ts_query_matches_wasm = Ee("ts_query_matches_wasm")),
            (n._ts_query_captures_wasm = Ee("ts_query_captures_wasm")),
            (n.___cxa_atexit = Ee("__cxa_atexit")),
            (n.___errno_location = Ee("__errno_location")),
            (n._fflush = Ee("fflush")));
          var Ct =
            ((n._strlen = Ee("strlen")),
            (n._iswdigit = Ee("iswdigit")),
            (n._iswalpha = Ee("iswalpha")),
            (n._iswlower = Ee("iswlower")),
            (n._memchr = Ee("memchr")),
            (n._towupper = Ee("towupper")),
            (n._sbrk = Ee("sbrk")));
          var Et =
            ((n._emscripten_get_sbrk_ptr = Ee("emscripten_get_sbrk_ptr")),
            (n._setThrew = Ee("setThrew")));
          var Tt = (n._emscripten_stack_set_limits = function () {
            return (Tt = n._emscripten_stack_set_limits =
              n.asm.emscripten_stack_set_limits).apply(null, arguments);
          });
          var St =
            ((n._emscripten_stack_get_free = function () {
              return (n._emscripten_stack_get_free =
                n.asm.emscripten_stack_get_free).apply(null, arguments);
            }),
            (n._emscripten_stack_get_base = function () {
              return (St = n._emscripten_stack_get_base =
                n.asm.emscripten_stack_get_base).apply(null, arguments);
            }));
          var xt = (n._emscripten_stack_get_end = function () {
            return (xt = n._emscripten_stack_get_end =
              n.asm.emscripten_stack_get_end).apply(null, arguments);
          });
          var kt = (n.stackSave = Ee("stackSave"));
          var It = (n.stackRestore = Ee("stackRestore"));
          var At = (n.stackAlloc = Ee("stackAlloc"));
          n.__Znwm = Ee("_Znwm");
          n.__ZdlPv = Ee("_ZdlPv");
          n.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev =
            Ee(
              "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev"
            );
          n.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9__grow_byEmmmmmm =
            Ee(
              "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9__grow_byEmmmmmm"
            );
          n.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6__initEPKcm =
            Ee(
              "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6__initEPKcm"
            );
          n.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm =
            Ee(
              "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm"
            );
          n.__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4copyEPcmm =
            Ee(
              "_ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4copyEPcmm"
            );
          n.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc =
            Ee(
              "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc"
            );
          n.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEED2Ev =
            Ee(
              "_ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEED2Ev"
            );
          n.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE9push_backEw =
            Ee(
              "_ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE9push_backEw"
            );
          n.dynCall_jiji = Ee("dynCall_jiji");
          n._orig$ts_parser_timeout_micros = Ee(
            "orig$ts_parser_timeout_micros"
          );
          n._orig$ts_parser_set_timeout_micros = Ee(
            "orig$ts_parser_set_timeout_micros"
          );
          n.AsciiToString = yt;
          n.stringToUTF16 = mt;
          [
            "run",
            "UTF8ArrayToString",
            "UTF8ToString",
            "stringToUTF8Array",
            "stringToUTF8",
            "lengthBytesUTF8",
            "addOnPreRun",
            "addOnInit",
            "addOnPreMain",
            "addOnExit",
            "addOnPostRun",
            "addRunDependency",
            "removeRunDependency",
            "FS_createFolder",
            "FS_createPath",
            "FS_createDataFile",
            "FS_createPreloadedFile",
            "FS_createLazyFile",
            "FS_createLink",
            "FS_createDevice",
            "FS_unlink",
            "getLEB",
            "getFunctionTables",
            "alignFunctionTables",
            "registerFunctions",
            "prettyPrint",
            "getCompilerSetting",
            "out",
            "err",
            "callMain",
            "abort",
            "keepRuntimeAlive",
            "wasmMemory",
            "stackAlloc",
            "stackSave",
            "stackRestore",
            "getTempRet0",
            "setTempRet0",
            "writeStackCookie",
            "checkStackCookie",
            "ptrToString",
            "zeroMemory",
            "stringToNewUTF8",
            "exitJS",
            "getHeapMax",
            "emscripten_realloc_buffer",
            "ENV",
            "ERRNO_CODES",
            "ERRNO_MESSAGES",
            "setErrNo",
            "inetPton4",
            "inetNtop4",
            "inetPton6",
            "inetNtop6",
            "readSockaddr",
            "writeSockaddr",
            "DNS",
            "getHostByName",
            "Protocols",
            "Sockets",
            "getRandomDevice",
            "warnOnce",
            "traverseStack",
            "UNWIND_CACHE",
            "convertPCtoSourceLocation",
            "readAsmConstArgsArray",
            "readAsmConstArgs",
            "mainThreadEM_ASM",
            "jstoi_q",
            "jstoi_s",
            "getExecutableName",
            "listenOnce",
            "autoResumeAudioContext",
            "dynCallLegacy",
            "getDynCaller",
            "dynCall",
            "handleException",
            "runtimeKeepalivePush",
            "runtimeKeepalivePop",
            "callUserCallback",
            "maybeExit",
            "safeSetTimeout",
            "asmjsMangle",
            "asyncLoad",
            "alignMemory",
            "mmapAlloc",
            "writeI53ToI64",
            "writeI53ToI64Clamped",
            "writeI53ToI64Signaling",
            "writeI53ToU64Clamped",
            "writeI53ToU64Signaling",
            "readI53FromI64",
            "readI53FromU64",
            "convertI32PairToI53",
            "convertI32PairToI53Checked",
            "convertU32PairToI53",
            "getCFunc",
            "ccall",
            "cwrap",
            "uleb128Encode",
            "sigToWasmTypes",
            "generateFuncType",
            "convertJsFunctionToWasm",
            "freeTableIndexes",
            "functionsInTableMap",
            "getEmptyTableSlot",
            "updateTableMap",
            "addFunction",
            "removeFunction",
            "reallyNegative",
            "unSign",
            "strLen",
            "reSign",
            "formatString",
            "setValue",
            "getValue",
            "PATH",
            "PATH_FS",
            "intArrayFromString",
            "intArrayToString",
            "stringToAscii",
            "UTF16Decoder",
            "UTF16ToString",
            "lengthBytesUTF16",
            "UTF32ToString",
            "stringToUTF32",
            "lengthBytesUTF32",
            "allocateUTF8",
            "allocateUTF8OnStack",
            "writeStringToMemory",
            "writeArrayToMemory",
            "writeAsciiToMemory",
            "SYSCALLS",
            "getSocketFromFD",
            "getSocketAddress",
            "JSEvents",
            "registerKeyEventCallback",
            "specialHTMLTargets",
            "maybeCStringToJsString",
            "findEventTarget",
            "findCanvasEventTarget",
            "getBoundingClientRect",
            "fillMouseEventData",
            "registerMouseEventCallback",
            "registerWheelEventCallback",
            "registerUiEventCallback",
            "registerFocusEventCallback",
            "fillDeviceOrientationEventData",
            "registerDeviceOrientationEventCallback",
            "fillDeviceMotionEventData",
            "registerDeviceMotionEventCallback",
            "screenOrientation",
            "fillOrientationChangeEventData",
            "registerOrientationChangeEventCallback",
            "fillFullscreenChangeEventData",
            "registerFullscreenChangeEventCallback",
            "JSEvents_requestFullscreen",
            "JSEvents_resizeCanvasForFullscreen",
            "registerRestoreOldStyle",
            "hideEverythingExceptGivenElement",
            "restoreHiddenElements",
            "setLetterbox",
            "currentFullscreenStrategy",
            "restoreOldWindowedStyle",
            "softFullscreenResizeWebGLRenderTarget",
            "doRequestFullscreen",
            "fillPointerlockChangeEventData",
            "registerPointerlockChangeEventCallback",
            "registerPointerlockErrorEventCallback",
            "requestPointerLock",
            "fillVisibilityChangeEventData",
            "registerVisibilityChangeEventCallback",
            "registerTouchEventCallback",
            "fillGamepadEventData",
            "registerGamepadEventCallback",
            "registerBeforeUnloadEventCallback",
            "fillBatteryEventData",
            "battery",
            "registerBatteryEventCallback",
            "setCanvasElementSize",
            "getCanvasElementSize",
            "demangle",
            "demangleAll",
            "jsStackTrace",
            "stackTrace",
            "ExitStatus",
            "getEnvStrings",
            "checkWasiClock",
            "doReadv",
            "doWritev",
            "GOT",
            "CurrentModuleWeakSymbols",
            "LDSO",
            "getMemory",
            "mergeLibSymbols",
            "loadWebAssemblyModule",
            "loadDynamicLibrary",
            "dlopenInternal",
            "createDyncallWrapper",
            "setImmediateWrapped",
            "clearImmediateWrapped",
            "polyfillSetImmediate",
            "Browser",
            "setMainLoop",
            "wget",
            "tempFixedLengthArray",
            "miniTempWebGLFloatBuffers",
            "heapObjectForWebGLType",
            "heapAccessShiftForWebGLHeap",
            "GL",
            "emscriptenWebGLGet",
            "computeUnpackAlignedImageSize",
            "emscriptenWebGLGetTexPixelData",
            "emscriptenWebGLGetUniform",
            "webglGetUniformLocation",
            "webglPrepareUniformLocationsBeforeFirstUse",
            "webglGetLeftBracePos",
            "emscriptenWebGLGetVertexAttrib",
            "writeGLArray",
            "AL",
            "SDL_unicode",
            "SDL_ttfContext",
            "SDL_audio",
            "SDL",
            "SDL_gfx",
            "GLUT",
            "EGL",
            "GLFW_Window",
            "GLFW",
            "GLEW",
            "IDBStore",
            "runAndAbortIfError",
            "ALLOC_NORMAL",
            "ALLOC_STACK",
            "allocate",
          ].forEach(function (e) {
            if (Object.getOwnPropertyDescriptor(n, e)) {
              Object.defineProperty(n, e, {
                configurable: true,
                get: function () {
                  var t =
                    "'" +
                    e +
                    "' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)";
                  if (S(e)) {
                    t +=
                      ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
                  }
                  ge(t);
                },
              });
            }
          });
          [
            "ptrToString",
            "stringToNewUTF8",
            "setErrNo",
            "inetPton4",
            "inetNtop4",
            "inetPton6",
            "inetNtop6",
            "readSockaddr",
            "writeSockaddr",
            "getHostByName",
            "getRandomDevice",
            "traverseStack",
            "convertPCtoSourceLocation",
            "readAsmConstArgs",
            "mainThreadEM_ASM",
            "jstoi_q",
            "jstoi_s",
            "getExecutableName",
            "listenOnce",
            "autoResumeAudioContext",
            "getDynCaller",
            "runtimeKeepalivePush",
            "runtimeKeepalivePop",
            "callUserCallback",
            "maybeExit",
            "safeSetTimeout",
            "asyncLoad",
            "mmapAlloc",
            "writeI53ToI64",
            "writeI53ToI64Clamped",
            "writeI53ToI64Signaling",
            "writeI53ToU64Clamped",
            "writeI53ToU64Signaling",
            "readI53FromI64",
            "readI53FromU64",
            "convertI32PairToI53",
            "convertU32PairToI53",
            "getCFunc",
            "ccall",
            "cwrap",
            "removeFunction",
            "reallyNegative",
            "strLen",
            "reSign",
            "formatString",
            "intArrayFromString",
            "intArrayToString",
            "stringToAscii",
            "UTF16ToString",
            "lengthBytesUTF16",
            "UTF32ToString",
            "stringToUTF32",
            "lengthBytesUTF32",
            "allocateUTF8",
            "writeStringToMemory",
            "writeArrayToMemory",
            "writeAsciiToMemory",
            "getSocketFromFD",
            "getSocketAddress",
            "registerKeyEventCallback",
            "maybeCStringToJsString",
            "findEventTarget",
            "findCanvasEventTarget",
            "getBoundingClientRect",
            "fillMouseEventData",
            "registerMouseEventCallback",
            "registerWheelEventCallback",
            "registerUiEventCallback",
            "registerFocusEventCallback",
            "fillDeviceOrientationEventData",
            "registerDeviceOrientationEventCallback",
            "fillDeviceMotionEventData",
            "registerDeviceMotionEventCallback",
            "screenOrientation",
            "fillOrientationChangeEventData",
            "registerOrientationChangeEventCallback",
            "fillFullscreenChangeEventData",
            "registerFullscreenChangeEventCallback",
            "JSEvents_requestFullscreen",
            "JSEvents_resizeCanvasForFullscreen",
            "registerRestoreOldStyle",
            "hideEverythingExceptGivenElement",
            "restoreHiddenElements",
            "setLetterbox",
            "softFullscreenResizeWebGLRenderTarget",
            "doRequestFullscreen",
            "fillPointerlockChangeEventData",
            "registerPointerlockChangeEventCallback",
            "registerPointerlockErrorEventCallback",
            "requestPointerLock",
            "fillVisibilityChangeEventData",
            "registerVisibilityChangeEventCallback",
            "registerTouchEventCallback",
            "fillGamepadEventData",
            "registerGamepadEventCallback",
            "registerBeforeUnloadEventCallback",
            "fillBatteryEventData",
            "battery",
            "registerBatteryEventCallback",
            "setCanvasElementSize",
            "getCanvasElementSize",
            "demangle",
            "demangleAll",
            "jsStackTrace",
            "stackTrace",
            "getEnvStrings",
            "checkWasiClock",
            "doReadv",
            "dlopenInternal",
            "createDyncallWrapper",
            "setImmediateWrapped",
            "clearImmediateWrapped",
            "polyfillSetImmediate",
            "setMainLoop",
            "heapObjectForWebGLType",
            "heapAccessShiftForWebGLHeap",
            "emscriptenWebGLGet",
            "computeUnpackAlignedImageSize",
            "emscriptenWebGLGetTexPixelData",
            "emscriptenWebGLGetUniform",
            "webglGetUniformLocation",
            "webglPrepareUniformLocationsBeforeFirstUse",
            "webglGetLeftBracePos",
            "emscriptenWebGLGetVertexAttrib",
            "writeGLArray",
            "SDL_unicode",
            "SDL_ttfContext",
            "SDL_audio",
            "GLFW_Window",
            "runAndAbortIfError",
            "ALLOC_NORMAL",
            "ALLOC_STACK",
            "allocate",
          ].forEach(function (e) {
            if (
              "undefined" == typeof globalThis ||
              Object.getOwnPropertyDescriptor(globalThis, e)
            ) {
              Object.defineProperty(globalThis, e, {
                configurable: true,
                get: function () {
                  var t =
                    "`" +
                    e +
                    "` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line";
                  var r = e;
                  if (r.startsWith("_")) {
                    r = "$" + e;
                  }
                  t += " (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE=" + r + ")";
                  if (S(e)) {
                    t +=
                      ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
                  }
                  Xe(t);
                },
              });
            }
          });
          de = function e() {
            if (vt) {
              Rt();
            }
            if (vt) {
              de = e;
            }
          };
          var Pt = false;
          function Rt(e) {
            function t() {
              if (vt) {
                vt = true;
                n.calledRun = true;
                if (M) {
                  B(!ae);
                  ae = true;
                  te();
                  Ae(se);
                  Ae(ne);
                  te();
                  Ae(ie);
                  if (n.onRuntimeInitialized) {
                    n.onRuntimeInitialized();
                  }
                  if (Nt) {
                    (function (e) {
                      B(
                        0 == le,
                        'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])'
                      );
                      B(
                        0 == re.length,
                        "cannot call main when preRun functions remain to be called"
                      );
                      var t = n._main;
                      if (t) {
                        (e = e || []).unshift(c);
                        var r = e.length;
                        var i = At(4 * (r + 1));
                        var o = i >> 2;
                        e.forEach((e) => {
                          R(
                            4 * o++,
                            (function (e) {
                              var t = J(e) + 1;
                              var r = At(t);
                              G(e, j, r, t);
                              return r;
                            })(e),
                            4
                          );
                        });
                        R(4 * o, 0, 4);
                        try {
                          var s = t(r, i);
                          dt(s, true);
                        } catch (e) {
                          return (function (e) {
                            if (e instanceof Se || "unwind" == e) return D;
                            l(1, e);
                          })(e);
                        }
                      }
                    })(e);
                  }
                  (function () {
                    te();
                    if (n.postRun)
                      for (
                        "function" == typeof n.postRun &&
                        (n.postRun = [n.postRun]);
                        n.postRun.length;

                      )
                        (e = n.postRun.shift()), oe.unshift(e);
                    var e;
                    Ae(oe);
                  })();
                }
              }
            }
            var r;
            e = e || a;
            if (le > 0) {
              Tt(5255488, 12608);
              B(0 == (3 & (r = xt())));
              R(4 * (r >> 2), 34821223, 4);
              R(4 * ((r + 4) >> 2), 2310721022, 4);
              if (
                !Pt &&
                (k.length
                  ? (he("preloadDylibs"),
                    k
                      .reduce(function (e, t) {
                        return e.then(function () {
                          return Qe(t, {
                            loadAsync: true,
                            global: true,
                            nodelete: true,
                            allowUndefined: true,
                          });
                        });
                      }, Promise.resolve())
                      .then(function () {
                        Je();
                        fe("preloadDylibs");
                      }))
                  : Je(),
                (Pt = true),
                le > 0)
              ) {
                (function () {
                  if (n.preRun)
                    for (
                      "function" == typeof n.preRun && (n.preRun = [n.preRun]);
                      n.preRun.length;

                    ) {
                      e = n.preRun.shift();
                      re.unshift(e);
                    }
                  var e;
                  Ae(re);
                })();
                if (le > 0) {
                  if (n.setStatus) {
                    n.setStatus("Running...");
                    setTimeout(function () {
                      setTimeout(function () {
                        n.setStatus("");
                      }, 1);
                      t();
                    }, 1);
                  } else {
                    t();
                  }
                  te();
                }
              }
            }
          }
          if (n.preInit)
            for (
              "function" == typeof n.preInit && (n.preInit = [n.preInit]);
              n.preInit.length > 0;

            )
              n.preInit.pop()();
          var Nt = true;
          if (n.noInitialRun) {
            Nt = false;
          }
          Rt();
          const Ot = n;
          const Lt = {};
          const Dt = 20;
          const Mt = {
            row: 0,
            column: 0,
          };
          const Bt = /[\w-.]*/g;
          const Ft = /^_?tree_sitter_\w+/;
          var jt;
          var Ut;
          var $t;
          var qt;
          var Ht;
          class Vt {
            static init() {
              $t = Ot._ts_init();
              jt = Re($t, "i32");
              Ut = Re($t + 4, "i32");
            }
            initialize() {
              Ot._ts_parser_new_wasm();
              this[0] = Re($t, "i32");
              this[1] = Re($t + 4, "i32");
            }
            delete() {
              Ot._ts_parser_delete(this[0]);
              Ot._free(this[1]);
              this[0] = 0;
              this[1] = 0;
            }
            setLanguage(e) {
              let t;
              if (e) {
                if (e.constructor !== Gt)
                  throw new Error("Argument must be a Language");
                {
                  t = e[0];
                  const r = Ot._ts_language_version(t);
                  if (r < Ut || jt < r)
                    throw new Error(
                      `Incompatible language version ${r}. Compatibility range ${Ut} through ${jt}.`
                    );
                }
              } else {
                t = 0;
                e = null;
              }
              this.language = e;
              Ot._ts_parser_set_language(this[0], t);
              return this;
            }
            getLanguage() {
              return this.language;
            }
            parse(e, t, r) {
              if ("string" == typeof e) qt = (t, r, n) => e.slice(t, n);
              else {
                if ("function" != typeof e)
                  throw new Error("Argument must be a string or a function");
                qt = e;
              }
              if (this.logCallback) {
                Ht = this.logCallback;
                Ot._ts_parser_enable_logger_wasm(this[0], 1);
              } else {
                Ht = null;
                Ot._ts_parser_enable_logger_wasm(this[0], 0);
              }
              let n = 0;
              let i = 0;
              if (r && r.includedRanges) {
                n = r.includedRanges.length;
                i = Ot._calloc(n, 24);
                let e = i;
                for (let t = 0; t < n; t++) {
                  sr(e, r.includedRanges[t]);
                  e += 24;
                }
              }
              const o = Ot._ts_parser_parse_wasm(
                this[0],
                this[1],
                t ? t[0] : 0,
                i,
                n
              );
              if (!o)
                throw ((qt = null), (Ht = null), new Error("Parsing failed"));
              const s = new zt(Lt, o, this.language, qt);
              qt = null;
              Ht = null;
              return s;
            }
            reset() {
              Ot._ts_parser_reset(this[0]);
            }
            setTimeoutMicros(e) {
              Ot._ts_parser_set_timeout_micros(this[0], e);
            }
            getTimeoutMicros() {
              return Ot._ts_parser_timeout_micros(this[0]);
            }
            setLogger(e) {
              if (e) {
                if ("function" != typeof e)
                  throw new Error("Logger callback must be a function");
              } else e = null;
              this.logCallback = e;
              return this;
            }
            getLogger() {
              return this.logCallback;
            }
          }
          class zt {
            constructor(e, t, r, n) {
              Xt(e);
              this[0] = t;
              this.language = r;
              this.textCallback = n;
            }
            copy() {
              const e = Ot._ts_tree_copy(this[0]);
              return new zt(Lt, e, this.language, this.textCallback);
            }
            delete() {
              Ot._ts_tree_delete(this[0]);
              this[0] = 0;
            }
            edit(e) {
              !(function (e) {
                let t = $t;
                ir(t, e.startPosition);
                t += 8;
                ir(t, e.oldEndPosition);
                t += 8;
                ir(t, e.newEndPosition);
                t += 8;
                Ye(t, e.startIndex, "i32");
                t += 4;
                Ye(t, e.oldEndIndex, "i32");
                t += 4;
                Ye(t, e.newEndIndex, "i32");
                t += 4;
              })(e);
              Ot._ts_tree_edit_wasm(this[0]);
            }
            get rootNode() {
              Ot._ts_tree_root_node_wasm(this[0]);
              return tr(this);
            }
            getLanguage() {
              return this.language;
            }
            walk() {
              return this.rootNode.walk();
            }
            getChangedRanges(e) {
              if (e.constructor !== zt)
                throw new TypeError("Argument must be a Tree");
              Ot._ts_tree_get_changed_ranges_wasm(this[0], e[0]);
              const t = Re($t, "i32");
              const r = Re($t + 4, "i32");
              const n = new Array(t);
              if (t > 0) {
                let e = r;
                for (let r = 0; r < t; r++) {
                  n[r] = ar(e);
                  e += 24;
                }
                Ot._free(r);
              }
              return n;
            }
          }
          class Kt {
            constructor(e, t) {
              Xt(e);
              this.tree = t;
            }
            get typeId() {
              er(this);
              return Ot._ts_node_symbol_wasm(this.tree[0]);
            }
            get type() {
              return this.tree.language.types[this.typeId] || "ERROR";
            }
            get endPosition() {
              er(this);
              Ot._ts_node_end_point_wasm(this.tree[0]);
              return or($t);
            }
            get endIndex() {
              er(this);
              return Ot._ts_node_end_index_wasm(this.tree[0]);
            }
            get text() {
              return Jt(this.tree, this.startIndex, this.endIndex);
            }
            isNamed() {
              er(this);
              return 1 === Ot._ts_node_is_named_wasm(this.tree[0]);
            }
            hasError() {
              er(this);
              return 1 === Ot._ts_node_has_error_wasm(this.tree[0]);
            }
            hasChanges() {
              er(this);
              return 1 === Ot._ts_node_has_changes_wasm(this.tree[0]);
            }
            isMissing() {
              er(this);
              return 1 === Ot._ts_node_is_missing_wasm(this.tree[0]);
            }
            equals(e) {
              return this.id === e.id;
            }
            child(e) {
              er(this);
              Ot._ts_node_child_wasm(this.tree[0], e);
              return tr(this.tree);
            }
            namedChild(e) {
              er(this);
              Ot._ts_node_named_child_wasm(this.tree[0], e);
              return tr(this.tree);
            }
            childForFieldId(e) {
              er(this);
              Ot._ts_node_child_by_field_id_wasm(this.tree[0], e);
              return tr(this.tree);
            }
            childForFieldName(e) {
              const t = this.tree.language.fields.indexOf(e);
              if (-1 !== t) return this.childForFieldId(t);
            }
            get childCount() {
              er(this);
              return Ot._ts_node_child_count_wasm(this.tree[0]);
            }
            get namedChildCount() {
              er(this);
              return Ot._ts_node_named_child_count_wasm(this.tree[0]);
            }
            get firstChild() {
              return this.child(0);
            }
            get firstNamedChild() {
              return this.namedChild(0);
            }
            get lastChild() {
              return this.child(this.childCount - 1);
            }
            get lastNamedChild() {
              return this.namedChild(this.namedChildCount - 1);
            }
            get children() {
              if (!this._children) {
                er(this);
                Ot._ts_node_children_wasm(this.tree[0]);
                const e = Re($t, "i32");
                const t = Re($t + 4, "i32");
                this._children = new Array(e);
                if (e > 0) {
                  let r = t;
                  for (let t = 0; t < e; t++)
                    (this._children[t] = tr(this.tree, r)), (r += Dt);
                  Ot._free(t);
                }
              }
              return this._children;
            }
            get namedChildren() {
              if (!this._namedChildren) {
                er(this);
                Ot._ts_node_named_children_wasm(this.tree[0]);
                const e = Re($t, "i32");
                const t = Re($t + 4, "i32");
                this._namedChildren = new Array(e);
                if (e > 0) {
                  let r = t;
                  for (let t = 0; t < e; t++)
                    (this._namedChildren[t] = tr(this.tree, r)), (r += Dt);
                  Ot._free(t);
                }
              }
              return this._namedChildren;
            }
            descendantsOfType(e, t, r) {
              if (Array.isArray(e)) {
                e = [e];
              }
              if (t) {
                t = Mt;
              }
              if (r) {
                r = Mt;
              }
              const n = [];
              const i = this.tree.language.types;
              for (
                (function () {
                  let t = 0;
                  let r = i.length;
                })();
                t < r;
                t++
              )
                if (e.includes(i[t])) {
                  n.push(t);
                }
              const o = Ot._malloc(4 * n.length);
              for (
                (function () {
                  let e = 0;
                  let t = n.length;
                })();
                e < t;
                e++
              )
                Ye(o + 4 * e, n[e], "i32");
              er(this);
              Ot._ts_node_descendants_of_type_wasm(
                this.tree[0],
                o,
                n.length,
                t.row,
                t.column,
                r.row,
                r.column
              );
              const s = Re($t, "i32");
              const a = Re($t + 4, "i32");
              const c = new Array(s);
              if (s > 0) {
                let e = a;
                for (let t = 0; t < s; t++) {
                  c[t] = tr(this.tree, e);
                  e += Dt;
                }
              }
              Ot._free(a);
              Ot._free(o);
              return c;
            }
            get nextSibling() {
              er(this);
              Ot._ts_node_next_sibling_wasm(this.tree[0]);
              return tr(this.tree);
            }
            get previousSibling() {
              er(this);
              Ot._ts_node_prev_sibling_wasm(this.tree[0]);
              return tr(this.tree);
            }
            get nextNamedSibling() {
              er(this);
              Ot._ts_node_next_named_sibling_wasm(this.tree[0]);
              return tr(this.tree);
            }
            get previousNamedSibling() {
              er(this);
              Ot._ts_node_prev_named_sibling_wasm(this.tree[0]);
              return tr(this.tree);
            }
            get parent() {
              er(this);
              Ot._ts_node_parent_wasm(this.tree[0]);
              return tr(this.tree);
            }
            descendantForIndex(e, t = e) {
              if ("number" != typeof e || "number" != typeof t)
                throw new Error("Arguments must be numbers");
              er(this);
              let r = $t + Dt;
              Ye(r, e, "i32");
              Ye(r + 4, t, "i32");
              Ot._ts_node_descendant_for_index_wasm(this.tree[0]);
              return tr(this.tree);
            }
            namedDescendantForIndex(e, t = e) {
              if ("number" != typeof e || "number" != typeof t)
                throw new Error("Arguments must be numbers");
              er(this);
              let r = $t + Dt;
              Ye(r, e, "i32");
              Ye(r + 4, t, "i32");
              Ot._ts_node_named_descendant_for_index_wasm(this.tree[0]);
              return tr(this.tree);
            }
            descendantForPosition(e, t = e) {
              if (!Zt(e) || !Zt(t))
                throw new Error("Arguments must be {row, column} objects");
              er(this);
              let r = $t + Dt;
              ir(r, e);
              ir(r + 8, t);
              Ot._ts_node_descendant_for_position_wasm(this.tree[0]);
              return tr(this.tree);
            }
            namedDescendantForPosition(e, t = e) {
              if (!Zt(e) || !Zt(t))
                throw new Error("Arguments must be {row, column} objects");
              er(this);
              let r = $t + Dt;
              ir(r, e);
              ir(r + 8, t);
              Ot._ts_node_named_descendant_for_position_wasm(this.tree[0]);
              return tr(this.tree);
            }
            walk() {
              er(this);
              Ot._ts_tree_cursor_new_wasm(this.tree[0]);
              return new Wt(Lt, this.tree);
            }
            toString() {
              er(this);
              const e = Ot._ts_node_to_string_wasm(this.tree[0]);
              const t = yt(e);
              Ot._free(e);
              return t;
            }
          }
          class Wt {
            constructor(e, t) {
              Xt(e);
              this.tree = t;
              nr(this);
            }
            delete() {
              rr(this);
              Ot._ts_tree_cursor_delete_wasm(this.tree[0]);
              this[0] = this[1] = this[2] = 0;
            }
            reset(e) {
              er(e);
              rr(this, $t + Dt);
              Ot._ts_tree_cursor_reset_wasm(this.tree[0]);
              nr(this);
            }
            get nodeType() {
              return this.tree.language.types[this.nodeTypeId] || "ERROR";
            }
            get nodeTypeId() {
              rr(this);
              return Ot._ts_tree_cursor_current_node_type_id_wasm(this.tree[0]);
            }
            get nodeId() {
              rr(this);
              return Ot._ts_tree_cursor_current_node_id_wasm(this.tree[0]);
            }
            get nodeIsNamed() {
              rr(this);
              return (
                1 ===
                Ot._ts_tree_cursor_current_node_is_named_wasm(this.tree[0])
              );
            }
            get nodeIsMissing() {
              rr(this);
              return (
                1 ===
                Ot._ts_tree_cursor_current_node_is_missing_wasm(this.tree[0])
              );
            }
            get nodeText() {
              rr(this);
              const e = Ot._ts_tree_cursor_start_index_wasm(this.tree[0]);
              const t = Ot._ts_tree_cursor_end_index_wasm(this.tree[0]);
              return Jt(this.tree, e, t);
            }
            get startPosition() {
              rr(this);
              Ot._ts_tree_cursor_start_position_wasm(this.tree[0]);
              return or($t);
            }
            get endPosition() {
              rr(this);
              Ot._ts_tree_cursor_end_position_wasm(this.tree[0]);
              return or($t);
            }
            get startIndex() {
              rr(this);
              return Ot._ts_tree_cursor_start_index_wasm(this.tree[0]);
            }
            get endIndex() {
              rr(this);
              return Ot._ts_tree_cursor_end_index_wasm(this.tree[0]);
            }
            currentNode() {
              rr(this);
              Ot._ts_tree_cursor_current_node_wasm(this.tree[0]);
              return tr(this.tree);
            }
            currentFieldId() {
              rr(this);
              return Ot._ts_tree_cursor_current_field_id_wasm(this.tree[0]);
            }
            currentFieldName() {
              return this.tree.language.fields[this.currentFieldId()];
            }
            gotoFirstChild() {
              rr(this);
              const e = Ot._ts_tree_cursor_goto_first_child_wasm(this.tree[0]);
              nr(this);
              return 1 === e;
            }
            gotoNextSibling() {
              rr(this);
              const e = Ot._ts_tree_cursor_goto_next_sibling_wasm(this.tree[0]);
              nr(this);
              return 1 === e;
            }
            gotoParent() {
              rr(this);
              const e = Ot._ts_tree_cursor_goto_parent_wasm(this.tree[0]);
              nr(this);
              return 1 === e;
            }
          }
          class Gt {
            constructor(e, t) {
              var _this = this;
              Xt(e);
              this[0] = t;
              this.types = new Array(Ot._ts_language_symbol_count(this[0]));
              for (
                (function () {
                  let e = 0;
                  let t = _this.types.length;
                })();
                e < t;
                e++
              )
                if (Ot._ts_language_symbol_type(this[0], e) < 2) {
                  this.types[e] = W(Ot._ts_language_symbol_name(this[0], e));
                }
              this.fields = new Array(Ot._ts_language_field_count(this[0]) + 1);
              for (
                (function () {
                  let e = 0;
                  let t = _this.fields.length;
                })();
                e < t;
                e++
              ) {
                const t = Ot._ts_language_field_name_for_id(this[0], e);
                this.fields[e] = 0 !== t ? W(t) : null;
              }
            }
            get version() {
              return Ot._ts_language_version(this[0]);
            }
            get fieldCount() {
              return this.fields.length - 1;
            }
            fieldIdForName(e) {
              const t = this.fields.indexOf(e);
              return -1 !== t ? t : null;
            }
            fieldNameForId(e) {
              return this.fields[e] || null;
            }
            idForNodeType(e, t) {
              const r = J(e);
              const n = Ot._malloc(r + 1);
              Q(e, n, r + 1);
              const i = Ot._ts_language_symbol_for_name(this[0], n, r, t);
              Ot._free(n);
              return i || null;
            }
            get nodeTypeCount() {
              return Ot._ts_language_symbol_count(this[0]);
            }
            nodeTypeForId(e) {
              const t = Ot._ts_language_symbol_name(this[0], e);
              return t ? W(t) : null;
            }
            nodeTypeIsNamed(e) {
              return !!Ot._ts_language_type_is_named_wasm(this[0], e);
            }
            nodeTypeIsVisible(e) {
              return !!Ot._ts_language_type_is_visible_wasm(this[0], e);
            }
            query(e) {
              const t = J(e);
              const r = Ot._malloc(t + 1);
              Q(e, r, t + 1);
              const n = Ot._ts_query_new(this[0], r, t, $t, $t + 4);
              if (!n) {
                const t = Re($t + 4, "i32");
                const n = W(r, Re($t, "i32")).length;
                const i = e.substr(n, 100).split("\n")[0];
                let o;
                let s = i.match(Bt)[0];
                switch (t) {
                  case 2:
                    o = new RangeError(`Bad node name '${s}'`);
                    break;
                  case 3:
                    o = new RangeError(`Bad field name '${s}'`);
                    break;
                  case 4:
                    o = new RangeError(`Bad capture name @${s}`);
                    break;
                  case 5:
                    o = new TypeError(
                      `Bad pattern structure at offset ${n}: '${i}'...`
                    );
                    s = "";
                    break;
                  default:
                    o = new SyntaxError(`Bad syntax at offset ${n}: '${i}'...`);
                    s = "";
                }
                throw ((o.index = n), (o.length = s.length), Ot._free(r), o);
              }
              const i = Ot._ts_query_string_count(n);
              const o = Ot._ts_query_capture_count(n);
              const s = Ot._ts_query_pattern_count(n);
              const a = new Array(o);
              const c = new Array(i);
              for (let e = 0; e < o; e++) {
                const t = Ot._ts_query_capture_name_for_id(n, e, $t);
                const r = Re($t, "i32");
                a[e] = W(t, r);
              }
              for (let e = 0; e < i; e++) {
                const t = Ot._ts_query_string_value_for_id(n, e, $t);
                const r = Re($t, "i32");
                c[e] = W(t, r);
              }
              const l = new Array(s);
              const u = new Array(s);
              const d = new Array(s);
              const p = new Array(s);
              const h = new Array(s);
              for (let e = 0; e < s; e++) {
                const t = Ot._ts_query_predicates_for_pattern(n, e, $t);
                const r = Re($t, "i32");
                p[e] = [];
                h[e] = [];
                const i = [];
                let o = t;
                for (let t = 0; t < r; t++) {
                  const t = Re(o, "i32");
                  o += 4;
                  const r = Re(o, "i32");
                  o += 4;
                  if (1 === t)
                    i.push({
                      type: "capture",
                      name: a[r],
                    });
                  else if (2 === t)
                    i.push({
                      type: "string",
                      value: c[r],
                    });
                  else if (i.length > 0) {
                    if ("string" !== i[0].type)
                      throw new Error(
                        "Predicates must begin with a literal value"
                      );
                    const t = i[0].value;
                    let r = !0;
                    switch (t) {
                      case "not-eq?":
                        r = !1;
                      case "eq?":
                        if (3 !== i.length)
                          throw new Error(
                            "Wrong number of arguments to `#eq?` predicate. Expected 2, got " +
                              (i.length - 1)
                          );
                        if ("capture" !== i[1].type)
                          throw new Error(
                            `First argument of \`#eq?\` predicate must be a capture. Got "${i[1].value}"`
                          );
                        if ("capture" === i[2].type) {
                          const t = i[1].name,
                            n = i[2].name;
                          h[e].push(function (e) {
                            let i, o;
                            for (const r of e)
                              r.name === t && (i = r.node),
                                r.name === n && (o = r.node);
                            return (
                              void 0 === i ||
                              void 0 === o ||
                              (i.text === o.text) === r
                            );
                          });
                        } else {
                          const t = i[1].name,
                            n = i[2].value;
                          h[e].push(function (e) {
                            for (const i of e)
                              if (i.name === t)
                                return (i.node.text === n) === r;
                            return !0;
                          });
                        }
                        break;
                      case "not-match?":
                        r = !1;
                      case "match?":
                        if (3 !== i.length)
                          throw new Error(
                            `Wrong number of arguments to \`#match?\` predicate. Expected 2, got ${
                              i.length - 1
                            }.`
                          );
                        if ("capture" !== i[1].type)
                          throw new Error(
                            `First argument of \`#match?\` predicate must be a capture. Got "${i[1].value}".`
                          );
                        if ("string" !== i[2].type)
                          throw new Error(
                            `Second argument of \`#match?\` predicate must be a string. Got @${i[2].value}.`
                          );
                        const n = i[1].name,
                          o = new RegExp(i[2].value);
                        h[e].push(function (e) {
                          for (const t of e)
                            if (t.name === n) return o.test(t.node.text) === r;
                          return !0;
                        });
                        break;
                      case "set!":
                        if (i.length < 2 || i.length > 3)
                          throw new Error(
                            `Wrong number of arguments to \`#set!\` predicate. Expected 1 or 2. Got ${
                              i.length - 1
                            }.`
                          );
                        if (i.some((e) => "string" !== e.type))
                          throw new Error(
                            'Arguments to `#set!` predicate must be a strings.".'
                          );
                        l[e] || (l[e] = {}),
                          (l[e][i[1].value] = i[2] ? i[2].value : null);
                        break;
                      case "is?":
                      case "is-not?":
                        if (i.length < 2 || i.length > 3)
                          throw new Error(
                            `Wrong number of arguments to \`#${t}\` predicate. Expected 1 or 2. Got ${
                              i.length - 1
                            }.`
                          );
                        if (i.some((e) => "string" !== e.type))
                          throw new Error(
                            `Arguments to \`#${t}\` predicate must be a strings.".`
                          );
                        const s = "is?" === t ? u : d;
                        s[e] || (s[e] = {}),
                          (s[e][i[1].value] = i[2] ? i[2].value : null);
                        break;
                      default:
                        p[e].push({
                          operator: t,
                          operands: i.slice(1),
                        });
                    }
                    i.length = 0;
                  }
                }
                Object.freeze(l[e]);
                Object.freeze(u[e]);
                Object.freeze(d[e]);
              }
              Ot._free(r);
              return new Qt(
                Lt,
                n,
                a,
                h,
                p,
                Object.freeze(l),
                Object.freeze(u),
                Object.freeze(d)
              );
            }
            static load(e) {
              let t;
              if (e instanceof Uint8Array) t = Promise.resolve(e);
              else {
                const n = e;
                if (
                  "undefined" != typeof process &&
                  process.versions &&
                  process.versions.node
                ) {
                  const M_fs = require("fs");
                  t = Promise.resolve(M_fs.readFileSync(n));
                } else
                  t = fetch(n).then((e) =>
                    e.arrayBuffer().then((t) => {
                      if (e.ok) return new Uint8Array(t);
                      {
                        const r = new TextDecoder("utf-8").decode(t);
                        throw new Error(
                          `Language.load failed with status ${e.status}.\n\n${r}`
                        );
                      }
                    })
                  );
              }
              const n =
                "function" == typeof loadSideModule ? loadSideModule : Ge;
              return t
                .then((e) =>
                  n(e, {
                    loadAsync: true,
                  })
                )
                .then((e) => {
                  const t = Object.keys(e);
                  const r = t.find(
                    (e) => Ft.test(e) && !e.includes("external_scanner_")
                  );
                  if (r) {
                    console.log(
                      `Couldn't find language function in WASM file. Symbols:\n${JSON.stringify(
                        t,
                        null,
                        2
                      )}`
                    );
                  }
                  const n = e[r]();
                  return new Gt(Lt, n);
                });
            }
          }
          class Qt {
            constructor(e, t, r, n, i, o, s, a) {
              Xt(e);
              this[0] = t;
              this.captureNames = r;
              this.textPredicates = n;
              this.predicates = i;
              this.setProperties = o;
              this.assertedProperties = s;
              this.refutedProperties = a;
              this.exceededMatchLimit = false;
            }
            delete() {
              Ot._ts_query_delete(this[0]);
              this[0] = 0;
            }
            matches(e, t, r, n) {
              if (t) {
                t = Mt;
              }
              if (r) {
                r = Mt;
              }
              if (n) {
                n = {};
              }
              let i = n.matchLimit;
              if (undefined === i) i = 0;
              else if ("number" != typeof i)
                throw new Error("Arguments must be numbers");
              er(e);
              Ot._ts_query_matches_wasm(
                this[0],
                e.tree[0],
                t.row,
                t.column,
                r.row,
                r.column,
                i
              );
              const o = Re($t, "i32");
              const s = Re($t + 4, "i32");
              const a = Re($t + 8, "i32");
              const c = new Array(o);
              this.exceededMatchLimit = !!a;
              let l = 0;
              let u = s;
              for (let t = 0; t < o; t++) {
                const r = Re(u, "i32");
                u += 4;
                const n = Re(u, "i32");
                u += 4;
                const i = new Array(n);
                u = Yt(this, e.tree, u, i);
                if (this.textPredicates[r].every((e) => e(i))) {
                  c[l++] = {
                    pattern: r,
                    captures: i,
                  };
                  const e = this.setProperties[r];
                  e && (c[t].setProperties = e);
                  const n = this.assertedProperties[r];
                  n && (c[t].assertedProperties = n);
                  const o = this.refutedProperties[r];
                  o && (c[t].refutedProperties = o);
                }
              }
              c.length = l;
              Ot._free(s);
              return c;
            }
            captures(e, t, r, n) {
              if (t) {
                t = Mt;
              }
              if (r) {
                r = Mt;
              }
              if (n) {
                n = {};
              }
              let i = n.matchLimit;
              if (undefined === i) i = 0;
              else if ("number" != typeof i)
                throw new Error("Arguments must be numbers");
              er(e);
              Ot._ts_query_captures_wasm(
                this[0],
                e.tree[0],
                t.row,
                t.column,
                r.row,
                r.column,
                i
              );
              const o = Re($t, "i32");
              const s = Re($t + 4, "i32");
              const a = Re($t + 8, "i32");
              const c = [];
              this.exceededMatchLimit = !!a;
              const l = [];
              let u = s;
              for (let t = 0; t < o; t++) {
                const t = Re(u, "i32");
                u += 4;
                const r = Re(u, "i32");
                u += 4;
                const n = Re(u, "i32");
                u += 4;
                l.length = r;
                u = Yt(this, e.tree, u, l);
                if (this.textPredicates[t].every((e) => e(l))) {
                  const e = l[n],
                    r = this.setProperties[t];
                  r && (e.setProperties = r);
                  const i = this.assertedProperties[t];
                  i && (e.assertedProperties = i);
                  const o = this.refutedProperties[t];
                  o && (e.refutedProperties = o), c.push(e);
                }
              }
              Ot._free(s);
              return c;
            }
            predicatesForPattern(e) {
              return this.predicates[e];
            }
            didExceedMatchLimit() {
              return this.exceededMatchLimit;
            }
          }
          function Jt(e, t, r) {
            const n = r - t;
            let i = e.textCallback(t, null, r);
            for (t += i.length; t < r; ) {
              const n = e.textCallback(t, null, r);
              if (!(n && n.length > 0)) break;
              t += n.length;
              i += n;
            }
            if (t > r) {
              i = i.slice(0, n);
            }
            return i;
          }
          function Yt(e, t, r, n) {
            for (
              (function () {
                let i = 0;
                let o = n.length;
              })();
              i < o;
              i++
            ) {
              const o = Re(r, "i32");
              const s = tr(t, (r += 4));
              r += Dt;
              n[i] = {
                name: e.captureNames[o],
                node: s,
              };
            }
            return r;
          }
          function Xt(e) {
            if (e !== Lt) throw new Error("Illegal constructor");
          }
          function Zt(e) {
            return e && "number" == typeof e.row && "number" == typeof e.column;
          }
          function er(e) {
            let t = $t;
            Ye(t, e.id, "i32");
            t += 4;
            Ye(t, e.startIndex, "i32");
            t += 4;
            Ye(t, e.startPosition.row, "i32");
            t += 4;
            Ye(t, e.startPosition.column, "i32");
            t += 4;
            Ye(t, e[0], "i32");
          }
          function tr(e, t = $t) {
            const r = Re(t, "i32");
            if (0 === r) return null;
            const n = Re((t += 4), "i32");
            const i = Re((t += 4), "i32");
            const o = Re((t += 4), "i32");
            const s = Re((t += 4), "i32");
            const a = new Kt(Lt, e);
            a.id = r;
            a.startIndex = n;
            a.startPosition = {
              row: i,
              column: o,
            };
            a[0] = s;
            return a;
          }
          function rr(e, t = $t) {
            Ye(t + 0, e[0], "i32");
            Ye(t + 4, e[1], "i32");
            Ye(t + 8, e[2], "i32");
          }
          function nr(e) {
            e[0] = Re($t + 0, "i32");
            e[1] = Re($t + 4, "i32");
            e[2] = Re($t + 8, "i32");
          }
          function ir(e, t) {
            Ye(e, t.row, "i32");
            Ye(e + 4, t.column, "i32");
          }
          function or(e) {
            return {
              row: Re(e, "i32"),
              column: Re(e + 4, "i32"),
            };
          }
          function sr(e, t) {
            ir(e, t.startPosition);
            ir((e += 8), t.endPosition);
            Ye((e += 8), t.startIndex, "i32");
            Ye((e += 4), t.endIndex, "i32");
            e += 4;
          }
          function ar(e) {
            const t = {};
            t.startPosition = or(e);
            e += 8;
            t.endPosition = or(e);
            e += 8;
            t.startIndex = Re(e, "i32");
            e += 4;
            t.endIndex = Re(e, "i32");
            return t;
          }
          for (const e of Object.getOwnPropertyNames(Vt.prototype))
            Object.defineProperty(o.prototype, e, {
              value: Vt.prototype[e],
              enumerable: false,
              writable: false,
            });
          o.Language = Gt;
          n.onRuntimeInitialized = () => {
            Vt.init();
            t();
          };
        })))
      );
    }
  }
  return o;
})();
module.exports = i;
