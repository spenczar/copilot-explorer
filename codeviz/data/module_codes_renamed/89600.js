Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.startFakeTelemetryServerIfNecessary = undefined;
const M_path = require("path");
const M_worker_threads = require("worker_threads");
const M_PortManager_maybe = require("PortManager");
let s;
let a;
exports.startFakeTelemetryServerIfNecessary = async function () {
  if (undefined === s) {
    const e = await (async function () {
      return await M_PortManager_maybe({
        port: 5789,
      });
    })();
    s = new M_worker_threads.Worker(
      M_path.resolve(__dirname, "..", "dist", "telemetryFakeWorker.js"),
      {
        workerData: {
          port: e,
        },
      }
    );
    await new Promise((e) => setTimeout(e, 1e3));
    a = e;
  }
  return a;
};
