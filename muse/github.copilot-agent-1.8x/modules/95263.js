var r;
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.telemetryTypeToBaseType = function (e) {
  switch (e) {
    case r.Event:
      return "EventData";
    case r.Exception:
      return "ExceptionData";
    case r.Trace:
      return "MessageData";
    case r.Metric:
      return "MetricData";
    case r.Request:
      return "RequestData";
    case r.Dependency:
      return "RemoteDependencyData";
    case r.Availability:
      return "AvailabilityData";
  }
};
exports.baseTypeToTelemetryType = function (e) {
  switch (e) {
    case "EventData":
      return r.Event;
    case "ExceptionData":
      return r.Exception;
    case "MessageData":
      return r.Trace;
    case "MetricData":
      return r.Metric;
    case "RequestData":
      return r.Request;
    case "RemoteDependencyData":
      return r.Dependency;
    case "AvailabilityData":
      return r.Availability;
  }
};
exports.TelemetryTypeString = {
  Event: "EventData",
  Exception: "ExceptionData",
  Trace: "MessageData",
  Metric: "MetricData",
  Request: "RequestData",
  Dependency: "RemoteDependencyData",
  Availability: "AvailabilityData",
};
(function (e) {
  e[(e.Event = 0)] = "Event";
  e[(e.Exception = 1)] = "Exception";
  e[(e.Trace = 2)] = "Trace";
  e[(e.Metric = 3)] = "Metric";
  e[(e.Request = 4)] = "Request";
  e[(e.Dependency = 5)] = "Dependency";
  e[(e.Availability = 6)] = "Availability";
})((r = exports.TelemetryType || (exports.TelemetryType = {})));