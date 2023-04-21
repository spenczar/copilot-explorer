var n = require(56105);
require(56827);
module.exports = n.cipher = n.cipher || {};
n.cipher.algorithms = n.cipher.algorithms || {};
n.cipher.createCipher = function (e, t) {
  var r = e;
  if ("string" == typeof r && (r = n.cipher.getAlgorithm(r))) {
    r = r();
  }
  if (!r) throw new Error("Unsupported algorithm: " + e);
  return new n.cipher.BlockCipher({
    algorithm: r,
    key: t,
    decrypt: false,
  });
};
n.cipher.createDecipher = function (e, t) {
  var r = e;
  if ("string" == typeof r && (r = n.cipher.getAlgorithm(r))) {
    r = r();
  }
  if (!r) throw new Error("Unsupported algorithm: " + e);
  return new n.cipher.BlockCipher({
    algorithm: r,
    key: t,
    decrypt: true,
  });
};
n.cipher.registerAlgorithm = function (e, t) {
  e = e.toUpperCase();
  n.cipher.algorithms[e] = t;
};
n.cipher.getAlgorithm = function (e) {
  return (e = e.toUpperCase()) in n.cipher.algorithms
    ? n.cipher.algorithms[e]
    : null;
};
var i = (n.cipher.BlockCipher = function (e) {
  this.algorithm = e.algorithm;
  this.mode = this.algorithm.mode;
  this.blockSize = this.mode.blockSize;
  this._finish = false;
  this._input = null;
  this.output = null;
  this._op = e.decrypt ? this.mode.decrypt : this.mode.encrypt;
  this._decrypt = e.decrypt;
  this.algorithm.initialize(e);
});
i.prototype.start = function (e) {
  e = e || {};
  var t = {};
  for (var r in e) t[r] = e[r];
  t.decrypt = this._decrypt;
  this._finish = false;
  this._input = n.util.createBuffer();
  this.output = e.output || n.util.createBuffer();
  this.mode.start(t);
};
i.prototype.update = function (e) {
  for (
    e && this._input.putBuffer(e);
    !this._op.call(this.mode, this._input, this.output, this._finish) &&
    !this._finish;

  );
  this._input.compact();
};
i.prototype.finish = function (e) {
  if (!e || ("ECB" !== this.mode.name && "CBC" !== this.mode.name)) {
    this.mode.pad = function (t) {
      return e(this.blockSize, t, false);
    };
    this.mode.unpad = function (t) {
      return e(this.blockSize, t, true);
    };
  }
  var t = {};
  t.decrypt = this._decrypt;
  t.overflow = this._input.length() % this.blockSize;
  return !(
    (!this._decrypt && this.mode.pad && !this.mode.pad(this._input, t)) ||
    ((this._finish = true),
    this.update(),
    (this._decrypt && this.mode.unpad && !this.mode.unpad(this.output, t)) ||
      (this.mode.afterFinish && !this.mode.afterFinish(this.output, t)))
  );
};