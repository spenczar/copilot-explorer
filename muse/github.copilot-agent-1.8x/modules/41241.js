if (
  "undefined" == typeof process ||
  "renderer" === process.type ||
  true === process.browser ||
  process.__nwjs
) {
  module.exports = require(96292);
} else {
  module.exports = require(4428);
}