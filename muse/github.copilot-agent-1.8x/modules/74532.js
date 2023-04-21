var n = require(85512);
var i = require(77649);
var o = require(6751);
var s = (function () {
  function e() {}
  e.createEnvelope = function (t, r, o, s, a) {
    var c = null;
    switch (r) {
      case n.TelemetryType.Trace:
        c = e.createTraceData(t);
        break;
      case n.TelemetryType.Dependency:
        c = e.createDependencyData(t);
        break;
      case n.TelemetryType.Event:
        c = e.createEventData(t);
        break;
      case n.TelemetryType.Exception:
        c = e.createExceptionData(t);
        break;
      case n.TelemetryType.Request:
        c = e.createRequestData(t);
        break;
      case n.TelemetryType.Metric:
        c = e.createMetricData(t);
        break;
      case n.TelemetryType.Availability:
        c = e.createAvailabilityData(t);
    }
    if (o && n.domainSupportsProperties(c.baseData)) {
      if (c && c.baseData)
        if (c.baseData.properties) {
          for (var l in o)
            if (c.baseData.properties[l]) {
              c.baseData.properties[l] = o[l];
            }
        } else c.baseData.properties = o;
      c.baseData.properties = i.validateStringMap(c.baseData.properties);
    }
    var u = (a && a.instrumentationKey) || "";
    var d = new n.Envelope();
    d.data = c;
    d.iKey = u;
    d.name =
      "Microsoft.ApplicationInsights." +
      u.replace(/-/g, "") +
      "." +
      c.baseType.substr(0, c.baseType.length - 4);
    d.tags = this.getTags(s, t.tagOverrides);
    d.time = new Date().toISOString();
    d.ver = 1;
    d.sampleRate = a ? a.samplingPercentage : 100;
    if (r === n.TelemetryType.Metric) {
      d.sampleRate = 100;
    }
    return d;
  };
  e.createTraceData = function (e) {
    var t = new n.MessageData();
    t.message = e.message;
    t.properties = e.properties;
    if (isNaN(e.severity)) {
      t.severityLevel = n.SeverityLevel.Information;
    } else {
      t.severityLevel = e.severity;
    }
    var r = new n.Data();
    r.baseType = n.telemetryTypeToBaseType(n.TelemetryType.Trace);
    r.baseData = t;
    return r;
  };
  e.createDependencyData = function (e) {
    var t = new n.RemoteDependencyData();
    if ("string" == typeof e.name) {
      t.name = e.name.length > 1024 ? e.name.slice(0, 1021) + "..." : e.name;
    }
    t.data = e.data;
    t.target = e.target;
    t.duration = i.msToTimeSpan(e.duration);
    t.success = e.success;
    t.type = e.dependencyTypeName;
    t.properties = e.properties;
    t.resultCode = e.resultCode ? e.resultCode + "" : "";
    if (e.id) {
      t.id = e.id;
    } else {
      t.id = i.w3cTraceId();
    }
    var r = new n.Data();
    r.baseType = n.telemetryTypeToBaseType(n.TelemetryType.Dependency);
    r.baseData = t;
    return r;
  };
  e.createEventData = function (e) {
    var t = new n.EventData();
    t.name = e.name;
    t.properties = e.properties;
    t.measurements = e.measurements;
    var r = new n.Data();
    r.baseType = n.telemetryTypeToBaseType(n.TelemetryType.Event);
    r.baseData = t;
    return r;
  };
  e.createExceptionData = function (e) {
    var t = new n.ExceptionData();
    t.properties = e.properties;
    if (isNaN(e.severity)) {
      t.severityLevel = n.SeverityLevel.Error;
    } else {
      t.severityLevel = e.severity;
    }
    t.measurements = e.measurements;
    t.exceptions = [];
    var r = e.exception.stack;
    var o = new n.ExceptionDetails();
    o.message = e.exception.message;
    o.typeName = e.exception.name;
    o.parsedStack = this.parseStack(r);
    o.hasFullStack = i.isArray(o.parsedStack) && o.parsedStack.length > 0;
    t.exceptions.push(o);
    var s = new n.Data();
    s.baseType = n.telemetryTypeToBaseType(n.TelemetryType.Exception);
    s.baseData = t;
    return s;
  };
  e.createRequestData = function (e) {
    var t = new n.RequestData();
    if (e.id) {
      t.id = e.id;
    } else {
      t.id = i.w3cTraceId();
    }
    t.name = e.name;
    t.url = e.url;
    t.source = e.source;
    t.duration = i.msToTimeSpan(e.duration);
    t.responseCode = e.resultCode ? e.resultCode + "" : "";
    t.success = e.success;
    t.properties = e.properties;
    var r = new n.Data();
    r.baseType = n.telemetryTypeToBaseType(n.TelemetryType.Request);
    r.baseData = t;
    return r;
  };
  e.createMetricData = function (e) {
    var t = new n.MetricData();
    t.metrics = [];
    var r = new n.DataPoint();
    r.count = isNaN(e.count) ? 1 : e.count;
    r.kind = n.DataPointType.Aggregation;
    r.max = isNaN(e.max) ? e.value : e.max;
    r.min = isNaN(e.min) ? e.value : e.min;
    r.name = e.name;
    r.stdDev = isNaN(e.stdDev) ? 0 : e.stdDev;
    r.value = e.value;
    t.metrics.push(r);
    t.properties = e.properties;
    var i = new n.Data();
    i.baseType = n.telemetryTypeToBaseType(n.TelemetryType.Metric);
    i.baseData = t;
    return i;
  };
  e.createAvailabilityData = function (e) {
    var t = new n.AvailabilityData();
    if (e.id) {
      t.id = e.id;
    } else {
      t.id = i.w3cTraceId();
    }
    t.name = e.name;
    t.duration = i.msToTimeSpan(e.duration);
    t.success = e.success;
    t.runLocation = e.runLocation;
    t.message = e.message;
    t.measurements = e.measurements;
    t.properties = e.properties;
    var r = new n.Data();
    r.baseType = n.telemetryTypeToBaseType(n.TelemetryType.Availability);
    r.baseData = t;
    return r;
  };
  e.getTags = function (e, t) {
    var r = o.CorrelationContextManager.getCurrentContext();
    var n = {};
    if (e && e.tags) for (var i in e.tags) n[i] = e.tags[i];
    if (t) for (var i in t) n[i] = t[i];
    if (r) {
      n[e.keys.operationId] = n[e.keys.operationId] || r.operation.id;
      n[e.keys.operationName] = n[e.keys.operationName] || r.operation.name;
      n[e.keys.operationParentId] =
        n[e.keys.operationParentId] || r.operation.parentId;
    }
    return n;
  };
  e.parseStack = function (e) {
    var t = undefined;
    if ("string" == typeof e) {
      var r = e.split("\n");
      t = [];
      for (n = 0, i = 0, o = 0, undefined; o <= r.length; o++) {
        var n;
        var i;
        var o;
        var s = r[o];
        if (a.regex.test(s)) {
          var c = new a(r[o], n++);
          i += c.sizeInBytes;
          t.push(c);
        }
      }
      if (i > 32768)
        for (l = 0, u = t.length - 1, d = 0, p = l, h = u, undefined; l < u; ) {
          var l;
          var u;
          var d;
          var p;
          var h;
          if ((d += t[l].sizeInBytes + t[u].sizeInBytes) > 32768) {
            var f = h - p + 1;
            t.splice(p, f);
            break;
          }
          p = l;
          h = u;
          l++;
          u--;
        }
    }
    return t;
  };
  return e;
})();
var a = (function () {
  function e(t, r) {
    this.sizeInBytes = 0;
    this.level = r;
    this.method = "<no_method>";
    this.assembly = i.trim(t);
    var n = t.match(e.regex);
    if (n && n.length >= 5) {
      this.method = i.trim(n[2]) || this.method;
      this.fileName = i.trim(n[4]) || "<no_filename>";
      this.line = parseInt(n[5]) || 0;
    }
    this.sizeInBytes += this.method.length;
    this.sizeInBytes += this.fileName.length;
    this.sizeInBytes += this.assembly.length;
    this.sizeInBytes += e.baseSize;
    this.sizeInBytes += this.level.toString().length;
    this.sizeInBytes += this.line.toString().length;
  }
  e.regex = /^([\s]+at)?(.*?)(\@|\s\(|\s)([^\(\@\n]+):([0-9]+):([0-9]+)(\)?)$/;
  e.baseSize = 58;
  return e;
})();
module.exports = s;