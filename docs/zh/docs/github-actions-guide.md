# GitHub Actions 工作流使用指南

## 概述

本项目实现了完整的 CI/CD 流程，包括自动化测试、代码质量检查、包大小监控和发布管理。所有工作流都使用 pnpm 作为包管理器，并限制在当前仓库中运行。

## 工作流架构

### 核心工作流

#### 1. 持续集成 (ci.yml)
**触发条件**：
- 推送到任意分支（除标签外）
- 对 master/dev 分支的 Pull Request

**工作原理**：
```yaml
push:
  branches: ['**']     # 所有分支
  tags: ['!**']        # 排除标签
pull_request:
  branches: [master, dev]
```

**执行流程**：
1. 调用测试工作流 (`test.yml`)
2. 如果在 dev 分支，执行持续发布（预览版本）

#### 2. 测试工作流 (test.yml)
**类型**：可重用工作流 (`workflow_call`)

**包含任务**：
- **unit-test**: 运行 `pnpm test:run`
- **lint-and-check**: 运行 `pnpm lint:check` 和 TypeScript 构建检查

**工作原理**：
```bash
# 单元测试
pnpm test:run

# 代码检查
pnpm lint:check  # ESLint 检查
pnpm build       # TypeScript 类型检查
```

#### 3. 发布工作流 (release.yml)
**触发条件**：推送版本标签 (v*)

**执行流程**：
1. 运行完整测试套件
2. 构建项目
3. 发布到 npm
4. 创建 GitHub Release

**安全措施**：
- 需要 `Release` 环境保护
- 需要 `NPM_TOKEN` 密钥
- 仅在主仓库运行

## 自动化功能

### 1. 代码自动修复 (autofix.yml)
**触发条件**：Pull Request

**功能**：
- 自动运行 `pnpm lint` 修复代码格式
- 使用 autofix-ci 服务自动提交修复

**使用方式**：
1. 创建 Pull Request
2. 工作流自动检测代码问题
3. 自动修复并提交到 PR 分支

### 2. 包大小监控

#### size-data.yml
**触发条件**：推送或 PR 到 master/dev 分支

**功能**：
- 构建项目并分析包大小
- 上传大小数据作为 artifact

#### size-report.yml
**触发条件**：size-data 工作流完成

**功能**：
- 下载当前和历史大小数据
- 生成对比报告
- 在 PR 中自动评论大小变化

## 使用指南

### 日常开发流程

1. **功能开发**：
   ```bash
   git checkout -b feature/new-feature
   # 开发代码...
   git push origin feature/new-feature
   ```
   - 推送时自动触发 CI 测试
   - 创建 PR 时触发完整测试和自动修复

2. **代码检查**：
   - ESLint 会自动修复格式问题
   - TypeScript 类型检查确保代码质量
   - 包大小监控确保性能不退化

3. **合并到主分支**：
   ```bash
   # 合并到 dev 分支会触发持续发布
   git checkout dev
   git merge feature/new-feature
   git push origin dev
   ```

### 发布流程

1. **准备发布**：
   ```bash
   # 更新版本号
   pnpm version patch|minor|major
   
   # 或使用项目脚本
   pnpm release
   ```

2. **创建发布标签**：
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

3. **自动发布**：
   - 工作流自动运行测试
   - 构建并发布到 npm
   - 创建 GitHub Release

### 环境配置

#### 必需的 GitHub Secrets
```
NPM_TOKEN=your_npm_token          # npm 发布权限
GITHUB_TOKEN=auto_provided        # GitHub API 访问（自动提供）
```

#### 环境保护设置
在 GitHub 仓库设置中创建 `Release` 环境：
- Settings → Environments → New environment
- 名称：`Release`
- 可选择保护规则（如需要审批）

## 工作流特性

### 安全特性
- **仓库限制**：所有工作流仅在 `xypur/xfunc` 仓库运行
- **环境保护**：发布需要 Release 环境权限
- **权限最小化**：每个工作流仅申请必需权限

### 性能优化
- **并行执行**：测试任务并行运行
- **缓存优化**：pnpm 依赖缓存
- **条件执行**：跳过不必要的任务

### 监控和报告
- **测试报告**：详细的测试结果
- **大小监控**：包大小变化追踪
- **自动修复**：代码格式自动优化

## 故障排除

### 常见问题

1. **测试失败**：
   - 检查 `pnpm test:run` 本地是否通过
   - 确认依赖安装正确

2. **发布失败**：
   - 验证 NPM_TOKEN 是否有效
   - 检查版本号是否冲突

3. **自动修复不工作**：
   - 确认 PR 来自同一仓库（不是 fork）
   - 检查 autofix-ci 服务状态

### 调试技巧
- 查看 Actions 标签页的详细日志
- 使用 `--dry` 参数本地测试发布流程
- 检查工作流的触发条件是否满足

## 维护说明

- 定期更新 Action 版本（如 actions/checkout@v4）
- 监控工作流执行时间和成功率
- 根据项目需求调整触发条件和任务
- 保持依赖项和 Node.js 版本更新