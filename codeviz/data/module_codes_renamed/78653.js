var M_OptionsManager_maybe = require("OptionsManager");
require("ASN1-Parser-Utils");
require("HMAC-Crypto-Utils");
require("md5-crypto-module");
require("pem-encoding-utils");
require("PKI-PEM-Converter");
require("RandomNumberGenerator");
require("sha1-module");
require("binary-data-reader");
var i = function (e, t, r, i) {
  var o = M_OptionsManager_maybe.util.createBuffer();
  var s = e.length >> 1;
  var a = s + (1 & e.length);
  var c = e.substr(0, a);
  var l = e.substr(s, a);
  var u = M_OptionsManager_maybe.util.createBuffer();
  var d = M_OptionsManager_maybe.hmac.create();
  r = t + r;
  var p = Math.ceil(i / 16);
  var h = Math.ceil(i / 20);
  d.start("MD5", c);
  var f = M_OptionsManager_maybe.util.createBuffer();
  u.putBytes(r);
  for (var g = 0; g < p; ++g) {
    d.start(null, null);
    d.update(u.getBytes());
    u.putBuffer(d.digest());
    d.start(null, null);
    d.update(u.bytes() + r);
    f.putBuffer(d.digest());
  }
  d.start("SHA1", l);
  var m = M_OptionsManager_maybe.util.createBuffer();
  for (u.clear(), u.putBytes(r), g = 0; g < h; ++g) {
    d.start(null, null);
    d.update(u.getBytes());
    u.putBuffer(d.digest());
    d.start(null, null);
    d.update(u.bytes() + r);
    m.putBuffer(d.digest());
  }
  o.putBytes(
    M_OptionsManager_maybe.util.xorBytes(f.getBytes(), m.getBytes(), i)
  );
  return o;
};
var o = function (e, t, r) {
  var i = false;
  try {
    var o = e.deflate(t.fragment.getBytes());
    t.fragment = M_OptionsManager_maybe.util.createBuffer(o);
    t.length = o.length;
    i = true;
  } catch (e) {}
  return i;
};
var s = function (e, t, r) {
  var i = false;
  try {
    var o = e.inflate(t.fragment.getBytes());
    t.fragment = M_OptionsManager_maybe.util.createBuffer(o);
    t.length = o.length;
    i = true;
  } catch (e) {}
  return i;
};
var a = function (e, t) {
  var r = 0;
  switch (t) {
    case 1:
      r = e.getByte();
      break;
    case 2:
      r = e.getInt16();
      break;
    case 3:
      r = e.getInt24();
      break;
    case 4:
      r = e.getInt32();
  }
  return M_OptionsManager_maybe.util.createBuffer(e.getBytes(r));
};
var c = function (e, t, r) {
  e.putInt(r.length(), t << 3);
  e.putBuffer(r);
};
var l = {
  Versions: {
    TLS_1_0: {
      major: 3,
      minor: 1,
    },
    TLS_1_1: {
      major: 3,
      minor: 2,
    },
    TLS_1_2: {
      major: 3,
      minor: 3,
    },
  },
};
l.SupportedVersions = [l.Versions.TLS_1_1, l.Versions.TLS_1_0];
l.Version = l.SupportedVersions[0];
l.MaxFragment = 15360;
l.ConnectionEnd = {
  server: 0,
  client: 1,
};
l.PRFAlgorithm = {
  tls_prf_sha256: 0,
};
l.BulkCipherAlgorithm = {
  none: null,
  rc4: 0,
  des3: 1,
  aes: 2,
};
l.CipherType = {
  stream: 0,
  block: 1,
  aead: 2,
};
l.MACAlgorithm = {
  none: null,
  hmac_md5: 0,
  hmac_sha1: 1,
  hmac_sha256: 2,
  hmac_sha384: 3,
  hmac_sha512: 4,
};
l.CompressionMethod = {
  none: 0,
  deflate: 1,
};
l.ContentType = {
  change_cipher_spec: 20,
  alert: 21,
  handshake: 22,
  application_data: 23,
  heartbeat: 24,
};
l.HandshakeType = {
  hello_request: 0,
  client_hello: 1,
  server_hello: 2,
  certificate: 11,
  server_key_exchange: 12,
  certificate_request: 13,
  server_hello_done: 14,
  certificate_verify: 15,
  client_key_exchange: 16,
  finished: 20,
};
l.Alert = {};
l.Alert.Level = {
  warning: 1,
  fatal: 2,
};
l.Alert.Description = {
  close_notify: 0,
  unexpected_message: 10,
  bad_record_mac: 20,
  decryption_failed: 21,
  record_overflow: 22,
  decompression_failure: 30,
  handshake_failure: 40,
  bad_certificate: 42,
  unsupported_certificate: 43,
  certificate_revoked: 44,
  certificate_expired: 45,
  certificate_unknown: 46,
  illegal_parameter: 47,
  unknown_ca: 48,
  access_denied: 49,
  decode_error: 50,
  decrypt_error: 51,
  export_restriction: 60,
  protocol_version: 70,
  insufficient_security: 71,
  internal_error: 80,
  user_canceled: 90,
  no_renegotiation: 100,
};
l.HeartbeatMessageType = {
  heartbeat_request: 1,
  heartbeat_response: 2,
};
l.CipherSuites = {};
l.getCipherSuite = function (e) {
  var t = null;
  for (var r in l.CipherSuites) {
    var n = l.CipherSuites[r];
    if (n.id[0] === e.charCodeAt(0) && n.id[1] === e.charCodeAt(1)) {
      t = n;
      break;
    }
  }
  return t;
};
l.handleUnexpected = function (e, t) {
  if (!e.open && e.entity === l.ConnectionEnd.client) {
    e.error(e, {
      message: "Unexpected message. Received TLS record out of order.",
      send: true,
      alert: {
        level: l.Alert.Level.fatal,
        description: l.Alert.Description.unexpected_message,
      },
    });
  }
};
l.handleHelloRequest = function (e, t, r) {
  if (!e.handshaking && e.handshakes > 0) {
    l.queue(
      e,
      l.createAlert(e, {
        level: l.Alert.Level.warning,
        description: l.Alert.Description.no_renegotiation,
      })
    );
    l.flush(e);
  }
  e.process();
};
l.parseHelloMessage = function (e, t, r) {
  var i = null;
  var o = e.entity === l.ConnectionEnd.client;
  if (r < 38)
    e.error(e, {
      message: o
        ? "Invalid ServerHello message. Message too short."
        : "Invalid ClientHello message. Message too short.",
      send: true,
      alert: {
        level: l.Alert.Level.fatal,
        description: l.Alert.Description.illegal_parameter,
      },
    });
  else {
    var s = t.fragment;
    var c = s.length();
    i = {
      version: {
        major: s.getByte(),
        minor: s.getByte(),
      },
      random: M_OptionsManager_maybe.util.createBuffer(s.getBytes(32)),
      session_id: a(s, 1),
      extensions: [],
    };
    if (o) {
      i.cipher_suite = s.getBytes(2);
      i.compression_method = s.getByte();
    } else {
      i.cipher_suites = a(s, 2);
      i.compression_methods = a(s, 1);
    }
    if ((c = r - (c - s.length())) > 0) {
      for (var u = a(s, 2); u.length() > 0; )
        i.extensions.push({
          type: [u.getByte(), u.getByte()],
          data: a(u, 2),
        });
      if (!o)
        for (var d = 0; d < i.extensions.length; ++d) {
          var p = i.extensions[d];
          if (0 === p.type[0] && 0 === p.type[1])
            for (var h = a(p.data, 2); h.length() > 0 && 0 === h.getByte(); )
              e.session.extensions.server_name.serverNameList.push(
                a(h, 2).getBytes()
              );
        }
    }
    if (
      e.session.version &&
      (i.version.major !== e.session.version.major ||
        i.version.minor !== e.session.version.minor)
    )
      return e.error(e, {
        message: "TLS version change is disallowed during renegotiation.",
        send: true,
        alert: {
          level: l.Alert.Level.fatal,
          description: l.Alert.Description.protocol_version,
        },
      });
    if (o) e.session.cipherSuite = l.getCipherSuite(i.cipher_suite);
    else
      for (
        var f = M_OptionsManager_maybe.util.createBuffer(
          i.cipher_suites.bytes()
        );
        f.length() > 0 &&
        ((e.session.cipherSuite = l.getCipherSuite(f.getBytes(2))),
        null === e.session.cipherSuite);

      );
    if (null === e.session.cipherSuite)
      return e.error(e, {
        message: "No cipher suites in common.",
        send: true,
        alert: {
          level: l.Alert.Level.fatal,
          description: l.Alert.Description.handshake_failure,
        },
        cipherSuite: M_OptionsManager_maybe.util.bytesToHex(i.cipher_suite),
      });
    e.session.compressionMethod = o
      ? i.compression_method
      : l.CompressionMethod.none;
  }
  return i;
};
l.createSecurityParameters = function (e, t) {
  var r = e.entity === l.ConnectionEnd.client;
  var n = t.random.bytes();
  var i = r ? e.session.sp.client_random : n;
  var o = r ? n : l.createRandom().getBytes();
  e.session.sp = {
    entity: e.entity,
    prf_algorithm: l.PRFAlgorithm.tls_prf_sha256,
    bulk_cipher_algorithm: null,
    cipher_type: null,
    enc_key_length: null,
    block_length: null,
    fixed_iv_length: null,
    record_iv_length: null,
    mac_algorithm: null,
    mac_length: null,
    mac_key_length: null,
    compression_algorithm: e.session.compressionMethod,
    pre_master_secret: null,
    master_secret: null,
    client_random: i,
    server_random: o,
  };
};
l.handleServerHello = function (e, t, r) {
  var n = l.parseHelloMessage(e, t, r);
  if (!e.fail) {
    if (!(n.version.minor <= e.version.minor))
      return e.error(e, {
        message: "Incompatible TLS version.",
        send: true,
        alert: {
          level: l.Alert.Level.fatal,
          description: l.Alert.Description.protocol_version,
        },
      });
    e.version.minor = n.version.minor;
    e.session.version = e.version;
    var i = n.session_id.bytes();
    if (i.length > 0 && i === e.session.id) {
      e.expect = f;
      e.session.resuming = true;
      e.session.sp.server_random = n.random.bytes();
    } else {
      e.expect = u;
      e.session.resuming = false;
      l.createSecurityParameters(e, n);
    }
    e.session.id = i;
    e.process();
  }
};
l.handleClientHello = function (e, t, r) {
  var i = l.parseHelloMessage(e, t, r);
  if (!e.fail) {
    var o = i.session_id.bytes();
    var s = null;
    if (e.sessionCache) {
      if (null === (s = e.sessionCache.getSession(o))) {
        o = "";
      } else {
        if (
          s.version.major !== i.version.major ||
          s.version.minor > i.version.minor
        ) {
          s = null;
          o = "";
        }
      }
    }
    if (0 === o.length) {
      o = M_OptionsManager_maybe.random.getBytes(32);
    }
    e.session.id = o;
    e.session.clientHelloVersion = i.version;
    e.session.sp = {};
    if (s) (e.version = e.session.version = s.version), (e.session.sp = s.sp);
    else {
      for (
        var a, c = 1;
        c < l.SupportedVersions.length &&
        !((a = l.SupportedVersions[c]).minor <= i.version.minor);
        ++c
      );
      (e.version = {
        major: a.major,
        minor: a.minor,
      }),
        (e.session.version = e.version);
    }
    if (null !== s) {
      e.expect = w;
      e.session.resuming = true;
      e.session.sp.client_random = i.random.bytes();
    } else {
      e.expect = false !== e.verifyClient ? v : _;
      e.session.resuming = false;
      l.createSecurityParameters(e, i);
    }
    e.open = true;
    l.queue(
      e,
      l.createRecord(e, {
        type: l.ContentType.handshake,
        data: l.createServerHello(e),
      })
    );
    if (e.session.resuming) {
      l.queue(
        e,
        l.createRecord(e, {
          type: l.ContentType.change_cipher_spec,
          data: l.createChangeCipherSpec(),
        })
      );
      e.state.pending = l.createConnectionState(e);
      e.state.current.write = e.state.pending.write;
      l.queue(
        e,
        l.createRecord(e, {
          type: l.ContentType.handshake,
          data: l.createFinished(e),
        })
      );
    } else {
      l.queue(
        e,
        l.createRecord(e, {
          type: l.ContentType.handshake,
          data: l.createCertificate(e),
        })
      );
      if (e.fail) {
        l.queue(
          e,
          l.createRecord(e, {
            type: l.ContentType.handshake,
            data: l.createServerKeyExchange(e),
          })
        );
        if (false !== e.verifyClient) {
          l.queue(
            e,
            l.createRecord(e, {
              type: l.ContentType.handshake,
              data: l.createCertificateRequest(e),
            })
          );
        }
        l.queue(
          e,
          l.createRecord(e, {
            type: l.ContentType.handshake,
            data: l.createServerHelloDone(e),
          })
        );
      }
    }
    l.flush(e);
    e.process();
  }
};
l.handleCertificate = function (e, t, r) {
  if (r < 3)
    return e.error(e, {
      message: "Invalid Certificate message. Message too short.",
      send: true,
      alert: {
        level: l.Alert.Level.fatal,
        description: l.Alert.Description.illegal_parameter,
      },
    });
  var i;
  var o;
  var s = t.fragment;
  var c = {
    certificate_list: a(s, 3),
  };
  var u = [];
  try {
    for (; c.certificate_list.length() > 0; ) {
      i = a(c.certificate_list, 3);
      o = M_OptionsManager_maybe.asn1.fromDer(i);
      i = M_OptionsManager_maybe.pki.certificateFromAsn1(o, true);
      u.push(i);
    }
  } catch (t) {
    return e.error(e, {
      message: "Could not parse certificate list.",
      cause: t,
      send: true,
      alert: {
        level: l.Alert.Level.fatal,
        description: l.Alert.Description.bad_certificate,
      },
    });
  }
  var p = e.entity === l.ConnectionEnd.client;
  if ((!p && true !== e.verifyClient) || 0 !== u.length) {
    if (0 === u.length) {
      e.expect = p ? d : _;
    } else {
      if (p) {
        e.session.serverCertificate = u[0];
      } else {
        e.session.clientCertificate = u[0];
      }
      if (l.verifyCertificateChain(e, u)) {
        e.expect = p ? d : _;
      }
    }
  } else {
    e.error(e, {
      message: p
        ? "No server certificate provided."
        : "No client certificate provided.",
      send: true,
      alert: {
        level: l.Alert.Level.fatal,
        description: l.Alert.Description.illegal_parameter,
      },
    });
  }
  e.process();
};
l.handleServerKeyExchange = function (e, t, r) {
  if (r > 0)
    return e.error(e, {
      message: "Invalid key parameters. Only RSA is supported.",
      send: true,
      alert: {
        level: l.Alert.Level.fatal,
        description: l.Alert.Description.unsupported_certificate,
      },
    });
  e.expect = p;
  e.process();
};
l.handleClientKeyExchange = function (e, t, r) {
  if (r < 48)
    return e.error(e, {
      message: "Invalid key parameters. Only RSA is supported.",
      send: true,
      alert: {
        level: l.Alert.Level.fatal,
        description: l.Alert.Description.unsupported_certificate,
      },
    });
  var i = t.fragment;
  var o = {
    enc_pre_master_secret: a(i, 2).getBytes(),
  };
  var s = null;
  if (e.getPrivateKey)
    try {
      s = e.getPrivateKey(e, e.session.serverCertificate);
      s = M_OptionsManager_maybe.pki.privateKeyFromPem(s);
    } catch (t) {
      e.error(e, {
        message: "Could not get private key.",
        cause: t,
        send: true,
        alert: {
          level: l.Alert.Level.fatal,
          description: l.Alert.Description.internal_error,
        },
      });
    }
  if (null === s)
    return e.error(e, {
      message: "No private key set.",
      send: true,
      alert: {
        level: l.Alert.Level.fatal,
        description: l.Alert.Description.internal_error,
      },
    });
  try {
    var c = e.session.sp;
    c.pre_master_secret = s.decrypt(o.enc_pre_master_secret);
    var u = e.session.clientHelloVersion;
    if (
      u.major !== c.pre_master_secret.charCodeAt(0) ||
      u.minor !== c.pre_master_secret.charCodeAt(1)
    )
      throw new Error("TLS version rollback attack detected.");
  } catch (e) {
    c.pre_master_secret = M_OptionsManager_maybe.random.getBytes(48);
  }
  e.expect = w;
  if (null !== e.session.clientCertificate) {
    e.expect = b;
  }
  e.process();
};
l.handleCertificateRequest = function (e, t, r) {
  if (r < 3)
    return e.error(e, {
      message: "Invalid CertificateRequest. Message too short.",
      send: true,
      alert: {
        level: l.Alert.Level.fatal,
        description: l.Alert.Description.illegal_parameter,
      },
    });
  var n = t.fragment;
  var i = {
    certificate_types: a(n, 1),
    certificate_authorities: a(n, 2),
  };
  e.session.certificateRequest = i;
  e.expect = h;
  e.process();
};
l.handleCertificateVerify = function (e, t, r) {
  if (r < 2)
    return e.error(e, {
      message: "Invalid CertificateVerify. Message too short.",
      send: true,
      alert: {
        level: l.Alert.Level.fatal,
        description: l.Alert.Description.illegal_parameter,
      },
    });
  var i = t.fragment;
  i.read -= 4;
  var o = i.bytes();
  i.read += 4;
  var s = {
    signature: a(i, 2).getBytes(),
  };
  var c = M_OptionsManager_maybe.util.createBuffer();
  c.putBuffer(e.session.md5.digest());
  c.putBuffer(e.session.sha1.digest());
  c = c.getBytes();
  try {
    if (!e.session.clientCertificate.publicKey.verify(c, s.signature, "NONE"))
      throw new Error("CertificateVerify signature does not match.");
    e.session.md5.update(o);
    e.session.sha1.update(o);
  } catch (t) {
    return e.error(e, {
      message: "Bad signature in CertificateVerify.",
      send: true,
      alert: {
        level: l.Alert.Level.fatal,
        description: l.Alert.Description.handshake_failure,
      },
    });
  }
  e.expect = w;
  e.process();
};
l.handleServerHelloDone = function (e, t, r) {
  if (r > 0)
    return e.error(e, {
      message: "Invalid ServerHelloDone message. Invalid length.",
      send: true,
      alert: {
        level: l.Alert.Level.fatal,
        description: l.Alert.Description.record_overflow,
      },
    });
  if (null === e.serverCertificate) {
    var i = {
      message: "No server certificate provided. Not enough security.",
      send: true,
      alert: {
        level: l.Alert.Level.fatal,
        description: l.Alert.Description.insufficient_security,
      },
    };
    var o = e.verify(e, i.alert.description, 0, []);
    if (true !== o) {
      if (o || 0 === o) {
        if ("object" != typeof o || M_OptionsManager_maybe.util.isArray(o)) {
          if ("number" == typeof o) {
            i.alert.description = o;
          }
        } else {
          if (o.message) {
            i.message = o.message;
          }
          if (o.alert) {
            i.alert.description = o.alert;
          }
        }
      }
      return e.error(e, i);
    }
  }
  if (null !== e.session.certificateRequest) {
    t = l.createRecord(e, {
      type: l.ContentType.handshake,
      data: l.createCertificate(e),
    });
    l.queue(e, t);
  }
  t = l.createRecord(e, {
    type: l.ContentType.handshake,
    data: l.createClientKeyExchange(e),
  });
  l.queue(e, t);
  e.expect = y;
  var s = function (e, t) {
    if (
      null !== e.session.certificateRequest &&
      null !== e.session.clientCertificate
    ) {
      l.queue(
        e,
        l.createRecord(e, {
          type: l.ContentType.handshake,
          data: l.createCertificateVerify(e, t),
        })
      );
    }
    l.queue(
      e,
      l.createRecord(e, {
        type: l.ContentType.change_cipher_spec,
        data: l.createChangeCipherSpec(),
      })
    );
    e.state.pending = l.createConnectionState(e);
    e.state.current.write = e.state.pending.write;
    l.queue(
      e,
      l.createRecord(e, {
        type: l.ContentType.handshake,
        data: l.createFinished(e),
      })
    );
    e.expect = f;
    l.flush(e);
    e.process();
  };
  if (
    null === e.session.certificateRequest ||
    null === e.session.clientCertificate
  )
    return s(e, null);
  l.getClientSignature(e, s);
};
l.handleChangeCipherSpec = function (e, t) {
  if (1 !== t.fragment.getByte())
    return e.error(e, {
      message: "Invalid ChangeCipherSpec message received.",
      send: true,
      alert: {
        level: l.Alert.Level.fatal,
        description: l.Alert.Description.illegal_parameter,
      },
    });
  var r = e.entity === l.ConnectionEnd.client;
  if ((e.session.resuming && r) || (!e.session.resuming && !r)) {
    e.state.pending = l.createConnectionState(e);
  }
  e.state.current.read = e.state.pending.read;
  if ((!e.session.resuming && r) || (e.session.resuming && !r)) {
    e.state.pending = null;
  }
  e.expect = r ? g : C;
  e.process();
};
l.handleFinished = function (e, t, r) {
  var o = t.fragment;
  o.read -= 4;
  var s = o.bytes();
  o.read += 4;
  var a = t.fragment.getBytes();
  (o = M_OptionsManager_maybe.util.createBuffer()).putBuffer(
    e.session.md5.digest()
  );
  o.putBuffer(e.session.sha1.digest());
  var c = e.entity === l.ConnectionEnd.client;
  var u = c ? "server finished" : "client finished";
  var d = e.session.sp;
  if ((o = i(d.master_secret, u, o.getBytes(), 12)).getBytes() !== a)
    return e.error(e, {
      message: "Invalid verify_data in Finished message.",
      send: true,
      alert: {
        level: l.Alert.Level.fatal,
        description: l.Alert.Description.decrypt_error,
      },
    });
  e.session.md5.update(s);
  e.session.sha1.update(s);
  if ((e.session.resuming && c) || (!e.session.resuming && !c)) {
    l.queue(
      e,
      l.createRecord(e, {
        type: l.ContentType.change_cipher_spec,
        data: l.createChangeCipherSpec(),
      })
    );
    e.state.current.write = e.state.pending.write;
    e.state.pending = null;
    l.queue(
      e,
      l.createRecord(e, {
        type: l.ContentType.handshake,
        data: l.createFinished(e),
      })
    );
  }
  e.expect = c ? m : E;
  e.handshaking = false;
  ++e.handshakes;
  e.peerCertificate = c
    ? e.session.serverCertificate
    : e.session.clientCertificate;
  l.flush(e);
  e.isConnected = true;
  e.connected(e);
  e.process();
};
l.handleAlert = function (e, t) {
  var r;
  var n = t.fragment;
  var i = {
    level: n.getByte(),
    description: n.getByte(),
  };
  switch (i.description) {
    case l.Alert.Description.close_notify:
      r = "Connection closed.";
      break;
    case l.Alert.Description.unexpected_message:
      r = "Unexpected message.";
      break;
    case l.Alert.Description.bad_record_mac:
      r = "Bad record MAC.";
      break;
    case l.Alert.Description.decryption_failed:
      r = "Decryption failed.";
      break;
    case l.Alert.Description.record_overflow:
      r = "Record overflow.";
      break;
    case l.Alert.Description.decompression_failure:
      r = "Decompression failed.";
      break;
    case l.Alert.Description.handshake_failure:
      r = "Handshake failure.";
      break;
    case l.Alert.Description.bad_certificate:
      r = "Bad certificate.";
      break;
    case l.Alert.Description.unsupported_certificate:
      r = "Unsupported certificate.";
      break;
    case l.Alert.Description.certificate_revoked:
      r = "Certificate revoked.";
      break;
    case l.Alert.Description.certificate_expired:
      r = "Certificate expired.";
      break;
    case l.Alert.Description.certificate_unknown:
      r = "Certificate unknown.";
      break;
    case l.Alert.Description.illegal_parameter:
      r = "Illegal parameter.";
      break;
    case l.Alert.Description.unknown_ca:
      r = "Unknown certificate authority.";
      break;
    case l.Alert.Description.access_denied:
      r = "Access denied.";
      break;
    case l.Alert.Description.decode_error:
      r = "Decode error.";
      break;
    case l.Alert.Description.decrypt_error:
      r = "Decrypt error.";
      break;
    case l.Alert.Description.export_restriction:
      r = "Export restriction.";
      break;
    case l.Alert.Description.protocol_version:
      r = "Unsupported protocol version.";
      break;
    case l.Alert.Description.insufficient_security:
      r = "Insufficient security.";
      break;
    case l.Alert.Description.internal_error:
      r = "Internal error.";
      break;
    case l.Alert.Description.user_canceled:
      r = "User canceled.";
      break;
    case l.Alert.Description.no_renegotiation:
      r = "Renegotiation not supported.";
      break;
    default:
      r = "Unknown error.";
  }
  if (i.description === l.Alert.Description.close_notify) return e.close();
  e.error(e, {
    message: r,
    send: false,
    origin: e.entity === l.ConnectionEnd.client ? "server" : "client",
    alert: i,
  });
  e.process();
};
l.handleHandshake = function (e, t) {
  var r = t.fragment;
  var i = r.getByte();
  var o = r.getInt24();
  if (o > r.length()) {
    e.fragmented = t;
    t.fragment = M_OptionsManager_maybe.util.createBuffer();
    r.read -= 4;
    return e.process();
  }
  e.fragmented = null;
  r.read -= 4;
  var s = r.bytes(o + 4);
  r.read += 4;
  if (i in F[e.entity][e.expect]) {
    if (e.entity !== l.ConnectionEnd.server || e.open || e.fail) {
      e.handshaking = true;
      e.session = {
        version: null,
        extensions: {
          server_name: {
            serverNameList: [],
          },
        },
        cipherSuite: null,
        compressionMethod: null,
        serverCertificate: null,
        clientCertificate: null,
        md5: M_OptionsManager_maybe.md.md5.create(),
        sha1: M_OptionsManager_maybe.md.sha1.create(),
      };
    }
    if (
      i !== l.HandshakeType.hello_request &&
      i !== l.HandshakeType.certificate_verify &&
      i !== l.HandshakeType.finished
    ) {
      e.session.md5.update(s);
      e.session.sha1.update(s);
    }
    F[e.entity][e.expect][i](e, t, o);
  } else {
    l.handleUnexpected(e, t);
  }
};
l.handleApplicationData = function (e, t) {
  e.data.putBuffer(t.fragment);
  e.dataReady(e);
  e.process();
};
l.handleHeartbeat = function (e, t) {
  var r = t.fragment;
  var i = r.getByte();
  var o = r.getInt16();
  var s = r.getBytes(o);
  if (i === l.HeartbeatMessageType.heartbeat_request) {
    if (e.handshaking || o > s.length) return e.process();
    l.queue(
      e,
      l.createRecord(e, {
        type: l.ContentType.heartbeat,
        data: l.createHeartbeat(l.HeartbeatMessageType.heartbeat_response, s),
      })
    );
    l.flush(e);
  } else if (i === l.HeartbeatMessageType.heartbeat_response) {
    if (s !== e.expectedHeartbeatPayload) return e.process();
    if (e.heartbeatReceived) {
      e.heartbeatReceived(e, M_OptionsManager_maybe.util.createBuffer(s));
    }
  }
  e.process();
};
var u = 1;
var d = 2;
var p = 3;
var h = 4;
var f = 5;
var g = 6;
var m = 7;
var y = 8;
var v = 1;
var _ = 2;
var b = 3;
var w = 4;
var C = 5;
var E = 6;
var T = l.handleUnexpected;
var S = l.handleChangeCipherSpec;
var x = l.handleAlert;
var k = l.handleHandshake;
var I = l.handleApplicationData;
var A = l.handleHeartbeat;
var P = [];
P[l.ConnectionEnd.client] = [
  [T, x, k, T, A],
  [T, x, k, T, A],
  [T, x, k, T, A],
  [T, x, k, T, A],
  [T, x, k, T, A],
  [S, x, T, T, A],
  [T, x, k, T, A],
  [T, x, k, I, A],
  [T, x, k, T, A],
];
P[l.ConnectionEnd.server] = [
  [T, x, k, T, A],
  [T, x, k, T, A],
  [T, x, k, T, A],
  [T, x, k, T, A],
  [S, x, T, T, A],
  [T, x, k, T, A],
  [T, x, k, I, A],
  [T, x, k, T, A],
];
var R = l.handleHelloRequest;
var N = l.handleServerHello;
var O = l.handleCertificate;
var L = l.handleServerKeyExchange;
var D = l.handleCertificateRequest;
var M = l.handleServerHelloDone;
var B = l.handleFinished;
var F = [];
F[l.ConnectionEnd.client] = [
  [T, T, N, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
  [R, T, T, T, T, T, T, T, T, T, T, O, L, D, M, T, T, T, T, T, T],
  [R, T, T, T, T, T, T, T, T, T, T, T, L, D, M, T, T, T, T, T, T],
  [R, T, T, T, T, T, T, T, T, T, T, T, T, D, M, T, T, T, T, T, T],
  [R, T, T, T, T, T, T, T, T, T, T, T, T, T, M, T, T, T, T, T, T],
  [R, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
  [R, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, B],
  [R, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
  [R, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
];
var j = l.handleClientHello;
var U = l.handleClientKeyExchange;
var $ = l.handleCertificateVerify;
F[l.ConnectionEnd.server] = [
  [T, j, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T, T, T, T, O, T, T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, U, T, T, T, T],
  [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, $, T, T, T, T, T],
  [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, B],
  [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
];
l.generateKeys = function (e, t) {
  var r = i;
  var n = t.client_random + t.server_random;
  if (e.session.resuming) {
    t.master_secret = r(t.pre_master_secret, "master secret", n, 48).bytes();
    t.pre_master_secret = null;
  }
  n = t.server_random + t.client_random;
  var o = 2 * t.mac_key_length + 2 * t.enc_key_length;
  var s =
    e.version.major === l.Versions.TLS_1_0.major &&
    e.version.minor === l.Versions.TLS_1_0.minor;
  if (s) {
    o += 2 * t.fixed_iv_length;
  }
  var a = r(t.master_secret, "key expansion", n, o);
  var c = {
    client_write_MAC_key: a.getBytes(t.mac_key_length),
    server_write_MAC_key: a.getBytes(t.mac_key_length),
    client_write_key: a.getBytes(t.enc_key_length),
    server_write_key: a.getBytes(t.enc_key_length),
  };
  if (s) {
    c.client_write_IV = a.getBytes(t.fixed_iv_length);
    c.server_write_IV = a.getBytes(t.fixed_iv_length);
  }
  return c;
};
l.createConnectionState = function (e) {
  var t = e.entity === l.ConnectionEnd.client;
  var r = function () {
    var e = {
      sequenceNumber: [0, 0],
      macKey: null,
      macLength: 0,
      macFunction: null,
      cipherState: null,
      cipherFunction: function (e) {
        return true;
      },
      compressionState: null,
      compressFunction: function (e) {
        return true;
      },
      updateSequenceNumber: function () {
        if (4294967295 === e.sequenceNumber[1]) {
          e.sequenceNumber[1] = 0;
          ++e.sequenceNumber[0];
        } else {
          ++e.sequenceNumber[1];
        }
      },
    };
    return e;
  };
  var n = {
    read: r(),
    write: r(),
  };
  n.read.update = function (e, t) {
    if (n.read.cipherFunction(t, n.read)) {
      if (n.read.compressFunction(e, t, n.read)) {
        e.error(e, {
          message: "Could not decompress record.",
          send: true,
          alert: {
            level: l.Alert.Level.fatal,
            description: l.Alert.Description.decompression_failure,
          },
        });
      }
    } else {
      e.error(e, {
        message: "Could not decrypt record or bad MAC.",
        send: true,
        alert: {
          level: l.Alert.Level.fatal,
          description: l.Alert.Description.bad_record_mac,
        },
      });
    }
    return !e.fail;
  };
  n.write.update = function (e, t) {
    if (n.write.compressFunction(e, t, n.write)) {
      if (n.write.cipherFunction(t, n.write)) {
        e.error(e, {
          message: "Could not encrypt record.",
          send: false,
          alert: {
            level: l.Alert.Level.fatal,
            description: l.Alert.Description.internal_error,
          },
        });
      }
    } else {
      e.error(e, {
        message: "Could not compress record.",
        send: false,
        alert: {
          level: l.Alert.Level.fatal,
          description: l.Alert.Description.internal_error,
        },
      });
    }
    return !e.fail;
  };
  if (e.session) {
    var i = e.session.sp;
    switch (
      (e.session.cipherSuite.initSecurityParameters(i),
      (i.keys = l.generateKeys(e, i)),
      (n.read.macKey = t
        ? i.keys.server_write_MAC_key
        : i.keys.client_write_MAC_key),
      (n.write.macKey = t
        ? i.keys.client_write_MAC_key
        : i.keys.server_write_MAC_key),
      e.session.cipherSuite.initConnectionState(n, e, i),
      i.compression_algorithm)
    ) {
      case l.CompressionMethod.none:
        break;
      case l.CompressionMethod.deflate:
        (n.read.compressFunction = s), (n.write.compressFunction = o);
        break;
      default:
        throw new Error("Unsupported compression algorithm.");
    }
  }
  return n;
};
l.createRandom = function () {
  var e = new Date();
  var t = +e + 6e4 * e.getTimezoneOffset();
  var r = M_OptionsManager_maybe.util.createBuffer();
  r.putInt32(t);
  r.putBytes(M_OptionsManager_maybe.random.getBytes(28));
  return r;
};
l.createRecord = function (e, t) {
  return t.data
    ? {
        type: t.type,
        version: {
          major: e.version.major,
          minor: e.version.minor,
        },
        length: t.data.length(),
        fragment: t.data,
      }
    : null;
};
l.createAlert = function (e, t) {
  var r = M_OptionsManager_maybe.util.createBuffer();
  r.putByte(t.level);
  r.putByte(t.description);
  return l.createRecord(e, {
    type: l.ContentType.alert,
    data: r,
  });
};
l.createClientHello = function (e) {
  e.session.clientHelloVersion = {
    major: e.version.major,
    minor: e.version.minor,
  };
  for (
    t = M_OptionsManager_maybe.util.createBuffer(), r = 0, undefined;
    r < e.cipherSuites.length;
    ++r
  ) {
    var t;
    var r;
    var i = e.cipherSuites[r];
    t.putByte(i.id[0]);
    t.putByte(i.id[1]);
  }
  var o = t.length();
  var s = M_OptionsManager_maybe.util.createBuffer();
  s.putByte(l.CompressionMethod.none);
  var a = s.length();
  var u = M_OptionsManager_maybe.util.createBuffer();
  if (e.virtualHost) {
    var d = M_OptionsManager_maybe.util.createBuffer();
    d.putByte(0);
    d.putByte(0);
    var p = M_OptionsManager_maybe.util.createBuffer();
    p.putByte(0);
    c(p, 2, M_OptionsManager_maybe.util.createBuffer(e.virtualHost));
    var h = M_OptionsManager_maybe.util.createBuffer();
    c(h, 2, p);
    c(d, 2, h);
    u.putBuffer(d);
  }
  var f = u.length();
  if (f > 0) {
    f += 2;
  }
  var g = e.session.id;
  var m = g.length + 1 + 2 + 4 + 28 + 2 + o + 1 + a + f;
  var y = M_OptionsManager_maybe.util.createBuffer();
  y.putByte(l.HandshakeType.client_hello);
  y.putInt24(m);
  y.putByte(e.version.major);
  y.putByte(e.version.minor);
  y.putBytes(e.session.sp.client_random);
  c(y, 1, M_OptionsManager_maybe.util.createBuffer(g));
  c(y, 2, t);
  c(y, 1, s);
  if (f > 0) {
    c(y, 2, u);
  }
  return y;
};
l.createServerHello = function (e) {
  var t = e.session.id;
  var r = t.length + 1 + 2 + 4 + 28 + 2 + 1;
  var i = M_OptionsManager_maybe.util.createBuffer();
  i.putByte(l.HandshakeType.server_hello);
  i.putInt24(r);
  i.putByte(e.version.major);
  i.putByte(e.version.minor);
  i.putBytes(e.session.sp.server_random);
  c(i, 1, M_OptionsManager_maybe.util.createBuffer(t));
  i.putByte(e.session.cipherSuite.id[0]);
  i.putByte(e.session.cipherSuite.id[1]);
  i.putByte(e.session.compressionMethod);
  return i;
};
l.createCertificate = function (e) {
  var t;
  var r = e.entity === l.ConnectionEnd.client;
  var i = null;
  if (e.getCertificate) {
    t = r
      ? e.session.certificateRequest
      : e.session.extensions.server_name.serverNameList;
    i = e.getCertificate(e, t);
  }
  var o = M_OptionsManager_maybe.util.createBuffer();
  if (null !== i)
    try {
      if (M_OptionsManager_maybe.util.isArray(i)) {
        i = [i];
      }
      for (s = null, a = 0, undefined; a < i.length; ++a) {
        var s;
        var a;
        var u = M_OptionsManager_maybe.pem.decode(i[a])[0];
        if (
          "CERTIFICATE" !== u.type &&
          "X509 CERTIFICATE" !== u.type &&
          "TRUSTED CERTIFICATE" !== u.type
        ) {
          var d = new Error(
            'Could not convert certificate from PEM; PEM header type is not "CERTIFICATE", "X509 CERTIFICATE", or "TRUSTED CERTIFICATE".'
          );
          throw ((d.headerType = u.type), d);
        }
        if (u.procType && "ENCRYPTED" === u.procType.type)
          throw new Error(
            "Could not convert certificate from PEM; PEM is encrypted."
          );
        var p = M_OptionsManager_maybe.util.createBuffer(u.body);
        if (null === s) {
          s = M_OptionsManager_maybe.asn1.fromDer(p.bytes(), false);
        }
        var h = M_OptionsManager_maybe.util.createBuffer();
        c(h, 3, p);
        o.putBuffer(h);
      }
      i = M_OptionsManager_maybe.pki.certificateFromAsn1(s);
      if (r) {
        e.session.clientCertificate = i;
      } else {
        e.session.serverCertificate = i;
      }
    } catch (t) {
      return e.error(e, {
        message: "Could not send certificate list.",
        cause: t,
        send: true,
        alert: {
          level: l.Alert.Level.fatal,
          description: l.Alert.Description.bad_certificate,
        },
      });
    }
  var f = 3 + o.length();
  var g = M_OptionsManager_maybe.util.createBuffer();
  g.putByte(l.HandshakeType.certificate);
  g.putInt24(f);
  c(g, 3, o);
  return g;
};
l.createClientKeyExchange = function (e) {
  var t = M_OptionsManager_maybe.util.createBuffer();
  t.putByte(e.session.clientHelloVersion.major);
  t.putByte(e.session.clientHelloVersion.minor);
  t.putBytes(M_OptionsManager_maybe.random.getBytes(46));
  var r = e.session.sp;
  r.pre_master_secret = t.getBytes();
  var i =
    (t = e.session.serverCertificate.publicKey.encrypt(r.pre_master_secret))
      .length + 2;
  var o = M_OptionsManager_maybe.util.createBuffer();
  o.putByte(l.HandshakeType.client_key_exchange);
  o.putInt24(i);
  o.putInt16(t.length);
  o.putBytes(t);
  return o;
};
l.createServerKeyExchange = function (e) {
  return M_OptionsManager_maybe.util.createBuffer();
};
l.getClientSignature = function (e, t) {
  var r = M_OptionsManager_maybe.util.createBuffer();
  r.putBuffer(e.session.md5.digest());
  r.putBuffer(e.session.sha1.digest());
  r = r.getBytes();
  e.getSignature =
    e.getSignature ||
    function (e, t, r) {
      var i = null;
      if (e.getPrivateKey)
        try {
          i = e.getPrivateKey(e, e.session.clientCertificate);
          i = M_OptionsManager_maybe.pki.privateKeyFromPem(i);
        } catch (t) {
          e.error(e, {
            message: "Could not get private key.",
            cause: t,
            send: true,
            alert: {
              level: l.Alert.Level.fatal,
              description: l.Alert.Description.internal_error,
            },
          });
        }
      if (null === i) {
        e.error(e, {
          message: "No private key set.",
          send: true,
          alert: {
            level: l.Alert.Level.fatal,
            description: l.Alert.Description.internal_error,
          },
        });
      } else {
        t = i.sign(t, null);
      }
      r(e, t);
    };
  e.getSignature(e, r, t);
};
l.createCertificateVerify = function (e, t) {
  var r = t.length + 2;
  var i = M_OptionsManager_maybe.util.createBuffer();
  i.putByte(l.HandshakeType.certificate_verify);
  i.putInt24(r);
  i.putInt16(t.length);
  i.putBytes(t);
  return i;
};
l.createCertificateRequest = function (e) {
  var t = M_OptionsManager_maybe.util.createBuffer();
  t.putByte(1);
  var r = M_OptionsManager_maybe.util.createBuffer();
  for (var i in e.caStore.certs) {
    var o = e.caStore.certs[i];
    var s = M_OptionsManager_maybe.pki.distinguishedNameToAsn1(o.subject);
    var a = M_OptionsManager_maybe.asn1.toDer(s);
    r.putInt16(a.length());
    r.putBuffer(a);
  }
  var u = 1 + t.length() + 2 + r.length();
  var d = M_OptionsManager_maybe.util.createBuffer();
  d.putByte(l.HandshakeType.certificate_request);
  d.putInt24(u);
  c(d, 1, t);
  c(d, 2, r);
  return d;
};
l.createServerHelloDone = function (e) {
  var t = M_OptionsManager_maybe.util.createBuffer();
  t.putByte(l.HandshakeType.server_hello_done);
  t.putInt24(0);
  return t;
};
l.createChangeCipherSpec = function () {
  var e = M_OptionsManager_maybe.util.createBuffer();
  e.putByte(1);
  return e;
};
l.createFinished = function (e) {
  var t = M_OptionsManager_maybe.util.createBuffer();
  t.putBuffer(e.session.md5.digest());
  t.putBuffer(e.session.sha1.digest());
  var r = e.entity === l.ConnectionEnd.client;
  var o = e.session.sp;
  var s = r ? "client finished" : "server finished";
  t = i(o.master_secret, s, t.getBytes(), 12);
  var a = M_OptionsManager_maybe.util.createBuffer();
  a.putByte(l.HandshakeType.finished);
  a.putInt24(t.length());
  a.putBuffer(t);
  return a;
};
l.createHeartbeat = function (e, t, r) {
  if (undefined === r) {
    r = t.length;
  }
  var i = M_OptionsManager_maybe.util.createBuffer();
  i.putByte(e);
  i.putInt16(r);
  i.putBytes(t);
  var o = i.length();
  var s = Math.max(16, o - r - 3);
  i.putBytes(M_OptionsManager_maybe.random.getBytes(s));
  return i;
};
l.queue = function (e, t) {
  if (
    t &&
    (0 !== t.fragment.length() ||
      (t.type !== l.ContentType.handshake &&
        t.type !== l.ContentType.alert &&
        t.type !== l.ContentType.change_cipher_spec))
  ) {
    if (t.type === l.ContentType.handshake) {
      var r = t.fragment.bytes();
      e.session.md5.update(r);
      e.session.sha1.update(r);
      r = null;
    }
    var i;
    if (t.fragment.length() <= l.MaxFragment) i = [t];
    else {
      i = [];
      for (var o = t.fragment.bytes(); o.length > l.MaxFragment; ) {
        i.push(
          l.createRecord(e, {
            type: t.type,
            data: M_OptionsManager_maybe.util.createBuffer(
              o.slice(0, l.MaxFragment)
            ),
          })
        );
        o = o.slice(l.MaxFragment);
      }
      if (o.length > 0) {
        i.push(
          l.createRecord(e, {
            type: t.type,
            data: M_OptionsManager_maybe.util.createBuffer(o),
          })
        );
      }
    }
    for (var s = 0; s < i.length && !e.fail; ++s) {
      var a = i[s];
      if (e.state.current.write.update(e, a)) {
        e.records.push(a);
      }
    }
  }
};
l.flush = function (e) {
  for (var t = 0; t < e.records.length; ++t) {
    var r = e.records[t];
    e.tlsData.putByte(r.type);
    e.tlsData.putByte(r.version.major);
    e.tlsData.putByte(r.version.minor);
    e.tlsData.putInt16(r.fragment.length());
    e.tlsData.putBuffer(e.records[t].fragment);
  }
  e.records = [];
  return e.tlsDataReady(e);
};
var q = function (e) {
  switch (e) {
    case true:
      return true;
    case M_OptionsManager_maybe.pki.certificateError.bad_certificate:
      return l.Alert.Description.bad_certificate;
    case M_OptionsManager_maybe.pki.certificateError.unsupported_certificate:
      return l.Alert.Description.unsupported_certificate;
    case M_OptionsManager_maybe.pki.certificateError.certificate_revoked:
      return l.Alert.Description.certificate_revoked;
    case M_OptionsManager_maybe.pki.certificateError.certificate_expired:
      return l.Alert.Description.certificate_expired;
    case M_OptionsManager_maybe.pki.certificateError.certificate_unknown:
      return l.Alert.Description.certificate_unknown;
    case M_OptionsManager_maybe.pki.certificateError.unknown_ca:
      return l.Alert.Description.unknown_ca;
    default:
      return l.Alert.Description.bad_certificate;
  }
};
for (var H in ((l.verifyCertificateChain = function (e, t) {
  try {
    var r = {};
    for (var i in e.verifyOptions) r[i] = e.verifyOptions[i];
    r.verify = function (t, r, i) {
      q(t);
      var o = e.verify(e, t, r, i);
      if (true !== o) {
        if ("object" == typeof o && !M_OptionsManager_maybe.util.isArray(o)) {
          var s = new Error("The application rejected the certificate.");
          throw (
            ((s.send = true),
            (s.alert = {
              level: l.Alert.Level.fatal,
              description: l.Alert.Description.bad_certificate,
            }),
            o.message && (s.message = o.message),
            o.alert && (s.alert.description = o.alert),
            s)
          );
        }
        if (o !== t) {
          o = (function (e) {
            switch (e) {
              case true:
                return true;
              case l.Alert.Description.bad_certificate:
                return M_OptionsManager_maybe.pki.certificateError
                  .bad_certificate;
              case l.Alert.Description.unsupported_certificate:
                return M_OptionsManager_maybe.pki.certificateError
                  .unsupported_certificate;
              case l.Alert.Description.certificate_revoked:
                return M_OptionsManager_maybe.pki.certificateError
                  .certificate_revoked;
              case l.Alert.Description.certificate_expired:
                return M_OptionsManager_maybe.pki.certificateError
                  .certificate_expired;
              case l.Alert.Description.certificate_unknown:
                return M_OptionsManager_maybe.pki.certificateError
                  .certificate_unknown;
              case l.Alert.Description.unknown_ca:
                return M_OptionsManager_maybe.pki.certificateError.unknown_ca;
              default:
                return M_OptionsManager_maybe.pki.certificateError
                  .bad_certificate;
            }
          })(o);
        }
      }
      return o;
    };
    M_OptionsManager_maybe.pki.verifyCertificateChain(e.caStore, t, r);
  } catch (t) {
    var o = t;
    if ("object" != typeof o || M_OptionsManager_maybe.util.isArray(o)) {
      o = {
        send: true,
        alert: {
          level: l.Alert.Level.fatal,
          description: q(t),
        },
      };
    }
    if ("send" in o) {
      o.send = true;
    }
    if ("alert" in o) {
      o.alert = {
        level: l.Alert.Level.fatal,
        description: q(o.error),
      };
    }
    e.error(e, o);
  }
  return !e.fail;
}),
(l.createSessionCache = function (e, t) {
  var r = null;
  if (e && e.getSession && e.setSession && e.order) r = e;
  else {
    for (var i in (((r = {}).cache = e || {}),
    (r.capacity = Math.max(t || 100, 1)),
    (r.order = []),
    e))
      if (r.order.length <= t) {
        r.order.push(i);
      } else {
        delete e[i];
      }
    r.getSession = function (e) {
      var t = null;
      var i = null;
      if (e) {
        i = M_OptionsManager_maybe.util.bytesToHex(e);
      } else {
        if (r.order.length > 0) {
          i = r.order[0];
        }
      }
      if (null !== i && i in r.cache)
        for (var o in ((t = r.cache[i]), delete r.cache[i], r.order))
          if (r.order[o] === i) {
            r.order.splice(o, 1);
            break;
          }
      return t;
    };
    r.setSession = function (e, t) {
      if (r.order.length === r.capacity) {
        var i = r.order.shift();
        delete r.cache[i];
      }
      i = M_OptionsManager_maybe.util.bytesToHex(e);
      r.order.push(i);
      r.cache[i] = t;
    };
  }
  return r;
}),
(l.createConnection = function (e) {
  var t;
  t = e.caStore
    ? M_OptionsManager_maybe.util.isArray(e.caStore)
      ? M_OptionsManager_maybe.pki.createCaStore(e.caStore)
      : e.caStore
    : M_OptionsManager_maybe.pki.createCaStore();
  var r = e.cipherSuites || null;
  if (null === r)
    for (var i in ((r = []), l.CipherSuites)) r.push(l.CipherSuites[i]);
  var o = e.server ? l.ConnectionEnd.server : l.ConnectionEnd.client;
  var s = e.sessionCache ? l.createSessionCache(e.sessionCache) : null;
  var a = {
    version: {
      major: l.Version.major,
      minor: l.Version.minor,
    },
    entity: o,
    sessionId: e.sessionId,
    caStore: t,
    sessionCache: s,
    cipherSuites: r,
    connected: e.connected,
    virtualHost: e.virtualHost || null,
    verifyClient: e.verifyClient || false,
    verify:
      e.verify ||
      function (e, t, r, n) {
        return t;
      },
    verifyOptions: e.verifyOptions || {},
    getCertificate: e.getCertificate || null,
    getPrivateKey: e.getPrivateKey || null,
    getSignature: e.getSignature || null,
    input: M_OptionsManager_maybe.util.createBuffer(),
    tlsData: M_OptionsManager_maybe.util.createBuffer(),
    data: M_OptionsManager_maybe.util.createBuffer(),
    tlsDataReady: e.tlsDataReady,
    dataReady: e.dataReady,
    heartbeatReceived: e.heartbeatReceived,
    closed: e.closed,
    error: function (t, r) {
      r.origin =
        r.origin || (t.entity === l.ConnectionEnd.client ? "client" : "server");
      if (r.send) {
        l.queue(t, l.createAlert(t, r.alert));
        l.flush(t);
      }
      var n = false !== r.fatal;
      if (n) {
        t.fail = true;
      }
      e.error(t, r);
      if (n) {
        t.close(false);
      }
    },
    deflate: e.deflate || null,
    inflate: e.inflate || null,
    reset: function (e) {
      a.version = {
        major: l.Version.major,
        minor: l.Version.minor,
      };
      a.record = null;
      a.session = null;
      a.peerCertificate = null;
      a.state = {
        pending: null,
        current: null,
      };
      a.entity;
      l.ConnectionEnd.client;
      a.expect = 0;
      a.fragmented = null;
      a.records = [];
      a.open = false;
      a.handshakes = 0;
      a.handshaking = false;
      a.isConnected = false;
      a.fail = !(e || undefined === e);
      a.input.clear();
      a.tlsData.clear();
      a.data.clear();
      a.state.current = l.createConnectionState(a);
    },
  };
  a.reset();
  a.handshake = function (e) {
    if (a.entity !== l.ConnectionEnd.client)
      a.error(a, {
        message: "Cannot initiate handshake as a server.",
        fatal: false,
      });
    else if (a.handshaking)
      a.error(a, {
        message: "Handshake already in progress.",
        fatal: false,
      });
    else {
      if (a.fail && !a.open && 0 === a.handshakes) {
        a.fail = false;
      }
      a.handshaking = true;
      var t = null;
      if ((e = e || "").length > 0) {
        if (a.sessionCache) {
          t = a.sessionCache.getSession(e);
        }
        if (null === t) {
          e = "";
        }
      }
      if (
        0 === e.length &&
        a.sessionCache &&
        null !== (t = a.sessionCache.getSession())
      ) {
        e = t.id;
      }
      a.session = {
        id: e,
        version: null,
        cipherSuite: null,
        compressionMethod: null,
        serverCertificate: null,
        certificateRequest: null,
        clientCertificate: null,
        sp: {},
        md5: M_OptionsManager_maybe.md.md5.create(),
        sha1: M_OptionsManager_maybe.md.sha1.create(),
      };
      if (t) {
        a.version = t.version;
        a.session.sp = t.sp;
      }
      a.session.sp.client_random = l.createRandom().getBytes();
      a.open = true;
      l.queue(
        a,
        l.createRecord(a, {
          type: l.ContentType.handshake,
          data: l.createClientHello(a),
        })
      );
      l.flush(a);
    }
  };
  a.process = function (e) {
    var t = 0;
    if (e) {
      a.input.putBytes(e);
    }
    if (a.fail) {
      if (null !== a.record && a.record.ready && a.record.fragment.isEmpty()) {
        a.record = null;
      }
      if (null === a.record) {
        t = (function (e) {
          var t = 0;
          var r = e.input;
          var i = r.length();
          if (i < 5) t = 5 - i;
          else {
            e.record = {
              type: r.getByte(),
              version: {
                major: r.getByte(),
                minor: r.getByte(),
              },
              length: r.getInt16(),
              fragment: M_OptionsManager_maybe.util.createBuffer(),
              ready: false,
            };
            var o = e.record.version.major === e.version.major;
            if (o && e.session && e.session.version) {
              o = e.record.version.minor === e.version.minor;
            }
            if (o) {
              e.error(e, {
                message: "Incompatible TLS version.",
                send: true,
                alert: {
                  level: l.Alert.Level.fatal,
                  description: l.Alert.Description.protocol_version,
                },
              });
            }
          }
          return t;
        })(a);
      }
      if (a.fail || null === a.record || a.record.ready) {
        t = (function (e) {
          var t = 0;
          var r = e.input;
          var n = r.length();
          if (n < e.record.length) {
            t = e.record.length - n;
          } else {
            e.record.fragment.putBytes(r.getBytes(e.record.length));
            r.compact();
            if (e.state.current.read.update(e, e.record)) {
              if (null !== e.fragmented) {
                if (e.fragmented.type === e.record.type) {
                  e.fragmented.fragment.putBuffer(e.record.fragment);
                  e.record = e.fragmented;
                } else {
                  e.error(e, {
                    message: "Invalid fragmented record.",
                    send: true,
                    alert: {
                      level: l.Alert.Level.fatal,
                      description: l.Alert.Description.unexpected_message,
                    },
                  });
                }
              }
              e.record.ready = true;
            }
          }
          return t;
        })(a);
      }
      if (!a.fail && null !== a.record && a.record.ready) {
        (function (e, t) {
          var r = t.type - l.ContentType.change_cipher_spec;
          var n = P[e.entity][e.expect];
          if (r in n) {
            n[r](e, t);
          } else {
            l.handleUnexpected(e, t);
          }
        })(a, a.record);
      }
    }
    return t;
  };
  a.prepare = function (e) {
    l.queue(
      a,
      l.createRecord(a, {
        type: l.ContentType.application_data,
        data: M_OptionsManager_maybe.util.createBuffer(e),
      })
    );
    return l.flush(a);
  };
  a.prepareHeartbeatRequest = function (e, t) {
    if (e instanceof M_OptionsManager_maybe.util.ByteBuffer) {
      e = e.bytes();
    }
    if (undefined === t) {
      t = e.length;
    }
    a.expectedHeartbeatPayload = e;
    l.queue(
      a,
      l.createRecord(a, {
        type: l.ContentType.heartbeat,
        data: l.createHeartbeat(l.HeartbeatMessageType.heartbeat_request, e, t),
      })
    );
    return l.flush(a);
  };
  a.close = function (e) {
    if (!a.fail && a.sessionCache && a.session) {
      var t = {
        id: a.session.id,
        version: a.session.version,
        sp: a.session.sp,
      };
      t.sp.keys = null;
      a.sessionCache.setSession(t.id, t);
    }
    if (a.open) {
      a.open = false;
      a.input.clear();
      if (a.isConnected || a.handshaking) {
        a.isConnected = a.handshaking = false;
        l.queue(
          a,
          l.createAlert(a, {
            level: l.Alert.Level.warning,
            description: l.Alert.Description.close_notify,
          })
        );
        l.flush(a);
      }
      a.closed(a);
    }
    a.reset(e);
  };
  return a;
}),
(module.exports = M_OptionsManager_maybe.tls =
  M_OptionsManager_maybe.tls || {}),
l))
  if ("function" != typeof l[H]) {
    M_OptionsManager_maybe.tls[H] = l[H];
  }
M_OptionsManager_maybe.tls.prf_tls1 = i;
M_OptionsManager_maybe.tls.hmac_sha1 = function (e, t, r) {
  var i = M_OptionsManager_maybe.hmac.create();
  i.start("SHA1", e);
  var o = M_OptionsManager_maybe.util.createBuffer();
  o.putInt32(t[0]);
  o.putInt32(t[1]);
  o.putByte(r.type);
  o.putByte(r.version.major);
  o.putByte(r.version.minor);
  o.putInt16(r.length);
  o.putBytes(r.fragment.bytes());
  i.update(o.getBytes());
  return i.digest().getBytes();
};
M_OptionsManager_maybe.tls.createSessionCache = l.createSessionCache;
M_OptionsManager_maybe.tls.createConnection = l.createConnection;
