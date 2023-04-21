var n = require(56105);
require(60070);
require(5945);
require(54326);
require(98967);
require(56827);
var i = (module.exports = n.ssh = n.ssh || {});
function o(e, t) {
  var r = t.toString(16);
  if (r[0] >= "8") {
    r = "00" + r;
  }
  var i = n.util.hexToBytes(r);
  e.putInt32(i.length);
  e.putBytes(i);
}
function s(e, t) {
  e.putInt32(t.length);
  e.putString(t);
}
function a() {
  for (
    e = n.md.sha1.create(), t = arguments.length, r = 0, undefined;
    r < t;
    ++r
  ) {
    var e;
    var t;
    var r;
    e.update(arguments[r]);
  }
  return e.digest();
}
i.privateKeyToPutty = function (e, t, r) {
  var i = "ssh-rsa";
  var c = "" === (t = t || "") ? "none" : "aes256-cbc";
  var l = "PuTTY-User-Key-File-2: " + i + "\r\n";
  l += "Encryption: " + c + "\r\n";
  l += "Comment: " + (r = r || "") + "\r\n";
  var u = n.util.createBuffer();
  s(u, i);
  o(u, e.e);
  o(u, e.n);
  var d = n.util.encode64(u.bytes(), 64);
  var p = Math.floor(d.length / 66) + 1;
  l += "Public-Lines: " + p + "\r\n";
  l += d;
  var h;
  var f = n.util.createBuffer();
  o(f, e.d);
  o(f, e.p);
  o(f, e.q);
  o(f, e.qInv);
  if (t) {
    var g = f.length() + 16 - 1;
    g -= g % 16;
    var m = a(f.bytes());
    m.truncate(m.length() - g + f.length()), f.putBuffer(m);
    var y = n.util.createBuffer();
    y.putBuffer(a("\0\0\0\0", t)), y.putBuffer(a("\0\0\0", t));
    var v = n.aes.createEncryptionCipher(y.truncate(8), "CBC");
    v.start(n.util.createBuffer().fillWithByte(0, 16)),
      v.update(f.copy()),
      v.finish();
    var _ = v.output;
    _.truncate(16), (h = n.util.encode64(_.bytes(), 64));
  } else h = n.util.encode64(f.bytes(), 64);
  l += "\r\nPrivate-Lines: " + (p = Math.floor(h.length / 66) + 1) + "\r\n";
  l += h;
  var b = a("putty-private-key-file-mac-key", t);
  var w = n.util.createBuffer();
  s(w, i);
  s(w, c);
  s(w, r);
  w.putInt32(u.length());
  w.putBuffer(u);
  w.putInt32(f.length());
  w.putBuffer(f);
  var C = n.hmac.create();
  C.start("sha1", b);
  C.update(w.bytes());
  return l + "\r\nPrivate-MAC: " + C.digest().toHex() + "\r\n";
};
i.publicKeyToOpenSSH = function (e, t) {
  var r = "ssh-rsa";
  t = t || "";
  var i = n.util.createBuffer();
  s(i, r);
  o(i, e.e);
  o(i, e.n);
  return r + " " + n.util.encode64(i.bytes()) + " " + t;
};
i.privateKeyToOpenSSH = function (e, t) {
  return t
    ? n.pki.encryptRsaPrivateKey(e, t, {
        legacy: true,
        algorithm: "aes128",
      })
    : n.pki.privateKeyToPem(e);
};
i.getPublicKeyFingerprint = function (e, t) {
  var r = (t = t || {}).md || n.md.md5.create();
  var i = n.util.createBuffer();
  s(i, "ssh-rsa");
  o(i, e.e);
  o(i, e.n);
  r.start();
  r.update(i.getBytes());
  var a = r.digest();
  if ("hex" === t.encoding) {
    var c = a.toHex();
    return t.delimiter ? c.match(/.{2}/g).join(t.delimiter) : c;
  }
  if ("binary" === t.encoding) return a.getBytes();
  if (t.encoding) throw new Error('Unknown encoding "' + t.encoding + '".');
  return a;
};