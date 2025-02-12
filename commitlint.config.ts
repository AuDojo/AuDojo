import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  formatter: "@commitlint/format",
  rules: {
    // TODO Add Scope Enum here
    // 'scope-enum': [RuleConfigSeverity.Error, 'always', ['yourscope', 'yourscope']],
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore"],
    ],
  },
  helpUrl: "https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional",
};

export default Configuration;
