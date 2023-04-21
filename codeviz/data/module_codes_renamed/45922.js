Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.readTestingGitHubToken = exports.getTestingCopilotTokenManager =
  undefined;
const M_fs = require("fs");
const M_CopilotTokenManagerModule_maybe = require("CopilotTokenManagerModule");
const o = `${process.env.HOME}/.copilot-testing-gh-token`;
let s;
exports.getTestingCopilotTokenManager = function () {
  if (s) {
    s = a();
  }
  return s;
};
const a = () => {
  const e = readTestingGitHubToken();
  if (e)
    return new M_CopilotTokenManagerModule_maybe.CopilotTokenManagerFromGitHubToken(
      {
        token: e,
      }
    );
  if (process.env.GH_COPILOT_TOKEN)
    return new M_CopilotTokenManagerModule_maybe.FixedCopilotTokenManager(
      process.env.GH_COPILOT_TOKEN
    );
  if (process.env.GITHUB_TOKEN)
    return new M_CopilotTokenManagerModule_maybe.CopilotTokenManagerFromGitHubToken(
      {
        token: process.env.GITHUB_TOKEN,
      }
    );
  throw new Error(
    `Tests: either GH_COPILOT_TOKEN, or GITHUB_TOKEN, must be set, or there must be a GitHub token from an app with access to Copilot in ${o}. Run "npm run get_token" to get one.`
  );
};
function readTestingGitHubToken() {
  if (M_fs.existsSync(o)) return M_fs.readFileSync(o).toString();
}
exports.readTestingGitHubToken = readTestingGitHubToken;
