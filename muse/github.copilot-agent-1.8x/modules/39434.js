Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.SemanticTokensRefreshRequest =
  exports.SemanticTokensRangeRequest =
  exports.SemanticTokensDeltaRequest =
  exports.SemanticTokensRequest =
  exports.SemanticTokensRegistrationType =
  exports.TokenFormat =
  exports.SemanticTokens =
  exports.SemanticTokenModifiers =
  exports.SemanticTokenTypes =
    undefined;
const n = require(66140);
var i;
var o;
var s;
var a;
var c;
var l;
var u;
(u =
  exports.SemanticTokenTypes || (exports.SemanticTokenTypes = {})).namespace =
  "namespace";
u.type = "type";
u.class = "class";
u.enum = "enum";
u.interface = "interface";
u.struct = "struct";
u.typeParameter = "typeParameter";
u.parameter = "parameter";
u.variable = "variable";
u.property = "property";
u.enumMember = "enumMember";
u.event = "event";
u.function = "function";
u.method = "method";
u.macro = "macro";
u.keyword = "keyword";
u.modifier = "modifier";
u.comment = "comment";
u.string = "string";
u.number = "number";
u.regexp = "regexp";
u.operator = "operator";
(l =
  exports.SemanticTokenModifiers ||
  (exports.SemanticTokenModifiers = {})).declaration = "declaration";
l.definition = "definition";
l.readonly = "readonly";
l.static = "static";
l.deprecated = "deprecated";
l.abstract = "abstract";
l.async = "async";
l.modification = "modification";
l.documentation = "documentation";
l.defaultLibrary = "defaultLibrary";
(exports.SemanticTokens || (exports.SemanticTokens = {})).is = function (e) {
  const t = e;
  return (
    undefined !== t &&
    (undefined === t.resultId || "string" == typeof t.resultId) &&
    Array.isArray(t.data) &&
    (0 === t.data.length || "number" == typeof t.data[0])
  );
};
(exports.TokenFormat || (exports.TokenFormat = {})).Relative = "relative";
(c =
  exports.SemanticTokensRegistrationType ||
  (exports.SemanticTokensRegistrationType = {})).method =
  "textDocument/semanticTokens";
c.type = new n.RegistrationType(c.method);
(a =
  exports.SemanticTokensRequest ||
  (exports.SemanticTokensRequest = {})).method =
  "textDocument/semanticTokens/full";
a.type = new n.ProtocolRequestType(a.method);
(s =
  exports.SemanticTokensDeltaRequest ||
  (exports.SemanticTokensDeltaRequest = {})).method =
  "textDocument/semanticTokens/full/delta";
s.type = new n.ProtocolRequestType(s.method);
(o =
  exports.SemanticTokensRangeRequest ||
  (exports.SemanticTokensRangeRequest = {})).method =
  "textDocument/semanticTokens/range";
o.type = new n.ProtocolRequestType(o.method);
(i =
  exports.SemanticTokensRefreshRequest ||
  (exports.SemanticTokensRefreshRequest = {})).method =
  "workspace/semanticTokens/refresh";
i.type = new n.ProtocolRequestType0(i.method);