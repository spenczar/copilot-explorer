const M_fs = require("fs");
let i;
module.exports = () => (
  undefined === i &&
    (i =
      (function () {
        try {
          M_fs.statSync("/.dockerenv");
          return true;
        } catch (e) {
          return false;
        }
      })() ||
      (function () {
        try {
          return M_fs.readFileSync("/proc/self/cgroup", "utf8").includes(
            "docker"
          );
        } catch (e) {
          return false;
        }
      })()),
  i
);
