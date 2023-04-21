Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.generateUuid =
  exports.parse =
  exports.isUUID =
  exports.v4 =
  exports.empty =
    undefined;
class r {
  constructor(e) {
    this._value = e;
  }
  asHex() {
    return this._value;
  }
  equals(e) {
    return this.asHex() === e.asHex();
  }
}
class n extends r {
  constructor() {
    super(
      [
        n._randomHex(),
        n._randomHex(),
        n._randomHex(),
        n._randomHex(),
        n._randomHex(),
        n._randomHex(),
        n._randomHex(),
        n._randomHex(),
        "-",
        n._randomHex(),
        n._randomHex(),
        n._randomHex(),
        n._randomHex(),
        "-",
        "4",
        n._randomHex(),
        n._randomHex(),
        n._randomHex(),
        "-",
        n._oneOf(n._timeHighBits),
        n._randomHex(),
        n._randomHex(),
        n._randomHex(),
        "-",
        n._randomHex(),
        n._randomHex(),
        n._randomHex(),
        n._randomHex(),
        n._randomHex(),
        n._randomHex(),
        n._randomHex(),
        n._randomHex(),
        n._randomHex(),
        n._randomHex(),
        n._randomHex(),
        n._randomHex(),
      ].join("")
    );
  }
  static _oneOf(e) {
    return e[Math.floor(e.length * Math.random())];
  }
  static _randomHex() {
    return n._oneOf(n._chars);
  }
}
function v4() {
  return new n();
}
n._chars = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];
n._timeHighBits = ["8", "9", "a", "b"];
exports.empty = new r("00000000-0000-0000-0000-000000000000");
exports.v4 = v4;
const o = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isUUID(e) {
  return o.test(e);
}
exports.isUUID = isUUID;
exports.parse = function (e) {
  if (!isUUID(e)) throw new Error("invalid uuid");
  return new r(e);
};
exports.generateUuid = function () {
  return v4().asHex();
};
