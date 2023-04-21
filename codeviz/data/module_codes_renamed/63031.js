module.exports = function (e, t) {
  var r = [];
  r.push(
    (function (e) {
      try {
        return Error.prototype.toString.call(e);
      } catch (e) {
        try {
          return "<error: " + e + ">";
        } catch (e) {
          return "<error>";
        }
      }
    })(e)
  );
  for (var n = 0; n < t.length; n++) {
    var i;
    var o = t[n];
    try {
      i = o.toString();
    } catch (e) {
      try {
        i = "<error: " + e + ">";
      } catch (e) {
        i = "<error>";
      }
    }
    r.push("    at " + i);
  }
  return r.join("\n");
};
