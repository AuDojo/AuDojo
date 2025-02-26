import conventional from "@commitlint/config-conventional";
import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

// Refer to the commit convention guide:
// https://github.com/AuDojo/AuDojo/blob/dev/.github/commit-convention.md
const Configuration = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-max-line-length": [RuleConfigSeverity.Error, "always", 800],
    // TODO Add Scope Enum here
    // 'scope-enum': [RuleConfigSeverity.Error, 'always', ['yourscope', 'yourscope']],
    "type-enum": [RuleConfigSeverity.Error, "always", [...conventional.rules["type-enum"][2], "dev"]],
  },
  helpUrl: "https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional",
} satisfies UserConfig;

export default Configuration;
