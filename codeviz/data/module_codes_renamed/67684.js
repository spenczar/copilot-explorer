const M_os = require("os");
const M_fs = require("fs");
const M_docker_detector_maybe = require("docker-detector");
const s = () => {
  if ("linux" !== process.platform) return false;
  if (M_os.release().toLowerCase().includes("microsoft"))
    return !M_docker_detector_maybe();
  try {
    return (
      !!M_fs.readFileSync("/proc/version", "utf8")
        .toLowerCase()
        .includes("microsoft") && !M_docker_detector_maybe()
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
