module.exports = function (e, t) {
  if (true === t) {
    t = 0;
  }
  var r = "";
  if ("string" == typeof e)
    try {
      r = new URL(e).protocol;
    } catch (e) {}
  else if (e && e.constructor === URL) {
    r = e.protocol;
  }
  var n = r.split(/\:|\+/).filter(Boolean);
  return "number" == typeof t ? n[t] : n;
};