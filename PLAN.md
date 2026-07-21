# xfunc 开源化改进计划

> 基于项目评估，按 P0（可信度/分发）→ P1（社区治理）→ P2（一致性/细节）顺序执行。
> `- [ ]` 未完成 &nbsp;|&nbsp; `- [x]` 已完成

---

## P0：测试覆盖与 CI 可信度

### P0.1 补齐缺失单元测试

按 `test/<category>/<func>.spec.ts` 结构新建文件，覆盖 happy path + edge cases + invalid input。

- [x] `test/typed/isTypeString.spec.ts` — 匹配/不匹配 type 字符串、底层调用 ObjectToString
- [x] `test/typed/toRawType.spec.ts` — Object/Array/String/Number/Null/Undefined/Map/Set 等
- [x] `test/typed/makeMap.spec.ts` — 包含/不包含 key、`__proto__` 安全、空字符串
- [x] `test/typed/isNumericKey.spec.ts` — 数字/字符串数字/浮点/负数/Symbol/null/undefined/NaN
- [x] `test/array/remove.spec.ts` — 移除首个匹配、不存在的元素、修改原数组、对象引用
- [x] `test/function/memoize.spec.ts` — 缓存命中、resolver、maxSize 淘汰、this 绑定
- [x] `test/number/toNumber.spec.ts` — 字符串数字/Infinity/Symbol→NaN、对象 valueOf、trim
- [x] `test/object/clone.spec.ts` — 浅克隆、数组/对象/Map/Set、Symbol 属性、不可克隆类型返回原引用
- [x] `test/object/cloneDeep.spec.ts` — 深层嵌套、循环引用、Map/Set/RegExp/Date、TypedArray、ArrayBuffer
- [x] `test/object/hasOwn.spec.ts` — own/inherited、Symbol key、null 原型对象
- [x] `test/string/camelize.spec.ts` — 短串/连续连字符/空串/已 camelCase
- [x] `test/string/hyphenate.spec.ts` — 标准/大写连续/空串/已 kebab-case
- [x] `test/structure/QueueMap.spec.ts` — removeFirst/getFirst/isEmpty、空 map 边界、迭代器顺序

### P0.2 补全 `toNumber.spec.ts` 缺失

- [x] `test/number/` 下目前只有 `randomInt.spec.ts`，新建 `test/number/toNumber.spec.ts`

### P0.3 CI 增加质量门禁

- [x] 新增 `test:coverage` 脚本 — `package.json` scripts: `vitest run --coverage`
- [x] 新增 `test:ci` 脚本 — `package.json` scripts: `vitest run --coverage --reporter=verbose`
- [x] coverage 阈值 — `vitest.config.ts` 中 `test.coverage` 追加 `lines: 70`, `functions: 80`, `branches: 75`（排除 scripts/、config、index.ts）
- [x] CI 运行 coverage — `.github/workflows/test.yml` 新增 coverage job: `pnpm test:ci`
- [x] Node 版本矩阵 — `.github/workflows/test.yml` unit-test job 增加 `strategy.matrix.node: [18, 20, 22]`

---

## P1：社区治理文件

### P1.1 新增 Issue 模板

- [x] 创建 `.github/ISSUE_TEMPLATE/bug-report.yml` — 标题、描述、labels、body
- [x] 创建 `.github/ISSUE_TEMPLATE/feature-request.yml` — 标题、描述、labels、body
- [x] 创建 `.github/ISSUE_TEMPLATE/config.yml` — 链接到 Discussions

### P1.2 新增其他治理文件

- [x] `.github/PULL_REQUEST_TEMPLATE.md` — PR 描述模板，含 checklist
- [x] `.github/CODEOWNERS` — 自动分配 Reviewer（初始设为主要维护者）
- [x] `.github/FUNDING.yml` — Sponsor 链接（可选）
- [x] `SECURITY.md` — 安全漏洞报告流程（根目录）
- [x] `CODE_OF_CONDUCT.md` — 行为准则

### P1.3 添加 README Badges

- [x] 在 `README.md` 顶部插入 CI / npm / license / bundle size badges
- [x] CI 中集成 Codecov 上传 coverage 报告（coverage job 加 `codecov/codecov-action@v5` + `CODECOV_TOKEN`）

### P1.4 添加 Dependabot

- [x] 新建 `.github/dependabot.yml`（npm 周检 + GitHub Actions 周检）

