var n = require(56105);
require(60070);
require(78653);
var i = (module.exports = n.tls);
function o(e, t, r) {
  var o = t.entity === n.tls.ConnectionEnd.client;
  e.read.cipherState = {
    init: false,
    cipher: n.cipher.createDecipher(
      "AES-CBC",
      o ? r.keys.server_write_key : r.keys.client_write_key
    ),
    iv: o ? r.keys.server_write_IV : r.keys.client_write_IV,
  };
  e.write.cipherState = {
    init: false,
    cipher: n.cipher.createCipher(
      "AES-CBC",
      o ? r.keys.client_write_key : r.keys.server_write_key
    ),
    iv: o ? r.keys.client_write_IV : r.keys.server_write_IV,
  };
  e.read.cipherFunction = l;
  e.write.cipherFunction = s;
  e.read.macLength = e.write.macLength = r.mac_length;
  e.read.macFunction = e.write.macFunction = i.hmac_sha1;
}
function s(e, t) {
  var r;
  var o = false;
  var s = t.macFunction(t.macKey, t.sequenceNumber, e);
  e.fragment.putBytes(s);
  t.updateSequenceNumber();
  r =
    e.version.minor === i.Versions.TLS_1_0.minor
      ? t.cipherState.init
        ? null
        : t.cipherState.iv
      : n.random.getBytesSync(16);
  t.cipherState.init = true;
  var c = t.cipherState.cipher;
  c.start({
    iv: r,
  });
  if (e.version.minor >= i.Versions.TLS_1_1.minor) {
    c.output.putBytes(r);
  }
  c.update(e.fragment);
  if (c.finish(a)) {
    e.fragment = c.output;
    e.length = e.fragment.length();
    o = true;
  }
  return o;
}
function a(e, t, r) {
  if (!r) {
    var n = e - (t.length() % e);
    t.fillWithByte(n - 1, n);
  }
  return true;
}
function c(e, t, r) {
  var n = true;
  if (r) {
    for (
      i = t.length(), o = t.last(), s = i - 1 - o, undefined;
      s < i - 1;
      ++s
    ) {
      var i;
      var o;
      var s;
      n = n && t.at(s) == o;
    }
    if (n) {
      t.truncate(o + 1);
    }
  }
  return n;
}
function l(e, t) {
  var r;
  var o = false;
  r =
    e.version.minor === i.Versions.TLS_1_0.minor
      ? t.cipherState.init
        ? null
        : t.cipherState.iv
      : e.fragment.getBytes(16);
  t.cipherState.init = true;
  var s = t.cipherState.cipher;
  s.start({
    iv: r,
  });
  s.update(e.fragment);
  o = s.finish(c);
  var a = t.macLength;
  var l = n.random.getBytesSync(a);
  var u = s.output.length();
  if (u >= a) {
    e.fragment = s.output.getBytes(u - a);
    l = s.output.getBytes(a);
  } else {
    e.fragment = s.output.getBytes();
  }
  e.fragment = n.util.createBuffer(e.fragment);
  e.length = e.fragment.length();
  var d = t.macFunction(t.macKey, t.sequenceNumber, e);
  t.updateSequenceNumber();
  o =
    (function (e, t, r) {
      var i = n.hmac.create();
      i.start("SHA1", e);
      i.update(t);
      t = i.digest().getBytes();
      i.start(null, null);
      i.update(r);
      return t === (r = i.digest().getBytes());
    })(t.macKey, l, d) && o;
  return o;
}
i.CipherSuites.TLS_RSA_WITH_AES_128_CBC_SHA = {
  id: [0, 47],
  name: "TLS_RSA_WITH_AES_128_CBC_SHA",
  initSecurityParameters: function (e) {
    e.bulk_cipher_algorithm = i.BulkCipherAlgorithm.aes;
    e.cipher_type = i.CipherType.block;
    e.enc_key_length = 16;
    e.block_length = 16;
    e.fixed_iv_length = 16;
    e.record_iv_length = 16;
    e.mac_algorithm = i.MACAlgorithm.hmac_sha1;
    e.mac_length = 20;
    e.mac_key_length = 20;
  },
  initConnectionState: o,
};
i.CipherSuites.TLS_RSA_WITH_AES_256_CBC_SHA = {
  id: [0, 53],
  name: "TLS_RSA_WITH_AES_256_CBC_SHA",
  initSecurityParameters: function (e) {
    e.bulk_cipher_algorithm = i.BulkCipherAlgorithm.aes;
    e.cipher_type = i.CipherType.block;
    e.enc_key_length = 32;
    e.block_length = 16;
    e.fixed_iv_length = 16;
    e.record_iv_length = 16;
    e.mac_algorithm = i.MACAlgorithm.hmac_sha1;
    e.mac_length = 20;
    e.mac_key_length = 20;
  },
  initConnectionState: o,
};