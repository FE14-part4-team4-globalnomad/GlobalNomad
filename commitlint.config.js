/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],

  /* ❶ 커스텀 헤더 패턴 등록 ----------------------------- */
  parserPreset: {
    parserOpts: {
      /* [GN-33] feat(ui): 로그인 추가 */
      headerPattern:
        /^\[(?<ticket>[A-Z]+-\d+)\]\s(?<type>feat|fix|chore|docs|style|refactor|test|perf|rename|remove)(?:\((?<scope>[a-z]+)\))?:\s(?<subject>.+)$/,
      /* 캡처 그룹 이름 → 규칙에서 참조 가능 */
      headerCorrespondence: ["ticket", "type", "scope", "subject"],
    },
  },

  rules: {
    /* type은 enum에 포함돼야 하고 비어 있으면 안 됨 */
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "chore",
        "docs",
        "style",
        "refactor",
        "test",
        "perf",
        "rename",
        "remove",
      ],
    ],
    "type-empty": [2, "never"],

    /* subject 필수 */
    "subject-empty": [2, "never"],

    /* 헤더 길이 제한 */
    "header-max-length": [2, "always", 100],
  },
};
