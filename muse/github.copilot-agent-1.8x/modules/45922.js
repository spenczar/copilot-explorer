Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.readTestingGitHubToken = exports.getTestingCopilotTokenManager =
  undefined;
const n = require("fs");
const i = require(35765);
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
    return new i.CopilotTokenManagerFromGitHubToken({
      token: e,
    });
  if (process.env.GH_COPILOT_TOKEN)
    return new i.FixedCopilotTokenManager(process.env.GH_COPILOT_TOKEN);
  if (process.env.GITHUB_TOKEN)
    return new i.CopilotTokenManagerFromGitHubToken({
      token: process.env.GITHUB_TOKEN,
    });
  throw new Error(
    `Tests: either GH_COPILOT_TOKEN, or GITHUB_TOKEN, must be set, or there must be a GitHub token from an app with access to Copilot in ${o}. Run "npm run get_token" to get one.`
  );
};
function readTestingGitHubToken() {
  if (n.existsSync(o)) return n.readFileSync(o).toString();
}
exports.readTestingGitHubToken = readTestingGitHubToken;