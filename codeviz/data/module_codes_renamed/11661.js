Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.asyncIterableFromArray =
  exports.asyncIterableMapFilter =
  exports.asyncIterableFilter =
  exports.asyncIterableMap =
    undefined;
exports.asyncIterableMap = async function* (e, t) {
  for await (const r of e) yield t(r);
};
exports.asyncIterableFilter = async function* (e, t) {
  for await (const r of e)
    if (await t(r)) {
      yield r;
    }
};
exports.asyncIterableMapFilter = async function* (e, t) {
  for await (const r of e) {
    const e = await t(r);
    if (undefined !== e) {
      yield e;
    }
  }
};
exports.asyncIterableFromArray = async function* (e) {
  for (const t of e) yield t;
};
