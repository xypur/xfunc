# xfunc 开源化改进计划

> 基于项目评估，按 P0（可信度/分发）→ P1（社区治理）→ P2（一致性/细节）顺序执行。
> `- [ ]` 未完成 &nbsp;|&nbsp; `- [x]` 已完成

---

## P0：测试覆盖与 CI 可信度

### P0.1 补齐缺失单元测试

按 `test/<category>/<func>.spec.ts` 结构新建文件，覆盖 happy path + edge cases + invalid input。

| 文件 | 关键用例 |
|---|---|
| `test/typed/isTypeString.spec.ts` | 匹配/不匹配 type 字符串、底层调用 ObjectToString |
| `test/typed/toRawType.spec.ts` | Object/Array/String/Number/Null/Undefined/Map/Set 等 |
| `test/typed/makeMap.spec.ts` | 包含/不包含 key、`__proto__` 安全、空字符串 |
| `test/typed/isNumericKey.spec.ts` | 数字/字符串数字/浮点/负数/Symbol/null/undefined/NaN |
| `test/array/remove.spec.ts` | 移除首个匹配、不存在的元素、修改原数组、对象引用 |
| `test/function/memoize.spec.ts` | 缓存命中、resolver、maxSize 淘汰、this 绑定 |
| `test/number/toNumber.spec.ts` | 字符串数字/Infinity/Symbol→NaN、对象 valueOf、trim |
| `test/object/clone.spec.ts` | 浅克隆、数组/对象/Map/Set、Symbol 属性、不可克隆类型返回原引用 |
| `test/object/cloneDeep.spec.ts` | 深层嵌套、循环引用、Map/Set/RegExp/Date、TypedArray、ArrayBuffer |
| `test/object/hasOwn.spec.ts` | own/inherited、Symbol key、null 原型对象 |
| `test/string/camelize.spec.ts` | 短串/连续连字符/空串/已 camelCase |
| `test/string/hyphenate.spec.ts` | 标准/大写连续/空串/已 kebab-case |
| `test/structure/QueueMap.spec.ts` | removeFirst/getFirst/isEmpty、空 map 边界、迭代器顺序 |

### P0.2 补全 `toNumber.spec.ts` 缺失

`test/number/` 下目前只有 `randomInt.spec.ts`，新建 `test/number/toNumber.spec.ts`。

### P0.3 CI 增加质量门禁

| 改动 | 文件 | 内容 |
|---|---|---|
| 新增 `test:coverage` 脚本 | `package.json` scripts | `vitest run --coverage` |
| 新增 `test:ci` 脚本 | `package.json` scripts | `vitest run --coverage --reporter=verbose` |
| coverage 阈值 | `vitest.config.ts` | 在 `test.coverage` 中追加 `lines: 90`, `functions: 85`, `branches: 85` |
| CI 运行 coverage | `.github/workflows/test.yml` | 新增 step: `pnpm test:ci`，上传 coverage 报告 |
| Node 版本矩阵 | `.github/workflows/test.yml` | 增加 `strategy.matrix.node: [18, 20, 22]` |

---

## P1：社区治理文件

### P1.1 新增 Issue 模板

```
.github/ISSUE_TEMPLATE/
├── bug-report.yml
├── feature-request.yml
└── config.yml
```

每个模板含：标题、描述、labels、body（fields/textareas）。

### P1.2 新增其他治理文件

| 文件 | 用途 |
|---|---|
| `.github/PULL_REQUEST_TEMPLATE.md` | PR 描述模板，含 checklist |
| `.github/CODEOWNERS` | 自动分配 Reviewer（初始设为主要维护者） |
| `.github/FUNDING.yml` | Sponsor 链接（可选） |
| `SECURITY.md` | 安全漏洞报告流程（根目录） |
| `CODE_OF_CONDUCT.md` | 行为准则 |

### P1.3 添加 README Badges

在 `README.md` 顶部插入：

```
[![CI](https://github.com/uphg/xfunc/actions/workflows/ci.yml/badge.svg)](https://github.com/uphg/xfunc/actions)
[![npm](https://img.shields.io/npm/v/xfunc)](https://www.npmjs.com/package/xfunc)
[![Coverage](https://img.shields.io/codecov/c/github/uphg/xfunc)](https://codecov.io/gh/uphg/xfunc)
[![License](https://img.shields.io/npm/l/xfunc)](LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/xfunc)](https://bundlephobia.com/package/xfunc)
```

