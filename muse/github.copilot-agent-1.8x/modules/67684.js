const n = require("os");
const i = require("fs");
const o = require(67546);
const s = () => {
  if ("linux" !== process.platform) return false;
  if (n.release().toLowerCase().includes("microsoft")) return !o();
  try {
    return (
      !!i
        .readFileSync("/proc/version", "utf8")
        .toLowerCase()
        .includes("microsoft") && !o()
    );
  } catch (e) {
    return false;
  }
};
if (process.env.__IS_WSL_TEST__) {
  module.exports = s;
} else {
  module.exports = s();
}