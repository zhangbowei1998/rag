# RAG SDK Monorepo

## 项目简介

这是一个基于 `pnpm workspace` 的 RAG SDK Monorepo。
当前已完成工程初始化，并落地了 `@rag-sdk/core` 与 `@rag-sdk/indexing` 的第一版实现。

## 技术栈

- Node.js
- pnpm workspace
- TypeScript
- tsup
- vitest

## 目录结构

```text
.
├─ packages/
│  ├─ core/
│  ├─ runtime/
│  ├─ indexing/
│  ├─ adapters/
│  ├─ observability/
│  ├─ eval/
│  └─ utils/
├─ docs/
├─ package.json
├─ pnpm-workspace.yaml
└─ pnpm-lock.yaml
```

> 说明：每个 `packages/*` 都是独立 package，已包含 `package.json` 与 `src/index.ts` 占位入口。

补充：`@rag-sdk/core` 已完成 `src` 源码收敛并切换为 `dist` 导出。
补充：`@rag-sdk/indexing` 已完成 MVP（runIndexing + 默认组件）并切换为 `dist` 导出。

## 快速开始

### 1. 安装依赖

```bash
npx -y pnpm@9.15.9 install
```

### 2. 查看 workspace 包

```bash
npx -y pnpm@9.15.9 run verify
```

### 3. 单独运行包级测试

```bash
npx -y pnpm@9.15.9 --filter @rag-sdk/core test
npx -y pnpm@9.15.9 --filter @rag-sdk/indexing test
```

## Package 约定

每个 package 统一遵循：

- 入口文件：`src/index.ts`
- 初始化阶段默认导出：`package.json` 中 `main/types/exports` 指向 `./src/index.ts`
- 进入实现阶段后允许切换为 dist 导出（当前 `@rag-sdk/core` 与 `@rag-sdk/indexing` 已切换）

## 文档与交接

- AI 交接文档：`docs/context/ai-handoff.md`
- 阶段交接快照：`docs/context/handoff-core-v1.md`
- 阶段交接快照：`docs/context/handoff-indexing-v1.md`
- Copilot 仓库指令：`.github/copilot-instructions.md`

## 当前状态

- 已初始化 Git 仓库
- 已完成 Monorepo 目录与包骨架
- `@rag-sdk/core` 已完成 schema/types/interfaces/errors/pipeline
- `@rag-sdk/core` 已接入 build/typecheck/test/demo 基线
- `@rag-sdk/indexing` 已完成 loaders/chunkers/embedders/stores/pipeline MVP
- `@rag-sdk/indexing` 已接入 build/typecheck/test/demo 基线

## 后续建议

- 继续推进 runtime 对 core/indexing 契约消费与联调
- 增加 integration 与 smoke 测试
- 增加 lint/format 与 CI 门禁