需要 Codecov 集成 → 在 CI 中追加 Upload coverage 步骤。

### P1.4 添加 Dependabot

新建 `.github/dependabot.yml`：

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```

### P1.5 锁定第三方 Action SHA

高优（减少 supply chain 攻击面）：

| workflow | action | 当前引用 | 替换方案 |
|---|---|---|---|
| `release.yml` | `uphg/release-tag` | `@master` | `@<sha>` + 注释版本 |
| `size-report.yml` | `dawidd6/action-download-artifact` | `@v9` | `@<sha>` |
| `size-report.yml` | `juliangruber/read-file-action` | `@v1` | `@<sha>` |
| `size-report.yml` | `actions-cool/maintain-one-comment` | `@v3` | `@<sha>` |

---

## P2：一致性清理与细节优化

### P2.1 清理 "Unfunt" 旧名残留

| 位置 | 需改动 |
|---|---|
| `CONTRIBUTING.md` 第 1 行 | `Contributing to Unfunt` → `Contributing to xfunc` |
| `CONTRIBUTING.zh-CN.md` 第 1 行 | `Unfunt 贡献指南` → `xfunc 贡献指南` |
| `CONTRIBUTING.zh-CN.md` 第 5 行 | `Unfunt 项目` → `xfunc 项目` |
| `docs/index.md` 第 6 行 | `name: "Unfunt"` → `name: "xfunc"` |
| `docs/zh/index.md` 第 6 行 | `name: "Unfunt"` → `name: "xfunc"` |
| `.github/workflows/size-report.yml` 第 96 行 | `<!-- UNFUNT_SIZE -->` → `<!-- XFUNC_SIZE -->` |

### P2.2 CHANGELOG 接入发布流程

在 `scripts/release.ts` 中（或作为 `pnpm release` 的 hook）：

- 发布前自动执行 `pnpm changelog` 生成日志
- 将 `CHANGELOG.md` 的更新包含在 release commit 中
- 补充从 `0.2.0-alpha.1 → 0.7.0` 之间缺失的 changelog 记录

### P2.3 代码注释统一英语

`src/object/cloneDeep.ts` 多处中文注释需改英文：

| 行号 | 当前 | 改为 |
|---|---|---|
| 42 | `// 不可克隆的类型` | `// Types that cannot be cloned` |
| 107 | `// 对于其他类型，尝试使用构造函数` | `// For other types, try the constructor` |
| 129 注释 | `// 使用 pop 而不是 shift 提高性能` | `// Use pop instead of shift for performance` |
| 196 | `// ES2021：复制属性的描述符` | `// ES2021: copy property descriptors` |
| 199 | `// ES2021：复制原型链` | `// ES2021: copy prototype chain` |

`src/object/clone.ts` 同样中文注释需改英文。

### P2.4 CI 增加文档构建

在 `.github/workflows/test.yml` 或 `ci.yml` 中追加：

```yaml
- name: Build docs
  run: pnpm docs:build
```

确保文档变更不会静默破坏 VitePress 构建。

### P2.5 可选增强

| 项目 | 说明 |
|---|---|
| `.editorconfig` | 根目录添加，统一缩进/换行约定 |
| `package.json` `sideEffects` | 在 `scripts/config/package-config.ts` 中追加 `sideEffects: false` |
| `package.json` `engines` | 在 `scripts/config/package-config.ts` 中追加 `engines.node: ">=18"` |

---

## 执行优先级总览

```
P0 ──┬── P0.1 补测试（并行撰写，批量提 PR）
     ├── P0.2 补 toNumber.spec.ts
     ├── P0.3 CI 质量门禁
     └── [验收] pnpm test:run + pnpm lint:check 全绿

P1 ──┬── P1.1 Issue 模板
     ├── P1.2 治理文件
     ├── P1.3 README Badges + Codecov
     ├── P1.4 Dependabot
     └── P1.5 Pin Action SHA

P2 ──┬── P2.1 Unfunt → xfunc 全局替换
     ├── P2.2 CHANGELOG 接入
     ├── P2.3 中文注释→英文
     ├── P2.4 CI 文档构建
     └── P2.5 可选增强
```

---

## 预计工作量

| 阶段 | 估计 PR 数 | 影响文件数 |
|---|---|---|
| P0 | 3–4（测试分批次合并） | 20+ |
| P1 | 2 | 10+ |
| P2 | 2 | 10+ |

总计约 **7–8 个 PR**，可并行（P0 测试撰写可多人分工，P1/P2 各自独立）。
