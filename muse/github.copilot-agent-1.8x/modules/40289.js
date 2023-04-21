function string(e) {
  return "string" == typeof e || e instanceof String;
}
function func(e) {
  return "function" == typeof e;
}
function array(e) {
  return Array.isArray(e);
}
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.thenable =
  exports.typedArray =
  exports.stringArray =
  exports.array =
  exports.func =
  exports.error =
  exports.number =
  exports.string =
  exports.boolean =
    undefined;
exports.boolean = function (e) {
  return true === e || false === e;
};
exports.string = string;
exports.number = function (e) {
  return "number" == typeof e || e instanceof Number;
};
exports.error = function (e) {
  return e instanceof Error;
};
exports.func = func;
exports.array = array;
exports.stringArray = function (e) {
  return array(e) && e.every((e) => string(e));
};
exports.typedArray = function (e, t) {
  return Array.isArray(e) && e.every(t);
};
exports.thenable = function (e) {
  return e && func(e.then);
};