### P1.5 锁定第三方 Action SHA

- [x] `release.yml` — `xypur/release-tag` `@master` → 替换为 `gh release create` CLI
- [x] `size-report.yml` — `dawidd6/action-download-artifact` `@v9` → pin SHA
- [x] `size-report.yml` — `juliangruber/read-file-action` `@v1` → pin SHA
- [x] `size-report.yml` — `actions-cool/maintain-one-comment` `@v3` → 已是 release tag，风险较低（API 限流暂无法获取 SHA）

---

## P2：一致性清理与细节优化

### P2.1 清理 "Unfunt" 旧名残留

- [ ] `CONTRIBUTING.md` 第 1 行: `Contributing to Unfunt` → `Contributing to xfunc`
- [ ] `CONTRIBUTING.zh-CN.md` 第 1 行: `Unfunt 贡献指南` → `xfunc 贡献指南`
- [ ] `CONTRIBUTING.zh-CN.md` 第 5 行: `Unfunt 项目` → `xfunc 项目`
- [ ] `docs/index.md` 第 6 行: `name: "Unfunt"` → `name: "xfunc"`
- [ ] `docs/zh/index.md` 第 6 行: `name: "Unfunt"` → `name: "xfunc"`
- [ ] `.github/workflows/size-report.yml` 第 96 行: `<!-- UNFUNT_SIZE -->` → `<!-- XFUNC_SIZE -->`

### P2.2 CHANGELOG 接入发布流程

- [ ] 发布前自动执行 `pnpm changelog` 生成日志
- [ ] 将 `CHANGELOG.md` 的更新包含在 release commit 中
- [ ] 补充从 `0.2.0-alpha.1 → 0.7.0` 之间缺失的 changelog 记录

### P2.3 代码注释统一英语

- [ ] `src/object/cloneDeep.ts` — 中文注释改英文（详见下方映射表）
- [ ] `src/object/clone.ts` — 中文注释改英文

| 文件 | 行号 | 当前 | 改为 |
|---|---|---|---|
| cloneDeep.ts | 42 | `// 不可克隆的类型` | `// Types that cannot be cloned` |
| cloneDeep.ts | 107 | `// 对于其他类型，尝试使用构造函数` | `// For other types, try the constructor` |
| cloneDeep.ts | 125 注释 | `// 使用 pop 而不是 shift 提高性能` | `// Use pop instead of shift for performance` |
| cloneDeep.ts | 196 | `// ES2021：复制属性的描述符` | `// ES2021: copy property descriptors` |
| cloneDeep.ts | 199 | `// ES2021：复制原型链` | `// ES2021: copy prototype chain` |

### P2.4 CI 增加文档构建

- [x] `.github/workflows/test.yml` 中追加 `pnpm docs:build` step

### P2.5 可选增强

- [ ] `.editorconfig` — 根目录添加，统一缩进/换行约定
- [ ] `package.json` `sideEffects` — 在 `scripts/config/package-config.ts` 中追加 `sideEffects: false`
- [ ] `package.json` `engines` — 在 `scripts/config/package-config.ts` 中追加 `engines.node: ">=18"`

---

## 执行优先级总览

```
P0 ──┬── [x] P0.1 补测试（并行撰写，批量提 PR）
     ├── [x] P0.2 补 toNumber.spec.ts
     ├── [ ] P0.3 CI 质量门禁
     └── [ ] [验收] pnpm test:run + pnpm lint:check 全绿

P1 ──┬── [x] P1.1 Issue 模板
     ├── [x] P1.2 治理文件
     ├── [x] P1.3 README Badges + Codecov
     ├── [x] P1.4 Dependabot
     └── [x] P1.5 Pin Action SHA

P2 ──┬── [ ] P2.1 Unfunt → xfunc 全局替换
     ├── [ ] P2.2 CHANGELOG 接入
     ├── [ ] P2.3 中文注释→英文
     ├── [ ] P2.4 CI 文档构建
     └── [ ] P2.5 可选增强
```

---

## 预计工作量

| 阶段 | 估计 PR 数 | 影响文件数 |
|---|---|---|
| P0 | 3–4（测试分批次合并） | 20+ |
| P1 | 2 | 10+ |
| P2 | 2 | 10+ |

总计约 **7–8 个 PR**，可并行（P0 测试撰写可多人分工，P1/P2 各自独立）。
