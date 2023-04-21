var n;
module.exports = function () {
  var e;
  var t;
  var i;
  var o;
  if (!n)
    for (t in ((e = (n = require(35758)).oids), (i = require(45337)))) {
      o = i[t];
      if (null == e[t]) {
        e[t] = o;
      }
      if (null == e[o]) {
        e[o] = t;
      }
    }
  return n;
};