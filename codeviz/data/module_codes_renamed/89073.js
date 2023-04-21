function shouldUseGroup(e, t) {
  return t.rules.some((t) => shouldUseRule(e, t));
}
function shouldUseRule(e, t) {
  var r;
  return (
    undefined !== e[t.keyword] ||
    (null === (r = t.definition.implements) || undefined === r
      ? undefined
      : r.some((t) => undefined !== e[t]))
  );
}
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.shouldUseRule =
  exports.shouldUseGroup =
  exports.schemaHasRulesForType =
    undefined;
exports.schemaHasRulesForType = function ({ schema: e, self: t }, n) {
  const i = t.RULES.types[n];
  return i && true !== i && shouldUseGroup(e, i);
};
exports.shouldUseGroup = shouldUseGroup;
exports.shouldUseRule = shouldUseRule;
