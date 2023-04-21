const t = new Set([200, 203, 204, 206, 300, 301, 404, 405, 410, 414, 501]);
const r = new Set([
  200, 203, 204, 300, 301, 302, 303, 307, 308, 404, 405, 410, 414, 501,
]);
const n = new Set([500, 502, 503, 504]);
const i = {
  date: true,
  connection: true,
  "keep-alive": true,
  "proxy-authenticate": true,
  "proxy-authorization": true,
  te: true,
  trailer: true,
  "transfer-encoding": true,
  upgrade: true,
};
const o = {
  "content-length": true,
  "content-encoding": true,
  "transfer-encoding": true,
  "content-range": true,
};
function s(e) {
  const t = parseInt(e, 10);
  return isFinite(t) ? t : 0;
}
function a(e) {
  const t = {};
  if (!e) return t;
  const r = e.trim().split(/\s*,\s*/);
  for (const e of r) {
    const [r, n] = e.split(/\s*=\s*/, 2);
    t[r] = undefined === n || n.replace(/^"|"$/g, "");
  }
  return t;
}
function c(e) {
  let t = [];
  for (const r in e) {
    const n = e[r];
    t.push(true === n ? r : r + "=" + n);
  }
  if (t.length) return t.join(", ");
}
module.exports = class {
  constructor(
    e,
    t,
    {
      shared: r,
      cacheHeuristic: n,
      immutableMinTimeToLive: i,
      ignoreCargoCult: o,
      _fromObject: s,
    } = {}
  ) {
    if (s) this._fromObject(s);
    else {
      if (!t || !t.headers) throw Error("Response headers missing");
      this._assertRequestHasHeaders(e);
      this._responseTime = this.now();
      this._isShared = false !== r;
      this._cacheHeuristic = undefined !== n ? n : 0.1;
      this._immutableMinTtl = undefined !== i ? i : 864e5;
      this._status = "status" in t ? t.status : 200;
      this._resHeaders = t.headers;
      this._rescc = a(t.headers["cache-control"]);
      this._method = "method" in e ? e.method : "GET";
      this._url = e.url;
      this._host = e.headers.host;
      this._noAuthorization = !e.headers.authorization;
      this._reqHeaders = t.headers.vary ? e.headers : null;
      this._reqcc = a(e.headers["cache-control"]);
      if (o && "pre-check" in this._rescc && "post-check" in this._rescc) {
        delete this._rescc["pre-check"];
        delete this._rescc["post-check"];
        delete this._rescc["no-cache"];
        delete this._rescc["no-store"];
        delete this._rescc["must-revalidate"];
        this._resHeaders = Object.assign({}, this._resHeaders, {
          "cache-control": c(this._rescc),
        });
        delete this._resHeaders.expires;
        delete this._resHeaders.pragma;
      }
      if (
        null == t.headers["cache-control"] &&
        /no-cache/.test(t.headers.pragma)
      ) {
        this._rescc["no-cache"] = true;
      }
    }
  }
  now() {
    return Date.now();
  }
  storable() {
    return !(
      this._reqcc["no-store"] ||
      !(
        "GET" === this._method ||
        "HEAD" === this._method ||
        ("POST" === this._method && this._hasExplicitExpiration())
      ) ||
      !r.has(this._status) ||
      this._rescc["no-store"] ||
      (this._isShared && this._rescc.private) ||
      (this._isShared &&
        !this._noAuthorization &&
        !this._allowsStoringAuthenticated()) ||
      !(
        this._resHeaders.expires ||
        this._rescc["max-age"] ||
        (this._isShared && this._rescc["s-maxage"]) ||
        this._rescc.public ||
        t.has(this._status)
      )
    );
  }
  _hasExplicitExpiration() {
    return (
      (this._isShared && this._rescc["s-maxage"]) ||
      this._rescc["max-age"] ||
      this._resHeaders.expires
    );
  }
  _assertRequestHasHeaders(e) {
    if (!e || !e.headers) throw Error("Request headers missing");
  }
  satisfiesWithoutRevalidation(e) {
    this._assertRequestHasHeaders(e);
    const t = a(e.headers["cache-control"]);
    return (
      !t["no-cache"] &&
      !/no-cache/.test(e.headers.pragma) &&
      !(t["max-age"] && this.age() > t["max-age"]) &&
      !(t["min-fresh"] && this.timeToLive() < 1e3 * t["min-fresh"]) &&
      !(
        this.stale() &&
        (!t["max-stale"] ||
          this._rescc["must-revalidate"] ||
          !(
            true === t["max-stale"] ||
            t["max-stale"] > this.age() - this.maxAge()
          ))
      ) &&
      this._requestMatches(e, false)
    );
  }
  _requestMatches(e, t) {
    return (
      (!this._url || this._url === e.url) &&
      this._host === e.headers.host &&
      (!e.method || this._method === e.method || (t && "HEAD" === e.method)) &&
      this._varyMatches(e)
    );
  }
  _allowsStoringAuthenticated() {
    return (
      this._rescc["must-revalidate"] ||
      this._rescc.public ||
      this._rescc["s-maxage"]
    );
  }
  _varyMatches(e) {
    if (!this._resHeaders.vary) return true;
    if ("*" === this._resHeaders.vary) return false;
    const t = this._resHeaders.vary
      .trim()
      .toLowerCase()
      .split(/\s*,\s*/);
    for (const r of t) if (e.headers[r] !== this._reqHeaders[r]) return false;
    return true;
  }
  _copyWithoutHopByHopHeaders(e) {
    const t = {};
    for (const r in e)
      if (i[r]) {
        t[r] = e[r];
      }
    if (e.connection) {
      const r = e.connection.trim().split(/\s*,\s*/);
      for (const e of r) delete t[e];
    }
    if (t.warning) {
      const e = t.warning.split(/,/).filter((e) => !/^\s*1[0-9][0-9]/.test(e));
      if (e.length) {
        t.warning = e.join(",").trim();
      } else {
        delete t.warning;
      }
    }
    return t;
  }
  responseHeaders() {
    const e = this._copyWithoutHopByHopHeaders(this._resHeaders);
    const t = this.age();
    if (t > 86400 && !this._hasExplicitExpiration() && this.maxAge() > 86400) {
      e.warning = (e.warning ? `${e.warning}, ` : "") + '113 - "rfc7234 5.5.4"';
    }
    e.age = `${Math.round(t)}`;
    e.date = new Date(this.now()).toUTCString();
    return e;
  }
  date() {
    const e = Date.parse(this._resHeaders.date);
    return isFinite(e) ? e : this._responseTime;
  }
  age() {
    return this._ageValue() + (this.now() - this._responseTime) / 1e3;
  }
  _ageValue() {
    return s(this._resHeaders.age);
  }
  maxAge() {
    if (!this.storable() || this._rescc["no-cache"]) return 0;
    if (
      this._isShared &&
      this._resHeaders["set-cookie"] &&
      !this._rescc.public &&
      !this._rescc.immutable
    )
      return 0;
    if ("*" === this._resHeaders.vary) return 0;
    if (this._isShared) {
      if (this._rescc["proxy-revalidate"]) return 0;
      if (this._rescc["s-maxage"]) return s(this._rescc["s-maxage"]);
    }
    if (this._rescc["max-age"]) return s(this._rescc["max-age"]);
    const e = this._rescc.immutable ? this._immutableMinTtl : 0;
    const t = this.date();
    if (this._resHeaders.expires) {
      const r = Date.parse(this._resHeaders.expires);
      return Number.isNaN(r) || r < t ? 0 : Math.max(e, (r - t) / 1e3);
    }
    if (this._resHeaders["last-modified"]) {
      const r = Date.parse(this._resHeaders["last-modified"]);
      if (isFinite(r) && t > r)
        return Math.max(e, ((t - r) / 1e3) * this._cacheHeuristic);
    }
    return e;
  }
  timeToLive() {
    const e = this.maxAge() - this.age();
    const t = e + s(this._rescc["stale-if-error"]);
    const r = e + s(this._rescc["stale-while-revalidate"]);
    return 1e3 * Math.max(0, e, t, r);
  }
  stale() {
    return this.maxAge() <= this.age();
  }
  _useStaleIfError() {
    return this.maxAge() + s(this._rescc["stale-if-error"]) > this.age();
  }
  useStaleWhileRevalidate() {
    return (
      this.maxAge() + s(this._rescc["stale-while-revalidate"]) > this.age()
    );
  }
  static fromObject(e) {
    return new this(undefined, undefined, {
      _fromObject: e,
    });
  }
  _fromObject(e) {
    if (this._responseTime) throw Error("Reinitialized");
    if (!e || 1 !== e.v) throw Error("Invalid serialization");
    this._responseTime = e.t;
    this._isShared = e.sh;
    this._cacheHeuristic = e.ch;
    this._immutableMinTtl = undefined !== e.imm ? e.imm : 864e5;
    this._status = e.st;
    this._resHeaders = e.resh;
    this._rescc = e.rescc;
    this._method = e.m;
    this._url = e.u;
    this._host = e.h;
    this._noAuthorization = e.a;
    this._reqHeaders = e.reqh;
    this._reqcc = e.reqcc;
  }
  toObject() {
    return {
      v: 1,
      t: this._responseTime,
      sh: this._isShared,
      ch: this._cacheHeuristic,
      imm: this._immutableMinTtl,
      st: this._status,
      resh: this._resHeaders,
      rescc: this._rescc,
      m: this._method,
      u: this._url,
      h: this._host,
      a: this._noAuthorization,
      reqh: this._reqHeaders,
      reqcc: this._reqcc,
    };
  }
  revalidationHeaders(e) {
    this._assertRequestHasHeaders(e);
    const t = this._copyWithoutHopByHopHeaders(e.headers);
    delete t["if-range"];
    if (!this._requestMatches(e, !0) || !this.storable())
      return delete t["if-none-match"], delete t["if-modified-since"], t;
    if (this._resHeaders.etag) {
      t["if-none-match"] = t["if-none-match"]
        ? `${t["if-none-match"]}, ${this._resHeaders.etag}`
        : this._resHeaders.etag;
    }
    if (
      t["accept-ranges"] ||
      t["if-match"] ||
      t["if-unmodified-since"] ||
      (this._method && "GET" != this._method)
    ) {
      if ((delete t["if-modified-since"], t["if-none-match"])) {
        const e = t["if-none-match"]
          .split(/,/)
          .filter((e) => !/^\s*W\//.test(e));
        e.length
          ? (t["if-none-match"] = e.join(",").trim())
          : delete t["if-none-match"];
      }
    } else
      this._resHeaders["last-modified"] &&
        !t["if-modified-since"] &&
        (t["if-modified-since"] = this._resHeaders["last-modified"]);
    return t;
  }
  revalidatedPolicy(e, t) {
    this._assertRequestHasHeaders(e);
    if (
      this._useStaleIfError() &&
      (function (e) {
        return !e || n.has(e.status);
      })(t)
    )
      return {
        modified: !1,
        matches: !1,
        policy: this,
      };
    if (!t || !t.headers) throw Error("Response headers missing");
    let r = false;
    if (undefined !== t.status && 304 != t.status) {
      r = false;
    } else {
      if (t.headers.etag && !/^\s*W\//.test(t.headers.etag)) {
        r =
          this._resHeaders.etag &&
          this._resHeaders.etag.replace(/^\s*W\//, "") === t.headers.etag;
      } else {
        if (this._resHeaders.etag && t.headers.etag) {
          r =
            this._resHeaders.etag.replace(/^\s*W\//, "") ===
            t.headers.etag.replace(/^\s*W\//, "");
        } else {
          if (this._resHeaders["last-modified"]) {
            r =
              this._resHeaders["last-modified"] === t.headers["last-modified"];
          } else {
            if (
              this._resHeaders.etag ||
              this._resHeaders["last-modified"] ||
              t.headers.etag ||
              t.headers["last-modified"]
            ) {
              r = true;
            }
          }
        }
      }
    }
    if (!r)
      return {
        policy: new this.constructor(e, t),
        modified: 304 != t.status,
        matches: !1,
      };
    const i = {};
    for (const e in this._resHeaders)
      i[e] = e in t.headers && !o[e] ? t.headers[e] : this._resHeaders[e];
    const s = Object.assign({}, t, {
      status: this._status,
      method: this._method,
      headers: i,
    });
    return {
      policy: new this.constructor(e, s, {
        shared: this._isShared,
        cacheHeuristic: this._cacheHeuristic,
        immutableMinTimeToLive: this._immutableMinTtl,
      }),
      modified: false,
      matches: true,
    };
  }
};