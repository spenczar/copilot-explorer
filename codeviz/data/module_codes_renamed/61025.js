Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_TypeBox_maybe = require("TypeBox");
const M_schema_code_generator_maybe = require("schema-code-generator");
const M_editor_config_constants_maybe = require("editor-config-constants");
const M_AjvErrorManager_maybe = require("AjvErrorManager");
const a = M_TypeBox_maybe.Type.Object({});
const c = new M_schema_code_generator_maybe.default().compile(
  M_TypeBox_maybe.Type.Strict(a)
);
exports.default = async function (e, t, r) {
  if (!c(r)) {
    const e = M_AjvErrorManager_maybe.extractAjvErrors(c.errors);
    return [
      null,
      {
        code: M_AjvErrorManager_maybe.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  return [
    {
      version: M_editor_config_constants_maybe.getVersion(e),
    },
    null,
  ];
};
