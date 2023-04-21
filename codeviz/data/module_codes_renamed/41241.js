if (
  "undefined" == typeof process ||
  "renderer" === process.type ||
  true === process.browser ||
  process.__nwjs
) {
  module.exports = require("Debugging_Utilities");
} else {
  module.exports = require("telemetry-wrapper");
}
