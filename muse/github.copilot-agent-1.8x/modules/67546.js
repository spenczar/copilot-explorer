const n = require("fs");
let i;
module.exports = () => (
  undefined === i &&
    (i =
      (function () {
        try {
          n.statSync("/.dockerenv");
          return true;
        } catch (e) {
          return false;
        }
      })() ||
      (function () {
        try {
          return n.readFileSync("/proc/self/cgroup", "utf8").includes("docker");
        } catch (e) {
          return false;
        }
      })()),
  i
);