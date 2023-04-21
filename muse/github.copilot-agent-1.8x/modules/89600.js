Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.startFakeTelemetryServerIfNecessary = undefined;
const n = require("path");
const i = require("worker_threads");
const o = require(12414);
let s;
let a;
exports.startFakeTelemetryServerIfNecessary = async function () {
  if (undefined === s) {
    const e = await (async function () {
      return await o({
        port: 5789,
      });
    })();
    s = new i.Worker(
      n.resolve(__dirname, "..", "dist", "telemetryFakeWorker.js"),
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