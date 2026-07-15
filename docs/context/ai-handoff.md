# RAG SDK AI 交接文档（初始化阶段）

## 1. 文档目的

本文档用于 AI/开发者交接当前仓库状态，确保后续工作基于一致的工程认知开展。

## 2. 当前状态（已完成）

- 已完成 Monorepo 初始化（pnpm workspace）。
- 已完成 packages 下 7 个独立 package 的基础骨架。
- 已为每个 package 补齐入口文件与导出约定。
- 当前无业务实现代码，入口均为占位导出。

## 3. Workspace 与目录约定

### 3.1 根目录

- package.json
- pnpm-workspace.yaml
- pnpm-lock.yaml
- packages/
- docs/
- .github/copilot-instructions.md

### 3.2 workspace 配置

pnpm-workspace.yaml:

```yaml
packages:
  - "packages/*"
```

### 3.3 package 列表

- @rag-sdk/core
- @rag-sdk/runtime
- @rag-sdk/indexing
- @rag-sdk/adapters
- @rag-sdk/observability
- @rag-sdk/eval
- @rag-sdk/utils

## 4. package 统一约定

每个 package 当前均包含：

- package.json
- src/index.ts

每个 package 的 package.json 统一约定：

- type: module
- main: ./src/index.ts
- types: ./src/index.ts
- exports["."]: ./src/index.ts

## 5. 代码现状与边界

- src/index.ts 仅占位（export {}），未实现业务逻辑。
- 尚未引入运行时依赖与构建链路（如 tsup/rollup/vitest 等）。
- docs 目录已建好分层结构，但大部分子目录尚待填充内容。

## 6. 本地验证方式

在仓库根目录执行：

```bash
pnpm install
```

预期：

- 可成功安装并生成/更新 pnpm-lock.yaml。
- packages/* 下所有 package 可被 workspace 正确识别。

## 7. 后续开发建议（给 AI）

- 新增功能时，优先在对应 package 下按最小改动实现。
- 若新增依赖，需在任务说明中明确必要性并限制影响范围。
- 若引入构建、测试或 lint 配置，先保证全仓一致性，再逐包扩展。
- 任何目录结构调整，都应同步更新本文件与相关决策文档。

## 8. 交接检查清单

- 是否在正确 package 下开发。
- 是否保持 src/index.ts 作为入口约定。
- 是否避免了无关目录/依赖变更。
- 是否更新了受影响文档。

