var n = require(12010);
var i = require(12049);
var o = require(56405);
var s = require(53629);
var a = require(85315);
var c = require(82028);
var l = (function () {
  function e(e, t) {
    this._isCollectingData = false;
    this._lastSuccessTime = Date.now();
    this._lastSendSucceeded = true;
    this._metrics = {};
    this._documents = [];
    this._collectors = [];
    this.config = new i(e);
    this.context = t || new c();
    this._sender = new s(this.config);
    this._isEnabled = false;
  }
  e.prototype.addCollector = function (e) {
    this._collectors.push(e);
  };
  e.prototype.trackMetric = function (e) {
    this._addMetric(e);
  };
  e.prototype.addDocument = function (e) {
    var t = o.telemetryEnvelopeToQuickPulseDocument(e);
    if (t) {
      this._documents.push(t);
    }
  };
  e.prototype.enable = function (e) {
    if (e && !this._isEnabled) {
      this._isEnabled = true;
      this._goQuickPulse();
    } else {
      if (!e && this._isEnabled) {
        this._isEnabled = false;
        clearTimeout(this._handle);
        this._handle = undefined;
      }
    }
  };
  e.prototype.enableCollectors = function (e) {
    this._collectors.forEach(function (t) {
      t.enable(e);
    });
  };
  e.prototype._addMetric = function (e) {
    var t = e.value;
    var r = e.count || 1;
    var n = a.PerformanceToQuickPulseCounter[e.name];
    if (n) {
      if (this._metrics[n]) {
        this._metrics[n].Value =
          (this._metrics[n].Value * this._metrics[n].Weight + t * r) /
          (this._metrics[n].Weight + r);
        this._metrics[n].Weight += r;
      } else {
        this._metrics[n] = o.createQuickPulseMetric(e);
        this._metrics[n].Name = n;
        this._metrics[n].Weight = 1;
      }
    }
  };
  e.prototype._resetQuickPulseBuffer = function () {
    delete this._metrics;
    this._metrics = {};
    this._documents.length = 0;
  };
  e.prototype._goQuickPulse = function () {
    var t = this;
    var r = Object.keys(this._metrics).map(function (e) {
      return t._metrics[e];
    });
    var n = o.createQuickPulseEnvelope(
      r,
      this._documents.slice(),
      this.config,
      this.context
    );
    this._resetQuickPulseBuffer();
    if (this._isCollectingData) {
      this._post(n);
    } else {
      this._ping(n);
    }
    var i = this._isCollectingData ? e.POST_INTERVAL : e.PING_INTERVAL;
    if (
      this._isCollectingData &&
      Date.now() - this._lastSuccessTime >= e.MAX_POST_WAIT_TIME &&
      !this._lastSendSucceeded
    ) {
      this._isCollectingData = false;
      i = e.FALLBACK_INTERVAL;
    } else {
      if (
        !this._isCollectingData &&
        Date.now() - this._lastSuccessTime >= e.MAX_PING_WAIT_TIME &&
        !this._lastSendSucceeded
      ) {
        i = e.FALLBACK_INTERVAL;
      }
    }
    this._lastSendSucceeded = null;
    this._handle = setTimeout(this._goQuickPulse.bind(this), i);
    this._handle.unref();
  };
  e.prototype._ping = function (e) {
    this._sender.ping(e, this._quickPulseDone.bind(this));
  };
  e.prototype._post = function (e) {
    this._sender.post(e, this._quickPulseDone.bind(this));
  };
  e.prototype._quickPulseDone = function (e, t) {
    if (null != e) {
      if (this._isCollectingData !== e) {
        n.info("Live Metrics sending data", e);
        this.enableCollectors(e);
      }
      this._isCollectingData = e;
      if (t && t.statusCode < 300 && t.statusCode >= 200) {
        this._lastSuccessTime = Date.now();
        this._lastSendSucceeded = true;
      } else {
        this._lastSendSucceeded = false;
      }
    } else {
      this._lastSendSucceeded = false;
    }
  };
  e.MAX_POST_WAIT_TIME = 2e4;
  e.MAX_PING_WAIT_TIME = 6e4;
  e.FALLBACK_INTERVAL = 6e4;
  e.PING_INTERVAL = 5e3;
  e.POST_INTERVAL = 1e3;
  return e;
})();
module.exports = l;