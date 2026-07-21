# xfunc 贡献指南

[English](./CONTRIBUTING.md) | 中文

感谢您对 xfunc 项目的关注！本指南将帮助您开始为这个 TypeScript/JavaScript 工具库项目做出贡献。

## 目录

- [开发环境设置](#开发环境设置)
- [项目结构](#项目结构)
- [代码规范](#代码规范)
- [测试](#测试)
- [文档](#文档)
- [提交变更](#提交变更)
- [发布流程](#发布流程)

## 开发环境设置

### 前置要求

- Node.js（推荐使用最新 LTS 版本）
- pnpm（包管理器）
- Git

### 开始使用

1. 在 GitHub 上 Fork 本仓库
2. 克隆您的 Fork 到本地：
   ```bash
   git clone https://github.com/YOUR_USERNAME/xfunc.git
   cd xfunc
   ```

3. 安装依赖：
   ```bash
   pnpm install
   ```

4. 设置 git hooks：
   ```bash
   pnpm prepare
   ```

### 可用脚本

- `pnpm test` - 以观察模式运行测试
- `pnpm test:run` - 运行一次测试
- `pnpm build` - 构建库
- `pnpm lint` - 检查并修复代码规范问题
- `pnpm lint:check` - 仅检查代码规范，不自动修复
- `pnpm docs:dev` - 启动文档开发服务器
- `pnpm docs:build` - 构建文档
- `pnpm release` - 创建发布版本（仅维护者）

## 项目结构

```
xfunc/
├── src/                 # 源代码
│   ├── array/          # 数组工具函数
│   ├── function/       # 函数工具
│   ├── number/         # 数字工具函数
│   ├── object/         # 对象工具函数
│   ├── string/         # 字符串工具函数
│   ├── typed/          # 类型检查工具
│   └── internal/       # 内部共享工具
├── test/               # 测试文件（与 src 结构对应）
├── docs/               # 文档
├── dist/               # 构建输出（自动生成）
└── scripts/            # 构建和发布脚本
```

## 代码规范

### 基本规则

- **语言**：所有代码和注释必须使用英文
- **换行符**：使用 Linux 风格的换行符（LF）
- **分号**：除非语法要求，否则不添加分号
- **TypeScript 优先**：所有源代码应使用 TypeScript 编写
- **零依赖**：保持库的零依赖特性

### 代码风格

- 遵循现有的 ESLint 配置
- 使用有意义的变量和函数名
- 保持函数小而专一
- 除非重复使用 ≥2 次，否则不要将单行代码提取为函数
- 除非明确需要，否则不要重新格式化现有代码

### 添加新工具函数

1. **选择正确的分类**：将工具函数放在合适的文件夹中（`array/`、`function/`、`number/`、`object/`、`string/`、`typed/`）

2. **文件命名**：使用驼峰命名法（例如：`myFunction.ts`）

3. **函数结构**：
   ```typescript
   /**
    * 函数功能的简要描述
    * 
    * @param param1 参数描述
    * @param param2 参数描述
    * @returns 返回值描述
    * 
    * @example
    * ```typescript
    * myFunction('example')
    * // => 'result'
    * ```
    */
   export function myFunction(param1: string, param2?: number): string {
     // 实现代码
   }
   ```

4. **从 index 导出**：将函数添加到相应分类文件夹的 `index.ts` 文件中

5. **更新主 index**：将函数添加到主 `src/index.ts` 文件中

## 测试

### 编写测试

- 所有新工具函数都必须有完整的测试
- 测试文件应与源代码结构对应：`test/category/functionName.spec.ts`
- 使用 Vitest 作为测试框架
- 遵循现有的测试模式

### 测试结构

```typescript
import { describe, expect, it } from 'vitest'
import { myFunction } from '../../src/category/myFunction'

describe('myFunction', () => {
  it('should handle basic case', () => {
    expect(myFunction('input')).toBe('expected')
  })

  it('should handle edge cases', () => {
    expect(myFunction('')).toBe('')
    expect(myFunction(null)).toBe(null)
  })

  it('should handle invalid input', () => {
    expect(() => myFunction(undefined)).toThrow()
  })
})
```

### 运行测试

```bash
# 运行所有测试
pnpm test:run

# 以观察模式运行测试
pnpm test

# 运行特定文件的测试
pnpm test myFunction.spec.ts
```

## 文档

### API 文档

- 每个工具函数都应有 JSDoc 注释，包括：
  - 清晰的描述
  - 带类型的参数描述
  - 返回值描述
  - 使用示例
  - 边界情况或特殊行为的说明

### VitePress 文档

- 文档使用 VitePress 构建
- API 文档位于 `docs/docs/`（英文）和 `docs/zh/docs/`（中文）
- 添加新工具函数时更新相应的分类文件
- 包含实际示例和使用场景

## 提交变更

### 提交前检查

1. **运行完整测试套件**：`pnpm test:run`
2. **检查代码规范**：`pnpm lint:check`
3. **构建项目**：`pnpm build`
4. **更新文档**（如需要）

### 提交规范

遵循 [约定式提交](https://www.conventionalcommits.org/zh-hans/) 规范：

- `feat:` 新功能
- `fix:` 错误修复
- `docs:` 文档变更
- `test:` 测试变更
- `refactor:` 代码重构
- `perf:` 性能优化
- `chore:` 维护任务

示例：
```
feat: add pick utility for object property selection
fix: handle null values in isEmpty function
docs: add examples for debounce function
test: add edge cases for toNumber utility
```

### Pull Request 流程

1. 从 `dev` 分支创建功能分支：
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/my-new-utility
   ```

2. 按照上述指南进行更改

3. 使用约定式提交消息提交更改

4. 推送到您的 Fork 并创建 Pull Request，目标分支为 `dev`

5. 填写 Pull Request 模板，包括：
   - 清晰的变更描述
   - 测试信息
   - 破坏性变更（如有）
   - 相关 Issues

### Pull Request 要求

- [ ] 所有测试通过
- [ ] 代码遵循风格指南
- [ ] 文档已更新
- [ ] 提交消息遵循约定式提交
- [ ] 无破坏性变更（除非已讨论）
- [ ] 分支与 `dev` 保持同步

## 发布流程

发布由维护者使用自动化脚本处理：

1. **版本升级**：使用语义版本控制
2. **变更日志生成**：从提交消息自动生成
3. **构建和发布**：自动构建和 npm 发布

### 版本控制

- **补丁版本** (`0.1.0` → `0.1.1`)：错误修复、文档更新
- **次要版本** (`0.1.0` → `0.2.0`)：新功能、非破坏性变更
- **主要版本** (`0.1.0` → `1.0.0`)：破坏性变更

## 获取帮助

- **Issues**：查看现有问题或创建新问题
- **Discussions**：使用 GitHub Discussions 提问和讨论想法
- **代码审查**：维护者将审查所有 Pull Request

## 行为准则

- 保持尊重和包容
- 专注于建设性反馈
- 帮助他人学习和成长
- 遵循项目的技术标准

感谢您为 xfunc 做出贡献！🚀