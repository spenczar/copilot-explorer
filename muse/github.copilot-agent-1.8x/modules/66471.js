module.exports = function e(t, r) {
  if (t === r) return true;
  if (t && r && "object" == typeof t && "object" == typeof r) {
    if (t.constructor !== r.constructor) return false;
    var n;
    var i;
    var o;
    if (Array.isArray(t)) {
      if ((n = t.length) != r.length) return false;
      for (i = n; 0 != i--; ) if (!e(t[i], r[i])) return false;
      return true;
    }
    if (t.constructor === RegExp)
      return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === r.toString();
    if ((n = (o = Object.keys(t)).length) !== Object.keys(r).length)
      return false;
    for (i = n; 0 != i--; )
      if (!Object.prototype.hasOwnProperty.call(r, o[i])) return false;
    for (i = n; 0 != i--; ) {
      var s = o[i];
      if (!e(t[s], r[s])) return false;
    }
    return true;
  }
  return t != t && r != r;
};