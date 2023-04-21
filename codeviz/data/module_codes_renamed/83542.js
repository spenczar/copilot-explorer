Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getTokenizer = exports.TokenizerName = undefined;
const M_fs = require("fs");
const M_path = require("path");
const M_util = require("util");
const s = (e, t) => Array.from(Array(t).keys()).slice(e);
const a = (e) => e.charCodeAt(0);
const c = new M_util.TextDecoder("utf-8");
const l = (e) => c.decode(new Uint8Array(e));
function u(e) {
  const t = new Set();
  let r = e[0];
  for (let n = 1; n < e.length; n++) {
    const i = e[n];
    t.add([r, i]);
    r = i;
  }
  return t;
}
const d =
  /'s|'t|'re|'ve|'m|'ll|'d| ?\p{L}+| ?\p{N}+| ?[^\s\p{L}\p{N}]+|\s+(?!\S)|\s+/gu;
var p;
!(function (e) {
  e.cushman001 = "cushman001";
  e.cushman002 = "cushman002";
  e.mock = "mock";
})((p = exports.TokenizerName || (exports.TokenizerName = {})));
const h = new Map();
exports.getTokenizer = function (e = p.cushman002) {
  let t = h.get(e);
  if (undefined !== t) {
    t = e === p.mock ? new g() : new f(e);
    h.set(e, t);
  }
  return t;
};
class f {
  constructor(e = p.cushman002) {
    this.decoder = new Map();
    this.byte_encoder = new Map();
    this.byte_decoder = new Map();
    this.cache = new Map();
    this.textEncoder = new M_util.TextEncoder();
    this.encodeStr = (e) => Array.from(this.textEncoder.encode(e));
    let t = "";
    let r = "";
    if (e === p.cushman001) {
      t = "vocab_cushman001.bpe";
      r = "tokenizer_cushman001.json";
    } else {
      if (e !== p.cushman002) throw new Error(`Unknown tokenizer name: ${e}`);
      t = "vocab_cushman002.bpe";
      r = "tokenizer_cushman002.json";
    }
    const c = M_fs.readFileSync(M_path.resolve(__dirname, "..", "dist", r));
    const l = JSON.parse(c.toString());
    this.encoder = new Map(Object.entries(l));
    for (let [e, t] of this.encoder) this.decoder.set(t, e);
    const u = M_fs.readFileSync(
      M_path.resolve(__dirname, "..", "dist", t),
      "utf-8"
    )
      .split("\n")
      .slice(1)
      .filter((e) => e.trim().length > 0);
    this.bpe_ranks = ((e, t) => {
      const r = new Map();
      e.forEach((n, i) => {
        r.set(e[i], t[i]);
      });
      return r;
    })(u, s(0, u.length));
    (function (e) {
      const t = s(a("!"), a("~") + 1).concat(
        s(a("¡"), a("¬") + 1),
        s(a("®"), a("ÿ") + 1)
      );
      let r = t.slice();
      let n = 0;
      for (let e = 0; e < 256; e++)
        if (t.includes(e)) {
          t.push(e);
          r.push(256 + n);
          n += 1;
        }
      const i = r.map((e) => ((e) => String.fromCharCode(e))(e));
      for (let r = 0; r < t.length; r++) e.set(t[r], i[r]);
    })(this.byte_encoder);
    this.byte_encoder.forEach((e, t, r) => {
      this.byte_decoder.set(e, t);
    });
  }
  byteEncodeStr(e) {
    return this.encodeStr(e).map((e) => this.byte_encoder.get(e));
  }
  bpe(e) {
    if (this.cache.has(e)) return this.cache.get(e);
    let t = this.byteEncodeStr(e);
    let r = u(t);
    if (!r) return t.map((e) => this.encoder.get(e));
    for (;;) {
      const e = new Map();
      r.forEach((t) => {
        const r = t.join(" ");
        const n = this.bpe_ranks.get(r);
        e.set(undefined === n || isNaN(n) ? 1e11 : n, t);
      });
      const n = Array.from(e.keys()).map((e) => Number(e));
      const i = e.get(Math.min(...n));
      if (!i || !this.bpe_ranks.has(i.join(" "))) break;
      const o = i[0];
      const s = i[1];
      let a = [];
      let c = 0;
      for (; c < t.length; ) {
        const e = t.indexOf(o, c);
        if (-1 === e) {
          Array.prototype.push.apply(a, t.slice(c));
          break;
        }
        Array.prototype.push.apply(a, t.slice(c, e));
        c = e;
        if (t[c] === o && c < t.length - 1 && t[c + 1] === s) {
          a.push(o + s);
          c += 2;
        } else {
          a.push(t[c]);
          c += 1;
        }
      }
      t = a;
      if (1 === t.length) break;
      r = u(t);
    }
    const n = t.map((e) => this.encoder.get(e));
    this.cache.set(e, n);
    return n;
  }
  tokenize(e) {
    let t = [];
    const r = Array.from(e.matchAll(d)).map((e) => e[0]);
    for (let e of r) {
      const r = this.bpe(e);
      Array.prototype.push.apply(t, r);
    }
    return t;
  }
  tokenLength(e) {
    return this.tokenize(e).length;
  }
  takeLastTokens(e, t) {
    if (t <= 0) return "";
    let r = Math.min(e.length, 4 * t);
    let n = e.slice(-r);
    let i = this.tokenize(n);
    for (; i.length < t + 2 && r < e.length; ) {
      r = Math.min(e.length, r + 1 * t);
      n = e.slice(-r);
      i = this.tokenize(n);
    }
    return i.length < t ? e : ((i = i.slice(-t)), this.detokenize(i));
  }
  takeFirstTokens(e, t) {
    if (t <= 0)
      return {
        text: "",
        tokens: [],
      };
    let r = Math.min(e.length, 4 * t);
    let n = e.slice(0, r);
    let i = this.tokenize(n);
    for (; i.length < t + 2 && r < e.length; ) {
      r = Math.min(e.length, r + 1 * t);
      n = e.slice(0, r);
      i = this.tokenize(n);
    }
    return i.length < t
      ? {
          text: e,
          tokens: i,
        }
      : ((i = i.slice(0, t)),
        {
          text: this.detokenize(i),
          tokens: i,
        });
  }
  takeLastLinesTokens(e, t) {
    const r = this.takeLastTokens(e, t);
    if (r.length === e.length || "\n" === e[e.length - r.length - 1]) return r;
    let n = r.indexOf("\n");
    return r.substring(n + 1);
  }
  detokenize(e) {
    let t = e.map((e) => this.decoder.get(e)).join("");
    t = l(t.split("").map((e) => this.byte_decoder.get(e)));
    return t;
  }
  tokenizeStrings(e) {
    return this.tokenize(e).map((e) =>
      l(
        this.decoder
          .get(e)
          .split("")
          .map((e) => this.byte_decoder.get(e))
      )
    );
  }
}
class g {
  constructor() {
    this.hash = (e) => {
      let t = 0;
      for (let r = 0; r < e.length; r++) {
        t = (t << 5) - t + e.charCodeAt(r);
        t &= 65535 & t;
      }
      return t;
    };
  }
  tokenize(e) {
    return this.tokenizeStrings(e).map(this.hash);
  }
  detokenize(e) {
    return e.map((e) => e.toString()).join(" ");
  }
  tokenizeStrings(e) {
    return e.split(/\b/);
  }
  tokenLength(e) {
    return this.tokenizeStrings(e).length;
  }
  takeLastTokens(e, t) {
    return this.tokenizeStrings(e).slice(-t).join("");
  }
  takeFirstTokens(e, t) {
    const r = this.tokenizeStrings(e).slice(0, t);
    return {
      text: r.join(""),
      tokens: r.map(this.hash),
    };
  }
  takeLastLinesTokens(e, t) {
    const r = this.takeLastTokens(e, t);
    if (r.length === e.length || "\n" === e[e.length - r.length - 1]) return r;
    let n = r.indexOf("\n");
    return r.substring(n + 1);
  }
}
